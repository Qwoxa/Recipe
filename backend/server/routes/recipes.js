const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

const ctrl = controllers.recipes;

router.get("/", ctrl.getAllRecipes);

router.post("/", ctrl.createRecipe);

router.patch("/:id", ctrl.changeRecipe);

router.delete("/:id", ctrl.deleteRecipe);

module.exports = router;
