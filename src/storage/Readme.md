## Storage

Used to store the data added to the localStorage in the app:

### Items

-   ACCESS_TOKEN
-   REFRESH_TOKEN
-   USER

### clearItems

Remove all items stored in the localStorage

### updateTokens

Update ACCESS_TOKEN and REFRESH_TOKEN with the given parameters

### getAccessToken & setAccessToken

Used to get and set the ACCESS_TOKEN (used for Authorization header)

### getRefreshToken & setRefreshToken

Used to get and set the REFRESH_TOKEN (used for Authorization header when we want to refresh the ACCESS_TOKEN)

### setRefreshToken & setUser

Used to get and set the USER data (id and username)
