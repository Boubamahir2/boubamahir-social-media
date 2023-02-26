import LoginInfo from './login-info/loginInfo.js';
import User from './user/User.js';
import Notification from './notification/notification.js';
import Post from './post/Post.js';
import Comment from './comments/Comment.js';
import CommentLike from './comments/CommentLike.js';
import CommentReply from './comments/CommentReply.js';
import Otp from './otp/Otp.js';
import Tag from './hashtag/tag.js';
import PostLike from './post/PostLike.js';
import Follower from './user/follower.js';
import FollowRequest from './request/followRequest.js';
import ChatMessage from './chat/chatMessage.js';
import FcmToken from './user/fcmToken.js';
import PreKeyBundle from './user/preKeyBundle.js';
import FeedbackReport from './reports/feedbackReport.js';
import PostReport from './reports/postReport.js';
import CommentReport from './reports/commentReport.js';
import UserReport from './reports/userReport.js';
import IssueReport from './reports/issueReport.js';
import VerificationRequest from './request/verificationRequest.js';
import AuthToken from './user/authToken.js';
import PollVote from './post/PollVote.js';
import PollOption from './post/PollOption.js';
import PostMedia from './media/PostMedia.js';
import PostReaction from './post/React.js'

const models = {};

models.Comment = Comment;
models.CommentLike = CommentLike;
models.CommentReply = CommentReply;
models.PostReaction = PostReaction;

models.PostMedia = PostMedia;

models.OTP = Otp;

models.Tag = Tag;

models.Post = Post;
models.PostLike = PostLike;
models.PollOption = PollOption;
models.PollVote = PollVote;

models.AuthToken = AuthToken;
models.User = User;
models.LoginInfo = LoginInfo;
models.Follower = Follower;
models.FcmToken = FcmToken;
models.PreKeyBundle = PreKeyBundle;

models.Notification = Notification;

models.ChatMessage = ChatMessage;

models.FeedbackReport = FeedbackReport;
models.PostReport = PostReport;
models.CommentReport = CommentReport;
models.UserReport = UserReport;
models.IssueReport = IssueReport;

models.FollowRequest = FollowRequest;
models.VerificationRequest = VerificationRequest;

export default models;
