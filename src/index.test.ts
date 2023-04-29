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
            "id": "2",
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
            "id": "4",
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
            "id": "81",
            "loc": {
              "column": 19,
              "file": "/demo-app/counter/model.tsx",
              "line": 88,
            },
            "trace": [
              {
                "name": undefined,
                "type": "on",
                "value": "pekkek",
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🧳 [store] $counter",
            "value": "pekkek",
          },
          {
            "$counter": "pekkek",
          },
        ],
        [
          {
            "id": "55",
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
            "$counter": "pekkek",
            "$ref": {
              "count": 1,
            },
          },
        ],
        [
          {
            "id": "63",
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
            "$counter": "pekkek",
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
            "id": "2",
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
            "$counter": "pekkek",
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
            "id": "4",
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
            "id": "81",
            "loc": {
              "column": 19,
              "file": "/demo-app/counter/model.tsx",
              "line": 88,
            },
            "trace": [
              {
                "name": undefined,
                "type": "on",
                "value": "kekpek",
              },
              {
                "name": "buttonClicked",
                "type": "event",
                "value": undefined,
              },
            ],
            "type": "🧳 [store] $counter",
            "value": "kekpek",
          },
          {
            "$counter": "kekpek",
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
            "id": "55",
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
            "$counter": "kekpek",
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
            "id": "63",
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
            "$counter": "kekpek",
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
            "id": "60",
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
            "$counter": "kekpek",
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
            "id": "8",
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
            "$counter": "kekpek",
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
            "id": "31",
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
            "$counter": "kekpek",
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
            "id": "32",
            "params": 2,
            "result": 2,
            "trace": [],
            "type": "✅ [effect] someOtherEffectFx.done",
          },
          {
            "$counter": "kekpek",
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
            "id": "69",
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
            "$counter": "kekpek",
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
            "id": "70",
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
            "$counter": "kekpek",
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
            "id": "77",
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
            "$counter": "kekpek",
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
            "id": "78",
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
            "$counter": "kekpek",
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
            "id": "71",
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
            "$counter": "kekpek",
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
            "id": "73",
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
            "$counter": "kekpek",
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
            "id": "79",
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
            "$counter": "kekpek",
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
            "id": "9",
            "params": 2,
            "result": 2,
            "trace": [],
            "type": "✅ [effect] someSideEffectFx.done",
          },
          {
            "$counter": "kekpek",
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
            "id": "69",
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
            "$counter": "kekpek",
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
            "id": "70",
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
            "$counter": "kekpek",
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
            "id": "77",
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
            "$counter": "kekpek",
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
            "id": "78",
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
            "$counter": "kekpek",
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
            "id": "71",
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
            "$counter": "kekpek",
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
            "id": "73",
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
            "$counter": "kekpek",
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
            "id": "79",
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
            "$counter": "kekpek",
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
