import type { Metadata } from "next";
import Motion from "@/components/Motion";
import NavFaithful from "@/components/NavFaithful";
import Footer from "@/components/Footer";
import Inscription from "@/components/inscription/Inscription";

/* ------------------------------------------------------------------
   PAGE NON PUBLIQUE : inscription en ligne (démonstration).
   Le visiteur compose sa formule, remplit le contrat et signe, sur une
   seule page. Pas de lien dans la nav ni le sitemap ; seul le « © » du
   footer y mène (bouton caché) tant que le club n'a pas tranché.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Inscription en ligne",
  robots: { index: false, follow: false }, // page cachée : non indexée
};

export default function InscriptionEnLigne() {
  return (
    <div className="site" id="top">
      <Motion />
      <NavFaithful />
      <main>
        <section className="section section--soft sim-page" aria-labelledby="sim-title">
          <div className="wrap">
            <h1 className="h-section" id="sim-title" style={{ textAlign: "center" }}>
              <span className="grad">Inscrivez-vous en ligne</span>
            </h1>
            <p className="svc-intro sim-intro">
              Composez votre formule, voyez ce que vous réglez aujourd&apos;hui puis
              chaque mois, et signez votre contrat depuis votre téléphone.
            </p>
            <Inscription />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
