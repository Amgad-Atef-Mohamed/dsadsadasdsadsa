'use strict'

import * as config from 'config'
import * as handlebars from 'handlebars'
import * as nodeMailer from 'nodemailer'

import Mailing from './../services/interfaces/Mailing'
import * as userActivationMailTemplate from '../templates/userActivationMailTemplate'

export default class MailingBasedOnNodeMailerService implements Mailing {
    transporter: nodeMailer.Transporter

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: config.get('mailing.host'),
            port: config.get('mailing.port'),
            secure: config.get('mailing.secure'), // true for 465, false for other ports
            auth: {
                user: config.get('mailing.auth.user'), // generated ethereal user
                pass: config.get('mailing.auth.pass'), // generated ethereal password
            },
        })
    }

    public async sendOTPMail(emailTo: string, OTP: string): Promise<nodeMailer.SentMessageInfo> {
        const template = handlebars.compile(userActivationMailTemplate)
        const htmlToSend = template({
            activationLink: OTP,
        })

        // setup email data with unicode symbols
        const mailOptions = {
            from: `support 👻 <${config.get('mailing.from')}>`, // sender address
            to: emailTo, // list of receivers
            subject: 'Activation Mail', // Subject line
            html: htmlToSend, // html body
        }

        return this.transporter.sendMail(mailOptions)
    }
}
