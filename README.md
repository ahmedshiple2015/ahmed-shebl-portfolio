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

Project data and components: `src/main.jsx`. Design tokens, themes, and responsive styles: `src/style.css`. The theme defaults to the visitor's system preference and remembers changes in localStorage.

The real estate and Ecobazar repositories are credited as team projects. No client implementation details from private internship repositories are included.
