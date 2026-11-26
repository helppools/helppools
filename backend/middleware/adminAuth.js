// const jwt = require("jsonwebtoken");

// const verifyAdmin = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
  
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: Missing token" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // 🔥 NEW FIX: Check karo ki role sach mein "admin" hai
//     if (decoded.role !== "admin") {
//       console.log("❌ Blocked: A Normal User token tried to access Admin route!");
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = verifyAdmin;



const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required"
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    // Verify signed admin token
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"]
    });

    // Existing admin login stores MongoDB _id in decoded.adminId
    const adminMongoId = decoded.adminId;

    if (!adminMongoId || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access denied"
      });
    }

    // Verify admin directly from Admin collection
    const admin = await Admin.findById(adminMongoId)
      .select("_id adminId role")
      .lean();

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account not found or access denied"
      });
    }

    // Keep compatibility with existing admin.js code
    req.admin = {
      id: admin._id,
      _id: admin._id,
      adminId: admin._id,
      loginAdminId: admin.adminId,
      role: admin.role
    };

    return next();

  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "CastError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired admin token"
      });
    }

    console.error("Admin Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Admin authentication failed"
    });
  }
};

module.exports = verifyAdmin;
