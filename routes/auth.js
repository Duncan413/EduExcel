// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth'); // Import the middleware
const User = require('../models/User'); // Import your User model

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

// New route to get the logged-in user's information, including role
router.get('/me', auth, async (req, res) => {
    try {
        // Find the user by ID and exclude sensitive information if necessary
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Send user information including role
        res.json({
            id: user._id,
            username: user.name,
            email: user.email,
            role: user.role, // Assuming 'role' is a field in your User model
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;


