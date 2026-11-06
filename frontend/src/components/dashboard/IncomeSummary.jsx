// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { 
// // // // // // // //   TrendingUp, Users, Trophy, Layers, Zap // 🔥 1. Zap icon add kiya
// // // // // // // // } from "lucide-react";

// // // // // // // // // ✅ Updated Config: Required Directs hata diya hai
// // // // // // // // const globalPoolConfig = {
// // // // // // // //   levels: [
// // // // // // // //     { level: 1, globalTeam: 20, earning: 10 },
// // // // // // // //     { level: 2, globalTeam: 40, earning: 20 },
// // // // // // // //     { level: 3, globalTeam: 100, earning: 40 },
// // // // // // // //     { level: 4, globalTeam: 200, earning: 80 },
// // // // // // // //     { level: 5, globalTeam: 400, earning: 150 },
// // // // // // // //     { level: 6, globalTeam: 1600, earning: 200 },
// // // // // // // //     { level: 7, globalTeam: 2000, earning: 500 },
// // // // // // // //     { level: 8, globalTeam: 3000, earning: 700 },
// // // // // // // //     { level: 9, globalTeam: 4000, earning: 1000 },
// // // // // // // //     { level: 10, globalTeam: 5000, earning: 1500 },
// // // // // // // //     { level: 11, globalTeam: 7500, earning: 3000 },
// // // // // // // //     { level: 12, globalTeam: 10000, earning: 5000 }
// // // // // // // //   ]
// // // // // // // // };

// // // // // // // // const IncomeSummary = ({ income = {}, user = {} }) => {
// // // // // // // //   const [globalGrowthIncome, setGlobalGrowthIncome] = useState(0); 

// // // // // // // //   const directIncome = Number(income.totalDirectIncome) || Number(income.directIncome) || 0;
// // // // // // // //   const levelIncome = Number(income.totalLevelIncome) || Number(income.levelIncome) || 0;
// // // // // // // //   const rewardIncome = Number(income.totalRewardIncome) || Number(income.rewardIncome) || Number(user.rewardIncome) || 0;
  
  
// // // // // // // //   // 🔥 2. Fast Track Income Extract Kiya
// // // // // // // //   const fastTrackIncome = Number(income.totalFastTrackIncome) || Number(income.fastTrackIncome) || 0;

// // // // // // // //   // 🔥 UPDATED CALCULATION: No Direct Check
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!user) return;
    
// // // // // // // //     const realGlobalTeamCount = Number(user?.globalTeamCount) || 0;
// // // // // // // //     let totalFrontendAchieved = 0;
// // // // // // // //     let cumulative = 0;

// // // // // // // //     globalPoolConfig.levels.forEach((lvl) => {
// // // // // // // //       cumulative += lvl.globalTeam; // Cumulative Target (20, 60, 160...)
      
// // // // // // // //       // ✅ Ab sirf Global Team Count check ho raha hai
// // // // // // // //       if (realGlobalTeamCount >= cumulative) {
// // // // // // // //         totalFrontendAchieved += lvl.earning;
// // // // // // // //       }
// // // // // // // //     });
    
// // // // // // // //     setGlobalGrowthIncome(totalFrontendAchieved);
// // // // // // // //   }, [user]);

// // // // // // // //   const cardData = [
// // // // // // // //     { label: "Community Earning", value: `$${globalGrowthIncome.toFixed(2)}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", glow: "bg-emerald-400/20" },
// // // // // // // //     { label: "Direct Earning", value: `$${directIncome.toFixed(2)}`, icon: Users, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", glow: "bg-amber-400/20" },
// // // // // // // //     { label: "Level Earning", value: `$${levelIncome.toFixed(2)}`, icon: Layers, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", glow: "bg-blue-400/20" },
// // // // // // // //     { label: "Team Reward", value: `$${rewardIncome.toFixed(2)}`, icon: Trophy, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", glow: "bg-indigo-400/20" },
// // // // // // // //     // 🔥 3. 5th Box for Fast Track
// // // // // // // //     { label: "Fast Track Bonus", value: `$${fastTrackIncome.toFixed(2)}`, icon: Zap, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", glow: "bg-violet-400/20" } 
// // // // // // // //   ];

// // // // // // // //   return (
// // // // // // // //     <div className="w-full">
// // // // // // // //       <div className="grid grid-cols-2 gap-3 md:gap-4">
// // // // // // // //         {cardData.map((item, index) => (
// // // // // // // //           <div key={index} className="relative overflow-hidden p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow duration-300 group shadow-sm">
// // // // // // // //             <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full ${item.glow} blur-[20px] opacity-50`}></div>
// // // // // // // //             <div className="relative z-10 flex flex-col h-full justify-between">
// // // // // // // //               <div className="flex items-center justify-between mb-3">
// // // // // // // //                 <div className={`p-2 rounded-lg ${item.bg} ${item.color} border ${item.border}`}>
// // // // // // // //                   <item.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //               <div>
// // // // // // // //                 <h3 className={`text-xl md:text-2xl font-black ${item.color} tracking-tight`}>
// // // // // // // //                   {item.value}
// // // // // // // //                 </h3>
// // // // // // // //                 <p className="text-black text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">
// // // // // // // //                   {item.label}
// // // // // // // //                 </p>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default IncomeSummary;



// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import {
// // // // // // //   TrendingUp,
// // // // // // //   Users,
// // // // // // //   Trophy,
// // // // // // //   Layers,
// // // // // // //   Zap
// // // // // // // } from "lucide-react";

// // // // // // // const globalPoolConfig = {
// // // // // // //   levels: [
// // // // // // //     { level: 1, globalTeam: 20, earning: 10 },
// // // // // // //     { level: 2, globalTeam: 40, earning: 20 },
// // // // // // //     { level: 3, globalTeam: 100, earning: 40 },
// // // // // // //     { level: 4, globalTeam: 200, earning: 80 },
// // // // // // //     { level: 5, globalTeam: 400, earning: 150 },
// // // // // // //     { level: 6, globalTeam: 1600, earning: 200 },
// // // // // // //     { level: 7, globalTeam: 2000, earning: 500 },
// // // // // // //     { level: 8, globalTeam: 3000, earning: 700 },
// // // // // // //     { level: 9, globalTeam: 4000, earning: 1000 },
// // // // // // //     { level: 10, globalTeam: 5000, earning: 1500 },
// // // // // // //     { level: 11, globalTeam: 7500, earning: 3000 },
// // // // // // //     { level: 12, globalTeam: 10000, earning: 5000 }
// // // // // // //   ]
// // // // // // // };

// // // // // // // const IncomeSummary = ({ income = {}, user = {} }) => {
// // // // // // //   const [globalGrowthIncome, setGlobalGrowthIncome] = useState(0);

// // // // // // //   const directIncome =
// // // // // // //     Number(income.totalDirectIncome) ||
// // // // // // //     Number(income.directIncome) || 0;

// // // // // // //   const levelIncome =
// // // // // // //     Number(income.totalLevelIncome) ||
// // // // // // //     Number(income.levelIncome) || 0;

// // // // // // //   const rewardIncome =
// // // // // // //     Number(income.totalRewardIncome) ||
// // // // // // //     Number(income.rewardIncome) ||
// // // // // // //     Number(user.rewardIncome) || 0;

// // // // // // //   const fastTrackIncome =
// // // // // // //     Number(income.totalFastTrackIncome) ||
// // // // // // //     Number(income.fastTrackIncome) || 0;

// // // // // // //   useEffect(() => {
// // // // // // //     if (!user) return;

// // // // // // //     const realGlobalTeamCount =
// // // // // // //       Number(user?.globalTeamCount) || 0;

// // // // // // //     let totalFrontendAchieved = 0;
// // // // // // //     let cumulative = 0;

// // // // // // //     globalPoolConfig.levels.forEach((lvl) => {
// // // // // // //       cumulative += lvl.globalTeam;

// // // // // // //       if (realGlobalTeamCount >= cumulative) {
// // // // // // //         totalFrontendAchieved += lvl.earning;
// // // // // // //       }
// // // // // // //     });

// // // // // // //     setGlobalGrowthIncome(totalFrontendAchieved);
// // // // // // //   }, [user]);

// // // // // // //   const formatAmount = (value) =>
// // // // // // //     `$${(Number(value) || 0).toFixed(2)}`;

// // // // // // //   const cardData = [
// // // // // // //     {
// // // // // // //       label: "Helping Pool Earning",
// // // // // // //       value: globalGrowthIncome,
// // // // // // //       icon: TrendingUp
// // // // // // //     },
// // // // // // //     {
// // // // // // //       label: "Direct Earning",
// // // // // // //       value: directIncome,
// // // // // // //       icon: Users
// // // // // // //     },
// // // // // // //     {
// // // // // // //       label: "Level Earning",
// // // // // // //       value: levelIncome,
// // // // // // //       icon: Layers
// // // // // // //     },
// // // // // // //     {
// // // // // // //       label: "Royalty Offer",
// // // // // // //       value: rewardIncome,
// // // // // // //       icon: Trophy
// // // // // // //     },
   
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       <style>{`
// // // // // // //         .hp-income-grid {
// // // // // // //           width: 100%;
// // // // // // //           display: grid;
// // // // // // //           grid-template-columns: repeat(5, minmax(0, 1fr));
// // // // // // //           gap: 9px;
// // // // // // //         }

// // // // // // //         .hp-income-card {
// // // // // // //           position: relative;
// // // // // // //           min-width: 0;
// // // // // // //           padding: 12px 13px;
// // // // // // //           overflow: hidden;
// // // // // // //           border-radius: 12px;
// // // // // // //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// // // // // // //           border: 1px solid #dcebdc;
// // // // // // //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// // // // // // //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// // // // // // //         }

// // // // // // //         .hp-income-card::before {
// // // // // // //           content: "";
// // // // // // //           position: absolute;
// // // // // // //           top: -27px;
// // // // // // //           right: -25px;
// // // // // // //           width: 75px;
// // // // // // //           height: 75px;
// // // // // // //           border-radius: 50%;
// // // // // // //           background: rgba(20, 145, 62, 0.07);
// // // // // // //           pointer-events: none;
// // // // // // //         }

// // // // // // //         .hp-income-card:hover {
// // // // // // //           transform: translateY(-2px);
// // // // // // //           border-color: #a9d4b2;
// // // // // // //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// // // // // // //         }

// // // // // // //         .hp-income-top {
// // // // // // //           position: relative;
// // // // // // //           z-index: 1;
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           justify-content: space-between;
// // // // // // //           margin-bottom: 9px;
// // // // // // //         }

// // // // // // //         .hp-income-icon {
// // // // // // //           width: 29px;
// // // // // // //           height: 29px;
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           justify-content: center;
// // // // // // //           border-radius: 9px;
// // // // // // //           background: #e7f5e9;
// // // // // // //           color: #087b35;
// // // // // // //           border: 1px solid #d4ead7;
// // // // // // //         }

// // // // // // //         .hp-income-gold-line {
// // // // // // //           width: 23px;
// // // // // // //           height: 3px;
// // // // // // //           border-radius: 10px;
// // // // // // //           background: #d4a735;
// // // // // // //         }

// // // // // // //         .hp-income-value {
// // // // // // //           position: relative;
// // // // // // //           z-index: 1;
// // // // // // //           margin: 0;
// // // // // // //           color: #087b35;
// // // // // // //           font-size: clamp(15px, 1.5vw, 21px);
// // // // // // //           line-height: 1.2;
// // // // // // //           font-weight: 900;
// // // // // // //           letter-spacing: -0.5px;
// // // // // // //           overflow-wrap: anywhere;
// // // // // // //         }

// // // // // // //         .hp-income-label {
// // // // // // //           position: relative;
// // // // // // //           z-index: 1;
// // // // // // //           margin: 5px 0 0;
// // // // // // //           color: #536b59;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 800;
// // // // // // //           line-height: 1.3;
// // // // // // //           letter-spacing: 0.35px;
// // // // // // //           text-transform: uppercase;
// // // // // // //           overflow-wrap: anywhere;
// // // // // // //         }

// // // // // // //         .hp-income-bottom {
// // // // // // //           width: 100%;
// // // // // // //           height: 2px;
// // // // // // //           margin-top: 10px;
// // // // // // //           border-radius: 10px;
// // // // // // //           background: linear-gradient(
// // // // // // //             90deg,
// // // // // // //             #0b843b 0%,
// // // // // // //             #d5ad43 65%,
// // // // // // //             #e8f1e8 100%
// // // // // // //           );
// // // // // // //         }

// // // // // // //         @media (max-width: 900px) {
// // // // // // //           .hp-income-grid {
// // // // // // //             grid-template-columns: repeat(3, minmax(0, 1fr));
// // // // // // //             gap: 8px;
// // // // // // //           }
// // // // // // //         }

// // // // // // //         @media (max-width: 600px) {
// // // // // // //           .hp-income-grid {
// // // // // // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // // // // // //             gap: 8px;
// // // // // // //           }

// // // // // // //           .hp-income-card {
// // // // // // //             padding: 10px;
// // // // // // //             border-radius: 11px;
// // // // // // //           }

// // // // // // //           .hp-income-value {
// // // // // // //             font-size: clamp(15px, 4vw, 19px);
// // // // // // //           }

// // // // // // //           .hp-income-label {
// // // // // // //             font-size: 8px;
// // // // // // //           }

// // // // // // //           .hp-income-icon {
// // // // // // //             width: 27px;
// // // // // // //             height: 27px;
// // // // // // //           }

// // // // // // //           .hp-income-icon svg {
// // // // // // //             width: 15px;
// // // // // // //             height: 15px;
// // // // // // //           }
// // // // // // //         }

// // // // // // //         @media (max-width: 350px) {
// // // // // // //           .hp-income-grid {
// // // // // // //             gap: 6px;
// // // // // // //           }

// // // // // // //           .hp-income-card {
// // // // // // //             padding: 9px;
// // // // // // //           }

// // // // // // //           .hp-income-value {
// // // // // // //             font-size: 14px;
// // // // // // //           }

// // // // // // //           .hp-income-label {
// // // // // // //             font-size: 7px;
// // // // // // //           }
// // // // // // //         }

// // // // // // //         @media (prefers-reduced-motion: reduce) {
// // // // // // //           .hp-income-card {
// // // // // // //             transition: none;
// // // // // // //           }
// // // // // // //         }
// // // // // // //       `}</style>

// // // // // // //       <div className="hp-income-grid">
// // // // // // //         {cardData.map((item) => {
// // // // // // //           const Icon = item.icon;

// // // // // // //           return (
// // // // // // //             <div
// // // // // // //               key={item.label}
// // // // // // //               className="hp-income-card"
// // // // // // //             >
// // // // // // //               <div className="hp-income-top">
// // // // // // //                 <div className="hp-income-icon">
// // // // // // //                   <Icon size={16} strokeWidth={2.5} />
// // // // // // //                 </div>

// // // // // // //                 <div className="hp-income-gold-line" />
// // // // // // //               </div>

// // // // // // //               <h3 className="hp-income-value">
// // // // // // //                 {formatAmount(item.value)}
// // // // // // //               </h3>

// // // // // // //               <p className="hp-income-label">
// // // // // // //                 {item.label}
// // // // // // //               </p>

// // // // // // //               <div className="hp-income-bottom" />
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //         })}
// // // // // // //       </div>
// // // // // // //     </>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default IncomeSummary;



// // // // // // import React from "react";
// // // // // // import {
// // // // // //   TrendingUp,
// // // // // //   Users,
// // // // // //   Layers,
// // // // // //   Wallet
// // // // // // } from "lucide-react";

// // // // // // const IncomeSummary = ({ income = {}, user = {} }) => {

// // // // // //   const helpingPoolIncome = Number(
// // // // // //     income.totalGlobalGrowthIncome ??
// // // // // //     income.poolIncome ??
// // // // // //     income.totalPoolIncome ??
// // // // // //     user.poolIncome ??
// // // // // //     0
// // // // // //   );

// // // // // //   const directIncome = Number(
// // // // // //     income.totalDirectIncome ??
// // // // // //     income.directIncome ??
// // // // // //     0
// // // // // //   );

// // // // // //   const levelIncome = Number(
// // // // // //     income.totalLevelIncome ??
// // // // // //     income.levelIncome ??
// // // // // //     0
// // // // // //   );

// // // // // //   const totalIncome =
// // // // // //     helpingPoolIncome +
// // // // // //     directIncome +
// // // // // //     levelIncome;

// // // // // //   const formatAmount = (value) =>
// // // // // //     `$${(Number(value) || 0).toFixed(2)}`;

// // // // // //   const cardData = [
// // // // // //     {
// // // // // //       label: "Helping Pool Income",
// // // // // //       value: helpingPoolIncome,
// // // // // //       icon: TrendingUp
// // // // // //     },
// // // // // //     {
// // // // // //       label: "Direct Income",
// // // // // //       value: directIncome,
// // // // // //       icon: Users
// // // // // //     },
// // // // // //     {
// // // // // //       label: "Level Income",
// // // // // //       value: levelIncome,
// // // // // //       icon: Layers
// // // // // //     },
// // // // // //     {
// // // // // //       label: "Total Income",
// // // // // //       value: totalIncome,
// // // // // //       icon: Wallet
// // // // // //     }
// // // // // //   ];

// // // // // //   return (
// // // // // //     <>
// // // // // //       <style>{`
// // // // // //         .hp-income-grid {
// // // // // //           width: 100%;
// // // // // //           display: grid;
// // // // // //           grid-template-columns: repeat(4, minmax(0, 1fr));
// // // // // //           gap: 9px;
// // // // // //         }

// // // // // //         .hp-income-card {
// // // // // //           position: relative;
// // // // // //           min-width: 0;
// // // // // //           padding: 12px 13px;
// // // // // //           overflow: hidden;
// // // // // //           border-radius: 12px;
// // // // // //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// // // // // //           border: 1px solid #dcebdc;
// // // // // //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// // // // // //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// // // // // //         }

// // // // // //         .hp-income-card::before {
// // // // // //           content: "";
// // // // // //           position: absolute;
// // // // // //           top: -27px;
// // // // // //           right: -25px;
// // // // // //           width: 75px;
// // // // // //           height: 75px;
// // // // // //           border-radius: 50%;
// // // // // //           background: rgba(20, 145, 62, 0.07);
// // // // // //           pointer-events: none;
// // // // // //         }

// // // // // //         .hp-income-card:hover {
// // // // // //           transform: translateY(-2px);
// // // // // //           border-color: #a9d4b2;
// // // // // //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// // // // // //         }

// // // // // //         .hp-income-top {
// // // // // //           position: relative;
// // // // // //           z-index: 1;
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: space-between;
// // // // // //           margin-bottom: 9px;
// // // // // //         }

// // // // // //         .hp-income-icon {
// // // // // //           width: 29px;
// // // // // //           height: 29px;
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: center;
// // // // // //           border-radius: 9px;
// // // // // //           background: #e7f5e9;
// // // // // //           color: #087b35;
// // // // // //           border: 1px solid #d4ead7;
// // // // // //         }

// // // // // //         .hp-income-gold-line {
// // // // // //           width: 23px;
// // // // // //           height: 3px;
// // // // // //           border-radius: 10px;
// // // // // //           background: #d4a735;
// // // // // //         }

// // // // // //         .hp-income-value {
// // // // // //           position: relative;
// // // // // //           z-index: 1;
// // // // // //           margin: 0;
// // // // // //           color: #087b35;
// // // // // //           font-size: clamp(15px, 1.5vw, 21px);
// // // // // //           line-height: 1.2;
// // // // // //           font-weight: 900;
// // // // // //           letter-spacing: -0.5px;
// // // // // //           overflow-wrap: anywhere;
// // // // // //         }

// // // // // //         .hp-income-label {
// // // // // //           position: relative;
// // // // // //           z-index: 1;
// // // // // //           margin: 5px 0 0;
// // // // // //           color: #536b59;
// // // // // //           font-size: 9px;
// // // // // //           font-weight: 800;
// // // // // //           line-height: 1.3;
// // // // // //           letter-spacing: 0.35px;
// // // // // //           text-transform: uppercase;
// // // // // //           overflow-wrap: anywhere;
// // // // // //         }

// // // // // //         .hp-income-bottom {
// // // // // //           width: 100%;
// // // // // //           height: 2px;
// // // // // //           margin-top: 10px;
// // // // // //           border-radius: 10px;
// // // // // //           background: linear-gradient(
// // // // // //             90deg,
// // // // // //             #0b843b 0%,
// // // // // //             #d5ad43 65%,
// // // // // //             #e8f1e8 100%
// // // // // //           );
// // // // // //         }

// // // // // //         @media (max-width: 900px) {
// // // // // //           .hp-income-grid {
// // // // // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // // // // //             gap: 8px;
// // // // // //           }
// // // // // //         }

// // // // // //         @media (max-width: 350px) {
// // // // // //           .hp-income-grid {
// // // // // //             gap: 6px;
// // // // // //           }

// // // // // //           .hp-income-card {
// // // // // //             padding: 9px;
// // // // // //           }

// // // // // //           .hp-income-value {
// // // // // //             font-size: 14px;
// // // // // //           }

// // // // // //           .hp-income-label {
// // // // // //             font-size: 7px;
// // // // // //           }
// // // // // //         }

// // // // // //         @media (prefers-reduced-motion: reduce) {
// // // // // //           .hp-income-card {
// // // // // //             transition: none;
// // // // // //           }
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       <div className="hp-income-grid">
// // // // // //         {cardData.map((item) => {
// // // // // //           const Icon = item.icon;

// // // // // //           return (
// // // // // //             <div
// // // // // //               key={item.label}
// // // // // //               className="hp-income-card"
// // // // // //             >
// // // // // //               <div className="hp-income-top">
// // // // // //                 <div className="hp-income-icon">
// // // // // //                   <Icon size={16} strokeWidth={2.5} />
// // // // // //                 </div>

// // // // // //                 <div className="hp-income-gold-line" />
// // // // // //               </div>

// // // // // //               <h3 className="hp-income-value">
// // // // // //                 {formatAmount(item.value)}
// // // // // //               </h3>

// // // // // //               <p className="hp-income-label">
// // // // // //                 {item.label}
// // // // // //               </p>

// // // // // //               <div className="hp-income-bottom" />
// // // // // //             </div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default IncomeSummary;



// // // // // import React, { useEffect } from "react";
// // // // // import {
// // // // //   TrendingUp,
// // // // //   Users,
// // // // //   Layers,
// // // // //   Wallet
// // // // // } from "lucide-react";

// // // // // const IncomeSummary = ({ income = {}, user = {} }) => {

// // // // //   // Convert income safely into a number
// // // // //   const getValidAmount = (...values) => {
// // // // //     for (const value of values) {
// // // // //       if (value !== undefined && value !== null && value !== "") {
// // // // //         const amount = Number(value);

// // // // //         if (Number.isFinite(amount)) {
// // // // //           return amount;
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     return 0;
// // // // //   };

// // // // //   // Helping Pool Income
// // // // //   const helpingPoolIncome = getValidAmount(
// // // // //     income.helpingPoolIncome,
// // // // //     income.totalGlobalGrowthIncome,
// // // // //     income.poolIncome,
// // // // //     income.totalPoolIncome,
// // // // //     user.poolIncome,
// // // // //     user.totalPoolIncome
// // // // //   );

// // // // //   // Direct Income
// // // // //   const directIncome = getValidAmount(
// // // // //     income.totalDirectIncome,
// // // // //     income.directIncome,
// // // // //     user.totalDirectIncome,
// // // // //     user.directIncome
// // // // //   );

// // // // //   // Level Income
// // // // //   const levelIncome = getValidAmount(
// // // // //     income.totalLevelIncome,
// // // // //     income.levelIncome,
// // // // //     user.totalLevelIncome,
// // // // //     user.levelIncome
// // // // //   );

// // // // //   // Total Income
// // // // //   const totalIncome =
// // // // //     helpingPoolIncome +
// // // // //     directIncome +
// // // // //     levelIncome;

// // // // //   const formatAmount = (value) =>
// // // // //     `$${(Number(value) || 0).toFixed(2)}`;

// // // // //   // Debug logs
// // // // //   useEffect(() => {
// // // // //     const debugData = {
// // // // //       "Helping Pool Income": helpingPoolIncome,
// // // // //       "Direct Income": directIncome,
// // // // //       "Level Income": levelIncome,
// // // // //       "Calculated Total Income": totalIncome
// // // // //     };

// // // // //     console.group("💰 HELPING POOLS - INCOME DEBUG");

// // // // //     console.log("Raw Income API Data:", income);
// // // // //     console.log("Raw User Data:", user);

// // // // //     console.table(debugData);

// // // // //     console.log("Helping Pool API Values:", {
// // // // //       helpingPoolIncome: income.helpingPoolIncome,
// // // // //       totalGlobalGrowthIncome: income.totalGlobalGrowthIncome,
// // // // //       poolIncome: income.poolIncome,
// // // // //       totalPoolIncome: income.totalPoolIncome,
// // // // //       userPoolIncome: user.poolIncome
// // // // //     });

// // // // //     console.log("Direct Income API Values:", {
// // // // //       totalDirectIncome: income.totalDirectIncome,
// // // // //       directIncome: income.directIncome,
// // // // //       userDirectIncome: user.directIncome
// // // // //     });

// // // // //     console.log("Level Income API Values:", {
// // // // //       totalLevelIncome: income.totalLevelIncome,
// // // // //       levelIncome: income.levelIncome,
// // // // //       userLevelIncome: user.levelIncome
// // // // //     });

// // // // //     if (
// // // // //       helpingPoolIncome === 0 &&
// // // // //       directIncome === 0 &&
// // // // //       levelIncome === 0
// // // // //     ) {
// // // // //       console.warn(
// // // // //         "⚠️ All income values are ZERO. Check API response and database fields."
// // // // //       );
// // // // //     } else {
// // // // //       console.log("✅ Income data received successfully.");
// // // // //     }

// // // // //     console.groupEnd();

// // // // //   }, [
// // // // //     income,
// // // // //     user,
// // // // //     helpingPoolIncome,
// // // // //     directIncome,
// // // // //     levelIncome,
// // // // //     totalIncome
// // // // //   ]);

// // // // //   const cardData = [
// // // // //     {
// // // // //       label: "Helping Pool Income",
// // // // //       value: helpingPoolIncome,
// // // // //       icon: TrendingUp
// // // // //     },
// // // // //     {
// // // // //       label: "Direct Income",
// // // // //       value: directIncome,
// // // // //       icon: Users
// // // // //     },
// // // // //     {
// // // // //       label: "Level Income",
// // // // //       value: levelIncome,
// // // // //       icon: Layers
// // // // //     },
// // // // //     {
// // // // //       label: "Total Income",
// // // // //       value: totalIncome,
// // // // //       icon: Wallet
// // // // //     }
// // // // //   ];

// // // // //   return (
// // // // //     <>
// // // // //       <style>{`
// // // // //         .hp-income-grid {
// // // // //           width: 100%;
// // // // //           display: grid;
// // // // //           grid-template-columns: repeat(4, minmax(0, 1fr));
// // // // //           gap: 9px;
// // // // //         }

// // // // //         .hp-income-card {
// // // // //           position: relative;
// // // // //           min-width: 0;
// // // // //           padding: 12px 13px;
// // // // //           overflow: hidden;
// // // // //           border-radius: 12px;
// // // // //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// // // // //           border: 1px solid #dcebdc;
// // // // //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// // // // //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// // // // //         }

// // // // //         .hp-income-card::before {
// // // // //           content: "";
// // // // //           position: absolute;
// // // // //           top: -27px;
// // // // //           right: -25px;
// // // // //           width: 75px;
// // // // //           height: 75px;
// // // // //           border-radius: 50%;
// // // // //           background: rgba(20, 145, 62, 0.07);
// // // // //           pointer-events: none;
// // // // //         }

// // // // //         .hp-income-card:hover {
// // // // //           transform: translateY(-2px);
// // // // //           border-color: #a9d4b2;
// // // // //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// // // // //         }

// // // // //         .hp-income-top {
// // // // //           position: relative;
// // // // //           z-index: 1;
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: space-between;
// // // // //           margin-bottom: 9px;
// // // // //         }

// // // // //         .hp-income-icon {
// // // // //           width: 29px;
// // // // //           height: 29px;
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           border-radius: 9px;
// // // // //           background: #e7f5e9;
// // // // //           color: #087b35;
// // // // //           border: 1px solid #d4ead7;
// // // // //         }

// // // // //         .hp-income-gold-line {
// // // // //           width: 23px;
// // // // //           height: 3px;
// // // // //           border-radius: 10px;
// // // // //           background: #d4a735;
// // // // //         }

// // // // //         .hp-income-value {
// // // // //           position: relative;
// // // // //           z-index: 1;
// // // // //           margin: 0;
// // // // //           color: #087b35;
// // // // //           font-size: clamp(15px, 1.5vw, 21px);
// // // // //           line-height: 1.2;
// // // // //           font-weight: 900;
// // // // //           letter-spacing: -0.5px;
// // // // //           overflow-wrap: anywhere;
// // // // //         }

// // // // //         .hp-income-label {
// // // // //           position: relative;
// // // // //           z-index: 1;
// // // // //           margin: 5px 0 0;
// // // // //           color: #536b59;
// // // // //           font-size: 9px;
// // // // //           font-weight: 800;
// // // // //           line-height: 1.3;
// // // // //           letter-spacing: 0.35px;
// // // // //           text-transform: uppercase;
// // // // //           overflow-wrap: anywhere;
// // // // //         }

// // // // //         .hp-income-bottom {
// // // // //           width: 100%;
// // // // //           height: 2px;
// // // // //           margin-top: 10px;
// // // // //           border-radius: 10px;
// // // // //           background: linear-gradient(
// // // // //             90deg,
// // // // //             #0b843b 0%,
// // // // //             #d5ad43 65%,
// // // // //             #e8f1e8 100%
// // // // //           );
// // // // //         }

// // // // //         @media (max-width: 900px) {
// // // // //           .hp-income-grid {
// // // // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // // // //             gap: 8px;
// // // // //           }
// // // // //         }

// // // // //         @media (max-width: 350px) {
// // // // //           .hp-income-grid {
// // // // //             gap: 6px;
// // // // //           }

// // // // //           .hp-income-card {
// // // // //             padding: 9px;
// // // // //           }

// // // // //           .hp-income-value {
// // // // //             font-size: 14px;
// // // // //           }

// // // // //           .hp-income-label {
// // // // //             font-size: 7px;
// // // // //           }
// // // // //         }

// // // // //         @media (prefers-reduced-motion: reduce) {
// // // // //           .hp-income-card {
// // // // //             transition: none;
// // // // //           }
// // // // //         }
// // // // //       `}</style>

// // // // //       <div className="hp-income-grid">
// // // // //         {cardData.map((item) => {
// // // // //           const Icon = item.icon;

// // // // //           return (
// // // // //             <div
// // // // //               key={item.label}
// // // // //               className="hp-income-card"
// // // // //             >
// // // // //               <div className="hp-income-top">
// // // // //                 <div className="hp-income-icon">
// // // // //                   <Icon size={16} strokeWidth={2.5} />
// // // // //                 </div>

// // // // //                 <div className="hp-income-gold-line" />
// // // // //               </div>

// // // // //               <h3 className="hp-income-value">
// // // // //                 {formatAmount(item.value)}
// // // // //               </h3>

// // // // //               <p className="hp-income-label">
// // // // //                 {item.label}
// // // // //               </p>

// // // // //               <div className="hp-income-bottom" />
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default IncomeSummary;



// // // // import React, { useEffect } from "react";
// // // // import {
// // // //   TrendingUp,
// // // //   Users,
// // // //   Layers,
// // // //   Wallet
// // // // } from "lucide-react";

// // // // const IncomeSummary = ({ income = {}, user = {} }) => {
// // // //   const getValidAmount = (...values) => {
// // // //     for (const value of values) {
// // // //       if (value !== undefined && value !== null && value !== "") {
// // // //         const amount = Number(value);

// // // //         if (Number.isFinite(amount)) {
// // // //           return amount;
// // // //         }
// // // //       }
// // // //     }

// // // //     return 0;
// // // //   };

// // // //   // Helping Pool = Package Stage Income
// // // //   const helpingPoolIncome = getValidAmount(
// // // //     income.totalPlanIncome,
// // // //     income.helpingPoolIncome,
// // // //     income.totalHelpingPoolIncome,
// // // //     user.totalPlanIncome,
// // // //     user.planIncome,
// // // //     income.planIncome
// // // //   );

// // // //   // Direct Income
// // // //   const directIncome = getValidAmount(
// // // //     income.totalDirectIncome,
// // // //     income.directIncome,
// // // //     user.totalDirectIncome,
// // // //     user.directIncome
// // // //   );

// // // //   // Level Income
// // // //   const levelIncome = getValidAmount(
// // // //     income.totalLevelIncome,
// // // //     income.levelIncome,
// // // //     user.totalLevelIncome,
// // // //     user.levelIncome
// // // //   );

// // // //   // Total Lifetime Income
// // // //   const totalIncome =
// // // //     helpingPoolIncome +
// // // //     directIncome +
// // // //     levelIncome;

// // // //   const formatAmount = (value) =>
// // // //     `$${(Number(value) || 0).toFixed(2)}`;

// // // //   useEffect(() => {
// // // //     console.group("💰 HELPING POOLS - INCOME DEBUG");

// // // //     console.log("Raw Income API Data:", income);
// // // //     console.log("Raw User Data:", user);

// // // //     console.table({
// // // //       "Helping Pool Income": helpingPoolIncome,
// // // //       "Direct Income": directIncome,
// // // //       "Level Income": levelIncome,
// // // //       "Calculated Total Income": totalIncome
// // // //     });

// // // //     console.log("Helping Pool Values:", {
// // // //       totalPlanIncome: income.totalPlanIncome,
// // // //       helpingPoolIncome: income.helpingPoolIncome,
// // // //       userTotalPlanIncome: user.totalPlanIncome,
// // // //       userPlanIncome: user.planIncome
// // // //     });

// // // //     console.log("Direct Income Values:", {
// // // //       totalDirectIncome: income.totalDirectIncome,
// // // //       directIncome: income.directIncome
// // // //     });

// // // //     console.log("Level Income Values:", {
// // // //       totalLevelIncome: income.totalLevelIncome,
// // // //       levelIncome: income.levelIncome
// // // //     });

// // // //     console.groupEnd();
// // // //   }, [
// // // //     income,
// // // //     user,
// // // //     helpingPoolIncome,
// // // //     directIncome,
// // // //     levelIncome,
// // // //     totalIncome
// // // //   ]);

// // // //   const cardData = [
// // // //     {
// // // //       label: "Helping Pool Income",
// // // //       value: helpingPoolIncome,
// // // //       icon: TrendingUp
// // // //     },
// // // //     {
// // // //       label: "Direct Income",
// // // //       value: directIncome,
// // // //       icon: Users
// // // //     },
// // // //     {
// // // //       label: "Level Income",
// // // //       value: levelIncome,
// // // //       icon: Layers
// // // //     },
// // // //     {
// // // //       label: "Total Income",
// // // //       value: totalIncome,
// // // //       icon: Wallet
// // // //     }
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .hp-income-grid {
// // // //           width: 100%;
// // // //           display: grid;
// // // //           grid-template-columns: repeat(4, minmax(0, 1fr));
// // // //           gap: 9px;
// // // //         }

// // // //         .hp-income-card {
// // // //           position: relative;
// // // //           min-width: 0;
// // // //           padding: 12px 13px;
// // // //           overflow: hidden;
// // // //           border-radius: 12px;
// // // //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// // // //           border: 1px solid #dcebdc;
// // // //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// // // //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// // // //         }

// // // //         .hp-income-card::before {
// // // //           content: "";
// // // //           position: absolute;
// // // //           top: -27px;
// // // //           right: -25px;
// // // //           width: 75px;
// // // //           height: 75px;
// // // //           border-radius: 50%;
// // // //           background: rgba(20, 145, 62, 0.07);
// // // //           pointer-events: none;
// // // //         }

// // // //         .hp-income-card:hover {
// // // //           transform: translateY(-2px);
// // // //           border-color: #a9d4b2;
// // // //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// // // //         }

// // // //         .hp-income-top {
// // // //           position: relative;
// // // //           z-index: 1;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           margin-bottom: 9px;
// // // //         }

// // // //         .hp-income-icon {
// // // //           width: 29px;
// // // //           height: 29px;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           border-radius: 9px;
// // // //           background: #e7f5e9;
// // // //           color: #087b35;
// // // //           border: 1px solid #d4ead7;
// // // //         }

// // // //         .hp-income-gold-line {
// // // //           width: 23px;
// // // //           height: 3px;
// // // //           border-radius: 10px;
// // // //           background: #d4a735;
// // // //         }

// // // //         .hp-income-value {
// // // //           position: relative;
// // // //           z-index: 1;
// // // //           margin: 0;
// // // //           color: #087b35;
// // // //           font-size: clamp(15px, 1.5vw, 21px);
// // // //           line-height: 1.2;
// // // //           font-weight: 900;
// // // //           letter-spacing: -0.5px;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-income-label {
// // // //           position: relative;
// // // //           z-index: 1;
// // // //           margin: 5px 0 0;
// // // //           color: #536b59;
// // // //           font-size: 9px;
// // // //           font-weight: 800;
// // // //           line-height: 1.3;
// // // //           letter-spacing: 0.35px;
// // // //           text-transform: uppercase;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-income-bottom {
// // // //           width: 100%;
// // // //           height: 2px;
// // // //           margin-top: 10px;
// // // //           border-radius: 10px;
// // // //           background: linear-gradient(
// // // //             90deg,
// // // //             #0b843b 0%,
// // // //             #d5ad43 65%,
// // // //             #e8f1e8 100%
// // // //           );
// // // //         }

// // // //         @media (max-width: 900px) {
// // // //           .hp-income-grid {
// // // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // // //             gap: 8px;
// // // //           }
// // // //         }

// // // //         @media (max-width: 350px) {
// // // //           .hp-income-grid {
// // // //             gap: 6px;
// // // //           }

// // // //           .hp-income-card {
// // // //             padding: 9px;
// // // //           }

// // // //           .hp-income-value {
// // // //             font-size: 14px;
// // // //           }

// // // //           .hp-income-label {
// // // //             font-size: 7px;
// // // //           }
// // // //         }

// // // //         @media (prefers-reduced-motion: reduce) {
// // // //           .hp-income-card {
// // // //             transition: none;
// // // //           }
// // // //         }
// // // //       `}</style>

// // // //       <div className="hp-income-grid">
// // // //         {cardData.map((item) => {
// // // //           const Icon = item.icon;

// // // //           return (
// // // //             <div key={item.label} className="hp-income-card">
// // // //               <div className="hp-income-top">
// // // //                 <div className="hp-income-icon">
// // // //                   <Icon size={16} strokeWidth={2.5} />
// // // //                 </div>

// // // //                 <div className="hp-income-gold-line" />
// // // //               </div>

// // // //               <h3 className="hp-income-value">
// // // //                 {formatAmount(item.value)}
// // // //               </h3>

// // // //               <p className="hp-income-label">
// // // //                 {item.label}
// // // //               </p>

// // // //               <div className="hp-income-bottom" />
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default IncomeSummary;



// // // import React, { useEffect } from "react";
// // // import {
// // //   TrendingUp,
// // //   Users,
// // //   Layers,
// // //   Wallet
// // // } from "lucide-react";

// // // const IncomeSummary = ({ income = {}, user = {} }) => {
// // //   const getValidAmount = (...values) => {
// // //     for (const value of values) {
// // //       if (value !== undefined && value !== null && value !== "") {
// // //         const amount = Number(value);

// // //         if (Number.isFinite(amount)) {
// // //           return amount;
// // //         }
// // //       }
// // //     }

// // //     return 0;
// // //   };

// // //   // Helping Pool = Package Stage Income
// // //   const helpingPoolIncome = getValidAmount(
// // //     income.totalPlanIncome,
// // //     income.helpingPoolIncome,
// // //     income.totalHelpingPoolIncome,
// // //     user.totalPlanIncome,
// // //     user.planIncome,
// // //     income.planIncome
// // //   );

// // //   // Direct Income
// // //   const directIncome = getValidAmount(
// // //     income.totalDirectIncome,
// // //     income.directIncome,
// // //     user.totalDirectIncome,
// // //     user.directIncome
// // //   );

// // //   // Level Income
// // //   const levelIncome = getValidAmount(
// // //     income.totalLevelIncome,
// // //     income.levelIncome,
// // //     user.totalLevelIncome,
// // //     user.levelIncome
// // //   );

// // //   // Total Lifetime Income
// // //   const totalIncome =
// // //     helpingPoolIncome +
// // //     directIncome +
// // //     levelIncome;

// // //   const formatAmount = (value) =>
// // //     `$${(Number(value) || 0).toFixed(2)}`;

// // //   useEffect(() => {
// // //     console.group("💰 HELPING POOLS - INCOME DEBUG");

// // //     console.log("Raw Income API Data:", income);
// // //     console.log("Raw User Data:", user);

// // //     console.table({
// // //       "Total Income": totalIncome,
// // //       "Helping Pool Income": helpingPoolIncome,
// // //       "Direct Income": directIncome,
// // //       "Level Income": levelIncome
// // //     });

// // //     console.log("Helping Pool Values:", {
// // //       totalPlanIncome: income.totalPlanIncome,
// // //       helpingPoolIncome: income.helpingPoolIncome,
// // //       userTotalPlanIncome: user.totalPlanIncome,
// // //       userPlanIncome: user.planIncome
// // //     });

// // //     console.log("Direct Income Values:", {
// // //       totalDirectIncome: income.totalDirectIncome,
// // //       directIncome: income.directIncome
// // //     });

// // //     console.log("Level Income Values:", {
// // //       totalLevelIncome: income.totalLevelIncome,
// // //       levelIncome: income.levelIncome
// // //     });

// // //     console.groupEnd();
// // //   }, [
// // //     income,
// // //     user,
// // //     helpingPoolIncome,
// // //     directIncome,
// // //     levelIncome,
// // //     totalIncome
// // //   ]);

// // //   // CARD ORDER: TOTAL → HELPING POOL → DIRECT → LEVEL
// // //   const cardData = [
// // //     {
// // //       label: "Total Income",
// // //       value: totalIncome,
// // //       icon: Wallet
// // //     },
// // //     {
// // //       label: "Helping Pool Income",
// // //       value: helpingPoolIncome,
// // //       icon: TrendingUp
// // //     },
// // //     {
// // //       label: "Direct Income",
// // //       value: directIncome,
// // //       icon: Users
// // //     },
// // //     {
// // //       label: "Level Income",
// // //       value: levelIncome,
// // //       icon: Layers
// // //     }
// // //   ];

// // //   return (
// // //     <>
// // //       <style>{`
// // //         .hp-income-grid {
// // //           width: 100%;
// // //           display: grid;
// // //           grid-template-columns: repeat(4, minmax(0, 1fr));
// // //           gap: 9px;
// // //         }

// // //         .hp-income-card {
// // //           position: relative;
// // //           min-width: 0;
// // //           padding: 12px 13px;
// // //           overflow: hidden;
// // //           border-radius: 12px;
// // //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// // //           border: 1px solid #dcebdc;
// // //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// // //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// // //         }

// // //         .hp-income-card::before {
// // //           content: "";
// // //           position: absolute;
// // //           top: -27px;
// // //           right: -25px;
// // //           width: 75px;
// // //           height: 75px;
// // //           border-radius: 50%;
// // //           background: rgba(20, 145, 62, 0.07);
// // //           pointer-events: none;
// // //         }

// // //         .hp-income-card:hover {
// // //           transform: translateY(-2px);
// // //           border-color: #a9d4b2;
// // //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// // //         }

// // //         .hp-income-top {
// // //           position: relative;
// // //           z-index: 1;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           margin-bottom: 9px;
// // //         }

// // //         .hp-income-icon {
// // //           width: 29px;
// // //           height: 29px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           border-radius: 9px;
// // //           background: #e7f5e9;
// // //           color: #087b35;
// // //           border: 1px solid #d4ead7;
// // //         }

// // //         .hp-income-gold-line {
// // //           width: 23px;
// // //           height: 3px;
// // //           border-radius: 10px;
// // //           background: #d4a735;
// // //         }

// // //         .hp-income-value {
// // //           position: relative;
// // //           z-index: 1;
// // //           margin: 0;
// // //           color: #087b35;
// // //           font-size: clamp(15px, 1.5vw, 21px);
// // //           line-height: 1.2;
// // //           font-weight: 900;
// // //           letter-spacing: -0.5px;
// // //           overflow-wrap: anywhere;
// // //         }

// // //         .hp-income-label {
// // //           position: relative;
// // //           z-index: 1;
// // //           margin: 5px 0 0;
// // //           color: #536b59;
// // //           font-size: 9px;
// // //           font-weight: 800;
// // //           line-height: 1.3;
// // //           letter-spacing: 0.35px;
// // //           text-transform: uppercase;
// // //           overflow-wrap: anywhere;
// // //         }

// // //         .hp-income-bottom {
// // //           width: 100%;
// // //           height: 2px;
// // //           margin-top: 10px;
// // //           border-radius: 10px;
// // //           background: linear-gradient(
// // //             90deg,
// // //             #0b843b 0%,
// // //             #d5ad43 65%,
// // //             #e8f1e8 100%
// // //           );
// // //         }

// // //         @media (max-width: 900px) {
// // //           .hp-income-grid {
// // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // //             gap: 8px;
// // //           }
// // //         }

// // //         @media (max-width: 350px) {
// // //           .hp-income-grid {
// // //             gap: 6px;
// // //           }

// // //           .hp-income-card {
// // //             padding: 9px;
// // //           }

// // //           .hp-income-value {
// // //             font-size: 14px;
// // //           }

// // //           .hp-income-label {
// // //             font-size: 7px;
// // //           }
// // //         }

// // //         @media (prefers-reduced-motion: reduce) {
// // //           .hp-income-card {
// // //             transition: none;
// // //           }
// // //         }
// // //       `}</style>

// // //       <div className="hp-income-grid">
// // //         {cardData.map((item) => {
// // //           const Icon = item.icon;

// // //           return (
// // //             <div key={item.label} className="hp-income-card">
// // //               <div className="hp-income-top">
// // //                 <div className="hp-income-icon">
// // //                   <Icon size={16} strokeWidth={2.5} />
// // //                 </div>

// // //                 <div className="hp-income-gold-line" />
// // //               </div>

// // //               <h3 className="hp-income-value">
// // //                 {formatAmount(item.value)}
// // //               </h3>

// // //               <p className="hp-income-label">
// // //                 {item.label}
// // //               </p>

// // //               <div className="hp-income-bottom" />
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default IncomeSummary;



// // import React from "react";
// // import {
// //   TrendingUp,
// //   Users,
// //   Layers,
// //   Wallet
// // } from "lucide-react";

// // const IncomeSummary = ({ income = {}, user = {} }) => {
// //   const getValidAmount = (...values) => {
// //     for (const value of values) {
// //       if (value !== undefined && value !== null && value !== "") {
// //         const amount = Number(value);

// //         if (Number.isFinite(amount)) {
// //           return amount;
// //         }
// //       }
// //     }

// //     return 0;
// //   };

// //   // Helping Pool Income
// //   const helpingPoolIncome = getValidAmount(
// //     income.totalPlanIncome,
// //     income.helpingPoolIncome,
// //     income.totalHelpingPoolIncome,
// //     user.totalPlanIncome,
// //     user.planIncome,
// //     income.planIncome
// //   );

// //   // Direct Income
// //   const directIncome = getValidAmount(
// //     income.totalDirectIncome,
// //     income.directIncome,
// //     user.totalDirectIncome,
// //     user.directIncome
// //   );

// //   // Level Income
// //   const levelIncome = getValidAmount(
// //     income.totalLevelIncome,
// //     income.levelIncome,
// //     user.totalLevelIncome,
// //     user.levelIncome
// //   );

// //   // Total Income
// //   const totalIncome =
// //     helpingPoolIncome +
// //     directIncome +
// //     levelIncome;

// //   const formatAmount = (value) =>
// //     `$${(Number(value) || 0).toFixed(2)}`;

// //   // CARD ORDER: TOTAL → HELPING POOL → DIRECT → LEVEL
// //   const cardData = [
// //     {
// //       label: "Total Income",
// //       value: totalIncome,
// //       icon: Wallet
// //     },
// //     {
// //       label: "Helping Pool Income",
// //       value: helpingPoolIncome,
// //       icon: TrendingUp
// //     },
// //     {
// //       label: "Direct Income",
// //       value: directIncome,
// //       icon: Users
// //     },
// //     {
// //       label: "Level Income",
// //       value: levelIncome,
// //       icon: Layers
// //     }
// //   ];

// //   return (
// //     <>
// //       <style>{`
// //         .hp-income-grid {
// //           width: 100%;
// //           display: grid;
// //           grid-template-columns: repeat(4, minmax(0, 1fr));
// //           gap: 9px;
// //         }

// //         .hp-income-card {
// //           position: relative;
// //           min-width: 0;
// //           padding: 12px 13px;
// //           overflow: hidden;
// //           border-radius: 12px;
// //           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
// //           border: 1px solid #dcebdc;
// //           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
// //           transition: transform 0.2s ease, box-shadow 0.2s ease;
// //         }

// //         .hp-income-card::before {
// //           content: "";
// //           position: absolute;
// //           top: -27px;
// //           right: -25px;
// //           width: 75px;
// //           height: 75px;
// //           border-radius: 50%;
// //           background: rgba(20, 145, 62, 0.07);
// //           pointer-events: none;
// //         }

// //         .hp-income-card:hover {
// //           transform: translateY(-2px);
// //           border-color: #a9d4b2;
// //           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
// //         }

// //         .hp-income-top {
// //           position: relative;
// //           z-index: 1;
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           margin-bottom: 9px;
// //         }

// //         .hp-income-icon {
// //           width: 29px;
// //           height: 29px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           border-radius: 9px;
// //           background: #e7f5e9;
// //           color: #087b35;
// //           border: 1px solid #d4ead7;
// //         }

// //         .hp-income-gold-line {
// //           width: 23px;
// //           height: 3px;
// //           border-radius: 10px;
// //           background: #d4a735;
// //         }

// //         .hp-income-value {
// //           position: relative;
// //           z-index: 1;
// //           margin: 0;
// //           color: #087b35;
// //           font-size: clamp(15px, 1.5vw, 21px);
// //           line-height: 1.2;
// //           font-weight: 900;
// //           letter-spacing: -0.5px;
// //           overflow-wrap: anywhere;
// //         }

// //         .hp-income-label {
// //           position: relative;
// //           z-index: 1;
// //           margin: 5px 0 0;
// //           color: #536b59;
// //           font-size: 9px;
// //           font-weight: 800;
// //           line-height: 1.3;
// //           letter-spacing: 0.35px;
// //           text-transform: uppercase;
// //           overflow-wrap: anywhere;
// //         }

// //         .hp-income-bottom {
// //           width: 100%;
// //           height: 2px;
// //           margin-top: 10px;
// //           border-radius: 10px;
// //           background: linear-gradient(
// //             90deg,
// //             #0b843b 0%,
// //             #d5ad43 65%,
// //             #e8f1e8 100%
// //           );
// //         }

// //         @media (max-width: 900px) {
// //           .hp-income-grid {
// //             grid-template-columns: repeat(2, minmax(0, 1fr));
// //             gap: 8px;
// //           }
// //         }

// //         @media (max-width: 350px) {
// //           .hp-income-grid {
// //             gap: 6px;
// //           }

// //           .hp-income-card {
// //             padding: 9px;
// //           }

// //           .hp-income-value {
// //             font-size: 14px;
// //           }

// //           .hp-income-label {
// //             font-size: 7px;
// //           }
// //         }

// //         @media (prefers-reduced-motion: reduce) {
// //           .hp-income-card {
// //             transition: none;
// //           }
// //         }
// //       `}</style>

// //       <div className="hp-income-grid">
// //         {cardData.map((item) => {
// //           const Icon = item.icon;

// //           return (
// //             <div key={item.label} className="hp-income-card">
// //               <div className="hp-income-top">
// //                 <div className="hp-income-icon">
// //                   <Icon size={16} strokeWidth={2.5} />
// //                 </div>

// //                 <div className="hp-income-gold-line" />
// //               </div>

// //               <h3 className="hp-income-value">
// //                 {formatAmount(item.value)}
// //               </h3>

// //               <p className="hp-income-label">
// //                 {item.label}
// //               </p>

// //               <div className="hp-income-bottom" />
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </>
// //   );
// // };

// // export default IncomeSummary;




// import React from "react";
// import {
//   TrendingUp,
//   Users,
//   Layers,
//   Wallet,
//   RefreshCw
// } from "lucide-react";

// const IncomeSummary = ({ income = {}, user = {} }) => {
//   const getValidAmount = (...values) => {
//     for (const value of values) {
//       if (value !== undefined && value !== null && value !== "") {
//         const amount = Number(value);

//         if (Number.isFinite(amount)) {
//           return amount;
//         }
//       }
//     }

//     return 0;
//   };

//   // Helping Pool Income
//   const helpingPoolIncome = getValidAmount(
//     income.totalPlanIncome,
//     income.helpingPoolIncome,
//     income.totalHelpingPoolIncome,
//     user.totalPlanIncome,
//     user.planIncome,
//     income.planIncome
//   );

//   // Direct Income
//   const directIncome = getValidAmount(
//     income.totalDirectIncome,
//     income.directIncome,
//     user.totalDirectIncome,
//     user.directIncome
//   );

//   // Recycle Direct Income
//   const recycleDirectIncome = getValidAmount(
//     income.totalRecycleDirectIncome,
//     income.recycleDirectIncome,
//     income.recycledDirectIncome,
//     income.recycleIncome,
//     user.totalRecycleDirectIncome,
//     user.recycleDirectIncome,
//     user.recycledDirectIncome,
//     user.recycleIncome
//   );

//   // Level Income
//   // const levelIncome = getValidAmount(
//   //   income.totalLevelIncome,
//   //   income.levelIncome,
//   //   user.totalLevelIncome,
//   //   user.levelIncome
//   // );

//   // Level Income
// const levelIncome = getValidAmount(
//   user.totalLevelIncome,
//   user.levelIncome,
//   income.totalLevelIncome,
//   income.levelIncome
// );
//   // Total Income
//   const totalIncome =
//     helpingPoolIncome +
//     directIncome +
//     recycleDirectIncome +
//     levelIncome;

//   const formatAmount = (value) =>
//     `$${(Number(value) || 0).toFixed(2)}`;

//   // CARD ORDER
//   const cardData = [
//     {
//       label: "Total Income",
//       value: totalIncome,
//       icon: Wallet
//     },
//     {
//       label: "Helping Pool Income",
//       value: helpingPoolIncome,
//       icon: TrendingUp
//     },
//     {
//       label: "Direct Income",
//       value: directIncome,
//       icon: Users
//     },
//     {
//       label: "Recycle Direct Income",
//       value: recycleDirectIncome,
//       icon: RefreshCw
//     },
//     {
//       label: "Level Income",
//       value: levelIncome,
//       icon: Layers
//     }
//   ];

//   return (
//     <>
//       <style>{`
//         .hp-income-grid {
//           width: 100%;
//           display: grid;
//           grid-template-columns: repeat(4, minmax(0, 1fr));
//           gap: 9px;
//         }

//         .hp-income-card {
//           position: relative;
//           min-width: 0;
//           padding: 12px 13px;
//           overflow: hidden;
//           border-radius: 12px;
//           background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
//           border: 1px solid #dcebdc;
//           box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         .hp-income-card::before {
//           content: "";
//           position: absolute;
//           top: -27px;
//           right: -25px;
//           width: 75px;
//           height: 75px;
//           border-radius: 50%;
//           background: rgba(20, 145, 62, 0.07);
//           pointer-events: none;
//         }

//         .hp-income-card:hover {
//           transform: translateY(-2px);
//           border-color: #a9d4b2;
//           box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
//         }

//         .hp-income-top {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 9px;
//         }

//         .hp-income-icon {
//           width: 29px;
//           height: 29px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 9px;
//           background: #e7f5e9;
//           color: #087b35;
//           border: 1px solid #d4ead7;
//         }

//         .hp-income-gold-line {
//           width: 23px;
//           height: 3px;
//           border-radius: 10px;
//           background: #d4a735;
//         }

//         .hp-income-value {
//           position: relative;
//           z-index: 1;
//           margin: 0;
//           color: #087b35;
//           font-size: clamp(15px, 1.5vw, 21px);
//           line-height: 1.2;
//           font-weight: 900;
//           letter-spacing: -0.5px;
//           overflow-wrap: anywhere;
//         }

//         .hp-income-label {
//           position: relative;
//           z-index: 1;
//           margin: 5px 0 0;
//           color: #536b59;
//           font-size: 9px;
//           font-weight: 800;
//           line-height: 1.3;
//           letter-spacing: 0.35px;
//           text-transform: uppercase;
//           overflow-wrap: anywhere;
//         }

//         .hp-income-bottom {
//           width: 100%;
//           height: 2px;
//           margin-top: 10px;
//           border-radius: 10px;
//           background: linear-gradient(
//             90deg,
//             #0b843b 0%,
//             #d5ad43 65%,
//             #e8f1e8 100%
//           );
//         }

//         @media (max-width: 900px) {
//           .hp-income-grid {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//             gap: 8px;
//           }
//         }

//         @media (max-width: 350px) {
//           .hp-income-grid {
//             gap: 6px;
//           }

//           .hp-income-card {
//             padding: 9px;
//           }

//           .hp-income-value {
//             font-size: 14px;
//           }

//           .hp-income-label {
//             font-size: 7px;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .hp-income-card {
//             transition: none;
//           }
//         }
//       `}</style>

//       <div className="hp-income-grid">
//         {cardData.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div key={item.label} className="hp-income-card">
//               <div className="hp-income-top">
//                 <div className="hp-income-icon">
//                   <Icon size={16} strokeWidth={2.5} />
//                 </div>

//                 <div className="hp-income-gold-line" />
//               </div>

//               <h3 className="hp-income-value">
//                 {formatAmount(item.value)}
//               </h3>

//               <p className="hp-income-label">
//                 {item.label}
//               </p>

//               <div className="hp-income-bottom" />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default IncomeSummary;



import React from "react";
import {
  TrendingUp,
  Users,
  Layers,
  Wallet,
  RefreshCw,
  Crown
} from "lucide-react";

const IncomeSummary = ({ income = {}, user = {} }) => {
  const getValidAmount = (...values) => {
    for (const value of values) {
      if (value !== undefined && value !== null && value !== "") {
        const amount = Number(value);

        if (Number.isFinite(amount)) {
          return amount;
        }
      }
    }

    return 0;
  };

  const isLeader =
    String(user.role || "").toLowerCase() === "leader";

  // Helping Pool Income
  const helpingPoolIncome = getValidAmount(
    income.totalPlanIncome,
    income.helpingPoolIncome,
    income.totalHelpingPoolIncome,
    user.totalPlanIncome,
    user.planIncome,
    income.planIncome
  );

  // Direct Income
  const directIncome = getValidAmount(
    income.totalDirectIncome,
    income.directIncome,
    user.totalDirectIncome,
    user.directIncome
  );

  // Recycle Direct Income
  const recycleDirectIncome = getValidAmount(
    income.totalRecycleDirectIncome,
    income.recycleDirectIncome,
    income.recycledDirectIncome,
    income.recycleIncome,
    user.totalRecycleDirectIncome,
    user.recycleDirectIncome,
    user.recycledDirectIncome,
    user.recycleIncome
  );

  // Level Income
  const levelIncome = getValidAmount(
    user.totalLevelIncome,
    user.levelIncome,
    income.totalLevelIncome,
    income.levelIncome
  );

  // Royalty Income
  // Leader role is excluded from Royalty payout.
  const royaltyIncome = isLeader
    ? 0
    : getValidAmount(
        user.totalRoyaltyIncome,
        user.royaltyIncome,
        income.totalRoyaltyIncome,
        income.royaltyIncome
      );

  // Total Income
  const totalIncome =
    helpingPoolIncome +
    directIncome +
    recycleDirectIncome +
    levelIncome +
    royaltyIncome;

  const formatAmount = (value) =>
    `$${(Number(value) || 0).toFixed(2)}`;

  // CARD ORDER
  const cardData = [
    {
      label: "Total Income",
      value: totalIncome,
      icon: Wallet
    },
    {
      label: "Helping Pool Income",
      value: helpingPoolIncome,
      icon: TrendingUp
    },
    {
      label: "Direct Income",
      value: directIncome,
      icon: Users
    },
    {
      label: "Recycle Direct Income",
      value: recycleDirectIncome,
      icon: RefreshCw
    },
    {
      label: "Level Income",
      value: levelIncome,
      icon: Layers
    },
    {
      label: "Royalty Income",
      value: royaltyIncome,
      icon: Crown
    }
  ];

  return (
    <>
      <style>{`
        .hp-income-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 9px;
        }

        .hp-income-card {
          position: relative;
          min-width: 0;
          padding: 12px 13px;
          overflow: hidden;
          border-radius: 12px;
          background: linear-gradient(145deg, #ffffff 0%, #f3faf4 100%);
          border: 1px solid #dcebdc;
          box-shadow: 0 2px 8px rgba(12, 90, 43, 0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hp-income-card::before {
          content: "";
          position: absolute;
          top: -27px;
          right: -25px;
          width: 75px;
          height: 75px;
          border-radius: 50%;
          background: rgba(20, 145, 62, 0.07);
          pointer-events: none;
        }

        .hp-income-card:hover {
          transform: translateY(-2px);
          border-color: #a9d4b2;
          box-shadow: 0 5px 13px rgba(12, 90, 43, 0.10);
        }

        .hp-income-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 9px;
        }

        .hp-income-icon {
          width: 29px;
          height: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #e7f5e9;
          color: #087b35;
          border: 1px solid #d4ead7;
        }

        .hp-income-gold-line {
          width: 23px;
          height: 3px;
          border-radius: 10px;
          background: #d4a735;
        }

        .hp-income-value {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #087b35;
          font-size: clamp(15px, 1.5vw, 21px);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.5px;
          overflow-wrap: anywhere;
        }

        .hp-income-label {
          position: relative;
          z-index: 1;
          margin: 5px 0 0;
          color: #536b59;
          font-size: 9px;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: 0.35px;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .hp-income-bottom {
          width: 100%;
          height: 2px;
          margin-top: 10px;
          border-radius: 10px;
          background: linear-gradient(
            90deg,
            #0b843b 0%,
            #d5ad43 65%,
            #e8f1e8 100%
          );
        }

        @media (max-width: 900px) {
          .hp-income-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
        }

        @media (max-width: 350px) {
          .hp-income-grid {
            gap: 6px;
          }

          .hp-income-card {
            padding: 9px;
          }

          .hp-income-value {
            font-size: 14px;
          }

          .hp-income-label {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-income-card {
            transition: none;
          }
        }
      `}</style>

      <div className="hp-income-grid">
        {cardData.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="hp-income-card">
              <div className="hp-income-top">
                <div className="hp-income-icon">
                  <Icon size={16} strokeWidth={2.5} />
                </div>

                <div className="hp-income-gold-line" />
              </div>

              <h3 className="hp-income-value">
                {formatAmount(item.value)}
              </h3>

              <p className="hp-income-label">
                {item.label}
              </p>

              <div className="hp-income-bottom" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IncomeSummary;
