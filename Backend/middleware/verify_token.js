const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
    const token = req.headers.cookie?.split("session_token=")[1]
    if (!token) return res.status(401).json({ message: "Access Denied." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = verify_token;
