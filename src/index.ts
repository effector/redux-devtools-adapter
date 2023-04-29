import { Message, inspect } from "effector/inspect";
import type { Scope } from "effector";

export function attachReduxDevTools({
  scope,
  name,
  trace,
  devToolsConfig,
}: {
  /**
   * Effector's Scope, which calculations and state will be inspected
   *
   * If not provided, the default "no-scope" calculations will be tracked
   */
  scope?: Scope;
  /**
   * Context name to show in the redux devtools
   */
  name?: string;
  /**
   * Adds trace of effector calculations to every log
   */
  trace?: boolean;
  /**
   * Redux DevTools extension config
   * @see https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md
   */
  devToolsConfig?: {
    maxAge?: number;
    latency?: number;
    serialize?:
      | boolean
      | {
          replacer?: (key: string, value: any) => any;
        };
  };
} = {}): () => void {
  const devTools = getDevTools();

  if (!devTools) return fallback();

  const stateControls = createState();
  const { state } = stateControls;
  const controller = devTools.connect({
    name: getInstanceName(name),
    ...devToolsConfig,
  });
  controller.init(state);

  const report = createReporter(stateControls);

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

        /**
         * Providing each log with entity id,
         * so it is easier to debug updates of units with similar or equal names
         */
        act.id = m.id;

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

function getInstanceName(name?: string): string {
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

function createReporter(state: ReturnType<typeof createState>) {
  return (m: Message): Record<string, unknown> | void => {
    // errors
    if (m.type === "error") {
      return {
        type: `⛔️ [error] [${m.kind}] ${getName(m)}`,
        explanation: "Error in pure function, branch computation stopped",
        name: getName(m),
        value: m.value,
        error: (m?.error as any)?.message ? (m.error as any)!.message : m.error,
      };
    }

    // effects
    if (isEffectCall(m)) {
      const name = getName(m);
      fxIdMap.set(m.stack.fxID, name);
      return {
        type: `☄️ [effect] ${m.name || "unknown"}`,
        params: m.value,
      };
    }

    if (isEffectInFlight(m)) {
      state.saveStoreUpdate(m);
    }

    if (isEffectFinally(m)) {
      const name = fxIdMap.get(m.stack.fxID)!;
      fxIdMap.delete(m.stack.fxID);

      if ((m.value as any).status === "done") {
        return {
          type: `✅ [effect] ${name}.done`,
          params: (m.value as any).params!,
          result: (m.value as any).result,
        };
      }
      if ((m.value as any).status === "fail") {
        return {
          type: `❌ [effect] ${name}.fail`,
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
      state.saveStoreUpdate(m);
      return {
        type: `🧳 [store] ${getName(m)}`,
        value: m.value,
      };
    }
    if (isCombineUpdate(m)) {
      state.saveStoreUpdate(m);
      return {
        type: `🥗 [combine] ${getName(m)}`,
        value: m.value,
      };
    }

    // events
    if (isEvent(m) || isSplitEvent(m)) {
      return {
        type: `⭐️ [event] ${getName(m)}`,
        params: m.value,
      };
    }

    // operators
    if (isSample(m)) {
      return {
        type: `⏰ [${m.kind}] ${getName(m)}`,
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
function isEffectInFlight(m: Message) {
  return (
    m.kind === "store" &&
    !m.meta.derived &&
    (m.meta as any)?.named?.endsWith("inFlight")
  );
}
// stores
function isStoreUpdate(m: Message) {
  return m.kind === "store" && !m.meta.derived && !isEffectorInternal(m);
}
function isCombineUpdate(m: Message) {
  return m.kind === "store" && m.meta.isCombine && !isEffectorInternal(m);
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
function createState() {
  const nameToId = {} as Record<string, string>;
  const state = {} as Record<string, unknown>;

  function saveStoreUpdate(m: Message) {
    let name = getName(m);

    if (nameToId[name] && nameToId[name] !== m.id) {
      /**
       * In case of name intersection we add id to the name
       */
      name = `${name} (${m.id})`;
    }

    if (!nameToId[name]) {
      nameToId[name] = m.id;
    }

    state[name] = m.value;
  }

  return {
    state,
    saveStoreUpdate,
  };
}

function getDevTools() {
  const globals = (
    typeof globalThis !== "undefined" ? globalThis : window
  ) as any;
  const devTools = globals.__REDUX_DEVTOOLS_EXTENSION__;

  return devTools;
}
