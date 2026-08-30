import type { MetadataRoute } from "next";

/* Les pages internes (/design-system, /inscription-en-ligne) sont protégées par
   noindex — pas de Disallow ici : il révélerait leurs chemins à qui lit le fichier.
   Les robots IA sont autorisés explicitement (GEO) : leurs crawlers alimentent
   ChatGPT, Claude, Perplexity et les AI Overviews, sources croissantes de trafic. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://infini-mouv.fr/sitemap.xml",
  };
}
