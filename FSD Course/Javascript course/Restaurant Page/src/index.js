import main from "./pages/main.js";

import home from "./pages/home.js";
import menu from "./pages/menu.js";
import about from "./pages/about.js";

const app = document.querySelector("#app");

app.appendChild(main());

const home_btn = document.querySelector(".home_btn");
const menu_btn = document.querySelector(".menu_btn");
const about_btn = document.querySelector(".about_btn");

home_btn.addEventListener("click", () => {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  content.appendChild(home());
});

menu_btn.addEventListener("click", () => {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  content.appendChild(menu());
});

about_btn.addEventListener("click", () => {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  content.appendChild(about());
});
