import { transport } from "./nodemailer.config.js";
import { EMAIL_VERIFIED_SUCCESS_TEMPLATE } from "./email.template.js";

export const sendingSuccessVerificationEmail = async ( email, userName, loginUrl ) => {
    try {

       const info = await transport.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Email verification",
            html: EMAIL_VERIFIED_SUCCESS_TEMPLATE
            .replace("{username}", userName)
            .replace("{loginURL}", loginUrl)
        })

        return { success: true, emailResponse: info}

    } catch (error) {
        console.log(`Error while sending success verifiacation email : ${error}`);
        throw new Error(`Error while sending success verifiacation email : ${error}`)
    }
}