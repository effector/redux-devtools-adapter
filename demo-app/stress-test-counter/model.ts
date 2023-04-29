import { createStore, createEvent, createEffect, sample } from "effector";

export const buttonClicked = createEvent();
const increment = createEvent();
export const $heavyCounter = createStore(0).on(increment, (state) => state + 1);

const incrementManyFx = createEffect(() => {
  for (let i = 0; i < 100; i++) {
    increment();
  }
});

sample({
  clock: buttonClicked,
  target: incrementManyFx,
});
