"use client";

import Container from "@/components/ui/Container";
import { TRUST_BADGES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function TrustBar() {
  const ref = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });

  return (
    <div ref={ref} className="select-none w-full bg-gray-50 border-b border-gray-100 py-4 overflow-hidden lg:hidden">
      <Container>
        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-4 h-4 text-sky-500"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {badge.label}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
