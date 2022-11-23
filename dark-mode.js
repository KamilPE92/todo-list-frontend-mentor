const themeSwitcher = document.querySelector(".theme-switch");
themeSwitcher.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
});
