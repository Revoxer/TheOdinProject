import { format } from "date-fns";

import "./new_task.css";

export default function new_project(reload, projectId) {
  const form = document.createElement("form");
  form.id = "task_form";

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

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority:";
  priorityLabel.htmlFor = "priority";

  const priorityInput = document.createElement("input");
  priorityInput.type = "checkbox";
  priorityInput.id = "priority";
  priorityInput.name = "priority";

  const priorityWrapper = document.createElement("div");
  priorityWrapper.classList.add("priority-wrapper");

  priorityWrapper.appendChild(priorityLabel);
  priorityWrapper.appendChild(priorityInput);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Add Task";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descLabel);
  form.appendChild(descInput);
  form.appendChild(priorityWrapper);
  form.appendChild(button);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    project.tasks.push({
      id: crypto.randomUUID(),
      dueDate: format(new Date(), "yyyy-MM-dd"),
      title: titleInput.value,
      description: descInput.value,
      priority: priorityInput.checked,
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    form.reset();

    form.classList.remove("visible");

    reload();
  });

  return form;
}
