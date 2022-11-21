## Hooks

### [useCall](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/hooks/useCall)

Hook to be able to get a call from the backend by its call id.
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
