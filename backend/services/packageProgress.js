 



const mongoose = require("mongoose");

const PackageSubscription = require("../models/PackageSubscription");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const DAY_MS = 24 * 60 * 60 * 1000;
const TOTAL_STAGES = 14;

const DEFAULT_STAGE_DAYS = [
  1, 3, 7, 15,
  30, 30, 30, 30, 30, 30,
  30, 30, 30, 30
];

// function getStageDays(packageAmount) {
//   if (Number(packageAmount) === 30) {
//     return [
//       0.2, 0.2, 0.2, 0.2, 0.2,
//       1, 30, 30, 30, 30,
//       30, 30, 30, 30
//     ];
//   }

//   return [...DEFAULT_STAGE_DAYS];
// }


function getStageDays(packageAmount) {
  if (Number(packageAmount) === 30) {
    return [
      0.2, 0.2, 0.2, 0.2, 0.2,
      1, // Stage 6 = 24 hours
      30, 30, 30, 30,
      30, 30, 30, 30
    ];
  }

  return [...DEFAULT_STAGE_DAYS];
}
// ---------------------------------------------
// PACKAGE-WISE STAGE EARNINGS
// ---------------------------------------------

const PACKAGE_STAGE_EARNINGS = {
  30: [
    5, 5, 10, 20, 30, 30, 50,
    50, 100, 200, 400, 800, 1600, 3200
  ],

  60: [
    10, 10, 20, 40, 60, 60, 100,
    100, 200, 400, 800, 1600, 3200, 6400
  ],

  120: [
    20, 20, 40, 80, 120, 120, 200,
    200, 200, 800, 1600, 3200, 6400, 12800
  ],

  240: [
    40, 40, 80, 160, 240, 240, 400,
    400, 800, 1600, 3200, 6400, 12800, 25600
  ],

  480: [
    80, 80, 160, 320, 480, 480, 800,
    800, 1600, 3200, 6400, 12800, 25600, 51200
  ],

  960: [
    160, 160, 320, 640, 960, 960, 1600,
    1600, 3200, 6400, 12800, 25600, 51200, 102400
  ]
};

// ---------------------------------------------
// STAGE 6 REQUIREMENTS
// ---------------------------------------------

const PACKAGE_UPGRADE_RULES = {
  30: {
    nextPackage: 60,
    required30Directs: 2
  },
  60: {
    nextPackage: 120,
    required30Directs: 4
  },
  120: {
    nextPackage: 240,
    required30Directs: 6
  },
  240: {
    nextPackage: 480,
    required30Directs: 8
  },
  480: {
    nextPackage: 960,
    required30Directs: 10
  },
  960: {
    nextPackage: null,
    required30Directs: 12
  }
};

// ---------------------------------------------
// GET STAGE EARNINGS
// ---------------------------------------------

function getStageEarnings(packageAmount) {
  const amount = Number(packageAmount);
  const earnings = PACKAGE_STAGE_EARNINGS[amount];

  if (!earnings || earnings.length !== TOTAL_STAGES) {
    throw new Error(
      `Invalid package amount or earning schedule: ${packageAmount}`
    );
  }

  return earnings;
}

// ---------------------------------------------
// INITIALIZE STAGES
// ---------------------------------------------

function initializeStages(subscription) {
  const earnings = getStageEarnings(subscription.packageAmount);

  if (
    !Array.isArray(subscription.stages) ||
    subscription.stages.length !== TOTAL_STAGES
  ) {
    subscription.stages = getStageDays(
      subscription.packageAmount
    ).map((days, index) => ({
      stageNumber: index + 1,
      durationDays: days,

      status: index === 0 ? "WAITING" : "LOCKED",

      startedAt: null,
      endsAt: null,
      pausedAt: null,
      completedAt: null,

      accumulatedPausedSeconds: 0,

      earningAmount: earnings[index],
      earningStatus: "NOT_RECORDED",
      earningRecordedAt: null
    }));

    subscription.currentStage = 1;
  }
}

// ---------------------------------------------
// NORMALIZE STAGE FIELDS
// ---------------------------------------------

function normalizeStageFields(subscription) {
  const earnings = getStageEarnings(subscription.packageAmount);

  for (const stage of subscription.stages) {
    const index = Number(stage.stageNumber) - 1;

    if (index < 0 || index >= TOTAL_STAGES) {
      throw new Error("Invalid stage number in subscription.");
    }

    if (
      !stage.earningStatus ||
      stage.earningStatus === "NOT_RECORDED"
    ) {
      stage.earningAmount = earnings[index];
      stage.earningStatus = "NOT_RECORDED";
    }

    if (stage.earningRecordedAt === undefined) {
      stage.earningRecordedAt = null;
    }

    if (stage.accumulatedPausedSeconds === undefined) {
      stage.accumulatedPausedSeconds = 0;
    }
  }
}

// ---------------------------------------------
// COUNT ACTIVE $30 DIRECT REFERRALS
// ---------------------------------------------

async function getActive30DirectCount(user) {
  const directUsers = await User.find({
    sponsorId: user.userId
  })
    .select("userId")
    .lean();

  const directIds = directUsers.map(item => item.userId);

  if (!directIds.length) {
    return 0;
  }

  const active30DirectUsers = await PackageSubscription.distinct(
    "userId",
    {
      userId: { $in: directIds },
      packageAmount: 30,
      status: "ACTIVE"
    }
  );

  return active30DirectUsers.length;
}

// ---------------------------------------------
// CHECK OWN PACKAGE UPGRADE
// ---------------------------------------------

async function hasOwnPackageUpgrade(user, requiredAmount) {
  if (!requiredAmount) {
    return true;
  }

  const upgradedSubscription = await PackageSubscription.findOne({
    userId: user.userId,
    packageAmount: requiredAmount,
    status: {
      $in: ["ACTIVE", "COMPLETED"]
    }
  })
    .select("_id")
    .lean();

  if (upgradedSubscription) {
    return true;
  }

  if (Number(user.topUpAmount || 0) >= requiredAmount) {
    return true;
  }

  const legacyPackages = Array.isArray(user.packages)
    ? user.packages
    : [];

  return legacyPackages.some(
    item => Number(item.amount || 0) >= requiredAmount
  );
}

// ---------------------------------------------
// CHECK STAGE 6 ELIGIBILITY
// ---------------------------------------------

async function checkStageSixEligibility(subscription) {
  const packageAmount = Number(subscription.packageAmount);

  const rule = PACKAGE_UPGRADE_RULES[packageAmount];

  if (!rule) {
    return {
      allowed: false,
      message: `No Stage 6 rule configured for $${packageAmount}.`
    };
  }

  const user = await User.findOne({
    userId: subscription.userId
  })
    .select("userId sponsorId topUpAmount packages")
    .lean();

  if (!user) {
    return {
      allowed: false,
      message: "Package owner was not found."
    };
  }

  const matchingDirects = await getActive30DirectCount(user);

  const directReady =
    matchingDirects >= rule.required30Directs;

  const upgradeReady = await hasOwnPackageUpgrade(
    user,
    rule.nextPackage
  );

  const missing = [];

  if (!directReady) {
    missing.push(
      `${rule.required30Directs} active $30 direct referrals (${matchingDirects}/${rule.required30Directs})`
    );
  }

  if (!upgradeReady) {
    missing.push(
      `your own package upgraded to $${rule.nextPackage}`
    );
  }

  return {
    allowed: missing.length === 0,

    message: missing.length
      ? `Stage 6 is locked for your $${packageAmount} package. Complete: ${missing.join("; ")}.`
      : "Stage 6 eligibility completed.",

    matchingDirects,
    requiredDirects: rule.required30Directs
  };
}

// ---------------------------------------------
// VERIFY STAGE 5 RETOPUP
// ---------------------------------------------

async function checkStageFiveRetopup(subscription) {
  const packageAmount = Number(subscription.packageAmount);

  // $30 package has no retopup requirement.
  if (packageAmount === 30) {
    return {
      allowed: true,
      required: false,
      paidAt: null,
      message: "Retopup is not required for the $30 package."
    };
  }

  if (![60, 120, 240, 480, 960].includes(packageAmount)) {
    return {
      allowed: false,
      required: true,
      message: `Unsupported package amount: $${packageAmount}.`
    };
  }

  const stageFive = subscription.stages?.find(
    item => Number(item.stageNumber) === 5
  );

  if (!stageFive || stageFive.status !== "ACHIEVED") {
    return {
      allowed: false,
      required: true,
      message: "Stage 5 must be achieved before retopup."
    };
  }

  if (
    subscription.stage5RetopupConfirmed !== true ||
    !subscription.stage5RetopupPaidAt ||
    !subscription.stage5RetopupTransactionId ||
    Number(subscription.stage5RetopupAmount) !== packageAmount
  ) {
    return {
      allowed: false,
      required: true,
      message: `Stage 6 is locked. A confirmed same-package $${packageAmount} retopup is required.`
    };
  }

  const expectedIdempotencyKey =
    `${subscription._id.toString()}:stage5-retopup`;

  const transaction = await Transaction.findOne({
    _id: subscription.stage5RetopupTransactionId,
    userId: subscription.userId,
    subscriptionId: subscription._id,
    type: "package_retopup",
    source: "stage5_retopup",
    status: "completed",
    idempotencyKey: expectedIdempotencyKey
  })
    .select("_id amount date status")
    .lean();

  if (!transaction) {
    return {
      allowed: false,
      required: true,
      message: "Retopup transaction could not be verified."
    };
  }

  const transactionAmount = Number(
    transaction.amount?.toString?.() ?? transaction.amount
  );

  if (
    !Number.isFinite(transactionAmount) ||
    transactionAmount !== packageAmount
  ) {
    return {
      allowed: false,
      required: true,
      message: "Retopup transaction amount does not match the package amount."
    };
  }

  const paidAt = new Date(subscription.stage5RetopupPaidAt);

  if (Number.isNaN(paidAt.getTime())) {
    return {
      allowed: false,
      required: true,
      message: "Retopup payment date is invalid."
    };
  }

  return {
    allowed: true,
    required: true,
    paidAt,
    transactionId: transaction._id,
    message: "Stage 5 retopup verified."
  };
}

// ---------------------------------------------
// CREDIT STAGE EARNING - IDEMPOTENT
// ---------------------------------------------

async function creditStageEarning(subscription, stage) {
  const stageNumber = Number(stage.stageNumber);

  const earnings = getStageEarnings(subscription.packageAmount);

  const amount = Number(earnings[stageNumber - 1]);

  if (
    !Number.isInteger(stageNumber) ||
    stageNumber < 1 ||
    stageNumber > TOTAL_STAGES ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error("Invalid package stage earning.");
  }

  if (stage.status !== "ACHIEVED") {
    throw new Error(
      `Stage ${stageNumber} is not achieved yet.`
    );
  }

  const idempotencyKey =
    `${subscription._id.toString()}:stage:${stageNumber}`;

  let transaction = await Transaction.findOne({
    idempotencyKey
  });

  if (!transaction) {
    const updatedUser = await User.findOneAndUpdate(
      {
        userId: subscription.userId,
        creditedPackageStages: {
          $ne: idempotencyKey
        }
      },
      {
        $addToSet: {
          creditedPackageStages: idempotencyKey
        },
        $inc: {
          planIncome: amount,
          totalPlanIncome: amount
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      const existingUser = await User.findOne({
        userId: subscription.userId
      }).select("userId creditedPackageStages");

      if (!existingUser) {
        throw new Error(
          `User not found: ${subscription.userId}`
        );
      }

      const alreadyCredited =
        Array.isArray(existingUser.creditedPackageStages) &&
        existingUser.creditedPackageStages.includes(idempotencyKey);

      if (!alreadyCredited) {
        throw new Error(
          "Unable to credit package stage earning."
        );
      }
    }

    try {
      transaction = await Transaction.create({
        userId: subscription.userId,

        type: "plan_income",
        source: "package_stage",

        amount: mongoose.Types.Decimal128.fromString(
          amount.toFixed(2)
        ),

        package: Number(subscription.packageAmount),

        subscriptionId: subscription._id,
        stageNumber,

        idempotencyKey,

        description:
          `Package $${subscription.packageAmount} Stage ${stageNumber} earning`,

        status: "completed",
        date: new Date()
      });

    } catch (error) {
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

  if (!transaction) {
    throw new Error(
      `Stage ${stageNumber} earning ledger entry was not created.`
    );
  }

  stage.earningAmount = amount;
  stage.earningStatus = "RECORDED";

  if (!stage.earningRecordedAt) {
    stage.earningRecordedAt =
      transaction.date || new Date();
  }

  return stage;
}

// ---------------------------------------------
// UPDATE PACKAGE PROGRESS
// ---------------------------------------------

async function updatePackageProgress(subscriptionId) {
  if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
    throw new Error("Invalid package subscription ID.");
  }

  const subscription =
    await PackageSubscription.findById(subscriptionId);

  if (!subscription) {
    throw new Error("Package subscription not found.");
  }

  if (subscription.status !== "ACTIVE") {
    return subscription;
  }

  initializeStages(subscription);
  normalizeStageFields(subscription);

  const now = new Date();

  const packageStartTime =
    subscription.activatedAt ||
    subscription.purchasedAt ||
    now;

  let currentStage = Number(
    subscription.currentStage || 1
  );

  if (
    !Number.isInteger(currentStage) ||
    currentStage < 1 ||
    currentStage > TOTAL_STAGES
  ) {
    currentStage = 1;
  }



  // -------------------------------------------
// $30 PACKAGE: ONE-TIME STAGE 6 TIMER UPDATE
// -------------------------------------------

if (Number(subscription.packageAmount) === 30) {
  const stage6 = subscription.stages.find(
    item => Number(item.stageNumber) === 6
  );

  if (stage6 && Number(stage6.durationDays) !== 1) {
    stage6.durationDays = 1;

    // Existing Stage 6 RUNNING users get a fresh
    // 24-hour timer from the first update processing.
    if (stage6.status === "RUNNING") {
      stage6.startedAt = new Date(now);
      stage6.endsAt = new Date(now.getTime() + DAY_MS);
    }

    // If Stage 6 is waiting but is already the
    // subscription's current stage, start it now.
    else if (
      currentStage === 6 &&
      ["WAITING", "LOCKED"].includes(stage6.status)
    ) {
      stage6.status = "RUNNING";
      stage6.startedAt = new Date(now);
      stage6.endsAt = new Date(now.getTime() + DAY_MS);
      stage6.pausedAt = null;
    }
  }
}
  // -------------------------------------------
  // PROCESS STAGE TIMERS
  // -------------------------------------------

  while (currentStage <= TOTAL_STAGES) {
    const stage = subscription.stages.find(
      item =>
        Number(item.stageNumber) === currentStage
    );

    if (!stage) {
      throw new Error(
        `Stage ${currentStage} not found.`
      );
    }

    // -----------------------------------------
    // STAGE 6 RETOPUP + ELIGIBILITY
    // -----------------------------------------

    // if (
    //   currentStage === 6 &&
    //   (stage.status === "WAITING" || stage.status === "LOCKED")
    // ) {

    if (
  currentStage === 6 &&
  (stage.status === "WAITING" || stage.status === "LOCKED") &&
  Number(subscription.packageAmount) !== 30
) {
      const retopup = await checkStageFiveRetopup(
        subscription
      );

      if (!retopup.allowed) {
        stage.status = "LOCKED";
        stage.startedAt = null;
        stage.endsAt = null;
        stage.pausedAt = null;

        break;
      }

      const eligibility = await checkStageSixEligibility(
        subscription
      );

      if (!eligibility.allowed) {
        stage.status = "LOCKED";
        stage.startedAt = null;
        stage.endsAt = null;
        stage.pausedAt = null;

        break;
      }

      /*
       * Both requirements are now verified.
       *
       * For paid packages:
       * Stage 6 starts at the time this service first
       * confirms both retopup and eligibility.
       *
       * This avoids the timer expiring retroactively
       * while the user was still ineligible.
       *
       * For $30:
       * No retopup is needed, so normal stage timing
       * is used below.
       */
    }


    // -------------------------------------------
// $30 PACKAGE: CHECK STAGE 6 AFTER ACHIEVEMENT
// -------------------------------------------

if (
  Number(subscription.packageAmount) === 30 &&
  currentStage === 6 &&
  stage.status === "ACHIEVED"
) {
  const eligibility = await checkStageSixEligibility(
    subscription
  );

  if (!eligibility.allowed) {
    // Keep user at Stage 6 until both conditions pass.
    currentStage = 6;
    subscription.currentStage = 6;

    const stage7 = subscription.stages.find(
      item => Number(item.stageNumber) === 7
    );

    if (stage7) {
      stage7.status = "LOCKED";
      stage7.startedAt = null;
      stage7.endsAt = null;
      stage7.pausedAt = null;
    }

    break;
  }

  // Both requirements are complete.
  currentStage = 7;
  subscription.currentStage = 7;

  const stage7 = subscription.stages.find(
    item => Number(item.stageNumber) === 7
  );

  if (stage7 && stage7.status === "LOCKED") {
    stage7.status = "WAITING";
  }

  continue;
}
    // -----------------------------------------
    // START WAITING / LOCKED STAGE
    // -----------------------------------------

    if (
      stage.status === "WAITING" ||
      stage.status === "LOCKED"
    ) {
      const previousStage =
        currentStage > 1
          ? subscription.stages.find(
              item =>
                Number(item.stageNumber) === currentStage - 1
            )
          : null;

      let startTime;

// $30 package Stage 7 must start when eligibility passes.
if (
  Number(subscription.packageAmount) === 30 &&
  currentStage === 7
) {
  startTime = new Date(now);
} else if (currentStage === 6) {
  const packageAmount = Number(subscription.packageAmount);

  if (packageAmount === 30) {
    startTime = previousStage?.endsAt
      ? new Date(previousStage.endsAt)
      : new Date(packageStartTime);
  } else {
    startTime = new Date(now);
  }
} else {
  startTime = previousStage?.endsAt
    ? new Date(previousStage.endsAt)
    : new Date(packageStartTime);
}

      if (Number.isNaN(startTime.getTime())) {
        throw new Error(
          `Invalid start time for stage ${currentStage}.`
        );
      }

      stage.status = "RUNNING";
      stage.startedAt = startTime;

      stage.endsAt = new Date(
        startTime.getTime() +
        Number(stage.durationDays) * DAY_MS
      );

      stage.pausedAt = null;
    }

    // -----------------------------------------
    // DO NOT PROCESS PAUSED OR OTHER STATUSES
    // -----------------------------------------

    if (stage.status !== "RUNNING") {
      break;
    }

    const stageEnd = new Date(stage.endsAt);

    if (Number.isNaN(stageEnd.getTime())) {
      throw new Error(
        `Invalid end time for stage ${currentStage}.`
      );
    }

    // -----------------------------------------
    // STAGE TIMER IS STILL RUNNING
    // -----------------------------------------

    if (now < stageEnd) {
      break;
    }

    // -----------------------------------------
    // STAGE ACHIEVED
    // -----------------------------------------

    stage.status = "ACHIEVED";
    stage.completedAt = stageEnd;
    stage.pausedAt = null;

    if (stage.earningStatus !== "RECORDED") {
      stage.earningStatus = "PENDING";
      stage.earningRecordedAt = null;
    }

    currentStage += 1;

    // -----------------------------------------
    // UNLOCK NEXT STAGE
    // -----------------------------------------

    // if (currentStage <= TOTAL_STAGES) {
    //   subscription.currentStage = currentStage;

    //   const nextStage = subscription.stages.find(
    //     item =>
    //       Number(item.stageNumber) === currentStage
    //   );

    //   if (nextStage && nextStage.status === "LOCKED") {
    //     nextStage.status = "WAITING";
    //   }
    // }


    // -------------------------------------------
// UNLOCK NEXT STAGE
// -------------------------------------------

if (currentStage <= TOTAL_STAGES) {

  // $30 PACKAGE: STAGE 6 REQUIRES 2 ACTIVE
  // $30 DIRECTS + OWN $60 PACKAGE UPGRADE.
  if (
    Number(subscription.packageAmount) === 30 &&
    currentStage === 7
  ) {
    const eligibility = await checkStageSixEligibility(
      subscription
    );

    if (!eligibility.allowed) {
      const stage7 = subscription.stages.find(
        item => Number(item.stageNumber) === 7
      );

      if (stage7) {
        stage7.status = "LOCKED";
        stage7.startedAt = null;
        stage7.endsAt = null;
        stage7.pausedAt = null;
      }

      // Stop at Stage 6.
      currentStage = 6;
      subscription.currentStage = 6;

      break;
    }
  }

  subscription.currentStage = currentStage;

  const nextStage = subscription.stages.find(
    item =>
      Number(item.stageNumber) === currentStage
  );

  if (nextStage && nextStage.status === "LOCKED") {
    nextStage.status = "WAITING";
  }
}
  }

  // -------------------------------------------
  // COMPLETE AFTER STAGE 14
  // -------------------------------------------

  if (currentStage > TOTAL_STAGES) {
    subscription.currentStage = TOTAL_STAGES;
    subscription.status = "COMPLETED";

    if (!subscription.completedAt) {
      subscription.completedAt = now;
    }
  } else {
    subscription.currentStage = currentStage;
  }

  // -------------------------------------------
  // SAVE PROGRESS
  // -------------------------------------------

  await subscription.save();

  // -------------------------------------------
  // CREDIT ACHIEVED STAGES
  // -------------------------------------------

  for (const stage of subscription.stages) {
    if (
      stage.status === "ACHIEVED" &&
      stage.earningStatus !== "RECORDED"
    ) {
      await creditStageEarning(subscription, stage);
      await subscription.save();
    }
  }

  return subscription;
}

// ---------------------------------------------
// EXPORT
// ---------------------------------------------

module.exports = {
  updatePackageProgress,
  checkStageFiveRetopup,
  checkStageSixEligibility
};