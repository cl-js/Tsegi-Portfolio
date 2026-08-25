# AGENTS.md

## Project Context

This is a standalone Vite + React portfolio. Keep changes focused on the user's request and preserve the technical drawing / engineering visual language.

## Key files

- `src/`: frontend application source.
- `src/lib/inquiry.js`: configurable inquiry submission adapter.
- `vite.config.js`: Vite configuration for static deployment.
- `.env.example`: required public environment variables.

## Development

- Install dependencies with `npm install`.
- Run locally with `npm run dev`.
- Build with `npm run build`.
- Lint with `npm run lint`.

## Backend

The public site must remain independently renderable. Do not add authentication or proprietary platform dependencies to the public route.

Inquiry submission supports Supabase REST or a custom JSON endpoint through environment variables. Never commit private service-role keys.
