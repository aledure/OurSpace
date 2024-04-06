const Post = require('./../models/post.model');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, image, createdBy } = req.body;
    const post = await Post.create({ title, content, image, createdBy });
    console.log("New post created with ID:", post._id); // Log the post's ID
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
    const post = await Post.findByIdAndUpdate(id, { title, content, image }, { new: true });
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
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
      return res.status(404).json({ success: false, error: 'Post not found' });
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
      return res.status(404).json({ success: false, error: 'Post not found' });
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

module.exports = { createPost, editPost, deletePost, getPostById, getPostsByUser };