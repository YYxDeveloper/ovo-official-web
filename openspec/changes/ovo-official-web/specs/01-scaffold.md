# Spec 01 — Project Scaffold

## Goal
Bootstrap the Next.js 15 project with all required dependencies.

## Commands

```bash
npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --yes

npm install @radix-ui/react-navigation-menu @radix-ui/react-dialog \
  @radix-ui/react-tabs @radix-ui/react-tooltip \
  zustand nuqs framer-motion date-fns

npx shadcn@latest init   # New York / Zinc / CSS vars
npx shadcn@latest add button badge separator
```

## Acceptance Criteria
- [ ] `npm run dev` starts successfully on localhost
- [ ] TypeScript compiles without errors
- [ ] shadcn Button, Badge, Separator components available
- [ ] `src/` directory structure in place
