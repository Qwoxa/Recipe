import * as types from "./types";
import axios from "axios";

export const getRecipes = () => async dispatch => {
  dispatch({ type: types.GET_RECIPES_REQUEST });

  try {
    const res = await axios.get("/api/recipes");
    dispatch({ type: types.GET_RECIPES_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.data && err.data.error;
    dispatch({ type: types.GET_RECIPES_FAILURE, payload: error });
  }
};

export const createRecipe = data => async dispatch => {
  dispatch({ type: types.CREATE_RECIPE_REQUEST });

  try {
    const res = await axios.post("/api/recipes", data);
    dispatch({ type: types.CREATE_RECIPE_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.data && err.data.error;
    dispatch({ type: types.CREATE_RECIPE_FAILURE, payload: error });
  }
};

export const removeRecipe = id => async dispatch => {
  dispatch({ type: types.REMOVE_RECIPE_REQUEST });

  try {
    const res = await axios.delete(`/api/recipes/${id}`);
    dispatch({ type: types.REMOVE_RECIPE_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.data && err.data.error;
    dispatch({ type: types.REMOVE_RECIPE_FAILURE, payload: error });
  }
};

export const modifyRecipe = data => async dispatch => {
  dispatch({ type: types.MODIFY_RECIPE_REQUEST });

  try {
    const res = await axios.patch(`/api/recipes/${data.id}`, data);
    dispatch({ type: types.MODIFY_RECIPE_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.data && err.data.error;
    dispatch({ type: types.MODIFY_RECIPE_FAILURE, payload: error });
  }
};
