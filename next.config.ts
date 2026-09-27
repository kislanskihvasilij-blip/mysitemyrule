import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Русская версия — основная
  async redirects() {
    return [{ source: "/", destination: "/ru", permanent: false }];
  },
};

export default nextConfig;
