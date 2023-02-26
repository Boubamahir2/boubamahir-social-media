import getProfileDetails from './profile/getProfileDetails.js';
import changePassword from './profile/changePassword.js';
import updateProfile from './profile/updateProfile.js';
import uploadAvatar from './profile-picture/uploadAvatar.js';
import deleteAvatar from './profile-picture/deleteAvatar.js';
import uploadProfilePicture from './profile-picture/uploadProfilePic.js';
import removeProfilePicture from './profile-picture/removeProfilePic.js';
import followUnfollowUser from './follow/followUnfollowUser.js';
import getUserDetails from './user/getUserDetails.js';
import getFollowers from './follow/getFollowers.js';
import getFollowings from './follow/getFollowings.js';
import changeEmailOtp from './profile/changeEmailOtp.js';
import changeEmail from './profile/changeEmail.js';
import changeUsername from './profile/changeUsername.js';
import checkUsernameAvailable from './check-username/checkUsernameAvailable.js';
import deleteProfile from './profile/deleteProfile.js';
import searchUser from './user/searchUser.js';
import getRecommendedUsers from './recommend-users/getRecommendedUsers.js';
import acceptFollowRequest from './follow/acceptFollowRequest.js';
import cancelFollowRequest from './follow/cancelFollowRequest.js';
import removeFollowRequest from './follow/removeFollowRequest.js';
import getUserPosts from './user/getUserPosts.js';
import getFollowRequests from './follow/getFollowRequests.js';
import deactivateAccount from './profile/deactivateAccount.js';
import reactivateAccountOtp from './profile/reactivateAccountOtp.js';
import reactivateAccount from './profile/reactivateAccount.js';
import addChangePhoneOtp from './profile/addChangePhoneOtp.js';
import addChangePhone from './profile/addChangePhone.js';
import verifyPassword from './verify-password/verifyPassword.js';
import removeFollower from './follow/removeFollower.js';
import searchFollowers from './follow/searchFollowers.js';
import searchFollowings from './follow/searchFollowings.js';
import savePreKeyBundle from './profile/savePreKeyBundle.js';
import getPreKeyBundle from './profile/getPreKeyBundle.js';
import saveFcmToken from './profile/saveFcmToken.js';
import getFcmToken from './profile/getFcmToken.js';
import getLoginHistory from './login-info/getLoginHistory.js';
import deleteLoginInfo from './login-info/deleteLoginInfo.js';
import saveLoginInfo from './login-info/saveLoginInfo.js';
import getLoginInfo from './login-info/getLoginInfo.js';
import verifyLoginInfo from './login-info/verifyLoginInfo.js';
import reportUser from './report/reportUser.js';
import requestVerification from './bluetick-requests/requestVerification.js';
import logoutOtherDevices from './login-info/logoutOtherDevices.js';

//  cover picture
import uploadCover from './cover-picture/uploadCover.js';
import selectCover from './cover-picture/selectCover.js';
import removeCoverPicture from './cover-picture/removeCover.js';

const userController = {};
userController.getProfileDetails = getProfileDetails;
userController.changePassword = changePassword;
userController.updateProfile = updateProfile;
userController.uploadAvatar = uploadAvatar;
userController.deleteAvatar = deleteAvatar;
userController.uploadProfilePicture = uploadProfilePicture;
userController.removeProfilePicture = removeProfilePicture;

userController.uploadCover = uploadCover;
userController.selectCover = selectCover;
userController.removeCoverPicture = removeCoverPicture;

userController.followUnfollowUser = followUnfollowUser;
userController.getUserDetails = getUserDetails;
userController.getFollowers = getFollowers;
userController.getFollowings = getFollowings;
userController.changeEmailOtp = changeEmailOtp;
userController.changeEmail = changeEmail;
userController.changeUsername = changeUsername;
userController.checkUsernameAvailable = checkUsernameAvailable;
userController.deleteProfile = deleteProfile;
userController.searchUser = searchUser;
userController.getRecommendedUsers = getRecommendedUsers;
userController.acceptFollowRequest = acceptFollowRequest;
userController.cancelFollowRequest = cancelFollowRequest;
userController.removeFollowRequest = removeFollowRequest;
userController.getUserPosts = getUserPosts;
userController.getFollowRequests = getFollowRequests;
userController.deactivateAccount = deactivateAccount;
userController.reactivateAccountOtp = reactivateAccountOtp;
userController.reactivateAccount = reactivateAccount;
userController.addChangePhoneOtp = addChangePhoneOtp;
userController.addChangePhone = addChangePhone;
userController.verifyPassword = verifyPassword;
userController.removeFollower = removeFollower;
userController.searchFollowers = searchFollowers;
userController.searchFollowings = searchFollowings;

userController.savePreKeyBundle = savePreKeyBundle;
userController.getPreKeyBundle = getPreKeyBundle;

userController.saveFcmToken = saveFcmToken;
userController.getFcmToken = getFcmToken;

userController.getLoginHistory = getLoginHistory;
userController.deleteLoginInfo = deleteLoginInfo;
userController.saveLoginInfo = saveLoginInfo;
userController.getLoginInfo = getLoginInfo;
userController.verifyLoginInfo = verifyLoginInfo;
userController.logoutOtherDevices = logoutOtherDevices;

userController.reportUser = reportUser;
userController.requestVerification = requestVerification;




export default userController;
