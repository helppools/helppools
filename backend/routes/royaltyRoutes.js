
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const RoyaltyReward = require("../models/RoyaltyReward");
const authMiddleware = require("../middleware/authMiddleware");

const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

function getFirstTopUp(user) {
  if (!user) return null;

  const packages = (user.packages || [])
    .filter((pkg) => {
      return (
        Number(pkg.amount) > 0 &&
        pkg.startDate &&
        !Number.isNaN(new Date(pkg.startDate).getTime())
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    );

  if (packages.length > 0) {
    return {
      amount: Number(packages[0].amount),
      date: new Date(packages[0].startDate)
    };
  }

  // Fallback for older user records.
  if (
    user.isToppedUp === true &&
    Number(user.topUpAmount) > 0 &&
    user.topUpDate &&
    !Number.isNaN(new Date(user.topUpDate).getTime())
  ) {
    return {
      amount: Number(user.topUpAmount),
      date: new Date(user.topUpDate)
    };
  }

  return null;
}

function getRoyaltyTier(count) {
  if (count >= 15) {
    return { tier: 15, amount: 150 };
  }

  if (count >= 10) {
    return { tier: 10, amount: 70 };
  }

  if (count >= 5) {
    return { tier: 5, amount: 30 };
  }

  return { tier: 0, amount: 0 };
}

router.get("/status/:userId", authMiddleware, async (req, res) => {
  try {
    const requestedId = Number(req.params.userId);
    const loggedInId = Number(req.user.userId);

    if (
      !Number.isSafeInteger(requestedId) ||
      requestedId <= 0 ||
      requestedId !== loggedInId
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    const owner = await User.findOne({
      userId: requestedId
    })
      .select(
        "userId role packages isToppedUp topUpAmount topUpDate royaltyProcessedAt royaltyIncome totalRoyaltyIncome royaltyDirectCount"
      )
      .lean();

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Get first successful top-up.
    const firstTopUp = getFirstTopUp(owner);

    // Hide Royalty offer until first successful top-up.
    if (!firstTopUp) {
      return res.json({
        success: true,
        royalty: null
      });
    }

    const activationAt = firstTopUp.date;

    const expiresAt = new Date(
      activationAt.getTime() + FIVE_DAYS_MS
    );

    const now = new Date();

    const remainingMs = Math.max(
      0,
      expiresAt.getTime() - now.getTime()
    );

    const isExpired = now >= expiresAt;

    // Fetch direct referrals.
    const directUsers = await User.find({
      sponsorId: requestedId
    })
      .select(
        "userId packages isToppedUp topUpAmount topUpDate"
      )
      .lean();

    // Count unique direct referrals whose first top-up
    // was exactly $30 within the owner's 5-day window.
    const qualifyingDirects = directUsers.filter((direct) => {
      const directFirstTopUp = getFirstTopUp(direct);

      return (
        directFirstTopUp &&
        directFirstTopUp.amount === 30 &&
        directFirstTopUp.date >= activationAt &&
        directFirstTopUp.date <= expiresAt
      );
    });

    const directCount = new Set(
      qualifyingDirects.map((user) => Number(user.userId))
    ).size;

    const tier = getRoyaltyTier(directCount);

    const isLeader =
      String(owner.role || "").toLowerCase() === "leader";

    // Get final processed reward record, if available.
    const rewardRecord = await RoyaltyReward.findOne({
      userId: requestedId
    })
      .select(
        "directCount rewardAmount rewardTier status transactionId processedAt"
      )
      .lean();

    const processed = Boolean(
      owner.royaltyProcessedAt || rewardRecord
    );

    return res.json({
      success: true,
      royalty: {
        activationAt,
        expiresAt,

        // Timer
        remainingMs,
        isExpired,

        // First top-up information
        firstTopUpAmount: firstTopUp.amount,

        // Direct referral progress
        directCount: processed
          ? Number(
              rewardRecord?.directCount ??
              owner.royaltyDirectCount ??
              directCount
            )
          : directCount,

        // Reward progress
        currentTier: tier.tier,
        currentReward: tier.amount,

        // Processing information
        processed,
        status: rewardRecord?.status || (
          processed
            ? "PROCESSED"
            : isLeader
              ? "EXCLUDED"
              : "PENDING"
        ),

        roleExcluded: isLeader,

        // Actual credited Royalty income
        royaltyIncome: Number(
          owner.totalRoyaltyIncome ??
          owner.royaltyIncome ??
          0
        ),

        // Final reward details
        rewardAmount: Number(
          rewardRecord?.rewardAmount ?? 0
        ),

        rewardTier: Number(
          rewardRecord?.rewardTier ?? 0
        ),

        processedAt:
          rewardRecord?.processedAt ||
          owner.royaltyProcessedAt ||
          null
      }
    });
  } catch (error) {
    console.error("Royalty status API error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Royalty status."
    });
  }
});

module.exports = router;
