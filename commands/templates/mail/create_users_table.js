'use strict'
const Schema = use('Schema')


class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments()
            table.string("email").unique()
            table.string("password", 60).nullable()
            table.boolean("status").defaultTo(false)
            table.uuid("refrenceId")
            table.timestamp("activated_at").nullable();
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}


module.exports = UserSchema
