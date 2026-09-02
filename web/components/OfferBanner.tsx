"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/Consent";
import { EVENT_FERME } from "@/components/OfferPopup";

/* Bandeau de rappel de l'offre estivale (prolongée) — fixé en bas, fermable,
   disparaît automatiquement après le 31 août. */
const END = new Date("2026-09-26T00:00:00"); // l'offre court jusqu'au 25/09 inclus (confirmé)
const STORAGE_KEY = "im-offer-banner-rentree-2026";
const POPUP_KEY = "im-offer-rentree-2026"; // clé du popup : a-t-il déjà été traité ?

export default function OfferBanner() {
  const [show, setShow] = useState(false);
  const { pret } = useConsent();

  useEffect(() => {
    if (new Date() >= END) return;
    // Une sollicitation à la fois…
    if (!pret) return;
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
  }, [pret]);

  if (!show) return null;

  /* Compte à rebours : jours restants, 25/09 inclus. Calculé au montage,
     côté client uniquement (le bandeau n'est jamais rendu au serveur). */
  const joursRestants = Math.max(1, Math.ceil((END.getTime() - Date.now()) / 86_400_000));
  const compteur = joursRestants === 1 ? "Dernier jour" : `Encore ${joursRestants} jours`;

  function close() {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "closed");
    } catch {}
  }

  return (
    <div className="offer-banner" role="region" aria-label="Offre en cours">
      <a href="/tarifs" className="offer-banner__text">
        {compteur} pour profiter de <strong>8 semaines offertes</strong>{" "}
        sur l&apos;abonnement 12&nbsp;mois
        <span className="offer-banner__code">jusqu&apos;au 25/09</span>
      </a>
      <button className="offer-banner__close" onClick={close} aria-label="Fermer le bandeau">
        ×
      </button>
    </div>
  );
}
