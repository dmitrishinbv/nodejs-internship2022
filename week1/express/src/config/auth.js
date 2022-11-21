const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);

        console.log(`decoded=${JSON.stringify(decoded)}`);
        // decoded={"user_id":1,"name":"Bret","iat":1668931450,"exp":1668933250}
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: err });
    }

    return next();
};

module.exports = verifyToken;
