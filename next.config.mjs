/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  // /api/* -> backend (BACKEND_URL, local дээр localhost:4000). CORS хэрэггүй болно.
  rewrites() {
    const backend = (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
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
