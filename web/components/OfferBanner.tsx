"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/Consent";
import { EVENT_FERME } from "@/components/OfferPopup";

/* Bandeau de rappel de l'offre estivale (prolongée) — fixé en bas, fermable,
   disparaît automatiquement après le 31 août. */
const END = new Date("2026-09-01T00:00:00");
const STORAGE_KEY = "im-offer-banner-happysummer-aout";
const POPUP_KEY = "im-offer-happysummer-aout"; // clé du popup : a-t-il déjà été traité ?

export default function OfferBanner() {
  const [show, setShow] = useState(false);
  const { etat, pret } = useConsent();

  useEffect(() => {
    if (new Date() >= END) return;
    // Une sollicitation à la fois : on attend que le bandeau cookies soit traité…
    if (!pret || etat === "inconnu") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "closed") return; // bandeau déjà fermé
      // …puis que le popup de l'offre ait été vu et fermé. Le bandeau ne joue
      // ensuite qu'un rôle de rappel discret, jamais en doublon du popup.
      if (localStorage.getItem(POPUP_KEY) === "closed") { setShow(true); return; }
    } catch {
      setShow(true);
      return;
    }
    const onFerme = () => setShow(true);
    window.addEventListener(EVENT_FERME, onFerme);
    return () => window.removeEventListener(EVENT_FERME, onFerme);
  }, [pret, etat]);

  if (!show) return null;

  function close() {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "closed");
    } catch {}
  }

  return (
    <div className="offer-banner" role="region" aria-label="Offre en cours">
      <a href="/#contact" className="offer-banner__text">
        ☀️ Prolongation — jusqu&apos;au 31/08&nbsp;: <strong>1 abonnement acheté = 1 offert</strong>
        <span className="offer-banner__code">code HAPPYSUMMER</span>
      </a>
      <button className="offer-banner__close" onClick={close} aria-label="Fermer le bandeau">
        ×
      </button>
    </div>
  );
}
