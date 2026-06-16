import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 55, 60, 70, 75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "attendancemachine.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: 'https', hostname: '5.imimg.com' },
      { protocol: 'https', hostname: 'golchhacomputer.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'api.thruroute.com' },
      { protocol: 'https', hostname: 'www.thruroute.com' },
      { protocol: 'https', hostname: 'innxeon.com' },
      { protocol: 'https', hostname: 'www.innxeon.com' },
      { protocol: 'https', hostname: 'www.betechlock.com' },
      { protocol: 'https', hostname: 'www.prama-asia.com' },
      { protocol: 'https', hostname: 'www.honeywell.com' },
      { protocol: 'https', hostname: 'www.adorama.com' },
    ],
  },
};

export default nextConfig;