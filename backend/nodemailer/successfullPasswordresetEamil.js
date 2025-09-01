
import { transport } from "./nodemailer.config.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./email.template.js";


export const sendingSuccessfullyPasswordResetEmail = async (email, username, supportUrl) => {
    try {
        const info = await transport.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Password reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
            .replace("{username}", username)
            .replace("{supportURL}", supportUrl)
        })

        return { success: true, emailResponse: info }
        
    } catch (error) {
        console.log(`error while sending successfully password reset email : ${error}`);
        throw new Error(`error while sending successfully password reset email : ${error}`);
    }
}
