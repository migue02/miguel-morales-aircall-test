# Aircall Test

## Used environment

-   react 17.0.2
-   react-scripts 5.0.1
-   node v16.17.1
-   yarn 1.22.19
-   typescript 4.8.4

## How to start the app

-   **Install dependencies**: npm install
-   **Run the app**: npm run start
-   **Run tests**: npm run test
-   **Run linter**: npm run lint
-   **Run formatter**: npm run format
-   **Run type checker**: npm run typecheck

## Introduction:

This test is about (re) building a small part of Aircall’s main application in which I've used:

-   React
-   [Tractor 🚜](http://tractor.aircall.io/) as Design System
-   Typescript
-   React testing library and Jest

The app is built without using any external library lo handle the app state, I've used a mix of contexts and custom hooks in order to handle the state.
In the next section I will describe each context, custom hooks, pages, components and api implementation I've used.

## [Contexts](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/contexts)

## [Hooks](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/hooks)

## [Pages](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/pages)

## [Components](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/components)

## [API](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/api)

## [Storage](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/storage)

## [Services](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/services)

## Todo

-   Create more tests.
-   Think about more edge cases.
-   Add comments to the code (use the README.md files).
-   Refactor to use some localisation library.
-   Change pusher code to be able to modify the Authorization header without recreating the pusher object (not found how to do it in the docs).
-   Add more features:
    -   Be able to archive more than one call in a row
    -   Add notes to the calls
    -   Add filters for the calls list
-   Add CI/CD
