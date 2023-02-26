import createPost from './post/createPost.js';
import createPoll from './poll/createPoll.js';
import voteToPoll from './poll/voteToPoll.js';
import getSingleUserPosts from './post/getPosts.js';
import getAllPosts from './post/getAllPosts.js';
import likeUnlikePost from './post/likeUnlikePost.js';
import deletePost from './post/deletePost.js';
import getPostDetails from './post/getPostDetails.js';
import addComment from './comment/addComment.js';
import getComments from './comment/getComments.js';
import likeUnlikeComment from './comment/likeUnlikeComment.js';
import deleteComment from './comment/deleteComment.js';
import createUploadPost from './post/createUploadPost.js';
import getLikedUsers from './post/getLikedUsers.js';
import getTrendingPosts from './post/getTrendingPosts.js';
import searchPosts from './post/searchPost.js';
import reportPost from './post/reportPost.js';
import reportComment from './comment/reportComment.js';
import updatePost from './post/updatePost.js';

// post reaction
import reactUnreactPost from './post/ReactUreactPost.js';
import getAllPostReactions from './post/getAllPostReactions.js'
import reactPost from './post/reactions.js';
import getReacts from './post/getAllReactions.js';

const postController = {};

postController.createPost = createPost;
postController.updatePost = updatePost;
postController.createPoll = createPoll;
postController.voteToPoll = voteToPoll;
postController.getSingleUserPosts =  getSingleUserPosts;
postController.getAllPosts =  getAllPosts;
postController.likeUnlikePost = likeUnlikePost;
postController.deletePost = deletePost;
postController.getPostDetails = getPostDetails;
postController.addComment = addComment;
postController.getComments = getComments;
postController.likeUnlikeComment = likeUnlikeComment;
postController.deleteComment = deleteComment;
postController.createUploadPost = createUploadPost;
postController.getLikedUsers = getLikedUsers;
postController.getTrendingPosts = getTrendingPosts;
postController.searchPosts = searchPosts;

postController.reportPost = reportPost;
postController.reportComment = reportComment;

// post reaction
postController.reactPost = reactPost;
postController.getReacts = getReacts;
postController.getAllPostReactions = getAllPostReactions;
postController.reactUnreactPost = reactUnreactPost;


export default postController;
