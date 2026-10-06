# CS5610: HTML, CSS & JavaScript Self-Assessment

**Course:** CS5610 Web Development (Northeastern University)  
**Author:** Harshitha Seetharaman  
**Repository:** [Harshiacchu/web_dev](https://github.com/Harshiacchu/web_dev)  
**Submission Focus:** Vanilla HTML5, CSS3 Architecture, Box Model Dynamics, Typographic Scales, and CSS Positioning Systems

---

## 📖 Executive Overview

This repository houses the complete implementation for the **HTML + CSS + JavaScript Self-Assessment**. Built entirely with vanilla web technologies, this project explores foundational web development principles through working demonstrations, code experiments, and structured technical explanations.

The assessment is organized into clear semantic sections fulfilling every rubric item, designed for peer review, live presentation, and production-grade accessibility.

---

## 🎯 Detailed Assessment Responses & Architecture

### 1. HTML Architecture & The 10 Most Useful Tags

#### Page Architecture:
- **Semantic Structure:** Implemented with `<nav>`, `<main>`, `<section>`, and `<footer>` landmark tags.
- **Heading Hierarchy:** Exactly **one primary `<h1>`** (`HTML, CSS & JavaScript Self-Assessment`) and **four distinct `<h2>` subheaders** mapping to the core conceptual domains.

#### Top 10 Most Indispensable HTML Tags (with Developer Rationale):

1. **`<div>` (Block Container):** The universal layout workhorse. Used as an un-opinionated styling boundary, Flexbox/Grid wrapper, or JavaScript DOM hook without imposing inaccurate semantic meaning on assistive technologies.
2. **`<span>` (Inline Phrasing Container):** The inline counterpart to `<div>`. Enables targeted micro-styling, badge rendering, icon attachment, or reactive text updates within a flowing paragraph without triggering unwanted line breaks.
3. **`<a>` (Anchor / Hyperlink):** The defining element of the World Wide Web. Powers navigation between local routes, external domains, anchor jumps (`#section-id`), email clients (`mailto:`), and downloadable files.
4. **`<button>` (Interactive Control):** Crucial for accessible UI interaction. Unlike a clickable `<div>`, a native `<button>` provides built-in keyboard accessibility (`Enter` and `Space` key handlers), focus management, tab order, and disabled states out of the box.
5. **`<input>` (Data Capture Gateway):** Enables versatile user input collection. Leveraging modern `type` attributes (`text`, `email`, `number`, `range`, `checkbox`) unlocks native browser validation and mobile-optimized soft keyboards.
6. **`<form>` (Input Encapsulation):** Binds interactive input controls into a unified data submission context, enabling native HTML5 validation constraints, standard form serialization (`FormData`), and keyboard-driven `Enter` submissions.
7. **`<nav>`, `<main>`, `<section>`, `<footer>` (Semantic Landmarks):** Invaluable for web accessibility (WCAG). These landmarks allow screen reader users to skip redundant navigation and jump directly to relevant content regions.
8. **`<img>` / `<picture>` (Responsive Media):** Renders visual graphics while supporting vital performance and accessibility attributes such as `alt` text for screen readers/SEO, `loading="lazy"` for bandwidth optimization, and `srcset` for high-DPI displays.
9. **`<ul>` / `<ol>` + `<li>` (Structured Lists):** Provides structured list semantics. Assistive tools announce list lengths (e.g., "List of 6 items"), creating predictable mental models for menus, step-by-step workflows, and itemized features.
10. **`<script>` & `<link>` (External Resource Integrators):** The essential bridges that connect structural HTML to external stylesheets, typography fonts, and asynchronous JavaScript logic modules.

---

### 2. Search Engine Optimization (SEO) & Essential Header Tags

#### SEO Foundations & Web Crawler Mechanics:
Search Engine Optimization (SEO) ensures that automated crawlers (such as Googlebot, Bingbot, and social media scrapers) can discover, parse, categorize, and rank a website. The `<head>` element serves as the primary metadata contract between developer code and search algorithms.

#### Key Header / `<head>` Tags for SEO:

| Tag / Syntax | Primary Function | SEO & User Impact |
| :--- | :--- | :--- |
| `<title>Page Title \| Brand</title>` | SERP Blue Headline | **Critical (Rank Factor #1):** Primary ranking signal and clickable SERP title. |
| `<meta name="description" content="...">` | SERP Snippet Text | **Critical (CTR #1):** Dictates click-through rate from search result pages. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Responsive Viewport | **Critical (Mobile Indexing):** Required for Google's Mobile-First indexing algorithms. |
| `<link rel="canonical" href="...">` | Canonical Authority | **High:** Consolidates ranking signals and prevents duplicate content penalties. |
| `<meta name="robots" content="index, follow">` | Crawler Directives | **High:** Explicitly commands bots to index pages and follow page links. |
| `<meta property="og:title">` & `<og:image">` | Open Graph Social Cards | **High:** Powers rich visual cards on LinkedIn, Slack, Twitter, and messaging apps. |
| `<script type="application/ld+json">` | Schema.org Structured Data | **High:** Enables Google Rich Results (star ratings, event dates, author cards, FAQs). |
| `<meta charset="UTF-8">` | Character Encoding | **Fundamental:** Prevents garbled text rendering across international character sets. |

---

### 3. Pure HTML 3×3 Grid (Strictly Zero CSS & Zero `<table>`)

#### The Architectural Challenge:
Create a 3×3 grid matrix using strictly `<div>` and `<span>` elements—with **no CSS styling** (no classes, no inline styles, no stylesheet rules) and **no `<table>` tags**.

#### Mechanism & Code:
In native browser User-Agent stylesheets:
- `<div>` elements are intrinsic **block-level** elements (`display: block`), which naturally cause vertical line breaks and stack row-by-row.
- `<span>` elements are intrinsic **inline** elements (`display: inline`), which naturally flow horizontally side-by-side on the same line.

By nesting three `<span>` elements (columns) inside each of three `<div>` elements (rows), a clean 3×3 grid is produced purely via native HTML formatting contexts:

```html
<!-- Row 1 -->
<div>
  <span>[ Row 1, Col 1 ]</span>      <span>[ Row 1, Col 2 ]</span>      <span>[ Row 1, Col 3 ]</span>
</div>
<br>
<!-- Row 2 -->
<div>
  <span>[ Row 2, Col 1 ]</span>      <span>[ Row 2, Col 2 ]</span>      <span>[ Row 2, Col 3 ]</span>
</div>
<br>
<!-- Row 3 -->
<div>
  <span>[ Row 3, Col 1 ]</span>      <span>[ Row 3, Col 2 ]</span>      <span>[ Row 3, Col 3 ]</span>
</div>
```

---

### 4. CSS Box Model Gallery (3 Rows × 3 Columns)

The CSS Box Model is the structural geometry governing element sizing in CSS:
1. **Content Box:** The innermost rectangle where text, images, and child components render.
2. **Padding Box:** The transparent internal clearance space between content and the border.
3. **Border Box:** The perimeter boundary stroke surrounding the padding.
4. **Margin Box:** The external clearance zone separating the element from neighboring siblings.

#### Gallery Matrix Layout:
- **Row 1 (Padding Variations):** `padding: 0px` vs `padding: 10px` vs `padding: 24px` (demonstrating internal breathing room).
- **Row 2 (Border Variations):** `border: 0px` vs `border: 4px solid #38bdf8` vs `border: 8px dashed #a855f7` (demonstrating boundary strokes).
- **Row 3 (Margin Variations):** `margin: 0px` vs `margin: 12px` vs `margin: 24px` (demonstrating external component separation).

---

### 5. Typographic Scales: 6 Font Sizes via Inline Styling

Rendered with the identical test phrase:  
`"Crafting accessible, beautiful, and performant web interfaces requires understanding foundational building blocks."`

#### Itemized Breakdown & Unit Rationale:

1. **`style="font-size: 13px;"` — Pixels (`px` - Absolute):**  
   - *When to use:* Fixed micro-UI elements such as 1px border dividers, pixel-perfect 16px icon badges, or canvas render targets where dimensions must remain locked regardless of root text changes.
2. **`style="font-size: 1.125rem;"` — Root EM (`rem` - Relative):**  
   - *When to use:* Body copy, article paragraphs, and responsive typography scales. Scales relative to the browser root `<html>` font size (default 16px), preserving user accessibility preferences when users adjust browser base font sizes.
3. **`style="font-size: 1.35em;"` — Element EM (`em` - Relative):**  
   - *When to use:* Self-contained UI components (buttons, input fields, badges) where padding, icon sizes, and text should scale harmoniously whenever the parent component size is adjusted.
4. **`style="font-size: 1.6vw;"` — Viewport Width (`vw` - Relative):**  
   - *When to use:* Fluid hero banners and editorial headlines (often wrapped with `clamp(1.5rem, 3vw, 4rem)`), smoothly scaling typography across viewport widths without dozens of media queries.
5. **`style="font-size: 135%;"` — Percentage (`%` - Relative):**  
   - *When to use:* Relative typography adjustments within a parent component hierarchy or on root elements (`html { font-size: 62.5%; }`) to simplify baseline rem calculations.
6. **`style="font-size: 18pt;"` — Points (`pt` - Absolute):**  
   - *When to use:* Physical print stylesheets (`@media print`) and PDF invoice generators (1pt = 1/72 inch), guaranteeing exact physical paper dimensions across all printer hardware.

---

### 6. Creative CSS Positioning Studio & Sticky Bottom Footer

#### 4 Fundamental Positioning Modes:
1. **`position: static;` (Default Document Flow):** Normal sequential block/inline layout. Coordinates (`top`, `left`, `z-index`) are ignored.
2. **`position: relative;` (Offset & Coordinate Anchor):** Stays within normal flow while allowing micro-offsets (`top`/`left`), serving as the coordinate origin `(0,0)` for nested `absolute` children.
3. **`position: absolute;` (Detached Coordinate Placement):** Removed from normal flow and positioned relative to the nearest positioned ancestor. Used for notification badges, dropdown menus, and modal dialogs.
4. **`position: fixed;` (Viewport Pinning):** Anchored directly to viewport window coordinates. Used for the persistent top navigation bar and floating back-to-top action button.

#### Bottom-Anchored Footer Architecture:
To guarantee that the footer stays securely at the bottom of the screen on both short viewports and long scrolling pages:
```css
/* Body flex column container */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main expands to absorb empty vertical space */
.main-content {
  flex: 1 0 auto;
}

/* Footer anchors cleanly to bottom */
.site-footer {
  position: sticky;
  bottom: 0;
  margin-top: auto;
}
```

---

## 🚀 Running the Project Locally

No build tools, npm packages, or bundlers required.

```bash
# Option 1: Open directly in your default browser
open /Users/harshithaseetharaman/Documents/NEU/web_dev/web_dev/assign3/index.html

# Option 2: Run with any local HTTP server
npx serve /Users/harshithaseetharaman/Documents/NEU/web_dev/web_dev/assign3
# or
python3 -m http.server 8080 --directory /Users/harshithaseetharaman/Documents/NEU/web_dev/web_dev/assign3
```

---

## 📋 Peer Review & Verification Checklist

- [x] Semantic layout featuring `<nav>`, `<main>` with 1 `<h1>` & 4 `<h2>` sections, and `<footer>`.
- [x] Top 10 useful HTML tags with clear practical explanations.
- [x] Comprehensive SEO research and `<head>` tag impact breakdown with JSON-LD schema.
- [x] Pure HTML 3×3 grid built without `<table>` and without any CSS.
- [x] 3×3 CSS Box Model Gallery varying border, margin, and padding across columns.
- [x] Itemized 6-font-size list using inline styles with absolute & relative unit analysis.
- [x] Creative 4-mode CSS positioning demonstration studio with guaranteed bottom sticky footer.
