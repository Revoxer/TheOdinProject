import "./home.css";

export default function home() {
  const home = document.createElement("div");
  home.id = "home_container";

  home.innerHTML = `
    <h2>Welcome to Pizzeria – Where Every Slice Tells a Story</h2>
    <p>Craving authentic Italian pizza crafted with love? At Pizzeria, we fire up wood-oven pies using the freshest local ingredients, hand-stretched dough, and time-honored recipes straight from Naples. From classic Margherita to bold gourmet creations loaded with premium toppings, every bite bursts with flavor.</p>
    <h3>Why Choose Us?</h3>
      <p>Fresh & Local: Sourced daily for peak taste and quality.</p>
      <p>Wood-Fired Perfection: Crispy crusts with smoky notes in just minutes.</p>
      <p>Custom Creations: Build your own or try our chef's specials.</p>
      <p>Family-Friendly Vibes: Cozy seating, quick takeout, and delivery across Warsaw.</p>
      </br>
      <span>Hungry yet? Order now or swing by – your perfect pizza awaits!</span>
  `;

  return home;
}
