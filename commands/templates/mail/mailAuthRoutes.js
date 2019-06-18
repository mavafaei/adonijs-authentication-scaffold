"use strict";
const Config = use("Config");
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
const Route = use("Route");
const loginRoute = Config.get("adonis-auth-config.loginRoute");
const registerRoute = Config.get("adonis-auth-config.registrationRoute");
const passwordResetRoute = Config.get(
    "adonis-auth-config.passwordResetRoute"
);
Route.post(`api/v1${loginRoute}`, "AuthController.login");
Route.post(`api/v1${registerRoute}`, "AuthController.register");
Route.post(`api/v1${passwordResetRoute}`, "AuthController.forgotPassword");
