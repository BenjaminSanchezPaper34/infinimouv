export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="footer__symbol"
        src="/images/symbole-infinimouv-crop-u355.webp"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap footer__in">
        <div className="footer__info">
          <address>
            4 avenue du 11 novembre 1918,
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
          <p className="footer__copy">INFINIMOUV © 2026 Tous droits réservés</p>
        </div>
        <a className="footer__credit" href="http://paper34.fr" target="_blank" rel="noopener">
          Réalisé par <img src="/images/logoblanc-paper34.svg" alt="Paper34" />
        </a>
      </div>
    </footer>
  );
}
