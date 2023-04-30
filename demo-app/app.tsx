import React from "react";
import { fork } from "effector";
import { Provider } from "effector-react";
import { CounterView } from "./counter";
import { HeavyCounterView } from "./stress-test-counter";

export const scopeOne = fork();
export const scopeTwo = fork();

export function App() {
  return (
    <main>
      <div>
        <h1>No Scope</h1>
        <AppBody />
      </div>
      <div>
        <h1>With Scope 1</h1>
        <Provider value={scopeOne}>
          <AppBody />
        </Provider>
      </div>
      <div>
        <h1>With Scope 2 (traces)</h1>
        <Provider value={scopeTwo}>
          <AppBody />
        </Provider>
      </div>
    </main>
  );
}

function AppBody() {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <CounterView />
      <HeavyCounterView />
    </div>
  );
}
