import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import { NotFoundError } from '../../../../errors/index.js';
import models from '../../../../models/index.js';

const logout = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findOne(req.userId);
   if (!user) {
     return next(new NotFoundError(ResponseMessages.USER_NOT_FOUND));
   }

   const authToken = await models.AuthToken.findOne({ user: user._id });
    if (authToken) {
      await authToken.remove();
    }
    res.status(200).json({
      success: true,
      message: ResponseMessages.LOGOUT_SUCCESS,
    },
    );
});

export default logout;
