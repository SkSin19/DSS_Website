import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";


function DiamondIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-sky-500 mb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.99 3.75L4.5 10.5l7.49 9.75 7.51-9.75-7.51-6.75zM4.5 10.5h15"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-sky-500 mb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function SmartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-sky-500 mb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-sky-500 mb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export default function PremiumDesign() {
  return (
    <section className="select-none bg-gray-950 section-padding" id="premium-design">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column (Image) */}
          <div className="bg-[#2b354e] rounded-4xl p-8 min-h-100 lg:min-h-125 relative overflow-hidden flex items-center justify-center">
            {/* Background Shield Outline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className="w-64 h-64 text-sky-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>

            {/* Product Composition */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero/cctv-cameras-surveillance-systems-slide-1.png"
                alt="Premium Security Composition"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80"
              />
            </div>
          </div>

          {/* Right Column (Text Content) */}
          <div className="bg-[#f8f9fc] rounded-4xl p-10 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <ShieldIcon />
              <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">
                Trusted Security
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#031b4e] mb-6 leading-tight">
              Premium Design <br />
              and Quality
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-md">
              Born out of a shared love of good design & quality products, we
              create considered solutions fit for the modern lifestyle. Always
              driven by passion, we work to empower others to live the same way.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-6 mb-12">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-20">
                <DiamondIcon />
                <span className="text-xs font-semibold text-gray-800 leading-tight">
                  Premium
                  <br />
                  Quality
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-20">
                <ShieldIcon />
                <span className="text-xs font-semibold text-gray-800 leading-tight">
                  Reliable
                  <br />
                  Protection
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-20">
                <SmartIcon />
                <span className="text-xs font-semibold text-gray-800 leading-tight">
                  Smart
                  <br />
                  Solutions
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-20">
                <SupportIcon />
                <span className="text-xs font-semibold text-gray-800 leading-tight">
                  Dedicated
                  <br />
                  Support
                </span>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-white! text-black! hover:bg-black! hover:text-white! px-8 py-3.5 rounded-full text-sm font-semibold transition-colors gap-2 group shadow-xl"
              >
                Read our Story
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
