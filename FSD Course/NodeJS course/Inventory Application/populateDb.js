const db = require("./db");

async function seed() {
  await db.query(`INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic equipment'),
    ('Clothing', 'Clothes and accessories')
    ON CONFLICT (name) DO NOTHING`);

  await db.query(`INSERT INTO items (name, price, quantity, category_id) VALUES
    ('Laptop', 2999.99, 10, 1),
    ('Headphones', 199.99, 50, 1),
    ('T-shirt', 49.99, 100, 2)`);

  console.log("Data seeded successfully!");
  process.exit();
}

seed();
