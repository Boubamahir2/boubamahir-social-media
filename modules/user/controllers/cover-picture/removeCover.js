import cloudinary from "cloudinary";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// REMOVE Cover PICTURE ///

const removeCoverPicture = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 404));
  }

  if (user.cover && user.cover.public_id) {
    const imageId = user.cover.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  user.cover = {};

  await user.save();

  res.status(200).json({
    success: true,
    message: ResponseMessages.COVER_PICTURE_REMOVE_SUCCESS,
  });
});

export default removeCoverPicture;
