import { describe, test, expect, vi } from "vitest";
import { fork, allSettled } from "effector";

import { buttonClicked } from "../demo-app/counter/model";

import { attachReduxDevTools } from ".";

const init = vi.fn();
const send = vi.fn();
vi.stubGlobal("__REDUX_DEVTOOLS_EXTENSION__", {
  connect: vi.fn(() => ({
    init,
    send,
  })),
});

describe("Redux DevTools Effector adapter", () => {
  test("should work", async () => {
    const scope = fork();

    attachReduxDevTools({
      name: "Test app",
      scope,
      trace: true,
    });

    expect(init.mock.calls.length > 0).toBe(true)
    expect(init.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {},
        ],
      ]
    `);

    await allSettled(buttonClicked, { scope });
    await allSettled(buttonClicked, { scope });

    expect(send.mock.calls.length > 0).toBe(true)
    expect(send.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {
            "loc": {
              "column": 29,
              "file": "/demo-app/counter/model.tsx",
              "line": 12,
            },
            "params": undefined,
            "trace": [],
            "type": "⭐️ [event] buttonClicked",
          },
          {},
        ],
        [
          {
            "loc": {
              "column": 24,
              "file": "/demo-app/counter/model.tsx",
              "line": 13,
            },
            "trace": [
              {
                "name": undefined,
                "type": "on",
                "value": 1,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🧳 [store] $counter",
            "value": 1,
          },
          {
            "$counter": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 13,
              "file": "/demo-app/counter/model.tsx",
              "line": 31,
            },
            "trace": [
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 1,
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 1,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 1,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🥗 [combine] $ref",
            "value": {
              "count": 1,
            },
          },
          {
            "$counter": 1,
            "$ref": {
              "count": 1,
            },
          },
        ],
        [
          {
            "trace": [
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 1,
                  "ref": {
                    "count": 1,
                  },
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 1,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 1,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🥗 [combine] combine($counter, $ref)",
            "value": {
              "count": 1,
              "ref": {
                "count": 1,
              },
            },
          },
          {
            "$counter": 1,
            "$ref": {
              "count": 1,
            },
            "combine($counter, $ref)": {
              "count": 1,
              "ref": {
                "count": 1,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 29,
              "file": "/demo-app/counter/model.tsx",
              "line": 12,
            },
            "params": undefined,
            "trace": [],
            "type": "⭐️ [event] buttonClicked",
          },
          {
            "$counter": 1,
            "$ref": {
              "count": 1,
            },
            "combine($counter, $ref)": {
              "count": 1,
              "ref": {
                "count": 1,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 24,
              "file": "/demo-app/counter/model.tsx",
              "line": 13,
            },
            "trace": [
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🧳 [store] $counter",
            "value": 2,
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 1,
            },
            "combine($counter, $ref)": {
              "count": 1,
              "ref": {
                "count": 1,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 13,
              "file": "/demo-app/counter/model.tsx",
              "line": 31,
            },
            "trace": [
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🥗 [combine] $ref",
            "value": {
              "count": 2,
            },
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 1,
              "ref": {
                "count": 1,
              },
            },
          },
        ],
        [
          {
            "trace": [
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 2,
                  "ref": {
                    "count": 2,
                  },
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🥗 [combine] combine($counter, $ref)",
            "value": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 33,
            },
            "trace": [
              {
                "name": "$ref → *",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "map",
                "value": 2,
              },
              {
                "name": "$ref",
                "type": "store",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "⏰ [sample] /demo-app/counter/model.tsx:33:0",
            "value": 2,
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 25,
              "file": "/demo-app/counter/model.tsx",
              "line": 15,
            },
            "params": 2,
            "trace": [
              {
                "name": undefined,
                "type": "sample",
                "value": 2,
              },
              {
                "name": "$ref → *",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "map",
                "value": 2,
              },
              {
                "name": "$ref",
                "type": "store",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "☄️ [effect] someSideEffectFx",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
          },
        ],
        [
          {
            "loc": {
              "column": 26,
              "file": "/demo-app/counter/model.tsx",
              "line": 27,
            },
            "params": 2,
            "trace": [
              {
                "name": undefined,
                "type": "sample",
                "value": 2,
              },
              {
                "name": "$ref → *",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "map",
                "value": 2,
              },
              {
                "name": "$ref",
                "type": "store",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": undefined,
                "type": "combine",
                "value": {
                  "count": 2,
                },
              },
              {
                "name": "$counter",
                "type": "store",
                "value": 2,
              },
              {
                "name": undefined,
                "type": "on",
                "value": 2,
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "☄️ [effect] someOtherEffectFx",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "params": 2,
            "result": 2,
            "trace": [],
            "type": "✅ [effect] someOtherEffectFx.done",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 1,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 45,
            },
            "trace": [
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [sample] sampledEvent",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 10,
              "file": "/demo-app/counter/model.tsx",
              "line": 55,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] a",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 75,
            },
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "[forward]",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [guard] unknown_78",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 10,
              "file": "/demo-app/counter/model.tsx",
              "line": 56,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "forward",
                "value": "2_kek",
              },
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] b",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 70,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] cases.aaa",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 80,
            },
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [guard] /demo-app/counter/model.tsx:80:0",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "params": 2,
            "result": 2,
            "trace": [],
            "type": "✅ [effect] someSideEffectFx.done",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 1,
          },
        ],
        [
          {
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 45,
            },
            "trace": [
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [sample] sampledEvent",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "loc": {
              "column": 10,
              "file": "/demo-app/counter/model.tsx",
              "line": 55,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] a",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 75,
            },
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "[forward]",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [guard] unknown_78",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "loc": {
              "column": 10,
              "file": "/demo-app/counter/model.tsx",
              "line": 56,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "forward",
                "value": "2_kek",
              },
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] b",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 70,
            },
            "params": "2_kek",
            "trace": [
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⭐️ [event] cases.aaa",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
        [
          {
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 80,
            },
            "trace": [
              {
                "name": "a",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": undefined,
                "type": "split",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "event",
                "value": "2_kek",
              },
              {
                "name": "sampledEvent",
                "type": "sample",
                "value": "2_kek",
              },
              {
                "name": "merge(done, done)",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "merge",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "done",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": undefined,
                "type": "filterMap",
                "value": {
                  "params": 2,
                  "result": 2,
                },
              },
              {
                "name": "finally",
                "type": "event",
                "value": {
                  "params": 2,
                  "result": 2,
                  "status": "done",
                },
              },
            ],
            "type": "⏰ [guard] /demo-app/counter/model.tsx:80:0",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$ref": {
              "count": 2,
            },
            "combine($counter, $ref)": {
              "count": 2,
              "ref": {
                "count": 2,
              },
            },
            "someOtherEffectFx.inFlight": 0,
            "someSideEffectFx.inFlight": 0,
          },
        ],
      ]
    `);
  });
});
