import type { Cours } from "@/components/PlanningCours";

/* ------------------------------------------------------------------
   Cours collectifs — SOURCE UNIQUE des descriptions.
   Les horaires ne sont PAS ici : ils viennent du planning
   (components/PlanningCours.tsx) via creneauxDe(type).
   Couleur = celle du cours sur le planning d'origine.
   ------------------------------------------------------------------ */

export type FicheCours = {
  type: Cours["type"];
  titre: string;
  couleur: string;
  texte: string;
};

/* Ordre éditorial : Pilates et Yoga en tête (requêtes Search Console en hausse). */
export const COURS: FicheCours[] = [
  { type: "pilate", titre: "Pilates", couleur: "#8a3fc0", texte: "Renforcement profond, posture, contrôle et respiration : un travail centré sur les muscles stabilisateurs." },
  { type: "yoga", titre: "Yoga", couleur: "#5aad12", texte: "Postures pour mieux connaître votre corps et vous détendre, avec Thomas. Accessible à tous, quel que soit l'âge." },
  { type: "pump", titre: "Body Pump", couleur: "#2b7fd4", texte: "Renforcement musculaire sur l'ensemble du corps, en musique et avec charges légères à modérées." },
  { type: "sculpt", titre: "Body Sculpt", couleur: "#0f8a7e", texte: "Nouveau au planning : un renforcement musculaire qui tonifie le corps de manière équilibrée." },
  { type: "caf", titre: "C.A.F. — Cuisses Abdos Fessiers", couleur: "#e8821e", texte: "Un renforcement complet du bas du corps et de la sangle abdominale. Idéal pour tonifier, sculpter et améliorer la stabilité." },
  { type: "stretching", titre: "Stretching", couleur: "#e0392b", texte: "Des étirements doux pour assouplir le corps, améliorer la mobilité, récupérer et libérer les tensions." },
  { type: "zumba", titre: "Zumba", couleur: "#d6275e", texte: "Cardio, fun et énergie ! Une séance dansée mêlant salsa, reggaeton, samba… parfaite pour brûler des calories en s'amusant." },
  { type: "cross", titre: "Cross Training", couleur: "#0070a7", texte: "Enchaînement d'exercices cardio et musculaires avec différents matériels, dans notre espace extérieur couvert." },
];
