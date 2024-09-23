// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth'); // Import the middleware

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route example: Get logged-in user profile
router.get('/profile', auth, (req, res) => {
    try {
        res.json({ msg: `Welcome, User ${req.user.id}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

