import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import models from '../../../../models/index.js';
import utility from '../../../../utils/utility.js';

const reactPost = catchAsyncError(async (req, res, next) => {
  const { postId, react } = req.body;
  const userId = req.user._id;

  // Find the post
  const post = await models.Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Find the existing reaction for this user on this post
  const existingReaction = await models.PostReaction.findOne({
    post: postId,
    user: userId,
  });

  // If the user has already reacted with the same reaction, remove it
  if (existingReaction && existingReaction.react === react) {
    await existingReaction.remove();
    await models.Post.findByIdAndUpdate(postId, {
      $inc: { [`reactions.${react}`]: -1 },
    });
    return res.status(200).json({ message: 'Reaction removed' });
  }

  // If the user has already reacted with a different reaction, update it
  if (existingReaction && existingReaction.react !== react) {
    await existingReaction.updateOne({ react });
    await models.Post.findByIdAndUpdate(postId, {
      $inc: {
        [`reactions.${existingReaction.react}`]: -1,
        [`reactions.${react}`]: 1,
      },
    });
    return res.status(200).json({ message: 'Reaction updated' });
  }

  // If the user has not reacted before, create a new reaction
  const newReaction = new models.PostReaction({
    react,
    post: postId,
    user: userId,
  });

  await newReaction.save();
  await models.Post.findByIdAndUpdate(postId, {
    $inc: { [`reactions.${react}`]: 1 },
  });
  return res.status(200).json({
    success: true,
    message: ResponseMessages.REACTED_TO_A_POST,
  });
});

export default reactPost;
