const express = require('express');
const router = express.Router();

const { createPost, editPost, deletePost, getPostById, getPostsByUser } = require('../controllers/post');


// Create a new post
router.post('/', createPost);

// Edit a post
router.put('/:id', editPost);

// Delete a post
router.delete('/:id', deletePost);

// Fetch a single post by ID
router.get('/:id', getPostById);

// Fetch all posts by a given user
router.get('/user/:userId', getPostsByUser);

module.exports = router;
