import Image from "next/image";
import { OFFRE, SOIREE, soireeAVenir } from "@/lib/offre";

/* Section « Soirée des 10 ans » de l'accueil + données structurées Event.
   Rendue côté serveur : l'accueil se régénère toutes les heures (ISR), la
   section disparaît donc seule le lendemain de la soirée.
   Offre reprise mot pour mot de la bannière officielle (qui reçoit les
   2 mois n'est pas encore confirmé : ne pas reformuler). */
export default function SoireeAnniversaire() {
  if (!soireeAVenir()) return null;

  const evenement = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Soirée des 10 ans d'Infini Mouv",
    description:
      "Infini Mouv fête ses 10 ans : DJ et apéro dînatoire offert. Pendant la soirée : 2 mois offerts si vous invitez un proche, frais d'inscription à 0 € pour votre invité. Promotion pour l'adhérent et son invité suite à une inscription sur 12 mois.",
    startDate: "2026-10-16T18:30:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: ["https://infini-mouv.fr/images/soiree-10-ans-affiche.webp", "https://infini-mouv.fr/images/soiree-10-ans.webp"],
    location: {
      "@type": "Place",
      name: "Infini Mouv",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4 avenue du 11 Novembre 1918",
        addressLocality: "Agde",
        postalCode: "34300",
        addressCountry: "FR",
      },
    },
    organizer: { "@type": "Organization", name: "Infini Mouv", url: "https://infini-mouv.fr" },
  };

  return (
    <section className="section soiree" id="soiree" aria-labelledby="t-soiree">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(evenement) }} />
      <div className="wrap">
        <p className="soiree__kicker">10 ans d&apos;Infini Mouv</p>
        <h2 className="h-section" id="t-soiree">
          <span className="grad">Soirée anniversaire</span>
        </h2>
        <p className="soiree__date">
          <time dateTime={SOIREE.debut.toISOString()}>{SOIREE.dateLibelle}</time> · au club
        </p>

        <div className="soiree__grille">
          <div className="soiree__visuel" data-reveal>
            <Image src={SOIREE.affiche} alt={SOIREE.alt} width={1500} height={2000} sizes="(min-width:900px) 440px, 90vw" />
          </div>

          <div className="soiree__texte" data-reveal>
            <p>
              Pendant la soirée uniquement&nbsp;: <strong>2 mois offerts si vous invitez un
              proche</strong>, et <strong>frais d&apos;inscription à 0&nbsp;€</strong> pour votre invité.
            </p>
            <p>Ambiance musicale avec un DJ et apéro dînatoire offert.</p>
            <p className="soiree__mention">
              Promotion pour l&apos;adhérent et son invité suite à une inscription sur 12 mois,
              valable uniquement pendant la soirée. Tout le reste d&apos;octobre&nbsp;: {OFFRE.bandeau.offre}{" "}
              {OFFRE.bandeau.condition}.
            </p>
            <p className="soiree__cta">
              <a className="btn btn--light" href="tel:+33986673838">Appeler le club</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
