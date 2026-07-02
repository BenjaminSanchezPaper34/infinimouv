import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="site nf">
      <div className="wrap nf__in">
        <p className="h-section" style={{ marginBottom: 8 }}>
          <span className="grad">Oups&nbsp;!</span>
        </p>
        <h1 className="nf__title">Cette page n&apos;existe pas (404)</h1>
        <p className="nf__text">
          Le lien est peut-être ancien ou erroné. Pas de panique&nbsp;: tout ce
          qu&apos;il faut savoir sur la salle est sur la page d&apos;accueil.
        </p>
        <div className="nf__actions">
          <a className="btn btn--solid" href="/">Retour à l&apos;accueil</a>
          <a className="btn btn--ghost" href="/services-equipements">
            Services &amp; équipements
          </a>
        </div>
      </div>
    </div>
  );
}
