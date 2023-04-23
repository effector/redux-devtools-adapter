import { inspect } from "effector/inspect";
import type { Scope, Subscription } from "effector";

export function attachReduxDevTools({
  scope,
  appName,
  trace,
}: {
  scope?: Scope;
  appName?: string;
  trace?: boolean;
}): Subscription {
  return inspect({
    scope,
    trace,
    fn: console.log,
  });
}
