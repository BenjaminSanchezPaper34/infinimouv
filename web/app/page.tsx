import Image from "next/image";
import Script from "next/script";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

/* Activités : emoji parfois à gauche, parfois à droite (= référence) */
const ACTS: { label: string; emoji: string; emojiFirst: boolean }[] = [
  { label: "Musculation", emoji: "💪", emojiFirst: true },
  { label: "Cardio", emoji: "🏃", emojiFirst: false },
  { label: "Bike", emoji: "🚴", emojiFirst: true },
  { label: "Coaching", emoji: "🎯", emojiFirst: false },
  { label: "Cours collectifs", emoji: "🧘", emojiFirst: true },
  { label: "Cross training", emoji: "🏋️", emojiFirst: false },
  { label: "Plan alimentaire", emoji: "🥗", emojiFirst: true },
];

const FEATS = [
  {
    icon: "time-infinimouv.svg",
    title: "Accès libre 7j/7, de 6h à 23h",
    text: "Entraînez-vous à votre rythme, en accès libre toute la semaine. Matin, pause déjeuner ou soirée : il y a toujours un créneau, dans un espace complet, propre et parfaitement équipé.",
  },
  {
    icon: "air-infinimouv.svg",
    title: "Un air purifié et renouvelé",
    text: "Un système professionnel renouvelle et purifie l'air en continu. Le club reste filtré et oxygéné, pour un environnement plus sain, plus agréable et idéal pour la pratique sportive.",
  },
  {
    icon: "objectif-infinimouv.svg",
    title: "Coaching personnalisé",
    text: "Nos coachs diplômés assurent un suivi sur mesure : 1 à 2 entretiens par mois pour bâtir votre programme et suivre vos progrès — perte de poids, prise de masse ou retour au sport.",
  },
];

const ADV = [
  ["Environnement sain", "Salle pensée pour votre santé : propre et lumineuse."],
  ["Air pur & dynamisant", "Ventilation optimisée pour s'entraîner dans des conditions idéales."],
  ["Accompagnement", "Une équipe de coachs présents pour vous guider vers vos objectifs."],
  ["Résultats optimisés", "Programmes sur mesure et suivi régulier de vos progrès."],
  ["Santé préservée", "Une approche bien-être globale, au-delà de la performance."],
  ["Énergie régulée", "Retrouvez votre vitalité et vos instincts naturels."],
];

const FAQ = [
  ["Quels sont les horaires d'ouverture d'Infini Mouv ?", "La salle est en accès libre 7j/7, de 6h00 à 23h00."],
  ["Où se trouve la salle de sport Infini Mouv à Agde ?", "Au 4 avenue du 11 Novembre 1918, 34300 Agde (parking du cinéma)."],
  ["Combien coûte un abonnement chez Infini Mouv ?", "L'abonnement démarre à 27,90€/mois (engagement 12 mois). Options Confort (+5€) et Premium (+15€) disponibles. Variantes 3 mois et sans engagement au club."],
  ["Quels cours collectifs sont proposés ?", "Cours Les Mills (BodyPump, BodyCombat, RPM…), CAF, Yoga, Pilates, Stretching, Zumba, Cross Training et bike interactif Spivi."],
  ["Y a-t-il du coaching personnalisé ?", "Oui, nos coachs diplômés proposent un suivi personnalisé avec 1 à 2 entretiens individuels par mois."],
  ["Comment réserver un cours collectif ?", "Via l'application Xplor Active (code centre « infinimouv ») ou directement à l'accueil du club."],
  ["Y a-t-il un parking ?", "Oui, le parking du cinéma se trouve juste à côté de la salle."],
  ["Quels équipements de musculation propose la salle ?", "Un plateau complet de machines Matrix, poids libres et zone cardio, dans un espace climatisé et purifié."],
  ["Le club propose-t-il du Cross Training ?", "Oui, un espace et des cours dédiés au cross-training sont disponibles."],
];

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

      {/* Plateforme Elfsight (flux Instagram) */}
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />


      <main>
        {/* ============ HERO ============ */}
        <section className="hero">
          <video
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-poster.webp"
          >
            <source src="/video/horizontal.webm" type="video/webm" />
            <source src="/video/horizontal.mp4" type="video/mp4" />
          </video>
          <div className="wrap hero__in">
            <h1 className="hero__title">
              Trouvez
              <br />
              votre vraie
              <br />
              nature
            </h1>
            <div className="hero__price">
              <span className="lead">Votre abonnement à partir de</span>
              <span className="amount">
                27,90€<sup>*</sup>
              </span>
            </div>
          </div>
          <a className="hero__scroll" href="#activites" aria-label="Découvrir">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>

        {/* ============ ACTIVITÉS ============ */}
        <section className="acts" id="activites" aria-label="Nos activités">
          <div className="wrap">
            <ul className="acts__list">
              {ACTS.map((a) => (
                <li className="act" data-reveal key={a.label}>
                  {a.emojiFirst ? (
                    <>
                      <span className="act__emoji">{a.emoji}</span>
                      <span className="act__label">{a.label}</span>
                    </>
                  ) : (
                    <>
                      <span className="act__label">{a.label}</span>
                      <span className="act__emoji">{a.emoji}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ NOTRE OFFRE ============ */}
        <section className="section section--soft" id="tarifs" aria-labelledby="t-offre">
          <div className="wrap">
            <h2 className="h-section" id="t-offre">
              <span className="grad">Notre offre</span>
            </h2>
            <div className="pricing__grid">
              <div className="card plan" data-reveal>
                <div className="plan__name">L&apos;abonnement</div>
                <p className="plan__intro">Inclus dans l&apos;offre :</p>
                <ul>
                  <li>Musculation</li>
                  <li>Cross-training</li>
                  <li>Cardio-training</li>
                  <li>Cours virtuels Les Mills®</li>
                  <li>Bike interactif Spivi®</li>
                  <li>Accès aux douches</li>
                </ul>
                <div className="plan__price">
                  <span className="lead">À partir de</span>
                  <div className="amount">
                    27,90€<sup>*</sup>
                  </div>
                </div>
              </div>

              <div className="card" data-reveal data-reveal-delay="100">
                <div className="opts__title">Les options</div>
                <div className="opts__grid">
                  <div className="opt">
                    <h4>Options Conforts :</h4>
                    <ul>
                      <li>Boisson hydratante Yanga®</li>
                      <li>Suivi coaching mensuel</li>
                      <li>Cours avec le coach</li>
                    </ul>
                    <div className="opt__plus">Supplément par option</div>
                    <div className="opt__price">
                      5,00€<sup>*</sup>
                    </div>
                  </div>
                  <div className="opt">
                    <h4>Options Premiums :</h4>
                    <ul>
                      <li>Suivi coaching expert</li>
                      <li>Suivi nutritionnel</li>
                    </ul>
                    <div className="opt__plus">Supplément par option</div>
                    <div className="opt__price">
                      15,00€<sup>*</sup>
                    </div>
                  </div>
                </div>
                <p className="pricing__note">
                  *Tarif pour un engagement de 12 mois sans option. Variantes
                  d&apos;abonnements possibles pour 3 mois et sans engagement, voir
                  conditions au club.
                </p>
              </div>
            </div>
            <div className="cta-band">
              <a className="btn btn--solid" href="/#contact">
                Je m&apos;inscris
              </a>
            </div>
          </div>
        </section>

        {/* ============ AVANTAGES (3 cartes) + CTA ============ */}
        <section className="section" aria-label="Avantages">
          <div className="wrap">
            <div className="feats">
              {FEATS.map((f, i) => (
                <article className="feat" data-reveal data-reveal-delay={`${i * 100}`} key={f.title}>
                  <span className="feat__badge">
                    <img className="feat__icon" src={`/images/${f.icon}`} alt="" />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
            <div className="cta-band">
              <a className="btn btn--solid" href="/services-equipements">
                Voir tous les services
              </a>
            </div>
          </div>
        </section>

        {/* ============ AVIS Google — widget Elfsight (avis réels, à jour) ============ */}
        <section className="section section--soft" aria-label="Avis Google">
          <div className="wrap">
            <div className="reviews-embed" data-reveal>
              <div
                className="elfsight-app-3b256931-09f1-4343-b758-dc63e25ed835"
                data-elfsight-app-lazy
              />
            </div>
          </div>
        </section>

        {/* ============ NOS AVANTAGES (split) ============ */}
        <section className="section" id="nos-avantages" aria-labelledby="t-adv">
          <div className="wrap">
            <h2 className="h-section" id="t-adv">
              <span className="grad">Nos avantages</span>
            </h2>
            <div className="split">
              <div className="split__img" data-reveal>
                <Image
                  src="/images/salle-infinimouv.webp"
                  alt="Salle de musculation Infini Mouv à Agde"
                  width={1000}
                  height={750}
                  sizes="(min-width:901px) 50vw, 100vw"
                />
              </div>
              <ul className="adv-list" data-reveal data-reveal-delay="120">
                {ADV.map(([t, d]) => (
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
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section section--soft" aria-labelledby="t-faq">
          <div className="wrap">
            <h2 className="h-section" id="t-faq" style={{ textAlign: "center" }}>
              <span className="grad">Questions fréquentes</span>
            </h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details data-reveal key={q}>
                  <summary>{q}</summary>
                  <div className="faq__a">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section className="section" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <div className="contact__grid">
              {/* Flux Instagram — widget Elfsight (@infinimouv_agde) */}
              <div className="insta-embed" data-reveal>
                <div
                  className="elfsight-app-f78ecb2d-dd4e-45f8-b790-65080821565e"
                  data-elfsight-app-lazy
                />
              </div>

              {/* Formulaire contact (natif) */}
              <div className="contact__right" data-reveal data-reveal-delay="120">
                <h2 className="h-section" id="t-contact">
                  <span className="grad">Contact</span>
                </h2>
                {/* Formulaire de contact — widget Elfsight (compte client) */}
                <div
                  className="elfsight-app-45ac13a6-3fc2-4728-88e6-e203a8b1018a"
                  data-elfsight-app-lazy
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
