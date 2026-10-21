/* ─────────────────────────────────────────────
   Conversion tracking
   ───────────────────────────────────────────── */

// Set these in .env to switch the trackers on; empty means nothing loads.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sends a conversion event to GA4 (and anything else reading dataLayer,
 * e.g. Google Tag Manager / Ads). Safe to call when no tracker is loaded.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", name, params);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  }
}
