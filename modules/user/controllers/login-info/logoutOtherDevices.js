import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// DELETE LOGIN INFO ///

const logoutOtherDevices = catchAsyncError(async (req, res, next) => {
    const deviceId = req.query.deviceId;

    if (!deviceId) {
        return next(new ErrorHandler(ResponseMessages.INVALID_QUERY_PARAMETERS, 400));
    }

    const otherDevices = await models.LoginInfo.find({
      user: req.user._id,
      // $ne selects the documents where the value of the field is not equal to the specified value
      // which mean select devices that not equal the current device
      deviceId: { $ne: deviceId },
    }).countDocuments();

    if (otherDevices === 0) {
        return next(new ErrorHandler(ResponseMessages.NO_OTHER_DEVICES, 400));
    }

    await models.LoginInfo.deleteMany({
        user: req.user._id,
        deviceId: { $ne: deviceId }
    });

    res.status(200).json({
        success: true,
        message: ResponseMessages.LOGOUT_OTHER_DEVICES_SUCCESS,
    });
});

export default logoutOtherDevices;
