import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      {
        protocol: "https",
        hostname: "betterplace-assets.betterplace.org",
        pathname: "/uploads/**",
      },
    ],
  },
};
export default nextConfig;
