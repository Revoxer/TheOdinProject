const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/categories"));
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((req, res) =>
  res.status(404).render("error", { message: "Page not found!" }),
);
