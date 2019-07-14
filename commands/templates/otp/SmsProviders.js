"use strict";
const Helpers = use("Helpers")
const Env = use("Env")
const https = require('https')
const Config = use("Config")


class SmsProviders {
    constructor(user, provider) {
        this.user = user
        this.findProvider(provider)
    }

    async findProvider(provider) {
        switch (provider) {
            case 'kavehnegar':
                await this.kavehnegar()
                break;
        }
    }

    /**
     * Kavehnegar
     */
    async kavehnegar() {
        https.get(`${Config.get("adonis-otp-config.kavenegar.baseURI")}${Config.get("adonis-otp-config.kavenegar.API_KEY")}/verify/lookup.json?receptor=${this.user.phone}&token=${this.user.code}&template=${Config.get("adonis-otp-config.kavenegar.template")}`, (resp) => {
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}


module.exports = SmsProviders;