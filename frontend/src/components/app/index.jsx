import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "../header";
import Recipes from '../recipes';
import CreateRecipe from '../createRecipe';

const App = () => (
  <div data-test="appComponent">
    <Router>
      <CssBaseline>
        <Header />
        <Route path="/" exact component={Recipes} />
        <Route path="/add" exact component={CreateRecipe} />
      </CssBaseline>
    </Router>
  </div>
);

export default App;
