"use strict";
const Env = use('Env');
module.exports = {
    HttpResponse: {
        ok: 200,
        not_content: 204,
        forbidden: 403,
        bad_request: 400,
        unauthorized: 401,
        not_found: 404,
        server_error: 500,
        conflict: 409,
        not_processable: 422
    },
    /*
     |--------------------------------------------------------------------------
     | Registration Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to handle registration GET and POST requests.
     |
     */
    registrationRoute: "/register",
    /*
     |--------------------------------------------------------------------------
     | Registration Success Redirect Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to redirect the user to upon successful registration.
     | Leave empty if you do not want any redirects.
     |
     */
    registrationSuccessRedirectTo: "/auth/dashboard",
    /*
     |--------------------------------------------------------------------------
     | Login Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to handle login GET and POST requests.
     |
     */
    loginRoute: "/login",
    /*
     |--------------------------------------------------------------------------
     | Password Reset Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to handle password reset GET and POST requests.
     |
     */
    passwordResetRoute: "/password/reset",
};