'use strict'

export interface Mailing {
    transporter: object

    sendOTPMail(emailTo: string, OTP: string): Promise<object>
}

export default Mailing
