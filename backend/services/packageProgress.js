
// // // // // // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // // // // // const REQUIRED_DIRECTS = 2;

// // // // // // // // // // // Har stage ki duration days mein
// // // // // // // // // // const STAGE_DAYS = [
// // // // // // // // // //   1, 3, 7, 15,
// // // // // // // // // //   30, 30, 30, 30, 30, 30,
// // // // // // // // // //   30, 30, 30, 30,
// // // // // // // // // // ];

// // // // // // // // // // const DAY_MS = 24 * 60 * 60 * 1000;

// // // // // // // // // // function getStageDurationMs(stage) {
// // // // // // // // // //   const days = Number(stage.durationDays || 0);
// // // // // // // // // //   return days * DAY_MS;
// // // // // // // // // // }

// // // // // // // // // // function pauseStage(stage, now) {
// // // // // // // // // //   if (stage.status === "RUNNING" && stage.startedAt) {
// // // // // // // // // //     stage.status = "PAUSED";
// // // // // // // // // //     stage.pausedAt = now;
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // function resumeStage(stage, now) {
// // // // // // // // // //   if (stage.status === "PAUSED" && stage.pausedAt) {
// // // // // // // // // //     const pausedMs = now.getTime() - new Date(stage.pausedAt).getTime();

// // // // // // // // // //     stage.accumulatedPausedSeconds =
// // // // // // // // // //       Number(stage.accumulatedPausedSeconds || 0) +
// // // // // // // // // //       Math.max(0, Math.floor(pausedMs / 1000));

// // // // // // // // // //     stage.pausedAt = null;
// // // // // // // // // //     stage.status = "RUNNING";
// // // // // // // // // //     return;
// // // // // // // // // //   }

// // // // // // // // // //   if (stage.status === "WAITING" || stage.status === "LOCKED") {
// // // // // // // // // //     stage.status = "RUNNING";
// // // // // // // // // //     stage.startedAt = now;
// // // // // // // // // //     stage.pausedAt = null;
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // function initializeStages(subscription) {
// // // // // // // // // //   if (Array.isArray(subscription.stages) &&
// // // // // // // // // //       subscription.stages.length > 0) {
// // // // // // // // // //     return;
// // // // // // // // // //   }

// // // // // // // // // //   subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // // // // // // //     stageNumber: index + 1,
// // // // // // // // // //     durationDays: days,
// // // // // // // // // //     status: index === 0 ? "WAITING" : "LOCKED",
// // // // // // // // // //     startedAt: null,
// // // // // // // // // //     endsAt: null,
// // // // // // // // // //     pausedAt: null,
// // // // // // // // // //     completedAt: null,
// // // // // // // // // //     accumulatedPausedSeconds: 0,
// // // // // // // // // //   }));

// // // // // // // // // //   subscription.currentStage = 1;
// // // // // // // // // // }

// // // // // // // // // // async function updatePackageProgress(subscriptionId, verifiedDirectCount) {
// // // // // // // // // //   const subscription = await PackageSubscription.findById(subscriptionId);

// // // // // // // // // //   if (!subscription) {
// // // // // // // // // //     throw new Error("Package subscription not found");
// // // // // // // // // //   }

// // // // // // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // // // // // //     return subscription;
// // // // // // // // // //   }

// // // // // // // // // //   const now = new Date();
// // // // // // // // // //   const directCount = Math.max(0, Number(verifiedDirectCount || 0));

// // // // // // // // // //   initializeStages(subscription);

// // // // // // // // // //   // Tracking cap reached: stop progress, no wallet credit.
// // // // // // // // // //   if (
// // // // // // // // // //     Number(subscription.recordedActivityAmount || 0) >=
// // // // // // // // // //     Number(subscription.accountingCapAmount || Infinity)
// // // // // // // // // //   ) {
// // // // // // // // // //     subscription.status = "COMPLETED";
// // // // // // // // // //     subscription.completedAt = now;
// // // // // // // // // //     await subscription.save();
// // // // // // // // // //     return subscription;
// // // // // // // // // //   }

// // // // // // // // // //   let stageIndex = Math.max(
// // // // // // // // // //     0,
// // // // // // // // // //     Number(subscription.currentStage || 1) - 1
// // // // // // // // // //   );

// // // // // // // // // //   if (stageIndex >= subscription.stages.length) {
// // // // // // // // // //     subscription.status = "COMPLETED";
// // // // // // // // // //     subscription.completedAt = now;
// // // // // // // // // //     await subscription.save();
// // // // // // // // // //     return subscription;
// // // // // // // // // //   }

// // // // // // // // // //   const stage = subscription.stages[stageIndex];

// // // // // // // // // //   // Two verified direct users are required to run the timer.
// // // // // // // // // //   if (directCount < REQUIRED_DIRECTS) {
// // // // // // // // // //     pauseStage(stage, now);

// // // // // // // // // //     if (stage.status === "WAITING") {
// // // // // // // // // //       stage.status = "WAITING";
// // // // // // // // // //     }

// // // // // // // // // //     await subscription.save();
// // // // // // // // // //     return subscription;
// // // // // // // // // //   }

// // // // // // // // // //   resumeStage(stage, now);

// // // // // // // // // //   const durationMs = getStageDurationMs(stage);

// // // // // // // // // //   if (!stage.endsAt && stage.startedAt) {
// // // // // // // // // //     const pausedSeconds = Number(
// // // // // // // // // //       stage.accumulatedPausedSeconds || 0
// // // // // // // // // //     );

// // // // // // // // // //     stage.endsAt = new Date(
// // // // // // // // // //       new Date(stage.startedAt).getTime() +
// // // // // // // // // //       durationMs +
// // // // // // // // // //       pausedSeconds * 1000
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   // Stage timer complete
// // // // // // // // // //   if (
// // // // // // // // // //     stage.endsAt &&
// // // // // // // // // //     now.getTime() >= new Date(stage.endsAt).getTime()
// // // // // // // // // //   ) {
// // // // // // // // // //     stage.status = "ACHIEVED";
// // // // // // // // // //     stage.completedAt = now;

// // // // // // // // // //     const nextIndex = stageIndex + 1;

// // // // // // // // // //     if (nextIndex >= subscription.stages.length) {
// // // // // // // // // //       subscription.status = "COMPLETED";
// // // // // // // // // //       subscription.completedAt = now;
// // // // // // // // // //     } else {
// // // // // // // // // //       subscription.currentStage = nextIndex + 1;

// // // // // // // // // //       const nextStage = subscription.stages[nextIndex];
// // // // // // // // // //       nextStage.status = "WAITING";
// // // // // // // // // //       nextStage.startedAt = null;
// // // // // // // // // //       nextStage.endsAt = null;
// // // // // // // // // //       nextStage.pausedAt = null;
// // // // // // // // // //     }
// // // // // // // // // //   }

// // // // // // // // // //   await subscription.save();
// // // // // // // // // //   return subscription;
// // // // // // // // // // }

// // // // // // // // // // module.exports = {
// // // // // // // // // //   updatePackageProgress,
// // // // // // // // // //   initializeStages,
// // // // // // // // // //   REQUIRED_DIRECTS,
// // // // // // // // // //   STAGE_DAYS,
// // // // // // // // // // };



// // // // // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // // // // // const TOTAL_STAGES = 14;

// // // // // // // // // function initializeStages(subscription) {
// // // // // // // // //   if (!Array.isArray(subscription.stages) ||
// // // // // // // // //       subscription.stages.length !== TOTAL_STAGES) {
// // // // // // // // //     const stageDays = [
// // // // // // // // //       1, 3, 7, 15,
// // // // // // // // //       30, 30, 30, 30, 30, 30,
// // // // // // // // //       30, 30, 30, 30
// // // // // // // // //     ];

// // // // // // // // //     subscription.stages = stageDays.map((days, index) => ({
// // // // // // // // //       stageNumber: index + 1,
// // // // // // // // //       durationDays: days,
// // // // // // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // // // // // //       startedAt: null,
// // // // // // // // //       endsAt: null,
// // // // // // // // //       pausedAt: null,
// // // // // // // // //       completedAt: null,
// // // // // // // // //       accumulatedPausedSeconds: 0
// // // // // // // // //     }));

// // // // // // // // //     subscription.currentStage = 1;
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function updatePackageProgress(subscriptionId) {
// // // // // // // // //   const subscription = await PackageSubscription.findById(subscriptionId);

// // // // // // // // //   if (!subscription) {
// // // // // // // // //     throw new Error("Package subscription not found");
// // // // // // // // //   }

// // // // // // // // //   // Only active subscriptions progress.
// // // // // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // // // // //     return subscription;
// // // // // // // // //   }

// // // // // // // // //   initializeStages(subscription);

// // // // // // // // //   const now = new Date();

// // // // // // // // //   // Start Stage 1 from the package purchase time.
// // // // // // // // //   const packageStartTime =
// // // // // // // // //     subscription.activatedAt ||
// // // // // // // // //     subscription.purchasedAt ||
// // // // // // // // //     now;

// // // // // // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // // // // // //   // Keep each subscription's stages independent.
// // // // // // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // // // // // //     const stage = subscription.stages.find(
// // // // // // // // //       item => Number(item.stageNumber) === currentStage
// // // // // // // // //     );

// // // // // // // // //     if (!stage) {
// // // // // // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // // // // // //     }

// // // // // // // // //     // Start the first stage.
// // // // // // // // //     if (stage.status === "WAITING" || stage.status === "LOCKED") {
// // // // // // // // //       const previousStage =
// // // // // // // // //         currentStage > 1
// // // // // // // // //           ? subscription.stages.find(
// // // // // // // // //               item => Number(item.stageNumber) === currentStage - 1
// // // // // // // // //             )
// // // // // // // // //           : null;

// // // // // // // // //       const startTime = previousStage?.endsAt
// // // // // // // // //         ? new Date(previousStage.endsAt)
// // // // // // // // //         : new Date(packageStartTime);

// // // // // // // // //       stage.status = "RUNNING";
// // // // // // // // //       stage.startedAt = startTime;
// // // // // // // // //       stage.endsAt = new Date(
// // // // // // // // //         startTime.getTime() +
// // // // // // // // //         Number(stage.durationDays) * DAY_MS
// // // // // // // // //       );
// // // // // // // // //       stage.pausedAt = null;
// // // // // // // // //     }

// // // // // // // // //     if (stage.status !== "RUNNING") {
// // // // // // // // //       break;
// // // // // // // // //     }

// // // // // // // // //     const stageEnd = new Date(stage.endsAt);

// // // // // // // // //     // Current stage is still running.
// // // // // // // // //     if (now < stageEnd) {
// // // // // // // // //       break;
// // // // // // // // //     }

// // // // // // // // //     // Complete this stage.
// // // // // // // // //     stage.status = "ACHIEVED";
// // // // // // // // //     stage.completedAt = stageEnd;
// // // // // // // // //     stage.pausedAt = null;

// // // // // // // // //     currentStage += 1;

// // // // // // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // // // // // //       subscription.currentStage = currentStage;

// // // // // // // // //       const nextStage = subscription.stages.find(
// // // // // // // // //         item => Number(item.stageNumber) === currentStage
// // // // // // // // //       );

// // // // // // // // //       if (nextStage) {
// // // // // // // // //         nextStage.status = "WAITING";
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // All 14 stages are complete.
// // // // // // // // //   if (currentStage > TOTAL_STAGES) {
// // // // // // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // // // // // //     subscription.status = "COMPLETED";
// // // // // // // // //     subscription.completedAt = new Date();
// // // // // // // // //   } else {
// // // // // // // // //     subscription.currentStage = currentStage;
// // // // // // // // //   }

// // // // // // // // //   await subscription.save();

// // // // // // // // //   return subscription;
// // // // // // // // // }

// // // // // // // // // module.exports = {
// // // // // // // // //   updatePackageProgress
// // // // // // // // // };



// // // // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // // // // const TOTAL_STAGES = 14;

// // // // // // // // const STAGE_DAYS = [
// // // // // // // //   1, 3, 7, 15,
// // // // // // // //   30, 30, 30, 30, 30, 30,
// // // // // // // //   30, 30, 30, 30
// // // // // // // // ];

// // // // // // // // // Naye package ke liye stages banana.
// // // // // // // // function initializeStages(subscription) {
// // // // // // // //   if (
// // // // // // // //     !Array.isArray(subscription.stages) ||
// // // // // // // //     subscription.stages.length !== TOTAL_STAGES
// // // // // // // //   ) {
// // // // // // // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // // // // //       stageNumber: index + 1,
// // // // // // // //       durationDays: days,
// // // // // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // // // // //       startedAt: null,
// // // // // // // //       endsAt: null,
// // // // // // // //       pausedAt: null,
// // // // // // // //       completedAt: null,
// // // // // // // //       accumulatedPausedSeconds: 0,

// // // // // // // //       earningAmount: 0,
// // // // // // // //       earningStatus: "NOT_RECORDED",
// // // // // // // //       earningRecordedAt: null
// // // // // // // //     }));

// // // // // // // //     subscription.currentStage = 1;
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Purane database stages mein missing fields initialize karna.
// // // // // // // // // Existing earning amount ko overwrite nahi karna.
// // // // // // // // function normalizeStageFields(subscription) {
// // // // // // // //   for (const stage of subscription.stages) {
// // // // // // // //     if (stage.earningAmount === undefined ||
// // // // // // // //         stage.earningAmount === null) {
// // // // // // // //       stage.earningAmount = 0;
// // // // // // // //     }

// // // // // // // //     if (!stage.earningStatus) {
// // // // // // // //       stage.earningStatus = "NOT_RECORDED";
// // // // // // // //     }

// // // // // // // //     if (stage.earningRecordedAt === undefined) {
// // // // // // // //       stage.earningRecordedAt = null;
// // // // // // // //     }

// // // // // // // //     if (stage.accumulatedPausedSeconds === undefined) {
// // // // // // // //       stage.accumulatedPausedSeconds = 0;
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function updatePackageProgress(subscriptionId) {
// // // // // // // //   const subscription =
// // // // // // // //     await PackageSubscription.findById(subscriptionId);

// // // // // // // //   if (!subscription) {
// // // // // // // //     throw new Error("Package subscription not found");
// // // // // // // //   }

// // // // // // // //   // Sirf active packages ka timer update hoga.
// // // // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // // // //     return subscription;
// // // // // // // //   }

// // // // // // // //   initializeStages(subscription);
// // // // // // // //   normalizeStageFields(subscription);

// // // // // // // //   const now = new Date();

// // // // // // // //   const packageStartTime =
// // // // // // // //     subscription.activatedAt ||
// // // // // // // //     subscription.purchasedAt ||
// // // // // // // //     now;

// // // // // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // // // // //   if (
// // // // // // // //     !Number.isInteger(currentStage) ||
// // // // // // // //     currentStage < 1 ||
// // // // // // // //     currentStage > TOTAL_STAGES
// // // // // // // //   ) {
// // // // // // // //     currentStage = 1;
// // // // // // // //   }

// // // // // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // // // // //     const stage = subscription.stages.find(
// // // // // // // //       item => Number(item.stageNumber) === currentStage
// // // // // // // //     );

// // // // // // // //     if (!stage) {
// // // // // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // // // // //     }

// // // // // // // //     // Stage start karna.
// // // // // // // //     if (
// // // // // // // //       stage.status === "WAITING" ||
// // // // // // // //       stage.status === "LOCKED"
// // // // // // // //     ) {
// // // // // // // //       const previousStage =
// // // // // // // //         currentStage > 1
// // // // // // // //           ? subscription.stages.find(
// // // // // // // //               item =>
// // // // // // // //                 Number(item.stageNumber) === currentStage - 1
// // // // // // // //             )
// // // // // // // //           : null;

// // // // // // // //       const startTime = previousStage?.endsAt
// // // // // // // //         ? new Date(previousStage.endsAt)
// // // // // // // //         : new Date(packageStartTime);

// // // // // // // //       if (Number.isNaN(startTime.getTime())) {
// // // // // // // //         throw new Error(
// // // // // // // //           `Invalid start time for stage ${currentStage}`
// // // // // // // //         );
// // // // // // // //       }

// // // // // // // //       stage.status = "RUNNING";
// // // // // // // //       stage.startedAt = startTime;

// // // // // // // //       stage.endsAt = new Date(
// // // // // // // //         startTime.getTime() +
// // // // // // // //         Number(stage.durationDays) * DAY_MS
// // // // // // // //       );

// // // // // // // //       stage.pausedAt = null;
// // // // // // // //     }

// // // // // // // //     // Running stage ke alawa aage nahi badhna.
// // // // // // // //     if (stage.status !== "RUNNING") {
// // // // // // // //       break;
// // // // // // // //     }

// // // // // // // //     const stageEnd = new Date(stage.endsAt);

// // // // // // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // // // // // //       throw new Error(
// // // // // // // //         `Invalid end time for stage ${currentStage}`
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     // Timer abhi complete nahi hua.
// // // // // // // //     if (now < stageEnd) {
// // // // // // // //       break;
// // // // // // // //     }

// // // // // // // //     // Timer complete: sirf stage status update hoga.
// // // // // // // //     stage.status = "ACHIEVED";
// // // // // // // //     stage.completedAt = stageEnd;
// // // // // // // //     stage.pausedAt = null;

// // // // // // // //     // IMPORTANT:
// // // // // // // //     // Timer complete hone se earning credit nahi hoti.
// // // // // // // //     // Earning ledger alag verified process se update hoga.

// // // // // // // //     currentStage += 1;

// // // // // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // // // // //       subscription.currentStage = currentStage;

// // // // // // // //       const nextStage = subscription.stages.find(
// // // // // // // //         item =>
// // // // // // // //           Number(item.stageNumber) === currentStage
// // // // // // // //       );

// // // // // // // //       if (nextStage) {
// // // // // // // //         nextStage.status = "WAITING";
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // Saare 14 stages complete.
// // // // // // // //   if (currentStage > TOTAL_STAGES) {
// // // // // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // // // // //     subscription.status = "COMPLETED";
// // // // // // // //     subscription.completedAt = now;
// // // // // // // //   } else {
// // // // // // // //     subscription.currentStage = currentStage;
// // // // // // // //   }

// // // // // // // //   await subscription.save();

// // // // // // // //   return subscription;
// // // // // // // // }

// // // // // // // // module.exports = {
// // // // // // // //   updatePackageProgress
// // // // // // // // };



// // // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // // // const TOTAL_STAGES = 14;

// // // // // // // const STAGE_DAYS = [
// // // // // // //   1, 3, 7, 15,
// // // // // // //   30, 30, 30, 30, 30, 30,
// // // // // // //   30, 30, 30, 30
// // // // // // // ];

// // // // // // // // Image ke exact stage-wise earning amounts.
// // // // // // // // Amounts ko image ke mutabik hi rakha gaya hai.
// // // // // // // const PACKAGE_STAGE_EARNINGS = {
// // // // // // //   30: [
// // // // // // //     5, 5, 10, 20, 30, 30, 50,
// // // // // // //     50, 100, 200, 400, 800, 1600, 3200
// // // // // // //   ],

// // // // // // //   60: [
// // // // // // //     10, 10, 20, 40, 60, 60, 100,
// // // // // // //     100, 200, 400, 800, 1600, 3200, 6400
// // // // // // //   ],

// // // // // // //   120: [
// // // // // // //     20, 20, 40, 80, 120, 120, 200,
// // // // // // //     200, 200, 800, 1600, 3200, 6400, 12800
// // // // // // //   ],

// // // // // // //   240: [
// // // // // // //     40, 40, 80, 160, 240, 240, 400,
// // // // // // //     400, 800, 1600, 3200, 6400, 12800, 25600
// // // // // // //   ],

// // // // // // //   480: [
// // // // // // //     80, 80, 160, 320, 480, 480, 800,
// // // // // // //     800, 1600, 3200, 6400, 12800, 25600, 51200
// // // // // // //   ],

// // // // // // //   960: [
// // // // // // //     160, 160, 320, 640, 960, 960, 1600,
// // // // // // //     1600, 3200, 6400, 12800, 25600, 51200, 102400
// // // // // // //   ]
// // // // // // // };

// // // // // // // // Package amount ke hisab se earning schedule.
// // // // // // // function getStageEarnings(packageAmount) {
// // // // // // //   const amount = Number(packageAmount);
// // // // // // //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// // // // // // //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// // // // // // //     throw new Error(
// // // // // // //       `Invalid package amount or earning schedule: ${packageAmount}`
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return earnings;
// // // // // // // }

// // // // // // // // Naye package ke liye stages banana.
// // // // // // // function initializeStages(subscription) {
// // // // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // // // //   if (
// // // // // // //     !Array.isArray(subscription.stages) ||
// // // // // // //     subscription.stages.length !== TOTAL_STAGES
// // // // // // //   ) {
// // // // // // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // // // //       stageNumber: index + 1,
// // // // // // //       durationDays: days,
// // // // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // // // //       startedAt: null,
// // // // // // //       endsAt: null,
// // // // // // //       pausedAt: null,
// // // // // // //       completedAt: null,
// // // // // // //       accumulatedPausedSeconds: 0,

// // // // // // //       earningAmount: earnings[index],
// // // // // // //       earningStatus: "NOT_RECORDED",
// // // // // // //       earningRecordedAt: null
// // // // // // //     }));

// // // // // // //     subscription.currentStage = 1;
// // // // // // //   }
// // // // // // // }

// // // // // // // // Existing stages ke missing fields aur configured amounts set karna.
// // // // // // // // Already RECORDED earning ko overwrite nahi karna.
// // // // // // // function normalizeStageFields(subscription) {
// // // // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // // // //   for (const stage of subscription.stages) {
// // // // // // //     const index = Number(stage.stageNumber) - 1;

// // // // // // //     if (index < 0 || index >= TOTAL_STAGES) {
// // // // // // //       throw new Error("Invalid stage number in subscription");
// // // // // // //     }

// // // // // // //     if (
// // // // // // //       !stage.earningStatus ||
// // // // // // //       stage.earningStatus === "NOT_RECORDED"
// // // // // // //     ) {
// // // // // // //       stage.earningAmount = earnings[index];
// // // // // // //       stage.earningStatus = "NOT_RECORDED";
// // // // // // //     }

// // // // // // //     if (stage.earningRecordedAt === undefined) {
// // // // // // //       stage.earningRecordedAt = null;
// // // // // // //     }

// // // // // // //     if (stage.accumulatedPausedSeconds === undefined) {
// // // // // // //       stage.accumulatedPausedSeconds = 0;
// // // // // // //     }
// // // // // // //   }
// // // // // // // }

// // // // // // // async function updatePackageProgress(subscriptionId) {
// // // // // // //   const subscription =
// // // // // // //     await PackageSubscription.findById(subscriptionId);

// // // // // // //   if (!subscription) {
// // // // // // //     throw new Error("Package subscription not found");
// // // // // // //   }

// // // // // // //   // Sirf active packages ka timer update hoga.
// // // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // // //     return subscription;
// // // // // // //   }

// // // // // // //   initializeStages(subscription);
// // // // // // //   normalizeStageFields(subscription);

// // // // // // //   const now = new Date();

// // // // // // //   const packageStartTime =
// // // // // // //     subscription.activatedAt ||
// // // // // // //     subscription.purchasedAt ||
// // // // // // //     now;

// // // // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // // // //   if (
// // // // // // //     !Number.isInteger(currentStage) ||
// // // // // // //     currentStage < 1 ||
// // // // // // //     currentStage > TOTAL_STAGES
// // // // // // //   ) {
// // // // // // //     currentStage = 1;
// // // // // // //   }

// // // // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // // // //     const stage = subscription.stages.find(
// // // // // // //       item => Number(item.stageNumber) === currentStage
// // // // // // //     );

// // // // // // //     if (!stage) {
// // // // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // // // //     }

// // // // // // //     // Stage start karna.
// // // // // // //     if (
// // // // // // //       stage.status === "WAITING" ||
// // // // // // //       stage.status === "LOCKED"
// // // // // // //     ) {
// // // // // // //       const previousStage =
// // // // // // //         currentStage > 1
// // // // // // //           ? subscription.stages.find(
// // // // // // //               item =>
// // // // // // //                 Number(item.stageNumber) === currentStage - 1
// // // // // // //             )
// // // // // // //           : null;

// // // // // // //       const startTime = previousStage?.endsAt
// // // // // // //         ? new Date(previousStage.endsAt)
// // // // // // //         : new Date(packageStartTime);

// // // // // // //       if (Number.isNaN(startTime.getTime())) {
// // // // // // //         throw new Error(
// // // // // // //           `Invalid start time for stage ${currentStage}`
// // // // // // //         );
// // // // // // //       }

// // // // // // //       stage.status = "RUNNING";
// // // // // // //       stage.startedAt = startTime;

// // // // // // //       stage.endsAt = new Date(
// // // // // // //         startTime.getTime() +
// // // // // // //         Number(stage.durationDays) * DAY_MS
// // // // // // //       );

// // // // // // //       stage.pausedAt = null;
// // // // // // //     }

// // // // // // //     // Running stage ke alawa aage nahi badhna.
// // // // // // //     if (stage.status !== "RUNNING") {
// // // // // // //       break;
// // // // // // //     }

// // // // // // //     const stageEnd = new Date(stage.endsAt);

// // // // // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // // // // //       throw new Error(
// // // // // // //         `Invalid end time for stage ${currentStage}`
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Timer abhi complete nahi hua.
// // // // // // //     if (now < stageEnd) {
// // // // // // //       break;
// // // // // // //     }

// // // // // // //     // Timer complete: stage achieved.
// // // // // // //     stage.status = "ACHIEVED";
// // // // // // //     stage.earningStatus = "PENDING";
// // // // // // //     stage.completedAt = stageEnd;
// // // // // // //     stage.pausedAt = null;

// // // // // // //     // Earning amount schedule mein save hai.
// // // // // // //     // Wallet credit alag verified ledger process karega.

// // // // // // //     currentStage += 1;

// // // // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // // // //       subscription.currentStage = currentStage;

// // // // // // //       const nextStage = subscription.stages.find(
// // // // // // //         item =>
// // // // // // //           Number(item.stageNumber) === currentStage
// // // // // // //       );

// // // // // // //       if (nextStage) {
// // // // // // //         nextStage.status = "WAITING";
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // Saare 14 stages complete.
// // // // // // //   if (currentStage > TOTAL_STAGES) {
// // // // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // // // //     subscription.status = "COMPLETED";
// // // // // // //     subscription.completedAt = now;
// // // // // // //   } else {
// // // // // // //     subscription.currentStage = currentStage;
// // // // // // //   }

// // // // // // //   await subscription.save();

// // // // // // //   return subscription;
// // // // // // // }

// // // // // // // module.exports = {
// // // // // // //   updatePackageProgress
// // // // // // // };



// // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // // const TOTAL_STAGES = 14;

// // // // // // const STAGE_DAYS = [
// // // // // //   1, 3, 7, 15,
// // // // // //   30, 30, 30, 30, 30, 30,
// // // // // //   30, 30, 30, 30
// // // // // // ];

// // // // // // // Image ke exact stage-wise earning amounts.
// // // // // // const PACKAGE_STAGE_EARNINGS = {
// // // // // //   30: [5, 5, 10, 20, 30, 30, 50, 50, 100, 200, 400, 800, 1600, 3200],
// // // // // //   60: [10, 10, 20, 40, 60, 60, 100, 100, 200, 400, 800, 1600, 3200, 6400],
// // // // // //   120: [20, 20, 40, 80, 120, 120, 200, 200, 200, 800, 1600, 3200, 6400, 12800],
// // // // // //   240: [40, 40, 80, 160, 240, 240, 400, 400, 800, 1600, 3200, 6400, 12800, 25600],
// // // // // //   480: [80, 80, 160, 320, 480, 480, 800, 800, 1600, 3200, 6400, 12800, 25600, 51200],
// // // // // //   960: [160, 160, 320, 640, 960, 960, 1600, 1600, 3200, 6400, 12800, 25600, 51200, 102400]
// // // // // // };

// // // // // // function getStageEarnings(packageAmount) {
// // // // // //   const amount = Number(packageAmount);
// // // // // //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// // // // // //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// // // // // //     throw new Error(
// // // // // //       `Invalid package amount or earning schedule: ${packageAmount}`
// // // // // //     );
// // // // // //   }

// // // // // //   return earnings;
// // // // // // }

// // // // // // function initializeStages(subscription) {
// // // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // // //   if (
// // // // // //     !Array.isArray(subscription.stages) ||
// // // // // //     subscription.stages.length !== TOTAL_STAGES
// // // // // //   ) {
// // // // // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // // //       stageNumber: index + 1,
// // // // // //       durationDays: days,
// // // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // // //       startedAt: null,
// // // // // //       endsAt: null,
// // // // // //       pausedAt: null,
// // // // // //       completedAt: null,
// // // // // //       accumulatedPausedSeconds: 0,
// // // // // //       earningAmount: earnings[index],
// // // // // //       earningStatus: "NOT_RECORDED",
// // // // // //       earningRecordedAt: null
// // // // // //     }));

// // // // // //     subscription.currentStage = 1;
// // // // // //   }
// // // // // // }

// // // // // // function normalizeStageFields(subscription) {
// // // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // // //   for (const stage of subscription.stages) {
// // // // // //     const index = Number(stage.stageNumber) - 1;

// // // // // //     if (index < 0 || index >= TOTAL_STAGES) {
// // // // // //       throw new Error("Invalid stage number in subscription");
// // // // // //     }

// // // // // //     // Schedule amount sirf unrecorded earning ke liye update hoga.
// // // // // //     if (
// // // // // //       !stage.earningStatus ||
// // // // // //       stage.earningStatus === "NOT_RECORDED"
// // // // // //     ) {
// // // // // //       stage.earningAmount = earnings[index];
// // // // // //       stage.earningStatus = "NOT_RECORDED";
// // // // // //     }

// // // // // //     if (stage.earningRecordedAt === undefined) {
// // // // // //       stage.earningRecordedAt = null;
// // // // // //     }

// // // // // //     if (stage.accumulatedPausedSeconds === undefined) {
// // // // // //       stage.accumulatedPausedSeconds = 0;
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // async function updatePackageProgress(subscriptionId) {
// // // // // //   const subscription =
// // // // // //     await PackageSubscription.findById(subscriptionId);

// // // // // //   if (!subscription) {
// // // // // //     throw new Error("Package subscription not found");
// // // // // //   }

// // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // //     return subscription;
// // // // // //   }

// // // // // //   initializeStages(subscription);
// // // // // //   normalizeStageFields(subscription);

// // // // // //   const now = new Date();

// // // // // //   const packageStartTime =
// // // // // //     subscription.activatedAt ||
// // // // // //     subscription.purchasedAt ||
// // // // // //     now;

// // // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // // //   if (
// // // // // //     !Number.isInteger(currentStage) ||
// // // // // //     currentStage < 1 ||
// // // // // //     currentStage > TOTAL_STAGES
// // // // // //   ) {
// // // // // //     currentStage = 1;
// // // // // //   }

// // // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // // //     const stage = subscription.stages.find(
// // // // // //       item => Number(item.stageNumber) === currentStage
// // // // // //     );

// // // // // //     if (!stage) {
// // // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // // //     }

// // // // // //     // Stage start karna.
// // // // // //     if (
// // // // // //       stage.status === "WAITING" ||
// // // // // //       stage.status === "LOCKED"
// // // // // //     ) {
// // // // // //       const previousStage =
// // // // // //         currentStage > 1
// // // // // //           ? subscription.stages.find(
// // // // // //               item => Number(item.stageNumber) === currentStage - 1
// // // // // //             )
// // // // // //           : null;

// // // // // //       const startTime = previousStage?.endsAt
// // // // // //         ? new Date(previousStage.endsAt)
// // // // // //         : new Date(packageStartTime);

// // // // // //       if (Number.isNaN(startTime.getTime())) {
// // // // // //         throw new Error(
// // // // // //           `Invalid start time for stage ${currentStage}`
// // // // // //         );
// // // // // //       }

// // // // // //       stage.status = "RUNNING";
// // // // // //       stage.startedAt = startTime;
// // // // // //       stage.endsAt = new Date(
// // // // // //         startTime.getTime() +
// // // // // //         Number(stage.durationDays) * DAY_MS
// // // // // //       );
// // // // // //       stage.pausedAt = null;
// // // // // //     }

// // // // // //     if (stage.status !== "RUNNING") {
// // // // // //       break;
// // // // // //     }

// // // // // //     const stageEnd = new Date(stage.endsAt);

// // // // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // // // //       throw new Error(
// // // // // //         `Invalid end time for stage ${currentStage}`
// // // // // //       );
// // // // // //     }

// // // // // //     // Timer abhi complete nahi hua.
// // // // // //     if (now < stageEnd) {
// // // // // //       break;
// // // // // //     }

// // // // // //     // Timer complete: stage achieved.
// // // // // //     stage.status = "ACHIEVED";
// // // // // //     stage.completedAt = stageEnd;
// // // // // //     stage.pausedAt = null;

// // // // // //     // Pending earning ko mark karna.
// // // // // //     // Already RECORDED earning ko overwrite nahi karna.
// // // // // //     if (stage.earningStatus !== "RECORDED") {
// // // // // //       stage.earningStatus = "PENDING";
// // // // // //       stage.earningRecordedAt = null;
// // // // // //     }

// // // // // //     currentStage += 1;

// // // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // // //       subscription.currentStage = currentStage;

// // // // // //       const nextStage = subscription.stages.find(
// // // // // //         item => Number(item.stageNumber) === currentStage
// // // // // //       );

// // // // // //       if (nextStage && nextStage.status === "LOCKED") {
// // // // // //         nextStage.status = "WAITING";
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   // Saare 14 stages complete.
// // // // // //   if (currentStage > TOTAL_STAGES) {
// // // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // // //     subscription.status = "COMPLETED";

// // // // // //     if (!subscription.completedAt) {
// // // // // //       subscription.completedAt = now;
// // // // // //     }
// // // // // //   } else {
// // // // // //     subscription.currentStage = currentStage;
// // // // // //   }

// // // // // //   await subscription.save();

// // // // // //   return subscription;
// // // // // // }

// // // // // // module.exports = {
// // // // // //   updatePackageProgress
// // // // // // };















// // // // // const mongoose = require("mongoose");
// // // // // const PackageSubscription = require("../models/PackageSubscription");
// // // // // const User = require("../models/User");
// // // // // const Transaction = require("../models/Transaction");

// // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // const TOTAL_STAGES = 14;

// // // // // const STAGE_DAYS = [
// // // // //   1, 3, 7, 15,
// // // // //   30, 30, 30, 30, 30, 30,
// // // // //   30, 30, 30, 30
// // // // // ];

// // // // // // Image ke exact stage-wise earning amounts.
// // // // // const PACKAGE_STAGE_EARNINGS = {
// // // // //   30: [5, 5, 10, 20, 30, 30, 50, 50, 100, 200, 400, 800, 1600, 3200],
// // // // //   60: [10, 10, 20, 40, 60, 60, 100, 100, 200, 400, 800, 1600, 3200, 6400],
// // // // //   120: [20, 20, 40, 80, 120, 120, 200, 200, 200, 800, 1600, 3200, 6400, 12800],
// // // // //   240: [40, 40, 80, 160, 240, 240, 400, 400, 800, 1600, 3200, 6400, 12800, 25600],
// // // // //   480: [80, 80, 160, 320, 480, 480, 800, 800, 1600, 3200, 6400, 12800, 25600, 51200],
// // // // //   960: [160, 160, 320, 640, 960, 960, 1600, 1600, 3200, 6400, 12800, 25600, 51200, 102400]
// // // // // };

// // // // // function getStageEarnings(packageAmount) {
// // // // //   const amount = Number(packageAmount);
// // // // //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// // // // //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// // // // //     throw new Error(
// // // // //       `Invalid package amount or earning schedule: ${packageAmount}`
// // // // //     );
// // // // //   }

// // // // //   return earnings;
// // // // // }

// // // // // function initializeStages(subscription) {
// // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // //   if (
// // // // //     !Array.isArray(subscription.stages) ||
// // // // //     subscription.stages.length !== TOTAL_STAGES
// // // // //   ) {
// // // // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // //       stageNumber: index + 1,
// // // // //       durationDays: days,
// // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // //       startedAt: null,
// // // // //       endsAt: null,
// // // // //       pausedAt: null,
// // // // //       completedAt: null,
// // // // //       accumulatedPausedSeconds: 0,
// // // // //       earningAmount: earnings[index],
// // // // //       earningStatus: "NOT_RECORDED",
// // // // //       earningRecordedAt: null
// // // // //     }));

// // // // //     subscription.currentStage = 1;
// // // // //   }
// // // // // }

// // // // // function normalizeStageFields(subscription) {
// // // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // // //   for (const stage of subscription.stages) {
// // // // //     const index = Number(stage.stageNumber) - 1;

// // // // //     if (index < 0 || index >= TOTAL_STAGES) {
// // // // //       throw new Error("Invalid stage number in subscription");
// // // // //     }

// // // // //     if (
// // // // //       !stage.earningStatus ||
// // // // //       stage.earningStatus === "NOT_RECORDED"
// // // // //     ) {
// // // // //       stage.earningAmount = earnings[index];
// // // // //       stage.earningStatus = "NOT_RECORDED";
// // // // //     }

// // // // //     if (stage.earningRecordedAt === undefined) {
// // // // //       stage.earningRecordedAt = null;
// // // // //     }

// // // // //     if (stage.accumulatedPausedSeconds === undefined) {
// // // // //       stage.accumulatedPausedSeconds = 0;
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Stage earning ko safely ek hi baar credit karna.
// // // // // async function creditStageEarning(subscription, stage) {
// // // // //   const stageNumber = Number(stage.stageNumber);
// // // // //   const earnings = getStageEarnings(subscription.packageAmount);
// // // // //   const amount = Number(earnings[stageNumber - 1]);

// // // // //   if (
// // // // //     !Number.isInteger(stageNumber) ||
// // // // //     stageNumber < 1 ||
// // // // //     stageNumber > TOTAL_STAGES ||
// // // // //     !Number.isFinite(amount) ||
// // // // //     amount <= 0
// // // // //   ) {
// // // // //     throw new Error("Invalid package stage earning");
// // // // //   }

// // // // //   const idempotencyKey =
// // // // //     `${subscription._id.toString()}:stage:${stageNumber}`;

// // // // //   // Pehle se ledger entry hai to balance dobara add nahi karna.
// // // // //   let transaction = await Transaction.findOne({ idempotencyKey });

// // // // //   if (!transaction) {
// // // // //     // User document par atomic marker + balance update.
// // // // //     // Concurrent cron/refresh mein sirf ek request balance badhayegi.
// // // // //     const updatedUser = await User.findOneAndUpdate(
// // // // //       {
// // // // //         userId: subscription.userId,
// // // // //         creditedPackageStages: { $ne: idempotencyKey }
// // // // //       },
// // // // //       {
// // // // //         $addToSet: {
// // // // //           creditedPackageStages: idempotencyKey
// // // // //         },
// // // // //         $inc: {
// // // // //           planIncome: amount,
// // // // //           totalPlanIncome: amount
// // // // //         }
// // // // //       },
// // // // // { returnDocument: "after" }
// // // // //     );

// // // // //     if (!updatedUser) {
// // // // //       const existingUser = await User.findOne({
// // // // //         userId: subscription.userId
// // // // //       });

// // // // //       if (!existingUser) {
// // // // //         throw new Error(
// // // // //           `User not found: ${subscription.userId}`
// // // // //         );
// // // // //       }

// // // // //       // Marker pehle se hai: balance already credited.
// // // // //       // Ab ledger entry missing ho to create karenge.
// // // // //     }
// // // // //   }

// // // // //   // Ledger entry create karna. Unique idempotencyKey
// // // // //   // duplicate transaction ko rokne mein madad karta hai.
// // // // //   if (!transaction) {
// // // // //     try {
// // // // //       transaction = await Transaction.create({
// // // // //         userId: subscription.userId,
// // // // //         type: "plan_income",
// // // // //         source: "package_stage",
// // // // //         amount: mongoose.Types.Decimal128.fromString(
// // // // //           amount.toFixed(2)
// // // // //         ),
// // // // //         package: Number(subscription.packageAmount),
// // // // //         subscriptionId: subscription._id,
// // // // //         stageNumber,
// // // // //         idempotencyKey,
// // // // //         description:
// // // // //           `Package stage ${stageNumber} earning`,
// // // // //         status: "completed",
// // // // //         date: new Date()
// // // // //       });
// // // // //     } catch (error) {
// // // // //       // Concurrent request ne same ledger entry bana di ho.
// // // // //       if (error.code !== 11000) {
// // // // //         throw error;
// // // // //       }

// // // // //       transaction = await Transaction.findOne({
// // // // //         idempotencyKey
// // // // //       });

// // // // //       if (!transaction) {
// // // // //         throw error;
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   stage.earningAmount = amount;
// // // // //   stage.earningStatus = "RECORDED";
// // // // //   stage.earningRecordedAt = new Date();
// // // // // }

// // // // // async function updatePackageProgress(subscriptionId) {
// // // // //   const subscription =
// // // // //     await PackageSubscription.findById(subscriptionId);

// // // // //   if (!subscription) {
// // // // //     throw new Error("Package subscription not found");
// // // // //   }

// // // // //   if (subscription.status !== "ACTIVE") {
// // // // //     return subscription;
// // // // //   }

// // // // //   initializeStages(subscription);
// // // // //   normalizeStageFields(subscription);

// // // // //   const now = new Date();

// // // // //   const packageStartTime =
// // // // //     subscription.activatedAt ||
// // // // //     subscription.purchasedAt ||
// // // // //     now;

// // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // //   if (
// // // // //     !Number.isInteger(currentStage) ||
// // // // //     currentStage < 1 ||
// // // // //     currentStage > TOTAL_STAGES
// // // // //   ) {
// // // // //     currentStage = 1;
// // // // //   }

// // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // //     const stage = subscription.stages.find(
// // // // //       item => Number(item.stageNumber) === currentStage
// // // // //     );

// // // // //     if (!stage) {
// // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // //     }

// // // // //     if (
// // // // //       stage.status === "WAITING" ||
// // // // //       stage.status === "LOCKED"
// // // // //     ) {
// // // // //       const previousStage =
// // // // //         currentStage > 1
// // // // //           ? subscription.stages.find(
// // // // //               item => Number(item.stageNumber) === currentStage - 1
// // // // //             )
// // // // //           : null;

// // // // //       const startTime = previousStage?.endsAt
// // // // //         ? new Date(previousStage.endsAt)
// // // // //         : new Date(packageStartTime);

// // // // //       if (Number.isNaN(startTime.getTime())) {
// // // // //         throw new Error(
// // // // //           `Invalid start time for stage ${currentStage}`
// // // // //         );
// // // // //       }

// // // // //       stage.status = "RUNNING";
// // // // //       stage.startedAt = startTime;
// // // // //       stage.endsAt = new Date(
// // // // //         startTime.getTime() +
// // // // //         Number(stage.durationDays) * DAY_MS
// // // // //       );
// // // // //       stage.pausedAt = null;
// // // // //     }

// // // // //     if (stage.status !== "RUNNING") {
// // // // //       break;
// // // // //     }

// // // // //     const stageEnd = new Date(stage.endsAt);

// // // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // // //       throw new Error(
// // // // //         `Invalid end time for stage ${currentStage}`
// // // // //       );
// // // // //     }

// // // // //     if (now < stageEnd) {
// // // // //       break;
// // // // //     }

// // // // //     stage.status = "ACHIEVED";
// // // // //     stage.completedAt = stageEnd;
// // // // //     stage.pausedAt = null;

// // // // //     if (stage.earningStatus !== "RECORDED") {
// // // // //       stage.earningStatus = "PENDING";
// // // // //       stage.earningRecordedAt = null;
// // // // //     }

// // // // //     currentStage += 1;

// // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // //       subscription.currentStage = currentStage;

// // // // //       const nextStage = subscription.stages.find(
// // // // //         item => Number(item.stageNumber) === currentStage
// // // // //       );

// // // // //       if (nextStage && nextStage.status === "LOCKED") {
// // // // //         nextStage.status = "WAITING";
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   if (currentStage > TOTAL_STAGES) {
// // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // //     subscription.status = "COMPLETED";

// // // // //     if (!subscription.completedAt) {
// // // // //       subscription.completedAt = now;
// // // // //     }
// // // // //   } else {
// // // // //     subscription.currentStage = currentStage;
// // // // //   }

// // // // //   // Pehle stage progress save hoga.
// // // // //   await subscription.save();

// // // // //   // Saare achieved but pending stages ki earning credit hogi.
// // // // //   for (const stage of subscription.stages) {
// // // // //     if (
// // // // //       stage.status === "ACHIEVED" &&
// // // // //       stage.earningStatus !== "RECORDED"
// // // // //     ) {
// // // // //       await creditStageEarning(subscription, stage);
// // // // //       await subscription.save();
// // // // //     }
// // // // //   }

// // // // //   return subscription;
// // // // // }

// // // // // module.exports = {
// // // // //   updatePackageProgress
// // // // // };


// // // // const mongoose = require("mongoose");

// // // // const PackageSubscription = require("../models/PackageSubscription");
// // // // const User = require("../models/User");
// // // // const Transaction = require("../models/Transaction");

// // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // const TOTAL_STAGES = 14;

// // // // // const STAGE_DAYS = [
// // // // //   1, 3, 7, 15,
// // // // //   30, 30, 30, 30, 30, 30,
// // // // //   30, 30, 30, 30
// // // // // ];


// // // // const STAGE_DAYS = [
// // // //   0.6, 0.6, 0.6, 0.6, 0.6,
// // // //   30, 30, 30, 30, 30,
// // // //   30, 30, 30, 30
// // // // ];

// // // // // Package-wise exact stage earning amounts.
// // // // const PACKAGE_STAGE_EARNINGS = {
// // // //   30: [
// // // //     5, 5, 10, 20, 30, 30, 50,
// // // //     50, 100, 200, 400, 800, 1600, 3200
// // // //   ],

// // // //   60: [
// // // //     10, 10, 20, 40, 60, 60, 100,
// // // //     100, 200, 400, 800, 1600, 3200, 6400
// // // //   ],

// // // //   120: [
// // // //     20, 20, 40, 80, 120, 120, 200,
// // // //     200, 200, 800, 1600, 3200, 6400, 12800
// // // //   ],

// // // //   240: [
// // // //     40, 40, 80, 160, 240, 240, 400,
// // // //     400, 800, 1600, 3200, 6400, 12800, 25600
// // // //   ],

// // // //   480: [
// // // //     80, 80, 160, 320, 480, 480, 800,
// // // //     800, 1600, 3200, 6400, 12800, 25600, 51200
// // // //   ],

// // // //   960: [
// // // //     160, 160, 320, 640, 960, 960, 1600,
// // // //     1600, 3200, 6400, 12800, 25600, 51200, 102400
// // // //   ]
// // // // };

// // // // // ---------------------------------------------
// // // // // GET PACKAGE STAGE EARNINGS
// // // // // ---------------------------------------------

// // // // function getStageEarnings(packageAmount) {
// // // //   const amount = Number(packageAmount);

// // // //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// // // //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// // // //     throw new Error(
// // // //       `Invalid package amount or earning schedule: ${packageAmount}`
// // // //     );
// // // //   }

// // // //   return earnings;
// // // // }

// // // // // ---------------------------------------------
// // // // // INITIALIZE ALL 14 STAGES
// // // // // ---------------------------------------------

// // // // function initializeStages(subscription) {
// // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // //   if (
// // // //     !Array.isArray(subscription.stages) ||
// // // //     subscription.stages.length !== TOTAL_STAGES
// // // //   ) {
// // // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // //       stageNumber: index + 1,
// // // //       durationDays: days,

// // // //       status: index === 0 ? "WAITING" : "LOCKED",

// // // //       startedAt: null,
// // // //       endsAt: null,
// // // //       pausedAt: null,
// // // //       completedAt: null,

// // // //       accumulatedPausedSeconds: 0,

// // // //       earningAmount: earnings[index],
// // // //       earningStatus: "NOT_RECORDED",
// // // //       earningRecordedAt: null
// // // //     }));

// // // //     subscription.currentStage = 1;
// // // //   }
// // // // }

// // // // // ---------------------------------------------
// // // // // NORMALIZE STAGE FIELDS
// // // // // ---------------------------------------------

// // // // function normalizeStageFields(subscription) {
// // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // //   for (const stage of subscription.stages) {
// // // //     const index = Number(stage.stageNumber) - 1;

// // // //     if (index < 0 || index >= TOTAL_STAGES) {
// // // //       throw new Error("Invalid stage number in subscription.");
// // // //     }

// // // //     if (
// // // //       !stage.earningStatus ||
// // // //       stage.earningStatus === "NOT_RECORDED"
// // // //     ) {
// // // //       stage.earningAmount = earnings[index];
// // // //       stage.earningStatus = "NOT_RECORDED";
// // // //     }

// // // //     if (stage.earningRecordedAt === undefined) {
// // // //       stage.earningRecordedAt = null;
// // // //     }

// // // //     if (stage.accumulatedPausedSeconds === undefined) {
// // // //       stage.accumulatedPausedSeconds = 0;
// // // //     }
// // // //   }
// // // // }

// // // // // ---------------------------------------------
// // // // // CREDIT STAGE EARNING - IDEMPOTENT
// // // // // ---------------------------------------------

// // // // async function creditStageEarning(subscription, stage) {
// // // //   const stageNumber = Number(stage.stageNumber);

// // // //   const earnings = getStageEarnings(subscription.packageAmount);

// // // //   const amount = Number(earnings[stageNumber - 1]);

// // // //   if (
// // // //     !Number.isInteger(stageNumber) ||
// // // //     stageNumber < 1 ||
// // // //     stageNumber > TOTAL_STAGES ||
// // // //     !Number.isFinite(amount) ||
// // // //     amount <= 0
// // // //   ) {
// // // //     throw new Error("Invalid package stage earning.");
// // // //   }

// // // //   if (stage.status !== "ACHIEVED") {
// // // //     throw new Error(
// // // //       `Stage ${stageNumber} is not achieved yet.`
// // // //     );
// // // //   }

// // // //   const idempotencyKey =
// // // //     `${subscription._id.toString()}:stage:${stageNumber}`;

// // // //   // Check whether this stage was already credited.
// // // //   let transaction = await Transaction.findOne({
// // // //     idempotencyKey
// // // //   });

// // // //   if (!transaction) {
// // // //     // Atomically add the unique stage marker and update income.
// // // //     // Only one request can successfully add this marker.
// // // //     const updatedUser = await User.findOneAndUpdate(
// // // //       {
// // // //         userId: subscription.userId,

// // // //         creditedPackageStages: {
// // // //           $ne: idempotencyKey
// // // //         }
// // // //       },
// // // //       {
// // // //         $addToSet: {
// // // //           creditedPackageStages: idempotencyKey
// // // //         },

// // // //         $inc: {
// // // //           planIncome: amount,
// // // //           totalPlanIncome: amount
// // // //         }
// // // //       },
// // // //       {
// // // //         new: true,
// // // //         runValidators: true
// // // //       }
// // // //     );

// // // //     if (!updatedUser) {
// // // //       // The marker may already exist because another request
// // // //       // credited this stage.
// // // //       const existingUser = await User.findOne({
// // // //         userId: subscription.userId
// // // //       }).select("userId creditedPackageStages");

// // // //       if (!existingUser) {
// // // //         throw new Error(
// // // //           `User not found: ${subscription.userId}`
// // // //         );
// // // //       }

// // // //       const alreadyCredited =
// // // //         Array.isArray(existingUser.creditedPackageStages) &&
// // // //         existingUser.creditedPackageStages.includes(idempotencyKey);

// // // //       if (!alreadyCredited) {
// // // //         throw new Error(
// // // //           "Unable to credit package stage earning."
// // // //         );
// // // //       }
// // // //     }

// // // //     // Create transaction ledger entry.
// // // //     // A unique index on idempotencyKey prevents duplicate entries.
// // // //     try {
// // // //       transaction = await Transaction.create({
// // // //         userId: subscription.userId,

// // // //         type: "plan_income",
// // // //         source: "package_stage",

// // // //         amount: mongoose.Types.Decimal128.fromString(
// // // //           amount.toFixed(2)
// // // //         ),

// // // //         package: Number(subscription.packageAmount),

// // // //         subscriptionId: subscription._id,
// // // //         stageNumber,

// // // //         idempotencyKey,

// // // //         description:
// // // //           `Package $${subscription.packageAmount} Stage ${stageNumber} earning`,

// // // //         status: "completed",
// // // //         date: new Date()
// // // //       });

// // // //     } catch (error) {
// // // //       if (error.code !== 11000) {
// // // //         throw error;
// // // //       }

// // // //       transaction = await Transaction.findOne({
// // // //         idempotencyKey
// // // //       });

// // // //       if (!transaction) {
// // // //         throw error;
// // // //       }
// // // //     }
// // // //   }

// // // //   // Update stage only after confirming the ledger entry exists.
// // // //   if (!transaction) {
// // // //     throw new Error(
// // // //       `Stage ${stageNumber} earning ledger entry was not created.`
// // // //     );
// // // //   }

// // // //   stage.earningAmount = amount;
// // // //   stage.earningStatus = "RECORDED";

// // // //   if (!stage.earningRecordedAt) {
// // // //     stage.earningRecordedAt =
// // // //       transaction.date || new Date();
// // // //   }

// // // //   return stage;
// // // // }

// // // // // ---------------------------------------------
// // // // // UPDATE PACKAGE PROGRESS
// // // // // ---------------------------------------------

// // // // async function updatePackageProgress(subscriptionId) {
// // // //   if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
// // // //     throw new Error("Invalid package subscription ID.");
// // // //   }

// // // //   const subscription =
// // // //     await PackageSubscription.findById(subscriptionId);

// // // //   if (!subscription) {
// // // //     throw new Error("Package subscription not found.");
// // // //   }

// // // //   if (subscription.status !== "ACTIVE") {
// // // //     return subscription;
// // // //   }

// // // //   initializeStages(subscription);

// // // //   normalizeStageFields(subscription);

// // // //   const now = new Date();

// // // //   const packageStartTime =
// // // //     subscription.activatedAt ||
// // // //     subscription.purchasedAt ||
// // // //     now;

// // // //   let currentStage = Number(
// // // //     subscription.currentStage || 1
// // // //   );

// // // //   if (
// // // //     !Number.isInteger(currentStage) ||
// // // //     currentStage < 1 ||
// // // //     currentStage > TOTAL_STAGES
// // // //   ) {
// // // //     currentStage = 1;
// // // //   }

// // // //   // -------------------------------------------
// // // //   // PROCESS STAGE TIMERS
// // // //   // -------------------------------------------

// // // //   while (currentStage <= TOTAL_STAGES) {
// // // //     const stage = subscription.stages.find(
// // // //       item =>
// // // //         Number(item.stageNumber) === currentStage
// // // //     );

// // // //     if (!stage) {
// // // //       throw new Error(
// // // //         `Stage ${currentStage} not found.`
// // // //       );
// // // //     }

// // // //     // Start waiting/locked stage.
// // // //     if (
// // // //       stage.status === "WAITING" ||
// // // //       stage.status === "LOCKED"
// // // //     ) {
// // // //       const previousStage =
// // // //         currentStage > 1
// // // //           ? subscription.stages.find(
// // // //               item =>
// // // //                 Number(item.stageNumber) === currentStage - 1
// // // //             )
// // // //           : null;

// // // //       const startTime = previousStage?.endsAt
// // // //         ? new Date(previousStage.endsAt)
// // // //         : new Date(packageStartTime);

// // // //       if (Number.isNaN(startTime.getTime())) {
// // // //         throw new Error(
// // // //           `Invalid start time for stage ${currentStage}.`
// // // //         );
// // // //       }

// // // //       stage.status = "RUNNING";

// // // //       stage.startedAt = startTime;

// // // //       stage.endsAt = new Date(
// // // //         startTime.getTime() +
// // // //         Number(stage.durationDays) * DAY_MS
// // // //       );

// // // //       stage.pausedAt = null;
// // // //     }

// // // //     // Do not process paused or other statuses.
// // // //     if (stage.status !== "RUNNING") {
// // // //       break;
// // // //     }

// // // //     const stageEnd = new Date(stage.endsAt);

// // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // //       throw new Error(
// // // //         `Invalid end time for stage ${currentStage}.`
// // // //       );
// // // //     }

// // // //     // Stage timer is still running.
// // // //     if (now < stageEnd) {
// // // //       break;
// // // //     }

// // // //     // Stage achieved.
// // // //     stage.status = "ACHIEVED";

// // // //     stage.completedAt = stageEnd;

// // // //     stage.pausedAt = null;

// // // //     if (stage.earningStatus !== "RECORDED") {
// // // //       stage.earningStatus = "PENDING";
// // // //       stage.earningRecordedAt = null;
// // // //     }

// // // //     currentStage += 1;

// // // //     // Unlock the next stage.
// // // //     if (currentStage <= TOTAL_STAGES) {
// // // //       subscription.currentStage = currentStage;

// // // //       const nextStage = subscription.stages.find(
// // // //         item =>
// // // //           Number(item.stageNumber) === currentStage
// // // //       );

// // // //       if (nextStage && nextStage.status === "LOCKED") {
// // // //         nextStage.status = "WAITING";
// // // //       }
// // // //     }
// // // //   }

// // // //   // -------------------------------------------
// // // //   // COMPLETE PACKAGE AFTER STAGE 14
// // // //   // -------------------------------------------

// // // //   if (currentStage > TOTAL_STAGES) {
// // // //     subscription.currentStage = TOTAL_STAGES;

// // // //     subscription.status = "COMPLETED";

// // // //     if (!subscription.completedAt) {
// // // //       subscription.completedAt = now;
// // // //     }
// // // //   } else {
// // // //     subscription.currentStage = currentStage;
// // // //   }

// // // //   // Save stage progress before crediting income.
// // // //   await subscription.save();

// // // //   // -------------------------------------------
// // // //   // CREDIT ALL ACHIEVED PENDING STAGES
// // // //   // -------------------------------------------

// // // //   for (const stage of subscription.stages) {
// // // //     if (
// // // //       stage.status === "ACHIEVED" &&
// // // //       stage.earningStatus !== "RECORDED"
// // // //     ) {
// // // //       await creditStageEarning(subscription, stage);

// // // //       // Save after each successful stage credit.
// // // //       await subscription.save();
// // // //     }
// // // //   }

// // // //   return subscription;
// // // // }

// // // // // ---------------------------------------------
// // // // // EXPORT SERVICE
// // // // // ---------------------------------------------

// // // // module.exports = {
// // // //   updatePackageProgress
// // // // };

// // // const mongoose = require("mongoose");

// // // const PackageSubscription = require("../models/PackageSubscription");
// // // const User = require("../models/User");
// // // const Transaction = require("../models/Transaction");

// // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // const TOTAL_STAGES = 14;


// // // // ---------------------------------------------
// // // // STAGE TIMING
// // // // ---------------------------------------------

// // // const STAGE_DAYS = [
// // //   0.6, 0.6, 0.6, 0.6, 0.6,
// // //   30, 30, 30, 30, 30,
// // //   30, 30, 30, 30
// // // ];


// // // // ---------------------------------------------
// // // // PACKAGE-WISE EXACT STAGE EARNINGS
// // // // ---------------------------------------------

// // // const PACKAGE_STAGE_EARNINGS = {
// // //   30: [
// // //     5, 5, 10, 20, 30, 30, 50,
// // //     50, 100, 200, 400, 800, 1600, 3200
// // //   ],

// // //   60: [
// // //     10, 10, 20, 40, 60, 60, 100,
// // //     100, 200, 400, 800, 1600, 3200, 6400
// // //   ],

// // //   120: [
// // //     20, 20, 40, 80, 120, 120, 200,
// // //     200, 200, 800, 1600, 3200, 6400, 12800
// // //   ],

// // //   240: [
// // //     40, 40, 80, 160, 240, 240, 400,
// // //     400, 800, 1600, 3200, 6400, 12800, 25600
// // //   ],

// // //   480: [
// // //     80, 80, 160, 320, 480, 480, 800,
// // //     800, 1600, 3200, 6400, 12800, 25600, 51200
// // //   ],

// // //   960: [
// // //     160, 160, 320, 640, 960, 960, 1600,
// // //     1600, 3200, 6400, 12800, 25600, 51200, 102400
// // //   ]
// // // };


// // // // ---------------------------------------------
// // // // STAGE 6 PACKAGE UPGRADE REQUIREMENTS
// // // // All direct referrals must have ACTIVE $30 package
// // // // ---------------------------------------------

// // // const PACKAGE_UPGRADE_RULES = {
// // //   30:  { nextPackage: 60,  required30Directs: 2 },
// // //   60:  { nextPackage: 120, required30Directs: 4 },
// // //   120: { nextPackage: 240, required30Directs: 6 },
// // //   240: { nextPackage: 480, required30Directs: 8 },
// // //   480: { nextPackage: 960, required30Directs: 10 },
// // //   960: { nextPackage: null, required30Directs: 12 }
// // // };


// // // // ---------------------------------------------
// // // // GET PACKAGE STAGE EARNINGS
// // // // ---------------------------------------------

// // // function getStageEarnings(packageAmount) {
// // //   const amount = Number(packageAmount);

// // //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// // //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// // //     throw new Error(
// // //       `Invalid package amount or earning schedule: ${packageAmount}`
// // //     );
// // //   }

// // //   return earnings;
// // // }


// // // // ---------------------------------------------
// // // // INITIALIZE ALL 14 STAGES
// // // // ---------------------------------------------

// // // function initializeStages(subscription) {
// // //   const earnings = getStageEarnings(subscription.packageAmount);

// // //   if (
// // //     !Array.isArray(subscription.stages) ||
// // //     subscription.stages.length !== TOTAL_STAGES
// // //   ) {
// // //     subscription.stages = STAGE_DAYS.map((days, index) => ({
// // //       stageNumber: index + 1,
// // //       durationDays: days,

// // //       status: index === 0 ? "WAITING" : "LOCKED",

// // //       startedAt: null,
// // //       endsAt: null,
// // //       pausedAt: null,
// // //       completedAt: null,

// // //       accumulatedPausedSeconds: 0,

// // //       earningAmount: earnings[index],
// // //       earningStatus: "NOT_RECORDED",
// // //       earningRecordedAt: null
// // //     }));

// // //     subscription.currentStage = 1;
// // //   }
// // // }


// // // // ---------------------------------------------
// // // // NORMALIZE STAGE FIELDS
// // // // ---------------------------------------------

// // // function normalizeStageFields(subscription) {
// // //   const earnings = getStageEarnings(subscription.packageAmount);

// // //   for (const stage of subscription.stages) {
// // //     const index = Number(stage.stageNumber) - 1;

// // //     if (index < 0 || index >= TOTAL_STAGES) {
// // //       throw new Error("Invalid stage number in subscription.");
// // //     }

// // //     if (
// // //       !stage.earningStatus ||
// // //       stage.earningStatus === "NOT_RECORDED"
// // //     ) {
// // //       stage.earningAmount = earnings[index];
// // //       stage.earningStatus = "NOT_RECORDED";
// // //     }

// // //     if (stage.earningRecordedAt === undefined) {
// // //       stage.earningRecordedAt = null;
// // //     }

// // //     if (stage.accumulatedPausedSeconds === undefined) {
// // //       stage.accumulatedPausedSeconds = 0;
// // //     }
// // //   }
// // // }


// // // // ---------------------------------------------
// // // // COUNT UNIQUE DIRECT REFERRALS WITH ACTIVE $30
// // // // ---------------------------------------------

// // // async function getActive30DirectCount(user) {
// // //   const directUsers = await User.find({
// // //     sponsorId: user.userId
// // //   })
// // //     .select("userId")
// // //     .lean();

// // //   const directIds = directUsers.map(item => item.userId);

// // //   if (!directIds.length) {
// // //     return 0;
// // //   }

// // //   const active30DirectUsers = await PackageSubscription.distinct(
// // //     "userId",
// // //     {
// // //       userId: { $in: directIds },
// // //       packageAmount: 30,
// // //       status: "ACTIVE"
// // //     }
// // //   );

// // //   return active30DirectUsers.length;
// // // }


// // // // ---------------------------------------------
// // // // CHECK USER'S OWN NEXT PACKAGE UPGRADE
// // // // ---------------------------------------------

// // // async function hasOwnPackageUpgrade(user, requiredAmount) {
// // //   // $960 has no next package to upgrade to.
// // //   if (!requiredAmount) {
// // //     return true;
// // //   }

// // //   const upgradedSubscription = await PackageSubscription.findOne({
// // //     userId: user.userId,
// // //     packageAmount: requiredAmount,
// // //     status: { $in: ["ACTIVE", "COMPLETED"] }
// // //   })
// // //     .select("_id")
// // //     .lean();

// // //   if (upgradedSubscription) {
// // //     return true;
// // //   }

// // //   // Preserve existing legacy package compatibility.
// // //   if (Number(user.topUpAmount || 0) >= requiredAmount) {
// // //     return true;
// // //   }

// // //   const legacyPackages = Array.isArray(user.packages)
// // //     ? user.packages
// // //     : [];

// // //   return legacyPackages.some(
// // //     item => Number(item.amount || 0) >= requiredAmount
// // //   );
// // // }


// // // // ---------------------------------------------
// // // // CHECK STAGE 6 ELIGIBILITY
// // // // ---------------------------------------------

// // // async function checkStageSixEligibility(subscription) {
// // //   const packageAmount = Number(subscription.packageAmount);

// // //   const rule = PACKAGE_UPGRADE_RULES[packageAmount];

// // //   if (!rule) {
// // //     return {
// // //       allowed: false,
// // //       message: `No Stage 6 rule configured for $${packageAmount}.`
// // //     };
// // //   }

// // //   const user = await User.findOne({
// // //     userId: subscription.userId
// // //   })
// // //     .select("userId sponsorId topUpAmount packages")
// // //     .lean();

// // //   if (!user) {
// // //     return {
// // //       allowed: false,
// // //       message: "Package owner was not found."
// // //     };
// // //   }

// // //   const matchingDirects = await getActive30DirectCount(user);

// // //   const directReady =
// // //     matchingDirects >= rule.required30Directs;

// // //   const upgradeReady = await hasOwnPackageUpgrade(
// // //     user,
// // //     rule.nextPackage
// // //   );

// // //   const missing = [];

// // //   if (!directReady) {
// // //     missing.push(
// // //       `${rule.required30Directs} active $30 direct referrals (${matchingDirects}/${rule.required30Directs})`
// // //     );
// // //   }

// // //   if (!upgradeReady) {
// // //     missing.push(
// // //       `your own package upgraded to $${rule.nextPackage}`
// // //     );
// // //   }

// // //   return {
// // //     allowed: missing.length === 0,

// // //     message: missing.length
// // //       ? `Stage 6 is locked for your $${packageAmount} package. Complete: ${missing.join("; ")}.`
// // //       : "Stage 6 eligibility completed.",

// // //     matchingDirects,
// // //     requiredDirects: rule.required30Directs
// // //   };
// // // }


// // // // ---------------------------------------------
// // // // CREDIT STAGE EARNING - IDEMPOTENT
// // // // ---------------------------------------------

// // // async function creditStageEarning(subscription, stage) {
// // //   const stageNumber = Number(stage.stageNumber);

// // //   const earnings = getStageEarnings(subscription.packageAmount);

// // //   const amount = Number(earnings[stageNumber - 1]);

// // //   if (
// // //     !Number.isInteger(stageNumber) ||
// // //     stageNumber < 1 ||
// // //     stageNumber > TOTAL_STAGES ||
// // //     !Number.isFinite(amount) ||
// // //     amount <= 0
// // //   ) {
// // //     throw new Error("Invalid package stage earning.");
// // //   }

// // //   if (stage.status !== "ACHIEVED") {
// // //     throw new Error(
// // //       `Stage ${stageNumber} is not achieved yet.`
// // //     );
// // //   }

// // //   const idempotencyKey =
// // //     `${subscription._id.toString()}:stage:${stageNumber}`;

// // //   // Check whether this stage was already credited.
// // //   let transaction = await Transaction.findOne({
// // //     idempotencyKey
// // //   });

// // //   if (!transaction) {
// // //     // Atomically add the unique stage marker and update income.
// // //     // Only one request can successfully add this marker.
// // //     const updatedUser = await User.findOneAndUpdate(
// // //       {
// // //         userId: subscription.userId,

// // //         creditedPackageStages: {
// // //           $ne: idempotencyKey
// // //         }
// // //       },
// // //       {
// // //         $addToSet: {
// // //           creditedPackageStages: idempotencyKey
// // //         },

// // //         $inc: {
// // //           planIncome: amount,
// // //           totalPlanIncome: amount
// // //         }
// // //       },
// // //       {
// // //         new: true,
// // //         runValidators: true
// // //       }
// // //     );

// // //     if (!updatedUser) {
// // //       // The marker may already exist because another request
// // //       // credited this stage.
// // //       const existingUser = await User.findOne({
// // //         userId: subscription.userId
// // //       }).select("userId creditedPackageStages");

// // //       if (!existingUser) {
// // //         throw new Error(
// // //           `User not found: ${subscription.userId}`
// // //         );
// // //       }

// // //       const alreadyCredited =
// // //         Array.isArray(existingUser.creditedPackageStages) &&
// // //         existingUser.creditedPackageStages.includes(idempotencyKey);

// // //       if (!alreadyCredited) {
// // //         throw new Error(
// // //           "Unable to credit package stage earning."
// // //         );
// // //       }
// // //     }

// // //     // Create transaction ledger entry.
// // //     // A unique index on idempotencyKey prevents duplicate entries.
// // //     try {
// // //       transaction = await Transaction.create({
// // //         userId: subscription.userId,

// // //         type: "plan_income",
// // //         source: "package_stage",

// // //         amount: mongoose.Types.Decimal128.fromString(
// // //           amount.toFixed(2)
// // //         ),

// // //         package: Number(subscription.packageAmount),

// // //         subscriptionId: subscription._id,
// // //         stageNumber,

// // //         idempotencyKey,

// // //         description:
// // //           `Package $${subscription.packageAmount} Stage ${stageNumber} earning`,

// // //         status: "completed",
// // //         date: new Date()
// // //       });

// // //     } catch (error) {
// // //       if (error.code !== 11000) {
// // //         throw error;
// // //       }

// // //       transaction = await Transaction.findOne({
// // //         idempotencyKey
// // //       });

// // //       if (!transaction) {
// // //         throw error;
// // //       }
// // //     }
// // //   }

// // //   // Update stage only after confirming the ledger entry exists.
// // //   if (!transaction) {
// // //     throw new Error(
// // //       `Stage ${stageNumber} earning ledger entry was not created.`
// // //     );
// // //   }

// // //   stage.earningAmount = amount;
// // //   stage.earningStatus = "RECORDED";

// // //   if (!stage.earningRecordedAt) {
// // //     stage.earningRecordedAt =
// // //       transaction.date || new Date();
// // //   }

// // //   return stage;
// // // }


// // // // ---------------------------------------------
// // // // UPDATE PACKAGE PROGRESS
// // // // ---------------------------------------------

// // // async function updatePackageProgress(subscriptionId) {
// // //   if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
// // //     throw new Error("Invalid package subscription ID.");
// // //   }

// // //   const subscription =
// // //     await PackageSubscription.findById(subscriptionId);

// // //   if (!subscription) {
// // //     throw new Error("Package subscription not found.");
// // //   }

// // //   if (subscription.status !== "ACTIVE") {
// // //     return subscription;
// // //   }

// // //   initializeStages(subscription);

// // //   normalizeStageFields(subscription);

// // //   const now = new Date();

// // //   const packageStartTime =
// // //     subscription.activatedAt ||
// // //     subscription.purchasedAt ||
// // //     now;

// // //   let currentStage = Number(
// // //     subscription.currentStage || 1
// // //   );

// // //   if (
// // //     !Number.isInteger(currentStage) ||
// // //     currentStage < 1 ||
// // //     currentStage > TOTAL_STAGES
// // //   ) {
// // //     currentStage = 1;
// // //   }


// // //   // -------------------------------------------
// // //   // PROCESS STAGE TIMERS
// // //   // -------------------------------------------

// // //   while (currentStage <= TOTAL_STAGES) {
// // //     const stage = subscription.stages.find(
// // //       item =>
// // //         Number(item.stageNumber) === currentStage
// // //     );

// // //     if (!stage) {
// // //       throw new Error(
// // //         `Stage ${currentStage} not found.`
// // //       );
// // //     }


// // //     // -----------------------------------------
// // //     // STAGE 6 ELIGIBILITY CHECK
// // //     // -----------------------------------------

// // //     if (
// // //       currentStage === 6 &&
// // //       (stage.status === "WAITING" || stage.status === "LOCKED")
// // //     ) {
// // //       const eligibility = await checkStageSixEligibility(
// // //         subscription
// // //       );

// // //       if (!eligibility.allowed) {
// // //         stage.status = "LOCKED";

// // //         // Locked time must not count toward Stage 6.
// // //         stage.startedAt = null;
// // //         stage.endsAt = null;
// // //         stage.pausedAt = null;

// // //         break;
// // //       }
// // //     }


// // //     // -----------------------------------------
// // //     // START WAITING / LOCKED STAGE
// // //     // -----------------------------------------

// // //     if (
// // //       stage.status === "WAITING" ||
// // //       stage.status === "LOCKED"
// // //     ) {
// // //       const previousStage =
// // //         currentStage > 1
// // //           ? subscription.stages.find(
// // //               item =>
// // //                 Number(item.stageNumber) === currentStage - 1
// // //             )
// // //           : null;

// // //       // Stage 6 starts when eligibility is confirmed.
// // //       // All other stages keep their original timing.
// // //       const startTime = currentStage === 6
// // //         ? new Date(now)
// // //         : previousStage?.endsAt
// // //           ? new Date(previousStage.endsAt)
// // //           : new Date(packageStartTime);

// // //       if (Number.isNaN(startTime.getTime())) {
// // //         throw new Error(
// // //           `Invalid start time for stage ${currentStage}.`
// // //         );
// // //       }

// // //       stage.status = "RUNNING";

// // //       stage.startedAt = startTime;

// // //       stage.endsAt = new Date(
// // //         startTime.getTime() +
// // //         Number(stage.durationDays) * DAY_MS
// // //       );

// // //       stage.pausedAt = null;
// // //     }


// // //     // -----------------------------------------
// // //     // DO NOT PROCESS PAUSED OR OTHER STATUSES
// // //     // -----------------------------------------

// // //     if (stage.status !== "RUNNING") {
// // //       break;
// // //     }

// // //     const stageEnd = new Date(stage.endsAt);

// // //     if (Number.isNaN(stageEnd.getTime())) {
// // //       throw new Error(
// // //         `Invalid end time for stage ${currentStage}.`
// // //       );
// // //     }


// // //     // -----------------------------------------
// // //     // STAGE TIMER IS STILL RUNNING
// // //     // -----------------------------------------

// // //     if (now < stageEnd) {
// // //       break;
// // //     }


// // //     // -----------------------------------------
// // //     // STAGE ACHIEVED
// // //     // -----------------------------------------

// // //     stage.status = "ACHIEVED";

// // //     stage.completedAt = stageEnd;

// // //     stage.pausedAt = null;

// // //     if (stage.earningStatus !== "RECORDED") {
// // //       stage.earningStatus = "PENDING";
// // //       stage.earningRecordedAt = null;
// // //     }

// // //     currentStage += 1;


// // //     // -----------------------------------------
// // //     // UNLOCK THE NEXT STAGE
// // //     // -----------------------------------------

// // //     if (currentStage <= TOTAL_STAGES) {
// // //       subscription.currentStage = currentStage;

// // //       const nextStage = subscription.stages.find(
// // //         item =>
// // //           Number(item.stageNumber) === currentStage
// // //       );

// // //       if (nextStage && nextStage.status === "LOCKED") {
// // //         nextStage.status = "WAITING";
// // //       }
// // //     }
// // //   }


// // //   // -------------------------------------------
// // //   // COMPLETE PACKAGE AFTER STAGE 14
// // //   // -------------------------------------------

// // //   if (currentStage > TOTAL_STAGES) {
// // //     subscription.currentStage = TOTAL_STAGES;

// // //     subscription.status = "COMPLETED";

// // //     if (!subscription.completedAt) {
// // //       subscription.completedAt = now;
// // //     }

// // //   } else {
// // //     subscription.currentStage = currentStage;
// // //   }


// // //   // -------------------------------------------
// // //   // SAVE STAGE PROGRESS BEFORE CREDITING INCOME
// // //   // -------------------------------------------

// // //   await subscription.save();


// // //   // -------------------------------------------
// // //   // CREDIT ALL ACHIEVED PENDING STAGES
// // //   // -------------------------------------------

// // //   for (const stage of subscription.stages) {
// // //     if (
// // //       stage.status === "ACHIEVED" &&
// // //       stage.earningStatus !== "RECORDED"
// // //     ) {
// // //       await creditStageEarning(subscription, stage);

// // //       // Save after each successful stage credit.
// // //       await subscription.save();
// // //     }
// // //   }

// // //   return subscription;
// // // }


// // // // ---------------------------------------------
// // // // EXPORT SERVICE
// // // // ---------------------------------------------

// // // module.exports = {
// // //   updatePackageProgress
// // // };


// // const mongoose = require("mongoose");

// // const PackageSubscription = require("../models/PackageSubscription");
// // const User = require("../models/User");
// // const Transaction = require("../models/Transaction");

// // const DAY_MS = 24 * 60 * 60 * 1000;
// // const TOTAL_STAGES = 14;


// // // ---------------------------------------------
// // // STAGE TIMING
// // // ---------------------------------------------

// // const DEFAULT_STAGE_DAYS = [
// //   1, 3, 7, 15,
// //   30, 30, 30, 30, 30, 30,
// //   30, 30, 30, 30
// // ];

// // // Only the $30 package gets five 1-day stages.
// // // All other packages keep the original schedule.
 

// // function getStageDays(packageAmount) {
// //   // Only $30 package: first 5 stages complete within 24 hours.
// //   if (Number(packageAmount) === 30) {
// //     return [
// //       0.2, 0.2, 0.2, 0.2, 0.2,
// //       30, 30, 30, 30, 30,
// //       30, 30, 30, 30
// //     ];
// //   }

// //   // All other packages keep the original schedule.
// //   return [...DEFAULT_STAGE_DAYS];
// // }


// // // ---------------------------------------------
// // // PACKAGE-WISE EXACT STAGE EARNINGS
// // // ---------------------------------------------

// // const PACKAGE_STAGE_EARNINGS = {
// //   30: [
// //     5, 5, 10, 20, 30, 30, 50,
// //     50, 100, 200, 400, 800, 1600, 3200
// //   ],

// //   60: [
// //     10, 10, 20, 40, 60, 60, 100,
// //     100, 200, 400, 800, 1600, 3200, 6400
// //   ],

// //   120: [
// //     20, 20, 40, 80, 120, 120, 200,
// //     200, 200, 800, 1600, 3200, 6400, 12800
// //   ],

// //   240: [
// //     40, 40, 80, 160, 240, 240, 400,
// //     400, 800, 1600, 3200, 6400, 12800, 25600
// //   ],

// //   480: [
// //     80, 80, 160, 320, 480, 480, 800,
// //     800, 1600, 3200, 6400, 12800, 25600, 51200
// //   ],

// //   960: [
// //     160, 160, 320, 640, 960, 960, 1600,
// //     1600, 3200, 6400, 12800, 25600, 51200, 102400
// //   ]
// // };


// // // ---------------------------------------------
// // // STAGE 6 PACKAGE UPGRADE REQUIREMENTS
// // // All direct referrals must have ACTIVE $30 package
// // // ---------------------------------------------

// // const PACKAGE_UPGRADE_RULES = {
// //   30:  { nextPackage: 60,  required30Directs: 2 },
// //   60:  { nextPackage: 120, required30Directs: 4 },
// //   120: { nextPackage: 240, required30Directs: 6 },
// //   240: { nextPackage: 480, required30Directs: 8 },
// //   480: { nextPackage: 960, required30Directs: 10 },
// //   960: { nextPackage: null, required30Directs: 12 }
// // };


// // // ---------------------------------------------
// // // GET PACKAGE STAGE EARNINGS
// // // ---------------------------------------------

// // function getStageEarnings(packageAmount) {
// //   const amount = Number(packageAmount);

// //   const earnings = PACKAGE_STAGE_EARNINGS[amount];

// //   if (!earnings || earnings.length !== TOTAL_STAGES) {
// //     throw new Error(
// //       `Invalid package amount or earning schedule: ${packageAmount}`
// //     );
// //   }

// //   return earnings;
// // }


// // // ---------------------------------------------
// // // INITIALIZE ALL 14 STAGES
// // // ---------------------------------------------

// // function initializeStages(subscription) {
// //   const earnings = getStageEarnings(subscription.packageAmount);

// //   if (
// //     !Array.isArray(subscription.stages) ||
// //     subscription.stages.length !== TOTAL_STAGES
// //   ) {
// //     subscription.stages = getStageDays(subscription.packageAmount).map((days, index) => ({
// //       stageNumber: index + 1,
// //       durationDays: days,

// //       status: index === 0 ? "WAITING" : "LOCKED",

// //       startedAt: null,
// //       endsAt: null,
// //       pausedAt: null,
// //       completedAt: null,

// //       accumulatedPausedSeconds: 0,

// //       earningAmount: earnings[index],
// //       earningStatus: "NOT_RECORDED",
// //       earningRecordedAt: null
// //     }));

// //     subscription.currentStage = 1;
// //   }
// // }


// // // ---------------------------------------------
// // // NORMALIZE STAGE FIELDS
// // // ---------------------------------------------

// // function normalizeStageFields(subscription) {
// //   const earnings = getStageEarnings(subscription.packageAmount);

// //   for (const stage of subscription.stages) {
// //     const index = Number(stage.stageNumber) - 1;

// //     if (index < 0 || index >= TOTAL_STAGES) {
// //       throw new Error("Invalid stage number in subscription.");
// //     }

// //     if (
// //       !stage.earningStatus ||
// //       stage.earningStatus === "NOT_RECORDED"
// //     ) {
// //       stage.earningAmount = earnings[index];
// //       stage.earningStatus = "NOT_RECORDED";
// //     }

// //     if (stage.earningRecordedAt === undefined) {
// //       stage.earningRecordedAt = null;
// //     }

// //     if (stage.accumulatedPausedSeconds === undefined) {
// //       stage.accumulatedPausedSeconds = 0;
// //     }
// //   }
// // }


// // // ---------------------------------------------
// // // COUNT UNIQUE DIRECT REFERRALS WITH ACTIVE $30
// // // ---------------------------------------------

// // async function getActive30DirectCount(user) {
// //   const directUsers = await User.find({
// //     sponsorId: user.userId
// //   })
// //     .select("userId")
// //     .lean();

// //   const directIds = directUsers.map(item => item.userId);

// //   if (!directIds.length) {
// //     return 0;
// //   }

// //   const active30DirectUsers = await PackageSubscription.distinct(
// //     "userId",
// //     {
// //       userId: { $in: directIds },
// //       packageAmount: 30,
// //       status: "ACTIVE"
// //     }
// //   );

// //   return active30DirectUsers.length;
// // }


// // // ---------------------------------------------
// // // CHECK USER'S OWN NEXT PACKAGE UPGRADE
// // // ---------------------------------------------

// // async function hasOwnPackageUpgrade(user, requiredAmount) {
// //   // $960 has no next package to upgrade to.
// //   if (!requiredAmount) {
// //     return true;
// //   }

// //   const upgradedSubscription = await PackageSubscription.findOne({
// //     userId: user.userId,
// //     packageAmount: requiredAmount,
// //     status: { $in: ["ACTIVE", "COMPLETED"] }
// //   })
// //     .select("_id")
// //     .lean();

// //   if (upgradedSubscription) {
// //     return true;
// //   }

// //   // Preserve existing legacy package compatibility.
// //   if (Number(user.topUpAmount || 0) >= requiredAmount) {
// //     return true;
// //   }

// //   const legacyPackages = Array.isArray(user.packages)
// //     ? user.packages
// //     : [];

// //   return legacyPackages.some(
// //     item => Number(item.amount || 0) >= requiredAmount
// //   );
// // }


// // // ---------------------------------------------
// // // CHECK STAGE 6 ELIGIBILITY
// // // ---------------------------------------------

// // async function checkStageSixEligibility(subscription) {
// //   const packageAmount = Number(subscription.packageAmount);

// //   const rule = PACKAGE_UPGRADE_RULES[packageAmount];

// //   if (!rule) {
// //     return {
// //       allowed: false,
// //       message: `No Stage 6 rule configured for $${packageAmount}.`
// //     };
// //   }

// //   const user = await User.findOne({
// //     userId: subscription.userId
// //   })
// //     .select("userId sponsorId topUpAmount packages")
// //     .lean();

// //   if (!user) {
// //     return {
// //       allowed: false,
// //       message: "Package owner was not found."
// //     };
// //   }

// //   const matchingDirects = await getActive30DirectCount(user);

// //   const directReady =
// //     matchingDirects >= rule.required30Directs;

// //   const upgradeReady = await hasOwnPackageUpgrade(
// //     user,
// //     rule.nextPackage
// //   );

// //   const missing = [];

// //   if (!directReady) {
// //     missing.push(
// //       `${rule.required30Directs} active $30 direct referrals (${matchingDirects}/${rule.required30Directs})`
// //     );
// //   }

// //   if (!upgradeReady) {
// //     missing.push(
// //       `your own package upgraded to $${rule.nextPackage}`
// //     );
// //   }

// //   return {
// //     allowed: missing.length === 0,

// //     message: missing.length
// //       ? `Stage 6 is locked for your $${packageAmount} package. Complete: ${missing.join("; ")}.`
// //       : "Stage 6 eligibility completed.",

// //     matchingDirects,
// //     requiredDirects: rule.required30Directs
// //   };
// // }


// // // ---------------------------------------------
// // // CREDIT STAGE EARNING - IDEMPOTENT
// // // ---------------------------------------------

// // async function creditStageEarning(subscription, stage) {
// //   const stageNumber = Number(stage.stageNumber);

// //   const earnings = getStageEarnings(subscription.packageAmount);

// //   const amount = Number(earnings[stageNumber - 1]);

// //   if (
// //     !Number.isInteger(stageNumber) ||
// //     stageNumber < 1 ||
// //     stageNumber > TOTAL_STAGES ||
// //     !Number.isFinite(amount) ||
// //     amount <= 0
// //   ) {
// //     throw new Error("Invalid package stage earning.");
// //   }

// //   if (stage.status !== "ACHIEVED") {
// //     throw new Error(
// //       `Stage ${stageNumber} is not achieved yet.`
// //     );
// //   }

// //   const idempotencyKey =
// //     `${subscription._id.toString()}:stage:${stageNumber}`;

// //   // Check whether this stage was already credited.
// //   let transaction = await Transaction.findOne({
// //     idempotencyKey
// //   });

// //   if (!transaction) {
// //     // Atomically add the unique stage marker and update income.
// //     // Only one request can successfully add this marker.
// //     const updatedUser = await User.findOneAndUpdate(
// //       {
// //         userId: subscription.userId,

// //         creditedPackageStages: {
// //           $ne: idempotencyKey
// //         }
// //       },
// //       {
// //         $addToSet: {
// //           creditedPackageStages: idempotencyKey
// //         },

// //         $inc: {
// //           planIncome: amount,
// //           totalPlanIncome: amount
// //         }
// //       },
// //       {
// //         new: true,
// //         runValidators: true
// //       }
// //     );

// //     if (!updatedUser) {
// //       // The marker may already exist because another request
// //       // credited this stage.
// //       const existingUser = await User.findOne({
// //         userId: subscription.userId
// //       }).select("userId creditedPackageStages");

// //       if (!existingUser) {
// //         throw new Error(
// //           `User not found: ${subscription.userId}`
// //         );
// //       }

// //       const alreadyCredited =
// //         Array.isArray(existingUser.creditedPackageStages) &&
// //         existingUser.creditedPackageStages.includes(idempotencyKey);

// //       if (!alreadyCredited) {
// //         throw new Error(
// //           "Unable to credit package stage earning."
// //         );
// //       }
// //     }

// //     // Create transaction ledger entry.
// //     // A unique index on idempotencyKey prevents duplicate entries.
// //     try {
// //       transaction = await Transaction.create({
// //         userId: subscription.userId,

// //         type: "plan_income",
// //         source: "package_stage",

// //         amount: mongoose.Types.Decimal128.fromString(
// //           amount.toFixed(2)
// //         ),

// //         package: Number(subscription.packageAmount),

// //         subscriptionId: subscription._id,
// //         stageNumber,

// //         idempotencyKey,

// //         description:
// //           `Package $${subscription.packageAmount} Stage ${stageNumber} earning`,

// //         status: "completed",
// //         date: new Date()
// //       });

// //     } catch (error) {
// //       if (error.code !== 11000) {
// //         throw error;
// //       }

// //       transaction = await Transaction.findOne({
// //         idempotencyKey
// //       });

// //       if (!transaction) {
// //         throw error;
// //       }
// //     }
// //   }

// //   // Update stage only after confirming the ledger entry exists.
// //   if (!transaction) {
// //     throw new Error(
// //       `Stage ${stageNumber} earning ledger entry was not created.`
// //     );
// //   }

// //   stage.earningAmount = amount;
// //   stage.earningStatus = "RECORDED";

// //   if (!stage.earningRecordedAt) {
// //     stage.earningRecordedAt =
// //       transaction.date || new Date();
// //   }

// //   return stage;
// // }


// // // ---------------------------------------------
// // // UPDATE PACKAGE PROGRESS
// // // ---------------------------------------------

// // async function updatePackageProgress(subscriptionId) {
// //   if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
// //     throw new Error("Invalid package subscription ID.");
// //   }

// //   const subscription =
// //     await PackageSubscription.findById(subscriptionId);

// //   if (!subscription) {
// //     throw new Error("Package subscription not found.");
// //   }

// //   if (subscription.status !== "ACTIVE") {
// //     return subscription;
// //   }

// //   initializeStages(subscription);

// //   normalizeStageFields(subscription);

// //   const now = new Date();

// //   const packageStartTime =
// //     subscription.activatedAt ||
// //     subscription.purchasedAt ||
// //     now;

// //   let currentStage = Number(
// //     subscription.currentStage || 1
// //   );

// //   if (
// //     !Number.isInteger(currentStage) ||
// //     currentStage < 1 ||
// //     currentStage > TOTAL_STAGES
// //   ) {
// //     currentStage = 1;
// //   }


// //   // -------------------------------------------
// //   // PROCESS STAGE TIMERS
// //   // -------------------------------------------

// //   while (currentStage <= TOTAL_STAGES) {
// //     const stage = subscription.stages.find(
// //       item =>
// //         Number(item.stageNumber) === currentStage
// //     );

// //     if (!stage) {
// //       throw new Error(
// //         `Stage ${currentStage} not found.`
// //       );
// //     }


// //     // -----------------------------------------
// //     // STAGE 6 ELIGIBILITY CHECK
// //     // -----------------------------------------

// //     if (
// //       currentStage === 6 &&
// //       (stage.status === "WAITING" || stage.status === "LOCKED")
// //     ) {
// //       const eligibility = await checkStageSixEligibility(
// //         subscription
// //       );

// //       if (!eligibility.allowed) {
// //         stage.status = "LOCKED";

// //         // Locked time must not count toward Stage 6.
// //         stage.startedAt = null;
// //         stage.endsAt = null;
// //         stage.pausedAt = null;

// //         break;
// //       }
// //     }


// //     // -----------------------------------------
// //     // START WAITING / LOCKED STAGE
// //     // -----------------------------------------

// //     if (
// //       stage.status === "WAITING" ||
// //       stage.status === "LOCKED"
// //     ) {
// //       const previousStage =
// //         currentStage > 1
// //           ? subscription.stages.find(
// //               item =>
// //                 Number(item.stageNumber) === currentStage - 1
// //             )
// //           : null;

// //       // Stage 6 starts when eligibility is confirmed.
// //       // All other stages keep their original timing.
// //       const startTime = currentStage === 6
// //         ? new Date(now)
// //         : previousStage?.endsAt
// //           ? new Date(previousStage.endsAt)
// //           : new Date(packageStartTime);

// //       if (Number.isNaN(startTime.getTime())) {
// //         throw new Error(
// //           `Invalid start time for stage ${currentStage}.`
// //         );
// //       }

// //       stage.status = "RUNNING";

// //       stage.startedAt = startTime;

// //       stage.endsAt = new Date(
// //         startTime.getTime() +
// //         Number(stage.durationDays) * DAY_MS
// //       );

// //       stage.pausedAt = null;
// //     }


// //     // -----------------------------------------
// //     // DO NOT PROCESS PAUSED OR OTHER STATUSES
// //     // -----------------------------------------

// //     if (stage.status !== "RUNNING") {
// //       break;
// //     }

// //     const stageEnd = new Date(stage.endsAt);

// //     if (Number.isNaN(stageEnd.getTime())) {
// //       throw new Error(
// //         `Invalid end time for stage ${currentStage}.`
// //       );
// //     }


// //     // -----------------------------------------
// //     // STAGE TIMER IS STILL RUNNING
// //     // -----------------------------------------

// //     if (now < stageEnd) {
// //       break;
// //     }


// //     // -----------------------------------------
// //     // STAGE ACHIEVED
// //     // -----------------------------------------

// //     stage.status = "ACHIEVED";

// //     stage.completedAt = stageEnd;

// //     stage.pausedAt = null;

// //     if (stage.earningStatus !== "RECORDED") {
// //       stage.earningStatus = "PENDING";
// //       stage.earningRecordedAt = null;
// //     }

// //     currentStage += 1;


// //     // -----------------------------------------
// //     // UNLOCK THE NEXT STAGE
// //     // -----------------------------------------

// //     if (currentStage <= TOTAL_STAGES) {
// //       subscription.currentStage = currentStage;

// //       const nextStage = subscription.stages.find(
// //         item =>
// //           Number(item.stageNumber) === currentStage
// //       );

// //       if (nextStage && nextStage.status === "LOCKED") {
// //         nextStage.status = "WAITING";
// //       }
// //     }
// //   }


// //   // -------------------------------------------
// //   // COMPLETE PACKAGE AFTER STAGE 14
// //   // -------------------------------------------

// //   if (currentStage > TOTAL_STAGES) {
// //     subscription.currentStage = TOTAL_STAGES;

// //     subscription.status = "COMPLETED";

// //     if (!subscription.completedAt) {
// //       subscription.completedAt = now;
// //     }

// //   } else {
// //     subscription.currentStage = currentStage;
// //   }


// //   // -------------------------------------------
// //   // SAVE STAGE PROGRESS BEFORE CREDITING INCOME
// //   // -------------------------------------------

// //   await subscription.save();


// //   // -------------------------------------------
// //   // CREDIT ALL ACHIEVED PENDING STAGES
// //   // -------------------------------------------

// //   for (const stage of subscription.stages) {
// //     if (
// //       stage.status === "ACHIEVED" &&
// //       stage.earningStatus !== "RECORDED"
// //     ) {
// //       await creditStageEarning(subscription, stage);

// //       // Save after each successful stage credit.
// //       await subscription.save();
// //     }
// //   }

// //   return subscription;
// // }


// // // ---------------------------------------------
// // // EXPORT SERVICE
// // // ---------------------------------------------

// // module.exports = {
// //   updatePackageProgress
// // };

// const mongoose = require("mongoose");

// const PackageSubscription = require("../models/PackageSubscription");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// const DAY_MS = 24 * 60 * 60 * 1000;
// const TOTAL_STAGES = 14;


// // ---------------------------------------------
// // STAGE TIMING
// // ---------------------------------------------

// const DEFAULT_STAGE_DAYS = [
//   1, 3, 7, 15,
//   30, 30, 30, 30, 30, 30,
//   30, 30, 30, 30
// ];

// function getStageDays(packageAmount) {
//   if (Number(packageAmount) === 30) {
//     return [
//       0.2, 0.2, 0.2, 0.2, 0.2,
//       30, 30, 30, 30, 30,
//       30, 30, 30, 30
//     ];
//   }

//   return [...DEFAULT_STAGE_DAYS];
// }


// // ---------------------------------------------
// // PACKAGE-WISE EXACT STAGE EARNINGS
// // ---------------------------------------------

// const PACKAGE_STAGE_EARNINGS = {
//   30: [
//     5, 5, 10, 20, 30, 30, 50,
//     50, 100, 200, 400, 800, 1600, 3200
//   ],

//   60: [
//     10, 10, 20, 40, 60, 60, 100,
//     100, 200, 400, 800, 1600, 3200, 6400
//   ],

//   120: [
//     20, 20, 40, 80, 120, 120, 200,
//     200, 200, 800, 1600, 3200, 6400, 12800
//   ],

//   240: [
//     40, 40, 80, 160, 240, 240, 400,
//     400, 800, 1600, 3200, 6400, 12800, 25600
//   ],

//   480: [
//     80, 80, 160, 320, 480, 480, 800,
//     800, 1600, 3200, 6400, 12800, 25600, 51200
//   ],

//   960: [
//     160, 160, 320, 640, 960, 960, 1600,
//     1600, 3200, 6400, 12800, 25600, 51200, 102400
//   ]
// };


// // ---------------------------------------------
// // STAGE 6 PACKAGE UPGRADE REQUIREMENTS
// // All direct referrals must have ACTIVE $30 package
// // ---------------------------------------------

// const PACKAGE_UPGRADE_RULES = {
//   30:  { nextPackage: 60,  required30Directs: 2 },
//   60:  { nextPackage: 120, required30Directs: 4 },
//   120: { nextPackage: 240, required30Directs: 6 },
//   240: { nextPackage: 480, required30Directs: 8 },
//   480: { nextPackage: 960, required30Directs: 10 },
//   960: { nextPackage: null, required30Directs: 12 }
// };


// // ---------------------------------------------
// // GET PACKAGE STAGE EARNINGS
// // ---------------------------------------------

// function getStageEarnings(packageAmount) {
//   const amount = Number(packageAmount);

//   const earnings = PACKAGE_STAGE_EARNINGS[amount];

//   if (!earnings || earnings.length !== TOTAL_STAGES) {
//     throw new Error(
//       `Invalid package amount or earning schedule: ${packageAmount}`
//     );
//   }

//   return earnings;
// }


// // ---------------------------------------------
// // INITIALIZE ALL 14 STAGES
// // ---------------------------------------------

// function initializeStages(subscription) {
//   const earnings = getStageEarnings(subscription.packageAmount);

//   if (
//     !Array.isArray(subscription.stages) ||
//     subscription.stages.length !== TOTAL_STAGES
//   ) {
//     subscription.stages = getStageDays(subscription.packageAmount).map((days, index) => ({
//       stageNumber: index + 1,
//       durationDays: days,

//       status: index === 0 ? "WAITING" : "LOCKED",

//       startedAt: null,
//       endsAt: null,
//       pausedAt: null,
//       completedAt: null,

//       accumulatedPausedSeconds: 0,

//       earningAmount: earnings[index],
//       earningStatus: "NOT_RECORDED",
//       earningRecordedAt: null
//     }));

//     subscription.currentStage = 1;
//   }
// }


// // ---------------------------------------------
// // NORMALIZE STAGE FIELDS
// // ---------------------------------------------

// function normalizeStageFields(subscription) {
//   const earnings = getStageEarnings(subscription.packageAmount);

//   for (const stage of subscription.stages) {
//     const index = Number(stage.stageNumber) - 1;

//     if (index < 0 || index >= TOTAL_STAGES) {
//       throw new Error("Invalid stage number in subscription.");
//     }

//     if (
//       !stage.earningStatus ||
//       stage.earningStatus === "NOT_RECORDED"
//     ) {
//       stage.earningAmount = earnings[index];
//       stage.earningStatus = "NOT_RECORDED";
//     }

//     if (stage.earningRecordedAt === undefined) {
//       stage.earningRecordedAt = null;
//     }

//     if (stage.accumulatedPausedSeconds === undefined) {
//       stage.accumulatedPausedSeconds = 0;
//     }
//   }
// }


// // ---------------------------------------------
// // COUNT UNIQUE DIRECT REFERRALS WITH ACTIVE $30
// // ---------------------------------------------

// async function getActive30DirectCount(user) {
//   const directUsers = await User.find({
//     sponsorId: user.userId
//   })
//     .select("userId")
//     .lean();

//   const directIds = directUsers.map(item => item.userId);

//   if (!directIds.length) {
//     return 0;
//   }

//   const active30DirectUsers = await PackageSubscription.distinct(
//     "userId",
//     {
//       userId: { $in: directIds },
//       packageAmount: 30,
//       status: "ACTIVE"
//     }
//   );

//   return active30DirectUsers.length;
// }


// // ---------------------------------------------
// // CHECK USER'S OWN NEXT PACKAGE UPGRADE
// // ---------------------------------------------

// async function hasOwnPackageUpgrade(user, requiredAmount) {
//   if (!requiredAmount) {
//     return true;
//   }

//   const upgradedSubscription = await PackageSubscription.findOne({
//     userId: user.userId,
//     packageAmount: requiredAmount,
//     status: { $in: ["ACTIVE", "COMPLETED"] }
//   })
//     .select("_id")
//     .lean();

//   if (upgradedSubscription) {
//     return true;
//   }

//   if (Number(user.topUpAmount || 0) >= requiredAmount) {
//     return true;
//   }

//   const legacyPackages = Array.isArray(user.packages)
//     ? user.packages
//     : [];

//   return legacyPackages.some(
//     item => Number(item.amount || 0) >= requiredAmount
//   );
// }


// // ---------------------------------------------
// // CHECK STAGE 6 ELIGIBILITY
// // ---------------------------------------------

// async function checkStageSixEligibility(subscription) {
//   const packageAmount = Number(subscription.packageAmount);

//   const rule = PACKAGE_UPGRADE_RULES[packageAmount];

//   if (!rule) {
//     return {
//       allowed: false,
//       message: `No Stage 6 rule configured for $${packageAmount}.`
//     };
//   }

//   const user = await User.findOne({
//     userId: subscription.userId
//   })
//     .select("userId sponsorId topUpAmount packages")
//     .lean();

//   if (!user) {
//     return {
//       allowed: false,
//       message: "Package owner was not found."
//     };
//   }

//   const matchingDirects = await getActive30DirectCount(user);

//   const directReady =
//     matchingDirects >= rule.required30Directs;

//   const upgradeReady = await hasOwnPackageUpgrade(
//     user,
//     rule.nextPackage
//   );

//   const missing = [];

//   if (!directReady) {
//     missing.push(
//       `${rule.required30Directs} active $30 direct referrals (${matchingDirects}/${rule.required30Directs})`
//     );
//   }

//   if (!upgradeReady) {
//     missing.push(
//       `your own package upgraded to $${rule.nextPackage}`
//     );
//   }

//   return {
//     allowed: missing.length === 0,

//     message: missing.length
//       ? `Stage 6 is locked for your $${packageAmount} package. Complete: ${missing.join("; ")}.`
//       : "Stage 6 eligibility completed.",

//     matchingDirects,
//     requiredDirects: rule.required30Directs
//   };
// }


// // ---------------------------------------------
// // VERIFY STAGE 5 SAME-PACKAGE RETOPUP
// // ---------------------------------------------

// async function checkStageFiveRetopup(subscription) {
//   const packageAmount = Number(subscription.packageAmount);

//   // $30 package does not require retopup.
//   if (packageAmount === 30) {
//     return {
//       allowed: true,
//       paidAt: null,
//       message: "Retopup is not required for the $30 package."
//     };
//   }

//   if (![60, 120, 240, 480, 960].includes(packageAmount)) {
//     return {
//       allowed: false,
//       message: `Unsupported package amount: $${packageAmount}.`
//     };
//   }

//   const stageFive = subscription.stages?.find(
//     item => Number(item.stageNumber) === 5
//   );

//   // Retopup can only be accepted after Stage 5 is achieved.
//   if (!stageFive || stageFive.status !== "ACHIEVED") {
//     return {
//       allowed: false,
//       message: "Stage 5 must be achieved before retopup."
//     };
//   }

//   if (
//     subscription.stage5RetopupConfirmed !== true ||
//     !subscription.stage5RetopupPaidAt ||
//     !subscription.stage5RetopupTransactionId ||
//     Number(subscription.stage5RetopupAmount) !== packageAmount
//   ) {
//     return {
//       allowed: false,
//       message: `Stage 6 is locked. A confirmed same-package $${packageAmount} retopup is required.`
//     };
//   }

//   const expectedIdempotencyKey =
//     `${subscription._id.toString()}:stage5-retopup`;

//   const transaction = await Transaction.findOne({
//     _id: subscription.stage5RetopupTransactionId,
//     userId: subscription.userId,
//     subscriptionId: subscription._id,
//     type: "package_retopup",
//     source: "stage5_retopup",
//     status: "completed",
//     idempotencyKey: expectedIdempotencyKey
//   })
//     .select("_id amount date status")
//     .lean();

//   if (!transaction) {
//     return {
//       allowed: false,
//       message: "Retopup transaction could not be verified."
//     };
//   }

//   const transactionAmount = Number(
//     transaction.amount?.toString?.() ?? transaction.amount
//   );

//   if (
//     !Number.isFinite(transactionAmount) ||
//     transactionAmount !== packageAmount
//   ) {
//     return {
//       allowed: false,
//       message: "Retopup transaction amount does not match the package amount."
//     };
//   }

//   const paidAt = new Date(subscription.stage5RetopupPaidAt);

//   if (Number.isNaN(paidAt.getTime())) {
//     return {
//       allowed: false,
//       message: "Retopup payment date is invalid."
//     };
//   }

//   return {
//     allowed: true,
//     paidAt,
//     transactionId: transaction._id,
//     message: "Stage 5 retopup verified."
//   };
// }


// // ---------------------------------------------
// // CREDIT STAGE EARNING - IDEMPOTENT
// // ---------------------------------------------

// async function creditStageEarning(subscription, stage) {
//   const stageNumber = Number(stage.stageNumber);

//   const earnings = getStageEarnings(subscription.packageAmount);

//   const amount = Number(earnings[stageNumber - 1]);

//   if (
//     !Number.isInteger(stageNumber) ||
//     stageNumber < 1 ||
//     stageNumber > TOTAL_STAGES ||
//     !Number.isFinite(amount) ||
//     amount <= 0
//   ) {
//     throw new Error("Invalid package stage earning.");
//   }

//   if (stage.status !== "ACHIEVED") {
//     throw new Error(
//       `Stage ${stageNumber} is not achieved yet.`
//     );
//   }

//   const idempotencyKey =
//     `${subscription._id.toString()}:stage:${stageNumber}`;

//   let transaction = await Transaction.findOne({
//     idempotencyKey
//   });

//   if (!transaction) {
//     const updatedUser = await User.findOneAndUpdate(
//       {
//         userId: subscription.userId,

//         creditedPackageStages: {
//           $ne: idempotencyKey
//         }
//       },
//       {
//         $addToSet: {
//           creditedPackageStages: idempotencyKey
//         },

//         $inc: {
//           planIncome: amount,
//           totalPlanIncome: amount
//         }
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!updatedUser) {
//       const existingUser = await User.findOne({
//         userId: subscription.userId
//       }).select("userId creditedPackageStages");

//       if (!existingUser) {
//         throw new Error(
//           `User not found: ${subscription.userId}`
//         );
//       }

//       const alreadyCredited =
//         Array.isArray(existingUser.creditedPackageStages) &&
//         existingUser.creditedPackageStages.includes(idempotencyKey);

//       if (!alreadyCredited) {
//         throw new Error(
//           "Unable to credit package stage earning."
//         );
//       }
//     }

//     try {
//       transaction = await Transaction.create({
//         userId: subscription.userId,

//         type: "plan_income",
//         source: "package_stage",

//         amount: mongoose.Types.Decimal128.fromString(
//           amount.toFixed(2)
//         ),

//         package: Number(subscription.packageAmount),

//         subscriptionId: subscription._id,
//         stageNumber,

//         idempotencyKey,

//         description:
//           `Package $${subscription.packageAmount} Stage ${stageNumber} earning`,

//         status: "completed",
//         date: new Date()
//       });

//     } catch (error) {
//       if (error.code !== 11000) {
//         throw error;
//       }

//       transaction = await Transaction.findOne({
//         idempotencyKey
//       });

//       if (!transaction) {
//         throw error;
//       }
//     }
//   }

//   if (!transaction) {
//     throw new Error(
//       `Stage ${stageNumber} earning ledger entry was not created.`
//     );
//   }

//   stage.earningAmount = amount;
//   stage.earningStatus = "RECORDED";

//   if (!stage.earningRecordedAt) {
//     stage.earningRecordedAt =
//       transaction.date || new Date();
//   }

//   return stage;
// }


// // ---------------------------------------------
// // UPDATE PACKAGE PROGRESS
// // ---------------------------------------------

// async function updatePackageProgress(subscriptionId) {
//   if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
//     throw new Error("Invalid package subscription ID.");
//   }

//   const subscription =
//     await PackageSubscription.findById(subscriptionId);

//   if (!subscription) {
//     throw new Error("Package subscription not found.");
//   }

//   if (subscription.status !== "ACTIVE") {
//     return subscription;
//   }

//   initializeStages(subscription);

//   normalizeStageFields(subscription);

//   const now = new Date();

//   const packageStartTime =
//     subscription.activatedAt ||
//     subscription.purchasedAt ||
//     now;

//   let currentStage = Number(
//     subscription.currentStage || 1
//   );

//   if (
//     !Number.isInteger(currentStage) ||
//     currentStage < 1 ||
//     currentStage > TOTAL_STAGES
//   ) {
//     currentStage = 1;
//   }


//   // -------------------------------------------
//   // PROCESS STAGE TIMERS
//   // -------------------------------------------

//   while (currentStage <= TOTAL_STAGES) {
//     const stage = subscription.stages.find(
//       item =>
//         Number(item.stageNumber) === currentStage
//     );

//     if (!stage) {
//       throw new Error(
//         `Stage ${currentStage} not found.`
//       );
//     }


//     // -----------------------------------------
//     // STAGE 6 RETOPUP + ELIGIBILITY CHECK
//     // -----------------------------------------

//     if (
//       currentStage === 6 &&
//       (stage.status === "WAITING" || stage.status === "LOCKED")
//     ) {
//       // Verify same-package retopup.
//       // $30 package is exempt.
//       const retopup = await checkStageFiveRetopup(
//         subscription
//       );

//       if (!retopup.allowed) {
//         stage.status = "LOCKED";

//         stage.startedAt = null;
//         stage.endsAt = null;
//         stage.pausedAt = null;

//         break;
//       }

//       // Preserve existing direct and own-package upgrade checks.
//       const eligibility = await checkStageSixEligibility(
//         subscription
//       );

//       if (!eligibility.allowed) {
//         stage.status = "LOCKED";

//         stage.startedAt = null;
//         stage.endsAt = null;
//         stage.pausedAt = null;

//         break;
//       }
//     }


//     // -----------------------------------------
//     // START WAITING / LOCKED STAGE
//     // -----------------------------------------

//     if (
//       stage.status === "WAITING" ||
//       stage.status === "LOCKED"
//     ) {
//       const previousStage =
//         currentStage > 1
//           ? subscription.stages.find(
//               item =>
//                 Number(item.stageNumber) === currentStage - 1
//             )
//           : null;

//       // Stage 6 starts only after retopup and
//       // all existing eligibility checks pass.
//       // Other stages keep original timing.
//      const startTime = currentStage === 6
//   ? new Date(retopup.paidAt)
//   : previousStage?.endsAt
//     ? new Date(previousStage.endsAt)
//     : new Date(packageStartTime);

//       if (Number.isNaN(startTime.getTime())) {
//         throw new Error(
//           `Invalid start time for stage ${currentStage}.`
//         );
//       }

//       stage.status = "RUNNING";

//       stage.startedAt = startTime;

//       stage.endsAt = new Date(
//         startTime.getTime() +
//         Number(stage.durationDays) * DAY_MS
//       );

//       stage.pausedAt = null;
//     }


//     // -----------------------------------------
//     // DO NOT PROCESS PAUSED OR OTHER STATUSES
//     // -----------------------------------------

//     if (stage.status !== "RUNNING") {
//       break;
//     }

//     const stageEnd = new Date(stage.endsAt);

//     if (Number.isNaN(stageEnd.getTime())) {
//       throw new Error(
//         `Invalid end time for stage ${currentStage}.`
//       );
//     }


//     // -----------------------------------------
//     // STAGE TIMER IS STILL RUNNING
//     // -----------------------------------------

//     if (now < stageEnd) {
//       break;
//     }


//     // -----------------------------------------
//     // STAGE ACHIEVED
//     // -----------------------------------------

//     stage.status = "ACHIEVED";

//     stage.completedAt = stageEnd;

//     stage.pausedAt = null;

//     if (stage.earningStatus !== "RECORDED") {
//       stage.earningStatus = "PENDING";
//       stage.earningRecordedAt = null;
//     }

//     currentStage += 1;


//     // -----------------------------------------
//     // UNLOCK THE NEXT STAGE
//     // -----------------------------------------

//     if (currentStage <= TOTAL_STAGES) {
//       subscription.currentStage = currentStage;

//       const nextStage = subscription.stages.find(
//         item =>
//           Number(item.stageNumber) === currentStage
//       );

//       if (nextStage && nextStage.status === "LOCKED") {
//         nextStage.status = "WAITING";
//       }
//     }
//   }


//   // -------------------------------------------
//   // COMPLETE PACKAGE AFTER STAGE 14
//   // -------------------------------------------

//   if (currentStage > TOTAL_STAGES) {
//     subscription.currentStage = TOTAL_STAGES;

//     subscription.status = "COMPLETED";

//     if (!subscription.completedAt) {
//       subscription.completedAt = now;
//     }

//   } else {
//     subscription.currentStage = currentStage;
//   }


//   // -------------------------------------------
//   // SAVE STAGE PROGRESS BEFORE CREDITING INCOME
//   // -------------------------------------------

//   await subscription.save();


//   // -------------------------------------------
//   // CREDIT ALL ACHIEVED PENDING STAGES
//   // -------------------------------------------

//   for (const stage of subscription.stages) {
//     if (
//       stage.status === "ACHIEVED" &&
//       stage.earningStatus !== "RECORDED"
//     ) {
//       await creditStageEarning(subscription, stage);

//       await subscription.save();
//     }
//   }

//   return subscription;
// }


// // ---------------------------------------------
// // EXPORT SERVICE
// // ---------------------------------------------

// module.exports = {
//   updatePackageProgress,
//   checkStageFiveRetopup,
//   checkStageSixEligibility
// };




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

function getStageDays(packageAmount) {
  if (Number(packageAmount) === 30) {
    return [
      0.2, 0.2, 0.2, 0.2, 0.2,
      30, 30, 30, 30, 30,
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

    if (
      currentStage === 6 &&
      (stage.status === "WAITING" || stage.status === "LOCKED")
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

      if (currentStage === 6) {
        const packageAmount = Number(subscription.packageAmount);

        if (packageAmount === 30) {
          // $30 has no retopup requirement.
          startTime = previousStage?.endsAt
            ? new Date(previousStage.endsAt)
            : new Date(packageStartTime);
        } else {
          /*
           * Retopup and Stage 6 eligibility were checked
           * immediately above. Start from now so the
           * timer cannot expire before eligibility passes.
           */
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

    if (currentStage <= TOTAL_STAGES) {
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