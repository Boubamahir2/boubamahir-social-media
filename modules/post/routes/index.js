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
  .route('/get-posts')
  .get(isAuthenticatedUser, postController.getPosts);

postRouter
  .route('/get-trending-posts')
  .get(isAuthenticatedUser, postController.getTrendingPosts);

postRouter
  .route('/like-post')
  .get(isAuthenticatedUser, postController.likeUnlikePost);

postRouter
  .route('/get-post-liked-users')
  .get(isAuthenticatedUser, postController.getLikedUsers);

postRouter
  .route('/post')
  .get(isAuthenticatedUser, postController.getPostDetails)
  .delete(isAuthenticatedUser, postController.deletePost);
// .put(isAuthenticatedUser, updatePost)

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