import Image from "next/image";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";

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
    title: "Accès libre de 6h00 à 23h00, 7j/7",
    text: "Profitez d'une liberté totale pour vous entraîner à votre rythme. Que vous soyez matinal, entre midi et deux, ou adepte des séances tardives, vous avez toujours un créneau pour vous entraîner dans un espace complet, propre et parfaitement équipé.",
  },
  {
    icon: "air-infinimouv.svg",
    title: "Un air purifié et renouvelé",
    text: "Pour votre confort et votre santé, notre salle est équipée d'un système de renouvellement et de purification de l'air. L'air du club est filtré et régulièrement renouvelé afin de garantir un environnement plus sain, plus agréable et parfaitement adapté à la pratique sportive.",
  },
  {
    icon: "objectif-infinimouv.svg",
    title: "Coaching personnalisé et accompagnement pro",
    text: "Nos coachs diplômés vous proposent un suivi personnalisé : 1 à 2 entretiens individuels par mois pour établir un programme adapté et un réel accompagnement mensuel pour analyser votre évolution. Perte de poids, prise de masse, retour au sport : un accompagnement sur mesure dans un cadre unique.",
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

const OBJECTIFS = [
  "Mincir", "Gérer votre stress",
  "S'entretenir", "Tonifier et sculpter votre corps",
  "Prise de masse", "Préparation sportive",
  "Améliorer sa condition physique", "Augmenter sa force",
  "Autre",
];

export default function Home() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

      <main>
        {/* ============ HERO ============ */}
        <section className="hero">
          <video
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/salle-infinimouv.jpg"
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
          </div>
        </section>

        {/* ============ AVANTAGES (3 cartes) ============ */}
        <section className="section" aria-label="Avantages">
          <div className="wrap">
            <div className="feats">
              {FEATS.map((f, i) => (
                <article className="feat" data-reveal data-reveal-delay={`${i * 100}`} key={f.title}>
                  <img className="feat__icon" src={`/images/${f.icon}`} alt="" height={56} />
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BANDEAU services ============ */}
        <div className="cta-band">
          <a className="btn btn--solid" href="#nos-avantages">
            Services &amp; équipements
          </a>
        </div>

        {/* ============ AVIS Google ============ */}
        <section className="section section--soft" aria-label="Avis Google">
          <div className="wrap">
            <div className="reviews" data-reveal>
              <a className="btn btn--solid reviews__cta" href="https://g.page/r/infini-mouv/review" target="_blank" rel="noopener">
                Rédiger un avis
              </a>
              <div className="reviews__stars" aria-label="5 étoiles sur 5">★★★★★</div>
              <p className="reviews__text">
                « Très bon accueil, très bien reçu. Coach très sympa, salle très
                propre, je recommande. »
              </p>
              <div className="reviews__who">
                <div className="reviews__avatar">C</div>
                <div className="reviews__name">Claude Diaz</div>
                <div className="reviews__meta">il y a 22 jours · via Google</div>
              </div>
              <div className="reviews__dots" aria-hidden="true">
                <span className="is-on" />
                <span />
                <span />
              </div>
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
              {/* Carte Instagram (statique) */}
              <div className="insta-card" data-reveal>
                <div className="insta-card__head">
                  <div className="insta-card__ring">
                    <Image src="/images/symbole-infinimouv-crop-u355.webp" alt="" width={46} height={46} />
                  </div>
                  <div>
                    <div className="insta-card__name">Infini Mouv Agde</div>
                    <a
                      className="insta-card__handle"
                      href="https://www.instagram.com/infinimouv_agde/"
                      target="_blank"
                      rel="noopener"
                    >
                      @infinimouv_agde
                    </a>
                  </div>
                </div>
                <div className="insta-card__stats">
                  <div><b>122</b><span>publications</span></div>
                  <div><b>656</b><span>abonnés</span></div>
                  <div><b>351</b><span>abonnements</span></div>
                </div>
                <div className="insta-card__photo">
                  <Image
                    src="/images/salle2-infinimouv.webp"
                    alt="Intérieur de la salle Infini Mouv"
                    fill
                    sizes="(min-width:901px) 40vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Formulaire contact (natif) */}
              <div className="contact__right" data-reveal data-reveal-delay="120">
                <h2 className="h-section" id="t-contact">
                  <span className="grad">Contact</span>
                </h2>
                <form
                  className="form"
                  action="https://formsubmit.co/agde@infini-mouv.fr"
                  method="POST"
                >
                  <div className="field">
                    <label htmlFor="nom">Prénom &amp; Nom *</label>
                    <input id="nom" name="nom" required />
                  </div>
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="tel">Numéro de téléphone *</label>
                      <input id="tel" name="telephone" type="tel" required />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" required />
                    </div>
                  </div>

                  <div>
                    <p className="form__legend">Vos objectifs sont :</p>
                    <div className="checks">
                      {OBJECTIFS.map((o) => (
                        <label key={o}>
                          <input type="checkbox" name="objectifs" value={o} />
                          {o}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="msg">Votre message *</label>
                    <textarea id="msg" name="message" rows={4} required />
                  </div>

                  <div>
                    <p className="form__legend">La période qui vous intéresse</p>
                    <div className="checks">
                      <label><input type="radio" name="periode" value="Sans engagement" /> Sans engagement</label>
                      <label><input type="radio" name="periode" value="3 mois" /> 3 mois</label>
                      <label><input type="radio" name="periode" value="12 mois" /> 12 mois</label>
                    </div>
                  </div>

                  <button className="form__submit" type="submit">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <img
          className="footer__symbol"
          src="/images/symbole-infinimouv-crop-u355.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="wrap footer__in">
          <div className="footer__info">
            <address>
              4 avenue du 11 novembre 1918,
              <br />
              34300 AGDE <span className="footer__muted">(parking du cinéma)</span>
            </address>
            <div className="footer__row">
              <div className="footer__social">
                <a href="https://www.facebook.com/infinimouvagde/" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/infinimouv_agde/" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
              <a className="footer__phone" href="tel:+33986673838">09 86 67 38 38</a>
            </div>
            <p className="footer__copy">INFINIMOUV © 2026 Tous droits réservés</p>
          </div>
          <a className="footer__credit" href="http://paper34.fr" target="_blank" rel="noopener">
            Réalisé par <img src="/images/logoblanc-paper34.svg" alt="Paper34" />
          </a>
        </div>
      </footer>
    </div>
  );
}
