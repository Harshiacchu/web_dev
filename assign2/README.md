# 🏡 BayStay SF — San Francisco Airbnb Explorer

> **CS5610 Web Development — Assignment 2: JavaScript & DOM Self Assessment**  
> **Author:** Harshitha Seetharaman  
> **Repository:** [https://github.com/Harshiacchu/web_dev](https://github.com/Harshiacchu/web_dev)  
> **Live Deployment:** [https://harshiacchu.github.io/web_dev/assign2/](https://harshiacchu.github.io/web_dev/assign2/)

---

## 🌟 Overview

**BayStay SF** is an interactive, responsive web application that dynamically loads and showcases San Francisco Airbnb listings using modern asynchronous JavaScript (`fetch` + `async/await` AJAX) and DOM manipulation. 

Starting from the classroom demo dataset, the application displays the **first 50 listings** with all required attributes (listing name, formatted description, amenities list, host name and photo, price per night, and thumbnail picture), complemented by interactive features including a **Split Map View**, **Stay Price & Fee Estimator**, **Live Search**, **Neighborhood Filter Pills**, **Favorites/Wishlist persistence**, and **Dark/Light theme switching**.

---

## 🚀 Live Demo & Deployment

- 🌐 **GitHub Pages:** [https://harshiacchu.github.io/web_dev/assign2/](https://harshiacchu.github.io/web_dev/assign2/)
- 💻 **Source Code:** [https://github.com/Harshiacchu/web_dev/tree/main/assign2](https://github.com/Harshiacchu/web_dev/tree/main/assign2)

---

## 📋 Assignment Requirements Checklist

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **AJAX Data Fetching** | Uses modern `fetch('./airbnb_sf_listings_500.json')` with `async/await` syntax to asynchronously load data on page load. | ✅ Complete |
| **First 50 Listings** | Slices and renders the first 50 listings by default (with user option to explore all 523 records). | ✅ Complete |
| **Listing Name** | Cleanly renders listing title, property type, and neighborhood. | ✅ Complete |
| **Description** | Sanitized, formatted description text with paragraph rendering and full expansion in details modal. | ✅ Complete |
| **Amenities** | Parsed from JSON string/array format, displayed as pill chips with expandable view in modal. | ✅ Complete |
| **Host Info (Name & Photo)** | Renders host profile image, name, response rate, and Superhost verification badge with fallback avatar handling. | ✅ Complete |
| **Price** | Highlighted nightly rate with numeric parsing for sorting, filtering, and fee calculations. | ✅ Complete |
| **Thumbnail / Picture** | Responsive cover photography with fallback to high-resolution architectural images for expired CDNs. | ✅ Complete |
| **Creative Additions** | Interactive Map with price markers, Stay Price Calculator, Live Search & Debounced Filters, Wishlist/Favorites system, Dark/Light mode switcher. | ✅ Complete |

---

## ✨ Creative Features & Additions

### 1. 🗺️ Interactive OpenStreetMap & Split Map View
- Embedded **Leaflet.js** map rendering custom interactive price badge markers (e.g. `$187`) at exact San Francisco coordinates.
- **Bi-directional synchronization**: Hovering on a listing card highlights its marker on the map; clicking a marker pin opens an interactive popup with listing details and zooms the map.
- **View Mode Switcher**: Easily toggle between **Grid View**, **List View**, and **Map Split View**.

### 2. 🧮 Interactive Stay Cost & Fee Estimator (in Modal)
- Clicking any card opens a rich **Details Modal** with an interactive stay calculator.
- Choose number of nights, guest count, and check-in date to compute real-time breakdowns:
  $$\text{Total} = (\text{Base Price} \times \text{Nights}) + \text{Cleaning Fee} + \text{Service Fee (12\%)}$$
- Includes a one-click "Reserve This Stay (Demo)" action with toast notification feedback.

### 3. 🔍 Instant Live Search & Multi-Criteria Filtering
- **Debounced Search Bar**: Filter by listing title, host name, neighborhood, or specific amenities (e.g., `"Duboce"`, `"Holly"`, `"Wifi"`).
- **Neighborhood Quick-Pills**: Horizontally scrollable pill buttons computed dynamically from top San Francisco neighborhoods.
- **Filter Dropdowns**: Room type (Entire Home, Private Room, Shared Room) and multi-option sorting (Price: Low/High, Ratings, Review count, Alphabetical).
- **Toggles**: One-click filters for "Superhost Only" and "Saved Only".

### 4. ❤️ Wishlist & Favorites System
- Heart toggle button on every card and inside the modal.
- Persisted locally across browser sessions using `localStorage`.
- Dedicated **"Saved"** counter badge in header for one-click access to bookmarked homes.

### 5. 📊 Real-Time Analytics & Insights Strip
- Dynamically calculated metric cards above the listings:
  - **Average Nightly Rate**
  - **Average Guest Rating**
  - **Top Neighborhood**
  - **Superhost Percentage**
  - **Active Filtered Count**

### 6. 🌓 Modern Theming (Dark & Light Mode)
- Seamless theme toggle with persistent user choice in `localStorage`.
- Fluid color palette, glassmorphism headers, subtle shadows, and micro-animations.

### 7. 🛡️ Robust Image Error Handling & Fallbacks
- Airbnb CDN images occasionally expire or return 403 errors; custom `onerror` image handlers automatically replace broken media with curated high-res Unsplash interior and architectural photos, ensuring zero broken image icons.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), full ARIA accessibility.
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox, transitions, glassmorphism, responsive breakpoints.
- **JavaScript (ES6+)**: ES Modules, `fetch` API, `async`/`await`, DOM manipulation, `localStorage` persistence, event delegation.
- **Leaflet.js & OpenStreetMap**: Lightweight mapping library for coordinate visualization without external API keys.

---

## 📁 Project Directory Structure

```text
assign2/
├── index.html                     # Main application webpage
├── css/
│   └── style.css                  # Design system, animations & responsive styling
├── js/
│   └── app.js                     # Asynchronous data loading & application logic
├── data/
│   └── airbnb_sf_listings_500.json# Airbnb San Francisco listings dataset
├── airbnb_sf_listings_500.json    # Root dataset copy for relative fetch compatibility
└── README.md                      # Assignment documentation & deployment guide
```

---

## 🏃 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harshiacchu/web_dev.git
   cd web_dev/assign2
   ```

2. **Start a local HTTP server:**
   Because AJAX `fetch()` requires an HTTP server (to prevent CORS restrictions with `file://` protocols), run any static server:
   
   Using Node / NPX:
   ```bash
   npx serve .
   ```
   Or using Python 3:
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000` (or `http://localhost:8000`).

---

## 📜 License & Acknowledgments

- Course: **CS5610 Web Development**
- Base dataset & starter reference: [Prof. John Alexis Guerra Gómez Demo Repo](https://github.com/john-guerra/Airbnb_Listings_demo_page)
- Map Tiles: © [OpenStreetMap](https://www.openstreetmap.org/) contributors
