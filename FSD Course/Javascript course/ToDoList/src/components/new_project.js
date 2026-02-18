import { format } from "date-fns";

import "./new_project.css";

export default function new_project(reload) {
  const form = document.createElement("form");
  form.id = "project_form";

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  titleLabel.htmlFor = "title";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;

  const descLabel = document.createElement("label");
  descLabel.textContent = "Description:";
  descLabel.htmlFor = "description";

  const descInput = document.createElement("textarea");
  descInput.id = "description";
  descInput.name = "description";
  descInput.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Add Project";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descLabel);
  form.appendChild(descInput);
  form.appendChild(button);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    projects.push({
      id: crypto.randomUUID(),
      dueDate: format(new Date(), "yyyy-MM-dd"),
      title: titleInput.value,
      description: descInput.value,
      tasks: [],
    });
    localStorage.setItem("projects", JSON.stringify(projects));

    form.reset();

    form.classList.remove("visible");

    reload();
  });

  return form;
}
