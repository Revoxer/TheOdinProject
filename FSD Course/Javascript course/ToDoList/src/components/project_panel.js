import "./project_panel.css";
import form from "./new_project.js";

export default function project_panel(showDetails) {
  const project_panel = document.createElement("div");
  project_panel.id = "project_panel";

  const control = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Projects";

  const formElement = form(renderList);

  const button = document.createElement("button");
  button.textContent = "New Project";
  button.className = "new_project_btn";
  button.addEventListener("click", () => {
    formElement.classList.toggle("visible");
  });

  const list = document.createElement("div");
  list.id = "projects_list";

  function renderList() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    list.innerHTML = "";

    projects.forEach((project) => {
      const p = document.createElement("div");
      p.className = "project";
      p.id = project.id;
      p.textContent = project.title;
      p.addEventListener("click", () => {
        showDetails(project.id);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Usuń";
      deleteBtn.className = "delete_project_btn";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const filtered = projects.filter((proj) => proj.id !== project.id);
        localStorage.setItem("projects", JSON.stringify(filtered));
        renderList();
      });

      p.appendChild(deleteBtn);
      list.appendChild(p);
    });
  }

  renderList();

  control.appendChild(title);
  control.appendChild(button);
  control.appendChild(formElement);

  project_panel.appendChild(control);
  project_panel.appendChild(list);

  return project_panel;
}
