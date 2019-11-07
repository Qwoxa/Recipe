import * as types from "./types";

const initialState = {
  recipes: [],
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_RECIPE_REQUEST:
    case types.GET_RECIPES_REQUEST:
    case types.REMOVE_RECIPE_REQUEST:
    case types.MODIFY_RECIPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CREATE_RECIPE_SUCCESS:
      return {
        recipes: [...state.recipes, action.payload],
        loading: false
      };

    case types.GET_RECIPES_SUCCESS:
      return {
        recipes: action.payload,
        loading: false
      };
    case types.MODIFY_RECIPE_SUCCESS:
      return {
        recipes: state.recipes.map(r => r._id === action.payload._id ? action.payload : r),
        loading: false
      };

    case types.REMOVE_RECIPE_SUCCESS:
      return {
        recipes: state.recipes.filter(r => r._id !== action.payload._id),
        loading: false
      };

    case types.CREATE_RECIPE_FAILURE:
    case types.GET_RECIPES_FAILURE:
    case types.REMOVE_RECIPE_FAILURE:
    case types.MODIFY_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
