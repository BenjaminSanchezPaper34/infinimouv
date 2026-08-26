import type { Metadata } from "next";
import Image from "next/image";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";
import ServicesGrille from "@/components/ServicesGrille";
import PlanningCours from "@/components/PlanningCours";

export const metadata: Metadata = {
  title: "Services & équipements — Musculation, cours collectifs, planning",
  description:
    "Découvrez les services d'Infini Mouv à Agde : zone musculation Matrix, bike Spivi®, cours collectifs Les Mills®, cross-training, nutrition, hydratation Yanga®, planning des cours et app Xplor Active.",
  alternates: { canonical: "/services-equipements" },
};

/* ---------- SERVICES : présentation linéaire, une ligne par service ---------- */
const SERVICES = [
  {
    titre: "Zone musculation",
    photo: "musculation-infinimouv.webp",
    texte:
      "Plateau équipé d'appareils Matrix : machines guidées pour un travail sécurisé et poids libres (haltères, barres, bancs, cage Smith). Renforcement musculaire ou prise de masse, vous travaillez chaque groupe musculaire selon votre niveau.",
    points: ["Machines guidées Matrix", "Poids libres et cage Smith", "Accès libre 7j/7"],
  },
  {
    titre: "Cardio & bike interactif Spivi®",
    photo: "bike-infinimouv.webp",
    texte:
      "Tapis, vélos elliptiques et rameurs pour travailler l'endurance à votre rythme. Notre partenaire Spivi® propose en plus des séances de biking immersives, seul ou en groupe.",
    points: ["Tapis, elliptiques, rameurs", "Bike interactif Spivi®", "Séances libres ou encadrées"],
  },
  {
    titre: "Cours collectifs Les Mills®",
    photo: "salle-infinimouv.webp",
    texte:
      "Salle dédiée aux cours Les Mills® en vidéo immersive : BodyPump, BodyCombat, BodyBalance, BodyAttack, RPM, Sh'Bam… Séances accessibles selon votre planning, sans inscription préalable.",
    points: ["Vidéo immersive Les Mills®", "Sans réservation", "Cours avec coach en option Confort"],
  },
  {
    titre: "Cross Training",
    photo: "salle3-infinimouv.webp",
    texte:
      "Espace extérieur couvert, ouvert par tous les temps. Cage Crossfit et accessoires (cordes, kettlebells, haltères, plateaux de squat) pour composer votre parcours : force, gymnastique, endurance.",
    points: ["Espace extérieur couvert", "Cage Crossfit équipée", "Parcours libre ou encadré"],
  },
  {
    titre: "Espace nutrition & boutique",
    photo: "services-infinimouv.webp",
    texte:
      "Accompagnement par un coach certifié en nutrition : bilan de départ, 7 suivis annuels, scan 3D d'impédancemétrie et plan alimentaire sur mesure. Boutique sur place pour vos compléments.",
    points: ["Scan 3D d'impédancemétrie", "Plan alimentaire sur mesure", "Éric Favre, Nutripure"],
  },
  {
    titre: "Confort & bien-être",
    photo: "salle2-infinimouv.webp",
    texte:
      "Salle chauffée et climatisée toute l'année, air purifié et renouvelé en continu par nos ioniseurs professionnels. Vestiaires modernes et douches en libre accès, dans un cadre entretenu quotidiennement.",
    points: ["Air purifié en continu", "Chauffée et climatisée", "Vestiaires et douches"],
  },
];

/* fondateur : carte mise en avant (fond vert, texte blanc) pour distinguer
   Cyril du reste de l'équipe. */
type Membre = { photo: string; name: string; role: string; text: string; fondateur?: boolean };
const TEAM: Membre[] = [
  { photo: "equipe-cyril.webp", name: "Cyril", role: "Fondateur & gérant", fondateur: true, text: "Créateur du concept Infini Mouv, passionné de sport, de bien-être et de nutrition. Issu du cursus Seva Formation, il a pensé chaque détail de la salle pour votre confort et vos résultats." },
  { photo: "equipe-magalie.webp", name: "Magalie", role: "Coach sportif", text: "Spécialisée en Pilates et stretching adaptés à tous. Suivez-la aussi dans les cours de Zumba, CAF et BodyPump. Elle vous propose également des programmes de musculation adaptés à vos besoins." },
  { photo: "equipe-thomas.webp", name: "Thomas", role: "Coach sportif", text: "Coach diplômé spécialisé pour avoir une expertise en préparation mentale et physique. Anime les séances de Yoga et accompagne sur mesure les objectifs ambitieux." },
  { photo: "equipe-roseanna.webp", name: "Roséanna", role: "Conseillère en nutrition", text: "À l'écoute et pleine d'énergie, elle vous accompagne avec bienveillance dans la mise en place d'un programme alimentaire personnalisé, adapté à vos besoins." },
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
  { title: "Body Pump", color: "#2b7fd4", text: "Renforcement musculaire sur l'ensemble du corps, en musique et avec charges légères à modérées." },
  { title: "Body Sculpt", color: "#0f8a7e", text: "Nouveau au planning : un renforcement musculaire qui tonifie le corps de manière équilibrée. Le lundi de 12h15 à 13h." },
  { title: "Cross Training", color: "#0070a7", text: "Enchaînement d'exercices cardio et musculaires avec différents matériels, dans notre espace extérieur couvert." },
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
              {/* intention locale pour les moteurs, invisible à l'écran */}
              <span className="sr-only"> de votre salle de sport à Agde</span>
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

        {/* ============ SERVICES (linéaire horizontal) ============ */}
        <section className="section svc-section" aria-labelledby="services-title">
          <div className="wrap">
            <h2 className="h-section" id="services-title">
              <span className="grad">Nos espaces</span>
            </h2>
            <p className="svc-intro">
              Six espaces pensés pour couvrir tous vos objectifs.
            </p>
          </div>
          <div className="wrap">
            <ServicesGrille services={SERVICES} />
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
                <article className={`team-card${m.fondateur ? " team-card--fondateur" : ""}`} data-reveal data-reveal-delay={`${i * 100}`} key={m.name}>
                  <div className="team-card__avatar">
                    <Image
                      src={`/images/${m.photo}`}
                      alt={`${m.name}, ${m.role.toLowerCase()} chez Infini Mouv à Agde`}
                      width={150}
                      height={150}
                      sizes="110px"
                    />
                  </div>
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
                <h3>
                  Fontaine Yanga® Sports Water
                  <span className="yanga-tag">Option Confort · +5&nbsp;€/mois</span>
                </h3>
                <p>
                  Pour une hydratation optimale pendant vos séances, profitez de
                  la fontaine Yanga® Sports Water en accès illimité. Ce service
                  n&apos;est pas compris dans l&apos;abonnement de base&nbsp;: il
                  s&apos;ajoute en <strong>option Confort</strong>, pour 5&nbsp;€
                  par mois.
                </p>
                <ul className="yanga-list">
                  {YANGA.map((y) => (
                    <li key={y}>
                      <span className="yanga-check" aria-hidden="true">✓</span>
                      {y}
                    </li>
                  ))}
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
            <Image src="/images/courscollectifs-infinimouv.webp" alt="Cours collectif animé par un coach chez Infini Mouv à Agde" fill sizes="100vw" className="cours-hero__img" />
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
              {/* Planning natif : texte réel, lisible par Google/IA et responsive */}
              <PlanningCours />
            </div>
          </div>
        </section>

        {/* ============ VOTRE APP ============ */}
        <section className="section" aria-labelledby="app-title">
          <div className="wrap">
            <div className="app-band">
              <div className="app-band__img" data-reveal>
                <Image src="/images/app-infinimouv.webp" alt="Application Xplor Active — planning des cours" width={600} height={1215} sizes="(min-width:901px) 300px, 70vw" />
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
