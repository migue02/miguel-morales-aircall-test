## API

Implementation for the API used in the app. It contains these functions:

### request

-   It receives:
    -   url: Request URL
    -   method: 'GET' | 'POST' | 'PUT'
    -   _parameters_: Parameters (Optional)
        -   It will be only used for POST requests
    -   _fromRefresh_: boolean (Optional)
        -   Used to know if a failing request returning a 401 (Unauthorized) should perform a refreshToken automatically
            -   If the request returns the 401 (Unauthorized) error and fromRefresh is false, do a refresh token
            -   If the request returns the 401 (Unauthorized) error and fromRefresh is true (because the error was sent from the refreshToken function), return the proper error
-   It returns:
    -   Promise with a given response type

### handleError

-   It receives:
    -   Failing response
-   It returns:
    -   It gets the JSON from the response and checks:
        -   If the error is 401 (Unauthorized) and the request is not the refreshToken return the ERROR_NOT_LOGGED_CODE error
        -   If the error is different than 401 (Unauthorized) return error from backend or error by code

### getHeaders

-   It receives:
    -   _fromRefresh_: boolean (Optional)
        -   If true use refresh_token as Authorization header
        -   If false use access_token as Authorization header
-   It returns
    -   Header object to use in the requests with `'Content-Type', 'application/json'` and `'Authorization', Bearer ${authToken}`

### get

It calls to the `request` function with the proper GET params.

### put

It calls to the `request` function with the proper PUT params.

### post

It calls to the `request` function with the proper POST params.

### refreshToken (exported)

It calls to the **REFRESH_TOKEN_ENDPOINT** to refresh the Authorization token

### isLogged (exported)

It calls to the **ME_ENDPOINT** to get the logged user and returns a `Promise<boolean>` to know if there is a logged user.

### login (exported)

It calls to the **LOGIN_ENDPOINT** to perform a login using the username and password parameters, and it returns `Promise<IAuthResponse>` with the logged user, the access_token and the refresh_token.

### getCalls (exported)

It calls to the **CALLS_ENDPOINT** to get a calls list using the offset and the limit parameters to get the desired subset of calls, and it returns `Promise<ICallsResponse>` with the calls, the totalCount and if there is a next page.

### getCall (exported)

It calls to the **CALLS_ENDPOINT** with an **id** to get the detail of one call, and it returns `Promise<Call>` with the call.

### archiveCall (exported)

It calls to the **CALLS_ENDPOINT** with an **id** and the **ARCHIVE_ENDPOINT** to change the is_archive value of the call with the used id, and it returns `Promise<Call>` with the same call.
