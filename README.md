# redux-devtools-adapter

Simple adapter to connect Effector's Inspect API to Redux DevTools, extracted from the old `effector-logger` project.

Work in progress, package is not available in the npm yet.

## Installation

```sh
yarn add -D @effector/redux-devtools-adapter
```

## Usage

```ts
import { attachReduxDevTools } from "@effector/redux-devtools-adapter";

attachReduxDevTools({
  name: "Name of your app, will be visible in the Redux DevTools",
  scope,
  /**
   * ☝️ (optional) effector's Scope, if you use it
   *
   * @see https://effector.dev/docs/api/effector/scope/
   * @see https://dev.to/effector/the-best-part-of-effector-4c27
   */
  trace: true,
  /**
   * ☝️ enables traces of effector's calculations for every log. `false` by default
   */
  timeTravel,
  /**
   *  ☝️ enables Redux DevTools time travel integration.
   * Works only with scope provided, does not work for "scope-less" apps.
   */
  devToolsConfig,
  /**
   *
   * Redux DevTools extension config
   *
   * @see https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md
   */
});
```

## Release process

1. Check out the [draft release](https://github.com/effector/redux-devtools-adapter/releases).
1. All PRs should have correct labels and useful titles. You can [review available labels here](https://github.com/effector/redux-devtools-adapter/blob/main/.github/release-drafter.yml).
1. Update labels for PRs and titles, next [manually run the release drafter action](https://github.com/effector/redux-devtools-adapter/actions/workflows/release-drafter.yml) to regenerate the draft release.
1. Review the new version and press "Publish"
1. If required check "Create discussion for this release"

