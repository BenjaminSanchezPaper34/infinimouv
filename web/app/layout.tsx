import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://infinimouv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Infini Mouv — Salle de sport à Agde | Trouvez votre vraie nature",
    template: "%s | Infini Mouv Agde",
  },
  description:
    "Salle de sport saine et lumineuse à Agde : air purifié, équipements Matrix, cours collectifs Les Mills®, coaching personnalisé. Ouvert 7j/7 de 6h à 23h. Dès 27,90 €/mois.",
  keywords: [
    "salle de sport Agde",
    "musculation Agde",
    "fitness Agde",
    "cours collectifs Agde",
    "coaching sportif Agde",
    "Infini Mouv",
  ],
  authors: [{ name: "Infini Mouv" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Infini Mouv",
    title: "Infini Mouv — Salle de sport à Agde",
    description:
      "Une salle de sport saine, lumineuse et moderne à Agde. Trouvez votre vraie nature.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
