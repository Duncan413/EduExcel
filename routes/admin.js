const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');


// GET all users (Admin only)
router.get('/users', auth, roleMiddleware(['admin']), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update a user (Admin only)
router.put('/users/:userId', auth, roleMiddleware(['admin']), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a user (Admin only)
router.delete('/users/:userId', auth, roleMiddleware(['admin']), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.json({ msg: 'User deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
