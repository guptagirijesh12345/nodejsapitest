const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        // console.log(req.headers.authorization)
        const authHeader = req.headers.authorization;

        // Check Authorization Header
        if (!authHeader) {
            return res.status(401).json({success: false,message: "Access denied. Token missing."});
        }

        // Check Bearer Token
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false,message: "Invalid token format."});
        }


        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({success: false,message: err.message});
    }
};

module.exports = auth;