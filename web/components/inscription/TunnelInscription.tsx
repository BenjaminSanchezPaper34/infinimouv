"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ACCES, DUREES, FAMILLES, FRAIS, PRESTATIONS, calculer, eur,
  type AccesId, type DureeId,
} from "@/lib/grille";
import { OFFRE, offreEnCours } from "@/lib/offre";
import SignaturePad from "./SignaturePad";

/* ------------------------------------------------------------------
   Tunnel d'inscription en ligne : la version numérique du contrat
   papier remis au club (CONTRAT-A4-INFINIMOUV). Mêmes rubriques, même
   ordre : formule, adhérent, règlement, signature « lu et approuvé ».

   DÉMONSTRATION : rien ne part nulle part. Les points de branchement
   Deciplus (fiche adhérent, empreinte bancaire du dépôt, prélèvements,
   envoi du QR code) sont marqués « DECIPLUS » dans le code.
   ------------------------------------------------------------------ */

const ETAPES = ["Formule", "Vous", "Règlement", "Signature"] as const;
const CLE_DOSSIER = "im-inscription-demo"; // sessionStorage : survit à un rechargement
const CONTRAT_PDF = "/documents/contrat-inscription-infini-mouv.pdf";

type Dossier = {
  duree: DureeId;
  options: string[];
  acces: AccesId;
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
  offres: boolean;
  mention: string;
};

const VIERGE: Dossier = {
  duree: "12m", options: [], acces: "qr",
  nom: "", prenom: "", naissance: "", tel: "", email: "",
  adresse: "", cp: "", ville: "", profession: "",
  parrainage: false, parrain: "", representant: "",
  mode: "cb", cgv: false, certificat: false, autorisation: false,
  demarrage: false, offres: false, mention: "",
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

/** Contrôles par étape : renvoie { champ: message }. */
function controler(etape: number, d: Dossier, signee: boolean) {
  const e: Record<string, string> = {};
  if (etape === 1) {
    if (!d.prenom.trim()) e.prenom = "Indiquez votre prénom.";
    if (!d.nom.trim()) e.nom = "Indiquez votre nom.";
    const ans = age(d.naissance);
    if (ans === null) e.naissance = "Indiquez votre date de naissance.";
    else if (ans < 14 || ans > 110) e.naissance = "Vérifiez votre date de naissance.";
    if (!/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(d.tel.trim())) e.tel = "Un numéro de portable valide, par exemple 06 12 34 56 78.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Une adresse e-mail valide.";
    if (!d.adresse.trim()) e.adresse = "Indiquez votre adresse.";
    if (!/^\d{5}$/.test(d.cp.trim())) e.cp = "5 chiffres.";
    if (!d.ville.trim()) e.ville = "Indiquez votre ville.";
    if (d.parrainage && !d.parrain.trim()) e.parrain = "Le nom de votre parrain ou marraine.";
    if (ans !== null && ans < 18 && !d.representant.trim()) e.representant = "Nom et prénom d'un parent ou tuteur.";
  }
  if (etape === 2) {
    if (!d.cgv) e.cgv = "Merci d'accepter les conditions pour continuer.";
    if (!d.certificat) e.certificat = "Cette attestation est obligatoire.";
    const ans = age(d.naissance);
    if (ans !== null && ans < 18 && !d.autorisation) e.autorisation = "L'autorisation parentale est obligatoire.";
  }
  if (etape === 3) {
    if (d.mention.trim().toLowerCase().replace(/\s+/g, " ") !== "lu et approuvé") e.mention = "Recopiez exactement « lu et approuvé ».";
    if (!signee) e.signature = "Signez dans le cadre.";
  }
  return e;
}

export default function TunnelInscription() {
  const params = useSearchParams();
  const [etape, setEtape] = useState(0);
  const [d, setD] = useState<Dossier>(VIERGE);
  const [signature, setSignature] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);
  const [pret, setPret] = useState(false);

  // Reprise : dossier en cours (sessionStorage), sinon formule venue du simulateur.
  useEffect(() => {
    let repris: Partial<Dossier> = {};
    try { repris = JSON.parse(sessionStorage.getItem(CLE_DOSSIER) || "{}"); } catch {}
    const duree = params.get("duree");
    const acces = params.get("acces");
    const options = params.get("options");
    const depuisSimulateur: Partial<Dossier> = {};
    if (DUREES.some((x) => x.id === duree)) depuisSimulateur.duree = duree as DureeId;
    if (ACCES.some((x) => x.id === acces)) depuisSimulateur.acces = acces as AccesId;
    if (options) depuisSimulateur.options = options.split(",").filter((id) => PRESTATIONS.some((p) => p.id === id));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique au montage (stockage navigateur)
    setD({ ...VIERGE, ...repris, ...depuisSimulateur, mention: "" });
    setPret(true);
  }, [params]);

  useEffect(() => {
    if (!pret) return;
    try { sessionStorage.setItem(CLE_DOSSIER, JSON.stringify({ ...d, mention: "" })); } catch {}
  }, [d, pret]);

  const calc = useMemo(() => calculer(d.duree, d.options, d.acces), [d.duree, d.options, d.acces]);
  const mineur = (age(d.naissance) ?? 99) < 18;
  const promo = offreEnCours();

  const maj = <K extends keyof Dossier>(k: K, v: Dossier[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    setErreurs((p) => { if (!p[k]) return p; const n = { ...p }; delete n[k]; return n; });
  };

  const basculerOption = (id: string) =>
    maj("options", d.options.includes(id) ? d.options.filter((o) => o !== id) : [...d.options, id]);

  const allerA = (n: number) => {
    setEtape(n);
    setErreurs({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continuer = () => {
    const e = controler(etape, d, !!signature);
    setErreurs(e);
    if (Object.keys(e).length) {
      // Amène le premier champ en erreur sous les yeux (et le focus clavier).
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>("[aria-invalid='true']");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    if (etape < 3) return allerA(etape + 1);

    // DECIPLUS : création de la fiche adhérent + contrat signé (PDF), empreinte
    // bancaire du dépôt, mandat de prélèvement, puis envoi du QR code.
    setEnvoi(true);
    window.setTimeout(() => {
      setEnvoi(false);
      try { sessionStorage.removeItem(CLE_DOSSIER); } catch {}
      allerA(4);
    }, 1400);
  };

  /* Champ texte réutilisable : libellé, saisie, message d'erreur relié. */
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

  const case_ = (k: keyof Dossier, children: React.ReactNode, obligatoire = true) => (
    <label className={`engagement${d[k] ? " est-choisi" : ""}`}>
      <input
        type="checkbox"
        checked={d[k] as boolean}
        onChange={(ev) => maj(k, ev.target.checked as never)}
        aria-invalid={!!erreurs[k]}
        aria-describedby={erreurs[k] ? `err-${k}` : undefined}
      />
      <span className="engagement__coche" aria-hidden="true">✓</span>
      <span className="engagement__texte">
        {children}
        {!obligatoire && <small className="engagement__facultatif"> (facultatif)</small>}
        {erreurs[k] && <span className="champ__erreur" id={`err-${k}`}>{erreurs[k]}</span>}
      </span>
    </label>
  );

  const prenom = d.prenom.trim() || "vous";

  return (
    <div className="tunnel">
      {/* -------- En-tête épuré : le tunnel ne propose qu'une sortie -------- */}
      <header className="tunnel__tete">
        <div className="wrap tunnel__tete-in">
          <Link href="/" aria-label="Accueil Infini Mouv">
            <Image src="/images/logo-infinimouv.webp" alt="Infini Mouv" width={367} height={49} priority className="tunnel__logo" />
          </Link>
          {etape < 4 && <a className="tunnel__quitter" href="/inscription-en-ligne">Quitter</a>}
        </div>
      </header>

      <p className="tunnel__demo" role="note">
        Démonstration : aucune donnée n&apos;est envoyée, aucun paiement n&apos;est débité.
      </p>

      {etape < 4 && (
        <nav className="wrap tunnel__progression" aria-label="Étapes de l'inscription">
          <ol>
            {ETAPES.map((nom, i) => (
              <li key={nom} className={i < etape ? "est-fait" : i === etape ? "est-actif" : ""} aria-current={i === etape ? "step" : undefined}>
                {i < etape ? (
                  <button type="button" onClick={() => allerA(i)}><span>{i + 1}</span> {nom}</button>
                ) : (
                  <span className="tunnel__etape"><span>{i + 1}</span> {nom}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={`wrap tunnel__grille${etape === 4 ? " tunnel__grille--fin" : ""}`}>
        <main className="tunnel__corps">
          {/* ======================= 1. FORMULE ======================= */}
          {etape === 0 && (
            <>
              <p className="tunnel__kicker">Inscription en ligne</p>
              <h1 className="tunnel__titre"><span className="grad">Trouvez votre vraie nature.</span></h1>
              <p className="tunnel__intro">
                Composez votre formule, signez votre contrat depuis votre téléphone :
                votre accès au club arrive dans la foulée. Accès libre de 6h à 23h, 7j/7.
              </p>

              {promo && (
                <aside className="tunnel__offre" aria-label="Offre du moment">
                  <span className="tunnel__offre-accroche">{OFFRE.bandeau.accroche}</span>
                  <strong>{OFFRE.bandeau.offre}</strong>
                  <span>{OFFRE.bandeau.condition}</span>
                  <small>Jusqu&apos;au {OFFRE.finLibelle}. Appliquée par le club à la validation de votre inscription, voir conditions au club.</small>
                </aside>
              )}

              <fieldset className="bloc">
                <legend className="bloc__titre">Votre durée</legend>
                <div className="cartes cartes--3" role="radiogroup">
                  {DUREES.map((x) => (
                    <label key={x.id} className={`carte${d.duree === x.id ? " est-choisi" : ""}`}>
                      <input type="radio" name="duree" checked={d.duree === x.id} onChange={() => maj("duree", x.id)} />
                      {"phare" in x && <span className="carte__pastille">Le plus choisi</span>}
                      <span className="carte__titre">{x.label}</span>
                      <span className="carte__prix">{eur(x.mensuel)}<small>/mois</small></span>
                      <span className="carte__note">{x.engagement}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bloc">
                <legend className="bloc__titre">Vos options <small>à la carte, facultatives</small></legend>
                {FAMILLES.map((f) => (
                  <div className="bloc__famille" key={f.nom}>
                    <h2 className="bloc__sous-titre">{f.nom} <span>{f.tarif}</span></h2>
                    {PRESTATIONS.filter((p) => p.famille === f.nom).map((p) => (
                      <label key={p.id} className={`engagement${d.options.includes(p.id) ? " est-choisi" : ""}`}>
                        <input type="checkbox" checked={d.options.includes(p.id)} onChange={() => basculerOption(p.id)} />
                        <span className="engagement__coche" aria-hidden="true">✓</span>
                        <span className="engagement__texte">{p.nom}</span>
                        <span className="engagement__prix">+{eur(p.mensuel)}<small>/mois</small></span>
                      </label>
                    ))}
                  </div>
                ))}
              </fieldset>

              <fieldset className="bloc">
                <legend className="bloc__titre">Votre accès au club</legend>
                <div className="cartes cartes--2" role="radiogroup">
                  {ACCES.map((a) => (
                    <label key={a.id} className={`carte${d.acces === a.id ? " est-choisi" : ""}`}>
                      <input type="radio" name="acces" checked={d.acces === a.id} onChange={() => maj("acces", a.id)} />
                      <span className="carte__titre">{a.nom}</span>
                      <span className="carte__prix">{a.prix === 0 ? "Offert" : eur(a.prix)}</span>
                      <span className="carte__note">{a.id === "qr" ? "Sur votre téléphone, dès l'inscription" : "Nominatif, à retirer à l'accueil"}</span>
                    </label>
                  ))}
                </div>
                <p className="bloc__aide">En cas de perte, le remplacement est facturé {eur(FRAIS.remplacementAcces)}.</p>
              </fieldset>
            </>
          )}

          {/* ======================= 2. VOUS ======================= */}
          {etape === 1 && (
            <>
              <h1 className="tunnel__titre tunnel__titre--etape">Vos coordonnées</h1>
              <p className="tunnel__intro">Les informations de votre contrat d&apos;inscription. Elles restent au club.</p>
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

              {mineur && d.naissance && (
                <div className="bloc bloc--alerte">
                  <p className="bloc__aide"><strong>Vous avez moins de 18 ans :</strong> l&apos;inscription se fait avec l&apos;accord d&apos;un parent ou tuteur, qui signera le contrat.</p>
                  <div className="champs">{champ("representant", "Parent ou tuteur (nom et prénom)", { autoComplete: "off" }, true)}</div>
                </div>
              )}

              <fieldset className="bloc">
                <legend className="bloc__titre">Parrainage</legend>
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
            </>
          )}

          {/* ======================= 3. RÈGLEMENT ======================= */}
          {etape === 2 && (
            <>
              <h1 className="tunnel__titre tunnel__titre--etape">Règlement</h1>
              <p className="tunnel__intro">Choisissez comment régler vos mensualités, puis validez vos engagements.</p>

              <fieldset className="bloc">
                <legend className="bloc__titre">Vos mensualités</legend>
                <div className="cartes cartes--2" role="radiogroup">
                  <label className={`carte${d.mode === "cb" ? " est-choisi" : ""}`}>
                    <input type="radio" name="mode" checked={d.mode === "cb"} onChange={() => maj("mode", "cb")} />
                    <span className="carte__titre">Carte bancaire</span>
                    <span className="carte__note">Prélevée automatiquement chaque mois</span>
                  </label>
                  <label className={`carte${d.mode === "sepa" ? " est-choisi" : ""}`}>
                    <input type="radio" name="mode" checked={d.mode === "sepa"} onChange={() => maj("mode", "sepa")} />
                    <span className="carte__titre">Prélèvement SEPA</span>
                    <span className="carte__note">Mandat sur votre compte (IBAN)</span>
                  </label>
                </div>
                <p className="bloc__aide">Vous préférez le chèque ou les espèces ? L&apos;inscription se fait alors à l&apos;accueil du club.</p>
              </fieldset>

              <div className="bloc bloc--info">
                <h2 className="bloc__sous-titre">Dépôt de garantie : {eur(FRAIS.depot)} <span>non débité</span></h2>
                <p className="bloc__aide">
                  Une simple empreinte de votre carte bancaire, comme une caution. Elle couvre
                  d&apos;éventuels impayés ou dégradations et ne sert qu&apos;en cas d&apos;incident
                  (article 6.3 du contrat).
                </p>
              </div>

              <fieldset className="bloc">
                <legend className="bloc__titre">Vos engagements</legend>
                {case_("cgv", <>J&apos;ai lu et j&apos;accepte les <a href={CONTRAT_PDF} target="_blank" rel="noopener">conditions générales de vente</a> et le règlement intérieur du club.</>)}
                {case_("certificat", <>J&apos;atteste être apte à la pratique sportive et je remettrai au club un certificat médical d&apos;aptitude (article 8).</>)}
                {mineur && d.naissance && case_("autorisation", <>Mon parent ou tuteur, {d.representant || "désigné à l'étape précédente"}, autorise mon inscription et signera le contrat.</>)}
                {case_("demarrage", <>Je souhaite accéder au club dès aujourd&apos;hui, sans attendre la fin du délai de rétractation de 14 jours. Si je me rétracte, je réglerai la période déjà utilisée.</>, false)}
                {case_("offres", <>J&apos;accepte de recevoir les offres et actualités du club par e-mail et SMS.</>, false)}
              </fieldset>
            </>
          )}

          {/* ======================= 4. SIGNATURE ======================= */}
          {etape === 3 && (
            <>
              <h1 className="tunnel__titre tunnel__titre--etape">Votre contrat</h1>
              <p className="tunnel__intro">Relisez, puis signez comme au club : mention « lu et approuvé » et signature.</p>

              <article className="contrat">
                <header className="contrat__tete">
                  <Image src="/images/symbole-infinimouv-crop-u355.webp" alt="" width={750} height={255} className="contrat__symbole" />
                  <div>
                    <h2 className="contrat__titre">Contrat d&apos;inscription</h2>
                    <p className="contrat__club">Infini Mouv · 4 avenue du 11 Novembre 1918, 34300 Agde</p>
                  </div>
                </header>

                <dl className="contrat__lignes">
                  <div><dt>Adhérent</dt><dd>{d.prenom} {d.nom}{d.naissance && `, né(e) le ${new Date(d.naissance).toLocaleDateString("fr-FR")}`}</dd></div>
                  <div><dt>Coordonnées</dt><dd>{d.adresse}, {d.cp} {d.ville}<br />{d.tel} · {d.email}</dd></div>
                  {mineur && <div><dt>Représentant légal</dt><dd>{d.representant}</dd></div>}
                  <div><dt>Formule</dt><dd>{calc.duree.label} · {calc.duree.engagement}</dd></div>
                  <div><dt>Options</dt><dd>{calc.prestations.length ? calc.prestations.map((p) => p.nom).join(", ") : "Offre de base"}</dd></div>
                  <div><dt>Accès</dt><dd>{calc.acces.nom}</dd></div>
                  <div><dt>Mensualités</dt><dd>{eur(calc.mensualite)} par {d.mode === "cb" ? "carte bancaire" : "prélèvement SEPA"}</dd></div>
                  <div><dt>Aujourd&apos;hui</dt><dd><strong>{eur(calc.aujourdhui)}</strong> : 1re mensualité, frais d&apos;inscription {eur(FRAIS.inscription)}{calc.acces.prix ? `, ${calc.acces.nom.toLowerCase()} ${eur(calc.acces.prix)}` : ""}</dd></div>
                  <div><dt>Dépôt de garantie</dt><dd>{eur(FRAIS.depot)} en empreinte bancaire, non débité</dd></div>
                  {d.parrainage && <div><dt>Parrainage</dt><dd>{d.parrain}</dd></div>}
                </dl>

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

                <p className="contrat__fait">Fait le {new Date().toLocaleDateString("fr-FR")} à Agde, en ligne.</p>
              </article>
            </>
          )}

          {/* ======================= CONFIRMATION ======================= */}
          {etape === 4 && (
            <section className="bienvenue" aria-labelledby="t-bienvenue">
              <div className="bienvenue__carte">
                <p className="tunnel__kicker tunnel__kicker--clair">Inscription validée</p>
                <h1 className="bienvenue__titre" id="t-bienvenue">Bienvenue chez Infini Mouv, {prenom} !</h1>
                <p>Votre contrat signé et votre accès arrivent par e-mail. On a hâte de vous voir à la salle.</p>
                <div className="bienvenue__qr">
                  <QrExemple graine={`${d.prenom}${d.nom}${d.email}`} />
                  <span>Exemple de QR code : le vôtre arrivera par e-mail et dans l&apos;app.</span>
                </div>
              </div>

              <ol className="bienvenue__etapes">
                <li>
                  <strong>Téléchargez l&apos;app Xplor Active</strong>
                  <span>Votre QR code d&apos;accès, le planning des cours et vos réservations.</span>
                  <span className="bienvenue__stores">
                    <Image src="/images/appstore-infinimouv.svg" alt="Télécharger dans l'App Store" width={120} height={40} />
                    <Image src="/images/googleplay-infinimouv.svg" alt="Disponible sur Google Play" width={135} height={40} />
                  </span>
                </li>
                <li>
                  <strong>{d.acces === "badge" ? "Votre badge vous attend à l'accueil" : "Votre QR code, c'est votre clé"}</strong>
                  <span>Présentez-le au lecteur à l&apos;entrée, de 6h à 23h, 7j/7.</span>
                </li>
                <li>
                  <strong>Pensez au certificat médical</strong>
                  <span>À déposer à l&apos;accueil lors de votre premier passage.</span>
                </li>
              </ol>

              <Link className="btn btn--solid bienvenue__retour" href="/">Retour au site</Link>
            </section>
          )}

          {/* -------- Actions : barre collée en bas sur mobile -------- */}
          {etape < 4 && (
            <div className={`tunnel__actions${etape === 3 ? " tunnel__actions--signature" : ""}`}>
              <div className="tunnel__total" aria-live="polite">
                <span className="tunnel__total-montant">{eur(calc.mensualite)}<small>/mois</small></span>
                <span className="tunnel__total-detail">+ {eur(FRAIS.inscription + calc.acces.prix)} à l&apos;inscription</span>
              </div>
              {etape > 0 && (
                <button type="button" className="tunnel__retour" onClick={() => allerA(etape - 1)} aria-label="Étape précédente">←</button>
              )}
              <button type="button" className="btn btn--solid tunnel__suivant" onClick={continuer} disabled={envoi}>
                {envoi ? "Validation…" : etape === 3 ? `Signer et payer ${eur(calc.aujourdhui)}` : "Continuer"}
              </button>
            </div>
          )}
        </main>

        {/* -------- Récapitulatif : colonne collante en desktop -------- */}
        {etape < 4 && (
          <aside className="recap" aria-label="Récapitulatif de votre formule">
            <div className="recap__visuel">
              <Image src="/images/salle-infinimouv.webp" alt="Le plateau de musculation d'Infini Mouv à Agde" fill sizes="(min-width: 1024px) 380px, 100vw" />
              <span className="recap__badge">Infini Mouv · Agde</span>
            </div>
            <div className="recap__corps">
              <p className="recap__formule">Abonnement {calc.duree.label}</p>
              <p className="recap__mensualite">{eur(calc.mensualite)}<small>/mois</small></p>
              <p className="recap__engagement">{calc.duree.engagement}</p>
              <dl className="recap__lignes">
                {calc.prestations.map((p) => (
                  <div key={p.id}><dt>{p.nom}</dt><dd>+{eur(p.mensuel)}</dd></div>
                ))}
                <div><dt>Frais d&apos;inscription</dt><dd>{eur(FRAIS.inscription)}</dd></div>
                <div><dt>{calc.acces.nom}</dt><dd>{calc.acces.prix ? eur(calc.acces.prix) : "Offert"}</dd></div>
                <div className="recap__fort"><dt>À régler aujourd&apos;hui</dt><dd>{eur(calc.aujourdhui)}</dd></div>
                <div className="recap__discret"><dt>Dépôt de garantie, empreinte non débitée</dt><dd>{eur(FRAIS.depot)}</dd></div>
              </dl>
              {promo && <p className="recap__offre">{OFFRE.bandeau.accroche} : {OFFRE.bandeau.offre.toLowerCase()} {OFFRE.bandeau.condition}.</p>}
              <p className="recap__note">Paiement sécurisé. Résiliation après engagement avec un préavis d&apos;un mois.</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

/* QR code d'illustration (motif pseudo-aléatoire, non lisible). Le vrai
   QR code d'accès est généré par Deciplus. */
function QrExemple({ graine }: { graine: string }) {
  const n = 21;
  let h = 2166136261;
  for (const c of graine || "infini") h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const modules: [number, number][] = [];
  const repere = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (repere(x, y)) continue;
      h = Math.imul(h ^ (x * 31 + y), 16777619);
      if ((h >>> 0) % 2) modules.push([x, y]);
    }
  const oeil = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.4} className="qr__plein" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} className="qr__fond" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={.6} className="qr__plein" />
    </g>
  );
  return (
    <svg className="qr" viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="Exemple de QR code d'accès">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} rx={2} className="qr__fond" />
      {modules.map(([x, y]) => <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} className="qr__plein" />)}
      {oeil(0, 0)}{oeil(n - 7, 0)}{oeil(0, n - 7)}
    </svg>
  );
}
