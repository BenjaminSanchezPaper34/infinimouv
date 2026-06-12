import type { Metadata } from "next";
import Image from "next/image";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services & équipements — Musculation, cours collectifs, planning",
  description:
    "Découvrez les services d'Infini Mouv à Agde : zone musculation Matrix, bike Spivi®, cours collectifs Les Mills®, cross-training, nutrition, hydratation Yanga®, planning des cours et app Xplor Active.",
  alternates: { canonical: "/services-equipements" },
};

/* ---------- BENTO services (cartes texte + images, masonry 3 col) ---------- */
type Tile =
  | { type: "card"; title: string; text: string }
  | { type: "img"; src: string; alt: string };

/* 3 colonnes : cartes = hauteur du texte, photos = flex-grow pour combler
   → toutes les colonnes se terminent à la même ligne (rectangle). */
const BENTO_COLS: Tile[][] = [
  [
    { type: "card", title: "Zone musculation", text: "Plateau de musculation équipé d'appareils performants Matrix : machines guidées pour un travail sécurisé et poids libres (haltères, barres, bancs, cage Smith). Renforcement musculaire ou prise de masse, vous travaillez chaque groupe musculaire selon votre niveau." },
    { type: "img", src: "musculation-infinimouv.webp", alt: "Zone musculation Matrix" },
    { type: "card", title: "Cours collectifs Les Mills®", text: "Salle dédiée aux cours Les Mills® en vidéo immersive : BodyPump, BodyCombat, BodyBalance, BodyAttack, RPM, Sh'Bam… Séances guidées selon votre planning, sans inscription préalable." },
    { type: "img", src: "salle-infinimouv.webp", alt: "Salle de cours Les Mills" },
  ],
  [
    { type: "img", src: "salle3-infinimouv.webp", alt: "Espace bike interactif" },
    { type: "card", title: "Espace bike interactif (Spivi®)", text: "Idéal pour sculpter jambes, mollets et fessiers, le biking favorise la perte de poids. Pratiquez librement sur vélo fixe ou en séances de groupe. Grâce à notre partenaire Spivi®, profitez de cours de biking interactifs immersifs." },
    { type: "img", src: "bike-infinimouv.webp", alt: "Vélos Infini Mouv" },
    { type: "card", title: "Confort & bien-être", text: "Salle chauffée et climatisée toute l'année. Air purifié et renouvelé en continu grâce à nos ioniseurs professionnels. Vestiaires modernes et douches en libre accès." },
  ],
  [
    { type: "card", title: "Espace nutrition & boutique", text: "Accompagnement par un coach certifié en nutrition : bilan de départ + 7 suivis annuels, scan 3D d'impédancemétrie et plan alimentaire sur mesure. Boutique sur place : barres, whey, compléments et boissons (Éric Favre, Nutripure)." },
    { type: "img", src: "services-infinimouv.webp", alt: "Espace services" },
    { type: "card", title: "Cross Training", text: "Espace Cross Training extérieur couvert, ouvert par tous les temps. Cage Crossfit + accessoires (cordes, haltères, kettlebells, plateaux de squat…). Créez votre parcours : force, gymnastique, endurance." },
    { type: "img", src: "salle2-infinimouv.webp", alt: "Salle lumineuse" },
  ],
];

const TEAM = [
  { initials: "CD", name: "Cyril", role: "Fondateur & gérant", text: "Créateur du concept Infini Mouv, passionné de bien-être et de nutrition. Issu du cursus Seva Formation, il a pensé chaque détail de la salle pour votre confort et vos résultats." },
  { initials: "M", name: "Magalie", role: "Coach & accueil", text: "Présente au quotidien pour vous accompagner et vous conseiller. Spécialisée dans les cours collectifs énergiques (Zumba, CAF, BodyPump) et le suivi personnalisé." },
  { initials: "T", name: "Thomas", role: "Coach sportif", text: "Coach diplômé spécialisé en Cross Training, force athlétique et préparation physique. Anime les séances Yoga et accompagne sur mesure les objectifs ambitieux." },
  { initials: "RR", name: "Ruh Roséanna", role: "Coach", text: "À l'écoute et pleine d'énergie, elle vous accompagne avec bienveillance pour progresser à votre rythme et garder la motivation." },
];

const ENGAGEMENTS = [
  ["Purificateurs ioniseurs d'air", "qui recréent un air sain et régénérant comme en bord de mer ou en forêt."],
  ["Exposition aux ondes électromagnétiques limitée", "pour un environnement plus sain."],
  ["Coachs sportifs ciblés", "nutrition, vitalité, performances…"],
  ["Appareils innovants de mesure", "« bilan énergie » pour suivre votre évolution."],
  ["Partenariats de qualité", "fournisseurs rigoureusement sélectionnés."],
  ["Marques de confiance", "Matrix, Spivi®, Les Mills®, Éric Favre, Nutripure, Yanga®."],
];

const YANGA = [
  "Dose de 50 cl, rechargeable toutes les 30 minutes",
  "Boisson fraîche, sans sucre, vitamines essentielles",
  "4 goûts : Ananas-Coco, Cassis, Citron, eau nature",
  "Parfaite avant, pendant et après l'entraînement",
];

/* Cours collectifs : titres colorés (= référence) */
const COURS: { title: string; text: string; color: string }[] = [
  { title: "C.A.F. — Cuisses Abdos Fessiers", color: "#e8821e", text: "Un renforcement complet du bas du corps et de la sangle abdominale. Idéal pour tonifier, sculpter et améliorer la stabilité." },
  { title: "Pilates", color: "#8a3fc0", text: "Renforcement profond, posture, contrôle et respiration : un travail centré sur les muscles stabilisateurs." },
  { title: "Yoga", color: "#5aad12", text: "Le mercredi de 18h15 à 19h avec Thomas. Postures pour mieux connaître votre corps et vous détendre. Accessible à tous, quel que soit l'âge." },
  { title: "Stretching", color: "#e0392b", text: "Des étirements doux pour assouplir le corps, améliorer la mobilité, récupérer et libérer les tensions." },
  { title: "Zumba", color: "#d6275e", text: "Cardio, fun et énergie ! Une séance dansée mêlant salsa, reggaeton, samba… parfaite pour brûler des calories en s'amusant." },
  { title: "Body Pump", color: "#2b7fd4", text: "Un travail complet en musique pour renforcer tous les groupes musculaires avec charges légères à modérées." },
];

export default function ServicesEquipements() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

      {/* Badge note Google (flottant) */}
      <a
        className="g-badge"
        href="https://www.google.com/search?q=Infini+Mouv+Agde"
        target="_blank"
        rel="noopener"
        aria-label="Note Google 4,6 sur 5"
      >
        <span className="g-badge__g">G</span>
        <span className="g-badge__score">4,6</span>
        <span className="g-badge__stars">★★★★★</span>
      </a>

      <main>
        {/* ============ HERO bannière ============ */}
        <section className="svc-hero">
          <Image
            src="/images/salle-infinimouv.webp"
            alt="Salle de sport Infini Mouv à Agde"
            fill
            priority
            sizes="100vw"
            className="svc-hero__img"
          />
          <div className="svc-hero__overlay" />
        </section>

        {/* ============ INTRO ============ */}
        <section className="section section--soft">
          <div className="wrap">
            <h1 className="h-section">
              <span className="grad">Services &amp; équipements</span>
            </h1>
            <p className="svc-intro">
              Parcourez les services de notre salle de sport située à Agde pour
              atteindre vos objectifs. Chez Infini Mouv, une large gamme
              d'activités et d'accompagnements pour répondre à tous vos besoins
              sportifs et de bien-être. Que vous soyez débutant ou confirmé,
              notre équipe vous aide à progresser à votre rythme — plateau
              musculation et cardio entièrement équipé (tapis, vélos
              elliptiques, rameurs…) dans un environnement sain à l'air pur.
            </p>
          </div>
        </section>

        {/* ============ BENTO services ============ */}
        <section className="section">
          <div className="wrap">
            <div className="bento">
              {BENTO_COLS.map((col, ci) => (
                <div className="bento-col" key={ci}>
                  {col.map((t, i) =>
                    t.type === "card" ? (
                      <article className="bento__card" data-reveal data-reveal-delay={`${ci * 80}`} key={t.title}>
                        <h2 className="bento__title">{t.title}</h2>
                        <p className="bento__text">{t.text}</p>
                      </article>
                    ) : (
                      <div className="bento__img" data-reveal data-reveal-delay={`${ci * 80}`} key={`${t.src}-${i}`}>
                        <Image src={`/images/${t.src}`} alt={t.alt} fill sizes="(min-width:900px) 33vw, 100vw" style={{ objectFit: "cover" }} />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ L'ÉQUIPE ============ */}
        <section className="section section--soft" aria-labelledby="equipe-title">
          <div className="wrap">
            <h2 className="h-section" id="equipe-title"><span className="grad">L'équipe</span></h2>
            <p className="svc-intro">
              Une équipe de professionnels qualifiés et expérimentés pour vous
              accompagner sur vos objectifs : perte de poids, prise de masse,
              remise en forme. Programme d'entraînement sur mesure et coaching
              alimentaire.
            </p>
            <div className="team">
              {TEAM.map((m, i) => (
                <article className="team-card" data-reveal data-reveal-delay={`${i * 100}`} key={m.name}>
                  <div className="team-card__avatar">{m.initials}</div>
                  <h3 className="team-card__name">{m.name}</h3>
                  <div className="team-card__role">{m.role}</div>
                  <p className="team-card__text">{m.text}</p>
                </article>
              ))}
            </div>
            <div className="cta-band">
              <a className="btn btn--solid" href="/#contact">Prendre rendez-vous</a>
            </div>
          </div>
        </section>

        {/* ============ NOS ENGAGEMENTS ============ */}
        <section className="section" aria-labelledby="eng-title">
          <div className="wrap">
            <h2 className="h-section" id="eng-title"><span className="grad">Nos engagements</span></h2>
            <p className="svc-intro">Chez Infini Mouv, nous mettons tout en œuvre pour garantir votre bien-être :</p>
            <ul className="adv-list svc-eng">
              {ENGAGEMENTS.map(([t, d]) => (
                <li key={t}>
                  <span className="ck">✓</span>
                  <div><h4>{t}</h4><p>{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ HYDRATATION YANGA (carte verte) ============ */}
        <section className="section section--soft" aria-labelledby="yanga-title">
          <div className="wrap">
            <h2 className="h-section" id="yanga-title"><span className="grad">L'hydratation Yanga</span></h2>
            <div className="yanga-card" data-reveal>
              <div className="yanga-card__text">
                <h3>Option Confort — fontaine Yanga® Sports Water</h3>
                <p>Pour une hydratation optimale pendant vos séances, profitez de la fontaine Yanga® Sports Water en accès illimité avec l'option Confort.</p>
                <ul className="yanga-list">
                  {YANGA.map((y) => (<li key={y}><span className="ck ck--white">✓</span>{y}</li>))}
                </ul>
              </div>
              <div className="yanga-card__img">
                <Image src="/images/yanga-fontaine.webp" alt="Fontaine Yanga® Sports Water" width={520} height={620} sizes="(min-width:901px) 40vw, 90vw" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ COURS COLLECTIFS ============ */}
        <section id="cours" aria-labelledby="cours-title">
          <div className="cours-hero">
            <Image src="/images/musculation-infinimouv.webp" alt="Cours collectifs Infini Mouv" fill sizes="100vw" className="cours-hero__img" />
          </div>
          <div className="section">
            <div className="wrap">
              <h2 className="h-section" id="cours-title" style={{ textAlign: "center" }}><span className="grad">Cours collectifs</span></h2>
              <p className="svc-intro cours-intro">
                Nos coachs sportifs professionnels animent plusieurs cours
                collectifs. Choisissez selon vos objectifs et profitez de
                conseils personnalisés. Réservation via l'app Xplor Active
                (code centre : <strong>infinimouv</strong>).
              </p>
              <div className="cours-grid">
                {COURS.map((c, i) => (
                  <article className="cours-item" data-reveal data-reveal-delay={`${(i % 2) * 80}`} key={c.title}>
                    <h3 className="cours-item__title" style={{ color: c.color }}>{c.title}</h3>
                    <p className="cours-item__text">{c.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ PLANNING ============ */}
        <section className="section section--soft section--planning" aria-labelledby="planning-title">
          <div className="wrap">
            <h2 className="h-section" id="planning-title" style={{ textAlign: "center" }}><span className="grad">Planning des cours</span></h2>
            <div className="planning" data-reveal>
              {/* SVG servi tel quel (image vectorielle nette) */}
              <img src="/images/planning-infinimouv.svg" alt="Planning hebdomadaire des cours collectifs Infini Mouv" className="planning__img" />
            </div>
          </div>
        </section>

        {/* ============ VOTRE APP ============ */}
        <section className="section" aria-labelledby="app-title">
          <div className="wrap">
            <div className="app-band">
              <div className="app-band__img" data-reveal>
                <Image src="/images/app-infinimouv.webp" alt="Application Xplor Active — planning des cours" width={600} height={1200} sizes="(min-width:901px) 300px, 70vw" />
              </div>
              <div data-reveal data-reveal-delay="120">
                <h2 className="h-section" id="app-title"><span className="grad">Votre app, votre sport</span></h2>
                <div className="app-xplor">
                  <Image src="/images/appxplor-infinimouv.webp" alt="" width={48} height={48} />
                  <span>Xplor Active</span>
                </div>
                <p className="svc-row__text">
                  Réservez vos cours et gérez votre abonnement depuis
                  l'application Xplor Active. Veillez à utiliser la même adresse
                  mail sur l'app que lors de votre inscription à la salle.
                </p>
                <p className="app-code">Code centre : <strong>infinimouv</strong></p>
                <div className="app-badges">
                  <a href="https://apps.apple.com/app/xplor-active/id1547282323" target="_blank" rel="noopener" aria-label="Télécharger sur l'App Store">
                    <img src="/images/appstore-infinimouv.svg" alt="App Store" height={46} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.xplor.active" target="_blank" rel="noopener" aria-label="Disponible sur Google Play">
                    <img src="/images/googleplay-infinimouv.svg" alt="Google Play" height={46} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
