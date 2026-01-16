/**
 * Document Extraction - PDF and text documents
 * Uses tesseract for OCR fallback
 */

import { existsSync, readFileSync } from "fs";
import { basename, extname } from "path";
import { IngestConfig, debug } from "./config";

export interface DocumentResult {
  text: string;
  title: string;
  pageCount?: number;
  method: "native" | "ocr" | "raw";
}

/**
 * Extract text from PDF using pdf-parse (basic extraction)
 * Falls back to OCR if needed
 */
export async function extractPdfText(
  filePath: string,
  config: IngestConfig
): Promise<DocumentResult> {
  if (!existsSync(filePath)) {
    throw new Error(`Document not found: ${filePath}`);
  }

  const fileName = basename(filePath, extname(filePath));

  // Try using pdftotext (poppler) if available
  try {
    const proc = Bun.spawn(["pdftotext", "-layout", filePath, "-"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const text = await new Response(proc.stdout).text();
    await proc.exited;

    if (proc.exitCode === 0 && text.trim().length > 50) {
      debug(config, "PDF extracted with pdftotext");
      return {
        text: text.trim(),
        title: fileName,
        method: "native",
      };
    }
  } catch {
    debug(config, "pdftotext not available, trying OCR");
  }

  // Fallback: Convert PDF to images and OCR
  try {
    // Convert first page to image using ImageMagick/GraphicsMagick
    const tempImage = `/tmp/pdf-ocr-${Date.now()}.png`;

    const convertProc = Bun.spawn(["convert", "-density", "300", `${filePath}[0]`, "-depth", "8", tempImage], {
      stderr: "pipe",
    });
    await convertProc.exited;

    if (convertProc.exitCode === 0 && existsSync(tempImage)) {
      // OCR the image
      const ocrProc = Bun.spawn(["tesseract", tempImage, "stdout"], {
        stdout: "pipe",
        stderr: "pipe",
      });

      const text = await new Response(ocrProc.stdout).text();
      await ocrProc.exited;

      // Clean up temp file
      try {
        await Bun.spawn(["rm", tempImage]).exited;
      } catch {}

      if (text.trim().length > 10) {
        debug(config, "PDF extracted with OCR");
        return {
          text: text.trim(),
          title: fileName,
          method: "ocr",
        };
      }
    }
  } catch (error) {
    debug(config, "OCR extraction failed:", error);
  }

  // Last resort: return placeholder
  return {
    text: `[PDF content could not be extracted. File: ${basename(filePath)}]`,
    title: fileName,
    method: "raw",
  };
}

/**
 * Extract text from plain text files
 */
export function extractTextFile(filePath: string): DocumentResult {
  if (!existsSync(filePath)) {
    throw new Error(`Document not found: ${filePath}`);
  }

  const content = readFileSync(filePath, "utf-8");
  const fileName = basename(filePath, extname(filePath));

  return {
    text: content,
    title: fileName,
    method: "raw",
  };
}

/**
 * Main document extraction function
 */
export async function extractDocument(
  filePath: string,
  config: IngestConfig
): Promise<DocumentResult> {
  const ext = extname(filePath).toLowerCase();

  switch (ext) {
    case ".pdf":
      return extractPdfText(filePath, config);

    case ".txt":
    case ".md":
    case ".markdown":
      return extractTextFile(filePath);

    case ".docx":
    case ".doc":
      // For Word docs, try using textutil on macOS
      try {
        const proc = Bun.spawn(["textutil", "-convert", "txt", "-stdout", filePath], {
          stdout: "pipe",
        });
        const text = await new Response(proc.stdout).text();
        await proc.exited;

        if (proc.exitCode === 0 && text.trim()) {
          return {
            text: text.trim(),
            title: basename(filePath, ext),
            method: "native",
          };
        }
      } catch {
        debug(config, "textutil not available for Word doc");
      }

      return {
        text: `[Word document - extraction not available. File: ${basename(filePath)}]`,
        title: basename(filePath, ext),
        method: "raw",
      };

    default:
      // Try reading as text
      try {
        return extractTextFile(filePath);
      } catch {
        return {
          text: `[Unsupported document format: ${ext}]`,
          title: basename(filePath, ext),
          method: "raw",
        };
      }
  }
}

/**
 * Format document extraction for Obsidian note
 */
export function formatDocumentExtraction(
  result: DocumentResult,
  originalFile: string,
  attachmentPath?: string
): string {
  let content = "";

  if (attachmentPath) {
    content += `**Attachment:** [[${attachmentPath}]]\n`;
  }

  content += `**Original File:** \`${originalFile}\`\n`;
  content += `**Extraction Method:** ${result.method}\n\n`;

  content += "## Content\n\n";
  content += result.text;

  return content;
}
