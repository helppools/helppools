// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import { useAuth } from "../../context/AuthContext";
// // // // // // // // // import { CheckCircle, Lock, Users, UserPlus, Globe2, AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";

// // // // // // // // // // ✅ Clean & Simple Theme
// // // // // // // // // const customStyles = `
// // // // // // // // //   .bg-grid-light {
// // // // // // // // //     background-color: transparent;
// // // // // // // // //     background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
// // // // // // // // //                       linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
// // // // // // // // //     background-size: 30px 30px;
// // // // // // // // //   }
// // // // // // // // //   .glass-table-wrapper {
// // // // // // // // //     background: rgba(255, 255, 255, 0.95);
// // // // // // // // //     backdrop-filter: blur(12px);
// // // // // // // // //   }
// // // // // // // // //   .glass-row {
// // // // // // // // //     transition: all 0.3s ease;
// // // // // // // // //   }
// // // // // // // // //   .glass-row:hover {
// // // // // // // // //     background: rgba(248, 250, 252, 1); /* Very light hover */
// // // // // // // // //   }
// // // // // // // // //   /* ✅ Achieved/Filled Pool Row Custom Green Style */
// // // // // // // // //   .achieved-row {
// // // // // // // // //     background-color: #ecfdf5 !important; /* Tailwind emerald-50 */
// // // // // // // // //     border-left: 4px solid #10b981 !important; /* Emerald 500 border */
// // // // // // // // //   }
// // // // // // // // //   .achieved-row:hover {
// // // // // // // // //     background-color: #d1fae5 !important; /* Tailwind emerald-100 on hover */
// // // // // // // // //   }
// // // // // // // // // `;

// // // // // // // // // // ✅ Complete $12,200 Global Pool Plan
// // // // // // // // // const globalPoolConfig = {
// // // // // // // // //   totalTarget: 12200,
// // // // // // // // //   levels: [
// // // // // // // // //     { level: 1,  globalTeam: 20,    requiredDirects: 1,  displayDirects: 1, daily: 1,  days: 10,  earning: 10   }, 
// // // // // // // // //     { level: 2,  globalTeam: 40,    requiredDirects: 2,  displayDirects: 1, daily: 1,  days: 20,  earning: 20   }, 
// // // // // // // // //     { level: 3,  globalTeam: 100,   requiredDirects: 3,  displayDirects: 1, daily: 1,  days: 40,  earning: 40   }, 
// // // // // // // // //     { level: 4,  globalTeam: 200,   requiredDirects: 4,  displayDirects: 1, daily: 1,  days: 80,  earning: 80   }, 
// // // // // // // // //     { level: 5,  globalTeam: 400,   requiredDirects: 5,  displayDirects: 1, daily: 1,  days: 150, earning: 150  }, 
// // // // // // // // //     { level: 6,  globalTeam: 1600,  requiredDirects: 6,  displayDirects: 1, daily: 1,  days: 200, earning: 200  }, 
// // // // // // // // //     { level: 7,  globalTeam: 2000,  requiredDirects: 8,  displayDirects: 2, daily: 2,  days: 250, earning: 500  }, 
// // // // // // // // //     { level: 8,  globalTeam: 3000,  requiredDirects: 10, displayDirects: 2, daily: 2,  days: 350, earning: 700  }, 
// // // // // // // // //     { level: 9,  globalTeam: 4000,  requiredDirects: 12, displayDirects: 2, daily: 2,  days: 500, earning: 1000 }, 
// // // // // // // // //     { level: 10, globalTeam: 5000,  requiredDirects: 14, displayDirects: 2, daily: 3,  days: 500, earning: 1500 }, 
// // // // // // // // //     { level: 11, globalTeam: 7500,  requiredDirects: 16, displayDirects: 2, daily: 6,  days: 500, earning: 3000 }, 
// // // // // // // // //     { level: 12, globalTeam: 10000, requiredDirects: 18, displayDirects: 2, daily: 10, days: 500, earning: 5000 }  
// // // // // // // // //   ]
// // // // // // // // // };

// // // // // // // // // export default function Plan() {
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const [activeData, setActiveData] = useState(null);
  
// // // // // // // // //   // ✅ State for Dropdown Open/Close
// // // // // // // // //   const [showGrowthInfo, setShowGrowthInfo] = useState(false);

// // // // // // // // //   // 🔥 My Community from Backend
// // // // // // // // //   const userGlobalTeam = user?.globalTeamCount || 0; 
// // // // // // // // //   const userDirects = user?.directCount || 0;
// // // // // // // // //   const isToppedUp = user?.isToppedUp || false;

// // // // // // // // //   // ---------------- PROCESS DATA ----------------
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     let cumulativeGlobalTeam = 0; 

// // // // // // // // //     const processedLevels = globalPoolConfig.levels.map((staticLvl) => {
// // // // // // // // //       const previousCumulative = cumulativeGlobalTeam; 
// // // // // // // // //       cumulativeGlobalTeam += staticLvl.globalTeam; 
      
// // // // // // // // //       let status = "TEAM_PENDING"; 
// // // // // // // // //       const isTeamReady = userGlobalTeam >= cumulativeGlobalTeam;
// // // // // // // // //       const isDirectReady = userDirects >= staticLvl.requiredDirects;

// // // // // // // // //       if (isTeamReady && isDirectReady) {
// // // // // // // // //         status = "ACHIEVED";
// // // // // // // // //       } else if (isTeamReady && !isDirectReady) {
// // // // // // // // //         status = "DIRECT_PENDING"; 
// // // // // // // // //       } else {
// // // // // // // // //         status = "TEAM_PENDING"; 
// // // // // // // // //       }

// // // // // // // // //       let currentLevelProgress = 0;
// // // // // // // // //       if (userGlobalTeam >= cumulativeGlobalTeam) {
// // // // // // // // //         currentLevelProgress = staticLvl.globalTeam; 
// // // // // // // // //       } else if (userGlobalTeam > previousCumulative) {
// // // // // // // // //         currentLevelProgress = userGlobalTeam - previousCumulative; 
// // // // // // // // //       }

// // // // // // // // //       return { 
// // // // // // // // //         ...staticLvl, 
// // // // // // // // //         status, 
// // // // // // // // //         currentLevelProgress, 
// // // // // // // // //         cumulativeGlobalTeam 
// // // // // // // // //       };
// // // // // // // // //     });

// // // // // // // // //     setActiveData({ ...globalPoolConfig, levels: processedLevels });
// // // // // // // // //   }, [userGlobalTeam, userDirects]);

// // // // // // // // //   // ---------------- UI ----------------
// // // // // // // // //   return (
// // // // // // // // //     <div className="bg-white w-full py-4 md:py-8 text-slate-900 relative overflow-hidden font-sans border border-slate-200 rounded-2xl md:rounded-3xl mt-2 md:mt-4 shadow-sm">
// // // // // // // // //       <style>{customStyles}</style>
// // // // // // // // //       <div className="absolute inset-0 bg-grid-light pointer-events-none"></div>

// // // // // // // // //       <div className="relative z-10 w-full px-2 sm:px-4 md:px-6">
        
// // // // // // // // //         {/* 🛑 INACTIVE USER WARNING */}
// // // // // // // // //         {!isToppedUp && (
// // // // // // // // //            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-pulse shadow-sm">
// // // // // // // // //               <AlertTriangle className="text-red-500 shrink-0 w-6 h-6 md:w-8 md:h-8" />
// // // // // // // // //               <p className="text-red-600 text-[10px] md:text-sm font-bold">
// // // // // // // // //                  Your ID is inactive. Top-up with <span className="text-red-800 font-black">$30</span> to start building your My Community and unlock Community Incomes!
// // // // // // // // //               </p>
// // // // // // // // //            </div>
// // // // // // // // //         )}


// // // // // // // // //         {/* ✅ USER METRICS */}
// // // // // // // // //         <div className="flex flex-row gap-2 md:gap-4 mb-4 md:mb-6">
// // // // // // // // //            <div className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
// // // // // // // // //               <div>
// // // // // // // // //                 <p className="text-black text-[9px] md:text-xs font-bold uppercase tracking-widest mb-0.5"> My Community</p>
// // // // // // // // //                 <h3 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
// // // // // // // // //                   {userGlobalTeam.toLocaleString()}
// // // // // // // // //                   {isToppedUp && (
// // // // // // // // //                      <span className="flex h-2 w-2 relative -mt-3">
// // // // // // // // //                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// // // // // // // // //                         <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
// // // // // // // // //                      </span>
// // // // // // // // //                   )}
// // // // // // // // //                 </h3>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="p-2 md:p-3 bg-green-100 rounded-lg md:rounded-xl border border-green-200 hidden sm:block">
// // // // // // // // //                 <Globe2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
// // // // // // // // //               </div>
// // // // // // // // //            </div>

// // // // // // // // //            <div className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
// // // // // // // // //               <div>
// // // // // // // // //                 <p className="text-black text-[9px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Direct Referrals</p>
// // // // // // // // //                 <h3 className="text-xl md:text-3xl font-black text-slate-900">
// // // // // // // // //                   {userDirects}
// // // // // // // // //                 </h3>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="p-2 md:p-3 bg-blue-50 rounded-lg md:rounded-xl border border-blue-100 hidden sm:block">
// // // // // // // // //                 <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
// // // // // // // // //               </div>
// // // // // // // // //            </div>
// // // // // // // // //         </div>


// // // // // // // // //           {/* 🔥 UPDATED SECTION: How Community Withdrawal Works 🔥 */}
// // // // // // // // //           <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
              
// // // // // // // // //               {/* Clickable Header */}
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => setShowGrowthInfo(!showGrowthInfo)}
// // // // // // // // //                 className="w-full flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
// // // // // // // // //               >
// // // // // // // // //                 <div className="flex items-center gap-2">
// // // // // // // // //                   <Info size={18} className="text-blue-600" />
// // // // // // // // //                   <span className="font-black text-slate-800 uppercase tracking-widest text-sm md:text-base">
// // // // // // // // //                     How Community Withdrawal Works
// // // // // // // // //                   </span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="text-slate-500">
// // // // // // // // //                   {showGrowthInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
// // // // // // // // //                 </div>
// // // // // // // // //               </button>

// // // // // // // // //               {/* Expandable Content */}
// // // // // // // // //               {showGrowthInfo && (
// // // // // // // // //                 <div className="p-5 md:p-6 border-t border-slate-200 animate-in slide-in-from-top-2 duration-300 bg-white">
                  
// // // // // // // // //                   {/* Community Withdrawal Table */}
// // // // // // // // //                   <div className="mt-0">
// // // // // // // // //                     <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">
// // // // // // // // //                       Community Withdrawal Distribution
// // // // // // // // //                     </h4>

// // // // // // // // //                     <div className="overflow-x-auto rounded-lg border border-slate-200">
// // // // // // // // //                       <table className="min-w-full text-sm md:text-base">
// // // // // // // // //                         <thead className="bg-slate-100">
// // // // // // // // //                           <tr>
// // // // // // // // //                             <th className="px-4 py-3 text-left font-bold text-slate-700">Team Size</th>
// // // // // // // // //                             <th className="px-4 py-3 text-center font-bold text-slate-700">Withdrawal</th>
// // // // // // // // //                             <th className="px-4 py-3 text-center font-bold text-slate-700">Wallet</th>
// // // // // // // // //                             <th className="px-4 py-3 text-center font-bold text-slate-700">
// // // // // // // // //                               Community Net Withdrawal
// // // // // // // // //                             </th>
// // // // // // // // //                             {/* 🔥 NAYA COLUMN ADD KIYA */}
// // // // // // // // //                             <th className="px-4 py-3 text-center font-bold text-slate-700">
// // // // // // // // //                               Community Net Wallet
// // // // // // // // //                             </th>
// // // // // // // // //                           </tr>
// // // // // // // // //                         </thead>

// // // // // // // // //                         <tbody className="divide-y divide-slate-200 bg-white">
// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">0</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">20%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">80%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$2,440</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$9,760</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">+30</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">30%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">70%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$3,660</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$8,540</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">+50</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">40%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">60%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$4,880</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$7,320</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">+100</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">50%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">50%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$6,100</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$6,100</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">+300</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">60%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">40%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$7,320</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$4,880</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr>
// // // // // // // // //                             <td className="px-4 py-3 font-semibold">+500</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-600 font-bold">80%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-blue-600 font-bold">20%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-green-600">$9,760</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$2,440</td>
// // // // // // // // //                           </tr>

// // // // // // // // //                           <tr className="bg-green-50">
// // // // // // // // //                             <td className="px-4 py-3 font-bold">+1000</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-green-700 font-extrabold">100%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center text-red-600 font-extrabold">0%</td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-extrabold text-green-700">
// // // // // // // // //                               $12,200
// // // // // // // // //                             </td>
// // // // // // // // //                             <td className="px-4 py-3 text-center font-extrabold text-slate-400">
// // // // // // // // //                               $0
// // // // // // // // //                             </td>
// // // // // // // // //                           </tr>
// // // // // // // // //                         </tbody>
                        
// // // // // // // // //                         {/* 🔥 NAYA HIGHLIGHTED FOOTER ADD KIYA */}
                      
                        
// // // // // // // // //                       </table>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
// // // // // // // // //                       <p className="text-sm md:text-base text-slate-700">
// // // // // // // // //                         <strong>Note:</strong> As your Team Size increases, a larger percentage of
// // // // // // // // //                         your Community Income becomes available for direct withdrawal, while the
// // // // // // // // //                         Wallet allocation decreases. At <strong>1000+ Team Members</strong>, you
// // // // // // // // //                         can withdraw <strong>100%</strong> of your Community Income.
// // // // // // // // //                       </p>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>

// // // // // // // // //                 </div>
// // // // // // // // //               )}

              
// // // // // // // // //             </div>
            

// // // // // // // // //         {activeData && (
// // // // // // // // //           <div className="w-full">
            
// // // // // // // // //             {/* ✅ TABLE START */}
// // // // // // // // //             <div className="glass-table-wrapper border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
// // // // // // // // //               <div className="overflow-x-auto w-full custom-scroll">
// // // // // // // // //                 <table className="w-full text-[10px] md:text-sm text-left whitespace-nowrap">
                  
// // // // // // // // //                   {/* COLUMNS HEADER */}
// // // // // // // // //                   <thead className="text-slate-600 text-[9px] md:text-xs uppercase tracking-widest border-b border-slate-200 bg-slate-50">
// // // // // // // // //                     <tr>
// // // // // // // // //                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Lvl</th>
// // // // // // // // //                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Community Team</th>
// // // // // // // // //                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Directs</th>
// // // // // // // // //                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Total Earning</th>
// // // // // // // // //                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Status</th>
// // // // // // // // //                     </tr>
// // // // // // // // //                   </thead>

// // // // // // // // //                   {/* ROWS */}
// // // // // // // // //                   <tbody>
// // // // // // // // //                     {activeData.levels.map((lvl) => {
// // // // // // // // //                       const isAchieved = lvl.status === "ACHIEVED";
// // // // // // // // //                       const isPoolFilled = lvl.status === "ACHIEVED" || lvl.status === "DIRECT_PENDING";

// // // // // // // // //                       return (
// // // // // // // // //                         <tr 
// // // // // // // // //                           key={lvl.level} 
// // // // // // // // //                           className={`border-b border-slate-100 glass-row ${isPoolFilled ? 'achieved-row' : 'bg-white'}`}
// // // // // // // // //                         >
                          
// // // // // // // // //                           {/* LEVEL NO */}
// // // // // // // // //                           <td className="py-2.5 px-2 md:py-3 md:px-4">
// // // // // // // // //                             <div className={`w-6 h-6 md:w-8 md:h-8 mx-auto rounded-full flex items-center justify-center text-[10px] md:text-sm font-black transition-colors ${
// // // // // // // // //                               isPoolFilled 
// // // // // // // // //                               ? 'bg-emerald-500 text-white shadow-sm' 
// // // // // // // // //                               : 'bg-slate-100 border border-slate-200 text-slate-600'
// // // // // // // // //                             }`}>
// // // // // // // // //                               {lvl.level}
// // // // // // // // //                             </div>
// // // // // // // // //                           </td>

// // // // // // // // //                           {/* GLOBAL TEAM */}
// // // // // // // // //                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
// // // // // // // // //                             <div className="flex flex-col items-center justify-center gap-0.5">
// // // // // // // // //                               <div className="flex items-center gap-1.5">
// // // // // // // // //                                 <Users size={14} className={isPoolFilled ? "text-emerald-600" : "text-slate-400"} />
// // // // // // // // //                                 <span className={`font-black text-xs md:text-sm ${isPoolFilled ? 'text-emerald-800' : 'text-slate-800'}`}>
// // // // // // // // //                                   {lvl.globalTeam.toLocaleString()}
// // // // // // // // //                                 </span>
// // // // // // // // //                               </div>
// // // // // // // // //                               {lvl.status === "TEAM_PENDING" && (
// // // // // // // // //                                 <div className="text-[9px] md:text-[10px] text-slate-500 font-mono font-bold mt-0.5 bg-slate-50 border border-slate-100 px-1.5 rounded">
// // // // // // // // //                                   ({lvl.currentLevelProgress} / {lvl.globalTeam})
// // // // // // // // //                                 </div>
// // // // // // // // //                               )}
// // // // // // // // //                             </div>
// // // // // // // // //                           </td>

// // // // // // // // //                           {/* REQUIRED DIRECTS COLUMN */}
// // // // // // // // //                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
// // // // // // // // //                             <span className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border text-[9px] md:text-xs font-black inline-block ${
// // // // // // // // //                               isAchieved 
// // // // // // // // //                               ? 'bg-emerald-100/50 border-emerald-200 text-emerald-700' 
// // // // // // // // //                               : 'bg-slate-50 border-slate-200 text-slate-600'
// // // // // // // // //                             }`}>
// // // // // // // // //                               {lvl.displayDirects || (lvl.level <= 6 ? 1 : 2)} {(lvl.displayDirects || (lvl.level <= 6 ? 1 : 2)) > 1 ? 'Directs' : 'Direct'}
// // // // // // // // //                             </span>
// // // // // // // // //                           </td>

// // // // // // // // //                           {/* TOTAL EARNING */}
// // // // // // // // //                           <td className={`py-2.5 px-2 md:py-3 md:px-4 font-black text-center text-sm md:text-lg ${isPoolFilled ? 'text-emerald-600' : 'text-slate-700'}`}>
// // // // // // // // //                             ${lvl.earning.toLocaleString()}
// // // // // // // // //                           </td>

// // // // // // // // //                           {/* STATUS */}
// // // // // // // // //                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
// // // // // // // // //                             {lvl.status === "ACHIEVED" && (
// // // // // // // // //                               <div className="inline-flex items-center justify-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
// // // // // // // // //                                 <CheckCircle size={12} strokeWidth={3} /> Done
// // // // // // // // //                               </div>
// // // // // // // // //                             )}
// // // // // // // // //                             {lvl.status === "DIRECT_PENDING" && (
// // // // // // // // //                               <div className="inline-flex items-center justify-center gap-1 text-amber-700 bg-amber-100 px-2.5 py-1 rounded border border-amber-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
// // // // // // // // //                                 <UserPlus size={12} strokeWidth={3} /> Direct Req
// // // // // // // // //                               </div>
// // // // // // // // //                             )}
// // // // // // // // //                             {lvl.status === "TEAM_PENDING" && (
// // // // // // // // //                               <div className="inline-flex items-center justify-center gap-1 text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
// // // // // // // // //                                 <Lock size={12} strokeWidth={3} /> {lvl.currentLevelProgress === 0 ? "Locked" : "Wait"}
// // // // // // // // //                               </div>
// // // // // // // // //                             )}
// // // // // // // // //                           </td>
// // // // // // // // //                         </tr>
// // // // // // // // //                       );
// // // // // // // // //                     })}
// // // // // // // // //                   </tbody>

// // // // // // // // //                   {/* ✅ TOTAL FOOTER */}
// // // // // // // // //                   <tfoot className="bg-slate-50 border-t border-slate-200">
// // // // // // // // //                     <tr>
// // // // // // // // //                       <td colSpan="3" className="py-4 px-4 text-right font-black uppercase tracking-widest text-[11px] md:text-xs text-slate-600">
// // // // // // // // //                         Total Potential Income
// // // // // // // // //                       </td>
// // // // // // // // //                       <td colSpan="2" className="py-4 px-4 text-left font-black text-xl md:text-2xl text-slate-800">
// // // // // // // // //                         ${activeData.totalTarget.toLocaleString()}
// // // // // // // // //                       </td>
// // // // // // // // //                     </tr>
// // // // // // // // //                   </tfoot>

// // // // // // // // //                 </table>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

          

// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

 



// // // // // // // // import React, { useState } from "react";
// // // // // // // // import {
// // // // // // // //   Package,
// // // // // // // //   CalendarDays,
// // // // // // // //   TrendingUp,
// // // // // // // //   ChevronDown,
// // // // // // // //   Sparkles,
// // // // // // // // } from "lucide-react";

// // // // // // // // const packages = [
// // // // // // // //   { amount: 30, total: 6600 },
// // // // // // // //   { amount: 60, total: 13200 },
// // // // // // // //   { amount: 120, total: 26400 },
// // // // // // // //   { amount: 240, total: 52800 },
// // // // // // // //   { amount: 480, total: 105600 },
// // // // // // // //   { amount: 960, total: 211200 },
// // // // // // // // ];

// // // // // // // // const planRows = [
// // // // // // // //   { day: "1 Day", values: [5, 10, 20, 40, 80, 160] },
// // // // // // // //   { day: "+3 Days", values: [5, 10, 20, 40, 80, 160] },
// // // // // // // //   { day: "+7 Days", values: [10, 20, 40, 80, 160, 320] },
// // // // // // // //   { day: "+15 Days", values: [20, 40, 80, 160, 320, 640] },
// // // // // // // //   { day: "+30 Days", values: [30, 60, 120, 240, 480, 960] },
// // // // // // // //   { day: "+30 Days", values: [30, 60, 120, 240, 480, 960] },
// // // // // // // //   { day: "+30 Days", values: [50, 100, 200, 400, 800, 1600] },
// // // // // // // //   { day: "+30 Days", values: [50, 100, 200, 400, 800, 1600] },
// // // // // // // //   { day: "+30 Days", values: [100, 200, 200, 800, 1600, 3200] },
// // // // // // // //   { day: "+30 Days", values: [200, 400, 800, 1600, 3200, 6400] },
// // // // // // // //   { day: "+30 Days", values: [400, 800, 1600, 3200, 6400, 12800] },
// // // // // // // //   { day: "+30 Days", values: [800, 1600, 3200, 6400, 12800, 25600] },
// // // // // // // //   { day: "+30 Days", values: [1600, 3200, 6400, 12800, 25600, 51200] },
// // // // // // // //   { day: "+30 Days", values: [3200, 6400, 12800, 25600, 51200, 102400] },
// // // // // // // // ];

// // // // // // // // const money = (value) =>
// // // // // // // //   "$" + Number(value).toLocaleString("en-US");

// // // // // // // // export default function Plan() {
// // // // // // // //   const [selectedPackage, setSelectedPackage] = useState(0);
// // // // // // // //   const [expanded, setExpanded] = useState(false);

// // // // // // // //   return (
// // // // // // // //     <div className="hp-plan">
// // // // // // // //       <style>{`
// // // // // // // //         .hp-plan {
// // // // // // // //           --green: #08783f;
// // // // // // // //           --dark: #07552e;
// // // // // // // //           --gold: #e5b83f;
// // // // // // // //           --light: #edfae9;
// // // // // // // //           --border: #d8e9d3;
// // // // // // // //           width: 100%;
// // // // // // // //           padding: 15px;
// // // // // // // //           color: #173522;
// // // // // // // //           background: #f5f9f1;
// // // // // // // //           border-radius: 16px;
// // // // // // // //           font-family: Inter, Arial, sans-serif;
// // // // // // // //           box-sizing: border-box;
// // // // // // // //         }

// // // // // // // //         .hp-plan * {
// // // // // // // //           box-sizing: border-box;
// // // // // // // //         }

// // // // // // // //         .hp-plan-header {
// // // // // // // //           position: relative;
// // // // // // // //           display: flex;
// // // // // // // //           justify-content: space-between;
// // // // // // // //           align-items: center;
// // // // // // // //           gap: 12px;
// // // // // // // //           padding: 17px 20px;
// // // // // // // //           margin-bottom: 15px;
// // // // // // // //           border: 2px solid var(--gold);
// // // // // // // //           border-radius: 15px;
// // // // // // // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // // // // // // //           box-shadow: 0 4px 12px #07552e20;
// // // // // // // //         }

// // // // // // // //         .hp-plan-heading {
// // // // // // // //           display: flex;
// // // // // // // //           align-items: center;
// // // // // // // //           gap: 11px;
// // // // // // // //           min-width: 0;
// // // // // // // //         }

// // // // // // // //         .hp-plan-heading-icon {
// // // // // // // //           display: grid;
// // // // // // // //           place-items: center;
// // // // // // // //           width: 39px;
// // // // // // // //           height: 39px;
// // // // // // // //           flex-shrink: 0;
// // // // // // // //           color: #f8d76f;
// // // // // // // //           background: #ffffff16;
// // // // // // // //           border: 1px solid #ffffff30;
// // // // // // // //           border-radius: 11px;
// // // // // // // //         }

// // // // // // // //         .hp-plan-header h2 {
// // // // // // // //           margin: 0;
// // // // // // // //           color: white;
// // // // // // // //           font-size: clamp(15px, 2.4vw, 22px);
// // // // // // // //           font-weight: 950;
// // // // // // // //           letter-spacing: .5px;
// // // // // // // //         }

// // // // // // // //         .hp-plan-header h2 span {
// // // // // // // //           color: #ffe36c;
// // // // // // // //         }

// // // // // // // //         .hp-plan-header p {
// // // // // // // //           margin: 4px 0 0;
// // // // // // // //           color: #d5ebd9;
// // // // // // // //           font-size: 10px;
// // // // // // // //           font-weight: 600;
// // // // // // // //         }

// // // // // // // //         .hp-plan-tag {
// // // // // // // //           flex-shrink: 0;
// // // // // // // //           padding: 7px 11px;
// // // // // // // //           border: 1px solid #f5d36a;
// // // // // // // //           border-radius: 30px;
// // // // // // // //           color: #ffe47a;
// // // // // // // //           background: #ffffff10;
// // // // // // // //           font-size: 9px;
// // // // // // // //           font-weight: 900;
// // // // // // // //           letter-spacing: .8px;
// // // // // // // //         }

// // // // // // // //         .hp-plan-summary {
// // // // // // // //           display: grid;
// // // // // // // //           grid-template-columns: repeat(3, 1fr);
// // // // // // // //           gap: 10px;
// // // // // // // //           margin-bottom: 14px;
// // // // // // // //         }

// // // // // // // //         .hp-summary-card {
// // // // // // // //           display: flex;
// // // // // // // //           align-items: center;
// // // // // // // //           gap: 10px;
// // // // // // // //           min-width: 0;
// // // // // // // //           padding: 12px;
// // // // // // // //           border: 1px solid var(--border);
// // // // // // // //           border-radius: 12px;
// // // // // // // //           background: white;
// // // // // // // //         }

// // // // // // // //         .hp-summary-icon {
// // // // // // // //           display: grid;
// // // // // // // //           place-items: center;
// // // // // // // //           width: 35px;
// // // // // // // //           height: 35px;
// // // // // // // //           flex-shrink: 0;
// // // // // // // //           border-radius: 10px;
// // // // // // // //           color: var(--green);
// // // // // // // //           background: #eaf7e9;
// // // // // // // //         }

// // // // // // // //         .hp-summary-label {
// // // // // // // //           color: #849389;
// // // // // // // //           font-size: 9px;
// // // // // // // //           font-weight: 800;
// // // // // // // //           text-transform: uppercase;
// // // // // // // //           letter-spacing: .6px;
// // // // // // // //         }

// // // // // // // //         .hp-summary-value {
// // // // // // // //           margin-top: 3px;
// // // // // // // //           color: #16452b;
// // // // // // // //           font-size: 16px;
// // // // // // // //           font-weight: 950;
// // // // // // // //         }

// // // // // // // //         .hp-table-card {
// // // // // // // //           overflow: hidden;
// // // // // // // //           border: 1px solid #cbdcbe;
// // // // // // // //           border-radius: 13px;
// // // // // // // //           background: white;
// // // // // // // //           box-shadow: 0 4px 15px #174d2510;
// // // // // // // //         }

// // // // // // // //         .hp-table-scroll {
// // // // // // // //           width: 100%;
// // // // // // // //           overflow-x: auto;
// // // // // // // //           scrollbar-width: thin;
// // // // // // // //           scrollbar-color: #9cbd91 #edf5e9;
// // // // // // // //         }

// // // // // // // //         .hp-package-table {
// // // // // // // //           width: 100%;
// // // // // // // //           min-width: 740px;
// // // // // // // //           border-collapse: separate;
// // // // // // // //           border-spacing: 0;
// // // // // // // //           text-align: center;
// // // // // // // //           font-size: 12px;
// // // // // // // //         }

// // // // // // // //         .hp-package-table th {
// // // // // // // //           padding: 12px 9px;
// // // // // // // //           color: white;
// // // // // // // //           background: linear-gradient(180deg, #087b3e, #07572e);
// // // // // // // //           border-right: 1px solid #ffffff30;
// // // // // // // //           font-weight: 900;
// // // // // // // //         }

// // // // // // // //         .hp-package-table th:first-child {
// // // // // // // //           min-width: 115px;
// // // // // // // //           text-align: left;
// // // // // // // //           padding-left: 16px;
// // // // // // // //         }

// // // // // // // //         .hp-package-table th:last-child {
// // // // // // // //           border-right: none;
// // // // // // // //         }

// // // // // // // //         .hp-package-table .package-price {
// // // // // // // //           display: block;
// // // // // // // //           color: #ffe56d;
// // // // // // // //           font-size: 19px;
// // // // // // // //           font-weight: 950;
// // // // // // // //         }

// // // // // // // //         .hp-package-table .package-label {
// // // // // // // //           display: block;
// // // // // // // //           margin-top: 2px;
// // // // // // // //           color: #eaf7e9;
// // // // // // // //           font-size: 10px;
// // // // // // // //         }

// // // // // // // //         .hp-package-table td {
// // // // // // // //           padding: 8px 9px;
// // // // // // // //           color: #253c2c;
// // // // // // // //           border-right: 1px solid #d9e7d3;
// // // // // // // //           border-bottom: 1px solid #d9e7d3;
// // // // // // // //           font-size: 12px;
// // // // // // // //           font-weight: 800;
// // // // // // // //           white-space: nowrap;
// // // // // // // //         }

// // // // // // // //         .hp-package-table td:first-child {
// // // // // // // //           padding-left: 16px;
// // // // // // // //           text-align: left;
// // // // // // // //           color: #175a32;
// // // // // // // //           font-weight: 900;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tr:nth-child(even) td {
// // // // // // // //           background: #eff9e9;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tr:nth-child(odd) td {
// // // // // // // //           background: #ffffff;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tr:hover td {
// // // // // // // //           background: #e0f2d8;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tfoot td {
// // // // // // // //           padding: 13px 9px;
// // // // // // // //           color: #123f25;
// // // // // // // //           background: linear-gradient(90deg, #f5dc76, #ffeaa1) !important;
// // // // // // // //           border-bottom: none;
// // // // // // // //           font-size: 16px;
// // // // // // // //           font-weight: 950;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tfoot td:first-child {
// // // // // // // //           color: white;
// // // // // // // //           background: #08743b !important;
// // // // // // // //         }

// // // // // // // //         .hp-package-table tfoot td:not(:first-child) {
// // // // // // // //           font-size: clamp(12px, 1.5vw, 18px);
// // // // // // // //         }

// // // // // // // //         .hp-mobile-packages {
// // // // // // // //           display: none;
// // // // // // // //         }

// // // // // // // //         .hp-package-selector {
// // // // // // // //           display: grid;
// // // // // // // //           grid-template-columns: repeat(3, 1fr);
// // // // // // // //           gap: 7px;
// // // // // // // //           margin-bottom: 12px;
// // // // // // // //         }

// // // // // // // //         .hp-package-button {
// // // // // // // //           padding: 10px 5px;
// // // // // // // //           border: 1px solid #d7e7d0;
// // // // // // // //           border-radius: 10px;
// // // // // // // //           background: white;
// // // // // // // //           color: #31543b;
// // // // // // // //           font-weight: 900;
// // // // // // // //           cursor: pointer;
// // // // // // // //           transition: .2s;
// // // // // // // //         }

// // // // // // // //         .hp-package-button strong {
// // // // // // // //           display: block;
// // // // // // // //           color: inherit;
// // // // // // // //           font-size: 15px;
// // // // // // // //         }

// // // // // // // //         .hp-package-button span {
// // // // // // // //           display: block;
// // // // // // // //           margin-top: 2px;
// // // // // // // //           font-size: 9px;
// // // // // // // //           font-weight: 700;
// // // // // // // //         }

// // // // // // // //         .hp-package-button.active {
// // // // // // // //           color: white;
// // // // // // // //           border-color: #08783f;
// // // // // // // //           background: linear-gradient(135deg, #08783f, #07552e);
// // // // // // // //           box-shadow: 0 3px 9px #08783f25;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-table {
// // // // // // // //           overflow: hidden;
// // // // // // // //           border: 1px solid #d7e7d0;
// // // // // // // //           border-radius: 12px;
// // // // // // // //           background: white;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-row {
// // // // // // // //           display: flex;
// // // // // // // //           justify-content: space-between;
// // // // // // // //           align-items: center;
// // // // // // // //           gap: 10px;
// // // // // // // //           padding: 10px 13px;
// // // // // // // //           border-bottom: 1px solid #e7f0e3;
// // // // // // // //           font-size: 12px;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-row:nth-child(even) {
// // // // // // // //           background: #eff9e9;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-row:last-child {
// // // // // // // //           border-bottom: 0;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-day {
// // // // // // // //           color: #47634c;
// // // // // // // //           font-weight: 800;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-earning {
// // // // // // // //           color: #08783f;
// // // // // // // //           font-size: 13px;
// // // // // // // //           font-weight: 950;
// // // // // // // //         }

// // // // // // // //         .hp-mobile-total {
// // // // // // // //           display: flex;
// // // // // // // //           justify-content: space-between;
// // // // // // // //           align-items: center;
// // // // // // // //           padding: 14px;
// // // // // // // //           color: #173e26;
// // // // // // // //           background: linear-gradient(90deg, #f4d76c, #ffeaa2);
// // // // // // // //           font-size: 13px;
// // // // // // // //           font-weight: 950;
// // // // // // // //         }

// // // // // // // //         .hp-plan-note {
// // // // // // // //           display: flex;
// // // // // // // //           align-items: flex-start;
// // // // // // // //           gap: 8px;
// // // // // // // //           margin-top: 12px;
// // // // // // // //           padding: 11px 13px;
// // // // // // // //           border: 1px solid #eadba6;
// // // // // // // //           border-radius: 10px;
// // // // // // // //           color: #725c20;
// // // // // // // //           background: #fff9e8;
// // // // // // // //           font-size: 10px;
// // // // // // // //           line-height: 1.6;
// // // // // // // //         }

// // // // // // // //         .hp-plan-note svg {
// // // // // // // //           flex-shrink: 0;
// // // // // // // //           margin-top: 1px;
// // // // // // // //           color: #b38a20;
// // // // // // // //         }

// // // // // // // //         .hp-plan-footer {
// // // // // // // //           margin-top: 12px;
// // // // // // // //           text-align: center;
// // // // // // // //           color: #849389;
// // // // // // // //           font-size: 9px;
// // // // // // // //           font-weight: 700;
// // // // // // // //         }

// // // // // // // //         @media (max-width: 640px) {
// // // // // // // //           .hp-plan {
// // // // // // // //             padding: 10px;
// // // // // // // //             border-radius: 12px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-header {
// // // // // // // //             padding: 13px 12px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-heading-icon {
// // // // // // // //             width: 33px;
// // // // // // // //             height: 33px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-header p {
// // // // // // // //             font-size: 9px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-tag {
// // // // // // // //             padding: 6px 7px;
// // // // // // // //             font-size: 8px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-summary {
// // // // // // // //             gap: 6px;
// // // // // // // //           }

// // // // // // // //           .hp-summary-card {
// // // // // // // //             display: block;
// // // // // // // //             padding: 9px;
// // // // // // // //           }

// // // // // // // //           .hp-summary-icon {
// // // // // // // //             width: 29px;
// // // // // // // //             height: 29px;
// // // // // // // //             margin-bottom: 7px;
// // // // // // // //           }

// // // // // // // //           .hp-summary-label {
// // // // // // // //             font-size: 8px;
// // // // // // // //           }

// // // // // // // //           .hp-summary-value {
// // // // // // // //             font-size: 14px;
// // // // // // // //           }

// // // // // // // //           .hp-table-scroll {
// // // // // // // //             display: none;
// // // // // // // //           }

// // // // // // // //           .hp-mobile-packages {
// // // // // // // //             display: block;
// // // // // // // //           }
// // // // // // // //         }

// // // // // // // //         @media (max-width: 360px) {
// // // // // // // //           .hp-plan-header h2 {
// // // // // // // //             font-size: 14px;
// // // // // // // //           }

// // // // // // // //           .hp-plan-tag {
// // // // // // // //             display: none;
// // // // // // // //           }

// // // // // // // //           .hp-package-button strong {
// // // // // // // //             font-size: 13px;
// // // // // // // //           }

// // // // // // // //           .hp-mobile-row {
// // // // // // // //             padding: 9px 10px;
// // // // // // // //             font-size: 11px;
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       `}</style>

// // // // // // // //       <div className="hp-plan-header">
// // // // // // // //         <div className="hp-plan-heading">
// // // // // // // //           <div className="hp-plan-heading-icon">
// // // // // // // //             <Package size={22} />
// // // // // // // //           </div>

// // // // // // // //           <div>
// // // // // // // //             <h2>
// // // // // // // //               ALL <span>PACKAGE PLAN</span>
// // // // // // // //             </h2>
// // // // // // // //             <p>Helping Pools • Package Earning Schedule</p>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="hp-plan-tag">
// // // // // // // //           <Sparkles size={12} style={{ display: "inline", marginRight: 4 }} />
// // // // // // // //           NEW PLAN
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Summary */}
// // // // // // // //       <div className="hp-plan-summary">
// // // // // // // //         <div className="hp-summary-card">
// // // // // // // //           <div className="hp-summary-icon">
// // // // // // // //             <Package size={18} />
// // // // // // // //           </div>
// // // // // // // //           <div>
// // // // // // // //             <div className="hp-summary-label">Packages</div>
// // // // // // // //             <div className="hp-summary-value">6</div>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="hp-summary-card">
// // // // // // // //           <div className="hp-summary-icon">
// // // // // // // //             <CalendarDays size={18} />
// // // // // // // //           </div>
// // // // // // // //           <div>
// // // // // // // //             <div className="hp-summary-label">Stages</div>
// // // // // // // //             <div className="hp-summary-value">14</div>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="hp-summary-card">
// // // // // // // //           <div className="hp-summary-icon">
// // // // // // // //             <TrendingUp size={18} />
// // // // // // // //           </div>
// // // // // // // //           <div>
// // // // // // // //             <div className="hp-summary-label">Max Package</div>
// // // // // // // //             <div className="hp-summary-value">$960</div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Desktop Table */}
// // // // // // // //       <div className="hp-table-card">
// // // // // // // //         <div className="hp-table-scroll">
// // // // // // // //           <table className="hp-package-table">
// // // // // // // //             <thead>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Days</th>
// // // // // // // //                 {packages.map((pkg) => (
// // // // // // // //                   <th key={pkg.amount}>
// // // // // // // //                     <span className="package-price">
// // // // // // // //                       {money(pkg.amount)}
// // // // // // // //                     </span>
// // // // // // // //                     <span className="package-label">Package</span>
// // // // // // // //                   </th>
// // // // // // // //                 ))}
// // // // // // // //               </tr>
// // // // // // // //             </thead>

// // // // // // // //             <tbody>
// // // // // // // //               {planRows.map((row, index) => (
// // // // // // // //                 <tr key={index}>
// // // // // // // //                   <td>{row.day}</td>
// // // // // // // //                   {row.values.map((value, i) => (
// // // // // // // //                     <td key={i}>{money(value)}</td>
// // // // // // // //                   ))}
// // // // // // // //                 </tr>
// // // // // // // //               ))}
// // // // // // // //             </tbody>

// // // // // // // //             <tfoot>
// // // // // // // //               <tr>
// // // // // // // //                 <td>Total Earning</td>
// // // // // // // //                 {packages.map((pkg) => (
// // // // // // // //                   <td key={pkg.amount}>{money(pkg.total)}</td>
// // // // // // // //                 ))}
// // // // // // // //               </tr>
// // // // // // // //             </tfoot>
// // // // // // // //           </table>
// // // // // // // //         </div>

// // // // // // // //         {/* Mobile Package Cards */}
// // // // // // // //         <div className="hp-mobile-packages">
// // // // // // // //           <div className="hp-package-selector">
// // // // // // // //             {packages.map((pkg, index) => (
// // // // // // // //               <button
// // // // // // // //                 type="button"
// // // // // // // //                 key={pkg.amount}
// // // // // // // //                 onClick={() => setSelectedPackage(index)}
// // // // // // // //                 className={`hp-package-button ${
// // // // // // // //                   selectedPackage === index ? "active" : ""
// // // // // // // //                 }`}
// // // // // // // //               >
// // // // // // // //                 <strong>{money(pkg.amount)}</strong>
// // // // // // // //                 <span>PACKAGE</span>
// // // // // // // //               </button>
// // // // // // // //             ))}
// // // // // // // //           </div>

// // // // // // // //           <div className="hp-mobile-table">
// // // // // // // //             {planRows.map((row, index) => (
// // // // // // // //               <div className="hp-mobile-row" key={index}>
// // // // // // // //                 <span className="hp-mobile-day">{row.day}</span>
// // // // // // // //                 <span className="hp-mobile-earning">
// // // // // // // //                   {money(row.values[selectedPackage])}
// // // // // // // //                 </span>
// // // // // // // //               </div>
// // // // // // // //             ))}

// // // // // // // //             <div className="hp-mobile-total">
// // // // // // // //               <span>Total Earning</span>
// // // // // // // //               <span>{money(packages[selectedPackage].total)}</span>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Note */}
// // // // // // // //       <div className="hp-plan-note">
// // // // // // // //         <Sparkles size={15} />
// // // // // // // //         <span>
// // // // // // // //           Package-wise earning schedule and total figures are displayed
// // // // // // // //           according to the supplied Helping Pools plan chart.
// // // // // // // //         </span>
// // // // // // // //       </div>

// // // // // // // //       <div className="hp-plan-footer">
// // // // // // // //         HELPING POOLS • ALL PACKAGE TABLE
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }




// // // // // // // import React, { useEffect, useState, useCallback } from "react";
// // // // // // // import {
// // // // // // //   Package,
// // // // // // //   CalendarDays,
// // // // // // //   TrendingUp,
// // // // // // //   Sparkles,
// // // // // // //   Clock3,
// // // // // // //   CheckCircle2,
// // // // // // //   PauseCircle,
// // // // // // //   AlertCircle,
// // // // // // //   RefreshCw,
// // // // // // // } from "lucide-react";

// // // // // // // import api from "../../api/axios";

// // // // // // // const packages = [
// // // // // // //   { amount: 30 },
// // // // // // //   { amount: 60 },
// // // // // // //   { amount: 120 },
// // // // // // //   { amount: 240 },
// // // // // // //   { amount: 480 },
// // // // // // //   { amount: 960 },
// // // // // // // ];

// // // // // // // const planRows = [
// // // // // // //   { day: "Stage 1", duration: "1 Day" },
// // // // // // //   { day: "Stage 2", duration: "3 Days" },
// // // // // // //   { day: "Stage 3", duration: "7 Days" },
// // // // // // //   { day: "Stage 4", duration: "15 Days" },
// // // // // // //   { day: "Stage 5", duration: "30 Days" },
// // // // // // //   { day: "Stage 6", duration: "30 Days" },
// // // // // // //   { day: "Stage 7", duration: "30 Days" },
// // // // // // //   { day: "Stage 8", duration: "30 Days" },
// // // // // // //   { day: "Stage 9", duration: "30 Days" },
// // // // // // //   { day: "Stage 10", duration: "30 Days" },
// // // // // // //   { day: "Stage 11", duration: "30 Days" },
// // // // // // //   { day: "Stage 12", duration: "30 Days" },
// // // // // // //   { day: "Stage 13", duration: "30 Days" },
// // // // // // //   { day: "Stage 14", duration: "30 Days" },
// // // // // // // ];

// // // // // // // const money = (value) =>
// // // // // // //   "$" + Number(value || 0).toLocaleString("en-US");

// // // // // // // const getRemainingTime = (endsAt) => {
// // // // // // //   if (!endsAt) return "Not started";

// // // // // // //   const remaining = new Date(endsAt).getTime() - Date.now();

// // // // // // //   if (remaining <= 0) return "Updating...";

// // // // // // //   const days = Math.floor(remaining / 86400000);
// // // // // // //   const hours = Math.floor((remaining % 86400000) / 3600000);
// // // // // // //   const minutes = Math.floor((remaining % 3600000) / 60000);
// // // // // // //   const seconds = Math.floor((remaining % 60000) / 1000);

// // // // // // //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // // // // // // };

// // // // // // // const getPackageStatus = (pkg) => {
// // // // // // //   if (!pkg) return "NOT PURCHASED";
// // // // // // //   return String(pkg.status || "PENDING").toUpperCase();
// // // // // // // };

// // // // // // // const getStageStatus = (stage) => {
// // // // // // //   return String(stage?.status || "LOCKED").toUpperCase();
// // // // // // // };

// // // // // // // export default function Plan() {
// // // // // // //   const [subscriptions, setSubscriptions] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // // //   const [error, setError] = useState("");
// // // // // // //   const [now, setNow] = useState(Date.now());

// // // // // // //   const fetchProgress = useCallback(async (showLoader = false) => {
// // // // // // //     try {
// // // // // // //       if (showLoader) setRefreshing(true);

// // // // // // //       const response = await api.get("/package-progress");

// // // // // // //       if (response.data?.success) {
// // // // // // //         setSubscriptions(response.data.packages || []);
// // // // // // //         setError("");
// // // // // // //       } else {
// // // // // // //         setError("Package progress could not be loaded.");
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Package progress fetch error:", err);

// // // // // // //       setError(
// // // // // // //         err.response?.data?.message ||
// // // // // // //         "Unable to load package progress. Please login again."
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //       setRefreshing(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     fetchProgress();

// // // // // // //     const refreshInterval = setInterval(() => {
// // // // // // //       fetchProgress();
// // // // // // //     }, 30000);

// // // // // // //     const clockInterval = setInterval(() => {
// // // // // // //       setNow(Date.now());
// // // // // // //     }, 1000);

// // // // // // //     return () => {
// // // // // // //       clearInterval(refreshInterval);
// // // // // // //       clearInterval(clockInterval);
// // // // // // //     };
// // // // // // //   }, [fetchProgress]);

// // // // // // //   // Latest subscription for each package amount
// // // // // // //   const getLatestPackage = (amount) => {
// // // // // // //     return subscriptions
// // // // // // //       .filter(
// // // // // // //         (item) => Number(item.packageAmount) === Number(amount)
// // // // // // //       )
// // // // // // //       .sort(
// // // // // // //         (a, b) =>
// // // // // // //           new Date(b.purchasedAt || 0).getTime() -
// // // // // // //           new Date(a.purchasedAt || 0).getTime()
// // // // // // //       )[0] || null;
// // // // // // //   };

// // // // // // //   const getCurrentStage = (pkg) => {
// // // // // // //     if (!pkg) return null;

// // // // // // //     const stages = pkg.stages || [];
// // // // // // //     const stageNumber = Number(pkg.currentStage || 1);

// // // // // // //     return (
// // // // // // //       stages.find(
// // // // // // //         (stage) => Number(stage.stageNumber) === stageNumber
// // // // // // //       ) || stages[stageNumber - 1] || null
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const getCellStatus = (pkg, stageNumber) => {
// // // // // // //     if (!pkg) return "NOT PURCHASED";

// // // // // // //     if (pkg.status === "COMPLETED") return "COMPLETED";
// // // // // // //     if (pkg.status === "CANCELLED") return "CANCELLED";

// // // // // // //     const stage = (pkg.stages || []).find(
// // // // // // //       (item) => Number(item.stageNumber) === stageNumber
// // // // // // //     );

// // // // // // //     if (!stage) {
// // // // // // //       return stageNumber === 1 ? "WAITING" : "LOCKED";
// // // // // // //     }

// // // // // // //     return getStageStatus(stage);
// // // // // // //   };

// // // // // // //   const getStatusColor = (status) => {
// // // // // // //     switch (status) {
// // // // // // //       case "RUNNING":
// // // // // // //       case "ACTIVE":
// // // // // // //       case "ACHIEVED":
// // // // // // //       case "COMPLETED":
// // // // // // //         return "green";

// // // // // // //       case "PAUSED":
// // // // // // //         return "orange";

// // // // // // //       case "WAITING":
// // // // // // //       case "PENDING":
// // // // // // //         return "blue";

// // // // // // //       case "CANCELLED":
// // // // // // //         return "red";

// // // // // // //       default:
// // // // // // //         return "gray";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getStatusLabel = (status) => {
// // // // // // //     const labels = {
// // // // // // //       "NOT PURCHASED": "Not Purchased",
// // // // // // //       RUNNING: "Running",
// // // // // // //       PAUSED: "Paused",
// // // // // // //       WAITING: "Waiting",
// // // // // // //       LOCKED: "Locked",
// // // // // // //       ACHIEVED: "Achieved",
// // // // // // //       COMPLETED: "Completed",
// // // // // // //       CANCELLED: "Cancelled",
// // // // // // //       ACTIVE: "Active",
// // // // // // //       PENDING: "Pending",
// // // // // // //     };

// // // // // // //     return labels[status] || status;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="hp-plan">
// // // // // // //       <style>{`
// // // // // // //         .hp-plan {
// // // // // // //           --green: #08783f;
// // // // // // //           --dark: #07552e;
// // // // // // //           --gold: #e5b83f;
// // // // // // //           --border: #d8e9d3;
// // // // // // //           width: 100%;
// // // // // // //           padding: 15px;
// // // // // // //           color: #173522;
// // // // // // //           background: #f5f9f1;
// // // // // // //           border-radius: 16px;
// // // // // // //           font-family: Inter, Arial, sans-serif;
// // // // // // //           box-sizing: border-box;
// // // // // // //         }

// // // // // // //         .hp-plan * {
// // // // // // //           box-sizing: border-box;
// // // // // // //         }

// // // // // // //         .hp-plan-header {
// // // // // // //           display: flex;
// // // // // // //           justify-content: space-between;
// // // // // // //           align-items: center;
// // // // // // //           gap: 12px;
// // // // // // //           padding: 17px 20px;
// // // // // // //           margin-bottom: 15px;
// // // // // // //           border: 2px solid var(--gold);
// // // // // // //           border-radius: 15px;
// // // // // // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // // // // // //         }

// // // // // // //         .hp-plan-heading {
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           gap: 11px;
// // // // // // //         }

// // // // // // //         .hp-plan-heading-icon {
// // // // // // //           display: grid;
// // // // // // //           place-items: center;
// // // // // // //           width: 39px;
// // // // // // //           height: 39px;
// // // // // // //           color: #f8d76f;
// // // // // // //           background: #ffffff16;
// // // // // // //           border-radius: 11px;
// // // // // // //         }

// // // // // // //         .hp-plan-header h2 {
// // // // // // //           margin: 0;
// // // // // // //           color: white;
// // // // // // //           font-size: clamp(15px, 2.4vw, 22px);
// // // // // // //           font-weight: 950;
// // // // // // //         }

// // // // // // //         .hp-plan-header h2 span {
// // // // // // //           color: #ffe36c;
// // // // // // //         }

// // // // // // //         .hp-plan-header p {
// // // // // // //           margin: 4px 0 0;
// // // // // // //           color: #d5ebd9;
// // // // // // //           font-size: 10px;
// // // // // // //         }

// // // // // // //         .hp-plan-tag {
// // // // // // //           padding: 7px 11px;
// // // // // // //           border: 1px solid #f5d36a;
// // // // // // //           border-radius: 30px;
// // // // // // //           color: #ffe47a;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 900;
// // // // // // //         }

// // // // // // //         .hp-plan-summary {
// // // // // // //           display: grid;
// // // // // // //           grid-template-columns: repeat(3, 1fr);
// // // // // // //           gap: 10px;
// // // // // // //           margin-bottom: 14px;
// // // // // // //         }

// // // // // // //         .hp-summary-card {
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           gap: 10px;
// // // // // // //           padding: 12px;
// // // // // // //           border: 1px solid var(--border);
// // // // // // //           border-radius: 12px;
// // // // // // //           background: white;
// // // // // // //         }

// // // // // // //         .hp-summary-icon {
// // // // // // //           display: grid;
// // // // // // //           place-items: center;
// // // // // // //           width: 35px;
// // // // // // //           height: 35px;
// // // // // // //           color: var(--green);
// // // // // // //           background: #eaf7e9;
// // // // // // //           border-radius: 10px;
// // // // // // //         }

// // // // // // //         .hp-summary-label {
// // // // // // //           color: #849389;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 800;
// // // // // // //           text-transform: uppercase;
// // // // // // //         }

// // // // // // //         .hp-summary-value {
// // // // // // //           margin-top: 3px;
// // // // // // //           color: #16452b;
// // // // // // //           font-size: 16px;
// // // // // // //           font-weight: 950;
// // // // // // //         }

// // // // // // //         .hp-progress-card {
// // // // // // //           padding: 15px;
// // // // // // //           margin-bottom: 14px;
// // // // // // //           border: 1px solid var(--border);
// // // // // // //           border-radius: 13px;
// // // // // // //           background: white;
// // // // // // //         }

// // // // // // //         .hp-progress-title {
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           justify-content: space-between;
// // // // // // //           gap: 10px;
// // // // // // //           margin-bottom: 12px;
// // // // // // //           color: #175a32;
// // // // // // //           font-weight: 900;
// // // // // // //         }

// // // // // // //         .hp-progress-grid {
// // // // // // //           display: grid;
// // // // // // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // // // // // //           gap: 9px;
// // // // // // //         }

// // // // // // //         .hp-progress-item {
// // // // // // //           min-width: 0;
// // // // // // //           padding: 11px;
// // // // // // //           border: 1px solid #e0ebdc;
// // // // // // //           border-radius: 10px;
// // // // // // //           background: #f8fcf6;
// // // // // // //         }

// // // // // // //         .hp-progress-item small {
// // // // // // //           display: block;
// // // // // // //           color: #829087;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 800;
// // // // // // //           text-transform: uppercase;
// // // // // // //         }

// // // // // // //         .hp-progress-item strong {
// // // // // // //           display: block;
// // // // // // //           margin-top: 6px;
// // // // // // //           color: #175a32;
// // // // // // //           font-size: 13px;
// // // // // // //           overflow-wrap: anywhere;
// // // // // // //         }

// // // // // // //         .hp-status {
// // // // // // //           display: inline-flex;
// // // // // // //           align-items: center;
// // // // // // //           padding: 5px 8px;
// // // // // // //           border-radius: 20px;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 900;
// // // // // // //           white-space: nowrap;
// // // // // // //         }

// // // // // // //         .hp-status.green {
// // // // // // //           color: #08783f;
// // // // // // //           background: #e4f7e9;
// // // // // // //         }

// // // // // // //         .hp-status.orange {
// // // // // // //           color: #a65a08;
// // // // // // //           background: #fff0d9;
// // // // // // //         }

// // // // // // //         .hp-status.blue {
// // // // // // //           color: #1760a4;
// // // // // // //           background: #e8f2ff;
// // // // // // //         }

// // // // // // //         .hp-status.red {
// // // // // // //           color: #b42318;
// // // // // // //           background: #ffebeb;
// // // // // // //         }

// // // // // // //         .hp-status.gray {
// // // // // // //           color: #68756d;
// // // // // // //           background: #edf0ed;
// // // // // // //         }

// // // // // // //         .hp-table-card {
// // // // // // //           overflow: hidden;
// // // // // // //           border: 1px solid #cbdcbe;
// // // // // // //           border-radius: 13px;
// // // // // // //           background: white;
// // // // // // //         }

// // // // // // //         .hp-table-scroll {
// // // // // // //           width: 100%;
// // // // // // //           overflow-x: auto;
// // // // // // //           scrollbar-width: thin;
// // // // // // //         }

// // // // // // //         .hp-package-table {
// // // // // // //           width: 100%;
// // // // // // //           min-width: 850px;
// // // // // // //           border-collapse: separate;
// // // // // // //           border-spacing: 0;
// // // // // // //           text-align: center;
// // // // // // //         }

// // // // // // //         .hp-package-table th {
// // // // // // //           padding: 12px 9px;
// // // // // // //           color: white;
// // // // // // //           background: linear-gradient(180deg, #087b3e, #07572e);
// // // // // // //           border-right: 1px solid #ffffff30;
// // // // // // //           font-weight: 900;
// // // // // // //         }

// // // // // // //         .hp-package-table th:first-child {
// // // // // // //           min-width: 130px;
// // // // // // //           text-align: left;
// // // // // // //           padding-left: 16px;
// // // // // // //         }

// // // // // // //         .hp-package-table .package-price {
// // // // // // //           display: block;
// // // // // // //           color: #ffe56d;
// // // // // // //           font-size: 19px;
// // // // // // //           font-weight: 950;
// // // // // // //         }

// // // // // // //         .hp-package-table .package-label {
// // // // // // //           display: block;
// // // // // // //           margin-top: 2px;
// // // // // // //           color: #eaf7e9;
// // // // // // //           font-size: 10px;
// // // // // // //         }

// // // // // // //         .hp-package-table td {
// // // // // // //           padding: 9px;
// // // // // // //           color: #253c2c;
// // // // // // //           border-right: 1px solid #d9e7d3;
// // // // // // //           border-bottom: 1px solid #d9e7d3;
// // // // // // //           font-size: 11px;
// // // // // // //           font-weight: 800;
// // // // // // //           white-space: nowrap;
// // // // // // //         }

// // // // // // //         .hp-package-table td:first-child {
// // // // // // //           padding-left: 16px;
// // // // // // //           text-align: left;
// // // // // // //           color: #175a32;
// // // // // // //         }

// // // // // // //         .hp-package-table tr:nth-child(even) td {
// // // // // // //           background: #eff9e9;
// // // // // // //         }

// // // // // // //         .hp-package-table tr:nth-child(odd) td {
// // // // // // //           background: white;
// // // // // // //         }

// // // // // // //         .hp-package-table tfoot td {
// // // // // // //           padding: 12px;
// // // // // // //           color: #175a32;
// // // // // // //           background: #f5dc76;
// // // // // // //           font-weight: 950;
// // // // // // //         }

// // // // // // //         .hp-plan-note {
// // // // // // //           display: flex;
// // // // // // //           align-items: flex-start;
// // // // // // //           gap: 8px;
// // // // // // //           margin-top: 12px;
// // // // // // //           padding: 11px 13px;
// // // // // // //           border: 1px solid #eadba6;
// // // // // // //           border-radius: 10px;
// // // // // // //           color: #725c20;
// // // // // // //           background: #fff9e8;
// // // // // // //           font-size: 10px;
// // // // // // //           line-height: 1.6;
// // // // // // //         }

// // // // // // //         .hp-plan-error {
// // // // // // //           padding: 12px;
// // // // // // //           margin-bottom: 12px;
// // // // // // //           color: #a52b25;
// // // // // // //           background: #fff0ef;
// // // // // // //           border: 1px solid #f3c6c3;
// // // // // // //           border-radius: 10px;
// // // // // // //           font-size: 12px;
// // // // // // //         }

// // // // // // //         .hp-refresh-button {
// // // // // // //           display: inline-flex;
// // // // // // //           align-items: center;
// // // // // // //           gap: 6px;
// // // // // // //           padding: 8px 11px;
// // // // // // //           color: white;
// // // // // // //           background: #08783f;
// // // // // // //           border: 0;
// // // // // // //           border-radius: 8px;
// // // // // // //           font-weight: 800;
// // // // // // //           cursor: pointer;
// // // // // // //         }

// // // // // // //         .hp-refresh-button:disabled {
// // // // // // //           opacity: .6;
// // // // // // //           cursor: wait;
// // // // // // //         }

// // // // // // //         .hp-plan-footer {
// // // // // // //           margin-top: 12px;
// // // // // // //           text-align: center;
// // // // // // //           color: #849389;
// // // // // // //           font-size: 9px;
// // // // // // //           font-weight: 700;
// // // // // // //         }

// // // // // // //         @media (max-width: 640px) {
// // // // // // //           .hp-plan {
// // // // // // //             padding: 10px;
// // // // // // //           }

// // // // // // //           .hp-plan-header {
// // // // // // //             padding: 13px 12px;
// // // // // // //           }

// // // // // // //           .hp-plan-summary {
// // // // // // //             gap: 6px;
// // // // // // //           }

// // // // // // //           .hp-summary-card {
// // // // // // //             display: block;
// // // // // // //             padding: 9px;
// // // // // // //           }

// // // // // // //           .hp-summary-icon {
// // // // // // //             margin-bottom: 7px;
// // // // // // //           }

// // // // // // //           .hp-summary-value {
// // // // // // //             font-size: 14px;
// // // // // // //           }

// // // // // // //           .hp-progress-grid {
// // // // // // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // // // // // //           }

// // // // // // //           .hp-table-scroll {
// // // // // // //             overflow-x: auto;
// // // // // // //           }
// // // // // // //         }

// // // // // // //         @media (max-width: 360px) {
// // // // // // //           .hp-plan-tag {
// // // // // // //             display: none;
// // // // // // //           }

// // // // // // //           .hp-progress-grid {
// // // // // // //             grid-template-columns: 1fr;
// // // // // // //           }
// // // // // // //         }
// // // // // // //       `}</style>

// // // // // // //       <div className="hp-plan-header">
// // // // // // //         <div className="hp-plan-heading">
// // // // // // //           <div className="hp-plan-heading-icon">
// // // // // // //             <Package size={22} />
// // // // // // //           </div>

// // // // // // //           <div>
// // // // // // //             <h2>
// // // // // // //               PACKAGE <span>PROGRESS</span>
// // // // // // //             </h2>
// // // // // // //             <p>Helping Pools • Package Activity Tracker</p>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="hp-plan-tag">
// // // // // // //           <Sparkles size={12} /> LIVE STATUS
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="hp-plan-summary">
// // // // // // //         <div className="hp-summary-card">
// // // // // // //           <div className="hp-summary-icon">
// // // // // // //             <Package size={18} />
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <div className="hp-summary-label">Packages</div>
// // // // // // //             <div className="hp-summary-value">6</div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="hp-summary-card">
// // // // // // //           <div className="hp-summary-icon">
// // // // // // //             <CalendarDays size={18} />
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <div className="hp-summary-label">Stages</div>
// // // // // // //             <div className="hp-summary-value">14</div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="hp-summary-card">
// // // // // // //           <div className="hp-summary-icon">
// // // // // // //             <TrendingUp size={18} />
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <div className="hp-summary-label">Max Package</div>
// // // // // // //             <div className="hp-summary-value">$960</div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="hp-progress-card">
// // // // // // //         <div className="hp-progress-title">
// // // // // // //           <span>My Package Overview</span>

// // // // // // //           <button
// // // // // // //             className="hp-refresh-button"
// // // // // // //             type="button"
// // // // // // //             onClick={() => fetchProgress(true)}
// // // // // // //             disabled={refreshing}
// // // // // // //           >
// // // // // // //             <RefreshCw size={13} />
// // // // // // //             {refreshing ? "Refreshing..." : "Refresh"}
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {loading ? (
// // // // // // //           <p>Loading package progress...</p>
// // // // // // //         ) : (
// // // // // // //           <div className="hp-progress-grid">
// // // // // // //             {packages.map((item) => {
// // // // // // //               const pkg = getLatestPackage(item.amount);
// // // // // // //               const stage = getCurrentStage(pkg);
// // // // // // //               const status = getPackageStatus(pkg);

// // // // // // //               return (
// // // // // // //                 <div className="hp-progress-item" key={item.amount}>
// // // // // // //                   <small>{money(item.amount)} Package</small>

// // // // // // //                   <strong>
// // // // // // //                     {pkg
// // // // // // //                       ? `Stage ${pkg.currentStage || 1} / 14`
// // // // // // //                       : "Not purchased"}
// // // // // // //                   </strong>

// // // // // // //                   <div style={{ marginTop: 7 }}>
// // // // // // //                     <span className={`hp-status ${getStatusColor(status)}`}>
// // // // // // //                       {getStatusLabel(status)}
// // // // // // //                     </span>
// // // // // // //                   </div>

// // // // // // //                   <small style={{ marginTop: 9 }}>
// // // // // // //                     Timer
// // // // // // //                   </small>

// // // // // // //                   <strong>
// // // // // // //                     {stage?.status === "RUNNING"
// // // // // // //                       ? getRemainingTime(stage.endsAt)
// // // // // // //                       : stage?.status === "PAUSED"
// // // // // // //                       ? "Paused"
// // // // // // //                       : stage?.status === "ACHIEVED"
// // // // // // //                       ? "Stage achieved"
// // // // // // //                       : "Not started"}
// // // // // // //                   </strong>
// // // // // // //                 </div>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {error && (
// // // // // // //         <div className="hp-plan-error">
// // // // // // //           <AlertCircle size={15} style={{ verticalAlign: "middle" }} />
// // // // // // //           {" "}{error}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <div className="hp-table-card">
// // // // // // //         <div className="hp-table-scroll">
// // // // // // //           <table className="hp-package-table">
// // // // // // //             <thead>
// // // // // // //               <tr>
// // // // // // //                 <th>Stage / Duration</th>

// // // // // // //                 {packages.map((pkg) => (
// // // // // // //                   <th key={pkg.amount}>
// // // // // // //                     <span className="package-price">
// // // // // // //                       {money(pkg.amount)}
// // // // // // //                     </span>
// // // // // // //                     <span className="package-label">Package</span>
// // // // // // //                   </th>
// // // // // // //                 ))}
// // // // // // //               </tr>
// // // // // // //             </thead>

// // // // // // //             <tbody>
// // // // // // //               {planRows.map((row, index) => (
// // // // // // //                 <tr key={index}>
// // // // // // //                   <td>
// // // // // // //                     {row.day}
// // // // // // //                     <br />
// // // // // // //                     <small>{row.duration}</small>
// // // // // // //                   </td>

// // // // // // //                   {packages.map((item) => {
// // // // // // //                     const pkg = getLatestPackage(item.amount);
// // // // // // //                     const status = getCellStatus(pkg, index + 1);

// // // // // // //                     return (
// // // // // // //                       <td key={item.amount}>
// // // // // // //                         <span
// // // // // // //                           className={`hp-status ${getStatusColor(status)}`}
// // // // // // //                         >
// // // // // // //                           {getStatusLabel(status)}
// // // // // // //                         </span>
// // // // // // //                       </td>
// // // // // // //                     );
// // // // // // //                   })}
// // // // // // //                 </tr>
// // // // // // //               ))}
// // // // // // //             </tbody>

// // // // // // //             <tfoot>
// // // // // // //               <tr>
// // // // // // //                 <td>Progress Tracking</td>

// // // // // // //                 {packages.map((item) => {
// // // // // // //                   const pkg = getLatestPackage(item.amount);

// // // // // // //                   return (
// // // // // // //                     <td key={item.amount}>
// // // // // // //                       {pkg
// // // // // // //                         ? `${Math.min(
// // // // // // //                             Number(pkg.currentStage || 1) - 1,
// // // // // // //                             14
// // // // // // //                           )} / 14`
// // // // // // //                         : "—"}
// // // // // // //                     </td>
// // // // // // //                   );
// // // // // // //                 })}
// // // // // // //               </tr>
// // // // // // //             </tfoot>
// // // // // // //           </table>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="hp-plan-note">
// // // // // // //         <Sparkles size={15} />
// // // // // // //         <span>
// // // // // // //           This table displays package activity and stage status.
// // // // // // //           Timers and progress are based on backend records.
// // // // // // //           A displayed package amount or progress stage is not a
// // // // // // //           promise of profit, income, or payout.
// // // // // // //         </span>
// // // // // // //       </div>

// // // // // // //       <div className="hp-plan-footer">
// // // // // // //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }




// // // // // // import React, { useEffect, useState, useCallback, useMemo } from "react";
// // // // // // import {
// // // // // //   Package,
// // // // // //   CalendarDays,
// // // // // //   Clock3,
// // // // // //   Sparkles,
// // // // // //   RefreshCw,
// // // // // //   AlertCircle,
// // // // // //   CheckCircle2,
// // // // // //   PauseCircle,
// // // // // // } from "lucide-react";

// // // // // // import api from "../../api/axios";

// // // // // // const packages = [30, 60, 120, 240, 480, 960];

// // // // // // const stageDurations = [1, 3, 7, 15, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

// // // // // // const money = (value) =>
// // // // // //   "$" + Number(value || 0).toLocaleString("en-US");

// // // // // // const getRemainingTime = (endsAt, now) => {
// // // // // //   if (!endsAt) return "Timer not started";

// // // // // //   const remaining = new Date(endsAt).getTime() - now;

// // // // // //   if (Number.isNaN(remaining)) return "Timer unavailable";
// // // // // //   if (remaining <= 0) return "Time completed — waiting for update";

// // // // // //   const days = Math.floor(remaining / 86400000);
// // // // // //   const hours = Math.floor((remaining % 86400000) / 3600000);
// // // // // //   const minutes = Math.floor((remaining % 3600000) / 60000);
// // // // // //   const seconds = Math.floor((remaining % 60000) / 1000);

// // // // // //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // // // // // };

// // // // // // const getStatus = (pkg) =>
// // // // // //   String(pkg?.status || "NOT PURCHASED").toUpperCase();

// // // // // // const getStageStatus = (stage) =>
// // // // // //   String(stage?.status || "LOCKED").toUpperCase();

// // // // // // const statusClass = (status) => {
// // // // // //   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(status)) {
// // // // // //     return "green";
// // // // // //   }

// // // // // //   if (status === "PAUSED") return "orange";
// // // // // //   if (["WAITING", "PENDING"].includes(status)) return "blue";
// // // // // //   if (status === "CANCELLED") return "red";

// // // // // //   return "gray";
// // // // // // };

// // // // // // const statusLabel = (status) => {
// // // // // //   const labels = {
// // // // // //     "NOT PURCHASED": "Not Purchased",
// // // // // //     RUNNING: "Running",
// // // // // //     ACTIVE: "Active",
// // // // // //     PAUSED: "Paused",
// // // // // //     WAITING: "Waiting",
// // // // // //     LOCKED: "Locked",
// // // // // //     ACHIEVED: "Achieved",
// // // // // //     COMPLETED: "Completed",
// // // // // //     CANCELLED: "Cancelled",
// // // // // //     PENDING: "Pending",
// // // // // //   };

// // // // // //   return labels[status] || status;
// // // // // // };

// // // // // // export default function Plan() {
// // // // // //   const [subscriptions, setSubscriptions] = useState([]);
// // // // // //   const [selectedAmount, setSelectedAmount] = useState(30);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // //   const [error, setError] = useState("");
// // // // // //   const [now, setNow] = useState(Date.now());

// // // // // //   const fetchProgress = useCallback(async (showLoader = false) => {
// // // // // //     try {
// // // // // //       if (showLoader) setRefreshing(true);

// // // // // //       const response = await api.get("/package-progress");

// // // // // //       if (response.data?.success) {
// // // // // //         const list = response.data.packages || [];
// // // // // //         setSubscriptions(list);
// // // // // //         setError("");

// // // // // //         // First time: automatically select the latest purchased package.
// // // // // //         setSelectedAmount((current) => {
// // // // // //           const currentExists = list.some(
// // // // // //             (item) => Number(item.packageAmount) === current
// // // // // //           );

// // // // // //           if (currentExists) return current;

// // // // // //           const latest = [...list].sort(
// // // // // //             (a, b) =>
// // // // // //               new Date(b.purchasedAt || 0).getTime() -
// // // // // //               new Date(a.purchasedAt || 0).getTime()
// // // // // //           )[0];

// // // // // //           return latest ? Number(latest.packageAmount) : current;
// // // // // //         });
// // // // // //       } else {
// // // // // //         setError("Package progress could not be loaded.");
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("Package progress fetch error:", err);

// // // // // //       setError(
// // // // // //         err.response?.data?.message ||
// // // // // //           "Unable to load package progress. Please login again."
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //       setRefreshing(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     fetchProgress();

// // // // // //     const refreshInterval = setInterval(() => {
// // // // // //       fetchProgress();
// // // // // //     }, 30000);

// // // // // //     const clockInterval = setInterval(() => {
// // // // // //       setNow(Date.now());
// // // // // //     }, 1000);

// // // // // //     return () => {
// // // // // //       clearInterval(refreshInterval);
// // // // // //       clearInterval(clockInterval);
// // // // // //     };
// // // // // //   }, [fetchProgress]);

// // // // // //   const selectedPackage = useMemo(() => {
// // // // // //     return (
// // // // // //       [...subscriptions]
// // // // // //         .filter(
// // // // // //           (item) => Number(item.packageAmount) === Number(selectedAmount)
// // // // // //         )
// // // // // //         .sort(
// // // // // //           (a, b) =>
// // // // // //             new Date(b.purchasedAt || 0).getTime() -
// // // // // //             new Date(a.purchasedAt || 0).getTime()
// // // // // //         )[0] || null
// // // // // //     );
// // // // // //   }, [subscriptions, selectedAmount]);

// // // // // //   const stages = useMemo(() => {
// // // // // //     return Array.from({ length: 14 }, (_, index) => {
// // // // // //       const stageNumber = index + 1;

// // // // // //       const savedStage = selectedPackage?.stages?.find(
// // // // // //         (item) => Number(item.stageNumber) === stageNumber
// // // // // //       );

// // // // // //       return {
// // // // // //         stageNumber,
// // // // // //         durationDays:
// // // // // //           Number(
// // // // // //             savedStage?.durationDays ||
// // // // // //               savedStage?.duration ||
// // // // // //               stageDurations[index]
// // // // // //           ) || stageDurations[index],
// // // // // //         status: selectedPackage
// // // // // //           ? getStageStatus(savedStage)
// // // // // //           : "NOT PURCHASED",
// // // // // //         startedAt: savedStage?.startedAt || null,
// // // // // //         endsAt: savedStage?.endsAt || null,
// // // // // //         completedAt: savedStage?.completedAt || null,
// // // // // //       };
// // // // // //     });
// // // // // //   }, [selectedPackage]);

// // // // // //   const currentStageNumber = Number(selectedPackage?.currentStage || 1);

// // // // // //   const currentStage =
// // // // // //     stages.find((stage) => stage.stageNumber === currentStageNumber) ||
// // // // // //     stages[0];

// // // // // //   const purchased = Boolean(selectedPackage);

// // // // // //   const completedStages = stages.filter(
// // // // // //     (stage) => stage.status === "ACHIEVED"
// // // // // //   ).length;

// // // // // //   const timerText = !purchased
// // // // // //     ? "Package not purchased"
// // // // // //     : currentStage?.status === "RUNNING"
// // // // // //     ? getRemainingTime(currentStage.endsAt, now)
// // // // // //     : currentStage?.status === "PAUSED"
// // // // // //     ? "Timer paused"
// // // // // //     : currentStage?.status === "ACHIEVED"
// // // // // //     ? "Stage completed"
// // // // // //     : "Timer not started";

// // // // // //   const nextStage =
// // // // // //     currentStageNumber < 14
// // // // // //       ? stages[currentStageNumber]
// // // // // //       : null;

// // // // // //   const packageStatus = purchased
// // // // // //     ? getStatus(selectedPackage)
// // // // // //     : "NOT PURCHASED";

// // // // // //   const handleRefresh = async () => {
// // // // // //     await fetchProgress(true);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="hp-plan">
// // // // // //       <style>{`
// // // // // //         .hp-plan {
// // // // // //           --green: #08783f;
// // // // // //           --dark: #07552e;
// // // // // //           --gold: #e5b83f;
// // // // // //           --border: #d8e9d3;
// // // // // //           width: 100%;
// // // // // //           padding: 15px;
// // // // // //           color: #173522;
// // // // // //           background: #f5f9f1;
// // // // // //           border-radius: 16px;
// // // // // //           font-family: Inter, Arial, sans-serif;
// // // // // //           box-sizing: border-box;
// // // // // //         }

// // // // // //         .hp-plan * {
// // // // // //           box-sizing: border-box;
// // // // // //         }

// // // // // //         .hp-plan-header {
// // // // // //           display: flex;
// // // // // //           justify-content: space-between;
// // // // // //           align-items: center;
// // // // // //           gap: 12px;
// // // // // //           padding: 17px 20px;
// // // // // //           margin-bottom: 15px;
// // // // // //           border: 2px solid var(--gold);
// // // // // //           border-radius: 15px;
// // // // // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // // // // //         }

// // // // // //         .hp-plan-heading {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 11px;
// // // // // //         }

// // // // // //         .hp-plan-heading-icon {
// // // // // //           display: grid;
// // // // // //           place-items: center;
// // // // // //           width: 42px;
// // // // // //           height: 42px;
// // // // // //           color: #f8d76f;
// // // // // //           background: #ffffff16;
// // // // // //           border-radius: 11px;
// // // // // //           flex-shrink: 0;
// // // // // //         }

// // // // // //         .hp-plan-header h2 {
// // // // // //           margin: 0;
// // // // // //           color: white;
// // // // // //           font-size: clamp(16px, 2.4vw, 23px);
// // // // // //           font-weight: 950;
// // // // // //         }

// // // // // //         .hp-plan-header h2 span {
// // // // // //           color: #ffe36c;
// // // // // //         }

// // // // // //         .hp-plan-header p {
// // // // // //           margin: 4px 0 0;
// // // // // //           color: #d5ebd9;
// // // // // //           font-size: 11px;
// // // // // //         }

// // // // // //         .hp-plan-tag {
// // // // // //           padding: 8px 12px;
// // // // // //           border: 1px solid #f5d36a;
// // // // // //           border-radius: 30px;
// // // // // //           color: #ffe47a;
// // // // // //           font-size: 10px;
// // // // // //           font-weight: 900;
// // // // // //           white-space: nowrap;
// // // // // //         }

// // // // // //         .hp-summary {
// // // // // //           display: grid;
// // // // // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // // // // //           gap: 10px;
// // // // // //           margin-bottom: 14px;
// // // // // //         }

// // // // // //         .hp-summary-card {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 10px;
// // // // // //           padding: 12px;
// // // // // //           border: 1px solid var(--border);
// // // // // //           border-radius: 12px;
// // // // // //           background: white;
// // // // // //           min-width: 0;
// // // // // //         }

// // // // // //         .hp-summary-icon {
// // // // // //           display: grid;
// // // // // //           place-items: center;
// // // // // //           width: 36px;
// // // // // //           height: 36px;
// // // // // //           flex-shrink: 0;
// // // // // //           color: var(--green);
// // // // // //           background: #eaf7e9;
// // // // // //           border-radius: 10px;
// // // // // //         }

// // // // // //         .hp-summary-label {
// // // // // //           color: #849389;
// // // // // //           font-size: 9px;
// // // // // //           font-weight: 800;
// // // // // //           text-transform: uppercase;
// // // // // //         }

// // // // // //         .hp-summary-value {
// // // // // //           margin-top: 4px;
// // // // // //           color: #16452b;
// // // // // //           font-size: 16px;
// // // // // //           font-weight: 950;
// // // // // //           overflow-wrap: anywhere;
// // // // // //         }

// // // // // //         .hp-selector-card {
// // // // // //           padding: 16px;
// // // // // //           margin-bottom: 14px;
// // // // // //           border: 1px solid var(--border);
// // // // // //           border-radius: 13px;
// // // // // //           background: white;
// // // // // //         }

// // // // // //         .hp-selector-heading {
// // // // // //           margin-bottom: 10px;
// // // // // //           color: #175a32;
// // // // // //           font-size: 15px;
// // // // // //           font-weight: 900;
// // // // // //         }

// // // // // //         .hp-selector-row {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 12px;
// // // // // //           flex-wrap: wrap;
// // // // // //         }

// // // // // //         .hp-selector-row label {
// // // // // //           color: #66776c;
// // // // // //           font-size: 12px;
// // // // // //           font-weight: 800;
// // // // // //         }

// // // // // //         .hp-package-select {
// // // // // //           width: min(100%, 300px);
// // // // // //           min-height: 43px;
// // // // // //           padding: 10px 13px;
// // // // // //           color: #07552e;
// // // // // //           background: #f8fcf6;
// // // // // //           border: 1px solid #cbdcbe;
// // // // // //           border-radius: 9px;
// // // // // //           font-size: 14px;
// // // // // //           font-weight: 800;
// // // // // //           outline: none;
// // // // // //           cursor: pointer;
// // // // // //         }

// // // // // //         .hp-package-select:focus {
// // // // // //           border-color: #08783f;
// // // // // //           box-shadow: 0 0 0 3px #08783f18;
// // // // // //         }

// // // // // //         .hp-refresh-button {
// // // // // //           display: inline-flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: center;
// // // // // //           gap: 7px;
// // // // // //           min-height: 40px;
// // // // // //           padding: 9px 13px;
// // // // // //           color: white;
// // // // // //           background: #08783f;
// // // // // //           border: 0;
// // // // // //           border-radius: 8px;
// // // // // //           font-weight: 800;
// // // // // //           cursor: pointer;
// // // // // //         }

// // // // // //         .hp-refresh-button:disabled {
// // // // // //           opacity: .6;
// // // // // //           cursor: wait;
// // // // // //         }

// // // // // //         .hp-status {
// // // // // //           display: inline-flex;
// // // // // //           align-items: center;
// // // // // //           padding: 5px 9px;
// // // // // //           border-radius: 20px;
// // // // // //           font-size: 10px;
// // // // // //           font-weight: 900;
// // // // // //           white-space: nowrap;
// // // // // //         }

// // // // // //         .hp-status.green {
// // // // // //           color: #08783f;
// // // // // //           background: #e4f7e9;
// // // // // //         }

// // // // // //         .hp-status.orange {
// // // // // //           color: #a65a08;
// // // // // //           background: #fff0d9;
// // // // // //         }

// // // // // //         .hp-status.blue {
// // // // // //           color: #1760a4;
// // // // // //           background: #e8f2ff;
// // // // // //         }

// // // // // //         .hp-status.red {
// // // // // //           color: #b42318;
// // // // // //           background: #ffebeb;
// // // // // //         }

// // // // // //         .hp-status.gray {
// // // // // //           color: #68756d;
// // // // // //           background: #edf0ed;
// // // // // //         }

// // // // // //         .hp-current-card {
// // // // // //           padding: 16px;
// // // // // //           margin-bottom: 14px;
// // // // // //           border: 1px solid var(--border);
// // // // // //           border-radius: 13px;
// // // // // //           background: white;
// // // // // //         }

// // // // // //         .hp-current-title {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: space-between;
// // // // // //           gap: 10px;
// // // // // //           flex-wrap: wrap;
// // // // // //           margin-bottom: 13px;
// // // // // //           color: #175a32;
// // // // // //           font-size: 15px;
// // // // // //           font-weight: 900;
// // // // // //         }

// // // // // //         .hp-current-grid {
// // // // // //           display: grid;
// // // // // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // // // // //           gap: 10px;
// // // // // //         }

// // // // // //         .hp-current-item {
// // // // // //           padding: 13px;
// // // // // //           min-width: 0;
// // // // // //           background: #f5faf2;
// // // // // //           border: 1px solid #e0ebdc;
// // // // // //           border-radius: 10px;
// // // // // //         }

// // // // // //         .hp-current-item small {
// // // // // //           display: block;
// // // // // //           color: #829087;
// // // // // //           font-size: 10px;
// // // // // //           font-weight: 800;
// // // // // //           text-transform: uppercase;
// // // // // //         }

// // // // // //         .hp-current-item strong {
// // // // // //           display: block;
// // // // // //           margin-top: 7px;
// // // // // //           color: #175a32;
// // // // // //           font-size: 14px;
// // // // // //           overflow-wrap: anywhere;
// // // // // //         }

// // // // // //         .hp-table-card {
// // // // // //           overflow: hidden;
// // // // // //           border: 1px solid #cbdcbe;
// // // // // //           border-radius: 13px;
// // // // // //           background: white;
// // // // // //         }

// // // // // //         .hp-table-heading {
// // // // // //           padding: 14px 16px;
// // // // // //           color: white;
// // // // // //           background: linear-gradient(110deg, #087b3e, #07572e);
// // // // // //           font-size: 15px;
// // // // // //           font-weight: 900;
// // // // // //         }

// // // // // //         .hp-table-scroll {
// // // // // //           width: 100%;
// // // // // //           overflow-x: auto;
// // // // // //           scrollbar-width: thin;
// // // // // //         }

// // // // // //         .hp-package-table {
// // // // // //           width: 100%;
// // // // // //           min-width: 500px;
// // // // // //           border-collapse: collapse;
// // // // // //           text-align: left;
// // // // // //         }

// // // // // //         .hp-package-table th {
// // // // // //           padding: 12px;
// // // // // //           color: #175a32;
// // // // // //           background: #eaf5e5;
// // // // // //           border-bottom: 1px solid #d9e7d3;
// // // // // //           font-size: 11px;
// // // // // //           font-weight: 900;
// // // // // //         }

// // // // // //         .hp-package-table td {
// // // // // //           padding: 12px;
// // // // // //           color: #253c2c;
// // // // // //           border-bottom: 1px solid #d9e7d3;
// // // // // //           font-size: 12px;
// // // // // //           font-weight: 700;
// // // // // //           vertical-align: middle;
// // // // // //         }

// // // // // //         .hp-package-table tr:nth-child(even) td {
// // // // // //           background: #f4faef;
// // // // // //         }

// // // // // //         .hp-package-table tr.current-stage td {
// // // // // //           background: #fff8df;
// // // // // //         }

// // // // // //         .hp-stage-name {
// // // // // //           color: #175a32;
// // // // // //           font-weight: 900;
// // // // // //         }

// // // // // //         .hp-stage-duration {
// // // // // //           display: block;
// // // // // //           margin-top: 4px;
// // // // // //           color: #829087;
// // // // // //           font-size: 10px;
// // // // // //         }

// // // // // //         .hp-timer-cell {
// // // // // //           min-width: 160px;
// // // // // //           color: #175a32;
// // // // // //           font-weight: 800;
// // // // // //         }

// // // // // //         .hp-notice {
// // // // // //           display: flex;
// // // // // //           align-items: flex-start;
// // // // // //           gap: 8px;
// // // // // //           margin-top: 12px;
// // // // // //           padding: 11px 13px;
// // // // // //           border: 1px solid #eadba6;
// // // // // //           border-radius: 10px;
// // // // // //           color: #725c20;
// // // // // //           background: #fff9e8;
// // // // // //           font-size: 11px;
// // // // // //           line-height: 1.6;
// // // // // //         }

// // // // // //         .hp-plan-error {
// // // // // //           padding: 12px;
// // // // // //           margin-bottom: 12px;
// // // // // //           color: #a52b25;
// // // // // //           background: #fff0ef;
// // // // // //           border: 1px solid #f3c6c3;
// // // // // //           border-radius: 10px;
// // // // // //           font-size: 12px;
// // // // // //         }

// // // // // //         .hp-empty {
// // // // // //           padding: 20px;
// // // // // //           color: #68756d;
// // // // // //           text-align: center;
// // // // // //           background: #f8fcf6;
// // // // // //           border-radius: 10px;
// // // // // //           font-size: 13px;
// // // // // //         }

// // // // // //         .hp-plan-footer {
// // // // // //           margin-top: 12px;
// // // // // //           text-align: center;
// // // // // //           color: #849389;
// // // // // //           font-size: 9px;
// // // // // //           font-weight: 700;
// // // // // //         }

// // // // // //         @media (max-width: 640px) {
// // // // // //           .hp-plan {
// // // // // //             padding: 9px;
// // // // // //           }

// // // // // //           .hp-plan-header {
// // // // // //             padding: 13px 11px;
// // // // // //           }

// // // // // //           .hp-plan-tag {
// // // // // //             font-size: 9px;
// // // // // //             padding: 6px 8px;
// // // // // //           }

// // // // // //           .hp-summary {
// // // // // //             gap: 6px;
// // // // // //           }

// // // // // //           .hp-summary-card {
// // // // // //             display: block;
// // // // // //             padding: 9px;
// // // // // //           }

// // // // // //           .hp-summary-icon {
// // // // // //             margin-bottom: 7px;
// // // // // //           }

// // // // // //           .hp-summary-value {
// // // // // //             font-size: 13px;
// // // // // //           }

// // // // // //           .hp-current-grid {
// // // // // //             grid-template-columns: 1fr;
// // // // // //           }

// // // // // //           .hp-selector-row {
// // // // // //             align-items: stretch;
// // // // // //             flex-direction: column;
// // // // // //           }

// // // // // //           .hp-package-select {
// // // // // //             width: 100%;
// // // // // //           }

// // // // // //           .hp-refresh-button {
// // // // // //             width: 100%;
// // // // // //           }

// // // // // //           .hp-package-table {
// // // // // //             min-width: 470px;
// // // // // //           }
// // // // // //         }

// // // // // //         @media (max-width: 360px) {
// // // // // //           .hp-plan-tag {
// // // // // //             display: none;
// // // // // //           }

// // // // // //           .hp-plan-header h2 {
// // // // // //             font-size: 15px;
// // // // // //           }
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       <div className="hp-plan-header">
// // // // // //         <div className="hp-plan-heading">
// // // // // //           <div className="hp-plan-heading-icon">
// // // // // //             <Package size={23} />
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <h2>
// // // // // //               PACKAGE <span>PROGRESS</span>
// // // // // //             </h2>
// // // // // //             <p>Helping Pools • Package Activity Tracker</p>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="hp-plan-tag">
// // // // // //           <Sparkles size={12} /> LIVE STATUS
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="hp-summary">
// // // // // //         <div className="hp-summary-card">
// // // // // //           <div className="hp-summary-icon">
// // // // // //             <Package size={18} />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <div className="hp-summary-label">Selected Package</div>
// // // // // //             <div className="hp-summary-value">
// // // // // //               {money(selectedAmount)}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="hp-summary-card">
// // // // // //           <div className="hp-summary-icon">
// // // // // //             <CalendarDays size={18} />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <div className="hp-summary-label">Total Stages</div>
// // // // // //             <div className="hp-summary-value">14</div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="hp-summary-card">
// // // // // //           <div className="hp-summary-icon">
// // // // // //             <CheckCircle2 size={18} />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <div className="hp-summary-label">Completed Stages</div>
// // // // // //             <div className="hp-summary-value">
// // // // // //               {purchased ? `${completedStages} / 14` : "0 / 14"}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="hp-selector-card">
// // // // // //         <div className="hp-selector-heading">
// // // // // //           My Package Selection
// // // // // //         </div>

// // // // // //         <div className="hp-selector-row">
// // // // // //           <label htmlFor="hp-package-select">
// // // // // //             Select Package:
// // // // // //           </label>

// // // // // //           <select
// // // // // //             id="hp-package-select"
// // // // // //             className="hp-package-select"
// // // // // //             value={selectedAmount}
// // // // // //             onChange={(event) =>
// // // // // //               setSelectedAmount(Number(event.target.value))
// // // // // //             }
// // // // // //           >
// // // // // //             {packages.map((amount) => {
// // // // // //               const exists = subscriptions.some(
// // // // // //                 (item) => Number(item.packageAmount) === amount
// // // // // //               );

// // // // // //               return (
// // // // // //                 <option key={amount} value={amount}>
// // // // // //                   {money(amount)} Package {exists ? "✓ Purchased" : "— Not Purchased"}
// // // // // //                 </option>
// // // // // //               );
// // // // // //             })}
// // // // // //           </select>

// // // // // //           <button
// // // // // //             className="hp-refresh-button"
// // // // // //             type="button"
// // // // // //             onClick={handleRefresh}
// // // // // //             disabled={refreshing}
// // // // // //           >
// // // // // //             <RefreshCw size={14} />
// // // // // //             {refreshing ? "Refreshing..." : "Refresh"}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {error && (
// // // // // //         <div className="hp-plan-error">
// // // // // //           <AlertCircle size={15} /> {error}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {loading ? (
// // // // // //         <div className="hp-empty">Loading package progress...</div>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           <div className="hp-current-card">
// // // // // //             <div className="hp-current-title">
// // // // // //               <span>{money(selectedAmount)} Package Overview</span>

// // // // // //               <span className={`hp-status ${statusClass(packageStatus)}`}>
// // // // // //                 {statusLabel(packageStatus)}
// // // // // //               </span>
// // // // // //             </div>

// // // // // //             {!purchased ? (
// // // // // //               <div className="hp-empty">
// // // // // //                 You have not purchased this package. Its stage timers have
// // // // // //                 not started.
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="hp-current-grid">
// // // // // //                 <div className="hp-current-item">
// // // // // //                   <small>Current Stage</small>
// // // // // //                   <strong>
// // // // // //                     Stage {currentStageNumber} / 14
// // // // // //                   </strong>
// // // // // //                 </div>

// // // // // //                 <div className="hp-current-item">
// // // // // //                   <small>Current Stage Status</small>
// // // // // //                   <strong>
// // // // // //                     {statusLabel(currentStage?.status || "WAITING")}
// // // // // //                   </strong>
// // // // // //                 </div>

// // // // // //                 <div className="hp-current-item">
// // // // // //                   <small>
// // // // // //                     <Clock3 size={12} /> Timer Remaining
// // // // // //                   </small>
// // // // // //                   <strong>{timerText}</strong>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {purchased && nextStage && (
// // // // // //               <div className="hp-notice">
// // // // // //                 <CalendarDays size={15} />
// // // // // //                 <span>
// // // // // //                   Next stage: Stage {nextStage.stageNumber} (
// // // // // //                   {nextStage.durationDays} days). It will be shown as
// // // // // //                   active when the backend moves the package to that stage.
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div className="hp-table-card">
// // // // // //             <div className="hp-table-heading">
// // // // // //               {money(selectedAmount)} Package — 14 Stage Details
// // // // // //             </div>

// // // // // //             <div className="hp-table-scroll">
// // // // // //               <table className="hp-package-table">
// // // // // //                 <thead>
// // // // // //                   <tr>
// // // // // //                     <th>Stage / Duration</th>
// // // // // //                     <th>Stage Status</th>
// // // // // //                     <th>Timer / Remaining Time</th>
// // // // // //                   </tr>
// // // // // //                 </thead>

// // // // // //                 <tbody>
// // // // // //                   {stages.map((stage) => {
// // // // // //                     const isCurrent =
// // // // // //                       purchased &&
// // // // // //                       stage.stageNumber === currentStageNumber;

// // // // // //                     let timer = "Not started";

// // // // // //                     if (!purchased) {
// // // // // //                       timer = "Package not purchased";
// // // // // //                     } else if (stage.status === "RUNNING") {
// // // // // //                       timer = getRemainingTime(stage.endsAt, now);
// // // // // //                     } else if (stage.status === "PAUSED") {
// // // // // //                       timer = "Timer paused";
// // // // // //                     } else if (stage.status === "ACHIEVED") {
// // // // // //                       timer = "Stage completed";
// // // // // //                     } else if (stage.status === "WAITING") {
// // // // // //                       timer = "Waiting to start";
// // // // // //                     } else if (stage.status === "LOCKED") {
// // // // // //                       timer = "Locked";
// // // // // //                     }

// // // // // //                     const displayStatus = purchased
// // // // // //                       ? stage.status
// // // // // //                       : "NOT PURCHASED";

// // // // // //                     return (
// // // // // //                       <tr
// // // // // //                         key={stage.stageNumber}
// // // // // //                         className={isCurrent ? "current-stage" : ""}
// // // // // //                       >
// // // // // //                         <td>
// // // // // //                           <span className="hp-stage-name">
// // // // // //                             Stage {stage.stageNumber}
// // // // // //                           </span>
// // // // // //                           <span className="hp-stage-duration">
// // // // // //                             {stage.durationDays}{" "}
// // // // // //                             {stage.durationDays === 1 ? "Day" : "Days"}
// // // // // //                           </span>
// // // // // //                         </td>

// // // // // //                         <td>
// // // // // //                           <span
// // // // // //                             className={`hp-status ${statusClass(displayStatus)}`}
// // // // // //                           >
// // // // // //                             {statusLabel(displayStatus)}
// // // // // //                           </span>
// // // // // //                         </td>

// // // // // //                         <td className="hp-timer-cell">
// // // // // //                           {timer}
// // // // // //                         </td>
// // // // // //                       </tr>
// // // // // //                     );
// // // // // //                   })}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </>
// // // // // //       )}

// // // // // //       <div className="hp-notice">
// // // // // //         <PauseCircle size={15} />
// // // // // //         <span>
// // // // // //           This page displays package activity, stage status and timer
// // // // // //           information from backend records. Timers must be started,
// // // // // //           paused and advanced by the backend. Package activity is not
// // // // // //           a promise of profit, income or payout.
// // // // // //         </span>
// // // // // //       </div>

// // // // // //       <div className="hp-plan-footer">
// // // // // //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // import React, { useEffect, useState, useCallback, useMemo } from "react";
// // // // // import {
// // // // //   Package,
// // // // //   Clock3,
// // // // //   Sparkles,
// // // // //   RefreshCw,
// // // // //   AlertCircle,
// // // // //   CheckCircle2,
// // // // //   ChevronDown,
// // // // //   ChevronUp,
// // // // //   CalendarDays,
// // // // //   ExternalLink
// // // // // } from "lucide-react";

// // // // // import api from "../../api/axios";

// // // // // const stageDurations = [
// // // // //   1, 3, 7, 15,
// // // // //   30, 30, 30, 30, 30, 30,
// // // // //   30, 30, 30, 30
// // // // // ];

// // // // // const money = (value) =>
// // // // //   "$" + Number(value || 0).toLocaleString("en-US");

// // // // // const getRemainingTime = (endsAt, now) => {
// // // // //   if (!endsAt) return "Not started";

// // // // //   const remaining = new Date(endsAt).getTime() - now;

// // // // //   if (Number.isNaN(remaining)) return "Unavailable";
// // // // //   if (remaining <= 0) return "Time completed";

// // // // //   const days = Math.floor(remaining / 86400000);
// // // // //   const hours = Math.floor((remaining % 86400000) / 3600000);
// // // // //   const minutes = Math.floor((remaining % 3600000) / 60000);
// // // // //   const seconds = Math.floor((remaining % 60000) / 1000);

// // // // //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // // // // };

// // // // // const statusClass = (status) => {
// // // // //   const value = String(status || "").toUpperCase();

// // // // //   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
// // // // //     return "green";
// // // // //   }

// // // // //   if (value === "PAUSED") return "orange";
// // // // //   if (["WAITING", "PENDING"].includes(value)) return "blue";
// // // // //   if (value === "CANCELLED") return "red";

// // // // //   return "gray";
// // // // // };

// // // // // const statusLabel = (status) => {
// // // // //   const labels = {
// // // // //     RUNNING: "Running",
// // // // //     ACTIVE: "Active",
// // // // //     PAUSED: "Paused",
// // // // //     WAITING: "Waiting",
// // // // //     LOCKED: "Locked",
// // // // //     ACHIEVED: "Achieved",
// // // // //     COMPLETED: "Completed",
// // // // //     CANCELLED: "Cancelled",
// // // // //     PENDING: "Pending"
// // // // //   };

// // // // //   const value = String(status || "LOCKED").toUpperCase();
// // // // //   return labels[value] || value;
// // // // // };

// // // // // const getPackageStages = (subscription) => {
// // // // //   return Array.from({ length: 14 }, (_, index) => {
// // // // //     const stageNumber = index + 1;

// // // // //     const savedStage = subscription?.stages?.find(
// // // // //       (item) => Number(item.stageNumber) === stageNumber
// // // // //     );

// // // // //     return {
// // // // //       stageNumber,
// // // // //       durationDays:
// // // // //         Number(savedStage?.durationDays || stageDurations[index]),
// // // // //       status: String(savedStage?.status || "LOCKED").toUpperCase(),
// // // // //       startedAt: savedStage?.startedAt || null,
// // // // //       endsAt: savedStage?.endsAt || null,
// // // // //       completedAt: savedStage?.completedAt || null
// // // // //     };
// // // // //   });
// // // // // };

// // // // // export default function Plan() {
// // // // //   const [subscriptions, setSubscriptions] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // //   const [error, setError] = useState("");
// // // // //   const [now, setNow] = useState(Date.now());
// // // // //   const [expandedPackages, setExpandedPackages] = useState({});
// // // // //   const [selectedSubscription, setSelectedSubscription] = useState("");

// // // // //   const fetchProgress = useCallback(async (showLoader = false) => {
// // // // //     try {
// // // // //       if (showLoader) setRefreshing(true);

// // // // //       const response = await api.get("/package-progress");

// // // // //       if (response.data?.success) {
// // // // //         const list = response.data.packages || [];

// // // // //         const sorted = [...list].sort((a, b) => {
// // // // //           const amountDifference =
// // // // //             Number(a.packageAmount) - Number(b.packageAmount);

// // // // //           if (amountDifference !== 0) return amountDifference;

// // // // //           return (
// // // // //             new Date(a.purchasedAt || 0).getTime() -
// // // // //             new Date(b.purchasedAt || 0).getTime()
// // // // //           );
// // // // //         });

// // // // //         setSubscriptions(sorted);
// // // // //         setError("");

// // // // //         setExpandedPackages((previous) => {
// // // // //           const next = { ...previous };

// // // // //           sorted.forEach((item) => {
// // // // //             const id = String(item._id);
// // // // //             if (next[id] === undefined) next[id] = true;
// // // // //           });

// // // // //           return next;
// // // // //         });

// // // // //         setSelectedSubscription((current) => {
// // // // //           if (current && sorted.some((item) => String(item._id) === current)) {
// // // // //             return current;
// // // // //           }

// // // // //           return sorted.length ? String(sorted[0]._id) : "";
// // // // //         });
// // // // //       } else {
// // // // //         setError("Package progress could not be loaded.");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Package progress fetch error:", err);

// // // // //       setError(
// // // // //         err.response?.data?.message ||
// // // // //         "Unable to load package progress. Please login again."
// // // // //       );
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //       setRefreshing(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchProgress();

// // // // //     const refreshInterval = setInterval(() => {
// // // // //       fetchProgress();
// // // // //     }, 30000);

// // // // //     const clockInterval = setInterval(() => {
// // // // //       setNow(Date.now());
// // // // //     }, 1000);

// // // // //     return () => {
// // // // //       clearInterval(refreshInterval);
// // // // //       clearInterval(clockInterval);
// // // // //     };
// // // // //   }, [fetchProgress]);

// // // // //   const handleRefresh = () => fetchProgress(true);

// // // // //   const togglePackage = (id) => {
// // // // //     setExpandedPackages((previous) => ({
// // // // //       ...previous,
// // // // //       [id]: !previous[id]
// // // // //     }));
// // // // //   };

// // // // //   const jumpToPackage = () => {
// // // // //     if (!selectedSubscription) return;

// // // // //     const element = document.getElementById(
// // // // //       `package-card-${selectedSubscription}`
// // // // //     );

// // // // //     element?.scrollIntoView({
// // // // //       behavior: "smooth",
// // // // //       block: "start"
// // // // //     });

// // // // //     setExpandedPackages((previous) => ({
// // // // //       ...previous,
// // // // //       [selectedSubscription]: true
// // // // //     }));
// // // // //   };

// // // // //   const totalPurchased = subscriptions.length;

// // // // //   const totalCompletedStages = useMemo(() => {
// // // // //     return subscriptions.reduce((total, subscription) => {
// // // // //       const stages = getPackageStages(subscription);

// // // // //       return total + stages.filter(
// // // // //         (stage) => stage.status === "ACHIEVED"
// // // // //       ).length;
// // // // //     }, 0);
// // // // //   }, [subscriptions]);

// // // // //   return (
// // // // //     <div className="hp-plan">
// // // // //       <style>{`
// // // // //         .hp-plan {
// // // // //           --green: #08783f;
// // // // //           --dark: #07552e;
// // // // //           --gold: #e5b83f;
// // // // //           --border: #d8e9d3;
// // // // //           width: 100%;
// // // // //           padding: 15px;
// // // // //           color: #173522;
// // // // //           background: #f5f9f1;
// // // // //           border-radius: 16px;
// // // // //           font-family: Inter, Arial, sans-serif;
// // // // //           box-sizing: border-box;
// // // // //         }

// // // // //         .hp-plan * {
// // // // //           box-sizing: border-box;
// // // // //         }

// // // // //         .hp-plan-header {
// // // // //           display: flex;
// // // // //           justify-content: space-between;
// // // // //           align-items: center;
// // // // //           gap: 12px;
// // // // //           padding: 17px 20px;
// // // // //           margin-bottom: 15px;
// // // // //           border: 2px solid var(--gold);
// // // // //           border-radius: 15px;
// // // // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // // // //         }

// // // // //         .hp-plan-heading {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 11px;
// // // // //           min-width: 0;
// // // // //         }

// // // // //         .hp-plan-heading-icon {
// // // // //           display: grid;
// // // // //           place-items: center;
// // // // //           width: 42px;
// // // // //           height: 42px;
// // // // //           color: #f8d76f;
// // // // //           background: #ffffff16;
// // // // //           border-radius: 11px;
// // // // //           flex-shrink: 0;
// // // // //         }

// // // // //         .hp-plan-header h2 {
// // // // //           margin: 0;
// // // // //           color: white;
// // // // //           font-size: clamp(16px, 2.4vw, 23px);
// // // // //           font-weight: 950;
// // // // //         }

// // // // //         .hp-plan-header h2 span {
// // // // //           color: #ffe36c;
// // // // //         }

// // // // //         .hp-plan-header p {
// // // // //           margin: 4px 0 0;
// // // // //           color: #d5ebd9;
// // // // //           font-size: 11px;
// // // // //         }

// // // // //         .hp-plan-tag {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 6px;
// // // // //           padding: 8px 12px;
// // // // //           border: 1px solid #f5d36a;
// // // // //           border-radius: 30px;
// // // // //           color: #ffe47a;
// // // // //           font-size: 10px;
// // // // //           font-weight: 900;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-summary {
// // // // //           display: grid;
// // // // //           grid-template-columns: repeat(2, minmax(0, 1fr));
// // // // //           gap: 10px;
// // // // //           margin-bottom: 14px;
// // // // //         }

// // // // //         .hp-summary-card {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 10px;
// // // // //           padding: 12px;
// // // // //           border: 1px solid var(--border);
// // // // //           border-radius: 12px;
// // // // //           background: white;
// // // // //           min-width: 0;
// // // // //         }

// // // // //         .hp-summary-icon {
// // // // //           display: grid;
// // // // //           place-items: center;
// // // // //           width: 36px;
// // // // //           height: 36px;
// // // // //           flex-shrink: 0;
// // // // //           color: var(--green);
// // // // //           background: #eaf7e9;
// // // // //           border-radius: 10px;
// // // // //         }

// // // // //         .hp-summary-label {
// // // // //           color: #849389;
// // // // //           font-size: 9px;
// // // // //           font-weight: 800;
// // // // //           text-transform: uppercase;
// // // // //         }

// // // // //         .hp-summary-value {
// // // // //           margin-top: 4px;
// // // // //           color: #16452b;
// // // // //           font-size: 16px;
// // // // //           font-weight: 950;
// // // // //           overflow-wrap: anywhere;
// // // // //         }

// // // // //         .hp-selector-card {
// // // // //           padding: 16px;
// // // // //           margin-bottom: 15px;
// // // // //           border: 1px solid var(--border);
// // // // //           border-radius: 13px;
// // // // //           background: white;
// // // // //         }

// // // // //         .hp-selector-heading {
// // // // //           margin-bottom: 10px;
// // // // //           color: #175a32;
// // // // //           font-size: 15px;
// // // // //           font-weight: 900;
// // // // //         }

// // // // //         .hp-selector-row {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 12px;
// // // // //           flex-wrap: wrap;
// // // // //         }

// // // // //         .hp-selector-row label {
// // // // //           color: #66776c;
// // // // //           font-size: 12px;
// // // // //           font-weight: 800;
// // // // //         }

// // // // //         .hp-package-select {
// // // // //           width: min(100%, 340px);
// // // // //           min-height: 43px;
// // // // //           padding: 10px 13px;
// // // // //           color: #07552e;
// // // // //           background: #f8fcf6;
// // // // //           border: 1px solid #cbdcbe;
// // // // //           border-radius: 9px;
// // // // //           font-size: 13px;
// // // // //           font-weight: 800;
// // // // //           outline: none;
// // // // //           cursor: pointer;
// // // // //         }

// // // // //         .hp-refresh-button,
// // // // //         .hp-jump-button {
// // // // //           display: inline-flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           gap: 7px;
// // // // //           min-height: 40px;
// // // // //           padding: 9px 13px;
// // // // //           color: white;
// // // // //           background: #08783f;
// // // // //           border: 0;
// // // // //           border-radius: 8px;
// // // // //           font-weight: 800;
// // // // //           cursor: pointer;
// // // // //         }

// // // // //         .hp-jump-button {
// // // // //           background: #07552e;
// // // // //         }

// // // // //         .hp-refresh-button:disabled {
// // // // //           opacity: .6;
// // // // //           cursor: wait;
// // // // //         }

// // // // //         .hp-package-card {
// // // // //           margin-bottom: 16px;
// // // // //           overflow: hidden;
// // // // //           border: 1px solid #cbdcbe;
// // // // //           border-radius: 13px;
// // // // //           background: white;
// // // // //           scroll-margin-top: 18px;
// // // // //         }

// // // // //         .hp-package-card-header {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           justify-content: space-between;
// // // // //           gap: 12px;
// // // // //           width: 100%;
// // // // //           padding: 15px 17px;
// // // // //           color: white;
// // // // //           text-align: left;
// // // // //           background: linear-gradient(110deg, #087b3e, #07572e);
// // // // //           border: 0;
// // // // //           cursor: pointer;
// // // // //         }

// // // // //         .hp-package-card-header:hover {
// // // // //           background: linear-gradient(110deg, #096d39, #064a28);
// // // // //         }

// // // // //         .hp-package-title {
// // // // //           display: flex;
// // // // //           flex-direction: column;
// // // // //           gap: 5px;
// // // // //           min-width: 0;
// // // // //         }

// // // // //         .hp-package-title strong {
// // // // //           font-size: 16px;
// // // // //           font-weight: 950;
// // // // //           overflow-wrap: anywhere;
// // // // //         }

// // // // //         .hp-package-title small {
// // // // //           color: #d8f0dc;
// // // // //           font-size: 10px;
// // // // //           font-weight: 700;
// // // // //         }

// // // // //         .hp-package-header-right {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 9px;
// // // // //           flex-shrink: 0;
// // // // //         }

// // // // //         .hp-package-header-right svg {
// // // // //           color: #ffe47a;
// // // // //         }

// // // // //         .hp-status {
// // // // //           display: inline-flex;
// // // // //           align-items: center;
// // // // //           justify-content: center;
// // // // //           padding: 5px 9px;
// // // // //           border-radius: 20px;
// // // // //           font-size: 10px;
// // // // //           font-weight: 900;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-status.green {
// // // // //           color: #08783f;
// // // // //           background: #e4f7e9;
// // // // //         }

// // // // //         .hp-status.orange {
// // // // //           color: #a65a08;
// // // // //           background: #fff0d9;
// // // // //         }

// // // // //         .hp-status.blue {
// // // // //           color: #1760a4;
// // // // //           background: #e8f2ff;
// // // // //         }

// // // // //         .hp-status.red {
// // // // //           color: #b42318;
// // // // //           background: #ffebeb;
// // // // //         }

// // // // //         .hp-status.gray {
// // // // //           color: #68756d;
// // // // //           background: #edf0ed;
// // // // //         }

// // // // //         .hp-package-meta {
// // // // //           display: grid;
// // // // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // // // //           gap: 9px;
// // // // //           padding: 12px;
// // // // //           background: #f8fcf6;
// // // // //           border-bottom: 1px solid var(--border);
// // // // //         }

// // // // //         .hp-meta-item {
// // // // //           min-width: 0;
// // // // //           padding: 10px;
// // // // //           border: 1px solid #e0ebdc;
// // // // //           border-radius: 9px;
// // // // //           background: white;
// // // // //         }

// // // // //         .hp-meta-item small {
// // // // //           display: block;
// // // // //           color: #829087;
// // // // //           font-size: 9px;
// // // // //           font-weight: 800;
// // // // //           text-transform: uppercase;
// // // // //         }

// // // // //         .hp-meta-item strong {
// // // // //           display: block;
// // // // //           margin-top: 5px;
// // // // //           color: #175a32;
// // // // //           font-size: 12px;
// // // // //           overflow-wrap: anywhere;
// // // // //         }

// // // // //         .hp-table-scroll {
// // // // //           width: 100%;
// // // // //           overflow-x: auto;
// // // // //           scrollbar-width: thin;
// // // // //         }

// // // // //         .hp-package-table {
// // // // //           width: 100%;
// // // // //           min-width: 850px;
// // // // //           border-collapse: collapse;
// // // // //           text-align: left;
// // // // //         }

// // // // //         .hp-package-table th {
// // // // //           padding: 12px 10px;
// // // // //           color: #175a32;
// // // // //           background: #eaf5e5;
// // // // //           border-bottom: 1px solid #d9e7d3;
// // // // //           font-size: 11px;
// // // // //           font-weight: 900;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-package-table td {
// // // // //           padding: 12px 10px;
// // // // //           color: #253c2c;
// // // // //           border-bottom: 1px solid #d9e7d3;
// // // // //           font-size: 11px;
// // // // //           font-weight: 700;
// // // // //           vertical-align: middle;
// // // // //         }

// // // // //         .hp-package-table tbody tr:nth-child(even) td {
// // // // //           background: #f4faef;
// // // // //         }

// // // // //         .hp-package-table tbody tr.current-stage td {
// // // // //           background: #fff8df;
// // // // //         }

// // // // //         .hp-stage-name {
// // // // //           display: block;
// // // // //           color: #175a32;
// // // // //           font-weight: 950;
// // // // //         }

// // // // //         .hp-duration-cell {
// // // // //           color: #805c0b !important;
// // // // //           background: #fff4d6 !important;
// // // // //           font-weight: 900 !important;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-achieved-yes {
// // // // //           display: inline-flex;
// // // // //           align-items: center;
// // // // //           gap: 5px;
// // // // //           color: #08783f;
// // // // //           font-weight: 900;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-achieved-no {
// // // // //           color: #879188;
// // // // //           font-weight: 800;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-timer-cell {
// // // // //           min-width: 150px;
// // // // //           color: #175a32;
// // // // //           font-weight: 800;
// // // // //           white-space: nowrap;
// // // // //         }

// // // // //         .hp-income-cell {
// // // // //           color: #68756d !important;
// // // // //           font-size: 10px !important;
// // // // //           font-weight: 700 !important;
// // // // //         }

// // // // //         .hp-empty {
// // // // //           padding: 22px;
// // // // //           color: #68756d;
// // // // //           text-align: center;
// // // // //           background: #f8fcf6;
// // // // //           border-radius: 10px;
// // // // //           font-size: 13px;
// // // // //         }

// // // // //         .hp-plan-error {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 8px;
// // // // //           padding: 12px;
// // // // //           margin-bottom: 12px;
// // // // //           color: #a52b25;
// // // // //           background: #fff0ef;
// // // // //           border: 1px solid #f3c6c3;
// // // // //           border-radius: 10px;
// // // // //           font-size: 12px;
// // // // //         }

// // // // //         .hp-notice {
// // // // //           display: flex;
// // // // //           align-items: flex-start;
// // // // //           gap: 8px;
// // // // //           margin-top: 12px;
// // // // //           padding: 11px 13px;
// // // // //           border: 1px solid #eadba6;
// // // // //           border-radius: 10px;
// // // // //           color: #725c20;
// // // // //           background: #fff9e8;
// // // // //           font-size: 11px;
// // // // //           line-height: 1.6;
// // // // //         }

// // // // //         .hp-plan-footer {
// // // // //           margin-top: 12px;
// // // // //           text-align: center;
// // // // //           color: #849389;
// // // // //           font-size: 9px;
// // // // //           font-weight: 700;
// // // // //         }

// // // // //         @media (max-width: 640px) {
// // // // //           .hp-plan {
// // // // //             padding: 9px;
// // // // //           }

// // // // //           .hp-plan-header {
// // // // //             padding: 13px 11px;
// // // // //           }

// // // // //           .hp-plan-tag {
// // // // //             padding: 6px 8px;
// // // // //             font-size: 9px;
// // // // //           }

// // // // //           .hp-summary {
// // // // //             gap: 6px;
// // // // //           }

// // // // //           .hp-summary-card {
// // // // //             padding: 9px;
// // // // //             gap: 7px;
// // // // //           }

// // // // //           .hp-summary-icon {
// // // // //             width: 30px;
// // // // //             height: 30px;
// // // // //           }

// // // // //           .hp-summary-value {
// // // // //             font-size: 13px;
// // // // //           }

// // // // //           .hp-selector-row {
// // // // //             align-items: stretch;
// // // // //             flex-direction: column;
// // // // //           }

// // // // //           .hp-package-select,
// // // // //           .hp-refresh-button,
// // // // //           .hp-jump-button {
// // // // //             width: 100%;
// // // // //           }

// // // // //           .hp-package-card-header {
// // // // //             padding: 13px 11px;
// // // // //           }

// // // // //           .hp-package-title strong {
// // // // //             font-size: 14px;
// // // // //           }

// // // // //           .hp-package-header-right {
// // // // //             gap: 5px;
// // // // //           }

// // // // //           .hp-package-meta {
// // // // //             grid-template-columns: 1fr 1fr;
// // // // //             gap: 6px;
// // // // //             padding: 8px;
// // // // //           }

// // // // //           .hp-meta-item {
// // // // //             padding: 8px;
// // // // //           }

// // // // //           .hp-package-table {
// // // // //             min-width: 800px;
// // // // //           }
// // // // //         }

// // // // //         @media (max-width: 360px) {
// // // // //           .hp-plan-tag {
// // // // //             display: none;
// // // // //           }

// // // // //           .hp-plan-header h2 {
// // // // //             font-size: 15px;
// // // // //           }

// // // // //           .hp-package-meta {
// // // // //             grid-template-columns: 1fr;
// // // // //           }
// // // // //         }
// // // // //       `}</style>

// // // // //       <div className="hp-plan-header">
// // // // //         <div className="hp-plan-heading">
// // // // //           <div className="hp-plan-heading-icon">
// // // // //             <Package size={23} />
// // // // //           </div>

// // // // //           <div>
// // // // //             <h2>
// // // // //               PACKAGE <span>PROGRESS</span>
// // // // //             </h2>
// // // // //             <p>Helping Pools • Package Activity Tracker</p>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="hp-plan-tag">
// // // // //           <Sparkles size={12} /> LIVE STATUS
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="hp-summary">
// // // // //         <div className="hp-summary-card">
// // // // //           <div className="hp-summary-icon">
// // // // //             <Package size={18} />
// // // // //           </div>
// // // // //           <div>
// // // // //             <div className="hp-summary-label">Purchased Cycles</div>
// // // // //             <div className="hp-summary-value">{totalPurchased}</div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="hp-summary-card">
// // // // //           <div className="hp-summary-icon">
// // // // //             <CheckCircle2 size={18} />
// // // // //           </div>
// // // // //           <div>
// // // // //             <div className="hp-summary-label">Completed Stages</div>
// // // // //             <div className="hp-summary-value">
// // // // //               {totalCompletedStages}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="hp-selector-card">
// // // // //         <div className="hp-selector-heading">
// // // // //           Go To Purchased Package
// // // // //         </div>

// // // // //         <div className="hp-selector-row">
// // // // //           <label htmlFor="hp-package-select">Select Package:</label>

// // // // //           <select
// // // // //             id="hp-package-select"
// // // // //             className="hp-package-select"
// // // // //             value={selectedSubscription}
// // // // //             onChange={(event) =>
// // // // //               setSelectedSubscription(event.target.value)
// // // // //             }
// // // // //           >
// // // // //             {subscriptions.length === 0 && (
// // // // //               <option value="">No purchased packages</option>
// // // // //             )}

// // // // //             {subscriptions.map((item) => (
// // // // //               <option key={item._id} value={String(item._id)}>
// // // // //                 {money(item.packageAmount)} Package
// // // // //                 {" — Cycle "}
// // // // //                 {item.cycleNumber || 1}
// // // // //               </option>
// // // // //             ))}
// // // // //           </select>

// // // // //           <button
// // // // //             className="hp-jump-button"
// // // // //             type="button"
// // // // //             onClick={jumpToPackage}
// // // // //             disabled={!selectedSubscription}
// // // // //           >
// // // // //             <ExternalLink size={14} />
// // // // //             Show Package
// // // // //           </button>

// // // // //           <button
// // // // //             className="hp-refresh-button"
// // // // //             type="button"
// // // // //             onClick={handleRefresh}
// // // // //             disabled={refreshing}
// // // // //           >
// // // // //             <RefreshCw size={14} />
// // // // //             {refreshing ? "Refreshing..." : "Refresh"}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {error && (
// // // // //         <div className="hp-plan-error">
// // // // //           <AlertCircle size={15} />
// // // // //           {error}
// // // // //         </div>
// // // // //       )}

// // // // //       {loading ? (
// // // // //         <div className="hp-empty">Loading package progress...</div>
// // // // //       ) : subscriptions.length === 0 ? (
// // // // //         <div className="hp-empty">
// // // // //           You have not purchased any packages yet.
// // // // //         </div>
// // // // //       ) : (
// // // // //         subscriptions.map((subscription) => {
// // // // //           const id = String(subscription._id);
// // // // //           const stages = getPackageStages(subscription);
// // // // //           const isExpanded = expandedPackages[id] !== false;

// // // // //           const completedStages = stages.filter(
// // // // //             (stage) => stage.status === "ACHIEVED"
// // // // //           ).length;

// // // // //           const currentStageNumber = Number(
// // // // //             subscription.currentStage || 1
// // // // //           );

// // // // //           const currentStage = stages.find(
// // // // //             (stage) => stage.stageNumber === currentStageNumber
// // // // //           );

// // // // //           return (
// // // // //             <section
// // // // //               className="hp-package-card"
// // // // //               id={`package-card-${id}`}
// // // // //               key={id}
// // // // //             >
// // // // //               <button
// // // // //                 className="hp-package-card-header"
// // // // //                 type="button"
// // // // //                 onClick={() => togglePackage(id)}
// // // // //                 aria-expanded={isExpanded}
// // // // //               >
// // // // //                 <span className="hp-package-title">
// // // // //                   <strong>
// // // // //                     {money(subscription.packageAmount)} Package
// // // // //                   </strong>
// // // // //                   <small>
// // // // //                     Cycle {subscription.cycleNumber || 1}
// // // // //                     {" • "}
// // // // //                     {completedStages}/14 stages completed
// // // // //                   </small>
// // // // //                 </span>

// // // // //                 <span className="hp-package-header-right">
// // // // //                   <span className={`hp-status ${statusClass(subscription.status)}`}>
// // // // //                     {statusLabel(subscription.status)}
// // // // //                   </span>

// // // // //                   {isExpanded
// // // // //                     ? <ChevronUp size={20} />
// // // // //                     : <ChevronDown size={20} />
// // // // //                   }
// // // // //                 </span>
// // // // //               </button>

// // // // //               {isExpanded && (
// // // // //                 <>
// // // // //                   <div className="hp-package-meta">
// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Package Amount</small>
// // // // //                       <strong>{money(subscription.packageAmount)}</strong>
// // // // //                     </div>

// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Current Stage</small>
// // // // //                       <strong>
// // // // //                         {subscription.status === "COMPLETED"
// // // // //                           ? "All stages completed"
// // // // //                           : `Stage ${currentStageNumber} / 14`}
// // // // //                       </strong>
// // // // //                     </div>

// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Current Stage Status</small>
// // // // //                       <strong>
// // // // //                         {statusLabel(currentStage?.status || "LOCKED")}
// // // // //                       </strong>
// // // // //                     </div>

// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Timer Remaining</small>
// // // // //                       <strong>
// // // // //                         {currentStage?.status === "RUNNING"
// // // // //                           ? getRemainingTime(currentStage.endsAt, now)
// // // // //                           : currentStage?.status === "PAUSED"
// // // // //                           ? "Timer paused"
// // // // //                           : currentStage?.status === "ACHIEVED"
// // // // //                           ? "Stage completed"
// // // // //                           : "Not started"}
// // // // //                       </strong>
// // // // //                     </div>

// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Purchased At</small>
// // // // //                       <strong>
// // // // //                         {subscription.purchasedAt
// // // // //                           ? new Date(subscription.purchasedAt).toLocaleString()
// // // // //                           : "Not available"}
// // // // //                       </strong>
// // // // //                     </div>

// // // // //                     <div className="hp-meta-item">
// // // // //                       <small>Stage Progress</small>
// // // // //                       <strong>{completedStages} / 14</strong>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="hp-table-scroll">
// // // // //                     <table className="hp-package-table">
// // // // //                       <thead>
// // // // //                         <tr>
// // // // //                           <th>Stage</th>
// // // // //                           <th>Duration / Days</th>
// // // // //                           <th>Stage Status</th>
// // // // //                           <th>Timer / Remaining Time</th>
// // // // //                           <th>Stage-wise Income</th>
// // // // //                           <th>Achieved?</th>
// // // // //                         </tr>
// // // // //                       </thead>

// // // // //                       <tbody>
// // // // //                         {stages.map((stage) => {
// // // // //                           const isCurrent =
// // // // //                             subscription.status === "ACTIVE" &&
// // // // //                             stage.stageNumber === currentStageNumber;

// // // // //                           let timer = "Not started";

// // // // //                           if (stage.status === "RUNNING") {
// // // // //                             timer = getRemainingTime(stage.endsAt, now);
// // // // //                           } else if (stage.status === "PAUSED") {
// // // // //                             timer = "Timer paused";
// // // // //                           } else if (stage.status === "ACHIEVED") {
// // // // //                             timer = "Completed";
// // // // //                           } else if (stage.status === "WAITING") {
// // // // //                             timer = "Waiting to start";
// // // // //                           } else if (stage.status === "LOCKED") {
// // // // //                             timer = "Locked";
// // // // //                           }

// // // // //                           const achieved = stage.status === "ACHIEVED";

// // // // //                           return (
// // // // //                             <tr
// // // // //                               key={stage.stageNumber}
// // // // //                               className={isCurrent ? "current-stage" : ""}
// // // // //                             >
// // // // //                               <td>
// // // // //                                 <span className="hp-stage-name">
// // // // //                                   Stage {stage.stageNumber}
// // // // //                                 </span>
// // // // //                               </td>

// // // // //                               <td className="hp-duration-cell">
// // // // //                                 <CalendarDays
// // // // //                                   size={12}
// // // // //                                   style={{
// // // // //                                     display: "inline",
// // // // //                                     marginRight: 5,
// // // // //                                     verticalAlign: "middle"
// // // // //                                   }}
// // // // //                                 />
// // // // //                                 {stage.durationDays}
// // // // //                                 {" "}
// // // // //                                 {stage.durationDays === 1 ? "Day" : "Days"}
// // // // //                               </td>

// // // // //                               <td>
// // // // //                                 <span className={`hp-status ${statusClass(stage.status)}`}>
// // // // //                                   {statusLabel(stage.status)}
// // // // //                                 </span>
// // // // //                               </td>

// // // // //                               <td className="hp-timer-cell">
// // // // //                                 <Clock3
// // // // //                                   size={12}
// // // // //                                   style={{
// // // // //                                     display: "inline",
// // // // //                                     marginRight: 5,
// // // // //                                     verticalAlign: "middle"
// // // // //                                   }}
// // // // //                                 />
// // // // //                                 {timer}
// // // // //                               </td>

// // // // //                               <td className="hp-income-cell">
// // // // //                                 No stage-wise record
// // // // //                               </td>

// // // // //                               <td>
// // // // //                                 {achieved ? (
// // // // //                                   <span className="hp-achieved-yes">
// // // // //                                     <CheckCircle2 size={14} />
// // // // //                                     Yes
// // // // //                                   </span>
// // // // //                                 ) : (
// // // // //                                   <span className="hp-achieved-no">
// // // // //                                     No
// // // // //                                   </span>
// // // // //                                 )}
// // // // //                               </td>
// // // // //                             </tr>
// // // // //                           );
// // // // //                         })}
// // // // //                       </tbody>
// // // // //                     </table>
// // // // //                   </div>
// // // // //                 </>
// // // // //               )}
// // // // //             </section>
// // // // //           );
// // // // //         })
// // // // //       )}

// // // // //       <div className="hp-notice">
// // // // //         <AlertCircle size={15} />
// // // // //         <span>
// // // // //           Each purchased package and retopup cycle is displayed separately.
// // // // //           Stage status and timers come from backend records. Stage-wise
// // // // //           income is not available in the current backend data.
// // // // //         </span>
// // // // //       </div>

// // // // //       <div className="hp-plan-footer">
// // // // //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // import React, { useEffect, useState, useCallback, useMemo } from "react";
// // // // import {
// // // //   Package,
// // // //   Clock3,
// // // //   Sparkles,
// // // //   RefreshCw,
// // // //   AlertCircle,
// // // //   CheckCircle2,
// // // //   ChevronDown,
// // // //   ChevronUp,
// // // //   CalendarDays,
// // // //   ExternalLink
// // // // } from "lucide-react";

// // // // import api from "../../api/axios";

// // // // const packages = [30, 60, 120, 240, 480, 960];

// // // // const stageDurations = [
// // // //   1, 3, 7, 15,
// // // //   30, 30, 30, 30, 30, 30,
// // // //   30, 30, 30, 30
// // // // ];

// // // // // Reference schedule only. These are not actual payments or guaranteed income.
// // // // const stageAmounts = [
// // // //   [5, 10, 20, 40, 80, 160],
// // // //   [5, 10, 20, 40, 80, 160],
// // // //   [10, 20, 40, 80, 160, 320],
// // // //   [20, 40, 80, 160, 320, 640],
// // // //   [30, 60, 120, 240, 480, 960],
// // // //   [30, 60, 120, 240, 480, 960],
// // // //   [50, 100, 200, 400, 800, 1600],
// // // //   [50, 100, 200, 400, 800, 1600],
// // // //   [100, 200, 400, 800, 1600, 3200],
// // // //   [200, 400, 800, 1600, 3200, 6400],
// // // //   [400, 800, 1600, 3200, 6400, 12800],
// // // //   [800, 1600, 3200, 6400, 12800, 25600],
// // // //   [1600, 3200, 6400, 12800, 25600, 51200],
// // // //   [3200, 6400, 12800, 25600, 51200, 102400]
// // // // ];

// // // // const money = (value) =>
// // // //   "$" + Number(value || 0).toLocaleString("en-US");

// // // // const getPackageColumn = (amount) =>
// // // //   packages.indexOf(Number(amount));

// // // // const getReferenceAmount = (amount, stageIndex) => {
// // // //   const column = getPackageColumn(amount);

// // // //   if (column < 0) return 0;

// // // //   return Number(stageAmounts[stageIndex]?.[column] || 0);
// // // // };

// // // // const getRemainingTime = (endsAt, now) => {
// // // //   if (!endsAt) return "Not started";

// // // //   const remaining = new Date(endsAt).getTime() - now;

// // // //   if (Number.isNaN(remaining)) return "Unavailable";
// // // //   if (remaining <= 0) return "Time completed";

// // // //   const days = Math.floor(remaining / 86400000);
// // // //   const hours = Math.floor((remaining % 86400000) / 3600000);
// // // //   const minutes = Math.floor((remaining % 3600000) / 60000);
// // // //   const seconds = Math.floor((remaining % 60000) / 1000);

// // // //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // // // };

// // // // const statusClass = (status) => {
// // // //   const value = String(status || "").toUpperCase();

// // // //   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
// // // //     return "green";
// // // //   }

// // // //   if (value === "PAUSED") return "orange";
// // // //   if (["WAITING", "PENDING"].includes(value)) return "blue";
// // // //   if (value === "CANCELLED") return "red";

// // // //   return "gray";
// // // // };

// // // // const statusLabel = (status) => {
// // // //   const labels = {
// // // //     RUNNING: "Running",
// // // //     ACTIVE: "Active",
// // // //     PAUSED: "Paused",
// // // //     WAITING: "Waiting",
// // // //     LOCKED: "Locked",
// // // //     ACHIEVED: "Achieved",
// // // //     COMPLETED: "Completed",
// // // //     CANCELLED: "Cancelled",
// // // //     PENDING: "Pending"
// // // //   };

// // // //   const value = String(status || "LOCKED").toUpperCase();
// // // //   return labels[value] || value;
// // // // };

// // // // const getPackageStages = (subscription) => {
// // // //   return Array.from({ length: 14 }, (_, index) => {
// // // //     const stageNumber = index + 1;

// // // //     const savedStage = subscription?.stages?.find(
// // // //       (item) => Number(item.stageNumber) === stageNumber
// // // //     );

// // // //     return {
// // // //       stageNumber,
// // // //       durationDays: Number(
// // // //         savedStage?.durationDays || stageDurations[index]
// // // //       ),
// // // //       status: String(savedStage?.status || "LOCKED").toUpperCase(),
// // // //       startedAt: savedStage?.startedAt || null,
// // // //       endsAt: savedStage?.endsAt || null,
// // // //       completedAt: savedStage?.completedAt || null
// // // //     };
// // // //   });
// // // // };

// // // // export default function Plan() {
// // // //   const [subscriptions, setSubscriptions] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [refreshing, setRefreshing] = useState(false);
// // // //   const [error, setError] = useState("");
// // // //   const [now, setNow] = useState(Date.now());
// // // //   const [expandedPackages, setExpandedPackages] = useState({});
// // // //   const [selectedSubscription, setSelectedSubscription] = useState("");

// // // //   const fetchProgress = useCallback(async (showLoader = false) => {
// // // //     try {
// // // //       if (showLoader) setRefreshing(true);

// // // //       const response = await api.get("/package-progress");

// // // //       if (response.data?.success) {
// // // //         const list = response.data.packages || [];

// // // //         const sorted = [...list].sort((a, b) => {
// // // //           const amountDifference =
// // // //             Number(a.packageAmount) - Number(b.packageAmount);

// // // //           if (amountDifference !== 0) return amountDifference;

// // // //           return (
// // // //             new Date(a.purchasedAt || 0).getTime() -
// // // //             new Date(b.purchasedAt || 0).getTime()
// // // //           );
// // // //         });

// // // //         setSubscriptions(sorted);
// // // //         setError("");

// // // //         setExpandedPackages((previous) => {
// // // //           const next = { ...previous };

// // // //           sorted.forEach((item) => {
// // // //             const id = String(item._id);

// // // //             if (next[id] === undefined) {
// // // //               next[id] = true;
// // // //             }
// // // //           });

// // // //           return next;
// // // //         });

// // // //         setSelectedSubscription((current) => {
// // // //           if (
// // // //             current &&
// // // //             sorted.some((item) => String(item._id) === current)
// // // //           ) {
// // // //             return current;
// // // //           }

// // // //           return sorted.length ? String(sorted[0]._id) : "";
// // // //         });
// // // //       } else {
// // // //         setError("Package progress could not be loaded.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Package progress fetch error:", err);

// // // //       setError(
// // // //         err.response?.data?.message ||
// // // //         "Unable to load package progress. Please login again."
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //       setRefreshing(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchProgress();

// // // //     const refreshInterval = setInterval(() => {
// // // //       fetchProgress();
// // // //     }, 30000);

// // // //     const clockInterval = setInterval(() => {
// // // //       setNow(Date.now());
// // // //     }, 1000);

// // // //     return () => {
// // // //       clearInterval(refreshInterval);
// // // //       clearInterval(clockInterval);
// // // //     };
// // // //   }, [fetchProgress]);

// // // //   const handleRefresh = () => {
// // // //     fetchProgress(true);
// // // //   };

// // // //   const togglePackage = (id) => {
// // // //     setExpandedPackages((previous) => ({
// // // //       ...previous,
// // // //       [id]: !previous[id]
// // // //     }));
// // // //   };

// // // //   const jumpToPackage = () => {
// // // //     if (!selectedSubscription) return;

// // // //     setExpandedPackages((previous) => ({
// // // //       ...previous,
// // // //       [selectedSubscription]: true
// // // //     }));

// // // //     setTimeout(() => {
// // // //       document
// // // //         .getElementById(`package-card-${selectedSubscription}`)
// // // //         ?.scrollIntoView({
// // // //           behavior: "smooth",
// // // //           block: "start"
// // // //         });
// // // //     }, 100);
// // // //   };

// // // //   const totalCompletedStages = useMemo(() => {
// // // //     return subscriptions.reduce((total, subscription) => {
// // // //       const stages = getPackageStages(subscription);

// // // //       return (
// // // //         total +
// // // //         stages.filter((stage) => stage.status === "ACHIEVED").length
// // // //       );
// // // //     }, 0);
// // // //   }, [subscriptions]);

// // // //   const referenceTotals = useMemo(() => {
// // // //     return packages.map((amount, columnIndex) => ({
// // // //       amount,
// // // //       total: stageAmounts.reduce(
// // // //         (sum, row) => sum + Number(row[columnIndex] || 0),
// // // //         0
// // // //       )
// // // //     }));
// // // //   }, []);

// // // //   return (
// // // //     <div className="hp-plan">
// // // //       <style>{`
// // // //         .hp-plan {
// // // //           --green: #08783f;
// // // //           --dark: #07552e;
// // // //           --gold: #e5b83f;
// // // //           --border: #d8e9d3;
// // // //           width: 100%;
// // // //           padding: 15px;
// // // //           color: #173522;
// // // //           background: #f5f9f1;
// // // //           border-radius: 16px;
// // // //           font-family: Inter, Arial, sans-serif;
// // // //           box-sizing: border-box;
// // // //         }

// // // //         .hp-plan * {
// // // //           box-sizing: border-box;
// // // //         }

// // // //         .hp-plan-header {
// // // //           display: flex;
// // // //           justify-content: space-between;
// // // //           align-items: center;
// // // //           gap: 12px;
// // // //           padding: 17px 20px;
// // // //           margin-bottom: 15px;
// // // //           border: 2px solid var(--gold);
// // // //           border-radius: 15px;
// // // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // // //         }

// // // //         .hp-plan-heading {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 11px;
// // // //           min-width: 0;
// // // //         }

// // // //         .hp-plan-heading-icon {
// // // //           display: grid;
// // // //           place-items: center;
// // // //           width: 42px;
// // // //           height: 42px;
// // // //           color: #f8d76f;
// // // //           background: #ffffff16;
// // // //           border-radius: 11px;
// // // //           flex-shrink: 0;
// // // //         }

// // // //         .hp-plan-header h2 {
// // // //           margin: 0;
// // // //           color: white;
// // // //           font-size: clamp(16px, 2.4vw, 23px);
// // // //           font-weight: 950;
// // // //         }

// // // //         .hp-plan-header h2 span {
// // // //           color: #ffe36c;
// // // //         }

// // // //         .hp-plan-header p {
// // // //           margin: 4px 0 0;
// // // //           color: #d5ebd9;
// // // //           font-size: 11px;
// // // //         }

// // // //         .hp-plan-tag {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 6px;
// // // //           padding: 8px 12px;
// // // //           border: 1px solid #f5d36a;
// // // //           border-radius: 30px;
// // // //           color: #ffe47a;
// // // //           font-size: 10px;
// // // //           font-weight: 900;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-summary {
// // // //           display: grid;
// // // //           grid-template-columns: repeat(2, minmax(0, 1fr));
// // // //           gap: 10px;
// // // //           margin-bottom: 14px;
// // // //         }

// // // //         .hp-summary-card {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 10px;
// // // //           padding: 12px;
// // // //           border: 1px solid var(--border);
// // // //           border-radius: 12px;
// // // //           background: white;
// // // //           min-width: 0;
// // // //         }

// // // //         .hp-summary-icon {
// // // //           display: grid;
// // // //           place-items: center;
// // // //           width: 36px;
// // // //           height: 36px;
// // // //           flex-shrink: 0;
// // // //           color: var(--green);
// // // //           background: #eaf7e9;
// // // //           border-radius: 10px;
// // // //         }

// // // //         .hp-summary-label {
// // // //           color: #849389;
// // // //           font-size: 9px;
// // // //           font-weight: 800;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-summary-value {
// // // //           margin-top: 4px;
// // // //           color: #16452b;
// // // //           font-size: 16px;
// // // //           font-weight: 950;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-selector-card {
// // // //           padding: 16px;
// // // //           margin-bottom: 15px;
// // // //           border: 1px solid var(--border);
// // // //           border-radius: 13px;
// // // //           background: white;
// // // //         }

// // // //         .hp-selector-heading {
// // // //           margin-bottom: 10px;
// // // //           color: #175a32;
// // // //           font-size: 15px;
// // // //           font-weight: 900;
// // // //         }

// // // //         .hp-selector-row {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 12px;
// // // //           flex-wrap: wrap;
// // // //         }

// // // //         .hp-selector-row label {
// // // //           color: #66776c;
// // // //           font-size: 12px;
// // // //           font-weight: 800;
// // // //         }

// // // //         .hp-package-select {
// // // //           width: min(100%, 340px);
// // // //           min-height: 43px;
// // // //           padding: 10px 13px;
// // // //           color: #07552e;
// // // //           background: #f8fcf6;
// // // //           border: 1px solid #cbdcbe;
// // // //           border-radius: 9px;
// // // //           font-size: 13px;
// // // //           font-weight: 800;
// // // //           outline: none;
// // // //           cursor: pointer;
// // // //         }

// // // //         .hp-refresh-button,
// // // //         .hp-jump-button {
// // // //           display: inline-flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           gap: 7px;
// // // //           min-height: 40px;
// // // //           padding: 9px 13px;
// // // //           color: white;
// // // //           background: #08783f;
// // // //           border: 0;
// // // //           border-radius: 8px;
// // // //           font-weight: 800;
// // // //           cursor: pointer;
// // // //         }

// // // //         .hp-jump-button {
// // // //           background: #07552e;
// // // //         }

// // // //         .hp-refresh-button:disabled,
// // // //         .hp-jump-button:disabled {
// // // //           opacity: .6;
// // // //           cursor: not-allowed;
// // // //         }

// // // //         .hp-package-card {
// // // //           margin-bottom: 16px;
// // // //           overflow: hidden;
// // // //           border: 1px solid #cbdcbe;
// // // //           border-radius: 13px;
// // // //           background: white;
// // // //           scroll-margin-top: 18px;
// // // //         }

// // // //         .hp-package-card-header {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 12px;
// // // //           width: 100%;
// // // //           padding: 15px 17px;
// // // //           color: white;
// // // //           text-align: left;
// // // //           background: linear-gradient(110deg, #087b3e, #07572e);
// // // //           border: 0;
// // // //           cursor: pointer;
// // // //         }

// // // //         .hp-package-title {
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           gap: 5px;
// // // //           min-width: 0;
// // // //         }

// // // //         .hp-package-title strong {
// // // //           font-size: 16px;
// // // //           font-weight: 950;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-package-title small {
// // // //           color: #d8f0dc;
// // // //           font-size: 10px;
// // // //           font-weight: 700;
// // // //         }

// // // //         .hp-package-header-right {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 9px;
// // // //           flex-shrink: 0;
// // // //         }

// // // //         .hp-package-header-right svg {
// // // //           color: #ffe47a;
// // // //         }

// // // //         .hp-status {
// // // //           display: inline-flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           padding: 5px 9px;
// // // //           border-radius: 20px;
// // // //           font-size: 10px;
// // // //           font-weight: 900;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-status.green {
// // // //           color: #08783f;
// // // //           background: #e4f7e9;
// // // //         }

// // // //         .hp-status.orange {
// // // //           color: #a65a08;
// // // //           background: #fff0d9;
// // // //         }

// // // //         .hp-status.blue {
// // // //           color: #1760a4;
// // // //           background: #e8f2ff;
// // // //         }

// // // //         .hp-status.red {
// // // //           color: #b42318;
// // // //           background: #ffebeb;
// // // //         }

// // // //         .hp-status.gray {
// // // //           color: #68756d;
// // // //           background: #edf0ed;
// // // //         }

// // // //         .hp-package-meta {
// // // //           display: grid;
// // // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // // //           gap: 9px;
// // // //           padding: 12px;
// // // //           background: #f8fcf6;
// // // //           border-bottom: 1px solid var(--border);
// // // //         }

// // // //         .hp-meta-item {
// // // //           min-width: 0;
// // // //           padding: 10px;
// // // //           border: 1px solid #e0ebdc;
// // // //           border-radius: 9px;
// // // //           background: white;
// // // //         }

// // // //         .hp-meta-item small {
// // // //           display: block;
// // // //           color: #829087;
// // // //           font-size: 9px;
// // // //           font-weight: 800;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-meta-item strong {
// // // //           display: block;
// // // //           margin-top: 5px;
// // // //           color: #175a32;
// // // //           font-size: 12px;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-table-scroll {
// // // //           width: 100%;
// // // //           overflow-x: auto;
// // // //           scrollbar-width: thin;
// // // //         }

// // // //         .hp-package-table {
// // // //           width: 100%;
// // // //           min-width: 850px;
// // // //           border-collapse: collapse;
// // // //           text-align: left;
// // // //         }

// // // //         .hp-package-table th {
// // // //           padding: 12px 10px;
// // // //           color: #175a32;
// // // //           background: #eaf5e5;
// // // //           border-bottom: 1px solid #d9e7d3;
// // // //           font-size: 11px;
// // // //           font-weight: 900;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-package-table td {
// // // //           padding: 12px 10px;
// // // //           color: #253c2c;
// // // //           border-bottom: 1px solid #d9e7d3;
// // // //           font-size: 11px;
// // // //           font-weight: 700;
// // // //           vertical-align: middle;
// // // //         }

// // // //         .hp-package-table tbody tr:nth-child(even) td {
// // // //           background: #f4faef;
// // // //         }

// // // //         .hp-package-table tbody tr.current-stage td {
// // // //           background: #fff8df;
// // // //         }

// // // //         .hp-stage-name {
// // // //           color: #175a32;
// // // //           font-weight: 950;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-duration-cell {
// // // //           color: #805c0b !important;
// // // //           background: #fff4d6 !important;
// // // //           font-weight: 900 !important;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-reference-amount {
// // // //           color: #08783f !important;
// // // //           font-size: 12px !important;
// // // //           font-weight: 950 !important;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-achieved-yes {
// // // //           display: inline-flex;
// // // //           align-items: center;
// // // //           gap: 5px;
// // // //           color: #08783f;
// // // //           font-weight: 900;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-achieved-no {
// // // //           color: #879188;
// // // //           font-weight: 800;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-timer-cell {
// // // //           min-width: 150px;
// // // //           color: #175a32;
// // // //           font-weight: 800;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-total-row td {
// // // //           color: #07552e !important;
// // // //           background: #e5f5dc !important;
// // // //           font-size: 12px !important;
// // // //           font-weight: 950 !important;
// // // //           border-top: 2px solid #a9c99b;
// // // //         }

// // // //         .hp-empty {
// // // //           padding: 22px;
// // // //           color: #68756d;
// // // //           text-align: center;
// // // //           background: #f8fcf6;
// // // //           border-radius: 10px;
// // // //           font-size: 13px;
// // // //         }

// // // //         .hp-plan-error {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 8px;
// // // //           padding: 12px;
// // // //           margin-bottom: 12px;
// // // //           color: #a52b25;
// // // //           background: #fff0ef;
// // // //           border: 1px solid #f3c6c3;
// // // //           border-radius: 10px;
// // // //           font-size: 12px;
// // // //         }

// // // //         .hp-notice {
// // // //           display: flex;
// // // //           align-items: flex-start;
// // // //           gap: 8px;
// // // //           margin-top: 12px;
// // // //           padding: 11px 13px;
// // // //           border: 1px solid #eadba6;
// // // //           border-radius: 10px;
// // // //           color: #725c20;
// // // //           background: #fff9e8;
// // // //           font-size: 11px;
// // // //           line-height: 1.6;
// // // //         }

// // // //         .hp-plan-footer {
// // // //           margin-top: 12px;
// // // //           text-align: center;
// // // //           color: #849389;
// // // //           font-size: 9px;
// // // //           font-weight: 700;
// // // //         }

// // // //         @media (max-width: 640px) {
// // // //           .hp-plan {
// // // //             padding: 9px;
// // // //           }

// // // //           .hp-plan-header {
// // // //             padding: 13px 11px;
// // // //           }

// // // //           .hp-plan-tag {
// // // //             padding: 6px 8px;
// // // //             font-size: 9px;
// // // //           }

// // // //           .hp-summary {
// // // //             gap: 6px;
// // // //           }

// // // //           .hp-summary-card {
// // // //             padding: 9px;
// // // //             gap: 7px;
// // // //           }

// // // //           .hp-summary-icon {
// // // //             width: 30px;
// // // //             height: 30px;
// // // //           }

// // // //           .hp-summary-value {
// // // //             font-size: 13px;
// // // //           }

// // // //           .hp-selector-row {
// // // //             align-items: stretch;
// // // //             flex-direction: column;
// // // //           }

// // // //           .hp-package-select,
// // // //           .hp-refresh-button,
// // // //           .hp-jump-button {
// // // //             width: 100%;
// // // //           }

// // // //           .hp-package-card-header {
// // // //             padding: 13px 11px;
// // // //           }

// // // //           .hp-package-title strong {
// // // //             font-size: 14px;
// // // //           }

// // // //           .hp-package-header-right {
// // // //             gap: 5px;
// // // //           }

// // // //           .hp-package-meta {
// // // //             grid-template-columns: 1fr 1fr;
// // // //             gap: 6px;
// // // //             padding: 8px;
// // // //           }

// // // //           .hp-meta-item {
// // // //             padding: 8px;
// // // //           }

// // // //           .hp-package-table {
// // // //             min-width: 850px;
// // // //           }
// // // //         }

// // // //         @media (max-width: 360px) {
// // // //           .hp-plan-tag {
// // // //             display: none;
// // // //           }

// // // //           .hp-plan-header h2 {
// // // //             font-size: 15px;
// // // //           }

// // // //           .hp-package-meta {
// // // //             grid-template-columns: 1fr;
// // // //           }
// // // //         }
// // // //       `}</style>

// // // //       <div className="hp-plan-header">
// // // //         <div className="hp-plan-heading">
// // // //           <div className="hp-plan-heading-icon">
// // // //             <Package size={23} />
// // // //           </div>

// // // //           <div>
// // // //             <h2>
// // // //               PACKAGE <span>PROGRESS</span>
// // // //             </h2>
// // // //             <p>Helping Pools • Package Activity Tracker</p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="hp-plan-tag">
// // // //           <Sparkles size={12} /> LIVE STATUS
// // // //         </div>
// // // //       </div>

// // // //       <div className="hp-summary">
// // // //         <div className="hp-summary-card">
// // // //           <div className="hp-summary-icon">
// // // //             <Package size={18} />
// // // //           </div>
// // // //           <div>
// // // //             <div className="hp-summary-label">Purchased Cycles</div>
// // // //             <div className="hp-summary-value">
// // // //               {subscriptions.length}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="hp-summary-card">
// // // //           <div className="hp-summary-icon">
// // // //             <CheckCircle2 size={18} />
// // // //           </div>
// // // //           <div>
// // // //             <div className="hp-summary-label">Completed Stages</div>
// // // //             <div className="hp-summary-value">
// // // //               {totalCompletedStages}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="hp-selector-card">
// // // //         <div className="hp-selector-heading">
// // // //           Go To Purchased Package
// // // //         </div>

// // // //         <div className="hp-selector-row">
// // // //           <label htmlFor="hp-package-select">
// // // //             Select Package:
// // // //           </label>

// // // //           <select
// // // //             id="hp-package-select"
// // // //             className="hp-package-select"
// // // //             value={selectedSubscription}
// // // //             onChange={(event) =>
// // // //               setSelectedSubscription(event.target.value)
// // // //             }
// // // //           >
// // // //             {subscriptions.length === 0 && (
// // // //               <option key="no-purchased-packages" value="">
// // // //                 No purchased packages
// // // //               </option>
// // // //             )}

// // // //             {subscriptions.map((item) => (
// // // //               <option
// // // //                 key={String(item._id)}
// // // //                 value={String(item._id)}
// // // //               >
// // // //                 {money(item.packageAmount)}
// // // //                 {" Package — Cycle "}
// // // //                 {item.cycleNumber || 1}
// // // //               </option>
// // // //             ))}
// // // //           </select>

// // // //           <button
// // // //             className="hp-jump-button"
// // // //             type="button"
// // // //             onClick={jumpToPackage}
// // // //             disabled={!selectedSubscription}
// // // //           >
// // // //             <ExternalLink size={14} />
// // // //             Show Package
// // // //           </button>

// // // //           <button
// // // //             className="hp-refresh-button"
// // // //             type="button"
// // // //             onClick={handleRefresh}
// // // //             disabled={refreshing}
// // // //           >
// // // //             <RefreshCw size={14} />
// // // //             {refreshing ? "Refreshing..." : "Refresh"}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {error && (
// // // //         <div className="hp-plan-error">
// // // //           <AlertCircle size={15} />
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       {loading ? (
// // // //         <div className="hp-empty">
// // // //           Loading package progress...
// // // //         </div>
// // // //       ) : subscriptions.length === 0 ? (
// // // //         <div className="hp-empty">
// // // //           You have not purchased any packages yet.
// // // //         </div>
// // // //       ) : (
// // // //         subscriptions.map((subscription) => {
// // // //           const id = String(subscription._id);
// // // //           const stages = getPackageStages(subscription);
// // // //           const isExpanded = expandedPackages[id] !== false;

// // // //           const completedStages = stages.filter(
// // // //             (stage) => stage.status === "ACHIEVED"
// // // //           ).length;

// // // //           const currentStageNumber = Number(
// // // //             subscription.currentStage || 1
// // // //           );

// // // //           const currentStage = stages.find(
// // // //             (stage) => stage.stageNumber === currentStageNumber
// // // //           );

// // // //           const referenceTotal = stages.reduce(
// // // //             (sum, stage, index) =>
// // // //               sum + getReferenceAmount(subscription.packageAmount, index),
// // // //             0
// // // //           );

// // // //           return (
// // // //             <section
// // // //               className="hp-package-card"
// // // //               id={`package-card-${id}`}
// // // //               key={id}
// // // //             >
// // // //               <button
// // // //                 className="hp-package-card-header"
// // // //                 type="button"
// // // //                 onClick={() => togglePackage(id)}
// // // //                 aria-expanded={isExpanded}
// // // //               >
// // // //                 <span className="hp-package-title">
// // // //                   <strong>
// // // //                     {money(subscription.packageAmount)} Package
// // // //                   </strong>
// // // //                   <small>
// // // //                     Cycle {subscription.cycleNumber || 1}
// // // //                     {" • "}
// // // //                     {completedStages}/14 stages completed
// // // //                   </small>
// // // //                 </span>

// // // //                 <span className="hp-package-header-right">
// // // //                   <span className={`hp-status ${statusClass(subscription.status)}`}>
// // // //                     {statusLabel(subscription.status)}
// // // //                   </span>

// // // //                   {isExpanded
// // // //                     ? <ChevronUp size={20} />
// // // //                     : <ChevronDown size={20} />
// // // //                   }
// // // //                 </span>
// // // //               </button>

// // // //               {isExpanded && (
// // // //                 <>
// // // //                   <div className="hp-package-meta">
// // // //                     <div className="hp-meta-item">
// // // //                       <small>Package Amount</small>
// // // //                       <strong>
// // // //                         {money(subscription.packageAmount)}
// // // //                       </strong>
// // // //                     </div>

// // // //                     <div className="hp-meta-item">
// // // //                       <small>Current Stage</small>
// // // //                       <strong>
// // // //                         {subscription.status === "COMPLETED"
// // // //                           ? "All stages completed"
// // // //                           : `Stage ${currentStageNumber} / 14`}
// // // //                       </strong>
// // // //                     </div>

// // // //                     <div className="hp-meta-item">
// // // //                       <small>Current Stage Status</small>
// // // //                       <strong>
// // // //                         {statusLabel(currentStage?.status || "LOCKED")}
// // // //                       </strong>
// // // //                     </div>

// // // //                     <div className="hp-meta-item">
// // // //                       <small>Timer Remaining</small>
// // // //                       <strong>
// // // //                         {currentStage?.status === "RUNNING"
// // // //                           ? getRemainingTime(currentStage.endsAt, now)
// // // //                           : currentStage?.status === "PAUSED"
// // // //                           ? "Timer paused"
// // // //                           : currentStage?.status === "ACHIEVED"
// // // //                           ? "Stage completed"
// // // //                           : "Not started"}
// // // //                       </strong>
// // // //                     </div>

// // // //                     <div className="hp-meta-item">
// // // //                       <small>Purchased At</small>
// // // //                       <strong>
// // // //                         {subscription.purchasedAt
// // // //                           ? new Date(subscription.purchasedAt).toLocaleString()
// // // //                           : "Not available"}
// // // //                       </strong>
// // // //                     </div>

// // // //                     <div className="hp-meta-item">
// // // //                       <small>Completed Stages</small>
// // // //                       <strong>{completedStages} / 14</strong>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="hp-table-scroll">
// // // //                     <table className="hp-package-table">
// // // //                       <thead>
// // // //                         <tr>
// // // //                           <th>Stage</th>
// // // //                           <th>Duration / Days</th>
// // // //                           <th>Stage Status</th>
// // // //                           <th>Timer / Remaining Time</th>
// // // //                           <th>Reference Amount</th>
// // // //                           <th>Achieved?</th>
// // // //                         </tr>
// // // //                       </thead>

// // // //                       <tbody>
// // // //                         {stages.map((stage, index) => {
// // // //                           const isCurrent =
// // // //                             subscription.status === "ACTIVE" &&
// // // //                             stage.stageNumber === currentStageNumber;

// // // //                           let timer = "Not started";

// // // //                           if (stage.status === "RUNNING") {
// // // //                             timer = getRemainingTime(stage.endsAt, now);
// // // //                           } else if (stage.status === "PAUSED") {
// // // //                             timer = "Timer paused";
// // // //                           } else if (stage.status === "ACHIEVED") {
// // // //                             timer = "Completed";
// // // //                           } else if (stage.status === "WAITING") {
// // // //                             timer = "Waiting to start";
// // // //                           } else if (stage.status === "LOCKED") {
// // // //                             timer = "Locked";
// // // //                           }

// // // //                           const achieved = stage.status === "ACHIEVED";
// // // //                           const referenceAmount = getReferenceAmount(
// // // //                             subscription.packageAmount,
// // // //                             index
// // // //                           );

// // // //                           return (
// // // //                             <tr
// // // //                               key={`${id}-stage-${stage.stageNumber}`}
// // // //                               className={isCurrent ? "current-stage" : ""}
// // // //                             >
// // // //                               <td>
// // // //                                 <span className="hp-stage-name">
// // // //                                   Stage {stage.stageNumber}
// // // //                                 </span>
// // // //                               </td>

// // // //                               <td className="hp-duration-cell">
// // // //                                 <CalendarDays
// // // //                                   size={12}
// // // //                                   style={{
// // // //                                     display: "inline",
// // // //                                     marginRight: 5,
// // // //                                     verticalAlign: "middle"
// // // //                                   }}
// // // //                                 />
// // // //                                 {stage.durationDays}
// // // //                                 {" "}
// // // //                                 {stage.durationDays === 1 ? "Day" : "Days"}
// // // //                               </td>

// // // //                               <td>
// // // //                                 <span className={`hp-status ${statusClass(stage.status)}`}>
// // // //                                   {statusLabel(stage.status)}
// // // //                                 </span>
// // // //                               </td>

// // // //                               <td className="hp-timer-cell">
// // // //                                 <Clock3
// // // //                                   size={12}
// // // //                                   style={{
// // // //                                     display: "inline",
// // // //                                     marginRight: 5,
// // // //                                     verticalAlign: "middle"
// // // //                                   }}
// // // //                                 />
// // // //                                 {timer}
// // // //                               </td>

// // // //                               <td className="hp-reference-amount">
// // // //                                 {money(referenceAmount)}
// // // //                               </td>

// // // //                               <td>
// // // //                                 {achieved ? (
// // // //                                   <span className="hp-achieved-yes">
// // // //                                     <CheckCircle2 size={14} />
// // // //                                     Yes
// // // //                                   </span>
// // // //                                 ) : (
// // // //                                   <span className="hp-achieved-no">
// // // //                                     No
// // // //                                   </span>
// // // //                                 )}
// // // //                               </td>
// // // //                             </tr>
// // // //                           );
// // // //                         })}

// // // //                         <tr className="hp-total-row">
// // // //                           <td colSpan={4}>
// // // //                             Total Reference Amount
// // // //                           </td>
// // // //                           <td>{money(referenceTotal)}</td>
// // // //                           <td>14 Stages</td>
// // // //                         </tr>
// // // //                       </tbody>
// // // //                     </table>
// // // //                   </div>
// // // //                 </>
// // // //               )}
// // // //             </section>
// // // //           );
// // // //         })
// // // //       )}

// // // //       <div className="hp-notice">
// // // //         <AlertCircle size={15} />
// // // //         <span>
// // // //           Reference amounts are illustrative schedule figures only.
// // // //           They are not actual received income, a guaranteed return,
// // // //           or a promise of payment. Actual transactions must be verified
// // // //           separately in the transaction history.
// // // //         </span>
// // // //       </div>

// // // //       <div className="hp-plan-footer">
// // // //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }




// // // import React, { useEffect, useState, useCallback, useMemo } from "react";
// // // import {
// // //   Package,
// // //   Clock3,
// // //   Sparkles,
// // //   RefreshCw,
// // //   AlertCircle,
// // //   CheckCircle2,
// // //   ChevronDown,
// // //   ChevronUp,
// // //   CalendarDays
// // // } from "lucide-react";

// // // import api from "../../api/axios";

// // // const packages = [30, 60, 120, 240, 480, 960];

// // // const stageDurations = [
// // //   1, 3, 7, 15,
// // //   30, 30, 30, 30, 30, 30,
// // //   30, 30, 30, 30
// // // ];

// // // // Illustrative reference schedule only.
// // // // These figures do not represent actual payments or guaranteed income.
// // // const stageAmounts = [
// // //   [5, 10, 20, 40, 80, 160],
// // //   [5, 10, 20, 40, 80, 160],
// // //   [10, 20, 40, 80, 160, 320],
// // //   [20, 40, 80, 160, 320, 640],
// // //   [30, 60, 120, 240, 480, 960],
// // //   [30, 60, 120, 240, 480, 960],
// // //   [50, 100, 200, 400, 800, 1600],
// // //   [50, 100, 200, 400, 800, 1600],
// // //   [100, 200, 400, 800, 1600, 3200],
// // //   [200, 400, 800, 1600, 3200, 6400],
// // //   [400, 800, 1600, 3200, 6400, 12800],
// // //   [800, 1600, 3200, 6400, 12800, 25600],
// // //   [1600, 3200, 6400, 12800, 25600, 51200],
// // //   [3200, 6400, 12800, 25600, 51200, 102400]
// // // ];

// // // const money = (value) =>
// // //   "$" + Number(value || 0).toLocaleString("en-US");

// // // const getReferenceAmount = (amount, stageIndex) => {
// // //   const column = packages.indexOf(Number(amount));
// // //   if (column < 0) return 0;

// // //   return Number(stageAmounts[stageIndex]?.[column] || 0);
// // // };

// // // const getRemainingTime = (endsAt, now) => {
// // //   if (!endsAt) return "Not started";

// // //   const remaining = new Date(endsAt).getTime() - now;

// // //   if (Number.isNaN(remaining)) return "Unavailable";
// // //   if (remaining <= 0) return "Time completed";

// // //   const days = Math.floor(remaining / 86400000);
// // //   const hours = Math.floor((remaining % 86400000) / 3600000);
// // //   const minutes = Math.floor((remaining % 3600000) / 60000);
// // //   const seconds = Math.floor((remaining % 60000) / 1000);

// // //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // // };

// // // const statusClass = (status) => {
// // //   const value = String(status || "").toUpperCase();

// // //   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
// // //     return "green";
// // //   }

// // //   if (value === "PAUSED") return "orange";
// // //   if (["WAITING", "PENDING"].includes(value)) return "blue";
// // //   if (value === "CANCELLED") return "red";

// // //   return "gray";
// // // };

// // // const statusLabel = (status) => {
// // //   const labels = {
// // //     RUNNING: "Running",
// // //     ACTIVE: "Active",
// // //     PAUSED: "Paused",
// // //     WAITING: "Waiting",
// // //     LOCKED: "Locked",
// // //     ACHIEVED: "Achieved",
// // //     COMPLETED: "Completed",
// // //     CANCELLED: "Cancelled",
// // //     PENDING: "Pending"
// // //   };

// // //   const value = String(status || "LOCKED").toUpperCase();
// // //   return labels[value] || value;
// // // };

// // // const getPackageStages = (subscription) => {
// // //   return Array.from({ length: 14 }, (_, index) => {
// // //     const stageNumber = index + 1;

// // //     const savedStage = subscription?.stages?.find(
// // //       (item) => Number(item.stageNumber) === stageNumber
// // //     );

// // //     return {
// // //       stageNumber,
// // //       durationDays: Number(
// // //         savedStage?.durationDays || stageDurations[index]
// // //       ),
// // //       status: String(savedStage?.status || "LOCKED").toUpperCase(),
// // //       startedAt: savedStage?.startedAt || null,
// // //       endsAt: savedStage?.endsAt || null,
// // //       completedAt: savedStage?.completedAt || null
// // //     };
// // //   });
// // // };

// // // export default function Plan() {
// // //   const [subscriptions, setSubscriptions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [now, setNow] = useState(Date.now());

// // //   // Each package has its own expand/collapse state.
// // //   const [expandedPackages, setExpandedPackages] = useState({});

// // //   const fetchProgress = useCallback(async (showLoader = false) => {
// // //     try {
// // //       if (showLoader) setRefreshing(true);

// // //       const response = await api.get("/package-progress");
 
// // // console.group("📦 PACKAGE PROGRESS DEBUG");

// // // console.log("API URL:", "/package-progress");
// // // console.log("HTTP STATUS:", response.status);
// // // console.log("API SUCCESS:", response.data?.success);
// // // console.log("FULL API RESPONSE:", response.data);
// // // console.log("PACKAGES:", response.data?.packages);

// // // (response.data?.packages || []).forEach((pkg) => {
// // //   console.group(
// // //     `Package $${pkg.packageAmount} | Cycle ${pkg.cycleNumber}`
// // //   );

// // // console.log("Subscription ID:", pkg.id);
// // //   console.log("User ID:", pkg.userId);
// // //   console.log("Package Status:", pkg.status);
// // //   console.log("Current Stage:", pkg.currentStage);
// // //   console.log("Recorded Activity:", pkg.recordedActivityAmount);

// // //   console.table(
// // //     (pkg.stages || []).map((stage) => ({
// // //       stageNumber: stage.stageNumber,
// // //       durationDays: stage.durationDays,
// // //       status: stage.status,
// // //       startedAt: stage.startedAt,
// // //       endsAt: stage.endsAt,
// // //       completedAt: stage.completedAt
// // //     }))
// // //   );

// // //   console.groupEnd();
// // // });

// // // console.groupEnd();

// // //       if (!response.data?.success) {
// // //         setError(
// // //           response.data?.message || "Package progress could not be loaded."
// // //         );
// // //         return;
// // //       }

// // //       const list = Array.isArray(response.data.packages)
// // //         ? response.data.packages
// // //         : [];

// // //       const sorted = [...list].sort((a, b) => {
// // //         const amountDifference =
// // //           Number(a.packageAmount) - Number(b.packageAmount);

// // //         if (amountDifference !== 0) return amountDifference;

// // //         return (
// // //           Number(a.cycleNumber || 1) -
// // //           Number(b.cycleNumber || 1)
// // //         );
// // //       });

// // //       setSubscriptions(sorted);
// // //       setError("");

// // //       // Automatically expand packages containing an ACTIVE cycle.
// // //       // Preserve the user's manual open/close choice after initial load.
// // //       setExpandedPackages((previous) => {
// // //         const next = { ...previous };

// // //         packages.forEach((amount) => {
// // //           const key = `package-${amount}`;

// // //           const hasActiveCycle = sorted.some(
// // //             (item) =>
// // //               Number(item.packageAmount) === amount &&
// // //               item.status === "ACTIVE"
// // //           );

// // //           if (next[key] === undefined) {
// // //             next[key] = hasActiveCycle;
// // //           } else if (hasActiveCycle && !previous[key + "-manually-closed"]) {
// // //             next[key] = true;
// // //           }
// // //         });

// // //         return next;
// // //       });
// // //     } catch (err) {
// // //       console.error("Package progress fetch error:", err);

// // //       setError(
// // //         err.response?.data?.message ||
// // //         "Unable to load package progress. Please login again."
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchProgress();

// // //     const refreshInterval = setInterval(() => {
// // //       fetchProgress();
// // //     }, 30000);

// // //     const clockInterval = setInterval(() => {
// // //       setNow(Date.now());
// // //     }, 1000);

// // //     return () => {
// // //       clearInterval(refreshInterval);
// // //       clearInterval(clockInterval);
// // //     };
// // //   }, [fetchProgress]);

// // //   const handleRefresh = () => {
// // //     fetchProgress(true);
// // //   };

// // //   const togglePackage = (amount) => {
// // //     const key = `package-${amount}`;

// // //     setExpandedPackages((previous) => {
// // //       const nextValue = !(previous[key] ?? false);

// // //       return {
// // //         ...previous,
// // //         [key]: nextValue,
// // //         [key + "-manually-closed"]: !nextValue
// // //       };
// // //     });
// // //   };

// // //   const totalCompletedStages = useMemo(() => {
// // //     return subscriptions.reduce((total, subscription) => {
// // //       const stages = getPackageStages(subscription);

// // //       return (
// // //         total +
// // //         stages.filter((stage) => stage.status === "ACHIEVED").length
// // //       );
// // //     }, 0);
// // //   }, [subscriptions]);

// // //   const totalRemainingStages = useMemo(() => {
// // //     return subscriptions.reduce((total, subscription) => {
// // //       const stages = getPackageStages(subscription);

// // //       return (
// // //         total +
// // //         stages.filter((stage) => stage.status !== "ACHIEVED").length
// // //       );
// // //     }, 0);
// // //   }, [subscriptions]);

// // //   return (
// // //     <div className="hp-plan">
// // //       <style>{`
// // //         .hp-plan {
// // //           --green: #08783f;
// // //           --dark: #07552e;
// // //           --gold: #e5b83f;
// // //           --border: #d8e9d3;
// // //           width: 100%;
// // //           padding: 15px;
// // //           color: #173522;
// // //           background: #f5f9f1;
// // //           border-radius: 16px;
// // //           font-family: Inter, Arial, sans-serif;
// // //           box-sizing: border-box;
// // //         }

// // //         .hp-plan * {
// // //           box-sizing: border-box;
// // //         }

// // //         .hp-plan-header {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           gap: 12px;
// // //           padding: 17px 20px;
// // //           margin-bottom: 15px;
// // //           border: 2px solid var(--gold);
// // //           border-radius: 15px;
// // //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// // //         }

// // //         .hp-plan-heading {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 11px;
// // //           min-width: 0;
// // //         }

// // //         .hp-plan-heading-icon {
// // //           display: grid;
// // //           place-items: center;
// // //           width: 42px;
// // //           height: 42px;
// // //           color: #f8d76f;
// // //           background: #ffffff16;
// // //           border-radius: 11px;
// // //           flex-shrink: 0;
// // //         }

// // //         .hp-plan-header h2 {
// // //           margin: 0;
// // //           color: white;
// // //           font-size: clamp(16px, 2.4vw, 23px);
// // //           font-weight: 950;
// // //         }

// // //         .hp-plan-header h2 span {
// // //           color: #ffe36c;
// // //         }

// // //         .hp-plan-header p {
// // //           margin: 4px 0 0;
// // //           color: #d5ebd9;
// // //           font-size: 11px;
// // //         }

// // //         .hp-plan-tag {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 6px;
// // //           padding: 8px 12px;
// // //           border: 1px solid #f5d36a;
// // //           border-radius: 30px;
// // //           color: #ffe47a;
// // //           font-size: 10px;
// // //           font-weight: 900;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-summary {
// // //           display: grid;
// // //           grid-template-columns: repeat(3, minmax(0, 1fr));
// // //           gap: 10px;
// // //           margin-bottom: 15px;
// // //         }

// // //         .hp-summary-card {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 10px;
// // //           padding: 12px;
// // //           border: 1px solid var(--border);
// // //           border-radius: 12px;
// // //           background: white;
// // //           min-width: 0;
// // //         }

// // //         .hp-summary-icon {
// // //           display: grid;
// // //           place-items: center;
// // //           width: 36px;
// // //           height: 36px;
// // //           flex-shrink: 0;
// // //           color: var(--green);
// // //           background: #eaf7e9;
// // //           border-radius: 10px;
// // //         }

// // //         .hp-summary-label {
// // //           color: #849389;
// // //           font-size: 9px;
// // //           font-weight: 800;
// // //           text-transform: uppercase;
// // //         }

// // //         .hp-summary-value {
// // //           margin-top: 4px;
// // //           color: #16452b;
// // //           font-size: 16px;
// // //           font-weight: 950;
// // //           overflow-wrap: anywhere;
// // //         }

// // //         .hp-refresh-row {
// // //           display: flex;
// // //           justify-content: flex-end;
// // //           margin-bottom: 13px;
// // //         }

// // //         .hp-refresh-button {
// // //           display: inline-flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           gap: 7px;
// // //           min-height: 40px;
// // //           padding: 9px 13px;
// // //           color: white;
// // //           background: #08783f;
// // //           border: 0;
// // //           border-radius: 8px;
// // //           font-weight: 800;
// // //           cursor: pointer;
// // //         }

// // //         .hp-refresh-button:disabled {
// // //           opacity: .6;
// // //           cursor: not-allowed;
// // //         }

// // //         .hp-package-card {
// // //           margin-bottom: 16px;
// // //           overflow: hidden;
// // //           border: 1px solid #cbdcbe;
// // //           border-radius: 13px;
// // //           background: white;
// // //           scroll-margin-top: 18px;
// // //         }

// // //         .hp-package-card-header {
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           gap: 12px;
// // //           width: 100%;
// // //           padding: 15px 17px;
// // //           color: white;
// // //           text-align: left;
// // //           background: linear-gradient(110deg, #087b3e, #07572e);
// // //           border: 0;
// // //           cursor: pointer;
// // //         }

// // //         .hp-package-title {
// // //           display: flex;
// // //           flex-direction: column;
// // //           gap: 5px;
// // //           min-width: 0;
// // //         }

// // //         .hp-package-title strong {
// // //           font-size: 16px;
// // //           font-weight: 950;
// // //           overflow-wrap: anywhere;
// // //         }

// // //         .hp-package-title small {
// // //           color: #d8f0dc;
// // //           font-size: 10px;
// // //           font-weight: 700;
// // //         }

// // //         .hp-package-header-right {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 9px;
// // //           flex-shrink: 0;
// // //         }

// // //         .hp-package-header-right svg {
// // //           color: #ffe47a;
// // //         }

// // //         .hp-status {
// // //           display: inline-flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           padding: 5px 9px;
// // //           border-radius: 20px;
// // //           font-size: 10px;
// // //           font-weight: 900;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-status.green {
// // //           color: #08783f;
// // //           background: #e4f7e9;
// // //         }

// // //         .hp-status.orange {
// // //           color: #a65a08;
// // //           background: #fff0d9;
// // //         }

// // //         .hp-status.blue {
// // //           color: #1760a4;
// // //           background: #e8f2ff;
// // //         }

// // //         .hp-status.red {
// // //           color: #b42318;
// // //           background: #ffebeb;
// // //         }

// // //         .hp-status.gray {
// // //           color: #68756d;
// // //           background: #edf0ed;
// // //         }

// // //         .hp-package-meta {
// // //           display: grid;
// // //           grid-template-columns: repeat(4, minmax(0, 1fr));
// // //           gap: 9px;
// // //           padding: 12px;
// // //           background: #f8fcf6;
// // //           border-bottom: 1px solid var(--border);
// // //         }

// // //         .hp-meta-item {
// // //           min-width: 0;
// // //           padding: 10px;
// // //           border: 1px solid #e0ebdc;
// // //           border-radius: 9px;
// // //           background: white;
// // //         }

// // //         .hp-meta-item small {
// // //           display: block;
// // //           color: #829087;
// // //           font-size: 9px;
// // //           font-weight: 800;
// // //           text-transform: uppercase;
// // //         }

// // //         .hp-meta-item strong {
// // //           display: block;
// // //           margin-top: 5px;
// // //           color: #175a32;
// // //           font-size: 12px;
// // //           overflow-wrap: anywhere;
// // //         }

// // //         .hp-cycle-heading {
// // //           padding: 12px 14px;
// // //           color: #07552e;
// // //           background: #eff8e9;
// // //           border-bottom: 1px solid #d9e7d3;
// // //           font-size: 13px;
// // //           font-weight: 950;
// // //         }

// // //         .hp-table-scroll {
// // //           width: 100%;
// // //           overflow-x: auto;
// // //           scrollbar-width: thin;
// // //         }

// // //         .hp-package-table {
// // //           width: 100%;
// // //           min-width: 850px;
// // //           border-collapse: collapse;
// // //           text-align: left;
// // //         }

// // //         .hp-package-table th {
// // //           padding: 12px 10px;
// // //           color: #175a32;
// // //           background: #eaf5e5;
// // //           border-bottom: 1px solid #d9e7d3;
// // //           font-size: 11px;
// // //           font-weight: 900;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-package-table td {
// // //           padding: 12px 10px;
// // //           color: #253c2c;
// // //           border-bottom: 1px solid #d9e7d3;
// // //           font-size: 11px;
// // //           font-weight: 700;
// // //           vertical-align: middle;
// // //         }

// // //         .hp-package-table tbody tr:nth-child(even) td {
// // //           background: #f4faef;
// // //         }

// // //         .hp-package-table tbody tr.current-stage td {
// // //           background: #fff8df;
// // //         }

// // //         .hp-stage-name {
// // //           color: #175a32;
// // //           font-weight: 950;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-duration-cell {
// // //           color: #805c0b !important;
// // //           background: #fff4d6 !important;
// // //           font-weight: 900 !important;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-reference-amount {
// // //           color: #08783f !important;
// // //           font-size: 12px !important;
// // //           font-weight: 950 !important;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-achieved-yes {
// // //           display: inline-flex;
// // //           align-items: center;
// // //           gap: 5px;
// // //           color: #08783f;
// // //           font-weight: 900;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-achieved-no {
// // //           color: #879188;
// // //           font-weight: 800;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-timer-cell {
// // //           min-width: 150px;
// // //           color: #175a32;
// // //           font-weight: 800;
// // //           white-space: nowrap;
// // //         }

// // //         .hp-total-row td {
// // //           color: #07552e !important;
// // //           background: #e5f5dc !important;
// // //           font-size: 12px !important;
// // //           font-weight: 950 !important;
// // //           border-top: 2px solid #a9c99b;
// // //         }

// // //         .hp-empty {
// // //           padding: 22px;
// // //           color: #68756d;
// // //           text-align: center;
// // //           background: #f8fcf6;
// // //           border-radius: 10px;
// // //           font-size: 13px;
// // //         }

// // //         .hp-plan-error {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 8px;
// // //           padding: 12px;
// // //           margin-bottom: 12px;
// // //           color: #a52b25;
// // //           background: #fff0ef;
// // //           border: 1px solid #f3c6c3;
// // //           border-radius: 10px;
// // //           font-size: 12px;
// // //         }

// // //         .hp-notice {
// // //           display: flex;
// // //           align-items: flex-start;
// // //           gap: 8px;
// // //           margin-top: 12px;
// // //           padding: 11px 13px;
// // //           border: 1px solid #eadba6;
// // //           border-radius: 10px;
// // //           color: #725c20;
// // //           background: #fff9e8;
// // //           font-size: 11px;
// // //           line-height: 1.6;
// // //         }

// // //         .hp-plan-footer {
// // //           margin-top: 12px;
// // //           text-align: center;
// // //           color: #849389;
// // //           font-size: 9px;
// // //           font-weight: 700;
// // //         }

// // //         @media (max-width: 760px) {
// // //           .hp-summary {
// // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // //           }

// // //           .hp-package-meta {
// // //             grid-template-columns: repeat(2, minmax(0, 1fr));
// // //           }
// // //         }

// // //         @media (max-width: 480px) {
// // //           .hp-plan {
// // //             padding: 9px;
// // //           }

// // //           .hp-plan-header {
// // //             padding: 13px 11px;
// // //           }

// // //           .hp-plan-tag {
// // //             padding: 6px 8px;
// // //             font-size: 9px;
// // //           }

// // //           .hp-summary {
// // //             gap: 6px;
// // //           }

// // //           .hp-summary-card {
// // //             padding: 9px;
// // //             gap: 7px;
// // //           }

// // //           .hp-summary-icon {
// // //             width: 30px;
// // //             height: 30px;
// // //           }

// // //           .hp-summary-value {
// // //             font-size: 13px;
// // //           }

// // //           .hp-package-card-header {
// // //             padding: 13px 11px;
// // //           }

// // //           .hp-package-title strong {
// // //             font-size: 14px;
// // //           }

// // //           .hp-package-header-right {
// // //             gap: 5px;
// // //           }

// // //           .hp-package-meta {
// // //             gap: 6px;
// // //             padding: 8px;
// // //           }

// // //           .hp-meta-item {
// // //             padding: 8px;
// // //           }

// // //           .hp-package-table {
// // //             min-width: 850px;
// // //           }
// // //         }

// // //         @media (max-width: 350px) {
// // //           .hp-plan-tag {
// // //             display: none;
// // //           }

// // //           .hp-plan-header h2 {
// // //             font-size: 15px;
// // //           }
// // //         }
// // //       `}</style>

// // //       {/* Header */}
// // //       <div className="hp-plan-header">
// // //         <div className="hp-plan-heading">
// // //           <div className="hp-plan-heading-icon">
// // //             <Package size={23} />
// // //           </div>

// // //           <div>
// // //             <h2>
// // //               PACKAGE <span>PROGRESS</span>
// // //             </h2>
// // //             <p>Helping Pools • Package Activity Tracker</p>
// // //           </div>
// // //         </div>

// // //         <div className="hp-plan-tag">
// // //           <Sparkles size={12} />
// // //           LIVE STATUS
// // //         </div>
// // //       </div>

// // //       {/* Overall summary */}
// // //       <div className="hp-summary">
// // //         <div className="hp-summary-card">
// // //           <div className="hp-summary-icon">
// // //             <Package size={18} />
// // //           </div>

// // //           <div>
// // //             <div className="hp-summary-label">Purchased Cycles</div>
// // //             <div className="hp-summary-value">
// // //               {subscriptions.length}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="hp-summary-card">
// // //           <div className="hp-summary-icon">
// // //             <CheckCircle2 size={18} />
// // //           </div>

// // //           <div>
// // //             <div className="hp-summary-label">Completed Stages</div>
// // //             <div className="hp-summary-value">
// // //               {totalCompletedStages}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="hp-summary-card">
// // //           <div className="hp-summary-icon">
// // //             <Clock3 size={18} />
// // //           </div>

// // //           <div>
// // //             <div className="hp-summary-label">Remaining Stages</div>
// // //             <div className="hp-summary-value">
// // //               {totalRemainingStages}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Refresh */}
// // //       <div className="hp-refresh-row">
// // //         <button
// // //           className="hp-refresh-button"
// // //           type="button"
// // //           onClick={handleRefresh}
// // //           disabled={refreshing}
// // //         >
// // //           <RefreshCw size={14} />
// // //           {refreshing ? "Refreshing..." : "Refresh"}
// // //         </button>
// // //       </div>

// // //       {error && (
// // //         <div className="hp-plan-error">
// // //           <AlertCircle size={15} />
// // //           {error}
// // //         </div>
// // //       )}

// // //       {loading ? (
// // //         <div className="hp-empty">
// // //           Loading package progress...
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {/* All six packages */}
// // //           {packages.map((packageAmount) => {
// // //             const packageSubs = subscriptions
// // //               .filter(
// // //                 (item) =>
// // //                   Number(item.packageAmount) === packageAmount
// // //               )
// // //               .sort(
// // //                 (a, b) =>
// // //                   Number(a.cycleNumber || 1) -
// // //                   Number(b.cycleNumber || 1)
// // //               );

// // //             const packageKey = `package-${packageAmount}`;

// // //             const hasActiveCycle = packageSubs.some(
// // //               (item) => item.status === "ACTIVE"
// // //             );

// // //             const isExpanded =
// // //               expandedPackages[packageKey] ?? hasActiveCycle;

// // //             const totalCompleted = packageSubs.reduce(
// // //               (sum, subscription) =>
// // //                 sum +
// // //                 getPackageStages(subscription).filter(
// // //                   (stage) => stage.status === "ACHIEVED"
// // //                 ).length,
// // //               0
// // //             );

// // //             const totalRemaining = packageSubs.length
// // //               ? packageSubs.length * 14 - totalCompleted
// // //               : 14;

// // //             return (
// // //               <section
// // //                 className="hp-package-card"
// // //                 id={`package-card-${packageAmount}`}
// // //                 key={packageAmount}
// // //               >
// // //                 <button
// // //                   className="hp-package-card-header"
// // //                   type="button"
// // //                   onClick={() => togglePackage(packageAmount)}
// // //                   aria-expanded={isExpanded}
// // //                 >
// // //                   <span className="hp-package-title">
// // //                     <strong>
// // //                       {money(packageAmount)} Package
// // //                     </strong>

// // //                     <small>
// // //                       {packageSubs.length
// // //                         ? `${packageSubs.length} Cycle(s) • ${totalCompleted} Completed • ${totalRemaining} Remaining`
// // //                         : "Not Purchased • 14 Stages"}
// // //                     </small>
// // //                   </span>

// // //                   <span className="hp-package-header-right">
// // //                     <span
// // //                       className={`hp-status ${
// // //                         hasActiveCycle
// // //                           ? "green"
// // //                           : packageSubs.length
// // //                           ? "blue"
// // //                           : "gray"
// // //                       }`}
// // //                     >
// // //                       {hasActiveCycle
// // //                         ? "Active"
// // //                         : packageSubs.length
// // //                         ? "Purchased"
// // //                         : "Not Purchased"}
// // //                     </span>

// // //                     {isExpanded
// // //                       ? <ChevronUp size={20} />
// // //                       : <ChevronDown size={20} />}
// // //                   </span>
// // //                 </button>

// // //                 {isExpanded && (
// // //                   <>
// // //                     {packageSubs.length ? (
// // //                       packageSubs.map((subscription) => {
// // //                         const id = String(subscription._id);
// // //                         const stages = getPackageStages(subscription);

// // //                         const completed = stages.filter(
// // //                           (stage) => stage.status === "ACHIEVED"
// // //                         ).length;

// // //                         const remaining = 14 - completed;

// // //                         const currentStageNumber = Number(
// // //                           subscription.currentStage || 1
// // //                         );

// // //                         const currentStage = stages.find(
// // //                           (stage) =>
// // //                             stage.stageNumber === currentStageNumber
// // //                         );

// // //                         const referenceTotal = stages.reduce(
// // //                           (sum, stage, index) =>
// // //                             sum +
// // //                             getReferenceAmount(packageAmount, index),
// // //                           0
// // //                         );

// // //                         return (
// // //                           <div key={id}>
// // //                             <div className="hp-cycle-heading">
// // //                               {money(packageAmount)} Package — Cycle{" "}
// // //                               {subscription.cycleNumber || 1}
// // //                               {" • "}
// // //                               {statusLabel(subscription.status)}
// // //                             </div>

// // //                             <div className="hp-package-meta">
// // //                               <div className="hp-meta-item">
// // //                                 <small>Package Amount</small>
// // //                                 <strong>{money(packageAmount)}</strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Completed Stages</small>
// // //                                 <strong>{completed} / 14</strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Remaining Stages</small>
// // //                                 <strong>{remaining} / 14</strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Current Stage</small>
// // //                                 <strong>
// // //                                   {subscription.status === "COMPLETED"
// // //                                     ? "All completed"
// // //                                     : `Stage ${currentStageNumber} / 14`}
// // //                                 </strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Current Stage Status</small>
// // //                                 <strong>
// // //                                   {statusLabel(
// // //                                     currentStage?.status || "LOCKED"
// // //                                   )}
// // //                                 </strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Timer Remaining</small>
// // //                                 <strong>
// // //                                   {currentStage?.status === "RUNNING"
// // //                                     ? getRemainingTime(
// // //                                         currentStage.endsAt,
// // //                                         now
// // //                                       )
// // //                                     : currentStage?.status === "PAUSED"
// // //                                     ? "Timer paused"
// // //                                     : currentStage?.status === "ACHIEVED"
// // //                                     ? "Stage completed"
// // //                                     : "Not running"}
// // //                                 </strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Purchased At</small>
// // //                                 <strong>
// // //                                   {subscription.purchasedAt
// // //                                     ? new Date(
// // //                                         subscription.purchasedAt
// // //                                       ).toLocaleString()
// // //                                     : "Not available"}
// // //                                 </strong>
// // //                               </div>

// // //                               <div className="hp-meta-item">
// // //                                 <small>Cycle Status</small>
// // //                                 <strong>
// // //                                   {statusLabel(subscription.status)}
// // //                                 </strong>
// // //                               </div>
// // //                             </div>

// // //                             <div className="hp-table-scroll">
// // //                               <table className="hp-package-table">
// // //                                 <thead>
// // //                                   <tr>
// // //                                     <th>Stage</th>
// // //                                     <th>Duration / Days</th>
// // //                                     <th>Stage Status</th>
// // //                                     <th>Timer / Remaining Time</th>
// // //                                     <th>Reference Amount</th>
// // //                                     <th>Achieved?</th>
// // //                                   </tr>
// // //                                 </thead>

// // //                                 <tbody>
// // //                                   {stages.map((stage, index) => {
// // //                                     const achieved =
// // //                                       stage.status === "ACHIEVED";

// // //                                     const isCurrent =
// // //                                       subscription.status === "ACTIVE" &&
// // //                                       stage.stageNumber ===
// // //                                         currentStageNumber;

// // //                                     let timer = "Locked";

// // //                                     if (stage.status === "RUNNING") {
// // //                                       timer = getRemainingTime(
// // //                                         stage.endsAt,
// // //                                         now
// // //                                       );
// // //                                     } else if (
// // //                                       stage.status === "PAUSED"
// // //                                     ) {
// // //                                       timer = "Timer paused";
// // //                                     } else if (
// // //                                       stage.status === "ACHIEVED"
// // //                                     ) {
// // //                                       timer = "Completed";
// // //                                     } else if (
// // //                                       stage.status === "WAITING"
// // //                                     ) {
// // //                                       timer = "Waiting";
// // //                                     }

// // //                                     return (
// // //                                       <tr
// // //                                         key={`${id}-stage-${stage.stageNumber}`}
// // //                                         className={
// // //                                           isCurrent ? "current-stage" : ""
// // //                                         }
// // //                                       >
// // //                                         <td>
// // //                                           <span className="hp-stage-name">
// // //                                             Stage {stage.stageNumber}
// // //                                           </span>
// // //                                         </td>

// // //                                         <td className="hp-duration-cell">
// // //                                           <CalendarDays
// // //                                             size={12}
// // //                                             style={{
// // //                                               display: "inline",
// // //                                               marginRight: 5,
// // //                                               verticalAlign: "middle"
// // //                                             }}
// // //                                           />
// // //                                           {stage.durationDays}{" "}
// // //                                           {stage.durationDays === 1
// // //                                             ? "Day"
// // //                                             : "Days"}
// // //                                         </td>

// // //                                         <td>
// // //                                           <span
// // //                                             className={`hp-status ${statusClass(
// // //                                               stage.status
// // //                                             )}`}
// // //                                           >
// // //                                             {statusLabel(stage.status)}
// // //                                           </span>
// // //                                         </td>

// // //                                         <td className="hp-timer-cell">
// // //                                           <Clock3
// // //                                             size={12}
// // //                                             style={{
// // //                                               display: "inline",
// // //                                               marginRight: 5,
// // //                                               verticalAlign: "middle"
// // //                                             }}
// // //                                           />
// // //                                           {timer}
// // //                                         </td>

// // //                                         <td className="hp-reference-amount">
// // //                                           {money(
// // //                                             getReferenceAmount(
// // //                                               packageAmount,
// // //                                               index
// // //                                             )
// // //                                           )}
// // //                                         </td>

// // //                                         <td>
// // //                                           {achieved ? (
// // //                                             <span className="hp-achieved-yes">
// // //                                               <CheckCircle2 size={14} />
// // //                                               Yes
// // //                                             </span>
// // //                                           ) : (
// // //                                             <span className="hp-achieved-no">
// // //                                               No
// // //                                             </span>
// // //                                           )}
// // //                                         </td>
// // //                                       </tr>
// // //                                     );
// // //                                   })}

// // //                                   <tr className="hp-total-row">
// // //                                     <td colSpan={4}>
// // //                                       Total Reference Amount
// // //                                     </td>
// // //                                     <td>{money(referenceTotal)}</td>
// // //                                     <td>
// // //                                       {completed}/14
// // //                                     </td>
// // //                                   </tr>
// // //                                 </tbody>
// // //                               </table>
// // //                             </div>
// // //                           </div>
// // //                         );
// // //                       })
// // //                     ) : (
// // //                       <>
// // //                         <div className="hp-package-meta">
// // //                           <div className="hp-meta-item">
// // //                             <small>Package Amount</small>
// // //                             <strong>{money(packageAmount)}</strong>
// // //                           </div>

// // //                           <div className="hp-meta-item">
// // //                             <small>Package Status</small>
// // //                             <strong>Not Purchased</strong>
// // //                           </div>

// // //                           <div className="hp-meta-item">
// // //                             <small>Completed Stages</small>
// // //                             <strong>0 / 14</strong>
// // //                           </div>

// // //                           <div className="hp-meta-item">
// // //                             <small>Remaining Stages</small>
// // //                             <strong>14 / 14</strong>
// // //                           </div>
// // //                         </div>

// // //                         <div className="hp-table-scroll">
// // //                           <table className="hp-package-table">
// // //                             <thead>
// // //                               <tr>
// // //                                 <th>Stage</th>
// // //                                 <th>Duration / Days</th>
// // //                                 <th>Stage Status</th>
// // //                                 <th>Timer / Remaining Time</th>
// // //                                 <th>Reference Amount</th>
// // //                                 <th>Achieved?</th>
// // //                               </tr>
// // //                             </thead>

// // //                             <tbody>
// // //                               {stageDurations.map((days, index) => (
// // //                                 <tr
// // //                                   key={`unbought-${packageAmount}-${index + 1}`}
// // //                                 >
// // //                                   <td>
// // //                                     <span className="hp-stage-name">
// // //                                       Stage {index + 1}
// // //                                     </span>
// // //                                   </td>

// // //                                   <td className="hp-duration-cell">
// // //                                     {days} {days === 1 ? "Day" : "Days"}
// // //                                   </td>

// // //                                   <td>
// // //                                     <span className="hp-status gray">
// // //                                       Locked
// // //                                     </span>
// // //                                   </td>

// // //                                   <td className="hp-timer-cell">
// // //                                     Not purchased
// // //                                   </td>

// // //                                   <td className="hp-reference-amount">
// // //                                     {money(
// // //                                       getReferenceAmount(
// // //                                         packageAmount,
// // //                                         index
// // //                                       )
// // //                                     )}
// // //                                   </td>

// // //                                   <td>
// // //                                     <span className="hp-achieved-no">
// // //                                       No
// // //                                     </span>
// // //                                   </td>
// // //                                 </tr>
// // //                               ))}

// // //                               <tr className="hp-total-row">
// // //                                 <td colSpan={4}>
// // //                                   Total Reference Amount
// // //                                 </td>
// // //                                 <td>
// // //                                   {money(
// // //                                     stageAmounts.reduce(
// // //                                       (sum, row) =>
// // //                                         sum +
// // //                                         Number(
// // //                                           row[
// // //                                             packages.indexOf(packageAmount)
// // //                                           ] || 0
// // //                                         ),
// // //                                       0
// // //                                     )
// // //                                   )}
// // //                                 </td>
// // //                                 <td>0/14</td>
// // //                               </tr>
// // //                             </tbody>
// // //                           </table>
// // //                         </div>
// // //                       </>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </section>
// // //             );
// // //           })}
// // //         </>
// // //       )}

// // //       <div className="hp-notice">
// // //         <AlertCircle size={15} />
// // //         <span>
// // //           Reference amounts are illustrative schedule figures only.
// // //           They are not actual received income, guaranteed returns,
// // //           or promises of payment. Actual transactions must be verified
// // //           separately in transaction history.
// // //         </span>
// // //       </div>

// // //       <div className="hp-plan-footer">
// // //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import React, { useEffect, useState, useCallback, useMemo } from "react";
// // import {
// //   Package,
// //   Clock3,
// //   Sparkles,
// //   RefreshCw,
// //   AlertCircle,
// //   CheckCircle2,
// //   ChevronDown,
// //   ChevronUp,
// //   CalendarDays
// // } from "lucide-react";

// // import api from "../../api/axios";

// // const packages = [30, 60, 120, 240, 480, 960];

// // const stageDurations = [
// //   1, 3, 7, 15,
// //   30, 30, 30, 30, 30, 30,
// //   30, 30, 30, 30
// // ];

// // // Illustrative reference schedule only.
// // // These figures do not represent actual payments or guaranteed income.
// // const stageAmounts = [
// //   [5, 10, 20, 40, 80, 160],
// //   [5, 10, 20, 40, 80, 160],
// //   [10, 20, 40, 80, 160, 320],
// //   [20, 40, 80, 160, 320, 640],
// //   [30, 60, 120, 240, 480, 960],
// //   [30, 60, 120, 240, 480, 960],
// //   [50, 100, 200, 400, 800, 1600],
// //   [50, 100, 200, 400, 800, 1600],
// //   [100, 200, 400, 800, 1600, 3200],
// //   [200, 400, 800, 1600, 3200, 6400],
// //   [400, 800, 1600, 3200, 6400, 12800],
// //   [800, 1600, 3200, 6400, 12800, 25600],
// //   [1600, 3200, 6400, 12800, 25600, 51200],
// //   [3200, 6400, 12800, 25600, 51200, 102400]
// // ];

// // const money = (value) =>
// //   "$" + Number(value || 0).toLocaleString("en-US");

// // const getReferenceAmount = (amount, stageIndex) => {
// //   const column = packages.indexOf(Number(amount));
// //   if (column < 0) return 0;

// //   return Number(stageAmounts[stageIndex]?.[column] || 0);
// // };

// // const getRemainingTime = (endsAt, now) => {
// //   if (!endsAt) return "Not started";

// //   const remaining = new Date(endsAt).getTime() - now;

// //   if (Number.isNaN(remaining)) return "Unavailable";
// //   if (remaining <= 0) return "Time completed";

// //   const days = Math.floor(remaining / 86400000);
// //   const hours = Math.floor((remaining % 86400000) / 3600000);
// //   const minutes = Math.floor((remaining % 3600000) / 60000);
// //   const seconds = Math.floor((remaining % 60000) / 1000);

// //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// // };

// // const statusClass = (status) => {
// //   const value = String(status || "").toUpperCase();

// //   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
// //     return "green";
// //   }

// //   if (value === "PAUSED") return "orange";
// //   if (["WAITING", "PENDING"].includes(value)) return "blue";
// //   if (value === "CANCELLED") return "red";

// //   return "gray";
// // };

// // const statusLabel = (status) => {
// //   const labels = {
// //     RUNNING: "Running",
// //     ACTIVE: "Active",
// //     PAUSED: "Paused",
// //     WAITING: "Waiting",
// //     LOCKED: "Locked",
// //     ACHIEVED: "Achieved",
// //     COMPLETED: "Completed",
// //     CANCELLED: "Cancelled",
// //     PENDING: "Pending"
// //   };

// //   const value = String(status || "LOCKED").toUpperCase();
// //   return labels[value] || value;
// // };

// // const getPackageStages = (subscription) => {
// //   return Array.from({ length: 14 }, (_, index) => {
// //     const stageNumber = index + 1;

// //     const savedStage = subscription?.stages?.find(
// //       (item) => Number(item.stageNumber) === stageNumber
// //     );

// //     return {
// //       stageNumber,
// //       durationDays: Number(
// //         savedStage?.durationDays || stageDurations[index]
// //       ),
// //       status: String(savedStage?.status || "LOCKED").toUpperCase(),
// //       startedAt: savedStage?.startedAt || null,
// //       endsAt: savedStage?.endsAt || null,
// //       completedAt: savedStage?.completedAt || null,
// //       // Actual income is shown only when the backend explicitly verifies it.
// //       earningAmount: Number(savedStage?.earningAmount || 0),
// //       earningStatus: String(savedStage?.earningStatus || "NOT_RECORDED").toUpperCase(),
// //       earningRecordedAt: savedStage?.earningRecordedAt || null
// //     };
// //   });
// // };

// // export default function Plan() {
// //   const [subscriptions, setSubscriptions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [error, setError] = useState("");
// //   const [now, setNow] = useState(Date.now());

// //   // Each package has its own expand/collapse state.
// //   const [expandedPackages, setExpandedPackages] = useState({});

// //   const fetchProgress = useCallback(async (showLoader = false) => {
// //     try {
// //       if (showLoader) setRefreshing(true);

// //       const response = await api.get("/package-progress");
 
// // console.group("📦 PACKAGE PROGRESS DEBUG");

// // console.log("API URL:", "/package-progress");
// // console.log("HTTP STATUS:", response.status);
// // console.log("API SUCCESS:", response.data?.success);
// // console.log("FULL API RESPONSE:", response.data);
// // console.log("PACKAGES:", response.data?.packages);

// // (response.data?.packages || []).forEach((pkg) => {
// //   console.group(
// //     `Package $${pkg.packageAmount} | Cycle ${pkg.cycleNumber}`
// //   );

// // console.log("Subscription ID:", pkg.id);
// //   console.log("User ID:", pkg.userId);
// //   console.log("Package Status:", pkg.status);
// //   console.log("Current Stage:", pkg.currentStage);
// //   console.log("Recorded Activity:", pkg.recordedActivityAmount);

// //   console.table(
// //     (pkg.stages || []).map((stage) => ({
// //       stageNumber: stage.stageNumber,
// //       durationDays: stage.durationDays,
// //       status: stage.status,
// //       startedAt: stage.startedAt,
// //       endsAt: stage.endsAt,
// //       completedAt: stage.completedAt,
// //       earningAmount: stage.earningAmount,
// //       earningStatus: stage.earningStatus,
// //       earningRecordedAt: stage.earningRecordedAt
// //     }))
// //   );

// //   console.groupEnd();
// // });

// // console.groupEnd();

// //       if (!response.data?.success) {
// //         setError(
// //           response.data?.message || "Package progress could not be loaded."
// //         );
// //         return;
// //       }

// //       const list = Array.isArray(response.data.packages)
// //         ? response.data.packages
// //         : [];

// //       const sorted = [...list].sort((a, b) => {
// //         const amountDifference =
// //           Number(a.packageAmount) - Number(b.packageAmount);

// //         if (amountDifference !== 0) return amountDifference;

// //         return (
// //           Number(a.cycleNumber || 1) -
// //           Number(b.cycleNumber || 1)
// //         );
// //       });

// //       setSubscriptions(sorted);
// //       setError("");

// //       // Automatically expand packages containing an ACTIVE cycle.
// //       // Preserve the user's manual open/close choice after initial load.
// //       setExpandedPackages((previous) => {
// //         const next = { ...previous };

// //         packages.forEach((amount) => {
// //           const key = `package-${amount}`;

// //           const hasActiveCycle = sorted.some(
// //             (item) =>
// //               Number(item.packageAmount) === amount &&
// //               item.status === "ACTIVE"
// //           );

// //           if (next[key] === undefined) {
// //             next[key] = hasActiveCycle;
// //           } else if (hasActiveCycle && !previous[key + "-manually-closed"]) {
// //             next[key] = true;
// //           }
// //         });

// //         return next;
// //       });
// //     } catch (err) {
// //       console.error("Package progress fetch error:", err);

// //       setError(
// //         err.response?.data?.message ||
// //         "Unable to load package progress. Please login again."
// //       );
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchProgress();

// //     const refreshInterval = setInterval(() => {
// //       fetchProgress();
// //     }, 30000);

// //     const clockInterval = setInterval(() => {
// //       setNow(Date.now());
// //     }, 1000);

// //     return () => {
// //       clearInterval(refreshInterval);
// //       clearInterval(clockInterval);
// //     };
// //   }, [fetchProgress]);

// //   const handleRefresh = () => {
// //     fetchProgress(true);
// //   };

// //   const togglePackage = (amount) => {
// //     const key = `package-${amount}`;

// //     setExpandedPackages((previous) => {
// //       const nextValue = !(previous[key] ?? false);

// //       return {
// //         ...previous,
// //         [key]: nextValue,
// //         [key + "-manually-closed"]: !nextValue
// //       };
// //     });
// //   };

// //   const totalCompletedStages = useMemo(() => {
// //     return subscriptions.reduce((total, subscription) => {
// //       const stages = getPackageStages(subscription);

// //       return (
// //         total +
// //         stages.filter((stage) => stage.status === "ACHIEVED").length
// //       );
// //     }, 0);
// //   }, [subscriptions]);

// //   const totalRemainingStages = useMemo(() => {
// //     return subscriptions.reduce((total, subscription) => {
// //       const stages = getPackageStages(subscription);

// //       return (
// //         total +
// //         stages.filter((stage) => stage.status !== "ACHIEVED").length
// //       );
// //     }, 0);
// //   }, [subscriptions]);

// //   return (
// //     <div className="hp-plan">
// //       <style>{`
// //         .hp-plan {
// //           --green: #08783f;
// //           --dark: #07552e;
// //           --gold: #e5b83f;
// //           --border: #d8e9d3;
// //           width: 100%;
// //           padding: 15px;
// //           color: #173522;
// //           background: #f5f9f1;
// //           border-radius: 16px;
// //           font-family: Inter, Arial, sans-serif;
// //           box-sizing: border-box;
// //         }

// //         .hp-plan * {
// //           box-sizing: border-box;
// //         }

// //         .hp-plan-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 12px;
// //           padding: 17px 20px;
// //           margin-bottom: 15px;
// //           border: 2px solid var(--gold);
// //           border-radius: 15px;
// //           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
// //         }

// //         .hp-plan-heading {
// //           display: flex;
// //           align-items: center;
// //           gap: 11px;
// //           min-width: 0;
// //         }

// //         .hp-plan-heading-icon {
// //           display: grid;
// //           place-items: center;
// //           width: 42px;
// //           height: 42px;
// //           color: #f8d76f;
// //           background: #ffffff16;
// //           border-radius: 11px;
// //           flex-shrink: 0;
// //         }

// //         .hp-plan-header h2 {
// //           margin: 0;
// //           color: white;
// //           font-size: clamp(16px, 2.4vw, 23px);
// //           font-weight: 950;
// //         }

// //         .hp-plan-header h2 span {
// //           color: #ffe36c;
// //         }

// //         .hp-plan-header p {
// //           margin: 4px 0 0;
// //           color: #d5ebd9;
// //           font-size: 11px;
// //         }

// //         .hp-plan-tag {
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           padding: 8px 12px;
// //           border: 1px solid #f5d36a;
// //           border-radius: 30px;
// //           color: #ffe47a;
// //           font-size: 10px;
// //           font-weight: 900;
// //           white-space: nowrap;
// //         }

// //         .hp-summary {
// //           display: grid;
// //           grid-template-columns: repeat(3, minmax(0, 1fr));
// //           gap: 10px;
// //           margin-bottom: 15px;
// //         }

// //         .hp-summary-card {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           padding: 12px;
// //           border: 1px solid var(--border);
// //           border-radius: 12px;
// //           background: white;
// //           min-width: 0;
// //         }

// //         .hp-summary-icon {
// //           display: grid;
// //           place-items: center;
// //           width: 36px;
// //           height: 36px;
// //           flex-shrink: 0;
// //           color: var(--green);
// //           background: #eaf7e9;
// //           border-radius: 10px;
// //         }

// //         .hp-summary-label {
// //           color: #849389;
// //           font-size: 9px;
// //           font-weight: 800;
// //           text-transform: uppercase;
// //         }

// //         .hp-summary-value {
// //           margin-top: 4px;
// //           color: #16452b;
// //           font-size: 16px;
// //           font-weight: 950;
// //           overflow-wrap: anywhere;
// //         }

// //         .hp-refresh-row {
// //           display: flex;
// //           justify-content: flex-end;
// //           margin-bottom: 13px;
// //         }

// //         .hp-refresh-button {
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 7px;
// //           min-height: 40px;
// //           padding: 9px 13px;
// //           color: white;
// //           background: #08783f;
// //           border: 0;
// //           border-radius: 8px;
// //           font-weight: 800;
// //           cursor: pointer;
// //         }

// //         .hp-refresh-button:disabled {
// //           opacity: .6;
// //           cursor: not-allowed;
// //         }

// //         .hp-package-card {
// //           margin-bottom: 16px;
// //           overflow: hidden;
// //           border: 1px solid #cbdcbe;
// //           border-radius: 13px;
// //           background: white;
// //           scroll-margin-top: 18px;
// //         }

// //         .hp-package-card-header {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           gap: 12px;
// //           width: 100%;
// //           padding: 15px 17px;
// //           color: white;
// //           text-align: left;
// //           background: linear-gradient(110deg, #087b3e, #07572e);
// //           border: 0;
// //           cursor: pointer;
// //         }

// //         .hp-package-title {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //           min-width: 0;
// //         }

// //         .hp-package-title strong {
// //           font-size: 16px;
// //           font-weight: 950;
// //           overflow-wrap: anywhere;
// //         }

// //         .hp-package-title small {
// //           color: #d8f0dc;
// //           font-size: 10px;
// //           font-weight: 700;
// //         }

// //         .hp-package-header-right {
// //           display: flex;
// //           align-items: center;
// //           gap: 9px;
// //           flex-shrink: 0;
// //         }

// //         .hp-package-header-right svg {
// //           color: #ffe47a;
// //         }

// //         .hp-status {
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //           padding: 5px 9px;
// //           border-radius: 20px;
// //           font-size: 10px;
// //           font-weight: 900;
// //           white-space: nowrap;
// //         }

// //         .hp-status.green {
// //           color: #08783f;
// //           background: #e4f7e9;
// //         }

// //         .hp-status.orange {
// //           color: #a65a08;
// //           background: #fff0d9;
// //         }

// //         .hp-status.blue {
// //           color: #1760a4;
// //           background: #e8f2ff;
// //         }

// //         .hp-status.red {
// //           color: #b42318;
// //           background: #ffebeb;
// //         }

// //         .hp-status.gray {
// //           color: #68756d;
// //           background: #edf0ed;
// //         }

// //         .hp-package-meta {
// //           display: grid;
// //           grid-template-columns: repeat(4, minmax(0, 1fr));
// //           gap: 9px;
// //           padding: 12px;
// //           background: #f8fcf6;
// //           border-bottom: 1px solid var(--border);
// //         }

// //         .hp-meta-item {
// //           min-width: 0;
// //           padding: 10px;
// //           border: 1px solid #e0ebdc;
// //           border-radius: 9px;
// //           background: white;
// //         }

// //         .hp-meta-item small {
// //           display: block;
// //           color: #829087;
// //           font-size: 9px;
// //           font-weight: 800;
// //           text-transform: uppercase;
// //         }

// //         .hp-meta-item strong {
// //           display: block;
// //           margin-top: 5px;
// //           color: #175a32;
// //           font-size: 12px;
// //           overflow-wrap: anywhere;
// //         }

// //         .hp-cycle-heading {
// //           padding: 12px 14px;
// //           color: #07552e;
// //           background: #eff8e9;
// //           border-bottom: 1px solid #d9e7d3;
// //           font-size: 13px;
// //           font-weight: 950;
// //         }

// //         .hp-table-scroll {
// //           width: 100%;
// //           overflow-x: auto;
// //           scrollbar-width: thin;
// //         }

// //         .hp-package-table {
// //           width: 100%;
// //           min-width: 1000px;
// //           border-collapse: collapse;
// //           text-align: left;
// //         }

// //         .hp-package-table th {
// //           padding: 12px 10px;
// //           color: #175a32;
// //           background: #eaf5e5;
// //           border-bottom: 1px solid #d9e7d3;
// //           font-size: 11px;
// //           font-weight: 900;
// //           white-space: nowrap;
// //         }

// //         .hp-package-table td {
// //           padding: 12px 10px;
// //           color: #253c2c;
// //           border-bottom: 1px solid #d9e7d3;
// //           font-size: 11px;
// //           font-weight: 700;
// //           vertical-align: middle;
// //         }

// //         .hp-package-table tbody tr:nth-child(even) td {
// //           background: #f4faef;
// //         }

// //         .hp-package-table tbody tr.current-stage td {
// //           background: #fff8df;
// //         }

// //         .hp-stage-name {
// //           color: #175a32;
// //           font-weight: 950;
// //           white-space: nowrap;
// //         }

// //         .hp-duration-cell {
// //           color: #805c0b !important;
// //           background: #fff4d6 !important;
// //           font-weight: 900 !important;
// //           white-space: nowrap;
// //         }

// //         .hp-reference-amount {
// //           color: #08783f !important;
// //           font-size: 12px !important;
// //           font-weight: 950 !important;
// //           white-space: nowrap;
// //         }

// //         .hp-achieved-yes {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 5px;
// //           color: #08783f;
// //           font-weight: 900;
// //           white-space: nowrap;
// //         }

// //         .hp-achieved-no {
// //           color: #879188;
// //           font-weight: 800;
// //           white-space: nowrap;
// //         }

// //         .hp-timer-cell {
// //           min-width: 150px;
// //           color: #175a32;
// //           font-weight: 800;
// //           white-space: nowrap;
// //         }

// //         .hp-total-row td {
// //           color: #07552e !important;
// //           background: #e5f5dc !important;
// //           font-size: 12px !important;
// //           font-weight: 950 !important;
// //           border-top: 2px solid #a9c99b;
// //         }

// //         .hp-empty {
// //           padding: 22px;
// //           color: #68756d;
// //           text-align: center;
// //           background: #f8fcf6;
// //           border-radius: 10px;
// //           font-size: 13px;
// //         }

// //         .hp-plan-error {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           padding: 12px;
// //           margin-bottom: 12px;
// //           color: #a52b25;
// //           background: #fff0ef;
// //           border: 1px solid #f3c6c3;
// //           border-radius: 10px;
// //           font-size: 12px;
// //         }

// //         .hp-notice {
// //           display: flex;
// //           align-items: flex-start;
// //           gap: 8px;
// //           margin-top: 12px;
// //           padding: 11px 13px;
// //           border: 1px solid #eadba6;
// //           border-radius: 10px;
// //           color: #725c20;
// //           background: #fff9e8;
// //           font-size: 11px;
// //           line-height: 1.6;
// //         }

// //         .hp-plan-footer {
// //           margin-top: 12px;
// //           text-align: center;
// //           color: #849389;
// //           font-size: 9px;
// //           font-weight: 700;
// //         }

// //         @media (max-width: 760px) {
// //           .hp-summary {
// //             grid-template-columns: repeat(2, minmax(0, 1fr));
// //           }

// //           .hp-package-meta {
// //             grid-template-columns: repeat(2, minmax(0, 1fr));
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .hp-plan {
// //             padding: 9px;
// //           }

// //           .hp-plan-header {
// //             padding: 13px 11px;
// //           }

// //           .hp-plan-tag {
// //             padding: 6px 8px;
// //             font-size: 9px;
// //           }

// //           .hp-summary {
// //             gap: 6px;
// //           }

// //           .hp-summary-card {
// //             padding: 9px;
// //             gap: 7px;
// //           }

// //           .hp-summary-icon {
// //             width: 30px;
// //             height: 30px;
// //           }

// //           .hp-summary-value {
// //             font-size: 13px;
// //           }

// //           .hp-package-card-header {
// //             padding: 13px 11px;
// //           }

// //           .hp-package-title strong {
// //             font-size: 14px;
// //           }

// //           .hp-package-header-right {
// //             gap: 5px;
// //           }

// //           .hp-package-meta {
// //             gap: 6px;
// //             padding: 8px;
// //           }

// //           .hp-meta-item {
// //             padding: 8px;
// //           }

// //           .hp-package-table {
// //             min-width: 1000px;
// //           }
// //         }

// //         @media (max-width: 350px) {
// //           .hp-plan-tag {
// //             display: none;
// //           }

// //           .hp-plan-header h2 {
// //             font-size: 15px;
// //           }
// //         }
// //       `}</style>

// //       {/* Header */}
// //       <div className="hp-plan-header">
// //         <div className="hp-plan-heading">
// //           <div className="hp-plan-heading-icon">
// //             <Package size={23} />
// //           </div>

// //           <div>
// //             <h2>
// //               PACKAGE <span>PROGRESS</span>
// //             </h2>
// //             <p>Helping Pools • Package Activity Tracker</p>
// //           </div>
// //         </div>

// //         <div className="hp-plan-tag">
// //           <Sparkles size={12} />
// //           LIVE STATUS
// //         </div>
// //       </div>

// //       {/* Overall summary */}
// //       <div className="hp-summary">
// //         <div className="hp-summary-card">
// //           <div className="hp-summary-icon">
// //             <Package size={18} />
// //           </div>

// //           <div>
// //             <div className="hp-summary-label">Purchased Cycles</div>
// //             <div className="hp-summary-value">
// //               {subscriptions.length}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="hp-summary-card">
// //           <div className="hp-summary-icon">
// //             <CheckCircle2 size={18} />
// //           </div>

// //           <div>
// //             <div className="hp-summary-label">Completed Stages</div>
// //             <div className="hp-summary-value">
// //               {totalCompletedStages}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="hp-summary-card">
// //           <div className="hp-summary-icon">
// //             <Clock3 size={18} />
// //           </div>

// //           <div>
// //             <div className="hp-summary-label">Remaining Stages</div>
// //             <div className="hp-summary-value">
// //               {totalRemainingStages}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Refresh */}
// //       <div className="hp-refresh-row">
// //         <button
// //           className="hp-refresh-button"
// //           type="button"
// //           onClick={handleRefresh}
// //           disabled={refreshing}
// //         >
// //           <RefreshCw size={14} />
// //           {refreshing ? "Refreshing..." : "Refresh"}
// //         </button>
// //       </div>

// //       {error && (
// //         <div className="hp-plan-error">
// //           <AlertCircle size={15} />
// //           {error}
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="hp-empty">
// //           Loading package progress...
// //         </div>
// //       ) : (
// //         <>
// //           {/* All six packages */}
// //           {packages.map((packageAmount) => {
// //             const packageSubs = subscriptions
// //               .filter(
// //                 (item) =>
// //                   Number(item.packageAmount) === packageAmount
// //               )
// //               .sort(
// //                 (a, b) =>
// //                   Number(a.cycleNumber || 1) -
// //                   Number(b.cycleNumber || 1)
// //               );

// //             const packageKey = `package-${packageAmount}`;

// //             const hasActiveCycle = packageSubs.some(
// //               (item) => item.status === "ACTIVE"
// //             );

// //             const isExpanded =
// //               expandedPackages[packageKey] ?? hasActiveCycle;

// //             const totalCompleted = packageSubs.reduce(
// //               (sum, subscription) =>
// //                 sum +
// //                 getPackageStages(subscription).filter(
// //                   (stage) => stage.status === "ACHIEVED"
// //                 ).length,
// //               0
// //             );

// //             const totalRemaining = packageSubs.length
// //               ? packageSubs.length * 14 - totalCompleted
// //               : 14;

// //             return (
// //               <section
// //                 className="hp-package-card"
// //                 id={`package-card-${packageAmount}`}
// //                 key={packageAmount}
// //               >
// //                 <button
// //                   className="hp-package-card-header"
// //                   type="button"
// //                   onClick={() => togglePackage(packageAmount)}
// //                   aria-expanded={isExpanded}
// //                 >
// //                   <span className="hp-package-title">
// //                     <strong>
// //                       {money(packageAmount)} Package
// //                     </strong>

// //                     <small>
// //                       {packageSubs.length
// //                         ? `${packageSubs.length} Cycle(s) • ${totalCompleted} Completed • ${totalRemaining} Remaining`
// //                         : "Not Purchased • 14 Stages"}
// //                     </small>
// //                   </span>

// //                   <span className="hp-package-header-right">
// //                     <span
// //                       className={`hp-status ${
// //                         hasActiveCycle
// //                           ? "green"
// //                           : packageSubs.length
// //                           ? "blue"
// //                           : "gray"
// //                       }`}
// //                     >
// //                       {hasActiveCycle
// //                         ? "Active"
// //                         : packageSubs.length
// //                         ? "Purchased"
// //                         : "Not Purchased"}
// //                     </span>

// //                     {isExpanded
// //                       ? <ChevronUp size={20} />
// //                       : <ChevronDown size={20} />}
// //                   </span>
// //                 </button>

// //                 {isExpanded && (
// //                   <>
// //                     {packageSubs.length ? (
// //                       packageSubs.map((subscription) => {
// //                         const id = String(subscription.id || subscription._id || `${packageAmount}-${subscription.cycleNumber || 1}`);
// //                         const stages = getPackageStages(subscription);

// //                         const completed = stages.filter(
// //                           (stage) => stage.status === "ACHIEVED"
// //                         ).length;

// //                         const remaining = 14 - completed;

// //                         const currentStageNumber = Number(
// //                           subscription.currentStage || 1
// //                         );

// //                         const currentStage = stages.find(
// //                           (stage) =>
// //                             stage.stageNumber === currentStageNumber
// //                         );

// //                         const referenceTotal = stages.reduce(
// //                           (sum, stage, index) =>
// //                             sum + getReferenceAmount(packageAmount, index),
// //                           0
// //                         );

// //                         // Do not treat stage achievement as income.
// //                         // Only backend records explicitly marked VERIFIED count.
// //                         const verifiedIncomeTotal = stages.reduce(
// //                           (sum, stage) =>
// //                             sum + (stage.earningStatus === "VERIFIED"
// //                               ? stage.earningAmount
// //                               : 0),
// //                           0
// //                         );

// //                         return (
// //                           <div key={id}>
// //                             <div className="hp-cycle-heading">
// //                               {money(packageAmount)} Package — Cycle{" "}
// //                               {subscription.cycleNumber || 1}
// //                               {" • "}
// //                               {statusLabel(subscription.status)}
// //                             </div>

// //                             <div className="hp-package-meta">
// //                               <div className="hp-meta-item">
// //                                 <small>Package Amount</small>
// //                                 <strong>{money(packageAmount)}</strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Completed Stages</small>
// //                                 <strong>{completed} / 14</strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Remaining Stages</small>
// //                                 <strong>{remaining} / 14</strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Current Stage</small>
// //                                 <strong>
// //                                   {subscription.status === "COMPLETED"
// //                                     ? "All completed"
// //                                     : `Stage ${currentStageNumber} / 14`}
// //                                 </strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Current Stage Status</small>
// //                                 <strong>
// //                                   {statusLabel(
// //                                     currentStage?.status || "LOCKED"
// //                                   )}
// //                                 </strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Timer Remaining</small>
// //                                 <strong>
// //                                   {currentStage?.status === "RUNNING"
// //                                     ? getRemainingTime(
// //                                         currentStage.endsAt,
// //                                         now
// //                                       )
// //                                     : currentStage?.status === "PAUSED"
// //                                     ? "Timer paused"
// //                                     : currentStage?.status === "ACHIEVED"
// //                                     ? "Stage completed"
// //                                     : "Not running"}
// //                                 </strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Purchased At</small>
// //                                 <strong>
// //                                   {subscription.purchasedAt
// //                                     ? new Date(
// //                                         subscription.purchasedAt
// //                                       ).toLocaleString()
// //                                     : "Not available"}
// //                                 </strong>
// //                               </div>

// //                               <div className="hp-meta-item">
// //                                 <small>Cycle Status</small>
// //                                 <strong>
// //                                   {statusLabel(subscription.status)}
// //                                 </strong>
// //                               </div>
// //                             </div>

// //                             <div className="hp-table-scroll">
// //                               <table className="hp-package-table">
// //                                 <thead>
// //                                   <tr>
// //                                     <th>Stage</th>
// //                                     <th>Duration / Days</th>
// //                                     <th>Stage Status</th>
// //                                     <th>Timer / Remaining Time</th>
// //                                     <th>Reference Amount (Illustrative)</th>
// //                                     <th>Verified Income</th>
// //                                     <th>Achieved?</th>
// //                                   </tr>
// //                                 </thead>

// //                                 <tbody>
// //                                   {stages.map((stage, index) => {
// //                                     const achieved =
// //                                       stage.status === "ACHIEVED";

// //                                     const isCurrent =
// //                                       subscription.status === "ACTIVE" &&
// //                                       stage.stageNumber ===
// //                                         currentStageNumber;

// //                                     let timer = "Locked";

// //                                     if (stage.status === "RUNNING") {
// //                                       timer = getRemainingTime(
// //                                         stage.endsAt,
// //                                         now
// //                                       );
// //                                     } else if (
// //                                       stage.status === "PAUSED"
// //                                     ) {
// //                                       timer = "Timer paused";
// //                                     } else if (
// //                                       stage.status === "ACHIEVED"
// //                                     ) {
// //                                       timer = "Completed";
// //                                     } else if (
// //                                       stage.status === "WAITING"
// //                                     ) {
// //                                       timer = "Waiting";
// //                                     }

// //                                     return (
// //                                       <tr
// //                                         key={`${id}-stage-${stage.stageNumber}`}
// //                                         className={
// //                                           isCurrent ? "current-stage" : ""
// //                                         }
// //                                       >
// //                                         <td>
// //                                           <span className="hp-stage-name">
// //                                             Stage {stage.stageNumber}
// //                                           </span>
// //                                         </td>

// //                                         <td className="hp-duration-cell">
// //                                           <CalendarDays
// //                                             size={12}
// //                                             style={{
// //                                               display: "inline",
// //                                               marginRight: 5,
// //                                               verticalAlign: "middle"
// //                                             }}
// //                                           />
// //                                           {stage.durationDays}{" "}
// //                                           {stage.durationDays === 1
// //                                             ? "Day"
// //                                             : "Days"}
// //                                         </td>

// //                                         <td>
// //                                           <span
// //                                             className={`hp-status ${statusClass(
// //                                               stage.status
// //                                             )}`}
// //                                           >
// //                                             {statusLabel(stage.status)}
// //                                           </span>
// //                                         </td>

// //                                         <td className="hp-timer-cell">
// //                                           <Clock3
// //                                             size={12}
// //                                             style={{
// //                                               display: "inline",
// //                                               marginRight: 5,
// //                                               verticalAlign: "middle"
// //                                             }}
// //                                           />
// //                                           {timer}
// //                                         </td>

// //                                         <td className="hp-reference-amount">
// //                                           {money(getReferenceAmount(packageAmount, index))}
// //                                         </td>

// //                                         <td className="hp-reference-amount">
// //                                           {stage.earningStatus === "VERIFIED"
// //                                             ? money(stage.earningAmount)
// //                                             : "—"}
// //                                           {stage.earningStatus === "VERIFIED" && stage.earningRecordedAt && (
// //                                             <small style={{ display: "block", color: "#68756d", fontWeight: 600 }}>
// //                                               Verified: {new Date(stage.earningRecordedAt).toLocaleString()}
// //                                             </small>
// //                                           )}
// //                                         </td>

// //                                         <td>
// //                                           {achieved ? (
// //                                             <span className="hp-achieved-yes">
// //                                               <CheckCircle2 size={14} />
// //                                               Yes
// //                                             </span>
// //                                           ) : (
// //                                             <span className="hp-achieved-no">
// //                                               No
// //                                             </span>
// //                                           )}
// //                                         </td>
// //                                       </tr>
// //                                     );
// //                                   })}

// //                                   <tr className="hp-total-row">
// //                                     <td colSpan={4}>
// //                                       Total Reference Amount
// //                                     </td>
// //                                     <td>{money(referenceTotal)}</td>
// //                                     <td>{money(verifiedIncomeTotal)}</td>
// //                                     <td>{completed}/14</td>
// //                                   </tr>
// //                                 </tbody>
// //                               </table>
// //                             </div>
// //                           </div>
// //                         );
// //                       })
// //                     ) : (
// //                       <>
// //                         <div className="hp-package-meta">
// //                           <div className="hp-meta-item">
// //                             <small>Package Amount</small>
// //                             <strong>{money(packageAmount)}</strong>
// //                           </div>

// //                           <div className="hp-meta-item">
// //                             <small>Package Status</small>
// //                             <strong>Not Purchased</strong>
// //                           </div>

// //                           <div className="hp-meta-item">
// //                             <small>Completed Stages</small>
// //                             <strong>0 / 14</strong>
// //                           </div>

// //                           <div className="hp-meta-item">
// //                             <small>Remaining Stages</small>
// //                             <strong>14 / 14</strong>
// //                           </div>
// //                         </div>

// //                         <div className="hp-table-scroll">
// //                           <table className="hp-package-table">
// //                             <thead>
// //                               <tr>
// //                                 <th>Stage</th>
// //                                 <th>Duration / Days</th>
// //                                 <th>Stage Status</th>
// //                                 <th>Timer / Remaining Time</th>
// //                                 <th>Reference Amount (Illustrative)</th>
// //                                 <th>Verified Income</th>
// //                                 <th>Achieved?</th>
// //                               </tr>
// //                             </thead>

// //                             <tbody>
// //                               {stageDurations.map((days, index) => (
// //                                 <tr
// //                                   key={`unbought-${packageAmount}-${index + 1}`}
// //                                 >
// //                                   <td>
// //                                     <span className="hp-stage-name">
// //                                       Stage {index + 1}
// //                                     </span>
// //                                   </td>

// //                                   <td className="hp-duration-cell">
// //                                     {days} {days === 1 ? "Day" : "Days"}
// //                                   </td>

// //                                   <td>
// //                                     <span className="hp-status gray">
// //                                       Locked
// //                                     </span>
// //                                   </td>

// //                                   <td className="hp-timer-cell">
// //                                     Not purchased
// //                                   </td>

// //                                   <td className="hp-reference-amount">
// //                                     {money(getReferenceAmount(packageAmount, index))}
// //                                   </td>

// //                                   <td className="hp-achieved-no">—</td>

// //                                   <td>
// //                                     <span className="hp-achieved-no">
// //                                       No
// //                                     </span>
// //                                   </td>
// //                                 </tr>
// //                               ))}

// //                               <tr className="hp-total-row">
// //                                 <td colSpan={4}>
// //                                   Total Reference Amount
// //                                 </td>
// //                                 <td>
// //                                   {money(
// //                                     stageAmounts.reduce(
// //                                       (sum, row) =>
// //                                         sum +
// //                                         Number(
// //                                           row[
// //                                             packages.indexOf(packageAmount)
// //                                           ] || 0
// //                                         ),
// //                                       0
// //                                     )
// //                                   )}
// //                                 </td>
// //                                 <td>$0</td>
// //                                 <td>0/14</td>
// //                               </tr>
// //                             </tbody>
// //                           </table>
// //                         </div>
// //                       </>
// //                     )}
// //                   </>
// //                 )}
// //               </section>
// //             );
// //           })}
// //         </>
// //       )}

// //       <div className="hp-notice">
// //         <AlertCircle size={15} />
// //         <span>
// //           Reference amounts are illustrative schedule figures only.
// //           They are not actual received income, guaranteed returns,
// //           or promises of payment. Actual transactions must be verified
// //           separately in transaction history.
// //         </span>
// //       </div>

// //       <div className="hp-plan-footer">
// //         HELPING POOLS • PACKAGE PROGRESS TRACKER
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Package,
//   Clock3,
//   Sparkles,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle2,
//   ChevronDown,
//   ChevronUp,
//   CalendarDays
// } from "lucide-react";

// import api from "../../api/axios";

// const packages = [30, 60, 120, 240, 480, 960];

// const stageDurations = [
//   1, 3, 7, 15,
//   30, 30, 30, 30, 30, 30,
//   30, 30, 30, 30
// ];

// // Illustrative reference schedule only.
// // These figures do not represent actual payments or guaranteed income.
// const stageAmounts = [
//   [5, 10, 20, 40, 80, 160],
//   [5, 10, 20, 40, 80, 160],
//   [10, 20, 40, 80, 160, 320],
//   [20, 40, 80, 160, 320, 640],
//   [30, 60, 120, 240, 480, 960],
//   [30, 60, 120, 240, 480, 960],
//   [50, 100, 200, 400, 800, 1600],
//   [50, 100, 200, 400, 800, 1600],
//   [100, 200, 400, 800, 1600, 3200],
//   [200, 400, 800, 1600, 3200, 6400],
//   [400, 800, 1600, 3200, 6400, 12800],
//   [800, 1600, 3200, 6400, 12800, 25600],
//   [1600, 3200, 6400, 12800, 25600, 51200],
//   [3200, 6400, 12800, 25600, 51200, 102400]
// ];

// const money = (value) =>
//   "$" + Number(value || 0).toLocaleString("en-US");

// const getReferenceAmount = (amount, stageIndex) => {
//   const column = packages.indexOf(Number(amount));
//   if (column < 0) return 0;

//   return Number(stageAmounts[stageIndex]?.[column] || 0);
// };

// const getRemainingTime = (endsAt, now) => {
//   if (!endsAt) return "Not started";

//   const remaining = new Date(endsAt).getTime() - now;

//   if (Number.isNaN(remaining)) return "Unavailable";
//   if (remaining <= 0) return "Time completed";

//   const days = Math.floor(remaining / 86400000);
//   const hours = Math.floor((remaining % 86400000) / 3600000);
//   const minutes = Math.floor((remaining % 3600000) / 60000);
//   const seconds = Math.floor((remaining % 60000) / 1000);

//   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// };

// const statusClass = (status) => {
//   const value = String(status || "").toUpperCase();

//   if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
//     return "green";
//   }

//   if (value === "PAUSED") return "orange";
//   if (["WAITING", "PENDING"].includes(value)) return "blue";
//   if (value === "CANCELLED") return "red";

//   return "gray";
// };

// const statusLabel = (status) => {
//   const labels = {
//     RUNNING: "Running",
//     ACTIVE: "Active",
//     PAUSED: "Paused",
//     WAITING: "Waiting",
//     LOCKED: "Locked",
//     ACHIEVED: "Achieved",
//     COMPLETED: "Completed",
//     CANCELLED: "Cancelled",
//     PENDING: "Pending"
//   };

//   const value = String(status || "LOCKED").toUpperCase();
//   return labels[value] || value;
// };

// const getPackageStages = (subscription) => {
//   return Array.from({ length: 14 }, (_, index) => {
//     const stageNumber = index + 1;

//     const savedStage = subscription?.stages?.find(
//       (item) => Number(item.stageNumber) === stageNumber
//     );

//     return {
//       stageNumber,
//       durationDays: Number(
//         savedStage?.durationDays || stageDurations[index]
//       ),
//       status: String(savedStage?.status || "LOCKED").toUpperCase(),
//       startedAt: savedStage?.startedAt || null,
//       endsAt: savedStage?.endsAt || null,
//       completedAt: savedStage?.completedAt || null,
//       earningAmount: Number(savedStage?.earningAmount || 0),
//       earningStatus: String(savedStage?.earningStatus || "NOT_RECORDED").toUpperCase(),
//       earningRecordedAt: savedStage?.earningRecordedAt || null
//     };
//   });
// };

// export default function Plan() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");
//   const [now, setNow] = useState(Date.now());

//   // Each package has its own expand/collapse state.
//   const [expandedPackages, setExpandedPackages] = useState({});

//   const fetchProgress = useCallback(async (showLoader = false) => {
//     try {
//       if (showLoader) setRefreshing(true);

//       const response = await api.get("/package-progress");
 
// // console.group("📦 PACKAGE PROGRESS DEBUG");

// // console.log("API URL:", "/package-progress");
// // console.log("HTTP STATUS:", response.status);
// // console.log("API SUCCESS:", response.data?.success);
// // console.log("FULL API RESPONSE:", response.data);
// // console.log("PACKAGES:", response.data?.packages);

// (response.data?.packages || []).forEach((pkg) => {
//   console.group(
//     `Package $${pkg.packageAmount} | Cycle ${pkg.cycleNumber}`
//   );

// console.log("Subscription ID:", pkg.id);
//   console.log("User ID:", pkg.userId);
//   console.log("Package Status:", pkg.status);
//   console.log("Current Stage:", pkg.currentStage);
//   console.log("Recorded Activity:", pkg.recordedActivityAmount);

//   console.table(
//     (pkg.stages || []).map((stage) => ({
//       stageNumber: stage.stageNumber,
//       durationDays: stage.durationDays,
//       status: stage.status,
//       startedAt: stage.startedAt,
//       endsAt: stage.endsAt,
//       completedAt: stage.completedAt
//     }))
//   );

//   console.groupEnd();
// });

// console.groupEnd();

//       if (!response.data?.success) {
//         setError(
//           response.data?.message || "Package progress could not be loaded."
//         );
//         return;
//       }

//       const list = Array.isArray(response.data.packages)
//         ? response.data.packages
//         : [];

//       const sorted = [...list].sort((a, b) => {
//         const amountDifference =
//           Number(a.packageAmount) - Number(b.packageAmount);

//         if (amountDifference !== 0) return amountDifference;

//         return (
//           Number(a.cycleNumber || 1) -
//           Number(b.cycleNumber || 1)
//         );
//       });

//       setSubscriptions(sorted);
//       setError("");

//       // Automatically expand packages containing an ACTIVE cycle.
//       // Preserve the user's manual open/close choice after initial load.
//       setExpandedPackages((previous) => {
//         const next = { ...previous };

//         packages.forEach((amount) => {
//           const key = `package-${amount}`;

//           const hasActiveCycle = sorted.some(
//             (item) =>
//               Number(item.packageAmount) === amount &&
//               item.status === "ACTIVE"
//           );

//           if (next[key] === undefined) {
//             next[key] = hasActiveCycle;
//           } else if (hasActiveCycle && !previous[key + "-manually-closed"]) {
//             next[key] = true;
//           }
//         });

//         return next;
//       });
//     } catch (err) {
//       console.error("Package progress fetch error:", err);

//       setError(
//         err.response?.data?.message ||
//         "Unable to load package progress. Please login again."
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProgress();

//     const refreshInterval = setInterval(() => {
//       fetchProgress();
//     }, 30000);

//     const clockInterval = setInterval(() => {
//       setNow(Date.now());
//     }, 1000);

//     return () => {
//       clearInterval(refreshInterval);
//       clearInterval(clockInterval);
//     };
//   }, [fetchProgress]);

//   const handleRefresh = () => {
//     fetchProgress(true);
//   };

//   const togglePackage = (amount) => {
//     const key = `package-${amount}`;

//     setExpandedPackages((previous) => {
//       const nextValue = !(previous[key] ?? false);

//       return {
//         ...previous,
//         [key]: nextValue,
//         [key + "-manually-closed"]: !nextValue
//       };
//     });
//   };

//   const totalCompletedStages = useMemo(() => {
//     return subscriptions.reduce((total, subscription) => {
//       const stages = getPackageStages(subscription);

//       return (
//         total +
//         stages.filter((stage) => stage.status === "ACHIEVED").length
//       );
//     }, 0);
//   }, [subscriptions]);

//   const totalRemainingStages = useMemo(() => {
//     return subscriptions.reduce((total, subscription) => {
//       const stages = getPackageStages(subscription);

//       return (
//         total +
//         stages.filter((stage) => stage.status !== "ACHIEVED").length
//       );
//     }, 0);
//   }, [subscriptions]);

//   return (
//     <div className="hp-plan">
//       <style>{`
//         .hp-plan {
//           --green: #08783f;
//           --dark: #07552e;
//           --gold: #e5b83f;
//           --border: #d8e9d3;
//           width: 100%;
//           padding: 15px;
//           color: #173522;
//           background: #f5f9f1;
//           border-radius: 16px;
//           font-family: Inter, Arial, sans-serif;
//           box-sizing: border-box;
//         }

//         .hp-plan * {
//           box-sizing: border-box;
//         }

//         .hp-plan-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 12px;
//           padding: 17px 20px;
//           margin-bottom: 15px;
//           border: 2px solid var(--gold);
//           border-radius: 15px;
//           background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
//         }

//         .hp-plan-heading {
//           display: flex;
//           align-items: center;
//           gap: 11px;
//           min-width: 0;
//         }

//         .hp-plan-heading-icon {
//           display: grid;
//           place-items: center;
//           width: 42px;
//           height: 42px;
//           color: #f8d76f;
//           background: #ffffff16;
//           border-radius: 11px;
//           flex-shrink: 0;
//         }

//         .hp-plan-header h2 {
//           margin: 0;
//           color: white;
//           font-size: clamp(16px, 2.4vw, 23px);
//           font-weight: 950;
//         }

//         .hp-plan-header h2 span {
//           color: #ffe36c;
//         }

//         .hp-plan-header p {
//           margin: 4px 0 0;
//           color: #d5ebd9;
//           font-size: 11px;
//         }

//         .hp-plan-tag {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 12px;
//           border: 1px solid #f5d36a;
//           border-radius: 30px;
//           color: #ffe47a;
//           font-size: 10px;
//           font-weight: 900;
//           white-space: nowrap;
//         }

//         .hp-summary {
//           display: grid;
//           grid-template-columns: repeat(3, minmax(0, 1fr));
//           gap: 10px;
//           margin-bottom: 15px;
//         }

//         .hp-summary-card {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 12px;
//           border: 1px solid var(--border);
//           border-radius: 12px;
//           background: white;
//           min-width: 0;
//         }

//         .hp-summary-icon {
//           display: grid;
//           place-items: center;
//           width: 36px;
//           height: 36px;
//           flex-shrink: 0;
//           color: var(--green);
//           background: #eaf7e9;
//           border-radius: 10px;
//         }

//         .hp-summary-label {
//           color: #849389;
//           font-size: 9px;
//           font-weight: 800;
//           text-transform: uppercase;
//         }

//         .hp-summary-value {
//           margin-top: 4px;
//           color: #16452b;
//           font-size: 16px;
//           font-weight: 950;
//           overflow-wrap: anywhere;
//         }

//         .hp-refresh-row {
//           display: flex;
//           justify-content: flex-end;
//           margin-bottom: 13px;
//         }

//         .hp-refresh-button {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           min-height: 40px;
//           padding: 9px 13px;
//           color: white;
//           background: #08783f;
//           border: 0;
//           border-radius: 8px;
//           font-weight: 800;
//           cursor: pointer;
//         }

//         .hp-refresh-button:disabled {
//           opacity: .6;
//           cursor: not-allowed;
//         }

//         .hp-package-card {
//           margin-bottom: 16px;
//           overflow: hidden;
//           border: 1px solid #cbdcbe;
//           border-radius: 13px;
//           background: white;
//           scroll-margin-top: 18px;
//         }

//         .hp-package-card-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//           width: 100%;
//           padding: 15px 17px;
//           color: white;
//           text-align: left;
//           background: linear-gradient(110deg, #087b3e, #07572e);
//           border: 0;
//           cursor: pointer;
//         }

//         .hp-package-title {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//           min-width: 0;
//         }

//         .hp-package-title strong {
//           font-size: 16px;
//           font-weight: 950;
//           overflow-wrap: anywhere;
//         }

//         .hp-package-title small {
//           color: #d8f0dc;
//           font-size: 10px;
//           font-weight: 700;
//         }

//         .hp-package-header-right {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           flex-shrink: 0;
//         }

//         .hp-package-header-right svg {
//           color: #ffe47a;
//         }

//         .hp-status {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 5px 9px;
//           border-radius: 20px;
//           font-size: 10px;
//           font-weight: 900;
//           white-space: nowrap;
//         }

//         .hp-status.green {
//           color: #08783f;
//           background: #e4f7e9;
//         }

//         .hp-status.orange {
//           color: #a65a08;
//           background: #fff0d9;
//         }

//         .hp-status.blue {
//           color: #1760a4;
//           background: #e8f2ff;
//         }

//         .hp-status.red {
//           color: #b42318;
//           background: #ffebeb;
//         }

//         .hp-status.gray {
//           color: #68756d;
//           background: #edf0ed;
//         }

//         .hp-package-meta {
//           display: grid;
//           grid-template-columns: repeat(4, minmax(0, 1fr));
//           gap: 9px;
//           padding: 12px;
//           background: #f8fcf6;
//           border-bottom: 1px solid var(--border);
//         }

//         .hp-meta-item {
//           min-width: 0;
//           padding: 10px;
//           border: 1px solid #e0ebdc;
//           border-radius: 9px;
//           background: white;
//         }

//         .hp-meta-item small {
//           display: block;
//           color: #829087;
//           font-size: 9px;
//           font-weight: 800;
//           text-transform: uppercase;
//         }

//         .hp-meta-item strong {
//           display: block;
//           margin-top: 5px;
//           color: #175a32;
//           font-size: 12px;
//           overflow-wrap: anywhere;
//         }

//         .hp-cycle-heading {
//           padding: 12px 14px;
//           color: #07552e;
//           background: #eff8e9;
//           border-bottom: 1px solid #d9e7d3;
//           font-size: 13px;
//           font-weight: 950;
//         }

//         .hp-table-scroll {
//           width: 100%;
//           overflow-x: auto;
//           scrollbar-width: thin;
//         }

//         .hp-package-table {
//           width: 100%;
//           min-width: 850px;
//           border-collapse: collapse;
//           text-align: left;
//         }

//         .hp-package-table th {
//           padding: 12px 10px;
//           color: #175a32;
//           background: #eaf5e5;
//           border-bottom: 1px solid #d9e7d3;
//           font-size: 11px;
//           font-weight: 900;
//           white-space: nowrap;
//         }

//         .hp-package-table td {
//           padding: 12px 10px;
//           color: #253c2c;
//           border-bottom: 1px solid #d9e7d3;
//           font-size: 11px;
//           font-weight: 700;
//           vertical-align: middle;
//         }

//         .hp-package-table tbody tr:nth-child(even) td {
//           background: #f4faef;
//         }

//         .hp-package-table tbody tr.current-stage td {
//           background: #fff8df;
//         }

//         .hp-stage-name {
//           color: #175a32;
//           font-weight: 950;
//           white-space: nowrap;
//         }

//         .hp-duration-cell {
//           color: #805c0b !important;
//           background: #fff4d6 !important;
//           font-weight: 900 !important;
//           white-space: nowrap;
//         }

//         .hp-reference-amount {
//           color: #08783f !important;
//           font-size: 12px !important;
//           font-weight: 950 !important;
//           white-space: nowrap;
//         }

//         .hp-achieved-yes {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           color: #08783f;
//           font-weight: 900;
//           white-space: nowrap;
//         }

//         .hp-achieved-no {
//           color: #879188;
//           font-weight: 800;
//           white-space: nowrap;
//         }

//         .hp-timer-cell {
//           min-width: 150px;
//           color: #175a32;
//           font-weight: 800;
//           white-space: nowrap;
//         }

//         .hp-total-row td {
//           color: #07552e !important;
//           background: #e5f5dc !important;
//           font-size: 12px !important;
//           font-weight: 950 !important;
//           border-top: 2px solid #a9c99b;
//         }

//         .hp-empty {
//           padding: 22px;
//           color: #68756d;
//           text-align: center;
//           background: #f8fcf6;
//           border-radius: 10px;
//           font-size: 13px;
//         }

//         .hp-plan-error {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 12px;
//           margin-bottom: 12px;
//           color: #a52b25;
//           background: #fff0ef;
//           border: 1px solid #f3c6c3;
//           border-radius: 10px;
//           font-size: 12px;
//         }

//         .hp-notice {
//           display: flex;
//           align-items: flex-start;
//           gap: 8px;
//           margin-top: 12px;
//           padding: 11px 13px;
//           border: 1px solid #eadba6;
//           border-radius: 10px;
//           color: #725c20;
//           background: #fff9e8;
//           font-size: 11px;
//           line-height: 1.6;
//         }

//         .hp-plan-footer {
//           margin-top: 12px;
//           text-align: center;
//           color: #849389;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         @media (max-width: 760px) {
//           .hp-summary {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//           }

//           .hp-package-meta {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//           }
//         }

//         @media (max-width: 480px) {
//           .hp-plan {
//             padding: 9px;
//           }

//           .hp-plan-header {
//             padding: 13px 11px;
//           }

//           .hp-plan-tag {
//             padding: 6px 8px;
//             font-size: 9px;
//           }

//           .hp-summary {
//             gap: 6px;
//           }

//           .hp-summary-card {
//             padding: 9px;
//             gap: 7px;
//           }

//           .hp-summary-icon {
//             width: 30px;
//             height: 30px;
//           }

//           .hp-summary-value {
//             font-size: 13px;
//           }

//           .hp-package-card-header {
//             padding: 13px 11px;
//           }

//           .hp-package-title strong {
//             font-size: 14px;
//           }

//           .hp-package-header-right {
//             gap: 5px;
//           }

//           .hp-package-meta {
//             gap: 6px;
//             padding: 8px;
//           }

//           .hp-meta-item {
//             padding: 8px;
//           }

//           .hp-package-table {
//             min-width: 850px;
//           }
//         }

//         @media (max-width: 350px) {
//           .hp-plan-tag {
//             display: none;
//           }

//           .hp-plan-header h2 {
//             font-size: 15px;
//           }
//         }
//       `}</style>

//       {/* Header */}
//       <div className="hp-plan-header">
//         <div className="hp-plan-heading">
//           <div className="hp-plan-heading-icon">
//             <Package size={23} />
//           </div>

//           <div>
//             <h2>
//               PACKAGE <span>PROGRESS</span>
//             </h2>
//             <p>Helping Pools • Package Activity Tracker</p>
//           </div>
//         </div>

//         <div className="hp-plan-tag">
//           <Sparkles size={12} />
//           LIVE STATUS
//         </div>
//       </div>

//       {/* Overall summary */}
//       <div className="hp-summary">
//         <div className="hp-summary-card">
//           <div className="hp-summary-icon">
//             <Package size={18} />
//           </div>

//           <div>
//             <div className="hp-summary-label">Purchased Cycles</div>
//             <div className="hp-summary-value">
//               {subscriptions.length}
//             </div>
//           </div>
//         </div>

//         <div className="hp-summary-card">
//           <div className="hp-summary-icon">
//             <CheckCircle2 size={18} />
//           </div>

//           <div>
//             <div className="hp-summary-label">Completed Stages</div>
//             <div className="hp-summary-value">
//               {totalCompletedStages}
//             </div>
//           </div>
//         </div>

//         <div className="hp-summary-card">
//           <div className="hp-summary-icon">
//             <Clock3 size={18} />
//           </div>

//           <div>
//             <div className="hp-summary-label">Remaining Stages</div>
//             <div className="hp-summary-value">
//               {totalRemainingStages}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Refresh */}
//       <div className="hp-refresh-row">
//         <button
//           className="hp-refresh-button"
//           type="button"
//           onClick={handleRefresh}
//           disabled={refreshing}
//         >
//           <RefreshCw size={14} />
//           {refreshing ? "Refreshing..." : "Refresh"}
//         </button>
//       </div>

//       {error && (
//         <div className="hp-plan-error">
//           <AlertCircle size={15} />
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <div className="hp-empty">
//           Loading package progress...
//         </div>
//       ) : (
//         <>
//           {/* All six packages */}
//           {packages.map((packageAmount) => {
//             const packageSubs = subscriptions
//               .filter(
//                 (item) =>
//                   Number(item.packageAmount) === packageAmount
//               )
//               .sort(
//                 (a, b) =>
//                   Number(a.cycleNumber || 1) -
//                   Number(b.cycleNumber || 1)
//               );

//             const packageKey = `package-${packageAmount}`;

//             const hasActiveCycle = packageSubs.some(
//               (item) => item.status === "ACTIVE"
//             );

//             const isExpanded =
//               expandedPackages[packageKey] ?? hasActiveCycle;

//             const totalCompleted = packageSubs.reduce(
//               (sum, subscription) =>
//                 sum +
//                 getPackageStages(subscription).filter(
//                   (stage) => stage.status === "ACHIEVED"
//                 ).length,
//               0
//             );

//             const totalRemaining = packageSubs.length
//               ? packageSubs.length * 14 - totalCompleted
//               : 14;

//             return (
//               <section
//                 className="hp-package-card"
//                 id={`package-card-${packageAmount}`}
//                 key={packageAmount}
//               >
//                 <button
//                   className="hp-package-card-header"
//                   type="button"
//                   onClick={() => togglePackage(packageAmount)}
//                   aria-expanded={isExpanded}
//                 >
//                   <span className="hp-package-title">
//                     <strong>
//                       {money(packageAmount)} Package
//                     </strong>

//                     <small>
//                       {packageSubs.length
//                         ? `${packageSubs.length} Cycle(s) • ${totalCompleted} Completed • ${totalRemaining} Remaining`
//                         : "Not Purchased • 14 Stages"}
//                     </small>
//                   </span>

//                   <span className="hp-package-header-right">
//                     <span
//                       className={`hp-status ${
//                         hasActiveCycle
//                           ? "green"
//                           : packageSubs.length
//                           ? "blue"
//                           : "gray"
//                       }`}
//                     >
//                       {hasActiveCycle
//                         ? "Active"
//                         : packageSubs.length
//                         ? "Purchased"
//                         : "Not Purchased"}
//                     </span>

//                     {isExpanded
//                       ? <ChevronUp size={20} />
//                       : <ChevronDown size={20} />}
//                   </span>
//                 </button>

//                 {isExpanded && (
//                   <>
//                     {packageSubs.length ? (
//                       packageSubs.map((subscription) => {
//                         const id = String(subscription.id || subscription._id || `${packageAmount}-${subscription.cycleNumber || 1}`);
//                         const stages = getPackageStages(subscription);

//                         const completed = stages.filter(
//                           (stage) => stage.status === "ACHIEVED"
//                         ).length;

//                         const remaining = 14 - completed;

//                         const currentStageNumber = Number(
//                           subscription.currentStage || 1
//                         );

//                         const currentStage = stages.find(
//                           (stage) =>
//                             stage.stageNumber === currentStageNumber
//                         );

//                         const referenceTotal = stages.reduce(
//                           (sum, stage, index) =>
//                             sum + getReferenceAmount(packageAmount, index),
//                           0
//                         );
//                         const verifiedIncomeTotal = stages.reduce(
//                           (sum, stage) => sum + stage.earningAmount,
//                           0
//                         );

//                         return (
//                           <div key={id}>
//                             <div className="hp-cycle-heading">
//                               {money(packageAmount)} Package — Cycle{" "}
//                               {subscription.cycleNumber || 1}
//                               {" • "}
//                               {statusLabel(subscription.status)}
//                             </div>

//                             <div className="hp-package-meta">
//                               <div className="hp-meta-item">
//                                 <small>Package Amount</small>
//                                 <strong>{money(packageAmount)}</strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Completed Stages</small>
//                                 <strong>{completed} / 14</strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Remaining Stages</small>
//                                 <strong>{remaining} / 14</strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Current Stage</small>
//                                 <strong>
//                                   {subscription.status === "COMPLETED"
//                                     ? "All completed"
//                                     : `Stage ${currentStageNumber} / 14`}
//                                 </strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Current Stage Status</small>
//                                 <strong>
//                                   {statusLabel(
//                                     currentStage?.status || "LOCKED"
//                                   )}
//                                 </strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Timer Remaining</small>
//                                 <strong>
//                                   {currentStage?.status === "RUNNING"
//                                     ? getRemainingTime(
//                                         currentStage.endsAt,
//                                         now
//                                       )
//                                     : currentStage?.status === "PAUSED"
//                                     ? "Timer paused"
//                                     : currentStage?.status === "ACHIEVED"
//                                     ? "Stage completed"
//                                     : "Not running"}
//                                 </strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Purchased At</small>
//                                 <strong>
//                                   {subscription.purchasedAt
//                                     ? new Date(
//                                         subscription.purchasedAt
//                                       ).toLocaleString()
//                                     : "Not available"}
//                                 </strong>
//                               </div>

//                               <div className="hp-meta-item">
//                                 <small>Cycle Status</small>
//                                 <strong>
//                                   {statusLabel(subscription.status)}
//                                 </strong>
//                               </div>
//                             </div>

//                             <div className="hp-table-scroll">
//                               <table className="hp-package-table">
//                                 <thead>
//                                   <tr>
//                                     <th>Stage</th>
//                                     <th>Duration / Days</th>
//                                     <th>Stage Status</th>
//                                     <th>Timer / Remaining Time</th>
//                                     <th>Reference Amount</th>
//                                     <th>Verified Income</th>
//                                     <th>Income Status</th>
//                                     <th>Achieved?</th>
//                                   </tr>
//                                 </thead>

//                                 <tbody>
//                                   {stages.map((stage, index) => {
//                                     const achieved =
//                                       stage.status === "ACHIEVED";

//                                     const isCurrent =
//                                       subscription.status === "ACTIVE" &&
//                                       stage.stageNumber ===
//                                         currentStageNumber;

//                                     let timer = "Locked";

//                                     if (stage.status === "RUNNING") {
//                                       timer = getRemainingTime(
//                                         stage.endsAt,
//                                         now
//                                       );
//                                     } else if (
//                                       stage.status === "PAUSED"
//                                     ) {
//                                       timer = "Timer paused";
//                                     } else if (
//                                       stage.status === "ACHIEVED"
//                                     ) {
//                                       timer = "Completed";
//                                     } else if (
//                                       stage.status === "WAITING"
//                                     ) {
//                                       timer = "Waiting";
//                                     }

//                                     return (
//                                       <tr
//                                         key={`${id}-stage-${stage.stageNumber}`}
//                                         className={
//                                           isCurrent ? "current-stage" : ""
//                                         }
//                                       >
//                                         <td>
//                                           <span className="hp-stage-name">
//                                             Stage {stage.stageNumber}
//                                           </span>
//                                         </td>

//                                         <td className="hp-duration-cell">
//                                           <CalendarDays
//                                             size={12}
//                                             style={{
//                                               display: "inline",
//                                               marginRight: 5,
//                                               verticalAlign: "middle"
//                                             }}
//                                           />
//                                           {stage.durationDays}{" "}
//                                           {stage.durationDays === 1
//                                             ? "Day"
//                                             : "Days"}
//                                         </td>

//                                         <td>
//                                           <span
//                                             className={`hp-status ${statusClass(
//                                               stage.status
//                                             )}`}
//                                           >
//                                             {statusLabel(stage.status)}
//                                           </span>
//                                         </td>

//                                         <td className="hp-timer-cell">
//                                           <Clock3
//                                             size={12}
//                                             style={{
//                                               display: "inline",
//                                               marginRight: 5,
//                                               verticalAlign: "middle"
//                                             }}
//                                           />
//                                           {timer}
//                                         </td>

//                                         <td className="hp-reference-amount">
//                                           {money(
//                                             getReferenceAmount(
//                                               packageAmount,
//                                               index
//                                             )
//                                           )}
//                                         </td>

//                                         <td className="hp-reference-amount">
//                                           {money(stage.earningAmount)}
//                                         </td>

//                                         <td>
//                                           <span className={`hp-status ${stage.earningStatus === "RECORDED" ? "green" : "gray"}`}>
//                                             {stage.earningStatus === "RECORDED" ? "Recorded" : "Not recorded"}
//                                           </span>
//                                           {stage.earningRecordedAt && (
//                                             <small style={{ display: "block", marginTop: 4, color: "#68756d" }}>
//                                               {new Date(stage.earningRecordedAt).toLocaleString()}
//                                             </small>
//                                           )}
//                                         </td>

//                                         <td>
//                                           {achieved ? (
//                                             <span className="hp-achieved-yes">
//                                               <CheckCircle2 size={14} />
//                                               Yes
//                                             </span>
//                                           ) : (
//                                             <span className="hp-achieved-no">
//                                               No
//                                             </span>
//                                           )}
//                                         </td>
//                                       </tr>
//                                     );
//                                   })}

//                                   <tr className="hp-total-row">
//                                     <td colSpan={4}>Totals</td>
//                                     <td>{money(referenceTotal)}</td>
//                                     <td>{money(verifiedIncomeTotal)}</td>
//                                     <td>Verified ledger only</td>
//                                     <td>{completed}/14</td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         );
//                       })
//                     ) : (
//                       <>
//                         <div className="hp-package-meta">
//                           <div className="hp-meta-item">
//                             <small>Package Amount</small>
//                             <strong>{money(packageAmount)}</strong>
//                           </div>

//                           <div className="hp-meta-item">
//                             <small>Package Status</small>
//                             <strong>Not Purchased</strong>
//                           </div>

//                           <div className="hp-meta-item">
//                             <small>Completed Stages</small>
//                             <strong>0 / 14</strong>
//                           </div>

//                           <div className="hp-meta-item">
//                             <small>Remaining Stages</small>
//                             <strong>14 / 14</strong>
//                           </div>
//                         </div>

//                         <div className="hp-table-scroll">
//                           <table className="hp-package-table">
//                             <thead>
//                               <tr>
//                                 <th>Stage</th>
//                                 <th>Duration / Days</th>
//                                 <th>Stage Status</th>
//                                 <th>Timer / Remaining Time</th>
//                                 <th>Reference Amount</th>
//                                 <th>Verified Income</th>
//                                 <th>Income Status</th>
//                                 <th>Achieved?</th>
//                               </tr>
//                             </thead>

//                             <tbody>
//                               {stageDurations.map((days, index) => (
//                                 <tr
//                                   key={`unbought-${packageAmount}-${index + 1}`}
//                                 >
//                                   <td>
//                                     <span className="hp-stage-name">
//                                       Stage {index + 1}
//                                     </span>
//                                   </td>

//                                   <td className="hp-duration-cell">
//                                     {days} {days === 1 ? "Day" : "Days"}
//                                   </td>

//                                   <td>
//                                     <span className="hp-status gray">
//                                       Locked
//                                     </span>
//                                   </td>

//                                   <td className="hp-timer-cell">
//                                     Not purchased
//                                   </td>

//                                   <td className="hp-reference-amount">
//                                     {money(
//                                       getReferenceAmount(
//                                         packageAmount,
//                                         index
//                                       )
//                                     )}
//                                   </td>

//                                   <td className="hp-reference-amount">{money(0)}</td>

//                                   <td><span className="hp-status gray">Not recorded</span></td>

//                                   <td>
//                                     <span className="hp-achieved-no">
//                                       No
//                                     </span>
//                                   </td>
//                                 </tr>
//                               ))}

//                               <tr className="hp-total-row">
//                                 <td colSpan={4}>Totals</td>
//                                 <td>
//                                   {money(
//                                     stageAmounts.reduce(
//                                       (sum, row) =>
//                                         sum +
//                                         Number(
//                                           row[
//                                             packages.indexOf(packageAmount)
//                                           ] || 0
//                                         ),
//                                       0
//                                     )
//                                   )}
//                                 </td>
//                                 <td>{money(0)}</td>
//                                 <td>Not recorded</td>
//                                 <td>0/14</td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                       </>
//                     )}
//                   </>
//                 )}
//               </section>
//             );
//           })}
//         </>
//       )}

//       <div className="hp-notice">
//         <AlertCircle size={15} />
//         <span>
//           Reference amounts are illustrative schedule figures only.
//           They are not actual received income, guaranteed returns,
//           or promises of payment. Actual transactions must be verified
//           separately in transaction history.
//         </span>
//       </div>

//       <div className="hp-plan-footer">
//         HELPING POOLS • PACKAGE PROGRESS TRACKER
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Package,
  Clock3,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CalendarDays
} from "lucide-react";

import api from "../../api/axios";

const packages = [30, 60, 120, 240, 480, 960];

const stageDurations = [
  1, 3, 7, 15,
  30, 30, 30, 30, 30, 30,
  30, 30, 30, 30
];

// Illustrative reference schedule only.
// These figures do not represent actual payments or guaranteed income.
const stageAmounts = [
  [5, 10, 20, 40, 80, 160],
  [5, 10, 20, 40, 80, 160],
  [10, 20, 40, 80, 160, 320],
  [20, 40, 80, 160, 320, 640],
  [30, 60, 120, 240, 480, 960],
  [30, 60, 120, 240, 480, 960],
  [50, 100, 200, 400, 800, 1600],
  [50, 100, 200, 400, 800, 1600],
  [100, 200, 400, 800, 1600, 3200],
  [200, 400, 800, 1600, 3200, 6400],
  [400, 800, 1600, 3200, 6400, 12800],
  [800, 1600, 3200, 6400, 12800, 25600],
  [1600, 3200, 6400, 12800, 25600, 51200],
  [3200, 6400, 12800, 25600, 51200, 102400]
];

const money = (value) =>
  "$" + Number(value || 0).toLocaleString("en-US");

const getReferenceAmount = (amount, stageIndex) => {
  const column = packages.indexOf(Number(amount));
  if (column < 0) return 0;

  return Number(stageAmounts[stageIndex]?.[column] || 0);
};

const getRemainingTime = (endsAt, now) => {
  if (!endsAt) return "Not started";

  const remaining = new Date(endsAt).getTime() - now;

  if (Number.isNaN(remaining)) return "Unavailable";
  if (remaining <= 0) return "Time completed";

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const statusClass = (status) => {
  const value = String(status || "").toUpperCase();

  if (["RUNNING", "ACTIVE", "ACHIEVED", "COMPLETED"].includes(value)) {
    return "green";
  }

  if (value === "PAUSED") return "orange";
  if (["WAITING", "PENDING"].includes(value)) return "blue";
  if (value === "CANCELLED") return "red";

  return "gray";
};

const statusLabel = (status) => {
  const labels = {
    RUNNING: "Running",
    ACTIVE: "Active",
    PAUSED: "Paused",
    WAITING: "Waiting",
    LOCKED: "Locked",
    ACHIEVED: "Achieved",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    PENDING: "Pending"
  };

  const value = String(status || "LOCKED").toUpperCase();
  return labels[value] || value;
};

const getPackageStages = (subscription) => {
  return Array.from({ length: 14 }, (_, index) => {
    const stageNumber = index + 1;

    const savedStage = subscription?.stages?.find(
      (item) => Number(item.stageNumber) === stageNumber
    );

    return {
      stageNumber,
      durationDays: Number(
        savedStage?.durationDays || stageDurations[index]
      ),
      status: String(savedStage?.status || "LOCKED").toUpperCase(),
      startedAt: savedStage?.startedAt || null,
      endsAt: savedStage?.endsAt || null,
      completedAt: savedStage?.completedAt || null
    };
  });
};

export default function Plan() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  // Each package has its own expand/collapse state.
  const [expandedPackages, setExpandedPackages] = useState({});

  const fetchProgress = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setRefreshing(true);

      const response = await api.get("/package-progress");

      if (!response.data?.success) {
        setError(
          response.data?.message || "Package progress could not be loaded."
        );
        return;
      }

      const list = Array.isArray(response.data.packages)
        ? response.data.packages
        : [];

      const sorted = [...list].sort((a, b) => {
        const amountDifference =
          Number(a.packageAmount) - Number(b.packageAmount);

        if (amountDifference !== 0) return amountDifference;

        return (
          Number(a.cycleNumber || 1) -
          Number(b.cycleNumber || 1)
        );
      });

      setSubscriptions(sorted);
      setError("");

      // Automatically expand packages containing an ACTIVE cycle.
      // Preserve the user's manual open/close choice after initial load.
      setExpandedPackages((previous) => {
        const next = { ...previous };

        packages.forEach((amount) => {
          const key = `package-${amount}`;

          const hasActiveCycle = sorted.some(
            (item) =>
              Number(item.packageAmount) === amount &&
              item.status === "ACTIVE"
          );

          if (next[key] === undefined) {
            next[key] = hasActiveCycle;
          } else if (
            hasActiveCycle &&
            !previous[key + "-manually-closed"]
          ) {
            next[key] = true;
          }
        });

        return next;
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load package progress. Please login again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();

    const refreshInterval = setInterval(() => {
      fetchProgress();
    }, 30000);

    const clockInterval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(clockInterval);
    };
  }, [fetchProgress]);

  const handleRefresh = () => {
    fetchProgress(true);
  };

  const togglePackage = (amount) => {
    const key = `package-${amount}`;

    setExpandedPackages((previous) => {
      const nextValue = !(previous[key] ?? false);

      return {
        ...previous,
        [key]: nextValue,
        [key + "-manually-closed"]: !nextValue
      };
    });
  };

  const totalCompletedStages = useMemo(() => {
    return subscriptions.reduce((total, subscription) => {
      const stages = getPackageStages(subscription);

      return (
        total +
        stages.filter((stage) => stage.status === "ACHIEVED").length
      );
    }, 0);
  }, [subscriptions]);

  const totalRemainingStages = useMemo(() => {
    return subscriptions.reduce((total, subscription) => {
      const stages = getPackageStages(subscription);

      return (
        total +
        stages.filter((stage) => stage.status !== "ACHIEVED").length
      );
    }, 0);
  }, [subscriptions]);

  return (
    <div className="hp-plan">
      <style>{`
        .hp-plan {
          --green: #08783f;
          --dark: #07552e;
          --gold: #e5b83f;
          --border: #d8e9d3;
          width: 100%;
          padding: 15px;
          color: #173522;
          background: #f5f9f1;
          border-radius: 16px;
          font-family: Inter, Arial, sans-serif;
          box-sizing: border-box;
        }

        .hp-plan * {
          box-sizing: border-box;
        }

        .hp-plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 17px 20px;
          margin-bottom: 15px;
          border: 2px solid var(--gold);
          border-radius: 15px;
          background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
        }

        .hp-plan-heading {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .hp-plan-heading-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          color: #f8d76f;
          background: #ffffff16;
          border-radius: 11px;
          flex-shrink: 0;
        }

        .hp-plan-header h2 {
          margin: 0;
          color: white;
          font-size: clamp(16px, 2.4vw, 23px);
          font-weight: 950;
        }

        .hp-plan-header h2 span {
          color: #ffe36c;
        }

        .hp-plan-header p {
          margin: 4px 0 0;
          color: #d5ebd9;
          font-size: 11px;
        }

        .hp-plan-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid #f5d36a;
          border-radius: 30px;
          color: #ffe47a;
          font-size: 10px;
          font-weight: 900;
          white-space: nowrap;
        }

        .hp-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }

        .hp-summary-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
          min-width: 0;
        }

        .hp-summary-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          color: var(--green);
          background: #eaf7e9;
          border-radius: 10px;
        }

        .hp-summary-label {
          color: #849389;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .hp-summary-value {
          margin-top: 4px;
          color: #16452b;
          font-size: 16px;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .hp-refresh-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 13px;
        }

        .hp-refresh-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 9px 13px;
          color: white;
          background: #08783f;
          border: 0;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
        }

        .hp-refresh-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .hp-package-card {
          margin-bottom: 16px;
          overflow: hidden;
          border: 1px solid #cbdcbe;
          border-radius: 13px;
          background: white;
          scroll-margin-top: 18px;
        }

        .hp-package-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 15px 17px;
          color: white;
          text-align: left;
          background: linear-gradient(110deg, #087b3e, #07572e);
          border: 0;
          cursor: pointer;
        }

        .hp-package-title {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .hp-package-title strong {
          font-size: 16px;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .hp-package-title small {
          color: #d8f0dc;
          font-size: 10px;
          font-weight: 700;
        }

        .hp-package-header-right {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
        }

        .hp-package-header-right svg {
          color: #ffe47a;
        }

        .hp-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 900;
          white-space: nowrap;
        }

        .hp-status.green {
          color: #08783f;
          background: #e4f7e9;
        }

        .hp-status.orange {
          color: #a65a08;
          background: #fff0d9;
        }

        .hp-status.blue {
          color: #1760a4;
          background: #e8f2ff;
        }

        .hp-status.red {
          color: #b42318;
          background: #ffebeb;
        }

        .hp-status.gray {
          color: #68756d;
          background: #edf0ed;
        }

        .hp-package-meta {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 9px;
          padding: 12px;
          background: #f8fcf6;
          border-bottom: 1px solid var(--border);
        }

        .hp-meta-item {
          min-width: 0;
          padding: 10px;
          border: 1px solid #e0ebdc;
          border-radius: 9px;
          background: white;
        }

        .hp-meta-item small {
          display: block;
          color: #829087;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .hp-meta-item strong {
          display: block;
          margin-top: 5px;
          color: #175a32;
          font-size: 12px;
          overflow-wrap: anywhere;
        }

        .hp-cycle-heading {
          padding: 12px 14px;
          color: #07552e;
          background: #eff8e9;
          border-bottom: 1px solid #d9e7d3;
          font-size: 13px;
          font-weight: 950;
        }

        .hp-table-scroll {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .hp-package-table {
          width: 100%;
          min-width: 850px;
          border-collapse: collapse;
          text-align: left;
        }

        .hp-package-table th {
          padding: 12px 10px;
          color: #175a32;
          background: #eaf5e5;
          border-bottom: 1px solid #d9e7d3;
          font-size: 11px;
          font-weight: 900;
          white-space: nowrap;
        }

        .hp-package-table td {
          padding: 12px 10px;
          color: #253c2c;
          border-bottom: 1px solid #d9e7d3;
          font-size: 11px;
          font-weight: 700;
          vertical-align: middle;
        }

        .hp-package-table tbody tr:nth-child(even) td {
          background: #f4faef;
        }

        .hp-package-table tbody tr.current-stage td {
          background: #fff8df;
        }

        .hp-stage-name {
          color: #175a32;
          font-weight: 950;
          white-space: nowrap;
        }

        .hp-duration-cell {
          color: #805c0b !important;
          background: #fff4d6 !important;
          font-weight: 900 !important;
          white-space: nowrap;
        }

        .hp-reference-amount {
          color: #08783f !important;
          font-size: 12px !important;
          font-weight: 950 !important;
          white-space: nowrap;
        }

        .hp-achieved-yes {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #08783f;
          font-weight: 900;
          white-space: nowrap;
        }

        .hp-achieved-no {
          color: #879188;
          font-weight: 800;
          white-space: nowrap;
        }

        .hp-timer-cell {
          min-width: 150px;
          color: #175a32;
          font-weight: 800;
          white-space: nowrap;
        }

        .hp-total-row td {
          color: #07552e !important;
          background: #e5f5dc !important;
          font-size: 12px !important;
          font-weight: 950 !important;
          border-top: 2px solid #a9c99b;
        }

        .hp-empty {
          padding: 22px;
          color: #68756d;
          text-align: center;
          background: #f8fcf6;
          border-radius: 10px;
          font-size: 13px;
        }

        .hp-plan-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          margin-bottom: 12px;
          color: #a52b25;
          background: #fff0ef;
          border: 1px solid #f3c6c3;
          border-radius: 10px;
          font-size: 12px;
        }

        .hp-notice {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 11px 13px;
          border: 1px solid #eadba6;
          border-radius: 10px;
          color: #725c20;
          background: #fff9e8;
          font-size: 11px;
          line-height: 1.6;
        }

        .hp-plan-footer {
          margin-top: 12px;
          text-align: center;
          color: #849389;
          font-size: 9px;
          font-weight: 700;
        }

        @media (max-width: 760px) {
          .hp-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hp-package-meta {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .hp-plan {
            padding: 9px;
          }

          .hp-plan-header {
            padding: 13px 11px;
          }

          .hp-plan-tag {
            padding: 6px 8px;
            font-size: 9px;
          }

          .hp-summary {
            gap: 6px;
          }

          .hp-summary-card {
            padding: 9px;
            gap: 7px;
          }

          .hp-summary-icon {
            width: 30px;
            height: 30px;
          }

          .hp-summary-value {
            font-size: 13px;
          }

          .hp-package-card-header {
            padding: 13px 11px;
          }

          .hp-package-title strong {
            font-size: 14px;
          }

          .hp-package-header-right {
            gap: 5px;
          }

          .hp-package-meta {
            gap: 6px;
            padding: 8px;
          }

          .hp-meta-item {
            padding: 8px;
          }

          .hp-package-table {
            min-width: 850px;
          }
        }

        @media (max-width: 350px) {
          .hp-plan-tag {
            display: none;
          }

          .hp-plan-header h2 {
            font-size: 15px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="hp-plan-header">
        <div className="hp-plan-heading">
          <div className="hp-plan-heading-icon">
            <Package size={23} />
          </div>

          <div>
            <h2>
              PACKAGE <span>PROGRESS</span>
            </h2>
            <p>Helping Pools • Package Activity Tracker</p>
          </div>
        </div>

        <div className="hp-plan-tag">
          <Sparkles size={12} />
          LIVE STATUS
        </div>
      </div>

      {/* Overall summary */}
      {/* <div className="hp-summary">
        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <Package size={18} />
          </div>

          <div>
            <div className="hp-summary-label">Purchased Cycles</div>
            <div className="hp-summary-value">
              {subscriptions.length}
            </div>
          </div>
        </div>

        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <div className="hp-summary-label">Completed Stages</div>
            <div className="hp-summary-value">
              {totalCompletedStages}
            </div>
          </div>
        </div>

        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <div className="hp-summary-label">Remaining Stages</div>
            <div className="hp-summary-value">
              {totalRemainingStages}
            </div>
          </div>
        </div>
      </div> */}

      {/* Refresh */}
      <div className="hp-refresh-row">
        <button
          className="hp-refresh-button"
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={14} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="hp-plan-error">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="hp-empty">
          Loading package progress...
        </div>
      ) : (
        <>
          {/* All six packages */}
          {packages.map((packageAmount) => {
            const packageSubs = subscriptions
              .filter(
                (item) =>
                  Number(item.packageAmount) === packageAmount
              )
              .sort(
                (a, b) =>
                  Number(a.cycleNumber || 1) -
                  Number(b.cycleNumber || 1)
              );

            const packageKey = `package-${packageAmount}`;

            const hasActiveCycle = packageSubs.some(
              (item) => item.status === "ACTIVE"
            );

            const isExpanded =
              expandedPackages[packageKey] ?? hasActiveCycle;

            const totalCompleted = packageSubs.reduce(
              (sum, subscription) =>
                sum +
                getPackageStages(subscription).filter(
                  (stage) => stage.status === "ACHIEVED"
                ).length,
              0
            );

            const totalRemaining = packageSubs.length
              ? packageSubs.length * 14 - totalCompleted
              : 14;

            return (
              <section
                className="hp-package-card"
                id={`package-card-${packageAmount}`}
                key={packageAmount}
              >
                <button
                  className="hp-package-card-header"
                  type="button"
                  onClick={() => togglePackage(packageAmount)}
                  aria-expanded={isExpanded}
                >
                  <span className="hp-package-title">
                    <strong>
                      {money(packageAmount)} Package
                    </strong>

                    <small>
                      {packageSubs.length
                        ? `${packageSubs.length} Cycle(s) • ${totalCompleted} Completed • ${totalRemaining} Remaining`
                        : "Not Purchased • 14 Stages"}
                    </small>
                  </span>

                  <span className="hp-package-header-right">
                    <span
                      className={`hp-status ${
                        hasActiveCycle
                          ? "green"
                          : packageSubs.length
                          ? "blue"
                          : "gray"
                      }`}
                    >
                      {hasActiveCycle
                        ? "Active"
                        : packageSubs.length
                        ? "Purchased"
                        : "Not Purchased"}
                    </span>

                    {isExpanded
                      ? <ChevronUp size={20} />
                      : <ChevronDown size={20} />}
                  </span>
                </button>

                {isExpanded && (
                  <>
                    {packageSubs.length ? (
                      packageSubs.map((subscription) => {
                        const id = String(
                          subscription.id ||
                          subscription._id ||
                          `${packageAmount}-${subscription.cycleNumber || 1}`
                        );

                        const stages = getPackageStages(subscription);

                        const completed = stages.filter(
                          (stage) => stage.status === "ACHIEVED"
                        ).length;

                        const remaining = 14 - completed;

                        const currentStageNumber = Number(
                          subscription.currentStage || 1
                        );

                        const currentStage = stages.find(
                          (stage) =>
                            stage.stageNumber === currentStageNumber
                        );

                        const referenceTotal = stages.reduce(
                          (sum, stage, index) =>
                            sum + getReferenceAmount(packageAmount, index),
                          0
                        );

                        return (
                          <div key={id}>
                            <div className="hp-cycle-heading">
                              {money(packageAmount)} Package — Cycle{" "}
                              {subscription.cycleNumber || 1}
                              {" • "}
                              {statusLabel(subscription.status)}
                            </div>

                            <div className="hp-package-meta">
                              <div className="hp-meta-item">
                                <small>Package Amount</small>
                                <strong>{money(packageAmount)}</strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Completed Stages</small>
                                <strong>{completed} / 14</strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Remaining Stages</small>
                                <strong>{remaining} / 14</strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Current Stage</small>
                                <strong>
                                  {subscription.status === "COMPLETED"
                                    ? "All completed"
                                    : `Stage ${currentStageNumber} / 14`}
                                </strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Current Stage Status</small>
                                <strong>
                                  {statusLabel(
                                    currentStage?.status || "LOCKED"
                                  )}
                                </strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Timer Remaining</small>
                                <strong>
                                  {currentStage?.status === "RUNNING"
                                    ? getRemainingTime(
                                        currentStage.endsAt,
                                        now
                                      )
                                    : currentStage?.status === "PAUSED"
                                    ? "Timer paused"
                                    : currentStage?.status === "ACHIEVED"
                                    ? "Stage completed"
                                    : "Not running"}
                                </strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Purchased At</small>
                                <strong>
                                  {subscription.purchasedAt
                                    ? new Date(
                                        subscription.purchasedAt
                                      ).toLocaleString()
                                    : "Not available"}
                                </strong>
                              </div>

                              <div className="hp-meta-item">
                                <small>Cycle Status</small>
                                <strong>
                                  {statusLabel(subscription.status)}
                                </strong>
                              </div>
                            </div>

                            <div className="hp-table-scroll">
                              <table className="hp-package-table">
                                <thead>
                                  <tr>
                                    <th>Stage</th>
                                    <th>Duration / Days</th>
                                    <th>Stage Status</th>
                                    <th>Timer / Remaining Time</th>
                                    <th>Reference Amount</th>
                                    <th>Achieved?</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {stages.map((stage, index) => {
                                    const achieved =
                                      stage.status === "ACHIEVED";

                                    const isCurrent =
                                      subscription.status === "ACTIVE" &&
                                      stage.stageNumber ===
                                        currentStageNumber;

                                    let timer = "Locked";

                                    if (stage.status === "RUNNING") {
                                      timer = getRemainingTime(
                                        stage.endsAt,
                                        now
                                      );
                                    } else if (
                                      stage.status === "PAUSED"
                                    ) {
                                      timer = "Timer paused";
                                    } else if (
                                      stage.status === "ACHIEVED"
                                    ) {
                                      timer = "Completed";
                                    } else if (
                                      stage.status === "WAITING"
                                    ) {
                                      timer = "Waiting";
                                    }

                                    return (
                                      <tr
                                        key={`${id}-stage-${stage.stageNumber}`}
                                        className={
                                          isCurrent ? "current-stage" : ""
                                        }
                                      >
                                        <td>
                                          <span className="hp-stage-name">
                                            Stage {stage.stageNumber}
                                          </span>
                                        </td>

                                        <td className="hp-duration-cell">
                                          <CalendarDays
                                            size={12}
                                            style={{
                                              display: "inline",
                                              marginRight: 5,
                                              verticalAlign: "middle"
                                            }}
                                          />
                                          {stage.durationDays}{" "}
                                          {stage.durationDays === 1
                                            ? "Day"
                                            : "Days"}
                                        </td>

                                        <td>
                                          <span
                                            className={`hp-status ${statusClass(
                                              stage.status
                                            )}`}
                                          >
                                            {statusLabel(stage.status)}
                                          </span>
                                        </td>

                                        <td className="hp-timer-cell">
                                          <Clock3
                                            size={12}
                                            style={{
                                              display: "inline",
                                              marginRight: 5,
                                              verticalAlign: "middle"
                                            }}
                                          />
                                          {timer}
                                        </td>

                                        <td className="hp-reference-amount">
                                          {money(
                                            getReferenceAmount(
                                              packageAmount,
                                              index
                                            )
                                          )}
                                        </td>

                                        <td>
                                          {achieved ? (
                                            <span className="hp-achieved-yes">
                                              <CheckCircle2 size={14} />
                                              Yes
                                            </span>
                                          ) : (
                                            <span className="hp-achieved-no">
                                              No
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}

                                  <tr className="hp-total-row">
                                    <td colSpan={4}>Totals</td>
                                    <td>{money(referenceTotal)}</td>
                                    <td>{completed}/14</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="hp-package-meta">
                          <div className="hp-meta-item">
                            <small>Package Amount</small>
                            <strong>{money(packageAmount)}</strong>
                          </div>

                          <div className="hp-meta-item">
                            <small>Package Status</small>
                            <strong>Not Purchased</strong>
                          </div>

                          <div className="hp-meta-item">
                            <small>Completed Stages</small>
                            <strong>0 / 14</strong>
                          </div>

                          <div className="hp-meta-item">
                            <small>Remaining Stages</small>
                            <strong>14 / 14</strong>
                          </div>
                        </div>

                        <div className="hp-table-scroll">
                          <table className="hp-package-table">
                            <thead>
                              <tr>
                                <th>Stage</th>
                                <th>Duration / Days</th>
                                <th>Stage Status</th>
                                <th>Timer / Remaining Time</th>
                                <th>Reference Amount</th>
                                <th>Achieved?</th>
                              </tr>
                            </thead>

                            <tbody>
                              {stageDurations.map((days, index) => (
                                <tr
                                  key={`unbought-${packageAmount}-${index + 1}`}
                                >
                                  <td>
                                    <span className="hp-stage-name">
                                      Stage {index + 1}
                                    </span>
                                  </td>

                                  <td className="hp-duration-cell">
                                    {days} {days === 1 ? "Day" : "Days"}
                                  </td>

                                  <td>
                                    <span className="hp-status gray">
                                      Locked
                                    </span>
                                  </td>

                                  <td className="hp-timer-cell">
                                    Not purchased
                                  </td>

                                  <td className="hp-reference-amount">
                                    {money(
                                      getReferenceAmount(
                                        packageAmount,
                                        index
                                      )
                                    )}
                                  </td>

                                  <td>
                                    <span className="hp-achieved-no">
                                      No
                                    </span>
                                  </td>
                                </tr>
                              ))}

                              <tr className="hp-total-row">
                                <td colSpan={4}>Totals</td>
                                <td>
                                  {money(
                                    stageAmounts.reduce(
                                      (sum, row) =>
                                        sum +
                                        Number(
                                          row[
                                            packages.indexOf(packageAmount)
                                          ] || 0
                                        ),
                                      0
                                    )
                                  )}
                                </td>
                                <td>0/14</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </>
                )}
              </section>
            );
          })}
        </>
      )}

      <div className="hp-notice">
        <AlertCircle size={15} />
        <span>
          Reference amounts are illustrative schedule figures only.
          They are not actual received income, guaranteed returns,
          or promises of payment. Actual transactions must be verified
          separately in transaction history.
        </span>
      </div>

      <div className="hp-plan-footer">
        HELPING POOLS • PACKAGE PROGRESS TRACKER...
      </div>
    </div>
  );
}