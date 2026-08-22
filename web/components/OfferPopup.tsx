"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/Consent";

/* Offre estivale (prolongée en août) — popup au chargement.
   S'affiche jusqu'au 31 août inclus, puis disparaît automatiquement.
   Ne réapparaît pas une fois fermée (mémorisé en localStorage).
   Clé « -aout » : ceux qui avaient fermé la version juillet revoient la prolongation. */
const END = new Date("2026-09-01T00:00:00"); // borne : après le 31/08, plus de popup
const STORAGE_KEY = "im-offer-happysummer-aout";
export const EVENT_FERME = "im-offer-popup-closed";

/* Délais avant apparition, une fois le bandeau cookies traité.
   Sur mobile l'écran est petit : on laisse le visiteur voir la page d'abord. */
const DELAI_MOBILE = 2600;
const DELAI_DESKTOP = 900;

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const { etat, pret } = useConsent();

  useEffect(() => {
    if (new Date() >= END) return; // offre terminée
    // Jamais deux sollicitations en même temps : on attend que le choix
    // cookies soit fait (le bandeau n'est plus à l'écran) avant de proposer l'offre.
    if (!pret || etat === "inconnu") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "closed") return; // déjà fermée
    } catch {}
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const t = setTimeout(() => setOpen(true), mobile ? DELAI_MOBILE : DELAI_DESKTOP);
    return () => clearTimeout(t);
  }, [pret, etat]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "closed");
    } catch {}
    // Prévient le bandeau de rappel qu'il peut prendre le relais.
    window.dispatchEvent(new Event(EVENT_FERME));
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
