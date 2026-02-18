import "./tasks_list.css";

import form from "./new_task.js";

export default function tasks_list(projectId) {
  const tasks = document.createElement("div");

  const control = document.createElement("div");
  control.id = "task_control";

  const title = document.createElement("h2");
  title.textContent = "Tasks";

  const formElement = form(renderList, projectId);

  const button = document.createElement("button");
  button.id = "new_task_btn";
  button.textContent = "New Task";
  button.addEventListener("click", () => {
    formElement.classList.toggle("visible");
  });

  const tasks_container = document.createElement("div");
  tasks_container.id = "tasks_container";

  function renderList() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find((p) => p.id === projectId);
    const tasks = project.tasks;
    tasks_container.innerHTML = "";

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.id = task.id;
      card.className = "task_card";

      const title = document.createElement("h3");
      title.textContent = task.title;

      const date = document.createElement("span");
      date.textContent = task.dueDate;

      const description = document.createElement("p");
      description.textContent = task.description;

      const priority = document.createElement("h4");
      priority.textContent = task.priority ? "Priority" : "Not priority";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete_task_btn";
      deleteBtn.addEventListener("click", () => {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const projectIndex = projects.findIndex((p) => p.id === projectId);

        projects[projectIndex].tasks = projects[projectIndex].tasks.filter(
          (t) => t.id !== task.id,
        );

        localStorage.setItem("projects", JSON.stringify(projects));
        renderList();
      });

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(description);
      card.appendChild(priority);
      card.appendChild(deleteBtn);

      tasks_container.appendChild(card);
    });
  }

  renderList();

  control.appendChild(title);
  control.appendChild(button);
  control.appendChild(formElement);

  tasks.appendChild(control);
  tasks.appendChild(tasks_container);

  return tasks;
}
