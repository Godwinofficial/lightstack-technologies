## Lightstack Portfolio Website

A ProBASE-inspired marketing site for Lightstack — a system building & engineering company. Dark navy background with orange accents, full-screen scroll-snap sections, and a fixed right-side dot navigator that highlights the active section.

### Design language

- **Palette**: Deep navy background (`#0E2238`-ish), warm orange accent (`#E85A1A`), white primary text, muted slate for body copy.
- **Typography**: Bold display sans for headings (huge "Welcome," style), clean sans for body. Two-tone headlines where the first word is orange and the rest is white (matches ProBASE).
- **Layout system**: Full-viewport sections with `scroll-snap`, fixed header (logo left, hamburger right), fixed footer strip (© Lightstack 2026 + social icons), fixed right-edge dot pagination that scrolls you between sections.
- **Motion**: Gentle fade/slide-up on section enter, animated stat bars, hover lift on cards/logos.

### Pages & sections

Single landing route (`/`) with seven snap sections, plus separate routes for SEO:

```
/            → Home (all sections, snap-scroll)
/about       → mirrors About + Stats
/services    → mirrors What we do
/portfolio   → mirrors Past projects
/contact     → mirrors Contact
```

Each route gets its own `head()` metadata.

**Section 1 — Hero**
- Huge headline: "Welcome, to **Lightstack**" (orange "Welcome,", white rest)
- Subhead: "Engineering Beyond Code"
- Play-circle "Video Showcase" affordance (placeholder modal)
- Subtle right-side image overlay (person at laptop, faded)

**Section 2 — What we do**
- Heading "**What** we do" (orange/white split)
- 4 service cards stacked (mobile) / grid (desktop), each: orange outline circle icon + UPPERCASE title + short paragraph:
  1. Web Development
  2. Mobile App Development
  3. Custom Software & Systems
  4. UI/UX Design & Branding

**Section 3 — About Us**
- Faded portrait/workspace background image
- Translucent panel with **Our Vision** and **Our Reach** blocks separated by a thin orange divider, italic body text.

**Section 4 — Some of our statistics**
- Heading "**Some of our** statistics"
- "Here is some of our KEY STATISTICS" sub-line
- Animated horizontal bars with label + big number on the right:
  - Projects Delivered → >120
  - Lines of Code Shipped → >2M
  - Active Users Served → >500K
  - Uptime Maintained → 99.9%

**Section 5 — Past Projects (Portfolio)**
- 4–6 placeholder project cards: bold orange project name, one-line category (e.g. "Fintech Dashboard", "Logistics Mobile App"), small mark/icon. Vertical stack on mobile, grid on desktop.

**Section 6 — Valued Clients**
- Heading "**Valued** Clients"
- Grid of 6–8 placeholder client logos (simple SVG wordmarks generated in-app so nothing 404s), monochrome white, hover → color.

**Section 7 — Contact**
- Heading "**Lightstack** HQ" with placeholder city
- Faded map background (static image / styled SVG)
- Email, phone, address
- Inline contact form: name, email, message, submit (client-side validation; submit shows success toast — no backend yet)

### Global UI

- **Header**: Lightstack logo (text mark with orange dot/arc) + Solutions Beyond Technology-style tagline; hamburger opens an overlay menu listing all sections, slides in from right.
- **Footer strip**: pinned bottom-left "© Lightstack 2026", bottom-right Facebook + LinkedIn icons.
- **Right dot nav**: 7 dots, active one orange and enlarged, click to snap-scroll.

### Technical notes

- TanStack Start file-routes: `index.tsx` hosts the snap-scroll experience; `about/services/portfolio/contact` are lighter standalone pages reusing the same section components from `src/components/sections/`.
- Scroll-snap via Tailwind `snap-y snap-mandatory` on a full-height container; IntersectionObserver hook drives the active dot + header state.
- Logos rendered as inline SVG components (no external image dependencies).
- Theme tokens added to `src/styles.css` (`--brand-navy`, `--brand-orange`, etc.) and exposed as Tailwind colors.
- Form is UI-only for now; wiring to email/Lovable Cloud can be added later.

### Out of scope (for now)

- Real video, real client logos, real case studies, real map tiles
- CMS, blog, auth, backend submissions
