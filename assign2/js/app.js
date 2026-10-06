/**
 * BayStay SF - Airbnb Explorer
 * Advanced Client-Side Application Logic
 * AJAX Data Fetching (fetch/async/await) & Dynamic DOM Manipulation
 */

// Fallback high-resolution interior/architectural photos for any expired/broken Airbnb CDNs
const FALLBACK_LISTING_IMAGES = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
];

const DEFAULT_HOST_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

// Application State
const state = {
  rawListings: [],
  listings: [],
  filteredListings: [],
  limitCount: 50, // Display first 50 listings as required
  totalInFile: 0,
  favorites: new Set(),
  currentView: 'grid',
  currentTheme: 'light',
  activeNeighborhood: 'all',
  searchQuery: '',
  selectedRoomType: 'all',
  superhostOnly: false,
  instantBookOnly: false,
  favoritesOnly: false,
  sortBy: 'recommended',
  selectedListing: null,
  map: null,
  markers: []
};

// DOM Element Selectors
const elements = {
  listingsGrid: document.getElementById('listingsGrid'),
  resultsCount: document.getElementById('resultsCount'),
  showingScopeBadge: document.getElementById('showingScopeBadge'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  roomTypeSelect: document.getElementById('roomTypeSelect'),
  sortSelect: document.getElementById('sortSelect'),
  superhostToggleBtn: document.getElementById('superhostToggleBtn'),
  favoritesToggleBtn: document.getElementById('favoritesToggleBtn'),
  favHeaderBtn: document.getElementById('favHeaderBtn'),
  favHeaderCount: document.getElementById('favHeaderCount'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  neighborhoodPills: document.getElementById('neighborhoodPills'),
  viewModeBtns: document.querySelectorAll('.view-mode-btn'),
  mainLayout: document.getElementById('mainLayout'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  dataScopeSelect: document.getElementById('dataScopeSelect'),
  
  // Stats
  statAvgPrice: document.getElementById('statAvgPrice'),
  statAvgRating: document.getElementById('statAvgRating'),
  statTopNeighborhood: document.getElementById('statTopNeighborhood'),
  statSuperhostPct: document.getElementById('statSuperhostPct'),
  statShowingCount: document.getElementById('statShowingCount'),

  // Modal
  modalOverlay: document.getElementById('modalOverlay'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalContainer: document.getElementById('modalContainer'),

  // Toast
  toastContainer: document.getElementById('toastContainer')
};

/**
 * Initialize Application
 */
async function initApp() {
  loadSavedPreferences();
  setupEventListeners();
  renderLoadingSkeletons(12);
  await fetchAirbnbData();
}

/**
 * Load Saved LocalStorage Preferences (Theme, Favorites)
 */
function loadSavedPreferences() {
  // Theme
  const savedTheme = localStorage.getItem('baystay_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);

  // Favorites
  try {
    const savedFavs = JSON.parse(localStorage.getItem('baystay_favorites') || '[]');
    state.favorites = new Set(savedFavs);
    updateFavoritesBadge();
  } catch (e) {
    state.favorites = new Set();
  }
}

/**
 * Set Application Theme (Light / Dark)
 */
function setTheme(theme) {
  state.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('baystay_theme', theme);

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.innerHTML = theme === 'dark' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/**
 * Fetch Airbnb Listings using AJAX (fetch + async/await)
 */
async function fetchAirbnbData() {
  try {
    // Primary JSON path with fallback
    let response;
    try {
      response = await fetch('./airbnb_sf_listings_500.json');
    } catch {
      response = await fetch('./data/airbnb_sf_listings_500.json');
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    state.rawListings = data;
    state.totalInFile = data.length;

    // Process & sanitize listing data
    state.listings = data.map((item, index) => sanitizeListingItem(item, index));

    // Initialize neighborhood pills
    generateNeighborhoodPills();

    // Apply initial filters & render first 50 listings
    applyFiltersAndRender();
    showToast(`Loaded first ${state.limitCount} San Francisco stays successfully! ✨`);

  } catch (error) {
    console.error("Error fetching Airbnb listings:", error);
    elements.listingsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3 class="empty-state-title">Failed to load listings</h3>
        <p class="empty-state-desc">There was an error fetching the dataset (${error.message}). Please ensure the local server is running.</p>
        <button class="action-btn" onclick="fetchAirbnbData()">Try Again</button>
      </div>
    `;
  }
}

/**
 * Sanitize & Format Individual Listing Object
 */
function sanitizeListingItem(item, index) {
  // Parse Numeric Price
  let numericPrice = 0;
  if (typeof item.price === 'number') {
    numericPrice = item.price;
  } else if (typeof item.price === 'string') {
    numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
  }

  // Parse Amenities
  let parsedAmenities = [];
  if (Array.isArray(item.amenities)) {
    parsedAmenities = item.amenities;
  } else if (typeof item.amenities === 'string') {
    try {
      parsedAmenities = JSON.parse(item.amenities);
    } catch {
      parsedAmenities = item.amenities
        .replace(/[\[\]'"]/g, '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
  }

  // Fallback Images
  const fallbackImg = FALLBACK_LISTING_IMAGES[index % FALLBACK_LISTING_IMAGES.length];
  const pictureUrl = item.picture_url && item.picture_url.startsWith('http') ? item.picture_url : fallbackImg;
  const hostPicUrl = item.host_picture_url || item.host_thumbnail_url || DEFAULT_HOST_AVATAR;

  // Rating & Reviews
  const rating = item.review_scores_rating ? parseFloat(item.review_scores_rating).toFixed(2) : '4.85';
  const reviewsCount = item.number_of_reviews ? parseInt(item.number_of_reviews, 10) : 0;

  // Clean description
  let cleanDesc = item.description || 'Welcome to this wonderful San Francisco home with great amenities and central location.';
  cleanDesc = cleanDesc.replace(/<br\s*[\/]?>/gi, ' ').replace(/<[^>]+>/g, '').trim();

  const neighborhood = item.neighbourhood_cleansed || item.neighbourhood || 'San Francisco';

  return {
    id: item.id || `listing-${index}`,
    index,
    name: item.name || 'Cozy San Francisco Stay',
    description: cleanDesc,
    rawDescription: item.description || cleanDesc,
    amenities: parsedAmenities,
    host_name: item.host_name || 'Host',
    host_about: item.host_about || '',
    host_picture_url: hostPicUrl,
    host_response_time: item.host_response_time || 'within a few hours',
    host_response_rate: item.host_response_rate || '100%',
    is_superhost: item.host_is_superhost === 't' || item.host_is_superhost === true,
    price: item.price || `$${numericPrice.toFixed(0)}`,
    numericPrice: numericPrice,
    picture_url: pictureUrl,
    fallback_image: fallbackImg,
    neighborhood: neighborhood,
    room_type: item.room_type || 'Entire home/apt',
    property_type: item.property_type || 'Apartment',
    accommodates: item.accommodates || 2,
    bedrooms: item.bedrooms || 1,
    beds: item.beds || 1,
    bathrooms_text: item.bathrooms_text || '1 bath',
    latitude: parseFloat(item.latitude) || 37.7749,
    longitude: parseFloat(item.longitude) || -122.4194,
    rating: rating,
    number_of_reviews: reviewsCount,
    listing_url: item.listing_url || 'https://www.airbnb.com',
    instant_bookable: item.instant_bookable === 't' || item.instant_bookable === true
  };
}

/**
 * Generate Neighborhood Filter Pills from Top Areas
 */
function generateNeighborhoodPills() {
  if (!elements.neighborhoodPills) return;

  const areaCounts = {};
  // Count across first 50 items (or all)
  state.listings.slice(0, 50).forEach(item => {
    if (item.neighborhood) {
      areaCounts[item.neighborhood] = (areaCounts[item.neighborhood] || 0) + 1;
    }
  });

  const sortedAreas = Object.keys(areaCounts).sort((a, b) => areaCounts[b] - areaCounts[a]);

  let pillsHtml = `
    <button class="pill-btn active" data-neighborhood="all">All Neighborhoods</button>
  `;

  sortedAreas.forEach(area => {
    pillsHtml += `
      <button class="pill-btn" data-neighborhood="${escapeHtml(area)}">${escapeHtml(area)} (${areaCounts[area]})</button>
    `;
  });

  elements.neighborhoodPills.innerHTML = pillsHtml;

  elements.neighborhoodPills.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.neighborhoodPills.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeNeighborhood = btn.getAttribute('data-neighborhood');
      applyFiltersAndRender();
    });
  });
}

/**
 * Filter, Sort, and Render Listings
 */
function applyFiltersAndRender() {
  // Base slice: First 50 listings (or full count if user changed data scope)
  let workingList = state.limitCount ? state.listings.slice(0, state.limitCount) : [...state.listings];

  // 1. Search Query Filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    workingList = workingList.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.neighborhood.toLowerCase().includes(q) ||
      item.host_name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.amenities.some(a => a.toLowerCase().includes(q))
    );
  }

  // 2. Neighborhood Filter
  if (state.activeNeighborhood && state.activeNeighborhood !== 'all') {
    workingList = workingList.filter(item => item.neighborhood === state.activeNeighborhood);
  }

  // 3. Room Type Filter
  if (state.selectedRoomType && state.selectedRoomType !== 'all') {
    workingList = workingList.filter(item => item.room_type === state.selectedRoomType);
  }

  // 4. Superhost Toggle
  if (state.superhostOnly) {
    workingList = workingList.filter(item => item.is_superhost);
  }

  // 5. Instant Bookable Toggle
  if (state.instantBookOnly) {
    workingList = workingList.filter(item => item.instant_bookable);
  }

  // 6. Favorites Filter
  if (state.favoritesOnly) {
    workingList = workingList.filter(item => state.favorites.has(String(item.id)));
  }

  // 7. Sorting
  sortListings(workingList);

  state.filteredListings = workingList;

  // Update Insights & Stats Strip
  updateInsightStats(workingList);

  // Render HTML Cards
  renderListings(workingList);

  // Update Map Markers
  updateMapMarkers(workingList);
}

/**
 * Sort List of Items in Place
 */
function sortListings(list) {
  switch (state.sortBy) {
    case 'price-asc':
      list.sort((a, b) => a.numericPrice - b.numericPrice);
      break;
    case 'price-desc':
      list.sort((a, b) => b.numericPrice - a.numericPrice);
      break;
    case 'rating-desc':
      list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case 'reviews-desc':
      list.sort((a, b) => b.number_of_reviews - a.number_of_reviews);
      break;
    case 'name-asc':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // Recommended / Default JSON Order
      list.sort((a, b) => a.index - b.index);
      break;
  }
}

/**
 * Render Listings Grid / List
 */
function renderListings(listings) {
  if (!elements.listingsGrid) return;

  // Update results summary
  const count = listings.length;
  elements.resultsCount.textContent = `${count} ${count === 1 ? 'Stay' : 'Stays'} Available`;
  elements.showingScopeBadge.textContent = state.limitCount 
    ? `Showing first ${state.limitCount} listings (AJAX Loaded)`
    : `Showing all ${state.listings.length} listings`;

  if (count === 0) {
    elements.listingsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No listings match your criteria</h3>
        <p class="empty-state-desc">Try clearing some filters or searching for another neighborhood or keyword.</p>
        <button class="action-btn" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Generate Cards
  const cardsHtml = listings.map(item => createListingCardHtml(item)).join('');
  elements.listingsGrid.innerHTML = cardsHtml;

  // Attach card event listeners
  attachCardEvents();
}

/**
 * Create HTML String for a Single Listing Card
 */
function createListingCardHtml(item) {
  const isFav = state.favorites.has(String(item.id));
  const topAmenities = item.amenities.slice(0, 3);
  const remainingCount = item.amenities.length - 3;

  return `
    <article class="listing-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(item.name)}">
      <div class="card-image-wrap">
        <img 
          class="card-image" 
          src="${escapeHtml(item.picture_url)}" 
          alt="${escapeHtml(item.name)}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${item.fallback_image}';"
        />
        
        <div class="card-badge-container">
          ${item.is_superhost ? `
            <span class="superhost-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Superhost
            </span>
          ` : ''}
          <span class="room-type-badge">${escapeHtml(item.room_type)}</span>
        </div>

        <button 
          class="card-favorite-btn ${isFav ? 'favorited' : ''}" 
          data-fav-id="${item.id}"
          title="${isFav ? 'Remove from favorites' : 'Save to favorites'}"
          aria-label="${isFav ? 'Remove from favorites' : 'Save to favorites'}"
          onclick="event.stopPropagation(); toggleFavorite('${item.id}')"
        >
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="${isFav ? 'currentColor' : 'none'}">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <span class="card-location">📍 ${escapeHtml(item.neighborhood)}</span>
          <div class="card-rating">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>${item.rating}</span>
            <span class="review-count">(${item.number_of_reviews})</span>
          </div>
        </div>

        <h3 class="card-title">${escapeHtml(item.name)}</h3>

        <div class="card-specs">
          <span class="card-spec-item">👥 ${item.accommodates} guests</span>
          <span>•</span>
          <span class="card-spec-item">🛏️ ${item.beds} ${item.beds === 1 ? 'bed' : 'beds'}</span>
          <span>•</span>
          <span class="card-spec-item">🚿 ${escapeHtml(item.bathrooms_text)}</span>
        </div>

        <p class="card-description">${escapeHtml(item.description)}</p>

        <div class="card-amenities">
          ${topAmenities.map(am => `<span class="amenity-chip">${escapeHtml(am)}</span>`).join('')}
          ${remainingCount > 0 ? `<span class="amenity-chip more-chip">+${remainingCount} more</span>` : ''}
        </div>

        <div class="card-footer">
          <div class="card-host" title="Hosted by ${escapeHtml(item.host_name)}">
            <img 
              class="host-avatar" 
              src="${escapeHtml(item.host_picture_url)}" 
              alt="${escapeHtml(item.host_name)}"
              loading="lazy"
              onerror="this.onerror=null; this.src='${DEFAULT_HOST_AVATAR}';"
            />
            <div class="host-meta">
              <span class="host-name">${escapeHtml(item.host_name)}</span>
              <span class="host-status">${item.is_superhost ? '⭐ Superhost' : 'Host'}</span>
            </div>
          </div>

          <div class="card-price-wrap">
            <div class="card-price">${escapeHtml(item.price)}</div>
            <div class="card-price-period">/ night</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Attach Card Event Listeners
 */
function attachCardEvents() {
  document.querySelectorAll('.listing-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = state.listings.find(l => String(l.id) === String(id));
      if (item) openListingModal(item);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.getAttribute('data-id');
        const item = state.listings.find(l => String(l.id) === String(id));
        if (item) openListingModal(item);
      }
    });

    // Hover effect for map synchronization
    card.addEventListener('mouseenter', () => {
      const id = card.getAttribute('data-id');
      highlightMapMarker(id, true);
    });

    card.addEventListener('mouseleave', () => {
      const id = card.getAttribute('data-id');
      highlightMapMarker(id, false);
    });
  });
}

/**
 * Update Insight Metrics Strip
 */
function updateInsightStats(listings) {
  if (!listings || listings.length === 0) {
    elements.statShowingCount.textContent = '0';
    elements.statAvgPrice.textContent = '$0';
    elements.statAvgRating.textContent = '0.0';
    elements.statSuperhostPct.textContent = '0%';
    elements.statTopNeighborhood.textContent = '-';
    return;
  }

  const count = listings.length;
  elements.statShowingCount.textContent = count;

  // Average Price
  const totalCost = listings.reduce((sum, item) => sum + item.numericPrice, 0);
  const avgCost = Math.round(totalCost / count);
  elements.statAvgPrice.textContent = `$${avgCost}`;

  // Average Rating
  const totalRating = listings.reduce((sum, item) => sum + parseFloat(item.rating || 0), 0);
  const avgRating = (totalRating / count).toFixed(2);
  elements.statAvgRating.textContent = avgRating;

  // Superhost Ratio
  const superhosts = listings.filter(item => item.is_superhost).length;
  const superhostPct = Math.round((superhosts / count) * 100);
  elements.statSuperhostPct.textContent = `${superhostPct}%`;

  // Top Neighborhood
  const areaCounts = {};
  listings.forEach(item => {
    if (item.neighborhood) {
      areaCounts[item.neighborhood] = (areaCounts[item.neighborhood] || 0) + 1;
    }
  });
  let topArea = Object.keys(areaCounts).sort((a, b) => areaCounts[b] - areaCounts[a])[0] || 'San Francisco';
  elements.statTopNeighborhood.textContent = topArea;
}

/**
 * Toggle Favorite Status
 */
window.toggleFavorite = function(id) {
  const strId = String(id);
  const item = state.listings.find(l => String(l.id) === strId);
  const title = item ? item.name : 'Stay';

  if (state.favorites.has(strId)) {
    state.favorites.delete(strId);
    showToast(`Removed "${truncate(title, 25)}" from favorites.`);
  } else {
    state.favorites.add(strId);
    showToast(`Saved "${truncate(title, 25)}" to favorites! ❤️`);
  }

  localStorage.setItem('baystay_favorites', JSON.stringify(Array.from(state.favorites)));
  updateFavoritesBadge();

  // If in favorites-only filter mode, re-apply
  if (state.favoritesOnly) {
    applyFiltersAndRender();
  } else {
    // Update active button states on UI
    document.querySelectorAll(`.card-favorite-btn[data-fav-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('favorited', state.favorites.has(strId));
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', state.favorites.has(strId) ? 'currentColor' : 'none');
    });
  }
};

/**
 * Update Header Favorites Badge
 */
function updateFavoritesBadge() {
  const count = state.favorites.size;
  if (elements.favHeaderCount) {
    elements.favHeaderCount.textContent = count;
  }
}

/**
 * Open Detailed Listing Modal with Trip Price Estimator
 */
function openListingModal(item) {
  state.selectedListing = item;
  const isFav = state.favorites.has(String(item.id));

  // Prepare categorized amenities
  const amenitiesListHtml = item.amenities.map(am => `
    <div class="modal-amenity-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" color="var(--accent-teal)"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHtml(am)}</span>
    </div>
  `).join('');

  // Clean raw HTML paragraph output for description
  let formattedDesc = item.rawDescription || item.description;
  if (!formattedDesc.includes('<p>') && !formattedDesc.includes('<br')) {
    formattedDesc = `<p>${escapeHtml(formattedDesc)}</p>`;
  }

  const modalHtml = `
    <div class="modal-hero-image-wrap">
      <img 
        class="modal-hero-image" 
        src="${escapeHtml(item.picture_url)}" 
        alt="${escapeHtml(item.name)}"
        onerror="this.onerror=null; this.src='${item.fallback_image}';"
      />
      <button class="modal-close-btn" id="modalCloseActionBtn" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div class="modal-content-body">
      <div class="modal-header-section">
        <div class="card-location">📍 ${escapeHtml(item.neighborhood)}, San Francisco</div>
        <h2 class="modal-title">${escapeHtml(item.name)}</h2>
        
        <div class="modal-meta-row">
          <div class="card-rating">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--accent-gold)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <strong>${item.rating}</strong>
            <span class="review-count">(${item.number_of_reviews} guest reviews)</span>
          </div>
          <span>•</span>
          <span class="modal-meta-item">🏠 ${escapeHtml(item.room_type)} (${escapeHtml(item.property_type)})</span>
          <span>•</span>
          <span class="modal-meta-item">👥 Accommodates ${item.accommodates} guests</span>
          <span>•</span>
          <span class="modal-meta-item">🛏️ ${item.bedrooms} bedrooms · ${item.beds} beds</span>
          <span>•</span>
          <span class="modal-meta-item">🚿 ${escapeHtml(item.bathrooms_text)}</span>
        </div>
      </div>

      <!-- Host Profile Strip -->
      <div class="modal-host-card">
        <div class="modal-host-left">
          <img 
            class="modal-host-avatar" 
            src="${escapeHtml(item.host_picture_url)}" 
            alt="${escapeHtml(item.host_name)}"
            onerror="this.onerror=null; this.src='${DEFAULT_HOST_AVATAR}';"
          />
          <div class="modal-host-info">
            <h4>Hosted by ${escapeHtml(item.host_name)}</h4>
            <p>⚡ Response time: ${escapeHtml(item.host_response_time)} (${escapeHtml(item.host_response_rate)} response rate)</p>
          </div>
        </div>
        <div class="modal-host-badges">
          ${item.is_superhost ? `<span class="superhost-badge">⭐ Superhost</span>` : ''}
          ${item.instant_bookable ? `<span class="room-type-badge" style="background:var(--accent-teal)">⚡ Instant Book</span>` : ''}
        </div>
      </div>

      ${item.host_about ? `
        <div style="background:var(--bg-surface-alt); padding:16px 20px; border-radius:var(--radius-md); font-size:0.9rem; color:var(--text-muted); font-style:italic;">
          "${escapeHtml(item.host_about)}"
        </div>
      ` : ''}

      <!-- Interactive Stay Cost Estimator -->
      <div class="price-calculator-box">
        <div class="calc-header">
          <div>
            <div class="calc-price-display">${escapeHtml(item.price)} <small style="font-size:0.9rem; color:var(--text-muted); font-weight:500;">/ night</small></div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Free cancellation available</div>
          </div>
          <button class="action-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${item.id}')">
            ${isFav ? '❤️ Saved in Wishlist' : '🤍 Add to Wishlist'}
          </button>
        </div>

        <div class="calc-inputs-grid">
          <div class="calc-field">
            <label for="modalNights">Nights Stay</label>
            <input type="number" id="modalNights" min="1" max="90" value="3" />
          </div>
          <div class="calc-field">
            <label for="modalGuests">Guests</label>
            <select id="modalGuests">
              ${Array.from({ length: item.accommodates || 2 }, (_, i) => `<option value="${i+1}">${i+1} Guest${i > 0 ? 's' : ''}</option>`).join('')}
            </select>
          </div>
          <div class="calc-field">
            <label for="modalDate">Check-in</label>
            <input type="date" id="modalDate" value="${new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}" />
          </div>
        </div>

        <div class="calc-breakdown" id="calcBreakdown">
          <!-- Dynamic JS breakdown -->
        </div>

        <button class="reserve-btn" id="modalReserveBtn">
          <span>Reserve This Stay (Demo)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>

        <div style="text-align:center;">
          <a href="${escapeHtml(item.listing_url)}" target="_blank" rel="noopener noreferrer" style="font-size:0.85rem; color:var(--primary); font-weight:600; text-decoration:underline;">
            Open on Airbnb.com ↗
          </a>
        </div>
      </div>

      <!-- Description Section -->
      <div>
        <h3 class="modal-section-title">About this space</h3>
        <div class="modal-description-text">${formattedDesc}</div>
      </div>

      <!-- Amenities Section -->
      <div>
        <h3 class="modal-section-title">What this place offers (${item.amenities.length} Amenities)</h3>
        <div class="modal-amenities-grid">
          ${amenitiesListHtml}
        </div>
      </div>
    </div>
  `;

  elements.modalContainer.innerHTML = modalHtml;
  elements.modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Calculator logic
  const nightsInput = document.getElementById('modalNights');
  const updatePriceCalc = () => {
    const nights = Math.max(1, parseInt(nightsInput.value, 10) || 1);
    const subtotal = item.numericPrice * nights;
    const cleaningFee = Math.round(Math.min(120, item.numericPrice * 0.2 + 35));
    const serviceFee = Math.round(subtotal * 0.12);
    const total = subtotal + cleaningFee + serviceFee;

    const breakdownEl = document.getElementById('calcBreakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="calc-row">
          <span>$${item.numericPrice} × ${nights} nights</span>
          <span>$${subtotal.toLocaleString()}</span>
        </div>
        <div class="calc-row">
          <span>Cleaning fee</span>
          <span>$${cleaningFee}</span>
        </div>
        <div class="calc-row">
          <span>BayStay service fee (12%)</span>
          <span>$${serviceFee}</span>
        </div>
        <div class="calc-row total">
          <span>Total before taxes</span>
          <span>$${total.toLocaleString()}</span>
        </div>
      `;
    }
  };

  nightsInput.addEventListener('input', updatePriceCalc);
  updatePriceCalc();

  // Modal Reserve Action
  document.getElementById('modalReserveBtn').addEventListener('click', () => {
    showToast(`🎉 Reservation confirmed for ${item.name.slice(0, 30)}...! Have a great trip!`);
  });

  // Close Button Inside Header
  document.getElementById('modalCloseActionBtn').addEventListener('click', closeListingModal);
}

/**
 * Close Detailed Listing Modal
 */
function closeListingModal() {
  elements.modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  state.selectedListing = null;
}

/**
 * Leaflet Interactive Map Initialization & Updates
 */
function initMap() {
  if (typeof L === 'undefined') return;

  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;

  // San Francisco center coordinates
  state.map = L.map('leaflet-map', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([37.765, -122.44], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(state.map);
}

/**
 * Update Leaflet Map Markers
 */
function updateMapMarkers(listings) {
  if (typeof L === 'undefined') return;
  if (!state.map) initMap();
  if (!state.map) return;

  // Clear existing markers
  state.markers.forEach(m => state.map.removeLayer(m));
  state.markers = [];

  const bounds = [];

  listings.forEach(item => {
    if (item.latitude && item.longitude) {
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="
          background: #FFFFFF; 
          color: #1E293B; 
          font-weight: 800; 
          font-size: 12px; 
          padding: 4px 8px; 
          border-radius: 20px; 
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
          border: 1px solid #E2E8F0;
          white-space: nowrap;
          cursor: pointer;
        " id="marker-${item.id}">${item.price}</div>`,
        iconSize: [50, 24],
        iconAnchor: [25, 12]
      });

      const marker = L.marker([item.latitude, item.longitude], { icon: customIcon }).addTo(state.map);
      marker.listingId = String(item.id);

      marker.bindPopup(`
        <div style="max-width: 220px; font-family: sans-serif;">
          <img src="${item.picture_url}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" onerror="this.src='${item.fallback_image}';" />
          <div style="font-weight: 700; font-size: 13px; line-height: 1.3;">${escapeHtml(item.name.slice(0, 45))}...</div>
          <div style="color: #FF385C; font-weight: 800; font-size: 14px; margin-top: 4px;">${item.price} <small style="color:#64748B; font-weight:normal;">/ night</small></div>
          <button onclick="openListingFromMap('${item.id}')" style="margin-top: 6px; width: 100%; padding: 6px; background: #FF385C; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 12px;">View Details</button>
        </div>
      `);

      marker.on('click', () => {
        // Highlight corresponding card
        const card = document.querySelector(`.listing-card[data-id="${item.id}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.outline = '3px solid #FF385C';
          setTimeout(() => { card.style.outline = 'none'; }, 2000);
        }
      });

      state.markers.push(marker);
      bounds.push([item.latitude, item.longitude]);
    }
  });

  if (bounds.length > 0 && state.currentView === 'split') {
    state.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }
}

/**
 * Highlight marker on map hover
 */
function highlightMapMarker(id, isHovered) {
  const pin = document.getElementById(`marker-${id}`);
  if (pin) {
    if (isHovered) {
      pin.style.background = '#FF385C';
      pin.style.color = '#FFFFFF';
      pin.style.transform = 'scale(1.15)';
      pin.style.zIndex = '1000';
    } else {
      pin.style.background = '#FFFFFF';
      pin.style.color = '#1E293B';
      pin.style.transform = 'scale(1)';
      pin.style.zIndex = 'auto';
    }
  }
}

window.openListingFromMap = function(id) {
  const item = state.listings.find(l => String(l.id) === String(id));
  if (item) openListingModal(item);
};

/**
 * Setup Global Event Listeners
 */
function setupEventListeners() {
  // Live Search with Debounce
  let searchTimeout;
  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    state.searchQuery = e.target.value;
    elements.searchClearBtn.classList.toggle('visible', state.searchQuery.length > 0);
    searchTimeout = setTimeout(() => {
      applyFiltersAndRender();
    }, 250);
  });

  // Search Clear Button
  elements.searchClearBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClearBtn.classList.remove('visible');
    applyFiltersAndRender();
  });

  // Room Type Filter
  elements.roomTypeSelect.addEventListener('change', (e) => {
    state.selectedRoomType = e.target.value;
    applyFiltersAndRender();
  });

  // Sorting
  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    applyFiltersAndRender();
  });

  // Superhost Toggle
  elements.superhostToggleBtn.addEventListener('click', () => {
    state.superhostOnly = !state.superhostOnly;
    elements.superhostToggleBtn.classList.toggle('active', state.superhostOnly);
    applyFiltersAndRender();
  });

  // Favorites Filter Toggle
  elements.favoritesToggleBtn.addEventListener('click', () => {
    state.favoritesOnly = !state.favoritesOnly;
    elements.favoritesToggleBtn.classList.toggle('active', state.favoritesOnly);
    applyFiltersAndRender();
  });

  // Header Favorites Button
  if (elements.favHeaderBtn) {
    elements.favHeaderBtn.addEventListener('click', () => {
      state.favoritesOnly = !state.favoritesOnly;
      elements.favoritesToggleBtn.classList.toggle('active', state.favoritesOnly);
      elements.favHeaderBtn.classList.toggle('active', state.favoritesOnly);
      applyFiltersAndRender();
    });
  }

  // Data Scope Toggle (First 50 vs All 500)
  if (elements.dataScopeSelect) {
    elements.dataScopeSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      state.limitCount = val === 'all' ? 0 : parseInt(val, 10);
      generateNeighborhoodPills();
      applyFiltersAndRender();
      showToast(state.limitCount ? `Viewing first ${state.limitCount} listings.` : `Viewing all ${state.totalInFile} listings!`);
    });
  }

  // Reset Filters
  elements.resetFiltersBtn.addEventListener('click', resetAllFilters);

  // Theme Toggle Button
  elements.themeToggleBtn.addEventListener('click', () => {
    const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  // View Mode Buttons (Grid, List, Split Map)
  elements.viewModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.viewModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-view');
      setViewMode(mode);
    });
  });

  // Modal Close Events
  elements.modalCloseBtn.addEventListener('click', closeListingModal);
  elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) closeListingModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) {
      closeListingModal();
    }
  });
}

/**
 * Switch View Mode (Grid / List / Split Map)
 */
function setViewMode(mode) {
  state.currentView = mode;
  elements.listingsGrid.classList.remove('list-view');
  elements.mainLayout.classList.remove('split-view');

  if (mode === 'list') {
    elements.listingsGrid.classList.add('list-view');
  } else if (mode === 'split') {
    elements.mainLayout.classList.add('split-view');
    if (!state.map) {
      initMap();
    }
    setTimeout(() => {
      if (state.map) {
        state.map.invalidateSize();
        updateMapMarkers(state.filteredListings);
      }
    }, 150);
  }
}

/**
 * Reset All Filters
 */
window.resetAllFilters = function() {
  state.searchQuery = '';
  state.activeNeighborhood = 'all';
  state.selectedRoomType = 'all';
  state.superhostOnly = false;
  state.instantBookOnly = false;
  state.favoritesOnly = false;
  state.sortBy = 'recommended';

  elements.searchInput.value = '';
  elements.searchClearBtn.classList.remove('visible');
  elements.roomTypeSelect.value = 'all';
  elements.sortSelect.value = 'recommended';
  elements.superhostToggleBtn.classList.remove('active');
  elements.favoritesToggleBtn.classList.remove('active');
  if (elements.favHeaderBtn) elements.favHeaderBtn.classList.remove('active');

  if (elements.neighborhoodPills) {
    elements.neighborhoodPills.querySelectorAll('.pill-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === 0);
    });
  }

  applyFiltersAndRender();
  showToast("All filters have been reset.");
};

/**
 * Render Loading Skeletons
 */
function renderLoadingSkeletons(count = 9) {
  let skeletonsHtml = '';
  for (let i = 0; i < count; i++) {
    skeletonsHtml += `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line w-35"></div>
          <div class="skeleton-line w-75"></div>
          <div class="skeleton-line w-50"></div>
          <div class="skeleton-line w-75" style="margin-top:auto;"></div>
        </div>
      </div>
    `;
  }
  elements.listingsGrid.innerHTML = skeletonsHtml;
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  if (!elements.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * String Helper Utilities
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncate(str, len = 30) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
