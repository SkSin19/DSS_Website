import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 55, 60, 70, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "attendancemachine.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       { protocol: 'https', hostname: 'attendancemachine.in' },      // eSSL (already working)
      { protocol: 'https', hostname: '5.imimg.com' },               // PRAMA (IndiaMART CDN)
      { protocol: 'https', hostname: 'golchhacomputer.com' },       // PRAMA
      { protocol: 'https', hostname: 'static.wixstatic.com' },     // PRAMA + Honeywell
      { protocol: 'https', hostname: 'api.thruroute.com' },        // Honeywell
      { protocol: 'https', hostname: 'innxeon.com' }, 
      { protocol: 'https', hostname: 'www.betechlock.com' }, 
      { protocol: 'https', hostname: 'www.prama-asia.com' },  
      { protocol: 'https', hostname: 'www.honeywell.com' },  
      { protocol: 'https', hostname: 'cdn.adorama.com' },  
    ],
  },
};

export default nextConfig;
