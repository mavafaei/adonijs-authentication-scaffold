"use strict"
const Env = use('Env')
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
     | Sms Service Provider
     |--------------------------------------------------------------------------
     |
     | Specifies the service provider to handle send SMS to phone number.
     |
     */
    smsProvider: "kavehnegar",
    /*
     |--------------------------------------------------------------------------
     | Send Code Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to handle send otp POST request.
     |
     */
    sendCodeRoute: "/sendCode",
    /*
     |--------------------------------------------------------------------------
     | Verification Route
     |--------------------------------------------------------------------------
     |
     | Specifies the route to handle Verification GET requests.
     |
     */
    verificationRoute: "/verifyCode",
    /*
     |--------------------------------------------------------------------------
     | Kavenegar Sms Provider info
     |--------------------------------------------------------------------------
     |
     |
     */
    kavenegar: {
        baseURI: 'https://api.kavenegar.com/v1/',
        API_KEY: '',
        template: ''
    },
}
