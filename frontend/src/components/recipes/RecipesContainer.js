import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Recipes from "./RecipesPage";

export default connect(
  state => ({
    recipes: state.recipes
  }),
  {
    getRecipes: actions.getRecipes,
    modifyRecipe: actions.modifyRecipe,
    removeRecipe: actions.removeRecipe
  }
)(Recipes);
