const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { register, login, me } = require('../controllers/user');

// Request Methods
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

module.exports = router;
