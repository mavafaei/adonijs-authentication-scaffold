const Config = use('Config')
const Event = use('Event')
const Mail = use('Mail')
Event.on('new::user', async (user) => {
    const mail = await Mail.send('auth.emails.verification', {
        user,
        appURL: Config.get('adonis-auth-config.app_host') + `/api/v1${Config.get('adonis-auth-config.verificationRoute')}?id=${user.refrenceId}&email=${user.email}&redirect=${Config.get('adonis-auth-config.redirect_host')}`
    }, (message) => {
        message.to(user.email)
        message.from(Config.get('adonis-auth-config.mail_sender'))
    }).catch((err) => {
        console.log(err)
    })
})
Event.on('forgot:password', async (user) => {
    const mail = await Mail.send('auth.emails.forgotPassword', {
        user,
        appURL: Config.get('adonis-auth-config.app_host') + `/api/v1${Config.get('adonis-auth-config.verificationRoute')}?id=${user.refrenceId}&email=${user.email}&redirect=${Config.get('adonis-auth-config.redirect_host')}`
    }, (message) => {
        message.to(user.email)
        message.from(Config.get('adonis-auth-config.mail_sender'))
    }).catch((err) => {
        console.log(err)
    })
})

