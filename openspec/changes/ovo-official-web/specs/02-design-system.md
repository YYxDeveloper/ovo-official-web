# Spec 02 — Design System

## CSS Variables (globals.css, dark theme)

```css
--bg-primary: #000000
--bg-secondary: #1d1d1f
--bg-card: #2c2c2e
--text-primary: #f5f5f7
--text-secondary: #6e6e73
--accent-blue: #2997ff   /* ovo brand blue */
--border: rgba(255,255,255,0.1)
--radius: 18px
```

## Tailwind Extensions (tailwind.config.ts)

- Colors: `ovo.black`, `ovo.darkgray`, `ovo.card`, `ovo.text`, `ovo.muted`, `ovo.blue`
- Font: SF Pro / system-ui stack
- Text sizes: `text-hero` (clamp 2.5–5rem), `text-section` (clamp 1.8–2.8rem)

## Acceptance Criteria
- [ ] Dark background (#000) default
- [ ] All CSS custom properties accessible via Tailwind utilities
- [ ] Responsive fluid typography working
