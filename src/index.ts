import { Message, inspect } from "effector/inspect";
import type { Node, Scope } from "effector";

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
let id = 0;
const getId = () => `effector_${id++}`;

export function attachReduxDevTools({
  scope,
  name,
  trace,
  devToolsConfig,
  timeTravel,
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
   * Supports Redux DevTools Extension's time-travel
   *
   * Works only with `scope` provided. Maybe buggy or not even work at all.
   */
  timeTravel?: boolean;
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
  if (!devTools) return fallback();

  const id = getId();
  const state = {};
  const controller = devTools.connect({
    name: getInstanceName(name),
    instanceId: id,
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

        if (timeTravel && scope) {
          saveTimeTravelData(scope, state);
        }

        controller.send(act, { ...state });
      }
    },
  });

  const unTimeTravel = attachTimeTravel(controller, scope, timeTravel, id);

  return () => {
    unTimeTravel();
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

function createReporter(state: Record<string, unknown>) {
  return (m: Message): Record<string, unknown> | void => {
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
      saveStoreUpdate(state, m);
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
      saveStoreUpdate(state, m);
      return {
        type: `🧳 [store] ${getName(m)}`,
        value: m.value,
      };
    }
    if (isCombineUpdate(m)) {
      saveStoreUpdate(state, m);
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
        type: `⏰ [${m.kind}] ${getSampleName(m)}`,
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

// time-travel
/**
 * Expiremental time-travel feature, works only for Scopes
 */
const STATE_KEY = "__effector_time_travel_state__";
function attachTimeTravel(
  devToolsController: any,
  scope?: Scope,
  enabled?: boolean,
  /**
   * Redux devtools sends all messages from all instances into all `subscribe` callbacks.
   *
   * To avoid accidental mixing of different instances we need to check for instanceId first.
   */
  instanceId?: string
): () => void {
  if (!enabled) return () => {};
  if (!scope) {
    console.error(
      "Redux DevTools Time travel works only for Effector's Scopes"
    );
    return () => {};
  }

  const debouncedScopeUpdate = debounce((messageState: any) => {
    const state = JSON.parse(messageState)[STATE_KEY];
    if (state) {
      HACK_injectOldReg(scope, state);
    }
  }, 100);
  const unsub = devToolsController.subscribe((message: any) => {
    if (message.id === instanceId) {
      if (
        message.type === "DISPATCH" &&
        message.payload?.type === "JUMP_TO_ACTION"
      ) {
        debouncedScopeUpdate(message.state);
      }
    }
  });

  return () => {
    unsub();
  };
}

function saveTimeTravelData(scope: Scope, state: Record<string, unknown>) {
  const reg = {
    ...(scope as any).reg,
  };

  state[STATE_KEY] = reg;
}

function HACK_injectOldReg(scope: Scope, reg: any) {
  (scope as any).reg = reg;

  HACK_rerunSubscribers(scope);
}

function HACK_rerunSubscribers(scope: Scope) {
  const linkOwners = (scope as any).additionalLinks;

  Object.values(linkOwners).forEach((links: any) => {
    links.forEach((link: any) => {
      const node = link as Node;
      console.log(node);
      // @ts-expect-error
      node.seq[1].data?.fn();
    });
  });
}

function debounce(cb: (...args: any[]) => void, ms: number) {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, ms);
  };
}
