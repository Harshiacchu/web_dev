/**
 * CS5610: HTML, CSS & JavaScript Self-Assessment
 * Author: Harshitha Seetharaman
 * Interactive App Logic & User Experience Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackToTopFab();
  initSmoothScrollSpy();
  initInteractivePositioningDemo();
  initBoxModelInspector();
  console.log('🚀 CS5610 Self-Assessment Loaded Successfully!');
});

/**
 * Theme Toggle (Dark & Light Modes) with LocalStorage persistence
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('cs5610-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }
  localStorage.setItem('cs5610-theme', theme);
}

/**
 * Floating Back-to-Top Action Button (Fixed Positioning Demonstration)
 */
function initBackToTopFab() {
  const fab = document.getElementById('btn-back-to-top');
  if (!fab) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }
  });

  fab.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth Scroll & Active Nav Spy
 */
function initSmoothScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.assessment-section');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Interactive Positioning Micro-Demo
 */
function initInteractivePositioningDemo() {
  const relBox = document.getElementById('demo-rel-box');
  if (!relBox) return;

  let toggled = false;
  relBox.style.cursor = 'pointer';
  relBox.title = 'Click to toggle relative offset coordinates!';

  relBox.addEventListener('click', () => {
    toggled = !toggled;
    if (toggled) {
      relBox.style.top = '14px';
      relBox.style.left = '24px';
      relBox.textContent = 'Shifted Relative Box (top: 14px; left: 24px;)';
    } else {
      relBox.style.top = '4px';
      relBox.style.left = '8px';
      relBox.textContent = 'Shifted Relative Box (top: 4px; left: 8px;)';
    }
  });
}

/**
 * Box Model Inspector Tooltip Highlights
 */
function initBoxModelInspector() {
  const boxCards = document.querySelectorAll('.box-card');
  boxCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent-cyan)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border-medium)';
    });
  });
}
