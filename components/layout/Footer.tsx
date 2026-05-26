import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import {
  SITE_NAME,
  FOOTER_LINK_GROUPS,
  CONTACT_INFO,
} from "@/lib/constants";

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
      <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.274 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    </svg>
  );
}

const contactIcons = {
  phone: PhoneIcon,
  email: EmailIcon,
  location: LocationIcon,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[#031b4e] text-white relative overflow-hidden" role="contentinfo">
      {/* Subtle dotted background pattern on left side */}
      <div className="absolute top-0 left-0 bottom-0 w-1/3 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <Container className="relative z-10 px-0">

          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
              
              {/* Column 1: Brand and Bio */}
              <div className="w-full lg:w-[35%] flex flex-col items-start pr-0 lg:pr-12 relative">
                {/* Subtle vertical separator line (desktop only) */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-blue-500/20"></div>

                <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg mb-8" aria-label={`${SITE_NAME} — Home`}>
                  <div className="bg-white rounded-full p-1 shadow-sm">
                    <Image
                      src="/images/logo/digital-security-solutions-logo.svg"
                      alt="Digital Security Solutions logo"
                      width={56}
                      height={56}
                      className="w-12 h-12 md:w-14 md:h-14"
                    />
                  </div>
                  <span className="flex flex-col leading-tight">
                    <span className="text-lg md:text-xl font-bold tracking-tight text-white">
                      DIGITAL SECURITY
                    </span>
                    <span className="text-lg md:text-xl font-bold tracking-tight text-sky-400">
                      SOLUTIONS
                    </span>
                  </span>
                </Link>
                
                <p className="text-gray-300 text-[15px] leading-relaxed mb-10">
                  Selling premium products, designed to elevate your everyday experience with advanced security and peace of mind.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4">
                  <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-sky-500 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" aria-label="YouTube" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-700 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>

              {/* Columns 2 & 3: Links */}
              <div className="w-full lg:w-[35%] flex justify-between gap-8 sm:gap-16 lg:pl-6">
                {FOOTER_LINK_GROUPS.map((group) => (
                  <div key={group.title} className="flex-1">
                    <div className="mb-6 relative">
                      <h3 className="text-[13px] font-bold text-sky-400 tracking-wider">
                        {group.title}
                      </h3>
                      <div className="absolute -bottom-2 left-0 w-6 h-px bg-sky-500"></div>
                    </div>
                    <ul className="space-y-4">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[15px] font-medium text-gray-200 hover:text-white transition-colors duration-200 flex items-center justify-between group"
                          >
                            <span>{link.label}</span>
                            <span className="text-gray-500 group-hover:text-sky-400 transition-colors text-xs font-mono ml-4">
                              &gt;
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 4: Contact Us */}
              <div className="w-full lg:w-[30%] lg:pl-10 relative">
                <div className="mb-6 relative">
                  <h3 className="text-[13px] font-bold text-sky-400 tracking-wider uppercase">
                    Contact Us
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-6 h-px bg-sky-500"></div>
                </div>
                
                <ul className="space-y-6">
                  {CONTACT_INFO.map((item) => {
                    const IconComp = contactIcons[item.icon];
                    return (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/30 text-sky-400 flex-shrink-0 mt-1">
                          <IconComp />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-white mb-0.5">{item.label}</span>
                          {item.value && (
                            item.href ? (
                              <a
                                href={item.href}
                                className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-[14px] text-gray-300">{item.value}</span>
                            )
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>

          {/* ── Bottom bar inside the card ── */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-gray-400">
              &copy; {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <div className="h-8 bg-white rounded flex items-center justify-center px-3 min-w-[60px]">
                {/* SVG placeholder for PayPal */}
                <svg viewBox="0 0 100 26" className="h-4 fill-[#003087]">
                  <path d="M12.9 22.4l1.8-11.4h5.1c3 0 4.9 1.4 4.5 4.3-.4 2.8-2.5 4.7-5.4 4.7h-1.9l-1 6.4h-3.1zm4.8-13.8l-.8 5.3h1.8c1.6 0 2.8-.7 3-2.1.2-1.3-.6-2.5-2.2-2.5h-2zM33 11l-1.8 11.4h3.1l.6-4h2.7c3 0 4.9-1.4 4.5-4.3-.4-2.8-2.5-4.7-5.4-4.7H33zm3.7 8.5l-.8 5.3h1.8c1.6 0 2.8-.7 3-2.1.2-1.3-.6-2.5-2.2-2.5h-2zM52.3 22.4h-3l2.8-11.4h3l-2.8 11.4zM62.6 11c-2.8 0-5.1 2.2-5.1 5s2.3 5 5.1 5 5.1-2.2 5.1-5-2.2-5-5.1-5zm0 7.8c-1.3 0-2.3-1-2.3-2.3 0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3 0 1.3-1 2.3-2.3 2.3zM73.4 11h-3l-1.8 11.4h3l1.8-11.4z"/>
                </svg>
              </div>
              <div className="h-8 bg-white rounded flex items-center justify-center px-3 min-w-[60px]">
                {/* SVG placeholder for Stripe */}
                <span className="font-black tracking-tight text-[#635BFF] text-sm leading-none italic">stripe</span>
              </div>
              <div className="h-8 bg-white rounded flex items-center justify-center px-3 min-w-[60px]">
                {/* SVG placeholder for Mastercard */}
                <svg viewBox="0 0 48 30" className="h-5">
                  <circle cx="15" cy="15" r="15" fill="#eb001b"/>
                  <circle cx="33" cy="15" r="15" fill="#f79e1b"/>
                  <path d="M24 24.7A15 15 0 0029.3 15 15 15 0 0024 5.3 15 15 0 0018.7 15 15 15 0 0024 24.7z" fill="#ff5f00"/>
                </svg>
              </div>
            </div>
          </div>
          
      </Container>
    </footer>
  );
}
