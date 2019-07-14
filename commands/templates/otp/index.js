const Base = require('../Base')
const path = require('path')
const Helpers = use('Adonis/Src/Helpers')


class Otp {
    constructor(command) {
        this.command = command
        this.generatedRoutesFilename = 'OtpAuthRoutes.js'
        this.base = new Base()
        this.run()
    }

    async run() {
        try {
            /**
             * Ensures the command is executed within the project root
             * */
            await this.base._ensureInProjectRoot()
            /**
             * Prepends a line of text to a provided file
             * */
            let routesFilePath = path.join(Helpers.appRoot(), 'start/routes.js')
            await this.base._prependLineToFile({
                filename: routesFilePath,
                lineNumber: 2,
                lineContent: `require('./${this.generatedRoutesFilename}')`
            })
            await this._copyFiles()
        } catch (e) {
            this.command.error(e)
        }
    }

    async _copyFiles() {
        await this.copyAppStarterFiles()
        await this.copyConfig()
        await this.copyApiOtpController()
        await this.copyMigrationAndModel()
        await this.copySmsProviders()
    }

    /**
     * Creates the app starter files available at app/start.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyAppStarterFiles(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Starter Files`)
            await this.command.copy(
                path.join(__dirname, this.generatedRoutesFilename),
                path.join(Helpers.appRoot(), `start/${this.generatedRoutesFilename}`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create start/${this.generatedRoutesFilename}`))
        } catch (error) {
            this.command.error(error)
        }
    }

    /**
     * Creates the Config.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyConfig(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Configs.`)
            await this.command.copy(
                path.join(__dirname, 'adonis-otp-config.js'),
                path.join(Helpers.configPath(), `adonis-otp-config.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create config/adonis-otp-config.js`))
        } catch (error) {
            this.command.error(error)
        }
    }

    /**
     * Creates the Auth Controller.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyApiOtpController(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Authentication Controller.`)
            await this.command.copy(
                path.join(__dirname, 'OtpController.js'),
                path.join(Helpers.appRoot(), `app/Controllers/Http/OtpController.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create app/Controllers/HTTP/OtpController.js`))
        } catch (error) {
            this.command.error(error)
        }
    }

    /**
     * Creates the User Migration and Model.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyMigrationAndModel(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Migrations`)
            await this.command.copy(
                path.join(__dirname, 'create_users_table.js'),
                path.join(Helpers.migrationsPath(), `${new Date().getTime()}_create_users_table.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create database/migrations/create_users_table.js`))
        } catch (error) {
            this.command.error(error)
        }
    }

    /**
     * Creates the Auth Controller.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copySmsProviders(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Sms Providers.`)
            await this.command.copy(
                path.join(__dirname, 'SmsProviders.js'),
                path.join(Helpers.appRoot(), `app/Services/Otp/SmsProviders.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create app/Services/Otp/SmsProviders.js`))
        } catch (error) {
            this.command.error(error)
        }
    }
}


module.exports = Otp