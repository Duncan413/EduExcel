// middleware/roleMiddleware.js
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        console.log('Request user object:', req.user);  // Log entire req.user
        if (!req.user) {
            return res.status(403).json({ msg: 'User object not found in request' });
        }

        console.log('User role:', req.user.role); // Log the role of the user
        console.log('Allowed roles:', roles); // Log the roles that are allowed

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};

module.exports = roleMiddleware;

