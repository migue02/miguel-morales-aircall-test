## Hooks

### [useCall](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/hooks/useCall)

Hook to be able to get a call from the backend by its call id. It uses ReactQuery to have a better behaviour.
It returns a duple of a Call and a boolean:

-   **call**: _undefined | Call_
    -   _undefined_: default value. When the request didn't happen or it's processing
    -   _call_ of the given id: when the request is done and ok

*   **loading**: _boolean_
    -   **True** when a the request to get the call is happening
    -   **False** default value. When the request to get the call is finished or still didn't happen

#### How to use it

`const [call, loading] = useCall(id);`

### [useHandleError](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/hooks/useHandleError)

Hook to be able to handle an error sent from the backend.
It returns an array of 1 length of a Call and a boolean:

-   **handleError**: _function_
    -   Accepts an error (_unknown_)
    -   It checks what's inside the error and depending on the error type it take some actions.
    -   If the error:
        -   Is instanceof **Error** and _error.cause_ exists:
            -   If error.cause is **ERROR_NOT_LOGGED_CODE**
                -   Clear all items in the localStorage related to the user
                -   Navigate to the login page
            -   If error.cause is **ERROR_NOT_NOT_FOUND_CODE**
                -   Display the error message using a Toast
                -   Navigate to the home page
            -   If the error is **ERROR_NOT_BAD_REQUEST_CODE**
                -   Display the error message using a Toast

#### How to use it

```
const [handleError] = useHandleError();
try {
    const result = await doSometing();
    // It worked!
} catch (error) {
    // It didn't work...
    handleError(error);
}
```

### [useArchiveMutation](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/hooks/useArchiveMutation)

Hook to be able achive a call by using useMutation from ReactQuery.

-   Needs two parameters to be able to use and invalidate the proper query:

    -   currentPage: _number_
    -   pageSize: _number_

It does an optimistic update by following these steps:

-   Call `archiveCall` from the api
-   In the `onMutate` callback
    -   Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    -   Snapshot the previous calls
    -   Optimistically update the calls array with switching `is_archived` prop for the selected call
    -   Return the previous calls
-   In the `onSettled` callback
    -   Invalidate the query which has this call in it
-   In the `onError` callback
    -   Use the context with the previous calls returned from onMutate to roll back

It returns a function which needs the call id.

#### How to use it

`const archiveMutation = useArchiveMutation(currentPage, pageSize);`
`archiveMutation(id)`
