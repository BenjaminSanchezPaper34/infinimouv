import PaperSignature from "@/components/PaperSignature";

/* Fumée de la signature aux verts Infini Mouv (la fumée est additive sur le
   fond sombre du footer : on part des teintes les plus lumineuses de la DA). */
const FUMEE_INFINIMOUV = [
  { r: 0.62, g: 0.85, b: 0.0 },  // lime #9dd800 — l'accent de la charte
  { r: 0.18, g: 0.62, b: 0.26 }, // vert médian #2e9e42
  { r: 0.0, g: 0.55, b: 0.28 },  // vert signature #006935, poussé pour lire sur le noir
  { r: 0.78, g: 0.94, b: 0.38 }, // lime clair #c6ef62 — les pointes de lumière
];

import { LienPreferences } from "@/components/Consent";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div className="footer__info">
          <address>
            4 avenue du 11 Novembre 1918,
            <br />
            34300 AGDE <span className="footer__muted">(parking du cinéma)</span>
          </address>
          <div className="footer__row">
            <div className="footer__social">
              <a href="https://www.facebook.com/infinimouvagde/" target="_blank" rel="noopener" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/infinimouv_agde/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
            <a className="footer__phone" href="tel:+33986673838">09 86 67 38 38</a>
          </div>
          <p className="footer__copy">
            INFINIMOUV{" "}
            {/* Bouton caché : le © mène à la prévisualisation de l'inscription
                en ligne (page noindex, hors nav et sitemap). */}
            <a className="footer__copy-lien" href="/inscription-en-ligne">©</a>{" "}
            2026 Tous droits réservés
          </p>
          <nav className="footer__legal" aria-label="Informations légales">
            <a href="/mentions-legales">Mentions légales</a>
            <span aria-hidden="true">·</span>
            <a href="/confidentialite">Confidentialité &amp; cookies</a>
            <span aria-hidden="true">·</span>
            <LienPreferences />
            <span aria-hidden="true">·</span>
            <a href="/tarifs">Tarifs</a>
          </nav>
        </div>
        <div className="footer__deco" aria-hidden="true">
          <img src="/images/symbole-infinimouv-crop-u355.webp" alt="" />
        </div>
        {/* Signature officielle Paper34 (kit) — fumée fluide au survol du logo */}
        <div className="footer__credit-zone">
          <PaperSignature smoke={FUMEE_INFINIMOUV} />
        </div>
      </div>
    </footer>
  );
}
