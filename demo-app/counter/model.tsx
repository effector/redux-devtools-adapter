import {
  createEvent,
  createStore,
  createEffect,
  sample,
  combine,
} from "effector";

export const buttonClicked = createEvent();
export const $counter = createStore(0).on(buttonClicked, (s) => s + 1);

const someSideEffectFx = createEffect(async (count: number) => {
  console.log("Side effect", count);

  await new Promise((r) => setTimeout(r, 10));

  if (count % 10 === 0) {
    throw Error("Some error");
  }

  return count;
});

const someOtherEffectFx = createEffect(async (count: number) => {
  return count;
});

const $ref = combine({ count: $counter });

sample({
  clock: $ref.map(({ count }) => count),
  target: [someSideEffectFx, someOtherEffectFx],
});

sample({
  clock: someSideEffectFx.fail,
  source: $counter,
  fn: (c) => c + 5,
  target: $counter,
});
