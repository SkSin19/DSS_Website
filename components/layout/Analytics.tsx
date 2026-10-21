"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";

/**
 * Loads GA4 / Microsoft Clarity (only when their IDs are set) and records a
 * conversion event for every WhatsApp, phone and email link click site-wide,
 * so individual CTAs don't each need their own tracking code.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      const location = window.location.pathname;
      if (href.includes("wa.me/")) trackEvent("whatsapp_click", { location });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { location });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
      {CLARITY_PROJECT_ID && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`}
        </Script>
      )}
    </>
  );
}
