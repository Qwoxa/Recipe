import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./components/app";
axios.defaults.baseURL = "http://localhost:3004/";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
