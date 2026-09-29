// ai.js — entry point for ai.html (loaded with <script type="module">).
// This page was drafted with a generative-AI model (documented in the README).
// The interactive piece below composes a fresh short "reflection" each click by
// recombining AI-written fragments — deterministic per click, no libraries.

import { initTheme, initReveal, initPointerGlow, initActiveNav } from "./ui.js";

// Fragments authored with the help of a generative-AI model, then curated.
const openings = [
  "She reads the noise in a spreadsheet",
  "Between a query and its answer",
  "Where others see a wall of numbers",
  "In the quiet after a pipeline runs",
];
const middles = [
  "and waits for the story to surface,",
  "she looks for the shape underneath,",
  "she keeps the question honest,",
  "she trims the data down to truth,",
];
const closings = [
  "until it starts making sense.",
  "then builds a door for the reader.",
  "and leaves the room a little clearer.",
  "so the decision almost makes itself.",
];

/** Pick an item using a rotating counter so each click feels new. */
function pick(list, step) {
  return list[step % list.length];
}

function compose(step) {
  return [pick(openings, step), pick(middles, step + 1), pick(closings, step + 2)].join(
    "\n",
  );
}

function boot() {
  initTheme();
  initActiveNav();
  initReveal();
  initPointerGlow();

  const output = document.querySelector(".poem");
  const button = document.querySelector(".generate-btn");
  let step = 0;

  if (output) output.textContent = compose(step);

  if (button && output) {
    button.addEventListener("click", () => {
      step += 1;
      output.style.opacity = "0";
      window.setTimeout(() => {
        output.textContent = compose(step);
        output.style.opacity = "1";
      }, 180);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
