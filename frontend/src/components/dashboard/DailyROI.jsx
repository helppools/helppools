// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { CheckCircle, Lock, Users, UserPlus, Globe2, AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";

// // ✅ Clean & Simple Theme
// const customStyles = `
//   .bg-grid-light {
//     background-color: transparent;
//     background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
//                       linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
//     background-size: 30px 30px;
//   }
//   .glass-table-wrapper {
//     background: rgba(255, 255, 255, 0.95);
//     backdrop-filter: blur(12px);
//   }
//   .glass-row {
//     transition: all 0.3s ease;
//   }
//   .glass-row:hover {
//     background: rgba(248, 250, 252, 1); /* Very light hover */
//   }
//   /* ✅ Achieved/Filled Pool Row Custom Green Style */
//   .achieved-row {
//     background-color: #ecfdf5 !important; /* Tailwind emerald-50 */
//     border-left: 4px solid #10b981 !important; /* Emerald 500 border */
//   }
//   .achieved-row:hover {
//     background-color: #d1fae5 !important; /* Tailwind emerald-100 on hover */
//   }
// `;

// // ✅ Complete $12,200 Global Pool Plan
// const globalPoolConfig = {
//   totalTarget: 12200,
//   levels: [
//     { level: 1,  globalTeam: 20,    requiredDirects: 1,  displayDirects: 1, daily: 1,  days: 10,  earning: 10   }, 
//     { level: 2,  globalTeam: 40,    requiredDirects: 2,  displayDirects: 1, daily: 1,  days: 20,  earning: 20   }, 
//     { level: 3,  globalTeam: 100,   requiredDirects: 3,  displayDirects: 1, daily: 1,  days: 40,  earning: 40   }, 
//     { level: 4,  globalTeam: 200,   requiredDirects: 4,  displayDirects: 1, daily: 1,  days: 80,  earning: 80   }, 
//     { level: 5,  globalTeam: 400,   requiredDirects: 5,  displayDirects: 1, daily: 1,  days: 150, earning: 150  }, 
//     { level: 6,  globalTeam: 1600,  requiredDirects: 6,  displayDirects: 1, daily: 1,  days: 200, earning: 200  }, 
//     { level: 7,  globalTeam: 2000,  requiredDirects: 8,  displayDirects: 2, daily: 2,  days: 250, earning: 500  }, 
//     { level: 8,  globalTeam: 3000,  requiredDirects: 10, displayDirects: 2, daily: 2,  days: 350, earning: 700  }, 
//     { level: 9,  globalTeam: 4000,  requiredDirects: 12, displayDirects: 2, daily: 2,  days: 500, earning: 1000 }, 
//     { level: 10, globalTeam: 5000,  requiredDirects: 14, displayDirects: 2, daily: 3,  days: 500, earning: 1500 }, 
//     { level: 11, globalTeam: 7500,  requiredDirects: 16, displayDirects: 2, daily: 6,  days: 500, earning: 3000 }, 
//     { level: 12, globalTeam: 10000, requiredDirects: 18, displayDirects: 2, daily: 10, days: 500, earning: 5000 }  
//   ]
// };

// export default function Plan() {
//   const { user } = useAuth();
//   const [activeData, setActiveData] = useState(null);
  
//   // ✅ State for Dropdown Open/Close
//   const [showGrowthInfo, setShowGrowthInfo] = useState(false);

//   // 🔥 My Community from Backend
//   const userGlobalTeam = user?.globalTeamCount || 0; 
//   const userDirects = user?.directCount || 0;
//   const isToppedUp = user?.isToppedUp || false;

//   // ---------------- PROCESS DATA ----------------
//   useEffect(() => {
//     let cumulativeGlobalTeam = 0; 

//     const processedLevels = globalPoolConfig.levels.map((staticLvl) => {
//       const previousCumulative = cumulativeGlobalTeam; 
//       cumulativeGlobalTeam += staticLvl.globalTeam; 
      
//       let status = "TEAM_PENDING"; 
//       const isTeamReady = userGlobalTeam >= cumulativeGlobalTeam;
//       const isDirectReady = userDirects >= staticLvl.requiredDirects;

//       if (isTeamReady && isDirectReady) {
//         status = "ACHIEVED";
//       } else if (isTeamReady && !isDirectReady) {
//         status = "DIRECT_PENDING"; 
//       } else {
//         status = "TEAM_PENDING"; 
//       }

//       let currentLevelProgress = 0;
//       if (userGlobalTeam >= cumulativeGlobalTeam) {
//         currentLevelProgress = staticLvl.globalTeam; 
//       } else if (userGlobalTeam > previousCumulative) {
//         currentLevelProgress = userGlobalTeam - previousCumulative; 
//       }

//       return { 
//         ...staticLvl, 
//         status, 
//         currentLevelProgress, 
//         cumulativeGlobalTeam 
//       };
//     });

//     setActiveData({ ...globalPoolConfig, levels: processedLevels });
//   }, [userGlobalTeam, userDirects]);

//   // ---------------- UI ----------------
//   return (
//     <div className="bg-white w-full py-4 md:py-8 text-slate-900 relative overflow-hidden font-sans border border-slate-200 rounded-2xl md:rounded-3xl mt-2 md:mt-4 shadow-sm">
//       <style>{customStyles}</style>
//       <div className="absolute inset-0 bg-grid-light pointer-events-none"></div>

//       <div className="relative z-10 w-full px-2 sm:px-4 md:px-6">
        
//         {/* 🛑 INACTIVE USER WARNING */}
//         {!isToppedUp && (
//            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-pulse shadow-sm">
//               <AlertTriangle className="text-red-500 shrink-0 w-6 h-6 md:w-8 md:h-8" />
//               <p className="text-red-600 text-[10px] md:text-sm font-bold">
//                  Your ID is inactive. Top-up with <span className="text-red-800 font-black">$30</span> to start building your My Community and unlock Community Incomes!
//               </p>
//            </div>
//         )}


//         {/* ✅ USER METRICS */}
//         <div className="flex flex-row gap-2 md:gap-4 mb-4 md:mb-6">
//            <div className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
//               <div>
//                 <p className="text-black text-[9px] md:text-xs font-bold uppercase tracking-widest mb-0.5"> My Community</p>
//                 <h3 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
//                   {userGlobalTeam.toLocaleString()}
//                   {isToppedUp && (
//                      <span className="flex h-2 w-2 relative -mt-3">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
//                      </span>
//                   )}
//                 </h3>
//               </div>
//               <div className="p-2 md:p-3 bg-green-100 rounded-lg md:rounded-xl border border-green-200 hidden sm:block">
//                 <Globe2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
//               </div>
//            </div>

//            <div className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
//               <div>
//                 <p className="text-black text-[9px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Direct Referrals</p>
//                 <h3 className="text-xl md:text-3xl font-black text-slate-900">
//                   {userDirects}
//                 </h3>
//               </div>
//               <div className="p-2 md:p-3 bg-blue-50 rounded-lg md:rounded-xl border border-blue-100 hidden sm:block">
//                 <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
//               </div>
//            </div>
//         </div>


//           {/* 🔥 UPDATED SECTION: How Community Withdrawal Works 🔥 */}
//           <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
              
//               {/* Clickable Header */}
//               <button
//                 onClick={() => setShowGrowthInfo(!showGrowthInfo)}
//                 className="w-full flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
//               >
//                 <div className="flex items-center gap-2">
//                   <Info size={18} className="text-blue-600" />
//                   <span className="font-black text-slate-800 uppercase tracking-widest text-sm md:text-base">
//                     How Community Withdrawal Works
//                   </span>
//                 </div>
//                 <div className="text-slate-500">
//                   {showGrowthInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </div>
//               </button>

//               {/* Expandable Content */}
//               {showGrowthInfo && (
//                 <div className="p-5 md:p-6 border-t border-slate-200 animate-in slide-in-from-top-2 duration-300 bg-white">
                  
//                   {/* Community Withdrawal Table */}
//                   <div className="mt-0">
//                     <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">
//                       Community Withdrawal Distribution
//                     </h4>

//                     <div className="overflow-x-auto rounded-lg border border-slate-200">
//                       <table className="min-w-full text-sm md:text-base">
//                         <thead className="bg-slate-100">
//                           <tr>
//                             <th className="px-4 py-3 text-left font-bold text-slate-700">Team Size</th>
//                             <th className="px-4 py-3 text-center font-bold text-slate-700">Withdrawal</th>
//                             <th className="px-4 py-3 text-center font-bold text-slate-700">Wallet</th>
//                             <th className="px-4 py-3 text-center font-bold text-slate-700">
//                               Community Net Withdrawal
//                             </th>
//                             {/* 🔥 NAYA COLUMN ADD KIYA */}
//                             <th className="px-4 py-3 text-center font-bold text-slate-700">
//                               Community Net Wallet
//                             </th>
//                           </tr>
//                         </thead>

//                         <tbody className="divide-y divide-slate-200 bg-white">
//                           <tr>
//                             <td className="px-4 py-3 font-semibold">0</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">20%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">80%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$2,440</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$9,760</td>
//                           </tr>

//                           <tr>
//                             <td className="px-4 py-3 font-semibold">+30</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">30%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">70%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$3,660</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$8,540</td>
//                           </tr>

//                           <tr>
//                             <td className="px-4 py-3 font-semibold">+50</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">40%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">60%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$4,880</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$7,320</td>
//                           </tr>

//                           <tr>
//                             <td className="px-4 py-3 font-semibold">+100</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">50%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">50%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$6,100</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$6,100</td>
//                           </tr>

//                           <tr>
//                             <td className="px-4 py-3 font-semibold">+300</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">60%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">40%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$7,320</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$4,880</td>
//                           </tr>

//                           <tr>
//                             <td className="px-4 py-3 font-semibold">+500</td>
//                             <td className="px-4 py-3 text-center text-green-600 font-bold">80%</td>
//                             <td className="px-4 py-3 text-center text-blue-600 font-bold">20%</td>
//                             <td className="px-4 py-3 text-center font-semibold text-green-600">$9,760</td>
//                             <td className="px-4 py-3 text-center font-semibold text-blue-600">$2,440</td>
//                           </tr>

//                           <tr className="bg-green-50">
//                             <td className="px-4 py-3 font-bold">+1000</td>
//                             <td className="px-4 py-3 text-center text-green-700 font-extrabold">100%</td>
//                             <td className="px-4 py-3 text-center text-red-600 font-extrabold">0%</td>
//                             <td className="px-4 py-3 text-center font-extrabold text-green-700">
//                               $12,200
//                             </td>
//                             <td className="px-4 py-3 text-center font-extrabold text-slate-400">
//                               $0
//                             </td>
//                           </tr>
//                         </tbody>
                        
//                         {/* 🔥 NAYA HIGHLIGHTED FOOTER ADD KIYA */}
                      
                        
//                       </table>
//                     </div>

//                     <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
//                       <p className="text-sm md:text-base text-slate-700">
//                         <strong>Note:</strong> As your Team Size increases, a larger percentage of
//                         your Community Income becomes available for direct withdrawal, while the
//                         Wallet allocation decreases. At <strong>1000+ Team Members</strong>, you
//                         can withdraw <strong>100%</strong> of your Community Income.
//                       </p>
//                     </div>
//                   </div>

//                 </div>
//               )}

              
//             </div>
            

//         {activeData && (
//           <div className="w-full">
            
//             {/* ✅ TABLE START */}
//             <div className="glass-table-wrapper border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
//               <div className="overflow-x-auto w-full custom-scroll">
//                 <table className="w-full text-[10px] md:text-sm text-left whitespace-nowrap">
                  
//                   {/* COLUMNS HEADER */}
//                   <thead className="text-slate-600 text-[9px] md:text-xs uppercase tracking-widest border-b border-slate-200 bg-slate-50">
//                     <tr>
//                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Lvl</th>
//                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Community Team</th>
//                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Directs</th>
//                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Total Earning</th>
//                       <th className="py-3 px-2 md:py-4 md:px-4 font-black text-center">Status</th>
//                     </tr>
//                   </thead>

//                   {/* ROWS */}
//                   <tbody>
//                     {activeData.levels.map((lvl) => {
//                       const isAchieved = lvl.status === "ACHIEVED";
//                       const isPoolFilled = lvl.status === "ACHIEVED" || lvl.status === "DIRECT_PENDING";

//                       return (
//                         <tr 
//                           key={lvl.level} 
//                           className={`border-b border-slate-100 glass-row ${isPoolFilled ? 'achieved-row' : 'bg-white'}`}
//                         >
                          
//                           {/* LEVEL NO */}
//                           <td className="py-2.5 px-2 md:py-3 md:px-4">
//                             <div className={`w-6 h-6 md:w-8 md:h-8 mx-auto rounded-full flex items-center justify-center text-[10px] md:text-sm font-black transition-colors ${
//                               isPoolFilled 
//                               ? 'bg-emerald-500 text-white shadow-sm' 
//                               : 'bg-slate-100 border border-slate-200 text-slate-600'
//                             }`}>
//                               {lvl.level}
//                             </div>
//                           </td>

//                           {/* GLOBAL TEAM */}
//                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
//                             <div className="flex flex-col items-center justify-center gap-0.5">
//                               <div className="flex items-center gap-1.5">
//                                 <Users size={14} className={isPoolFilled ? "text-emerald-600" : "text-slate-400"} />
//                                 <span className={`font-black text-xs md:text-sm ${isPoolFilled ? 'text-emerald-800' : 'text-slate-800'}`}>
//                                   {lvl.globalTeam.toLocaleString()}
//                                 </span>
//                               </div>
//                               {lvl.status === "TEAM_PENDING" && (
//                                 <div className="text-[9px] md:text-[10px] text-slate-500 font-mono font-bold mt-0.5 bg-slate-50 border border-slate-100 px-1.5 rounded">
//                                   ({lvl.currentLevelProgress} / {lvl.globalTeam})
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* REQUIRED DIRECTS COLUMN */}
//                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
//                             <span className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border text-[9px] md:text-xs font-black inline-block ${
//                               isAchieved 
//                               ? 'bg-emerald-100/50 border-emerald-200 text-emerald-700' 
//                               : 'bg-slate-50 border-slate-200 text-slate-600'
//                             }`}>
//                               {lvl.displayDirects || (lvl.level <= 6 ? 1 : 2)} {(lvl.displayDirects || (lvl.level <= 6 ? 1 : 2)) > 1 ? 'Directs' : 'Direct'}
//                             </span>
//                           </td>

//                           {/* TOTAL EARNING */}
//                           <td className={`py-2.5 px-2 md:py-3 md:px-4 font-black text-center text-sm md:text-lg ${isPoolFilled ? 'text-emerald-600' : 'text-slate-700'}`}>
//                             ${lvl.earning.toLocaleString()}
//                           </td>

//                           {/* STATUS */}
//                           <td className="py-2.5 px-2 md:py-3 md:px-4 text-center">
//                             {lvl.status === "ACHIEVED" && (
//                               <div className="inline-flex items-center justify-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
//                                 <CheckCircle size={12} strokeWidth={3} /> Done
//                               </div>
//                             )}
//                             {lvl.status === "DIRECT_PENDING" && (
//                               <div className="inline-flex items-center justify-center gap-1 text-amber-700 bg-amber-100 px-2.5 py-1 rounded border border-amber-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
//                                 <UserPlus size={12} strokeWidth={3} /> Direct Req
//                               </div>
//                             )}
//                             {lvl.status === "TEAM_PENDING" && (
//                               <div className="inline-flex items-center justify-center gap-1 text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-black text-[9px] md:text-[11px] uppercase tracking-wide">
//                                 <Lock size={12} strokeWidth={3} /> {lvl.currentLevelProgress === 0 ? "Locked" : "Wait"}
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>

//                   {/* ✅ TOTAL FOOTER */}
//                   <tfoot className="bg-slate-50 border-t border-slate-200">
//                     <tr>
//                       <td colSpan="3" className="py-4 px-4 text-right font-black uppercase tracking-widest text-[11px] md:text-xs text-slate-600">
//                         Total Potential Income
//                       </td>
//                       <td colSpan="2" className="py-4 px-4 text-left font-black text-xl md:text-2xl text-slate-800">
//                         ${activeData.totalTarget.toLocaleString()}
//                       </td>
//                     </tr>
//                   </tfoot>

//                 </table>
//               </div>
//             </div>

          

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

 



import React, { useState } from "react";
import {
  Package,
  CalendarDays,
  TrendingUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const packages = [
  { amount: 30, total: 6600 },
  { amount: 60, total: 13200 },
  { amount: 120, total: 26400 },
  { amount: 240, total: 52800 },
  { amount: 480, total: 105600 },
  { amount: 960, total: 211200 },
];

const planRows = [
  { day: "1 Day", values: [5, 10, 20, 40, 80, 160] },
  { day: "+3 Days", values: [5, 10, 20, 40, 80, 160] },
  { day: "+7 Days", values: [10, 20, 40, 80, 160, 320] },
  { day: "+15 Days", values: [20, 40, 80, 160, 320, 640] },
  { day: "+30 Days", values: [30, 60, 120, 240, 480, 960] },
  { day: "+30 Days", values: [30, 60, 120, 240, 480, 960] },
  { day: "+30 Days", values: [50, 100, 200, 400, 800, 1600] },
  { day: "+30 Days", values: [50, 100, 200, 400, 800, 1600] },
  { day: "+30 Days", values: [100, 200, 200, 800, 1600, 3200] },
  { day: "+30 Days", values: [200, 400, 800, 1600, 3200, 6400] },
  { day: "+30 Days", values: [400, 800, 1600, 3200, 6400, 12800] },
  { day: "+30 Days", values: [800, 1600, 3200, 6400, 12800, 25600] },
  { day: "+30 Days", values: [1600, 3200, 6400, 12800, 25600, 51200] },
  { day: "+30 Days", values: [3200, 6400, 12800, 25600, 51200, 102400] },
];

const money = (value) =>
  "$" + Number(value).toLocaleString("en-US");

export default function Plan() {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="hp-plan">
      <style>{`
        .hp-plan {
          --green: #08783f;
          --dark: #07552e;
          --gold: #e5b83f;
          --light: #edfae9;
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
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 17px 20px;
          margin-bottom: 15px;
          border: 2px solid var(--gold);
          border-radius: 15px;
          background: linear-gradient(110deg, #064a28, #087c3c, #064a28);
          box-shadow: 0 4px 12px #07552e20;
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
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          color: #f8d76f;
          background: #ffffff16;
          border: 1px solid #ffffff30;
          border-radius: 11px;
        }

        .hp-plan-header h2 {
          margin: 0;
          color: white;
          font-size: clamp(15px, 2.4vw, 22px);
          font-weight: 950;
          letter-spacing: .5px;
        }

        .hp-plan-header h2 span {
          color: #ffe36c;
        }

        .hp-plan-header p {
          margin: 4px 0 0;
          color: #d5ebd9;
          font-size: 10px;
          font-weight: 600;
        }

        .hp-plan-tag {
          flex-shrink: 0;
          padding: 7px 11px;
          border: 1px solid #f5d36a;
          border-radius: 30px;
          color: #ffe47a;
          background: #ffffff10;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .hp-plan-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }

        .hp-summary-card {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
        }

        .hp-summary-icon {
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          border-radius: 10px;
          color: var(--green);
          background: #eaf7e9;
        }

        .hp-summary-label {
          color: #849389;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .6px;
        }

        .hp-summary-value {
          margin-top: 3px;
          color: #16452b;
          font-size: 16px;
          font-weight: 950;
        }

        .hp-table-card {
          overflow: hidden;
          border: 1px solid #cbdcbe;
          border-radius: 13px;
          background: white;
          box-shadow: 0 4px 15px #174d2510;
        }

        .hp-table-scroll {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #9cbd91 #edf5e9;
        }

        .hp-package-table {
          width: 100%;
          min-width: 740px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: center;
          font-size: 12px;
        }

        .hp-package-table th {
          padding: 12px 9px;
          color: white;
          background: linear-gradient(180deg, #087b3e, #07572e);
          border-right: 1px solid #ffffff30;
          font-weight: 900;
        }

        .hp-package-table th:first-child {
          min-width: 115px;
          text-align: left;
          padding-left: 16px;
        }

        .hp-package-table th:last-child {
          border-right: none;
        }

        .hp-package-table .package-price {
          display: block;
          color: #ffe56d;
          font-size: 19px;
          font-weight: 950;
        }

        .hp-package-table .package-label {
          display: block;
          margin-top: 2px;
          color: #eaf7e9;
          font-size: 10px;
        }

        .hp-package-table td {
          padding: 8px 9px;
          color: #253c2c;
          border-right: 1px solid #d9e7d3;
          border-bottom: 1px solid #d9e7d3;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .hp-package-table td:first-child {
          padding-left: 16px;
          text-align: left;
          color: #175a32;
          font-weight: 900;
        }

        .hp-package-table tr:nth-child(even) td {
          background: #eff9e9;
        }

        .hp-package-table tr:nth-child(odd) td {
          background: #ffffff;
        }

        .hp-package-table tr:hover td {
          background: #e0f2d8;
        }

        .hp-package-table tfoot td {
          padding: 13px 9px;
          color: #123f25;
          background: linear-gradient(90deg, #f5dc76, #ffeaa1) !important;
          border-bottom: none;
          font-size: 16px;
          font-weight: 950;
        }

        .hp-package-table tfoot td:first-child {
          color: white;
          background: #08743b !important;
        }

        .hp-package-table tfoot td:not(:first-child) {
          font-size: clamp(12px, 1.5vw, 18px);
        }

        .hp-mobile-packages {
          display: none;
        }

        .hp-package-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          margin-bottom: 12px;
        }

        .hp-package-button {
          padding: 10px 5px;
          border: 1px solid #d7e7d0;
          border-radius: 10px;
          background: white;
          color: #31543b;
          font-weight: 900;
          cursor: pointer;
          transition: .2s;
        }

        .hp-package-button strong {
          display: block;
          color: inherit;
          font-size: 15px;
        }

        .hp-package-button span {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          font-weight: 700;
        }

        .hp-package-button.active {
          color: white;
          border-color: #08783f;
          background: linear-gradient(135deg, #08783f, #07552e);
          box-shadow: 0 3px 9px #08783f25;
        }

        .hp-mobile-table {
          overflow: hidden;
          border: 1px solid #d7e7d0;
          border-radius: 12px;
          background: white;
        }

        .hp-mobile-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 10px 13px;
          border-bottom: 1px solid #e7f0e3;
          font-size: 12px;
        }

        .hp-mobile-row:nth-child(even) {
          background: #eff9e9;
        }

        .hp-mobile-row:last-child {
          border-bottom: 0;
        }

        .hp-mobile-day {
          color: #47634c;
          font-weight: 800;
        }

        .hp-mobile-earning {
          color: #08783f;
          font-size: 13px;
          font-weight: 950;
        }

        .hp-mobile-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          color: #173e26;
          background: linear-gradient(90deg, #f4d76c, #ffeaa2);
          font-size: 13px;
          font-weight: 950;
        }

        .hp-plan-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 11px 13px;
          border: 1px solid #eadba6;
          border-radius: 10px;
          color: #725c20;
          background: #fff9e8;
          font-size: 10px;
          line-height: 1.6;
        }

        .hp-plan-note svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #b38a20;
        }

        .hp-plan-footer {
          margin-top: 12px;
          text-align: center;
          color: #849389;
          font-size: 9px;
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .hp-plan {
            padding: 10px;
            border-radius: 12px;
          }

          .hp-plan-header {
            padding: 13px 12px;
          }

          .hp-plan-heading-icon {
            width: 33px;
            height: 33px;
          }

          .hp-plan-header p {
            font-size: 9px;
          }

          .hp-plan-tag {
            padding: 6px 7px;
            font-size: 8px;
          }

          .hp-plan-summary {
            gap: 6px;
          }

          .hp-summary-card {
            display: block;
            padding: 9px;
          }

          .hp-summary-icon {
            width: 29px;
            height: 29px;
            margin-bottom: 7px;
          }

          .hp-summary-label {
            font-size: 8px;
          }

          .hp-summary-value {
            font-size: 14px;
          }

          .hp-table-scroll {
            display: none;
          }

          .hp-mobile-packages {
            display: block;
          }
        }

        @media (max-width: 360px) {
          .hp-plan-header h2 {
            font-size: 14px;
          }

          .hp-plan-tag {
            display: none;
          }

          .hp-package-button strong {
            font-size: 13px;
          }

          .hp-mobile-row {
            padding: 9px 10px;
            font-size: 11px;
          }
        }
      `}</style>

      <div className="hp-plan-header">
        <div className="hp-plan-heading">
          <div className="hp-plan-heading-icon">
            <Package size={22} />
          </div>

          <div>
            <h2>
              ALL <span>PACKAGE PLAN</span>
            </h2>
            <p>Helping Pools • Package Earning Schedule</p>
          </div>
        </div>

        <div className="hp-plan-tag">
          <Sparkles size={12} style={{ display: "inline", marginRight: 4 }} />
          NEW PLAN
        </div>
      </div>

      {/* Summary */}
      <div className="hp-plan-summary">
        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <Package size={18} />
          </div>
          <div>
            <div className="hp-summary-label">Packages</div>
            <div className="hp-summary-value">6</div>
          </div>
        </div>

        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <CalendarDays size={18} />
          </div>
          <div>
            <div className="hp-summary-label">Stages</div>
            <div className="hp-summary-value">14</div>
          </div>
        </div>

        <div className="hp-summary-card">
          <div className="hp-summary-icon">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="hp-summary-label">Max Package</div>
            <div className="hp-summary-value">$960</div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hp-table-card">
        <div className="hp-table-scroll">
          <table className="hp-package-table">
            <thead>
              <tr>
                <th>Days</th>
                {packages.map((pkg) => (
                  <th key={pkg.amount}>
                    <span className="package-price">
                      {money(pkg.amount)}
                    </span>
                    <span className="package-label">Package</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {planRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.day}</td>
                  {row.values.map((value, i) => (
                    <td key={i}>{money(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td>Total Earning</td>
                {packages.map((pkg) => (
                  <td key={pkg.amount}>{money(pkg.total)}</td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Package Cards */}
        <div className="hp-mobile-packages">
          <div className="hp-package-selector">
            {packages.map((pkg, index) => (
              <button
                type="button"
                key={pkg.amount}
                onClick={() => setSelectedPackage(index)}
                className={`hp-package-button ${
                  selectedPackage === index ? "active" : ""
                }`}
              >
                <strong>{money(pkg.amount)}</strong>
                <span>PACKAGE</span>
              </button>
            ))}
          </div>

          <div className="hp-mobile-table">
            {planRows.map((row, index) => (
              <div className="hp-mobile-row" key={index}>
                <span className="hp-mobile-day">{row.day}</span>
                <span className="hp-mobile-earning">
                  {money(row.values[selectedPackage])}
                </span>
              </div>
            ))}

            <div className="hp-mobile-total">
              <span>Total Earning</span>
              <span>{money(packages[selectedPackage].total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="hp-plan-note">
        <Sparkles size={15} />
        <span>
          Package-wise earning schedule and total figures are displayed
          according to the supplied Helping Pools plan chart.
        </span>
      </div>

      <div className="hp-plan-footer">
        HELPING POOLS • ALL PACKAGE TABLE
      </div>
    </div>
  );
}
