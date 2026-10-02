// runner.js — a playful "endless runner" buddy that chases the cursor.
// An avatar headed character on a hoverboard trails the pointer with a smooth
// lerp, runs while moving, flips to face its direction, and kicks up dust.
// It is purely decorative: pointer-events are off so it never blocks clicks,
// and it only turns on for fine pointers when motion is allowed. A small toggle
// lets visitors switch it off (remembered via localStorage).

const STORE_KEY = "hs-runner";

/** Build the character and toggle DOM once, returning the pieces we animate. */
function buildDom() {
  const runner = document.createElement("div");
  runner.className = "runner";
  runner.setAttribute("aria-hidden", "true");
  runner.innerHTML = `
    <div class="runner-sprite">
      <div class="runner-char">
        <span class="rc-shadow"></span>
        <span class="rc-arm rc-arm-back"></span>
        <span class="rc-leg rc-leg-back"><span class="rc-shoe"></span></span>
        <span class="rc-leg rc-leg-front"><span class="rc-shoe"></span></span>
        <span class="rc-torso"></span>
        <img class="rc-head" src="./images/avatar.jpg" alt="" width="40" height="40" />
        <span class="rc-arm rc-arm-front"></span>
        <span class="runner-dust"></span>
      </div>
    </div>`;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "runner-toggle";
  toggle.innerHTML = `<span aria-hidden="true">🏃</span><span class="runner-toggle-label">Runner</span>`;
  toggle.setAttribute("aria-label", "Toggle the running buddy cursor");

  document.body.append(runner, toggle);
  return { runner, toggle };
}

export function initRunner() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer) return;

  const { runner, toggle } = buildDom();
  const sprite = runner.querySelector(".runner-sprite");

  let saved = null;
  try {
    saved = localStorage.getItem(STORE_KEY);
  } catch (error) {
    void error;
  }
  // Default on for fine pointers; the visitor can switch it off at any time.
  // Reduced-motion users still get the buddy, just without the limb animation.
  let enabled = saved ? saved === "on" : true;

  // Start off-screen so the buddy slides in on the first pointer move.
  const target = { x: -80, y: -80 };
  const pos = { x: -80, y: -80 };
  let facing = 1;
  let idleTimer = 0;

  const applyEnabled = () => {
    runner.classList.toggle("is-on", enabled);
    toggle.classList.toggle("is-off", !enabled);
  };
  applyEnabled();

  toggle.addEventListener("click", () => {
    enabled = !enabled;
    try {
      localStorage.setItem(STORE_KEY, enabled ? "on" : "off");
    } catch (error) {
      void error;
    }
    applyEnabled();
  });

  window.addEventListener("pointermove", (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
  });

  const frame = () => {
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    pos.x += dx * 0.14;
    pos.y += dy * 0.14;

    const speed = Math.hypot(dx, dy);
    const running = speed > 3;
    if (running) {
      facing = dx < 0 ? -1 : 1;
      // Limb animation only when the visitor has not asked to reduce motion.
      if (!reduceMotion) {
        runner.classList.add("is-running");
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => runner.classList.remove("is-running"), 140);
      }
    }

    // Offset so the character rides just below and behind the cursor tip.
    runner.style.transform = `translate3d(${pos.x - 10}px, ${pos.y + 6}px, 0)`;
    sprite.style.transform = `scaleX(${facing})`;
    window.requestAnimationFrame(frame);
  };
  window.requestAnimationFrame(frame);
}
