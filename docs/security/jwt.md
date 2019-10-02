JSON Web Token

A JSON Web Token, or JWT, is an open standard (RFC 7519) for transferring data (more specifically called claims or assertions) securely between two parties in a JSON payload. JWTs are digitally signed and a great mechanism for implementing **stateless** authentication.

Don't put any sensitive information in the JWT payload!

If you store JWT in local storage then you are succeptible to XSS attacks (someone could pull that token out of your local storage and initiate requests in the name of a user). If you store the token in a cookie, then you are vulnerable to CSRF attacks because basically a cookie is sent over to the server in every request. Another attack vector exploitable for JWTs is Man-in-the-middle, but you should always send your tokens over HTTPS anyway.

There is no way to "revoke" a token, so the options you have in case you need to block a specific use are:
- implement a blacklisting strategy and every time there is a request check if the token in added to that blacklist
- maybe another option is to not care about the auth token, but to revoke a user's permissions. This option sounds more natural to me as the 2 concerns (authentication vs authorization) are more clearly separated. But what you need here is to check the permissions on every request rather than putting those permissions into the token itself.

Other important things to read more in depth about:
- Refresh tokens (should be kept on server, not sure how that is implemented)
- JWT and OAuth2.0 and OIDC
- Revoking access and checking permissions