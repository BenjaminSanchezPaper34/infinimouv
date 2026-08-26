import type { Metadata } from "next";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";
import SimulateurTarif from "@/components/SimulateurTarif";

/* ------------------------------------------------------------------
   PAGE DE PRÉVISUALISATION — non publique.
   Le simulateur de tarif vit ici tant que la grille (frais, badge,
   options) n'est pas validée par le club. Pas de lien dans la nav ni
   le sitemap ; seul le « © » du footer y mène (bouton caché).
   Le jour du lancement : rebasculer la section sur /tarifs.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Inscription en ligne — prévisualisation",
  robots: { index: false, follow: false }, // page cachée : non indexée
};

/* Le CTA reste sur le formulaire de contact tant que le tunnel n'existe pas. */
const INSCRIPTION_URL = "/#contact";

export default function InscriptionEnLigne() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />
      <main>
        <section className="section section--soft" aria-labelledby="sim-title">
          <div className="wrap">
            <h1 className="h-section" id="sim-title" style={{ textAlign: "center" }}>
              <span className="grad">Estimez votre abonnement</span>
            </h1>
            <p className="svc-intro sim-intro">
              Composez votre formule et découvrez, sans surprise, ce que vous
              réglerez le premier jour puis chaque mois.
            </p>
            <SimulateurTarif inscriptionUrl={INSCRIPTION_URL} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
