import cloudinary from "cloudinary";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// UPLOAD COVER PICTURE ///

const selectCoverPicture = catchAsyncError(async (req, res, next) => {
    const { public_id, url } = req.body;

    if (!public_id) {
        return next(new ErrorHandler(ResponseMessages.PUBLIC_ID_REQUIRED, 400));
    }

    if (!url) {
        return next(new ErrorHandler(ResponseMessages.URL_REQUIRED, 400));
    }

    const user = await models.User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 404));
    }

    if (user.cover && user.cover.public_id) {
        const imageId = user.cover.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
    }

    user.cover = {
        public_id: public_id,
        url: url,
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: ResponseMessages.COVER_PICTURE_UPLOAD_SUCCESS,
    });

});

export default selectCoverPicture;
