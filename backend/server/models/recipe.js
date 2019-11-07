const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  versions: [
    {
      name: String,
      description: String,
      changed: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Recipe = new mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
