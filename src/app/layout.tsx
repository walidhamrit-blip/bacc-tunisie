import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bac Coach Tunisie · Cours, séries corrigées et évaluation de niveau",
  description:
    "Application d'assistance aux élèves de baccalauréat en Tunisie : cours pédagogiques par matière, exercices et examens corrigés, quiz, tableau d'évaluation de niveau et correction guidée de PDF d'exercices.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
