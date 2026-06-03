"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll (Lenis) + reveal au scroll (IntersectionObserver sur [data-reveal]).
 * Respecte prefers-reduced-motion : pas de smooth scroll, reveal instantané.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    let raf = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const delay = el.dataset.revealDelay;
              if (delay) el.style.transitionDelay = `${delay}ms`;
              el.classList.add("is-in");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      els.forEach((el) => io.observe(el));

      // Filet de sécurité : si l'IntersectionObserver n'a rien révélé
      // (environnements headless/viewport 0×0, JS partiel…), on affiche tout
      // pour ne jamais laisser de contenu invisible.
      const safety = window.setTimeout(() => {
        const revealed = document.querySelectorAll("[data-reveal].is-in").length;
        if (revealed === 0) {
          els.forEach((el) => el.classList.add("is-in"));
        }
      }, 1200);

      return () => {
        clearTimeout(safety);
        io.disconnect();
        cancelAnimationFrame(raf);
        lenis?.destroy();
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
