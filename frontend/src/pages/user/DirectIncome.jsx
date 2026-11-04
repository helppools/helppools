// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import { Search, DollarSign, ChevronLeft, ChevronRight, UserCircle, ListChecks } from "lucide-react";

// const DirectIncome = () => {
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
//     api.get(`/transaction/transactions/${userId}?type=direct_income&t=${new Date().getTime()}`)
//       .then((res) => {
//         const sorted = (res.data || [])
//           .filter(txn => txn.fromUserId && txn.fromUserId !== userId)
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setTransactions(sorted);
//         setFiltered(sorted);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch direct income", err);
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
//         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
//              <DollarSign className="text-green-500" size={28} /> Direct Income
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             Track your earnings from direct referrals
//           </p>
//         </div>
//       </div>

//       {/* Filters (Search & Entries) */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by User ID or details..."
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
//                     <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Records...</span>
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10">
//                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Direct Income Records Found</span>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((txn, idx) => {
//                   const date = new Date(txn.createdAt);
                  
//                   // 🔥 PACKAGE FIX: Agar package database me nahi hai, toh default 30 dikhayega
//                   const packageAmount = Number(txn.package) > 0 ? Number(txn.package) : 30;
                  
//                   // 🔥 LEADER TEXT FIX: Description se "(Leader)" word ko clean kar dega
//                   const cleanDescription = txn.description 
//                     ? txn.description.replace(/\s*\(Leader\)/gi, "") 
//                     : "Direct income";

//                   return (
//                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-white/5 transition-colors bg-white">
                      
//                       {/* Sr No */}
//                       <td className="p-4 font-bold text-gray-500 text-center">
//                         {indexOfFirst + idx + 1}
//                       </td>
                      
//                       {/* Date & Time */}
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
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-green-500/20 hover:text-green-500 border border-transparent hover:border-green-500/30'}`}
//                  >
//                    <ChevronLeft size={18} />
//                  </button>
                 
//                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg">
//                     {currentPage} / {totalPages}
//                  </span>
                 
//                  <button
//                    onClick={handleNext}
//                    disabled={currentPage === totalPages}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-slate-900 hover:bg-green-500/20 hover:text-green-500 border border-transparent hover:border-green-500/30'}`}
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

// export default DirectIncome;



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  Search,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  ListChecks,
  CalendarDays,
  Clock,
  Users,
  Wallet,
  TrendingUp,
  X,
  RefreshCcw,
  ArrowUpRight,
  Package,
} from "lucide-react";

const DirectIncome = () => {
  const userId = getUserId();

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Fetch direct income
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .get(
        `/transaction/transactions/${userId}?type=direct_income&t=${new Date().getTime()}`
      )
      .then((res) => {
        const sorted = (res.data || [])
          .filter(
            (txn) => txn.fromUserId && txn.fromUserId !== userId
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          );

        setTransactions(sorted);
        setFiltered(sorted);
      })
      .catch((err) => {
        console.error("Failed to fetch direct income", err);
        setTransactions([]);
        setFiltered([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearch(value);
    setCurrentPage(1);

    if (!value) {
      setFiltered(transactions);
      return;
    }

    const result = transactions.filter(
      (txn) =>
        txn.description?.toLowerCase().includes(value) ||
        String(txn.fromUserId).toLowerCase().includes(value)
    );

    setFiltered(result);
  };

  // Entries per page
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Summary
  const totalIncome = filtered.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const totalPages =
    Math.ceil(filtered.length / entriesPerPage) || 1;

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;

  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((p) => p - 1);

  const handleNext = () =>
    currentPage < totalPages &&
    setCurrentPage((p) => p + 1);

  // Safe date formatting
  const getDateInfo = (value) => {
    if (!value) {
      return { date: "N/A", time: "--:--" };
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return { date: "N/A", time: "--:--" };
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

  // Preserve original package fallback and description cleanup
  const getPackageAmount = (txn) => {
    return Number(txn.package) > 0
      ? Number(txn.package)
      : 30;
  };

  const getCleanDescription = (description) => {
    return description
      ? description.replace(/\s*\(Leader\)/gi, "")
      : "Direct income";
  };

  const formatMoney = (value) => {
    return (Number(value) || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Pagination component
  const Pagination = () => (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronLeft size={17} />
      </button>

      <span className="rounded-xl border border-emerald-100 bg-white px-4 py-2 text-xs font-black text-[#174b31]">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl pb-8">

      <style>{`
        .di-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .di-scroll::-webkit-scrollbar-track {
          background: #f1f7ef;
          border-radius: 20px;
        }

        .di-scroll::-webkit-scrollbar-thumb {
          background: #a8c8aa;
          border-radius: 20px;
        }

        .di-search:focus {
          outline: none;
          border-color: #16834c;
          box-shadow: 0 0 0 3px rgba(22, 131, 76, .09);
        }

        .di-row {
          transition: background .2s ease;
        }

        .di-row:hover {
          background: #f5faf3;
        }

        .di-card {
          box-shadow: 0 4px 18px rgba(22, 101, 52, .045);
        }
      `}</style>

      {/* HEADER */}
      <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#123d29] via-[#17633d] to-[#21804d] p-4 text-white shadow-lg shadow-emerald-900/10 sm:p-5">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-[#d5ae55]/10 blur-2xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3d486]">
              <DollarSign size={24} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  Direct Income
                </h1>

                <span className="rounded-full border border-[#e8c66f]/40 bg-[#d6a83e]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f5d98d]">
                  Earnings
                </span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-emerald-100 sm:text-xs">
                Track your earnings from direct referrals
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3d486] sm:flex">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <Users size={13} className="text-[#f3d486]" />
            <span className="text-[10px] font-bold text-white">
              Referral Earnings
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <ListChecks size={13} className="text-[#f3d486]" />
            <span className="text-[10px] font-bold text-white">
              Income Records
            </span>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

        <div className="di-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Wallet size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Income
          </p>

          <h3 className="mt-1 break-all text-xl font-black text-[#174b31] sm:text-2xl">
            ${formatMoney(totalIncome)}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-800 to-emerald-400" />
        </div>

        <div className="di-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Users size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Transactions
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {filtered.length.toLocaleString("en-IN")}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#b68a2e] to-[#e8cf82]" />
        </div>

        <div className="col-span-2 di-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:col-span-1 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <TrendingUp size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Current Page
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {loading ? "—" : `${currentPage} / ${totalPages}`}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-700 to-blue-300" />
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="mb-4 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="text"
              placeholder="Search by User ID or details..."
              value={search}
              onChange={handleSearch}
              className="di-search w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 placeholder:text-slate-400 sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFiltered(transactions);
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <label
              htmlFor="direct-income-entries"
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500"
            >
              <ListChecks size={14} />
              Show
            </label>

            <select
              id="direct-income-entries"
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="rounded-lg border border-emerald-100 bg-[#f8fbf7] px-3 py-2 text-xs font-bold text-[#174b31] outline-none focus:border-emerald-600"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <span className="text-[10px] font-bold text-slate-400">
              Entries
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

        <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
          <div className="flex items-center gap-2">
            <DollarSign size={17} className="text-emerald-700" />

            <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
              Direct Income Transactions
            </h3>
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            {filtered.length} Records
          </span>
        </div>

        <div className="di-scroll w-full overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
                <th className="px-4 py-4 text-center font-black">
                  Sr.
                </th>

                <th className="px-4 py-4 font-black">
                  Date & Time
                </th>

                <th className="px-4 py-4 font-black">
                  From User
                </th>

                <th className="px-4 py-4 text-center font-black">
                  Package
                </th>

                <th className="px-4 py-4 text-center font-black">
                  Income
                </th>

                <th className="px-4 py-4 font-black">
                  Description
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <RefreshCcw
                      size={27}
                      className="mx-auto mb-3 animate-spin text-emerald-600"
                    />

                    <p className="text-xs font-bold text-slate-500">
                      Loading income records...
                    </p>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <DollarSign size={24} />
                    </div>

                    <p className="text-sm font-black text-[#174b31]">
                      No Direct Income Records Found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Your referral earnings will appear here
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((txn, idx) => {
                  const dateInfo = getDateInfo(txn.createdAt);
                  const packageAmount = getPackageAmount(txn);
                  const cleanDescription = getCleanDescription(
                    txn.description
                  );

                  return (
                    <tr
                      key={txn._id || idx}
                      className="di-row"
                    >
                      <td className="px-4 py-4 text-center font-bold text-slate-400">
                        {indexOfFirst + idx + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-start gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                            <CalendarDays size={15} />
                          </div>

                          <div>
                            <p className="text-xs font-black text-slate-700">
                              {dateInfo.date}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                              <Clock size={10} />
                              {dateInfo.time}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                            <UserCircle size={17} />
                          </div>

                          <span className="font-black text-slate-800">
                            {txn.fromUserId || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[10px] font-black text-amber-800">
                          <Package size={12} />
                          ${packageAmount.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
                          <ArrowUpRight size={14} />
                          ${formatMoney(txn.amount)}
                        </span>
                      </td>

                      <td className="max-w-[260px] px-4 py-4">
                        <p
                          className="break-words text-[11px] font-semibold capitalize text-slate-600"
                          title={cleanDescription}
                        >
                          {cleanDescription}
                        </p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* DESKTOP PAGINATION */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-emerald-100 bg-[#f8fbf7] p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Showing {indexOfFirst + 1} to{" "}
              {Math.min(indexOfLast, filtered.length)} of{" "}
              {filtered.length} entries
            </span>

            <Pagination />
          </div>
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 md:hidden">

        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
            Income Records
          </h3>

          <span className="text-[10px] font-bold text-slate-400">
            {filtered.length} Records
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
            <RefreshCcw
              size={27}
              className="mx-auto mb-3 animate-spin text-emerald-600"
            />

            <p className="text-xs font-bold text-slate-500">
              Loading income records...
            </p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
            <DollarSign
              size={30}
              className="mx-auto mb-3 text-emerald-300"
            />

            <p className="text-sm font-black text-[#174b31]">
              No Direct Income Records Found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your referral earnings will appear here
            </p>
          </div>
        ) : (
          paginated.map((txn, idx) => {
            const dateInfo = getDateInfo(txn.createdAt);
            const packageAmount = getPackageAmount(txn);
            const cleanDescription = getCleanDescription(
              txn.description
            );

            return (
              <div
                key={txn._id || idx}
                className="di-card overflow-hidden rounded-2xl border border-emerald-100 bg-white"
              >
                {/* Mobile Card Header */}
                <div className="flex items-center justify-between gap-2 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                      <UserCircle size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        From User
                      </p>

                      <p className="mt-0.5 truncate text-xs font-black text-[#174b31]">
                        {txn.fromUserId || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-bold text-slate-400">
                    #{indexOfFirst + idx + 1}
                  </span>
                </div>

                {/* Mobile Card Body */}
                <div className="p-3.5">

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Income Earned
                      </p>

                      <p className="mt-0.5 text-xl font-black text-emerald-800">
                        + ${formatMoney(txn.amount)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
                        Package
                      </p>

                      <p className="mt-0.5 text-sm font-black text-amber-800">
                        ${packageAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-[#f8fbf7] p-2.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <CalendarDays size={12} />
                        <span className="text-[9px] font-bold uppercase">
                          Date
                        </span>
                      </div>

                      <p className="mt-1 text-[11px] font-black text-slate-700">
                        {dateInfo.date}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8fbf7] p-2.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={12} />
                        <span className="text-[9px] font-bold uppercase">
                          Time
                        </span>
                      </div>

                      <p className="mt-1 text-[11px] font-black text-slate-700">
                        {dateInfo.time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-emerald-800">
                      Description
                    </p>

                    <p className="break-words text-[11px] font-semibold capitalize text-slate-600">
                      {cleanDescription}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* MOBILE PAGINATION */}
        {!loading && filtered.length > 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-3">
            <p className="mb-3 text-center text-[10px] font-bold text-slate-500">
              Showing {indexOfFirst + 1} to{" "}
              {Math.min(indexOfLast, filtered.length)} of{" "}
              {filtered.length} entries
            </p>

            <div className="flex justify-center">
              <Pagination />
            </div>
          </div>
        )}
      </div>

      {/* TOTAL FOOTER */}
      {!loading && filtered.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[#e6d7a9] bg-gradient-to-r from-[#fffdf5] to-[#fff9e9] p-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4e7bf] text-[#987126]">
              <Wallet size={17} />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#987126]">
                Filtered Income Total
              </p>

              <p className="text-[10px] font-semibold text-slate-500">
                Based on current search results
              </p>
            </div>
          </div>

          <p className="text-xl font-black text-[#174b31]">
            ${formatMoney(totalIncome)}
          </p>
        </div>
      )}

    </div>
  );
};

export default DirectIncome;
