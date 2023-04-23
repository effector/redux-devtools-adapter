import "mvp.css";
import { createRoot } from "react-dom/client";
import { attachReduxDevTools } from "@effector/redux-devtools-adapter";

import { App } from "./app";
import { createElement } from "react";

attachReduxDevTools({
  appName: "Demo App",
});

const root = document.getElementById("app");

createRoot(root!).render(createElement(App));
