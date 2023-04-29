import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import pkgJson from "./package.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const external = [...Object.keys(pkgJson.peerDependencies), "effector/inspect"];

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["effector/babel-plugin", { addLoc: true }]],
      },
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "EffectorReduxDevTools",
      // the proper extensions will be added
      fileName: "index",
    },
    rollupOptions: {
      external,
    },
  },
});
