import { transport } from "./nodemailer.config.js";
import { PASSWORD_RESET_TOKEN_TEMPLATE } from "./email.template.js";



export const sendingPasswordResetTokenEmail = async (email, username, resetToken, resetUrl) => {
    try {

        const info = await transport.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Password reset token email",
            html: PASSWORD_RESET_TOKEN_TEMPLATE
            .replace("{username}", username)
            .replace("{resetToken}", resetToken)
            .replace("{resetURL}", resetUrl)
        })

        return { success: true, emailResponse: info }

    } catch (error) {
        console.log(`error while sending password reset token : ${error}`);
        throw new Error(`error while sending password reset token : ${error}`);
    }
}

