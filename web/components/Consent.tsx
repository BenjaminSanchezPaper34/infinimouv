"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Consentement aux traceurs tiers (CNIL / RGPD)
   Les services tiers (Elfsight, Google Maps) déposent des cookies :
   ils ne doivent PAS être chargés avant un consentement explicite.
   Ce contexte expose l'état du consentement ; les composants concernés
   ne se montent qu'une fois « accepté ».
   ------------------------------------------------------------------ */
const KEY = "im-consent-tiers"; // "granted" | "denied"

type Etat = "inconnu" | "granted" | "denied";

const ConsentContext = createContext<{ etat: Etat; accepter: () => void; refuser: () => void }>({
  etat: "inconnu",
  accepter: () => {},
  refuser: () => {},
});

export const useConsent = () => useContext(ConsentContext);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [etat, setEtat] = useState<Etat>("inconnu");
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") setEtat(v);
    } catch {}
    setPret(true);
  }, []);

  const enregistrer = (v: "granted" | "denied") => {
    setEtat(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  };

  return (
    <ConsentContext.Provider
      value={{ etat, accepter: () => enregistrer("granted"), refuser: () => enregistrer("denied") }}
    >
      {children}
      {pret && etat === "inconnu" && (
        <div className="consent" role="dialog" aria-live="polite" aria-label="Gestion des cookies">
          <div className="consent__texte">
            <strong>Cookies et services tiers</strong>
            <p>
              Ce site utilise des services externes (avis Google, Instagram,
              formulaire de contact, carte) qui déposent des cookies. Ils ne sont
              chargés qu&apos;avec votre accord.{" "}
              <a href="/confidentialite">En savoir plus</a>
            </p>
          </div>
          <div className="consent__actions">
            <button className="btn btn--ghost consent__btn" onClick={() => enregistrer("denied")}>
              Refuser
            </button>
            <button className="btn btn--solid consent__btn" onClick={() => enregistrer("granted")}>
              Accepter
            </button>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
}

/** Encadré affiché à la place d'un contenu tiers non chargé (refus ou choix non fait). */
export function ContenuBloque({ titre, children }: { titre: string; children?: React.ReactNode }) {
  const { accepter } = useConsent();
  return (
    <div className="bloque">
      <p className="bloque__titre">{titre}</p>
      <p className="bloque__texte">
        {children ?? "Ce contenu provient d'un service externe qui dépose des cookies."}
      </p>
      <button className="btn btn--solid bloque__btn" onClick={accepter}>
        Autoriser et afficher
      </button>
    </div>
  );
}
