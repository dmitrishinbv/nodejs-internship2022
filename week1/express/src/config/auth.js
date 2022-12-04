const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({ message: err });
    }

    return next();
};

module.exports = verifyToken;
