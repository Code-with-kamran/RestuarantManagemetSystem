import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['placehold.co',"images.unsplash.com"],
     dangerouslyAllowSVG: true, // Enables SVG loading
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
};

export default nextConfig;
