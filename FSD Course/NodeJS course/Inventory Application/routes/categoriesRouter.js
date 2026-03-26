const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/categoriesController");

router.get("/", ctrl.listAll);
router.get("/new", ctrl.newForm);
router.get("/:id", ctrl.showOne);
router.get("/:id/edit", ctrl.editForm);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
