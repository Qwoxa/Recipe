const models = require("../models");
const mongoose = require("mongoose");
var createError = require("http-errors");

const { Recipe } = models;

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}, "-__v");
  res.status(200).json(recipes);
};

const createRecipe = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return next(createError(400, "Missing name or description"));
  }

  const document = new Recipe({
    versions: { name, description }
  });

  const savedDoc = await document.save();
  res.status(201).json(savedDoc);
};

const changeRecipe = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid id"));
  }

  let { name, description } = req.body;

  const doc = await Recipe.findById(id);

  if (doc === null) {
    return next(createError(404, "Recipe is not found"));
  }

  const currentVersion = doc.versions[0];
  const nextVersion = {
    name: name || currentVersion.name,
    description: description || currentVersion.description
  };

  doc.versions.unshift(nextVersion);
  const changedDoc = await doc.save();

  res.json(changedDoc);
};

const deleteRecipe = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid id"));
  }

  const doc = await Recipe.findById(id);

  if (doc === null) {
    return next(createError(404, "Recipe is not found"));
  }

  const resp = await doc.remove();
  res.json(resp);
};

module.exports = {
  getAllRecipes,
  createRecipe,
  changeRecipe,
  deleteRecipe
};
