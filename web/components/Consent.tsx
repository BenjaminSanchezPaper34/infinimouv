"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Services externes — modèle opt-out Paper34 (CNIL / RGPD)
   Aucun bandeau à l'arrivée : les services d'affichage (avis, Instagram,
   formulaire Elfsight ; carte Google Maps) sont actifs par défaut. Le
   visiteur peut les couper à tout moment depuis « Préférences de
   confidentialité » en pied de page ; le refus est mémorisé dans le
   navigateur (clé `im-off-<service>`) et relu au chargement suivant.
   Couper un service déjà chargé impose un rechargement : un script tiers
   exécuté ne se retire pas.
   Référence studio : 2026/LA GUINGUETTE - BESSAN/site/index.html
   ------------------------------------------------------------------ */

export type Service = "elfsight" | "maps";

const SERVICES: { id: Service; nom: string; detail: string }[] = [
  { id: "elfsight", nom: "Avis, Instagram et formulaire", detail: "Elfsight" },
  { id: "maps", nom: "Carte de localisation", detail: "Google Maps" },
];

const cle = (s: Service) => `im-off-${s}`;
const estCoupe = (s: Service) => {
  try { return localStorage.getItem(cle(s)) === "off"; } catch { return false; }
};
/* Elfsight mémorise ses propres états (pastille fermée, etc.) : on les purge
   pour que le widget revienne entier quand le visiteur le réactive. */
const purgerElfsight = () => {
  try {
    [localStorage, sessionStorage].forEach((st) => {
      Object.keys(st).forEach((k) => { if (/elfsight|eapps/i.test(k)) st.removeItem(k); });
    });
  } catch {}
};

type Ctx = {
  pret: boolean;                         // localStorage relu : on peut décider
  actif: (s: Service) => boolean;
  rallumer: (s: Service) => void;
  ouvrirPrefs: () => void;
};

const ConsentContext = createContext<Ctx>({
  pret: false,
  actif: () => true,
  rallumer: () => {},
  ouvrirPrefs: () => {},
});

export const useConsent = () => useContext(ConsentContext);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [pret, setPret] = useState(false);
  const [coupes, setCoupes] = useState<Set<Service>>(new Set());
  const [prefsOuvertes, setPrefsOuvertes] = useState(false);

  useEffect(() => {
    const s = new Set<Service>();
    SERVICES.forEach(({ id }) => { if (estCoupe(id)) s.add(id); });
    setCoupes(s);
    setPret(true);
    // Lien profond depuis la page confidentialité : /#preferences
    if (window.location.hash === "#preferences") setPrefsOuvertes(true);
  }, []);

  const actif = useCallback((s: Service) => pret && !coupes.has(s), [pret, coupes]);

  const rallumer = useCallback((s: Service) => {
    try { localStorage.removeItem(cle(s)); } catch {}
    if (s === "elfsight") purgerElfsight();
    setCoupes((prev) => { const n = new Set(prev); n.delete(s); return n; });
  }, []);

  const couper = (s: Service) => {
    try { localStorage.setItem(cle(s), "off"); } catch {}
    if (s === "elfsight") purgerElfsight();
    // Le script tiers est déjà exécuté : seul un rechargement le retire vraiment.
    window.location.reload();
  };

  useEffect(() => {
    if (!prefsOuvertes) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPrefsOuvertes(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prefsOuvertes]);

  return (
    <ConsentContext.Provider value={{ pret, actif, rallumer, ouvrirPrefs: () => setPrefsOuvertes(true) }}>
      {children}

      {/* Panneau de préférences : ouvert uniquement à la demande, jamais imposé */}
      {prefsOuvertes && (
        <div className="prefs" role="dialog" aria-modal="false" aria-labelledby="prefs-titre">
          <p className="prefs__titre" id="prefs-titre">Préférences de confidentialité</p>
          <p className="prefs__texte">
            Ces services externes enrichissent le site et déposent des cookies.
            Vous pouvez les désactiver à tout moment.{" "}
            <a href="/confidentialite">En savoir plus</a>
          </p>
          <ul className="prefs__liste">
            {SERVICES.map((sv) => {
              const on = !coupes.has(sv.id);
              return (
                <li key={sv.id} className="prefs__ligne">
                  <span className="prefs__nom">
                    {sv.nom} <small>({sv.detail})</small>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`${on ? "Désactiver" : "Activer"} : ${sv.nom}`}
                    className={`switch${on ? " est-actif" : ""}`}
                    onClick={() => (on ? couper(sv.id) : rallumer(sv.id))}
                  >
                    <span className="switch__pion" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="prefs__actions">
            <button type="button" className="prefs__fermer" onClick={() => setPrefsOuvertes(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
}

/** Encadré de repli quand un service est coupé : garde l'info utile + réactivation sur place. */
export function ContenuCoupe({
  service,
  titre,
  children,
}: {
  service: Service;
  titre: string;
  children?: React.ReactNode;
}) {
  const { rallumer } = useConsent();
  return (
    <div className="bloque">
      <p className="bloque__titre">{titre}</p>
      <p className="bloque__texte">
        {children ?? "Vous avez désactivé ce service externe dans vos préférences de confidentialité."}
      </p>
      <button type="button" className="btn btn--solid bloque__btn" onClick={() => rallumer(service)}>
        Réafficher
      </button>
    </div>
  );
}

/** Lien de pied de page qui ouvre le panneau (rendu comme un lien, agit comme un bouton). */
export function LienPreferences() {
  const { ouvrirPrefs } = useConsent();
  return (
    <button type="button" className="footer__lien-bouton" onClick={ouvrirPrefs}>
      Préférences de confidentialité
    </button>
  );
}
