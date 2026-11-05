
// // // const express = require("express");
// // // const router = express.Router();

// // // const PackageSubscription = require("../models/PackageSubscription");
// // // const { updatePackageProgress } = require("../services/packageProgress");

// // // // IMPORTANT:
// // // // Apne project ke actual auth middleware ka path yahan lagao.
// // // const auth = require("../middleware/auth");

// // // // GET /api/package-progress
// // // // Logged-in user ke sabhi packages ki progress
// // // router.get("/", auth, async (req, res) => {
// // //   try {
// // //     // Middleware ko req.user set karna chahiye.
// // //     const loggedInUserId = req.user?._id || req.user?.id;

// // //     if (!loggedInUserId) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "Authentication required",
// // //       });
// // //     }

// // //     const packages = await PackageSubscription.find({
// // //       userId: loggedInUserId,
// // //     }).sort({ purchasedAt: -1 });

// // //     return res.json({
// // //       success: true,
// // //       packages: packages.map((pkg) => ({
// // //         id: pkg._id,
// // //         packageAmount: pkg.packageAmount,
// // //         purchaseType: pkg.purchaseType,
// // //         cycleNumber: pkg.cycleNumber,
// // //         status: pkg.status,
// // //         purchasedAt: pkg.purchasedAt,
// // //         activatedAt: pkg.activatedAt,
// // //         completedAt: pkg.completedAt,
// // //         currentStage: pkg.currentStage || 1,
// // //         stages: pkg.stages || [],
// // //         accountingCapAmount: pkg.accountingCapAmount,
// // //         recordedActivityAmount: pkg.recordedActivityAmount,
// // //       })),
// // //     });
// // //   } catch (error) {
// // //     console.error("Package progress fetch error:", error);

// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "Unable to fetch package progress",
// // //     });
// // //   }
// // // });

// // // // POST /api/package-progress/:subscriptionId/refresh
// // // // Sirf logged-in user apne package ka progress refresh kar sakta hai.
// // // router.post("/:subscriptionId/refresh", auth, async (req, res) => {
// // //   try {
// // //     const loggedInUserId = req.user?._id || req.user?.id;

// // //     if (!loggedInUserId) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "Authentication required",
// // //       });
// // //     }

// // //     const subscription = await PackageSubscription.findOne({
// // //       _id: req.params.subscriptionId,
// // //       userId: loggedInUserId,
// // //     });

// // //     if (!subscription) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Package not found",
// // //       });
// // //     }

// // //     // Verified direct count server-side calculate hona chahiye.
// // //     // Client se bheje gaye count ko kabhi trust na karein.
// // //     // Is route mein direct count ko update nahi kiya ja raha.
// // //     const updated = await updatePackageProgress(
// // //       subscription._id,
// // //       subscription.verifiedDirectCount || 0
// // //     );

// // //     return res.json({
// // //       success: true,
// // //       message: "Package progress refreshed",
// // //       package: {
// // //         id: updated._id,
// // //         packageAmount: updated.packageAmount,
// // //         status: updated.status,
// // //         currentStage: updated.currentStage || 1,
// // //         stages: updated.stages || [],
// // //         completedAt: updated.completedAt,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Package progress refresh error:", error);

// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "Unable to refresh package progress",
// // //     });
// // //   }
// // // });

// // // module.exports = router;








// // const express = require("express");
// // const router = express.Router();

// // const PackageSubscription = require("../models/PackageSubscription");
// // const { updatePackageProgress } = require("../services/packageProgress");

// // // Same auth middleware used by incomeRoutes.js
// // const auth = require("../middleware/authMiddleware");

// // // GET /api/package-progress
// // router.get("/", auth, async (req, res) => {
// //   try {
// //     const loggedInUserId = req.user?._id || req.user?.id;

// //     if (!loggedInUserId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Authentication required",
// //       });
// //     }

// //     const packages = await PackageSubscription.find({
// //       userId: loggedInUserId,
// //     }).sort({ purchasedAt: -1 });

// //     return res.json({
// //       success: true,
// //       packages: packages.map((pkg) => ({
// //         id: pkg._id,
// //         packageAmount: pkg.packageAmount,
// //         purchaseType: pkg.purchaseType,
// //         cycleNumber: pkg.cycleNumber,
// //         status: pkg.status,
// //         purchasedAt: pkg.purchasedAt,
// //         activatedAt: pkg.activatedAt,
// //         completedAt: pkg.completedAt,
// //         currentStage: pkg.currentStage || 1,
// //         stages: pkg.stages || [],
// //         accountingCapAmount: pkg.accountingCapAmount,
// //         recordedActivityAmount: pkg.recordedActivityAmount,
// //       })),
// //     });
// //   } catch (error) {
// //     console.error("Package progress fetch error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       message: "Unable to fetch package progress",
// //     });
// //   }
// // });

// // // POST /api/package-progress/:subscriptionId/refresh
// // router.post("/:subscriptionId/refresh", auth, async (req, res) => {
// //   try {
// //     const loggedInUserId = req.user?._id || req.user?.id;

// //     if (!loggedInUserId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Authentication required",
// //       });
// //     }

// //     const subscription = await PackageSubscription.findOne({
// //       _id: req.params.subscriptionId,
// //       userId: loggedInUserId,
// //     });

// //     if (!subscription) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Package not found",
// //       });
// //     }

// //     const updated = await updatePackageProgress(
// //       subscription._id,
// //       subscription.verifiedDirectCount || 0
// //     );

// //     return res.json({
// //       success: true,
// //       message: "Package progress refreshed",
// //       package: {
// //         id: updated._id,
// //         packageAmount: updated.packageAmount,
// //         status: updated.status,
// //         currentStage: updated.currentStage || 1,
// //         stages: updated.stages || [],
// //         completedAt: updated.completedAt,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Package progress refresh error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       message: "Unable to refresh package progress",
// //     });
// //   }
// // });

// // module.exports = router;




// const express = require("express");
// const router = express.Router();

// const PackageSubscription = require("../models/PackageSubscription");
// const { updatePackageProgress } = require("../services/packageProgress");
// const auth = require("../middleware/authMiddleware");

// // JWT user se numeric userId lena hai, MongoDB _id nahi.
// function getLoggedInUserId(req) {
//   const rawUserId = req.user?.userId ?? req.user?.id;

//   if (
//     rawUserId === undefined ||
//     rawUserId === null ||
//     rawUserId === ""
//   ) {
//     return null;
//   }

//   const userId = Number(rawUserId);

//   return Number.isSafeInteger(userId) && userId > 0
//     ? userId
//     : null;
// }

// // GET /api/package-progress
// router.get("/", auth, async (req, res) => {
//   try {
//     const loggedInUserId = getLoggedInUserId(req);

//     if (loggedInUserId === null) {
//       return res.status(401).json({
//         success: false,
//         message: "Valid numeric user ID not found",
//       });
//     }

//     const packages = await PackageSubscription.find({
//       userId: loggedInUserId,
//     }).sort({ purchasedAt: -1 });

//     return res.json({
//       success: true,
//       packages: packages.map((pkg) => ({
//         id: pkg._id,
//         packageAmount: pkg.packageAmount,
//         purchaseType: pkg.purchaseType,
//         cycleNumber: pkg.cycleNumber,
//         status: pkg.status,
//         purchasedAt: pkg.purchasedAt,
//         activatedAt: pkg.activatedAt,
//         completedAt: pkg.completedAt,
//         currentStage: pkg.currentStage || 1,
//         stages: pkg.stages || [],
//         accountingCapAmount: pkg.accountingCapAmount,
//         recordedActivityAmount: pkg.recordedActivityAmount,
//       })),
//     });
//   } catch (error) {
//     console.error("Package progress fetch error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch package progress",
//     });
//   }
// });

// // POST /api/package-progress/:subscriptionId/refresh
// router.post("/:subscriptionId/refresh", auth, async (req, res) => {
//   try {
//     const loggedInUserId = getLoggedInUserId(req);

//     if (loggedInUserId === null) {
//       return res.status(401).json({
//         success: false,
//         message: "Valid numeric user ID not found",
//       });
//     }

//     const subscription = await PackageSubscription.findOne({
//       _id: req.params.subscriptionId,
//       userId: loggedInUserId,
//     });

//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found",
//       });
//     }

//     const updated = await updatePackageProgress(
//       subscription._id,
//       Number(subscription.verifiedDirectCount || 0)
//     );

//     if (!updated) {
//       return res.status(404).json({
//         success: false,
//         message: "Package progress not found",
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Package progress refreshed",
//       package: {
//         id: updated._id,
//         packageAmount: updated.packageAmount,
//         status: updated.status,
//         currentStage: updated.currentStage || 1,
//         stages: updated.stages || [],
//         completedAt: updated.completedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Package progress refresh error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to refresh package progress",
//     });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();

const PackageSubscription = require("../models/PackageSubscription");
const { updatePackageProgress } = require("../services/packageProgress");
const auth = require("../middleware/authMiddleware");

// JWT se logged-in user ka numeric userId lena.
function getLoggedInUserId(req) {
  const rawUserId = req.user?.userId ?? req.user?.id;

  if (
    rawUserId === undefined ||
    rawUserId === null ||
    rawUserId === ""
  ) {
    return null;
  }

  const userId = Number(rawUserId);

  return Number.isSafeInteger(userId) && userId > 0
    ? userId
    : null;
}

// Stage response ko consistent format mein bhejna.
function formatStages(stages) {
  if (!Array.isArray(stages)) {
    return [];
  }

  return stages.map((stage) => {
    const stageData =
      typeof stage?.toObject === "function"
        ? stage.toObject()
        : stage;

    return {
      ...stageData,

      stageNumber: stageData.stageNumber,
      durationDays: stageData.durationDays,
      status: stageData.status,

      startedAt: stageData.startedAt ?? null,
      endsAt: stageData.endsAt ?? null,
      completedAt: stageData.completedAt ?? null,

      // Stage earning details.
      earningAmount: Number(stageData.earningAmount || 0),
      earningStatus:
        stageData.earningStatus || "NOT_RECORDED",
      earningRecordedAt:
        stageData.earningRecordedAt ?? null,
    };
  });
}

// Package response formatter.
function formatPackage(pkg) {
  return {
    id: pkg._id,
    packageAmount: pkg.packageAmount,
    purchaseType: pkg.purchaseType,
    cycleNumber: pkg.cycleNumber,
    status: pkg.status,

    purchasedAt: pkg.purchasedAt,
    activatedAt: pkg.activatedAt,
    completedAt: pkg.completedAt,

    currentStage: pkg.currentStage || 1,
    stages: formatStages(pkg.stages),

    accountingCapAmount: pkg.accountingCapAmount,
    recordedActivityAmount: pkg.recordedActivityAmount,
  };
}

// GET /api/package-progress
router.get("/", auth, async (req, res) => {
  try {
    const loggedInUserId = getLoggedInUserId(req);

    if (loggedInUserId === null) {
      return res.status(401).json({
        success: false,
        message: "Valid numeric user ID not found",
      });
    }

    const packages = await PackageSubscription.find({
      userId: loggedInUserId,
    }).sort({ purchasedAt: -1 });

    return res.json({
      success: true,
      packages: packages.map(formatPackage),
    });
  } catch (error) {
    console.error("Package progress fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch package progress",
    });
  }
});

// POST /api/package-progress/:subscriptionId/refresh
router.post("/:subscriptionId/refresh", auth, async (req, res) => {
  try {
    const loggedInUserId = getLoggedInUserId(req);

    if (loggedInUserId === null) {
      return res.status(401).json({
        success: false,
        message: "Valid numeric user ID not found",
      });
    }

    // Verify package belongs to logged-in user.
    const subscription = await PackageSubscription.findOne({
      _id: req.params.subscriptionId,
      userId: loggedInUserId,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
 
    const updated = await updatePackageProgress(
  subscription._id
);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Package progress not found",
      });
    }

    return res.json({
      success: true,
      message: "Package progress refreshed",
      package: formatPackage(updated),
    });
  } catch (error) {
    console.error("Package progress refresh error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to refresh package progress",
    });
  }
});

module.exports = router;
