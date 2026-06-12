import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO || "agde@infini-mouv.fr";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Anti-spam : honeypot (champ caché "company" qui doit rester vide)
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return Response.json({ ok: true }); // on ignore silencieusement les bots
  }

  const nom = String(data.nom ?? "").trim();
  const telephone = String(data.telephone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const periode = String(data.periode ?? "").trim();
  const objectifs = Array.isArray(data.objectifs)
    ? (data.objectifs as unknown[]).map((o) => String(o))
    : [];

  if (!nom || !telephone || !email || !message) {
    return Response.json({ ok: false, error: "Champs obligatoires manquants." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "Email invalide." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP non configuré (SMTP_HOST/SMTP_USER/SMTP_PASS manquants).");
    return Response.json(
      { ok: false, error: "Service d'envoi non configuré. Réessayez plus tard." },
      { status: 503 }
    );
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL ; 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#006935;margin:0 0 12px">Nouveau message — site Infini Mouv</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#777">Nom</td><td><strong>${esc(nom)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#777">Téléphone</td><td>${esc(telephone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#777">Email</td><td>${esc(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#777">Période</td><td>${esc(periode) || "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#777;vertical-align:top">Objectifs</td><td>${objectifs.length ? esc(objectifs.join(", ")) : "—"}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;margin:16px 0 6px;color:#777">Message :</p>
    <p style="font-family:Arial,sans-serif;font-size:15px;white-space:pre-wrap;border-left:3px solid #9DD800;padding-left:12px;margin:0">${esc(message)}</p>
  `;

  const text =
    `Nouveau message — site Infini Mouv\n\n` +
    `Nom : ${nom}\nTéléphone : ${telephone}\nEmail : ${email}\n` +
    `Période : ${periode || "—"}\nObjectifs : ${objectifs.join(", ") || "—"}\n\n` +
    `Message :\n${message}\n`;

  try {
    await transporter.sendMail({
      from: `"Site Infini Mouv" <${process.env.CONTACT_FROM || SMTP_USER}>`,
      to: TO,
      replyTo: `"${nom}" <${email}>`,
      subject: `Nouveau contact — ${nom}`,
      text,
      html,
    });
  } catch (err) {
    console.error("Échec d'envoi de l'email de contact :", err);
    return Response.json({ ok: false, error: "L'envoi a échoué. Réessayez ou appelez-nous." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
