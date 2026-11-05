// // // C:\Users\HP\Desktop\Cryptocommunity\backend\utils\sanitizeUser.js

// // module.exports = function sanitizeUser(user) {
// //   if (!user) return null;

// //   return {
// //     userId: user.userId,
// //     name: user.name,
// //     email: user.email,
// //     mobile: user.mobile, 
// //     role: user.role,
// //     sponsorId: user.sponsorId,
    
// //     // 🛡️ WALLET & SECURITY
// //     walletAddress: user.walletAddress || "", 
// //     walletAddressChangeCount: user.walletAddressChangeCount || 0,
// //     walletAddressChangeWindowStart: user.walletAddressChangeWindowStart,
// //     walletAddressHistory: user.walletAddressHistory || [], 
// //     pendingWithdrawals: user.pendingWithdrawals || 0,

// //     // 💰 WALLET BALANCES
// //     walletBalance: user.walletBalance || 0,
// //     usdtBep20Balance: user.usdtBep20Balance || 0, 
// //     directIncome: user.directIncome || 0,
// //     levelIncome: user.levelIncome || 0,
// //     totalLevelIncome: user.totalLevelIncome || 0, 
// //     poolIncome: user.poolIncome || 0,
// //     rewardIncome: user.rewardIncome || 0,
// //     totalWithdrawn: user.totalWithdrawn || 0,

// //     // 🔥 NAYA: STAKING INCOMES YAHAN ADD KI HAIN 🔥
// //     cctStakingIncome: user.cctStakingIncome || 0,
// //     cctStakingDirectIncome: user.cctStakingDirectIncome || 0,
// //     cctStakingLevelIncome: user.cctStakingLevelIncome || 0,

// //     // 🚀 TOPUP & STATUS
// //     isToppedUp: user.isToppedUp,
// //     topUpAmount: user.topUpAmount,
// //     topUpDate: user.topUpDate,
// //     hasTopup: user.hasTopup,
// //     levelStatus: user.levelStatus,
// //     isTelegramJoined: user.isTelegramJoined,

// //     // 👥 TEAM DATA
// //     globalTeamCount: user.globalTeamCount || 0,
// //     directCount: user.directCount || 0,

// //     // 🌊 POOL DATA 
// //     activePools: user.activePools || [] 
// //   };
// // };

// // C:\Users\HP\Desktop\Cryptocommunity\backend\utils\sanitizeUser.js

// module.exports = function sanitizeUser(user) {
//   if (!user) return null;

//   return {
//     userId: user.userId,
//     name: user.name,
//     email: user.email,
//     mobile: user.mobile, 
//     role: user.role,
//     sponsorId: user.sponsorId,
    
//     // 🛡️ WALLET & SECURITY
//     walletAddress: user.walletAddress || "", 
//     walletAddressChangeCount: user.walletAddressChangeCount || 0,
//     walletAddressChangeWindowStart: user.walletAddressChangeWindowStart,
//     walletAddressHistory: user.walletAddressHistory || [], 
//     pendingWithdrawals: user.pendingWithdrawals || 0,

//     // 💰 WALLET BALANCES
//     walletBalance: user.walletBalance || 0,
//     usdtBep20Balance: user.usdtBep20Balance || 0, 
//     directIncome: user.directIncome || 0,
//     levelIncome: user.levelIncome || 0,
//     totalLevelIncome: user.totalLevelIncome || 0, 
//     poolIncome: user.poolIncome || 0,
//     rewardIncome: user.rewardIncome || 0,
//     totalWithdrawn: user.totalWithdrawn || 0,

//     // 🔥 NAYA: STAKING INCOMES YAHAN ADD KI HAIN 🔥
//     cctStakingIncome: user.cctStakingIncome || 0,
//     cctStakingDirectIncome: user.cctStakingDirectIncome || 0,
//     cctStakingLevelIncome: user.cctStakingLevelIncome || 0,

//     // 🚀 TOPUP & STATUS
//     isToppedUp: user.isToppedUp,
//     topUpAmount: user.topUpAmount,
//     topUpDate: user.topUpDate,
//     hasTopup: user.hasTopup,
//     levelStatus: user.levelStatus,
//     isTelegramJoined: user.isTelegramJoined,

//     // 👥 TEAM DATA
//     globalTeamCount: user.globalTeamCount || 0,
//     directCount: user.directCount || 0,
    
//     // 🔥 YEH LINE ADD KARNI HAI 🔥
//     levelActiveCounts: user.levelActiveCounts || {}, 

//     // 🌊 POOL DATA 
//     activePools: user.activePools || [] 
//   };
// };


const sanitizeUser = (user) => {
  if (!user) return null;

  const data = user.toObject
    ? user.toObject()
    : { ...user };

  return {
    ...data,

    // Wallet balances
    walletBalance: Number(data.walletBalance) || 0,
    usdtBep20Balance: Number(data.usdtBep20Balance) || 0,

    // Income balances
    directIncome: Number(data.directIncome) || 0,
    levelIncome: Number(data.levelIncome) || 0,
    totalLevelIncome: Number(data.totalLevelIncome) || 0,
    planIncome: Number(data.planIncome) || 0,
    rewardIncome: Number(data.rewardIncome) || 0,
    poolIncome: Number(data.poolIncome) || 0,
    totalWithdrawn: Number(data.totalWithdrawn) || 0,

    // CCT staking income
    cctStakingIncome: Number(data.cctStakingIncome) || 0,
    cctStakingDirectIncome:
      Number(data.cctStakingDirectIncome) || 0,
    cctStakingLevelIncome:
      Number(data.cctStakingLevelIncome) || 0
  };
};

module.exports = sanitizeUser;