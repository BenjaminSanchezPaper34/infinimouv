/* Planning des cours collectifs — version native (texte + blocs).
   Remplace l'ancienne image SVG : contenu réellement lisible par Google et les IA,
   et responsive (l'image était illisible sur mobile).
   Design et couleurs repris à l'identique du visuel d'origine. */

type Cours = {
  nom: string;
  debut: string; // format 24h "12:15" (attribut datetime)
  fin: string;
  type: "caf" | "zumba" | "pump" | "cross" | "pilate" | "stretching" | "yoga" | "sculpt";
  nouveau?: boolean;
};

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"] as const;

const MIDI: Record<string, Cours[]> = {
  Lundi: [{ nom: "Body Sculpt", debut: "12:15", fin: "13:00", type: "sculpt", nouveau: true }],
  Mardi: [{ nom: "Body Pump", debut: "12:15", fin: "13:00", type: "pump" }],
  Mercredi: [{ nom: "C.A.F.", debut: "12:15", fin: "13:00", type: "caf" }],
  Jeudi: [{ nom: "Pilate", debut: "12:15", fin: "13:00", type: "pilate" }],
  Vendredi: [{ nom: "Stretching", debut: "12:15", fin: "13:00", type: "stretching" }],
};

const SOIR: Record<string, Cours[]> = {
  Lundi: [{ nom: "Cross Training", debut: "18:00", fin: "19:00", type: "cross" }],
  Mardi: [
    { nom: "C.A.F.", debut: "18:00", fin: "18:30", type: "caf" },
    { nom: "Body Pump", debut: "18:30", fin: "19:00", type: "pump" },
    { nom: "Stretching", debut: "19:00", fin: "19:30", type: "stretching" },
  ],
  Mercredi: [{ nom: "Yoga", debut: "18:15", fin: "19:00", type: "yoga" }],
  Jeudi: [
    { nom: "Body Pump", debut: "18:00", fin: "18:30", type: "pump" },
    { nom: "Zumba", debut: "18:30", fin: "19:15", type: "zumba" },
    { nom: "Pilate", debut: "19:15", fin: "19:45", type: "pilate" },
  ],
  Vendredi: [{ nom: "Cross Training", debut: "18:00", fin: "19:00", type: "cross" }],
};

/** "12:15" -> "12h15" (affichage FR) */
const fr = (h: string) => h.replace(":", "h");

function Creneau({ cours }: { cours: Cours }) {
  return (
    <li className={`pl-cours pl-cours--${cours.type}`}>
      <span className="pl-cours__nom">{cours.nom}</span>
      {cours.nouveau && <span className="pl-cours__new">Nouveau</span>}{" "}
      <span className="pl-cours__h">
        <time dateTime={cours.debut}>{fr(cours.debut)}</time>
        {"–"}
        <time dateTime={cours.fin}>{fr(cours.fin)}</time>
      </span>
    </li>
  );
}

function Bande({
  titre,
  plage,
  data,
}: {
  titre: string;
  plage: string;
  data: Record<string, Cours[]>;
}) {
  return (
    <section className="pl-bande" aria-label={`Cours du ${titre.toLowerCase()}`}>
      <p className="pl-bande__titre">
        {titre} <span className="pl-bande__plage">{plage}</span>
      </p>
      <div className="pl-grille">
        {JOURS.map((jour) => (
          <div className="pl-jour" key={jour}>
            <h3 className="pl-jour__nom">{jour}</h3>
            {data[jour]?.length ? (
              <ul className="pl-jour__liste">
                {data[jour].map((c) => (
                  <Creneau cours={c} key={`${jour}-${c.nom}-${c.debut}`} />
                ))}
              </ul>
            ) : (
              <p className="pl-jour__vide">—</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PlanningCours() {
  return (
    <div className="planning-natif">
      <Bande titre="Midi" plage="12h – 13h15" data={MIDI} />
      <Bande titre="Soir" plage="18h – 19h45" data={SOIR} />
      <p className="pl-note">
        Réservation via l&apos;application Xplor Active (code centre&nbsp;:{" "}
        <strong>infinimouv</strong>) ou directement à l&apos;accueil du club.
        Planning susceptible d&apos;évoluer — horaires affichés au club.
      </p>
    </div>
  );
}
