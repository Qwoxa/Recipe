import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";

import App from "./components/app";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
