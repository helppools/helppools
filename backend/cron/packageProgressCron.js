// const cron = require("node-cron");

// const User = require("../models/User");
// const PackageSubscription = require("../models/PackageSubscription");

// const {
//   updatePackageProgress,
// } = require("../services/packageProgress");

// let isRunning = false;

// async function processPackageProgress() {
//   if (isRunning) return;

//   isRunning = true;

//   try {
//     const activePackages = await PackageSubscription.find({
//       status: "ACTIVE",
//     }).select("_id userId");

//     for (const subscription of activePackages) {
//       try {
//         // Numeric userId se user find karo, MongoDB _id se nahi
//         const user = await User.findOne({
//           userId: subscription.userId,
//         }).select("directCount");

//         if (!user) {
//           console.warn(
//             `[Package Progress] User not found. userId: ${subscription.userId}, package: ${subscription._id}`
//           );
//           continue;
//         }

//         const directCount = Number(user.directCount || 0);

//         await updatePackageProgress(
//           subscription._id,
//           directCount
//         );

//       } catch (packageError) {
//         console.error(
//           `[Package Progress] Error for package ${subscription._id}:`,
//           packageError.message
//         );
//       }
//     }

//     console.log(
//       `[Package Progress] Checked ${activePackages.length} active packages`
//     );

//   } catch (error) {
//     console.error(
//       "[Package Progress Cron Error]:",
//       error.message
//     );
//   } finally {
//     isRunning = false;
//   }
// }

// function startPackageProgressCron() {
//   // PM2 cluster mein sirf first instance cron chalaye
//   if (
//     process.env.NODE_APP_INSTANCE &&
//     process.env.NODE_APP_INSTANCE !== "0"
//   ) {
//     return;
//   }

//   cron.schedule(
//     "* * * * *",
//     processPackageProgress,
//     {
//       timezone: "Asia/Kolkata",
//     }
//   );

//   console.log("Package Progress Cron Started");

//   // Server start par ek baar check
//   processPackageProgress();
// }

// module.exports = {
//   startPackageProgressCron,


//   processPackageProgress,
// };



const cron = require("node-cron");
const PackageSubscription = require("../models/PackageSubscription");
const {
  updatePackageProgress
} = require("../services/packageProgress");

let isRunning = false;

async function processPackageProgress() {
  if (isRunning) return;

  isRunning = true;

  try {
    const activePackages = await PackageSubscription.find({
      status: "ACTIVE"
    }).select("_id userId packageAmount cycleNumber");

    let processed = 0;
    let failed = 0;

    for (const subscription of activePackages) {
      try {
        await updatePackageProgress(subscription._id);
        processed++;
      } catch (packageError) {
        failed++;

        console.error(
          `[Package Progress] Failed: User ${subscription.userId}, ` +
          `Package ${subscription.packageAmount}, ` +
          `Cycle ${subscription.cycleNumber}`,
          packageError
        );
      }
    }

    console.log(
      `[Package Progress] Processed: ${processed}, Failed: ${failed}`
    );

  } catch (error) {
    console.error(
      "[Package Progress] Cron error:",
      error
    );
  } finally {
    isRunning = false;
  }
}

function startPackageProgressCron() {
  // Prevent duplicate cron execution on clustered instances.
  if (
    process.env.NODE_APP_INSTANCE &&
    process.env.NODE_APP_INSTANCE !== "0"
  ) {
    return;
  }

  cron.schedule(
    "* * * * *",
    processPackageProgress,
    {
      timezone: "Asia/Kolkata"
    }
  );

  console.log("[Package Progress] Cron started");

  // Run once when the server starts.
  processPackageProgress();
}

module.exports = {
  startPackageProgressCron,
  processPackageProgress
};
