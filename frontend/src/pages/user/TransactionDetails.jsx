// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import { getUserId } from "../../utils/authUtils";
// // import { Search, ChevronLeft, ChevronRight, FileText, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, ListFilter } from "lucide-react";

// // const TransactionDetails = () => {
// //   const userId = String(getUserId()); 
// //   const [transactions, setTransactions] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [filterType, setFilterType] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(10);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!userId) return;
    
// //     setLoading(true);
// //     api.get(`/transaction/transactions/${userId}?t=${new Date().getTime()}`)
// //       .then((res) => {
// //         let sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// //         // 🔥 SUPER STRICT LEDGER FILTER 🔥
// //         sorted = sorted.filter(txn => {
// //             const tType = (txn.type || "").toLowerCase();
// //             const tSource = (txn.source || "").toLowerCase();
// //             const tDesc = (txn.description || "").toLowerCase();
// //             const tUserId = String(txn.userId);
// //             const tFrom = String(txn.fromUserId);
// //             const tTo = String(txn.toUserId);
// //             const me = userId;

// //             // 0. 🔥 ULTIMATE BLOCKER: Faltu incomes hatao (Jaise Instant Leader Bonus)
// //             if (
// //               tSource === "instant_leader_bonus" || 
// //               tDesc.includes("instant leader bonus") || 
// //               tDesc.includes("instant bonus")
// //             ) {
// //               return false;
// //             }

// //             // 1. Promo waale topup ignore karo
// //             if (tType === "topup" && txn.description?.toUpperCase().includes("PROMOTION")) {
// //                 return false;
// //             }

// //             // 2. Agar ye transaction explicitly mere ledger (wallet) ka hai, toh dikhao
// //             if (tUserId === me) {
// //                 return true;
// //             }

// //             // 3. Agar ye Transfer ya Topup hai (jahan funds do logon ke beech move hue hain)
// //             // aur main Sender (from) ya Receiver (to) hoon, toh dikhao
// //             if (tType === "transfer" || tType === "topup") {
// //                 if (tFrom === me || tTo === me) return true;
// //             }

// //             // 4. BAAKI SAB IGNORE KAR DO! 
// //             return false;
// //         });

// //         setTransactions(sorted);
// //         setFiltered(sorted);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch transactions", err);
// //         setTransactions([]);
// //         setFiltered([]);
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [userId]);

// //   const isCreditType = (type = "") => [
// //     "deposit", "credit_to_wallet", "roi_income", "referral_income", "topup_income", 
// //     "binary", "spin_income", "level_income", "direct_income", "plan_income", "transfer", 
// //     "reward_income", "fast_track" 
// //   ].includes(type.toLowerCase());
  
// //   const isDebitType = (type = "") => ["withdrawal","buy_spin","topup","transfer"].includes(type.toLowerCase());

// //   useEffect(() => {
// //     let result = [...transactions];

// //     if (search.trim() !== "") {
// //       const value = search.toLowerCase();
// //       result = result.filter(
// //         (txn) =>
// //           txn.type?.toLowerCase().includes(value) ||
// //           txn.description?.toLowerCase().includes(value) ||
// //           String(txn.fromUserId || "").includes(value) ||
// //           String(txn.toUserId || "").includes(value)
// //       );
// //     }

// //     if (filterType === "credit") {
// //         result = result.filter(txn => isCreditType(txn.type) && String(txn.fromUserId) !== userId);
// //     } 
// //     else if (filterType === "debit") {
// //         result = result.filter(txn => isDebitType(txn.type) && String(txn.toUserId) !== userId);
// //     }

// //     setFiltered(result);
// //     setCurrentPage(1);
// //   }, [search, filterType, transactions, userId]);

// //   const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
// //   const indexOfLast = currentPage * itemsPerPage;
// //   const indexOfFirst = indexOfLast - itemsPerPage;
// //   const paginated = filtered.slice(indexOfFirst, indexOfLast);

// //   const formatAmount = (txn) => {
// //     const type = txn.type?.toLowerCase() || "";
    
// //     // Amount extraction fix
// //     let amt = 0;
// //     if (txn.amount && typeof txn.amount === 'object' && txn.amount.$numberDecimal) {
// //       amt = parseFloat(txn.amount.$numberDecimal);
// //     } else if (txn.amount !== undefined && txn.amount !== null) {
// //       amt = parseFloat(txn.amount);
// //     } else {
// //       amt = parseFloat(txn.grossAmount || 0);
// //     }

// //     let colorClass = "text-slate-900";
// //     let display = `$${isNaN(amt) ? "0.00" : amt.toFixed(2)}`;
// //     let icon = null;

// //     if (type === "transfer" || type === "topup") {
// //       if (String(txn.toUserId) === userId || String(txn.userId) === userId) { 
// //         if(type === "topup" && String(txn.userId) === userId && String(txn.fromUserId) !== userId) {
// //             display = `+$${amt.toFixed(2)}`; 
// //             colorClass = "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"; 
// //             icon = <ArrowDownLeft size={14} className="text-green-400" />;
// //         }
// //         else if(type === "transfer" && String(txn.toUserId) === userId) {
// //             display = `+$${amt.toFixed(2)}`; 
// //             colorClass = "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"; 
// //             icon = <ArrowDownLeft size={14} className="text-green-400" />;
// //         }
// //         else {
// //             display = `-$${amt.toFixed(2)}`; 
// //             colorClass = "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]"; 
// //             icon = <ArrowUpRight size={14} className="text-red-400" />;
// //         }
// //       } else if (String(txn.fromUserId) === userId) { 
// //         display = `-$${amt.toFixed(2)}`; 
// //         colorClass = "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]"; 
// //         icon = <ArrowUpRight size={14} className="text-red-400" />;
// //       } else {
// //         icon = <ArrowRightLeft size={14} className="text-black" />;
// //       }
// //     } else if (isCreditType(type)) { 
// //       display = `+$${amt.toFixed(2)}`; 
// //       colorClass = "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"; 
// //       icon = <ArrowDownLeft size={14} className="text-green-400" />;
// //     } else if (isDebitType(type)) { 
// //       display = `-$${Math.abs(amt).toFixed(2)}`; 
// //       colorClass = "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]"; 
// //       icon = <ArrowUpRight size={14} className="text-red-400" />;
// //     }

// //     return { display, colorClass, icon };
// //   };

// //   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
// //   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

// //   return (
// //     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
// //         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
// //       `}</style>

// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
// //              <FileText className="text-green-500" size={28} /> All Transactions
// //           </h2>
// //           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// //             Complete master ledger of your account
// //           </p>
// //         </div>
        
// //         <div className="bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
// //            <ListFilter size={16} className="text-green-500" />
// //            <span className="text-black text-xs font-bold uppercase tracking-widest">Total Records:</span>
// //            <span className="text-slate-900 font-black text-sm">{filtered.length}</span>
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
        
// //         <div className="relative w-full lg:w-80 group">
// //            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// //              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
// //            </div>
// //            <input
// //              type="text"
// //              placeholder="Search type, User ID, desc..."
// //              value={search}
// //              onChange={(e) => setSearch(e.target.value)}
// //              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
// //            />
// //         </div>

// //         <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap sm:flex-nowrap">
// //            <select
// //              value={filterType}
// //              onChange={(e) => setFilterType(e.target.value)}
// //              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-all appearance-none cursor-pointer uppercase"
// //            >
// //              <option value="all">All Types</option>
// //              <option value="credit">Credits Only</option>
// //              <option value="debit">Debits Only</option>
// //            </select>

// //            <select
// //              value={itemsPerPage}
// //              onChange={(e) => {
// //                setItemsPerPage(Number(e.target.value));
// //                setCurrentPage(1);
// //              }}
// //              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-all appearance-none cursor-pointer"
// //            >
// //              <option value={10}>10 Rows</option>
// //              <option value={20}>20 Rows</option>
// //              <option value={50}>50 Rows</option>
// //              <option value={100}>100 Rows</option>
// //            </select>
// //         </div>
// //       </div>

// //       {/* Table Box */}
// //       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden shadow-2xl relative">
// //         <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[100px] pointer-events-none rounded-full"></div>
        
// //         <div className="overflow-x-auto custom-scroll w-full relative z-10">
// //           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
// //             <thead className="bg-slate-50 text-green-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
// //               <tr>
// //                 <th className="p-4 font-black text-center w-16">Sr.</th>
// //                 <th className="p-4 font-black text-right">Date & Time</th>
// //                 <th className="p-4 font-black">Type</th>
// //                 <th className="p-4 font-black text-center">Amount</th>
// //                 <th className="p-4 font-black">From User</th>
// //                 <th className="p-4 font-black">To User</th>
// //                 <th className="p-4 font-black">Description</th>
// //               </tr>
// //             </thead>
// //             <tbody className="text-slate-600">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-10">
// //                     <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// //                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Transactions...</span>
// //                   </td>
// //                 </tr>
// //               ) : paginated.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-10">
// //                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No transaction records found</span>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginated.map((txn, idx) => {
// //                   const date = new Date(txn.createdAt || txn.date);
// //                   const { display, colorClass, icon } = formatAmount(txn);
                  
// //                   return (
// //                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-white/5 transition-colors bg-white">
                      
// //                       <td className="p-4 font-bold text-gray-500 text-center">
// //                         {indexOfFirst + idx + 1}
// //                       </td>
// //                        <td className="p-4 text-gray-500 font-mono text-[10px] sm:text-xs text-right">
// //                         <div className="flex flex-col items-end">
// //                            <span className="text-slate-600">{date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
// //                            <span>{date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
// //                         </div>
// //                       </td>

// //                       <td className="p-4">
// //                          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-slate-200 px-2 py-1 rounded-md text-[10px] font-black tracking-widest text-slate-600">
// //                            {icon} {(txn.type || "-").replace(/_/g, " ").toUpperCase()}
// //                          </span>
// //                       </td>

// //                       <td className={`p-4 font-black text-center text-base ${colorClass}`}>
// //                         {display}
// //                       </td>

// //                       <td className="p-4 font-mono text-black text-[10px] sm:text-xs">
// //                          {txn.fromUserId ? <span className="bg-white/5 px-2 py-1 border border-slate-200 rounded">{String(txn.fromUserId) === userId ? "Self" : txn.fromUserId}</span> : "-"}
// //                       </td>

// //                       <td className="p-4 font-mono text-black text-[10px] sm:text-xs">
// //                          {txn.toUserId ? <span className="bg-white/5 px-2 py-1 border border-slate-200 rounded">{String(txn.toUserId) === userId ? "Self" : txn.toUserId}</span> : "-"}
// //                       </td>

// //                    <td 
// //   className="p-4 text-black text-[11px] md:text-xs font-bold tracking-wide capitalize max-w-[200px] truncate" 
// //   title={txn.description || "-"}
// // >
// //   {txn.description 
// //     ? txn.description
// //         .replace(/\s*\(Leader\)/gi, "")                         // 🔥 LEADER word hatao
// //         .replace(/leader settlement:?\s*/gi, "")                // Leader Settlement hataya
// //         .replace(/(singel|single)\s?leg/gi, "Community Income") // Singel/Single leg ko Community Income kiya
// //         .replace(/pool/gi, "Community Income")                  // Pool ko Community Income kiya
// //         .replace(/unlocked/gi, "")                              // "Unlocked" text hataya
// //         .trim()                                                 // Extra spaces saaf kiye
// //     : "-"}
// // </td>

// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination Footer */}
// //         {!loading && filtered.length > 0 && (
// //            <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
// //               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
// //                 Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} Entries
// //               </span>
              
// //               <div className="flex items-center gap-2">
// //                  <button
// //                    onClick={handlePrev}
// //                    disabled={currentPage === 1}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-green-500/20 hover:text-green-500 border border-transparent hover:border-green-500/30'}`}
// //                  >
// //                    <ChevronLeft size={18} />
// //                  </button>
                 
// //                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg">
// //                     {currentPage} / {totalPages}
// //                  </span>
                 
// //                  <button
// //                    onClick={handleNext}
// //                    disabled={currentPage === totalPages}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-green-500/20 hover:text-green-500 border border-transparent hover:border-green-500/30'}`}
// //                  >
// //                    <ChevronRight size={18} />
// //                  </button>
// //               </div>
// //            </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransactionDetails;


// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import {
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   ArrowDownLeft,
//   ArrowUpRight,
//   ArrowRightLeft,
//   ListFilter,
//   Wallet,
//   TrendingUp,
//   TrendingDown,
//   CalendarDays,
//   RefreshCw,
//   X,
//   Activity,
//   Receipt,
// } from "lucide-react";

// const TransactionDetails = () => {
//   const userId = String(getUserId() || "");

//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchTransactions = useCallback(async () => {
//     if (!userId || userId === "undefined" || userId === "null") {
//       setTransactions([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await api.get(
//         `/transaction/transactions/${userId}?t=${new Date().getTime()}`
//       );

//       let sorted = Array.isArray(res.data) ? [...res.data] : [];

//       sorted.sort(
//         (a, b) =>
//           new Date(b.createdAt || b.date).getTime() -
//           new Date(a.createdAt || a.date).getTime()
//       );

//       // Preserve the existing ledger exclusion rules
//       sorted = sorted.filter((txn) => {
//         const tType = (txn.type || "").toLowerCase();
//         const tSource = (txn.source || "").toLowerCase();
//         const tDesc = (txn.description || "").toLowerCase();

//         const tUserId = String(txn.userId);
//         const tFrom = String(txn.fromUserId);
//         const tTo = String(txn.toUserId);
//         const me = userId;

//         // Exclude Instant Leader Bonus entries
//         if (
//           tSource === "instant_leader_bonus" ||
//           tDesc.includes("instant leader bonus") ||
//           tDesc.includes("instant bonus")
//         ) {
//           return false;
//         }

//         // Exclude promotional top-ups
//         if (
//           tType === "topup" &&
//           txn.description?.toUpperCase().includes("PROMOTION")
//         ) {
//           return false;
//         }

//         // Transactions explicitly belonging to this user's ledger
//         if (tUserId === me) {
//           return true;
//         }

//         // Transfers and top-ups involving this user
//         if (tType === "transfer" || tType === "topup") {
//           if (tFrom === me || tTo === me) return true;
//         }

//         return false;
//       });

//       setTransactions(sorted);
//     } catch (err) {
//       console.error("Failed to fetch transactions", err);
//       setTransactions([]);
//       setError(
//         err.response?.data?.message ||
//           "Unable to load transaction history. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   const isCreditType = (type = "") =>
//     [
//       "deposit",
//       "credit_to_wallet",
//       "roi_income",
//       "referral_income",
//       "topup_income",
//       "binary",
//       "spin_income",
//       "level_income",
//       "direct_income",
//       "plan_income",
//       "transfer",
//       "reward_income",
//       "fast_track",
//     ].includes(type.toLowerCase());

//   const isDebitType = (type = "") =>
//     ["withdrawal", "buy_spin", "topup", "transfer"].includes(
//       type.toLowerCase()
//     );

//   const getAmount = (txn) => {
//     let amount = 0;

//     if (
//       txn.amount &&
//       typeof txn.amount === "object" &&
//       txn.amount.$numberDecimal
//     ) {
//       amount = parseFloat(txn.amount.$numberDecimal);
//     } else if (txn.amount !== undefined && txn.amount !== null) {
//       amount = parseFloat(txn.amount);
//     } else {
//       amount = parseFloat(txn.grossAmount || 0);
//     }

//     return Number.isFinite(amount) ? amount : 0;
//   };

//   const getTransactionAmount = (txn) => {
//     const type = txn.type?.toLowerCase() || "";
//     const amount = getAmount(txn);

//     let direction = "neutral";

//     if (type === "transfer" || type === "topup") {
//       if (
//         String(txn.toUserId) === userId ||
//         String(txn.userId) === userId
//       ) {
//         if (
//           type === "topup" &&
//           String(txn.userId) === userId &&
//           String(txn.fromUserId) !== userId
//         ) {
//           direction = "credit";
//         } else if (type === "transfer" && String(txn.toUserId) === userId) {
//           direction = "credit";
//         } else {
//           direction = "debit";
//         }
//       } else if (String(txn.fromUserId) === userId) {
//         direction = "debit";
//       }
//     } else if (isCreditType(type)) {
//       direction = "credit";
//     } else if (isDebitType(type)) {
//       direction = "debit";
//     }

//     const display =
//       direction === "credit"
//         ? `+$${Math.abs(amount).toFixed(2)}`
//         : direction === "debit"
//           ? `-$${Math.abs(amount).toFixed(2)}`
//           : `$${Math.abs(amount).toFixed(2)}`;

//     return { amount, direction, display };
//   };

//   const formatDescription = (description) => {
//     if (!description) return "-";

//     return description
//       .replace(/\s*\(Leader\)/gi, "")
//       .replace(/leader settlement:?\s*/gi, "")
//       .replace(/(singel|single)\s?leg/gi, "Community Income")
//       .replace(/pool/gi, "Community Income")
//       .replace(/unlocked/gi, "")
//       .trim();
//   };

//   const formatDate = (value) => {
//     const date = new Date(value);

//     if (!value || Number.isNaN(date.getTime())) {
//       return { date: "-", time: "-" };
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

//   const getTypeLabel = (type = "") =>
//     type.replace(/_/g, " ").replace(/\s+/g, " ").trim() || "Transaction";

//   // Search and filter
//   const filtered = useMemo(() => {
//     let result = [...transactions];

//     if (search.trim()) {
//       const value = search.toLowerCase().trim();

//       result = result.filter(
//         (txn) =>
//           txn.type?.toLowerCase().includes(value) ||
//           txn.description?.toLowerCase().includes(value) ||
//           String(txn.fromUserId || "").toLowerCase().includes(value) ||
//           String(txn.toUserId || "").toLowerCase().includes(value)
//       );
//     }

//     if (filterType === "credit") {
//       result = result.filter(
//         (txn) =>
//           isCreditType(txn.type) &&
//           String(txn.fromUserId) !== userId
//       );
//     } else if (filterType === "debit") {
//       result = result.filter(
//         (txn) =>
//           isDebitType(txn.type) &&
//           String(txn.toUserId) !== userId
//       );
//     }

//     return result;
//   }, [search, filterType, transactions, userId]);

//   const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   // Summary totals use the same transaction direction logic as the ledger.
//   const summary = useMemo(() => {
//     let credit = 0;
//     let debit = 0;

//     transactions.forEach((txn) => {
//       const { amount, direction } = getTransactionAmount(txn);

//       if (direction === "credit") credit += Math.abs(amount);
//       if (direction === "debit") debit += Math.abs(amount);
//     });

//     return {
//       total: transactions.length,
//       credit,
//       debit,
//     };
//   }, [transactions]);

//   const handlePrev = () => {
//     setCurrentPage((prev) => Math.max(1, prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => Math.min(totalPages, prev + 1));
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setFilterType("all");
//     setCurrentPage(1);
//   };

//   const hasActiveFilters = search.trim() !== "" || filterType !== "all";

//   return (
//     <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">
//       <style>{`
//         .transaction-scroll::-webkit-scrollbar {
//           height: 6px;
//           width: 6px;
//         }

//         .transaction-scroll::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 20px;
//         }

//         .transaction-scroll::-webkit-scrollbar-thumb {
//           background: #b8c99c;
//           border-radius: 20px;
//         }

//         .transaction-scroll::-webkit-scrollbar-thumb:hover {
//           background: #78964c;
//         }

//         .transaction-row {
//           transition: background .2s ease;
//         }

//         .transaction-row:hover {
//           background: #f6faf3;
//         }

//         @media (max-width: 640px) {
//           .transaction-mobile { display: block; }
//           .transaction-desktop { display: none; }
//         }

//         @media (min-width: 641px) {
//           .transaction-mobile { display: none; }
//           .transaction-desktop { display: block; }
//         }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-green-800 to-green-500 flex items-center justify-center shadow-lg shadow-green-900/15 shrink-0">
//             <Receipt size={23} className="text-white" />
//           </div>

//           <div>
//             <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
//               All Transactions
//             </h2>

//             <div className="flex items-center gap-2 mt-1">
//               <span className="w-5 h-[2px] bg-yellow-500 rounded-full" />
//               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[1.5px] text-slate-500">
//                 Transaction History
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-green-50 border border-green-100 w-fit">
//           <Activity size={15} className="text-green-700" />
//           <span className="text-[10px] sm:text-xs font-extrabold text-green-800 uppercase tracking-wider">
//             Account Activity
//           </span>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
//         {/* Total */}
//         <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
//           <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-green-50" />

//           <div className="relative flex items-center justify-between gap-3">
//             <div>
//               <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
//                 Total Transactions
//               </p>
//               <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
//                 {summary.total}
//               </h3>
//               <p className="text-[10px] text-slate-400 mt-1">
//                 Account records
//               </p>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
//               <Wallet size={22} className="text-green-700" />
//             </div>
//           </div>
//           <div className="absolute bottom-0 left-0 h-1 w-full bg-green-50">
//             <div className="h-full w-1/3 bg-green-600 rounded-r-full" />
//           </div>
//         </div>

//         {/* Credits */}
//         <div className="relative overflow-hidden bg-white border border-green-100 rounded-2xl p-4 shadow-sm">
//           <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-green-50" />

//           <div className="relative flex items-center justify-between gap-3">
//             <div>
//               <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
//                 Total Credits
//               </p>
//               <h3 className="text-2xl sm:text-3xl font-black text-green-700">
//                 ${summary.credit.toFixed(2)}
//               </h3>
//               <p className="text-[10px] text-slate-400 mt-1">
//                 Amount received
//               </p>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
//               <TrendingUp size={22} className="text-green-700" />
//             </div>
//           </div>
//           <div className="absolute bottom-0 left-0 h-1 w-full bg-green-50">
//             <div className="h-full w-1/3 bg-green-600 rounded-r-full" />
//           </div>
//         </div>

//         {/* Debits */}
//         <div className="relative overflow-hidden bg-white border border-red-100 rounded-2xl p-4 shadow-sm">
//           <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-red-50" />

//           <div className="relative flex items-center justify-between gap-3">
//             <div>
//               <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
//                 Total Debits
//               </p>
//               <h3 className="text-2xl sm:text-3xl font-black text-red-600">
//                 ${summary.debit.toFixed(2)}
//               </h3>
//               <p className="text-[10px] text-slate-400 mt-1">
//                 Amount deducted
//               </p>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
//               <TrendingDown size={22} className="text-red-500" />
//             </div>
//           </div>
//           <div className="absolute bottom-0 left-0 h-1 w-full bg-red-50">
//             <div className="h-full w-1/3 bg-red-400 rounded-r-full" />
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-4 shadow-sm">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
//           <div className="relative w-full lg:max-w-md">
//             <Search
//               size={17}
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               placeholder="Search type, user ID, description..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
//             />

//             {search && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearch("");
//                   setCurrentPage(1);
//                 }}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
//                 aria-label="Clear search"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
//             <div className="relative">
//               <ListFilter
//                 size={15}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none"
//               />
//               <select
//                 value={filterType}
//                 onChange={(e) => {
//                   setFilterType(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full sm:w-auto h-11 pl-9 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600 appearance-none cursor-pointer"
//               >
//                 <option value="all">All Types</option>
//                 <option value="credit">Credits Only</option>
//                 <option value="debit">Debits Only</option>
//               </select>
//             </div>

//             <select
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600 cursor-pointer"
//               aria-label="Rows per page"
//             >
//               <option value={10}>10 Rows</option>
//               <option value={20}>20 Rows</option>
//               <option value={50}>50 Rows</option>
//               <option value={100}>100 Rows</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-green-500" />
//             <span className="text-[10px] sm:text-xs font-bold text-slate-500">
//               {filtered.length} Records Found
//             </span>
//           </div>

//           {hasActiveFilters && (
//             <button
//               type="button"
//               onClick={clearFilters}
//               className="flex items-center gap-1.5 text-[10px] font-extrabold text-green-700 hover:text-green-900"
//             >
//               <X size={13} />
//               Clear Filters
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Transaction Table */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-100">
//           <div>
//             <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
//               Transaction Records
//             </h3>
//             <p className="text-[10px] text-slate-400 mt-0.5">
//               Complete account transaction details
//             </p>
//           </div>

//           <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
//             <FileText size={18} className="text-green-700" />
//           </div>
//         </div>

//         {/* Desktop Table */}
//         <div className="transaction-desktop overflow-x-auto transaction-scroll">
//           <table className="w-full text-sm text-left whitespace-nowrap">
//             <thead className="bg-[#f6f9f3] border-b border-green-100">
//               <tr>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center w-14">
//                   Sr.
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
//                   Date & Time
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
//                   Transaction Type
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-right">
//                   Amount
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
//                   From User
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
//                   To User
//                 </th>
//                 <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
//                   Description
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="py-14 text-center">
//                     <RefreshCw
//                       size={25}
//                       className="animate-spin text-green-600 mx-auto mb-3"
//                     />
//                     <p className="text-xs font-bold text-slate-500">
//                       Loading transactions...
//                     </p>
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="7" className="py-14 text-center">
//                     <p className="text-sm font-bold text-red-600">{error}</p>
//                     <button
//                       type="button"
//                       onClick={fetchTransactions}
//                       className="mt-3 text-xs font-bold text-green-700 hover:underline"
//                     >
//                       Try Again
//                     </button>
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="py-14 text-center">
//                     <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
//                       <Receipt size={22} className="text-slate-400" />
//                     </div>
//                     <p className="text-sm font-bold text-slate-600">
//                       No transaction records found
//                     </p>
//                     <p className="text-xs text-slate-400 mt-1">
//                       Try changing your search or filters.
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((txn, idx) => {
//                   const date = formatDate(txn.createdAt || txn.date);
//                   const { display, direction } = getTransactionAmount(txn);
//                   const type = txn.type?.toLowerCase() || "";

//                   const amountIcon =
//                     direction === "credit" ? (
//                       <ArrowDownLeft size={14} />
//                     ) : direction === "debit" ? (
//                       <ArrowUpRight size={14} />
//                     ) : (
//                       <ArrowRightLeft size={14} />
//                     );

//                   const amountColor =
//                     direction === "credit"
//                       ? "text-green-700"
//                       : direction === "debit"
//                         ? "text-red-600"
//                         : "text-slate-700";

//                   return (
//                     <tr
//                       key={txn._id || idx}
//                       className="transaction-row border-b border-slate-100 last:border-0"
//                     >
//                       <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
//                         {indexOfFirst + idx + 1}
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex flex-col">
//                           <span className="text-xs font-bold text-slate-700">
//                             {date.date}
//                           </span>
//                           <span className="text-[10px] text-slate-400 mt-1">
//                             {date.time}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-50 border border-green-100 text-[10px] font-extrabold uppercase tracking-wide text-green-800">
//                           {type === "transfer" ? (
//                             <ArrowRightLeft size={12} />
//                           ) : direction === "credit" ? (
//                             <ArrowDownLeft size={12} />
//                           ) : direction === "debit" ? (
//                             <ArrowUpRight size={12} />
//                           ) : (
//                             <FileText size={12} />
//                           )}
//                           {getTypeLabel(txn.type)}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4 text-right">
//                         <span
//                           className={`inline-flex items-center justify-end gap-1 text-sm font-extrabold ${amountColor}`}
//                         >
//                           {amountIcon}
//                           {display}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         {txn.fromUserId ? (
//                           <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
//                             {String(txn.fromUserId) === userId
//                               ? "Self"
//                               : txn.fromUserId}
//                           </span>
//                         ) : (
//                           <span className="text-xs text-slate-400">-</span>
//                         )}
//                       </td>

//                       <td className="px-4 py-4">
//                         {txn.toUserId ? (
//                           <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
//                             {String(txn.toUserId) === userId
//                               ? "Self"
//                               : txn.toUserId}
//                           </span>
//                         ) : (
//                           <span className="text-xs text-slate-400">-</span>
//                         )}
//                       </td>

//                       <td
//                         className="px-4 py-4 text-xs font-medium text-slate-600 max-w-[220px] truncate"
//                         title={formatDescription(txn.description)}
//                       >
//                         {formatDescription(txn.description)}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Transaction Cards */}
//         <div className="transaction-mobile p-3 space-y-2.5">
//           {loading ? (
//             <div className="py-12 text-center">
//               <RefreshCw
//                 size={25}
//                 className="animate-spin text-green-600 mx-auto mb-3"
//               />
//               <p className="text-xs font-bold text-slate-500">
//                 Loading transactions...
//               </p>
//             </div>
//           ) : error ? (
//             <div className="py-10 text-center">
//               <p className="text-sm font-bold text-red-600">{error}</p>
//               <button
//                 type="button"
//                 onClick={fetchTransactions}
//                 className="mt-3 text-xs font-bold text-green-700 hover:underline"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : paginated.length === 0 ? (
//             <div className="py-12 text-center">
//               <Receipt size={24} className="text-slate-400 mx-auto mb-3" />
//               <p className="text-sm font-bold text-slate-600">
//                 No transaction records found
//               </p>
//               <p className="text-xs text-slate-400 mt-1">
//                 Try changing your search or filters.
//               </p>
//             </div>
//           ) : (
//             paginated.map((txn, idx) => {
//               const date = formatDate(txn.createdAt || txn.date);
//               const { display, direction } = getTransactionAmount(txn);

//               const amountColor =
//                 direction === "credit"
//                   ? "text-green-700"
//                   : direction === "debit"
//                     ? "text-red-600"
//                     : "text-slate-700";

//               return (
//                 <div
//                   key={txn._id || idx}
//                   className="border border-slate-200 rounded-xl p-3.5 bg-white"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-2.5 min-w-0">
//                       <div
//                         className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
//                           direction === "credit"
//                             ? "bg-green-50 text-green-700"
//                             : direction === "debit"
//                               ? "bg-red-50 text-red-500"
//                               : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         {direction === "credit" ? (
//                           <ArrowDownLeft size={18} />
//                         ) : direction === "debit" ? (
//                           <ArrowUpRight size={18} />
//                         ) : (
//                           <ArrowRightLeft size={18} />
//                         )}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="text-xs font-extrabold text-slate-800 break-words">
//                           {getTypeLabel(txn.type)}
//                         </p>
//                         <p className="text-[10px] text-slate-400 mt-1">
//                           Transaction #{indexOfFirst + idx + 1}
//                         </p>
//                       </div>
//                     </div>

//                     <span
//                       className={`text-sm font-extrabold shrink-0 ${amountColor}`}
//                     >
//                       {display}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
//                     <div className="min-w-0">
//                       <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
//                         From User
//                       </p>
//                       <p className="text-[11px] font-bold text-slate-700 truncate">
//                         {txn.fromUserId
//                           ? String(txn.fromUserId) === userId
//                             ? "Self"
//                             : txn.fromUserId
//                           : "-"}
//                       </p>
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
//                         To User
//                       </p>
//                       <p className="text-[11px] font-bold text-slate-700 truncate">
//                         {txn.toUserId
//                           ? String(txn.toUserId) === userId
//                             ? "Self"
//                             : txn.toUserId
//                           : "-"}
//                       </p>
//                     </div>
//                   </div>

//                   {txn.description && (
//                     <div className="mt-3 pt-2.5 border-t border-slate-100">
//                       <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
//                         Description
//                       </p>
//                       <p className="text-[11px] font-medium text-slate-600 break-words">
//                         {formatDescription(txn.description)}
//                       </p>
//                     </div>
//                   )}

//                   <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
//                     <CalendarDays size={12} className="text-green-700" />
//                     <span>{date.date}</span>
//                     <span className="text-slate-300">•</span>
//                     <span>{date.time}</span>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && !error && filtered.length > 0 && (
//           <div className="px-3 sm:px-5 py-3.5 border-t border-slate-100 bg-[#fbfcfa] flex flex-col sm:flex-row items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
//                 Showing
//               </span>
//               <span className="text-xs font-extrabold text-slate-800">
//                 {indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)}
//               </span>
//               <span className="text-[10px] text-slate-400">
//                 of {filtered.length}
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//                 className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//                 aria-label="Previous page"
//               >
//                 <ChevronLeft size={18} />
//               </button>

//               <span className="min-w-[76px] text-center px-3 py-2 rounded-xl bg-green-50 border border-green-100 text-xs font-extrabold text-green-800">
//                 {currentPage} / {totalPages}
//               </span>

//               <button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//                 className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//                 aria-label="Next page"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Note */}
//       <div className="mt-3 flex items-start gap-2 px-1">
//         <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
//         <p className="text-[10px] text-slate-400 leading-relaxed">
//           Transaction details are displayed according to the available account records.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetails;






import React, { useEffect, useMemo, useState, useCallback } from "react";

import api from "../../api/axios";

import { getUserId } from "../../utils/authUtils";

import {

  Search,

  ChevronLeft,

  ChevronRight,

  FileText,

  ArrowDownLeft,

  ArrowUpRight,

  ArrowRightLeft,

  ListFilter,

  Wallet,

  TrendingUp,

  TrendingDown,

  CalendarDays,

  RefreshCw,

  X,

  Activity,

  Receipt,

} from "lucide-react";



const TransactionDetails = () => {

  const userId = String(getUserId() || "");



  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const fetchTransactions = useCallback(async () => {

    if (!userId || userId === "undefined" || userId === "null") {

      setTransactions([]);

      setLoading(false);

      return;

    }



    try {

      setLoading(true);

      setError("");



      const res = await api.get(

        `/transaction/transactions/${userId}?t=${new Date().getTime()}`

      );



      let sorted = Array.isArray(res.data) ? [...res.data] : [];



      sorted.sort(

        (a, b) =>

          new Date(b.createdAt || b.date).getTime() -

          new Date(a.createdAt || a.date).getTime()

      );



      // Preserve the existing ledger exclusion rules

      sorted = sorted.filter((txn) => {

        const tType = (txn.type || "").toLowerCase();

        const tSource = (txn.source || "").toLowerCase();

        const tDesc = (txn.description || "").toLowerCase();



        const tUserId = String(txn.userId);

        const tFrom = String(txn.fromUserId);

        const tTo = String(txn.toUserId);

        const me = userId;



        // Exclude Instant Leader Bonus entries

        if (

          tSource === "instant_leader_bonus" ||

          tDesc.includes("instant leader bonus") ||

          tDesc.includes("instant bonus")

        ) {

          return false;

        }



        // Exclude promotional top-ups

        if (

          tType === "topup" &&

          txn.description?.toUpperCase().includes("PROMOTION")

        ) {

          return false;

        }



        // Transactions explicitly belonging to this user's ledger

        if (tUserId === me) {

          return true;

        }



        // Transfers and top-ups involving this user

        if (tType === "transfer" || tType === "topup") {

          if (tFrom === me || tTo === me) return true;

        }



        return false;

      });



      setTransactions(sorted);

    } catch (err) {

      console.error("Failed to fetch transactions", err);

      setTransactions([]);

      setError(

        err.response?.data?.message ||

          "Unable to load transaction history. Please try again."

      );

    } finally {

      setLoading(false);

    }

  }, [userId]);



  useEffect(() => {

    fetchTransactions();

  }, [fetchTransactions]);



  const isCreditType = (type = "") =>

    [

      "deposit",

      "credit_to_wallet",

      "roi_income",

      "referral_income",

      "topup_income",

      "binary",

      "spin_income",

      "level_income",

      "direct_income",

      "plan_income",

      "transfer",

      "reward_income",

      "fast_track",

    ].includes(type.toLowerCase());



  const isDebitType = (type = "") =>

    ["withdrawal", "buy_spin", "topup", "transfer"].includes(

      type.toLowerCase()

    );



  const getAmount = (txn) => {

    let amount = 0;



    if (

      txn.amount &&

      typeof txn.amount === "object" &&

      txn.amount.$numberDecimal

    ) {

      amount = parseFloat(txn.amount.$numberDecimal);

    } else if (txn.amount !== undefined && txn.amount !== null) {

      amount = parseFloat(txn.amount);

    } else {

      amount = parseFloat(txn.grossAmount || 0);

    }



    return Number.isFinite(amount) ? amount : 0;

  };



  const getTransactionAmount = (txn) => {

    const type = txn.type?.toLowerCase() || "";

    const amount = getAmount(txn);



    let direction = "neutral";



    if (type === "transfer" || type === "topup") {

      if (

        String(txn.toUserId) === userId ||

        String(txn.userId) === userId

      ) {

        if (

          type === "topup" &&

          String(txn.userId) === userId &&

          String(txn.fromUserId) !== userId

        ) {

          direction = "credit";

        } else if (type === "transfer" && String(txn.toUserId) === userId) {

          direction = "credit";

        } else {

          direction = "debit";

        }

      } else if (String(txn.fromUserId) === userId) {

        direction = "debit";

      }

    } else if (isCreditType(type)) {

      direction = "credit";

    } else if (isDebitType(type)) {

      direction = "debit";

    }



    const display =

      direction === "credit"

        ? `+$${Math.abs(amount).toFixed(2)}`

        : direction === "debit"

          ? `-$${Math.abs(amount).toFixed(2)}`

          : `$${Math.abs(amount).toFixed(2)}`;



    return { amount, direction, display };

  };



  const formatDescription = (description) => {
    if (!description) return "-";

    return String(description)
      .replace(/\bleader\s+fund\s+wallet\b/gi, "")
      .replace(/\bshowcase\b/gi, "")
      .replace(/\bleader\b/gi, "")
      .replace(/leader settlement:?\s*/gi, "")
      .replace(/(singel|single)\s?leg/gi, "Community Income")
      .replace(/pool/gi, "Community Income")
      .replace(/unlocked/gi, "")
      .replace(/\s+/g, " ")
      .trim() || "-";
  };


  const formatDate = (value) => {

    const date = new Date(value);



    if (!value || Number.isNaN(date.getTime())) {

      return { date: "-", time: "-" };

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



  const getTypeLabel = (type = "") => {
    const normalizedType = String(type).toLowerCase().replace(/[\s-]+/g, "_").trim();
    if (normalizedType === "manual_credit") return "Depositor";
    return normalizedType.replace(/_/g, " ").replace(/\s+/g, " ").trim() || "Transaction";
  };


  // Search and filter

  const filtered = useMemo(() => {

    let result = [...transactions];



    if (search.trim()) {

      const value = search.toLowerCase().trim();



      result = result.filter(

        (txn) =>

          txn.type?.toLowerCase().includes(value) ||

          txn.description?.toLowerCase().includes(value) ||

          String(txn.fromUserId || "").toLowerCase().includes(value) ||

          String(txn.toUserId || "").toLowerCase().includes(value)

      );

    }



    if (filterType === "credit") {

      result = result.filter(

        (txn) =>

          isCreditType(txn.type) &&

          String(txn.fromUserId) !== userId

      );

    } else if (filterType === "debit") {

      result = result.filter(

        (txn) =>

          isDebitType(txn.type) &&

          String(txn.toUserId) !== userId

      );

    }



    return result;

  }, [search, filterType, transactions, userId]);



  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

  const indexOfLast = currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginated = filtered.slice(indexOfFirst, indexOfLast);



  // Summary totals use the same transaction direction logic as the ledger.

  const summary = useMemo(() => {

    let credit = 0;

    let debit = 0;



    transactions.forEach((txn) => {

      const { amount, direction } = getTransactionAmount(txn);



      if (direction === "credit") credit += Math.abs(amount);

      if (direction === "debit") debit += Math.abs(amount);

    });



    return {

      total: transactions.length,

      credit,

      debit,

    };

  }, [transactions]);



  const handlePrev = () => {

    setCurrentPage((prev) => Math.max(1, prev - 1));

  };



  const handleNext = () => {

    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  };



  const clearFilters = () => {

    setSearch("");

    setFilterType("all");

    setCurrentPage(1);

  };



  const hasActiveFilters = search.trim() !== "" || filterType !== "all";



  return (

    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">

      <style>{`

        .transaction-scroll::-webkit-scrollbar {

          height: 6px;

          width: 6px;

        }



        .transaction-scroll::-webkit-scrollbar-track {

          background: #f1f5f9;

          border-radius: 20px;

        }



        .transaction-scroll::-webkit-scrollbar-thumb {

          background: #b8c99c;

          border-radius: 20px;

        }



        .transaction-scroll::-webkit-scrollbar-thumb:hover {

          background: #78964c;

        }



        .transaction-row {

          transition: background .2s ease;

        }



        .transaction-row:hover {

          background: #f6faf3;

        }



        @media (max-width: 640px) {

          .transaction-mobile { display: block; }

          .transaction-desktop { display: none; }

        }



        @media (min-width: 641px) {

          .transaction-mobile { display: none; }

          .transaction-desktop { display: block; }

        }

      `}</style>



      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-green-800 to-green-500 flex items-center justify-center shadow-lg shadow-green-900/15 shrink-0">

            <Receipt size={23} className="text-white" />

          </div>



          <div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">

              All Transactions

            </h2>



            <div className="flex items-center gap-2 mt-1">

              <span className="w-5 h-[2px] bg-yellow-500 rounded-full" />

              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[1.5px] text-slate-500">

                Transaction History

              </span>

            </div>

          </div>

        </div>



        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-green-50 border border-green-100 w-fit">

          <Activity size={15} className="text-green-700" />

          <span className="text-[10px] sm:text-xs font-extrabold text-green-800 uppercase tracking-wider">

            Account Activity

          </span>

        </div>

      </div>



      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

        {/* Total */}

        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

          <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-green-50" />



          <div className="relative flex items-center justify-between gap-3">

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">

                Total Transactions

              </p>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">

                {summary.total}

              </h3>

              <p className="text-[10px] text-slate-400 mt-1">

                Account records

              </p>

            </div>



            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">

              <Wallet size={22} className="text-green-700" />

            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-green-50">

            <div className="h-full w-1/3 bg-green-600 rounded-r-full" />

          </div>

        </div>



        {/* Credits */}

        <div className="relative overflow-hidden bg-white border border-green-100 rounded-2xl p-4 shadow-sm">

          <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-green-50" />



          <div className="relative flex items-center justify-between gap-3">

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">

                Total Credits

              </p>

              <h3 className="text-2xl sm:text-3xl font-black text-green-700">

                ${summary.credit.toFixed(2)}

              </h3>

              <p className="text-[10px] text-slate-400 mt-1">

                Amount received

              </p>

            </div>



            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">

              <TrendingUp size={22} className="text-green-700" />

            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-green-50">

            <div className="h-full w-1/3 bg-green-600 rounded-r-full" />

          </div>

        </div>



        {/* Debits */}

        <div className="relative overflow-hidden bg-white border border-red-100 rounded-2xl p-4 shadow-sm">

          <div className="absolute -right-6 -top-7 w-24 h-24 rounded-full bg-red-50" />



          <div className="relative flex items-center justify-between gap-3">

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">

                Total Debits

              </p>

              <h3 className="text-2xl sm:text-3xl font-black text-red-600">

                ${summary.debit.toFixed(2)}

              </h3>

              <p className="text-[10px] text-slate-400 mt-1">

                Amount deducted

              </p>

            </div>



            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">

              <TrendingDown size={22} className="text-red-500" />

            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-red-50">

            <div className="h-full w-1/3 bg-red-400 rounded-r-full" />

          </div>

        </div>

      </div>



      {/* Filters */}

      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-4 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">

          <div className="relative w-full lg:max-w-md">

            <Search

              size={17}

              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"

            />



            <input

              type="text"

              placeholder="Search type, user ID, description..."

              value={search}

              onChange={(e) => {

                setSearch(e.target.value);

                setCurrentPage(1);

              }}

              className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10"

            />



            {search && (

              <button

                type="button"

                onClick={() => {

                  setSearch("");

                  setCurrentPage(1);

                }}

                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"

                aria-label="Clear search"

              >

                <X size={16} />

              </button>

            )}

          </div>



          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">

            <div className="relative">

              <ListFilter

                size={15}

                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none"

              />

              <select

                value={filterType}

                onChange={(e) => {

                  setFilterType(e.target.value);

                  setCurrentPage(1);

                }}

                className="w-full sm:w-auto h-11 pl-9 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600 appearance-none cursor-pointer"

              >

                <option value="all">All Types</option>

                <option value="credit">Credits Only</option>

                <option value="debit">Debits Only</option>

              </select>

            </div>



            <select

              value={itemsPerPage}

              onChange={(e) => {

                setItemsPerPage(Number(e.target.value));

                setCurrentPage(1);

              }}

              className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600 cursor-pointer"

              aria-label="Rows per page"

            >

              <option value={10}>10 Rows</option>

              <option value={20}>20 Rows</option>

              <option value={50}>50 Rows</option>

              <option value={100}>100 Rows</option>

            </select>

          </div>

        </div>



        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-green-500" />

            <span className="text-[10px] sm:text-xs font-bold text-slate-500">

              {filtered.length} Records Found

            </span>

          </div>



          {hasActiveFilters && (

            <button

              type="button"

              onClick={clearFilters}

              className="flex items-center gap-1.5 text-[10px] font-extrabold text-green-700 hover:text-green-900"

            >

              <X size={13} />

              Clear Filters

            </button>

          )}

        </div>

      </div>



      {/* Transaction Table */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-100">

          <div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">

              Transaction Records

            </h3>

            <p className="text-[10px] text-slate-400 mt-0.5">

              Complete account transaction details

            </p>

          </div>



          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">

            <FileText size={18} className="text-green-700" />

          </div>

        </div>



        {/* Desktop Table */}

        <div className="transaction-desktop overflow-x-auto transaction-scroll">

          <table className="w-full text-sm text-left whitespace-nowrap">

            <thead className="bg-[#f6f9f3] border-b border-green-100">

              <tr>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center w-14">

                  Sr.

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">

                  Date & Time

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">

                  Transaction Type

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-right">

                  Amount

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">

                  From User

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">

                  To User

                </th>

                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">

                  Description

                </th>

              </tr>

            </thead>



            <tbody>

              {loading ? (

                <tr>

                  <td colSpan="7" className="py-14 text-center">

                    <RefreshCw

                      size={25}

                      className="animate-spin text-green-600 mx-auto mb-3"

                    />

                    <p className="text-xs font-bold text-slate-500">

                      Loading transactions...

                    </p>

                  </td>

                </tr>

              ) : error ? (

                <tr>

                  <td colSpan="7" className="py-14 text-center">

                    <p className="text-sm font-bold text-red-600">{error}</p>

                    <button

                      type="button"

                      onClick={fetchTransactions}

                      className="mt-3 text-xs font-bold text-green-700 hover:underline"

                    >

                      Try Again

                    </button>

                  </td>

                </tr>

              ) : paginated.length === 0 ? (

                <tr>

                  <td colSpan="7" className="py-14 text-center">

                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">

                      <Receipt size={22} className="text-slate-400" />

                    </div>

                    <p className="text-sm font-bold text-slate-600">

                      No transaction records found

                    </p>

                    <p className="text-xs text-slate-400 mt-1">

                      Try changing your search or filters.

                    </p>

                  </td>

                </tr>

              ) : (

                paginated.map((txn, idx) => {

                  const date = formatDate(txn.createdAt || txn.date);

                  const { display, direction } = getTransactionAmount(txn);

                  const type = txn.type?.toLowerCase() || "";



                  const amountIcon =

                    direction === "credit" ? (

                      <ArrowDownLeft size={14} />

                    ) : direction === "debit" ? (

                      <ArrowUpRight size={14} />

                    ) : (

                      <ArrowRightLeft size={14} />

                    );



                  const amountColor =

                    direction === "credit"

                      ? "text-green-700"

                      : direction === "debit"

                        ? "text-red-600"

                        : "text-slate-700";



                  return (

                    <tr

                      key={txn._id || idx}

                      className="transaction-row border-b border-slate-100 last:border-0"

                    >

                      <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">

                        {indexOfFirst + idx + 1}

                      </td>



                      <td className="px-4 py-4">

                        <div className="flex flex-col">

                          <span className="text-xs font-bold text-slate-700">

                            {date.date}

                          </span>

                          <span className="text-[10px] text-slate-400 mt-1">

                            {date.time}

                          </span>

                        </div>

                      </td>



                      <td className="px-4 py-4">

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-50 border border-green-100 text-[10px] font-extrabold uppercase tracking-wide text-green-800">

                          {type === "transfer" ? (

                            <ArrowRightLeft size={12} />

                          ) : direction === "credit" ? (

                            <ArrowDownLeft size={12} />

                          ) : direction === "debit" ? (

                            <ArrowUpRight size={12} />

                          ) : (

                            <FileText size={12} />

                          )}

                          {getTypeLabel(txn.type)}

                        </span>

                      </td>



                      <td className="px-4 py-4 text-right">

                        <span

                          className={`inline-flex items-center justify-end gap-1 text-sm font-extrabold ${amountColor}`}

                        >

                          {amountIcon}

                          {display}

                        </span>

                      </td>



                      <td className="px-4 py-4">

                        {txn.fromUserId ? (

                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">

                            {String(txn.fromUserId) === userId

                              ? "Self"

                              : txn.fromUserId}

                          </span>

                        ) : (

                          <span className="text-xs text-slate-400">-</span>

                        )}

                      </td>



                      <td className="px-4 py-4">

                        {txn.toUserId ? (

                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">

                            {String(txn.toUserId) === userId

                              ? "Self"

                              : txn.toUserId}

                          </span>

                        ) : (

                          <span className="text-xs text-slate-400">-</span>

                        )}

                      </td>



                      <td

                        className="px-4 py-4 text-xs font-medium text-slate-600 max-w-[220px] truncate"

                        title={formatDescription(txn.description)}

                      >

                        {formatDescription(txn.description)}

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>



        {/* Mobile Transaction Cards */}

        <div className="transaction-mobile p-3 space-y-2.5">

          {loading ? (

            <div className="py-12 text-center">

              <RefreshCw

                size={25}

                className="animate-spin text-green-600 mx-auto mb-3"

              />

              <p className="text-xs font-bold text-slate-500">

                Loading transactions...

              </p>

            </div>

          ) : error ? (

            <div className="py-10 text-center">

              <p className="text-sm font-bold text-red-600">{error}</p>

              <button

                type="button"

                onClick={fetchTransactions}

                className="mt-3 text-xs font-bold text-green-700 hover:underline"

              >

                Try Again

              </button>

            </div>

          ) : paginated.length === 0 ? (

            <div className="py-12 text-center">

              <Receipt size={24} className="text-slate-400 mx-auto mb-3" />

              <p className="text-sm font-bold text-slate-600">

                No transaction records found

              </p>

              <p className="text-xs text-slate-400 mt-1">

                Try changing your search or filters.

              </p>

            </div>

          ) : (

            paginated.map((txn, idx) => {

              const date = formatDate(txn.createdAt || txn.date);

              const { display, direction } = getTransactionAmount(txn);



              const amountColor =

                direction === "credit"

                  ? "text-green-700"

                  : direction === "debit"

                    ? "text-red-600"

                    : "text-slate-700";



              return (

                <div

                  key={txn._id || idx}

                  className="border border-slate-200 rounded-xl p-3.5 bg-white"

                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-2.5 min-w-0">

                      <div

                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${

                          direction === "credit"

                            ? "bg-green-50 text-green-700"

                            : direction === "debit"

                              ? "bg-red-50 text-red-500"

                              : "bg-slate-100 text-slate-600"

                        }`}

                      >

                        {direction === "credit" ? (

                          <ArrowDownLeft size={18} />

                        ) : direction === "debit" ? (

                          <ArrowUpRight size={18} />

                        ) : (

                          <ArrowRightLeft size={18} />

                        )}

                      </div>



                      <div className="min-w-0">

                        <p className="text-xs font-extrabold text-slate-800 break-words">

                          {getTypeLabel(txn.type)}

                        </p>

                        <p className="text-[10px] text-slate-400 mt-1">

                          Transaction #{indexOfFirst + idx + 1}

                        </p>

                      </div>

                    </div>



                    <span

                      className={`text-sm font-extrabold shrink-0 ${amountColor}`}

                    >

                      {display}

                    </span>

                  </div>



                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">

                    <div className="min-w-0">

                      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">

                        From User

                      </p>

                      <p className="text-[11px] font-bold text-slate-700 truncate">

                        {txn.fromUserId

                          ? String(txn.fromUserId) === userId

                            ? "Self"

                            : txn.fromUserId

                          : "-"}

                      </p>

                    </div>



                    <div className="min-w-0">

                      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">

                        To User

                      </p>

                      <p className="text-[11px] font-bold text-slate-700 truncate">

                        {txn.toUserId

                          ? String(txn.toUserId) === userId

                            ? "Self"

                            : txn.toUserId

                          : "-"}

                      </p>

                    </div>

                  </div>



                  {txn.description && (

                    <div className="mt-3 pt-2.5 border-t border-slate-100">

                      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">

                        Description

                      </p>

                      <p className="text-[11px] font-medium text-slate-600 break-words">

                        {formatDescription(txn.description)}

                      </p>

                    </div>

                  )}



                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">

                    <CalendarDays size={12} className="text-green-700" />

                    <span>{date.date}</span>

                    <span className="text-slate-300">•</span>

                    <span>{date.time}</span>

                  </div>

                </div>

              );

            })

          )}

        </div>



        {/* Pagination */}

        {!loading && !error && filtered.length > 0 && (

          <div className="px-3 sm:px-5 py-3.5 border-t border-slate-100 bg-[#fbfcfa] flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">

                Showing

              </span>

              <span className="text-xs font-extrabold text-slate-800">

                {indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)}

              </span>

              <span className="text-[10px] text-slate-400">

                of {filtered.length}

              </span>

            </div>



            <div className="flex items-center gap-2">

              <button

                type="button"

                onClick={handlePrev}

                disabled={currentPage === 1}

                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"

                aria-label="Previous page"

              >

                <ChevronLeft size={18} />

              </button>



              <span className="min-w-[76px] text-center px-3 py-2 rounded-xl bg-green-50 border border-green-100 text-xs font-extrabold text-green-800">

                {currentPage} / {totalPages}

              </span>



              <button

                type="button"

                onClick={handleNext}

                disabled={currentPage === totalPages}

                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"

                aria-label="Next page"

              >

                <ChevronRight size={18} />

              </button>

            </div>

          </div>

        )}

      </div>



      {/* Footer Note */}

      <div className="mt-3 flex items-start gap-2 px-1">

        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />

        <p className="text-[10px] text-slate-400 leading-relaxed">

          Transaction details are displayed according to the available account records.

        </p>

      </div>

    </div>

  );

};



export default TransactionDetails;
