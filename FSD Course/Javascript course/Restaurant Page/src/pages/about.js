import "./about.css";

export default function about() {
  const about = document.createElement("div");
  about.id = "about_container";

  about.innerHTML = `
  <h2>Our Story</h2>
  <p>Founded in the heart of Warsaw, Pizzeria brings the soul of Naples to Mazovia. After years of perfecting recipes in family kitchens, our founder – a passionate pizza artisan – decided to share authentic wood-fired pizzas with locals craving real Italian flavors.</p>
  <h2>What Sets Us Apart</h2>
  <p>We hand-stretch dough daily using premium Polish flour, top it with fresh, locally sourced ingredients like ripe tomatoes from nearby farms and creamy mozzarella, then bake it to perfection in our imported wood oven. No shortcuts, just tradition meets modern taste.</p>
  <h2>Join Our Pizza Family</h2>
  <p>From our oven to your table – every slice is made with love. Visit us today and taste the difference!</p>
  `;

  return about;
}
