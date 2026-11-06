
const mongoose = require("mongoose");

const royaltyRewardSchema = new mongoose.Schema(
  {
    
    userId: {
  type: Number,
  required: true,
  unique: true
},

    activationAt: {
      type: Date,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    directCount: {
      type: Number,
      default: 0,
      min: 0
    },

    rewardAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    rewardTier: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PAID",
        "NO_REWARD",
        "EXCLUDED"
      ],
      default: "PENDING",
      index: true
    },

    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null
    },

    processedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

 

module.exports = mongoose.model(
  "RoyaltyReward",
  royaltyRewardSchema
);
