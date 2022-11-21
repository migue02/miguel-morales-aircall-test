## Services

Folder to add all different services uses in the app.

In this case we only will use the Pusher service which allows us to create a new Pusher form `pusher-js` to be able to provide realtime communication between a server and the app by subscribing to channels.

### [Pusher](https://github.com/migue02/miguel-morales-aircall-test/tree/main/src/services/Pusher)

It has a `Pusher` object that will be the one returned in the `getPusher` function so we always use the same variable.

It exports the `getPusher` function which returns a `Pusher` object fully created and configured.

This function has an optional parameter `token` (used in the Authorization header).

-   If the token parameter is provided, the `Pusher` object is recreated using this new token.
-   If the token parameter is not provided it will return the `pusher` variable
-   If pusher object wasn't initialise (is undefined) it will create a new `Pusher`
