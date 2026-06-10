const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const tabs = [...document.querySelectorAll("[data-space-tab]")];
const thumbs = [...document.querySelectorAll("[data-space-thumb]")];
const mainSpaceImage = document.querySelector("[data-space-main]");

const spaceImages = [
    "images/sound experience rightimg.png",
    "images/sound experience grid2.jpg",
    "images/sound experience grid3.jpg",
    "images/sound experience grid4.jpg"
];

function syncHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
    document.body.classList.remove("menu-open");
    header?.classList.remove("menu-active");
    menuToggle?.setAttribute("aria-expanded", "false");
}

function setExperienceImage(src, index) {
    if (!mainSpaceImage) return;
    mainSpaceImage.src = src;
    tabs.forEach((tab, tabIndex) => tab.classList.toggle("is-active", tabIndex === index));
    thumbs.forEach((thumb) => thumb.classList.toggle("is-active", thumb.dataset.spaceThumb === src));
}

syncHeader();
window.addEventListener("scroll", syncHeader);

menuToggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-active");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
});

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setExperienceImage(spaceImages[index], index));
});

thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => setExperienceImage(thumb.dataset.spaceThumb, Math.min(index, tabs.length - 1)));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
});
