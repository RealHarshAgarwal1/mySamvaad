import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "b34rkutyre.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "z3uyqb1ojo.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
