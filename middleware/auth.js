// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Use the same secret key from authController.js

// Middleware function to verify token
const auth = (req, res, next) => {
    // Get token from the request header
    const token = req.header('x-auth-token');

    // Check if no token is present
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user from token payload to request object
        req.user = decoded.user;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
