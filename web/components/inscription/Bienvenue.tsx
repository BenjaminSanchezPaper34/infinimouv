import Image from "next/image";
import Link from "next/link";

/* Écran de confirmation, après la signature du contrat en ligne. */
export default function Bienvenue({ prenom, graine, badge }: { prenom: string; graine: string; badge: boolean }) {
  return (
    <section className="bienvenue" aria-labelledby="t-bienvenue">
      <div className="bienvenue__carte">
        <p className="bienvenue__kicker">Inscription validée</p>
        <h2 className="bienvenue__titre" id="t-bienvenue">Bienvenue chez Infini Mouv, {prenom} !</h2>
        <p>Votre contrat signé et votre accès arrivent par e-mail. On a hâte de vous voir à la salle.</p>
        <div className="bienvenue__qr">
          <QrExemple graine={graine} />
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
          <strong>{badge ? "Votre badge vous attend à l'accueil" : "Votre QR code, c'est votre clé"}</strong>
          <span>Présentez-le au lecteur à l&apos;entrée, de 6h à 23h, 7j/7.</span>
        </li>
        <li>
          <strong>Pensez au certificat médical</strong>
          <span>À déposer à l&apos;accueil lors de votre premier passage.</span>
        </li>
      </ol>

      <Link className="btn btn--solid bienvenue__retour" href="/">Retour au site</Link>
    </section>
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
