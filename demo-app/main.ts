import "mvp.css";
import { createRoot } from "react-dom/client";
import { attachReduxDevTools } from "../";

import { App, scopeOne, scopeTwo } from "./app";
import { createElement } from "react";

attachReduxDevTools();

attachReduxDevTools({
  name: "Demo App",
});

attachReduxDevTools({
  name: "Demo app (scope + batch)",
  scope: scopeOne,
  batch: true,
});

attachReduxDevTools({
  name: "Demo app (scope + traces)",
  scope: scopeTwo,
  trace: true,
});

const root = document.getElementById("app");

createRoot(root!).render(createElement(App));
