"use strict"
const Config = use("Config")
const {validate} = use("Validator")
const Event = use('Event')
const User = use('App/Models/User')
const uuidv4 = require("uuid/v4")


class ApiAuthController {
    codeGenerator() {
        return Math.random().toString(36).substring(2, 9)
    }

    async login({request, auth, response}) {
        const validation = await validate(request.all(), {
            email: "required|email",
            password: "required"
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {email, password} = request.all()
        const user = await User.query().where({
            email: email,
            status: true
        }).whereNot({activated_at: null}).first()
        if (user == null) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: 'The credentials you supplied were not correct'
            })
        }
        const token = await auth.attempt(email, password, {})
        return response.status(Config.get("base.HttpResponse.ok")).json({
            status: Config.get("base.HttpResponse.ok"),
            result: {
                user: user,
                token: token
            }
        })
    }

    async register({request, response}) {
        const validation = await validate(request.all(), {
            email: "required|email|unique:users,email",
            password: "required"
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {email, password} = request.all()
        const user = new User()
        user.email = email.toLowerCase()
        user.password = password
        user.refrenceId = uuidv4()
        user.code = this.codeGenerator()
        try {
            await user.save()
            await Event.fire("new::user", user)
            return response.status(Config.get("adonis-auth-config.HttpResponse.ok")).json({
                status: Config.get("adonis-auth-config.HttpResponse.ok"),
                result: user
            })
        } catch (e) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.conflict")).json({
                status: Config.get("adonis-auth-config.HttpResponse.conflict"),
                result: e.message
            })
        }
    }

    async verification({request, response}) {
        const validation = await validate(request.all(), {
            id: "required",
            email: "required|email"
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {id, email, redirect} = request.all()
        const user = await User.findBy({
            email: email,
            refrenceId: id,
            status: false,
            activated_at: null
        })
        if (user == null) {
            return response.redirect(redirect + `?status=false`)
        }
        user.status = true
        user.activated_at = new Date()
        user.refrenceId = uuidv4()
        await user.save()
        return response.redirect(redirect + `?status=true&email=${request.input("email")}&refrenceId=${request.input("id")}`)
    }

    async forgotPassword({request, response}) {
        const validation = await validate(request.all(), {
            email: "required|email",
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {email} = request.all()
        const user = await User.query().where({
            email: email,
            status: true
        }).whereNot({activated_at: null}).first()
        if (user == null) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: 'The credentials you supplied were not correct'
            })
        }
        await Event.fire("forgot:password", user)
        return response.status(Config.get("adonis-auth-config.HttpResponse.ok")).json({
            status: Config.get("adonis-auth-config.HttpResponse.ok"),
            result: 'Code send successfully'
        })
    }

    async changePassword({request, response}) {
        const validation = await validate(request.all(), {
            email: "required|email",
            code: "required",
            password: "required"
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {email, code, password} = request.all()
        const user = await User.query().where({
            email: email,
            status: true,
            code: code
        }).whereNot({activated_at: null}).first()
        if (user == null) {
            return response.status(Config.get("adonis-auth-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-auth-config.HttpResponse.bad_request"),
                result: 'The credentials you supplied were not correct'
            })
        }
        user.password = password
        user.code = this.codeGenerator()
        await user.save()
        return response.status(Config.get("adonis-auth-config.HttpResponse.ok")).json({
            status: Config.get("adonis-auth-config.HttpResponse.ok"),
            result: 'Password Changed successfully'
        })
    }
}


module.exports = ApiAuthController
