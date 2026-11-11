
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const RoyaltyReward = require("../models/RoyaltyReward");

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
  if (count >= 15) return { tier: 15, amount: 150 };
  if (count >= 10) return { tier: 10, amount: 70 };
  if (count >= 5) return { tier: 5, amount: 30 };

  return { tier: 0, amount: 0 };
}

function getRewardResult(reward) {
  if (!reward) return "SKIPPED";

  if (reward.status === "PAID") return "PAID";
  if (reward.status === "NO_REWARD") return "NO_REWARD";
  if (reward.status === "EXCLUDED") return "EXCLUDED";

  return "PENDING";
}

async function processRoyaltyForUser(owner) {
  if (!owner || !owner.userId) {
    return "SKIPPED";
  }

  const userId = Number(owner.userId);

  if (!Number.isFinite(userId)) {
    return "SKIPPED";
  }

  const currentOwner = await User.findOne({ userId }).select(
    "userId role packages isToppedUp topUpAmount topUpDate royaltyProcessedAt walletBalance"
  );

  if (!currentOwner) {
    return "USER_NOT_FOUND";
  }

  // Check whether an earlier execution left a PENDING reward.
  let rewardRecord = await RoyaltyReward.findOne({ userId });

  if (rewardRecord && rewardRecord.status !== "PENDING") {
    return getRewardResult(rewardRecord);
  }

  // If already processed and there is no pending reward to recover,
  // do not process or credit again.
  if (currentOwner.royaltyProcessedAt && !rewardRecord) {
    return "ALREADY_PROCESSED";
  }

  // --------------------------------------------------
  // STEP 1: Create or recover the reward record
  // --------------------------------------------------

  if (!rewardRecord) {
    const firstTopUp = getFirstTopUp(currentOwner);

    if (!firstTopUp) {
      return "SKIPPED";
    }

    const activationAt = firstTopUp.date;
    const expiresAt = new Date(
      activationAt.getTime() + FIVE_DAYS_MS
    );

    if (new Date() < expiresAt) {
      return "NOT_EXPIRED";
    }

    const directUsers = await User.find({
      sponsorId: userId
    }).select(
      "userId packages isToppedUp topUpAmount topUpDate"
    );

    const qualifyingDirects = directUsers.filter((direct) => {
      const first = getFirstTopUp(direct);

      return (
        first &&
        first.amount === 30 &&
        first.date >= activationAt &&
        first.date <= expiresAt
      );
    });

    const directCount = new Set(
      qualifyingDirects.map((user) => Number(user.userId))
    ).size;

    const tier = getRoyaltyTier(directCount);

    const isLeader =
      String(currentOwner.role || "").toLowerCase() === "leader";

    try {
      rewardRecord = await RoyaltyReward.create({
        userId,
        activationAt,
        expiresAt,
        directCount,
        rewardAmount: isLeader ? 0 : tier.amount,
        rewardTier: tier.tier,
        status: "PENDING"
      });
    } catch (error) {
      // Another cron execution may have created this user's reward.
      if (error.code !== 11000) {
        throw error;
      }

      rewardRecord = await RoyaltyReward.findOne({ userId });

      if (!rewardRecord) {
        throw error;
      }

      if (rewardRecord.status !== "PENDING") {
        return getRewardResult(rewardRecord);
      }
    }
  }

  // --------------------------------------------------
  // STEP 2: Recover the saved reward details
  // --------------------------------------------------

  const isLeader =
    String(currentOwner.role || "").toLowerCase() === "leader";

  const rewardAmount = isLeader
    ? 0
    : Number(rewardRecord.rewardAmount || 0);

  const directCount = Number(rewardRecord.directCount || 0);

  const processedAt = new Date();

  // --------------------------------------------------
  // STEP 3: Leader / No reward processing
  // --------------------------------------------------

  if (isLeader || rewardAmount <= 0) {
    const finalStatus = isLeader ? "EXCLUDED" : "NO_REWARD";

    // Atomic conditional update: only one execution can mark the user.
    const updatedUser = await User.findOneAndUpdate(
      {
        userId,
        royaltyProcessedAt: null
      },
      {
        $set: {
          royaltyDirectCount: directCount,
          royaltyProcessedAt: processedAt
        }
      },
     {
  returnDocument: "after"
}
    );

    if (!updatedUser) {
      const latestUser = await User.findOne({ userId }).select(
        "royaltyProcessedAt"
      );

      if (!latestUser || !latestUser.royaltyProcessedAt) {
        throw new Error("Unable to mark Royalty as processed");
      }
    }

    await RoyaltyReward.updateOne(
      {
        _id: rewardRecord._id,
        status: "PENDING"
      },
      {
        $set: {
          status: finalStatus,
          processedAt
        }
      }
    );

    return finalStatus;
  }

  // --------------------------------------------------
  // STEP 4: Create / recover the unique transaction
  // --------------------------------------------------

  const idempotencyKey =
    `royalty:${userId}:first-topup-5days`;

  let transaction = await Transaction.findOne({
    idempotencyKey
  });

  if (!transaction) {
    try {
      transaction = await Transaction.create({
        userId,
        toUserId: userId,
        type: "royalty_income",
        source: "royalty_offer",
        amount: rewardAmount,
        grossAmount: rewardAmount,
        netAmount: rewardAmount,
        walletBalance: 0,
        description:
          `Royalty reward: ${directCount} qualifying unique direct referrals`,
        idempotencyKey,
        status: "pending",
        date: processedAt
      });
    } catch (error) {
      // Unique index protects against duplicate transaction creation.
      if (error.code !== 11000) {
        throw error;
      }

      transaction = await Transaction.findOne({
        idempotencyKey
      });

      if (!transaction) {
        throw error;
      }
    }
  }

  // If transaction is already completed, recover reward status
  // without crediting the wallet again.
  if (transaction.status === "completed") {
    await RoyaltyReward.updateOne(
      {
        _id: rewardRecord._id,
        status: "PENDING"
      },
      {
        $set: {
          status: "PAID",
          transactionId: transaction._id,
          processedAt: transaction.date || processedAt
        }
      }
    );

    return "PAID";
  }

  // --------------------------------------------------
  // STEP 5: Atomic one-time wallet credit
  // --------------------------------------------------

  let updatedUser = await User.findOneAndUpdate(
    {
      userId,
      royaltyProcessedAt: null
    },
    {
      $inc: {
        walletBalance: rewardAmount,
        royaltyIncome: rewardAmount,
        totalRoyaltyIncome: rewardAmount
      },
      $set: {
        royaltyDirectCount: directCount,
        royaltyProcessedAt: processedAt
      }
    },
    {
  returnDocument: "after"
}
  );

  if (!updatedUser) {
    // A previous execution may have credited the wallet
    // and crashed before completing the transaction record.
    updatedUser = await User.findOne({ userId }).select(
      "userId walletBalance royaltyProcessedAt"
    );

    if (!updatedUser || !updatedUser.royaltyProcessedAt) {
      throw new Error(
        "Wallet credit could not be confirmed. Transaction left pending."
      );
    }
  }

  // --------------------------------------------------
  // STEP 6: Complete the transaction record
  // --------------------------------------------------

  await Transaction.updateOne(
    {
      _id: transaction._id,
      status: "pending"
    },
    {
      $set: {
        status: "completed",
        walletBalance: updatedUser.walletBalance
      }
    }
  );

  // Verify transaction completion before marking reward PAID.
  const completedTransaction = await Transaction.findById(
    transaction._id
  );

  if (!completedTransaction || completedTransaction.status !== "completed") {
    throw new Error(
      "Wallet credit confirmed, but transaction completion is pending."
    );
  }

  // --------------------------------------------------
  // STEP 7: Mark reward as PAID
  // --------------------------------------------------

  await RoyaltyReward.updateOne(
    {
      _id: rewardRecord._id,
      status: "PENDING"
    },
    {
      $set: {
        status: "PAID",
        transactionId: transaction._id,
        processedAt
      }
    }
  );

  return "PAID";
}

/**
 * Process expired Royalty offers and recover PENDING rewards.
 */
async function processRoyaltyRewards() {
  // Include PENDING rewards so interrupted executions can recover,
  // even when royaltyProcessedAt has already been set.
  const pendingRewards = await RoyaltyReward.find({
    status: "PENDING"
  })
    .select("userId")
    .limit(500);

  const pendingIds = pendingRewards.map((reward) => reward.userId);

  const eligibleOwners = await User.find({
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

  const ownerIds = new Set([
    ...pendingIds,
    ...eligibleOwners.map((owner) => owner.userId)
  ]);

  const owners = await User.find({
    userId: { $in: Array.from(ownerIds) }
  }).select("userId");

  let processed = 0;
  let failed = 0;
  let pending = 0;

  for (const owner of owners) {
    try {
      const result = await processRoyaltyForUser(owner);

      if (
        ["PAID", "NO_REWARD", "EXCLUDED"].includes(result)
      ) {
        processed++;
      } else if (result === "PENDING") {
        pending++;
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
    `[Royalty] Processed: ${processed}, Pending: ${pending}, Failed: ${failed}`
  );
}

module.exports = {
  processRoyaltyRewards,
  processRoyaltyForUser,
  getRoyaltyTier,
  getFirstTopUp
};
