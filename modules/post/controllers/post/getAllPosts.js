import catchAsyncError from '../../../../helpers/catchAsyncError.js';
import models from '../../../../models/index.js';
import utility from '../../../../utils/utility.js';

/// GET All POSTS  ///

const getAllPosts = catchAsyncError(async (req, res, next) => {
  let currentPage = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 20;

  const totalPosts = await models.Post.find({
    postStatus: 'active',
  }).countDocuments();

  let totalPages = Math.ceil(totalPosts / limit);

  if (totalPages <= 0) {
    totalPages = 1;
  }

  if (currentPage <= 1) {
    currentPage = 1;
  }

  if (totalPages > 1 && currentPage > totalPages) {
    currentPage = totalPages;
  }

  let skip = currentPage > 0 ? (currentPage - 1) * limit : 0;

  let prevPageIndex = null;
  let hasPrevPage = false;
  let prevPage = null;
  let nextPageIndex = null;
  let hasNextPage = false;
  let nextPage = null;

  if (currentPage < totalPages) {
    nextPageIndex = currentPage + 1;
    hasNextPage = true;
  }

  if (currentPage > 1) {
    prevPageIndex = currentPage - 1;
    hasPrevPage = true;
  }

  const baseUrl = `${req.protocol}://${req.get('host')}${
    req.originalUrl
  }`.split('?')[0];

  if (hasPrevPage) {
    prevPage = `${baseUrl}?page=${prevPageIndex}&limit=${limit}`;
  }

  if (hasNextPage) {
    nextPage = `${baseUrl}?page=${nextPageIndex}&limit=${limit}`;
  }

  const slicedPosts = await models.Post.find({
    postStatus: 'active',
  })
    .select('_id')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const results = [];

  for (let post of slicedPosts) {
    const postData = await utility.getPostData(post._id, req.user);

    if (postData) {
      results.push(postData);
    }
  }

  res.status(200).json({
    success: true,
    currentPage,
    totalPages,
    limit,
    hasPrevPage,
    prevPage,
    hasNextPage,
    nextPage,
    results,
  });
});

export default getAllPosts;
