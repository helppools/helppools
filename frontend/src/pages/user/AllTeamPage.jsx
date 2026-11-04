// import React, { useEffect, useState, useMemo } from "react";
// import api from "../../api/axios"; 
// import useAuth from "../../hooks/useAuth"; 
// import { Search, Globe2, Activity, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

// const AllTeamPage = () => {
//   const { user } = useAuth();
//   const [team, setTeam] = useState([]);
//   const [stats, setStats] = useState({
//     totalTeam: 0,
//     activeTeam: 0
//   });
  
//   const [search, setSearch] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.userId) return;

//     const fetchAllTeam = async () => {
//       setIsLoading(true); 
//       try {
//         // 🔥 CACHE FIX: Added ?t=${new Date().getTime()}
//         const res = await api.get(`/user/all-team/${user.userId}?t=${new Date().getTime()}`);
        
//         let teamData = (res.data.team || []).filter(u => u.level > 0);
//         setTeam(teamData);
        
//         setStats({
//           totalTeam: teamData.length,
//           activeTeam: teamData.filter(u => u.topUpAmount > 0).length
//         });
//       } catch (err) {
//         console.error("Error fetching all team:", err);
//       } finally {
//         setIsLoading(false); 
//       }
//     };
//     fetchAllTeam();
//   }, [user?.userId]);

//   const sortedAndFilteredTeam = useMemo(() => {
//     let filtered = team.filter(
//       (u) =>
//         u.userId?.toString().includes(search) ||
//         u.name?.toLowerCase().includes(search.toLowerCase())
//     );

//     return filtered.sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       let aValue = a[sortConfig.key] || "";
//       let bValue = b[sortConfig.key] || "";
      
//       if (typeof aValue === "string") aValue = aValue.toLowerCase();
//       if (typeof bValue === "string") bValue = bValue.toLowerCase();
      
//       if (sortConfig.key === "createdAt") {
//         aValue = new Date(a.createdAt).getTime();
//         bValue = new Date(b.createdAt).getTime();
//       }
      
//       if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [team, search, sortConfig]);

//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const currentItems = sortedAndFilteredTeam.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(sortedAndFilteredTeam.length / entriesPerPage) || 1;

//   const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
//   const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSort = (key) => {
//     if (!key) return; 
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const tableColumns = [
//     { label: "Sr", key: null, center: true },
//     { label: "Date", key: "createdAt", right: true },
//     { label: "Level", key: "level", center: true },
//     { label: "User ID", key: "userId" },
//     { label: "Name", key: "name" },
//     { label: "Country", key: "country" },
//   ];

//   return (
//     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       {/* Scrollbar CSS */}
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
//       `}</style>

//       {/* Filters (Search & Entries) */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
        
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by name or ID..."
//              value={search}
//              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//              className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>

//       </div>

//       {/* Table */}
//       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden shadow-2xl">
//         <div className="overflow-x-auto custom-scroll w-full">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-green-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 {tableColumns.map((col) => (
//                   <th
//                     key={col.label}
//                     onClick={() => handleSort(col.key)}
//                     className={`p-4 font-black transition-colors ${col.key ? 'cursor-pointer hover:text-green-400 select-none' : ''} ${col.center ? 'text-center' : ''} ${col.right ? 'text-right' : ''}`}
//                   >
//                     <div className={`flex items-center gap-1 ${col.center ? 'justify-center' : ''} ${col.right ? 'justify-end' : ''}`}>
//                       {col.label}
//                       {sortConfig.key === col.key && (
//                         <span className="text-[10px] text-slate-900">
//                           {sortConfig.direction === "asc" ? "▲" : "▼"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="text-slate-600">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10">
//                      <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Network Data...</span>
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10">
//                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Team Members Found</span>
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((u, i) => (
//                   <tr
//                     key={u._id || i}
//                     className="border-b border-slate-100 hover:bg-green-500/5 transition-colors bg-white"
//                   >
//                     <td className="p-4 font-bold text-gray-500 text-center">
//                       {indexOfFirst + i + 1}
//                     </td>
//                      <td className="p-4 text-black font-mono text-xs text-right">
//                       {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-GB") : "-"}
//                     </td>
                    
//                     <td className="p-4 text-center">
//                       <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 py-1 px-2.5 rounded-md text-[10px] font-black tracking-widest">
//                         L-{u.level}
//                       </span>
//                     </td>
                    
//                     <td className="p-4 font-black text-slate-900">
//                       {u.userId}
//                     </td>

//                     <td className="p-4 font-bold text-slate-600 max-w-[150px] truncate" title={u.name || "-"}>
//                       {u.name || "-"}
//                     </td>

//                     <td className="p-4 text-black">
//                       {u.country || "-"}
//                     </td>

//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {totalPages > 0 && (
//            <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
//                 Showing {indexOfFirst + 1} to {Math.min(indexOfLast, team.length)} of {team.length} Entries
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

// export default AllTeamPage;



import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {
  Search,
  Globe2,
  Activity,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Users,
  CalendarDays,
  Crown,
  Hash,
  Filter,
  X,
  RefreshCw,
  ArrowUpDown,
  Network,
  UserRound,
  TrendingUp,
  Layers3
} from "lucide-react";

const AllTeamPage = () => {
  const { user } = useAuth();

  const [team, setTeam] = useState([]);
  const [stats, setStats] = useState({
    totalTeam: 0,
    activeTeam: 0
  });

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchAllTeam = async () => {
      setIsLoading(true);

      try {
        const res = await api.get(
          `/user/all-team/${user.userId}?t=${new Date().getTime()}`
        );

        let teamData = (res.data.team || []).filter(
          u => u.level > 0
        );

        setTeam(teamData);

        setStats({
          totalTeam: teamData.length,
          activeTeam: teamData.filter(
            u => u.topUpAmount > 0
          ).length
        });

      } catch (err) {
        console.error("Error fetching all team:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTeam();
  }, [user?.userId]);

  // Search and sorting
  const sortedAndFilteredTeam = useMemo(() => {
    let filtered = team.filter(
      u =>
        u.userId?.toString().toLowerCase().includes(search.toLowerCase()) ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.country?.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (!sortConfig.key) return 0;

      let aValue = a[sortConfig.key] || "";
      let bValue = b[sortConfig.key] || "";

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }

      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (sortConfig.key === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [team, search, sortConfig]);

  // Pagination
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;

  const currentItems = sortedAndFilteredTeam.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages =
    Math.ceil(sortedAndFilteredTeam.length / entriesPerPage) || 1;

  const handleNext = () =>
    currentPage < totalPages &&
    setCurrentPage(prev => prev + 1);

  const handlePrev = () =>
    currentPage > 1 &&
    setCurrentPage(prev => prev - 1);

  const handleEntriesChange = e => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = key => {
    if (!key) return;

    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const formatDate = date =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  const formatNumber = value =>
    Number(value || 0).toLocaleString("en-IN");

  const tableColumns = [
    { label: "Sr.", key: null, center: true },
    { label: "Joining Date", key: "createdAt" },
    { label: "Level", key: "level", center: true },
    { label: "User ID", key: "userId" },
    { label: "Member Name", key: "name" },
    { label: "Country", key: "country" }
  ];

  // Summary card
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    iconColor
  }) => (
    <div className="hp-team-stat relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColor}`}>
          <Icon size={19} />
        </div>

        <span className="rounded-full bg-[#f5f8f2] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
          {subtitle}
        </span>
      </div>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-black tracking-tight text-[#174b31]">
        {value}
      </h3>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-800 via-emerald-500 to-[#d6a83e]" />
    </div>
  );

  // Pagination
  const Pagination = () => (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={17} />
      </button>

      <span className="min-w-[82px] rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-xs font-black text-[#174b31]">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl pb-8">

      <style>{`
        .hp-team-stat {
          box-shadow: 0 4px 18px rgba(22, 101, 52, 0.045);
        }

        .hp-team-table {
          border-collapse: separate;
          border-spacing: 0;
        }

        .hp-team-table tbody tr {
          transition: background .18s ease;
        }

        .hp-team-table tbody tr:hover {
          background: #f4faf2;
        }

        .hp-team-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .hp-team-scroll::-webkit-scrollbar-track {
          background: #f1f7ef;
          border-radius: 20px;
        }

        .hp-team-scroll::-webkit-scrollbar-thumb {
          background: #a8c8aa;
          border-radius: 20px;
        }

        .hp-team-scroll::-webkit-scrollbar-thumb:hover {
          background: #398052;
        }

        .hp-team-input:focus {
          outline: none;
          border-color: #16834c;
          box-shadow: 0 0 0 3px rgba(22, 131, 76, .09);
        }

        .hp-team-action {
          transition: all .2s ease;
        }

        .hp-team-action:active {
          transform: scale(.97);
        }
      `}</style>

      {/* PAGE HEADER */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#123d29] via-[#17633d] to-[#21804d] p-4 text-white shadow-md shadow-emerald-900/10 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78]">
              <Globe2 size={23} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  My Global Team
                </h1>

                <span className="rounded-full border border-[#e8c66f]/40 bg-[#d6a83e]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f5d98d]">
                  Network
                </span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-emerald-100 sm:text-xs">
                Explore and manage your complete team network
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78] sm:flex">
            <Network size={24} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <Activity size={13} className="text-[#f3cf78]" />
            <span className="text-[10px] font-bold text-white">
              Complete Network Overview
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <Layers3 size={13} className="text-[#f3cf78]" />
            <span className="text-[10px] font-bold text-white">
              All Levels
            </span>
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Users}
          title="Total Team"
          value={formatNumber(stats.totalTeam)}
          subtitle="Members"
          iconColor="bg-emerald-50 text-emerald-700"
        />

        <StatCard
          icon={Activity}
          title="Active Team"
          value={formatNumber(stats.activeTeam)}
          subtitle="Active"
          iconColor="bg-amber-50 text-amber-700"
        />

        <div className="col-span-2 sm:col-span-1">
          <StatCard
            icon={TrendingUp}
            title="Inactive Team"
            value={formatNumber(stats.totalTeam - stats.activeTeam)}
            subtitle="Pending"
            iconColor="bg-[#f0f5e9] text-[#557d35]"
          />
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="mb-4 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="text"
              placeholder="Search by name, ID or country..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="hp-team-input w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 placeholder:text-slate-400 sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-emerald-700" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Show
              </span>

              <select
                value={entriesPerPage}
                onChange={handleEntriesChange}
                className="rounded-lg border border-emerald-100 bg-[#f8fbf7] px-2.5 py-2 text-xs font-bold text-[#174b31] outline-none focus:border-emerald-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-extrabold text-emerald-800">
              {sortedAndFilteredTeam.length} Results
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

        <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
          <div className="flex items-center gap-2">
            <Network size={17} className="text-emerald-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
              Global Team Members
            </h3>
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            Sort by column heading
          </span>
        </div>

        <div className="hp-team-scroll w-full overflow-x-auto">
          <table className="hp-team-table w-full min-w-[800px] text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
                {tableColumns.map(col => (
                  <th
                    key={col.label}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-4 font-black ${
                      col.key
                        ? "cursor-pointer select-none hover:text-emerald-700"
                        : ""
                    } ${col.center ? "text-center" : ""}`}
                  >
                    <div className={`flex items-center gap-1.5 ${
                      col.center ? "justify-center" : ""
                    }`}>
                      {col.label}

                      {col.key && (
                        <ArrowUpDown
                          size={12}
                          className={
                            sortConfig.key === col.key
                              ? "text-amber-600"
                              : "text-slate-300"
                          }
                        />
                      )}

                      {sortConfig.key === col.key && (
                        <span className="text-[9px] text-emerald-800">
                          {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50 text-slate-600">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <RefreshCw
                      size={25}
                      className="mx-auto mb-3 animate-spin text-emerald-600"
                    />
                    <p className="text-xs font-bold text-slate-500">
                      Loading network data...
                    </p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Users size={23} />
                    </div>

                    <p className="text-sm font-black text-[#174b31]">
                      No Team Members Found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try searching with another name or ID
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((u, i) => (
                  <tr
                    key={u._id || i}
                    className="transition-colors hover:bg-[#f4faf2]"
                  >
                    <td className="px-4 py-3.5 text-center font-bold text-slate-400">
                      {indexOfFirst + i + 1}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-600">
                        <CalendarDays
                          size={14}
                          className="text-emerald-600"
                        />
                        {formatDate(u.createdAt)}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1.5 text-[10px] font-black tracking-wide text-amber-800">
                        L-{u.level}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 font-black text-[#174b31]">
                        <Hash size={13} className="text-emerald-600" />
                        {u.userId}
                      </div>
                    </td>

                    <td
                      className="max-w-[200px] truncate px-4 py-3.5 font-bold text-slate-700"
                      title={u.name || "-"}
                    >
                      {u.name || "-"}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-600">
                        <Globe2 size={14} className="text-emerald-600" />
                        {u.country || "-"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* DESKTOP PAGINATION */}
        {!isLoading && (
          <div className="flex flex-col gap-3 border-t border-emerald-100 bg-[#f8fbf7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-bold text-slate-500">
              Showing{" "}
              <span className="font-black text-[#174b31]">
                {sortedAndFilteredTeam.length === 0 ? 0 : indexOfFirst + 1}
              </span>
              {" "}to{" "}
              <span className="font-black text-[#174b31]">
                {Math.min(indexOfLast, sortedAndFilteredTeam.length)}
              </span>
              {" "}of{" "}
              <span className="font-black text-[#174b31]">
                {sortedAndFilteredTeam.length}
              </span>
              {" "}members
            </p>

            <Pagination />
          </div>
        )}
      </div>

      {/* MOBILE TEAM CARDS */}
      <div className="space-y-3 md:hidden">

        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
            Global Team Members
          </h3>

          <span className="text-[10px] font-bold text-slate-400">
            {sortedAndFilteredTeam.length} Members
          </span>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
            <RefreshCw
              size={25}
              className="mx-auto mb-3 animate-spin text-emerald-600"
            />
            <p className="text-xs font-bold text-slate-500">
              Loading network data...
            </p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
            <Users
              size={30}
              className="mx-auto mb-3 text-emerald-300"
            />
            <p className="text-sm font-black text-[#174b31]">
              No Team Members Found
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try another search keyword
            </p>
          </div>
        ) : (
          currentItems.map((u, i) => (
            <div
              key={u._id || i}
              className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
            >
              {/* Member Header */}
              <div className="flex items-center gap-3 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                  <UserRound size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-black text-[#174b31]">
                    {u.name || "Unknown Member"}
                  </h4>

                  <p className="mt-0.5 text-[10px] font-bold text-slate-500">
                    ID: {u.userId || "-"}
                  </p>
                </div>

                <div className="shrink-0 rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1.5 text-[10px] font-black text-amber-800">
                  LEVEL {u.level}
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-2 gap-2 p-3.5">
                <div className="rounded-xl bg-[#f5f9f3] p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Joining Date
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <CalendarDays
                      size={13}
                      className="shrink-0 text-emerald-700"
                    />
                    {formatDate(u.createdAt)}
                  </div>
                </div>

                <div className="rounded-xl bg-[#f5f9f3] p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Member Level
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-sm font-black text-[#174b31]">
                    <Layers3
                      size={14}
                      className="text-emerald-700"
                    />
                    Level {u.level}
                  </div>
                </div>
              </div>

              {/* Country Footer */}
              <div className="flex items-center justify-between gap-2 border-t border-emerald-50 px-3.5 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Globe2
                    size={14}
                    className="shrink-0 text-emerald-700"
                  />

                  <span className="truncate text-xs font-semibold text-slate-600">
                    {u.country || "-"}
                  </span>
                </div>

                <span className="shrink-0 text-[9px] font-bold text-slate-400">
                  #{indexOfFirst + i + 1}
                </span>
              </div>
            </div>
          ))
        )}

        {/* MOBILE PAGINATION */}
        {!isLoading && (
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="mb-3 text-center text-[10px] font-bold text-slate-500">
              Showing{" "}
              {sortedAndFilteredTeam.length === 0 ? 0 : indexOfFirst + 1}
              {" "}to{" "}
              {Math.min(indexOfLast, sortedAndFilteredTeam.length)}
              {" "}of {sortedAndFilteredTeam.length}
            </p>

            <Pagination />
          </div>
        )}
      </div>

    </div>
  );
};

export default AllTeamPage;
