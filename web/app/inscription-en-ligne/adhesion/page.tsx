import type { Metadata } from "next";
import { Suspense } from "react";
import TunnelInscription from "@/components/inscription/TunnelInscription";

/* ------------------------------------------------------------------
   TUNNEL D'INSCRIPTION — démonstration, non publique.
   Reprend le contrat papier remis au club (formule, coordonnées,
   règlement, signature « lu et approuvé »). Aucune donnée n'est
   envoyée et aucun paiement n'est déclenché tant que le branchement
   Deciplus (fiche adhérent, empreinte bancaire, QR code) n'est pas fait.
   Accès : simulateur de /inscription-en-ligne (© du footer).
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Inscription en ligne",
  robots: { index: false, follow: false },
};

export default function Adhesion() {
  return (
    <Suspense>
      <TunnelInscription />
    </Suspense>
  );
}
