import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['placehold.co'], //  add this line
     dangerouslyAllowSVG: true, // Enables SVG loading
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
};

export default nextConfig;
