"use client";

import Script from "next/script";
import { useConsent, ContenuBloque } from "./Consent";

/** Charge la plateforme Elfsight uniquement après consentement. */
export function ElfsightPlatform() {
  const { etat } = useConsent();
  if (etat !== "granted") return null;
  return (
    <Script
      src="https://static.elfsight.com/platform/platform.js"
      strategy="afterInteractive"
    />
  );
}

/** Widget Elfsight : monté seulement après consentement. */
export function ElfsightWidget({
  appId,
  titre,
  description,
}: {
  appId: string;
  titre: string;
  description?: string;
}) {
  const { etat } = useConsent();
  if (etat !== "granted") {
    return <ContenuBloque titre={titre}>{description}</ContenuBloque>;
  }
  return <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />;
}

/** Carte Google Maps : chargée seulement après consentement. */
export function CarteGoogle() {
  const { etat } = useConsent();
  if (etat !== "granted") {
    return (
      <ContenuBloque titre="Carte Google Maps">
        La carte est fournie par Google, qui dépose des cookies. Vous pouvez
        aussi nous trouver au 4 avenue du 11 Novembre 1918, 34300 Agde
        (parking du cinéma).
      </ContenuBloque>
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
