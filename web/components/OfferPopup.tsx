"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/Consent";
import { OFFRE, CLE_POPUP, offreEnCours, popupDisponible, tempsFortEnCours } from "@/lib/offre";

/* Popup de la promotion en cours (configuration : lib/offre.ts).
   Ne réapparaît pas une fois fermé (mémorisé en localStorage).
   Coupé sur un format tant que son visuel n'est pas déposé. */
export const EVENT_FERME = "im-offer-popup-closed";

/* Délai avant apparition. Sur mobile l'écran est petit : on laisse le
   visiteur voir la page d'abord. */
const DELAI_MOBILE = 2600;
const DELAI_DESKTOP = 900;

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const { pret } = useConsent();

  // Un temps fort avec visuel (soirée des 10 ans) remplace le popup du mois,
  // sur tous les formats et avec sa propre clé de mémorisation.
  const special = typeof window === "undefined" ? null : tempsFortEnCours()?.popup ?? null;
  const cle = special ? special.cle : CLE_POPUP;

  useEffect(() => {
    if (!offreEnCours() || !pret) return;
    if (!special && !popupDisponible()) return;
    try {
      if (localStorage.getItem(cle) === "closed") return; // déjà fermé
    } catch {}
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const t = setTimeout(() => setOpen(true), mobile ? DELAI_MOBILE : DELAI_DESKTOP);
    return () => clearTimeout(t);
  }, [pret, cle, special]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(cle, "closed");
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
      aria-label={`Offre en cours : ${OFFRE.bandeau.accroche}`}
      onClick={close}
    >
      <div className={`offer__box${special ? " offer__box--portrait" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="offer__close" onClick={close} aria-label="Fermer">
          ×
        </button>
        {special ? (
          <a href="/#soiree" className="offer__link" onClick={close}>
            <img src={special.visuel} alt={special.alt} />
          </a>
        ) : (
          <a href="/#contact" className="offer__link" onClick={close}>
            {/* Portrait sur mobile, paysage sur desktop (WebP optimisés) */}
            <picture>
              <source media="(max-width: 640px)" srcSet={OFFRE.popup.visuelMobile} />
              <img src={OFFRE.popup.visuel} alt={OFFRE.popup.alt} />
            </picture>
          </a>
        )}
      </div>
    </div>
  );
}
