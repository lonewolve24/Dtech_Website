const WHATSAPP_URL = "https://wa.me/3558580";
const WHATSAPP_DISPLAY = "3558580";

const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress span");
const toggle = document.querySelector(".nav-toggle");
const panel = document.querySelector(".nav-panel");

function onScroll() {
  if (!header || !progress) return;
  const scrolled = window.scrollY;
  header.classList.toggle("is-scrolled", scrolled > 10);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(scrolled / max, 1) : 0;
  progress.style.transform = `scaleX(${ratio})`;
}

function closeMenu() {
  if (!toggle || !panel) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  panel.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Close menu");
  panel.classList.add("is-open");
  document.body.classList.add("menu-open");
}

if (toggle && panel) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    if (open) closeMenu();
    else openMenu();
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 820) closeMenu();
  });
}

const spyLinks = [...document.querySelectorAll(".nav-panel a[href^='#']")];
const spySections = spyLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function spyNav() {
  if (!spySections.length) return;
  const mark = window.scrollY + 140;
  let current = null;
  spySections.forEach((section) => {
    if (section.offsetTop <= mark) current = section;
  });
  spyLinks.forEach((link) => {
    const active = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", () => {
  onScroll();
  spyNav();
}, { passive: true });

onScroll();
spyNav();

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const note = link.dataset.note || "Hi Dtech Electronics, I need help with a laptop.";
  const url = new URL(WHATSAPP_URL);
  if (WHATSAPP_URL.includes("wa.me/") && WHATSAPP_URL.replace(/\D/g, "").length > 6) {
    url.searchParams.set("text", note);
  }
  link.href = url.toString();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const numberSlot = document.querySelector("[data-whatsapp-number]");
if (numberSlot && WHATSAPP_DISPLAY.trim()) {
  numberSlot.textContent = WHATSAPP_DISPLAY.trim();
}

const TRACK_API_URL = ((window.DTECH_CONFIG && window.DTECH_CONFIG.TRACK_API_URL) || "").trim();
const trackForm = document.querySelector("#track-form");
const trackResult = document.querySelector("#track-result");

if (trackForm && trackResult) {
  trackForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = (trackForm.code.value || "").trim();
    trackResult.hidden = false;
    trackResult.className = "track-result";
    if (!TRACK_API_URL) {
      trackResult.classList.add("is-error");
      trackResult.textContent = "Repair tracking is not configured yet.";
      return;
    }
    if (!code) {
      trackResult.classList.add("is-error");
      trackResult.textContent = "Enter the repair code we gave you.";
      return;
    }
    trackResult.textContent = "Checking…";
    try {
      const url = new URL(TRACK_API_URL, window.location.origin);
      url.searchParams.set("code", code);
      const response = await fetch(url.toString());
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        data = {};
      }
      if (!response.ok || !data.found) {
        trackResult.classList.add("is-error");
        trackResult.textContent = data.error || (response.status === 404
          ? "Status check is not available yet. WhatsApp us and we’ll look up the code."
          : "No repair found for that code. Check the letters and try again.");
        return;
      }
      const ready = Boolean(data.ready_for_pickup);
      trackResult.classList.toggle("is-ready", ready);
      const title = document.createElement("strong");
      title.textContent = ready ? "Done. Ready for pickup." : `Still being fixed. ${data.status || "In progress"}.`;
      trackResult.replaceChildren(title);
      if (data.gadget) {
        trackResult.append(document.createTextNode(data.gadget));
      }
      if (data.brought_in) {
        trackResult.append(document.createElement("br"), document.createTextNode(`Dropped off ${data.brought_in}`));
      }
    } catch (err) {
      trackResult.classList.add("is-error");
      trackResult.textContent = "Could not check status right now. Try again or WhatsApp us.";
    }
  });
}
