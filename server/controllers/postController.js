const Post = require("../models/postModel");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");

// ========================== Create Post
// POST : api/posts
// Protected

const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail", 422)
      );
    }
    const { thumbnail } = req.files;
    // Check file size
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail too big.Shoud be less than 2mb", 422)
      );
    }

    let fileName = thumbnail.name;
    let splittedName = fileName.split(".");
    let newFileName =
      splittedName[0] + uuid() + "." + splittedName[splittedName.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFileName,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't created", 422));
          }
          // Find user to update user's post
          const currentUser = await User.findById(req.user.id);
          const userPosts = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPosts });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== Get All Posts
// Get : api/posts
// Unprotected

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== Get Single Post
// Get : api/posts/:id
// Unprotected

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(new HttpError("There is not post with this id", 422));
    }
    res.status(200).json(post);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== Get Posts By Category
// GET : api/posts/categories/:category
// Unprotected

const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category });
    res.status(200).json(posts);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== Get Author Post
// GET : api/posts/users/:id
// Unprotected

const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {}
};

// ========================== Edit Post
// PATCH : api/posts/:id
// Protected

const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    let { title, description, category } = req.body;
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const oldPost = await Post.findById(postId);
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, description, category },
          { new: true }
        );
      } else {
        // delete old thumbnail
        fs.unlink(
          path.join(__dirname, "..", "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        // upload new thumbnail
        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
          return next(
            new HttpError("Thumbnail too big.Should be less than 2mb")
          );
        }
        fileName = thumbnail.name;
        let splittedName = fileName.split(".");
        newFileName =
          splittedName[0] +
          uuid() +
          "." +
          splittedName[splittedName.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFileName),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFileName },
          { new: true }
        );
      }
    } else {
      return next(new HttpError("Post couldn't be edited", 400));
    }

    if (!updatedPost) {
      return next(new HttpError("Couldn't created post", 400));
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== Create Post
// Delete : api/posts/:id
// Protected

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    // delete thumbanil from uploads folder
    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
            res.json(`Post ${postId} deleted succesfully`);
          }
        }
      );
    } else {
      return next(new HttpError("Post couldn't be deleted", 422));
    }
  } catch (err) {
    return next(new HttpError(err));
  }
};

module.exports = {
  deletePost,
  editPost,
  getCatPosts,
  getUserPosts,
  getPost,
  getAllPosts,
  createPost,
};
