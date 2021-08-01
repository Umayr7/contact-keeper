const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token. Authorization failed' });
    }

    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));

        req.user = decode.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token. Authorization failed' });
    }
};