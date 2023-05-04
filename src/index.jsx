import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./Game.jsx";
import Interface from "./Interface";

document.addEventListener("contextmenu", (event) => event.preventDefault());

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <Interface />
    <Game />
  </React.StrictMode>
);
