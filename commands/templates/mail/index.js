const Base = require('../Base')
const path = require('path')
const Helpers = use('Adonis/Src/Helpers')


class Mail {
    constructor(command) {
        this.command = command
        this.generatedRoutesFilename = 'mailAuthRoutes.js'
        this.base = new Base()
        this.run()
    }

    async run() {
        try {
            /**
             * Ensures the command is executed within the project root
             * */
            await this.base._ensureInProjectRoot();
            /**
             * Prepends a line of text to a provided file
             * */
            let routesFilePath = path.join(Helpers.appRoot(), 'start/routes.js');
            await this.base._prependLineToFile({
                filename: routesFilePath,
                lineNumber: 2,
                lineContent: `require('./${this.generatedRoutesFilename}');`
            })
            await this._copyFiles();
        } catch (e) {
            this.command.error(e)
        }
    }

    async _copyFiles() {
        await this.copyConfig();
        // await this.copyApiAuthController();
        await this.copyAppStarterFiles()
        // await this.copyMigrationAndModel()
        await this.copyEmailViewTemplates()
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
            await this.command.copy(
                path.join(__dirname, 'events.js'),
                path.join(Helpers.appRoot(), 'start/authEvents.js')
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create start/${this.generatedRoutesFilename}`))
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create start/authEvents.js`))
        } catch (error) {
            this.command.error(error);
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
            this.command.info(`${this.command.icon('info')} Copy Model and Migrations`)
            await this.command.copy(
                path.join(__dirname, 'User.js'),
                path.join(Helpers.appRoot(), `app/Models/User.js`)
            )
            await this.command.copy(
                path.join(__dirname, 'create_users_table.js'),
                path.join(Helpers.migrationsPath(), `${new Date().getTime()}_create_users_table.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create Models/User.js`))
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create database/migrations/create_users_table.js`))
        } catch (error) {
            this.command.error(error);
        }
    }

    /**
     * Creates the Email views.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyEmailViewTemplates(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Verification and Change passowrd Edge Template.`)
            await this.command.copy(
                path.join(__dirname, 'verification-mail.edge'),
                path.join(Helpers.viewsPath(), `auth/emails/verification.edge`)
            )
            await this.command.copy(
                path.join(__dirname, 'password-mail.edge'),
                path.join(Helpers.viewsPath(), `auth/emails/password.edge`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create auth/emails/verification.edge`))
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create auth/emails/password.edge`))
        } catch (error) {
            this.command.error(error);
        }
    }

    /**
     * Creates the Auth Controller.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyApiAuthController(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Authentication Controller.`)
            await this.command.copy(
                path.join(__dirname, 'AuthController.js'),
                path.join(Helpers.appRoot(), `app/Controllers/Http/AuthController.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create app/Controllers/HTTP/AuthController.js`))
        } catch (error) {
            this.command.error(error);
        }
    }

    /**
     * Creates the Auth Controller.
     *
     * @param {String} client
     * @returns {Void}
     */
    async copyConfig(client) {
        try {
            this.command.info(`${this.command.icon('info')} Copy Configs.`)
            await this.command.copy(
                path.join(__dirname, 'adonis-auth-config.js'),
                path.join(Helpers.configPath(), `adonis-auth-config.js`)
            )
            this.command.success(this.command.chalk.yellow(`${this.command.icon('success')} Create config/adonis-auth-config.js`))
        } catch (error) {
            this.command.error(error);
        }
    }
}


module.exports = Mail