import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const inferredBasePath =
  isGithubActions && repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}`
    : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
