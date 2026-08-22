/* Icônes des activités — style repris des icônes de cartes (héritage charte Muse) :
   traits épais arrondis, aplats, et les 3 verts de la charte.
   Vert foncé #006935 · vert médian #2E9E42 · lime #9DD800 */

const FONCE = "#006935";
const MEDIAN = "#2E9E42";
const LIME = "#9DD800";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ICONES = {
  /* Haltère */
  musculation: (
    <svg {...base} aria-hidden="true">
      <path d="M7 7v10" stroke={FONCE} />
      <path d="M17 7v10" stroke={FONCE} />
      <path d="M7 12h10" stroke={MEDIAN} />
      <path d="M3.2 9.5v5" stroke={LIME} />
      <path d="M20.8 9.5v5" stroke={LIME} />
    </svg>
  ),
  /* Courbe cardiaque */
  cardio: (
    <svg {...base} aria-hidden="true">
      <path d="M12 20.6S4 15.4 4 9.9a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 5.5-8 10.7-8 10.7z" stroke={MEDIAN} />
      <path d="M7 11.4h2.3l1.4-2.5 1.9 4.7 1.3-2.2H17" stroke={FONCE} />
      <path d="M20.6 4.6a2.3 2.3 0 0 1 0 3.6" stroke={LIME} />
    </svg>
  ),
  /* Vélo */
  bike: (
    <svg {...base} aria-hidden="true">
      <circle cx="5.6" cy="16.8" r="3.9" stroke={FONCE} />
      <circle cx="18.4" cy="16.8" r="3.9" stroke={FONCE} />
      <path d="M5.6 16.8 9.6 9.8h5.6l3.2 7" stroke={MEDIAN} />
      <path d="M9 5.6h3.1" stroke={LIME} />
    </svg>
  ),
  /* Cible */
  coaching: (
    <svg {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" stroke={LIME} />
      <circle cx="12" cy="12" r="4.4" stroke={MEDIAN} />
      <circle cx="12" cy="12" r="0.6" stroke={FONCE} />
    </svg>
  ),
  /* Planning hebdomadaire (cours collectifs) */
  collectifs: (
    <svg {...base} aria-hidden="true">
      <rect x="3" y="5.2" width="18" height="15.6" rx="2.8" stroke={FONCE} />
      <path d="M3 10.2h18" stroke={FONCE} />
      <path d="M8.4 2.9v4M15.6 2.9v4" stroke={MEDIAN} />
      <rect x="6.4" y="13" width="4.4" height="2.2" rx="1.1" fill={MEDIAN} />
      <rect x="13.2" y="13" width="4.4" height="2.2" rx="1.1" fill={LIME} />
      <rect x="6.4" y="17" width="4.4" height="2.2" rx="1.1" fill={LIME} />
    </svg>
  ),
  /* Kettlebell */
  cross: (
    <svg {...base} aria-hidden="true">
      <path d="M12 9.4c-3.5 0-6.3 2.9-6.3 6.3 0 2.8 2.6 4.7 6.3 4.7s6.3-1.9 6.3-4.7c0-3.4-2.8-6.3-6.3-6.3z" stroke={FONCE} />
      <path d="M9.4 9.4V7.7a2.6 2.6 0 0 1 5.2 0v1.7" stroke={LIME} />
    </svg>
  ),
  /* Feuille */
  nutrition: (
    <svg {...base} aria-hidden="true">
      <path d="M20.4 3.6c0 8.4-5.2 12.6-11.2 12.6-2.1 0-3.6-.7-3.6-.7s.6-6.6 7.2-8.8c4.6-1.5 7.6-3.1 7.6-3.1z" stroke={MEDIAN} />
      <path d="M3.6 20.4c1.6-4.2 4.2-7.3 8.8-9.4" stroke={FONCE} />
      <path d="M6.6 4.4a2.4 2.4 0 1 0 0 4.8" stroke={LIME} />
    </svg>
  ),
} as const;

export type CleIcone = keyof typeof ICONES;
