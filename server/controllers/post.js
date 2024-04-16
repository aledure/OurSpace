const Post = require("./../models/post.model");
const mongoose = require("mongoose");
const User = require("./../models/user.model");

const createPost = async (req, res) => {
  try {
    const { title, content, image, createdBy } = req.body;

    // Convert createdBy string to ObjectId
    const createdByObjectId = new mongoose.Types.ObjectId(createdBy);

    // Create the post
    const post = await Post.create({ title, content, image, createdBy: createdByObjectId });
    console.log("New post created with ID:", post._id);

    // Update the user's document to include the new post in the posts array
    await User.findByIdAndUpdate(createdByObjectId, { $push: { posts: post._id } });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Edit a post
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Fetch a single post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Fetch all posts by a given user
const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ createdBy: userId });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Fetch all posts by all users
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Like A Post

const likePost = async (req, res) => {
  try {
    // const {userId} = req.user
    const userId = 'asdfasdfasdfs'
    const id = req.params.id
    if (!id) {
      res.status(400).json({ success: false, error: 'Server Error' });
    }
    const post = await Post.findById(id);

    //Increase likes
    post.like += 1;
    // post.usersLiked.push(userId);

    await post.save();

    res.status(200).json({ success: true, message: `Post Liked!` });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getPostById,
  getPostsByUser,
  getAllPosts,
  likePost,
};
