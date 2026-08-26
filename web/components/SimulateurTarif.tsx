"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------
   Simulateur de tarif — la grille tarifaire vit ici, en centimes.
   Cette même grille servira de source de vérité au futur tunnel
   d'inscription en ligne : ne pas dupliquer les montants ailleurs.
   Montants issus du contrat d'abonnement (à confirmer par le club
   avant toute vente en ligne).
   ------------------------------------------------------------------ */

export const DUREES = [
  { id: "1m", label: "1 mois", mois: 1, mensuel: 3990, engagement: "Sans engagement" },
  { id: "3m", label: "3 mois", mois: 3, mensuel: 3490, engagement: "Engagement 3 mois" },
  { id: "12m", label: "12 mois", mois: 12, mensuel: 2790, engagement: "Engagement 12 mois", phare: true },
] as const;

/* Chaque option est choisie pour ce qu'elle contient : la liste complète
   des prestations est affichée, le prix reste secondaire. */
export const OPTIONS_SIM = [
  {
    id: "confort",
    nom: "Option Confort",
    mensuel: 500,
    items: [
      "Boisson hydratante Yanga® en accès illimité",
      "Suivi coaching mensuel",
      "Cours collectifs encadrés par un coach",
    ],
  },
  {
    id: "premium",
    nom: "Option Premium",
    mensuel: 1500,
    items: ["Suivi coaching expert", "Suivi nutritionnel personnalisé"],
  },
] as const;

/* Accès au club : QR code offert, badge physique en option. */
export const ACCES = [
  { id: "qr", nom: "QR code dans l'app", prix: 0, note: "Offert" },
  { id: "badge", nom: "Badge physique", prix: 1000, note: "10,00 €" },
] as const;

/* Frais fixes à la souscription (contrat) */
export const FRAIS = {
  inscription: 1490,       // frais d'inscription TTC
  depot: 4000,             // dépôt de garantie — restitué en fin de contrat
  remplacementAcces: 1000, // badge ou QR code perdu : remplacement
} as const;

/** 3990 -> "39,90 €" */
const eur = (cts: number) =>
  (cts / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export default function SimulateurTarif({ inscriptionUrl }: { inscriptionUrl: string }) {
  const [dureeId, setDureeId] = useState<(typeof DUREES)[number]["id"]>("12m");
  const [optIds, setOptIds] = useState<Set<string>>(new Set());
  const [accesId, setAccesId] = useState<(typeof ACCES)[number]["id"]>("qr");

  const basculer = (id: string) =>
    setOptIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });

  const calc = useMemo(() => {
    const duree = DUREES.find((d) => d.id === dureeId)!;
    const acces = ACCES.find((a) => a.id === accesId)!;
    const options = OPTIONS_SIM.filter((o) => optIds.has(o.id));
    const mensualite = duree.mensuel + options.reduce((t, o) => t + o.mensuel, 0);
    return {
      duree,
      acces,
      options,
      mensualite,
      // Premier règlement : 1re mensualité + frais + accès choisi + dépôt (restitué)
      premierJour: mensualite + FRAIS.inscription + acces.prix + FRAIS.depot,
    };
  }, [dureeId, optIds, accesId]);

  return (
    <div className="sim" data-reveal>
      {/* -------- Choix -------- */}
      <div className="sim__choix">
        <fieldset className="sim__bloc">
          <legend className="sim__legende">1. Votre durée</legend>
          <div className="sim__durees" role="radiogroup" aria-label="Durée d'abonnement">
            {DUREES.map((d) => (
              <label key={d.id} className={`sim-duree${dureeId === d.id ? " est-choisi" : ""}`}>
                <input
                  type="radio"
                  name="sim-duree"
                  value={d.id}
                  checked={dureeId === d.id}
                  onChange={() => setDureeId(d.id)}
                />
                <span className="sim-duree__label">{d.label}</span>
                <span className="sim-duree__prix">{eur(d.mensuel)}<small>/mois</small></span>
                <span className="sim-duree__engagement">{d.engagement}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="sim__bloc">
          <legend className="sim__legende">2. Vos options <span className="sim__facultatif">(facultatives, cumulables)</span></legend>
          <div className="sim__options">
            {OPTIONS_SIM.map((o) => (
              <label key={o.id} className={`sim-option${optIds.has(o.id) ? " est-choisi" : ""}`}>
                <input
                  type="checkbox"
                  checked={optIds.has(o.id)}
                  onChange={() => basculer(o.id)}
                />
                <span className="sim-option__coche" aria-hidden="true">✓</span>
                <span className="sim-option__corps">
                  <span className="sim-option__nom">{o.nom}</span>
                  <ul className="sim-option__items">
                    {o.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </span>
                <span className="sim-option__prix">+{eur(o.mensuel)}<small>/mois</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="sim__bloc">
          <legend className="sim__legende">3. Votre accès au club</legend>
          <div className="sim__acces" role="radiogroup" aria-label="Moyen d'accès au club">
            {ACCES.map((a) => (
              <label key={a.id} className={`sim-duree${accesId === a.id ? " est-choisi" : ""}`}>
                <input
                  type="radio"
                  name="sim-acces"
                  value={a.id}
                  checked={accesId === a.id}
                  onChange={() => setAccesId(a.id)}
                />
                <span className="sim-duree__label">{a.nom}</span>
                <span className="sim-duree__prix">{a.prix === 0 ? "Offert" : eur(a.prix)}</span>
                <span className="sim-duree__engagement">Nominatif, remis à l&apos;inscription</span>
              </label>
            ))}
          </div>
          <p className="sim__apropos">En cas de perte, le remplacement du badge ou du QR code est facturé {eur(FRAIS.remplacementAcces)}.</p>
        </fieldset>
      </div>

      {/* -------- Récapitulatif -------- */}
      <div className="sim__recap" aria-live="polite">
        <h3 className="sim__recap-titre">Votre estimation</h3>

        <div className="sim__mensualite">
          <span className="sim__mensualite-montant">{eur(calc.mensualite)}</span>
          <span className="sim__mensualite-unite">/ mois</span>
        </div>
        <p className="sim__mensualite-detail">
          {calc.duree.label} · {eur(calc.duree.mensuel)}
          {calc.options.map((o) => ` + ${o.nom.replace("Option ", "")} ${eur(o.mensuel)}`).join("")}
        </p>

        <dl className="sim__lignes">
          <div className="sim__ligne">
            <dt>Frais d&apos;inscription <small>(une fois)</small></dt>
            <dd>{eur(FRAIS.inscription)}</dd>
          </div>
          <div className="sim__ligne">
            <dt>{calc.acces.nom} <small>(une fois)</small></dt>
            <dd>{calc.acces.prix === 0 ? "Offert" : eur(calc.acces.prix)}</dd>
          </div>
          <div className="sim__ligne sim__ligne--depot">
            <dt>Dépôt de garantie <small>(restitué en fin de contrat)</small></dt>
            <dd>{eur(FRAIS.depot)}</dd>
          </div>
          <div className="sim__ligne sim__ligne--fort">
            <dt>À régler le jour de l&apos;inscription</dt>
            <dd>{eur(calc.premierJour)}</dd>
          </div>
        </dl>

        <a className="btn btn--solid sim__cta" href={inscriptionUrl}>Je m&apos;inscris</a>
        <p className="sim__note">
          Estimation indicative sur la base de la grille en vigueur — le montant
          exact figure sur votre contrat signé au club.
        </p>
      </div>
    </div>
  );
}
