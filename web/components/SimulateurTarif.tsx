"use client";

import { useMemo, useState } from "react";

import { ACCES, DUREES, FAMILLES, FRAIS, PRESTATIONS, calculer, eur, type AccesId, type DureeId } from "@/lib/grille";

export default function SimulateurTarif({ inscriptionUrl }: { inscriptionUrl: string }) {
  const [dureeId, setDureeId] = useState<DureeId>("12m");
  const [prestaIds, setPrestaIds] = useState<Set<string>>(new Set());
  const [accesId, setAccesId] = useState<AccesId>("qr");

  const basculer = (id: string) =>
    setPrestaIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });

  const calc = useMemo(() => calculer(dureeId, prestaIds, accesId), [dureeId, prestaIds, accesId]);

  /* La formule composée suit le visiteur dans le tunnel d'inscription. */
  const lienInscription = inscriptionUrl.startsWith("/")
    && !inscriptionUrl.includes("#")
    ? `${inscriptionUrl}?duree=${dureeId}&acces=${accesId}${prestaIds.size ? `&options=${[...prestaIds].join(",")}` : ""}`
    : inscriptionUrl;

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
          <legend className="sim__legende">2. Vos options <span className="sim__facultatif">(à la carte — cochez celles qui vous intéressent)</span></legend>
          {FAMILLES.map((f) => (
            <div className="sim__famille" key={f.nom}>
              <h4 className="sim__famille-titre">
                {f.nom} <span className="sim__famille-tarif">{f.tarif}</span>
              </h4>
              <div className="sim__options">
                {PRESTATIONS.filter((p) => p.famille === f.nom).map((p) => (
                  <label key={p.id} className={`sim-option${prestaIds.has(p.id) ? " est-choisi" : ""}`}>
                    <input
                      type="checkbox"
                      checked={prestaIds.has(p.id)}
                      onChange={() => basculer(p.id)}
                    />
                    <span className="sim-option__coche" aria-hidden="true">✓</span>
                    <span className="sim-option__corps">
                      <span className="sim-option__nom">{p.nom}</span>
                    </span>
                    <span className="sim-option__prix">+{eur(p.mensuel)}<small>/mois</small></span>
                  </label>
                ))}
              </div>
            </div>
          ))}
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
          {calc.nbConfort > 0 && ` + ${calc.nbConfort} option${calc.nbConfort > 1 ? "s" : ""} Confort ${eur(calc.nbConfort * 500)}`}
          {calc.nbPremium > 0 && ` + ${calc.nbPremium} option${calc.nbPremium > 1 ? "s" : ""} Premium ${eur(calc.nbPremium * 1500)}`}
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

        <a className="btn btn--solid sim__cta" href={lienInscription}>Je m&apos;inscris</a>
        <p className="sim__note">
          Estimation indicative sur la base de la grille en vigueur — le montant
          exact figure sur votre contrat signé au club.
        </p>
      </div>
    </div>
  );
}
