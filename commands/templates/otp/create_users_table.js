'use strict'
const Schema = use('Schema')


class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments()
            table.string("phone").unique()
            table.string("code", 10)
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}


module.exports = UserSchema
