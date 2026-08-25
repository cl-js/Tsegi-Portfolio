# Tsega Tadesse Portfolio

A Vite + React portfolio for a civil engineer and independent engineering consultant.

## Stack

- React 18
- Vite 6
- Tailwind CSS
- React Router
- Sonner

## Local development

1. Install dependencies: `npm install`
2. Create `.env.local` from `.env.example`.
3. Add the Supabase project URL and publishable key when the inquiry backend is ready.
4. Start the frontend: `npm run dev`

The public portfolio does not require authentication or a proprietary frontend platform.

## Inquiry backend

The contact form supports either:

- Supabase REST via `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- A custom JSON endpoint via `VITE_INQUIRY_API_URL`.

Never commit private service-role keys. Only use a publishable client key in the browser.

## Production build

Run `npm run build` and deploy the generated `dist/` directory to your static hosting provider.
