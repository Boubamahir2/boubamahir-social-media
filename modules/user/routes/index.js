import { Router } from 'express';
import multerMiddleware from '../../../middleware/multer.js';
import authMiddleware from '../../../middleware/authentication.js';
import userController from '../controllers/index.js';
const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

const userRouter = Router();

// Public Routes  -------------------------------------------------------------

userRouter.route("/check-username").post(userController.checkUsernameAvailable);

// // Authenticated Routes -------------------------------------------------------

userRouter
  .route("/change-password")
  .post(isAuthenticatedUser, userController.changePassword);

userRouter
  .route("/show-me")
  .get(isAuthenticatedUser, userController.getProfileDetails);

userRouter
  .route("/update-profile")
  .patch(isAuthenticatedUser, userController.updateProfile);

userRouter
  .route("/upload-avatar")
  .post(
    multerMiddleware.single("avatar"),
    isAuthenticatedUser,
    userController.uploadAvatar
  );

userRouter
  .route("/delete-avatar")
  .delete(isAuthenticatedUser, userController.deleteAvatar);

userRouter
  .route("/select-profile-picture")
  .post(isAuthenticatedUser, userController.uploadProfilePicture);

userRouter
  .route("/remove-profile-picture")
  .delete(isAuthenticatedUser, userController.removeProfilePicture);
  

  // cover
userRouter
  .route("/delete-cover")
  .delete(isAuthenticatedUser, userController.removeCoverPicture);

userRouter
  .route("/select-cover")
  .post(isAuthenticatedUser, userController.selectCover);
userRouter
  .route('/upload-cover')
  .post(
    multerMiddleware.single('cover'),
    isAuthenticatedUser,
    userController.uploadCover
  );

userRouter
  .route("/deactivate-account")
  .post(isAuthenticatedUser, userController.deactivateAccount);

userRouter
  .route("/reactivate-account")
  .post(userController.reactivateAccountOtp)
  .patch(userController.reactivateAccount);

userRouter
  .route("/change-username")
  .post(isAuthenticatedUser, userController.changeUsername);

userRouter
  .route("/change-email")
  .post(isAuthenticatedUser, userController.changeEmailOtp)
  .patch(isAuthenticatedUser, userController.changeEmail);

userRouter
  .route("/add-change-phone")
  .post(isAuthenticatedUser, userController.addChangePhoneOtp)
  .patch(isAuthenticatedUser, userController.addChangePhone);

userRouter
  .route("/verify-password")
  .post(isAuthenticatedUser, userController.verifyPassword);

userRouter
  .route("/pre-key-bundle")
  .get(isAuthenticatedUser, userController.getPreKeyBundle)
  .post(isAuthenticatedUser, userController.savePreKeyBundle);

userRouter
  .route("/fcm-token")
  .get(isAuthenticatedUser, userController.getFcmToken)
  .post(isAuthenticatedUser, userController.saveFcmToken);


// /// Follow Operations

userRouter
  .route("/follow-user")
  .get(isAuthenticatedUser, userController.followUnfollowUser);


userRouter
  .route("/accept-follow-request")
  .get(isAuthenticatedUser, userController.acceptFollowRequest);

userRouter
  .route('/get-follow-requests')
  .get(isAuthenticatedUser, userController.getFollowRequests);


userRouter
  .route("/cancel-follow-request")
  .get(isAuthenticatedUser, userController.cancelFollowRequest);

userRouter
  .route("/remove-follow-request")
  .delete(isAuthenticatedUser, userController.removeFollowRequest);

userRouter
  .route("/remove-follower")
  .delete(isAuthenticatedUser, userController.removeFollower);

userRouter
  .route("/search-followers")
  .get(isAuthenticatedUser, userController.searchFollowers);

userRouter
  .route("/search-followings")
  .get(isAuthenticatedUser, userController.searchFollowings);

userRouter
  .route("/user-details")
  .get(isAuthenticatedUser, userController.getUserDetails);

userRouter
  .route("/get-user-posts")
  .get(isAuthenticatedUser, userController.getUserPosts);

userRouter
  .route("/get-followings")
  .get(isAuthenticatedUser, userController.getFollowings);

userRouter
  .route("/get-followers")
  .get(isAuthenticatedUser, userController.getFollowers);

userRouter
  .route("/delete-profile")
  .get(isAuthenticatedUser, userController.deleteProfile);

userRouter
  .route("/search-user")
  .get(isAuthenticatedUser, userController.searchUser);

userRouter
  .route("/get-recommend-users")
  .get(isAuthenticatedUser, userController.getRecommendedUsers);

userRouter
  .route("/get-login-history")
  .get(isAuthenticatedUser, userController.getLoginHistory);

userRouter
  .route("/login-info")
  .get(isAuthenticatedUser, userController.getLoginInfo)
  .post(isAuthenticatedUser, userController.saveLoginInfo)
  .delete(isAuthenticatedUser, userController.deleteLoginInfo);

userRouter
  .route("/logout-all-other-devices")
  .delete(isAuthenticatedUser, userController.logoutOtherDevices);

userRouter
  .route("/verify-login-info")
  .get(isAuthenticatedUser, userController.verifyLoginInfo);

userRouter
  .route("/report-user")
  .post(isAuthenticatedUser, userController.reportUser);

userRouter
  .route("/request-verification")
  .post(isAuthenticatedUser, userController.requestVerification);

// userRouter
//   .route("/get-user-activity")
//   .get(isAuthenticatedUser, userController.getUserActivity);

export default userRouter;
