// // // // import React, { useState, useEffect } from "react";

// // // // const TotalSystemUsers = ({ user, totalRealUsersFromDB = 0, globalFakeCount = 0 }) => {
// // // //   const [totalSystemUsers, setTotalSystemUsers] = useState(0);
// // // //   const [displayGlobalTeam, setDisplayGlobalTeam] = useState(0);

// // // //   const isUserActive = user?.isToppedUp === true || user?.isToppedUp === "true" || (user?.topUpAmount && user?.topUpAmount > 0);

// // // //   useEffect(() => {
// // // //     const BASE_TOTAL_USERS = 100; 
// // // //     const finalTotal = BASE_TOTAL_USERS + totalRealUsersFromDB + globalFakeCount;
// // // //     setTotalSystemUsers(finalTotal);
// // // //     setDisplayGlobalTeam(user?.globalTeamCount || 0);
// // // //   }, [user?.globalTeamCount, totalRealUsersFromDB, globalFakeCount]);

// // // //   return (
// // // //     <div className="w-full mb-4">
// // // //       <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mb-4">
        
// // // //         {/* BOX 1: TOTAL COMMUNITY */}
// // // //         <div className="bg-white p-5 md:p-6 rounded-[20px] border border-emerald-50 shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px]">
// // // //           <p className="text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
// // // //             Total Community
// // // //           </p>
// // // //           <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-emerald-600 tracking-tight leading-none">
// // // //             {totalSystemUsers.toLocaleString()}
// // // //           </h2>
// // // //         </div>

// // // //         {/* BOX 2: MY COMMUNITY */}
// // // //         <div className={`bg-white p-5 md:p-6 rounded-[20px] border shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px] ${isUserActive ? 'border-emerald-50' : 'border-red-50'}`}>
// // // //           <p className="text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
// // // //             My Community
// // // //           </p>
// // // //           <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-emerald-600 tracking-tight leading-none">
// // // //             {displayGlobalTeam.toLocaleString()}
// // // //           </h2>
// // // //         </div>
// // // //       </div>

     
      
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TotalSystemUsers;


// // // import React, { useState, useEffect } from "react";

// // // // 🔥 activeDownlineCount prop add kiya hai
// // // const TotalSystemUsers = ({ user, totalRealUsersFromDB = 0, globalFakeCount = 0, activeDownlineCount = 0 }) => {
// // //   const [totalSystemUsers, setTotalSystemUsers] = useState(0);
// // //   const [displayGlobalTeam, setDisplayGlobalTeam] = useState(0);

// // //   const isUserActive = user?.isToppedUp === true || user?.isToppedUp === "true" || (user?.topUpAmount && user?.topUpAmount > 0);
  
// // //   // 🔥 Backend se aane wala data yahan map hoga (Prop se ya User object se)
// // //   const displayActiveDownline = activeDownlineCount || user?.activeDownlineCount || 0;

// // //   useEffect(() => {
// // //     const BASE_TOTAL_USERS = 587; 
// // //     const finalTotal = BASE_TOTAL_USERS + totalRealUsersFromDB + globalFakeCount;
// // //     setTotalSystemUsers(finalTotal);
// // //     setDisplayGlobalTeam(user?.globalTeamCount || 0);
// // //   }, [user?.globalTeamCount, totalRealUsersFromDB, globalFakeCount]);

// // //   return (
// // //     <div className="w-full mb-4">
// // //       {/* 🔥 md:grid-cols-3 kiya taaki 3 boxes perfect fit hon Desktop pe */}
// // //       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full mb-4">
        
// // //         {/* BOX 1: TOTAL COMMUNITY */}
// // //         <div className="bg-white p-5 md:p-6 rounded-[20px] border border-emerald-50 shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px]">
// // //           <p className="text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
// // //             Total Community
// // //           </p>
// // //           <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-emerald-600 tracking-tight leading-none">
// // //             {totalSystemUsers.toLocaleString()}
// // //           </h2>
// // //         </div>

// // //         {/* BOX 2: MY COMMUNITY */}
// // //         <div className={`bg-white p-5 md:p-6 rounded-[20px] border shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px] ${isUserActive ? 'border-emerald-50' : 'border-red-50'}`}>
// // //           <p className="text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
// // //             My Community
// // //           </p>
// // //           <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-emerald-600 tracking-tight leading-none">
// // //             {displayGlobalTeam.toLocaleString()}
// // //           </h2>
// // //         </div>

// // //         {/* BOX 3: MY DOWNLINE ACTIVE (🔥 NAYA BOX) */}
// // //         {/* Mobile me full width (col-span-2) aur Desktop me 1 column lega */}
// // //         <div className={`bg-white p-5 md:p-6 rounded-[20px] border shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px] ${isUserActive ? 'border-emerald-50' : 'border-red-50'} col-span-2 md:col-span-1`}>
// // //           <p className="text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
// // //             My Downline Active
// // //           </p>
// // //           <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-blue-600 tracking-tight leading-none">
// // //             {displayActiveDownline.toLocaleString()}
// // //           </h2>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TotalSystemUsers;


// // import React, { useEffect, useMemo, useState } from "react";

// // const formatCount = (value) =>
// //   Math.max(0, Number(value) || 0).toLocaleString("en-IN");

// // const StatCard = ({ title, count, subtitle, color = "emerald", icon }) => {
// //   const colors = {
// //     emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
// //     blue: "text-blue-600 bg-blue-50 border-blue-100",
// //     amber: "text-amber-600 bg-amber-50 border-amber-100",
// //     violet: "text-violet-600 bg-violet-50 border-violet-100",
// //     slate: "text-slate-700 bg-slate-50 border-slate-200",
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 min-h-[135px] flex flex-col justify-between">
// //       <div className="flex items-center justify-between gap-2">
// //         <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
// //           {title}
// //         </p>
// //         <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[color]}`}>
// //           {icon}
// //         </span>
// //       </div>

// //       <div>
// //         <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${colors[color].split(" ")[0]}`}>
// //           {formatCount(count)}
// //         </h2>
// //         <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // const TotalSystemUsers = ({
// //   user,
// //   totalRealUsersFromDB = 0,
// //   globalFakeCount = 0,
// //   demoUsersCount,
// //   activeDownlineCount = 0,
// // }) => {
// //   const [displayGlobalTeam, setDisplayGlobalTeam] = useState(0);

// //   // Actual database users
// //   const realUsers = Math.max(0, Number(totalRealUsersFromDB) || 0);

// //   // Demo count comes separately from backend
// //   const demoUsers = Math.max(
// //     0,
// //     Number(demoUsersCount ?? globalFakeCount) || 0
// //   );

// //   // Combined display count
// //   const totalSystemUsers = useMemo(
// //     () => realUsers + demoUsers,
// //     [realUsers, demoUsers]
// //   );

// //   const displayActiveDownline = Math.max(
// //     0,
// //     Number(activeDownlineCount || user?.activeDownlineCount) || 0
// //   );

// //   useEffect(() => {
// //     setDisplayGlobalTeam(
// //       Math.max(0, Number(user?.globalTeamCount) || 0)
// //     );
// //   }, [user?.globalTeamCount]);

// //   const isUserActive =
// //     user?.isToppedUp === true ||
// //     user?.isToppedUp === "true" ||
// //     Number(user?.topUpAmount) > 0;

// //   return (
// //     <div className="w-full mb-5">

// //       {/* HEADER */}
// //       <div className="flex items-center justify-between mb-4">
// //         <div>
// //           <h2 className="text-lg md:text-xl font-black text-slate-800">
// //             Community Overview
// //           </h2>
// //           <p className="text-xs text-slate-500 mt-1">
// //             Real and demo member statistics
// //           </p>
// //         </div>

// //         <span className="text-xs font-semibold px-3 py-2 rounded-full bg-emerald-50 text-emerald-700">
// //           Community Stats
// //         </span>
// //       </div>

// //       {/* TOTAL COMMUNITY */}
// //       <div className="rounded-3xl p-5 md:p-7 mb-4 bg-gradient-to-r from-emerald-700 to-teal-600 shadow-lg">
// //         <div className="flex items-center justify-between gap-3">
// //           <div>
// //             <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">
// //               Total Community
// //             </p>

// //             <h1 className="text-white text-4xl md:text-5xl font-black mt-2">
// //               {formatCount(totalSystemUsers)}
// //             </h1>

// //             <p className="text-white/75 text-xs mt-2">
// //               Real Members + Demo Members
// //             </p>
// //           </div>

// //           <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">
// //             👥
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-2 gap-3 mt-6">
// //           <div className="bg-white/10 rounded-xl p-3">
// //             <p className="text-white/70 text-xs font-semibold">
// //               Real Members
// //             </p>
// //             <p className="text-white text-2xl font-black mt-1">
// //               {formatCount(realUsers)}
// //             </p>
// //           </div>

// //           <div className="bg-white/10 rounded-xl p-3">
// //             <p className="text-white/70 text-xs font-semibold">
// //               Demo Members
// //             </p>
// //             <p className="text-white text-2xl font-black mt-1">
// //               {formatCount(demoUsers)}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* MEMBER STATISTICS */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">

// //         <StatCard
// //           title="Real Users"
// //           count={realUsers}
// //           subtitle="Registered database users"
// //           color="emerald"
// //           icon="✓"
// //         />

// //         <StatCard
// //           title="Demo Users"
// //           count={demoUsers}
// //           subtitle="Separate demo counter"
// //           color="amber"
// //           icon="◉"
// //         />

// //         <StatCard
// //           title="My Community"
// //           count={displayGlobalTeam}
// //           subtitle="Your global team"
// //           color="blue"
// //           icon="👥"
// //         />

// //         <StatCard
// //           title="Active Downline"
// //           count={displayActiveDownline}
// //           subtitle="Your active downline"
// //           color="violet"
// //           icon="↗"
// //         />

// //       </div>

// //       {/* COUNT BREAKDOWN */}
// //       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
// //         <h3 className="font-bold text-slate-800 mb-4">
// //           Member Count Breakdown
// //         </h3>

// //         <div className="space-y-4">

// //           <div>
// //             <div className="flex justify-between text-sm mb-2">
// //               <span className="font-semibold text-emerald-700">
// //                 Real Members
// //               </span>
// //               <span className="font-bold text-slate-700">
// //                 {formatCount(realUsers)}
// //               </span>
// //             </div>
// //             <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
// //               <div
// //                 className="h-full bg-emerald-500 rounded-full"
// //                 style={{
// //                   width: `${totalSystemUsers
// //                     ? (realUsers / totalSystemUsers) * 100
// //                     : 0}%`,
// //                 }}
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <div className="flex justify-between text-sm mb-2">
// //               <span className="font-semibold text-amber-700">
// //                 Demo Members
// //               </span>
// //               <span className="font-bold text-slate-700">
// //                 {formatCount(demoUsers)}
// //               </span>
// //             </div>
// //             <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
// //               <div
// //                 className="h-full bg-amber-400 rounded-full"
// //                 style={{
// //                   width: `${totalSystemUsers
// //                     ? (demoUsers / totalSystemUsers) * 100
// //                     : 0}%`,
// //                 }}
// //               />
// //             </div>
// //           </div>

// //         </div>

// //         <div className="border-t border-slate-100 mt-5 pt-4 flex justify-between items-center">
// //           <span className="text-sm font-bold text-slate-600">
// //             Combined Total
// //           </span>
// //           <span className="text-xl font-black text-emerald-600">
// //             {formatCount(totalSystemUsers)}
// //           </span>
// //         </div>
// //       </div>

// //       {/* USER STATUS */}
// //       <div className={`mt-4 rounded-xl p-3 text-xs font-medium ${
// //         isUserActive
// //           ? "bg-emerald-50 text-emerald-700"
// //           : "bg-red-50 text-red-600"
// //       }`}>
// //         Account Status: {isUserActive ? "Active" : "Not Active"}
// //       </div>

// //       <p className="text-[11px] text-slate-400 mt-3 text-center">
// //         Demo members are displayed separately and are not registered accounts.
// //       </p>

// //     </div>
// //   );
// // };

// // export default TotalSystemUsers;



// import React, { useMemo } from "react";

// const formatCount = (value) =>
//   Math.max(0, Number(value) || 0).toLocaleString("en-IN");

// const TotalSystemUsers = ({
//   totalRealUsersFromDB = 0,
//   globalFakeCount = 0,
//   demoUsersCount,
// }) => {
//   const realUsers = Math.max(
//     0,
//     Number(totalRealUsersFromDB) || 0
//   );

//   const demoUsers = Math.max(
//     0,
//     Number(demoUsersCount ?? globalFakeCount) || 0
//   );

//   // Current real + demo users
//   const totalSystemUsers = useMemo(
//     () => realUsers + demoUsers,
//     [realUsers, demoUsers]
//   );

//   // Add fixed 500 to the current total
//   const displayCount = 500 + totalSystemUsers;

//   return (
//     <div className="w-full mb-5">
//       <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-emerald-700 to-teal-600 shadow-lg">
//         <div className="flex items-center justify-between gap-3">
//           <div>
//             <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">
//               TOTAL COMMUNITY
//             </p>

//             <h1 className="text-white text-5xl md:text-6xl font-black mt-3">
//               {formatCount(displayCount)}
//             </h1>
//           </div>

//           <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl shrink-0">
//             👥
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalSystemUsers;



import React from "react";

const formatCount = (value) =>
  Math.max(0, Number(value) || 0).toLocaleString("en-IN");

const TotalSystemUsers = ({
  totalRealUsersFromDB = 0,
  globalFakeCount = 0,
  demoUsersCount,
}) => {
  const realUsers = Math.max(
    0,
    Number(totalRealUsersFromDB) || 0
  );

  const demoUsers = Math.max(
    0,
    Number(demoUsersCount ?? globalFakeCount) || 0
  );

  // Real users + demo users + fixed starting offset
  const displayCount = 89 + realUsers + demoUsers;

  return (
    <div className="w-full mb-5">
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-emerald-700 to-teal-600 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">
              TOTAL COMMUNITY
            </p>

            <h1 className="text-white text-5xl md:text-6xl font-black mt-3">
              {formatCount(displayCount)}
            </h1>
 
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl shrink-0">
            👥
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSystemUsers;
