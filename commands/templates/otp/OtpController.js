"use strict"
const Config = use("Config")
const {validate, rule} = use("Validator")
const User = use('App/Models/User')
const SmsProviderService = use("App/Services/Otp/SmsProviders");


class OtpController {
    codeGenerator() {
        return Math.random().toString(36).substring(2, 9)
    }

    async sendCode({request, auth, response}) {
        const validation = await validate(request.all(), {
            phone: [
                rule("required"),
                rule("regex", /^(\+\d{1,3}[- ]?)?\d{10}$/)
            ],
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-otp-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-otp-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {phone} = request.all()
        const user = await User.findOrCreate({phone: phone}, {
            phone: phone,
            code: this.codeGenerator()
        })
        new SmsProviderService(user, Config.get("adonis-otp-config.smsProvider"))
        return response.status(Config.get("base.HttpResponse.ok")).json({
            status: Config.get("base.HttpResponse.ok"),
            result: 'Otp send successfully',
            user: user
        })
    }

    async verifyCode({request, response, auth}) {
        const validation = await validate(request.all(), {
            phone: [
                rule("required"),
                rule("regex", /^(\+\d{1,3}[- ]?)?\d{10}$/)
            ],
            code: "required"
        })
        if (validation.fails()) {
            return response.status(Config.get("adonis-otp-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-otp-config.HttpResponse.bad_request"),
                result: validation.messages()
            })
        }
        const {phone, code} = request.all()
        const user = await User.query().where({
            phone: phone,
            code: code
        }).first()
        if (user == null) {
            return response.status(Config.get("adonis-otp-config.HttpResponse.bad_request")).json({
                status: Config.get("adonis-otp-config.HttpResponse.bad_request"),
                result: 'The credentials you supplied were not correct'
            })
        }
        user.code = this.codeGenerator()
        await user.save()
        const token = await auth.generate(user)
        return response.status(Config.get("base.HttpResponse.ok")).json({
            status: Config.get("base.HttpResponse.ok"),
            result: {
                user: user,
                token: token
            }
        })
    }
}


module.exports = OtpController
