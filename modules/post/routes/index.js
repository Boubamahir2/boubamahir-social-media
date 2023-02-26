import { Router } from 'express';
import multerMiddleware from '../../../middleware/multer.js';
import authMiddleware from '../../../middleware/authentication.js';
import postController from '../controllers/index.js';

const postRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

postRouter
  .route('/create-post')
  .post(isAuthenticatedUser, postController.createPost);

postRouter
  .route('/create-poll')
  .post(isAuthenticatedUser, postController.createPoll);

postRouter
  .route('/vote-to-poll')
  .post(isAuthenticatedUser, postController.voteToPoll);

postRouter
  .route('/create-upload-post')
  .post(
    multerMiddleware.array('mediaFiles'),
    isAuthenticatedUser,
    postController.createUploadPost
  );

postRouter
  .route('/get-user-posts')
  .get(isAuthenticatedUser, postController.getSingleUserPosts);
postRouter

  .route('/get-posts')
  .get(isAuthenticatedUser, postController.getAllPosts);

postRouter
  .route('/get-trending-posts')
  .get(isAuthenticatedUser, postController.getTrendingPosts);

postRouter
  .route('/like-post')
  .get(isAuthenticatedUser, postController.likeUnlikePost);

  // raect to a post
postRouter
  .route('/react-to-post')
  .patch(isAuthenticatedUser, postController.reactUnreactPost)
  .get(isAuthenticatedUser, postController.getReacts);
  
  postRouter
  .route('/react-to-post/:id')
  .get(isAuthenticatedUser, postController.getAllPostReactions);

postRouter
  .route('/get-post-liked-users')
  .get(isAuthenticatedUser, postController.getLikedUsers);

postRouter
  .route('/get-or-remove-post')
  .get(isAuthenticatedUser, postController.getPostDetails)
  .delete(isAuthenticatedUser, postController.deletePost)
  .patch(isAuthenticatedUser, postController.updatePost);

postRouter
  .route('/search-posts')
  .get(isAuthenticatedUser, postController.searchPosts);

postRouter
  .route('/report-post')
  .post(isAuthenticatedUser, postController.reportPost);

/// COMMENTS ///

postRouter
  .route('/add-comment')
  .post(isAuthenticatedUser, postController.addComment);

postRouter
  .route('/get-comments')
  .get(isAuthenticatedUser, postController.getComments);

postRouter
  .route('/like-comment')
  .get(isAuthenticatedUser, postController.likeUnlikeComment);

postRouter
  .route('/delete-comment')
  .delete(isAuthenticatedUser, postController.deleteComment);

postRouter
  .route('/report-comment')
  .post(isAuthenticatedUser, postController.reportComment);

export default postRouter;
