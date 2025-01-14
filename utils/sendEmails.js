import nodemailer from "nodemailer"
import { google } from "googleapis"
import { activateEmailTemplate } from "../emails/activateEmailTemplate"

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const {
    MAILING_SERVICE_CLIENT_ID, 
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID, 
    MAILING_SERVICE_CLIENT_SECRET, 
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND 
)

export async function sendEmail(to, url, txt, subject, template) {
    try {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    })

    const accessToken = await oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        
        auth: {
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: template(to, url), 
    }

    // send email
    result = await transporter.sendMail(mailOptions)
    
} catch(error) {
    console.log("catch block", error)
}
}