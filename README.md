# Elysium For You — Marketing Website

Premium real estate marketing website for **Elysium For You**, a luxury real estate advisory firm under SONASH PROPERTIES Pvt. Ltd. Built with Next.js 16 (App Router), Tailwind CSS v4, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, fully static) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) (Tooltip) |
| Icons | [Tabler Icons](https://tabler.io/icons), [Lucide React](https://lucide.dev/) |
| Fonts | Inter, Playfair Display, Great Vibes (Google Fonts via `next/font`) |
| Deployment | [Vercel](https://vercel.com) (zero-config) |

---

## Project Structure

```
.
├── public/                         # Static assets
│   ├── elysium-logo-ultra.png      # Primary brand logo (used in Header)
│   ├── about_collage_v3.png        # About section collage
│   └── details_bg_v2.png           # Philosophy section background sketch
│
├── src/
│   ├── app/                        # Next.js App Router routes
│   │   ├── layout.tsx              # Root layout (Header + Footer)
│   │   ├── page.tsx                # Homepage — assembles all sections
│   │   ├── globals.css             # Global CSS variables and base styles
│   │   ├── commercial/             # Commercial portfolio page
│   │   ├── residential/            # Residential portfolio page
│   │   ├── upcoming/               # Upcoming projects filler page
│   │   └── philosophy/             # Philosophy/about filler page
│   │
│   ├── components/
│   │   ├── home/                   # Homepage section components (one file per section)
│   │   │   ├── HeroCarousel.tsx    # Full-screen hero image slider (Embla)
│   │   │   ├── DetailsSection.tsx  # Philosophy/brand story section
│   │   │   ├── UpcomingProjectsSection.tsx  # Upcoming projects 3D carousel
│   │   │   ├── CategoriesSection.tsx        # Residential / Commercial split
│   │   │   ├── AboutSection.tsx    # About Elysium + collage
│   │   │   ├── VideoSection.tsx    # Brand video embed
│   │   │   ├── TeamsSection.tsx    # Team member cards
│   │   │   ├── FaqSection.tsx      # Accordion FAQ
│   │   │   ├── InstagramSection.tsx # Masonry Instagram-style gallery
│   │   │   └── ContactSection.tsx  # Lead capture form
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Site header with logo + hamburger nav
│   │   │   └── Footer.tsx          # Footer wrapper
│   │   │
│   │   └── ui/                     # Reusable primitive components
│   │       ├── button.tsx          # CVA-based button variants
│   │       ├── input.tsx           # Styled form input
│   │       ├── tooltip.tsx         # Radix UI tooltip wrapper
│   │       ├── carousel.tsx        # 3D perspective card carousel (Upcoming section)
│   │       ├── footer-section.tsx  # Full footer layout component
│   │       └── video-player.tsx    # Custom video player with controls
│   │
│   └── lib/
│       └── utils.ts                # `cn()` — Tailwind class merge utility
│
├── next.config.ts                  # Next.js config (Unsplash image domain allowlist)
├── tsconfig.json
├── tailwind.config.ts              # (auto-detected by Tailwind v4)
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Ishan-Petkar/Elysium.git
cd Elysium

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm run start
```

All 6 routes are statically prerendered — the build output is fully static HTML/CSS/JS.

---

## Design System

All design tokens are defined as CSS variables in [`src/app/globals.css`](./src/app/globals.css):

| Variable | Value | Usage |
|---|---|---|
| `--background` | `#1a1a1a` | Page background |
| `--foreground` | `#f5f5f0` | Primary text |
| `--accent` | `#9a9766` | Gold accent (buttons, highlights) |
| `--muted` | `#3a3a3a` | Borders, subtle backgrounds |

**Typography:**
- Headings → `font-serif` = **Playfair Display**
- Body → `font-sans` = **Inter**
- Decorative script → `font-script` = **Great Vibes**

---

## Deployment

This project deploys to Vercel with zero configuration:

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Next.js and sets the correct build command (`next build`)
3. No environment variables are required for the current static build

---

## Known TODOs for the Dev Team

The following features are stubbed and ready for backend integration:

### 1. Contact Form → Backend API
**File:** [`src/components/home/ContactSection.tsx`](./src/components/home/ContactSection.tsx)

The form is fully built with validation (Zod) but currently simulates a submission. Wire it up to a real endpoint:
- **Option A:** Create a Next.js API route at `src/app/api/contact/route.ts`
- **Option B:** Use a transactional email service like [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)

### 2. Upcoming Projects — Dynamic Data
**File:** [`src/components/home/UpcomingProjectsSection.tsx`](./src/components/home/UpcomingProjectsSection.tsx)

Slide data is currently hardcoded. Connect to a CMS (e.g. Sanity, Contentful) or a database to make it manageable.

### 3. Instagram Gallery — Real Feed
**File:** [`src/components/home/InstagramSection.tsx`](./src/components/home/InstagramSection.tsx)

Currently uses static Unsplash images. Integrate the [Instagram Graph API](https://developers.facebook.com/docs/instagram-basic-display-api/) to pull real posts.

### 4. Portfolio Pages — Content
**Files:** `src/app/residential/page.tsx`, `src/app/commercial/page.tsx`, `src/app/upcoming/page.tsx`, `src/app/philosophy/page.tsx`

These are styled placeholder pages. Populate with real property listings and content.

### 5. Hero Carousel — Real Property Images
**File:** [`src/components/home/HeroCarousel.tsx`](./src/components/home/HeroCarousel.tsx)

Replace Unsplash placeholder images with actual property photography. Images are stored in `public/` or can be served from a CDN.

---

## Image Sources

All external images are served from `images.unsplash.com`, which is allowlisted in [`next.config.ts`](./next.config.ts). Replace with a CDN or your own storage bucket before go-live.

---

*Built for Elysium For You by Ishan Ravindra Petkar*
