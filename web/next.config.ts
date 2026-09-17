import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* NB : la redirection www → apex n'est PAS ici. Elle est posée au niveau
         du domaine Vercel (308, chemin conservé), donc en amont de l'app :
         une règle `has: host` ici ne serait jamais atteinte. Voir la section
         « Piège Vercel » du PAPER34-SEO-KIT. */

      /* Anciennes URL du site Muse (encore dans l'index Google) */
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services-equipements.html", destination: "/services-equipements", permanent: true },
      /* Ancienne boutique en ligne (/fr/catalog-1/…) : vers l'espace nutrition & boutique */
      { source: "/fr/:path*", destination: "/services-equipements", permanent: true },
    ];
  },
};

export default nextConfig;
