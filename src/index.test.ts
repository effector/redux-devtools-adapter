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
      ]
    `);
  });
});
