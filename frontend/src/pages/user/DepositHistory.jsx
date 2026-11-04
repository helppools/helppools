// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios'; 
// import { format } from 'date-fns';
// import { Search, History, ArrowDownCircle, Calendar, Clock, ExternalLink } from 'lucide-react'; 

// const DepositHistory = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [filteredDeposits, setFilteredDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   // 🛠️ HELPER: Decimal128 aur Simple Numbers dono ko handle karne ke liye
//   const getSafeAmount = (val) => {
//     if (!val) return 0;
//     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
//     return parseFloat(val) || 0;
//   };

//   // 🛠️ HELPER: Hash ko chota karne ke liye (0x1234...abcd)
//   const formatHash = (hash) => {
//     if (!hash) return null;
//     if (hash.length < 15) return hash; 
//     return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
//   };

//   // 🕵️‍♂️ SECRET HELPER: 100% Unique & Consistent Dummy Hash Generator
//   const generateDummyHash = (item, idx) => {
//     const idStr = String(item._id || item.id || idx);
    
//     // MongoDB IDs ke aakhiri characters sabse zyada unique hote hain
//     const uniqueEnd = idStr.slice(-6); 
    
//     // ID ko reverse kar denge taaki shuruwat bhi unique lage
//     const reversedId = idStr.split('').reverse().join('');
    
//     const padding = "f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1";
    
//     // Exact 66 characters ka hex banayenge: "0x" (2) + body (58) + uniqueEnd (6)
//     const body = reversedId + padding;
//     return ("0x" + body.substring(0, 58) + uniqueEnd).toLowerCase();
//   };

//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const userData = localStorage.getItem('user');
//         const user = userData ? JSON.parse(userData) : null;
//         const userId = user?.userId;

//         if (!userId) {
//           setLoading(false);
//           return;
//         }

//         setLoading(true);
//         const res = await api.get(`/wallet/history/${userId}?t=${new Date().getTime()}`);
        
//         const historyData = res.data.history || (Array.isArray(res.data) ? res.data : []);

//         // Sirf Deposit filter karenge aur Fake Hash attach karenge
//         const processedDeposits = historyData
//           .filter(item => item.type && (item.type.toLowerCase() === 'deposit' || item.type.toLowerCase() === 'manual_credit'))
//           .map((item, idx) => {
//             let originalHash = item.txHash || item.txnHash;
//             let displayHash = originalHash;
            
//             // 🔥 AGAR MANUAL HAI YA HASH GAYAB HAI, TOH UNIQUE FAKE HASH BANA DO
//             if (!originalHash || originalHash === 'N/A' || originalHash.startsWith('MANUAL-')) {
//               displayHash = generateDummyHash(item, idx);
//             }

//             return { ...item, displayHash }; 
//           });

//         setDeposits(processedDeposits);
//         setFilteredDeposits(processedDeposits);
//       } catch (err) {
//         console.error('Failed to fetch deposit history:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   // 🔍 SEARCH LOGIC
//   useEffect(() => {
//     const query = search.toLowerCase();
//     const filtered = deposits.filter((d) => {
//       const amt = getSafeAmount(d.amount || d.grossAmount).toString();
//       const recordDate = d.createdAt || d.date; 
//       const dateStr = recordDate ? format(new Date(recordDate), 'dd-MM-yyyy HH:mm').toLowerCase() : '';
//       const hashString = (d.displayHash || '').toLowerCase(); 
        
//       return amt.includes(query) || dateStr.includes(query) || hashString.includes(query);
//     });

//     setFilteredDeposits(filtered);
//   }, [search, deposits]);

//   return (
//     <div className="w-full max-w-5xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
//              <History className="text-green-500" size={28} /> Deposit History
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             Track your wallet top-ups
//           </p>
//         </div>
//       </div>

//       {/* Filter (Search) */}
//       <div className="mb-6 bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
//         <div className="relative w-full sm:w-[400px] group">
//            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder="Search by amount, date, or tx hash..."
//              value={search}
//              onChange={(e) => setSearch(e.target.value)}
//              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-11 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>
//       </div>

//       {/* Table Box */}
//       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden relative">
//         <div className="overflow-x-auto custom-scroll w-full relative z-10">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-green-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black w-16 text-center">Sr.</th>
//                 <th className="p-4 font-black text-right">Date & Time</th>
//                 <th className="p-4 font-black">Type</th>
//                 <th className="p-4 font-black text-center">TxHash (BscScan)</th>
//                 <th className="p-4 font-black text-center">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="text-slate-600">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12">
//                     <div className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3 border-4 border-t-transparent rounded-full"></div>
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Records...</span>
//                   </td>
//                 </tr>
//               ) : filteredDeposits.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12 text-gray-500 font-bold text-sm uppercase tracking-widest">
//                     No Deposit Records Found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredDeposits.map((record, index) => {
//                   const recordDate = record.createdAt || record.date;
//                   const finalAmount = getSafeAmount(record.amount || record.grossAmount);
                  
//                   // 🔥 Hamesha Safe & Unique Hash Use Hoga
//                   const hash = record.displayHash; 
//                   const shortHash = formatHash(hash);
                  
//                   return (
//                     <tr key={record._id || index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors bg-white">
//                       <td className="p-4 font-bold text-gray-500 text-center">{index + 1}</td>

//                       {/* Date & Time */}
//                       <td className="p-4 text-right">
//                         <div className="flex flex-col items-end gap-0.5">
//                           <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
//                             <Calendar size={12} className="text-blue-500" />
//                             {recordDate ? format(new Date(recordDate), 'dd MMM yyyy') : 'N/A'}
//                           </div>
//                           <div className="flex items-center gap-1 text-slate-400 font-medium text-[10px]">
//                             <Clock size={10} />
//                             {recordDate ? format(new Date(recordDate), 'hh:mm a') : '--:--'}
//                           </div>
//                         </div>
//                       </td>

//                       <td className="p-4">
//                         <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/20 py-1 px-2.5 rounded-md text-[10px] font-black tracking-widest uppercase">
//                           <ArrowDownCircle size={12} /> Deposit
//                         </span>
//                       </td>

//                       {/* 🔥 FAKE/REAL HASH BUTTON */}
//                       <td className="p-4 text-center">
//                         <a 
//                           href={`https://bscscan.com/tx/${hash}`} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm"
//                           title="Click to view on BscScan"
//                         >
//                           {shortHash} <ExternalLink size={12} />
//                         </a>
//                       </td>

//                       <td className="p-4 font-black text-center">
//                         <span className="text-green-500 text-base drop-shadow-sm">
//                           + ${finalAmount.toFixed(2)}
//                         </span>
//                       </td>
                  
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepositHistory;



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { format } from "date-fns";
import {
  Search,
  History,
  ArrowDownCircle,
  Calendar,
  Clock,
  ExternalLink,
  Wallet,
  ShieldCheck,
  Receipt,
  RefreshCcw,
  X,
  Copy,
  CheckCircle2
} from "lucide-react";

const DepositHistory = () => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedHash, setCopiedHash] = useState("");

  // Safe amount handler
  const getSafeAmount = (val) => {
    if (!val) return 0;
    if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
    return parseFloat(val) || 0;
  };

  // Short hash display
  const formatHash = (hash) => {
    if (!hash) return null;
    if (hash.length < 15) return hash;
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  // Generate consistent dummy hash
  const generateDummyHash = (item, idx) => {
    const idStr = String(item._id || item.id || idx);
    const uniqueEnd = idStr.slice(-6);
    const reversedId = idStr.split("").reverse().join("");

    const padding =
      "f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1";

    const body = reversedId + padding;

    return (
      "0x" + body.substring(0, 58) + uniqueEnd
    ).toLowerCase();
  };

  // Fetch deposit history
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        const userId = user?.userId;

        if (!userId) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const res = await api.get(
          `/wallet/history/${userId}?t=${new Date().getTime()}`
        );

        const historyData =
          res.data.history ||
          (Array.isArray(res.data) ? res.data : []);

        const processedDeposits = historyData
          .filter(
            (item) =>
              item.type &&
              (
                item.type.toLowerCase() === "deposit" ||
                item.type.toLowerCase() === "manual_credit"
              )
          )
          .map((item, idx) => {
            const originalHash = item.txHash || item.txnHash;
            let displayHash = originalHash;

            const isGeneratedHash =
              !originalHash ||
              originalHash === "N/A" ||
              originalHash.startsWith("MANUAL-");

            if (isGeneratedHash) {
              displayHash = generateDummyHash(item, idx);
            }

            return {
              ...item,
              displayHash,
              isGeneratedHash
            };
          });

        setDeposits(processedDeposits);
        setFilteredDeposits(processedDeposits);
      } catch (err) {
        console.error("Failed to fetch deposit history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  // Search logic
  useEffect(() => {
    const query = search.toLowerCase();

    const filtered = deposits.filter((d) => {
      const amt = getSafeAmount(
        d.amount || d.grossAmount
      ).toString();

      const recordDate = d.createdAt || d.date;

      const dateStr = recordDate
        ? format(
            new Date(recordDate),
            "dd-MM-yyyy HH:mm"
          ).toLowerCase()
        : "";

      const hashString = (
        d.displayHash || ""
      ).toLowerCase();

      return (
        amt.includes(query) ||
        dateStr.includes(query) ||
        hashString.includes(query)
      );
    });

    setFilteredDeposits(filtered);
  }, [search, deposits]);

  // Date formatting
  const getDateInfo = (recordDate) => {
    if (!recordDate) {
      return { date: "N/A", time: "--:--" };
    }

    const parsed = new Date(recordDate);

    if (Number.isNaN(parsed.getTime())) {
      return { date: "N/A", time: "--:--" };
    }

    return {
      date: format(parsed, "dd MMM yyyy"),
      time: format(parsed, "hh:mm a")
    };
  };

  // Copy hash
  const handleCopyHash = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);

      setTimeout(() => {
        setCopiedHash("");
      }, 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const totalAmount = filteredDeposits.reduce(
    (sum, item) =>
      sum + getSafeAmount(item.amount || item.grossAmount),
    0
  );

  const totalDeposited = deposits.reduce(
    (sum, item) =>
      sum + getSafeAmount(item.amount || item.grossAmount),
    0
  );

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl pb-8">

      <style>{`
        .hp-deposit-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .hp-deposit-scroll::-webkit-scrollbar-track {
          background: #f1f7ef;
          border-radius: 20px;
        }

        .hp-deposit-scroll::-webkit-scrollbar-thumb {
          background: #a8c8aa;
          border-radius: 20px;
        }

        .hp-deposit-input:focus {
          outline: none;
          border-color: #16834c;
          box-shadow: 0 0 0 3px rgba(22, 131, 76, .09);
        }

        .hp-deposit-card {
          box-shadow: 0 4px 18px rgba(22, 101, 52, .045);
        }

        .hp-deposit-row {
          transition: background .2s ease;
        }

        .hp-deposit-row:hover {
          background: #f5faf3;
        }
      `}</style>

      {/* HEADER */}
      <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#123d29] via-[#17633d] to-[#21804d] p-4 text-white shadow-lg shadow-emerald-900/10 sm:p-5">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-[#d5ae55]/10 blur-2xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3d486]">
              <History size={23} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  Deposit History
                </h1>

                <span className="rounded-full border border-[#e8c66f]/40 bg-[#d6a83e]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f5d98d]">
                  Wallet
                </span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-emerald-100 sm:text-xs">
                Track your wallet deposits and transaction records
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3d486] sm:flex">
            <Wallet size={24} />
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <ShieldCheck size={13} className="text-[#f3d486]" />
            <span className="text-[10px] font-bold text-white">
              Deposit Records
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <Receipt size={13} className="text-[#f3d486]" />
            <span className="text-[10px] font-bold text-white">
              Transaction History
            </span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

        <div className="hp-deposit-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Receipt size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Deposits
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {deposits.length.toLocaleString("en-IN")}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-800 to-emerald-400" />
        </div>

        <div className="hp-deposit-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Wallet size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Deposited
          </p>

          <h3 className="mt-1 break-all text-xl font-black text-[#174b31] sm:text-2xl">
            ${totalDeposited.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#b68a2e] to-[#e8cf82]" />
        </div>

        <div className="col-span-2 hp-deposit-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:col-span-1 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Search size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Search Results
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {filteredDeposits.length.toLocaleString("en-IN")}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-700 to-blue-300" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-4 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="text"
              placeholder="Search amount, date or transaction hash..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hp-deposit-input w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 placeholder:text-slate-400 sm:text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Results
            </span>

            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-black text-emerald-800">
              {filteredDeposits.length} Records
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

        <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
          <div className="flex items-center gap-2">
            <History size={17} className="text-emerald-700" />

            <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
              Deposit Transactions
            </h3>
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            Wallet History
          </span>
        </div>

        <div className="hp-deposit-scroll w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
                <th className="px-4 py-4 text-center font-black">
                  Sr.
                </th>

                <th className="px-4 py-4 font-black">
                  Date & Time
                </th>

                <th className="px-4 py-4 font-black">
                  Type
                </th>

                <th className="px-4 py-4 text-center font-black">
                  Transaction Hash
                </th>

                <th className="px-4 py-4 text-center font-black">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <RefreshCcw
                      size={27}
                      className="mx-auto mb-3 animate-spin text-emerald-600"
                    />

                    <p className="text-xs font-bold text-slate-500">
                      Loading deposit records...
                    </p>
                  </td>
                </tr>
              ) : filteredDeposits.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Wallet size={23} />
                    </div>

                    <p className="text-sm font-black text-[#174b31]">
                      No Deposit Records Found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another amount, date or hash
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDeposits.map((record, index) => {
                  const recordDate =
                    record.createdAt || record.date;

                  const finalAmount = getSafeAmount(
                    record.amount || record.grossAmount
                  );

                  const hash = record.displayHash;
                  const shortHash = formatHash(hash);

                  const dateInfo = getDateInfo(recordDate);

                  const isManual =
                    record.type?.toLowerCase() === "manual_credit";

                  return (
                    <tr
                      key={record._id || index}
                      className="hp-deposit-row"
                    >
                      <td className="px-4 py-4 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-start gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                            <Calendar size={15} />
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
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[9px] font-black uppercase tracking-wider text-emerald-800">
                          <ArrowDownCircle size={13} />
                          {isManual ? "Manual Credit" : "Deposit"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`https://bscscan.com/tx/${hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-mono text-[10px] font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                              title="Open BscScan"
                            >
                              {shortHash}
                              <ExternalLink size={11} />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleCopyHash(hash)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                              title="Copy hash"
                            >
                              {copiedHash === hash ? (
                                <CheckCircle2 size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>

                          {record.isGeneratedHash && (
                            <span className="text-[9px] font-semibold text-amber-700">
                              Generated reference · Not verified on-chain
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
                          + ${finalAmount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE DEPOSIT CARDS */}
      <div className="space-y-3 md:hidden">

        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
            Deposit Records
          </h3>

          <span className="text-[10px] font-bold text-slate-400">
            {filteredDeposits.length} Records
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
            <RefreshCcw
              size={27}
              className="mx-auto mb-3 animate-spin text-emerald-600"
            />

            <p className="text-xs font-bold text-slate-500">
              Loading deposit records...
            </p>
          </div>
        ) : filteredDeposits.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
            <Wallet
              size={30}
              className="mx-auto mb-3 text-emerald-300"
            />

            <p className="text-sm font-black text-[#174b31]">
              No Deposit Records Found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your deposit history will appear here
            </p>
          </div>
        ) : (
          filteredDeposits.map((record, index) => {
            const recordDate =
              record.createdAt || record.date;

            const finalAmount = getSafeAmount(
              record.amount || record.grossAmount
            );

            const hash = record.displayHash;
            const dateInfo = getDateInfo(recordDate);

            const isManual =
              record.type?.toLowerCase() === "manual_credit";

            return (
              <div
                key={record._id || index}
                className="hp-deposit-card overflow-hidden rounded-2xl border border-emerald-100 bg-white"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                      <Wallet size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Deposit Date
                      </p>

                      <p className="mt-0.5 text-xs font-black text-[#174b31]">
                        {dateInfo.date}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                        <Clock size={10} />
                        {dateInfo.time}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-bold text-slate-400">
                    #{index + 1}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[9px] font-black uppercase tracking-wider text-emerald-800">
                      <ArrowDownCircle size={13} />
                      {isManual ? "Manual Credit" : "Deposit"}
                    </span>

                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Amount
                      </p>

                      <p className="mt-0.5 text-lg font-black text-emerald-800">
                        + ${finalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Hash */}
                  <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[9px] font-black uppercase tracking-wider text-blue-800">
                        Transaction Hash
                      </p>

                      <span className="text-[9px] font-bold text-blue-500">
                        BscScan
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate font-mono text-[10px] font-bold text-blue-800">
                        {hash}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleCopyHash(hash)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700"
                        title="Copy hash"
                      >
                        {copiedHash === hash ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {record.isGeneratedHash && (
                      <p className="mt-2 text-[9px] font-semibold text-amber-700">
                        Generated reference · Not verified on-chain
                      </p>
                    )}

                    <a
                      href={`https://bscscan.com/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2.5 text-[10px] font-black text-white transition hover:bg-blue-700"
                    >
                      View on BscScan
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* TOTAL FOOTER */}
      {!loading && filteredDeposits.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[#e6d7a9] bg-gradient-to-r from-[#fffdf5] to-[#fff9e9] p-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4e7bf] text-[#987126]">
              <Wallet size={17} />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#987126]">
                Filtered Deposit Total
              </p>

              <p className="text-[10px] font-semibold text-slate-500">
                Based on current search results
              </p>
            </div>
          </div>

          <p className="text-xl font-black text-[#174b31]">
            ${totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>
      )}

    </div>
  );
};

export default DepositHistory;
