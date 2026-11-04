// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import { Search, ChevronLeft, ChevronRight, Wallet, ArrowDownLeft, AlertCircle, ArrowRightLeft } from "lucide-react";

// const CreditToWalletHistory = () => {
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   // 🔥 SMART FORMATTER: Ab pool1, pool_1, pool 1 sabko handle karega
//   const formatSource = (src) => {
//     if (!src) return "-";
//     const s = src.toLowerCase().trim();
    
//     // Regex jo kisi bhi format (pool1, pool_1, pool 1, pool-1) ko pakad lega
//     const poolMatch = s.match(/^pool[_\-\s]*(\d+)$/);
//     if (poolMatch) {
//       return `Community Level ${poolMatch[1]}`;
//     }
    
//     if (s === "pool") return "Community Income";
//     if (s === "direct") return "Direct Income";
//     if (s === "level") return "Level Income";
//     if (s === "reward") return "Team Reward";
    
//     return src;
//   };

//   useEffect(() => {
//     if (!userId) {
//       setErrorMessage("User ID not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     api.get(`/wallet/history/${userId}?t=${new Date().getTime()}`)
//       .then((res) => {
//         const rawData = res.data.history ? res.data.history : (Array.isArray(res.data) ? res.data : []);

//         const creditTxs = rawData
//           .filter(
//             (tx) =>
//               tx.type === "credit_to_wallet" || tx.type === "binary_income" || tx.type === "credit"
//           )
//           .filter(tx => {
//             const desc = (tx.description || "").toLowerCase();
//             const source = (tx.source || "").toLowerCase();
            
//             // 🔥 ULTIMATE FILTER
//             if (
//               source === "system" || 
//               source === "pool" ||                 // Block Daily Cron Income
//               source === "instant_leader_bonus" ||   // Block 10% Instant Bonus
//               source === "admin_bonus"    // Block 10% Instant Bonus
//             ) {
//               return false;
//             }

//             if (
//               desc.includes("single leg") ||
//               desc.includes("singel leg") ||
//               desc.includes("auto-pool") ||
//               desc.includes("unlocked") ||
//               desc.includes("community income") ||  
//               desc.includes("instant leader bonus") || 
//               desc.includes("instant bonus")        
//             ) {
//               return false;
//             }

//             return true; 
//           })
//           .map(tx => ({
//             ...tx,
//             // ✅ Format source properly applying smart function
//             source: formatSource(tx.source),
//           }))
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         setTransactions(creditTxs);
//         setFiltered(creditTxs);
//         setErrorMessage(""); 
//       })
//       .catch((err) => {
//         console.error("Failed to fetch wallet transactions", err);
//         setErrorMessage(
//           err.response?.data?.message || "Failed to load history. Please try again later."
//         );
//         setTransactions([]);
//         setFiltered([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);
//     setCurrentPage(1);
//     if (!value) return setFiltered(transactions);
//     const result = transactions.filter(
//       (txn) =>
//         txn.source?.toLowerCase().includes(value) ||
//         String(txn.userId).includes(value) ||
//         txn.type.toLowerCase().includes(value)
//     );
//     setFiltered(result);
//   };

//   // 🔥 TOTAL CALCULATOR LOGIC
//   const totalCredit = filtered.reduce((acc, txn) => {
//     let val = 0;
//     if (txn.amount && typeof txn.amount === 'object' && txn.amount.$numberDecimal) {
//       val = parseFloat(txn.amount.$numberDecimal);
//     } else if (txn.amount !== undefined && txn.amount !== null) {
//       val = parseFloat(txn.amount);
//     } else {
//       val = parseFloat(txn.grossAmount || 0);
//     }
//     return acc + (isNaN(val) ? 0 : val);
//   }, 0);

//   const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   return (
//     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
//       `}</style>

//       {/* Header with Total Amount Box */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
//              <Wallet className="text-green-500" size={28} /> Credit To Wallet
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             Track your internal fund credits and binary income
//           </p>
//         </div>

//         {/* 🔥 NEW TOTAL BOX 🔥 */}
//         <div className="bg-white shadow-sm border border-slate-200 px-6 py-3.5 rounded-2xl flex items-center gap-4 min-w-[200px]">
//             <div className="p-2.5 bg-green-50 rounded-xl text-green-500 shrink-0">
//                <Wallet size={24} />
//             </div>
//             <div>
//                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Credited</p>
//                <h3 className="text-xl md:text-2xl font-black text-green-500">+ ${totalCredit.toFixed(2)}</h3>
//             </div>
//         </div>
//       </div>

//       {/* Error Message Box */}
//       {errorMessage && (
//         <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
//            <AlertCircle size={20} className="shrink-0" />
//            <span className="font-bold text-sm tracking-wide">{errorMessage}</span>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by User ID, Source, or Type..."
//              value={search}
//              onChange={handleSearch}
//              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>
//       </div>

//       {/* Table Box */}
//       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden shadow-2xl relative">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[100px] pointer-events-none rounded-full"></div>
        
//         <div className="overflow-x-auto custom-scroll w-full relative z-10">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-green-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black text-center w-16">Sr.</th>
//                 <th className="p-4 font-black text-right">Date & Time</th>
//                 <th className="p-4 font-black">Type</th>
//                 <th className="p-4 font-black">Source</th>
//                 <th className="p-4 font-black text-center">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="text-slate-600">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12">
//                     <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Records...</span>
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12">
//                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">
//                       {errorMessage ? "Could not load data" : "No Transactions Found"}
//                     </span>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((txn, idx) => {
//                   const date = new Date(txn.createdAt || txn.date);
//                   const isBinary = txn.type === "binary_income";
                  
//                   let val = 0;
//                   if (txn.amount && typeof txn.amount === 'object' && txn.amount.$numberDecimal) {
//                     val = parseFloat(txn.amount.$numberDecimal);
//                   } else if (txn.amount !== undefined && txn.amount !== null) {
//                     val = parseFloat(txn.amount);
//                   } else {
//                     val = parseFloat(txn.grossAmount || 0);
//                   }
//                   const validAmount = isNaN(val) ? 0 : val;
                  
//                   return (
//                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors bg-white">
//                       <td className="p-4 font-bold text-gray-500 text-center">
//                         {indexOfFirst + idx + 1}
//                       </td>
//                       <td className="p-4 text-gray-500 font-mono text-[10px] sm:text-xs text-right">
//                         <div className="flex flex-col items-end">
//                            <span className="text-slate-600">{date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
//                            <span>{date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
//                         </div>
//                       </td>
//                       <td className="p-4">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${
//                           isBinary 
//                             ? "bg-purple-100 text-purple-600 border-purple-200" 
//                             : "bg-blue-100 text-blue-600 border-blue-200"
//                         }`}>
//                           {isBinary ? <ArrowRightLeft size={12} /> : <ArrowDownLeft size={12} />}
//                           {isBinary ? "Binary Income" : "Credit"}
//                         </span>
//                       </td>
//                       <td className="p-4 font-bold text-black capitalize">
//                         {txn.source || "-"}
//                       </td>
//                       <td className="p-4 font-black text-center">
//                         <span className="text-green-500 text-base">
//                           + ${validAmount.toFixed(2)}
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {!loading && !errorMessage && filtered.length > 0 && (
//            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
//               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
//                 Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} Entries
//               </span>
//               <div className="flex items-center gap-2">
//                  <button
//                    onClick={handlePrev}
//                    disabled={currentPage === 1}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-slate-100 text-gray-400 cursor-not-allowed border border-slate-200' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-600 border border-slate-200 shadow-sm'}`}
//                  >
//                    <ChevronLeft size={18} />
//                  </button>
//                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
//                     {currentPage} / {totalPages}
//                  </span>
//                  <button
//                    onClick={handleNext}
//                    disabled={currentPage === totalPages}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-slate-100 text-gray-400 cursor-not-allowed border border-slate-200' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-600 border border-slate-200 shadow-sm'}`}
//                  >
//                    <ChevronRight size={18} />
//                  </button>
//               </div>
//            </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreditToWalletHistory;



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Wallet,
  ArrowDownLeft,
  AlertCircle,
  ArrowRightLeft,
  CalendarDays,
  ArrowUpRight,
  RefreshCw,
  FileText,
  X,
} from "lucide-react";

const CreditToWalletHistory = () => {
  const userId = getUserId();

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Format transaction source names
  const formatSource = (src) => {
    if (!src) return "-";

    const s = String(src).toLowerCase().trim();

    // Supports pool1, pool_1, pool 1, pool-1
    const poolMatch = s.match(/^pool[\s_-]?(\d+)$/);

    if (poolMatch) {
      return `Community Level ${poolMatch[1]}`;
    }

    const sourceLabels = {
      pool: "Community Income",
      direct: "Direct Income",
      level: "Level Income",
      reward: "Team Reward",
    };

    return sourceLabels[s] || src;
  };

  // Safely read transaction amount
  const getAmount = (txn) => {
    let value = 0;

    if (
      txn.amount &&
      typeof txn.amount === "object" &&
      txn.amount.$numberDecimal
    ) {
      value = parseFloat(txn.amount.$numberDecimal);
    } else if (txn.amount !== undefined && txn.amount !== null) {
      value = parseFloat(txn.amount);
    } else {
      value = parseFloat(txn.grossAmount || 0);
    }

    return Number.isFinite(value) ? value : 0;
  };

  // Fetch transaction history
  useEffect(() => {
    if (!userId) {
      setErrorMessage("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchHistory = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await api.get(
          `/wallet/history/${userId}?t=${new Date().getTime()}`
        );

        const rawData = res.data.history
          ? res.data.history
          : Array.isArray(res.data)
          ? res.data
          : [];

        const creditTxs = rawData
          .filter(
            (tx) =>
              tx.type === "credit_to_wallet" ||
              tx.type === "binary_income" ||
              tx.type === "credit"
          )
          .filter((tx) => {
            const desc = (tx.description || "").toLowerCase();
            const source = (tx.source || "").toLowerCase();

            // Preserve existing exclusions
            if (
              source === "system" ||
              source === "pool" ||
              source === "instant_leader_bonus" ||
              source === "admin_bonus"
            ) {
              return false;
            }

            if (
              desc.includes("single leg") ||
              desc.includes("singel leg") ||
              desc.includes("auto-pool") ||
              desc.includes("unlocked") ||
              desc.includes("community income") ||
              desc.includes("instant leader bonus") ||
              desc.includes("instant bonus")
            ) {
              return false;
            }

            return true;
          })
          .map((tx) => ({
            ...tx,
            source: formatSource(tx.source),
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.date) -
              new Date(a.createdAt || a.date)
          );

        if (isMounted) {
          setTransactions(creditTxs);
          setFiltered(creditTxs);
        }
      } catch (err) {
        console.error("Failed to fetch wallet transactions", err);

        if (isMounted) {
          setErrorMessage(
            err.response?.data?.message ||
              "Failed to load history. Please try again later."
          );
          setTransactions([]);
          setFiltered([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Search transactions
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearch(value);
    setCurrentPage(1);

    if (!value.trim()) {
      setFiltered(transactions);
      return;
    }

    const result = transactions.filter(
      (txn) =>
        txn.source?.toLowerCase().includes(value) ||
        String(txn.userId || "").toLowerCase().includes(value) ||
        String(txn.type || "").toLowerCase().includes(value)
    );

    setFiltered(result);
  };

  // Total credited amount
  const totalCredit = filtered.reduce(
    (acc, txn) => acc + getAmount(txn),
    0
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const formatDate = (value) => {
    if (!value) return { date: "-", time: "-" };

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
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

  const getTransactionType = (txn) => {
    return txn.type === "binary_income"
      ? "Binary Income"
      : "Credit";
  };

  const clearSearch = () => {
    setSearch("");
    setFiltered(transactions);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">
      <style>{`
        .credit-history-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .credit-history-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }

        .credit-history-scroll::-webkit-scrollbar-thumb {
          background: #b8c99c;
          border-radius: 20px;
        }

        .credit-history-scroll::-webkit-scrollbar-thumb:hover {
          background: #78964c;
        }

        .credit-history-row {
          transition: background 0.2s ease;
        }

        .credit-history-row:hover {
          background: #f6faf3;
        }

        @media (max-width: 640px) {
          .credit-history-mobile {
            display: block;
          }

          .credit-history-desktop {
            display: none;
          }
        }

        @media (min-width: 641px) {
          .credit-history-mobile {
            display: none;
          }

          .credit-history-desktop {
            display: block;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center shadow-lg shadow-green-900/15 shrink-0">
            <Wallet size={23} className="text-white" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Credit To Wallet
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-5 h-[2px] bg-yellow-500 rounded-full" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[1.5px] text-slate-500">
                Transaction History
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-green-800 bg-green-50 border border-green-100 rounded-xl px-3 py-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Wallet Records
        </div>
      </div>

      {/* Total credited card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14532d] via-[#166534] to-[#15803d] p-4 sm:p-5 mb-5 shadow-lg shadow-green-950/10">
        <div className="absolute -right-8 -top-12 w-44 h-44 rounded-full border-[24px] border-white/5" />
        <div className="absolute right-20 -bottom-16 w-40 h-40 rounded-full bg-yellow-400/10 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Wallet size={17} className="text-yellow-300" />
              </div>
              <p className="text-green-100 text-[10px] sm:text-xs font-bold uppercase tracking-[1.5px]">
                Total Credited
              </p>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              + ${totalCredit.toFixed(2)}
            </h3>

            <p className="text-[10px] text-green-100/80 mt-1">
              Based on currently displayed search results
            </p>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
            <ArrowUpRight size={27} className="text-yellow-300" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
          <div className="h-full w-1/3 bg-yellow-400 rounded-r-full" />
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
          <AlertCircle size={19} className="shrink-0 mt-0.5" />
          <span className="font-semibold text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Search and filter bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by User ID, Source, or Type..."
              value={search}
              onChange={handleSearch}
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FileText size={15} className="text-green-700" />
              <span>{filtered.length} Records</span>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600"
              aria-label="Records per page"
            >
              <option value={10}>10 / Page</option>
              <option value={25}>25 / Page</option>
              <option value={50}>50 / Page</option>
              <option value={100}>100 / Page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-100 bg-white">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Wallet Transactions
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              Your credited wallet activity
            </p>
          </div>

          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <CalendarDays size={16} className="text-green-700" />
          </div>
        </div>

        {/* Desktop table */}
        <div className="credit-history-desktop overflow-x-auto credit-history-scroll">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#f6f9f3] border-b border-green-100">
              <tr>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center w-16">
                  Sr.
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Type
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Source
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-14 text-center">
                    <RefreshCw
                      size={25}
                      className="animate-spin text-green-600 mx-auto mb-3"
                    />
                    <p className="text-xs font-bold text-slate-500">
                      Loading records...
                    </p>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-14 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <Wallet size={22} className="text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-600">
                      {errorMessage
                        ? "Could not load data"
                        : "No Transactions Found"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {search
                        ? "Try another search keyword."
                        : "Your wallet credits will appear here."}
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((txn, idx) => {
                  const date = formatDate(txn.createdAt || txn.date);
                  const isBinary = txn.type === "binary_income";
                  const amount = getAmount(txn);

                  return (
                    <tr
                      key={txn._id || idx}
                      className="credit-history-row border-b border-slate-100 last:border-0"
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold border ${
                            isBinary
                              ? "bg-purple-50 text-purple-700 border-purple-100"
                              : "bg-blue-50 text-blue-700 border-blue-100"
                          }`}
                        >
                          {isBinary ? (
                            <ArrowRightLeft size={12} />
                          ) : (
                            <ArrowDownLeft size={12} />
                          )}
                          {getTransactionType(txn)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-slate-700 capitalize">
                          {txn.source || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-sm font-extrabold text-green-700">
                          + ${amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile transaction cards */}
        <div className="credit-history-mobile p-3 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw
                size={25}
                className="animate-spin text-green-600 mx-auto mb-3"
              />
              <p className="text-xs font-bold text-slate-500">
                Loading records...
              </p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Wallet size={22} className="text-slate-400" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                {errorMessage
                  ? "Could not load data"
                  : "No Transactions Found"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {search
                  ? "Try another search keyword."
                  : "Your wallet credits will appear here."}
              </p>
            </div>
          ) : (
            paginated.map((txn, idx) => {
              const date = formatDate(txn.createdAt || txn.date);
              const isBinary = txn.type === "binary_income";
              const amount = getAmount(txn);

              return (
                <div
                  key={txn._id || idx}
                  className="border border-slate-200 rounded-xl p-3.5 bg-white hover:border-green-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isBinary
                            ? "bg-purple-50 text-purple-600"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {isBinary ? (
                          <ArrowRightLeft size={17} />
                        ) : (
                          <ArrowDownLeft size={17} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-slate-800 truncate">
                          {getTransactionType(txn)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 truncate">
                          {txn.source || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-extrabold text-green-700">
                        + ${amount.toFixed(2)}
                      </p>
                      <span className="text-[9px] font-bold text-slate-400">
                        CREDITED
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <CalendarDays size={12} className="text-green-700" />
                      <span>{date.date}</span>
                      <span className="text-slate-300">•</span>
                      <span>{date.time}</span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400">
                      #{indexOfFirst + idx + 1}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {!loading && !errorMessage && filtered.length > 0 && (
          <div className="px-3 sm:px-5 py-3.5 border-t border-slate-100 bg-[#fbfcfa] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center sm:text-left">
              Showing{" "}
              <span className="text-slate-800 font-extrabold">
                {indexOfFirst + 1}
              </span>{" "}
              to{" "}
              <span className="text-slate-800 font-extrabold">
                {Math.min(indexOfLast, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="text-slate-800 font-extrabold">
                {filtered.length}
              </span>{" "}
              entries
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="mt-3 flex items-start gap-2 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Transaction amounts and records are displayed according to the
          available wallet history.
        </p>
      </div>
    </div>
  );
};

export default CreditToWalletHistory;
