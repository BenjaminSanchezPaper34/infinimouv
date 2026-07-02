import type { Metadata, Viewport } from "next";
import "./globals.css";
import OfferPopup from "@/components/OfferPopup";
import OfferBanner from "@/components/OfferBanner";

/* Données structurées — référencement local (Google Maps / rich results) */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["GymOrSportsClub", "LocalBusiness"],
  "@id": "https://infini-mouv.fr/#gym",
  name: "Infini Mouv",
  url: "https://infini-mouv.fr",
  image: "https://infini-mouv.fr/images/og-image.jpg",
  description:
    "Salle de sport à Agde : musculation, cardio, cross-training, cours collectifs Les Mills, bike Spivi, coaching. Ouverte 7j/7 de 6h à 23h.",
  telephone: "+33986673838",
  email: "agde@infini-mouv.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 avenue du 11 Novembre 1918",
    addressLocality: "Agde",
    postalCode: "34300",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 43.3107, longitude: 3.4753 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "23:00",
    },
  ],
  priceRange: "€",
  sameAs: [
    "https://www.facebook.com/infinimouvagde/",
    "https://www.instagram.com/infinimouv_agde/",
  ],
};

const SITE_URL = "https://infini-mouv.fr";

export const viewport: Viewport = {
  themeColor: "#006935",
};

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
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salle de sport Infini Mouv à Agde",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <OfferPopup />
        <OfferBanner />
      </body>
    </html>
  );
}
