import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fork, allSettled, createEffect, attach } from "effector";

import { buttonClicked } from "../demo-app/counter/model";

import { attachReduxDevTools } from ".";
import { createStore } from "effector";

const init = vi.fn();
const send = vi.fn();
vi.stubGlobal("__REDUX_DEVTOOLS_EXTENSION__", {
  connect: vi.fn(() => ({
    init,
    send,
  })),
});

describe("Redux DevTools Effector adapter", () => {
  afterEach(() => {
    init.mockClear();
    send.mockClear();
  });
  test("should work", async () => {
    const scope = fork();

    attachReduxDevTools({
      name: "Test app",
      scope,
      trace: true,
      stateTab: true,
      batch: false,
    });

    expect(init.mock.calls.length > 0).toBe(true);
    expect(init.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {},
        ],
      ]
    `);

    await allSettled(buttonClicked, { scope });
    await allSettled(buttonClicked, { scope });

    expect(send.mock.calls.length > 0).toBe(true);
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
            "id": "83",
            "loc": {
              "column": 19,
              "file": "/demo-app/counter/model.tsx",
              "line": 102,
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
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "id": "74",
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 71,
            },
            "trace": [
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
            "type": "⏰ [sample] /demo-app/counter/model.tsx:71:0",
            "value": 1,
          },
          {
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "id": "73",
            "loc": {
              "column": 26,
              "file": "/demo-app/counter/model.tsx",
              "line": 70,
            },
            "params": 1,
            "trace": [
              {
                "name": undefined,
                "type": "sample",
                "value": 1,
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
            "type": "⭐️ [event] somethingHappened",
          },
          {
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "$counter": 1,
            "$counter (83)": "pekkek",
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
            "$counter (83)": "pekkek",
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
            "id": "83",
            "loc": {
              "column": 19,
              "file": "/demo-app/counter/model.tsx",
              "line": 102,
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "id": "74",
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 71,
            },
            "trace": [
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
            "type": "⏰ [sample] /demo-app/counter/model.tsx:71:0",
            "value": 2,
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "id": "73",
            "loc": {
              "column": 26,
              "file": "/demo-app/counter/model.tsx",
              "line": 70,
            },
            "params": 2,
            "trace": [
              {
                "name": undefined,
                "type": "sample",
                "value": 2,
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
            "type": "⭐️ [event] somethingHappened",
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
              "line": 89,
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
            "$counter (83)": "kekpek",
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
            "id": "80",
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
            "type": "⏰ [guard] unknown_80",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "id": "75",
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 84,
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
            "$counter (83)": "kekpek",
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
            "id": "81",
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 94,
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
            "type": "⏰ [guard] /demo-app/counter/model.tsx:94:0",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
              "line": 89,
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
            "$counter (83)": "kekpek",
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
            "id": "80",
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
            "type": "⏰ [guard] unknown_80",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "$counter": 2,
            "$counter (83)": "kekpek",
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
            "id": "75",
            "loc": {
              "column": 21,
              "file": "/demo-app/counter/model.tsx",
              "line": 84,
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
            "$counter (83)": "kekpek",
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
            "id": "81",
            "loc": {
              "column": 0,
              "file": "/demo-app/counter/model.tsx",
              "line": 94,
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
            "type": "⏰ [guard] /demo-app/counter/model.tsx:94:0",
            "value": "2_kek",
          },
          {
            "$counter": 2,
            "$counter (83)": "kekpek",
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

  test("attached effect shown correctly", async () => {
    const rootFx = createEffect(() => {
      // ok
    });

    const attachedFx = attach({
      effect: rootFx,
    });

    const anotherLevelAttachFx = attach({
      effect: attachedFx,
    })

    const scope = fork();

    attachReduxDevTools({
      name: "Attached fx",
      scope,
      batch: false,
    });

    await allSettled(anotherLevelAttachFx, { scope });

    expect(send.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {
            "id": "137",
            "loc": {
              "column": 33,
              "file": "/src/index.test.ts",
              "line": 2066,
            },
            "params": undefined,
            "type": "☄️ [effect] anotherLevelAttachFx",
          },
          {},
        ],
        [
          {
            "id": "114",
            "loc": {
              "column": 23,
              "file": "/src/index.test.ts",
              "line": 2062,
            },
            "params": undefined,
            "type": "☄️ [effect] attachedFx",
          },
          {},
        ],
        [
          {
            "id": "91",
            "loc": {
              "column": 19,
              "file": "/src/index.test.ts",
              "line": 2058,
            },
            "params": undefined,
            "type": "☄️ [effect] rootFx",
          },
          {},
        ],
        [
          {
            "id": "92",
            "params": undefined,
            "result": undefined,
            "type": "✅ [effect] rootFx.done",
          },
          {},
        ],
        [
          {
            "id": "115",
            "params": undefined,
            "result": undefined,
            "type": "✅ [effect] attachedFx.done",
          },
          {},
        ],
        [
          {
            "id": "138",
            "params": undefined,
            "result": undefined,
            "type": "✅ [effect] anotherLevelAttachFx.done",
          },
          {},
        ],
      ]
    `);
  });

  test('attach as a function', async () => {
    const attachFnFx = attach({
      source: createStore(0),
      effect: () => {
        // ok
      }
    })

    const scope = fork();

    attachReduxDevTools({
      name: "Attached fx",
      scope,
      batch: false,
    });

    await allSettled(attachFnFx, { scope });

    expect(send.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {
            "id": "168",
            "loc": {
              "column": 23,
              "file": "/src/index.test.ts",
              "line": 2084,
            },
            "params": undefined,
            "type": "☄️ [effect] attachFnFx",
          },
          {},
        ],
        [
          {
            "id": "169",
            "params": undefined,
            "result": undefined,
            "type": "✅ [effect] attachFnFx.done",
          },
          {},
        ],
      ]
    `)
  })
});
