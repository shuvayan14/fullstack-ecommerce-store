// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select("-password");

      // Verify if administrative privilege bit matches true status
      if (req.user && req.user.isAdmin) {
        next(); // Authorization cleared, proceed to route processing execution
      } else {
        res.status(403).json({ message: "Not authorized as an Admin" });
      }
    } catch (error) {
      res.status(401).json({ message: "Token verification authorization failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token provided, access denied" });
  }
};

module.exports = { protectAdmin };