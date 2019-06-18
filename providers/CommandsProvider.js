'use strict'

const ace = use('@adonisjs/ace')
const { ServiceProvider } = use('@adonisjs/fold')

class CommandsProvider extends ServiceProvider {
    register() {
        this.app.bind('Adonis/Commands/Auth:Setup', () => require('../commands/Setup'))

    }

    boot() {
        ace.addCommand('Adonis/Commands/Auth:Setup')
    }
}

module.exports = CommandsProvider