// // // // // const mongoose = require('mongoose');

// // // // // const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// // // // // const packageSubscriptionSchema = new mongoose.Schema(
// // // // //   {
// // // // //     userId: {
// // // // //       type: Number,
// // // // //       required: true,
// // // // //       index: true
// // // // //     },

// // // // //     packageAmount: {
// // // // //       type: Number,
// // // // //       required: true,
// // // // //       enum: PACKAGE_AMOUNTS
// // // // //     },

// // // // //     purchaseType: {
// // // // //       type: String,
// // // // //       enum: ['FIRST_PURCHASE', 'UPGRADE', 'REPEAT'],
// // // // //       required: true
// // // // //     },

// // // // //     cycleNumber: {
// // // // //       type: Number,
// // // // //       required: true,
// // // // //       min: 1
// // // // //     },

// // // // //     status: {
// // // // //       type: String,
// // // // //       enum: [
// // // // //         'PENDING',
// // // // //         'ACTIVE',
// // // // //         'PAUSED',
// // // // //         'COMPLETED',
// // // // //         'CANCELLED'
// // // // //       ],
// // // // //       default: 'PENDING',
// // // // //       index: true
// // // // //     },

// // // // //     purchasedAt: {
// // // // //       type: Date,
// // // // //       default: Date.now,
// // // // //       required: true
// // // // //     },

// // // // //     activatedAt: {
// // // // //       type: Date,
// // // // //       default: null
// // // // //     },

// // // // //     completedAt: {
// // // // //       type: Date,
// // // // //       default: null
// // // // //     },

// // // // //     // Accounting tracking limit only.
// // // // //     // This does not generate or authorize payouts.
// // // // //     accountingCapAmount: {
// // // // //       type: Number,
// // // // //       default: function () {
// // // // //         return this.packageAmount * 2;
// // // // //       },
// // // // //       min: 0
// // // // //     },

// // // // //     recordedActivityAmount: {
// // // // //       type: Number,
// // // // //       default: 0,
// // // // //       min: 0
// // // // //     },

// // // // //     timer: {
// // // // //       durationSeconds: {
// // // // //         type: Number,
// // // // //         default: 0,
// // // // //         min: 0
// // // // //       },

// // // // //       startedAt: {
// // // // //         type: Date,
// // // // //         default: null
// // // // //       },

// // // // //       endsAt: {
// // // // //         type: Date,
// // // // //         default: null
// // // // //       },

// // // // //       pausedAt: {
// // // // //         type: Date,
// // // // //         default: null
// // // // //       },

// // // // //       totalPausedSeconds: {
// // // // //         type: Number,
// // // // //         default: 0,
// // // // //         min: 0
// // // // //       }
// // // // //     },

// // // // //     transactionId: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: 'Transaction',
// // // // //       default: null
// // // // //     },

// // // // //     notes: {
// // // // //       type: String,
// // // // //       default: '',
// // // // //       maxlength: 500
// // // // //     }
// // // // //   },
// // // // //   {
// // // // //     timestamps: true
// // // // //   }
// // // // // );

// // // // // // Indexes
// // // // // packageSubscriptionSchema.index({
// // // // //   userId: 1,
// // // // //   purchasedAt: -1
// // // // // });

// // // // // packageSubscriptionSchema.index(
// // // // //   {
// // // // //     userId: 1,
// // // // //     packageAmount: 1,
// // // // //     cycleNumber: 1
// // // // //   },
// // // // //   {
// // // // //     unique: true
// // // // //   }
// // // // // );

// // // // // packageSubscriptionSchema.index({
// // // // //   status: 1,
// // // // //   'timer.endsAt': 1
// // // // // });

// // // // // module.exports = mongoose.model(
// // // // //   'PackageSubscription',
// // // // //   packageSubscriptionSchema
// // // // // );



// // // // const mongoose = require('mongoose');

// // // // const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// // // // const STAGE_DAYS = [
// // // //   1, 3, 7, 15,
// // // //   30, 30, 30, 30, 30, 30,
// // // //   30, 30, 30, 30
// // // // ];

// // // // const stageSchema = new mongoose.Schema({
// // // //   stageNumber: {
// // // //     type: Number,
// // // //     required: true,
// // // //     min: 1,
// // // //     max: 14
// // // //   },
// // // //   durationDays: {
// // // //     type: Number,
// // // //     required: true,
// // // //     min: 1
// // // //   },
// // // //   status: {
// // // //     type: String,
// // // //     enum: ['LOCKED', 'WAITING', 'RUNNING', 'PAUSED', 'ACHIEVED'],
// // // //     default: 'LOCKED'
// // // //   },
// // // //   startedAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },
// // // //   endsAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },
// // // //   pausedAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },
// // // //   completedAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },
// // // //   accumulatedPausedSeconds: {
// // // //     type: Number,
// // // //     default: 0,
// // // //     min: 0
// // // //   }
// // // // }, { _id: false });

// // // // const packageSubscriptionSchema = new mongoose.Schema({
// // // //   userId: {
// // // //     type: Number,
// // // //     required: true,
// // // //     index: true
// // // //   },
// // // //   packageAmount: {
// // // //     type: Number,
// // // //     required: true,
// // // //     enum: PACKAGE_AMOUNTS
// // // //   },
// // // //   purchaseType: {
// // // //     type: String,
// // // //     enum: ['FIRST_PURCHASE', 'UPGRADE', 'REPEAT'],
// // // //     required: true
// // // //   },
// // // //   cycleNumber: {
// // // //     type: Number,
// // // //     required: true,
// // // //     min: 1
// // // //   },
// // // //   status: {
// // // //     type: String,
// // // //     enum: ['PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'],
// // // //     default: 'PENDING',
// // // //     index: true
// // // //   },
// // // //   purchasedAt: {
// // // //     type: Date,
// // // //     default: Date.now
// // // //   },
// // // //   activatedAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },
// // // //   completedAt: {
// // // //     type: Date,
// // // //     default: null
// // // //   },

// // // //   // Tracking cap only; it does not create or authorize income.
// // // //   accountingCapAmount: {
// // // //     type: Number,
// // // //     default: function () {
// // // //       return this.packageAmount * 2;
// // // //     },
// // // //     min: 0
// // // //   },
// // // //   recordedActivityAmount: {
// // // //     type: Number,
// // // //     default: 0,
// // // //     min: 0
// // // //   },

// // // //   verifiedDirectCount: {
// // // //     type: Number,
// // // //     default: 0,
// // // //     min: 0
// // // //   },
// // // //   requiredDirectCount: {
// // // //     type: Number,
// // // //     default: 2,
// // // //     min: 2
// // // //   },

// // // //   currentStage: {
// // // //     type: Number,
// // // //     default: 1,
// // // //     min: 1,
// // // //     max: 14
// // // //   },
// // // //   stages: {
// // // //     type: [stageSchema],
// // // //     default: function () {
// // // //       return STAGE_DAYS.map((days, index) => ({
// // // //         stageNumber: index + 1,
// // // //         durationDays: days,
// // // //         status: index === 0 ? 'WAITING' : 'LOCKED'
// // // //       }));
// // // //     }
// // // //   },

// // // //   transactionId: {
// // // //     type: mongoose.Schema.Types.ObjectId,
// // // //     ref: 'Transaction',
// // // //     default: null
// // // //   },
// // // //   notes: {
// // // //     type: String,
// // // //     default: '',
// // // //     maxlength: 500
// // // //   }
// // // // }, { timestamps: true });

// // // // packageSubscriptionSchema.index({
// // // //   userId: 1,
// // // //   purchasedAt: -1
// // // // });

// // // // packageSubscriptionSchema.index(
// // // //   { userId: 1, packageAmount: 1, cycleNumber: 1 },
// // // //   { unique: true }
// // // // );

// // // // packageSubscriptionSchema.index({
// // // //   status: 1,
// // // //   'stages.status': 1,
// // // //   'stages.endsAt': 1
// // // // });

// // // // module.exports = mongoose.model(
// // // //   'PackageSubscription',
// // // //   packageSubscriptionSchema
// // // // );




// // // const mongoose = require('mongoose');

// // // const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// // // const STAGE_DAYS = [
// // //   1, 3, 7, 15,
// // //   30, 30, 30, 30, 30, 30,
// // //   30, 30, 30, 30
// // // ];

// // // const stageSchema = new mongoose.Schema({
// // //   stageNumber: {
// // //     type: Number,
// // //     required: true,
// // //     min: 1,
// // //     max: 14
// // //   },
// // //   durationDays: {
// // //     type: Number,
// // //     required: true,
// // //     min: 1
// // //   },
// // //   status: {
// // //     type: String,
// // //     enum: ['LOCKED', 'WAITING', 'RUNNING', 'PAUSED', 'ACHIEVED'],
// // //     default: 'LOCKED'
// // //   },

// // //   // Configured stage amount. This field alone does not authorize payment.
// // //   earningAmount: {
// // //     type: Number,
// // //     default: 0,
// // //     min: 0
// // //   },

// // //   // Separate accounting status from timer completion.
 
// // //   earningStatus: {
// // //   type: String,
// // //   enum: ['NOT_RECORDED', 'PENDING', 'RECORDED'],
// // //   default: 'NOT_RECORDED'
// // // },
// // //   earningRecordedAt: {
// // //     type: Date,
// // //     default: null
// // //   },

// // //   startedAt: {
// // //     type: Date,
// // //     default: null
// // //   },
// // //   endsAt: {
// // //     type: Date,
// // //     default: null
// // //   },
// // //   pausedAt: {
// // //     type: Date,
// // //     default: null
// // //   },
// // //   completedAt: {
// // //     type: Date,
// // //     default: null
// // //   },
// // //   accumulatedPausedSeconds: {
// // //     type: Number,
// // //     default: 0,
// // //     min: 0
// // //   }
// // // }, { _id: false });

// // // const packageSubscriptionSchema = new mongoose.Schema({
// // //   userId: {
// // //     type: Number,
// // //     required: true,
// // //     index: true
// // //   },
// // //   packageAmount: {
// // //     type: Number,
// // //     required: true,
// // //     enum: PACKAGE_AMOUNTS
// // //   },
// // //   purchaseType: {
// // //     type: String,
// // //     enum: ['FIRST_PURCHASE', 'UPGRADE', 'REPEAT'],
// // //     required: true
// // //   },
// // //   cycleNumber: {
// // //     type: Number,
// // //     required: true,
// // //     min: 1
// // //   },
// // //   status: {
// // //     type: String,
// // //     enum: ['PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'],
// // //     default: 'PENDING',
// // //     index: true
// // //   },
// // //   purchasedAt: {
// // //     type: Date,
// // //     default: Date.now
// // //   },
// // //   activatedAt: {
// // //     type: Date,
// // //     default: null
// // //   },
// // //   completedAt: {
// // //     type: Date,
// // //     default: null
// // //   },

// // //   withdrawnAmount: {
// // //   type: Number,
// // //   default: 0
// // // },
// // //   // Tracking cap only; it does not create or authorize income.
// // //   accountingCapAmount: {
// // //     type: Number,
// // //     default: function () {
// // //       return this.packageAmount * 2;
// // //     },
// // //     min: 0
// // //   },
// // //   recordedActivityAmount: {
// // //     type: Number,
// // //     default: 0,
// // //     min: 0
// // //   },

// // //   verifiedDirectCount: {
// // //     type: Number,
// // //     default: 0,
// // //     min: 0
// // //   },
// // //   requiredDirectCount: {
// // //     type: Number,
// // //     default: 2,
// // //     min: 2
// // //   },

// // //   currentStage: {
// // //     type: Number,
// // //     default: 1,
// // //     min: 1,
// // //     max: 14
// // //   },
// // //   stages: {
// // //     type: [stageSchema],
// // //     default: function () {
// // //       return STAGE_DAYS.map((days, index) => ({
// // //         stageNumber: index + 1,
// // //         durationDays: days,
// // //         status: index === 0 ? 'WAITING' : 'LOCKED',
// // //         earningAmount: 0,
// // //         earningStatus: 'NOT_RECORDED',
// // //         earningRecordedAt: null
// // //       }));
// // //     }
// // //   },

// // //   transactionId: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: 'Transaction',
// // //     default: null
// // //   },
// // //   notes: {
// // //     type: String,
// // //     default: '',
// // //     maxlength: 500
// // //   }
// // // }, { timestamps: true });

// // // packageSubscriptionSchema.index({
// // //   userId: 1,
// // //   purchasedAt: -1
// // // });

// // // packageSubscriptionSchema.index(
// // //   { userId: 1, packageAmount: 1, cycleNumber: 1 },
// // //   { unique: true }
// // // );

// // // packageSubscriptionSchema.index({
// // //   status: 1,
// // //   'stages.status': 1,
// // //   'stages.endsAt': 1
// // // });

// // // module.exports = mongoose.model(
// // //   'PackageSubscription',
// // //   packageSubscriptionSchema
// // // );


// // const mongoose = require('mongoose');

// // const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// // // const STAGE_DAYS = [
// // //   1, 3, 7, 15,
// // //   30, 30, 30, 30, 30, 30,
// // //   30, 30, 30, 30
// // // ];

// // const STAGE_DAYS = [
// //   0.6, 0.6, 0.6, 0.6, 0.6,
// //   30, 30, 30, 30, 30,
// //   30, 30, 30, 30
// // ];

// // const stageSchema = new mongoose.Schema({
// //   stageNumber: {
// //     type: Number,
// //     required: true,
// //     min: 1,
// //     max: 14
// //   },

// //   // durationDays: {
// //   //   type: Number,
// //   //   required: true,
// //   //   min: 1
// //   // },
// //   durationDays: {
// //   type: Number,
// //   required: true,
// //   min: 0.01
// // },

// //   status: {
// //     type: String,
// //     enum: ['LOCKED', 'WAITING', 'RUNNING', 'PAUSED', 'ACHIEVED'],
// //     default: 'LOCKED'
// //   },

// //   // Stage earning amount
// //   earningAmount: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   },

// //   // Earning accounting status
// //   earningStatus: {
// //     type: String,
// //     enum: ['NOT_RECORDED', 'PENDING', 'RECORDED'],
// //     default: 'NOT_RECORDED'
// //   },

// //   earningRecordedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   // Amount already withdrawn from this stage
// //   withdrawnAmount: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   },

// //   startedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   endsAt: {
// //     type: Date,
// //     default: null
// //   },

// //   pausedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   completedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   accumulatedPausedSeconds: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   }
// // }, { _id: false });

// // const packageSubscriptionSchema = new mongoose.Schema({
// //   userId: {
// //     type: Number,
// //     required: true,
// //     index: true
// //   },

// //   packageAmount: {
// //     type: Number,
// //     required: true,
// //     enum: PACKAGE_AMOUNTS
// //   },

// //   purchaseType: {
// //     type: String,
// //     enum: ['FIRST_PURCHASE', 'UPGRADE', 'REPEAT'],
// //     required: true
// //   },

// //   cycleNumber: {
// //     type: Number,
// //     required: true,
// //     min: 1
// //   },

// //   status: {
// //     type: String,
// //     enum: ['PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'],
// //     default: 'PENDING',
// //     index: true
// //   },

// //   purchasedAt: {
// //     type: Date,
// //     default: Date.now
// //   },

// //   activatedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   completedAt: {
// //     type: Date,
// //     default: null
// //   },

// //   // Total amount withdrawn from this subscription
// //   withdrawnAmount: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   },

// //   // Accounting cap only; does not authorize payment
// //   accountingCapAmount: {
// //     type: Number,
// //     default: function () {
// //       return this.packageAmount * 2;
// //     },
// //     min: 0
// //   },

// //   recordedActivityAmount: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   },

// //   verifiedDirectCount: {
// //     type: Number,
// //     default: 0,
// //     min: 0
// //   },

// //   requiredDirectCount: {
// //     type: Number,
// //     default: 2,
// //     min: 2
// //   },

// //   currentStage: {
// //     type: Number,
// //     default: 1,
// //     min: 1,
// //     max: 14
// //   },

// //   stages: {
// //     type: [stageSchema],
// //     default: function () {
// //       return STAGE_DAYS.map((days, index) => ({
// //         stageNumber: index + 1,
// //         durationDays: days,
// //         status: index === 0 ? 'WAITING' : 'LOCKED',
// //         earningAmount: 0,
// //         earningStatus: 'NOT_RECORDED',
// //         earningRecordedAt: null,
// //         withdrawnAmount: 0
// //       }));
// //     }
// //   },

// //   transactionId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Transaction',
// //     default: null
// //   },

// //   notes: {
// //     type: String,
// //     default: '',
// //     maxlength: 500
// //   }

// // }, { timestamps: true });

// // // Indexes
// // packageSubscriptionSchema.index({
// //   userId: 1,
// //   purchasedAt: -1
// // });

// // packageSubscriptionSchema.index(
// //   {
// //     userId: 1,
// //     packageAmount: 1,
// //     cycleNumber: 1
// //   },
// //   { unique: true }
// // );

// // packageSubscriptionSchema.index({
// //   status: 1,
// //   'stages.status': 1,
// //   'stages.endsAt': 1
// // });

// // packageSubscriptionSchema.index({
// //   userId: 1,
// //   'stages.earningStatus': 1
// // });

// // module.exports = mongoose.model(
// //   'PackageSubscription',
// //   packageSubscriptionSchema
// // );



// const mongoose = require('mongoose');

// const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// const DEFAULT_STAGE_DAYS = [
//   1, 3, 7, 15,
//   30, 30, 30, 30, 30, 30,
//   30, 30, 30, 30
// ];

// // const getStageDays = (packageAmount) => {
// //   // Only $30 package gets five 1-day stages.
// //   if (Number(packageAmount) === 30) {
// //     return [
// //       1, 1, 1, 1, 1,
// //       30, 30, 30, 30, 30,
// //       30, 30, 30, 30
// //     ];
// //   }

// //   // All other packages keep the default schedule.
// //   return [...DEFAULT_STAGE_DAYS];
// // };

// const getStageDays = (packageAmount) => {
//   if (Number(packageAmount) === 30) {
//     return [
//       0.2, 0.2, 0.2, 0.2, 0.2,
//       30, 30, 30, 30, 30,
//       30, 30, 30, 30
//     ];
//   }

//   return [...DEFAULT_STAGE_DAYS];
// };

// const stageSchema = new mongoose.Schema({
//   stageNumber: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 14
//   },

//   durationDays: {
//     type: Number,
//     required: true,
//     min: 0.01
//   },

//   status: {
//     type: String,
//     enum: ['LOCKED', 'WAITING', 'RUNNING', 'PAUSED', 'ACHIEVED'],
//     default: 'LOCKED'
//   },

//   earningAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   earningStatus: {
//     type: String,
//     enum: ['NOT_RECORDED', 'PENDING', 'RECORDED'],
//     default: 'NOT_RECORDED'
//   },

//   earningRecordedAt: {
//     type: Date,
//     default: null
//   },

//   withdrawnAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   startedAt: {
//     type: Date,
//     default: null
//   },

//   endsAt: {
//     type: Date,
//     default: null
//   },

//   pausedAt: {
//     type: Date,
//     default: null
//   },

//   completedAt: {
//     type: Date,
//     default: null
//   },

//   accumulatedPausedSeconds: {
//     type: Number,
//     default: 0,
//     min: 0
//   }
// }, { _id: false });

// const packageSubscriptionSchema = new mongoose.Schema({
//   userId: {
//     type: Number,
//     required: true,
//     index: true
//   },

//   packageAmount: {
//     type: Number,
//     required: true,
//     enum: PACKAGE_AMOUNTS
//   },

//   purchaseType: {
//     type: String,
//     enum: ['FIRST_PURCHASE', 'UPGRADE', 'REPEAT'],
//     required: true
//   },

//   cycleNumber: {
//     type: Number,
//     required: true,
//     min: 1
//   },

//   status: {
//     type: String,
//     enum: ['PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'],
//     default: 'PENDING',
//     index: true
//   },

//   purchasedAt: {
//     type: Date,
//     default: Date.now
//   },

//   activatedAt: {
//     type: Date,
//     default: null
//   },

//   completedAt: {
//     type: Date,
//     default: null
//   },

//   withdrawnAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   accountingCapAmount: {
//     type: Number,
//     default: function () {
//       return this.packageAmount * 2;
//     },
//     min: 0
//   },

//   recordedActivityAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   verifiedDirectCount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   requiredDirectCount: {
//     type: Number,
//     default: 2,
//     min: 2
//   },

//   currentStage: {
//     type: Number,
//     default: 1,
//     min: 1,
//     max: 14
//   },

//   stages: {
//     type: [stageSchema],
//     default: function () {
//       const stageDays = getStageDays(this.packageAmount);

//       return stageDays.map((days, index) => ({
//         stageNumber: index + 1,
//         durationDays: days,
//         status: index === 0 ? 'WAITING' : 'LOCKED',
//         earningAmount: 0,
//         earningStatus: 'NOT_RECORDED',
//         earningRecordedAt: null,
//         withdrawnAmount: 0
//       }));
//     }
//   },

//   transactionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Transaction',
//     default: null
//   },


//     // Stage 5 ke baad mandatory same-package retopup
//   stage5RetopupAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   stage5RetopupPaidAt: {
//     type: Date,
//     default: null
//   },

//   stage5RetopupTransactionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Transaction',
//     default: null
//   },

//   stage5RetopupConfirmed: {
//     type: Boolean,
//     default: false
//   },

//   notes: {
//     type: String,
//     default: '',
//     maxlength: 500
//   }

// }, { timestamps: true });

// // Indexes
// packageSubscriptionSchema.index({
//   userId: 1,
//   purchasedAt: -1
// });

// packageSubscriptionSchema.index(
//   {
//     userId: 1,
//     packageAmount: 1,
//     cycleNumber: 1
//   },
//   { unique: true }
// );

// packageSubscriptionSchema.index({
//   status: 1,
//   'stages.status': 1,
//   'stages.endsAt': 1
// });

// packageSubscriptionSchema.index({
//   userId: 1,
//   'stages.earningStatus': 1
// });

// module.exports = mongoose.model(
//   'PackageSubscription',
//   packageSubscriptionSchema
// );


















// const mongoose = require("mongoose");

// const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// const DEFAULT_STAGE_DAYS = [
//   1, 3, 7, 15,
//   30, 30, 30, 30, 30, 30,
//   30, 30, 30, 30
// ];

// // const getStageDays = (packageAmount) => {
// //   if (Number(packageAmount) === 30) {
// //     return [
// //       0.2, 0.2, 0.2, 0.2, 0.2,
// //       30, 30, 30, 30, 30,
// //       30, 30, 30, 30
// //     ];
// //   }

// //   return [...DEFAULT_STAGE_DAYS];
// // };


// function getStageDays(packageAmount) {
//   if (Number(packageAmount) === 30) {
//     return [
//       0.2, 0.2, 0.2, 0.2, 0.2,
//       1, // Stage 6 = 24 hours
//       30, 30, 30, 30,
//       30, 30, 30, 30
//     ];
//   }

//   return [...DEFAULT_STAGE_DAYS];
// }

// const stageSchema = new mongoose.Schema({
//   stageNumber: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 14
//   },

//   durationDays: {
//     type: Number,
//     required: true,
//     min: 0.01
//   },

//   status: {
//     type: String,
//     enum: ["LOCKED", "WAITING", "RUNNING", "PAUSED", "ACHIEVED"],
//     default: "LOCKED"
//   },

//   earningAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   earningStatus: {
//     type: String,
//     enum: ["NOT_RECORDED", "PENDING", "RECORDED"],
//     default: "NOT_RECORDED"
//   },

//   earningRecordedAt: {
//     type: Date,
//     default: null
//   },

//   withdrawnAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   startedAt: {
//     type: Date,
//     default: null
//   },

//   endsAt: {
//     type: Date,
//     default: null
//   },

//   pausedAt: {
//     type: Date,
//     default: null
//   },

//   completedAt: {
//     type: Date,
//     default: null
//   },

//   accumulatedPausedSeconds: {
//     type: Number,
//     default: 0,
//     min: 0
//   }
// }, { _id: false });


// const packageSubscriptionSchema = new mongoose.Schema({
//   userId: {
//     type: Number,
//     required: true,
//     index: true
//   },

//   packageAmount: {
//     type: Number,
//     required: true,
//     enum: PACKAGE_AMOUNTS
//   },

//   purchaseType: {
//     type: String,
//     enum: ["FIRST_PURCHASE", "UPGRADE", "REPEAT"],
//     required: true
//   },

//   cycleNumber: {
//     type: Number,
//     required: true,
//     min: 1
//   },

//   status: {
//     type: String,
//     enum: ["PENDING", "ACTIVE", "PAUSED", "COMPLETED", "CANCELLED"],
//     default: "PENDING",
//     index: true
//   },

//   purchasedAt: {
//     type: Date,
//     default: Date.now
//   },

//   activatedAt: {
//     type: Date,
//     default: null
//   },

//   completedAt: {
//     type: Date,
//     default: null
//   },

//   withdrawnAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   // Backward compatibility only.
//   // These fields are NOT used for Stage 5 retopup.
 

//    accountingCapAmount: {
//     type: Number,
//     default: function () {
//       return Number(this.packageAmount) * 2;
//     },
//     min: 0
//   },

//   recordedActivityAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   verifiedDirectCount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   requiredDirectCount: {
//     type: Number,
//     default: 2,
//     min: 2
//   },

//   currentStage: {
//     type: Number,
//     default: 1,
//     min: 1,
//     max: 14
//   },

//   stages: {
//     type: [stageSchema],
//     default: function () {
//       const stageDays = getStageDays(this.packageAmount);

//       return stageDays.map((days, index) => ({
//         stageNumber: index + 1,
//         durationDays: days,
//         status: index === 0 ? "WAITING" : "LOCKED",
//         earningAmount: 0,
//         earningStatus: "NOT_RECORDED",
//         earningRecordedAt: null,
//         withdrawnAmount: 0,
//         startedAt: null,
//         endsAt: null,
//         pausedAt: null,
//         completedAt: null,
//         accumulatedPausedSeconds: 0
//       }));
//     }
//   },

//   transactionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Transaction",
//     default: null
//   },

//   // -----------------------------------------
//   // STAGE 5 SAME-PACKAGE RETOPUP
//   // -----------------------------------------

//   stage5RetopupAmount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },

//   stage5RetopupPaidAt: {
//     type: Date,
//     default: null
//   },

//   stage5RetopupTransactionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Transaction",
//     default: null
//   },

//   stage5RetopupConfirmed: {
//     type: Boolean,
//     default: false
//   },

//   notes: {
//     type: String,
//     default: "",
//     maxlength: 500
//   }

// }, { timestamps: true });


// // -----------------------------------------
// // INDEXES
// // -----------------------------------------

// packageSubscriptionSchema.index({
//   userId: 1,
//   purchasedAt: -1
// });

// packageSubscriptionSchema.index(
//   {
//     userId: 1,
//     packageAmount: 1,
//     cycleNumber: 1
//   },
//   { unique: true }
// );

// packageSubscriptionSchema.index({
//   status: 1,
//   "stages.status": 1,
//   "stages.endsAt": 1
// });

// packageSubscriptionSchema.index({
//   userId: 1,
//   "stages.earningStatus": 1
// });

// // Retopup lookup
 

// // Same-package retopup subscription lookup
// packageSubscriptionSchema.index({
//   userId: 1,
//   packageAmount: 1,
//   status: 1,
//   createdAt: -1
// });

// module.exports = mongoose.model(
//   "PackageSubscription",
//   packageSubscriptionSchema
// );


const mongoose = require("mongoose");

// ============================================
// PACKAGE AMOUNTS
// ============================================

const PACKAGE_AMOUNTS = [30, 60, 120, 240, 480, 960];

// ============================================
// NEW STAGE TIMER SCHEDULE
// ============================================
// Stage 1-5 = 0.2 days = 4.8 hours each
// Stage 6-7 = 0.5 days = 12 hours each
// Stage 8-14 = 3 days each
// Same schedule for every package
// ============================================

const DEFAULT_STAGE_DAYS = [
  0.2, // Stage 1
  0.2, // Stage 2
  0.2, // Stage 3
  0.2, // Stage 4
  0.2, // Stage 5

  0.5, // Stage 6
  0.5, // Stage 7

  3, // Stage 8
  3, // Stage 9
  3, // Stage 10
  3, // Stage 11
  3, // Stage 12
  3, // Stage 13
  3  // Stage 14
];

// ============================================
// GET STAGE DAYS
// ============================================

function getStageDays(packageAmount) {
  return [...DEFAULT_STAGE_DAYS];
}

// ============================================
// STAGE SCHEMA
// ============================================

const stageSchema = new mongoose.Schema({
  stageNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 14
  },

  durationDays: {
    type: Number,
    required: true,
    min: 0.01
  },

  status: {
    type: String,
    enum: [
      "LOCKED",
      "WAITING",
      "RUNNING",
      "PAUSED",
      "ACHIEVED"
    ],
    default: "LOCKED"
  },

  earningAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  earningStatus: {
    type: String,
    enum: [
      "NOT_RECORDED",
      "PENDING",
      "RECORDED"
    ],
    default: "NOT_RECORDED"
  },

  earningRecordedAt: {
    type: Date,
    default: null
  },

  withdrawnAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  startedAt: {
    type: Date,
    default: null
  },

  endsAt: {
    type: Date,
    default: null
  },

  pausedAt: {
    type: Date,
    default: null
  },

  completedAt: {
    type: Date,
    default: null
  },

  accumulatedPausedSeconds: {
    type: Number,
    default: 0,
    min: 0
  }

}, {
  _id: false
});

// ============================================
// PACKAGE SUBSCRIPTION SCHEMA
// ============================================

const packageSubscriptionSchema = new mongoose.Schema({

  userId: {
    type: Number,
    required: true,
    index: true
  },

  packageAmount: {
    type: Number,
    required: true,
    enum: PACKAGE_AMOUNTS
  },

  purchaseType: {
    type: String,
    enum: [
      "FIRST_PURCHASE",
      "UPGRADE",
      "REPEAT"
    ],
    required: true
  },

  cycleNumber: {
    type: Number,
    required: true,
    min: 1
  },

  status: {
    type: String,
    enum: [
      "PENDING",
      "ACTIVE",
      "PAUSED",
      "COMPLETED",
      "CANCELLED"
    ],
    default: "PENDING",
    index: true
  },

  purchasedAt: {
    type: Date,
    default: Date.now
  },

  activatedAt: {
    type: Date,
    default: null
  },

  completedAt: {
    type: Date,
    default: null
  },

  withdrawnAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  // Backward compatibility fields
  // Not used for stage eligibility

  accountingCapAmount: {
    type: Number,
    default: function () {
      return Number(this.packageAmount) * 2;
    },
    min: 0
  },

  recordedActivityAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  verifiedDirectCount: {
    type: Number,
    default: 0,
    min: 0
  },

  requiredDirectCount: {
    type: Number,
    default: 2,
    min: 2
  },

  currentStage: {
    type: Number,
    default: 1,
    min: 1,
    max: 14
  },

  // ============================================
  // STAGES
  // ============================================

  stages: {
    type: [stageSchema],

    default: function () {
      const stageDays =
        getStageDays(this.packageAmount);

      return stageDays.map((days, index) => ({
        stageNumber: index + 1,

        durationDays: days,

        status:
          index === 0
            ? "WAITING"
            : "LOCKED",

        earningAmount: 0,

        earningStatus:
          "NOT_RECORDED",

        earningRecordedAt: null,

        withdrawnAmount: 0,

        startedAt: null,

        endsAt: null,

        pausedAt: null,

        completedAt: null,

        accumulatedPausedSeconds: 0
      }));
    }
  },

  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    default: null
  },

  // ============================================
  // OLD STAGE 5 RETOPUP FIELDS
  // BACKWARD COMPATIBILITY ONLY
  // ============================================

  stage5RetopupAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  stage5RetopupPaidAt: {
    type: Date,
    default: null
  },

  stage5RetopupTransactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    default: null
  },

  stage5RetopupConfirmed: {
    type: Boolean,
    default: false
  },

  notes: {
    type: String,
    default: "",
    maxlength: 500
  }

}, {
  timestamps: true
});

// ============================================
// INDEXES
// ============================================

packageSubscriptionSchema.index({
  userId: 1,
  purchasedAt: -1
});

packageSubscriptionSchema.index(
  {
    userId: 1,
    packageAmount: 1,
    cycleNumber: 1
  },
  {
    unique: true
  }
);

packageSubscriptionSchema.index({
  status: 1,
  "stages.status": 1,
  "stages.endsAt": 1
});

packageSubscriptionSchema.index({
  userId: 1,
  "stages.earningStatus": 1
});

packageSubscriptionSchema.index({
  userId: 1,
  packageAmount: 1,
  status: 1,
  createdAt: -1
});

// ============================================
// MODEL
// ============================================

module.exports = mongoose.model(
  "PackageSubscription",
  packageSubscriptionSchema
);