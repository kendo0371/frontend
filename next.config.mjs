/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  // /api/* -> backend (localhost:4000). CORS хэрэггүй болно.
  rewrites() {
    return [{ source: "/api/:path*", destination: "http://localhost:4000/:path*" }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
