import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import models from '../../../../models/index.js';
import utility from '../../../../utils/utility.js';


const getPostReactions = catchAsyncError(async (req, res, next) => {
  // Get the post id from the request parameters
  const postId = req.params.id;

  // Query the post by id
  const post = await models.Post.findById(postId);

  // If the post doesn't exist, return an error response
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  // Calculate reactions for the post
  const likeCount = Number(post.reactions.like) || 0;
  const totalCount = Number(post.totalReactions) || 0;

  // Return the post reactions
  res.status(200).json({
    success: true,
    data: {
      post: post,
      reactions: post.reactions,
      total: totalCount,
      like: likeCount,
      love: post.reactions.love,
      haha: post.reactions.haha,
      sad: post.reactions.sad,
      angry: post.reactions.angry,
      wow: post.reactions.wow,
    },
  });
});

export default getPostReactions;
