import React from "react";
import { fork } from "effector";
import { Provider } from "effector-react";
import { CounterView } from "./counter";

export const scopeOne = fork();
export const scopeTwo = fork();

export function App() {
  return (
    <main>
      <div>
        <h1>No Scope</h1>
        <CounterView />
      </div>
      <div>
        <h1>With Scope 1</h1>
        <Provider value={scopeOne}>
          <CounterView />
        </Provider>
      </div>
      <div>
        <h1>With Scope 2 (traces)</h1>
        <Provider value={scopeTwo}>
          <CounterView />
        </Provider>
      </div>
    </main>
  );
}
