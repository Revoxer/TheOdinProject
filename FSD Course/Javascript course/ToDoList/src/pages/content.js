import "./content.css";

import project_panel from "../components/project_panel.js";
import project_description from "../components/project_description.js";

let project = null;

export default function content() {
  const content = document.createElement("div");
  content.id = "content";

  const descriptionContainer = document.createElement("div");
  descriptionContainer.id = "project_description";

  function showDetails(id) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project_detail = projects.find((p) => p.id === id);
    project = project_detail;

    descriptionContainer.innerHTML = "";
    descriptionContainer.appendChild(project_description(project));
  }

  content.appendChild(project_panel(showDetails));
  content.appendChild(descriptionContainer);

  return content;
}
