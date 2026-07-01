"use client";

import { useEffect, useState } from "react";

/* Offre estivale — popup au chargement.
   S'affiche jusqu'au 31 juillet inclus, puis disparaît automatiquement.
   Ne réapparaît pas une fois fermée (mémorisé en localStorage). */
const END = new Date("2026-08-01T00:00:00"); // borne : après le 31/07, plus de popup
const STORAGE_KEY = "im-offer-happysummer";
const IMG = "/images/offre-happysummer.jpg";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (new Date() >= END) return; // offre terminée
    try {
      if (localStorage.getItem(STORAGE_KEY) === "closed") return; // déjà fermée
    } catch {}
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "closed");
    } catch {}
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="offer"
      role="dialog"
      aria-modal="true"
      aria-label="Offre spéciale été"
      onClick={close}
    >
      <div className="offer__box" onClick={(e) => e.stopPropagation()}>
        <button className="offer__close" onClick={close} aria-label="Fermer">
          ×
        </button>
        <a href="/#contact" className="offer__link" onClick={close}>
          {/* Visuel fourni par le client */}
          <img
            src={IMG}
            alt="Jusqu'au 31 juillet : 1 abonnement acheté = 1 abonnement offert avec le code HAPPYSUMMER"
          />
        </a>
      </div>
    </div>
  );
}
