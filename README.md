![AdonisJs Authentication Scaffold Logo](https://i.ibb.co/V9CvcGV/Adonis-Auth-Scaffold-Logo.png)

# AdonisJs Authentication Scaffold.
AdonisJs Authentication generates different Rest APIs structures using AdonisJs CLI.

## Index

- [Introduction](#introduction)
    - [Email Authentication](#Email)  
- [Getting Started](#getting-started)


## Introduction
this package contains Email, OTP, etc.

### Email
Email authentication has following steps:

####Register
* insert email and password in register route, you'll receive and activation email.
* for validating your account, click on activation link.

####Login
* insert email and password in login route, if user is active it returns Jwt token.

####Forgot Password
* insert email in forgot password route, an email with code send for change password.

####change password
* insert mail, code (from forget password email) and new password to change user password.

#### Directory Structure

```
app
└── Controllers
    └── HTTP
        ├── AuthController.js
└── Models
    ├── User.js
config
    ├── adonis-auth-config.js
database
    └── migrations
        ├── create_users_table.js
resources
    └── views
        └── auth
            └── emails
                ├── verification.edge
                ├── forgotPassword.edge
start
    ├── authEvents.js
    ├── mailAuthRoutes.js
```

## Getting Started

### Installation

Install `adonisJs-authentication-scaffold` by running the below command.

__NPM__

```bash
npm install adonisJs-authentication-scaffold --save-dev
npm install @adonisjs/mail @adonisjs/validator
```

### Register providers.

The `adonisJs-authentication-scaffold` provider must be registered as an `aceProvider`.

```js
const aceProviders = [
  'adonisJs-authentication-scaffold/providers/CommandsProvider'
];
```

Also add providers for the newly installed dependencies.

```js
const providers = [
  "@adonisjs/validator/providers/ValidatorProvider",
  "@adonisjs/mail/providers/MailProvider"
]
```

### Generating authentication scaffold.
 

Please run the below command to scaffold authentication.

```js
adonis auth:setup
```

A prompt to choose type of Authentication

##Events
Please add the following line at the beginning of start/events.js.

require('./authEvents');

##Migrations
Run the following command to run startup migrations. Please remember remove old User migration and model, package generates thees files.

adonis migration:run

##Postman
https://www.getpostman.com/collections/7af699527fe1425a4fe0