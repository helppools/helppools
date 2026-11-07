
// const mongoose = require("mongoose");

// const demoCounterSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       default: "community",
//       unique: true
//     },

//     demoUsers: {
//       type: Number,
//       default: 0,
//       min: 0
//     },

//     enabled: {
//       type: Boolean,
//       default: false
//     },

//     incrementBy: {
//       type: Number,
//       default: 1,
//       min: 1
//     },

//     intervalMinutes: {
//       type: Number,
//       default: 60,
//       min: 1
//     },

//     lastIncrementAt: {
//       type: Date,
//       default: null
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("DemoCounter", demoCounterSchema);



const mongoose = require("mongoose");

const demoCounterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "community",
      unique: true
    },

    demoUsers: {
      type: Number,
      default: 0,
      min: 0
    },

    enabled: {
      type: Boolean,
      default: true
    },

    incrementBy: {
      type: Number,
      default: 1,
      min: 1
    },

    intervalMinutes: {
      type: Number,
      default: 15,
      min: 1
    },

    lastIncrementAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoCounter", demoCounterSchema);
