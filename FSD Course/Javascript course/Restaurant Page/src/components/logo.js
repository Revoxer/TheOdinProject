import "./logo.css";

import logoImage from "../assets/image/logo.png";

export default function logo() {
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.innerHTML = `
  <img src="${logoImage}" alt="pizza logo">
  `;

  return logo;
}
