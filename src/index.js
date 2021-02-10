import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// This is for all the sass to be run on the application
import "./Sass/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
