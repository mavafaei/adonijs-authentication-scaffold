'use strict'
const {Command} = use('@adonisjs/ace')
const path = require('path')
const Helpers = use('Adonis/Src/Helpers')
const AuthMail = require('../commands/templates/mail')
const AuthOtp = require('../commands/templates/otp')


//salam
class SetupCommand extends Command {
    /**
     * The command signature getter to define the
     * command name, arguments and options.
     *
     * @attribute signature
     * @static
     *
     * @return {String}
     */
    static get signature() {
        return `auth:setup`
    }

    /**
     * The command description getter.
     *
     * @attribute description
     * @static
     *
     * @return {String}
     */
    static get description() {
        return 'Setup for Authentication Scaffold'
    }

    /**
     * The handle method to be executed
     * when running command
     *
     * @method handle
     *
     * @param  {Object} args
     * @param  {Object} options
     *
     * @return {void}
     */
    async handle({}, {}) {
        let type
        type = await this.choice('Choose type of Authentication', [
            {
                name: 'Email - Signup with email and send verification message.',
                value: 'email'
            },
            {
                name: 'OTP - Sign in with One Time Password',
                value: 'otp'
            }
        ], 0)
        try {
            let authClass
            switch (type) {
                case 'email':
                    authClass = new AuthMail(this)
                    break
                case 'otp':
                    /*let type
                     type = await this.choice('Choose SMS service provider', [
                     {
                     name: 'Kaveh Negar',
                     value: 'kavehnegar'
                     }
                     ], 0)*/
                    authClass = new AuthOtp(this)
                    break
                default:
                    this.error('invalid option')
                    break
            }
        } catch ({message}) {
            if (!this.viaAce) {
                throw error
            }
            this.error(message)
        }
    }
}


module.exports = SetupCommand
