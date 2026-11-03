import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PwaBanner } from "@/components/pwa-banner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c8102e" },
    { media: "(prefers-color-scheme: dark)", color: "#121816" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  applicationName: "Bac Coach Tunisie",
  title: "Bac Coach Tunisie · Cours, séries corrigées et évaluation de niveau",
  description:
    "Application d'assistance aux élèves de baccalauréat en Tunisie : cours pédagogiques par matière, exercices et examens corrigés, quiz, tableau d'évaluation de niveau et correction guidée de PDF d'exercices.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bac Coach",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <PwaBanner />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
