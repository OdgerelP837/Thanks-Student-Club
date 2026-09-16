const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 350);
});

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  menuToggle.textContent = mainNav.classList.contains("open") ? "✕" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 5) * 70, 280)}ms`;
  observer.observe(el);
});


const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.remove("active"));
    const current = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
    current?.classList.add("active");
  });
}, {rootMargin: "-40% 0px -50% 0px", threshold: 0});

sections.forEach(section => sectionObserver.observe(section));