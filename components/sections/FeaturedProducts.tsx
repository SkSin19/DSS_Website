import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { FEATURED_PRODUCTS } from "@/lib/constants";

// Simple SVG Icons for the features
function ShippingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-sky-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

export default function FeaturedProducts() {
  // Split products into main (index 0) and grid items (1-4)
  const mainProduct = FEATURED_PRODUCTS[0];
  const gridProducts = FEATURED_PRODUCTS.slice(1, 5);

  return (
    <section className="bg-gray-950 pt-10 pb-20" id="featured">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheckIcon />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Featured Security Products
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              Smart solutions for a safer, smarter tomorrow.
            </p>
          </div>
          <Link 
            href="/products" 
            className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2 group"
          >
            Browse all products 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Large Card (Left) */}
          <div className="lg:col-span-5 relative group h-full">
            <Link href={mainProduct.href} className="block w-full h-full bg-[#f8f9fc] rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Badge */}
              {mainProduct.hasOffer && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="inline-block px-3 py-1 bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Offer
                  </span>
                </div>
              )}
              
              {/* Image Area - taking up most of the card */}
              <div className="w-full h-[300px] lg:h-[400px] relative bg-gray-100 flex items-center justify-center overflow-hidden">
                 {/* For the main card, the image is large and central */}
                 <div className="relative w-[90%] h-[90%] group-hover:scale-105 transition-transform duration-700">
                    <Image 
                      src={mainProduct.imageSrc} 
                      alt={mainProduct.imageAlt}
                      fill
                      className="object-contain"
                    />
                 </div>
              </div>

              {/* Text Area - Bottom */}
              <div className="p-8 bg-white relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{mainProduct.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed pr-8">{mainProduct.description}</p>
                  </div>
                </div>
                <div className="absolute right-8 bottom-12 text-gray-400 group-hover:text-sky-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid Cards (Right) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {gridProducts.map((product) => (
              <Link 
                key={product.id}
                href={product.href} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative h-full"
              >
                {/* Badge */}
                {product.hasOffer && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-block px-3 py-1 bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      Offer
                    </span>
                  </div>
                )}
                
                {/* Image */}
                <div className="flex-1 bg-[#f4f7fb] p-6 flex items-center justify-center min-h-[200px]">
                  <div className="relative w-full h-[140px] group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={product.imageSrc} 
                      alt={product.imageAlt}
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 flex-shrink-0">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{product.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed pr-6 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                  <div className="absolute right-6 bottom-8 text-gray-300 group-hover:text-sky-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>

        {/* Feature Strip (Bottom) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 border-t border-gray-800 pt-10">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 flex-shrink-0 shadow-md">
              <ShippingIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Shipping</h4>
              <p className="text-gray-400 text-xs">Hassle free home delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 flex-shrink-0 shadow-md">
              <PaymentIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure Payments</h4>
              <p className="text-gray-400 text-xs">Request enquiry for your orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 flex-shrink-0 shadow-md">
              <ReturnIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">15 days free return</h4>
              <p className="text-gray-400 text-xs">No questions asked</p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
