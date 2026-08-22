import type { Metadata } from "next";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et gestion des cookies du site infini-mouv.fr — Infini Mouv, salle de sport à Agde.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <div className="site" id="top">
      <NavFaithful />
      <main>
        <section className="section legal">
          <div className="wrap legal__in">
            <h1 className="h-section"><span className="grad">Politique de confidentialité</span></h1>
            <p className="legal__chapo">
              Cette page explique quelles données personnelles sont collectées via
              le site infini-mouv.fr, pourquoi, combien de temps elles sont
              conservées et comment exercer vos droits.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              <strong>INFINI MOUV</strong> — 4T avenue du 11 Novembre 1918, 34300 Agde
              <br />
              Téléphone : <a href="tel:+33986673838">09 86 67 38 38</a> — Email :{" "}
              <a href="mailto:agde@infini-mouv.fr">agde@infini-mouv.fr</a>
            </p>

            <h2>2. Données collectées via le site</h2>
            <p>
              Le site est un site de présentation. Les seules données que vous nous
              transmettez volontairement le sont via le <strong>formulaire de contact</strong> :
              nom et prénom, téléphone, adresse email, objectifs sportifs, période
              d&apos;abonnement envisagée et contenu de votre message.
            </p>

            <h2>3. Finalités et base légale</h2>
            <p>
              Ces données servent uniquement à <strong>répondre à votre demande</strong> et,
              le cas échéant, à vous accompagner dans votre inscription. La base
              légale est votre consentement, ainsi que les mesures précontractuelles
              prises à votre demande. Elles ne sont ni vendues ni cédées à des tiers
              à des fins commerciales.
            </p>

            <h2>4. Destinataires</h2>
            <p>
              Vos données sont traitées par l&apos;équipe du club. Elles peuvent être
              hébergées ou traitées par nos prestataires techniques :
            </p>
            <ul className="legal__liste">
              <li><strong>Vercel</strong> — hébergement du site</li>
              <li><strong>Elfsight</strong> — widgets de formulaire, avis et Instagram</li>
              <li><strong>Xplor Deciplus</strong> — logiciel de gestion des adhérents du club</li>
            </ul>

            <h2>5. Durée de conservation</h2>
            <p>
              Les demandes de contact sont conservées le temps nécessaire à leur
              traitement, puis au maximum <strong>3 ans</strong> à compter du dernier
              contact. Les données des adhérents sont conservées pendant la durée
              du contrat, puis selon les obligations légales et comptables
              applicables.
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, de limitation, d&apos;opposition et de
              portabilité de vos données, ainsi que du droit de retirer votre
              consentement à tout moment. Pour les exercer, écrivez à{" "}
              <a href="mailto:agde@infini-mouv.fr">agde@infini-mouv.fr</a> ou à
              l&apos;adresse du club.
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la CNIL —{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
            </p>

            <h2>7. Cookies et services tiers</h2>
            <p>
              Le site ne dépose <strong>aucun cookie publicitaire ni de mesure
              d&apos;audience</strong>. En revanche, certains contenus proviennent de
              services externes susceptibles de déposer des cookies :
            </p>
            <ul className="legal__liste">
              <li><strong>Elfsight</strong> — formulaire de contact, avis Google, flux Instagram</li>
              <li><strong>Google Maps</strong> — carte de localisation du club</li>
            </ul>
            <p>
              Ces services <strong>ne sont chargés qu&apos;après votre accord</strong>.
              Tant que vous n&apos;avez pas accepté, ils restent bloqués et un encadré
              vous propose de les activer. Vous pouvez modifier votre choix à tout
              moment en effaçant les données du site dans votre navigateur.
            </p>

            <h2>8. Vidéosurveillance du club</h2>
            <p>
              Les locaux du club sont placés sous vidéosurveillance. Les images sont
              conservées 30 jours et ne sont consultées qu&apos;en cas d&apos;incident,
              par la direction et l&apos;agent d&apos;accueil. Une notice d&apos;information
              complète est disponible à l&apos;accueil.
            </p>

            <h2>9. Mise à jour</h2>
            <p>
              Cette politique peut évoluer, notamment en cas d&apos;évolution
              législative ou de changement de prestataire. Dernière mise à jour :
              août 2026.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
