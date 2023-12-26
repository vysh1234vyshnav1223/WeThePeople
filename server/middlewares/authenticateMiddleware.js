const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized Access: Token Invalid' });
        }
        req.user = userData;
        next();
    });
};

module.exports = {
    authenticateUser,
}