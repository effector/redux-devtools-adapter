import React from "react";
import { useUnit } from "effector-react";
import { buttonClicked, $counter } from "./model";

export function CounterView() {
  const { click, count } = useUnit({
    click: buttonClicked,
    count: $counter,
  });

  return <button onClick={click}>Current count {count}</button>;
}
