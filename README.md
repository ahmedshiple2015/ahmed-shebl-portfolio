# Ahmed Shebl — Backend Developer Portfolio

A responsive React portfolio with charcoal/violet styling, persistent light and dark themes, project context, career timeline, and direct contact links.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm 11.25.

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

The static production output is written to `dist/`. Relative asset paths support both GitHub Pages and ordinary static hosting. The `public/` directory includes the original CV supplied before the current AppsSquare internship. Current internship details are maintained in the portfolio and profile README.

## Edit content

Project data and components: `src/main.jsx`. Design tokens, themes, and responsive styles: `src/style.css`. The theme opens in the requested dark palette and remembers valid light/dark choices in localStorage. Fonts are self-hosted, and interactive project views support keyboard navigation.

The real estate and Ecobazar repositories are credited as team projects. No client implementation details from private internship repositories are included.

## Quality checks

The production build is checked before publication. The portfolio was reviewed on desktop and mobile in both themes. See `DESIGN-NOTES.md` for design decisions and accessibility considerations.

## Mini arcade

The lazily loaded arcade contains Snake with keyboard/mobile controls, pause/resume, and a locally saved best score, plus a backend terminology matching game. Closing the arcade or switching games clears its active timers. Snake pauses when the tab becomes hidden.

Run `pnpm test` to check growth, collision handling, reversal protection, the vacated-tail rule, and full-board completion.
