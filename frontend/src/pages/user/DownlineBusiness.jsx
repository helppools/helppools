// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import { Search, TrendingUp, ChevronLeft, ChevronRight, Calendar, Zap, Users } from "lucide-react";

// const DownlineBusiness = () => {
//   const { user } = useAuth();
//   const [transactions, setTransactions] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDownline = async () => {
//       try {
//         setLoading(true);
//         // Poori downline team ka data fetch kar rahe hain
//         const res = await api.get(`/user/downline-business/${user.userId}?t=${new Date().getTime()}`);
//         const team = res.data.team || [];

//         const dateMap = {};

//         // 🔥 DATE-WISE COMBINE (AGGREGATE) - POORA DOWNLINE KA BUSINESS 🔥
//         team.forEach(d => {
//           (d.transactions || []).forEach(t => {
//             if (t.type === "topup" || t.type === "debit_topup") {
//               const dateObj = new Date(t.date);
//               const yyyy = dateObj.getFullYear();
//               const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
//               const dd = String(dateObj.getDate()).padStart(2, '0');
//               const dateKey = `${yyyy}-${mm}-${dd}`; 

//               if (!dateMap[dateKey]) {
//                 dateMap[dateKey] = {
//                   dateKey,
//                   rawDate: dateObj,
//                   totalAmount: 0,
//                   count: 0
//                 };
//               }
//               dateMap[dateKey].totalAmount += Number(t.amount || 0);
//               dateMap[dateKey].count += 1;
//             }
//           });
//         });

//         const aggregatedTx = Object.values(dateMap).sort((a, b) => b.rawDate - a.rawDate);
//         setTransactions(aggregatedTx);
//         setFiltered(aggregatedTx);
//       } catch (err) {
//         console.error("Error fetching downline business:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.userId) fetchDownline();
//   }, [user?.userId]);

//   // Filters Logic
//   useEffect(() => {
//     let data = [...transactions];
//     if (search) {
//       data = data.filter(t => t.dateKey.includes(search));
//     }
//     if (fromDate) {
//       const from = new Date(fromDate);
//       from.setHours(0, 0, 0, 0);
//       data = data.filter(t => t.rawDate >= from);
//     }
//     if (toDate) {
//       const to = new Date(toDate);
//       to.setHours(23, 59, 59, 999);
//       data = data.filter(t => t.rawDate <= to);
//     }

//     setFiltered(data);
//     setCurrentPage(1);
//   }, [search, fromDate, toDate, transactions]);

//   // Pagination Logic
//   const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const filteredTotal = filtered.reduce((sum, t) => sum + t.totalAmount, 0);

//   return (
//     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #f1f5f9; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 10px; }
//       `}</style>

//       {/* Header */}
//       <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
//         <div>
//            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
//               <Users className="text-green-500" size={28} /> Downline Business
//            </h2>
//            <p className="text-slate-500 text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//              Complete date-wise aggregated top-up business
//            </p>
//         </div>
        
//         {/* Total Business Badge */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg shadow-green-200">
//            <div className="bg-white/20 p-2 rounded-xl">
//              <TrendingUp size={24} className="text-white" />
//            </div>
//            <div className="flex flex-col">
//               <span className="text-[10px] font-black uppercase tracking-widest opacity-90">Total Business</span>
//               <span className="text-2xl font-black">${Number(filteredTotal).toFixed(2)}</span>
//            </div>
//         </div>
//       </div>

//       {/* Filters Row */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
//         <div className="relative w-full lg:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-slate-400 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by Date (e.g. 2026-05)..."
//              value={search}
//              onChange={(e) => setSearch(e.target.value)}
//              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
//            />
//         </div>

//         <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
//            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 w-full sm:w-auto focus-within:border-green-500 transition-colors">
//               <Calendar size={16} className="text-slate-400" />
//               <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-transparent text-slate-700 text-xs font-bold outline-none py-3 px-2 w-full cursor-pointer" />
//            </div>
//            <span className="text-slate-400 font-bold text-xs uppercase">TO</span>
//            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 w-full sm:w-auto focus-within:border-green-500 transition-colors">
//               <Calendar size={16} className="text-slate-400" />
//               <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-transparent text-slate-700 text-xs font-bold outline-none py-3 px-2 w-full cursor-pointer" />
//            </div>
//         </div>
//       </div>

//       {/* Table Box */}
//       <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
//         <div className="overflow-x-auto custom-scroll w-full relative z-10">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap min-w-[600px]">
//             <thead className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black text-center w-20">Sr.</th>
//                 <th className="p-4 font-black">Date</th>
//                 <th className="p-4 font-black text-center">Total Activations</th>
//                 <th className="p-4 font-black text-right pr-6">Business Amount</th>
//               </tr>
//             </thead>
//             <tbody className="text-slate-600">
//               {loading ? (
//                 <tr><td colSpan="4" className="text-center py-20 text-slate-400 font-bold">Fetching business...</td></tr>
//               ) : paginated.length === 0 ? (
//                 <tr><td colSpan="4" className="text-center py-20 text-slate-400 font-bold">No records found</td></tr>
//               ) : (
//                 paginated.map((t, idx) => (
//                   <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors bg-white">
//                     <td className="p-4 font-bold text-slate-400 text-center">{indexOfFirst + idx + 1}</td>
//                     <td className="p-4 text-slate-800 font-bold text-sm">
//                       <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {t.rawDate.toLocaleDateString("en-GB")}</div>
//                     </td>
//                     <td className="p-4 text-center">
//                       <span className="bg-blue-50 text-blue-600 border border-blue-100 py-1.5 px-3 rounded-lg text-xs font-black inline-flex items-center gap-1.5"><Zap size={12} fill="currentColor"/> {t.count} Top-ups</span>
//                     </td>
//                     <td className="p-4 font-black text-green-600 text-right text-lg pr-6">${t.totalAmount.toFixed(2)}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownlineBusiness;






import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Zap,
  Users,
  Wallet,
  Activity,
  CalendarDays,
  RefreshCw,
  ArrowUpRight,
  BarChart3,
  Filter,
  X,
} from "lucide-react";

const DownlineBusiness = () => {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDownline = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/user/downline-business/${user.userId}?t=${new Date().getTime()}`
        );

        const team = res.data.team || [];
        const dateMap = {};

        // Date-wise aggregation of complete downline top-up business.
        team.forEach((member) => {
          (member.transactions || []).forEach((transaction) => {
            if (
              transaction.type === "topup" ||
              transaction.type === "debit_topup"
            ) {
              const dateObj = new Date(transaction.date);

              if (Number.isNaN(dateObj.getTime())) return;

              const yyyy = dateObj.getFullYear();
              const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
              const dd = String(dateObj.getDate()).padStart(2, "0");
              const dateKey = `${yyyy}-${mm}-${dd}`;

              if (!dateMap[dateKey]) {
                dateMap[dateKey] = {
                  dateKey,
                  rawDate: dateObj,
                  totalAmount: 0,
                  count: 0,
                };
              }

              dateMap[dateKey].totalAmount += Number(
                transaction.amount || 0
              );

              dateMap[dateKey].count += 1;
            }
          });
        });

        const aggregatedTx = Object.values(dateMap).sort(
          (a, b) => b.rawDate - a.rawDate
        );

        setTransactions(aggregatedTx);
      } catch (err) {
        console.error("Error fetching downline business:", err);
        setError("Unable to load downline business. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchDownline();
    } else {
      setLoading(false);
    }
  }, [user?.userId]);

  // Search and date filters.
  const filtered = useMemo(() => {
    let data = [...transactions];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      data = data.filter((item) => item.dateKey.includes(query));
    }

    if (fromDate) {
      const from = new Date(`${fromDate}T00:00:00`);
      data = data.filter((item) => item.rawDate >= from);
    }

    if (toDate) {
      const to = new Date(`${toDate}T23:59:59.999`);
      data = data.filter((item) => item.rawDate <= to);
    }

    return data;
  }, [transactions, search, fromDate, toDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, fromDate, toDate, itemsPerPage]);

  // Summary calculations.
  const summary = useMemo(() => {
    const totalBusiness = filtered.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const totalActivations = filtered.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const averageBusiness =
      filtered.length > 0 ? totalBusiness / filtered.length : 0;

    return {
      totalBusiness,
      totalActivations,
      averageBusiness,
      activeDays: filtered.length,
    };
  }, [filtered]);

  // Pagination.
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const formatAmount = (amount) =>
    (Number(amount) || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (date) => {
    if (!date || Number.isNaN(new Date(date).getTime())) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
  };

  const hasFilters = search || fromDate || toDate;

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
        line: "bg-[#d6b65f]",
      },
      blue: {
        icon: "bg-blue-50 text-blue-700",
        value: "text-blue-700",
        line: "bg-blue-400",
      },
      gold: {
        icon: "bg-amber-50 text-amber-700",
        value: "text-amber-700",
        line: "bg-amber-400",
      },
    };

    const theme = themes[accent] || themes.green;

    return (
      <div className="relative overflow-hidden rounded-xl border border-[#e0ebe3] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 sm:text-xs">
              {title}
            </p>

            <p
              className={`mt-2 break-words text-xl font-black sm:text-2xl ${theme.value}`}
            >
              {value}
            </p>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              {subtitle}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
          >
            <Icon size={19} />
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 h-1 w-full ${theme.line}`} />
      </div>
    );
  };

  const BusinessCard = ({ item, index }) => (
    <div className="rounded-xl border border-[#e0ebe3] bg-white p-3.5 shadow-sm transition hover:border-green-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <CalendarDays size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-800">
              {formatDate(item.rawDate)}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              Daily Business Report
            </p>
          </div>
        </div>

        <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-extrabold text-blue-700">
          #{index}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-green-100 bg-green-50/60 p-3">
          <div className="flex items-center gap-1.5 text-green-700">
            <Zap size={13} />
            <span className="text-[9px] font-extrabold uppercase tracking-wide">
              Activations
            </span>
          </div>

          <p className="mt-1 text-lg font-black text-green-800">
            {item.count}
          </p>
        </div>

        <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3">
          <div className="flex items-center gap-1.5 text-amber-700">
            <Wallet size={13} />
            <span className="text-[9px] font-extrabold uppercase tracking-wide">
              Business
            </span>
          </div>

          <p className="mt-1 break-all text-lg font-black text-amber-800">
            ${formatAmount(item.totalAmount)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="downline-business-page relative z-10 mx-auto w-full max-w-7xl pb-8">
      <style>{`
        .downline-business-page {
          color: #173b2b;
        }

        .downline-business-page * {
          box-sizing: border-box;
        }

        .downline-business-page .business-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .downline-business-page .business-scroll::-webkit-scrollbar-track {
          background: #edf4ef;
        }

        .downline-business-page .business-scroll::-webkit-scrollbar-thumb {
          background: #9bbba5;
          border-radius: 20px;
        }

        .downline-business-page .business-row:hover {
          background: #f5faf6;
        }

        .downline-business-page input:focus,
        .downline-business-page select:focus {
          outline: none;
          border-color: #23804c;
          box-shadow: 0 0 0 3px rgba(35, 128, 76, .10);
        }

        .downline-business-page button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }
      `}</style>

      {/* Premium Page Header */}
      <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#103d29] via-[#17633c] to-[#23804c] p-5 shadow-lg sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border-[28px] border-white/5" />
        <div className="pointer-events-none absolute right-32 -bottom-20 h-40 w-40 rounded-full bg-[#d9b65b]/10 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-[#e6c66f]" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-green-100 sm:text-xs">
                Helping Pools
              </span>
            </div>

            <h2 className="flex items-center gap-2 text-xl font-black text-white sm:text-2xl md:text-3xl">
              <Users size={25} className="shrink-0 text-[#e8c96f]" />
              Downline Business
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-relaxed text-green-100/80 sm:text-sm">
              Track your entire team's daily activation performance and
              combined business growth.
            </p>
          </div>

          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 sm:flex">
            <BarChart3 size={27} className="text-[#f0d27c]" />
          </div>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white">
            <Activity size={12} className="text-[#f0d27c]" />
            Team Performance
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white">
            <Calendar size={12} className="text-[#f0d27c]" />
            Daily Aggregation
          </span>
        </div>
      </div>

      {/* Business Overview */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total Team Business"
          value={`$${formatAmount(summary.totalBusiness)}`}
          subtitle="Combined business in selected results"
          icon={TrendingUp}
          accent="green"
        />

        <SummaryCard
          title="Total Activations"
          value={summary.totalActivations.toLocaleString("en-US")}
          subtitle="Total top-up transactions"
          icon={Zap}
          accent="blue"
        />

        <SummaryCard
          title="Average Daily Business"
          value={`$${formatAmount(summary.averageBusiness)}`}
          subtitle={`${summary.activeDays} business days in results`}
          icon={BarChart3}
          accent="gold"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-xl border border-[#e0ebe3] bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
              <Filter size={16} />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-[#173f2b]">
                Filter Business Records
              </h3>
              <p className="text-[10px] text-slate-400">
                Search and select a date range
              </p>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 py-2 text-[10px] font-extrabold text-red-600 hover:bg-red-100"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search date (e.g. 2026-05)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-[#fbfdfb] py-2.5 pl-10 pr-3 text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* From Date */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-[#fbfdfb] px-3">
            <Calendar size={15} className="shrink-0 text-green-700" />

            <div className="min-w-0 flex-1 py-1">
              <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                max={toDate || undefined}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full cursor-pointer bg-transparent py-1 text-xs font-bold text-slate-700"
              />
            </div>
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-[#fbfdfb] px-3">
            <Calendar size={15} className="shrink-0 text-green-700" />

            <div className="min-w-0 flex-1 py-1">
              <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                min={fromDate || undefined}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full cursor-pointer bg-transparent py-1 text-xs font-bold text-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <p className="text-[10px] font-semibold text-slate-400">
            Showing{" "}
            <span className="font-extrabold text-green-700">
              {filtered.length}
            </span>{" "}
            matching business days
          </p>

          <p className="text-[10px] font-semibold text-slate-400">
            Sorted by latest date first
          </p>
        </div>
      </div>

      {/* Business Table */}
      <div className="overflow-hidden rounded-xl border border-[#e0ebe3] bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#e7eee9] px-4 py-4 sm:px-5">
          <div>
            <h3 className="text-sm font-extrabold text-[#173f2b] sm:text-base">
              Daily Business Report
            </h3>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              Date-wise combined top-up activity of your downline
            </p>
          </div>

          <span className="whitespace-nowrap rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-800 sm:text-xs">
            {filtered.length} Records
          </span>
        </div>

        {/* Desktop Table */}
        <div className="business-scroll hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f3f8f4] text-[10px] uppercase tracking-wider text-[#52735e]">
              <tr>
                <th className="w-16 px-4 py-4 text-center font-extrabold">
                  Sr.
                </th>

                <th className="px-4 py-4 font-extrabold">
                  Business Date
                </th>

                <th className="px-4 py-4 text-center font-extrabold">
                  Total Activations
                </th>

                <th className="px-5 py-4 text-right font-extrabold">
                  Business Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw
                        size={23}
                        className="animate-spin text-green-600"
                      />
                      <span className="text-xs font-semibold text-slate-400">
                        Fetching downline business...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-xs font-bold text-red-600">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-green-700 px-4 py-2 text-xs font-bold text-white hover:bg-green-800"
                      >
                        Refresh Page
                      </button>
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                        <BarChart3
                          size={22}
                          className="text-green-600"
                        />
                      </div>

                      <p className="text-sm font-bold text-slate-600">
                        No Business Records Found
                      </p>

                      <p className="text-xs text-slate-400">
                        Try changing your date range or search.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr
                    key={item.dateKey}
                    className="business-row transition-colors"
                  >
                    <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
                      {indexOfFirst + idx + 1}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700">
                          <CalendarDays size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-extrabold text-slate-800">
                            {formatDate(item.rawDate)}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Daily Business
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-extrabold text-blue-700">
                        <Zap size={12} />
                        {item.count} Top-ups
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-base font-black text-[#17613b]">
                        ${formatAmount(item.totalAmount)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile and Tablet Cards */}
        <div className="space-y-3 p-3 lg:hidden">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-12">
              <RefreshCw
                size={23}
                className="animate-spin text-green-600"
              />
              <p className="text-xs font-semibold text-slate-400">
                Fetching downline business...
              </p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-xs font-bold text-red-600">{error}</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                <BarChart3 size={22} className="text-green-600" />
              </div>

              <p className="text-sm font-bold text-slate-600">
                No Business Records Found
              </p>

              <p className="text-xs text-slate-400">
                Try changing your filters.
              </p>
            </div>
          ) : (
            paginated.map((item, idx) => (
              <BusinessCard
                key={item.dateKey}
                item={item}
                index={indexOfFirst + idx + 1}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && filtered.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e7eee9] bg-[#fbfdfb] px-3 py-3.5 sm:flex-row sm:px-5">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-[10px] font-bold text-slate-500">
                Rows per page
              </span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-700"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <p className="text-center text-[10px] font-semibold text-slate-500 sm:text-xs">
              Showing{" "}
              <span className="text-slate-800">
                {indexOfFirst + 1}
              </span>{" "}
              to{" "}
              <span className="text-slate-800">
                {Math.min(indexOfLast, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="text-slate-800">{filtered.length}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="min-w-[76px] rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-center text-xs font-extrabold text-[#17613b]">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Information */}
      {!loading && !error && transactions.length > 0 && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce9df] bg-gradient-to-r from-[#f1f8f3] to-[#fffdf6] px-4 py-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
            <Activity size={16} />
          </div>

          <div>
            <p className="text-xs font-extrabold text-[#17613b]">
              Downline Business Summary
            </p>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              Business figures are grouped by transaction date and combine
              qualifying top-up activity across your complete downline team.
              Summary values update automatically when filters are applied.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownlineBusiness;
