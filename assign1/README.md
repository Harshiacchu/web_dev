# Personal Homepage

A front end only personal homepage built with **vanilla HTML5, CSS3, and ES6
modules**. Its signature feature is an **interactive terminal** that lets visitors
explore my work by typing commands, wrapped in a warm "Reading Room" theme (deep
green, cream, walnut, and gold) with a persistent light/dark switch.

> _"I work with data until it starts making sense."_

---

## Author

**Harshitha Seetharaman**
MS in Computer Science, Northeastern University (Khoury College)
📧 seetharaman.ha@northeastern.edu · 🔗 [LinkedIn](https://www.linkedin.com/in/harshitha-seetharaman-97098a213/) · 🌐 [Portfolio](https://harshitha-seetharaman-portfolio.vercel.app/)

## Class Link

[CS5610 Web Development: Project 1: Personal Home Page](https://northeastern.instructure.com/courses/261032)

## Project Objective

Build a memorable, standards compliant personal homepage using only vanilla
HTML5, CSS3, and ES6 modules, no backend, no jQuery, no component libraries,
that clearly communicates who I am and what I build, includes an original
interactive component, and is deployed publicly. The full design rationale
(project description, user personas, user stories, and mockups) lives in
[`DESIGN.md`](./DESIGN.md).

## Screenshot

![Screenshot of the homepage: hero section with a rotating portrait and an interactive terminal, in the warm Reading Room theme](./images/screenshot.png)

## Demo Video

- 📹 **Walkthrough & Demonstration:** [Watch Video Walkthrough](https://drive.google.com/file/d/1Lngz1zhnPm61ZacQOSlIFh9i1G4dt3aA/view?usp=sharing)

## Features

- 🖥️ **Interactive terminal** (`js/terminal.js`): type `help`, `about`,
  `projects`, `skills`, `contact`, `theme`, `clear`. Supports command history
  (↑/↓) and Tab autocompletion.
- 🎨 **"Reading Room" theme** with a persistent light/dark toggle (saved to
  `localStorage`, defaults to your OS preference).
- ✍️ **Typewriter role rotator**, scroll reveal sections, a pointer following
  glow, and a **duotone avatar** that fades to the full colour photo on hover,
  all reduced under `prefers-reduced-motion`.
- 🤖 **AI Lens page** (`ai.html`): pick a prompt and an AI drafted answer types
  out in real time, with full transparency notes.
- 🏃 **Running buddy** (`js/runner.js`): an endless runner style character with
  my avatar on a hoverboard chases the cursor across the site, flipping to face
  its direction. It never blocks clicks, has an on/off toggle (remembered), and
  only runs on fine pointers with motion allowed.
- ♿ Accessible: skip link, `alt` text on all images, `aria` labels, semantic
  HTML, real `<button>` elements.
- 📱 Responsive layout using CSS Grid **and** Flexbox.

## Pages

| Page    | File         | Description                                                    |
| ------- | ------------ | -------------------------------------------------------------- |
| Home    | `index.html` | Hero, terminal, projects, skills, contact                      |
| About   | `about.html` | Bio, education & experience timelines, achievements, interests |
| AI Lens | `ai.html`    | AI generated page: pick a prompt, an AI answer types out       |

## Tech Stack

- **HTML5** (semantic, W3C valid)
- **CSS3** (custom properties, Grid + Flexbox, no `!important`)
- **JavaScript (ES6 modules)**: `type="module"` scripts and `"type": "module"`
  in `package.json`
- **Google Fonts** (Fraunces, Inter, JetBrains Mono)
- **Prettier** + **ESLint** for formatting and linting
- **Vercel** for deployment

## Project Structure

```
assign1/
├── index.html          # Home
├── about.html          # About (second URL)
├── ai.html             # AI generated page (third URL)
├── css/
│   └── styles.css      # All styling (no !important)
├── js/
│   ├── data.js         # Shared content (single source of truth)
│   ├── terminal.js     # Interactive terminal component
│   ├── ui.js           # Theme, typewriter, reveal, pointer glow
│   ├── runner.js       # Running buddy cursor follower
│   ├── main.js         # Home entry point
│   ├── about.js        # About entry point
│   └── ai.js           # AI Lens entry point + typing effect
├── images/             # avatar, favicon, screenshot
├── DESIGN.md           # Design document (description, personas, stories, mockups)
├── package.json        # type: module + dependencies
├── eslint.config.js    # ESLint flat config
├── .prettierrc.json    # Prettier config
├── vercel.json         # Vercel config
├── LICENSE             # MIT
└── README.md
```

## Instructions to Build & Run

This is a static site; no build step is required.

**Option 1: open directly**
Because the pages use ES6 modules (`type="module"`), browsers require the files
to be served over HTTP (opening via `file://` will block module loading). Use a
local server:

```bash
# From the assign1/ folder
npx serve .
# then open the printed URL (e.g. http://localhost:3000)
```

or

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

**Option 2: with the dev tooling**

```bash
npm install          # installs Prettier + ESLint (dev only)
npm run lint         # ESLint: should report no errors
npm run format:check # Prettier: should report all files formatted
npm start            # serves the site locally
```

## Deployment (Vercel)

The site is deployed on Vercel as a static project.

```bash
npm i -g vercel      # once
vercel               # from assign1/, follow the prompts
vercel --prod        # promote to production
```

Or connect the GitHub repo at [vercel.com](https://vercel.com) → **New Project**
→ import the repo → deploy (no framework preset needed; it is static).

## Use of Generative AI (GenAI)

This project reflects my own design, architecture, and code, built with vanilla HTML5, CSS3, and ES6 modules. Generative AI was used as a collaborative design partner and pair programming assistant to brainstorm ideas, explore options, and refine interactive features.

| Tool | Model / Version | How it was used |
| --- | --- | --- |
| **Claude** | Claude (Anthropic) | Exploring color palette themes, assisting with the cursor follower animation logic, drafting wording for the AI Lens blurbs on `ai.html`, and reviewing documentation formatting. |

**Key areas of collaboration:**

- **Color Palette and Theme Selection:** I discussed multiple visual themes and color schemes with Claude (ranging from modern high tech dark palettes to warm editorial themes) before choosing "The Reading Room" palette (forest green, cream, walnut, and gold) to match my design goals.
- **Interactive Cursor Buddy (`js/runner.js`):** Used Claude to assist with the math for smooth cursor interpolation, direction flipping, and hoverboard animation states.
- **AI Lens Perspectives (`ai.html`):** Brainstormed different perspective blurbs (recruiter angle, problem solving focus, technical summary) which I then selected and edited for my background.
- **Syntax and Accessibility Sanity Checks:** Verified standard syntax patterns for `prefers-reduced-motion` queries and clean markdown formatting.

**Representative prompts used:**

- _"Compare three cohesive color palette options for a portfolio site: a modern slate and indigo theme, an editorial warm interior theme, and a minimalist monochrome theme with warm accents."_
- _"How do I calculate movement velocity and flip the CSS transform direction for a floating character following the mouse pointer smoothly in vanilla JavaScript?"_
- _"Draft five short phrasing ideas describing a data engineer background across multiple lenses for an interactive perspective component."_

**Core author work:** Overall system architecture, semantic HTML structure, responsive layout design with CSS Grid and Flexbox, design tokens, interactive terminal implementation and command handling, personal project and academic content, and all final engineering and styling decisions were created and verified by me.

## License

Released under the [MIT License](./LICENSE). © 2026 Harshitha Seetharaman.

