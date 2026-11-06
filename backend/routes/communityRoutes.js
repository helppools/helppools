
// const express = require("express");
// const router = express.Router();

// const {
//   getCommunityStats,
//   updateDemoSettings
// } = require("../controllers/communityController");

// // Apne project ke actual auth middleware paths use karein
// const auth = require("../middleware/authMiddleware");
// const adminAuth = require("../middleware/adminMiddleware");

// router.get("/stats", auth, getCommunityStats);

// router.put("/demo-settings", auth, adminAuth, updateDemoSettings);

// module.exports = router;


const express = require("express");
const router = express.Router();

const User = require("../models/User");
const DemoCounter = require("../models/DemoCounter");
const FakeUser = require("../models/FakeUser");

const auth = require("../middleware/authMiddleware");

// Community statistics
router.get("/stats", auth, async (req, res) => {
  try {
    const [totalRealUsers, demo, activeDownline] = await Promise.all([
      User.countDocuments({}),
      DemoCounter.findOne({ name: "community" }).lean(),
      User.countDocuments({ isToppedUp: true })
    ]);

    const demoUsers = demo?.demoUsers || 0;

    return res.json({
      success: true,
      data: {
        totalRealUsers,
        demoUsers,
        totalCommunity: totalRealUsers + demoUsers,
        activeDownline,
        demoEnabled: demo?.enabled || false
      }
    });
  } catch (error) {
    console.error("Community Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch community statistics"
    });
  }
});

// Global real + demo users list
// Is route ko abhi unchanged rakho.

// Global real + demo users list
router.get("/global-list", async (req, res) => {
  try {
    const realUsers = await User.find({ isToppedUp: true })
      .select("userId name country topUpDate createdAt topUpAmount updatedAt")
      .sort({ topUpDate: -1 })
      .limit(100)
      .lean();

    const formattedReal = realUsers.map((u) => ({
      userId: u.userId,
      name: u.name,
      country: (u.country || "IN").toUpperCase(),
      date: u.topUpDate || u.createdAt,
      amount: u.topUpAmount || 30,
      isActive: true,
      type: "real"
    }));

    const fakeUsers = await FakeUser.find()
      .sort({ date: -1 })
      .limit(100)
      .lean();

    const formattedFake = fakeUsers.map((u) => ({
      userId: u.userId,
      name: u.name,
      country: (u.country || "IN").toUpperCase(),
      date: u.date,
      amount: u.topUpAmount || 30,
      isActive: true,
      type: "fake"
    }));

    const combinedList = [...formattedReal, ...formattedFake]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 100);

    return res.json({
      success: true,
      count: combinedList.length,
      data: combinedList
    });
  } catch (error) {
    console.error("Global List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
