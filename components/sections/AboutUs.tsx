import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  PencilRuler, 
  Award, 
  Lightbulb, 
  Leaf, 
  Users, 
  Heart,
  Shield,
  Lock,
  Headphones,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

const VALUES = [
  {
    icon: (className: string) => <PencilRuler className={className} />,
    title: "Advanced Protection",
    description: "We build smart security systems designed to protect homes, offices, and businesses with reliable real-time monitoring.",
  },
  {
    icon: (className: string) => <Award className={className} />,
    title: "Trusted Quality",
    description: "Every product is carefully selected and tested to ensure long-lasting performance, stability, and dependable security.",
  },
  {
    icon: (className: string) => <Lightbulb className={className} />,
    title: "Innovation",
    description: "We continuously adopt modern security technologies to deliver smarter, faster, and more efficient protection solutions.",
  },
  {
    icon: (className: string) => <Leaf className={className} />,
    title: "Reliable Support",
    description: "From installation to maintenance, our team provides dedicated support to keep your systems running smoothly.",
  },
  {
    icon: (className: string) => <Users className={className} />,
    title: "Smart Integration",
    description: "Our solutions are designed to work seamlessly together, creating a connected and easy-to-manage security ecosystem.",
  },
  {
    icon: (className: string) => <Heart className={className} />,
    title: "Customer Commitment",
    description: "We focus on delivering secure, user-friendly, and high-quality experiences that customers can trust every day.",
  },
];

export default function AboutUs() {
  return (
    <div id="about" className="about-us bg-white select-none py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* About Us Heading & Paragraph */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          About Us<span className="text-red-600">.</span>
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl font-normal mb-16 sm:mb-20 text-center">
          Digital Security Solutions is your trusted provider for advanced, state-of-the-art security systems. Established in 2010, we have spent over a decade delivering tailored security solutions to a diverse range of residential and commercial clients. We understand that protecting your loved ones and assets is your highest priority. That is why we are committed to equipping you with outstanding, reliable security products designed to ensure your complete peace of mind.
        </p>

        {/* Our Values Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
          Our Values<span className="text-red-600">.</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium mb-12 sm:mb-16 text-center">
          We value innovation and continuously seek to push boundaries, delivering products that inspire and delight. Join us in embracing these values and become part of our mission to make a positive difference in the world
        </p>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {VALUES.map((value, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-[2rem] bg-[#f5f8fc]/60 border border-transparent hover:border-red-100/50 hover:bg-[#f3f7fd] hover:shadow-[0_8px_30px_rgba(239,68,68,0.04)] transition-all duration-300"
            >
              <div className="mb-5 flex items-center justify-center p-3.5 rounded-2xl bg-white border border-gray-100/30 group-hover:border-red-200 group-hover:bg-red-50 transition-all duration-300">
                {value.icon("w-8 h-8 text-gray-700 group-hover:text-red-600 stroke-[1.25] transition-colors duration-300")}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Awards & Certifications Section */}
        <div className="w-full mt-24 sm:mt-28 mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Awards & Certifications<span className="text-red-600">.</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl font-medium mb-12">
            Recognized for our unwavering commitment to quality, engineering standards, and industry compliance.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 mt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <Award className="w-8 h-8 stroke-[1.25]" />
              </div>
              <span className="text-xs font-semibold text-gray-600">ISO 9001 Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <ShieldCheck className="w-8 h-8 stroke-[1.25]" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Govt. Registered</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <Zap className="w-8 h-8 stroke-[1.25]" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Best Integrator Award</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <CheckCircle2 className="w-8 h-8 stroke-[1.25]" />
              </div>
              <span className="text-xs font-semibold text-gray-600">100% Quality Audited</span>
            </div>
          </div>
        </div>

        {/* Commitment Banner Card */}
        <div className="relative w-full rounded-[2.5rem] bg-[#030712] overflow-hidden flex flex-col md:flex-row shadow-xl border border-slate-900 min-h-105 mt-8">
          {/* Background image on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] z-0 h-full min-h-62.5 md:min-h-auto">
            <Image
              src="/images/general/PUBLIC_NEXT_GET_IN_TOUCH.png"
              alt="Trusted security solutions"
              fill
              className="object-cover object-center"
              unoptimized
            />
            {/* Subtle overlay for mobile readibility */}
            <div className="absolute inset-0 bg-slate-950/40 md:bg-transparent" />
          </div>

          {/* Floating White Panel on the Left */}
          <div className="relative z-10 bg-white rounded-[2rem] p-8 sm:p-10 md:p-12 m-4 md:m-6 max-w-full md:max-w-[48%] flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-red-600 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 block">
                Securing What Matters Most
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                We are committed to delivering <span className="text-red-600">trusted security solutions</span>
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-normal">
                From concept to creation, we focus on precision, innovation, and rigorous testing to ensure reliable protection for homes and businesses.
              </p>

              {/* 4 Features row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-600 mb-2">
                    <Shield className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 text-center leading-tight">
                    Advanced Technology
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-600 mb-2">
                    <Lock className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 text-center leading-tight">
                    Reliable Protection
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-600 mb-2">
                    <Headphones className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 text-center leading-tight">
                    24/7 Support
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-600 mb-2">
                    <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 text-center leading-tight">
                    Trusted Quality
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/solutions"
              className="inline-flex items-center justify-center bg-slate-950 hover:bg-red-600 text-white! font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full self-start transition-colors duration-200"
              style={{ color: "white" }}
            >
              Explore Solutions <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}