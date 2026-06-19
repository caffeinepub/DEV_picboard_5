# Design Brief: PicBoard — Vibrant Yellow Gallery

## Tone & Purpose
Modern, accessible image gallery with bold yellow branding. No login required — focus on simplicity and shareability. Vibrant and energetic visual identity.

## Color Palette
| Token | Light OKLCH | Dark OKLCH | Usage |
| --- | --- | --- | --- |
| primary | 0.65 0.22 60 | 0.8 0.18 60 | CTA buttons, active states, accent highlights |
| background | 0.98 0.005 60 | 0.145 0.02 60 | Page & card backgrounds |
| foreground | 0.18 0.015 60 | 0.95 0.01 60 | Text & content |
| accent | 0.75 0.25 60 | 0.85 0.22 60 | Secondary highlights, borders |
| destructive | 0.55 0.22 25 | 0.65 0.19 22 | Delete, warning, critical actions (red for safety) |
| border | 0.88 0.06 60 | 0.28 0.04 60 | All borders |

## Typography
Display: General Sans (sans-serif). Body: General Sans. Mono: Geist Mono. Single typeface for consistency & brand unity.

## Visual Craft
Card-based grid for image display. Minimal chrome — let images dominate. Yellow used sparingly on CTAs and active states. Generous whitespace. Subtle shadows on hover. No decorative animations or gradients.

## Structural Zones
| Zone | Treatment |
| --- | --- |
| Header | `bg-background` with `border-b border-accent` |
| Content Grid | `bg-background` with card overlays at `bg-card` |
| Upload Button | `bg-primary text-primary-foreground` with hover scale |
| Footer | `bg-muted` with `text-muted-foreground` |

## Component Patterns
- Image cards: `bg-card rounded-lg shadow-subtle hover:shadow-hover transition-smooth`
- Buttons: Yellow primary on white bg, with `focus:ring-2 ring-offset-2`
- Borders: Subtle yellow-tinted `border-border`
- Dark mode: Warm yellow tinting on all neutrals for cohesion

## Constraints
- No gradients; no blur effects; no animations beyond hover/focus transitions
- All colors derived from CSS custom properties; no arbitrary color classes
- High contrast between text and backgrounds (AA+ compliance)
- Mobile-first responsive grid
