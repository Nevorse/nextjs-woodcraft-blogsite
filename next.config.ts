import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-7479d41ba2a840f2b237fe24cf032e42.r2.dev",
        pathname: "/**"
      }
      // {
      //   protocol: "https",
      //   hostname: "ucarecdn.com",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "33nl5qn3bt.ucarecd.net",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
