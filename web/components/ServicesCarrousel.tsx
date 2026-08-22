"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Service = {
  titre: string;
  photo: string;
  texte: string;
  points: string[];
};

/* Cartes horizontales défilantes : la bande dépasse volontairement du cadre
   à droite pour signaler qu'il y a d'autres services à découvrir. */
export default function ServicesCarrousel({ services }: { services: Service[] }) {
  const piste = useRef<HTMLDivElement>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  const majFleches = () => {
    const el = piste.current;
    if (!el) return;
    setDebut(el.scrollLeft <= 4);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    majFleches();
    const el = piste.current;
    if (!el) return;
    el.addEventListener("scroll", majFleches, { passive: true });
    window.addEventListener("resize", majFleches);
    return () => {
      el.removeEventListener("scroll", majFleches);
      window.removeEventListener("resize", majFleches);
    };
  }, []);

  /* Défilement animé « maison » : scrollBy({behavior:"smooth"}) n'est pas
     appliqué de façon fiable partout, on pilote donc l'animation nous-mêmes. */
  const defiler = (sens: 1 | -1) => {
    const el = piste.current;
    if (!el) return;
    const carte = el.querySelector<HTMLElement>(".svc-carte");
    const pas = (carte ? carte.offsetWidth + 20 : el.clientWidth * 0.8) * sens;
    const depart = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const cible = Math.max(0, Math.min(depart + pas, max));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = cible;
      majFleches();
      return;
    }

    const duree = 420;
    const t0 = performance.now();
    const anim = (t: number) => {
      const p = Math.min(1, (t - t0) / duree);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.scrollLeft = depart + (cible - depart) * e;
      if (p < 1) requestAnimationFrame(anim);
      else majFleches();
    };
    requestAnimationFrame(anim);
  };

  return (
    <div className="svc-carrousel">
      <div
        className="svc-piste"
        ref={piste}
        tabIndex={0}
        role="region"
        aria-label="Nos services et équipements — faites défiler horizontalement"
      >
        {services.map((sv, i) => (
          <article className="svc-carte" key={sv.titre}>
            <div className="svc-carte__media">
              <Image
                src={`/images/${sv.photo}`}
                alt={sv.titre}
                width={720}
                height={520}
                sizes="(min-width: 900px) 380px, 80vw"
              />
              <span className="svc-carte__num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="svc-carte__corps">
              <h3 className="svc-carte__titre">{sv.titre}</h3>
              <p className="svc-carte__desc">{sv.texte}</p>
              <ul className="svc-carte__points">
                {sv.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="svc-nav" aria-hidden="true">
        <button
          className="svc-nav__btn"
          onClick={() => defiler(-1)}
          disabled={debut}
          aria-label="Services précédents"
        >
          ‹
        </button>
        <button
          className="svc-nav__btn"
          onClick={() => defiler(1)}
          disabled={fin}
          aria-label="Services suivants"
        >
          ›
        </button>
      </div>
    </div>
  );
}
