/**
 * URL Content Extraction - Fetch and save web articles
 */

import { IngestConfig, debug } from "./config";

export interface UrlResult {
  title: string;
  content: string;
  url: string;
  domain: string;
  description?: string;
  author?: string;
  publishedDate?: string;
  isYouTube: boolean;
  youtubeId?: string;
}

/**
 * Check if URL is a YouTube video
 */
function parseYouTubeUrl(url: string): { isYouTube: boolean; videoId?: string } {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { isYouTube: true, videoId: match[1] };
    }
  }

  return { isYouTube: false };
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

/**
 * Clean HTML and extract main content
 */
function extractMainContent(html: string): { title: string; content: string; description?: string } {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled";

  // Extract meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : undefined;

  // Remove script and style tags
  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, "");

  // Try to find main content area
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                    content.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                    content.match(/<div[^>]+class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);

  if (mainMatch) {
    content = mainMatch[1];
  }

  // Convert to plain text
  content = content
    // Convert headers to markdown
    .replace(/<h1[^>]*>([^<]+)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>([^<]+)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>([^<]+)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4[^>]*>([^<]+)<\/h4>/gi, "\n#### $1\n")
    // Convert paragraphs
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    // Convert line breaks
    .replace(/<br\s*\/?>/gi, "\n")
    // Convert lists
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/li>/gi, "")
    // Convert links (keep text, drop href for cleaner output)
    .replace(/<a[^>]*>([^<]+)<\/a>/gi, "$1")
    // Remove remaining tags
    .replace(/<[^>]+>/g, "")
    // Decode HTML entities
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Limit content length
  if (content.length > 10000) {
    content = content.slice(0, 10000) + "\n\n[Content truncated...]";
  }

  return { title, content, description };
}

/**
 * Fetch URL content
 */
export async function fetchUrl(
  url: string,
  config: IngestConfig
): Promise<UrlResult> {
  const domain = extractDomain(url);
  const youtube = parseYouTubeUrl(url);

  // Handle YouTube specially
  if (youtube.isYouTube && youtube.videoId) {
    return fetchYouTubeInfo(url, youtube.videoId, config);
  }

  // Fetch regular URL
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const extracted = extractMainContent(html);

    return {
      title: extracted.title,
      content: extracted.content,
      url,
      domain,
      description: extracted.description,
      isYouTube: false,
    };
  } catch (error) {
    debug(config, `Failed to fetch URL: ${error}`);

    return {
      title: domain,
      content: `[Failed to fetch content from ${url}]\n\nError: ${error}`,
      url,
      domain,
      isYouTube: false,
    };
  }
}

/**
 * Fetch YouTube video info
 */
async function fetchYouTubeInfo(
  url: string,
  videoId: string,
  config: IngestConfig
): Promise<UrlResult> {
  // Try to get video info from oembed
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);

    if (response.ok) {
      const data = await response.json() as {
        title: string;
        author_name: string;
      };

      return {
        title: data.title,
        content: `YouTube video by ${data.author_name}`,
        url,
        domain: "youtube.com",
        author: data.author_name,
        isYouTube: true,
        youtubeId: videoId,
      };
    }
  } catch (error) {
    debug(config, `Failed to fetch YouTube oembed: ${error}`);
  }

  // Fallback
  return {
    title: `YouTube Video ${videoId}`,
    content: "YouTube video",
    url,
    domain: "youtube.com",
    isYouTube: true,
    youtubeId: videoId,
  };
}

/**
 * Format URL extraction for Obsidian note
 */
export function formatUrlExtraction(result: UrlResult): string {
  let content = "";

  content += `**URL:** ${result.url}\n`;
  content += `**Domain:** ${result.domain}\n`;

  if (result.author) {
    content += `**Author:** ${result.author}\n`;
  }

  if (result.description) {
    content += `**Description:** ${result.description}\n`;
  }

  content += "\n";

  if (result.isYouTube && result.youtubeId) {
    // Embed YouTube video
    content += `## Video\n\n`;
    content += `[![YouTube](https://img.youtube.com/vi/${result.youtubeId}/0.jpg)](${result.url})\n\n`;
  }

  content += "## Content\n\n";
  content += result.content;

  return content;
}
