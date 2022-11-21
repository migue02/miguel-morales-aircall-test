### Components

#### CallComponent

-   It receives:
    -   call: _Call_
        -   Call to be rendered
    -   goToDetail: _function_
        -   Action when the Details button is clicked
    -   archive: _function_
        -   Action when the Archive|Restore button is clicked
-   It renders:
    -   CallHeader but wraps it in a flex component with extra styles to be used in the Calls page

#### CallHeader

-   It receives:
    -   call: _Call_
        -   Call to be rendered
    -   goToDetail: _function_
        -   Action when the Details button is clicked
        -   As it's optional, if it's not passed the Details button is not rendered
    -   archive: _function_
        -   Action when the Archive|Restore button is clicked
        -   As it's optional, if it's not passed the Archive|Restore button is not rendered
-   It renders:
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

#### CallBody

-   It receives:
    -   call: _Call_
        -   Call to be rendered
-   It renders:
    -   "Call done from" + number (for outbound calls)
    -   "Call done via" + number
    -   "Call done to" + number (for inbound calls)
    -   Call notes

#### CallIcon

-   It receives:
    -   icon: _CallType | CallDirection | 'archive'_
        -   Icon to be rendered
-   It renders:
    -   icon === 'answered' => `<AnsweredOutboundFilled />`
    -   icon === 'missed' => `<MissedInboundFilled />`
    -   icon === 'voicemail' => `<VoicemailOutlined />`
    -   icon === 'inbound' => `<InboundOutlined />`
    -   icon === 'outbound' => `<OutboundOutlined />`
    -   icon === 'archive' => `<ArchiveFilled />`

#### CallNotes

-   It receives:
    -   notes: _Note[]_
        -   Array of notes to render
-   It renders:
    -   The list of notes using the accordion component
