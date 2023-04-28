import "mvp.css";
import { createRoot } from "react-dom/client";
import { attachReduxDevTools } from "../";

import { App, scopeOne, scopeTwo, scopeThree } from "./app";
import { createElement } from "react";

attachReduxDevTools({
  name: "Demo App",
});

attachReduxDevTools({
  name: "Demo app (scope)",
  scope: scopeOne,
});

attachReduxDevTools({
  name: "Demo app (scope + traces)",
  scope: scopeTwo,
  trace: true,
});

attachReduxDevTools({
  name: "Demo app (scope + time travel)",
  scope: scopeThree,
  timeTravel: true,
});

const root = document.getElementById("app");

createRoot(root!).render(createElement(App));
