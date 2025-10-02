
const VerifyEmail = ({ name, OTP }: { name: string, OTP: number }) => {

    const data = {
        subject: 'Verify your account',
        html: `
            <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #1a237e 100%); margin: 0; padding: 40px 20px; color: #fff;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #1e2875 0%, #2d3a8c 100%); border-radius: 15px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden; border: 2px solid rgba(255, 215, 0, 0.3);">
                    
                    <!-- Header Section with Golden Accent -->
                    <div style="background: linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%); padding: 3px;">
                        <div style="background: linear-gradient(135deg, #1e2875 0%, #2d3a8c 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #f4d03f; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Your Chance to Win!</h1>
                        </div>
                    </div>
                    
                    <!-- Content Section -->
                    <div style="padding: 40px 30px; text-align: center;">
                        <h2 style="color: #f4d03f; font-size: 24px; margin: 0 0 15px 0; font-weight: bold;">Hey ${name}! 🎟️</h2>
                        <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Enter your verification code below to activate your account and start entering to win amazing prizes!</p>
                        
                        <!-- OTP Box with Golden Border -->
                        <div style="margin: 30px 0;">
                            <p style="color: #f4d03f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: bold;">Your Verification Code</p>
                            <div style="background: linear-gradient(135deg, #1a237e 0%, #283593 100%); border: 3px solid #d4af37; width: 200px; padding: 20px; text-align: center; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
                                <div style="color: #f4d03f; font-size: 36px; font-weight: bold; letter-spacing: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${OTP}</div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(244, 208, 63, 0.1); border-left: 4px solid #d4af37; padding: 15px; margin: 30px 0; border-radius: 5px;">
                            <p style="color: #fff; font-size: 14px; margin: 0; line-height: 1.5;">⏰ This code will expire in <strong style="color: #f4d03f;">3 minutes</strong></p>
                        </div>
                        
                        <p style="color: #b0b0b0; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">If you didn't request this code, please ignore this email or contact our support team.</p>
                    </div>
                    
                    <!-- Footer Section -->
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.3);">
                        <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.5;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                        <p style="color: #777; font-size: 11px; margin: 10px 0 0 0;">This is an automated message, please do not reply.</p>
                    </div>
                </div>
                
                <!-- Decorative Elements -->
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: rgba(244, 208, 63, 0.6); font-size: 12px;">🎉 Good luck with your entries! 🎉</p>
                </div>
            </body>
        `,
    }

    return data;
};

const forgetPassword = ({ name, OTP }: { name: string, OTP: number }) => {
    const data = {
        subject: "Password Reset Request",
        html: `
            <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #1a237e 100%); margin: 0; padding: 40px 20px; color: #fff;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #1e2875 0%, #2d3a8c 100%); border-radius: 15px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden; border: 2px solid rgba(255, 215, 0, 0.3);">
                    
                    <!-- Header Section with Golden Accent -->
                    <div style="background: linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%); padding: 3px;">
                        <div style="background: linear-gradient(135deg, #1e2875 0%, #2d3a8c 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #f4d03f; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Password Reset</h1>
                        </div>
                    </div>
                    
                    <!-- Content Section -->
                    <div style="padding: 40px 30px; text-align: center;">
                        <h2 style="color: #f4d03f; font-size: 24px; margin: 0 0 15px 0; font-weight: bold;">Hello ${name}! 🔐</h2>
                        <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">We received a request to reset your password. Use the verification code below to complete the process.</p>
                        
                        <!-- Security Notice -->
                        <div style="background: rgba(255, 152, 0, 0.15); border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: left;">
                            <p style="color: #ffb74d; font-size: 14px; margin: 0; line-height: 1.5;"><strong>⚠️ Security Notice:</strong> If you didn't request a password reset, please ignore this email and ensure your account is secure.</p>
                        </div>
                        
                        <!-- OTP Box with Golden Border -->
                        <div style="margin: 30px 0;">
                            <p style="color: #f4d03f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: bold;">Your Reset Code</p>
                            <div style="background: linear-gradient(135deg, #1a237e 0%, #283593 100%); border: 3px solid #d4af37; width: 200px; padding: 20px; text-align: center; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
                                <div style="color: #f4d03f; font-size: 36px; font-weight: bold; letter-spacing: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${OTP}</div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(244, 208, 63, 0.1); border-left: 4px solid #d4af37; padding: 15px; margin: 30px 0; border-radius: 5px;">
                            <p style="color: #fff; font-size: 14px; margin: 0; line-height: 1.5;">⏰ This code will expire in <strong style="color: #f4d03f;">3 minutes</strong></p>
                        </div>
                        
                        <!-- Instructions -->
                        <div style="text-align: left; margin: 25px 0;">
                            <p style="color: #f4d03f; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">Next Steps:</p>
                            <ol style="color: #e0e0e0; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                <li>Enter the code above on the password reset page</li>
                                <li>Create a strong new password</li>
                                <li>Confirm your new password and submit</li>
                            </ol>
                        </div>
                        
                        <p style="color: #b0b0b0; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">Need help? Contact our support team anytime.</p>
                    </div>
                    
                    <!-- Footer Section -->
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.3);">
                        <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.5;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                        <p style="color: #777; font-size: 11px; margin: 10px 0 0 0;">This is an automated message, please do not reply.</p>
                    </div>
                </div>
                
                <!-- Decorative Elements -->
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: rgba(244, 208, 63, 0.6); font-size: 12px;">🔒 Your account security is our priority 🔒</p>
                </div>
            </body>
        `,
    }

    return data;
}

export const emailTemplate = {
    verifyEmail: VerifyEmail,
    forgetPassword
};