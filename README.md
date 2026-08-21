# Ferforge UI — React Router 7 Admin Dashboard Template

A free admin dashboard template built with React Router 7, React 19, Tailwind CSS v4, and shadcn/ui. 20 pre-built pages, light and dark mode, fully responsive from mobile to desktop.

**[Live Demo](https://ferforge-ui.netlify.app/)** · ☕ Buy me a coffee: **[Saweria](https://saweria.co/yansenfer)** (Indonesia) / **[Ko-fi](https://ko-fi.com/yansenfer)** (International)

## Features

- **20 ready-made pages** — 4 dashboards, 5 apps, 9 inner pages, 2 form pages
- **Light and dark mode** — persisted to `localStorage`, follows system preference on first visit
- **Fully responsive** — every page verified from 375px up
- **Tailwind CSS v4** — theming through CSS variables in `app/app.css`, no config file to fight
- **shadcn/ui components** — accessible primitives built on Radix UI, yours to edit
- **Recharts** — area, pie, and bar charts wired to the theme tokens
- **TanStack Table** — sorting, filtering, and pagination
- **TypeScript throughout** — fully typed, `npm run typecheck` clean
- **Redux Toolkit** — theme and sidebar state
- **Deploy anywhere** — Netlify config and a multi-stage Dockerfile included

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React Router 7 (SPA mode, Vite) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, Radix UI |
| State | Redux Toolkit, React Redux |
| Charts | Recharts |
| Tables | TanStack Table |
| Animation | Framer Motion |
| Icons | Lucide |
| Dates | date-fns, React Day Picker |
| Language | TypeScript |

## Pages

**Dashboards** — Overview, AI, Analytic, Logistics

**Apps** — Chat, Calendar, Email, Contact List, File Manager

**Pages** — Sign In, Sign Up, Profile, Edit Profile, Invoice, Gallery, Task List, FAQ, Pricing

**Forms** — Form Elements, Form Layout

## Getting Started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot module replacement |
| `npm run build` | Build for production into `build/` |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types and run `tsc` |

## Project Structure

```
app/
├── components/
│   ├── Dashboard/     # Cards, charts, tables, badges
│   ├── Form/          # Input, select, textarea, date picker
│   ├── Header/        # Search, notifications, profile, language
│   ├── Sidebar/       # Navigation
│   ├── ui/            # shadcn/ui primitives
│   └── Layout.tsx     # Shell wrapping every page
├── constants/
│   └── sidebarList.tsx  # Navigation menu definition
├── data/              # Mock data for charts and tables
├── pages/             # One file per route
├── store/             # Redux slices (dark mode, sidebar)
├── app.css            # Theme tokens
├── root.tsx           # Document shell, meta, error boundary
└── routes.ts          # Route definitions
```

## Customization

### Rebranding

The template ships under the name "Ferforge UI". To replace it:

```bash
grep -rn "Ferforge UI" app/
```

Update each hit, then swap `public/favicon.svg` and `public/favicon.ico` for your own.

### Changing the theme

All colors live as CSS variables in `app/app.css`, in [oklch](https://oklch.com) format. The `:root` block holds light mode and the `.dark` block holds dark mode. The accent ships orange — to change it, edit `--primary` and `--accent` in both blocks:

```css
:root {
  --primary: oklch(0.646 0.222 41.116);
  --accent: oklch(0.646 0.222 41.116);
}
```

Chart colors are `--chart-1` through `--chart-5`. Corner rounding is controlled by `--radius`.

### Fonts

The template uses [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), loaded in `app/root.tsx` through the `links` export and set as `--font-sans` in `app/app.css`. Change it in both places.

### Adding a page

1. Create the file in `app/pages/`.
2. Wrap the content in `<Layout>` from `~/components/Layout`.
3. Register the route in `app/routes.ts`.
4. Add a sidebar entry in `app/constants/sidebarList.tsx`.

## Data

Every page renders mock data from `app/data/` and inline constants. There is no backend, no database, and no real authentication — the sign-in and sign-up pages are UI only. Wire them to your own API when you integrate.

## Deployment

The template builds as a static SPA (`ssr: false` in `react-router.config.ts`), so it deploys to any static host.

### Netlify

`netlify.toml` and `public/_redirects` are already configured. Connect the repository and Netlify picks it up: build with `npm run build`, publish `build/client`.

### Other static hosts

Vercel, Cloudflare Pages, GitHub Pages, S3, and Nginx all work. Serve `build/client` and add a rewrite sending all paths to `index.html` so client-side routing survives a refresh.

### Docker

```bash
docker build -t ferforge-ui .
docker run -p 3000:3000 ferforge-ui
```

## Browser Support

The latest two versions of Chrome, Edge, Firefox, and Safari. Colors use `oklch()`, which requires Safari 15.4 or later.

## License

MIT — free to use, modify, and distribute, including in commercial projects. See [LICENSE.md](LICENSE.md).

## Support

Questions or a bug report? Email yansenferdinand6@gmail.com.

If this template saved you time, consider buying me a coffee ☕ — it helps keep templates like this free. [Saweria](https://saweria.co/yansenfer) if you're in Indonesia, [Ko-fi](https://ko-fi.com/yansenfer) if you're anywhere else.

---

Built by [Yanson Ferdinand Kurniadi](https://github.com/yansenFer).
