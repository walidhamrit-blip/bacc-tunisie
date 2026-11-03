import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `pg` doit rester en dehors du bundle serveur : sinon les sockets natifs
  // cassent sur le runtime Node de Vercel.
  serverExternalPackages: ["pg"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
