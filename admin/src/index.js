import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter}  from "react-router-dom"
import reportWebVitals from "./reportWebVitals";

// App
import App from "./App";
// Styles
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store = {store}> 
      <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
