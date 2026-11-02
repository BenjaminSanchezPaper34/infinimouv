"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   Zone de signature au doigt ou à la souris (pointer events).
   Renvoie l'image PNG de la signature, ou null quand elle est effacée.
   ------------------------------------------------------------------ */
export default function SignaturePad({ onChange }: { onChange: (png: string | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const trace = useRef(false);
  const vide = useRef(true);

  // Résolution adaptée à l'écran (net sur iPhone), couleur lue dans les tokens.
  useEffect(() => {
    const c = ref.current!;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    c.width = width * ratio;
    c.height = height * ratio;
    const ctx = c.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = getComputedStyle(c).getPropertyValue("--im-ink").trim() || "black";
  }, []);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  const debut = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {} // le trait continue hors du cadre
    trace.current = true;
    const ctx = e.currentTarget.getContext("2d")!;
    const [x, y] = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const suite = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!trace.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    const [x, y] = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    vide.current = false;
  };

  const fin = () => {
    if (!trace.current) return;
    trace.current = false;
    if (!vide.current) onChange(ref.current!.toDataURL("image/png"));
  };

  const effacer = () => {
    const c = ref.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    vide.current = true;
    onChange(null);
  };

  return (
    <div className="signature">
      <canvas
        ref={ref}
        className="signature__zone"
        aria-label="Zone de signature : signez avec le doigt ou la souris"
        onPointerDown={debut}
        onPointerMove={suite}
        onPointerUp={fin}
        onPointerCancel={fin}
      />
      <span className="signature__ligne" aria-hidden="true">Signez ici</span>
      <button type="button" className="signature__effacer" onClick={effacer}>Effacer</button>
    </div>
  );
}
