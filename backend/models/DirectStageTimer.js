const mongoose = require("mongoose");

const directStageTimerSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      index: true
    },

    packageAmount: {
      type: Number,
      required: true
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
      default: 0
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

// Har user/package/stage ka sirf ek timer
directStageTimerSchema.index(
  {
    userId: 1,
    packageAmount: 1,
    stageNumber: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  "DirectStageTimer",
  directStageTimerSchema
);