
// // // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // // const REQUIRED_DIRECTS = 2;

// // // // // // // Har stage ki duration days mein
// // // // // // const STAGE_DAYS = [
// // // // // //   1, 3, 7, 15,
// // // // // //   30, 30, 30, 30, 30, 30,
// // // // // //   30, 30, 30, 30,
// // // // // // ];

// // // // // // const DAY_MS = 24 * 60 * 60 * 1000;

// // // // // // function getStageDurationMs(stage) {
// // // // // //   const days = Number(stage.durationDays || 0);
// // // // // //   return days * DAY_MS;
// // // // // // }

// // // // // // function pauseStage(stage, now) {
// // // // // //   if (stage.status === "RUNNING" && stage.startedAt) {
// // // // // //     stage.status = "PAUSED";
// // // // // //     stage.pausedAt = now;
// // // // // //   }
// // // // // // }

// // // // // // function resumeStage(stage, now) {
// // // // // //   if (stage.status === "PAUSED" && stage.pausedAt) {
// // // // // //     const pausedMs = now.getTime() - new Date(stage.pausedAt).getTime();

// // // // // //     stage.accumulatedPausedSeconds =
// // // // // //       Number(stage.accumulatedPausedSeconds || 0) +
// // // // // //       Math.max(0, Math.floor(pausedMs / 1000));

// // // // // //     stage.pausedAt = null;
// // // // // //     stage.status = "RUNNING";
// // // // // //     return;
// // // // // //   }

// // // // // //   if (stage.status === "WAITING" || stage.status === "LOCKED") {
// // // // // //     stage.status = "RUNNING";
// // // // // //     stage.startedAt = now;
// // // // // //     stage.pausedAt = null;
// // // // // //   }
// // // // // // }

// // // // // // function initializeStages(subscription) {
// // // // // //   if (Array.isArray(subscription.stages) &&
// // // // // //       subscription.stages.length > 0) {
// // // // // //     return;
// // // // // //   }

// // // // // //   subscription.stages = STAGE_DAYS.map((days, index) => ({
// // // // // //     stageNumber: index + 1,
// // // // // //     durationDays: days,
// // // // // //     status: index === 0 ? "WAITING" : "LOCKED",
// // // // // //     startedAt: null,
// // // // // //     endsAt: null,
// // // // // //     pausedAt: null,
// // // // // //     completedAt: null,
// // // // // //     accumulatedPausedSeconds: 0,
// // // // // //   }));

// // // // // //   subscription.currentStage = 1;
// // // // // // }

// // // // // // async function updatePackageProgress(subscriptionId, verifiedDirectCount) {
// // // // // //   const subscription = await PackageSubscription.findById(subscriptionId);

// // // // // //   if (!subscription) {
// // // // // //     throw new Error("Package subscription not found");
// // // // // //   }

// // // // // //   if (subscription.status !== "ACTIVE") {
// // // // // //     return subscription;
// // // // // //   }

// // // // // //   const now = new Date();
// // // // // //   const directCount = Math.max(0, Number(verifiedDirectCount || 0));

// // // // // //   initializeStages(subscription);

// // // // // //   // Tracking cap reached: stop progress, no wallet credit.
// // // // // //   if (
// // // // // //     Number(subscription.recordedActivityAmount || 0) >=
// // // // // //     Number(subscription.accountingCapAmount || Infinity)
// // // // // //   ) {
// // // // // //     subscription.status = "COMPLETED";
// // // // // //     subscription.completedAt = now;
// // // // // //     await subscription.save();
// // // // // //     return subscription;
// // // // // //   }

// // // // // //   let stageIndex = Math.max(
// // // // // //     0,
// // // // // //     Number(subscription.currentStage || 1) - 1
// // // // // //   );

// // // // // //   if (stageIndex >= subscription.stages.length) {
// // // // // //     subscription.status = "COMPLETED";
// // // // // //     subscription.completedAt = now;
// // // // // //     await subscription.save();
// // // // // //     return subscription;
// // // // // //   }

// // // // // //   const stage = subscription.stages[stageIndex];

// // // // // //   // Two verified direct users are required to run the timer.
// // // // // //   if (directCount < REQUIRED_DIRECTS) {
// // // // // //     pauseStage(stage, now);

// // // // // //     if (stage.status === "WAITING") {
// // // // // //       stage.status = "WAITING";
// // // // // //     }

// // // // // //     await subscription.save();
// // // // // //     return subscription;
// // // // // //   }

// // // // // //   resumeStage(stage, now);

// // // // // //   const durationMs = getStageDurationMs(stage);

// // // // // //   if (!stage.endsAt && stage.startedAt) {
// // // // // //     const pausedSeconds = Number(
// // // // // //       stage.accumulatedPausedSeconds || 0
// // // // // //     );

// // // // // //     stage.endsAt = new Date(
// // // // // //       new Date(stage.startedAt).getTime() +
// // // // // //       durationMs +
// // // // // //       pausedSeconds * 1000
// // // // // //     );
// // // // // //   }

// // // // // //   // Stage timer complete
// // // // // //   if (
// // // // // //     stage.endsAt &&
// // // // // //     now.getTime() >= new Date(stage.endsAt).getTime()
// // // // // //   ) {
// // // // // //     stage.status = "ACHIEVED";
// // // // // //     stage.completedAt = now;

// // // // // //     const nextIndex = stageIndex + 1;

// // // // // //     if (nextIndex >= subscription.stages.length) {
// // // // // //       subscription.status = "COMPLETED";
// // // // // //       subscription.completedAt = now;
// // // // // //     } else {
// // // // // //       subscription.currentStage = nextIndex + 1;

// // // // // //       const nextStage = subscription.stages[nextIndex];
// // // // // //       nextStage.status = "WAITING";
// // // // // //       nextStage.startedAt = null;
// // // // // //       nextStage.endsAt = null;
// // // // // //       nextStage.pausedAt = null;
// // // // // //     }
// // // // // //   }

// // // // // //   await subscription.save();
// // // // // //   return subscription;
// // // // // // }

// // // // // // module.exports = {
// // // // // //   updatePackageProgress,
// // // // // //   initializeStages,
// // // // // //   REQUIRED_DIRECTS,
// // // // // //   STAGE_DAYS,
// // // // // // };



// // // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // // const TOTAL_STAGES = 14;

// // // // // function initializeStages(subscription) {
// // // // //   if (!Array.isArray(subscription.stages) ||
// // // // //       subscription.stages.length !== TOTAL_STAGES) {
// // // // //     const stageDays = [
// // // // //       1, 3, 7, 15,
// // // // //       30, 30, 30, 30, 30, 30,
// // // // //       30, 30, 30, 30
// // // // //     ];

// // // // //     subscription.stages = stageDays.map((days, index) => ({
// // // // //       stageNumber: index + 1,
// // // // //       durationDays: days,
// // // // //       status: index === 0 ? "WAITING" : "LOCKED",
// // // // //       startedAt: null,
// // // // //       endsAt: null,
// // // // //       pausedAt: null,
// // // // //       completedAt: null,
// // // // //       accumulatedPausedSeconds: 0
// // // // //     }));

// // // // //     subscription.currentStage = 1;
// // // // //   }
// // // // // }

// // // // // async function updatePackageProgress(subscriptionId) {
// // // // //   const subscription = await PackageSubscription.findById(subscriptionId);

// // // // //   if (!subscription) {
// // // // //     throw new Error("Package subscription not found");
// // // // //   }

// // // // //   // Only active subscriptions progress.
// // // // //   if (subscription.status !== "ACTIVE") {
// // // // //     return subscription;
// // // // //   }

// // // // //   initializeStages(subscription);

// // // // //   const now = new Date();

// // // // //   // Start Stage 1 from the package purchase time.
// // // // //   const packageStartTime =
// // // // //     subscription.activatedAt ||
// // // // //     subscription.purchasedAt ||
// // // // //     now;

// // // // //   let currentStage = Number(subscription.currentStage || 1);

// // // // //   // Keep each subscription's stages independent.
// // // // //   while (currentStage <= TOTAL_STAGES) {
// // // // //     const stage = subscription.stages.find(
// // // // //       item => Number(item.stageNumber) === currentStage
// // // // //     );

// // // // //     if (!stage) {
// // // // //       throw new Error(`Stage ${currentStage} not found`);
// // // // //     }

// // // // //     // Start the first stage.
// // // // //     if (stage.status === "WAITING" || stage.status === "LOCKED") {
// // // // //       const previousStage =
// // // // //         currentStage > 1
// // // // //           ? subscription.stages.find(
// // // // //               item => Number(item.stageNumber) === currentStage - 1
// // // // //             )
// // // // //           : null;

// // // // //       const startTime = previousStage?.endsAt
// // // // //         ? new Date(previousStage.endsAt)
// // // // //         : new Date(packageStartTime);

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

// // // // //     // Current stage is still running.
// // // // //     if (now < stageEnd) {
// // // // //       break;
// // // // //     }

// // // // //     // Complete this stage.
// // // // //     stage.status = "ACHIEVED";
// // // // //     stage.completedAt = stageEnd;
// // // // //     stage.pausedAt = null;

// // // // //     currentStage += 1;

// // // // //     if (currentStage <= TOTAL_STAGES) {
// // // // //       subscription.currentStage = currentStage;

// // // // //       const nextStage = subscription.stages.find(
// // // // //         item => Number(item.stageNumber) === currentStage
// // // // //       );

// // // // //       if (nextStage) {
// // // // //         nextStage.status = "WAITING";
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // All 14 stages are complete.
// // // // //   if (currentStage > TOTAL_STAGES) {
// // // // //     subscription.currentStage = TOTAL_STAGES;
// // // // //     subscription.status = "COMPLETED";
// // // // //     subscription.completedAt = new Date();
// // // // //   } else {
// // // // //     subscription.currentStage = currentStage;
// // // // //   }

// // // // //   await subscription.save();

// // // // //   return subscription;
// // // // // }

// // // // // module.exports = {
// // // // //   updatePackageProgress
// // // // // };



// // // // const PackageSubscription = require("../models/PackageSubscription");

// // // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // // const TOTAL_STAGES = 14;

// // // // const STAGE_DAYS = [
// // // //   1, 3, 7, 15,
// // // //   30, 30, 30, 30, 30, 30,
// // // //   30, 30, 30, 30
// // // // ];

// // // // // Naye package ke liye stages banana.
// // // // function initializeStages(subscription) {
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

// // // //       earningAmount: 0,
// // // //       earningStatus: "NOT_RECORDED",
// // // //       earningRecordedAt: null
// // // //     }));

// // // //     subscription.currentStage = 1;
// // // //   }
// // // // }

// // // // // Purane database stages mein missing fields initialize karna.
// // // // // Existing earning amount ko overwrite nahi karna.
// // // // function normalizeStageFields(subscription) {
// // // //   for (const stage of subscription.stages) {
// // // //     if (stage.earningAmount === undefined ||
// // // //         stage.earningAmount === null) {
// // // //       stage.earningAmount = 0;
// // // //     }

// // // //     if (!stage.earningStatus) {
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

// // // // async function updatePackageProgress(subscriptionId) {
// // // //   const subscription =
// // // //     await PackageSubscription.findById(subscriptionId);

// // // //   if (!subscription) {
// // // //     throw new Error("Package subscription not found");
// // // //   }

// // // //   // Sirf active packages ka timer update hoga.
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

// // // //   let currentStage = Number(subscription.currentStage || 1);

// // // //   if (
// // // //     !Number.isInteger(currentStage) ||
// // // //     currentStage < 1 ||
// // // //     currentStage > TOTAL_STAGES
// // // //   ) {
// // // //     currentStage = 1;
// // // //   }

// // // //   while (currentStage <= TOTAL_STAGES) {
// // // //     const stage = subscription.stages.find(
// // // //       item => Number(item.stageNumber) === currentStage
// // // //     );

// // // //     if (!stage) {
// // // //       throw new Error(`Stage ${currentStage} not found`);
// // // //     }

// // // //     // Stage start karna.
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
// // // //           `Invalid start time for stage ${currentStage}`
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

// // // //     // Running stage ke alawa aage nahi badhna.
// // // //     if (stage.status !== "RUNNING") {
// // // //       break;
// // // //     }

// // // //     const stageEnd = new Date(stage.endsAt);

// // // //     if (Number.isNaN(stageEnd.getTime())) {
// // // //       throw new Error(
// // // //         `Invalid end time for stage ${currentStage}`
// // // //       );
// // // //     }

// // // //     // Timer abhi complete nahi hua.
// // // //     if (now < stageEnd) {
// // // //       break;
// // // //     }

// // // //     // Timer complete: sirf stage status update hoga.
// // // //     stage.status = "ACHIEVED";
// // // //     stage.completedAt = stageEnd;
// // // //     stage.pausedAt = null;

// // // //     // IMPORTANT:
// // // //     // Timer complete hone se earning credit nahi hoti.
// // // //     // Earning ledger alag verified process se update hoga.

// // // //     currentStage += 1;

// // // //     if (currentStage <= TOTAL_STAGES) {
// // // //       subscription.currentStage = currentStage;

// // // //       const nextStage = subscription.stages.find(
// // // //         item =>
// // // //           Number(item.stageNumber) === currentStage
// // // //       );

// // // //       if (nextStage) {
// // // //         nextStage.status = "WAITING";
// // // //       }
// // // //     }
// // // //   }

// // // //   // Saare 14 stages complete.
// // // //   if (currentStage > TOTAL_STAGES) {
// // // //     subscription.currentStage = TOTAL_STAGES;
// // // //     subscription.status = "COMPLETED";
// // // //     subscription.completedAt = now;
// // // //   } else {
// // // //     subscription.currentStage = currentStage;
// // // //   }

// // // //   await subscription.save();

// // // //   return subscription;
// // // // }

// // // // module.exports = {
// // // //   updatePackageProgress
// // // // };



// // // const PackageSubscription = require("../models/PackageSubscription");

// // // const DAY_MS = 24 * 60 * 60 * 1000;
// // // const TOTAL_STAGES = 14;

// // // const STAGE_DAYS = [
// // //   1, 3, 7, 15,
// // //   30, 30, 30, 30, 30, 30,
// // //   30, 30, 30, 30
// // // ];

// // // // Image ke exact stage-wise earning amounts.
// // // // Amounts ko image ke mutabik hi rakha gaya hai.
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

// // // // Package amount ke hisab se earning schedule.
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

// // // // Naye package ke liye stages banana.
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

// // // // Existing stages ke missing fields aur configured amounts set karna.
// // // // Already RECORDED earning ko overwrite nahi karna.
// // // function normalizeStageFields(subscription) {
// // //   const earnings = getStageEarnings(subscription.packageAmount);

// // //   for (const stage of subscription.stages) {
// // //     const index = Number(stage.stageNumber) - 1;

// // //     if (index < 0 || index >= TOTAL_STAGES) {
// // //       throw new Error("Invalid stage number in subscription");
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

// // // async function updatePackageProgress(subscriptionId) {
// // //   const subscription =
// // //     await PackageSubscription.findById(subscriptionId);

// // //   if (!subscription) {
// // //     throw new Error("Package subscription not found");
// // //   }

// // //   // Sirf active packages ka timer update hoga.
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

// // //   let currentStage = Number(subscription.currentStage || 1);

// // //   if (
// // //     !Number.isInteger(currentStage) ||
// // //     currentStage < 1 ||
// // //     currentStage > TOTAL_STAGES
// // //   ) {
// // //     currentStage = 1;
// // //   }

// // //   while (currentStage <= TOTAL_STAGES) {
// // //     const stage = subscription.stages.find(
// // //       item => Number(item.stageNumber) === currentStage
// // //     );

// // //     if (!stage) {
// // //       throw new Error(`Stage ${currentStage} not found`);
// // //     }

// // //     // Stage start karna.
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

// // //       const startTime = previousStage?.endsAt
// // //         ? new Date(previousStage.endsAt)
// // //         : new Date(packageStartTime);

// // //       if (Number.isNaN(startTime.getTime())) {
// // //         throw new Error(
// // //           `Invalid start time for stage ${currentStage}`
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

// // //     // Running stage ke alawa aage nahi badhna.
// // //     if (stage.status !== "RUNNING") {
// // //       break;
// // //     }

// // //     const stageEnd = new Date(stage.endsAt);

// // //     if (Number.isNaN(stageEnd.getTime())) {
// // //       throw new Error(
// // //         `Invalid end time for stage ${currentStage}`
// // //       );
// // //     }

// // //     // Timer abhi complete nahi hua.
// // //     if (now < stageEnd) {
// // //       break;
// // //     }

// // //     // Timer complete: stage achieved.
// // //     stage.status = "ACHIEVED";
// // //     stage.earningStatus = "PENDING";
// // //     stage.completedAt = stageEnd;
// // //     stage.pausedAt = null;

// // //     // Earning amount schedule mein save hai.
// // //     // Wallet credit alag verified ledger process karega.

// // //     currentStage += 1;

// // //     if (currentStage <= TOTAL_STAGES) {
// // //       subscription.currentStage = currentStage;

// // //       const nextStage = subscription.stages.find(
// // //         item =>
// // //           Number(item.stageNumber) === currentStage
// // //       );

// // //       if (nextStage) {
// // //         nextStage.status = "WAITING";
// // //       }
// // //     }
// // //   }

// // //   // Saare 14 stages complete.
// // //   if (currentStage > TOTAL_STAGES) {
// // //     subscription.currentStage = TOTAL_STAGES;
// // //     subscription.status = "COMPLETED";
// // //     subscription.completedAt = now;
// // //   } else {
// // //     subscription.currentStage = currentStage;
// // //   }

// // //   await subscription.save();

// // //   return subscription;
// // // }

// // // module.exports = {
// // //   updatePackageProgress
// // // };



// // const PackageSubscription = require("../models/PackageSubscription");

// // const DAY_MS = 24 * 60 * 60 * 1000;
// // const TOTAL_STAGES = 14;

// // const STAGE_DAYS = [
// //   1, 3, 7, 15,
// //   30, 30, 30, 30, 30, 30,
// //   30, 30, 30, 30
// // ];

// // // Image ke exact stage-wise earning amounts.
// // const PACKAGE_STAGE_EARNINGS = {
// //   30: [5, 5, 10, 20, 30, 30, 50, 50, 100, 200, 400, 800, 1600, 3200],
// //   60: [10, 10, 20, 40, 60, 60, 100, 100, 200, 400, 800, 1600, 3200, 6400],
// //   120: [20, 20, 40, 80, 120, 120, 200, 200, 200, 800, 1600, 3200, 6400, 12800],
// //   240: [40, 40, 80, 160, 240, 240, 400, 400, 800, 1600, 3200, 6400, 12800, 25600],
// //   480: [80, 80, 160, 320, 480, 480, 800, 800, 1600, 3200, 6400, 12800, 25600, 51200],
// //   960: [160, 160, 320, 640, 960, 960, 1600, 1600, 3200, 6400, 12800, 25600, 51200, 102400]
// // };

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

// // function initializeStages(subscription) {
// //   const earnings = getStageEarnings(subscription.packageAmount);

// //   if (
// //     !Array.isArray(subscription.stages) ||
// //     subscription.stages.length !== TOTAL_STAGES
// //   ) {
// //     subscription.stages = STAGE_DAYS.map((days, index) => ({
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

// // function normalizeStageFields(subscription) {
// //   const earnings = getStageEarnings(subscription.packageAmount);

// //   for (const stage of subscription.stages) {
// //     const index = Number(stage.stageNumber) - 1;

// //     if (index < 0 || index >= TOTAL_STAGES) {
// //       throw new Error("Invalid stage number in subscription");
// //     }

// //     // Schedule amount sirf unrecorded earning ke liye update hoga.
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

// // async function updatePackageProgress(subscriptionId) {
// //   const subscription =
// //     await PackageSubscription.findById(subscriptionId);

// //   if (!subscription) {
// //     throw new Error("Package subscription not found");
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

// //   let currentStage = Number(subscription.currentStage || 1);

// //   if (
// //     !Number.isInteger(currentStage) ||
// //     currentStage < 1 ||
// //     currentStage > TOTAL_STAGES
// //   ) {
// //     currentStage = 1;
// //   }

// //   while (currentStage <= TOTAL_STAGES) {
// //     const stage = subscription.stages.find(
// //       item => Number(item.stageNumber) === currentStage
// //     );

// //     if (!stage) {
// //       throw new Error(`Stage ${currentStage} not found`);
// //     }

// //     // Stage start karna.
// //     if (
// //       stage.status === "WAITING" ||
// //       stage.status === "LOCKED"
// //     ) {
// //       const previousStage =
// //         currentStage > 1
// //           ? subscription.stages.find(
// //               item => Number(item.stageNumber) === currentStage - 1
// //             )
// //           : null;

// //       const startTime = previousStage?.endsAt
// //         ? new Date(previousStage.endsAt)
// //         : new Date(packageStartTime);

// //       if (Number.isNaN(startTime.getTime())) {
// //         throw new Error(
// //           `Invalid start time for stage ${currentStage}`
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

// //     if (stage.status !== "RUNNING") {
// //       break;
// //     }

// //     const stageEnd = new Date(stage.endsAt);

// //     if (Number.isNaN(stageEnd.getTime())) {
// //       throw new Error(
// //         `Invalid end time for stage ${currentStage}`
// //       );
// //     }

// //     // Timer abhi complete nahi hua.
// //     if (now < stageEnd) {
// //       break;
// //     }

// //     // Timer complete: stage achieved.
// //     stage.status = "ACHIEVED";
// //     stage.completedAt = stageEnd;
// //     stage.pausedAt = null;

// //     // Pending earning ko mark karna.
// //     // Already RECORDED earning ko overwrite nahi karna.
// //     if (stage.earningStatus !== "RECORDED") {
// //       stage.earningStatus = "PENDING";
// //       stage.earningRecordedAt = null;
// //     }

// //     currentStage += 1;

// //     if (currentStage <= TOTAL_STAGES) {
// //       subscription.currentStage = currentStage;

// //       const nextStage = subscription.stages.find(
// //         item => Number(item.stageNumber) === currentStage
// //       );

// //       if (nextStage && nextStage.status === "LOCKED") {
// //         nextStage.status = "WAITING";
// //       }
// //     }
// //   }

// //   // Saare 14 stages complete.
// //   if (currentStage > TOTAL_STAGES) {
// //     subscription.currentStage = TOTAL_STAGES;
// //     subscription.status = "COMPLETED";

// //     if (!subscription.completedAt) {
// //       subscription.completedAt = now;
// //     }
// //   } else {
// //     subscription.currentStage = currentStage;
// //   }

// //   await subscription.save();

// //   return subscription;
// // }

// // module.exports = {
// //   updatePackageProgress
// // };















// const mongoose = require("mongoose");
// const PackageSubscription = require("../models/PackageSubscription");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// const DAY_MS = 24 * 60 * 60 * 1000;
// const TOTAL_STAGES = 14;

// const STAGE_DAYS = [
//   1, 3, 7, 15,
//   30, 30, 30, 30, 30, 30,
//   30, 30, 30, 30
// ];

// // Image ke exact stage-wise earning amounts.
// const PACKAGE_STAGE_EARNINGS = {
//   30: [5, 5, 10, 20, 30, 30, 50, 50, 100, 200, 400, 800, 1600, 3200],
//   60: [10, 10, 20, 40, 60, 60, 100, 100, 200, 400, 800, 1600, 3200, 6400],
//   120: [20, 20, 40, 80, 120, 120, 200, 200, 200, 800, 1600, 3200, 6400, 12800],
//   240: [40, 40, 80, 160, 240, 240, 400, 400, 800, 1600, 3200, 6400, 12800, 25600],
//   480: [80, 80, 160, 320, 480, 480, 800, 800, 1600, 3200, 6400, 12800, 25600, 51200],
//   960: [160, 160, 320, 640, 960, 960, 1600, 1600, 3200, 6400, 12800, 25600, 51200, 102400]
// };

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

// function initializeStages(subscription) {
//   const earnings = getStageEarnings(subscription.packageAmount);

//   if (
//     !Array.isArray(subscription.stages) ||
//     subscription.stages.length !== TOTAL_STAGES
//   ) {
//     subscription.stages = STAGE_DAYS.map((days, index) => ({
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

// function normalizeStageFields(subscription) {
//   const earnings = getStageEarnings(subscription.packageAmount);

//   for (const stage of subscription.stages) {
//     const index = Number(stage.stageNumber) - 1;

//     if (index < 0 || index >= TOTAL_STAGES) {
//       throw new Error("Invalid stage number in subscription");
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

// // Stage earning ko safely ek hi baar credit karna.
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
//     throw new Error("Invalid package stage earning");
//   }

//   const idempotencyKey =
//     `${subscription._id.toString()}:stage:${stageNumber}`;

//   // Pehle se ledger entry hai to balance dobara add nahi karna.
//   let transaction = await Transaction.findOne({ idempotencyKey });

//   if (!transaction) {
//     // User document par atomic marker + balance update.
//     // Concurrent cron/refresh mein sirf ek request balance badhayegi.
//     const updatedUser = await User.findOneAndUpdate(
//       {
//         userId: subscription.userId,
//         creditedPackageStages: { $ne: idempotencyKey }
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
// { returnDocument: "after" }
//     );

//     if (!updatedUser) {
//       const existingUser = await User.findOne({
//         userId: subscription.userId
//       });

//       if (!existingUser) {
//         throw new Error(
//           `User not found: ${subscription.userId}`
//         );
//       }

//       // Marker pehle se hai: balance already credited.
//       // Ab ledger entry missing ho to create karenge.
//     }
//   }

//   // Ledger entry create karna. Unique idempotencyKey
//   // duplicate transaction ko rokne mein madad karta hai.
//   if (!transaction) {
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
//           `Package stage ${stageNumber} earning`,
//         status: "completed",
//         date: new Date()
//       });
//     } catch (error) {
//       // Concurrent request ne same ledger entry bana di ho.
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

//   stage.earningAmount = amount;
//   stage.earningStatus = "RECORDED";
//   stage.earningRecordedAt = new Date();
// }

// async function updatePackageProgress(subscriptionId) {
//   const subscription =
//     await PackageSubscription.findById(subscriptionId);

//   if (!subscription) {
//     throw new Error("Package subscription not found");
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

//   let currentStage = Number(subscription.currentStage || 1);

//   if (
//     !Number.isInteger(currentStage) ||
//     currentStage < 1 ||
//     currentStage > TOTAL_STAGES
//   ) {
//     currentStage = 1;
//   }

//   while (currentStage <= TOTAL_STAGES) {
//     const stage = subscription.stages.find(
//       item => Number(item.stageNumber) === currentStage
//     );

//     if (!stage) {
//       throw new Error(`Stage ${currentStage} not found`);
//     }

//     if (
//       stage.status === "WAITING" ||
//       stage.status === "LOCKED"
//     ) {
//       const previousStage =
//         currentStage > 1
//           ? subscription.stages.find(
//               item => Number(item.stageNumber) === currentStage - 1
//             )
//           : null;

//       const startTime = previousStage?.endsAt
//         ? new Date(previousStage.endsAt)
//         : new Date(packageStartTime);

//       if (Number.isNaN(startTime.getTime())) {
//         throw new Error(
//           `Invalid start time for stage ${currentStage}`
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

//     if (stage.status !== "RUNNING") {
//       break;
//     }

//     const stageEnd = new Date(stage.endsAt);

//     if (Number.isNaN(stageEnd.getTime())) {
//       throw new Error(
//         `Invalid end time for stage ${currentStage}`
//       );
//     }

//     if (now < stageEnd) {
//       break;
//     }

//     stage.status = "ACHIEVED";
//     stage.completedAt = stageEnd;
//     stage.pausedAt = null;

//     if (stage.earningStatus !== "RECORDED") {
//       stage.earningStatus = "PENDING";
//       stage.earningRecordedAt = null;
//     }

//     currentStage += 1;

//     if (currentStage <= TOTAL_STAGES) {
//       subscription.currentStage = currentStage;

//       const nextStage = subscription.stages.find(
//         item => Number(item.stageNumber) === currentStage
//       );

//       if (nextStage && nextStage.status === "LOCKED") {
//         nextStage.status = "WAITING";
//       }
//     }
//   }

//   if (currentStage > TOTAL_STAGES) {
//     subscription.currentStage = TOTAL_STAGES;
//     subscription.status = "COMPLETED";

//     if (!subscription.completedAt) {
//       subscription.completedAt = now;
//     }
//   } else {
//     subscription.currentStage = currentStage;
//   }

//   // Pehle stage progress save hoga.
//   await subscription.save();

//   // Saare achieved but pending stages ki earning credit hogi.
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

// module.exports = {
//   updatePackageProgress
// };


const mongoose = require("mongoose");

const PackageSubscription = require("../models/PackageSubscription");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const DAY_MS = 24 * 60 * 60 * 1000;
const TOTAL_STAGES = 14;

const STAGE_DAYS = [
  1, 3, 7, 15,
  30, 30, 30, 30, 30, 30,
  30, 30, 30, 30
];

// Package-wise exact stage earning amounts.
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
// GET PACKAGE STAGE EARNINGS
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
// INITIALIZE ALL 14 STAGES
// ---------------------------------------------

function initializeStages(subscription) {
  const earnings = getStageEarnings(subscription.packageAmount);

  if (
    !Array.isArray(subscription.stages) ||
    subscription.stages.length !== TOTAL_STAGES
  ) {
    subscription.stages = STAGE_DAYS.map((days, index) => ({
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

  // Check whether this stage was already credited.
  let transaction = await Transaction.findOne({
    idempotencyKey
  });

  if (!transaction) {
    // Atomically add the unique stage marker and update income.
    // Only one request can successfully add this marker.
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
      // The marker may already exist because another request
      // credited this stage.
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

    // Create transaction ledger entry.
    // A unique index on idempotencyKey prevents duplicate entries.
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

  // Update stage only after confirming the ledger entry exists.
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

    // Start waiting/locked stage.
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

      const startTime = previousStage?.endsAt
        ? new Date(previousStage.endsAt)
        : new Date(packageStartTime);

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

    // Do not process paused or other statuses.
    if (stage.status !== "RUNNING") {
      break;
    }

    const stageEnd = new Date(stage.endsAt);

    if (Number.isNaN(stageEnd.getTime())) {
      throw new Error(
        `Invalid end time for stage ${currentStage}.`
      );
    }

    // Stage timer is still running.
    if (now < stageEnd) {
      break;
    }

    // Stage achieved.
    stage.status = "ACHIEVED";

    stage.completedAt = stageEnd;

    stage.pausedAt = null;

    if (stage.earningStatus !== "RECORDED") {
      stage.earningStatus = "PENDING";
      stage.earningRecordedAt = null;
    }

    currentStage += 1;

    // Unlock the next stage.
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
  // COMPLETE PACKAGE AFTER STAGE 14
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

  // Save stage progress before crediting income.
  await subscription.save();

  // -------------------------------------------
  // CREDIT ALL ACHIEVED PENDING STAGES
  // -------------------------------------------

  for (const stage of subscription.stages) {
    if (
      stage.status === "ACHIEVED" &&
      stage.earningStatus !== "RECORDED"
    ) {
      await creditStageEarning(subscription, stage);

      // Save after each successful stage credit.
      await subscription.save();
    }
  }

  return subscription;
}

// ---------------------------------------------
// EXPORT SERVICE
// ---------------------------------------------

module.exports = {
  updatePackageProgress
};