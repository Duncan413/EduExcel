const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Ensure your .env file contains JWT_SECRET

// Log to check if JWT_SECRET is loaded properly
console.log('JWT_SECRET:', JWT_SECRET);

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');  // Use x-auth-token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log('Token verification error:', error.message);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};


module.exports = auth;


