# DESIGN.md — Infini Mouv · Agde

> Rétro-formalisation (30/08/2026) de la DA existante, déjà validée par le client :
> le site reproduit fidèlement l'identité print/web historique d'Infini Mouv.
> Ce document sert de référence anti-dérive pour toutes les évolutions futures.
> **Statut : à valider par Benjamin.**

**Secteur** : salle de sport / bien-être
**Personnalité en 3 mots** : sain, énergique, accessible
**Références** : DA print Infini Mouv (logos, affiches, planning) — la source de vérité
est la charte du club, pas une référence externe.

---

## 1. Tokens couleurs

| Nom | Hex | Variable | Rôle (argumenté) |
|-----|-----|----------|------------------|
| Vert signature | `#006935` | `--im-green-700` | L'unique décision chromatique : CTA pleins, titres de cartes, cercles de navigation, carte du fondateur. C'est le vert du logo — il signe chaque action possible. |
| Lime | `#9dd800` | `--im-lime` | Étincelle des dégradés de titres et focus visibles. Jamais fonctionnelle seule : elle échoue le contraste AA sur fond vert (3,99:1) — utiliser `#b6e240` pour du texte sur vert. |
| Vert relais | `#0a7c41` | `--im-green-600` | Relais du vert signature pour les petits textes (rôles, liens) où le 700 serait trop sombre en petite taille. |
| Encre | `#0c1410` | `--im-ink` | Quasi-noir teinté vert — fond du footer et texte principal ; préserve la chaleur végétale du système, jamais `#000`. |
| Papier | `#ffffff` / `#f6f8f6` | `--im-paper` / `--im-paper-2` | Alternance des fonds de sections : les jonctions sont des ruptures assumées, jamais deux fonds identiques adjacents. |
| Sourdine | `#5a6b61` | `--im-muted` | Textes secondaires — gris biaisé vert, pas un gris neutre. |

Règle : le vert signature est la seule couleur « décision ». Les couleurs vives du
planning (orange C.A.F., rose Zumba…) sont un vocabulaire hérité du print, cantonné
au planning et à la légende des cours.

## 2. Typographie

- **Display** : Gotham (medium/bold/ultra **italic**) — titres, uniquement en italique
  majuscules. C'est la voix criée de la marque : heros, titres de sections, chiffres du
  simulateur, jours du planning. Jamais en corps de texte.
- **Fonctionnelle** : SF Pro Display (light → heavy) — tout le reste.
- **Auto-hébergées** en `/public/fonts` (woff), zéro CDN (CNIL). ⚠️ Licences Gotham et
  SF Pro héritées de la DA du client — statut à confirmer côté club (voir état des lieux).
- Tailles : corps 16-17px, descriptions ≥ 14px, `clamp()` sur tous les grands titres.
  11px toléré uniquement sur le copyright et les pastilles uppercase très secondaires.

## 3. Matière

- **Rayons** : cartes `--radius-lg` (1.75rem), pastilles/boutons 100px (pill).
- **Ombres** : teintées vert (`rgba(0,105,53,…)`) sur les éléments verts (cartes phare,
  récap simulateur), neutres ailleurs — l'ombre porte la couleur de l'objet, pas du thème.
- **Espacements** : sections 60/88px (mobile/desktop), grilles gap 20-24px,
  tronc `--maxw: 1200px`.

## 4. Animation

- **Tempo** : réveils doux 0.75s ease-out ; hover vifs 0.2-0.3s.
- **Au scroll** : reveal générique `[data-reveal]` (52px + scale .94, IntersectionObserver
  maison dans `Motion.tsx`), **rejouable** à chaque passage. Activités du hero : montée
  verticale en cascade 90ms. Cartes : stagger 100ms.
- **Ne bouge jamais** : textes courants, pages légales, planning (lisibilité SEO).
- **Effet signature** : les 7 mots d'activités géants qui montent en cascade sous le hero.
- **Moteur unique** : IntersectionObserver + transitions CSS. Pas de GSAP/Lenis (Lenis
  retiré : conflit avec les iframes Elfsight). N'introduire un second moteur sous aucun
  prétexte sans arbitrage.
- `prefers-reduced-motion` : tout est neutralisé (reveal instantané).

## 5. Interdits du projet

- Deux moteurs d'animation sur un même élément ; réintroduire un smooth-scroll JS.
- Utiliser les couleurs du planning (orange, rose, violet…) hors planning/légende.
- Le lime en texte sur fond vert sans passer par la variante accessible `#b6e240`.
- Fond identique sur deux sections adjacentes.
- Charger un service tiers (Elfsight, Maps) avant le consentement cookies.
- Toute police via CDN tiers.
