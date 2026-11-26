 



const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required."
      });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token."
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment.");
      return res.status(500).json({
        success: false,
        message: "Authentication configuration error."
      });
    }

    // Verify token using the expected algorithm.
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"]
    });

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token."
      });
    }

    const user = await User.findById(decoded.id)
      .select("_id userId name role isBlocked isActive")
      .lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found."
      });
    }

    // If your User model uses these fields, enforce them.
    if (user.isBlocked === true || user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Your account is disabled. Contact support."
      });
    }

    req.user = {
      _id: user._id,
      userId: user.userId,
      name: user.name,
      role: user.role
    };

    return next();

  } catch (err) {
    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError" ||
      err.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token."
      });
    }

    console.error("Authentication middleware error:", err);

    return res.status(500).json({
      success: false,
      message: "Authentication failed."
    });
  }
};
