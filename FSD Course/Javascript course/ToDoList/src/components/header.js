import "./header.css";

import logo from "../assets/images/logo.svg";

export default function header() {
  const header = document.createElement("header");
  header.id = "header";
  header.innerHTML = `
  <img src="${logo}" alt="logo image">
  <h1>To Do List</h1>
  `;

  return header;
}
