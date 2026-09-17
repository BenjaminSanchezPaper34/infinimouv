"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo de fond du hero.
 *
 * Le piège : `autoplay` ne se déclenche QU'UNE FOIS, au chargement. Si la page
 * se charge en arrière-plan (onglet ouvert en second plan, session restaurée,
 * visiteur sur une autre application), le navigateur garde la vidéo à l'arrêt —
 * et il ne la relance jamais de lui-même quand la page redevient visible.
 * Mesuré en production : `play()` est accepté, mais `currentTime` reste à 0
 * tant que `visibilityState` vaut `hidden`. Le visiteur reste sur le poster,
 * définitivement.
 *
 * On ne tente donc pas la lecture une fois, on la (re)tente à chaque occasion
 * où elle peut enfin aboutir : page redevenue visible, hero entré dans l'écran,
 * première interaction. Chaque tentative sort immédiatement si la vidéo tourne
 * déjà, donc ça ne coûte rien.
 *
 * Deux détails qui font échouer silencieusement une vidéo autoplay :
 * `preload="auto"` (avec `metadata`, on interdit le préchargement tout en
 * demandant un démarrage automatique) et `muted` forcé en JS (React ne reflète
 * pas toujours cet attribut, et un `<video>` non muet ne démarre jamais seul).
 *
 * `prefers-reduced-motion` : une vidéo en boucle plein écran est exactement ce
 * que ce réglage demande de supprimer — on s'arrête alors sur le poster.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }

    v.muted = true; // sans ça, le navigateur refuse de démarrer
    let fini = false;

    const essayer = () => {
      if (fini || !v.isConnected) return;
      // Inutile tant que la page est cachée : le navigateur accepte l'appel
      // mais ne fait pas avancer la lecture.
      if (document.visibilityState !== "visible") return;
      if (!v.paused && !v.ended) return; // déjà en lecture
      v.play().catch(() => {
        /* Refus (économie d'énergie, réglage du navigateur) : une prochaine
           occasion se présentera, on ne fait pas de bruit. */
      });
    };

    // Toutes les occasions où la lecture peut enfin aboutir
    document.addEventListener("visibilitychange", essayer);
    window.addEventListener("pageshow", essayer);
    window.addEventListener("focus", essayer);
    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", essayer, opts);
    window.addEventListener("touchstart", essayer, opts);
    window.addEventListener("scroll", essayer, opts);
    window.addEventListener("keydown", essayer);

    // Le hero entre dans l'écran (retour en haut de page, ancre…)
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && essayer(),
      { threshold: 0.05 }
    );
    io.observe(v);

    // Relances rapprochées au démarrage : l'élément peut ne pas être prêt
    // au tout premier passage.
    const minuteurs = [0, 250, 1000, 3000].map((d) => window.setTimeout(essayer, d));

    return () => {
      fini = true;
      minuteurs.forEach(clearTimeout);
      io.disconnect();
      document.removeEventListener("visibilitychange", essayer);
      window.removeEventListener("pageshow", essayer);
      window.removeEventListener("focus", essayer);
      window.removeEventListener("pointerdown", essayer);
      window.removeEventListener("touchstart", essayer);
      window.removeEventListener("scroll", essayer);
      window.removeEventListener("keydown", essayer);
    };
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
