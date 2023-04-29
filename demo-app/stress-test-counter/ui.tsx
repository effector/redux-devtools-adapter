import React from "react";
import { useUnit } from "effector-react";
import { buttonClicked, $heavyCounter } from "./model";

export function HeavyCounterView() {
  const { click, count } = useUnit({
    click: buttonClicked,
    count: $heavyCounter,
  });

  return (
    <button onClick={click} style={{ ["--color-link" as any]: "crimson" }}>
      HEAVY COUNT: {count}
    </button>
  );
}
