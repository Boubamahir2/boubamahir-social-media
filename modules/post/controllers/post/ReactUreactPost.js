import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import models from '../../../../models/index.js';
import utility from '../../../../utils/utility.js';
import { sendNotification } from '../../../../firebase/index.js';

const reactUnreactPost = catchAsyncError(async (req, res, next) => {
  const validReactions = ['like', 'love', 'haha', 'sad', 'angry', 'wow'];
  const reaction = req.query.reaction;

  if (!req.query.id || !reaction || !validReactions.includes(reaction)) {
    return next(
      new ErrorHandler(ResponseMessages.INVALID_QUERY_PARAMETERS, 400)
    );
  }

  const post = await models.Post.findById(req.query.id).select([
    '_id',
    'owner',
    'mediaFiles',
  ]);

  if (!post) {
    return next(new ErrorHandler(ResponseMessages.POST_NOT_FOUND, 404));
  }

  const isReacted = await utility.checkIfPostReacted(
    post._id,
    req.user,
    reaction
  );

  if (isReacted) {
    await models.PostReaction.findOneAndDelete({
      post: post._id,
      user: req.user._id,
      reaction: reaction,
    });

    // update reaction
    post.updateReaction(reaction, false);
    await post.save();

    res.status(200).json({
      success: true,
      message: ResponseMessages.POST_UNREACTED,
    });
  } else {
    await models.PostReaction.create({
      post: post._id,
      user: req.user._id,
      reaction: reaction,
    });

    post.updateReaction(reaction, true);
    await post.save();

    const notification = await models.Notification.findOne({
      to: post.owner,
      from: req.user._id,
      refId: post._id,
      type: 'postReaction',
      reaction: reaction,
    });

    let fcmToken;
    const isPostOwner = await utility.checkIfPostOwner(post._id, req.user);

    if (!notification && !isPostOwner) {
      const noti = await models.Notification.create({
        to: post.owner,
        from: req.user._id,
        body: 'reacted on your post',
        refId: post._id,
        type: 'postReaction',
        reaction: reaction,
      });

      const notificationData = await utility.getNotificationData(
        noti._id,
        req.user
      );

      fcmToken = await models.FcmToken.findOne({
        user: post.owner,
      }).select('token');
      if (fcmToken) {
        let image = null;
        if (post.postType === 'media') {
          image =
            post.mediaFiles[0].mediaType === 'image'
              ? post.mediaFiles[0].url
              : post.mediaFiles[0].thumbnail.url;
        }

        await sendNotification(fcmToken.token, {
          title: 'New Reaction',
          body: `${notificationData.from.username} reacted on your post with ${reaction}.`,
          type: 'Reactions',
          image: image,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: ResponseMessages.REACTED_TO_A_POST,
      reaction: reaction,
    });
  }
});

export default reactUnreactPost;
