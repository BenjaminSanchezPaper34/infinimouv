"use client";

import { useEffect, useState } from "react";

/* Bandeau de rappel de l'offre estivale (prolongée) — fixé en bas, fermable,
   disparaît automatiquement après le 31 août. */
const END = new Date("2026-09-01T00:00:00");
const STORAGE_KEY = "im-offer-banner-happysummer-aout";

export default function OfferBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (new Date() >= END) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "closed") return;
    } catch {}
    setShow(true);
  }, []);

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
