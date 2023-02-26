import cloudinary from "cloudinary";
import fs from "fs";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// UPLOAD background ///

const uploadBackground = catchAsyncError(async (req, res, next) => {
  const background = req.file;

  if (!background) {
    return next(new ErrorHandler("please provide an background image", 400));
  }

  const fileSize = background.size / 1024;

  if (fileSize > 5120) {
    return next(new ErrorHandler("image size must be lower than 5mb", 413));
  }

  const post = await models.Post.findById(req.query.id);

  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  const fileTempPath = background.path;

  if (fileTempPath) {
    if (post.background && post.background.public_id) {
      const imageId = post.background.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
    }

    await cloudinary.v2.uploader
      .upload(fileTempPath, {
        folder: "social_media_api/background",
      })
      .then(async (result) => {
        post.background = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        await post.save();

        fs.unlink(fileTempPath, (err) => {
          if (err) console.log(err);
        });

        res.status(200).json({
          success: true,
          message: "profile picture uploaded successfully",
        });
      })
      .catch((err) => {
        fs.unlink(fileTempPath, (fileErr) => {
          if (fileErr) console.log(fileErr);
        });

        console.log(err);

        res.status(400).json({
          success: false,
          message: "an error occurred in uploading image",
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "image path is invalid",
    });
  }
});

export default uploadBackground;
