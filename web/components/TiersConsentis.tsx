"use client";

import Script from "next/script";
import { useConsent, ContenuCoupe } from "./Consent";

/* Services d'affichage : actifs par défaut, coupés seulement si le visiteur
   l'a demandé dans ses préférences (modèle opt-out Paper34). Rien n'est
   monté avant relecture du localStorage, pour honorer un refus mémorisé. */

/** Plateforme Elfsight (avis, Instagram, formulaire). */
export function ElfsightPlatform() {
  const { actif } = useConsent();
  if (!actif("elfsight")) return null;
  return (
    <Script
      src="https://static.elfsight.com/platform/platform.js"
      strategy="afterInteractive"
    />
  );
}

/** Widget Elfsight, ou son encadré de repli si le service est coupé. */
export function ElfsightWidget({
  appId,
  titre,
  description,
}: {
  appId: string;
  titre: string;
  description?: string;
}) {
  const { actif } = useConsent();
  if (!actif("elfsight")) {
    return <ContenuCoupe service="elfsight" titre={titre}>{description}</ContenuCoupe>;
  }
  return <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />;
}

/** Carte Google Maps, ou l'adresse en clair si le service est coupé. */
export function CarteGoogle() {
  const { actif } = useConsent();
  if (!actif("maps")) {
    return (
      <ContenuCoupe service="maps" titre="Carte Google Maps">
        Vous avez désactivé la carte. Retrouvez-nous au 4 avenue du 11 Novembre
        1918, 34300 Agde (parking du cinéma).
      </ContenuCoupe>
    );
  }
  return (
    <iframe
      title="Infini Mouv — 4 avenue du 11 Novembre 1918, 34300 Agde (parking du cinéma)"
      src="https://www.google.com/maps?q=Infini+Mouv,+4+avenue+du+11+Novembre+1918,+34300+Agde&output=embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
