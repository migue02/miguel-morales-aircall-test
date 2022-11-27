## Pages

### [Login](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/pages/Login)

It renders the login page of the app. This page has:

-   Path: _/login_
-   Form to be able to login in the app
    -   Username field
    -   Password field
    -   Submit button
-   If the login action doesn't work the error status will appear in the UI
-   If the login action works the app will navigate to the calls page (**/**)
-   It uses `useUserContext` from **UserContext** to:
    -   Perform login
    -   Know if the login is successful
    -   Know if the login action is happening

### [Calls](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/pages/Calls)

It renders the login page of the app. This page has:

-   Path: _/_
-   List of calls
    -   Title
    -   Filter ('missed', 'voicemail', 'answered', undefined = show all calls)
    -   List of calls organised per date, showing:
        -   Icon for the type (missed, answered, voicemail or archived)
        -   Depending on the call direction (_inbound_|_outbound_) shows from or to phone number
        -   Duration (hours minutes seconds)
        -   Time (h:mm AM|PM)
        -   Two action buttons:
            -   Archive|Restore:
                -   If the call is archived, Restore button will appear to remove the is_archive flag
                -   If the call is not archived, Archive button will appear to add the is_archive flag
            -   Detail
                -   It will navigate to the CallDetail page (**/:id**)
    -   Pagination section
        -   Current page size
        -   Current page
        -   First and last page
-   It uses `useCallsContext` from **CallsContext** to:
    -   Get the filtered calls list
        -   After getting the calls list it orders it by using the date of the calls from most recent to oldest
    -   Know if the getting calls action is happening
    -   Paginate the calls by using:
        -   currentPage
        -   pageSize
        -   totalCount
    -   Archive/restore calls

### [CallDetail](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/pages/CallDetail)

It renders the login page of the app. This page has:

-   Path: _/:id_
-   Call detail
    -   Icon for the type (missed, answered, voicemail or archived)
    -   Depending on the call direction (_inbound_|_outbound_) shows from or to phone number
    -   Duration (hours minutes seconds)
    -   Time (h:mm AM|PM)
    -   "Call done from" + number (for outbound calls)
    -   "Call done via" + number
    -   "Call done to" + number (for inbound calls)
    -   Call notes
    -   Back button to return to the calls list
-   It uses `useCall` custom hook to:
    -   Get the call information
