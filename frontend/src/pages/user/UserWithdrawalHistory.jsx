// // // import React, { useEffect, useState } from "react";
// // // import api from "../../api/axios";
// // // import {
// // //   Search,
// // //   Banknote,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Wallet,
// // //   Bitcoin,
// // // } from "lucide-react";

// // // function UserWithdrawalHistory() {
// // //   const [withdrawals, setWithdrawals] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState("");
// // //   const [statusFilter, setStatusFilter] = useState("all");
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   const itemsPerPage = 10;

// // //   const user = JSON.parse(localStorage.getItem("user"));
// // //   const userId = Number(user?.userId);
  
// // //   // 🔥 Check if user is a Leader
// // //   const isLeader = user?.role?.toLowerCase() === "leader";

// // //   useEffect(() => {
// // //     const fetchWithdrawals = async () => {
// // //       try {
// // //         setLoading(true);

// // //         const res = await api.get(
// // //           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`
// // //         );

// // //         setWithdrawals(res.data.withdrawals || []);
// // //       } catch (error) {
// // //         console.error("Error fetching withdrawal history:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (userId) fetchWithdrawals();
// // //     else setLoading(false);
// // //   }, [userId]);

// // //   // 🔥 GROUP & ADJUST ENTRIES
// // //   const groupWithdrawals = (list) => {
// // //     const sorted = [...list].sort(
// // //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
// // //     );

// // //     const groups = [];
// // //     const THRESHOLD_MS = 5000;

// // //     for (const item of sorted) {
// // //       const itemTime = new Date(item.createdAt).getTime();
// // //       const lastGroup = groups[groups.length - 1];

// // //       if (
// // //         lastGroup &&
// // //         itemTime -
// // //           new Date(
// // //             lastGroup.entries[lastGroup.entries.length - 1].createdAt
// // //           ).getTime() <=
// // //           THRESHOLD_MS
// // //       ) {
// // //         lastGroup.entries.push(item);

// // //         lastGroup.rawGross += Number(item.grossAmount || 0) * 2;
// // //         lastGroup.rawFee += Number(item.fee || 0) * 2;
// // //         lastGroup.rawCryptoNet += Number(item.netAmount || 0);
// // //         lastGroup.rawTopupNet += Number(item.netAmount || 0);

// // //         if (item.status?.toLowerCase() === "pending")
// // //           lastGroup.status = "pending";
// // //         else if (
// // //           item.status?.toLowerCase() === "rejected" &&
// // //           lastGroup.status !== "pending"
// // //         )
// // //           lastGroup.status = "rejected";
// // //       } else {
// // //         groups.push({
// // //           _id: item._id,
// // //           createdAt: item.createdAt,
// // //           entries: [item],
// // //           rawGross: Number(item.grossAmount || 0) * 2,
// // //           rawFee: Number(item.fee || 0) * 2,
// // //           rawCryptoNet: Number(item.netAmount || 0),
// // //           rawTopupNet: Number(item.netAmount || 0),
// // //           walletAddress: item.walletAddress,
// // //           status: item.status || "pending",
// // //         });
// // //       }
// // //     }

// // //     // 🔥 LEADER ADJUSTMENT LOGIC (Format into multiples of 10)
// // //     groups.forEach(g => {
// // //         if (isLeader) {
// // //             // Agar Leader hai, toh raw amount ko 10 ke multiple mein round down kar do (e.g. 105 -> 100)
// // //             const roundedGross = Math.floor(g.rawGross / 10) * 10;
            
// // //             g.totalGross = roundedGross;
// // //             g.totalFee = roundedGross * 0.10; // 10% Fee
// // //             g.totalCryptoNet = roundedGross * 0.45; // 45% USDT
// // //             g.totalTopupNet = roundedGross * 0.45; // 45% TopUp
// // //         } else {
// // //             // Normal user ke liye as it is rakho
// // //             g.totalGross = g.rawGross;
// // //             g.totalFee = g.rawFee;
// // //             g.totalCryptoNet = g.rawCryptoNet;
// // //             g.totalTopupNet = g.rawTopupNet;
// // //         }
// // //     });

// // //     return groups;
// // //   };

// // //   const grouped = groupWithdrawals(withdrawals);

// // //   // 🔥 Total Amount widget ko ab is adjusted (grouped) list se lenge taaki dono match karein
// // //   const totalAmount = grouped.reduce((sum, g) => sum + g.totalGross, 0);

// // //   const filtered = grouped.filter((g) => {
// // //     const searchLower = search.toLowerCase();

// // //     const matchSearch =
// // //       g.status?.toLowerCase().includes(searchLower) ||
// // //       g.totalGross.toString().includes(searchLower) ||
// // //       new Date(g.createdAt)
// // //         .toLocaleDateString("en-GB")
// // //         .includes(searchLower) ||
// // //       (g.walletAddress?.toLowerCase() || "").includes(searchLower);

// // //     const matchStatus =
// // //       statusFilter === "all" ||
// // //       g.status?.toLowerCase() === statusFilter.toLowerCase();

// // //     return matchSearch && matchStatus;
// // //   });

// // //   const sortedFiltered = [...filtered].sort(
// // //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// // //   );

// // //   const totalPages =
// // //     Math.ceil(sortedFiltered.length / itemsPerPage) || 1;

// // //   const startIdx = (currentPage - 1) * itemsPerPage;

// // //   const paginated = sortedFiltered.slice(
// // //     startIdx,
// // //     startIdx + itemsPerPage
// // //   );

// // //   useEffect(() => {
// // //     setCurrentPage(1);
// // //   }, [search, statusFilter]);

// // //   const getStatusDetails = (group) => {
// // //     const s = group.status?.toLowerCase();

// // //     if (s === "approved" || s === "success") {
// // //       return {
// // //         label: group.status,
// // //         color:
// // //           "bg-green-100 text-green-700 border border-green-300",
// // //       };
// // //     }

// // //     if (s === "pending") {
// // //       return {
// // //         label: group.status,
// // //         color:
// // //           "bg-slate-100 text-slate-700 border border-slate-300",
// // //       };
// // //     }

// // //     if (s === "rejected" || s === "failed") {
// // //       return {
// // //         label: group.status,
// // //         color:
// // //           "bg-slate-100 text-slate-700 border border-slate-300",
// // //       };
// // //     }

// // //     return {
// // //       label: group.status || "UNKNOWN",
// // //       color:
// // //         "bg-slate-100 text-slate-700 border border-slate-300",
// // //     };
// // //   };

// // //   return (
// // //     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">

// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           height: 6px;
// // //           width: 6px;
// // //         }

// // //         .custom-scroll::-webkit-scrollbar-track {
// // //           background: #f1f5f9;
// // //         }

// // //         .custom-scroll::-webkit-scrollbar-thumb {
// // //           background: #cbd5e1;
// // //           border-radius: 10px;
// // //         }
// // //       `}</style>

// // //       {/* HEADER */}
// // //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// // //         <div>
// // //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 uppercase tracking-wide flex items-center gap-3">
// // //             <Banknote className="text-slate-700" size={28} />
// // //             Withdrawal History
// // //           </h2>

// // //           <p className="text-slate-500 text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// // //             Track all your fund withdrawals
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* STATS */}
// // //       <div className="mb-8">
// // //         <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-5 md:p-6 relative overflow-hidden flex flex-col justify-center max-w-sm">

// // //           <h3 className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2">
// // //             <Wallet size={14} className="text-slate-700" />
// // //             Total Withdrawn
// // //           </h3>

// // //           <p className="text-3xl md:text-4xl font-black text-slate-800">
// // //             ${totalAmount.toFixed(2)}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* FILTERS */}
// // //       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">

// // //         <div className="relative w-full sm:w-80 group">
// // //           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// // //             <Search
// // //               size={16}
// // //               className="text-slate-400"
// // //             />
// // //           </div>

// // //           <input
// // //             type="text"
// // //             placeholder="Search amount, wallet..."
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //             className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-slate-400 focus:outline-none transition-all placeholder-slate-400"
// // //           />
// // //         </div>

// // //         <div className="flex items-center gap-3 w-full sm:w-auto">
// // //           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
// // //             Filter:
// // //           </span>

// // //           <select
// // //             value={statusFilter}
// // //             onChange={(e) => setStatusFilter(e.target.value)}
// // //             className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:border-slate-400 focus:outline-none transition-all appearance-none cursor-pointer capitalize"
// // //           >
// // //             <option value="all">All Statuses</option>
// // //             <option value="pending">Pending</option>
// // //             <option value="approved">Approved</option>
// // //             <option value="rejected">Rejected</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {/* TABLE */}
// // //       <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden relative">

// // //         <div className="overflow-x-auto custom-scroll w-full relative z-10">
// // //           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">

// // //             <thead className="bg-slate-50 text-slate-700 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
// // //               <tr>
// // //                 <th className="p-4 font-black text-center">Sr.</th>
// // //                 <th className="p-4 font-black">Date</th>
// // //                 <th className="p-4 font-black">Total</th>
// // //                 <th className="p-4 font-black">Fee</th>
// // //                 <th className="p-4 font-black">
// // //                   <div className="flex items-center gap-1">
// // //                       USDT 
// // //                   </div>
// // //                 </th>

// // //                 <th className="p-4 font-black">
// // //                   <div className="flex items-center gap-1">
// // //                       TopUp Wallet
// // //                   </div>
// // //                 </th>

// // //                 <th className="p-4 font-black">Wallet Address</th>
// // //                 <th className="p-4 font-black text-center">Status</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody className="text-slate-700">

// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="8" className="text-center py-10">
// // //                     <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
// // //                       Loading History...
// // //                     </span>
// // //                   </td>
// // //                 </tr>
// // //               ) : paginated.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="8" className="text-center py-10">
// // //                     <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">
// // //                       No Withdrawal Records Found
// // //                     </span>
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 paginated.map((group, idx) => {
// // //                   const statusInfo = getStatusDetails(group);

// // //                   return (
// // //                     <tr
// // //                       key={group._id}
// // //                       className="border-b border-slate-100 bg-white hover:bg-slate-50/50"
// // //                     >
// // //                       <td className="p-4 font-bold text-slate-500 text-center">
// // //                         {startIdx + idx + 1}
// // //                       </td>

// // //                       <td className="p-4 text-slate-500 font-mono text-xs">
// // //                         {new Date(group.createdAt).toLocaleDateString(
// // //                           "en-GB"
// // //                         )}
// // //                       </td>

// // //                       <td className="p-4 font-bold text-slate-900">
// // //                         ${group.totalGross.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 font-bold text-slate-700">
// // //                         -${group.totalFee.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 font-black text-slate-700">
// // //                         ${group.totalCryptoNet.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 font-black text-slate-700">
// // //                         ${group.totalTopupNet.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 text-slate-700 font-mono text-[10px] sm:text-xs">
// // //                         {group.walletAddress ? (
// // //                           <span className="px-2 py-1 rounded border border-slate-200 bg-slate-50">
// // //                             {group.walletAddress}
// // //                           </span>
// // //                         ) : (
// // //                           "N/A"
// // //                         )}
// // //                       </td>

// // //                       <td className="p-4 text-center">
// // //                         <span
// // //                           className={`px-2.5 py-1 text-[9px] md:text-[10px] font-black tracking-widest rounded-md uppercase ${statusInfo.color}`}
// // //                         >
// // //                           {statusInfo.label}
// // //                         </span>
// // //                       </td>

// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* PAGINATION */}
// // //         {!loading && sortedFiltered.length > 0 && (
// // //           <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">

// // //             <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
// // //               Showing {startIdx + 1} to{" "}
// // //               {Math.min(
// // //                 startIdx + itemsPerPage,
// // //                 sortedFiltered.length
// // //               )}{" "}
// // //               of {sortedFiltered.length} Entries
// // //             </span>

// // //             <div className="flex items-center gap-2">

// // //               <button
// // //                 onClick={() =>
// // //                   setCurrentPage((p) => Math.max(p - 1, 1))
// // //                 }
// // //                 disabled={currentPage === 1}
// // //                 className={`p-2 rounded-lg flex items-center justify-center transition-all ${
// // //                   currentPage === 1
// // //                     ? "bg-slate-100 text-slate-400 cursor-not-allowed"
// // //                     : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
// // //                 }`}
// // //               >
// // //                 <ChevronLeft size={18} />
// // //               </button>

// // //               <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg">
// // //                 {currentPage} / {totalPages}
// // //               </span>

// // //               <button
// // //                 onClick={() =>
// // //                   setCurrentPage((p) =>
// // //                     Math.min(p + 1, totalPages)
// // //                   )
// // //                 }
// // //                 disabled={currentPage === totalPages}
// // //                 className={`p-2 rounded-lg flex items-center justify-center transition-all ${
// // //                   currentPage === totalPages
// // //                     ? "bg-slate-100 text-slate-400 cursor-not-allowed"
// // //                     : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
// // //                 }`}
// // //               >
// // //                 <ChevronRight size={18} />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default UserWithdrawalHistory;






// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import {
// //   Search,
// //   Banknote,
// //   ChevronLeft,
// //   ChevronRight,
// //   Wallet,
// // } from "lucide-react";

// // function UserWithdrawalHistory() {
// //   const [withdrawals, setWithdrawals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const itemsPerPage = 10;

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const userId = Number(user?.userId);
  
// //   // 🔥 Check if user is a Leader
// //   const isLeader = user?.role?.toLowerCase() === "leader";

// //   useEffect(() => {
// //     const fetchWithdrawals = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await api.get(
// //           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`
// //         );
// //         setWithdrawals(res.data.withdrawals || []);
// //       } catch (error) {
// //         console.error("Error fetching withdrawal history:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (userId) fetchWithdrawals();
// //     else setLoading(false);
// //   }, [userId]);

// //   // 🔥 GROUP & ADJUST ENTRIES (WITH TIME-BASED LOGIC)
// //   const groupWithdrawals = (list) => {
// //     const sorted = [...list].sort(
// //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
// //     );

// //     const groups = [];
// //     const THRESHOLD_MS = 5000;
    
// //     // 🔥 CUTOFF TIME: 13 July 2026, 4:00 PM IST
// //     const CUTOFF_TIME = new Date("2026-07-13T16:00:00+05:30").getTime();

// //     for (const item of sorted) {
// //       const itemTime = new Date(item.createdAt).getTime();
// //       const lastGroup = groups[groups.length - 1];

// //       // 👉 TIME CHECK: Purana (before 4 PM) ya Naya (after 4 PM)
// //       const isNewLogic = itemTime >= CUTOFF_TIME;

// //       // 👉 AMOUNT CALCULATION LOGIC
// //       // Purane me 2x hota tha, naye me 1x (exactly wahi jo database me hai)
// //       const iGross = isNewLogic ? Number(item.grossAmount || 0) : Number(item.grossAmount || 0) * 2;
// //       const iFee = isNewLogic ? Number(item.fee || 0) : Number(item.fee || 0) * 2;
// //       const iCryptoNet = Number(item.netAmount || 0); // USDT portion
      
// //       // TopUp calculation: Naye backend ke hisaab se TopUp = Gross - Fee - USDT
// //       // Purane me TopUp aur CryptoNet barabar (netAmount) dikhate the
// //       const iTopupNet = isNewLogic ? (iGross - iFee - iCryptoNet) : Number(item.netAmount || 0);

// //       if (
// //         lastGroup &&
// //         itemTime -
// //           new Date(
// //             lastGroup.entries[lastGroup.entries.length - 1].createdAt
// //           ).getTime() <=
// //           THRESHOLD_MS
// //       ) {
// //         lastGroup.entries.push(item);

// //         lastGroup.rawGross += iGross;
// //         lastGroup.rawFee += iFee;
// //         lastGroup.rawCryptoNet += iCryptoNet;
// //         lastGroup.rawTopupNet += iTopupNet;

// //         if (item.status?.toLowerCase() === "pending")
// //           lastGroup.status = "pending";
// //         else if (
// //           item.status?.toLowerCase() === "rejected" &&
// //           lastGroup.status !== "pending"
// //         )
// //           lastGroup.status = "rejected";
// //       } else {
// //         groups.push({
// //           _id: item._id,
// //           createdAt: item.createdAt,
// //           entries: [item],
// //           rawGross: iGross,
// //           rawFee: iFee,
// //           rawCryptoNet: iCryptoNet,
// //           rawTopupNet: iTopupNet,
// //           walletAddress: item.walletAddress,
// //           status: item.status || "pending",
// //           isNewLogic: isNewLogic // Tracking for Leader override
// //         });
// //       }
// //     }

// //     // 🔥 LEADER ADJUSTMENT LOGIC (Sirf Purane records pe lagu hoga)
// //     groups.forEach(g => {
// //         if (isLeader && !g.isNewLogic) {
// //             // Agar Leader hai aur entry PURANI hai (Before 4 PM)
// //             const roundedGross = Math.floor(g.rawGross / 10) * 10;
// //             g.totalGross = roundedGross;
// //             g.totalFee = roundedGross * 0.10; 
// //             g.totalCryptoNet = roundedGross * 0.45; 
// //             g.totalTopupNet = roundedGross * 0.45; 
// //         } else {
// //             // Normal user YA Naya logic (After 4 PM) -> Exact backend values!
// //             g.totalGross = g.rawGross;
// //             g.totalFee = g.rawFee;
// //             g.totalCryptoNet = g.rawCryptoNet;
// //             g.totalTopupNet = g.rawTopupNet;
// //         }
// //     });

// //     return groups;
// //   };

// //   const grouped = groupWithdrawals(withdrawals);

// //   const totalAmount = grouped.reduce((sum, g) => {
// //       // Sirf Success/Approved withdrawals ka total
// //       if (g.status?.toLowerCase() === "success" || g.status?.toLowerCase() === "approved") {
// //           return sum + g.totalGross;
// //       }
// //       return sum;
// //   }, 0);

// //   const filtered = grouped.filter((g) => {
// //     const searchLower = search.toLowerCase();
// //     const matchSearch =
// //       g.status?.toLowerCase().includes(searchLower) ||
// //       g.totalGross.toString().includes(searchLower) ||
// //       new Date(g.createdAt)
// //         .toLocaleDateString("en-GB")
// //         .includes(searchLower) ||
// //       (g.walletAddress?.toLowerCase() || "").includes(searchLower);

// //     const matchStatus =
// //       statusFilter === "all" ||
// //       g.status?.toLowerCase() === statusFilter.toLowerCase();

// //     return matchSearch && matchStatus;
// //   });

// //   const sortedFiltered = [...filtered].sort(
// //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //   );

// //   const totalPages =
// //     Math.ceil(sortedFiltered.length / itemsPerPage) || 1;

// //   const startIdx = (currentPage - 1) * itemsPerPage;

// //   const paginated = sortedFiltered.slice(
// //     startIdx,
// //     startIdx + itemsPerPage
// //   );

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [search, statusFilter]);

// //   const getStatusDetails = (group) => {
// //     const s = group.status?.toLowerCase();

// //     if (s === "approved" || s === "success") {
// //       return {
// //         label: group.status,
// //         color:
// //           "bg-green-100 text-green-700 border border-green-300",
// //       };
// //     }

// //     if (s === "pending") {
// //       return {
// //         label: group.status,
// //         color:
// //           "bg-slate-100 text-slate-700 border border-slate-300",
// //       };
// //     }

// //     if (s === "rejected" || s === "failed") {
// //       return {
// //         label: group.status,
// //         color:
// //           "bg-slate-100 text-slate-700 border border-slate-300",
// //       };
// //     }

// //     return {
// //       label: group.status || "UNKNOWN",
// //       color:
// //         "bg-slate-100 text-slate-700 border border-slate-300",
// //     };
// //   };

// //   return (
// //     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">

// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar {
// //           height: 6px;
// //           width: 6px;
// //         }

// //         .custom-scroll::-webkit-scrollbar-track {
// //           background: #f1f5f9;
// //         }

// //         .custom-scroll::-webkit-scrollbar-thumb {
// //           background: #cbd5e1;
// //           border-radius: 10px;
// //         }
// //       `}</style>

// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 uppercase tracking-wide flex items-center gap-3">
// //             <Banknote className="text-slate-700" size={28} />
// //             Withdrawal History
// //           </h2>

// //           <p className="text-slate-500 text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// //             Track all your fund withdrawals
// //           </p>
// //         </div>
// //       </div>

// //       {/* STATS */}
// //       <div className="mb-8">
// //         <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-5 md:p-6 relative overflow-hidden flex flex-col justify-center max-w-sm">

// //           <h3 className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2">
// //             <Wallet size={14} className="text-slate-700" />
// //             Total Withdrawn
// //           </h3>

// //           <p className="text-3xl md:text-4xl font-black text-slate-800">
// //             ${totalAmount.toFixed(2)}
// //           </p>
// //         </div>
// //       </div>

// //       {/* FILTERS */}
// //       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">

// //         <div className="relative w-full sm:w-80 group">
// //           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// //             <Search
// //               size={16}
// //               className="text-slate-400"
// //             />
// //           </div>

// //           <input
// //             type="text"
// //             placeholder="Search amount, wallet..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-slate-400 focus:outline-none transition-all placeholder-slate-400"
// //           />
// //         </div>

// //         <div className="flex items-center gap-3 w-full sm:w-auto">
// //           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
// //             Filter:
// //           </span>

// //           <select
// //             value={statusFilter}
// //             onChange={(e) => setStatusFilter(e.target.value)}
// //             className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:border-slate-400 focus:outline-none transition-all appearance-none cursor-pointer capitalize"
// //           >
// //             <option value="all">All Statuses</option>
// //             <option value="pending">Pending</option>
// //             <option value="approved">Approved</option>
// //             <option value="rejected">Rejected</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden relative">

// //         <div className="overflow-x-auto custom-scroll w-full relative z-10">
// //           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">

// //             <thead className="bg-slate-50 text-slate-700 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
// //               <tr>
// //                 <th className="p-4 font-black text-center">Sr.</th>
// //                 <th className="p-4 font-black">Date</th>
// //                 <th className="p-4 font-black">Total</th>
// //                 <th className="p-4 font-black">Fee</th>
// //                 <th className="p-4 font-black">
// //                   <div className="flex items-center gap-1">
// //                       USDT 
// //                   </div>
// //                 </th>

// //                 <th className="p-4 font-black">
// //                   <div className="flex items-center gap-1">
// //                       TopUp Wallet
// //                   </div>
// //                 </th>

// //                 <th className="p-4 font-black">Wallet Address</th>
// //                 <th className="p-4 font-black text-center">Status</th>
// //               </tr>
// //             </thead>

// //             <tbody className="text-slate-700">

// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-10">
// //                     <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
// //                       Loading History...
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ) : paginated.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-10">
// //                     <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">
// //                       No Withdrawal Records Found
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginated.map((group, idx) => {
// //                   const statusInfo = getStatusDetails(group);

// //                   return (
// //                     <tr
// //                       key={group._id}
// //                       className="border-b border-slate-100 bg-white hover:bg-slate-50/50"
// //                     >
// //                       <td className="p-4 font-bold text-slate-500 text-center">
// //                         {startIdx + idx + 1}
// //                       </td>

// //                       <td className="p-4 text-slate-500 font-mono text-xs">
// //                         {new Date(group.createdAt).toLocaleDateString(
// //                           "en-GB"
// //                         )}
// //                       </td>

// //                       <td className="p-4 font-bold text-slate-900">
// //                         ${group.totalGross.toFixed(2)}
// //                       </td>

// //                       <td className="p-4 font-bold text-slate-700">
// //                         -${group.totalFee.toFixed(2)}
// //                       </td>

// //                       <td className="p-4 font-black text-slate-700">
// //                         ${group.totalCryptoNet.toFixed(2)}
// //                       </td>

// //                       <td className="p-4 font-black text-slate-700">
// //                         ${group.totalTopupNet.toFixed(2)}
// //                       </td>

// //                       <td className="p-4 text-slate-700 font-mono text-[10px] sm:text-xs">
// //                         {group.walletAddress ? (
// //                           <span className="px-2 py-1 rounded border border-slate-200 bg-slate-50">
// //                             {group.walletAddress}
// //                           </span>
// //                         ) : (
// //                           "N/A"
// //                         )}
// //                       </td>

// //                       <td className="p-4 text-center">
// //                         <span
// //                           className={`px-2.5 py-1 text-[9px] md:text-[10px] font-black tracking-widest rounded-md uppercase ${statusInfo.color}`}
// //                         >
// //                           {statusInfo.label}
// //                         </span>
// //                       </td>

// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* PAGINATION */}
// //         {!loading && sortedFiltered.length > 0 && (
// //           <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">

// //             <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
// //               Showing {startIdx + 1} to{" "}
// //               {Math.min(
// //                 startIdx + itemsPerPage,
// //                 sortedFiltered.length
// //               )}{" "}
// //               of {sortedFiltered.length} Entries
// //             </span>

// //             <div className="flex items-center gap-2">

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) => Math.max(p - 1, 1))
// //                 }
// //                 disabled={currentPage === 1}
// //                 className={`p-2 rounded-lg flex items-center justify-center transition-all ${
// //                   currentPage === 1
// //                     ? "bg-slate-100 text-slate-400 cursor-not-allowed"
// //                     : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
// //                 }`}
// //               >
// //                 <ChevronLeft size={18} />
// //               </button>

// //               <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg">
// //                 {currentPage} / {totalPages}
// //               </span>

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) =>
// //                     Math.min(p + 1, totalPages)
// //                   )
// //                 }
// //                 disabled={currentPage === totalPages}
// //                 className={`p-2 rounded-lg flex items-center justify-center transition-all ${
// //                   currentPage === totalPages
// //                     ? "bg-slate-100 text-slate-400 cursor-not-allowed"
// //                     : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
// //                 }`}
// //               >
// //                 <ChevronRight size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default UserWithdrawalHistory;
 


// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import {
//   Search,
//   Banknote,
//   ChevronLeft,
//   ChevronRight,
//   Wallet,
//   Coins,
//   ArrowDownToLine,
//   CalendarDays,
//   Copy,
//   Check,
//   Clock3,
//   ShieldCheck,
//   XCircle,
//   RefreshCw,
//   FileText,
//   TrendingUp,
//   CreditCard,
// } from "lucide-react";

// function UserWithdrawalHistory() {
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [copiedAddress, setCopiedAddress] = useState("");

//   const itemsPerPage = 10;

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, []);

//   const userId = Number(user?.userId);
//   const isLeader = user?.role?.toLowerCase() === "leader";

//   useEffect(() => {
//     let active = true;

//     const fetchWithdrawals = async () => {
//       try {
//         setLoading(true);

//         const res = await api.get(
//           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`
//         );

//         if (active) {
//           setWithdrawals(res.data.withdrawals || []);
//         }
//       } catch (error) {
//         console.error("Error fetching withdrawal history:", error);

//         if (active) {
//           setWithdrawals([]);
//         }
//       } finally {
//         if (active) setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchWithdrawals();
//     } else {
//       setLoading(false);
//     }

//     return () => {
//       active = false;
//     };
//   }, [userId]);

//   // Group withdrawals created within 5 seconds.
//   // Original cutoff and Leader calculation logic preserved.
//   const grouped = useMemo(() => {
//     const sorted = [...withdrawals].sort(
//       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//     );

//     const groups = [];
//     const THRESHOLD_MS = 5000;

//     const CUTOFF_TIME = new Date(
//       "2026-07-13T16:00:00+05:30"
//     ).getTime();

//     for (const item of sorted) {
//       const itemTime = new Date(item.createdAt).getTime();
//       const lastGroup = groups[groups.length - 1];

//       const isNewLogic = itemTime >= CUTOFF_TIME;

//       const iGross = isNewLogic
//         ? Number(item.grossAmount || 0)
//         : Number(item.grossAmount || 0) * 2;

//       const iFee = isNewLogic
//         ? Number(item.fee || 0)
//         : Number(item.fee || 0) * 2;

//       const iCryptoNet = Number(item.netAmount || 0);

//       const iTopupNet = isNewLogic
//         ? iGross - iFee - iCryptoNet
//         : Number(item.netAmount || 0);

//       if (
//         lastGroup &&
//         itemTime -
//           new Date(
//             lastGroup.entries[lastGroup.entries.length - 1].createdAt
//           ).getTime() <=
//           THRESHOLD_MS
//       ) {
//         lastGroup.entries.push(item);

//         lastGroup.rawGross += iGross;
//         lastGroup.rawFee += iFee;
//         lastGroup.rawCryptoNet += iCryptoNet;
//         lastGroup.rawTopupNet += iTopupNet;

//         if (item.status?.toLowerCase() === "pending") {
//           lastGroup.status = "pending";
//         } else if (
//           item.status?.toLowerCase() === "rejected" &&
//           lastGroup.status !== "pending"
//         ) {
//           lastGroup.status = "rejected";
//         }
//       } else {
//         groups.push({
//           _id: item._id,
//           createdAt: item.createdAt,
//           entries: [item],
//           rawGross: iGross,
//           rawFee: iFee,
//           rawCryptoNet: iCryptoNet,
//           rawTopupNet: iTopupNet,
//           walletAddress: item.walletAddress,
//           status: item.status || "pending",
//           isNewLogic,
//         });
//       }
//     }

//     // Special old-record calculation for Leaders.
//     groups.forEach((group) => {
//       if (isLeader && !group.isNewLogic) {
//         const roundedGross = Math.floor(group.rawGross / 10) * 10;

//         group.totalGross = roundedGross;
//         group.totalFee = roundedGross * 0.10;
//         group.totalCryptoNet = roundedGross * 0.45;
//         group.totalTopupNet = roundedGross * 0.45;
//       } else {
//         group.totalGross = group.rawGross;
//         group.totalFee = group.rawFee;
//         group.totalCryptoNet = group.rawCryptoNet;
//         group.totalTopupNet = group.rawTopupNet;
//       }
//     });

//     return groups;
//   }, [withdrawals, isLeader]);

//   const totalAmount = grouped.reduce((sum, group) => {
//     const status = group.status?.toLowerCase();

//     if (status === "success" || status === "approved") {
//       return sum + group.totalGross;
//     }

//     return sum;
//   }, 0);

//   const filtered = useMemo(() => {
//     return grouped.filter((group) => {
//       const searchLower = search.trim().toLowerCase();

//       const formattedDate = new Date(group.createdAt).toLocaleDateString(
//         "en-GB"
//       );

//       const matchSearch =
//         !searchLower ||
//         group.status?.toLowerCase().includes(searchLower) ||
//         group.totalGross.toString().includes(searchLower) ||
//         formattedDate.toLowerCase().includes(searchLower) ||
//         (group.walletAddress?.toLowerCase() || "").includes(searchLower);

//       const matchStatus =
//         statusFilter === "all" ||
//         group.status?.toLowerCase() === statusFilter.toLowerCase();

//       return matchSearch && matchStatus;
//     });
//   }, [grouped, search, statusFilter]);

//   const sortedFiltered = useMemo(
//     () =>
//       [...filtered].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       ),
//     [filtered]
//   );

//   const totalPages = Math.max(
//     1,
//     Math.ceil(sortedFiltered.length / itemsPerPage)
//   );

//   const startIdx = (currentPage - 1) * itemsPerPage;

//   const paginated = sortedFiltered.slice(
//     startIdx,
//     startIdx + itemsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter]);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const formatAmount = (amount) =>
//     (Number(amount) || 0).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   const formatDate = (value) => {
//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return { date: "N/A", time: "--" };
//     }

//     return {
//       date: date.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       time: date.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//     };
//   };

//   const getStatusDetails = (group) => {
//     const status = group.status?.toLowerCase();

//     if (status === "approved" || status === "success") {
//       return {
//         label: group.status,
//         icon: ShieldCheck,
//         className: "bg-green-50 text-green-700 border-green-200",
//       };
//     }

//     if (status === "pending") {
//       return {
//         label: group.status,
//         icon: Clock3,
//         className: "bg-amber-50 text-amber-700 border-amber-200",
//       };
//     }

//     if (status === "rejected" || status === "failed") {
//       return {
//         label: group.status,
//         icon: XCircle,
//         className: "bg-red-50 text-red-700 border-red-200",
//       };
//     }

//     return {
//       label: group.status || "UNKNOWN",
//       icon: FileText,
//       className: "bg-slate-50 text-slate-600 border-slate-200",
//     };
//   };

//   const copyAddress = async (address) => {
//     if (!address) return;

//     try {
//       await navigator.clipboard.writeText(address);
//       setCopiedAddress(address);

//       setTimeout(() => {
//         setCopiedAddress((current) =>
//           current === address ? "" : current
//         );
//       }, 1800);
//     } catch (error) {
//       console.error("Unable to copy wallet address:", error);
//     }
//   };

//   const StatusBadge = ({ group }) => {
//     const details = getStatusDetails(group);
//     const StatusIcon = details.icon;

//     return (
//       <span
//         className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${details.className}`}
//       >
//         <StatusIcon size={12} />
//         {details.label}
//       </span>
//     );
//   };

//   const WalletAddress = ({ address }) => {
//     if (!address) {
//       return <span className="text-xs text-slate-400">N/A</span>;
//     }

//     const isCopied = copiedAddress === address;

//     return (
//       <button
//         type="button"
//         onClick={() => copyAddress(address)}
//         title="Copy wallet address"
//         className="inline-flex items-center gap-2 max-w-[220px] text-left rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 hover:bg-green-50 hover:border-green-200 transition-colors"
//       >
//         <span className="font-mono text-[10px] text-slate-600 truncate">
//           {address}
//         </span>

//         {isCopied ? (
//           <Check size={13} className="text-green-600 shrink-0" />
//         ) : (
//           <Copy size={13} className="text-slate-400 shrink-0" />
//         )}
//       </button>
//     );
//   };

//   const SummaryCard = ({
//     title,
//     value,
//     subtitle,
//     icon: Icon,
//     accent = "green",
//   }) => {
//     const themes = {
//       green: {
//         icon: "bg-green-50 text-green-700",
//         value: "text-[#17613b]",
//       },
//       gold: {
//         icon: "bg-amber-50 text-amber-700",
//         value: "text-amber-800",
//       },
//       blue: {
//         icon: "bg-blue-50 text-blue-700",
//         value: "text-slate-800",
//       },
//     };

//     const theme = themes[accent];

//     return (
//       <div className="rounded-xl border border-[#e0ebe3] bg-white p-4 shadow-sm">
//         <div className="flex items-center justify-between gap-2">
//           <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
//             {title}
//           </p>

//           <div
//             className={`h-9 w-9 rounded-xl flex items-center justify-center ${theme.icon}`}
//           >
//             <Icon size={18} />
//           </div>
//         </div>

//         <p
//           className={`mt-3 text-xl sm:text-2xl font-black break-all ${theme.value}`}
//         >
//           {value}
//         </p>

//         <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="withdrawal-page w-full max-w-7xl mx-auto pb-8">
//       <style>{`
//         .withdrawal-page {
//           color: #173b2b;
//         }

//         .withdrawal-page * {
//           box-sizing: border-box;
//         }

//         .withdrawal-page .withdraw-scroll::-webkit-scrollbar {
//           height: 6px;
//           width: 6px;
//         }

//         .withdrawal-page .withdraw-scroll::-webkit-scrollbar-track {
//           background: #edf4ef;
//         }

//         .withdrawal-page .withdraw-scroll::-webkit-scrollbar-thumb {
//           background: #9bbba5;
//           border-radius: 20px;
//         }

//         .withdrawal-page .withdraw-scroll::-webkit-scrollbar-thumb:hover {
//           background: #267348;
//         }

//         .withdrawal-page .withdraw-row:hover {
//           background: #f5faf6;
//         }

//         .withdrawal-page .withdraw-btn {
//           transition: all .2s ease;
//         }

//         .withdrawal-page .withdraw-btn:disabled {
//           opacity: .4;
//           cursor: not-allowed;
//         }

//         .withdrawal-page .withdraw-card {
//           border: 1px solid #e1ebe4;
//           background: white;
//           box-shadow: 0 3px 12px rgba(20, 65, 39, .04);
//         }
//       `}</style>

//       {/* Premium Header */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#103d29] via-[#17633c] to-[#23804c] p-5 sm:p-6 mb-5 shadow-lg">
//         <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full border-[28px] border-white/5 pointer-events-none" />
//         <div className="absolute right-28 -bottom-20 w-40 h-40 rounded-full bg-[#d9b65b]/10 blur-2xl pointer-events-none" />

//         <div className="relative z-10 flex items-center justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <span className="h-1 w-8 rounded-full bg-[#e6c66f]" />
//               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[2px] text-green-100">
//                 Helping Pools
//               </span>
//             </div>

//             <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2">
//               <Banknote size={26} className="text-[#e8c96f]" />
//               Withdrawal History
//             </h2>

//             <p className="text-green-100/80 text-xs sm:text-sm mt-2">
//               View and track all your withdrawal transactions.
//             </p>
//           </div>

//           <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
//             <ArrowDownToLine size={27} className="text-[#f0d27c]" />
//           </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
//         <SummaryCard
//           title="Total Withdrawn"
//           value={`$${formatAmount(totalAmount)}`}
//           subtitle="Approved and successful withdrawals"
//           icon={Wallet}
//           accent="green"
//         />

//         <SummaryCard
//           title="Total Requests"
//           value={grouped.length}
//           subtitle="All grouped withdrawal requests"
//           icon={FileText}
//           accent="blue"
//         />

//         <div className="col-span-2 sm:col-span-1">
//           <SummaryCard
//             title="Matching Records"
//             value={filtered.length}
//             subtitle="Records matching current filters"
//             icon={TrendingUp}
//             accent="gold"
//           />
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-[#e0ebe3] rounded-xl p-3 sm:p-4 mb-4 shadow-sm">
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
//           <div className="relative flex-1 max-w-md">
//             <Search
//               size={17}
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search amount, wallet address or status..."
//               className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-[#fbfdfb] text-sm text-slate-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition placeholder:text-slate-400"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
//               Status
//             </span>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="flex-1 sm:flex-none min-w-0 bg-[#fbfdfb] border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg px-3 py-2.5 outline-none focus:border-green-600 cursor-pointer"
//             >
//               <option value="all">All Statuses</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="success">Success</option>
//               <option value="rejected">Rejected</option>
//               <option value="failed">Failed</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Withdrawal History Table */}
//       <div className="bg-white rounded-xl border border-[#e0ebe3] shadow-sm overflow-hidden">
//         <div className="px-4 sm:px-5 py-4 border-b border-[#e7eee9] flex items-center justify-between gap-3">
//           <div>
//             <h3 className="font-extrabold text-sm sm:text-base text-[#173f2b]">
//               Transaction Records
//             </h3>
//             <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
//               Detailed breakdown of your withdrawals
//             </p>
//           </div>

//           <span className="text-[10px] sm:text-xs font-bold text-green-800 bg-green-50 border border-green-100 rounded-full px-3 py-1.5 whitespace-nowrap">
//             {filtered.length} Records
//           </span>
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden lg:block overflow-x-auto withdraw-scroll">
//           <table className="w-full text-sm text-left whitespace-nowrap">
//             <thead className="bg-[#f3f8f4] text-[#52735e] text-[10px] uppercase tracking-wider">
//               <tr>
//                 <th className="px-4 py-4 text-center font-extrabold">Sr.</th>
//                 <th className="px-4 py-4 font-extrabold">Date & Time</th>
//                 <th className="px-4 py-4 font-extrabold">Total</th>
//                 <th className="px-4 py-4 font-extrabold">Fee</th>
//                 <th className="px-4 py-4 font-extrabold">USDT Amount</th>
//                 <th className="px-4 py-4 font-extrabold">TopUp Wallet</th>
//                 <th className="px-4 py-4 font-extrabold">Wallet Address</th>
//                 <th className="px-4 py-4 text-center font-extrabold">Status</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="py-14 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <RefreshCw
//                         size={25}
//                         className="animate-spin text-green-600"
//                       />
//                       <span className="text-xs font-semibold text-slate-400">
//                         Loading withdrawal history...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="py-14 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
//                         <FileText size={22} className="text-green-600" />
//                       </div>
//                       <p className="text-sm font-bold text-slate-600">
//                         No Withdrawal Records Found
//                       </p>
//                       <p className="text-xs text-slate-400">
//                         Try changing your search or status filter.
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((group, idx) => {
//                   const date = formatDate(group.createdAt);

//                   return (
//                     <tr
//                       key={group._id || idx}
//                       className="withdraw-row transition-colors"
//                     >
//                       <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
//                         {startIdx + idx + 1}
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex flex-col gap-1">
//                           <span className="text-xs font-bold text-slate-700">
//                             {date.date}
//                           </span>
//                           <span className="text-[10px] text-slate-400">
//                             {date.time}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="font-black text-[#17613b]">
//                           ${formatAmount(group.totalGross)}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="font-semibold text-red-600">
//                           -${formatAmount(group.totalFee)}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="inline-flex items-center gap-1.5 font-bold text-slate-700">
//                           <Coins size={14} className="text-amber-600" />
//                           ${formatAmount(group.totalCryptoNet)}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="inline-flex items-center gap-1.5 font-bold text-slate-700">
//                           <Wallet size={14} className="text-green-700" />
//                           ${formatAmount(group.totalTopupNet)}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <WalletAddress address={group.walletAddress} />
//                       </td>

//                       <td className="px-4 py-4 text-center">
//                         <StatusBadge group={group} />
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Tablet and Mobile Cards */}
//         <div className="lg:hidden p-3 space-y-3">
//           {loading ? (
//             <div className="py-12 flex flex-col items-center gap-3">
//               <RefreshCw
//                 size={25}
//                 className="animate-spin text-green-600"
//               />
//               <p className="text-xs font-semibold text-slate-400">
//                 Loading withdrawal history...
//               </p>
//             </div>
//           ) : paginated.length === 0 ? (
//             <div className="py-12 flex flex-col items-center gap-2">
//               <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
//                 <FileText size={22} className="text-green-600" />
//               </div>
//               <p className="text-sm font-bold text-slate-600">
//                 No Withdrawal Records Found
//               </p>
//               <p className="text-xs text-slate-400 text-center">
//                 Try changing your search or status filter.
//               </p>
//             </div>
//           ) : (
//             paginated.map((group, idx) => {
//               const date = formatDate(group.createdAt);

//               return (
//                 <div
//                   key={group._id || idx}
//                   className="withdraw-card rounded-xl p-3.5 sm:p-4"
//                 >
//                   {/* Card Header */}
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-2 min-w-0">
//                       <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
//                         <ArrowDownToLine
//                           size={18}
//                           className="text-green-700"
//                         />
//                       </div>

//                       <div className="min-w-0">
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
//                           Withdrawal Request
//                         </p>
//                         <p className="text-xs font-extrabold text-slate-800 mt-0.5">
//                           #{startIdx + idx + 1}
//                         </p>
//                       </div>
//                     </div>

//                     <StatusBadge group={group} />
//                   </div>

//                   {/* Total */}
//                   <div className="mt-3 rounded-xl bg-gradient-to-r from-[#edf7ef] to-[#f8fbf5] border border-green-100 p-3">
//                     <p className="text-[10px] font-bold uppercase tracking-wider text-green-700/70">
//                       Total Withdrawal
//                     </p>
//                     <p className="text-xl font-black text-[#17613b] mt-1">
//                       ${formatAmount(group.totalGross)}
//                     </p>
//                   </div>

//                   {/* Separate Amount Breakdown */}
//                   <div className="grid grid-cols-2 gap-2 mt-3">
//                     <div className="rounded-lg bg-red-50/70 border border-red-100 p-2.5">
//                       <div className="flex items-center gap-1.5 text-red-600">
//                         <CreditCard size={13} />
//                         <p className="text-[10px] font-bold uppercase">
//                           Fee
//                         </p>
//                       </div>
//                       <p className="text-sm font-black text-red-700 mt-1">
//                         -${formatAmount(group.totalFee)}
//                       </p>
//                     </div>

//                     <div className="rounded-lg bg-amber-50/70 border border-amber-100 p-2.5">
//                       <div className="flex items-center gap-1.5 text-amber-700">
//                         <Coins size={13} />
//                         <p className="text-[10px] font-bold uppercase">
//                           USDT Amount
//                         </p>
//                       </div>
//                       <p className="text-sm font-black text-amber-800 mt-1">
//                         ${formatAmount(group.totalCryptoNet)}
//                       </p>
//                     </div>

//                     <div className="col-span-2 rounded-lg bg-green-50/70 border border-green-100 p-2.5">
//                       <div className="flex items-center gap-1.5 text-green-700">
//                         <Wallet size={13} />
//                         <p className="text-[10px] font-bold uppercase">
//                           TopUp Wallet Amount
//                         </p>
//                       </div>
//                       <p className="text-sm font-black text-green-800 mt-1">
//                         ${formatAmount(group.totalTopupNet)}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Date */}
//                   <div className="flex items-center gap-2 mt-3 text-slate-500">
//                     <CalendarDays size={14} className="text-green-700" />
//                     <span className="text-[11px] font-medium">
//                       {date.date} · {date.time}
//                     </span>
//                   </div>

//                   {/* Wallet Address */}
//                   <div className="mt-3 pt-3 border-t border-slate-100">
//                     <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2">
//                       Withdrawal Wallet Address
//                     </p>
//                     <WalletAddress address={group.walletAddress} />
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && sortedFiltered.length > 0 && (
//           <div className="border-t border-[#e7eee9] bg-[#fbfdfb] px-3 sm:px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
//             <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center sm:text-left">
//               Showing{" "}
//               <span className="text-slate-800">{startIdx + 1}</span> to{" "}
//               <span className="text-slate-800">
//                 {Math.min(startIdx + itemsPerPage, sortedFiltered.length)}
//               </span>{" "}
//               of{" "}
//               <span className="text-slate-800">
//                 {sortedFiltered.length}
//               </span>{" "}
//               entries
//             </p>

//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setCurrentPage((page) => Math.max(page - 1, 1))
//                 }
//                 disabled={currentPage === 1}
//                 aria-label="Previous page"
//                 className="withdraw-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
//               >
//                 <ChevronLeft size={18} />
//               </button>

//               <span className="min-w-[76px] text-center text-xs font-extrabold text-[#17613b] bg-green-50 border border-green-100 rounded-lg px-3 py-2">
//                 {currentPage} / {totalPages}
//               </span>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setCurrentPage((page) => Math.min(page + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 aria-label="Next page"
//                 className="withdraw-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Summary */}
//       {!loading && grouped.length > 0 && (
//         <div className="mt-4 rounded-xl border border-[#dce9df] bg-gradient-to-r from-[#f1f8f3] to-[#fffdf6] px-4 py-3 flex items-center justify-between gap-3">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
//               Approved Withdrawal Total
//             </p>
//             <p className="text-[10px] text-slate-400 mt-0.5">
//               Successful and approved requests only
//             </p>
//           </div>

//           <p className="text-lg sm:text-xl font-black text-[#17613b] whitespace-nowrap">
//             ${formatAmount(totalAmount)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserWithdrawalHistory;





import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Search,
  Banknote,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Coins,
  ArrowDownToLine,
  CalendarDays,
  Copy,
  Check,
  Clock3,
  ShieldCheck,
  XCircle,
  RefreshCw,
  FileText,
  TrendingUp,
  CreditCard,
} from "lucide-react";

function UserWithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState("");

  const itemsPerPage = 10;

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const userId = Number(user?.userId);
  const isLeader = user?.role?.toLowerCase() === "leader";

  useEffect(() => {
    let active = true;

    const fetchWithdrawals = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`
        );

        if (active) {
          setWithdrawals(res.data.withdrawals || []);
        }
      } catch (error) {
        console.error("Error fetching withdrawal history:", error);

        if (active) {
          setWithdrawals([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (userId) {
      fetchWithdrawals();
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [userId]);

  // Group withdrawals created within 5 seconds.
  // Original cutoff and Leader calculation logic preserved.
  const grouped = useMemo(() => {
    const sorted = [...withdrawals].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const groups = [];
    const THRESHOLD_MS = 5000;

    const CUTOFF_TIME = new Date(
      "2026-07-13T16:00:00+05:30"
    ).getTime();

    for (const item of sorted) {
      const itemTime = new Date(item.createdAt).getTime();
      const lastGroup = groups[groups.length - 1];

      const isNewLogic = itemTime >= CUTOFF_TIME;

      const iGross = isNewLogic
        ? Number(item.grossAmount || 0)
        : Number(item.grossAmount || 0) * 2;

      const iFee = isNewLogic
        ? Number(item.fee || 0)
        : Number(item.fee || 0) * 2;

      const iCryptoNet = Number(item.netAmount || 0);

      const iTopupNet = isNewLogic
        ? iGross - iFee - iCryptoNet
        : Number(item.netAmount || 0);

      if (
        lastGroup &&
        itemTime -
          new Date(
            lastGroup.entries[lastGroup.entries.length - 1].createdAt
          ).getTime() <=
          THRESHOLD_MS
      ) {
        lastGroup.entries.push(item);

        lastGroup.rawGross += iGross;
        lastGroup.rawFee += iFee;
        lastGroup.rawCryptoNet += iCryptoNet;
        lastGroup.rawTopupNet += iTopupNet;

        if (item.status?.toLowerCase() === "pending") {
          lastGroup.status = "pending";
        } else if (
          item.status?.toLowerCase() === "rejected" &&
          lastGroup.status !== "pending"
        ) {
          lastGroup.status = "rejected";
        }
      } else {
        groups.push({
          _id: item._id,
          createdAt: item.createdAt,
          entries: [item],
          rawGross: iGross,
          rawFee: iFee,
          rawCryptoNet: iCryptoNet,
          rawTopupNet: iTopupNet,
          walletAddress: item.walletAddress,
          status: item.status || "pending",
          isNewLogic,
        });
      }
    }

    // Special old-record calculation for Leaders.
    groups.forEach((group) => {
      if (isLeader && !group.isNewLogic) {
        const roundedGross = Math.floor(group.rawGross / 10) * 10;

        group.totalGross = roundedGross;
        group.totalFee = roundedGross * 0.10;
        group.totalCryptoNet = roundedGross * 0.45;
        group.totalTopupNet = roundedGross * 0.45;
      } else {
        group.totalGross = group.rawGross;
        group.totalFee = group.rawFee;
        group.totalCryptoNet = group.rawCryptoNet;
        group.totalTopupNet = group.rawTopupNet;
      }
    });

    return groups;
  }, [withdrawals, isLeader]);

  // Combined amount sent to the withdrawal destination(s):
  // USDT amount + TopUp wallet amount.
  const getCombinedWithdrawalAmount = (group) =>
    Number(group.totalCryptoNet || 0) + Number(group.totalTopupNet || 0);

  const totalAmount = grouped.reduce((sum, group) => {
    const status = group.status?.toLowerCase();

    if (status === "success" || status === "approved") {
      return sum + getCombinedWithdrawalAmount(group);
    }

    return sum;
  }, 0);

  const filtered = useMemo(() => {
    return grouped.filter((group) => {
      const searchLower = search.trim().toLowerCase();

      const formattedDate = new Date(group.createdAt).toLocaleDateString(
        "en-GB"
      );

      const matchSearch =
        !searchLower ||
        group.status?.toLowerCase().includes(searchLower) ||
        group.totalGross.toString().includes(searchLower) ||
        getCombinedWithdrawalAmount(group).toString().includes(searchLower) ||
        formattedDate.toLowerCase().includes(searchLower) ||
        (group.walletAddress?.toLowerCase() || "").includes(searchLower);

      const matchStatus =
        statusFilter === "all" ||
        group.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [grouped, search, statusFilter]);

  const sortedFiltered = useMemo(
    () =>
      [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    [filtered]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sortedFiltered.length / itemsPerPage)
  );

  const startIdx = (currentPage - 1) * itemsPerPage;

  const paginated = sortedFiltered.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const formatAmount = (amount) =>
    (Number(amount) || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return { date: "N/A", time: "--" };
    }

    return {
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const getStatusDetails = (group) => {
    const status = group.status?.toLowerCase();

    if (status === "approved" || status === "success") {
      return {
        label: group.status,
        icon: ShieldCheck,
        className: "bg-green-50 text-green-700 border-green-200",
      };
    }

    if (status === "pending") {
      return {
        label: group.status,
        icon: Clock3,
        className: "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    if (status === "rejected" || status === "failed") {
      return {
        label: group.status,
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200",
      };
    }

    return {
      label: group.status || "UNKNOWN",
      icon: FileText,
      className: "bg-slate-50 text-slate-600 border-slate-200",
    };
  };

  const copyAddress = async (address) => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);

      setTimeout(() => {
        setCopiedAddress((current) =>
          current === address ? "" : current
        );
      }, 1800);
    } catch (error) {
      console.error("Unable to copy wallet address:", error);
    }
  };

  const StatusBadge = ({ group }) => {
    const details = getStatusDetails(group);
    const StatusIcon = details.icon;

    return (
      <span
        className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${details.className}`}
      >
        <StatusIcon size={12} />
        {details.label}
      </span>
    );
  };

  const WalletAddress = ({ address }) => {
    if (!address) {
      return <span className="text-xs text-slate-400">N/A</span>;
    }

    const isCopied = copiedAddress === address;

    return (
      <button
        type="button"
        onClick={() => copyAddress(address)}
        title="Copy wallet address"
        className="inline-flex items-center gap-2 max-w-[220px] text-left rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 hover:bg-green-50 hover:border-green-200 transition-colors"
      >
        <span className="font-mono text-[10px] text-slate-600 truncate">
          {address}
        </span>

        {isCopied ? (
          <Check size={13} className="text-green-600 shrink-0" />
        ) : (
          <Copy size={13} className="text-slate-400 shrink-0" />
        )}
      </button>
    );
  };

  const SummaryCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    accent = "green",
  }) => {
    const themes = {
      green: {
        icon: "bg-green-50 text-green-700",
        value: "text-[#17613b]",
      },
      gold: {
        icon: "bg-amber-50 text-amber-700",
        value: "text-amber-800",
      },
      blue: {
        icon: "bg-blue-50 text-blue-700",
        value: "text-slate-800",
      },
    };

    const theme = themes[accent];

    return (
      <div className="rounded-xl border border-[#e0ebe3] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${theme.icon}`}
          >
            <Icon size={18} />
          </div>
        </div>

        <p
          className={`mt-3 text-xl sm:text-2xl font-black break-all ${theme.value}`}
        >
          {value}
        </p>

        <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>
      </div>
    );
  };

  return (
    <div className="withdrawal-page w-full max-w-7xl mx-auto pb-8">
      <style>{`
        .withdrawal-page {
          color: #173b2b;
        }

        .withdrawal-page * {
          box-sizing: border-box;
        }

        .withdrawal-page .withdraw-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .withdrawal-page .withdraw-scroll::-webkit-scrollbar-track {
          background: #edf4ef;
        }

        .withdrawal-page .withdraw-scroll::-webkit-scrollbar-thumb {
          background: #9bbba5;
          border-radius: 20px;
        }

        .withdrawal-page .withdraw-scroll::-webkit-scrollbar-thumb:hover {
          background: #267348;
        }

        .withdrawal-page .withdraw-row:hover {
          background: #f5faf6;
        }

        .withdrawal-page .withdraw-btn {
          transition: all .2s ease;
        }

        .withdrawal-page .withdraw-btn:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .withdrawal-page .withdraw-card {
          border: 1px solid #e1ebe4;
          background: white;
          box-shadow: 0 3px 12px rgba(20, 65, 39, .04);
        }
      `}</style>

      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#103d29] via-[#17633c] to-[#23804c] p-5 sm:p-6 mb-5 shadow-lg">
        <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full border-[28px] border-white/5 pointer-events-none" />
        <div className="absolute right-28 -bottom-20 w-40 h-40 rounded-full bg-[#d9b65b]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 rounded-full bg-[#e6c66f]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[2px] text-green-100">
                Helping Pools
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Banknote size={26} className="text-[#e8c96f]" />
              Withdrawal History
            </h2>

            <p className="text-green-100/80 text-xs sm:text-sm mt-2">
              View and track all your withdrawal transactions.
            </p>
          </div>

          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
            <ArrowDownToLine size={27} className="text-[#f0d27c]" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <SummaryCard
          title="Total Withdrawn"
          value={`$${formatAmount(totalAmount)}`}
          subtitle="Approved and successful withdrawals"
          icon={Wallet}
          accent="green"
        />

        <SummaryCard
          title="Total Requests"
          value={grouped.length}
          subtitle="All grouped withdrawal requests"
          icon={FileText}
          accent="blue"
        />

        <div className="col-span-2 sm:col-span-1">
          <SummaryCard
            title="Matching Records"
            value={filtered.length}
            subtitle="Records matching current filters"
            icon={TrendingUp}
            accent="gold"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#e0ebe3] rounded-xl p-3 sm:p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search amount, wallet address or status..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-[#fbfdfb] text-sm text-slate-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
              Status
            </span>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:flex-none min-w-0 bg-[#fbfdfb] border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg px-3 py-2.5 outline-none focus:border-green-600 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="success">Success</option>
              <option value="rejected">Rejected</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Withdrawal History Table */}
      <div className="bg-white rounded-xl border border-[#e0ebe3] shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-[#e7eee9] flex items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#173f2b]">
              Transaction Records
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
              Detailed breakdown of your withdrawals
            </p>
          </div>

          <span className="text-[10px] sm:text-xs font-bold text-green-800 bg-green-50 border border-green-100 rounded-full px-3 py-1.5 whitespace-nowrap">
            {filtered.length} Records
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto withdraw-scroll">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#f3f8f4] text-[#52735e] text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 text-center font-extrabold">Sr.</th>
                <th className="px-4 py-4 font-extrabold">Date & Time</th>
                <th className="px-4 py-4 font-extrabold">Total</th>
                <th className="px-4 py-4 font-extrabold">Fee</th>
                <th className="px-4 py-4 font-extrabold">Withdrawal Amount</th>
                <th className="px-4 py-4 font-extrabold">Wallet Address</th>
                <th className="px-4 py-4 text-center font-extrabold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw
                        size={25}
                        className="animate-spin text-green-600"
                      />
                      <span className="text-xs font-semibold text-slate-400">
                        Loading withdrawal history...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <FileText size={22} className="text-green-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">
                        No Withdrawal Records Found
                      </p>
                      <p className="text-xs text-slate-400">
                        Try changing your search or status filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((group, idx) => {
                  const date = formatDate(group.createdAt);

                  return (
                    <tr
                      key={group._id || idx}
                      className="withdraw-row transition-colors"
                    >
                      <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
                        {startIdx + idx + 1}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-slate-700">
                            {date.date}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {date.time}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-black text-[#17613b]">
                          ${formatAmount(group.totalGross)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-semibold text-red-600">
                          -${formatAmount(group.totalFee)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 font-black text-emerald-700">
                          <Coins size={14} className="text-emerald-600" />
                          ${formatAmount(getCombinedWithdrawalAmount(group))}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <WalletAddress address={group.walletAddress} />
                      </td>

                      <td className="px-4 py-4 text-center">
                        <StatusBadge group={group} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Tablet and Mobile Cards */}
        <div className="lg:hidden p-3 space-y-3">
          {loading ? (
            <div className="py-12 flex flex-col items-center gap-3">
              <RefreshCw
                size={25}
                className="animate-spin text-green-600"
              />
              <p className="text-xs font-semibold text-slate-400">
                Loading withdrawal history...
              </p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <FileText size={22} className="text-green-600" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                No Withdrawal Records Found
              </p>
              <p className="text-xs text-slate-400 text-center">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            paginated.map((group, idx) => {
              const date = formatDate(group.createdAt);

              return (
                <div
                  key={group._id || idx}
                  className="withdraw-card rounded-xl p-3.5 sm:p-4"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                        <ArrowDownToLine
                          size={18}
                          className="text-green-700"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          Withdrawal Request
                        </p>
                        <p className="text-xs font-extrabold text-slate-800 mt-0.5">
                          #{startIdx + idx + 1}
                        </p>
                      </div>
                    </div>

                    <StatusBadge group={group} />
                  </div>

                  {/* Total */}
                  <div className="mt-3 rounded-xl bg-gradient-to-r from-[#edf7ef] to-[#f8fbf5] border border-green-100 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-700/70">
                      Total Withdrawal
                    </p>
                    <p className="text-xl font-black text-[#17613b] mt-1">
                      ${formatAmount(group.totalGross)}
                    </p>
                  </div>

                  {/* Combined Withdrawal Amount Breakdown */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="rounded-lg bg-red-50/70 border border-red-100 p-2.5">
                      <div className="flex items-center gap-1.5 text-red-600">
                        <CreditCard size={13} />
                        <p className="text-[10px] font-bold uppercase">
                          Fee
                        </p>
                      </div>
                      <p className="text-sm font-black text-red-700 mt-1">
                        -${formatAmount(group.totalFee)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-emerald-50/70 border border-emerald-100 p-2.5">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Coins size={13} />
                        <p className="text-[10px] font-bold uppercase">
                          Withdrawal Amount
                        </p>
                      </div>
                      <p className="text-sm font-black text-emerald-800 mt-1">
                        ${formatAmount(getCombinedWithdrawalAmount(group))}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-3 text-slate-500">
                    <CalendarDays size={14} className="text-green-700" />
                    <span className="text-[11px] font-medium">
                      {date.date} · {date.time}
                    </span>
                  </div>

                  {/* Wallet Address */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2">
                      Withdrawal Wallet Address
                    </p>
                    <WalletAddress address={group.walletAddress} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {!loading && sortedFiltered.length > 0 && (
          <div className="border-t border-[#e7eee9] bg-[#fbfdfb] px-3 sm:px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center sm:text-left">
              Showing{" "}
              <span className="text-slate-800">{startIdx + 1}</span> to{" "}
              <span className="text-slate-800">
                {Math.min(startIdx + itemsPerPage, sortedFiltered.length)}
              </span>{" "}
              of{" "}
              <span className="text-slate-800">
                {sortedFiltered.length}
              </span>{" "}
              entries
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="withdraw-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="min-w-[76px] text-center text-xs font-extrabold text-[#17613b] bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="withdraw-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      {!loading && grouped.length > 0 && (
        <div className="mt-4 rounded-xl border border-[#dce9df] bg-gradient-to-r from-[#f1f8f3] to-[#fffdf6] px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Approved Withdrawal Total
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Successful and approved requests only
            </p>
          </div>

          <p className="text-lg sm:text-xl font-black text-[#17613b] whitespace-nowrap">
            ${formatAmount(totalAmount)}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserWithdrawalHistory;
