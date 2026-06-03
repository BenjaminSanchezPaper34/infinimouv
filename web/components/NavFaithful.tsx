"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS = [
  ["/#nos-avantages", "La salle"],
  ["/services-equipements#cours", "Cours"],
  ["/#tarifs", "Tarifs"],
  ["/#contact", "Contact"],
];

export default function NavFaithful() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav__in">
        <a className="nav__logo" href="/" aria-label="Accueil Infini Mouv">
          <Image
            src="/images/logo-infinimouv.webp"
            alt="Infini Mouv"
            width={367}
            height={49}
            priority
          />
        </a>

        <nav
          id="navlinks"
          aria-label="Navigation principale"
          className={`nav__links${open ? " open" : ""}`}
        >
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__social">
          <a
            href="https://www.facebook.com/infinimouvagde/"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/infinimouv_agde/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <button
          className="nav__burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
