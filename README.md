# Bhagavad Gita Vishwa Mahotsav 2027

**18 Countries • 18 Chapters • 18 Languages • One Gita**

Full-stack Next.js 14 website for the Bhagavad Gita Vishwa Mahotsav 2027 — the world's largest Bhagavad Gita celebration, spanning 18 countries, 18 chapters, and 18 languages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | react-hook-form + zod |
| Database | PostgreSQL (Prisma ORM) |
| Auth | JWT via `jose` + bcryptjs |
| Email | Nodemailer (SMTP) |
| State | Zustand (Join Modal) |
| Deployment | Vercel (frontend) + Neon/Supabase (DB) |

---

## Project Structure

```
bgvm2027/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (header, footer, modals)
│   ├── admin/              # Admin dashboard (protected)
│   ├── api/                # All REST API routes
│   ├── mahotsav/           # The Mahotsav section
│   ├── global-journey/     # Global Journey section
│   ├── experience/         # Experience section
│   ├── programme/          # Programme section
│   ├── participate/        # Registration & participation forms
│   ├── partners/           # Partnership tiers & proposal form
│   ├── media/              # News, Gallery, Videos, Press Kit
│   └── about/              # About section with Contact form
├── components/
│   ├── layout/             # AnnouncementBar, Header, Footer
│   ├── ui/                 # PageHero, JoinModal, GoldDivider, SectionWrapper
│   ├── home/               # HeroSlider, SignatureGrid, JourneyTimeline, etc.
│   ├── forms/              # RegistrationForm, VolunteerForm, ContactForm, etc.
│   ├── global-journey/     # ChaptersGrid (interactive 18-card grid), RoadTimeline
│   ├── media/              # NewsListings, GalleryGrid, PressKitList
│   └── admin/              # AdminShell, AdminTable, StatCard, ArticleForm
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── auth.ts             # JWT sign/verify, requireAdmin middleware
│   ├── email.ts            # Nodemailer email functions
│   ├── navData.ts          # Mega-menu navigation structure
│   ├── chapters.ts         # All 18 Gita chapters data
│   ├── useJoinModal.ts     # Zustand store for Join Modal
│   └── useAdminFetch.ts    # Authenticated fetch hooks for admin
├── prisma/
│   └── schema.prisma       # Database schema (10 models)
├── .env.example            # Environment variable template
└── README.md
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-org/bgvm2027.git
cd bgvm2027
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — random 64-char secret (`openssl rand -hex 32`)
- `SMTP_*` — your SMTP credentials
- `ADMIN_EMAIL` — email address for admin notifications
- `NEXT_PUBLIC_BASE_URL` — your site's base URL

### 3. Set up the database

```bash
# Push schema to your database (creates all tables)
npx prisma db push

# (Optional) Open Prisma Studio to inspect the database
npx prisma studio
```

### 4. Create the first admin user

```bash
node scripts/create-admin.js
```

Or use the Prisma Studio to insert a record into the `Admin` table:
- `email`: your admin email
- `passwordHash`: run `node -e "const b=require('bcryptjs'); b.hash('yourpassword', 12).then(console.log)"` to generate

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

---

## Admin Dashboard

**URL:** `/admin`

| Section | URL | Description |
|---|---|---|
| Login | `/admin/login` | JWT authentication |
| Dashboard | `/admin/dashboard` | Stats overview with charts |
| Registrations | `/admin/registrations` | View + CSV export all registrations |
| Volunteers | `/admin/volunteers` | Volunteer applications + CSV |
| Partnerships | `/admin/partnerships` | Partnership proposals + CSV |
| Contact Messages | `/admin/contacts` | Contact form submissions |
| News | `/admin/news` | Create, edit, delete articles |
| Gallery | `/admin/gallery` | Add/remove gallery images |
| Press Kit | `/admin/press-kit` | Manage downloadable files |

---

## API Routes

### Public

| Method | Route | Description |
|---|---|---|
| POST | `/api/register` | Event registration |
| POST | `/api/volunteer` | Volunteer application |
| POST | `/api/host-parayana` | Parayana host request |
| POST | `/api/partnership-proposal` | Partnership enquiry |
| POST | `/api/contact` | Contact form |
| POST | `/api/newsletter/subscribe` | Newsletter signup |
| GET | `/api/news` | List news articles |
| GET | `/api/news/:slug` | Get article by slug |
| GET | `/api/gallery` | List gallery items |
| GET | `/api/press-kit` | List press kit files |

### Admin (Bearer token required)

| Method | Route | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login (returns JWT) |
| GET | `/api/admin/registrations` | All registrations (+ `?format=csv`) |
| GET | `/api/admin/volunteers` | All volunteers (+ `?format=csv`) |
| GET | `/api/admin/partnerships` | All proposals (+ `?format=csv`) |
| GET | `/api/admin/contacts` | All messages |
| GET/POST | `/api/admin/news` | List / create articles |
| PUT/DELETE | `/api/admin/news/:id` | Update / delete article |
| POST | `/api/admin/gallery` | Add gallery image |
| DELETE | `/api/admin/gallery/:id` | Remove gallery image |
| GET/POST | `/api/admin/press-kit` | List / add press kit file |
| DELETE | `/api/admin/press-kit/:id` | Remove press kit file |

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Database

Recommended hosted PostgreSQL providers:
- **[Neon](https://neon.tech)** — free tier, serverless, excellent Vercel integration
- **[Supabase](https://supabase.com)** — free tier, includes dashboard
- **[Railway](https://railway.app)** — simple, pay-as-you-go

After setting `DATABASE_URL`, run:
```bash
npx prisma db push
```

### Email

For production email, we recommend:
- **[Resend](https://resend.com)** — generous free tier, excellent deliverability
- **[SendGrid](https://sendgrid.com)** — reliable, free up to 100/day
- **Gmail with App Password** — works for low volume

---

## Design System

| Token | Value |
|---|---|
| Primary Accent | `#C9A227` (Gold) |
| Accent Gradient | `135deg, #D4AF37 → #B8860B` |
| Background | `#FFFFFF` |
| Secondary BG | `#FAF8F3` (warm cream) |
| Heading Text | `#111111` |
| Body Text | `#2B2B2B` |
| Footer BG | `#0A0A0A` |
| Heading Font | Cormorant Garamond (serif) |
| Body Font | Inter (sans-serif) |

---

## Key Features

- **Hero Slider** — 4-slide auto-rotating hero with Framer Motion transitions, slide counter, and manual arrows
- **Mega-Menu Navigation** — sticky header with multi-column dropdowns (desktop) and accordion (mobile)
- **18 Chapters Grid** — interactive 6×3 card grid with animated modal detail panel for each chapter
- **Journey Timeline** — alternating left/right timeline with gold connector line
- **Multi-Step Registration** — 3-step form: type selector → details → confirmation, with email confirmation
- **Join the Movement Modal** — 5-card participation path modal, accessible from any page
- **Admin Dashboard** — full CRUD for news, gallery, press kit; table views with CSV export for all form submissions
- **Email Automation** — HTML-templated confirmation emails to users + admin notifications on every form submission
- **SEO** — per-page metadata, OG tags, Twitter cards via Next.js Metadata API

---

## License

© 2026–27 Bhagavad Gita Vishwa Mahotsav Trust. All Rights Reserved.
