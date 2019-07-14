"use strict"
const Config = use("Config")
/*
 |--------------------------------------------------------------------------
 | API Auth Routes
 |--------------------------------------------------------------------------
 |
 | Http routes are entry points to your web application. You can create
 | routes for different URL's and bind Controller actions to them.
 |
 | A complete guide on routing is available here.
 | http://adonisjs.com/docs/4.1/routing
 |
 */
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route")
const sendCodeRoute = Config.get("adonis-otp-config.sendCodeRoute")
const verificationRoute = Config.get("adonis-otp-config.verificationRoute")
Route.post(`api/v1${sendCodeRoute}`, "OtpController.sendCode")
Route.post(`api/v1${verificationRoute}`, "OtpController.verifyCode")
