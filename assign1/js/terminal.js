// terminal.js — the signature original component.
// A tiny in-browser shell: visitors type commands to explore Harshitha's page.
// Pure ES6, no libraries. Supports command history (arrow keys), tab-like
// suggestions, autocompletion, and themed output rendered from data.js.

import {
  profile,
  links,
  skills,
  projects,
  education,
  experience,
  achievements,
  interests,
} from "./data.js";

const HOST = "harshitha";
const PROMPT_USER = "visitor";

/** Build the list of supported commands and their handlers. */
function buildCommands() {
  const commands = {
    help: () => [
      "Available commands:",
      "  about       who I am",
      "  skills      the tools I build with",
      "  projects    things I have shipped",
      "  education   where I have studied",
      "  experience  roles I have held",
      "  awards      recognitions",
      "  interests   what I do after hours",
      "  contact     how to reach me",
      "  resume      open my full portfolio",
      "  theme       flip light / dark mode",
      "  clear       wipe the screen",
      "  help        show this list",
    ],
    about: () => [
      `${profile.name} — ${profile.role}`,
      `"${profile.tagline}"`,
      `Based in ${profile.location}.`,
      profile.status,
    ],
    skills: () => skills.map((s) => `${s.group.padEnd(16)} ${s.items.join(", ")}`),
    projects: () =>
      projects.flatMap((p, i) => [
        `[${i + 1}] ${p.name}  {${p.stack.join(", ")}}`,
        `    ${p.blurb}`,
      ]),
    education: () => education.map((e) => `${e.degree} — ${e.school} (${e.period})`),
    experience: () => experience.map((e) => `${e.title} (${e.period}) — ${e.note}`),
    awards: () => achievements.map((a) => `★ ${a}`),
    interests: () => [`After hours: ${interests.join(" · ")}`],
    contact: () => [
      `email     ${profile.email}`,
      `linkedin  ${links.linkedin}`,
      `portfolio ${links.portfolio}`,
    ],
    resume: () => {
      window.open(links.portfolio, "_blank", "noopener");
      return ["Opening full portfolio in a new tab…"];
    },
    theme: () => {
      const next = toggleThemeExternally();
      return [`Theme switched to ${next} mode.`];
    },
  };
  return commands;
}

// Lightweight hook so the `theme` command can flip the shared theme.
let themeSwitcher = () => "light";
export function registerThemeSwitcher(fn) {
  themeSwitcher = fn;
}
function toggleThemeExternally() {
  return themeSwitcher();
}

/**
 * Initialise the terminal inside the given root element.
 * @param {HTMLElement} root element containing .terminal-body and .terminal-input
 */
export function initTerminal(root) {
  if (!root) return;
  const body = root.querySelector(".terminal-body");
  const input = root.querySelector(".terminal-input");
  if (!body || !input) return;

  const commands = buildCommands();
  const names = Object.keys(commands).concat("clear");
  const history = [];
  let historyIndex = -1;

  const escape = (text) =>
    String(text).replace(
      /[&<>]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c],
    );

  const promptHTML = `<span class="term-user">${PROMPT_USER}@${HOST}</span><span class="term-muted">:</span><span class="term-path">~</span><span class="term-prompt">$</span> `;

  function printLine(html, className = "") {
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`.trim();
    line.innerHTML = html;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function echoCommand(raw) {
    printLine(`${promptHTML}<span class="term-accent">${escape(raw)}</span>`);
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.push(raw);
    historyIndex = history.length;

    if (cmd === "clear") {
      body.replaceChildren();
      return;
    }
    const handler = commands[cmd];
    if (!handler) {
      printLine(
        `command not found: <span class="term-error">${escape(cmd)}</span> — try <span class="term-accent">help</span>`,
      );
      return;
    }
    const output = handler();
    output.forEach((row) => printLine(escape(row)));
  }

  function complete(value) {
    const partial = value.trim().toLowerCase();
    if (!partial) return value;
    const match = names.filter((n) => n.startsWith(partial));
    if (match.length === 1) return match[0];
    if (match.length > 1)
      printLine(`<span class="term-muted">${match.join("  ")}</span>`);
    return value;
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      echoCommand(input.value);
      run(input.value);
      input.value = "";
    } else if (event.key === "Tab") {
      event.preventDefault();
      input.value = complete(input.value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex > 0) input.value = history[--historyIndex];
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        input.value = history[++historyIndex];
      } else {
        historyIndex = history.length;
        input.value = "";
      }
    }
  });

  // Focus the input whenever the terminal area is clicked.
  root.addEventListener("click", () => input.focus());

  // Boot sequence: greet, then run `about` and `help` automatically.
  const boot = [
    `<span class="term-muted">Welcome to Harshitha's reading room. Type a command to explore.</span>`,
  ];
  boot.forEach((row) => printLine(row));
  echoCommand("about");
  run("about");
  echoCommand("help");
  run("help");
  input.focus();
}
