// import React, { useCallback, useEffect, useState } from "react";
// import api from "../../api/axios";
// import {
//   Search,
//   Crown,
//   Gift,
//   RefreshCw,
//   CheckCircle,
//   Lock,
//   History,
//   CalendarClock,
//   ChevronLeft,
//   ChevronRight,
//   UserRound,
//   ShieldCheck
// } from "lucide-react";
// import { toast } from "react-toastify";

// const PAGE_LIMIT = 20;

// const formatDate = (value) => {
//   if (!value) return "—";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "—";
//   return new Intl.DateTimeFormat("en-IN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//     timeZone: "Asia/Kolkata"
//   }).format(date);
// };

// const AdminLeaderPackage = () => {
//   // Eligible Leader list
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [activatingId, setActivatingId] = useState(null);

//   // Activation history
//   const [history, setHistory] = useState([]);
//   const [historySearch, setHistorySearch] = useState("");
//   const [historyPage, setHistoryPage] = useState(1);
//   const [historyTotalPages, setHistoryTotalPages] = useState(1);
//   const [historyTotal, setHistoryTotal] = useState(0);
//   const [historyLoading, setHistoryLoading] = useState(true);

//   const getAuthConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`
//     }
//   });

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(
//         `/admin/leader-package-users?search=${encodeURIComponent(search)}&page=${page}&limit=${PAGE_LIMIT}`,
//         getAuthConfig()
//       );

//       if (res.data?.success) {
//         setUsers(res.data.users || []);
//         setTotal(res.data.total || 0);
//         setTotalPages(Math.max(1, res.data.totalPages || 1));
//       } else {
//         setUsers([]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load Leaders.");
//     } finally {
//       setLoading(false);
//     }
//   }, [search, page]);

//   const fetchHistory = useCallback(async () => {
//     setHistoryLoading(true);
//     try {
//       const res = await api.get(
//         `/admin/leader-package-activation-history?search=${encodeURIComponent(historySearch)}&page=${historyPage}&limit=${PAGE_LIMIT}`,
//         getAuthConfig()
//       );

//       if (res.data?.success) {
//         setHistory(res.data.history || []);
//         setHistoryTotal(res.data.total || 0);
//         setHistoryTotalPages(Math.max(1, res.data.totalPages || 1));
//       } else {
//         setHistory([]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load activation history.");
//     } finally {
//       setHistoryLoading(false);
//     }
//   }, [historySearch, historyPage]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   useEffect(() => {
//     fetchHistory();
//   }, [fetchHistory]);

//   const handleActivation = async (user) => {
//     const confirmed = window.confirm(
//       `Activate FREE $60 package for Leader ${user.name} (#${user.userId})?\n\nWallet deduction: $0\nDirect Income: $0\nLevel Income: $0\nLeader Bonus: $0\n\nContinue?`
//     );
//     if (!confirmed) return;

//     setActivatingId(user.userId);
//     try {
//       const res = await api.post(
//         `/admin/leader-package-activation/${user.userId}`,
//         {},
//         getAuthConfig()
//       );

//       if (res.data?.success) {
//         toast.success(res.data.message || "Free $60 package activated successfully.");
//         // Refresh both tables so the Leader status and audit history stay in sync.
//         await Promise.all([fetchUsers(), fetchHistory()]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Package activation failed.");
//     } finally {
//       setActivatingId(null);
//     }
//   };

//   const refreshAll = () => Promise.all([fetchUsers(), fetchHistory()]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 text-slate-800 md:p-6">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Page heading */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <div className="flex items-center gap-2">
//               <Crown className="text-amber-500" size={28} />
//               <h1 className="text-2xl font-black tracking-tight md:text-3xl">
//                 Leader Package Activation
//               </h1>
//             </div>
//             <p className="mt-1 text-sm text-slate-500">
//               Admin-only free $60 upgrade for eligible Leaders.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={refreshAll}
//             disabled={loading || historyLoading}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-bold shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <RefreshCw size={16} className={loading || historyLoading ? "animate-spin" : ""} />
//             Refresh All
//           </button>
//         </div>

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Leaders</p>
//               <Crown className="text-amber-500" size={20} />
//             </div>
//             <p className="mt-2 text-3xl font-black">{total}</p>
//             <p className="mt-1 text-xs text-slate-400">Matching Leader accounts</p>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Upgrade</p>
//               <Gift className="text-emerald-600" size={20} />
//             </div>
//             <p className="mt-2 text-3xl font-black text-emerald-600">$60</p>
//             <p className="mt-1 text-xs text-slate-400">No wallet deduction</p>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Recorded Activations</p>
//               <History className="text-indigo-600" size={20} />
//             </div>
//             <p className="mt-2 text-3xl font-black">{historyTotal}</p>
//             <p className="mt-1 text-xs text-slate-400">Admin free-upgrade history</p>
//           </div>
//         </div>

//         {/* Leader list */}
//         <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
//           <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="font-extrabold">Eligible Leader Accounts</h2>
//               <p className="mt-1 text-xs text-slate-500">Leader must already have an active $30 package.</p>
//             </div>
//             <div className="relative w-full md:max-w-sm">
//               <Search size={17} className="absolute left-3 top-3 text-slate-400" />
//               <input
//                 value={search}
//                 onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                 placeholder="Search Leader by ID, name or email..."
//                 className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[760px] text-left text-sm">
//               <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
//                 <tr>
//                   <th className="px-4 py-4">User ID</th>
//                   <th className="px-4 py-4">Leader</th>
//                   <th className="px-4 py-4">Current Package</th>
//                   <th className="px-4 py-4">Wallet</th>
//                   <th className="px-4 py-4 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading Leaders...</td></tr>
//                 ) : users.length === 0 ? (
//                   <tr><td colSpan={5} className="p-10 text-center text-slate-500">No Leader users found.</td></tr>
//                 ) : users.map((user) => (
//                   <tr key={user.userId} className="transition hover:bg-slate-50">
//                     <td className="whitespace-nowrap px-4 py-4 font-bold">#{user.userId}</td>
//                     <td className="px-4 py-4">
//                       <div className="font-bold">{user.name || "—"}</div>
//                       <div className="text-xs text-slate-500">{user.email || "No email"}</div>
//                       <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-amber-700"><Crown size={12} /> Leader</span>
//                     </td>
//                     <td className="px-4 py-4 font-bold">${Number(user.currentPackage || 0).toFixed(0)}</td>
//                     <td className="whitespace-nowrap px-4 py-4 font-semibold">${Number(user.walletBalance || 0).toFixed(2)}</td>
//                     <td className="px-4 py-4 text-center">
//                       {user.canActivate60 ? (
//                         <button
//                           type="button"
//                           onClick={() => handleActivation(user)}
//                           disabled={activatingId === user.userId}
//                           className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           <Gift size={15} />
//                           {activatingId === user.userId ? "Activating..." : "Activate Free $60"}
//                         </button>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">
//                           {Number(user.currentPackage || 0) >= 60 ? <><CheckCircle size={14} /> Already Activated</> : <><Lock size={14} /> $30 Required</>}
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex items-center justify-between gap-3 border-t p-4">
//             <span className="text-xs text-slate-500">Page {page} of {totalPages} · {total} Leaders</span>
//             <div className="flex gap-2">
//               <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40"><ChevronLeft size={15} /> Previous</button>
//               <button type="button" disabled={page >= totalPages || loading} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40">Next <ChevronRight size={15} /></button>
//             </div>
//           </div>
//         </section>

//         {/* Activation history */}
//         <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
//           <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <History size={19} className="text-indigo-600" />
//                 <h2 className="font-extrabold">Free $60 Activation History</h2>
//               </div>
//               <p className="mt-1 text-xs text-slate-500">Shows successful admin activations recorded in the history collection.</p>
//             </div>
//             <div className="relative w-full md:max-w-sm">
//               <Search size={17} className="absolute left-3 top-3 text-slate-400" />
//               <input
//                 value={historySearch}
//                 onChange={(e) => { setHistorySearch(e.target.value); setHistoryPage(1); }}
//                 placeholder="Search Leader ID, name, email or Admin..."
//                 className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px] text-left text-sm">
//               <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
//                 <tr>
//                   <th className="px-4 py-4">Leader</th>
//                   <th className="px-4 py-4">Package</th>
//                   <th className="px-4 py-4">Activated By (Admin)</th>
//                   <th className="px-4 py-4">Date & Time (IST)</th>
//                   <th className="px-4 py-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {historyLoading ? (
//                   <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading activation history...</td></tr>
//                 ) : history.length === 0 ? (
//                   <tr><td colSpan={5} className="p-10 text-center text-slate-500">No activation history found.</td></tr>
//                 ) : history.map((item) => (
//                   <tr key={item._id || `${item.userId}-${item.createdAt}`} className="transition hover:bg-slate-50">
//                     <td className="px-4 py-4">
//                       <div className="font-bold">{item.leaderName || "—"}</div>
//                       <div className="text-xs text-slate-500">ID: #{item.userId}</div>
//                       <div className="text-xs text-slate-400">{item.leaderEmail || ""}</div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="font-extrabold text-emerald-700">${Number(item.packageAmount || 60).toFixed(0)} FREE</div>
//                       <div className="text-[11px] text-slate-500">Admin upgrade</div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-1.5 font-semibold"><ShieldCheck size={14} className="text-indigo-600" />{item.adminName || "Admin"}</div>
//                       <div className="text-xs text-slate-500">Admin ID: {item.adminId || "—"}</div>
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-600">
//                       <div className="flex items-center gap-1.5"><CalendarClock size={14} className="text-slate-400" />{formatDate(item.createdAt)}</div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase text-emerald-700"><CheckCircle size={13} />{item.status || "SUCCESS"}</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex items-center justify-between gap-3 border-t p-4">
//             <span className="text-xs text-slate-500">Page {historyPage} of {historyTotalPages} · {historyTotal} Activations</span>
//             <div className="flex gap-2">
//               <button type="button" disabled={historyPage <= 1 || historyLoading} onClick={() => setHistoryPage((p) => Math.max(1, p - 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40"><ChevronLeft size={15} /> Previous</button>
//               <button type="button" disabled={historyPage >= historyTotalPages || historyLoading} onClick={() => setHistoryPage((p) => Math.min(historyTotalPages, p + 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40">Next <ChevronRight size={15} /></button>
//             </div>
//           </div>
//         </section>

//         {/* Rules */}
//         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
//           <div className="font-extrabold">Activation Rules</div>
//           <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 md:text-sm">
//             <li>Only users with the exact Leader role can receive this activation.</li>
//             <li>The Leader must already have an active $30 package.</li>
//             <li>Only the free $60 upgrade is available on this page.</li>
//             <li>Wallet deduction is $0; Direct Income, Level Income and Leader Bonus are all $0.</li>
//             <li>Every successful activation is recorded in the history section below.</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLeaderPackage;






import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Search,
  Crown,
  Gift,
  RefreshCw,
  CheckCircle,
  Lock,
  History,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  UserRound,
  ShieldCheck
} from "lucide-react";
import { toast } from "react-toastify";

const PAGE_LIMIT = 20;

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(date);
};

const AdminLeaderPackage = () => {
  // Eligible Leader list
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activatingId, setActivatingId] = useState(null);

  // Activation history
  const [history, setHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState("");
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(true);

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`
    }
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admin/leader-package-users?search=${encodeURIComponent(search)}&page=${page}&limit=${PAGE_LIMIT}`,
        getAuthConfig()
      );

      if (res.data?.success) {
        setUsers(res.data.users || []);
        setTotal(res.data.total || 0);
        setTotalPages(Math.max(1, res.data.totalPages || 1));
      } else {
        setUsers([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load Leaders.");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await api.get(
        `/admin/leader-package-activation-history?search=${encodeURIComponent(historySearch)}&page=${historyPage}&limit=${PAGE_LIMIT}`,
        getAuthConfig()
      );

      if (res.data?.success) {
        setHistory(res.data.history || []);
        setHistoryTotal(res.data.total || 0);
        setHistoryTotalPages(Math.max(1, res.data.totalPages || 1));
      } else {
        setHistory([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load activation history.");
    } finally {
      setHistoryLoading(false);
    }
  }, [historySearch, historyPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleActivation = async (user) => {
    const currentPackage = Number(user.currentPackage || 0);
    const targetPackageAmount = currentPackage * 2;

    if (![60, 120].includes(targetPackageAmount)) {
      toast.error("This Leader is not eligible for a free upgrade.");
      return;
    }

    const confirmed = window.confirm(
      `Activate FREE $${targetPackageAmount} package for Leader ${user.name} (#${user.userId})?\n\nWallet deduction: $0\nDirect Income: $0\nLevel Income: $0\nLeader Bonus: $0\n\nContinue?`
    );
    if (!confirmed) return;

    setActivatingId(user.userId);
    try {
      const res = await api.post(
        `/admin/leader-package-activation/${user.userId}`,
        { packageAmount: targetPackageAmount },
        getAuthConfig()
      );

      if (res.data?.success) {
        toast.success(res.data.message || `Free $${targetPackageAmount} package activated successfully.`);
        // Refresh both tables so the Leader status and audit history stay in sync.
        await Promise.all([fetchUsers(), fetchHistory()]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Package activation failed.");
    } finally {
      setActivatingId(null);
    }
  };

  const refreshAll = () => Promise.all([fetchUsers(), fetchHistory()]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-800 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="text-amber-500" size={28} />
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Leader Package Activation
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Admin-only free package upgrades for eligible Leaders ($30 → $60 and $60 → $120).
            </p>
          </div>
          <button
            type="button"
            onClick={refreshAll}
            disabled={loading || historyLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-bold shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading || historyLoading ? "animate-spin" : ""} />
            Refresh All
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Leaders</p>
              <Crown className="text-amber-500" size={20} />
            </div>
            <p className="mt-2 text-3xl font-black">{total}</p>
            <p className="mt-1 text-xs text-slate-400">Matching Leader accounts</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Upgrade</p>
              <Gift className="text-emerald-600" size={20} />
            </div>
            <p className="mt-2 text-3xl font-black text-emerald-600">$60 / $120</p>
            <p className="mt-1 text-xs text-slate-400">Based on current package · No wallet deduction</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Recorded Activations</p>
              <History className="text-indigo-600" size={20} />
            </div>
            <p className="mt-2 text-3xl font-black">{historyTotal}</p>
            <p className="mt-1 text-xs text-slate-400">Admin free-upgrade history</p>
          </div>
        </div>

        {/* Leader list */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-extrabold">Eligible Leader Accounts</h2>
              <p className="mt-1 text-xs text-slate-500">Active $30 Leaders can receive FREE $60; active $60 Leaders can receive FREE $120.</p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search size={17} className="absolute left-3 top-3 text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search Leader by ID, name or email..."
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-4">User ID</th>
                  <th className="px-4 py-4">Leader</th>
                  <th className="px-4 py-4">Current Package</th>
                  <th className="px-4 py-4">Wallet</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading Leaders...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-slate-500">No Leader users found.</td></tr>
                ) : users.map((user) => (
                  <tr key={user.userId} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-4 font-bold">#{user.userId}</td>
                    <td className="px-4 py-4">
                      <div className="font-bold">{user.name || "—"}</div>
                      <div className="text-xs text-slate-500">{user.email || "No email"}</div>
                      <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-amber-700"><Crown size={12} /> Leader</span>
                    </td>
                    <td className="px-4 py-4 font-bold">${Number(user.currentPackage || 0).toFixed(0)}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-semibold">${Number(user.walletBalance || 0).toFixed(2)}</td>
                    <td className="px-4 py-4 text-center">
                      {user.canActivateFreeUpgrade ? (
                        <button
                          type="button"
                          onClick={() => handleActivation(user)}
                          disabled={activatingId === user.userId}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Gift size={15} />
                          {activatingId === user.userId
                              ? "Activating..."
                              : `Activate Free $${Number(user.currentPackage) * 2}`}
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">
                          {Number(user.currentPackage || 0) >= 120
                            ? <><CheckCircle size={14} /> No Upgrade Available</>
                            : <><Lock size={14} /> Active $30 / $60 Required</>}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 border-t p-4">
            <span className="text-xs text-slate-500">Page {page} of {totalPages} · {total} Leaders</span>
            <div className="flex gap-2">
              <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40"><ChevronLeft size={15} /> Previous</button>
              <button type="button" disabled={page >= totalPages || loading} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40">Next <ChevronRight size={15} /></button>
            </div>
          </div>
        </section>

        {/* Activation history */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <History size={19} className="text-indigo-600" />
                <h2 className="font-extrabold">Free Package Upgrade History</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">Shows successful admin activations recorded in the history collection.</p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search size={17} className="absolute left-3 top-3 text-slate-400" />
              <input
                value={historySearch}
                onChange={(e) => { setHistorySearch(e.target.value); setHistoryPage(1); }}
                placeholder="Search Leader ID, name, email or Admin..."
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-4">Leader</th>
                  <th className="px-4 py-4">Package</th>
                  <th className="px-4 py-4">Activated By (Admin)</th>
                  <th className="px-4 py-4">Date & Time (IST)</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyLoading ? (
                  <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading activation history...</td></tr>
                ) : history.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-slate-500">No activation history found.</td></tr>
                ) : history.map((item) => (
                  <tr key={item._id || `${item.userId}-${item.createdAt}`} className="transition hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="font-bold">{item.leaderName || "—"}</div>
                      <div className="text-xs text-slate-500">ID: #{item.userId}</div>
                      <div className="text-xs text-slate-400">{item.leaderEmail || ""}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-extrabold text-emerald-700">${Number(item.packageAmount || 60).toFixed(0)} FREE</div>
                      <div className="text-[11px] text-slate-500">Admin upgrade</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 font-semibold"><ShieldCheck size={14} className="text-indigo-600" />{item.adminName || "Admin"}</div>
                      <div className="text-xs text-slate-500">Admin ID: {item.adminId || "—"}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5"><CalendarClock size={14} className="text-slate-400" />{formatDate(item.createdAt)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase text-emerald-700"><CheckCircle size={13} />{item.status || "SUCCESS"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 border-t p-4">
            <span className="text-xs text-slate-500">Page {historyPage} of {historyTotalPages} · {historyTotal} Activations</span>
            <div className="flex gap-2">
              <button type="button" disabled={historyPage <= 1 || historyLoading} onClick={() => setHistoryPage((p) => Math.max(1, p - 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40"><ChevronLeft size={15} /> Previous</button>
              <button type="button" disabled={historyPage >= historyTotalPages || historyLoading} onClick={() => setHistoryPage((p) => Math.min(historyTotalPages, p + 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold disabled:opacity-40">Next <ChevronRight size={15} /></button>
            </div>
          </div>
        </section>

        {/* Rules */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <div className="font-extrabold">Activation Rules</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 md:text-sm">
            <li>Only users with the exact Leader role can receive this activation.</li>
            <li>An active $30 package qualifies for a FREE $60 upgrade.</li>
            <li>An active $60 package qualifies for a FREE $120 upgrade.</li>
            <li>Each upgrade can be activated only once for its target package.</li>
            <li>Wallet deduction is $0; Direct Income, Level Income and Leader Bonus are all $0.</li>
            <li>Every successful activation is recorded in the history section below.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderPackage;
