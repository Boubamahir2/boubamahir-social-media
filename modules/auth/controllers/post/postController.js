import { StatusCodes } from 'http-status-codes';
import path from 'path'; // its available in nodejs
import models from '../../models/index.js';

// create a new Post // its the a private route
const createPost = async (req, res) => {
  // user is the user that is in our Post schema and setting the user to the userID that is in the request which is coming from the cookies
  req.body.user = req.user.userId;
  const Post = await models.Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ Post });
};

// get all Posts // its the a public route
const getAllPosts = async (req, res) => {
  const Posts = await models.Post.find({});

  res.status(StatusCodes.OK).json({ Posts, count: Posts.length });
};


// get a single Post //its the a public route as well
const getSinglePost = async (req, res) => {
  const { id: PostId } = req.params;

  const Post = await models.Post.findOne({ _id: PostId }).populate('reviews');

  if (!Post) {
    throw new CustomError.NotFoundError(`No Post with id : ${PostId}`);
  }
  res.status(StatusCodes.OK).json({ Post });
};

// update a Post // its the a private route
const updatePost = async (req, res) => {
  const { id: PostId } = req.params;

  const Post = await models.Post.findOneAndUpdate({ _id: PostId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!Post) {
    throw new CustomError.NotFoundError(`No Post with id : ${PostId}`);
  }
  res.status(StatusCodes.OK).json({ Post });
};

// delete a Post // its the a private route
const deletePost = async (req, res) => {
  const { id: PostId } = req.params;

  const Post = await models.Post.findOne({ _id: PostId });

  if (!Post) {
    throw new CustomError.NotFoundError(`No Post with id : ${PostId}`);
  }

  await Post.remove(); //the remove method is used to delete the Post and its reviews as well since we have declared method pre('remove') in the Post schema
  res.status(StatusCodes.OK).json({ msg: 'Success! Post removed.' });
};

// upload a Post image // its the a private route
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const postImage = req.files.image;

  if (!postImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (postImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${postImage.name}`
  );
  await postImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${postImage.name}` });
};

export {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  uploadImage,
};
