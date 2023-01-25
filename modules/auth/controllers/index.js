import login from './login/login.js';
import register from './register/register.js';
import logout from './logout/logout.js';
import forgotPassword from './forgot-password/forgotPassword.js';
import resetPassword from './reset-password/resetPassword.js';
import validateToken from './validate-token/validateToken.js';
import sendOtpToEmail from './verify-opt/sendOtpToEmail.js';
import verifyEmailOtp from './verify-opt/verifyEmailOtp.js';
import sendOtpToPhone from './verify-opt/sendOtpToPhone.js';
import verifyPhoneOtp from './verify-opt/verifyPhoneOtp.js';

const authController = {};

authController.login = login;
authController.register = register;
authController.logout = logout;
authController.forgotPassword = forgotPassword;
authController.validateToken = validateToken;
authController.resetPassword = resetPassword;
authController.sendOtpToEmail = sendOtpToEmail;
authController.verifyEmailOtp = verifyEmailOtp;
authController.sendOtpToPhone = sendOtpToPhone;
authController.verifyPhoneOtp = verifyPhoneOtp;

export default authController;