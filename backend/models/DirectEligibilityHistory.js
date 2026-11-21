const mongoose = require("mongoose");

const directEligibilityHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },

    requiredDirects: {
      type: Number,
      default: 2
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

module.exports = mongoose.model(
  "DirectEligibilityHistory",
  directEligibilityHistorySchema
);