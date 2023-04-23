import { inspect } from "effector/inspect";
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

  const fxIdMap: Record<string, string> = {};

  const { state, set } = createState();

  const controller = devTools.connect({
    name: getInstanceName(name),
    ...devToolsConfig,
  });

  controller.init(state);

  const uninspect = inspect({
    scope,
    trace,
    fn: (m) => {
      if (m.kind === "store" && !m.meta.derived) {
        set(`${m.id}_${m.name}`, m.value);
      }

      if (m.kind === "effect") {
        // @ts-expect-error
        fxIdMap[m.stack.fxID as string] = m.name;
        controller.send(
          {
            type: `[${m.kind}] ${m.name}`,
            params: m.value,
            callId: m.stack.fxID,
          },
          state
        );
      } else if (m.kind === "event" && m.meta.named === "finally") {
        const parentName = fxIdMap[m.stack.fxID as string];
        controller.send(
          {
            type: `[${m.kind}] ${parentName}.${m.name}`,
            params: (m.value as any).params,
            status: (m.value as any).status,
            result: (m.value as any).result,
            callId: m.stack.fxID,
          },
          state
        );
      } else {
        controller.send(
          {
            type: `[${m.kind}] ${m.name}`,
            value: m.value,
          },
          state
        );
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

function createState() {
  const state: Record<string, unknown> = {};
  function set(key: string, value: unknown) {
    state[key] = value;
  }

  return {
    state,
    set,
  };
}
