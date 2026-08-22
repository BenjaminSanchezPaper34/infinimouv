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
  /* Planning hebdomadaire avec créneaux — cours collectifs */
  collectifs: (
    <svg {...base} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.6" />
      <path d="M3 10h18M8.5 3v4M15.5 3v4" />
      <rect x="6.2" y="12.4" width="4.6" height="2.4" rx="1" fill="currentColor" stroke="none" />
      <rect x="13.2" y="12.4" width="4.6" height="2.4" rx="1" fill="currentColor" stroke="none" />
      <rect x="6.2" y="16.6" width="4.6" height="2.4" rx="1" fill="currentColor" stroke="none" opacity=".45" />
      <rect x="13.2" y="16.6" width="4.6" height="2.4" rx="1" fill="currentColor" stroke="none" />
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
  /* Horloge — accès libre 7j/7 */
  horaires: (
    <svg {...base} aria-hidden="true">
      <circle cx="13" cy="12" r="8.4" />
      <path d="M13 7.6V12l3 2.2" />
      <path d="M4.2 6.2a9.6 9.6 0 0 0 0 11.6" />
    </svg>
  ),
  /* Flux d'air filtré — air purifié */
  air: (
    <svg {...base} aria-hidden="true">
      <path d="M12.5 6.4h5.2a2.3 2.3 0 1 0-2.3-2.3" />
      <path d="M12.5 12h7a2.3 2.3 0 1 1-2.3 2.3" />
      <path d="M12.5 17.6h4.4a2.3 2.3 0 1 0-2.3 2.3" />
      <path d="M3.4 6.4h4.8M3.4 12h5.4M3.4 17.6h4.2" />
    </svg>
  ),
} as const;

export type CleIcone = keyof typeof ICONES;
