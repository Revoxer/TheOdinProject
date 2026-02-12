import "./main.css";
import header from "../components/header.js";

import home from "./home.js";

export default function main() {
  const fragment = document.createDocumentFragment();
  const content = document.createElement("div");
  content.id = "content";

  content.appendChild(home());

  fragment.appendChild(header());
  fragment.appendChild(content);

  return fragment;
}
