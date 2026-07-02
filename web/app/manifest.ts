import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infini Mouv — Salle de sport à Agde",
    short_name: "Infini Mouv",
    description:
      "Salle de sport saine et lumineuse à Agde : musculation, cardio, cours collectifs, coaching. 7j/7 de 6h à 23h.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#006935",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
