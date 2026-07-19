# Design Spec — ovo Official Website

## Visual Identity

- **Brand**: ovo
- **Aesthetic**: Apple Store TW-inspired — minimal, premium, dark
- **Primary font**: SF Pro Display / system-ui
- **Accent color**: `#2997ff` (ovo Blue)

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `ovo.black` | `#000000` | Page background |
| `ovo.darkgray` | `#1d1d1f` | Secondary bg, footer |
| `ovo.card` | `#2c2c2e` | Product cards, panels |
| `ovo.text` | `#f5f5f7` | Primary text |
| `ovo.muted` | `#6e6e73` | Secondary text, captions |
| `ovo.blue` | `#2997ff` | CTAs, links, active states |
| `--border` | `rgba(255,255,255,0.1)` | Dividers, card borders |

## Typography Scale

| Name | Size | Usage |
|---|---|---|
| `text-hero` | `clamp(2.5rem, 5vw, 5rem)` | HeroBanner headline |
| `text-section` | `clamp(1.8rem, 3vw, 2.8rem)` | Section titles |
| Body | 17px / 1.6 line-height | Product descriptions |
| Caption | 12px | Labels, metadata |

## Component Patterns

### Cards
- Border radius: 18px
- Background: `ovo.card`
- Hover: `scale(1.02) translateY(-4px)` with spring easing
- Subtle border: `1px solid rgba(255,255,255,0.1)`

### Buttons
- Primary: `ovo.blue` bg, white text, 980px max-width centered
- Ghost: transparent, `ovo.blue` text, border
- Border radius: 980px (pill)

### Header States
- Default: `background: transparent`
- Scrolled (>50px): `background: rgba(0,0,0,0.72)`, `backdrop-filter: blur(20px)`

## Animation Principles

| Component | Animation |
|---|---|
| HeroBanner text | stagger y:30→0 + opacity, 0.1s delay each |
| ProductCard | whileHover spring scale+y |
| CompareBar | y:80→0 slide-in (AnimatePresence) |
| ImageGallery | AnimatePresence crossfade (opacity) |
| CategoryCards | useInView stagger (0.15s between) |
| MegaMenuPanel | opacity + y:−8→0 on enter |

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column, hamburger nav |
| Tablet | 768–1024px | 3-column grid |
| Desktop | > 1024px | 3–4 column grid, mega menu |
