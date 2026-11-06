
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const RoyaltyReward = require("../models/RoyaltyReward");

const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

/**
 * Get first successful top-up from packages array.
 * The oldest valid package is treated as the first top-up.
 *
 * Fallback is provided for older records where packages
 * is empty but topUpDate and topUpAmount are available.
 */
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

  // Legacy fallback
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

/**
 * Royalty reward tiers.
 * Only the highest achieved tier is paid.
 */
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

/**
 * Process Royalty for one owner.
 */
async function processRoyaltyForUser(owner) {
  if (!owner || !owner.userId) {
    return "SKIPPED";
  }

  // Fetch latest owner data.
  const currentOwner = await User.findOne({
    userId: owner.userId
  }).select(
    "userId role packages isToppedUp topUpAmount topUpDate royaltyProcessedAt"
  );

  if (!currentOwner) {
    return "USER_NOT_FOUND";
  }

  if (currentOwner.royaltyProcessedAt) {
    return "ALREADY_PROCESSED";
  }

  // Get first successful top-up from packages.
  const firstTopUp = getFirstTopUp(currentOwner);

  if (!firstTopUp) {
    return "SKIPPED";
  }

  const activationAt = firstTopUp.date;

  const expiresAt = new Date(
    activationAt.getTime() + FIVE_DAYS_MS
  );

  // Do not process before the 5-day offer expires.
  if (new Date() < expiresAt) {
    return "NOT_EXPIRED";
  }

  const session = await mongoose.startSession();

  try {
    let result = "SKIPPED";

    await session.withTransaction(async () => {
      // Recheck owner inside transaction.
      const ownerInsideTransaction = await User.findOne({
        userId: owner.userId
      })
        .select(
          "userId role packages isToppedUp topUpAmount topUpDate royaltyProcessedAt"
        )
        .session(session);

      if (!ownerInsideTransaction) {
        result = "USER_NOT_FOUND";
        return;
      }

      if (ownerInsideTransaction.royaltyProcessedAt) {
        result = "ALREADY_PROCESSED";
        return;
      }

      // Recalculate first top-up from latest database record.
      const latestFirstTopUp = getFirstTopUp(
        ownerInsideTransaction
      );

      if (!latestFirstTopUp) {
        result = "SKIPPED";
        return;
      }

      const latestActivationAt = latestFirstTopUp.date;

      const latestExpiresAt = new Date(
        latestActivationAt.getTime() + FIVE_DAYS_MS
      );

      if (new Date() < latestExpiresAt) {
        result = "NOT_EXPIRED";
        return;
      }

      // Prevent duplicate Royalty reward records.
      const alreadyProcessed = await RoyaltyReward.findOne({
        userId: owner.userId
      }).session(session);

      if (alreadyProcessed) {
        result = "ALREADY_PROCESSED";
        return;
      }

      // Fetch all direct referrals.
      const directUsers = await User.find({
        sponsorId: owner.userId
      })
        .select(
          "userId packages isToppedUp topUpAmount topUpDate"
        )
        .session(session);

      // Each unique direct counts only once.
      // First successful top-up must be exactly $30.
      const qualifyingDirects = directUsers.filter((direct) => {
        const first = getFirstTopUp(direct);

        return (
          first &&
          first.amount === 30 &&
          first.date >= latestActivationAt &&
          first.date <= latestExpiresAt
        );
      });

      const directCount = new Set(
        qualifyingDirects.map((user) => Number(user.userId))
      ).size;

      const reward = getRoyaltyTier(directCount);

      // Only exact role "leader" is excluded.
      const isLeader =
        String(ownerInsideTransaction.role || "")
          .toLowerCase() === "leader";

      const rewardStatus = isLeader
        ? "EXCLUDED"
        : reward.amount > 0
          ? "PAID"
          : "NO_REWARD";

      const processedAt = new Date();

      // Create Royalty reward record.
      const [rewardRecord] = await RoyaltyReward.create(
        [
          {
            userId: owner.userId,
            activationAt: latestActivationAt,
            expiresAt: latestExpiresAt,
            directCount,
            rewardAmount: isLeader ? 0 : reward.amount,
            rewardTier: reward.tier,
            status: rewardStatus,
            processedAt
          }
        ],
        { session }
      );

      // Leader: mark processed without wallet credit.
      // Do not overwrite any historical Royalty income.
      if (isLeader) {
        const updatedLeader = await User.updateOne(
          {
            userId: owner.userId,
            royaltyProcessedAt: null
          },
          {
            $set: {
              royaltyDirectCount: directCount,
              royaltyProcessedAt: processedAt
            }
          },
          { session }
        );

        if (updatedLeader.modifiedCount !== 1) {
          throw new Error(
            "Unable to mark leader Royalty as excluded"
          );
        }

        result = "EXCLUDED";
        return;
      }

      // No reward below 5 qualifying direct referrals.
      if (reward.amount <= 0) {
        const updatedUser = await User.updateOne(
          {
            userId: owner.userId,
            royaltyProcessedAt: null
          },
          {
            $set: {
              royaltyDirectCount: directCount,
              royaltyProcessedAt: processedAt
            }
          },
          { session }
        );

        if (updatedUser.modifiedCount !== 1) {
          throw new Error(
            "Unable to mark Royalty as processed"
          );
        }

        result = "NO_REWARD";
        return;
      }

      // Credit eligible non-leader user.
      const updatedUser = await User.findOneAndUpdate(
        {
          userId: owner.userId,
          royaltyProcessedAt: null
        },
        {
          $inc: {
            walletBalance: reward.amount,
            royaltyIncome: reward.amount,
            totalRoyaltyIncome: reward.amount
          },
          $set: {
            royaltyDirectCount: directCount,
            royaltyProcessedAt: processedAt
          }
        },
        {
          new: true,
          session
        }
      );

      if (!updatedUser) {
        throw new Error(
          "Royalty user already processed or not found"
        );
      }

      // Unique transaction key for this Royalty offer.
      const idempotencyKey =
        `royalty:${owner.userId}:first-topup-5days`;

      const [transaction] = await Transaction.create(
        [
          {
            userId: owner.userId,
            toUserId: owner.userId,
            type: "royalty_income",
            source: "royalty_offer",
            amount: reward.amount,
            grossAmount: reward.amount,
            netAmount: reward.amount,
            walletBalance: updatedUser.walletBalance,
            description:
              `Royalty reward: ${directCount} qualifying unique direct referrals`,
            idempotencyKey,
            status: "completed",
            date: processedAt
          }
        ],
        { session }
      );

      rewardRecord.transactionId = transaction._id;

      await rewardRecord.save({ session });

      result = "PAID";
    });

    return result;
  } finally {
    await session.endSession();
  }
}

/**
 * Process all expired Royalty offers.
 * This function should be scheduled through cron.
 */
async function processRoyaltyRewards() {
  const owners = await User.find({
    royaltyProcessedAt: null,
    $or: [
      {
        "packages.0": { $exists: true }
      },
      {
        isToppedUp: true,
        topUpDate: { $ne: null }
      }
    ]
  })
    .select("userId")
    .limit(500);

  let processed = 0;
  let failed = 0;

  for (const owner of owners) {
    try {
      const result = await processRoyaltyForUser(owner);

      if (
        [
          "PAID",
          "NO_REWARD",
          "EXCLUDED"
        ].includes(result)
      ) {
        processed++;
      }
    } catch (error) {
      failed++;

      console.error(
        `[Royalty] User ${owner.userId}:`,
        error.message
      );
    }
  }

  console.log(
    `[Royalty] Processed: ${processed}, Failed: ${failed}`
  );
}

module.exports = {
  processRoyaltyRewards,
  processRoyaltyForUser,
  getRoyaltyTier,
  getFirstTopUp
};
