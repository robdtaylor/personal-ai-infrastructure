/**
 * Semantic Search via Vector Embeddings
 * Uses OpenAI text-embedding-3-large for high-quality embeddings
 * Stores in SQLite for simplicity and portability
 */

import { Database } from "bun:sqlite";
import { existsSync, statSync } from "fs";
import { ObsConfig, debug } from "./config";
import { getAllNotes, walkMarkdownFiles } from "./vault";
import { parseNote, ParsedNote } from "./parser";
import { relative, join } from "path";

// Embedding configuration
const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-large";
const EMBEDDING_DIMENSIONS = EMBEDDING_MODEL.includes("large") ? 3072 : 1536;
const CHUNK_SIZE = 512; // tokens
const CHUNK_OVERLAP = 50; // tokens
const BATCH_SIZE = 100; // embeddings per API call

export interface EmbeddingChunk {
  id: number;
  notePath: string;
  chunkIndex: number;
  content: string;
  embedding: Float32Array;
  createdAt: string;
}

export interface SearchResult {
  note: ParsedNote;
  score: number;
  matchedChunk: string;
}

/**
 * Initialize the embeddings database
 */
export function initEmbeddingsDb(config: ObsConfig): Database {
  const db = new Database(config.embeddingsDbPath);

  db.run(`
    CREATE TABLE IF NOT EXISTS embeddings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      note_path TEXT NOT NULL,
      chunk_index INTEGER NOT NULL,
      content TEXT NOT NULL,
      embedding BLOB NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(note_path, chunk_index)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS note_hashes (
      note_path TEXT PRIMARY KEY,
      content_hash TEXT NOT NULL,
      last_embedded TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create index for faster lookups
  db.run(`CREATE INDEX IF NOT EXISTS idx_embeddings_note_path ON embeddings(note_path)`);

  return db;
}

/**
 * Simple tokenizer approximation (GPT-style, ~4 chars per token)
 */
function approximateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Split text into chunks with overlap
 */
export function chunkText(text: string, title: string, tags: string[]): string[] {
  const chunks: string[] = [];
  const lines = text.split("\n");
  let currentChunk = "";
  let currentTokens = 0;

  // Add context prefix to each chunk
  const contextPrefix = `Title: ${title}\nTags: ${tags.join(", ")}\n---\n`;
  const prefixTokens = approximateTokens(contextPrefix);

  for (const line of lines) {
    const lineTokens = approximateTokens(line);

    if (currentTokens + lineTokens > CHUNK_SIZE - prefixTokens && currentChunk) {
      // Save current chunk with context prefix
      chunks.push(contextPrefix + currentChunk.trim());

      // Start new chunk with overlap (keep last few lines)
      const overlapLines = currentChunk.split("\n").slice(-3);
      currentChunk = overlapLines.join("\n") + "\n" + line + "\n";
      currentTokens = approximateTokens(currentChunk);
    } else {
      currentChunk += line + "\n";
      currentTokens += lineTokens;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(contextPrefix + currentChunk.trim());
  }

  // If the entire note is small, just use one chunk
  if (chunks.length === 0 && text.trim()) {
    chunks.push(contextPrefix + text.trim());
  }

  return chunks;
}

/**
 * Generate content hash for change detection
 */
function hashContent(content: string): string {
  const hasher = new Bun.CryptoHasher("md5");
  hasher.update(content);
  return hasher.digest("hex");
}

/**
 * Call OpenAI embeddings API
 */
async function generateEmbeddings(texts: string[]): Promise<Float32Array[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.data.map((item: { embedding: number[] }) => new Float32Array(item.embedding));
}

/**
 * Embed a single text (for queries)
 */
export async function embedText(text: string): Promise<Float32Array> {
  const embeddings = await generateEmbeddings([text]);
  return embeddings[0];
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Get embedding statistics
 */
export function getEmbeddingStats(config: ObsConfig): {
  totalNotes: number;
  totalChunks: number;
  lastUpdated: string | null;
  dbSizeBytes: number;
} {
  const db = initEmbeddingsDb(config);

  const notesCount = db.query("SELECT COUNT(DISTINCT note_path) as count FROM embeddings").get() as {
    count: number;
  };
  const chunksCount = db.query("SELECT COUNT(*) as count FROM embeddings").get() as { count: number };
  const lastUpdated = db.query("SELECT MAX(created_at) as last FROM embeddings").get() as {
    last: string | null;
  };

  const dbSize = existsSync(config.embeddingsDbPath)
    ? statSync(config.embeddingsDbPath).size
    : 0;

  db.close();

  return {
    totalNotes: notesCount.count,
    totalChunks: chunksCount.count,
    lastUpdated: lastUpdated.last,
    dbSizeBytes: dbSize,
  };
}

/**
 * Check if a note needs re-embedding
 */
function noteNeedsEmbedding(db: Database, notePath: string, currentHash: string): boolean {
  const existing = db.query("SELECT content_hash FROM note_hashes WHERE note_path = ?").get(notePath) as {
    content_hash: string;
  } | null;

  return !existing || existing.content_hash !== currentHash;
}

/**
 * Build or update embeddings for all notes
 */
export async function buildEmbeddings(
  config: ObsConfig,
  options?: {
    force?: boolean;
    verbose?: boolean;
    onProgress?: (current: number, total: number, notePath: string) => void;
  }
): Promise<{ embedded: number; skipped: number; errors: number }> {
  const opts = options || {};
  const db = initEmbeddingsDb(config);

  let embedded = 0;
  let skipped = 0;
  let errors = 0;

  // Collect notes that need embedding
  const notesToEmbed: { path: string; note: ParsedNote; hash: string; chunks: string[] }[] = [];

  for (const filePath of walkMarkdownFiles(config.vaultPath, config)) {
    try {
      const note = parseNote(filePath);
      const contentHash = hashContent(note.rawContent);
      const relativePath = relative(config.vaultPath, filePath);

      if (!opts.force && !noteNeedsEmbedding(db, relativePath, contentHash)) {
        skipped++;
        continue;
      }

      const tags = note.frontmatter.tags || [];
      const tagArray = Array.isArray(tags) ? tags : [tags];
      const chunks = chunkText(note.content, note.title, tagArray.map(String));

      notesToEmbed.push({
        path: relativePath,
        note,
        hash: contentHash,
        chunks,
      });
    } catch (error) {
      errors++;
      debug(config, `Failed to process ${filePath}:`, error);
    }
  }

  const totalNotes = notesToEmbed.length;
  if (opts.verbose) {
    console.log(`Processing ${totalNotes} notes (${skipped} unchanged, ${errors} errors)`);
  }

  // Process notes in batches
  let processedNotes = 0;
  const allChunksToEmbed: { notePath: string; chunkIndex: number; content: string }[] = [];

  for (const { path: notePath, hash, chunks } of notesToEmbed) {
    // Delete old embeddings for this note
    db.run("DELETE FROM embeddings WHERE note_path = ?", [notePath]);
    db.run("DELETE FROM note_hashes WHERE note_path = ?", [notePath]);

    for (let i = 0; i < chunks.length; i++) {
      allChunksToEmbed.push({
        notePath,
        chunkIndex: i,
        content: chunks[i],
      });
    }
  }

  // Batch embed all chunks
  for (let i = 0; i < allChunksToEmbed.length; i += BATCH_SIZE) {
    const batch = allChunksToEmbed.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.content);

    try {
      const embeddings = await generateEmbeddings(texts);

      // Store embeddings
      const insertStmt = db.prepare(
        "INSERT OR REPLACE INTO embeddings (note_path, chunk_index, content, embedding) VALUES (?, ?, ?, ?)"
      );

      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j];
        const embeddingBuffer = Buffer.from(embeddings[j].buffer);
        insertStmt.run(chunk.notePath, chunk.chunkIndex, chunk.content, embeddingBuffer);
      }

      if (opts.verbose) {
        console.log(`Embedded chunks ${i + 1}-${Math.min(i + BATCH_SIZE, allChunksToEmbed.length)} of ${allChunksToEmbed.length}`);
      }
    } catch (error) {
      errors++;
      console.error(`Failed to embed batch:`, error);
    }
  }

  // Update note hashes
  const hashStmt = db.prepare(
    "INSERT OR REPLACE INTO note_hashes (note_path, content_hash, last_embedded) VALUES (?, ?, CURRENT_TIMESTAMP)"
  );
  for (const { path: notePath, hash } of notesToEmbed) {
    hashStmt.run(notePath, hash);
    embedded++;

    if (opts.onProgress) {
      opts.onProgress(processedNotes++, totalNotes, notePath);
    }
  }

  // Clean up notes that no longer exist
  const existingPaths = new Set<string>();
  for (const filePath of walkMarkdownFiles(config.vaultPath, config)) {
    existingPaths.add(relative(config.vaultPath, filePath));
  }

  const storedPaths = db.query("SELECT DISTINCT note_path FROM note_hashes").all() as { note_path: string }[];
  for (const { note_path } of storedPaths) {
    if (!existingPaths.has(note_path)) {
      db.run("DELETE FROM embeddings WHERE note_path = ?", [note_path]);
      db.run("DELETE FROM note_hashes WHERE note_path = ?", [note_path]);
      if (opts.verbose) {
        console.log(`Removed deleted note: ${note_path}`);
      }
    }
  }

  db.close();

  return { embedded, skipped, errors };
}

/**
 * Semantic search across all embedded notes
 */
export async function semanticSearch(
  config: ObsConfig,
  query: string,
  options?: { limit?: number }
): Promise<SearchResult[]> {
  const limit = options?.limit || 10;
  const db = initEmbeddingsDb(config);

  // Embed the query
  const queryEmbedding = await embedText(query);

  // Get all embeddings
  const allChunks = db.query("SELECT id, note_path, chunk_index, content, embedding FROM embeddings").all() as {
    id: number;
    note_path: string;
    chunk_index: number;
    content: string;
    embedding: Buffer;
  }[];

  if (allChunks.length === 0) {
    db.close();
    return [];
  }

  // Calculate similarities
  const similarities: { notePath: string; chunkContent: string; score: number }[] = [];

  for (const chunk of allChunks) {
    const embedding = new Float32Array(chunk.embedding.buffer, chunk.embedding.byteOffset, EMBEDDING_DIMENSIONS);
    const score = cosineSimilarity(queryEmbedding, embedding);
    similarities.push({
      notePath: chunk.note_path,
      chunkContent: chunk.content,
      score,
    });
  }

  // Sort by similarity
  similarities.sort((a, b) => b.score - a.score);

  // Deduplicate by note (keep best chunk per note)
  const seenNotes = new Set<string>();
  const uniqueResults: typeof similarities = [];

  for (const result of similarities) {
    if (!seenNotes.has(result.notePath)) {
      seenNotes.add(result.notePath);
      uniqueResults.push(result);
      if (uniqueResults.length >= limit) break;
    }
  }

  db.close();

  // Load full notes
  const results: SearchResult[] = [];
  for (const result of uniqueResults) {
    try {
      const fullPath = join(config.vaultPath, result.notePath);
      const note = parseNote(fullPath);
      results.push({
        note,
        score: result.score,
        matchedChunk: result.chunkContent,
      });
    } catch (error) {
      debug(config, `Failed to load note ${result.notePath}:`, error);
    }
  }

  return results;
}

/**
 * Clear all embeddings
 */
export function clearEmbeddings(config: ObsConfig): void {
  const db = initEmbeddingsDb(config);
  db.run("DELETE FROM embeddings");
  db.run("DELETE FROM note_hashes");
  db.run("DELETE FROM metadata");
  db.close();
}
