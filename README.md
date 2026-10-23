# Universal AI-Powered Portfolio Website

A premium, editorial-grade personal portfolio website engineered to showcase multidisciplinary professionals.

Currently adapted and dynamically populated for **Nityashree Das** (*Team Leader in Last Mile Operations at Delhivery Ltd., Mechanical Engineer, and Dual MBA in Marketing & HR*), derived directly from verified documents and high-resolution portrait imagery.

---

## 🎨 Design Philosophy & Visual Identity

- **Editorial Aesthetics**: Clean typographical hierarchy inspired by high-end modern publications, combining `Playfair Display` for refined editorial titles with `Plus Jakarta Sans` for crisp body copy and `JetBrains Mono` for metadata tokens.
- **Harmonious Restrained Palette**:
  - **Warm Ivory** (`#F7F5F0` / `#FDFCF9`) — Base canvas with subtle warmth
  - **Charcoal** (`#252725` / `#1A1C1A`) — Editorial contrast typography and buttons
  - **Muted Sage** (`#A8B5A2` / `#BDCBB9`) — Organic accents & badges
  - **Warm Stone** (`#DCD8CF` / `#E6E2D9`) — Neutral borders and secondary panels
  - **Deep Olive** (`#596653`) — Primary brand and interactive accents
  - **Muted Bronze** (`#A58A64`) — Subdued metallic highlights
- **Domain-Specific Motifs**: Low-contrast technical blueprint grids, routing nodes, and coordinate accents representing engineering systems and logistics networks without distracting visual noise.

---

## 📂 Architecture & Universal Adaptability

The website follows a strict **data-presentation separation** pattern:
- **No Hardcoded Details**: All personal information, credentials, career history, skills, and initiatives are maintained in structured configuration (`src/types/portfolio.ts` & `src/data/profile.ts`).
- **Dynamic Adaptability**: To generate a portfolio for a different individual (e.g. software engineer, data scientist, researcher, designer):
  1. Place the new CV (`.pdf`) and photograph in the project.
  2. Run `python extract_cv.py <path_to_cv.pdf>` to inspect extracted fields.
  3. Update `src/data/profile.ts` (or plug in a JSON configuration) with the verified details.
  4. The UI automatically includes, omits, or reorganizes sections according to the content provided.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Python 3 (optional, for running `extract_cv.py`)

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   ├── DOC-20250318-WA0001..pdf        # Preserved source CV document
│   ├── Nityashree_Das_CV.pdf           # Standardized download path for CV
│   ├── portrait.png                    # High-res tuxedo portrait
│   └── Elegant Portrait...png          # Source photograph
├── src/
│   ├── components/
│   │   ├── BackgroundDecoration.tsx    # Low-contrast blueprint & routing motifs
│   │   ├── Navbar.tsx                  # Sticky blurred header & mobile drawer
│   │   ├── Hero.tsx                    # Asymmetrical hero with tuxedo portrait
│   │   ├── AboutSection.tsx            # Multi-disciplinary narrative & pillars
│   │   ├── ExperienceSection.tsx       # Interactive career timeline
│   │   ├── EducationSection.tsx        # Degree cards with SCTEVT/BPUT credentials
│   │   ├── SkillsSection.tsx           # Categorized competencies & CAD highlight
│   │   ├── ProjectsSection.tsx         # Operational case studies & initiatives
│   │   ├── ContactSection.tsx          # Direct verified channels & email dispatch
│   │   ├── CVModal.tsx                 # Interactive in-browser PDF reader
│   │   └── Footer.tsx                  # Clean editorial colophon
│   ├── data/
│   │   └── profile.ts                  # Structured extracted profile data
│   ├── types/
│   │   └── portfolio.ts                # TypeScript interfaces for portfolio schema
│   ├── App.tsx                         # Main composition root
│   ├── index.css                       # Tailwind layers and typography
│   └── main.tsx                        # React DOM mounting
├── extract_cv.py                       # Universal CV parser utility
├── tailwind.config.js                  # Custom palette and typography config
├── tsconfig.json                       # TypeScript compiler options
└── package.json                        # Scripts and dependencies
```

---

## ✅ Quality Assurance & Verification
- [x] **Zero fabricated data**: All details are verified from `DOC-20250318-WA0001..pdf`.
- [x] **Functional CV download**: Direct download of original PDF verified via HTTP 200.
- [x] **High-resolution photograph**: Beautifully framed in `Hero.tsx` using `aspect-[3/4]` and tailored `object-position`.
- [x] **Fully responsive**: Adapts seamlessly from mobile screens (320px) to ultra-wide desktops.
- [x] **Zero console errors**: Tested production build with `tsc && vite build`.
