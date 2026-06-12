"use client";

import { useState } from "react";

const OBJECTIFS = [
  "Mincir",
  "Gérer votre stress",
  "S'entretenir",
  "Tonifier et sculpter votre corps",
  "Prise de masse",
  "Préparation sportive",
  "Améliorer sa condition physique",
  "Augmenter sa force",
  "Autre",
];

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      nom: fd.get("nom"),
      telephone: fd.get("telephone"),
      email: fd.get("email"),
      message: fd.get("message"),
      periode: fd.get("periode"),
      objectifs: fd.getAll("objectifs"),
      company: fd.get("company"), // honeypot
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.error || "L'envoi a échoué. Réessayez.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connexion impossible. Vérifiez votre réseau et réessayez.");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__check">✓</span>
        <h3>Message envoyé !</h3>
        <p>Merci, votre demande a bien été transmise. Nous vous recontactons rapidement.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot anti-spam (caché aux humains) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="field">
        <label htmlFor="nom">Prénom &amp; Nom *</label>
        <input id="nom" name="nom" required />
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="tel">Numéro de téléphone *</label>
          <input id="tel" name="telephone" type="tel" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required />
        </div>
      </div>

      <div>
        <p className="form__legend">Vos objectifs sont :</p>
        <div className="checks">
          {OBJECTIFS.map((o) => (
            <label key={o}>
              <input type="checkbox" name="objectifs" value={o} />
              {o}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="msg">Votre message *</label>
        <textarea id="msg" name="message" rows={4} required />
      </div>

      <div>
        <p className="form__legend">La période qui vous intéresse</p>
        <div className="checks">
          <label><input type="radio" name="periode" value="Sans engagement" /> Sans engagement</label>
          <label><input type="radio" name="periode" value="3 mois" /> 3 mois</label>
          <label><input type="radio" name="periode" value="12 mois" /> 12 mois</label>
        </div>
      </div>

      {status === "error" && (
        <p className="form__error" role="alert">{errorMsg}</p>
      )}

      <button className="btn btn--solid form__submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
