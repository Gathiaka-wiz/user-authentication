import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE 
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const  sendVerificationEmail =  async (email,verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify Your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email verification"
        });

        console.log("VerificationCode Sent Successfully", response);
        
        
    } catch (error) {
        console.log("Error sending VerificationCode email",error);
        throw new Error("Error sending VerificationCode email", error);
    }
}

export const sendWelcomeEmail = async ( email,name ) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to :recipient,
            template_uuid: "b3569f25-1a6c-4b35-bdd8-45fd9ca7da30",
            template_variables: {
                "company_info_name": "Wiz Auth app",
                "name": name
            }
        })

        console.log("Welcome email sent successfully",response);
        
    } catch (error) {
        console.log("Welcome email ",error.message);
        
    }
}

export const sendPasswordResetEmail = async ( email, resetUrl ) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
            category:"Password Reset"
        });
        console.log("Password reset email sent successfully ",response);
    } catch (error) {
        console.error("Error sending password reset email",error);
        throw new Error(`Error sending password reset email: ${error} `);
    }
}

export const sendResetSuccessEmail = async ( email )  => {
    const recipient  = [{ email }];

    try {
        const response = mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset"
        })
        console.log("Reset  success email sent successfully ",response);
    } catch (error) {
        console.error("Error sending reset password success email",error);
        throw new Error(`Error sending reset password success email: ${error}`)
    }
}