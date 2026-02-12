import "./header.css";

import navBar from "./navbar.js";
import logo from "./logo.js";

export default function header() {
  const header = document.createElement("header");
  header.id = "header";

  header.appendChild(logo());
  header.appendChild(navBar());

  return header;
}
