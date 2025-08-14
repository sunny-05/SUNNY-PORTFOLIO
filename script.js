// ---- Utilities ----
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// ---- Year in footer ----
$("#year").textContent = new Date().getFullYear();

// ---- Smooth scroll for nav ----
$$(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ---- Typewriter (name then role) ----
function typeWriter(el, text, speed = 90) {
  return new Promise(resolve => {
    el.textContent = "";
    let i = 0;
    (function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        setTimeout(tick, speed);
      } else resolve();
    })();
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await typeWriter($("#tw-name"), "SUNNY", 110);
  await typeWriter($("#tw-role"), "Full-Stack Web Developer • Content Writer", 70);
});

// ---- Project cards: flip-in on scroll (staggered) ----
function animateProjectCards() {
  const cards = $$(".project-card");
  const trigger = window.innerHeight - 100;

  cards.forEach((card, i) => {
    const top = card.getBoundingClientRect().top;
    if (!card.classList.contains("show") && top < trigger) {
      setTimeout(() => card.classList.add("show"), i * 140);
    }
  });
}
["scroll", "load"].forEach(evt => window.addEventListener(evt, animateProjectCards));

// ---- Contact form validation ----
const form = $("#contact-form");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");
const formStatus = $("#form-status");

function showError(input, msg) {
  const err = input.parentElement.querySelector(".error-message");
  err.textContent = msg;
  err.style.display = "block";
  input.classList.add("error");
}
function clearError(input) {
  const err = input.parentElement.querySelector(".error-message");
  err.textContent = "";
  err.style.display = "none";
  input.classList.remove("error");
}
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

[nameInput, emailInput, messageInput].forEach(inp => {
  inp.addEventListener("input", () => clearError(inp));
});

form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;

  if (nameInput.value.trim() === "") { showError(nameInput, "Name is required"); ok = false; }
  if (!validEmail(emailInput.value.trim())) { showError(emailInput, "Enter a valid email"); ok = false; }
  if (messageInput.value.trim().length < 10) { showError(messageInput, "Message must be at least 10 characters"); ok = false; }

  if (ok) {
    formStatus.textContent = "Message Sent Successfully ✅";
    formStatus.className = "success";
    form.reset();
    setTimeout(() => (formStatus.textContent = ""), 3000);
  } else {
    formStatus.textContent = "Please fix the errors above ❌";
    formStatus.className = "error";
  }
});

// ---- Particles.js background (hero) ----
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2.2, direction: "none", out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 3 }
    }
  },
  retina_detect: true
});
