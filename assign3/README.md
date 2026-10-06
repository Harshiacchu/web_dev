# HTML, CSS and JavaScript Self Assessment

**Author:** Harshitha Seetharaman  
**Course:** CS5610 Web Development (Northeastern University)  
**Repository:** [Harshiacchu/web_dev](https://github.com/Harshiacchu/web_dev)  
**Topic:** Vanilla HTML5, CSS3 Architecture, Box Model Dynamics, Typographic Scales, and CSS Positioning

## About This Project

For this self assessment, I built a complete web page using pure vanilla HTML, modern CSS, and lightweight JavaScript without relying on any external CSS frameworks or libraries. The goal was to practice and self assess core web fundamentals: creating semantic document outlines, understanding search engine optimization, experimenting with layout flow without stylesheets, dissecting the CSS box model, comparing font sizing units, and mastering CSS positioning contexts.

I styled the interface using an editorial black and white chessboard palette, keeping navigation slim and ensuring the page adapts cleanly across different window sizes and heights.

## 1. Webpage Architecture and Top 10 HTML Tags

### Page Layout
The document is structured using standard HTML5 semantic elements:
1. `<nav>` for the compact top navigation bar with quick jump links and theme toggle.
2. `<main>` containing exactly one primary `<h1>` heading (`HTML, CSS & JavaScript Self-Assessment`) and four distinct `<h2>` section headers.
3. `<section>` containers grouping each conceptual topic.
4. `<footer>` at the base of the page, anchored using flexbox layout.

### My 10 Most Useful HTML Tags in Daily Development

1. **`<div>` (Block Container):** The universal layout element. I use divs as flexible containers, flex/grid wrappers, and JavaScript DOM hooks when no specific semantic element applies, keeping the structure clean without confusing screen readers.
2. **`<span>` (Inline Container):** The inline equivalent of a div. It lets me style specific words, add status pills, attach icons, or dynamically update numbers inside a paragraph without breaking the text onto a new line.
3. **`<a>` (Anchor / Link):** The backbone of the entire web. It enables page-to-page routing, external referencing, jump anchors within the page, and email or phone triggers.
4. **`<button>` (Interactive Button):** Essential for accessible user interactions. Unlike styling a clickable div, native buttons include built-in keyboard support (`Enter` and `Space`), focus rings, tab ordering, and disabled state handling automatically.
5. **`<input>` (Form Input):** The primary tool for collecting user input. With modern types like text, email, number, checkbox, and range, browsers provide built-in validation and mobile-friendly keyboards automatically.
6. **`<form>` (Form Container):** Wraps related input fields into a single submission unit. It enables HTML5 form validation, handles standard Enter-key submission events, and simplifies data extraction via `FormData` in JavaScript.
7. **`<nav>`, `<main>`, `<section>`, `<footer>` (Semantic Landmarks):** Critical for web accessibility. These tags allow assistive technologies and screen readers to map out the page structure so users can easily skip directly to the content they want.
8. **`<img>` and `<picture>` (Media Elements):** Embeds visual content with support for `alt` descriptions for screen readers and search crawlers, `loading="lazy"` for fast initial page loads, and `srcset` for responsive images.
9. **`<ul>`, `<ol>` and `<li>` (Structured Lists):** Provides structured list semantics. Screen readers announce list lengths upfront (such as *"List of 6 items"*), giving users clear context when browsing menus, features, or instructions.
10. **`<script>` and `<link>` (Resource Connectors):** The bridge elements connecting our HTML markup to external CSS stylesheets, Google Fonts, metadata declarations, and JavaScript application logic.

## 2. SEO Research and Important Header Tags

Search Engine Optimization (SEO) is the process of structuring and annotating a website so search engines like Googlebot and Bingbot can accurately discover, index, rank, and display rich previews of your pages. When a web crawler visits a website, it inspects the `<head>` metadata before rendering the DOM. Proper header tags create a clear contract between your code and search indexing algorithms.

### Essential Header Tags for SEO

1. **`<title>Page Title | Brand</title>`**  
   *Role:* Displays as the clickable blue title in Google search results and browser tab names. This is the single most heavily weighted on-page ranking signal.

2. **`<meta name="description" content="...">`**  
   *Role:* Provides the summary text snippet shown underneath the title in search engine results pages. A compelling description directly increases organic click-through rates.

3. **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**  
   *Role:* Tells mobile browsers how to scale the viewport. Google uses Mobile-First indexing, meaning pages missing this tag fail mobile-friendly tests and get penalized in rankings.

4. **`<link rel="canonical" href="...">`**  
   *Role:* Declares the definitive, authoritative URL for a page. This consolidates search ranking signals and prevents duplicate content penalties when the same page is accessible via multiple URLs or query parameters.

5. **`<meta name="robots" content="index, follow">`**  
   *Role:* Gives explicit instructions to web robots on whether to index the page and whether to follow outbound links.

6. **`<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">` (Open Graph)**  
   *Role:* Social sharing tags that generate rich visual link preview cards when URLs are shared on platforms like LinkedIn, Slack, Twitter, and iMessage.

7. **`<script type="application/ld+json">` (Structured Schema Data)**  
   *Role:* Provides machine-readable structured JSON data following Schema.org standards. This enables Google Rich Snippets such as star ratings, breadcrumb trails, FAQs, and author information directly in search results.

8. **`<meta charset="UTF-8">`**  
   *Role:* Declares standard character encoding, ensuring emojis, accents, and multilingual text render correctly without broken character symbols.

## 3. Pure HTML 3x3 Grid Without CSS and Without Tables

### The Challenge
Build a functional 3x3 grid layout using only `<div>` and `<span>` tags, strictly with zero CSS styling (no classes, no inline styles, no external stylesheets) and without using `<table>` elements.

### How It Works
Browsers have built-in User Agent stylesheets that define default display behaviors for HTML elements:
1. `<div>` is an intrinsic block-level element (`display: block`). Each div starts on a fresh line and takes up full width, acting naturally as a vertical row.
2. `<span>` is an intrinsic inline element (`display: inline`). Spans sit horizontally side-by-side on the same line, acting naturally as horizontal columns.

By placing three `<span>` elements inside each of three `<div>` elements, we get three rows of three columns, forming a natural 3x3 coordinate grid using nothing but default browser document flow.

### Source Code
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

## 4. CSS Box Model Gallery

The CSS Box Model defines how every rectangular element on a page is sized and spaced:
1. **Content Box:** The innermost area where text, images, or child elements render.
2. **Padding Box:** The internal breathing room between the content and the border.
3. **Border Box:** The perimeter boundary stroke surrounding the padding.
4. **Margin Box:** The external clearance zone separating the element from neighboring elements.

### Gallery Structure
In section 4.1 of the page, I built a 3x3 gallery demonstrating row-by-row property variations with three distinct values (0px, 10px, and 24px) using an editorial high-contrast black and white visual style:
1. **Row 1 (Padding Variations):** Shows `padding: 0px` (content touching border) vs `padding: 10px` (moderate clearance) vs `padding: 24px` (generous card padding).
2. **Row 2 (Border Variations):** Shows `border: 0px` (frameless) vs `border: 4px solid` (medium frame) vs `border: 8px dashed` (heavy dashed border).
3. **Row 3 (Margin Variations):** Shows `margin: 0px` (flush to container) vs `margin: 12px` (standard gap) vs `margin: 24px` (wide spatial isolation).

## 5. Typographic Scales: 6 Font Sizes via Inline Styles

In section 4.2, I created an itemized list using the exact same sentence across 6 items, with font sizes applied via inline `style="font-size: ..."` declarations to contrast absolute and relative units:

Test Phrase:  
*"Crafting accessible, beautiful, and performant web interfaces requires understanding foundational building blocks."*

1. **`style="font-size: 13px;"` (Pixels - Absolute Unit)**  
   *When to use with Example:* Pixels represent fixed screen dots (1/96 inch). Best for micro-UI elements where dimensions must never change, such as a 1px border line, a 16px navigation icon, or canvas drawing coordinates.

2. **`style="font-size: 1.125rem;"` (Root EM - Relative to Root)**  
   *When to use with Example:* Scales relative to the `<html>` root font size (default 16px). This is the best choice for body copy and general paragraphs. For accessibility, if a visually impaired user increases their browser default font size to 24px, all `rem` values scale up proportionally without breaking the layout.

3. **`style="font-size: 1.35em;"` (Element EM - Relative to Parent)**  
   *When to use with Example:* Scales relative to the immediate parent element's font size. Ideal for self-contained UI components like buttons and tooltips. For instance, a button with `font-size: 1.35em; padding: 0.5em 1em;` automatically scales its padding and text together when placed in a larger container.

4. **`style="font-size: 1.6vw;"` (Viewport Width - Relative to Screen)**  
   *When to use with Example:* Represents 1% of the browser viewport width. Great for fluid hero headlines (like `clamp(1.5rem, 3vw, 4rem)`) so titles expand and contract smoothly with window resizing without needing multiple media queries.

5. **`style="font-size: 135%;"` (Percentage - Relative to Parent)**  
   *When to use with Example:* Scales as a direct percentage of inherited parent text size. Useful for subheadings or introductory lead paragraphs in articles where you want to emphasize text relative to the surrounding copy.

6. **`style="font-size: 18pt;"` (Points - Absolute Print Unit)**  
   *When to use with Example:* Points are physical typography units (1pt = 1/72 inch). While avoided on responsive screens, `pt` is the industry standard for print stylesheets (`@media print`) and PDF invoice generation to ensure exact physical print sizing across different printers.

## 6. Creative CSS Positioning and Bottom Footer

In section 4.3, I created an interactive positioning studio showcasing the 4 main CSS positioning models:

1. **`position: static;` (Default Document Flow):** Normal sequential block and inline layout. Offsets (`top`, `left`) and `z-index` have no effect. Used for standard body text, standard cards, and typical content sections.
2. **`position: relative;` (In-Flow Offset and Coordinate Anchor):** Stays in document flow while allowing micro-offsets (`top`, `left`) without disturbing siblings. Crucially, it serves as the coordinate origin `(0,0)` for nested `absolute` children.
3. **`position: absolute;` (Detached Coordinate Placement):** Removed completely from document flow and placed relative to its closest positioned ancestor. Used for floating notification badges, corner ribbons, tooltips, and modal dropdowns.
4. **`position: fixed;` (Viewport Pinning):** Pinned directly to screen viewport coordinates and stays in place during scrolling. Used for the slim top navigation header and the floating Back to Top button.

### How the Footer Stays at the Bottom
To ensure the footer stays anchored at the bottom on short pages while resting naturally at the end of long scrolling pages:
1. The `<body>` uses flex column layout: `min-height: 100vh; display: flex; flex-direction: column;`.
2. The `<main>` container has `flex: 1 0 auto;`, which automatically expands to fill any remaining vertical space and pushes the footer to the bottom.
3. The `<footer>` uses `margin-top: auto;` to sit securely at the bottom without blocking or floating over content during scrolling.

## Running the Project Locally

No build steps or dependencies required.

### Option 1: Direct File Open
Open `assign3/index.html` directly in any web browser.

### Option 2: Local HTTP Server
Run any local static server from the project directory:
```bash
python3 -m http.server 3008 --directory /Users/harshithaseetharaman/Documents/NEU/web_dev/web_dev/assign3
```
Then visit `http://localhost:3008/` in your browser.

## Peer Review Checklist

1. Semantic HTML layout with navbar, main content with 1 H1 and 4 H2 sections, and footer.
2. Top 10 useful HTML tags with clear practical explanations and use cases.
3. In-depth SEO research covering header tags, crawler behavior, and JSON-LD schema markup.
4. Pure HTML 3x3 grid created with only divs and spans without any CSS or tables.
5. CSS Box Model Gallery varying padding, border, and margin across 3 rows and 3 columns.
6. 6-item font size list with inline styles, comparing absolute and relative units with examples.
7. Creative 4-mode CSS positioning demonstration studio with non-intrusive bottom-anchored footer.
