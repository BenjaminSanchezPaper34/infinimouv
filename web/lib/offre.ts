/* ------------------------------------------------------------------
   Promotion en cours — SOURCE UNIQUE pour le popup et le bandeau.
   Pour une nouvelle promo : changer `id` (les visiteurs qui avaient fermé
   la précédente verront la nouvelle), les dates, les textes et les visuels.
   ------------------------------------------------------------------ */

export const OFFRE = {
  /** Sert de clé de mémorisation (popup / bandeau fermés). */
  id: "anniversaire-2026",

  /** Du 1er au 31 octobre inclus : la borne de fin est le 1er novembre à 0 h. */
  debut: new Date("2026-10-01T00:00:00"),
  fin: new Date("2026-11-01T00:00:00"),
  /** Libellé de la date de fin, affiché dans le bandeau. */
  finLibelle: "31/10",

  /** Bandeau de rappel (texte, toujours disponible). */
  bandeau: {
    accroche: "Anniversaire Infini Mouv",
    offre: "1 mois offert",
    condition: "pour toute inscription sur 12 mois",
  },

  /** Popup visuel, activable format par format : tant qu'un visuel n'est pas
      prêt, le popup reste coupé sur ce format et le bandeau s'affiche seul —
      jamais d'image cassée en production. Mobile = écrans ≤ 640 px. */
  popup: {
    mobilePret: true,
    desktopPret: false,
    visuel: "/images/offre-anniversaire.webp",
    visuelMobile: "/images/offre-anniversaire-mobile.webp",
    alt: "Offre anniversaire Infini Mouv, du 1er au 31 octobre : 1 mois d'abonnement offert. Offre valable sur l'abonnement 12 mois à 27,90 €, voir conditions au club. 4 avenue du 11 novembre 1918, 34300 Agde.",
  },
} as const;

export const CLE_POPUP = `im-offer-${OFFRE.id}`;
export const CLE_BANDEAU = `im-offer-banner-${OFFRE.id}`;

/** La promo est-elle en cours à cet instant (heure du visiteur) ? */
export function offreEnCours(maintenant = new Date()) {
  return maintenant >= OFFRE.debut && maintenant < OFFRE.fin;
}

/** Jours restants, jour de fin inclus (« Dernier jour » le 31). */
export function joursRestants(maintenant = new Date()) {
  return Math.max(1, Math.ceil((OFFRE.fin.getTime() - maintenant.getTime()) / 86_400_000));
}

/** Le popup a-t-il un visuel pour l'écran du visiteur ? (client uniquement) */
export function popupDisponible() {
  const mobile = window.matchMedia("(max-width: 640px)").matches;
  return mobile ? OFFRE.popup.mobilePret : OFFRE.popup.desktopPret;
}
