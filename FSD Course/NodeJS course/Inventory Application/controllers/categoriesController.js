const db = require("../db");

exports.listAll = async (req, res) => {
  const { rows } = await db.query(`
    SELECT categories.*, COUNT(items.id) AS item_count
    FROM categories
    LEFT JOIN items ON items.category_id = categories.id
    GROUP BY categories.id
    ORDER BY categories.name
  `);
  res.render("categories/index", { categories: rows });
};

exports.showOne = async (req, res) => {
  const { rows: catRows } = await db.query(
    "SELECT * FROM categories WHERE id=$1",
    [req.params.id],
  );
  if (!catRows[0]) return res.status(404).send("Category not found");
  const { rows: items } = await db.query(
    "SELECT * FROM items WHERE category_id=$1 ORDER BY name",
    [req.params.id],
  );
  res.render("categories/show", { category: catRows[0], items });
};

exports.newForm = (req, res) => res.render("categories/new");

exports.create = async (req, res) => {
  const { name, description } = req.body;
  await db.query("INSERT INTO categories (name, description) VALUES ($1,$2)", [
    name,
    description,
  ]);
  res.redirect("/categories");
};

exports.editForm = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM categories WHERE id=$1", [
    req.params.id,
  ]);
  if (!rows[0]) return res.status(404).send("Category not found");
  res.render("categories/edit", { category: rows[0] });
};

exports.update = async (req, res) => {
  const { name, description, adminPassword } = req.body;
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .render("error", { message: "Błędne hasło administratora!" });
  }
  await db.query("UPDATE categories SET name=$1, description=$2 WHERE id=$3", [
    name,
    description,
    req.params.id,
  ]);
  res.redirect(`/categories/${req.params.id}`);
};

exports.remove = async (req, res) => {
  const { adminPassword } = req.body;
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .render("error", { message: "Błędne hasło administratora!" });
  }
  await db.query("DELETE FROM categories WHERE id=$1", [req.params.id]);
  res.redirect("/categories");
};
