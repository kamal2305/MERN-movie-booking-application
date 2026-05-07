const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token || !token.trim()) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }
    try {
        const decrypted = jwt.verify(token, process.env.SECRET_KEY);
        req.adminId = decrypted.id;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
};

module.exports = authMiddleware;
