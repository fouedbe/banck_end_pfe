const jwt = require("jsonwebtoken");
//VERIFY TOKEN
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "no token provided" });
    }
}
// VERIFY TOKEN 1 AUTHORIZE TH USER
function verifyTokenAndAuthorization(req, res, next) {
verifyToken (req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
    } else {
    return res.status(403).json({ message: "you are not allowed" });
    }
    });
 }
    // VERIFY TOKEN  AUTHORIZE TH USER
function verifyTokenAndAdmin(req, res, next) {
    verifyToken (req, res, () => {
        if (req.user.isAdmin) {
        next();
        } else {
        return res.status(403).json({ message: "you are not allowed,only admin allowed" });
        }
        });
 }
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
}