import { User } from "../models/user.model.js";
import { sendingSuccessRegEmail } from "../nodemailer/successRegiser.email.js";
import { sendingSuccessVerificationEmail } from "../nodemailer/successEmailVerificaton.email.js";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";
import { userSchemaValidation } from "../validations/user.validation.js";
import bcrypt from "bcryptjs";
import { sendingPasswordResetTokenEmail } from "../nodemailer/sendPasswordVerificationToken.js";
import { sendingSuccessfullyPasswordResetEmail } from "../nodemailer/successfullPasswordresetEamil.js";
import fs from "fs";


// Register user.

export const registerUser = async (req, res) => {
    try {

       const value = await userSchemaValidation.validateAsync(req.body);
       
       const { name, email, password, profilePic, role } = value;

       const user = await User.findOne({email});

       if(user) {
        return res.status(400).json({
            success: false,
            message: "user already exist with this creandiantals.",
        })
       }

       const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
       if(!isValidEmail) {
            return res.status(400).json({
                success: false,
                message: "email are not valid formate"
            })
       }

        const hashedPassword = await bcrypt.hash(password, 10);

        const passwordResetToken = Math.floor(100000 + Math.random() * 900000).toString();
        const passwordResetTokenExpAt = Date.now() + 1000 * 60 * 60 * 7;

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpAt = Date.now() + 1000 * 60 * 60 * 10 // 10 hr
     
        const regUser = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePic,
        passwordResetToken,
        passwordResetTokenExpAt,
        verificationToken,
        verificationTokenExpAt,
        role
       })

        const response = await sendingSuccessRegEmail(regUser.email, regUser.name, regUser.verificationToken, `http:localhost:5173/verify-email`);

            res.status(201).json({
            success: response.success,
            message: "user register successfully please check your email for verify your email.",
            emailResponse: response.emailResponse.response

       })

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: `something went wrong : ${error}`
        })
        console.log(`ERROR WHILE REGISTER USER : ${error}`);
        
    }
}

// Verify email.

export const verifyEmail = async (req, res) => {
    try {


        const { token } = req.body;
        console.log(`TOKEN -> ${token}`);
        
        
        const user = await User.findOne({
            $or: [
            {
                verificationToken: token,
            },
            {
                verificationTokenExpAt: { $gt: Date.now() }
            }
        ]
        }, )

        // console.log(`USER -> ${user}`);
        
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Your token is expired or incorrect, please recheck or retry to register."
            })
        }

            user.isVerified = true;
            user.verificationToken = null;
            user.verificationTokenExpAt = null;

            /*
          
              user.verificationToken = user.updateOne({ $or: [ {
                verificationToken: token
            }, {
                verificationTokenExpAt: { $gt: Date.now()}
            } ]}, {
                $unset: { verificationToken: "" }
            })
    
               user.verificationTokenExpAt = user.updateOne({ $or: [ {
                verificationToken: token
            }, {
                verificationTokenExpAt: { $gt: Date.now()}
            } ]}, {
                $unset: { verificationTokenExpAt: "" }
            })
                */

        //    await user.updateOne({ verificationToken: token }, { $unset: { verificationToken: "" }, verificationTokenExpAt: "" })
               
           await user.save();

           const response = await sendingSuccessVerificationEmail(user.email, user.name,`http:localhost:5173/login-user`);
            

        res.status(200).json({
            success: response.success,
            message: "Your email are verified successfully please check your mail.",
            emailResponse: response.emailResponse.response
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })

        console.log(`error while verifying email : ${error.message}`);
        
    }
}

// Login user.

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;       
        console.table([email, password]);
        
        const user = await User.findOne({email});

     
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email please check your email."
            })
        }

           if(!user.isVerified) {
            return res.status(401).json(
               {
                    success: false,
                    message: "for login please verify your email."
               }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                success: "false",
                message: "Password are incorrect"
            })
        }

        await generateJwtTokenAndSetCookie(user._id, user.role, res);

        res.status(200).json({
            success: true,
            message: "User login successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: `server error something went wrong : ${error.message}`
        })

        console.log(`error while login user : ${error.message}`);
        
    }
}

// Generating csrf token.

export const generateCsrfToken = (req, res) => {
    try {
        const csrfToken = req.csrfToken();
        res.json({
            success: true,
            csrfToken: csrfToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(`failed to generate csrf token : ${error}`);
        
    }
}

// Logout user.

export const logOutUser = (_, res) => {
    try {
        res.clearCookie("authToken");
        res.status(200).json({
            success: true,
            message: "user logout successfully."
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })

        console.log(`error while logout user : ${error}`);
        
    }
}

// Getting password reset token.

export const sendingPasswordResetToken = async (req, res) => {
    try {
        
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email please enter a valid email.",
            })
        }

        const response = await sendingPasswordResetTokenEmail(user.email, user.name, user.passwordResetToken, `http:localhost:5173/reset-password/${user.passwordResetToken}`);

        res.status(200).json({
            success: response.success,
            message: `Password reset token sended please check your email`,
            emailResponse: response.emailResponse.response
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `error while sending password reset token on email : ${error}`
        })
    }
}

// Reset password.

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { oldPassword, newPassword } = req.body;


        const user = await User.findOne({

            $and: [
                {
                    passwordResetToken: token
                },

                {
                    passwordResetTokenExpAt: { $gt: Date.now() }
                }
            ]

        })

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token or token is expire please revist to password reset page."
            })
        }

        if(newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password lenght must be six or greater"
            })
        }

        if(oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "old password and new password cannot be same."
            })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        user.passwordResetToken = null;
        user.passwordResetTokenExpAt = null;

        await user.save();

        const response = await sendingSuccessfullyPasswordResetEmail(user.email, user.name, `http:localhost:5173/support`);

        res.status(200).json({
            success: response.success,
            message: "your password reset successfully.",
            emailResponse: response.emailResponse.response
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while reset password : ${error}`);
    }
}


// Getting auth user profile.

export const gettingAuthUserProfile = async (req, res) => {
    try {
        const authUserProfile = await User.findById({_id: req.user});

        if(!authUserProfile) {
            return res.status(401).json({
                success: false, 
                message: "Unauthorized"
            })
        }

        res.status(200).json({
            success: true,
            authUserProfile: authUserProfile
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while getting authenticated user profile : ${error}`);
        
    }
}

// Updating auth user profile.

export const updatingAuthUserProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email } = req.body;
        const updatedAuthUserProfile = await User.findByIdAndUpdate({ _id: userId },{name, email}, {new: true} );
        
        if(!updatedAuthUserProfile) {
            res.status(400).json({
                success: false,
                message: "failed to update user profile."
            })
        }

        res.status(201).json({
            success: true,
            message: "user profile updated successfully.",
            updatedUserProfile: updatedAuthUserProfile
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while updating auth user profile : ${error}`);
        
    }
}

// Uploading auth user profile pic.
export const uploadingAuthUserProfilePic = async (req, res) => {
    try {

        const user = await User.findById(req.user);  
        console.log(req.file);
        
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "Failed to upload your profile."
            })
        }    

        user.profilePic = req.file.path
    
         await user.save();
         res.status(200).json({
            success: true,
            message: "Your profile uploaded successfully",
            file: req.file
         })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`server error something went wrong : ${error}`);
        
    }
}

// Updating auth user profile pic.

export const updatingAuthUserProfilePic = async (req, res) => {

    try {
            const user = await User.findById(req.user);
        
            if(user.profilePic == "") {
                return res.status(400).json({
                    success: false,
                    message: "please set a profile pic then try to update it."
                })
            }

            const filePath = user.profilePic;

           fs.readFile(filePath, (err, data) => {

           
                if(err) {
                    return res.status(400).json({
                        success: false,
                        message: err
                    })
                
                } else if(data) {
                    
                    fs.unlink(filePath, (err) => {
                        return res.status(400).json({
                            success: false,
                            message: err
                        })
                    })

                } else {
                    return;
                }
            })

        
        fs.writeFile(filePath, req.file.path, (err) => {

            err ? res.status(400).json({
                success: false,
                message: `failed to update user profile pic : ${err}`
            }) : res.status(200).json({
                success: true,
                message: "User profile updated successfully."
            })

        // if(err) {

        //     res.status(400).json({
        //         success: false,
        //         message: `failed to update user profile pic : ${err}`
        //     })
        // } else {
        //     res.status(200).json({
        //         success: true,
        //         message: "User profile updated successfully."
        //     })
        // }
    })
    
    user.profilePic = req.file.path

    await user.save();

    } catch (error) {
       res.status(500).json({
        success: false,
        message: `server error something went wrong. ${error}`
       }) 

       console.log(`error while updating user profile : ${error}`);
       
    }

}

export const authUserProfilePic = async (req, res) => {
    try {

        const user = await User.findById(req.user);

        user.profilePic != "" ? res.status(200).json({
            success: true,
            profilePic: user.profilePic
            // profilePic: `http://localhost:5000:${user.profilePic}`

        }) : res.status(404).json({
            success: false,
            message: "user profile not found."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while getting user profile pic : ${error}`);
    }
}

// Deleting auth user profile pic.

export const deletingAuthUserProfilePic = async (req, res) => {
    try {
        
        const user = await User.findById(req.user);

        if(user.profilePic === "") {
            return res.status(400).json({
                success: false,
                message: "your profile pic already deleted"
            })
        }

        const filePath = user.profilePic;

         fs.unlink(filePath, (err) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    message: `failed to delete file: ${err}`
                })

            } else {
                return res.status(200).json({
                    success: true,
                    message: "Your profile pic deleted successfully."
                })
            }
        })

        user.profilePic = "";

        await user.save();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error somethng went wrong : ${error}`
        })

        console.log(`error while deleting user profile : ${error}`);
    }
}





