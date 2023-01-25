import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import models from '../../../../models/index.js';
import {utility,validators} from '../../../../utils/index.js';
import ResponseMessages from '../../../../constants/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

/// REGISTER USER ///
const register = catchAsyncError(async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    isValidated,
  } = req.body;

  if (!firstName) {
    return next(new ErrorHandler(ResponseMessages.FIRST_NAME_REQUIRED, 400));
  }

  if (firstName && !validators.validateName(firstName)) {
    return next(
      new ErrorHandler(ResponseMessages.INVALID_FIRST_NAME_LENGTH, 400)
    );
  }

  if (!lastName) {
    return next(new ErrorHandler(ResponseMessages.LAST_NAME_REQUIRED, 400));
  }
  if (lastName && !validators.validateName(lastName)) {
    return next(
      new ErrorHandler(ResponseMessages.INVALID_LAST_NAME_LENGTH, 400)
    );
  }

  if (!email) {
    return next(new ErrorHandler(ResponseMessages.EMAIL_REQUIRED, 400));
  }

  if (email && !validators.validateEmail(email)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_EMAIL, 400));
  }

  if (!username) {
    return next(new ErrorHandler(ResponseMessages.USERAME_REQUIRED, 400));
  }

  if (username && !validators.validateUsername(username)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_USERNAME, 400));
  }

  if (!password) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_REQUIRED, 400));
  }

  if (!confirmPassword) {
    return next(
      new ErrorHandler(ResponseMessages.CONFIRM_PASSWORD_REQUIRED, 400)
    );
  }

 const isUsernameAvailable = await utility.checkUsernameAvailable(username);

 if (!isUsernameAvailable) {
   return next(new ErrorHandler(ResponseMessages.USERAME_NOT_AVAILABLE, 400));
 }


  username = username.toLowerCase();

  if (password !== confirmPassword) {
    return next(new ErrorHandler(ResponseMessages.PASSWORDS_DO_NOT_MATCH, 400));
  }

  let user = await models.User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(ResponseMessages.ACCOUNT_ALREADY_EXISTS, 400));
  }

  // ip address
  const ip = utility.getIp(req);

  user = await models.User.create({
    firstName,
    lastName,
    email,
    username,
    password,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
    accountCreatedIp : ip,
  });

  if (isValidated === 'true' || isValidated === true) {
    user.emailVerified = true;
    user.isValid = true;
  }

   await user.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: ResponseMessages.SIGNUP_SUCCESS,
    user: {
      email: user.email,
      name: user.username,
      role: user.role,
    },
  });

  const htmlMessage = `<p>Hi ${user.firstName},</p>
  <h3>
    Thank you so much for creating an account with us. We're glad you're here!
  </h3>
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
     subject: `Welcome to amamahir`,
     htmlMessage: htmlMessage,
   });
 } catch (error) {
  console.log(err.message);
 }

  res.status(201).json({
    success: true,
    message: ResponseMessages.SIGNUP_SUCCESS,
  });

});

export default register;