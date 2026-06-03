"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["#services", "La salle"],
  ["#offre", "Tarifs"],
  ["#contact", "Contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md shadow-[var(--shadow-sm)]"
          : "bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      <nav className="im-container flex h-16 items-center justify-between">
        <a
          href="#top"
          className={`font-display text-xl tracking-tight transition-colors ${
            scrolled ? "text-green-700" : "text-white"
          }`}
        >
          Infini&nbsp;Mouv
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors hover:text-green-500 ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="tel:0986673838"
            className="rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-green-600"
          >
            S’inscrire
          </a>
        </div>

        {/* Burger mobile */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center md:hidden ${
            scrolled ? "text-ink" : "text-white"
          }`}
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Panneau mobile */}
      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="im-container flex flex-col gap-1 py-4">
            {LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 font-semibold text-ink hover:bg-green-50"
              >
                {label}
              </a>
            ))}
            <a
              href="tel:0986673838"
              className="mt-2 rounded-full bg-green-700 px-5 py-3 text-center font-semibold text-white"
            >
              S’inscrire
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
