import type { Metadata } from "next";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site infini-mouv.fr — Infini Mouv, salle de sport à Agde.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <div className="site" id="top">
      <NavFaithful />
      <main>
        <section className="section legal">
          <div className="wrap legal__in">
            <h1 className="h-section"><span className="grad">Mentions légales</span></h1>

            <h2>Éditeur du site</h2>
            <p>
              <strong>INFINI MOUV</strong>
              <br />
              4T avenue du 11 Novembre 1918 — 34300 Agde, France
              <br />
              SIRET : 821 761 277 00028
              <br />
              Téléphone : <a href="tel:+33986673838">09 86 67 38 38</a>
              <br />
              Email : <a href="mailto:agde@infini-mouv.fr">agde@infini-mouv.fr</a>
            </p>

            <h2>Directeur de la publication</h2>
            <p>Le gérant de la société INFINI MOUV.</p>

            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </p>

            <h2>Conception et réalisation</h2>
            <p>
              Site conçu et réalisé par{" "}
              <a href="https://www.paper34.fr" target="_blank" rel="noopener noreferrer">Paper34</a>.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, photographies,
              logos, éléments graphiques, vidéos) est la propriété d&apos;INFINI MOUV
              ou de ses partenaires, et est protégé par le droit de la propriété
              intellectuelle. Toute reproduction, représentation ou diffusion,
              totale ou partielle, sans autorisation écrite préalable est interdite.
            </p>
            <p>
              Les marques citées (Matrix, Spivi®, Les Mills®, Yanga®, Xplor Active,
              Éric Favre, Nutripure) demeurent la propriété de leurs titulaires
              respectifs.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Le traitement de vos données personnelles est détaillé dans notre{" "}
              <a href="/confidentialite">politique de confidentialité</a>.
            </p>

            <h2>Médiation de la consommation</h2>
            <p>
              Conformément à l&apos;article L.612-1 du Code de la consommation, en cas
              de litige relatif à l&apos;exécution, l&apos;interprétation ou la
              résiliation d&apos;un contrat d&apos;abonnement, l&apos;adhérent peut
              recourir gratuitement au médiateur de la consommation :
              <br />
              <strong>MTV Médiation Tourisme Voyage</strong> — BP 80 303, 75823 Paris Cedex 17 —{" "}
              <a href="https://www.mtv.travel/demande-saisine/" target="_blank" rel="noopener noreferrer">
                mtv.travel
              </a>
            </p>
            <p>
              Le recours au médiateur suppose d&apos;avoir préalablement tenté de
              résoudre le litige directement auprès du club par réclamation écrite.
            </p>

            <h2>Responsabilité</h2>
            <p>
              INFINI MOUV s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              diffusées sur ce site. Les horaires, tarifs et plannings sont
              susceptibles d&apos;évoluer ; seules les informations affichées au club
              font foi. Des liens vers des sites tiers peuvent être proposés :
              INFINI MOUV n&apos;exerce aucun contrôle sur leur contenu et décline
              toute responsabilité à leur égard.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
