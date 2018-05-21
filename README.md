# SocketIO-jwt demo

- This socket authentication demo is developed based on the [socketio-jwt](https://github.com/auth0-community/socketio-jwt).
- The JWT token is passed from the client side while establishing connection.
On the server side, the token will be validated and connection will be established for a valid token.

- Start the server and Go to localhost:3000.
- Login with any username/password. It will create a jwt token and will be passed for socket authentication.