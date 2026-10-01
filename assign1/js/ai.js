// ai.js — entry point for ai.html (loaded with <script type="module">).
// "AI Lens": the answers below were drafted by a generative AI model and then
// curated (see the README for model, version, and prompts). The typing effect
// and the lens switching logic are original ES6, no libraries.

import { initTheme, initReveal, initPointerGlow, initActiveNav } from "./ui.js";
import { initRunner } from "./runner.js";

// Each lens pairs a prompt with its AI drafted answer.
const lenses = [
  {
    prompt: "One line summary",
    answer:
      "Harshitha is a data and software engineer who turns messy information into decisions people can act on.",
  },
  {
    prompt: "What she likes to solve",
    answer:
      "She likes problems where the data is noisy and the answer is hidden: pipelines, modeling, and the quiet moment a dataset finally tells the truth.",
  },
  {
    prompt: "In a recruiter's words",
    answer:
      "A dependable builder who pairs strong data fundamentals with clear communication, and who is ready to contribute from day one.",
  },
  {
    prompt: "Her approach to data",
    answer:
      "Start from the question, keep the data honest, then build an interface that makes the decision almost obvious.",
  },
  {
    prompt: "A lighter note",
    answer:
      "When the queries stop, she is usually deep in a crime thriller, a Korean drama, or a new recipe.",
  },
];

/**
 * Type `text` into `element` one character at a time.
 * Returns a cancel token so a new request can stop an in flight animation.
 */
function typeInto(element, text, token) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = text;
    return;
  }
  let index = 0;
  element.textContent = "";
  element.classList.add("is-typing");
  const step = () => {
    if (token.cancelled) return;
    element.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      window.setTimeout(step, 18);
    } else {
      element.classList.remove("is-typing");
    }
  };
  step();
}

function boot() {
  initTheme();
  initActiveNav();
  initReveal();
  initPointerGlow();
  initRunner();

  const chips = Array.from(document.querySelectorAll(".lens-chip"));
  const answer = document.querySelector(".lens-answer");
  const promptText = document.querySelector(".lens-prompt-text");
  let activeToken = { cancelled: false };

  const selectLens = (lens, chip) => {
    chips.forEach((item) => item.classList.toggle("is-active", item === chip));
    if (promptText) promptText.textContent = lens.prompt;
    if (!answer) return;
    activeToken.cancelled = true;
    activeToken = { cancelled: false };
    const token = activeToken;
    answer.style.opacity = "0";
    window.setTimeout(() => {
      answer.style.opacity = "1";
      typeInto(answer, lens.answer, token);
    }, 180);
  };

  chips.forEach((chip, index) => {
    chip.addEventListener("click", () => selectLens(lenses[index], chip));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
