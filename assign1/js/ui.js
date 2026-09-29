// ui.js — shared interface behaviours used across every page.
// Theme persistence, the typewriter role rotator, scroll-reveal, a pointer
// glow, and active-nav highlighting. All vanilla ES6, no dependencies.

const THEME_KEY = "hs-theme";

/** Apply and persist a theme, returning the applied value. */
export function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // Storage may be blocked (private mode); theme still applies for the session.
    void error;
  }
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    const label = toggle.querySelector(".theme-label");
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
  }
  return theme;
}

/** Read the saved theme, falling back to the OS preference. */
export function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (error) {
    void error;
  }
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  setTheme(theme);

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
}

/** Flip the theme once; returns the new theme (used by the terminal). */
export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  return setTheme(current === "dark" ? "light" : "dark");
}

/**
 * Typewriter that cycles through phrases inside `element`.
 * @param {HTMLElement} element target span
 * @param {string[]} phrases words to cycle
 */
export function typewriter(element, phrases) {
  if (!element || !phrases.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = phrases[0];
    return;
  }
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    element.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) {
      delay = 1400;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }
    window.setTimeout(tick, delay);
  };
  tick();
}

/** Reveal elements with the `.reveal` class as they enter the viewport. */
export function initReveal() {
  // Signal that JS is active so the CSS opts into the hide-then-reveal effect.
  document.documentElement.classList.add("js");
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((el) => observer.observe(el));
}

/** Warm glow that follows the pointer via CSS custom properties. */
export function initPointerGlow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--mx", `${event.clientX}px`);
    document.body.style.setProperty("--my", `${event.clientY}px`);
  });
}

/** Highlight the nav link matching the current page. */
export function initActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "index.html" && href === "./index.html")) {
      link.classList.add("is-active");
    }
  });
}
