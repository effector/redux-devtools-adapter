import { Message, inspect } from "effector/inspect";
import type { Scope } from "effector";

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export function attachReduxDevTools({
  scope,
  name,
  trace,
  devToolsConfig,
}: {
  scope?: Scope;
  name: string;
  trace?: boolean;
  devToolsConfig?: {
    maxAge?: number;
    latency?: number;
    serialize?:
      | boolean
      | {
          replacer?: (key: string, value: any) => any;
        };
  };
}): () => void {
  if (!devTools) return fallback();

  const state = {};
  const controller = devTools.connect({
    name: getInstanceName(name),
    ...devToolsConfig,
  });
  controller.init(state);

  const report = createReporter(state);

  const uninspect = inspect({
    scope,
    trace,
    fn: (m) => {
      const act = report(m);
      if (act) {
        if (trace) {
          act.trace = readTrace(m.trace!);
        }
        if (m.loc) {
          act.loc = m.loc;
        }

        controller.send(act, { ...state });
      }
    },
  });

  return () => {
    uninspect();
  };
}

function fallback() {
  console.error("Redux DevTools extension is not connected :(");
  const unsub = () => {
    // ok
  };
  return unsub;
}

function getInstanceName(name: string): string {
  if (name) {
    return `☄️ ${name}`;
  }

  if (typeof document === "object") {
    return `☄️ ${document.title}`;
  }
  return "☄️ no title instance";
}

// reporting
const fxIdMap = new Map<unknown, string>();

function createReporter(state: Record<string, unknown>) {
  return (m: Message): Record<string, unknown> | void => {
    console.log(m);
    // effects
    if (isEffectCall(m)) {
      const name = getName(m);
      fxIdMap.set(m.stack.fxID, name);
      updateInFlight(state, name, 1);
      return {
        type: `[effect] ${m.name || "unknown"}`,
        params: m.value,
      };
    }

    if (isEffectFinally(m)) {
      const name = fxIdMap.get(m.stack.fxID)!;

      updateInFlight(state, name, -1);

      if ((m.value as any).status === "done") {
        return {
          type: `[effect] ${name}.done`,
          params: (m.value as any).params!,
          result: (m.value as any).result,
        };
      }
      if ((m.value as any).status === "fail") {
        return {
          type: `[effect] ${name}.fail`,
          params: (m.value as any).params!,
          error: (m.value as any).error,
        };
      }

      return {
        type: `[effect] ${name}.${(m.value as any).status}`,
      };
    }

    // stores
    if (isStoreUpdate(m)) {
      saveStoreUpdate(state, m);
      return {
        type: `[store] ${getName(m)}`,
        value: m.value,
      };
    }
    if (isCombineUpdate(m)) {
      saveStoreUpdate(state, m);
      return {
        type: `[combine] ${getName(m)}`,
        value: m.value,
      };
    }

    // events
    if (isSplitEvent(m)) {
      return {
        type: `[event] ${getName(m)}`,
        params: m.value,
      };
    }
    if (isEvent(m)) {
      return {
        type: `[event] ${getName(m)}`,
        params: m.value,
      };
    }

    // operators
    if (isSample(m)) {
      return {
        type: `[${m.kind}] ${getSampleName(m)}`,
        value: m.value,
      };
    }
    if (isForward(m)) {
      return {
        type: `[forward]`,
        value: m.value,
      };
    }
  };
}

// effects
function isEffectCall(m: Message) {
  return m.kind === "effect";
}
function isEffectFinally(m: Message) {
  return m.kind === "event" && m.meta.named === "finally";
}
function updateInFlight(
  state: Record<string, unknown>,
  name: string,
  up: number
) {
  const inFlightName = `${name}.inFlight`;
  const inFlight = (state[inFlightName] as number) || 0;
  state[inFlightName] = inFlight + up;
}

// stores
function isStoreUpdate(m: Message) {
  return m.kind === "store" && !m.meta.derived && !isEffectorInternal(m);
}
function isCombineUpdate(m: Message) {
  return m.kind === "store" && m.meta.isCombine && !isEffectorInternal(m);
}
function saveStoreUpdate(state: Record<string, unknown>, m: Message) {
  const name = getName(m);
  state[name] = m.value;
}

// events
function isEvent(m: Message) {
  return m.kind === "event" && !m.meta.derived && !isEffectorInternal(m);
}
function isSplitEvent(m: Message) {
  return m.kind === "event" && (m.meta as any)?.named?.startsWith("cases.");
}

// operators
function isSample(m: Message) {
  return m.kind === "sample" || m.kind === "guard";
}
function isForward(m: Message) {
  return m.kind === "forward";
}

// util
function isEffectorInternal(m: Message) {
  return !!m.meta.named;
}
function getName(m: Message) {
  return m.name || `unknown_${m.id}`;
}
function getSampleName(m: Message) {
  return m.name || locToString(m.loc) || `unknown_${m.id}`;
}
function locToString(loc: any) {
  if (!loc) return null;
  return `${loc.file}:${loc.line}:${loc.column}`;
}
function readTrace(trace: Message[]) {
  return trace.map((m) => {
    return {
      type: m.kind,
      name: m.name,
      value: m.value,
    };
  });
}
