import "./menu.css";

import pizzaImg from "../assets/image/pizza.png";

export default function menu() {
  const menu = document.createElement("div");
  menu.id = "menu_container";

  menu.innerHTML = `
  <div><img src="${pizzaImg}" alt="pizza image"><h3>Margherita</h3><p>Tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of extra virgin olive oil.</p></div>
  <div><img src="${pizzaImg}" alt="pizza image"><h3>Pepperoni</h3><p>Tomato sauce, mozzarella cheese, sliced pepperoni, and optional oregano.</p></div>
  <div><img src="${pizzaImg}" alt="pizza image"><h3>Hawaiian</h3><p>Tomato sauce, mozzarella cheese, ham, pineapple chunks, and a touch of red onion.</p></div>
  <div><img src="${pizzaImg}" alt="pizza image"><h3>Quattro</h3><p>Mozzarella, parmesan, provolone, and blue cheese (no tomato sauce).</p></div>
  <div><img src="${pizzaImg}" alt="pizza image"><h3>Capricciosa</h3><p>Tomato sauce, mozzarella, ham, artichoke hearts, mushrooms, and black olives.</p></div>
  <div><img src="${pizzaImg}" alt="pizza image"><h3>BBQ Chicken</h3><p>BBQ sauce base, grilled chicken, mozzarella, red onions, and cilantro.</p></div>
  `;

  return menu;
}
