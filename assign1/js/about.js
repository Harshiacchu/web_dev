// about.js — entry point for about.html (loaded with <script type="module">).
// Reuses the shared UI behaviours; no terminal on this page.

import { initTheme, initReveal, initPointerGlow, initActiveNav } from "./ui.js";
import { initRunner } from "./runner.js";

function boot() {
  initTheme();
  initActiveNav();
  initReveal();
  initPointerGlow();
  initRunner();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
