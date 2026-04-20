import type { NextConfig } from "next";

const githubPages = ["1", "true", "yes"].includes(
  (process.env.GITHUB_PAGES ?? "").toLowerCase(),
);

/** GitHub project page base path (repo name). */
const githubBasePath = (process.env.BASE_PATH ?? "/E-commerce-AVX").replace(
  /\/$/,
  "",
);

const nextConfig: NextConfig = {
  ...(githubPages && {
    output: "export" as const,
    basePath: githubBasePath,
    assetPrefix: `${githubBasePath}/`,
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    ...(githubPages ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
