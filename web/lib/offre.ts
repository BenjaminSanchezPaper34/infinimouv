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
    desktopPret: true,
    visuel: "/images/offre-anniversaire.webp",
    visuelMobile: "/images/offre-anniversaire-mobile.webp",
    alt: "Offre anniversaire Infini Mouv, du 1er au 31 octobre : 1 mois d'abonnement offert. Offre valable sur l'abonnement 12 mois à 27,90 €, voir conditions au club. 4 avenue du 11 novembre 1918, 34300 Agde.",
  },
} as const;

/* ------------------------------------------------------------------
   Temps forts — prennent la main sur le BANDEAU (et la section d'accueil)
   pendant leur plage, puis la promo du mois reprend seule.
   Chaque temps fort a sa propre clé de mémorisation : un visiteur qui avait
   fermé le bandeau du mois voit quand même l'annonce de la soirée.
   Dates en heure de Paris (le site vise des visiteurs locaux).
   ------------------------------------------------------------------ */
export type TempsFort = {
  id: string;
  debut: Date;
  fin: Date;
  accroche: string;
  offre: string;
  condition: string;
  pastille: string;
  lien: string;
  /** Visuel portrait qui remplace le popup du mois (mobile ET desktop). */
  popup?: { cle: string; visuel: string; alt: string };
};

/** Soirée des 10 ans, jeudi 16 octobre 2026 à 18h30.
    Textes repris MOT POUR MOT de la bannière officielle : on ne précise pas
    qui reçoit les 2 mois (adhérent seul ou adhérent + invité) tant que Cyril
    ne l'a pas confirmé. */
export const SOIREE = {
  debut: new Date("2026-10-16T18:30:00+02:00"),
  dateLibelle: "jeudi 16 octobre à 18h30",
  affiche: "/images/soiree-10-ans-affiche.webp",
  alt: "10e anniversaire d'Infini Mouv, le 16 octobre à 18h30 : ambiance musicale avec DJ et apéro dînatoire offert.",
};

/* Une seule clé pour toute la période : le popup de la soirée ne s'affiche
   qu'une fois, même quand le bandeau passe en « C'est ce soir ». */
const POPUP_SOIREE = { cle: "im-offer-soiree-10-ans", visuel: SOIREE.affiche, alt: SOIREE.alt };

export const TEMPS_FORTS: TempsFort[] = [
  {
    id: "soiree-10-ans-annonce",
    debut: new Date("2026-10-09T00:00:00+02:00"),
    fin: new Date("2026-10-16T00:00:00+02:00"),
    accroche: "Soirée des 10 ans, jeudi 16/10 à 18h30",
    offre: "2 mois offerts si vous invitez un proche",
    condition: "+ frais d'inscription à 0 € pour votre invité",
    pastille: "En savoir plus",
    lien: "/#soiree",
    popup: POPUP_SOIREE,
  },
  {
    id: "soiree-10-ans-jour-j",
    debut: new Date("2026-10-16T00:00:00+02:00"),
    fin: new Date("2026-10-17T00:00:00+02:00"),
    accroche: "C'est ce soir à 18h30 : soirée des 10 ans",
    offre: "2 mois offerts si vous invitez un proche",
    condition: "+ frais d'inscription à 0 € pour votre invité",
    pastille: "Ce soir · 18h30",
    lien: "/#soiree",
    popup: POPUP_SOIREE,
  },
];

/** Le temps fort en cours, s'il y en a un. */
export function tempsFortEnCours(maintenant = new Date()) {
  return TEMPS_FORTS.find((t) => maintenant >= t.debut && maintenant < t.fin) ?? null;
}

/** La section Soirée de l'accueil s'affiche jusqu'au lendemain de la soirée. */
export function soireeAVenir(maintenant = new Date()) {
  return maintenant < TEMPS_FORTS[TEMPS_FORTS.length - 1].fin;
}

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
