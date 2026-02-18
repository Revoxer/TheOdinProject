import "./project_description.css";

import tasks from "./tasks_list.js";

export default function project_description(project) {
  const project_description = document.createElement("div");
  project_description.className = "project_container";

  if (!project) return project_description;

  const title = document.createElement("h2");
  title.textContent = project.title;

  const date = document.createElement("span");
  date.textContent = project.dueDate;

  const description = document.createElement("p");
  description.textContent = project.description ?? "";

  project_description.appendChild(title);
  project_description.appendChild(date);
  project_description.appendChild(description);
  project_description.appendChild(tasks(project.id));

  return project_description;
}
