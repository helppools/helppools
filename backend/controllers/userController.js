 


 
const User = require('../models/User');
const sanitizeUser = require('../utils/sanitizeUser');
const SystemStat = require('../models/SystemStat');
const PackageSubscription = require('../models/PackageSubscription');

// 🔍 1. Get User By ID (Dashboard)
exports.getUserById = async (req, res) => {
  try {
    const rawId = req.params.userId || req.params.id;
    const targetUserId = Number(rawId);

    if (!targetUserId || !Number.isFinite(targetUserId)) {
      return res.status(400).json({
        message: 'Invalid User ID format'
      });
    }

    const user = await User.findOne({
      userId: targetUserId
    }).select("+usdtBep20Balance");

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Total Real Users
    const totalRealUsers = await User.countDocuments({
      isToppedUp: true
    });

    // Total Fake Users
    const stat = await SystemStat.findOne();
    const globalFakeCount = stat ? stat.globalFakeCount : 0;

    // =========================================================
    // 12-LEVEL ACTIVE TEAM CALCULATION
    // =========================================================

    const allUsersForTeam = await User.find(
      {},
      'userId sponsorId isToppedUp'
    ).lean();

    const directMap = new Map();

    for (let u of allUsersForTeam) {
      if (u.sponsorId) {
        if (!directMap.has(u.sponsorId)) {
          directMap.set(u.sponsorId, []);
        }

        directMap.get(u.sponsorId).push(u);
      }
    }

    let currentLevelUsers = directMap.get(targetUserId) || [];
    let levelActiveCounts = {};

    for (let depth = 1; depth <= 12; depth++) {
      let activeCount = 0;
      let nextLevelUsers = [];

      for (let u of currentLevelUsers) {
        if (u.isToppedUp) {
          activeCount++;
        }

        const children = directMap.get(u.userId) || [];
        nextLevelUsers.push(...children);
      }

      levelActiveCounts[depth] = activeCount;
      currentLevelUsers = nextLevelUsers;
    }

    // =========================================================
    // $30 RETOPUP ELIGIBILITY
    // Original package: $30
    // Stage 5: ACHIEVED
    // Stage 6: WAITING or RUNNING
    // =========================================================

    
    // =========================================================
    // $30 RETOPUP ELIGIBILITY
    // Stage 5: ACHIEVED
    // Any stage from Stage 6 onward: RUNNING or ACHIEVED
    // =========================================================

    let retopupEligible30 = false;
    let retopupSubscriptionId = null;

    const original30Subscription = await PackageSubscription.findOne({
      userId: targetUserId,
      packageAmount: 30,
      status: "ACTIVE",
      $and: [
        {
          stages: {
            $elemMatch: {
              stageNumber: 5,
              status: "ACHIEVED"
            }
          }
        },
        {
          stages: {
            $elemMatch: {
              stageNumber: { $gte: 6 },
              status: {
                $in: ["RUNNING", "ACHIEVED"]
              }
            }
          }
        }
      ]
    })
      .select("_id")
      .sort({ createdAt: -1 })
      .lean();

    if (original30Subscription) {
      retopupEligible30 = true;
      retopupSubscriptionId = original30Subscription._id;
    }

    // =========================================================
    // DASHBOARD RESPONSE
    // =========================================================

    res.json({
      success: true,

      user: {
        ...sanitizeUser(user),

        // Existing 12-level data
        levelActiveCounts: levelActiveCounts,

        // $30 retopup eligibility
        retopupEligible30: retopupEligible30,
        retopupSubscriptionId: retopupSubscriptionId
      },

      totalRealUsers: totalRealUsers,
      globalFakeCount: globalFakeCount
    });

  } catch (err) {
    console.error("Dashboard Fetch Error:", err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// 👤 2. Get Sponsor Name (Registration Verification)
exports.getSponsorName = async (req, res) => {
  try {
    const { id } = req.params;

    const sponsor = await User.findOne({
      userId: parseInt(id)
    });

    if (!sponsor) {
      return res.status(404).json({
        message: 'Invalid Sponsor'
      });
    }

    res.json({
      name: sponsor.name
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error fetching sponsor'
    });
  }
};


// 🔒 3. Block User (Admin Access)
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        userId: req.params.id
      },
      {
        isBlocked: true
      },
      {
        returnDocument: 'after'
      }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User blocked successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// 🔓 4. Unblock User (Admin Access)
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        userId: req.params.id
      },
      {
        isBlocked: false
      },
      {
        returnDocument: 'after'
      }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User unblocked successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// 📋 5. Get All Users (Admin Access)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      userId: 1
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};
