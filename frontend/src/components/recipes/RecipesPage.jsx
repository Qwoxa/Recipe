import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import RecipesList from "./RecipesList";

const Recipes = ({ recipes, getRecipes, modifyRecipe, removeRecipe }) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <Container>
      <Typography style={{ marginTop: 30 }} variant="h3">
        Recipes
      </Typography>
      <RecipesList
        recipes={recipes}
        modifyRecipe={modifyRecipe}
        removeRecipe={removeRecipe}
      />
    </Container>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  getRecipes: PropTypes.func.isRequired,
  modifyRecipe: PropTypes.func.isRequired,
  removeRecipe: PropTypes.func.isRequired
};

export default Recipes;
