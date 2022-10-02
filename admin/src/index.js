import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter}  from "react-router-dom"

// App
import App from "./App";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store = {store}> 
      <App />
  </Provider>,
  document.getElementById('root')
);

