
const mongoose = require("mongoose");

const leaderPackageActivationHistorySchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    leaderName: { type: String, default: "" },
    leaderEmail: { type: String, default: "" },

    packageAmount: { type: Number, default: 60 },
    activationType: { type: String, default: "FREE_ADMIN_UPGRADE" },
    status: { type: String, default: "SUCCESS" },

    adminId: { type: String, default: "" },
    adminName: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

leaderPackageActivationHistorySchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "LeaderPackageActivationHistory",
  leaderPackageActivationHistorySchema
);
