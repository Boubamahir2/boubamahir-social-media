import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import models from "../../../../models/index.js";

/// GET PROFILE DETAILS

const getProfileDetails = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findById(req.user._id)
    .select([
      "_id", "firstName", "lastName", "email", "username", "avatar",
      "dob", "gender", "about", "profession", "website", "location",
      "postsCount", "followersCount", "followingCount", "isValid",
      "isPrivate", "accountStatus", "isVerified", "role",
      "createdAt", "emailVerified", "phone", "countryCode",
      "phoneVerified", "updatedAt", "showOnlineStatus", "lastSeen"
    ]);

  const profileDetails = {};

  profileDetails._id = user._id;
  profileDetails.firstName = user.firstName;
  profileDetails.lastName = user.lastName;
  profileDetails.email = user.email;
  profileDetails.emailVerified = user.emailVerified;
  profileDetails.username = user.username;
  profileDetails.avatar = user.avatar;
  profileDetails.phone = user.phone;
  profileDetails.countryCode = user.countryCode;
  profileDetails.phoneVerified = user.phoneVerified;
  profileDetails.dob = user.dob;
  profileDetails.gender = user.gender;
  profileDetails.about = user.about;
  profileDetails.profession = user.profession;
  profileDetails.website = user.website;
  profileDetails.location = user.location;
  profileDetails.postsCount = user.postsCount;
  profileDetails.followersCount = user.followersCount;
  profileDetails.followingCount = user.followingCount;
  profileDetails.accountStatus = user.accountStatus;
  profileDetails.isPrivate = user.isPrivate;
  profileDetails.isValid = user.isValid;
  profileDetails.isVerified = user.isVerified;
  profileDetails.role = user.role;
  profileDetails.showOnlineStatus = user.showOnlineStatus;
  profileDetails.lastSeen = user.lastSeen;
  profileDetails.createdAt = user.createdAt;
  profileDetails.updatedAt = user.updatedAt;

  res.status(200).json({
    success: true,
    user: profileDetails,
  });
});

export default getProfileDetails;
