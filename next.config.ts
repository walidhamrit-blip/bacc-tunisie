import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const isCourseRoute = (pathname: string) =>
  pathname === "/cours" || pathname.startsWith("/cours/");

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: false,
  fallbacks: {
    document: "/~offline",
  },
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          sameOrigin &&
          isCourseRoute(pathname) &&
          request.headers.get("RSC") === "1" &&
          request.headers.get("Next-Router-Prefetch") === "1",
        handler: "NetworkFirst",
        options: {
          cacheName: "cours-rsc-prefetch",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          sameOrigin &&
          isCourseRoute(pathname) &&
          request.headers.get("RSC") === "1",
        handler: "NetworkFirst",
        options: {
          cacheName: "cours-rsc",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          sameOrigin &&
          isCourseRoute(pathname) &&
          request.headers.get("RSC") !== "1",
        handler: "NetworkFirst",
        options: {
          cacheName: "cours-pages",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ...(process.env.VERCEL === "1"
    ? [{ key: "X-Frame-Options", value: "SAMEORIGIN" }]
    : []),
];

const nextConfig: NextConfig = {
  // `pg` doit rester en dehors du bundle serveur : sinon les sockets natifs
  // cassent sur le runtime Node de Vercel.
  serverExternalPackages: ["pg"],
  poweredByHeader: false,
  allowedDevOrigins: ["*.e2b.app"],
  turbopack: {},
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
