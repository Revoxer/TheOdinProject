import "./navbar.css";

export default function navBar() {
  const navBar = document.createElement("nav");
  navBar.className = "navbar";
  navBar.innerHTML = `
  <button class="home_btn" >Home</button>
  <button class="menu_btn" >Menu</button>
  <button class="about_btn" >About</button>
  `;

  return navBar;
}
