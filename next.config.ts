import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [1, 5, 10, 20, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 88, 90, 92, 95, 100],
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
      { protocol: 'https', hostname: 'rukmini1.flixcart.com' },
      { protocol: 'https', hostname: 'miro.co.za' },
      { protocol: 'https', hostname: 'fgtechstore.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'media.esslsecurity.com' },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
      { protocol: 'https', hostname: 'assets.boseprofessional.com' },
      { protocol: 'https', hostname: 'adn.harmanpro.com' },
      { protocol: 'https', hostname: 'www.timeattendance.co.in' },
    ],
  },
};

export default nextConfig;