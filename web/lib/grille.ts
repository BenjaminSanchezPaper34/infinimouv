/* ------------------------------------------------------------------
   Grille tarifaire, en centimes : SOURCE UNIQUE de l'inscription en
   ligne (/inscription-en-ligne).
   Ne jamais dupliquer les montants ailleurs.
   Montants issus du contrat d'abonnement (à confirmer par le club
   avant toute vente en ligne).
   ------------------------------------------------------------------ */

export const DUREES = [
  { id: "1m", label: "1 mois", mois: 1, mensuel: 3990, engagement: "Sans engagement" },
  { id: "3m", label: "3 mois", mois: 3, mensuel: 3490, engagement: "Engagement 3 mois" },
  { id: "12m", label: "12 mois", mois: 12, mensuel: 2790, engagement: "Engagement 12 mois", phare: true },
] as const;

/* Les prestations se choisissent UNE PAR UNE : chaque option Confort
   coûte 5 €/mois, chaque option Premium 15 €/mois. Le prix n'est pas
   un forfait par gamme. */
export const PRESTATIONS = [
  { id: "yanga", famille: "Confort", nom: "Boisson hydratante Yanga® en accès illimité", mensuel: 500 },
  { id: "coaching", famille: "Confort", nom: "Suivi coaching mensuel", mensuel: 500 },
  { id: "cours", famille: "Confort", nom: "Cours collectifs encadrés par un coach", mensuel: 500 },
  { id: "expert", famille: "Premium", nom: "Suivi coaching expert", mensuel: 1500 },
  { id: "nutrition", famille: "Premium", nom: "Suivi nutritionnel personnalisé", mensuel: 1500 },
] as const;

export const FAMILLES = [
  { nom: "Confort", tarif: "5 €/mois par option" },
  { nom: "Premium", tarif: "15 €/mois par option" },
] as const;

/* Accès au club : QR code offert, badge physique en option. */
/* Remplacement en cas de perte, détérioration ou vol (article 3 du contrat) :
   carte de membre 10 €, QR code 15 €. */
export const ACCES = [
  { id: "qr", nom: "QR code", prix: 0, note: "Offert", remplacement: 1500 },
  { id: "badge", nom: "Badge physique", prix: 1000, note: "10,00 €", remplacement: 1000 },
] as const;

/* Horaires d'accès libre du club, 7j/7 (heures pleines, heure de Paris) */
export const HORAIRES = { ouverture: 6, fermeture: 23 } as const;

/** Le club est-il ouvert à cet instant (heure de Paris) ? */
export function clubOuvert(maintenant = new Date()) {
  const h = Number(new Intl.DateTimeFormat("fr-FR", { hour: "numeric", hourCycle: "h23", timeZone: "Europe/Paris" }).format(maintenant));
  return h >= HORAIRES.ouverture && h < HORAIRES.fermeture;
}

/* Frais fixes à la souscription (contrat) */
export const FRAIS = {
  inscription: 1490,       // frais d'inscription TTC
  depot: 4000,             // dépôt de garantie — restitué en fin de contrat
} as const;

/** 3990 -> "39,90 €" */
export const eur = (cts: number) =>
  (cts / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";


export type DureeId = (typeof DUREES)[number]["id"];
export type AccesId = (typeof ACCES)[number]["id"];

/** Mensualité et premier règlement d'une formule (même calcul partout). */
export function calculer(dureeId: DureeId, prestaIds: Iterable<string>, accesId: AccesId) {
  const ids = new Set(prestaIds);
  const duree = DUREES.find((d) => d.id === dureeId)!;
  const acces = ACCES.find((a) => a.id === accesId)!;
  const prestations = PRESTATIONS.filter((p) => ids.has(p.id));
  const nbConfort = prestations.filter((p) => p.famille === "Confort").length;
  const nbPremium = prestations.filter((p) => p.famille === "Premium").length;
  const mensualite = duree.mensuel + prestations.reduce((t, p) => t + p.mensuel, 0);
  return {
    duree,
    acces,
    prestations,
    nbConfort,
    nbPremium,
    mensualite,
    /** Débité le jour de l'inscription : 1re mensualité + frais + accès choisi. */
    aujourdhui: mensualite + FRAIS.inscription + acces.prix,
    // Premier règlement : 1re mensualité + frais + accès choisi + dépôt (restitué)
    premierJour: mensualite + FRAIS.inscription + acces.prix + FRAIS.depot,
  };
}
