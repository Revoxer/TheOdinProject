import "./main.css";

import header from "../components/header.js";
import content from "./content.js";

export default function main() {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(header());

  fragment.appendChild(content());

  return fragment;
}
