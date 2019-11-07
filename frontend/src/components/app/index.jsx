import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "../header";

const App = () => (
  <Router>
    <CssBaseline>
      <Header />
    </CssBaseline>
  </Router>
);

export default App;
