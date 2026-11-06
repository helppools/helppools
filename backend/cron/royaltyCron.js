
const cron = require("node-cron");
const {
  processRoyaltyRewards
} = require("../services/royaltyService");

let isRunning = false;

async function runRoyaltyCron() {
  if (isRunning) return;

  isRunning = true;

  try {
    await processRoyaltyRewards();
  } catch (error) {
    console.error("[Royalty Cron] Error:", error);
  } finally {
    isRunning = false;
  }
}

function startRoyaltyCron() {
  // Run only on PM2 cluster instance 0.
  if (
    process.env.NODE_APP_INSTANCE &&
    process.env.NODE_APP_INSTANCE !== "0"
  ) {
    return;
  }

  cron.schedule(
    "* * * * *",
    runRoyaltyCron,
    { timezone: "Asia/Kolkata" }
  );

  console.log("[Royalty] Cron started");

  runRoyaltyCron();
}

module.exports = {
  startRoyaltyCron,
  runRoyaltyCron
};
