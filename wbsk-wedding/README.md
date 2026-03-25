# WBSK — Weddings by Siddhant Kapoor
### Luxury Wedding Photography Portfolio Website

A premium, cinematic wedding photography website built with **Next.js**, **Sanity CMS**, **GSAP animations**, and **Lenis smooth scroll**.

---

## ✨ Features

- **Cinematic Hero** — Parallax background that moves with your cursor, smooth text reveals
- **Philosophy Section** — Animated number counters with staggered reveals
- **Recent Weddings** — Infinite horizontal scrolling cards with hover zoom
- **Client Pages** — Photo gallery collage with lightbox + video embeds
- **Contact Form** — Email notifications via Nodemailer
- **Custom Cursor** — Gold dot & ring that reacts to hoverable elements
- **Film Grain Overlay** — Subtle texture for a cinematic feel
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling
- **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- **Easy Admin Panel** — Sanity Studio for managing all content

---

## 📁 Project Structure

```
wbsk-wedding/
├── sanity/
│   └── schemas/           ← CMS content models
│       ├── client.ts      ← Wedding clients (most important!)
│       ├── homePage.ts    ← Hero section content
│       ├── philosophy.ts  ← Quote section
│       ├── about.ts       ← About section
│       ├── category.ts    ← Wedding categories
│       └── siteSettings.ts← Global site config
│
├── src/
│   ├── app/
│   │   ├── page.tsx       ← Homepage (assembles all sections)
│   │   ├── layout.tsx     ← Root layout with fonts
│   │   ├── not-found.tsx  ← 404 page
│   │   ├── client/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  ← Dynamic client gallery page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  ← Contact form email handler
│   │
│   ├── components/
│   │   ├── Hero.tsx              ← Hero with parallax + cursor effect
│   │   ├── Philosophy.tsx        ← Quote + number counters
│   │   ├── RecentWeddings.tsx    ← Infinite scroll cards
│   │   ├── About.tsx             ← About section with BG parallax
│   │   ├── Contact.tsx           ← Contact form
│   │   ├── ClientGalleryPage.tsx ← Client detail with gallery + videos
│   │   ├── Navbar.tsx            ← Sticky nav + mobile menu
│   │   ├── Footer.tsx            ← Footer
│   │   ├── SmoothScroll.tsx      ← Lenis wrapper
│   │   ├── CustomCursor.tsx      ← Gold cursor
│   │   └── GrainOverlay.tsx      ← Film grain texture
│   │
│   ├── lib/
│   │   ├── sanity.ts      ← Sanity client + all GROQ queries
│   │   ├── types.ts       ← TypeScript types
│   │   └── animations.ts  ← Reusable GSAP animation hooks
│   │
│   └── styles/
│       └── globals.css    ← Tailwind + custom luxury styles
│
├── .env.local              ← Environment variables (secrets)
├── next.config.js
├── tailwind.config.js
├── sanity.config.ts        ← Sanity Studio config
└── package.json
```

---

## 🚀 SETUP GUIDE (Step by Step)

### Prerequisites
- **Node.js 18+** installed ([download here](https://nodejs.org))
- A **Sanity.io** account (free tier works)
- A **Gmail** account (for contact form emails)
- A **Vercel** account (for hosting — free)

---

### Step 1: Install Dependencies

```bash
cd wbsk-wedding
npm install
```

### Step 2: Set Up Sanity CMS

1. Go to [sanity.io](https://www.sanity.io) and create a free account
2. Create a new project called "WBSK"
3. Choose "production" as your dataset name
4. Copy your **Project ID** from the dashboard

```bash
# Install Sanity CLI globally
npm install -g sanity@latest

# Initialize Sanity in the project (follow prompts)
sanity init --env
```

5. Update your `.env.local` file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

6. Deploy the Sanity Studio (your admin panel):
```bash
sanity deploy
```
This gives you a URL like `https://wbsk.sanity.studio` — this is your admin panel!

### Step 3: Add Content in Sanity Studio

1. Open your Sanity Studio URL
2. Go to **"🏠 Home Page"** → Add your hero text and background image
3. Go to **"💬 Philosophy"** → Add your quote
4. Go to **"📖 About"** → Add your about text
5. Go to **"💒 Clients"** → Add your wedding clients:
   - Upload a cover image (drag & drop)
   - Add couple name, venue, date
   - Upload gallery photos (drag & drop multiple)
   - Paste YouTube/Vimeo video links
   - Click **Publish**

### Step 4: Set Up Contact Form Email

For Gmail:
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Generate an app password for "Mail"
3. Update `.env.local`:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_TO=siddhant@wbsk.com
```

### Step 5: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — your website is live locally!

---

## 🌐 DEPLOYMENT (Vercel)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — WBSK website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wbsk-wedding.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Import your GitHub repo
2. Add your environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`
3. Click **Deploy**

### Step 3: Connect Custom Domain (optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `weddingsbysiddhantkapoor.com`)
3. Update your domain's DNS as instructed

---

## 🎯 How to Add a New Wedding Client

1. Open your Sanity Studio (your admin URL)
2. Click **"💒 Clients"** → **"Create new"**
3. Fill in:
   - **Title**: e.g., "Royal Palace Wedding"
   - **Slug**: Click "Generate" (auto-creates URL)
   - **Couple Name**: e.g., "Priya & Rahul"
   - **Date**: Pick the wedding date
   - **Venue**: e.g., "Taj Palace, New Delhi"
   - **Cover Image**: Drag & drop the main photo
   - **Gallery**: Drag & drop all photos (upload multiple at once)
   - **Videos**: Paste YouTube/Vimeo links
   - **Featured**: Toggle ON to show on homepage
4. Click **Publish**

The new client automatically appears on the homepage carousel and gets its own gallery page!

---

## 🎨 Customization Quick Reference

| What to Change | Where |
|---|---|
| Hero text & image | Sanity → "🏠 Home Page" |
| Quote | Sanity → "💬 Philosophy" |
| About text | Sanity → "📖 About" |
| Clients | Sanity → "💒 Clients" |
| Colors | `tailwind.config.js` → `colors` |
| Fonts | `src/app/layout.tsx` |
| Animation speed | `src/lib/animations.ts` |
| Nav links | `src/components/Navbar.tsx` |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| CMS | Sanity.io |
| Animations | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Email | Nodemailer |
| Hosting | Vercel |

---

## 📝 Notes

- The website works even without Sanity connected — all components have elegant fallback data
- Images are optimized via Next.js `<Image>` component
- ISR (Incremental Static Regeneration) refreshes content every 60 seconds
- All animations are GPU-accelerated and mobile-friendly
- The grain overlay and custom cursor are automatically disabled on touch devices
