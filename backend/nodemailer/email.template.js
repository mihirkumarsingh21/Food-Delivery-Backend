export const EMAIL_VERIFICATION_CODE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
    <p>Hello <strong>{username}</strong>,</p>
    <p>Thank you for registering! To complete your registration, please enter the following verification code on the verification page:</p>
    <div style="margin: 30px 0; font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 3px;">
      {verificationCode}
    </div>
    <p>Click the button below to go to the verification page:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{verifyURL}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Verify Page</a>
    </div>
    <p>This code will expire in <strong>10 minutes</strong> for security reasons.</p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const REGISTRATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #fd9800ff, #fd9800ff); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome</h1>
  </div>
  <div style="background-color: #000; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>🎉 Your registration was successful! But before you can log in, please verify your email address.</p>

    <p>Thank you for registering! To complete your registration, please enter the following verification code on the verification page:</p>
    <div style="margin: 30px 0; font-size: 24px; font-weight: bold; color: #fff; letter-spacing: 3px;">
      {verificationCode}

    <div style="text-align: center; margin: 30px 0;">
      <a href="{verifyURL}" style="background-color: #333; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
    </div>
    <p>Once your email is verified, you’ll be able to log in and start using your account.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const EMAIL_VERIFIED_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #ff9800, #e68900); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Email Verified 🎉</h1>
  </div>
  <div style="background-color: #fff7e6; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
    <p>Hello <strong>{username}</strong>,</p>
    <p>✅ Congratulations! Your email has been <strong>successfully verified</strong>.</p>
    <p>You can now log in to your account and enjoy full access to all features.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #ff9800; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login Now</a>
    </div>
    <p>If you face any issues while logging in, feel free to contact our support team.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const LOGIN_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Login Successful ✅</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>You have successfully logged into your account on <strong>{loginTime}</strong>.</p>
    <p>If this wasn’t you, please reset your password immediately to secure your account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #f44336; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Secure Account</a>
    </div>
    <p>We’re glad to have you back!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TOKEN_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, rgba(255,182,193,0.9), rgba(255,105,180,0.9)); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">Reset Your Password 🔒</h1>
  </div>
  <div style="background-color: #fff0f6; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>We received a request to reset your password. Use the token below to complete the process:</p>
    
    <div style="background: rgba(255,182,193,0.3); border: 1px dashed #ff69b4; padding: 15px; margin: 20px 0; text-align: center; border-radius: 6px;">
      <h2 style="margin: 0; color: #d63384;">{resetToken}</h2>
    </div>

    <p>Go to the <a href="{resetURL}" style="color: #d63384; font-weight: bold;">Password Reset Page</a> and enter this token.</p>
    
    <p style="color: #d63384; font-size: 0.9em;">⚠️ This token is valid only for <strong>15 minutes</strong>. If you didn’t request this, you can ignore this email.</p>

    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #aaa; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, rgba(0,123,255,0.9), rgba(0,191,255,0.9)); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">Password Reset Successful ✅</h1>
  </div>
  <div style="background-color: rgba(173,216,230,0.3); padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{username}</strong>,</p>
    <p>Your password has been successfully reset. You can now log in securely with your new password.</p>
    
    <div style="background: rgba(0,123,255,0.2); border: 1px dashed #007bff; padding: 15px; margin: 20px 0; text-align: center; border-radius: 6px;">
      <p style="margin: 0; color: #004085;">If you didn’t perform this action, please <a href="{supportURL}" style="color: #0056b3; font-weight: bold;">contact our support team</a> immediately.</p>
    </div>

    <p style="color: #0056b3; font-size: 0.9em;">🔒 Always keep your credentials safe and never share them with anyone.</p>

    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #aaa; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;



