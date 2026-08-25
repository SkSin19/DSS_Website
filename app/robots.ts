import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt served at /robots.txt.
 *
 * Allows all traditional crawlers, and – critically for being surfaced and
 * recommended by AI assistants – explicitly welcomes the known AI crawlers
 * (OpenAI/ChatGPT, Anthropic/Claude, Perplexity, Google & Apple AI, etc.).
 * All are kept out of internal API routes only.
 *
 * Note: `Google-Extended` and `Applebot-Extended` are NOT content crawlers –
 * they are consent tokens that let Gemini / Apple Intelligence use pages they
 * already crawled. Allowing them opts the site IN to those AI answers.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI – training + retrieval
  "OAI-SearchBot", // OpenAI – ChatGPT Search index
  "ChatGPT-User", // OpenAI – live fetch when a user asks in ChatGPT
  "ClaudeBot", // Anthropic – crawl/index
  "Claude-Web", // Anthropic – live fetch
  "anthropic-ai", // Anthropic – legacy token
  "Claude-SearchBot", // Anthropic – search index
  "PerplexityBot", // Perplexity – index
  "Perplexity-User", // Perplexity – live fetch
  "Google-Extended", // Google Gemini / AI Overviews consent
  "Applebot", // Apple – Siri / Spotlight
  "Applebot-Extended", // Apple Intelligence consent
  "Bingbot", // Microsoft Bing / Copilot
  "Amazonbot", // Amazon – Alexa / Rufus
  "cohere-ai", // Cohere
  "Meta-ExternalAgent", // Meta AI
  "DuckAssistBot", // DuckDuckGo AI
  "YouBot", // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly opt every major AI assistant in.
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
