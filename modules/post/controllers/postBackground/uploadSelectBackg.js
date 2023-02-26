import cloudinary from "cloudinary";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// UPLOAD PROFILE PICTURE ///

const selectBackgorundPicture = catchAsyncError(async (req, res, next) => {
    const { public_id, url } = req.body;

    if (!public_id) {
        return next(new ErrorHandler(ResponseMessages.PUBLIC_ID_REQUIRED, 400));
    }

    if (!url) {
        return next(new ErrorHandler(ResponseMessages.URL_REQUIRED, 400));
    }

    const post = await models.Post.findById(req.query.id);

    if (!post) {
        return next(new ErrorHandler(ResponseMessages.POST_NOT_FOUND, 404));
    }

    if (post.background && post.background.public_id) {
        const imageId = post.background.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
    }

    post.background = {
        public_id: public_id,
        url: url,
    };

    await post.save();

    res.status(200).json({
        success: true,
        message: ResponseMessages.BACKGROUND_PICTURE_UPLOAD_SUCCESS,
    });

});

export default selectBackgorundPicture;
