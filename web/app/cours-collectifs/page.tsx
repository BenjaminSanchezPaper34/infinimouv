import type { Metadata } from "next";
import Image from "next/image";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";
import PlanningCours, { JOURS, MIDI, SOIR, creneauxDe, fr } from "@/components/PlanningCours";
import { COURS } from "@/lib/cours";

export const metadata: Metadata = {
  title: "Cours collectifs à Agde : Pilates, Yoga, Body Pump, Zumba",
  description:
    "Pilates, Yoga, Body Pump, Body Sculpt, C.A.F., Stretching, Zumba et Cross Training encadrés par un coach, le midi et le soir. Planning et réservation sur l'app Xplor Active.",
  alternates: { canonical: "/cours-collectifs" },
};

/* Compteurs tirés du planning : jamais à mettre à jour à la main. */
const NB_SEANCES = JOURS.reduce((n, j) => n + (MIDI[j]?.length ?? 0) + (SOIR[j]?.length ?? 0), 0);

const FAQ: [string, string][] = [
  ["Comment réserver un cours collectif ?", "Via l'application Xplor Active (code centre « infinimouv »), ou directement à l'accueil du club. Utilisez sur l'app la même adresse mail que lors de votre inscription à la salle."],
  ["Combien de personnes par cours ?", "De 3 à 12 personnes. En dessous de 3 inscrits, le cours est annulé. Pensez à annuler votre réservation au moins 24 h à l'avance pour libérer la place."],
  ["Les cours collectifs sont-ils compris dans l'abonnement ?", "Les cours vidéo Les Mills® sont compris dans l'abonnement de base. Les cours encadrés par un coach font partie de l'option Confort, à 5 € par mois."],
  ["Quel niveau faut-il pour participer ?", "Renseignez-vous auprès de l'équipe à l'accueil : elle vous oriente vers le cours adapté à votre niveau et à vos objectifs."],
];

/* Liste « Jeudi 12h15–13h00 · Jeudi 19h15–19h45 » d'un cours */
function Horaires({ type }: { type: (typeof COURS)[number]["type"] }) {
  const liste = creneauxDe(type);
  if (!liste.length) return null;
  return (
    <ul className="cours-item__creneaux">
      {liste.map((c) => (
        <li key={`${c.jour}-${c.debut}`}>
          {c.jour} <time dateTime={c.debut}>{fr(c.debut)}</time>–<time dateTime={c.fin}>{fr(c.fin)}</time>
        </li>
      ))}
    </ul>
  );
}

export default function CoursCollectifs() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: "https://infini-mouv.fr/" },
                { "@type": "ListItem", position: 2, name: "Cours collectifs", item: "https://infini-mouv.fr/cours-collectifs" },
              ],
            },
          ]),
        }}
      />

      <main>
        <section className="cours-hero" aria-hidden="true">
          <Image src="/images/courscollectifs-infinimouv.webp" alt="" fill priority sizes="100vw" className="cours-hero__img" />
        </section>

        {/* ============ INTRO + L'ESSENTIEL ============ */}
        <section className="section section--soft">
          <div className="wrap">
            <h1 className="h-section">
              <span className="grad">Cours collectifs</span>
              <span className="sr-only"> à Agde</span>
            </h1>
            <p className="svc-intro">
              Pilates, Yoga, Body Pump, Zumba… Nos coachs animent {COURS.length} cours
              collectifs différents chaque semaine dans votre salle de sport à Agde,
              le midi et en fin de journée. Choisissez selon vos objectifs et
              profitez de conseils personnalisés.
            </p>
            <aside className="essentiel" aria-label="L'essentiel">
              <p className="essentiel__titre">L&apos;essentiel</p>
              <ul>
                <li><strong>{NB_SEANCES} séances par semaine</strong>, du lundi au vendredi : le midi (12h15–13h) et le soir (18h–19h45).</li>
                <li><strong>{COURS.length} disciplines</strong> encadrées par un coach : Pilates, Yoga, Body Pump, Body Sculpt, C.A.F., Stretching, Zumba, Cross Training.</li>
                <li><strong>Réservation sur l&apos;app Xplor Active</strong> (code centre « infinimouv ») ou à l&apos;accueil, de 3 à 12 personnes par cours.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* ============ LES COURS ============ */}
        <section className="section" aria-labelledby="cours-title">
          <div className="wrap">
            <h2 className="h-section" id="cours-title" style={{ textAlign: "center" }}><span className="grad">Nos cours</span></h2>
            <div className="cours-grid">
              {COURS.map((c, i) => (
                <article className="cours-item" id={c.type} data-reveal data-reveal-delay={`${(i % 2) * 80}`} key={c.type}>
                  <h3 className="cours-item__title" style={{ color: c.couleur }}>{c.titre}</h3>
                  <p className="cours-item__text">{c.texte}</p>
                  <Horaires type={c.type} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PLANNING ============ */}
        <section className="section section--soft section--planning" id="planning" aria-labelledby="planning-title">
          <div className="wrap">
            <h2 className="h-section" id="planning-title" style={{ textAlign: "center" }}><span className="grad">Planning des cours</span></h2>
            <div className="planning" data-reveal>
              <PlanningCours />
            </div>
          </div>
        </section>

        {/* ============ APP ============ */}
        <section className="section" aria-labelledby="app-title">
          <div className="wrap">
            <div className="app-band">
              <div className="app-band__img" data-reveal>
                <Image src="/images/app-infinimouv.webp" alt="Application Xplor Active — planning des cours" width={600} height={1215} sizes="(min-width:901px) 300px, 70vw" />
              </div>
              <div data-reveal data-reveal-delay="120">
                <h2 className="h-section" id="app-title"><span className="grad">Réservez sur l&apos;app</span></h2>
                <div className="app-xplor">
                  <Image src="/images/appxplor-infinimouv.webp" alt="" width={48} height={48} />
                  <span>Xplor Active</span>
                </div>
                <p className="svc-row__text">
                  Réservez vos cours et gérez votre abonnement depuis
                  l&apos;application Xplor Active. Veillez à utiliser la même adresse
                  mail sur l&apos;app que lors de votre inscription à la salle.
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

        {/* ============ FAQ ============ */}
        <section className="section section--soft" aria-labelledby="faq-title">
          <div className="wrap">
            <h2 className="h-section" id="faq-title" style={{ textAlign: "center" }}><span className="grad">Questions fréquentes</span></h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details data-reveal key={q}>
                  <summary>{q}</summary>
                  <div className="faq__a">{a}</div>
                </details>
              ))}
            </div>
            <p className="cours-cta">
              <a className="btn btn--solid" href="/tarifs">Voir les abonnements</a>
              <a className="btn btn--ghost" href="/#contact">Nous contacter</a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
