import type { Metadata } from "next";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tarifs & conditions — Abonnement salle de sport à Agde dès 27,90 €",
  description:
    "Tarifs de la salle de sport Infini Mouv à Agde : de 27,90 € à 39,90 €/mois selon la durée (1, 3 ou 12 mois), options Confort et Premium. Conditions d'inscription détaillées.",
  alternates: { canonical: "/tarifs" },
};

/* ------------------------------------------------------------------
   POINT DE BRANCHEMENT — abonnement en ligne
   Aujourd'hui les CTA renvoient vers le formulaire de contact.
   Le jour où le tunnel d'inscription est prêt (module Xplor ou Stripe),
   il suffit de remplacer cette seule constante par son URL.
   ------------------------------------------------------------------ */
const INSCRIPTION_URL = "/#contact";
const INSCRIPTION_LABEL = "Je m'inscris";

type Formule = {
  duree: string;
  engagement: string;
  prix: string | null; // null = tarif non communiqué publiquement
  mention: string;
  phare?: boolean;
};

const FORMULES: Formule[] = [
  {
    duree: "1 mois",
    engagement: "Sans engagement",
    prix: "39,90 €",
    mention: "La liberté totale, mois par mois. Idéal pour tester ou pour un séjour à Agde.",
  },
  {
    duree: "3 mois",
    engagement: "Engagement 3 mois",
    prix: "34,90 €",
    mention: "Le bon compromis pour installer une vraie routine sans s'engager sur l'année.",
  },
  {
    duree: "12 mois",
    engagement: "Engagement 12 mois",
    prix: "27,90 €",
    mention: "Notre meilleur tarif, pour celles et ceux qui s'inscrivent dans la durée.",
    phare: true,
  },
];

const BASE_INCLUS = [
  "Accès libre 7j/7, de 6h à 23h",
  "Musculation guidée et poids libres (Matrix)",
  "Cardio-training : tapis, vélos, elliptiques, rameurs",
  "Cross-training en accès libre (espace extérieur couvert)",
  "Cours vidéo Les Mills® (sans coach)",
  "Bike interactif Spivi®",
  "Vestiaires et douches",
];

const OPTIONS = [
  {
    nom: "Option Confort",
    prix: "+5 €",
    unite: "par option / mois",
    items: [
      "Boisson hydratante Yanga® en accès illimité",
      "Suivi coaching mensuel",
      "Cours collectifs encadrés par un coach",
    ],
  },
  {
    nom: "Option Premium",
    prix: "+15 €",
    unite: "par option / mois",
    items: ["Suivi coaching expert", "Suivi nutritionnel personnalisé"],
    fonce: true,
  },
];

const CONDITIONS = [
  ["Durée et reconduction", "L'abonnement est souscrit pour la durée choisie (1, 3 ou 12 mois), puis se renouvelle par tacite reconduction."],
  ["Résiliation", "Possible à tout moment après la période d'engagement, par lettre recommandée avec accusé de réception, avec un préavis d'un mois."],
  ["Certificat médical", "Une attestation d'aptitude à la pratique sportive vous est demandée à l'inscription."],
  ["Suspension", "En cas d'empêchement de plus d'un mois (hors congés), vos prélèvements peuvent être gelés et la durée reportée en fin d'engagement."],
  ["Accès au club", "Un badge ou un QR code personnel vous est remis : il est nominatif et ne peut être prêté."],
  ["Paiement", "Au comptant pour la période choisie, ou mensuellement par prélèvement bancaire."],
];

const FAQ_TARIFS: [string, string][] = [
  ["Combien coûte un abonnement à la salle de sport Infini Mouv ?", "Trois formules : 39,90 €/mois sans engagement (1 mois), 34,90 €/mois avec un engagement de 3 mois, et 27,90 €/mois avec un engagement de 12 mois. Les options Confort (+5 €) et Premium (+15 €) s'ajoutent librement."],
  ["Y a-t-il un abonnement sans engagement ?", "Oui, la formule 1 mois à 39,90 €/mois est sans engagement de durée : elle se renouvelle de mois en mois et peut être résiliée avec un préavis d'un mois."],
  ["Les cours collectifs sont-ils compris dans l'abonnement ?", "Les cours vidéo Les Mills® sont compris dans l'abonnement de base. Les cours collectifs encadrés par un coach (C.A.F., Zumba, Pilate, Body Pump, Body Sculpt, Yoga, Stretching, Cross Training) font partie de l'option Confort, à 5 € par mois."],
  ["Que comprend l'abonnement de base ?", "L'accès libre 7j/7 de 6h à 23h, la musculation guidée et les poids libres, le cardio-training, le cross-training en accès libre, les cours vidéo Les Mills®, le bike Spivi® et l'accès aux douches."],
  ["Comment résilier mon abonnement ?", "Par lettre recommandée avec accusé de réception adressée au club, en respectant un préavis d'un mois. La résiliation devient définitive après restitution de votre badge d'accès."],
  ["Peut-on suspendre son abonnement ?", "Oui, en cas d'empêchement de plus d'un mois (hors congés annuels) et sur justificatif : les prélèvements sont gelés et la durée est reportée en fin d'engagement."],
];

export default function Tarifs() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />

      {/* FAQ tarifs — données structurées (résultats enrichis Google) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_TARIFS.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />

      <main>
        <section className="section section--soft tarifs-hero">
          <div className="wrap">
            <h1 className="h-section">
              <span className="grad">Tarifs &amp; conditions</span>
              <span className="sr-only"> de la salle de sport Infini Mouv à Agde</span>
            </h1>
            <p className="svc-intro">
              Un abonnement clair, sans mauvaise surprise. Choisissez la durée
              qui vous convient, ajoutez les options qui vous ressemblent, et
              profitez de la salle en accès libre 7j/7 de 6h à 23h.
            </p>
          </div>
        </section>

        {/* ---------- FORMULES ---------- */}
        <section className="section" aria-labelledby="formules-title">
          <div className="wrap">
            <h2 className="h-section" id="formules-title">
              <span className="grad">Nos formules</span>
            </h2>
            <div className="formules">
              {FORMULES.map((f, i) => (
                <article
                  className={`formule${f.phare ? " formule--phare" : ""}`}
                  data-reveal
                  data-reveal-delay={`${i * 100}`}
                  key={f.duree}
                >
                  {f.phare && <span className="formule__badge">Meilleur tarif</span>}
                  <h3 className="formule__duree">{f.duree}</h3>
                  <p className="formule__engagement">{f.engagement}</p>
                  <div className="formule__prix">
                    {f.prix ? (
                      <>
                        <span className="formule__montant">{f.prix}</span>
                        <span className="formule__unite">/ mois</span>
                      </>
                    ) : (
                      <span className="formule__sur-demande">Tarif sur demande</span>
                    )}
                  </div>
                  <p className="formule__mention">{f.mention}</p>
                  <a className={`btn ${f.phare ? "btn--solid" : "btn--ghost"} formule__cta`} href={INSCRIPTION_URL}>
                    {INSCRIPTION_LABEL}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CE QUI EST COMPRIS ---------- */}
        <section className="section section--soft" aria-labelledby="inclus-title">
          <div className="wrap">
            <h2 className="h-section" id="inclus-title">
              <span className="grad">Compris dans l'abonnement</span>
            </h2>
            <ul className="adv-list inclus-list">
              {BASE_INCLUS.map((item) => (
                <li key={item}>
                  <span className="ck">✓</span>
                  <div><h4>{item}</h4></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- OPTIONS ---------- */}
        <section className="section" aria-labelledby="options-title">
          <div className="wrap">
            <h2 className="h-section" id="options-title">
              <span className="grad">Les options</span>
            </h2>
            <p className="svc-intro">
              Les options s'ajoutent à l'abonnement de base et se cumulent
              librement. Chaque option est facturée mensuellement.
            </p>
            <div className="options-grid">
              {OPTIONS.map((o, i) => (
                <article
                  className={`option-card${o.fonce ? " option-card--fonce" : ""}`}
                  data-reveal
                  data-reveal-delay={`${i * 100}`}
                  key={o.nom}
                >
                  <h3 className="option-card__nom">{o.nom}</h3>
                  <div className="option-card__prix">
                    <span className="option-card__montant">{o.prix}</span>
                    <span className="option-card__unite">{o.unite}</span>
                  </div>
                  <ul className="option-card__items">
                    {o.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CONDITIONS ---------- */}
        <section className="section section--soft" aria-labelledby="conditions-title">
          <div className="wrap">
            <h2 className="h-section" id="conditions-title">
              <span className="grad">Conditions d'abonnement</span>
            </h2>
            <dl className="conditions">
              {CONDITIONS.map(([titre, texte]) => (
                <div className="condition" data-reveal key={titre}>
                  <dt>{titre}</dt>
                  <dd>{texte}</dd>
                </div>
              ))}
            </dl>
            <p className="conditions__note">
              Conditions générales de vente complètes remises et signées lors de
              l&apos;inscription au club. Des frais d&apos;inscription, un badge
              d&apos;accès et un dépôt de garantie sont à prévoir à la
              souscription&nbsp;: les montants vous sont communiqués au club.
            </p>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="section" aria-labelledby="faq-tarifs-title">
          <div className="wrap">
            <h2 className="h-section" id="faq-tarifs-title" style={{ textAlign: "center" }}>
              <span className="grad">Questions sur les tarifs</span>
            </h2>
            <div className="faq">
              {FAQ_TARIFS.map(([q, a]) => (
                <details data-reveal key={q}>
                  <summary>{q}</summary>
                  <div className="faq__a">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="section section--soft">
          <div className="wrap tarifs-cta">
            <h2 className="tarifs-cta__titre">Prêt à commencer&nbsp;?</h2>
            <p className="tarifs-cta__texte">
              Passez au club pour une visite, ou laissez-nous vos coordonnées&nbsp;:
              on vous rappelle et on choisit ensemble la formule qui vous
              correspond.
            </p>
            <div className="tarifs-cta__actions">
              <a className="btn btn--solid" href={INSCRIPTION_URL}>{INSCRIPTION_LABEL}</a>
              <a className="btn btn--ghost" href="tel:+33986673838">09 86 67 38 38</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
