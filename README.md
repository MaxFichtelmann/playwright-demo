# Playwright Demo app (React + Vite + Tailwind + shadcn-like styles)

This repository is a minimal demo app showcasing Playwright basics and a few advanced concepts using a tiny set of shadcn-inspired UI primitives (Button, Card, Input, Modal) styled via Tailwind tokens already configured in `src/index.css`.

What’s demonstrated:
- Server auto-start via Playwright `webServer` and `baseURL`
- Locators: getByRole, getByLabel, getByTestId
- UI flows: counter, todo CRUD, modal
- State checks via `aria-live` regions
- Persistence checks via localStorage (theme toggle)
- Parallel cross-browser execution

## Getting started

- Install dependencies
  npm ci

- Run the dev server
  npm run dev

- Run the e2e tests (will auto-start the dev server on 5173)
  npx playwright test

- Open Playwright HTML report
  npx playwright show-report

## App overview
- Counter section with a button named "increment" and a data-testid showing the count.
- Todo section with labeled input (New todo), add, toggle checkbox, and delete.
- Modal section that opens/closes a dialog.
- Theme toggle persists preference in localStorage and applies .dark class.

## Files
- src/components/ui.tsx — lightweight shadcn-like primitives used in the demo.
- src/App.tsx — the demo UI leveraging those components.
- tests/app.spec.ts — Playwright tests demonstrating basic/advanced usage.
- playwright.config.ts — baseURL + dev server; multiple browsers configured.

Note: For brevity, we didn’t install the full shadcn/ui package; instead we use small, self-contained components that follow a similar styling approach with Tailwind variables.
