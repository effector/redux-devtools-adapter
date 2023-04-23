import "mvp.css";
import { createRoot } from "react-dom/client";
import { attachReduxDevTools } from "@effector/redux-devtools-adapter";

import { App, scopeOne, scopeTwo } from "./app";
import { createElement } from "react";

attachReduxDevTools({
  appName: "Demo App",
});

attachReduxDevTools({
  appName: "Demo app (scope)",
  scope: scopeOne,
});

attachReduxDevTools({
  appName: "Demo app (scope + traces)",
  scope: scopeTwo,
});

const root = document.getElementById("app");

createRoot(root!).render(createElement(App));
