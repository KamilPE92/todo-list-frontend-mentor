let theme = localStorage.getItem("mode") || "light"; // Get Item from localStorage if exist theme by default light
const themeSwitcher = document.querySelector(".theme__switcher");
const body = document.querySelector("body");
themeSwitcher.addEventListener("click", () => {
    // If LocalStorage === "dark" remove dark class from body and theme = light
    if (theme === "dark") {
        body.classList.remove("dark");
        theme = "light";
    } else {
        // If LocalStorage === "light" add dark class to body and theme = light

        body.classList.add("dark");
        theme = "dark";
    }
    // SET LOCAL STORAGE
    localStorage.setItem("mode", theme);

    // the same effect I can achieve add toggle method to const body
});

// If i chose dark theme is dark after refresh
if (theme === "dark") {
    body.classList.add("dark");
}
