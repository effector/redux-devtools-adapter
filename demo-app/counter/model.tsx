import {
  createEvent,
  createStore,
  createEffect,
  sample,
  combine,
  split,
  forward,
  guard,
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

const sampledEvent = sample({
  source: {
    count: $counter,
    ref: $ref,
  },
  clock: [someSideEffectFx.done, someOtherEffectFx.done],
  filter: ({ ref }) => ref.count % 2 === 0,
  fn: ({ count }) => `${count}_kek`,
});

const a = createEvent<string>();
const b = createEvent<string>();

split({
  source: sampledEvent,
  match: {
    a: (kek) => parseInt(kek.split("_")[0]) % 2 === 0,
    b: (_kek) => true,
  },
  cases: {
    a,
    b,
  },
});

const { aaa, bbb } = split(sampledEvent, {
  aaa: (kek) => parseInt(kek.split("_")[0]) % 2 === 0,
  bbb: (_kek) => true,
});

forward({
  from: a,
  to: b,
});

guard({
  clock: a,
  filter: () => false,
  target: b,
});
