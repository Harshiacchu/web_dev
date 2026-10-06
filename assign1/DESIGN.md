# Design Document: Personal Homepage

**Author:** Harshitha Seetharaman
**Course:** CS Web Development: Project 1 (Personal Home Page)
**Date:** 2026

---

## 1. Project Description

### 1.1 Overview

This project is my personal homepage: a front end only static site built with
**vanilla HTML5, CSS3, and ES6 modules**: no backend, no frameworks, and no
component libraries. It introduces who I am (Harshitha Seetharaman, an MS
Computer Science student at Northeastern University), what I build (data systems,
analytics, and software), and how to reach me.

### 1.2 Problem statement

Most student homepages look the same: a photo, a paragraph, a grid of cards.
Recruiters and classmates skim them in seconds and forget them just as fast. My
goal was a homepage that is **memorable, personal, and still highly usable**,
one that reflects how I actually think about my work: _"I work with data until it
starts making sense."_

### 1.3 The signature idea: an interactive terminal

The differentiating component is an **in browser terminal**. Instead of only
scrolling, a visitor can type commands (`about`, `projects`, `skills`,
`contact`, `theme`, `help`) at a `visitor@harshitha:~$` prompt to explore me the
way I explore data by querying it. It supports command history (↑/↓), Tab
autocompletion, and themed output. The same information is always available as
normal, accessible HTML sections below, so the terminal is an _enhancement_, not
a barrier.

### 1.4 Visual concept: "The Reading Room"

The aesthetic is a warm, royal **interior design palette**: deep forest green,
cream and beige, walnut brown, and an aged gold accent, over a subtle striped
paper texture. It should feel like a quiet, well lit study (calm, considered,
and a little luxurious), which mirrors how I like to work with information. Motion
is intentional but restrained: a typewriter tagline, scroll reveal sections, a
pointer following glow, a rotating portrait frame, and an evening study theme
that is remembered between visits.

### 1.5 Scope & pages

| Page    | URL          | Purpose                                                                                                    |
| ------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| Home    | `index.html` | Hero, interactive terminal, projects, skills, contact                                                      |
| About   | `about.html` | Fuller bio, education & experience timeline, achievements, interests                                       |
| AI Lens | `ai.html`    | Required AI generated page: pick a prompt and an AI drafted answer types out live, plus transparency notes |

### 1.6 Technology & constraints

- **HTML5**: semantic, W3C valid, all images carry `alt` text.
- **CSS3**: custom properties, Flexbox **and** CSS Grid, no `!important`,
  respects `prefers-reduced-motion` and `prefers-color-scheme`.
- **ES6 modules**: `type="module"` scripts and `"type": "module"` in
  `package.json`; content lives in a shared `data.js` module.
- **Tooling**: Prettier (formatting) and ESLint (linting) with zero errors.
- **Deployment**: Vercel (static hosting).
- Resources organized into `css/`, `js/`, and `images/` folders.

---

## 2. User Personas

### Persona A: "Priya, the Recruiter"

- **Age / role:** 34 · University relations recruiter at a tech company.
- **Context:** Reviews 60+ student sites a week, usually on a laptop between
  meetings, sometimes on her phone.
- **Goals:** Quickly judge whether a candidate fits a data/analytics internship;
  find resume, skills, and contact details fast.
- **Frustrations:** Slow, gimmicky pages; buried contact info; walls of text; no
  clear "what does this person actually do."
- **Needs from this site:** A one line value proposition up top, scannable
  projects with tech tags, obvious contact and resume links, mobile friendly.

### Persona B: "Daniel, the Hiring Engineer"

- **Age / role:** 29 · Software/data engineer who screens candidates technically.
- **Context:** Curious, keyboard driven, appreciates craft in a build.
- **Goals:** See real projects and the actual stack; gauge whether the person can
  build clean front end code (this _is_ the artifact).
- **Frustrations:** Template sites that reveal nothing; broken links; sloppy code
  behind a pretty surface.
- **Needs from this site:** Depth on projects, honest tech stacks, and small
  signals of craftsmanship: the terminal, keyboard shortcuts, clean markup.

### Persona C: "Maya, the Classmate / Peer"

- **Age / role:** 24 · Fellow MS student doing the same course.
- **Context:** Browsing for inspiration and to connect; on campus wifi.
- **Goals:** Understand who Harshitha is beyond the resume; find common ground;
  reach out on LinkedIn.
- **Frustrations:** Cold, corporate pages with no personality.
- **Needs from this site:** A human touch: interests, story, the AI page, plus
  easy social links.

### Persona D: "Professor / Grader"

- **Age / role:** Course instructor evaluating against the rubric.
- **Goals:** Confirm ES6 modules, valid HTML, an original component, organized
  folders, accessibility, meta tags, license, README, and deployment.
- **Needs from this site:** Everything discoverable and standards compliant, with
  a clear README and design document.

---

## 3. User Stories (use cases as stories)

> Format: _As a **[persona]**, I want **[action]**, so that **[outcome]**._
> Each story includes a short narrative and its acceptance criteria.

### Story 1: Judge fit in 10 seconds

**As Priya the recruiter**, I want to understand what Harshitha does the instant
the page loads, so that I can decide whether to keep reading.

_Narrative:_ Priya opens the link between interviews. Before she scrolls, the hero
says "I turn data into decisions," a rotating tagline cycles through her roles,
and a status pill reads "open to Spring 2027." She knows in seconds this is a
data/software candidate.

_Acceptance:_ Hero headline, animated role rotator, and availability status are
visible above the fold on load; a "View my work" button is present.

### Story 2: Explore by typing

**As Daniel the engineer**, I want to interact with the page like a shell, so that
I get a feel for how she builds and enjoy the exploration.

_Narrative:_ Daniel notices the terminal, types `help`, then `projects`, then hits
↑ to repeat a command and Tab to autocomplete `sk` → `skills`. It feels crafted,
not templated.

_Acceptance:_ Typing `help` lists commands; each command prints correct output;
↑/↓ recall history; Tab autocompletes; unknown commands show a friendly error;
`clear` empties the screen.

### Story 3: Scan the projects

**As Priya**, I want to skim projects with their tech stacks, so that I can match
them to an open role.

_Narrative:_ She scrolls to "Things I've shipped" and sees three cards:
HormuzPulse, AccessMap+, BrainCost, each with a one line description and tags
like Python, BigQuery, PyTorch. Cards lift on hover.

_Acceptance:_ Each project shows name, description, a highlight, and stack tags;
the grid reflows from three columns to one on mobile.

### Story 4: Read the human story

**As Maya the classmate**, I want to learn who Harshitha is beyond work, so that I
feel a connection and reach out.

_Narrative:_ Maya clicks "About," reads the education and experience timelines,
smiles at the "After hours" section (K dramas, horror films, animal
volunteering), and connects on LinkedIn.

_Acceptance:_ The About page shows education, experience, achievements, and
interests; LinkedIn and email links work.

### Story 5: Reach out easily

**As Priya**, I want contact and resume links that always work, so that I can act
without hunting.

_Acceptance:_ Email (`mailto:`) and LinkedIn are reachable from the home page
contact section, the footer, and the terminal `contact` command; external links
open in a new tab with `rel="noopener"`.

### Story 6: Read comfortably at night / on mobile

**As any visitor**, I want a comfortable dark mode and a responsive layout, so
that the page respects my device and preferences.

_Narrative:_ Daniel is on a dark themed laptop at night; the site already opens in
"evening study" mode because it honors his OS preference, and his manual choice is
remembered next visit.

_Acceptance:_ Theme toggle switches light and dark, persists via `localStorage`, and
defaults to the OS preference; layout is usable from 320px up; animations reduce
under `prefers-reduced-motion`.

### Story 7: See responsible AI use

**As the professor**, I want a clearly labeled AI generated page, so that I can
grade that requirement and assess honesty about AI use.

_Narrative:_ The grader visits "AI Lens," reads that the answers were AI drafted
and curated, clicks a prompt chip and watches the AI answer type out live, and
finds model, version, and prompt details in the README.

_Acceptance:_ `ai.html` is a distinct URL, clearly marked AI generated, includes a
working interactive feature, and the README documents the GenAI tools used.

### Story 8: Verify the build (grading)

**As the professor**, I want standards compliance, so that the rubric is met.

_Acceptance:_ Valid W3C HTML with no errors; ESLint passes; Prettier formatted;
all images have `alt`; meta author/description/icon present; MIT license and
README included; CSS uses Flexbox/Grid and no `!important`; buttons are real
`<button>` elements.

---

## 4. Design Mockups (wireframes)

Low fidelity wireframes below define layout and hierarchy. Colors follow the
"Reading Room" palette: forest green `#1e3d32`, cream `#f6f1e7`, walnut
`#6f5334`, gold `#c2a15a`.

### 4.1 Home: desktop (≥ 820px)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [HS] Harshitha Seetharaman     Home  About  AI Lens  Projects  [◐ Dark]│  ← sticky nav
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  • Boston · open to Spring 2027                     ╭──────────────╮      │
│                                                   │  ◜ rotating ◝ │      │
│  I turn data into                                 │ ( portrait  ) │      │
│  *decisions*.                                     │  ◟  frame  ◞  │      │
│  > Data Engineer_                                 ╰──────────────╯      │
│                                                    • MS CS @ NEU        │
│  Hi, I'm Harshitha: MS CS at Northeastern...                           │
│                                                                        │
│  [ View my work ]  [ More about me ]                                    │
├──────────────────────────────────────────────────────────────────────┤
│  ORIGINAL COMPONENT                                                     │
│  Explore me through a terminal                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ ● ● ●                              visitor@harshitha: ~          │   │
│  │ visitor@harshitha:~$ about                                       │   │
│  │ > Harshitha Seetharaman: Data & Software Engineer                 │   │
│  │ visitor@harshitha:~$ _                                           │   │
│  └────────────────────────────────────────────────────────────────┘   │
│  Try `help`, `projects`, `skills`, `theme`. ↑/↓ history · Tab complete  │
├──────────────────────────────────────────────────────────────────────┤
│  SELECTED WORK: Things I've shipped                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                            │
│  │01 Hormuz │   │02 Access │   │03 Brain  │   ← 3 col grid, hover lift  │
│  │Pulse     │   │Map+      │   │Cost      │                            │
│  │tags...   │   │tags...   │   │tags...   │                            │
│  └──────────┘   └──────────┘   └──────────┘                            │
├──────────────────────────────────────────────────────────────────────┤
│  TOOLKIT: What I build with      [ languages | dbs | pipelines | ML ]   │
├──────────────────────────────────────────────────────────────────────┤
│  SAY HELLO: Let's build something clear.    [ Email me ] [ LinkedIn ]   │
├──────────────────────────────────────────────────────────────────────┤
│  © 2026 Harshitha · Home  About  AI Lens  Portfolio                     │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.2 Home: mobile (< 820px)

```
┌───────────────────────────┐
│ [HS] Harshitha      [◐]    │  ← nav links collapse
├───────────────────────────┤
│      ╭───────────╮         │
│      │ portrait  │         │  ← portrait first (stacked)
│      ╰───────────╯         │
│  • open to Spring 2027       │
│  I turn data into          │
│  *decisions*.              │
│  > Data Engineer_          │
│  [ View my work ]          │
│  [ More about me ]         │
├───────────────────────────┤
│  Terminal (full width)     │
│  ┌───────────────────────┐ │
│  │ ● ● ●                 │ │
│  │ $ about               │ │
│  └───────────────────────┘ │
├───────────────────────────┤
│  Project 01  (1 col)       │
│  Project 02                │
│  Project 03                │
├───────────────────────────┤
│  Toolkit (1 col)           │
│  Contact                   │
│  Footer                    │
└───────────────────────────┘
```

### 4.3 About: desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│  nav …                                                                 │
├──────────────────────────────────────────────────────────────────────┤
│  About                                                                 │
│  The short version, and the human one.                                 │
│  (lede paragraph)                                                      │
├───────────────────────────────┬──────────────────────────────────────┤
│  EDUCATION (timeline card)     │  EXPERIENCE (timeline card)           │
│   ● M.S. CS: Northeastern      │   ● Event Manager: Cryptrix'24         │
│   ● B.E. CSE: St. Joseph's     │   ● Web Dev Intern: ANJUSOFT           │
├───────────────────────────────┼──────────────────────────────────────┤
│  RECOGNITION                   │  AFTER HOURS (interest pills)          │
│   ● IoT paper @ ICSTSDG 2024   │   [thrillers][K dramas][horror]...     │
│   ● SIH Finalist '22 & '24     │                                        │
├──────────────────────────────────────────────────────────────────────┤
│  CALLOUT: Want the full portfolio?  [ Open portfolio ] [ Terminal ]    │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.4 AI Lens: desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│  nav …                                                                 │
├──────────────────────────────────────────────────────────────────────┤
│  AI GENERATED PAGE                                                     │
│  Seen through an AI lens.                                               │
│  (explains model + that README documents prompts)                      │
├──────────────────────────────────────────────────────────────────────┤
│  ╭──── panel (subtle sheen) ───────────────────────────────────────╮  │
│  │  CHOOSE A LENS                                                   │  │
│  │  [One line summary] [What she solves] [Recruiter] [Data] [Fun]   │  │
│  │  PROMPT  One line summary                                        │  │
│  │  │ Harshitha is a data and software engineer who turns messy     │  │
│  │  │ information into decisions people can act on._                 │  │
│  ╰──────────────────────────────────────────────────────────────────╯  │
├──────────────────────────────────────────────────────────────────────┤
│  TRANSPARENCY: how this was made (prose)                               │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.5 Interaction & motion notes

- **Nav**: sticky, translucent blur; active page highlighted (set in JS).
- **Rotator**: typewriter types/deletes each role; caret blinks; static under
  reduced motion.
- **Portrait**: a duotone illustrated avatar that fades to the full colour
  photo on hover, framed by slow rotating rings.
- **Running buddy**: an endless runner character (my avatar on a hoverboard)
  chases the cursor, flips to face its direction, and kicks up dust; it never
  blocks clicks, offers an on/off toggle, and is disabled under reduced motion.
- **Terminal**: auto runs `about` + `help` on load; input focuses on click.
- **Reveal**: sections fade/slide up via IntersectionObserver.
- **Pointer glow**: a soft gold radial light follows the cursor (disabled under
  reduced motion).
- **Theme**: toggle + `theme` command; persisted in `localStorage`.

---

## 5. Information Architecture

```
index.html  ──► #terminal ─► #projects ─► #skills ─► #contact
   │
   ├─► about.html  (education, experience, recognition, interests)
   └─► ai.html     (AI generated answers + transparency)
                       ▲
data.js  ──────────────┘  (shared content consumed by the terminal)
```

## 6. Success Criteria

The design succeeds if a first time visitor can, within ~15 seconds, state what I
do, see at least one project, and find a way to contact me, while a curious
visitor is rewarded with the terminal, the theme switch, and the AI page. All
rubric items (ES6 modules, valid HTML, accessibility, organized folders, license,
README, deployment) are satisfied by the structure above.
