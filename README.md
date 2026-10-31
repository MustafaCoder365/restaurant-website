<div align="center">

# 🍢 Dijla Grill — شوّاية دجلة

**A playful, bilingual (Arabic / English) restaurant website concept for a Baghdadi charcoal grill, with real-time 3D food built in Three.js.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-B3202E?style=for-the-badge&logo=githubpages&logoColor=white)](https://mustafacoder365.github.io/restaurant-website/)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)

</div>

> **Concept project.** Dijla Grill is a fictional restaurant. Names, prices, and contact details are sample content.

---

## ✨ Highlights

- 🎬 **Opening animation** — five color stripes drop in, the name pops in letter by letter, then the stripes lift away. Pure CSS, once per visit, skipped with reduced motion
- 🍅 **3D food around the title** — a skewer, tomato, onion, lemon, chilies, samoon bread, a tea glass, and more, all modeled in code from primitives (no model files). They pop in, float, follow the pointer, and fly outward as you scroll
- 🥪 **"The samoon, layer by layer"** — a pinned scroll scene: each step lights up and its layer bounces onto a 3D samoon sandwich until it's ready
- 🎗️ **Tilted marquee ribbons** — dish names and house sayings, RTL-aware
- 📋 **Full menu** — six categories as keyboard-accessible tabs, prices in IQD, and tags (spicy, vegetarian, house favorite, serves two)
- 🟢 **Live "open now" status** — calculated in Baghdad time, including the after-midnight hours
- 🌍 **Full Arabic and English** — separate routes (`/ar`, `/en`), RTL layout, and Iraqi dish names in both languages
- ⚡ **Fast 3D** — studio reflections baked once, rendering paused when off screen, lighter scenes on phones, and WebGL-free fallback

## 🧭 Page sections

| Section | What it does |
|---|---|
| **Intro** | Color stripes and the name, first visit only |
| **Hero** | Giant name with 3D food, tagline, menu and WhatsApp buttons, live status, spinning badge |
| **Ribbons** | Two tilted marquees crossing the page |
| **The samoon** | Pinned scroll scene building a 3D sandwich in six steps |
| **Menu** | Tabbed categories with prices, descriptions, and tags |
| **Gallery** | Tilted photo cards |
| **Visit** | Address, hours, live status, call, WhatsApp, and map |

## 🛠️ Tech Stack

| Area | Tools |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, static export) |
| **3D** | [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) with design tokens |
| **Typography** | [Lalezar](https://fonts.google.com/specimen/Lalezar) and [Rubik](https://fonts.google.com/specimen/Rubik), both with Arabic and Latin |
| **Icons** | [Lucide](https://lucide.dev/) |
| **Deployment** | GitHub Pages via GitHub Actions |

## 📂 Project Structure

```
app/
├── (root)/            # Language picker for "/"
└── [lang]/            # Arabic and English pages (layout sets lang + dir)
components/
├── three/             # Shared canvas, food models, hero scene, samoon scene
├── BuildSection.tsx   # Pinned scroll story
├── MenuTabs.tsx       # Tabbed menu
└── ...                # Header, intro, ribbons, open status, logo
lib/content.ts         # All copy and the menu, in Arabic and English
```

## 🚀 Getting Started

```bash
git clone https://github.com/MustafaCoder365/restaurant-website.git
cd restaurant-website
npm install
npm run dev
```

Open http://localhost:3000/en or http://localhost:3000/ar. Pushing to `main` deploys automatically.

## 📷 Photo credits

Photos from [Unsplash](https://unsplash.com), free under the [Unsplash License](https://unsplash.com/license): Markus Winkler, Hamid Roshaan, Husien Bisky, and Imad 786.

## 👤 Author

**Mustafa Shakir** — Frontend Software Developer

[![GitHub](https://img.shields.io/badge/GitHub-MustafaCoder365-181717?style=flat-square&logo=github)](https://github.com/MustafaCoder365)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mustafa%20Shakir-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/mustafa-shakir-840374330)
[![Email](https://img.shields.io/badge/Email-Contact-0F172A?style=flat-square&logo=gmail&logoColor=white)](mailto:mustafa1997670@gmail.com)
