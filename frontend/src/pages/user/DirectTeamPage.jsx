// import React, { useEffect, useState, useMemo } from "react"; 
// import api from "../../api/axios"; 
// import { useAuth } from "../../context/AuthContext"; 
// import { Search, Users, UserPlus, ChevronLeft, ChevronRight, Phone } from "lucide-react";

// const DirectTeamPage = () => {
//   const { user } = useAuth();
//   const [team, setTeam] = useState([]);
//   const [totalTeamCount, setTotalTeamCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDirectTeam = async () => {
//       if (!user?.userId) return;

//       try {
//         setLoading(true);
//         // 🔥 CACHE FIX: Added ?t=${new Date().getTime()}
//         const res = await api.get(
//           `/user/direct-team/${user.userId}?t=${new Date().getTime()}`
//         );
        
//         const teamData = Array.isArray(res.data.team) ? res.data.team : [];
//         setTeam(teamData);
//         setTotalTeamCount(res.data.totalTeam || res.data.totalTeamCount || 0);

//       } catch (err) {
//         console.error("Error fetching direct team:", err);
//         setTeam([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDirectTeam();
//   }, [user?.userId]);

//   // Search/Filter Logic
//   const filtered = useMemo(() => {
//     const s = search.toLowerCase();
//     return team.filter((u) =>
//       u.userId?.toString().includes(s) ||
//       u.name?.toLowerCase().includes(s) ||
//       u.mobile?.toString().includes(s) ||
//       u.country?.toLowerCase().includes(s)
//     );
//   }, [team, search]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   // Pagination Logic
//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const currentItems = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / entriesPerPage);

//   const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       {/* Light Theme Scrollbar CSS */}
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #f8fafc; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//         .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wide flex items-center gap-3">
//              <div className="p-2 bg-green-100 rounded-lg">
//                 <UserPlus className="text-green-600" size={24} /> 
//              </div>
//              Direct Team
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-2">Manage your direct referrals</p>
//         </div>
//       </div>

//       {/* Filters (Search & Entries) */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-slate-400 group-focus-within:text-green-600 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by name or ID..."
//              value={search}
//              onChange={(e) => setSearch(e.target.value)}
//              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 pl-10 focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>

//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="overflow-x-auto custom-scroll w-full">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-slate-600 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black text-center">Sr.</th>
//                 <th className="p-4 font-black text-right">Date</th>
//                 <th className="p-4 font-black">User ID</th>
//                 <th className="p-4 font-black">Name</th>
//                 <th className="p-4 font-black text-center">Directs</th>
//                 <th className="p-4 font-black text-center">Team Size</th>
//                 <th className="p-4 font-black text-center">Top-Up</th>
//                 <th className="p-4 font-black">Mobile</th>
//               </tr>
//             </thead>

//             <tbody className="text-slate-700">
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-10">
//                      <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                      <span className="text-xs font-bold uppercase tracking-widest text-black">Loading Team Data...</span>
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-10">
//                     <span className="text-black font-bold text-sm uppercase tracking-widest">No Direct Referrals Found</span>
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((member, index) => (
//                   <tr
//                     key={member._id || index}
//                     className="border-b border-slate-100 hover:bg-slate-50 transition-colors bg-white"
//                   >
//                     <td className="p-4 font-bold text-black text-center">
//                       {indexOfFirst + index + 1}
//                     </td>
//                     <td className="p-4 text-black font-mono text-xs text-right">
//                       {member.createdAt
//                         ? new Date(member.createdAt).toLocaleDateString("en-GB")
//                         : "-"}
//                     </td>
//                     <td className="p-4 font-black text-slate-800">
//                       {member.userId}
//                     </td>
//                     <td className="p-4 font-bold text-slate-600">
//                       {member.name || "-"}
//                     </td>

//                     {/* 🔥 SUPER LEADER BYPASS LOGIC FOR DIRECTS 🔥 */}
//                     <td className="p-4 text-center">
//                       <span className="bg-blue-50 border border-blue-200 text-blue-700 py-1 px-2.5 rounded-md text-[10px] font-black tracking-widest">
//                         {member.role === 'leader' && user?.role !== 'superleader' ? 0 : (member.totalDirects || member.directCount || 0)}
//                       </span>
//                     </td>

//                     {/* 🔥 SUPER LEADER BYPASS LOGIC FOR TEAM SIZE 🔥 */}
//                     <td className="p-4 text-center">
//                       <span className="bg-purple-50 border border-purple-200 text-purple-700 py-1 px-2.5 rounded-md text-[10px] font-black tracking-widest">
//                         {member.role === 'leader' && user?.role !== 'superleader' ? 0 : (member.totalTeam || member.teamCount || 0)}
//                       </span>
//                     </td>

//                     <td className="p-4 font-black text-center">
//                        {Number(member.topUpAmount) > 0 ? (
//                           <span className="text-green-600">${member.topUpAmount}</span>
//                        ) : (
//                           <span className="text-slate-400">$0</span>
//                        )}
//                     </td>

//                     {/* 🔥 Calling Mobile Section */}
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                           <span className="text-slate-600 font-medium">{member.mobile || "-"}</span>
//                           {member.mobile && (
//                               <a 
//                                   href={`tel:+91${member.mobile}`} 
//                                   title="Call User"
//                                   className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all active:scale-95 flex items-center justify-center"
//                               >
//                                   <Phone size={14} className="text-blue-600 fill-blue-600" />
//                               </a>
//                           )}
//                       </div>
//                     </td>

//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {totalPages > 0 && (
//            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <span className="text-black text-[10px] md:text-xs font-black uppercase tracking-widest">
//                 Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} Entries
//               </span>
              
//               <div className="flex items-center gap-2">
//                  <button
//                    onClick={handlePrev}
//                    disabled={currentPage === 1}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-green-50 hover:text-green-600 border border-slate-200 hover:border-green-300'}`}
//                  >
//                    <ChevronLeft size={18} />
//                  </button>
                 
//                  <span className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg">
//                     {currentPage} / {totalPages}
//                  </span>
                 
//                  <button
//                    onClick={handleNext}
//                    disabled={currentPage === totalPages}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-green-50 hover:text-green-600 border border-slate-200 hover:border-green-300'}`}
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

// export default DirectTeamPage;


import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Phone,
  CalendarDays,
  Wallet,
  UsersRound,
  X,
  RefreshCw,
  Crown,
  User,
  Hash,
  Filter
} from "lucide-react";

const DirectTeamPage = () => {
  const { user } = useAuth();

  const [team, setTeam] = useState([]);
  const [totalTeamCount, setTotalTeamCount] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectTeam = async () => {
      if (!user?.userId) return;

      try {
        setLoading(true);

        const res = await api.get(
          `/user/direct-team/${user.userId}?t=${new Date().getTime()}`
        );

        const teamData = Array.isArray(res.data.team)
          ? res.data.team
          : [];

        setTeam(teamData);
        setTotalTeamCount(
          res.data.totalTeam || res.data.totalTeamCount || 0
        );

      } catch (err) {
        console.error("Error fetching direct team:", err);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectTeam();
  }, [user?.userId]);

  // Search / Filter Logic
  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();

    return team.filter((u) =>
      u.userId?.toString().toLowerCase().includes(s) ||
      u.name?.toLowerCase().includes(s) ||
      u.mobile?.toString().toLowerCase().includes(s) ||
      u.country?.toLowerCase().includes(s)
    );
  }, [team, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Team Statistics
  const activeMembers = useMemo(
    () => team.filter(member => Number(member.topUpAmount) > 0).length,
    [team]
  );

  const totalTopUp = useMemo(
    () => team.reduce(
      (sum, member) => sum + (Number(member.topUpAmount) || 0),
      0
    ),
    [team]
  );

  // Pagination
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / entriesPerPage);

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearSearch = () => setSearch("");

  const getDirects = (member) =>
    member.role === 'leader' && user?.role !== 'superleader'
      ? 0
      : (member.totalDirects || member.directCount || 0);

  const getTeamSize = (member) =>
    member.role === 'leader' && user?.role !== 'superleader'
      ? 0
      : (member.totalTeam || member.teamCount || 0);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN");

  const StatCard = ({ icon: Icon, title, value, subtitle, accent }) => (
    <div className="hp-stat-card relative min-w-0 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={18} />
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
          {subtitle}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <h3 className="mt-1 break-words text-xl font-black text-[#174b31] sm:text-2xl">
          {value}
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-700 via-emerald-400 to-[#d6a83e]" />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-300 pb-8">

      <style>{`
        .hp-direct-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .hp-direct-scroll::-webkit-scrollbar-track {
          background: #f1f7ef;
          border-radius: 20px;
        }

        .hp-direct-scroll::-webkit-scrollbar-thumb {
          background: #a9c9ac;
          border-radius: 20px;
        }

        .hp-direct-scroll::-webkit-scrollbar-thumb:hover {
          background: #43845b;
        }

        .hp-stat-card {
          box-shadow: 0 4px 15px rgba(22, 101, 52, 0.04);
        }

        .hp-table-row {
          transition: background .18s ease;
        }

        .hp-table-row:hover {
          background: #f4faf2;
        }

        .hp-member-card {
          box-shadow: 0 3px 12px rgba(22, 101, 52, 0.035);
        }
      `}</style>

      {/* HEADER */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-900/15">
            <UserPlus size={21} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-[#174b31] sm:text-2xl">
                Direct Team
              </h1>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-700">
                Network
              </span>
            </div>

            <p className="mt-0.5 text-[11px] font-medium text-slate-500 sm:text-xs">
              Manage and monitor your direct referrals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-100 bg-white px-3 py-2 sm:self-center">
          <Users size={15} className="text-emerald-700" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Your Network
          </span>
          <span className="text-sm font-black text-[#174b31]">
            {totalTeamCount}
          </span>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard
          icon={Users}
          title="Total Directs"
          value={team.length}
          subtitle="Members"
          accent="bg-emerald-50 text-emerald-700"
        />

        <StatCard
          icon={UserPlus}
          title="Active Members"
          value={activeMembers}
          subtitle="Top-up"
          accent="bg-amber-50 text-amber-700"
        />

        <div className="col-span-2 lg:col-span-1">
          <StatCard
            icon={Wallet}
            title="Total Top-Up"
            value={`$${formatAmount(totalTopUp)}`}
            subtitle="Volume"
            accent="bg-[#f0f5e9] text-[#557d35]"
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
              placeholder="Search name, user ID, mobile or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-emerald-700" />
              <label
                htmlFor="entries"
                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
              >
                Show
              </label>

              <select
                id="entries"
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
              {filtered.length} Results
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

        <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
          <div className="flex items-center gap-2">
            <UsersRound size={17} className="text-emerald-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
              Direct Members List
            </h3>
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            {filtered.length} Members
          </span>
        </div>

        <div className="hp-direct-scroll w-full overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
              <tr>
                <th className="px-4 py-4 text-center font-black">Sr.</th>
                <th className="px-4 py-4 font-black">Registration Date</th>
                <th className="px-4 py-4 font-black">User ID</th>
                <th className="px-4 py-4 font-black">Member Name</th>
                <th className="px-4 py-4 text-center font-black">Directs</th>
                <th className="px-4 py-4 text-center font-black">Team Size</th>
                <th className="px-4 py-4 text-center font-black">Top-Up</th>
                <th className="px-4 py-4 font-black">Mobile</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-14 text-center">
                    <RefreshCw
                      size={25}
                      className="mx-auto mb-3 animate-spin text-emerald-600"
                    />
                    <p className="text-xs font-bold text-slate-500">
                      Loading team data...
                    </p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-14 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Users size={23} />
                    </div>
                    <p className="text-sm font-black text-[#174b31]">
                      No Direct Referrals Found
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try another search keyword
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((member, index) => (
                  <tr
                    key={member._id || index}
                    className="hp-table-row"
                  >
                    <td className="px-4 py-3.5 text-center font-bold text-slate-400">
                      {indexOfFirst + index + 1}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={13} className="text-emerald-600" />
                        {formatDate(member.createdAt)}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-black text-[#174b31]">
                      <div className="flex items-center gap-2">
                        <Hash size={13} className="text-emerald-600" />
                        {member.userId}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-bold text-slate-700">
                      {member.name || "-"}
                      {member.role === 'leader' && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-black text-amber-700">
                          <Crown size={10} />
                          Leader
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex min-w-9 justify-center rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 font-black text-emerald-800">
                        {getDirects(member)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex min-w-9 justify-center rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1.5 font-black text-amber-800">
                        {getTeamSize(member)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      {Number(member.topUpAmount) > 0 ? (
                        <span className="font-black text-emerald-700">
                          ${formatAmount(member.topUpAmount)}
                        </span>
                      ) : (
                        <span className="font-bold text-slate-400">$0</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-600">
                          {member.mobile || "-"}
                        </span>

                        {member.mobile && (
                          <a
                            href={`tel:+91${member.mobile}`}
                            title="Call User"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
                          >
                            <Phone size={13} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* DESKTOP PAGINATION */}
        {!loading && totalPages > 0 && (
          <div className="flex flex-col gap-3 border-t border-emerald-100 bg-[#f8fbf7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-bold text-slate-500">
              Showing{" "}
              <span className="text-[#174b31]">{indexOfFirst + 1}</span>
              {" "}to{" "}
              <span className="text-[#174b31]">
                {Math.min(indexOfLast, filtered.length)}
              </span>
              {" "}of{" "}
              <span className="text-[#174b31]">{filtered.length}</span>
              {" "}members
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        )}
      </div>

      {/* MOBILE MEMBER CARDS */}
      <div className="space-y-3 md:hidden">

        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
            Direct Members
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            {filtered.length} Members
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
            <RefreshCw
              size={25}
              className="mx-auto mb-3 animate-spin text-emerald-600"
            />
            <p className="text-xs font-bold text-slate-500">
              Loading team data...
            </p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
            <Users size={30} className="mx-auto mb-3 text-emerald-300" />
            <p className="text-sm font-black text-[#174b31]">
              No Direct Referrals Found
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try another search keyword
            </p>
          </div>
        ) : (
          currentItems.map((member, index) => (
            <div
              key={member._id || index}
              className="hp-member-card overflow-hidden rounded-2xl border border-emerald-100 bg-white"
            >
              <div className="flex items-center gap-3 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black text-white">
                  {member.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h4 className="break-words text-sm font-black text-[#174b31]">
                      {member.name || "Unknown Member"}
                    </h4>

                    {member.role === 'leader' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-black text-amber-700">
                        <Crown size={10} />
                        Leader
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[10px] font-bold text-slate-500">
                    ID: {member.userId || "-"}
                  </p>
                </div>

                <span className="shrink-0 rounded-lg border border-emerald-100 bg-white px-2 py-1 text-[9px] font-black text-emerald-700">
                  #{indexOfFirst + index + 1}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3.5">
                <div className="rounded-xl bg-[#f5f9f3] p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Registration Date
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <CalendarDays size={13} className="text-emerald-700" />
                    {formatDate(member.createdAt)}
                  </div>
                </div>

                <div className="rounded-xl bg-[#f5f9f3] p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Top-Up Amount
                  </p>
                  <p className={`mt-1 text-sm font-black ${
                    Number(member.topUpAmount) > 0
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}>
                    ${formatAmount(member.topUpAmount)}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    Directs
                  </p>
                  <p className="mt-1 text-base font-black text-[#174b31]">
                    {getDirects(member)}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
                    Team Size
                  </p>
                  <p className="mt-1 text-base font-black text-[#795516]">
                    {getTeamSize(member)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-emerald-50 px-3.5 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Phone size={14} className="shrink-0 text-emerald-700" />
                  <span className="truncate text-xs font-semibold text-slate-600">
                    {member.mobile || "-"}
                  </span>
                </div>

                {member.mobile && (
                  <a
                    href={`tel:+91${member.mobile}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-emerald-800"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                )}
              </div>
            </div>
          ))
        )}

        {/* MOBILE PAGINATION */}
        {!loading && totalPages > 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="mb-3 text-center text-[10px] font-bold text-slate-500">
              Showing {indexOfFirst + 1} to{" "}
              {Math.min(indexOfLast, filtered.length)} of {filtered.length}
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        )}
      </div>

    </div>
  );
};

// Reusable Pagination UI
const Pagination = ({
  currentPage,
  totalPages,
  handlePrev,
  handleNext
}) => (
  <div className="flex items-center justify-center gap-2">
    <button
      type="button"
      onClick={handlePrev}
      disabled={currentPage === 1}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
    >
      <ChevronLeft size={17} />
    </button>

    <span className="min-w-[76px] rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-xs font-black text-[#174b31]">
      {currentPage} / {totalPages}
    </span>

    <button
      type="button"
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
    >
      <ChevronRight size={17} />
    </button>
  </div>
);

export default DirectTeamPage;
