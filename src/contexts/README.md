## Contexts

### [UserContext](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/contexts/UserContext 'UserContext')

Context created to handle user information and useful functions:

-   **username**: _string_
    -   username of the logged user
    -   empty string if user is not logged in
    -   Updated when a new user performs a login action
-   **loggedIn**: _boolean_
    -   True|False depending if the user is logged or not
-   **loading**: _boolean_
    -   **True** when a login action or when a refreshing token action is happening
    -   **False** when a login action or when a refreshing token action is finished
-   **login**: _function_
    -   Performs a login given an username and a password
-   **refreshToken**: _function_
    -   Refresh the accessToken using the refreshToken

#### How to use it

1. You will have to wrap your app using **UserProvider** where you want to use **UserContext**
2. In order to actually use it this is how you need to call it:
    - `const { username, loading, loggedIn, login, refreshToken } = useUserContext();`
    - Example: [link](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/pages/Login/index.tsx#L22)

### [CallsContext](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/contexts/CallsContext 'CallsContext')

Context created to handle user information and useful functions:

-   **calls**: _[CallsDictionary](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/contexts/CallsContext/types.ts#L4)_
    -   Subset of calls retrieved form the backend
    -   Updated when a new calls request is done (to get a new page)
    -   The data structure of this dictionary is this one:
        -   {[date as string]: array of calls}
        -   Example:
    -   Could be filtered by using the filter state

It uses ReactQuery in order to improve the way of loading calls and also archiving calls by using optimistic update.

```json
{
    "2022-11-16": [
        {
            "id": "dd3dca23-7a79-4b2e-a139-c7e6c1e5a599",
            "duration": 859,
            "is_archived": false,
            "from": "+33172762342",
            "to": "+33115101456",
            "direction": "inbound",
            "call_type": "missed",
            "via": "+33167541097",
            "created_at": "2022-11-16T23:59:07.500Z",
            "notes": []
        }
    ],
    "2022-11-18": [
        {
            "id": "dd3dca23-7a79-4b2e-a139-c7e6c1e5a588",
            "duration": 85,
            "is_archived": true,
            "from": "+33175762342",
            "to": "+33115171456",
            "direction": "inbound",
            "call_type": "voicemail",
            "via": "+33167543097",
            "created_at": "2022-11-18T23:59:07.500Z",
            "notes": []
        },
        {
            "id": "dd3dca23-7a79-4b2e-a139-c7e6c1e5a577",
            "duration": 59,
            "is_archived": false,
            "from": "+33172768342",
            "to": "+33115101446",
            "direction": "outbound",
            "call_type": "answered",
            "via": "+33167541096",
            "created_at": "2022-11-18T20:59:07.500Z",
            "notes": [
                {
                    "id": "6c875652-f460-446b-837d-6a5e446c6efd",
                    "content": "Ea qui sit voluptatem odit modi."
                }
            ]
        }
    ]
}
```

-   **currentPage**: _number_
    -   Current page
-   **pageSize**: _number_
    -   Size of each page
-   **totalCount**: _number_
    -   Total calls in the backend
-   **loadingCalls**: _boolean_
    -   **True** when a calls request is happening
    -   **False** when there isn't any calls request happening
-   **changePage**: _function_
    -   Change the current page
    -   Triggers a new calls request using the new page number
-   **chagePageSize**: _function_
    -   Change the current page size
    -   Triggers a new calls request using the new page size
-   **archiveCall**: _function_
    -   Archive a call with a given id call
-   **setFilter**: _function_
    -   Update the filter. It accepts ('missed', 'voicemail', 'answered', undefined = show all calls)

#### How to use it

1. You will have to wrap your app using **CallsProvider** where you want to use **CallsContext**
2. In order to actually use it this is how you need to call it:
    - `const { loadingCalls, calls, currentPage, pageSize, totalCount, changePage, chagePageSize, archiveCall, setFilter } = useCallsContext();`
    - Example: [link](https://github.com/migue02/miguel-morales-aircall-test/blob/main/src/pages/Calls/index.tsx#L17)
