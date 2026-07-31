"use client";

import { useEffect, useState } from "react";

/* Offre estivale (prolongée en août) — popup au chargement.
   S'affiche jusqu'au 31 août inclus, puis disparaît automatiquement.
   Ne réapparaît pas une fois fermée (mémorisé en localStorage).
   Clé « -aout » : ceux qui avaient fermé la version juillet revoient la prolongation. */
const END = new Date("2026-09-01T00:00:00"); // borne : après le 31/08, plus de popup
const STORAGE_KEY = "im-offer-happysummer-aout";

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
          {/* Portrait sur mobile, paysage sur desktop (WebP optimisés) */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/offre-happysummer-aout-mobile.webp" />
            <img
              src="/images/offre-happysummer-aout.webp"
              alt="Prolongation tout le mois d'août : 1 abonnement acheté = 1 abonnement offert avec le code HAPPYSUMMER"
            />
          </picture>
        </a>
      </div>
    </div>
  );
}
