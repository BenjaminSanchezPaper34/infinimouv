"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ACCES, DUREES, FAMILLES, FRAIS, HORAIRES, PRESTATIONS, calculer, clubOuvert, eur, type AccesId, type DureeId } from "@/lib/grille";
import { OFFRE, offreEnCours } from "@/lib/offre";
import SignaturePad from "./SignaturePad";
import Bienvenue from "./Bienvenue";

/* ------------------------------------------------------------------
   Inscription en ligne, sur une seule page : on compose sa formule
   (le simulateur), puis on remplit le contrat papier du club
   (CONTRAT-A4-INFINIMOUV) dans le même ordre, et on signe.
   Le récapitulatif vert suit la saisie et porte le bouton de paiement.

   DÉMONSTRATION : rien ne part nulle part. Les points de branchement
   Deciplus (fiche adhérent, empreinte bancaire du dépôt, prélèvements,
   envoi du QR code) sont marqués « DECIPLUS » dans le code.
   ------------------------------------------------------------------ */

const CLE_DOSSIER = "im-inscription-demo"; // sessionStorage : survit à un rechargement
const CONTRAT_PDF = "/documents/contrat-inscription-infini-mouv.pdf";

type Dossier = {
  duree: DureeId;
  options: string[];
  acces: AccesId;
  renouvellement: boolean;
  nom: string;
  prenom: string;
  naissance: string;
  tel: string;
  email: string;
  adresse: string;
  cp: string;
  ville: string;
  profession: string;
  parrainage: boolean;
  parrain: string;
  representant: string;
  mode: "cb" | "sepa";
  cgv: boolean;
  certificat: boolean;
  autorisation: boolean;
  demarrage: boolean;
  newsletter: boolean;
  mention: string;
};

const VIERGE: Dossier = {
  duree: "12m", options: [], acces: "qr", renouvellement: false,
  nom: "", prenom: "", naissance: "", tel: "", email: "",
  adresse: "", cp: "", ville: "", profession: "",
  parrainage: false, parrain: "", representant: "",
  mode: "cb", cgv: false, certificat: false, autorisation: false,
  demarrage: false, newsletter: false, mention: "",
};

/** Âge révolu à partir d'une date AAAA-MM-JJ. */
function age(naissance: string) {
  const n = new Date(naissance);
  if (Number.isNaN(n.getTime())) return null;
  const a = new Date();
  let ans = a.getFullYear() - n.getFullYear();
  if (a.getMonth() < n.getMonth() || (a.getMonth() === n.getMonth() && a.getDate() < n.getDate())) ans--;
  return ans;
}

/** Contrôle de tout le contrat : renvoie { champ: message }. */
function controler(d: Dossier, signee: boolean) {
  const e: Record<string, string> = {};
  const ans = age(d.naissance);
  if (!d.prenom.trim()) e.prenom = "Indiquez votre prénom.";
  if (!d.nom.trim()) e.nom = "Indiquez votre nom.";
  if (ans === null) e.naissance = "Indiquez votre date de naissance.";
  else if (ans < 14 || ans > 110) e.naissance = "Vérifiez votre date de naissance.";
  if (!/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(d.tel.trim())) e.tel = "Un numéro de portable valide, par exemple 06 12 34 56 78.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Une adresse e-mail valide.";
  if (!d.adresse.trim()) e.adresse = "Indiquez votre adresse.";
  if (!/^\d{5}$/.test(d.cp.trim())) e.cp = "5 chiffres.";
  if (!d.ville.trim()) e.ville = "Indiquez votre ville.";
  if (d.parrainage && !d.parrain.trim()) e.parrain = "Le nom de votre parrain ou marraine.";
  if (ans !== null && ans < 18) {
    if (!d.representant.trim()) e.representant = "Nom et prénom d'un parent ou tuteur.";
    if (!d.autorisation) e.autorisation = "L'autorisation parentale est obligatoire.";
  }
  if (!d.cgv) e.cgv = "Merci d'accepter les conditions générales.";
  if (!d.certificat) e.certificat = "Cet engagement est obligatoire.";
  if (d.mention.trim().toLowerCase().replace(/\s+/g, " ") !== "lu et approuvé") e.mention = "Recopiez exactement « lu et approuvé ».";
  if (!signee) e.signature = "Signez dans le cadre.";
  return e;
}

export default function Inscription() {
  const [d, setD] = useState<Dossier>(VIERGE);
  const [signature, setSignature] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);
  const [fini, setFini] = useState(false);
  const [pret, setPret] = useState(false);
  const [ouvert, setOuvert] = useState(true);
  const haut = useRef<HTMLDivElement>(null);
  const depart = useRef<Dossier | null>(null);
  const commence = useRef(false);

  // Club ouvert ou fermé, à la minute près (heure de Paris) : conditionne l'accès immédiat.
  useEffect(() => {
    const lire = () => setOuvert(clubOuvert());
    lire();
    const id = window.setInterval(lire, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Reprise d'un dossier en cours (rechargement de la page).
  useEffect(() => {
    let repris: Partial<Dossier> = {};
    try { repris = JSON.parse(sessionStorage.getItem(CLE_DOSSIER) || "{}"); } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique au montage (stockage navigateur)
    setD({ ...VIERGE, ...repris, mention: "" });
    setPret(true);
  }, []);

  // Première saisie du visiteur : l'inscription commence (une seule fois).
  useEffect(() => {
    if (!pret) return;
    if (!depart.current) { depart.current = d; return; }
    if (depart.current !== d && !commence.current) { commence.current = true; track("inscription_debut"); }
  }, [d, pret, fini]);

  useEffect(() => {
    if (!pret || fini) return;
    try { sessionStorage.setItem(CLE_DOSSIER, JSON.stringify({ ...d, mention: "" })); } catch {}
  }, [d, pret, fini]);

  const calc = useMemo(() => calculer(d.duree, d.options, d.acces), [d.duree, d.options, d.acces]);
  const mineur = !!d.naissance && (age(d.naissance) ?? 99) < 18;
  const promo = offreEnCours();
  const nbErreurs = Object.keys(erreurs).length;

  const maj = <K extends keyof Dossier>(k: K, v: Dossier[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    setErreurs((p) => { if (!p[k]) return p; const n = { ...p }; delete n[k]; return n; });
  };

  const basculerOption = (id: string) =>
    maj("options", d.options.includes(id) ? d.options.filter((o) => o !== id) : [...d.options, id]);

  const signer = () => {
    const e = controler(d, !!signature);
    setErreurs(e);
    if (Object.keys(e).length) {
      // Amène le premier champ en erreur sous les yeux (et le focus clavier).
      track("inscription_incomplete", { manques: Object.keys(e).length });
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>("[aria-invalid='true']");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    // DECIPLUS : création de la fiche adhérent + contrat signé (PDF), empreinte
    // bancaire du dépôt, mandat de prélèvement, puis envoi du QR code.
    track("inscription_signee", {
      duree: d.duree, acces: d.acces, options: d.options.length, mode: d.mode,
      renouvellement: d.renouvellement, demarrage: d.demarrage, montant: calc.aujourdhui / 100,
    });
    setEnvoi(true);
    window.setTimeout(() => {
      setEnvoi(false);
      setFini(true);
      try { sessionStorage.removeItem(CLE_DOSSIER); } catch {}
      haut.current?.scrollIntoView({ behavior: "smooth" });
    }, 1400);
  };

  /* Carte à choix unique (durée, accès, type d'inscription, règlement). */
  const choix = (nom: string, actif: boolean, onChoisir: () => void, titre: string, prix?: React.ReactNode, note?: string) => (
    <label key={titre} className={`sim-duree${actif ? " est-choisi" : ""}`}>
      <input type="radio" name={nom} checked={actif} onChange={onChoisir} />
      <span className="sim-duree__label">{titre}</span>
      {prix && <span className="sim-duree__prix">{prix}</span>}
      {note && <span className="sim-duree__engagement">{note}</span>}
    </label>
  );

  /* Champ texte : libellé, saisie, message d'erreur relié. */
  const champ = (
    k: keyof Dossier, label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {}, large = false,
  ) => (
    <label className={`champ${large ? " champ--large" : ""}`}>
      <span className="champ__label">{label}</span>
      <input
        className="champ__saisie"
        value={d[k] as string}
        onChange={(ev) => maj(k, ev.target.value as never)}
        aria-invalid={!!erreurs[k]}
        aria-describedby={erreurs[k] ? `err-${k}` : undefined}
        {...props}
      />
      {erreurs[k] && <span className="champ__erreur" id={`err-${k}`}>{erreurs[k]}</span>}
    </label>
  );

  /* Case à cocher au style des options du simulateur. */
  const engagement = (k: keyof Dossier, children: React.ReactNode, obligatoire = true) => (
    <label className={`sim-option sim-option--texte${d[k] ? " est-choisi" : ""}`}>
      <input
        type="checkbox"
        checked={d[k] as boolean}
        onChange={(ev) => maj(k, ev.target.checked as never)}
        aria-invalid={!!erreurs[k]}
        aria-describedby={erreurs[k] ? `err-${k}` : undefined}
      />
      <span className="sim-option__coche" aria-hidden="true">✓</span>
      <span className="sim-option__corps">
        <span className="sim-option__texte">
          {children}
          {!obligatoire && <span className="sim__facultatif"> (facultatif)</span>}
        </span>
        {erreurs[k] && <span className="champ__erreur" id={`err-${k}`}>{erreurs[k]}</span>}
      </span>
    </label>
  );

  if (fini) {
    return (
      <div ref={haut} className="sim-fin">
        <Bienvenue prenom={d.prenom.trim() || "vous"} graine={`${d.prenom}${d.nom}${d.email}`} badge={d.acces === "badge"} />
      </div>
    );
  }

  return (
    <div ref={haut}>

      <div className="sim sim--inscription" data-reveal>
        {/* ================= Formule, puis contrat ================= */}
        <div className="sim__choix">
          <fieldset className="sim__bloc">
            <legend className="sim__legende">1. Votre durée</legend>
            <div className="sim__durees" role="radiogroup" aria-label="Durée d'abonnement">
              {DUREES.map((x) => choix("duree", d.duree === x.id, () => maj("duree", x.id), x.label, <>{eur(x.mensuel)}<small>/mois</small></>, x.engagement))}
            </div>
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">2. Vos options <span className="sim__facultatif">(à la carte, cochez celles qui vous intéressent)</span></legend>
            {FAMILLES.map((f) => (
              <div className="sim__famille" key={f.nom}>
                <h3 className="sim__famille-titre">{f.nom} <span className="sim__famille-tarif">{f.tarif}</span></h3>
                <div className="sim__options">
                  {PRESTATIONS.filter((p) => p.famille === f.nom).map((p) => (
                    <label key={p.id} className={`sim-option${d.options.includes(p.id) ? " est-choisi" : ""}`}>
                      <input type="checkbox" checked={d.options.includes(p.id)} onChange={() => basculerOption(p.id)} />
                      <span className="sim-option__coche" aria-hidden="true">✓</span>
                      <span className="sim-option__corps"><span className="sim-option__nom">{p.nom}</span></span>
                      <span className="sim-option__prix">+{eur(p.mensuel)}<small>/mois</small></span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">3. Votre accès au club</legend>
            <div className="sim__acces" role="radiogroup" aria-label="Moyen d'accès au club">
              {ACCES.map((a) => choix("acces", d.acces === a.id, () => maj("acces", a.id), a.nom,
                a.prix === 0 ? "Offert" : eur(a.prix),
                a.id === "qr" ? "Sur votre téléphone, dès l'inscription" : "Nominatif, à retirer à l'accueil"))}
            </div>
            <p className="sim__apropos">En cas de perte, détérioration ou vol : remplacement du QR code {eur(ACCES[0].remplacement)}, du badge {eur(ACCES[1].remplacement)}.</p>
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">4. Vos coordonnées</legend>
            <div className="sim__acces sim__acces--serre" role="radiogroup" aria-label="Type d'inscription">
              {choix("type", !d.renouvellement, () => maj("renouvellement", false), "Première inscription")}
              {choix("type", d.renouvellement, () => maj("renouvellement", true), "Renouvellement", undefined, "Je suis déjà adhérent")}
            </div>
            <div className="champs">
              {champ("prenom", "Prénom", { autoComplete: "given-name" })}
              {champ("nom", "Nom", { autoComplete: "family-name" })}
              {champ("naissance", "Date de naissance", { type: "date", autoComplete: "bday" })}
              {champ("tel", "Téléphone portable", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
              {champ("email", "E-mail", { type: "email", inputMode: "email", autoComplete: "email" }, true)}
              {champ("adresse", "Adresse", { autoComplete: "street-address" }, true)}
              {champ("cp", "Code postal", { inputMode: "numeric", autoComplete: "postal-code", maxLength: 5 })}
              {champ("ville", "Ville", { autoComplete: "address-level2" })}
              {champ("profession", "Profession (facultatif)", { autoComplete: "organization-title" }, true)}
            </div>

            {mineur && (
              <div className="sim__encadre sim__encadre--alerte">
                <p><strong>Vous avez moins de 18 ans :</strong> l&apos;inscription se fait avec l&apos;accord d&apos;un parent ou tuteur, qui signe le contrat (article 7).</p>
                <div className="champs">{champ("representant", "Parent ou tuteur (nom et prénom)", { autoComplete: "off" }, true)}</div>
              </div>
            )}

            <p className="sim__sous-legende">Parrainage</p>
            <div className="bascule" role="radiogroup" aria-label="Venez-vous de la part d'un adhérent ?">
              <label className={!d.parrainage ? "est-choisi" : ""}>
                <input type="radio" name="parrainage" checked={!d.parrainage} onChange={() => maj("parrainage", false)} /> Non
              </label>
              <label className={d.parrainage ? "est-choisi" : ""}>
                <input type="radio" name="parrainage" checked={d.parrainage} onChange={() => maj("parrainage", true)} /> Oui, un adhérent m&apos;a parrainé
              </label>
            </div>
            {d.parrainage && <div className="champs">{champ("parrain", "Nom de votre parrain ou marraine", {}, true)}</div>}
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">5. Votre règlement</legend>
            <div className="sim__acces" role="radiogroup" aria-label="Règlement des mensualités">
              {choix("mode", d.mode === "cb", () => maj("mode", "cb"), "Carte bancaire", undefined, "Prélevée automatiquement chaque mois")}
              {choix("mode", d.mode === "sepa", () => maj("mode", "sepa"), "Prélèvement SEPA", undefined, "Mandat sur votre compte (IBAN)")}
            </div>
            <p className="sim__apropos">Chèque, espèces ou paiement de l&apos;année en une fois : l&apos;inscription se fait alors à l&apos;accueil du club.</p>
            <div className="sim__encadre">
              <p><strong>Dépôt de garantie {eur(FRAIS.depot)}, non débité.</strong> Une empreinte de votre carte bancaire, comme une caution : elle n&apos;est encaissée qu&apos;en cas d&apos;impayé et vous est restituée en fin de contrat (article 6.3).</p>
            </div>
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">6. Vos engagements</legend>
            <div className="sim__options">
              {engagement("cgv", <>J&apos;ai lu et j&apos;accepte les <a href={CONTRAT_PDF} target="_blank" rel="noopener">conditions générales de vente</a> et le règlement intérieur affiché au club.</>)}
              {engagement("certificat", <>Mon état de santé me permet de pratiquer le sport et je remettrai au club un certificat médical d&apos;aptitude (article 8).</>)}
              {mineur && engagement("autorisation", <>Mon parent ou tuteur{d.representant ? `, ${d.representant},` : ""} autorise mon inscription et signe ce contrat.</>)}
              {engagement("demarrage", <>Je souhaite accéder au club dès aujourd&apos;hui, sans attendre la fin du délai de rétractation de 14 jours. Si je me rétracte, je réglerai la période déjà utilisée.</>, false)}
              {d.demarrage && !ouvert && (
                <div className="sim__encadre sim__encadre--alerte sim__encadre--serre" role="status">
                  {d.acces === "badge" ? (
                    <>
                      <p>
                        <strong>Le club est fermé en ce moment</strong> (accès de {HORAIRES.ouverture}h à {HORAIRES.fermeture}h) :
                        votre badge ne pourra être retiré à l&apos;accueil qu&apos;à la réouverture.
                        Avec le QR code, offert, vous entrez dès {HORAIRES.ouverture}h, directement depuis votre téléphone.
                      </p>
                      <button type="button" className="sim__encadre-bouton" onClick={() => { maj("acces", "qr"); track("inscription_bascule_qr"); }}>
                        Passer au QR code
                      </button>
                    </>
                  ) : (
                    <p><strong>Le club est fermé en ce moment :</strong> votre QR code fonctionnera dès la réouverture, à {HORAIRES.ouverture}h.</p>
                  )}
                </div>
              )}
              {engagement("newsletter", <>Je souhaite recevoir la newsletter du club par e-mail (offres et actualités).</>, false)}
            </div>
            <p className="sim__apropos">
              Le club vous invite à souscrire une assurance responsabilité civile personnelle (article 9).
              Vos données restent au club et dans son logiciel de gestion (articles 14 et 15).
            </p>
          </fieldset>

          <fieldset className="sim__bloc">
            <legend className="sim__legende">7. Votre signature</legend>
            <div className="champs">
              <label className="champ champ--large">
                <span className="champ__label">Recopiez la mention « lu et approuvé »</span>
                <input
                  className="champ__saisie champ__saisie--manuscrit"
                  value={d.mention}
                  onChange={(ev) => maj("mention", ev.target.value)}
                  autoComplete="off"
                  autoCapitalize="none"
                  aria-invalid={!!erreurs.mention}
                  aria-describedby={erreurs.mention ? "err-mention" : undefined}
                />
                {erreurs.mention && <span className="champ__erreur" id="err-mention">{erreurs.mention}</span>}
              </label>
              <div className="champ champ--large">
                <span className="champ__label">{mineur ? "Signature du parent ou tuteur" : "Votre signature"}</span>
                <SignaturePad onChange={(png) => { setSignature(png); setErreurs((p) => { const n = { ...p }; delete n.signature; return n; }); }} />
                {erreurs.signature && <span className="champ__erreur" aria-invalid="true" tabIndex={-1}>{erreurs.signature}</span>}
              </div>
            </div>
            <p className="sim__apropos">Fait le {new Date().toLocaleDateString("fr-FR")} à Agde, en ligne.</p>
          </fieldset>
        </div>

        {/* ================= Récapitulatif ================= */}
        <div className="sim__recap" aria-live="polite">
          <h2 className="sim__recap-titre">Votre abonnement</h2>

          <div className="sim__mensualite">
            <span className="sim__mensualite-montant">{eur(calc.mensualite)}</span>
            <span className="sim__mensualite-unite">/ mois</span>
          </div>
          <p className="sim__mensualite-detail">
            {calc.duree.label} · {eur(calc.duree.mensuel)}
            {calc.nbConfort > 0 && ` + ${calc.nbConfort} option${calc.nbConfort > 1 ? "s" : ""} Confort ${eur(calc.nbConfort * 500)}`}
            {calc.nbPremium > 0 && ` + ${calc.nbPremium} option${calc.nbPremium > 1 ? "s" : ""} Premium ${eur(calc.nbPremium * 1500)}`}
          </p>

          <dl className="sim__lignes">
            <div className="sim__ligne">
              <dt>1re mensualité</dt>
              <dd>{eur(calc.mensualite)}</dd>
            </div>
            <div className="sim__ligne">
              <dt>Frais d&apos;inscription <small>(une fois)</small></dt>
              <dd>{eur(FRAIS.inscription)}</dd>
            </div>
            <div className="sim__ligne">
              <dt>{calc.acces.nom} <small>(une fois)</small></dt>
              <dd>{calc.acces.prix === 0 ? "Offert" : eur(calc.acces.prix)}</dd>
            </div>
            <div className="sim__ligne sim__ligne--fort">
              <dt>À régler aujourd&apos;hui</dt>
              <dd>{eur(calc.aujourdhui)}</dd>
            </div>
            <div className="sim__ligne sim__ligne--depot">
              <dt>Dépôt de garantie <small>(empreinte bancaire, non débitée)</small></dt>
              <dd>{eur(FRAIS.depot)}</dd>
            </div>
          </dl>

          {promo && <p className="sim__recap-offre">{OFFRE.bandeau.accroche} : {OFFRE.bandeau.offre.toLowerCase()} {OFFRE.bandeau.condition}.</p>}

          {nbErreurs > 0 && (
            <p className="sim__recap-alerte" role="alert">
              {nbErreurs === 1 ? "Il manque une information" : `Il manque ${nbErreurs} informations`} dans le contrat.
            </p>
          )}
          <button type="button" className="btn btn--solid sim__cta" onClick={signer} disabled={envoi}>
            {envoi ? "Validation…" : `Signer et payer ${eur(calc.aujourdhui)}`}
          </button>
          <p className="sim__note">
            Démonstration : aucune donnée n&apos;est envoyée, aucun paiement n&apos;est débité.
            Résiliation après engagement avec un préavis d&apos;un mois.
          </p>
        </div>
      </div>
    </div>
  );
}
