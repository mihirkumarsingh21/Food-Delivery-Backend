import { transport } from "./nodemailer.config.js";
import { EMAIL_VERIFICATION_CODE_TEMPLATE } from "./email.template.js";


export const sendingVerificationTokenEmail = async (email, userName, verificationToken) => {
    try {
        
    const info = await transport.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        html: EMAIL_VERIFICATION_CODE_TEMPLATE
        .replace("{username}", userName)
        .replace("{verificationCode}", verificationToken)
        // .replace("{verifyURL}", verifyURL)
    })

    

    return { success: true, emailResponse: info }

    } catch (error) {
        console.log(`Error while sending verification token email to user : ${error}`);
        throw new Error(`Failed to sending verification email to user : ${error}`);
        
    }
}
