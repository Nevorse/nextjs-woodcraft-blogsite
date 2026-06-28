import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  cacheComponents: true,
  images: {
    remotePatterns: [
      // { // selcuk0463
      //   protocol: "https",
      //   hostname: "pub-7479d41ba2a840f2b237fe24cf032e42.r2.dev",
      //   pathname: "/**"
      // }
      { // ahsapozgur
        protocol: "https",
        hostname: "pub-c7520d0a9c174e8fb22aa73f018e3ae0.r2.dev",
        pathname: "/**",
      },
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
