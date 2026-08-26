import Image from "next/image";

export type Service = { titre: string; photo: string; texte: string; points: string[] };

/* Grille des espaces — 3 colonnes, deux rangées.
   Les trois premières cartes portent une photo, les trois suivantes non :
   la rangée du bas prolonge la première sans la concurrencer visuellement.
   Aucun défilement latéral, aucun JavaScript : simple composant serveur. */
export default function ServicesGrille({ services }: { services: Service[] }) {
  return (
    <div className="svc-grille">
      {services.map((sv, i) => {
        const avecPhoto = i < 3;
        return (
          <article
            className={`svc-carte${avecPhoto ? "" : " svc-carte--sobre"}`}
            data-reveal
            data-reveal-delay={`${(i % 3) * 90}`}
            key={sv.titre}
          >
            {avecPhoto && (
              <div className="svc-carte__media">
                <Image
                  src={`/images/${sv.photo}`}
                  alt={`${sv.titre} — salle de sport Infini Mouv à Agde`}
                  width={720}
                  height={540}
                  sizes="(min-width: 900px) 380px, (min-width: 600px) 45vw, 90vw"
                />
                <span className="svc-carte__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            )}
            <div className="svc-carte__corps">
              {/* Sans photo, le numéro reprend sa place en tête du texte. */}
              {!avecPhoto && (
                <span className="svc-carte__num svc-carte__num--inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className="svc-carte__titre">{sv.titre}</h3>
              <p className="svc-carte__desc">{sv.texte}</p>
              <ul className="svc-carte__points">
                {sv.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
