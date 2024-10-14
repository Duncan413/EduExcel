// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jwt
const JWT_SECRET = process.env.JWT_SECRET;


// Register new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: req.body.role || 'student' // Ensure role is assigned, default to student
        });

        await user.save();

        // Include role in token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Include role here
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ msg: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send('Server error');
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Include role in token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Include role here
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            msg: 'Login successful', 
            token, 
            role: user.role  // Add the role to the response
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).send('Server error');
    }
};


module.exports = { registerUser, loginUser };

