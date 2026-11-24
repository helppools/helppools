// // const mongoose = require("mongoose");

// // const directEligibilityHistorySchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: Number,
// //       required: true,
// //       unique: true,
// //       index: true
// //     },

// //     requiredDirects: {
// //       type: Number,
// //       default: 2
// //     },

// //     achieved: {
// //       type: Boolean,
// //       default: false
// //     },

// //     achievedAt: {
// //       type: Date,
// //       default: null
// //     },

// //     qualifyingDirectIds: {
// //       type: [Number],
// //       default: []
// //     },

// //     source: {
// //       type: String,
// //       default: "package_subscription"
// //     }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model(
// //   "DirectEligibilityHistory",
// //   directEligibilityHistorySchema
// // );



// const mongoose = require("mongoose");

// const directEligibilityHistorySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: Number,
//       required: true
//     },

//     packageAmount: {
//       type: Number,
//       required: true,
//       enum: [30, 60, 120, 240, 480, 960]
//     },

//     requiredDirects: {
//       type: Number,
//       required: true
//     },

//     achieved: {
//       type: Boolean,
//       default: false
//     },

//     achievedAt: {
//       type: Date,
//       default: null
//     },

//     qualifyingDirectIds: {
//       type: [Number],
//       default: []
//     },

//     source: {
//       type: String,
//       default: "package_subscription"
//     }
//   },
//   { timestamps: true }
// );

// // One separate history per user per package
// directEligibilityHistorySchema.index(
//   { userId: 1, packageAmount: 1 },
//   { unique: true }
// );

// module.exports = mongoose.model(
//   "DirectEligibilityHistory",
//   directEligibilityHistorySchema
// );



const mongoose = require("mongoose");

const directEligibilityHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      index: true
    },

    packageAmount: {
      type: Number,
      required: true,
      enum: [30, 60, 120, 240, 480, 960]
    },

    requiredDirects: {
      type: Number,
      required: true
    },

    achieved: {
      type: Boolean,
      default: false
    },

    achievedAt: {
      type: Date,
      default: null
    },

    qualifyingDirectIds: {
      type: [Number],
      default: []
    },

    source: {
      type: String,
      default: "package_subscription"
    }
  },
  { timestamps: true }
);

// One history per user per package
directEligibilityHistorySchema.index(
  { userId: 1, packageAmount: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "DirectEligibilityHistory",
  directEligibilityHistorySchema
);
