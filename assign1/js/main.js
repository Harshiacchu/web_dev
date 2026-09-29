// main.js — homepage entry point (loaded with <script type="module">).
// Wires the shared UI behaviours and boots the interactive terminal.

import { roles } from "./data.js";
import {
  initTheme,
  typewriter,
  initReveal,
  initPointerGlow,
  initActiveNav,
  toggleTheme,
} from "./ui.js";
import { initTerminal, registerThemeSwitcher } from "./terminal.js";

function boot() {
  initTheme();
  initActiveNav();
  initReveal();
  initPointerGlow();

  const rotatorTarget = document.querySelector(".rotator-text");
  if (rotatorTarget) typewriter(rotatorTarget, roles);

  // Let the terminal's `theme` command reuse the shared toggle.
  registerThemeSwitcher(toggleTheme);
  initTerminal(document.querySelector(".terminal"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
