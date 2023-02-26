import ResponseMessages from '../../../../constants/responseMessages.js';
import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import ErrorHandler from '../../../../helpers/errorHandler.js';
import models from '../../../../models/index.js';
import utility from '../../../../utils/utility.js';


const getAllReactions= catchAsyncError(async (req, res, next) => {
 const posts = await models.Post.find().lean();

 // Loop through each post and calculate the total reactions
 const postsWithReactions = posts.map((post) => {
   let totalReactions = 0;
   for (const reaction in post.reactions) {
     totalReactions += post.reactions[reaction];
   }
   return {
     ...post,
     totalReactions,
   };
 });

 res.status(200).json({
   status: 'success',
   data: {
     posts: postsWithReactions,
   },
 });
});

export default getAllReactions;