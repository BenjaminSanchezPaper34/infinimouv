"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/Consent";
import { EVENT_FERME } from "@/components/OfferPopup";
import { OFFRE, CLE_POPUP, CLE_BANDEAU, offreEnCours, joursRestants } from "@/lib/offre";

/* Bandeau de rappel de la promotion en cours (configuration : lib/offre.ts) —
   fixé en bas, fermable, s'éteint seul à la fin de l'offre.
   Une sollicitation à la fois : si le popup existe, le bandeau attend qu'il
   ait été fermé ; s'il n'y a pas (encore) de visuel, il s'affiche directement. */
export default function OfferBanner() {
  const [show, setShow] = useState(false);
  const { pret } = useConsent();

  useEffect(() => {
    if (!offreEnCours() || !pret) return;
    try {
      if (localStorage.getItem(CLE_BANDEAU) === "closed") return; // déjà fermé
      if (!OFFRE.popup.visuelPret || localStorage.getItem(CLE_POPUP) === "closed") {
        setShow(true);
        return;
      }
    } catch {
      setShow(true);
      return;
    }
    const onFerme = () => setShow(true);
    window.addEventListener(EVENT_FERME, onFerme);
    return () => window.removeEventListener(EVENT_FERME, onFerme);
  }, [pret]);

  if (!show) return null;

  // Calculé côté client uniquement (le bandeau n'est jamais rendu au serveur).
  const j = joursRestants();
  const compteur = j === 1 ? "Dernier jour" : `Encore ${j} jours`;

  function close() {
    setShow(false);
    try {
      localStorage.setItem(CLE_BANDEAU, "closed");
    } catch {}
  }

  return (
    <div className="offer-banner" role="region" aria-label="Offre en cours">
      <a href="/tarifs" className="offer-banner__text">
        {OFFRE.bandeau.accroche}&nbsp;: <strong>{OFFRE.bandeau.offre}</strong>{" "}
        {OFFRE.bandeau.condition}
        <span className="offer-banner__code">
          {compteur} · jusqu&apos;au {OFFRE.finLibelle}
        </span>
      </a>
      <button className="offer-banner__close" onClick={close} aria-label="Fermer le bandeau">
        ×
      </button>
    </div>
  );
}
