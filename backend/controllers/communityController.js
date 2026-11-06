
const User = require("../models/User");
const DemoCounter = require("../models/DemoCounter");

// GET COMMUNITY STATISTICS
exports.getCommunityStats = async (req, res) => {
  try {
    const [totalRealUsers, activeDownline] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({
        sponsorId: Number(req.user.userId),
        isBlocked: false,
        $or: [
          { isToppedUp: true },
          { topUpAmount: { $gt: 0 } }
        ]
      })
    ]);

    const demo = await DemoCounter.findOne({
      name: "community"
    }).lean();

    const demoUsers = demo?.demoUsers || 0;

    res.json({
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
    console.error("Community stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load community statistics"
    });
  }
};


// ADMIN: UPDATE DEMO SETTINGS
exports.updateDemoSettings = async (req, res) => {
  try {
    const {
      demoUsers,
      enabled,
      incrementBy,
      intervalMinutes
    } = req.body;

    const update = {};

    if (demoUsers !== undefined) {
      const value = Number(demoUsers);

      if (!Number.isInteger(value) || value < 0) {
        return res.status(400).json({
          success: false,
          message: "Demo users must be a non-negative integer"
        });
      }

      update.demoUsers = value;
    }

    if (enabled !== undefined) {
      if (typeof enabled !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "Enabled must be true or false"
        });
      }

      update.enabled = enabled;
    }

    if (incrementBy !== undefined) {
      const value = Number(incrementBy);

      if (!Number.isInteger(value) || value < 1 || value > 100) {
        return res.status(400).json({
          success: false,
          message: "Increment must be between 1 and 100"
        });
      }

      update.incrementBy = value;
    }

    if (intervalMinutes !== undefined) {
      const value = Number(intervalMinutes);

      if (!Number.isInteger(value) || value < 1 || value > 10080) {
        return res.status(400).json({
          success: false,
          message: "Interval must be between 1 and 10080 minutes"
        });
      }

      update.intervalMinutes = value;
    }

    const demo = await DemoCounter.findOneAndUpdate(
      { name: "community" },
      { $set: update, $setOnInsert: { name: "community" } },
    //   { new: true, upsert: true, runValidators: true }
    {
    upsert: true,
    returnDocument: 'after',
    runValidators: true
}
    );

    res.json({
      success: true,
      message: "Demo settings updated",
      data: demo
    });
  } catch (error) {
    console.error("Demo settings error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update demo settings"
    });
  }
};


// AUTOMATIC DEMO COUNTER

exports.incrementDemoCounter = async () => {
  try {
    const now = new Date();

    const demo = await DemoCounter.findOne({
      name: "community"
    });

    if (!demo || !demo.enabled) return;

    const intervalMs = demo.intervalMinutes * 60 * 1000;

    const isDue =
      !demo.lastIncrementAt ||
      now.getTime() - demo.lastIncrementAt.getTime() >= intervalMs;

    if (!isDue) return;

    const result = await DemoCounter.updateOne(
      {
        _id: demo._id,
        enabled: true,
        lastIncrementAt: demo.lastIncrementAt
      },
      {
        $inc: { demoUsers: demo.incrementBy },
        $set: { lastIncrementAt: now }
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `Demo counter increased by ${demo.incrementBy}`
      );
    }
  } catch (error) {
    console.error("Demo counter error:", error);
  }
};

