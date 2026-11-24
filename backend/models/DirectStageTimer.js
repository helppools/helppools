// const mongoose = require("mongoose");

// const directStageTimerSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: Number,
//       required: true,
//       index: true
//     },

//     packageAmount: {
//       type: Number,
//       required: true
//     },

//     stageNumber: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 14
//     },

//     requiredDirects: {
//       type: Number,
//       required: true
//     },

//     matchingDirects: {
//       type: Number,
//       default: 0
//     },

//     startedAt: {
//       type: Date,
//       default: null
//     },

//     endsAt: {
//       type: Date,
//       default: null
//     },

//     completed: {
//       type: Boolean,
//       default: false
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // Har user/package/stage ka sirf ek timer
// directStageTimerSchema.index(
//   {
//     userId: 1,
//     packageAmount: 1,
//     stageNumber: 1
//   },
//   {
//     unique: true
//   }
// );

// module.exports = mongoose.model(
//   "DirectStageTimer",
//   directStageTimerSchema
// );


const mongoose = require("mongoose");

const directStageTimerSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },

    packageAmount: {
      type: Number,
      required: true,
      enum: [30, 60, 120, 240, 480, 960]
    },

    stageNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 14
    },

    requiredDirects: {
      type: Number,
      required: true
    },

    matchingDirects: {
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

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// One timer per user + package + stage
directStageTimerSchema.index(
  {
    userId: 1,
    packageAmount: 1,
    stageNumber: 1
  },
  {
    unique: true,
    name: "userId_1_packageAmount_1_stageNumber_1"
  }
);

module.exports = mongoose.model(
  "DirectStageTimer",
  directStageTimerSchema
);
