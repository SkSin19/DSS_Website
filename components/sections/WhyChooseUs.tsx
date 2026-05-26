import Image from "next/image";
import Container from "@/components/ui/Container";
import { WHY_CHOOSE_US } from "@/lib/constants";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-950 section-padding" id="why-us">
      <Container>
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            We deliver enterprise-grade security infrastructure with unmatched service and reliability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Top Row: 2 wide cards */}
          <div className="md:col-span-6 bg-white rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-[250px]">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-xl md:text-2xl font-bold text-[#031b4e] mb-3 leading-tight w-3/4">
                {WHY_CHOOSE_US[0].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {WHY_CHOOSE_US[0].description}
              </p>
            </div>
            <div className="w-full sm:w-1/2 h-[150px] sm:h-full absolute right-0 bottom-0 sm:top-0">
               <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom-right">
                  <Image 
                    src={WHY_CHOOSE_US[0].imageSrc!} 
                    alt={WHY_CHOOSE_US[0].title}
                    fill
                    className="object-cover sm:object-contain object-right-bottom sm:object-right"
                  />
               </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-white rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-[250px]">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-xl md:text-2xl font-bold text-[#031b4e] mb-3 leading-tight w-3/4">
                {WHY_CHOOSE_US[1].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {WHY_CHOOSE_US[1].description}
              </p>
            </div>
            <div className="w-full sm:w-1/2 h-[150px] sm:h-full absolute right-0 bottom-0 sm:top-0">
               <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-right">
                  <Image 
                    src={WHY_CHOOSE_US[1].imageSrc!} 
                    alt={WHY_CHOOSE_US[1].title}
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>

          {/* Bottom Row: 3 columns */}
          
          {/* Col 1: Innovation */}
          <div className="md:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-[300px]">
            <div className="relative z-10 w-full">
              <h3 className="text-xl font-bold text-[#031b4e] mb-3 leading-tight w-3/4">
                {WHY_CHOOSE_US[2].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {WHY_CHOOSE_US[2].description}
              </p>
            </div>
            <div className="flex-1 w-full absolute bottom-0 left-0 right-0 h-1/2">
               <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom">
                  <Image 
                    src={WHY_CHOOSE_US[2].imageSrc!} 
                    alt={WHY_CHOOSE_US[2].title}
                    fill
                    className="object-cover object-bottom"
                  />
               </div>
            </div>
          </div>

          {/* Col 2: Comprehensive Features */}
          <div className="md:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-[300px]">
            <div className="relative z-10 w-full">
              <h3 className="text-xl font-bold text-[#031b4e] mb-3 leading-tight w-3/4">
                {WHY_CHOOSE_US[3].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {WHY_CHOOSE_US[3].description}
              </p>
            </div>
            <div className="flex-1 w-full absolute bottom-0 right-0 h-2/3 w-3/4">
               <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom-right">
                  <Image 
                    src={WHY_CHOOSE_US[3].imageSrc!} 
                    alt={WHY_CHOOSE_US[3].title}
                    fill
                    className="object-contain object-bottom-right drop-shadow-2xl translate-x-4 translate-y-4"
                  />
               </div>
            </div>
          </div>

          {/* Col 3: Stacked Cards */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4 lg:gap-6 min-h-[300px]">
            
            {/* Support */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 flex items-center justify-between gap-4 hover:shadow-xl transition-shadow group overflow-hidden relative h-full">
              <div className="flex-1 relative z-10">
                <h3 className="text-lg font-bold text-[#031b4e] mb-2 leading-tight">
                  {WHY_CHOOSE_US[4].title}
                </h3>
                <div className="w-8 h-1 bg-sky-400 rounded-full mb-2"></div>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[150px]">
                  {WHY_CHOOSE_US[4].description}
                </p>
              </div>
              <div className="w-1/3 h-full absolute right-0 top-0">
                 <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700">
                    <Image 
                      src={WHY_CHOOSE_US[4].imageSrc!} 
                      alt={WHY_CHOOSE_US[4].title}
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>
            </div>

            {/* Trusted */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 flex items-center justify-between gap-4 hover:shadow-xl transition-shadow group overflow-hidden relative h-full">
              <div className="flex-1 relative z-10">
                <h3 className="text-lg font-bold text-[#031b4e] mb-2 leading-tight">
                  {WHY_CHOOSE_US[5].title}
                </h3>
                <div className="w-8 h-1 bg-sky-400 rounded-full mb-2"></div>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[150px]">
                  {WHY_CHOOSE_US[5].description}
                </p>
              </div>
              <div className="w-1/3 h-full absolute right-0 top-0">
                 <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700">
                    <Image 
                      src={WHY_CHOOSE_US[5].imageSrc!} 
                      alt={WHY_CHOOSE_US[5].title}
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
