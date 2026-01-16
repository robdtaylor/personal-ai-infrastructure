/**
 * Image Analysis - GPT-4o Vision API
 */

import { existsSync, readFileSync } from "fs";
import { basename, extname } from "path";
import { IngestConfig, debug } from "./config";

const VISION_API_URL = "https://api.openai.com/v1/chat/completions";
const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB limit

export interface VisionResult {
  description: string;
  suggestedTitle: string;
  detectedText?: string;
  tags?: string[];
}

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/jpeg";
}

/**
 * Analyze image using GPT-4o Vision
 */
export async function analyzeImage(
  filePath: string,
  config: IngestConfig,
  options?: { context?: string }
): Promise<VisionResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  if (!existsSync(filePath)) {
    throw new Error(`Image file not found: ${filePath}`);
  }

  // Read and encode image
  const imageData = readFileSync(filePath);
  if (imageData.length > MAX_IMAGE_SIZE) {
    throw new Error(`Image too large (${(imageData.length / 1024 / 1024).toFixed(1)}MB). Max is 20MB.`);
  }

  const base64Image = imageData.toString("base64");
  const mimeType = getMimeType(filePath);
  const dataUrl = `data:${mimeType};base64,${base64Image}`;

  // Build prompt
  let systemPrompt = `You are an image analysis assistant. Analyze the image and provide:
1. A detailed description of what you see
2. A suggested short title (3-6 words) for this image
3. Any text visible in the image (OCR)
4. Suggested tags for categorization

Respond in JSON format:
{
  "description": "detailed description here",
  "suggestedTitle": "Short Title Here",
  "detectedText": "any text found in image or null",
  "tags": ["tag1", "tag2"]
}`;

  if (options?.context) {
    systemPrompt += `\n\nAdditional context from user: ${options.context}`;
  }

  const response = await fetch(VISION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Vision API error: ${JSON.stringify(error)}`);
  }

  const result = await response.json() as {
    choices: Array<{ message: { content: string } }>;
  };

  const content = result.choices[0]?.message?.content || "";

  // Parse JSON response
  try {
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const parsed = JSON.parse(jsonStr);
    return {
      description: parsed.description || "No description available",
      suggestedTitle: parsed.suggestedTitle || "Untitled Image",
      detectedText: parsed.detectedText || undefined,
      tags: parsed.tags || [],
    };
  } catch {
    // If JSON parsing fails, use raw content
    debug(config, "Failed to parse vision response as JSON, using raw content");
    return {
      description: content,
      suggestedTitle: "Image Analysis",
      tags: [],
    };
  }
}

/**
 * Format vision analysis for Obsidian note
 */
export function formatVisionAnalysis(
  analysis: VisionResult,
  imageFile: string,
  embeddedPath?: string
): string {
  let content = "";

  // Embed image if path provided
  if (embeddedPath) {
    content += `![[${embeddedPath}]]\n\n`;
  }

  content += "## Analysis\n\n";
  content += analysis.description + "\n\n";

  if (analysis.detectedText) {
    content += "## Detected Text\n\n";
    content += "```\n" + analysis.detectedText + "\n```\n\n";
  }

  content += `**Original File:** \`${imageFile}\`\n`;

  return content;
}
