// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import { Search, Users, ChevronLeft, ChevronRight, UserCircle } from "lucide-react";

// const LevelIncome = () => {
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     // 🔥 CACHE FIX: URL mein &t=${new Date().getTime()} add kiya hai
//     // type ko direct_income se level_income kar diya
//     api.get(`/transaction/transactions/${userId}?type=level_income&t=${new Date().getTime()}`)
//       .then((res) => {
//         const sorted = (res.data || [])
//           .filter(txn => txn.fromUserId && txn.fromUserId !== userId)
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setTransactions(sorted);
//         setFiltered(sorted);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch level income", err);
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
//         txn.description?.toLowerCase().includes(value) ||
//         String(txn.fromUserId).toLowerCase().includes(value)
//     );
//     setFiltered(result);
//   };

//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const totalIncome = filtered.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
//   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;
//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   return (
//     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       {/* Scrollbar CSS */}
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 uppercase tracking-wide flex items-center gap-3">
//              <Users className="text-blue-500" size={28} /> Level Income
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             Track your earnings from your team levels
//           </p>
//         </div>
//       </div>

//       {/* Filters (Search & Entries) */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-blue-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by User ID or details..."
//              value={search}
//              onChange={handleSearch}
//              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-blue-500 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>
//       </div>

//       {/* Table Box */}
//       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden shadow-2xl relative">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full"></div>
        
//         <div className="overflow-x-auto custom-scroll w-full relative z-10">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-blue-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black text-center">Sr.</th>
//                 <th className="p-4 font-black text-right">Date & Time</th>
//                 <th className="p-4 font-black">From User</th>
//                 <th className="p-4 font-black text-center">Package</th>
//                 <th className="p-4 font-black text-center">Income</th>
//                 <th className="p-4 font-black">Description</th>
//               </tr>
//             </thead>
//             <tbody className="text-slate-600">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10">
//                     <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Records...</span>
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10">
//                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Level Income Records Found</span>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((txn, idx) => {
//                   const date = new Date(txn.createdAt);
                  
//                   // 🔥 PACKAGE FIX: Default to 30 if package is missing or 0
//                   const packageAmount = Number(txn.package) > 0 ? Number(txn.package) : 30;
                  
//                   // 🔥 LEADER TEXT FIX: Remove "(Leader)" from description
//                   const cleanDescription = txn.description 
//                     ? txn.description.replace(/\s*\(Leader\)/gi, "") 
//                     : "Level income";

//                   return (
//                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-white/5 transition-colors bg-white">
                      
//                       {/* Sr No */}
//                       <td className="p-4 font-bold text-gray-500 text-center">
//                         {indexOfFirst + idx + 1}
//                       </td>
//                          {/* Date & Time */}
//                       <td className="p-4 text-gray-500 font-mono text-xs text-right">
//                         <div className="flex flex-col items-end">
//                            <span className="text-slate-600">{date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
//                            <span className="text-[10px]">{date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
//                         </div>
//                       </td>

//                       {/* From User */}
//                       <td className="p-4 font-black text-slate-900 flex items-center gap-2">
//                         <UserCircle className="text-gray-500" size={16} /> {txn.fromUserId || "N/A"}
//                       </td>

//                       {/* Package */}
//                       <td className="p-4 text-center">
//                         <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 py-1 px-2.5 rounded-md text-[10px] font-black tracking-widest">
//                           ${packageAmount.toFixed(2)}
//                         </span>
//                       </td>

//                       {/* Amount */}
//                       <td className="p-4 font-black text-center">
//                         <span className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)] text-base">
//                           + ${Number(txn.amount).toFixed(2)}
//                         </span>
//                       </td>

//                       {/* Description */}
//                       <td className="p-4 text-black text-[11px] md:text-xs font-bold tracking-wide capitalize">
//                         {cleanDescription}
//                       </td>

//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {!loading && filtered.length > 0 && (
//            <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
//               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
//                 Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} Entries
//               </span>
              
//               <div className="flex items-center gap-2">
//                  <button
//                    onClick={handlePrev}
//                    disabled={currentPage === 1}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-blue-500/20 hover:text-blue-500 border border-transparent hover:border-blue-500/30'}`}
//                  >
//                    <ChevronLeft size={18} />
//                  </button>
                 
//                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg">
//                     {currentPage} / {totalPages}
//                  </span>
                 
//                  <button
//                    onClick={handleNext}
//                    disabled={currentPage === totalPages}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-blue-500/20 hover:text-blue-500 border border-transparent hover:border-blue-500/30'}`}
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

// export default LevelIncome;



import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Wallet,
  Package,
  TrendingUp,
  CalendarDays,
  RefreshCw,
  ArrowUpRight,
  FileText,
} from "lucide-react";

const LevelIncome = () => {
  const userId = getUserId();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .get(
        `/transaction/transactions/${userId}?type=level_income&t=${new Date().getTime()}`
      )
      .then((res) => {
        const sorted = (res.data || [])
          .filter((txn) => txn.fromUserId && txn.fromUserId !== userId)
          .sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

        setTransactions(sorted);
      })
      .catch((err) => {
        console.error("Failed to fetch level income", err);
        setTransactions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const filtered = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return transactions;

    return transactions.filter(
      (txn) =>
        txn.description?.toLowerCase().includes(value) ||
        String(txn.fromUserId || "").toLowerCase().includes(value)
    );
  }, [transactions, search]);

  const totalIncome = filtered.reduce(
    (sum, txn) => sum + (Number(txn.amount) || 0),
    0
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / entriesPerPage)
  );

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const formatAmount = (amount) =>
    (Number(amount) || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);

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

  const getPackageAmount = (txn) =>
    Number(txn.package) > 0 ? Number(txn.package) : 30;

  const getDescription = (description) =>
    description
      ? description.replace(/\s*\(Leader\)/gi, "").trim()
      : "Level income";

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const firstEntry = filtered.length ? indexOfFirst + 1 : 0;
  const lastEntry = Math.min(indexOfLast, filtered.length);

  return (
    <div className="level-income-page w-full max-w-7xl mx-auto pb-8">
      <style>{`
        .level-income-page {
          color: #173b2b;
        }

        .level-income-page * {
          box-sizing: border-box;
        }

        .level-income-page .green-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .level-income-page .green-scroll::-webkit-scrollbar-track {
          background: #edf4ef;
        }

        .level-income-page .green-scroll::-webkit-scrollbar-thumb {
          background: #9bbba5;
          border-radius: 20px;
        }

        .level-income-page .green-scroll::-webkit-scrollbar-thumb:hover {
          background: #267348;
        }

        .level-income-page .income-card {
          background: linear-gradient(145deg, #ffffff 0%, #f6faf7 100%);
          border: 1px solid #e0ebe3;
          box-shadow: 0 4px 16px rgba(22, 65, 42, 0.045);
        }

        .level-income-page .table-row:hover {
          background: #f5faf6;
        }

        .level-income-page .page-btn {
          transition: all 0.2s ease;
        }

        .level-income-page .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .level-income-page .mobile-transaction {
          border: 1px solid #e2ece5;
          background: #fff;
          box-shadow: 0 3px 12px rgba(20, 65, 39, 0.04);
        }

        @media (max-width: 640px) {
          .level-income-page .mobile-transaction {
            border-radius: 14px;
          }
        }
      `}</style>

      {/* Header */}
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
              <Users size={25} className="text-[#e8c96f]" />
              Level Income
            </h2>

            <p className="text-green-100/80 text-xs sm:text-sm mt-2">
              Track your earnings from your team levels.
            </p>
          </div>

          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
            <TrendingUp size={27} className="text-[#f0d27c]" />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="income-card rounded-xl p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Level Income
            </p>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Wallet size={16} className="text-green-700" />
            </div>
          </div>

          <p className="mt-3 text-xl sm:text-2xl font-black text-[#17613b] break-all">
            ${formatAmount(totalIncome)}
          </p>

          <p className="text-[10px] text-slate-400 mt-1">
            Based on filtered records
          </p>
        </div>

        <div className="income-card rounded-xl p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Transactions
            </p>
            <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <FileText size={16} className="text-amber-600" />
            </div>
          </div>

          <p className="mt-3 text-xl sm:text-2xl font-black text-slate-800">
            {filtered.length}
          </p>

          <p className="text-[10px] text-slate-400 mt-1">
            Matching records
          </p>
        </div>

        <div className="income-card rounded-xl p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Team Contributors
            </p>
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users size={16} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xl sm:text-2xl font-black text-slate-800">
            {new Set(filtered.map((txn) => txn.fromUserId)).size}
          </p>

          <p className="text-[10px] text-slate-400 mt-1">
            Unique contributing users
          </p>
        </div>
      </div>

      {/* Search and Entries */}
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
              onChange={handleSearch}
              placeholder="Search by User ID or details..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-[#fbfdfb] text-sm text-slate-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Show entries
            </label>

            <select
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="bg-[#fbfdfb] border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-green-600"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-[#e0ebe3] shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-[#e7eee9] flex items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#173f2b]">
              Level Income History
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
              Your latest level income transactions
            </p>
          </div>

          <span className="text-[10px] sm:text-xs font-bold text-green-800 bg-green-50 border border-green-100 rounded-full px-3 py-1.5 whitespace-nowrap">
            {filtered.length} Records
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto green-scroll">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f3f8f4] text-[#52735e] text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 text-center font-extrabold">Sr.</th>
                <th className="px-4 py-4 font-extrabold">Date & Time</th>
                <th className="px-4 py-4 font-extrabold">From User</th>
                <th className="px-4 py-4 text-center font-extrabold">Package</th>
                <th className="px-4 py-4 text-center font-extrabold">Income</th>
                <th className="px-4 py-4 font-extrabold">Description</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw
                        size={25}
                        className="animate-spin text-green-600"
                      />
                      <span className="text-xs font-semibold text-slate-400">
                        Loading level income records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <FileText size={22} className="text-green-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">
                        No Level Income Records Found
                      </p>
                      <p className="text-xs text-slate-400">
                        Try another search term.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((txn, idx) => {
                  const date = formatDate(txn.createdAt);
                  const packageAmount = getPackageAmount(txn);
                  const cleanDescription = getDescription(txn.description);

                  return (
                    <tr
                      key={txn._id || idx}
                      className="table-row transition-colors"
                    >
                      <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
                        {indexOfFirst + idx + 1}
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
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                            <UserCircle
                              size={17}
                              className="text-green-700"
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {txn.fromUserId || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-extrabold text-amber-800">
                          <Package size={11} />
                          ${formatAmount(packageAmount)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 font-black text-green-700 text-sm">
                          <ArrowUpRight size={15} />
                          ${formatAmount(txn.amount)}
                        </span>
                      </td>

                      <td className="px-4 py-4 max-w-xs">
                        <span className="text-xs font-medium text-slate-600 break-words">
                          {cleanDescription}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-3 space-y-3">
          {loading ? (
            <div className="py-12 flex flex-col items-center gap-3">
              <RefreshCw
                size={25}
                className="animate-spin text-green-600"
              />
              <p className="text-xs font-semibold text-slate-400">
                Loading level income records...
              </p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <FileText size={22} className="text-green-600" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                No Level Income Records Found
              </p>
              <p className="text-xs text-slate-400">
                Try another search term.
              </p>
            </div>
          ) : (
            paginated.map((txn, idx) => {
              const date = formatDate(txn.createdAt);
              const packageAmount = getPackageAmount(txn);
              const cleanDescription = getDescription(txn.description);

              return (
                <div
                  key={txn._id || idx}
                  className="mobile-transaction rounded-xl p-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <UserCircle size={19} className="text-green-700" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                          From User
                        </p>
                        <p className="text-xs font-extrabold text-slate-800 break-all">
                          {txn.fromUserId || "N/A"}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                      #{indexOfFirst + idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="rounded-lg bg-green-50/80 p-2.5">
                      <p className="text-[10px] font-bold text-green-700/70 uppercase">
                        Income
                      </p>
                      <p className="text-base font-black text-green-700 mt-1">
                        +${formatAmount(txn.amount)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-amber-50/80 p-2.5">
                      <p className="text-[10px] font-bold text-amber-700/70 uppercase">
                        Package
                      </p>
                      <p className="text-base font-black text-amber-800 mt-1">
                        ${formatAmount(packageAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-slate-500">
                    <CalendarDays size={13} className="text-green-700" />
                    <span className="text-[11px] font-medium">
                      {date.date} · {date.time}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">
                      Description
                    </p>
                    <p className="text-xs text-slate-600 break-words">
                      {cleanDescription}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="border-t border-[#e7eee9] bg-[#fbfdfb] px-3 sm:px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center sm:text-left">
              Showing{" "}
              <span className="text-slate-800">{firstEntry}</span> to{" "}
              <span className="text-slate-800">{lastEntry}</span> of{" "}
              <span className="text-slate-800">{filtered.length}</span>{" "}
              entries
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="page-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="min-w-[76px] text-center text-xs font-extrabold text-[#17613b] bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="page-btn h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 disabled:hover:bg-white"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Total */}
      {!loading && filtered.length > 0 && (
        <div className="mt-4 rounded-xl border border-[#dce9df] bg-gradient-to-r from-[#f1f8f3] to-[#fffdf6] px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Filtered Income Total
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Total of matching level income records
            </p>
          </div>

          <p className="text-lg sm:text-xl font-black text-[#17613b] whitespace-nowrap">
            ${formatAmount(totalIncome)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LevelIncome;
