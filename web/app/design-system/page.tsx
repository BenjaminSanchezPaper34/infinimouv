import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description: "Page interne — design system Infini Mouv",
  robots: { index: false, follow: false }, // page cachée : non indexée
};

/* ---------- Données du système ---------- */
const GREENS = [
  ["50", "#eef9f2"],
  ["100", "#d9f4e4"],
  ["200", "#aee7c6"],
  ["300", "#6fd29a"],
  ["400", "#36b56e"],
  ["500", "#149a52"],
  ["600", "#0a7c41"],
  ["700", "#006935"],
  ["800", "#005128"],
  ["900", "#00351b"],
];
const NEUTRALS = [
  ["ink", "#0c1410", "Texte principal"],
  ["ink-2", "#1b2a22", "Texte sur fond clair, variantes"],
  ["muted", "#5a6b61", "Texte secondaire"],
  ["line", "#e4ebe6", "Bordures, séparateurs"],
  ["paper-3", "#eef2ef", "Fond alterné profond"],
  ["paper-2", "#f5f8f6", "Fond de section"],
  ["paper", "#ffffff", "Fond de base"],
];
const TYPE_SCALE = [
  ["Display XL", "clamp(2.75rem, 6vw, 5.5rem)", 900, "Hero, accroche principale"],
  ["Display L", "clamp(2.25rem, 4.5vw, 3.75rem)", 900, "Titres de section forts"],
  ["Heading 1", "clamp(1.75rem, 3vw, 2.5rem)", 700, "Titres de section"],
  ["Heading 2", "1.5rem", 700, "Sous-titres"],
  ["Heading 3", "1.25rem", 600, "Cartes, blocs"],
  ["Body L", "1.125rem", 300, "Chapôs, intros"],
  ["Body", "1rem", 300, "Texte courant"],
  ["Small", "0.875rem", 300, "Légendes, méta"],
];

/* ---------- Petits composants de présentation ---------- */
function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-16">
      <header className="mb-8 flex items-baseline gap-4">
        <span className="font-display text-green-700 text-sm">{n}</span>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      </header>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="bg-paper text-ink">
      {/* En-tête */}
      <header className="bg-green-700 text-white">
        <div className="im-container py-16 sm:py-20">
          <p className="font-display text-green-200 text-sm uppercase tracking-widest">
            Document interne · non indexé
          </p>
          <h1 className="font-display mt-3 text-4xl leading-none sm:text-6xl">
            Design System
          </h1>
          <p className="mt-4 max-w-xl text-green-100">
            La source de vérité visuelle d’Infini&nbsp;Mouv. Couleurs,
            typographie, composants et règles — alignés sur la DA print
            (vert&nbsp;#006935, Gotham + SF&nbsp;Pro&nbsp;Display).
          </p>
          <nav className="mt-8 flex flex-wrap gap-2 text-sm">
            {[
              ["#couleurs", "Couleurs"],
              ["#typo", "Typographie"],
              ["#boutons", "Boutons"],
              ["#cartes", "Cartes"],
              ["#tokens", "Tokens"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full bg-white/10 px-4 py-1.5 transition hover:bg-white/20"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="im-container">
        {/* COULEURS */}
        <Section id="couleurs" n="01" title="Couleurs">
          <h3 className="mb-3 text-lg font-semibold">Vert signature & échelle</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
            {GREENS.map(([k, hex]) => (
              <div key={k} className="overflow-hidden rounded-md border border-line">
                <div className="h-20" style={{ background: hex }} />
                <div className="bg-paper px-2 py-1.5">
                  <div className="text-xs font-semibold">green-{k}</div>
                  <div className="text-[11px] text-muted">{hex}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-3 mt-10 text-lg font-semibold">Neutres</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {NEUTRALS.map(([k, hex, use]) => (
              <div key={k} className="overflow-hidden rounded-md border border-line">
                <div className="h-20" style={{ background: hex }} />
                <div className="bg-paper px-2 py-1.5">
                  <div className="text-xs font-semibold">{k}</div>
                  <div className="text-[11px] text-muted">{hex}</div>
                  <div className="mt-0.5 text-[10px] leading-tight text-muted">
                    {use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* TYPOGRAPHIE */}
        <Section id="typo" n="02" title="Typographie">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-line p-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                Display — Gotham (italique)
              </p>
              <p className="font-display mt-3 text-5xl text-green-700">
                Trouvez votre vraie nature
              </p>
              <p className="mt-4 text-sm text-muted">
                Accroches, titres à fort impact. Toujours en italique, poids 900
                pour les héros.
              </p>
            </div>
            <div className="rounded-lg border border-line p-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                Texte — SF Pro Display
              </p>
              <p className="mt-3 text-lg">
                Une salle de sport saine, lumineuse et moderne au cœur d’Agde.
                Air purifié, équipements Matrix et coaching à votre rythme.
              </p>
              <p className="mt-4 text-sm text-muted">
                Corps de texte en poids 300, titres en 600/700.
              </p>
            </div>
          </div>

          <h3 className="mb-3 mt-10 text-lg font-semibold">Échelle</h3>
          <div className="divide-y divide-line rounded-lg border border-line">
            {TYPE_SCALE.map(([name, size, weight, use]) => (
              <div
                key={name as string}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 px-5 py-4"
              >
                <span
                  className="min-w-0 flex-1 truncate text-ink"
                  style={{ fontSize: size as string, fontWeight: weight as number }}
                >
                  {name}
                </span>
                <span className="text-xs text-muted">{size as string}</span>
                <span className="text-xs text-muted">· {weight}</span>
                <span className="w-full text-xs text-muted sm:w-auto">{use}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* BOUTONS */}
        <Section id="boutons" n="03" title="Boutons & liens">
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-green-700 px-7 py-3 font-semibold text-white shadow-[var(--shadow)] transition hover:scale-[1.02] hover:bg-green-600">
              S’inscrire
            </button>
            <button className="rounded-full border-2 border-green-700 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-50">
              Découvrir
            </button>
            <button className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition hover:bg-ink-2">
              Nous contacter
            </button>
            <a
              href="#"
              className="font-semibold text-green-700 underline-offset-4 hover:underline"
            >
              Lien texte →
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            Rayon plein (pill), padding généreux (≥ 44px de hauteur tactile),
            hover : légère élévation + variation de teinte.
          </p>
        </Section>

        {/* CARTES */}
        <Section id="cartes" n="04" title="Cartes">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Musculation", "Appareils Matrix dernière génération."],
              ["Cours collectifs", "Les Mills®, Pilates, Yoga, Zumba."],
              ["Coaching", "Suivi personnalisé et plan alimentaire."],
            ].map(([t, d]) => (
              <article
                key={t}
                className="group rounded-lg border border-line bg-paper p-6 transition hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-green-700">
                  <span className="font-display text-xl">∞</span>
                </div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* TOKENS */}
        <Section id="tokens" n="05" title="Tokens & règles">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-line p-6">
              <h3 className="text-base font-semibold">Rayons</h3>
              <div className="mt-4 flex items-end gap-3">
                {[
                  ["sm", "0.5rem"],
                  ["md", "1rem"],
                  ["lg", "1.75rem"],
                ].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div
                      className="h-16 w-16 border-2 border-green-700 bg-green-50"
                      style={{ borderRadius: v }}
                    />
                    <div className="mt-1 text-xs text-muted">{k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-line p-6">
              <h3 className="text-base font-semibold">Ombres</h3>
              <div className="mt-4 space-y-3">
                <div className="h-10 rounded-md bg-paper shadow-[var(--shadow-sm)]" />
                <div className="h-10 rounded-md bg-paper shadow-[var(--shadow)]" />
                <div className="h-10 rounded-md bg-paper shadow-[var(--shadow-lg)]" />
              </div>
            </div>
            <div className="rounded-lg border border-line p-6">
              <h3 className="text-base font-semibold">Dégradé titre</h3>
              <p className="im-gradient-text font-display mt-4 text-4xl">
                Infini Mouv
              </p>
              <p className="mt-3 text-xs text-muted">
                <code>.im-gradient-text</code> — fallback couleur si
                background-clip indisponible (Safari).
              </p>
            </div>
          </div>
        </Section>
      </div>

      <footer className="border-t border-line py-10 text-center text-sm text-muted">
        Infini Mouv · Design System interne — {`v1 · ${"2026"}`}
      </footer>
    </main>
  );
}
