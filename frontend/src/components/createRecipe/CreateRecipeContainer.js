import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CreateRecipe from "./CreateRecipe";

export default connect(
  null,
  {
    createRecipe: actions.createRecipe
  }
)(CreateRecipe);
