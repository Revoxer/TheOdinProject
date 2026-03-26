const db = require("../db");

exports.listAll = async (req, res) => {
  const { rows } = await db.query(`
    SELECT items.*, categories.name AS category_name
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    ORDER BY items.name
  `);
  res.render("items/index", { items: rows });
};

exports.showOne = async (req, res) => {
  const { rows } = await db.query(
    `
    SELECT items.*, categories.name AS category_name
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    WHERE items.id = $1
  `,
    [req.params.id],
  );

  if (!rows[0]) return res.status(404).send("Item not found");
  res.render("items/show", { item: rows[0] });
};

exports.newForm = async (req, res) => {
  const { rows: categories } = await db.query(
    "SELECT * FROM categories ORDER BY name",
  );
  res.render("items/new", { categories });
};

exports.create = async (req, res) => {
  const { name, description, price, quantity, category_id } = req.body;
  await db.query(
    "INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1,$2,$3,$4,$5)",
    [name, description, price, quantity, category_id || null],
  );
  res.redirect("/items");
};

exports.editForm = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM items WHERE id=$1", [
    req.params.id,
  ]);
  if (!rows[0]) return res.status(404).send("Item not found");
  const { rows: categories } = await db.query(
    "SELECT * FROM categories ORDER BY name",
  );
  res.render("items/edit", { item: rows[0], categories });
};

exports.update = async (req, res) => {
  const { name, description, price, quantity, category_id, adminPassword } =
    req.body;
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .render("error", { message: "Błędne hasło administratora!" });
  }
  await db.query(
    "UPDATE items SET name=$1, description=$2, price=$3, quantity=$4, category_id=$5 WHERE id=$6",
    [name, description, price, quantity, category_id || null, req.params.id],
  );
  res.redirect(`/items/${req.params.id}`);
};

exports.remove = async (req, res) => {
  const { adminPassword } = req.body;
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .render("error", { message: "Błędne hasło administratora!" });
  }
  await db.query("DELETE FROM items WHERE id=$1", [req.params.id]);
  res.redirect("/items");
};
