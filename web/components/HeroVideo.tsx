"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo de fond du hero.
 *
 * Trois garde-fous, parce qu'une vidéo en autoplay échoue silencieusement :
 *
 * 1. `preload="auto"` — `autoplay` avec `preload="metadata"` se contredisent :
 *    on demande au navigateur de démarrer tout seul tout en lui disant de ne
 *    pas précharger les données. Sur réseau lent, le visiteur reste sur le
 *    poster.
 * 2. Filet de rattrapage — si le navigateur refuse l'autoplay (mode économie
 *    d'énergie sur iPhone et Mac, réglage « bloquer les vidéos », économiseur
 *    de données), on relance à la première interaction. Muet : aucun son ne
 *    peut surprendre le visiteur.
 * 3. `prefers-reduced-motion` — une vidéo en boucle plein écran est exactement
 *    ce que ce réglage demande de supprimer : on s'arrête sur le poster.
 *
 * `muted` est aussi forcé en JS : React ne reflète pas toujours cet attribut
 * dans le DOM, et un `<video>` non muet ne démarre jamais seul.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Mouvement réduit : on garde l'image fixe du poster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }

    v.muted = true; // indispensable : sans ça, le navigateur refuse de démarrer

    let nettoyer: (() => void) | undefined;

    const lancer = () => {
      v.play().catch(() => {
        // Refus du navigateur : on retente à la première interaction.
        const relancer = () => {
          v.play().catch(() => {});
          nettoyer?.();
        };
        const evts = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
        evts.forEach((e) =>
          window.addEventListener(e, relancer, { once: true, passive: true })
        );
        nettoyer = () =>
          evts.forEach((e) => window.removeEventListener(e, relancer));
      });
    };

    lancer();
    return () => nettoyer?.();
  }, []);

  return (
    <video
      ref={ref}
      className="hero__video"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/images/hero-poster.webp"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/video/horizontal.webm" type="video/webm" />
      <source src="/video/horizontal.mp4" type="video/mp4" />
    </video>
  );
}
