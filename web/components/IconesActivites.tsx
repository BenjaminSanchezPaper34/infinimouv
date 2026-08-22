/* Icônes des activités — tracé simple, monochrome, dans la charte.
   Remplacent les emojis (rendu plus professionnel et cohérent). */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ICONES = {
  /* Haltère — musculation */
  musculation: (
    <svg {...base} aria-hidden="true">
      <path d="M6.5 6.5v11M3 9.5v5M17.5 6.5v11M21 9.5v5M6.5 12h11" />
    </svg>
  ),
  /* Courbe cardiaque — cardio */
  cardio: (
    <svg {...base} aria-hidden="true">
      <path d="M3 12h3.5l2-6 3.5 12 2.5-8 1.5 2H21" />
    </svg>
  ),
  /* Vélo — bike */
  bike: (
    <svg {...base} aria-hidden="true">
      <circle cx="5.5" cy="17" r="3.5" />
      <circle cx="18.5" cy="17" r="3.5" />
      <path d="M9 6.5h2.5l3.5 10.5M5.5 17l4-7h6" />
    </svg>
  ),
  /* Cible — coaching */
  coaching: (
    <svg {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  /* Groupe — cours collectifs */
  collectifs: (
    <svg {...base} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20.5a6 6 0 0 1 12 0" />
      <path d="M16.5 5.3a3.2 3.2 0 0 1 0 6M18 20.5a6 6 0 0 0-2.6-4.9" />
    </svg>
  ),
  /* Kettlebell — cross training */
  cross: (
    <svg {...base} aria-hidden="true">
      <path d="M9.6 9.2V7.6a2.4 2.4 0 0 1 4.8 0v1.6" />
      <path d="M12 9.2c-3.4 0-6.1 2.8-6.1 6.1 0 2.8 2.5 4.7 6.1 4.7s6.1-1.9 6.1-4.7c0-3.3-2.7-6.1-6.1-6.1z" />
    </svg>
  ),
  /* Feuille — plan alimentaire */
  nutrition: (
    <svg {...base} aria-hidden="true">
      <path d="M20 4c0 8-5 12-11 12-2 0-3.5-.6-3.5-.6S6 9 12.5 7C17 5.6 20 4 20 4z" />
      <path d="M4 20c1.5-4 4-7 8.5-9" />
    </svg>
  ),
} as const;

export type CleIcone = keyof typeof ICONES;
