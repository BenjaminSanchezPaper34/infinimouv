import type { Metadata } from "next";
import Image from "next/image";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services & équipements — Musculation, cours collectifs, coaching",
  description:
    "Découvrez les services d'Infini Mouv à Agde : zone musculation Matrix, bike Spivi®, cours collectifs Les Mills®, cross-training, nutrition, hydratation Yanga® et coaching personnalisé.",
  alternates: { canonical: "/services-equipements" },
};

const SERVICES = [
  {
    title: "Zone musculation",
    text: "Plateau de musculation équipé d'appareils performants Matrix : machines guidées pour un travail sécurisé et poids libres (haltères, barres, bancs, cage Smith). Renforcement musculaire ou prise de masse, vous travaillez chaque groupe musculaire selon votre niveau (biceps curl, chest press, seated row…).",
    img: "musculation-infinimouv.webp",
  },
  {
    title: "Espace bike interactif (Spivi®)",
    text: "Idéal pour sculpter jambes, mollets et fessiers, le biking favorise la perte de poids. Pratiquez librement sur vélo fixe ou en séances de groupe accessibles à tous. Grâce à notre partenaire Spivi®, profitez aussi de cours de biking interactifs immersifs.",
    img: "bike-infinimouv.webp",
  },
  {
    title: "Espace nutrition & boutique",
    text: "Accompagnement par un coach certifié en nutrition : bilan de départ + 7 suivis annuels, scan 3D d'impédancemétrie et plan alimentaire sur mesure. Boutique sur place : barres, whey, compléments et boissons hydratantes (Éric Favre, Nutripure).",
    img: "services-infinimouv.webp",
  },
  {
    title: "Cours collectifs Les Mills®",
    text: "Salle dédiée aux cours Les Mills® en vidéo immersive : BodyPump, BodyCombat, BodyBalance, BodyAttack, RPM, Sh'Bam… Séances guidées accessibles selon votre planning, sans inscription préalable.",
    img: "salle-infinimouv.webp",
  },
  {
    title: "Confort & bien-être",
    text: "Salle chauffée et climatisée toute l'année pour votre confort. Air purifié et renouvelé en continu grâce à nos ioniseurs professionnels. Vestiaires modernes équipés et douches en libre accès. Un cadre propre, lumineux et entretenu quotidiennement.",
    img: "salle2-infinimouv.webp",
  },
  {
    title: "Cross Training",
    text: "Espace Cross Training extérieur couvert, ouvert par tous les temps. Cage Crossfit + accessoires (cordes à grimper, haltères, kettlebells, plateaux de squat…). Créez votre parcours : force athlétique, haltérophilie, gymnastique, endurance…",
    img: "salle3-infinimouv.webp",
  },
];

const TEAM = [
  {
    initials: "CD",
    name: "Cyril",
    role: "Fondateur & gérant",
    text: "Créateur du concept Infini Mouv, passionné de bien-être et de nutrition. Issu du cursus Seva Formation, il a pensé chaque détail de la salle pour votre confort et vos résultats.",
  },
  {
    initials: "M",
    name: "Magalie",
    role: "Coach & accueil",
    text: "Présente au quotidien pour vous accompagner et vous conseiller. Spécialisée dans les cours collectifs énergiques (Zumba, CAF, BodyPump) et le suivi personnalisé.",
  },
  {
    initials: "T",
    name: "Thomas",
    role: "Coach sportif",
    text: "Coach diplômé spécialisé en Cross Training, force athlétique et préparation physique. Anime les séances Yoga et accompagne sur mesure les objectifs ambitieux.",
  },
];

const ENGAGEMENTS = [
  ["Purificateurs ioniseurs d'air", "qui recréent un air sain et régénérant comme en bord de mer ou en forêt."],
  ["Exposition aux ondes électromagnétiques limitée", "pour un environnement plus sain."],
  ["Coachs sportifs ciblés", "nutrition, vitalité, performances…"],
  ["Appareils innovants de mesure", "« bilan énergie » pour suivre votre évolution."],
  ["Partenariats de qualité", "fournisseurs sélectionnés."],
  ["Marques de confiance", "Matrix, Spivi®, Les Mills®, Éric Favre, Nutripure, Yanga®."],
];

const COURS = [
  ["C.A.F. — Cuisses Abdos Fessiers", "Un renforcement complet du bas du corps et de la sangle abdominale. Idéal pour tonifier, sculpter et améliorer la stabilité."],
  ["Yoga", "Le mercredi de 18h15 à 19h avec Thomas. Postures pour mieux connaître votre corps et vous détendre au quotidien. Accessible à tous, quel que soit l'âge."],
  ["Zumba", "Cardio, fun et énergie ! Une séance dansée mêlant salsa, reggaeton, samba… parfaite pour brûler des calories en s'amusant."],
  ["Body Pump", "Un travail complet en musique pour renforcer tous les groupes musculaires avec charges légères à modérées."],
  ["Pilates", "Renforcement profond, posture, contrôle et respiration : un travail centré sur les muscles stabilisateurs."],
  ["Stretching", "Des étirements doux pour assouplir le corps, améliorer la mobilité, récupérer et libérer les tensions."],
];

const YANGA = [
  "Dose de 50 cl, rechargeable toutes les 30 minutes",
  "Boisson fraîche, sans sucre, vitamines essentielles",
  "4 goûts : Ananas-Coco, Cassis, Citron, eau nature",
  "Parfaite avant, pendant et après l'entraînement",
];

export default function ServicesEquipements() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

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

        {/* ============ SERVICES (rangées alternées) ============ */}
        <section className="section">
          <div className="wrap svc-rows">
            {SERVICES.map((s, i) => (
              <div className={`split svc-row${i % 2 ? " svc-row--rev" : ""}`} key={s.title}>
                <div className="split__img" data-reveal>
                  <Image
                    src={`/images/${s.img}`}
                    alt={s.title}
                    width={1000}
                    height={750}
                    sizes="(min-width:901px) 50vw, 100vw"
                  />
                </div>
                <div data-reveal data-reveal-delay="100">
                  <h2 className="svc-row__title">{s.title}</h2>
                  <p className="svc-row__text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ L'ÉQUIPE ============ */}
        <section className="section section--soft" aria-labelledby="equipe-title">
          <div className="wrap">
            <h2 className="h-section" id="equipe-title">
              <span className="grad">L'équipe</span>
            </h2>
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
            <h2 className="h-section" id="eng-title">
              <span className="grad">Nos engagements</span>
            </h2>
            <p className="svc-intro">
              Chez Infini Mouv, nous mettons tout en œuvre pour garantir votre
              bien-être :
            </p>
            <ul className="adv-list svc-eng">
              {ENGAGEMENTS.map(([t, d]) => (
                <li key={t}>
                  <span className="ck">✓</span>
                  <div>
                    <h4>{t}</h4>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ COURS COLLECTIFS ============ */}
        <section className="section section--soft" id="cours" aria-labelledby="cours-title">
          <div className="wrap">
            <h2 className="h-section" id="cours-title" style={{ textAlign: "center" }}>
              <span className="grad">Cours collectifs</span>
            </h2>
            <p className="svc-intro" style={{ textAlign: "center", marginInline: "auto", maxWidth: "720px" }}>
              Nos coachs sportifs professionnels animent plusieurs cours
              collectifs. Choisissez selon vos objectifs et profitez de conseils
              personnalisés. Réservation via l'app Xplor Active (code centre :{" "}
              <strong>infinimouv</strong>).
            </p>
            <div className="cours-grid">
              {COURS.map(([t, d], i) => (
                <article className="cours-card" data-reveal data-reveal-delay={`${(i % 3) * 100}`} key={t}>
                  <h3 className="cours-card__title">{t}</h3>
                  <p className="cours-card__text">{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HYDRATATION YANGA ============ */}
        <section className="section" aria-labelledby="yanga-title">
          <div className="wrap">
            <h2 className="h-section" id="yanga-title">
              <span className="grad">L'hydratation Yanga</span>
            </h2>
            <div className="split">
              <div className="split__img" data-reveal>
                <Image
                  src="/images/yanga-fontaine.webp"
                  alt="Fontaine Yanga® Sports Water"
                  width={1000}
                  height={750}
                  sizes="(min-width:901px) 50vw, 100vw"
                />
              </div>
              <div data-reveal data-reveal-delay="100">
                <h3 className="svc-row__title">Option Confort — fontaine Yanga® Sports Water</h3>
                <p className="svc-row__text">
                  Pour une hydratation optimale pendant vos séances, profitez de
                  la fontaine Yanga® Sports Water en accès illimité avec l'option
                  Confort.
                </p>
                <ul className="adv-list" style={{ marginTop: "18px" }}>
                  {YANGA.map((y) => (
                    <li key={y}>
                      <span className="ck">✓</span>
                      <div><p style={{ color: "var(--im-ink)" }}>{y}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ VOTRE APP ============ */}
        <section className="section section--soft" aria-labelledby="app-title">
          <div className="wrap">
            <div className="app-band">
              <div data-reveal>
                <h2 className="h-section" id="app-title">
                  <span className="grad">Votre app, votre sport</span>
                </h2>
                <p className="svc-row__text">
                  Réservez vos cours et gérez votre abonnement depuis
                  l'application <strong>Xplor Active</strong>. Veillez à utiliser
                  la même adresse mail sur l'app que lors de votre inscription à
                  la salle.
                </p>
                <p className="app-code">
                  Code centre : <strong>infinimouv</strong>
                </p>
                <div className="app-badges">
                  <a href="https://apps.apple.com/app/xplor-active/id1547282323" target="_blank" rel="noopener" aria-label="Télécharger sur l'App Store">
                    <img src="/images/appstore-infinimouv.svg" alt="App Store" height={46} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.xplor.active" target="_blank" rel="noopener" aria-label="Disponible sur Google Play">
                    <img src="/images/googleplay-infinimouv.svg" alt="Google Play" height={46} />
                  </a>
                </div>
              </div>
              <div className="app-band__img" data-reveal data-reveal-delay="120">
                <Image
                  src="/images/appxplor-infinimouv.webp"
                  alt="Application Xplor Active"
                  width={900}
                  height={900}
                  sizes="(min-width:901px) 40vw, 80vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
