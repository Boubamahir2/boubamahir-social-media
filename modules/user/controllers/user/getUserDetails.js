import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// GET USER DETAILS ///
const getUserDetails = catchAsyncError(async (req, res, next) => {

  let searchQuery;

  if (!req.query.id && !req.query.username) {
    return next(new ErrorHandler(ResponseMessages.INVALID_QUERY_PARAMETERS, 400));
  }

  if (req.query.id && req.query.username) {
    return next(new ErrorHandler(ResponseMessages.INVALID_QUERY_PARAMETERS, 400));
  }

  if (req.query.id) {
    searchQuery = { _id: req.query.id };
  }

  if (req.query.username) {
    searchQuery = { username: req.query.username };
  }

  const user = await models.User.findOne(searchQuery)
    .select({
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      username: 1,
      postsCount: 1,
      followersCount: 1,
      followingCount: 1,
      avatar: 1,
      cover:1,
      about: 1,
      dob: 1,
      gender: 1,
      profession: 1,
      website: 1,
      isPrivate: 1,
      isValid: 1,
      role: 1,
      accountStatus: 1,
      isVerified: 1,
      createdAt: 1,
      updatedAt: 1,
    });

  if (!user) {
    return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 404));
  }

  const followingStatus = await utility.getFollowingStatus(req.user, user._id);

  const userDetails = {};

  userDetails._id = user._id;
  userDetails.firstName = user.firstName;
  userDetails.lastName = user.lastName;
  userDetails.email = user.email;
  userDetails.username = user.username;
  userDetails.followersCount = user.followersCount;
  userDetails.followingCount = user.followingCount;
  userDetails.postsCount = user.postsCount;
  userDetails.followingStatus = followingStatus;
  userDetails.avatar = user.avatar;
  userDetails.cover = user.cover;
  userDetails.about = user.about;
  userDetails.dob = user.dob;
  userDetails.gender = user.gender;
  userDetails.profession = user.profession;
  userDetails.website = user.website;
  userDetails.accountStatus = user.accountStatus;
  userDetails.isPrivate = user.isPrivate;
  userDetails.isValid = user.isValid;
  userDetails.isVerified = user.isVerified;
  userDetails.role = user.role;
  userDetails.createdAt = user.createdAt;
  userDetails.updatedAt = user.updatedAt;

  res.status(200).json({
    success: true,
    user: userDetails,
  });
});

export default getUserDetails;
