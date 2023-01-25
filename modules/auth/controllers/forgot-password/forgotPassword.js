import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import { NotFoundError } from '../../../../errors/index.js';
import models from '../../../../models/index.js';
import validators from '../../../../utils/validators.js';

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler(ResponseMessages.EMAIL_REQUIRED, 400));
  }

  if (email && !validators.validateEmail(email)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_EMAIL, 400));
  }

  const user = await models.User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(ResponseMessages.INCORRECT_EMAIL, 400));
  }

  if (!user.isValid) {
    return res.status(401).json({
      success: false,
      accountStatus: 'unverified',
      message: ResponseMessages.INVALID_ACCOUNT_VALIDATION,
    });
  }

  if (user.accountStatus !== 'active') {
    return res.status(401).json({
      success: false,
      accountStatus: user.accountStatus,
      message: ResponseMessages.ACCOUNT_NOT_ACTIVE,
    });
  }

  // Generating OTP
  const { otp, expiresAt } = await utility.generateOTP();
  await models.OTP.create({
    otp,
    expiresAt,
    user: user._id,
  });

  const htmlMessage = `<p>Hi ${user.firstName},</p>
    <p>Your OTP for password reset is:</p>
  <h2>${otp}</h2>
  <p>This OTP is valid for 15 minutes & usable once.</p>
  <p>If you have not requested this email then, please ignore it.</p>
  <p>
    To learn more about our product and services, visit our website
    <a href="https://www.amamahir.com" target="_blank">here</a>.
  </p>
  <p>
    For any queries, feel free to contact us at
    <a href="mailto:amamahir2@gmail.com" target="_blank">amamahir2@gmail.com</a>.
  </p>
  <p>This is a auto-generated email. Please do not reply to this email.</p>
 `;

  try {
    await utility.sendEmail({
      email: user.email,
      subject: `OTP for Password Reset`,
      htmlMessage: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: ResponseMessages.OTP_SEND_SUCCESS,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
  
});

export default forgotPassword;
