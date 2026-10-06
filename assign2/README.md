# 🏡 BayStay SF — San Francisco Airbnb Explorer

A responsive, interactive web application exploring San Francisco Airbnb vacation rentals, dynamically loaded using modern JavaScript AJAX (`fetch` + `async/await`) and DOM manipulation.

> _"Exploring cities, one stay at a time."_

## Author

**Harshitha Seetharaman**  
MS in Computer Science, Northeastern University (Khoury College)  
📧 seetharaman.ha@northeastern.edu · 🔗 [LinkedIn](https://www.linkedin.com/in/harshitha-seetharaman-97098a213/) · 🌐 [Portfolio](https://harshitha-seetharaman-portfolio.vercel.app/)

## Class Link

[CS5610 Web Development: Javascript and DOM Self Assessment](https://northeastern.instructure.com/courses/261032/assignments/3396148)

## Project Objective

Starting from the classroom Airbnb demo reference, implement an interactive page that asynchronously fetches and loads the **first 50 listings** from the JSON dataset using JavaScript AJAX (`fetch` and `async/await`). 

The page displays all required property attributes: listing name, formatted description, amenities list, host details (name and photo), price per night, and thumbnail photography, along with original creative additions (interactive map, stay calculator, live filters, wishlist, and dark mode) built with clean, semantic HTML5, CSS3, and modern JavaScript.

## Repository

- 💻 **GitHub Repository:** [https://github.com/Harshiacchu/web_dev/tree/main/assign2](https://github.com/Harshiacchu/web_dev/tree/main/assign2)

## Assignment Checklist

| Requirement | Implementation | Status |
| :--- | :--- | :---: |
| **AJAX Data Fetching** | `fetch('./airbnb_sf_listings_500.json')` with `async/await` loading data on startup in `js/app.js` | ✅ Complete |
| **First 50 Listings** | Slices and renders the first 50 listings by default (with scope toggle for all 523) | ✅ Complete |
| **Listing Name** | Cleanly renders property title, property type, and neighborhood | ✅ Complete |
| **Description** | Formatted summary snippet on card, full paragraph text in details modal | ✅ Complete |
| **Amenities** | Parsed array rendered as chip badges on cards and full categorized list in modal | ✅ Complete |
| **Host (Name & Photo)** | Host profile picture, name, response rate, and Superhost verification badge | ✅ Complete |
| **Price** | Nightly rate parsed for sorting, calculations, and custom map markers | ✅ Complete |
| **Thumbnail / Picture** | Cover image with graceful fallback handling for expired CDNs | ✅ Complete |
| **Creative Additions** | Interactive Leaflet Map, Stay Calculator, Filter Drawer, Wishlist, Dark Mode | ✅ Complete |
| **README Documentation** | Complete project documentation and local run instructions | ✅ Complete |

## Features & Creative Additions

- 🗺️ **Interactive OpenStreetMap & Split Map View** (`js/app.js`): Embedded Leaflet.js map with custom price pin markers (e.g. `$187`) positioned at San Francisco coordinates. Hovering on any card highlights its pin on the map; clicking a pin opens a popup with property details and scrolls to the card.
- 🧮 **Stay Cost & Fee Estimator**: Clicking any listing card opens a modal with a real-time price calculator computing subtotal, cleaning fee, and service fees based on selected nights and guests.
- ⚙️ **Organized Filters Drawer**: A dedicated modal drawer housing room type selection, sorting options (price, rating, reviews, title), data scope (50 vs all), Superhost toggle, and Wishlist toggle with an active badge counter.
- 🔍 **Debounced Live Search & Neighborhood Pills**: Instant search across titles, hosts, neighborhoods, descriptions, and amenities, paired with single-row scrollable neighborhood filter pills.
- ❤️ **Wishlist & Favorites System**: Heart buttons on cards and modal with persistent `localStorage` saving and dedicated header counter badge.
- 📊 **Summary Insights Bar**: Real-time calculated metrics for Average Nightly Rate, Average Rating, Top Neighborhood, and Superhost percentage.
- 🌓 **Dark & Light Mode**: Theme toggle with smooth transitions and saved preference in `localStorage`.
- 🛡️ **Graceful Image Fallbacks**: Fallback handler that swaps expired Airbnb CDN image URLs with high-resolution interior/architectural photography so no image is ever broken.

## Tech Stack

- **HTML5** (semantic structure, ARIA accessibility, modal containers)
- **CSS3** (custom properties / variables, CSS Grid + Flexbox, glassmorphism, responsive breakpoints)
- **JavaScript (ES6+)** (`fetch` API, `async`/`await`, DOM manipulation, `localStorage` persistence)
- **Leaflet.js & OpenStreetMap** (lightweight interactive mapping library)
- **Google Fonts** (Outfit, Plus Jakarta Sans)

## Project Structure

```
assign2/
├── index.html                     # Main application webpage
├── css/
│   └── style.css                  # Design system, themes & responsive styles
├── js/
│   └── app.js                     # AJAX fetching, filtering, modal & map logic
├── data/
│   └── airbnb_sf_listings_500.json# San Francisco listings dataset
├── airbnb_sf_listings_500.json    # Root copy for relative fetch compatibility
└── README.md                      # Documentation and deployment guide
```

## Instructions to Build & Run

This is a static web application; no build or compilation step is required.

Because AJAX `fetch()` requires an HTTP server to avoid browser CORS restrictions on `file://` protocols, serve the folder locally:

**Using Node / NPX:**
```bash
# From the assign2/ folder
npx serve .
# Open http://localhost:3000
```

**Using Python 3:**
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## Use of Generative AI (GenAI)

This project was designed, structured, and implemented by me using vanilla HTML5, CSS3, and modern JavaScript. Generative AI was used as a pair programming assistant to brainstorm UI layout ideas, assist with dataset sanitation edge cases, and review documentation formatting.

| Tool | Model / Version | How it was used |
| :--- | :--- | :--- |
| **Claude / Gemini** | Gemini 3.7 / Claude | Assisting with JSON amenities array parsing edge cases, designing the stay fee formula in the calculator, and reviewing responsive map split layout styling. |

**Key areas of collaboration:**
- **Amenities Parsing & Data Cleaning:** Formatted edge cases where JSON amenities were string-encoded vs native arrays.
- **Stay Cost Formula:** Formatted dynamic night and fee breakdown formulas for the interactive modal calculator.
- **Layout Organization:** Reorganized filter controls into a dedicated modal drawer to keep the search bar compact and space-efficient.

## License

Released under the MIT License. © 2026 Harshitha Seetharaman.
