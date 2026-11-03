"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/* ------------------------------------------------------------------
   Événements Vercel Analytics des clics clés, posés une seule fois pour
   tout le site (écoute déléguée) : aucun lien à baliser à la main.
   - tel        : lien tel:
   - itineraire : lien Google Maps « itinéraire » (/maps/dir/)
   - instagram  : lien vers le compte Instagram
   L'emplacement (nav, footer, id de section) précise d'où vient le clic.
   ------------------------------------------------------------------ */

function evenement(href: string) {
  if (href.startsWith("tel:")) return "tel";
  if (href.includes("google.com/maps/dir")) return "itineraire";
  if (href.includes("instagram.com")) return "instagram";
  return null;
}

export default function SuiviClics() {
  useEffect(() => {
    const surClic = (ev: MouseEvent) => {
      const lien = (ev.target as Element | null)?.closest?.("a[href]");
      if (!lien) return;
      const nom = evenement(lien.getAttribute("href") || "");
      if (!nom) return;
      const zone = lien.closest("nav, footer, section[id], [data-suivi]");
      const emplacement = zone?.getAttribute("data-suivi") || zone?.id || zone?.tagName.toLowerCase() || "page";
      track(nom, { emplacement, page: window.location.pathname });
    };
    document.addEventListener("click", surClic, { capture: true });
    return () => document.removeEventListener("click", surClic, { capture: true });
  }, []);
  return null;
}
