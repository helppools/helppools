// // import React, { useEffect, useState, useCallback } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from '../../context/AuthContext';
// // import { Search, ChevronLeft, ChevronRight, ArrowRightLeft, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

// // const MyTransfers = () => {
// //   const { user } = useAuth();
// //   const [transfers, setTransfers] = useState([]);
// //   const [view, setView] = useState("sent");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [itemsPerPage, setItemsPerPage] = useState(10);
// //   const [loading, setLoading] = useState(true);

// //   const userId = user?.userId;

// //   const fetchTransfers = useCallback(async () => {
// //     if (!userId) return;
// //     try {
// //       setLoading(true);
// //       const res = await api.get(
// //         `/transaction/transactions/${userId}?type=transfer&t=${new Date().getTime()}`
// //       );
      
// //       const rawData = res.data || [];

// //       // 🔥 DUPLICATE FIX LOGIC: Ek hi transfer ki 2 entry aane par use 1 bana dega
// //       const uniqueData = rawData.reduce((acc, current) => {
// //         // Check karega ki kya same amount, same sender aur same receiver ki entry pehle se hai (within 10 seconds)
// //         const isDuplicate = acc.find(item => 
// //           item.amount === current.amount && 
// //           item.toUserId === current.toUserId && 
// //           item.fromUserId === current.fromUserId &&
// //           Math.abs(new Date(item.createdAt).getTime() - new Date(current.createdAt).getTime()) < 10000 
// //         );
        
// //         if (!isDuplicate) {
// //           acc.push(current);
// //         }
// //         return acc;
// //       }, []);

// //       // Ensure the newest transfers are on top
// //       const sortedData = uniqueData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //       setTransfers(sortedData);
// //     } catch (err) {
// //       console.error("❌ Failed to fetch transfers", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   useEffect(() => {
// //     fetchTransfers();
// //   }, [fetchTransfers]);

// //   const sentTransfers = transfers.filter((txn) => String(txn.fromUserId) === String(userId));
// //   const receivedTransfers = transfers.filter((txn) => String(txn.toUserId) === String(userId));
  
// //   const filtered = view === "sent" ? sentTransfers : receivedTransfers;

// //   // 🔥 TOTALS CALCULATION
// //   const totalSentAmount = sentTransfers.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
// //   const totalReceivedAmount = receivedTransfers.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);

// //   const searchedTransfers = filtered.filter((txn) => {
// //     const searchLower = searchTerm.toLowerCase();
// //     return view === "sent"
// //       ? txn.toUserId?.toString().toLowerCase().includes(searchLower)
// //       : txn.fromUserId?.toString().toLowerCase().includes(searchLower);
// //   });

// //   const totalPages = Math.ceil(searchedTransfers.length / itemsPerPage) || 1;
// //   const paginatedTransfers = searchedTransfers.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
// //   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

// //   return (
// //     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
// //       {/* Scrollbar CSS */}
// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
// //         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
// //       `}</style>

// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
// //              <ArrowRightLeft className="text-green-500" size={28} /> P2P Transfers
// //           </h2>
// //           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// //             Manage your sent and received funds
// //           </p>
// //         </div>
// //       </div>

// //       {/* 🔥 SUMMARY BOXES (TOTAL SENT & RECEIVED) */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //         <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex items-center justify-between group hover:shadow-md transition-all">
// //           <div>
// //             <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Total Sent</p>
// //             <h3 className="text-2xl font-black text-red-500">${totalSentAmount.toFixed(2)}</h3>
// //           </div>
// //           <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
// //             <ArrowUpRight size={24} strokeWidth={3} />
// //           </div>
// //         </div>
        
// //         <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex items-center justify-between group hover:shadow-md transition-all">
// //           <div>
// //             <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Total Received</p>
// //             <h3 className="text-2xl font-black text-green-500">${totalReceivedAmount.toFixed(2)}</h3>
// //           </div>
// //           <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
// //             <ArrowDownLeft size={24} strokeWidth={3} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Toggle View (Sent / Received) */}
// //       <div className="flex gap-4 mb-6 bg-white shadow-sm p-2 w-fit rounded-xl border border-slate-200">
// //         <button
// //           onClick={() => { setView("sent"); setSearchTerm(""); setCurrentPage(1); }}
// //           className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs md:text-sm font-black tracking-widest uppercase transition-all ${
// //             view === "sent" 
// //               ? "bg-green-500 text-slate-900 shadow-[0_0_15px_rgba(249,115,22,0.4)]" 
// //               : "bg-transparent text-gray-500 hover:text-slate-900"
// //           }`}
// //         >
// //           <ArrowUpRight size={16} /> Sent
// //         </button>
// //         <button
// //           onClick={() => { setView("received"); setSearchTerm(""); setCurrentPage(1); }}
// //           className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs md:text-sm font-black tracking-widest uppercase transition-all ${
// //             view === "received" 
// //               ? "bg-green-500 text-slate-900 shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
// //               : "bg-transparent text-gray-500 hover:text-slate-900"
// //           }`}
// //         >
// //           <ArrowDownLeft size={16} /> Received
// //         </button>
// //       </div>

// //       {/* Filters (Search & Entries) */}
// //       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
        
// //         <div className="relative w-full sm:w-80 group">
// //            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// //              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
// //            </div>
// //            <input
// //              type="text"
// //              placeholder={view === "sent" ? "Search Receiver ID..." : "Search Sender ID..."}
// //              value={searchTerm}
// //              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
// //              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
// //            />
// //         </div>

// //         <div className="flex items-center gap-3 w-full sm:w-auto">
// //            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Show:</span>
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
// //                                 <th className="p-4 font-black text-right">Date & Time</th>

// //                 <th className="p-4 font-black">Type</th>
// //                 <th className="p-4 font-black">{view === "sent" ? "To User" : "From User"}</th>
// //                 <th className="p-4 font-black text-center">Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody className="text-slate-600">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-12">
// //                     <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// //                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Transfers...</span>
// //                   </td>
// //                 </tr>
// //               ) : paginatedTransfers.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-12">
// //                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">
// //                       No {view} transfers found
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginatedTransfers.map((txn, idx) => {
// //                   const date = new Date(txn.createdAt);
// //                   const isSent = view === "sent";
                  
// //                   return (
// //                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-white/5 transition-colors bg-white">
                      
// //                       <td className="p-4 font-bold text-gray-500 text-center">
// //                         {(currentPage - 1) * itemsPerPage + idx + 1}
// //                       </td>

// //                       <td className="p-4 text-gray-500 font-mono text-[10px] sm:text-xs text-right">
// //                         <div className="flex flex-col items-end">
// //                            <span className="text-slate-600">{date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
// //                            <span>{date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
// //                         </div>
// //                       </td>

// //                       <td className="p-4">
// //                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${
// //                           isSent 
// //                             ? "bg-red-50 text-red-500 border-red-200" 
// //                             : "bg-green-50 text-green-500 border-green-200"
// //                         }`}>
// //                           {isSent ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownLeft size={12} strokeWidth={3} />}
// //                           {isSent ? "Sent" : "Received"}
// //                         </span>
// //                       </td>

// //                       <td className="p-4 font-black text-slate-900">
// //                          <span className="bg-slate-50 px-3 py-1.5 border border-slate-200 rounded-lg">
// //                            {isSent ? txn.toUserId : txn.fromUserId}
// //                          </span>
// //                       </td>

// //                       <td className="p-4 font-black text-center">
// //                         <span className={`text-base drop-shadow-md ${isSent ? "text-red-500" : "text-green-500"}`}>
// //                           {isSent ? "-" : "+"} ${Number(txn.amount || 0).toFixed(2)}
// //                         </span>
// //                       </td>
                    
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination Footer */}
// //         {!loading && searchedTransfers.length > 0 && (
// //            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
// //               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
// //                 Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, searchedTransfers.length)} of {searchedTransfers.length} Entries
// //               </span>
              
// //               <div className="flex items-center gap-2">
// //                  <button
// //                    onClick={handlePrev}
// //                    disabled={currentPage === 1}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 text-gray-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-500 border border-slate-200 hover:border-green-500/30 shadow-sm'}`}
// //                  >
// //                    <ChevronLeft size={18} />
// //                  </button>
                 
// //                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
// //                     {currentPage} / {totalPages}
// //                  </span>
                 
// //                  <button
// //                    onClick={handleNext}
// //                    disabled={currentPage === totalPages}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 text-gray-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-500 border border-slate-200 hover:border-green-500/30 shadow-sm'}`}
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

// // export default MyTransfers;




// import React, { useEffect, useState, useCallback } from "react";
// import api from "../../api/axios";
// import { useAuth } from '../../context/AuthContext';
// import { Search, ChevronLeft, ChevronRight, ArrowRightLeft, ArrowUpRight, ArrowDownLeft, Wallet, Coins } from "lucide-react";

// const MyTransfers = () => {
//   const { user } = useAuth();
//   const [transfers, setTransfers] = useState([]);
//   const [view, setView] = useState("sent");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   const userId = user?.userId;

//   const fetchTransfers = useCallback(async () => {
//     if (!userId) return;
//     try {
//       setLoading(true);
      
//       // 🌟 Yahan hum `/wallet/history` use karenge kyunki wahan Decimal128 fix aur saare naye types hain
//       const res = await api.get(`/wallet/history/${userId}?t=${new Date().getTime()}`);
      
//       let rawData = [];
//       if (res.data && res.data.history) {
//           rawData = res.data.history;
//       } else if (Array.isArray(res.data)) {
//           rawData = res.data;
//       }

//       // 🔥 FILTER SIRF P2P TRANSFERS KE LIYE (MAIN, USDT BEP20, & CCT)
//       const p2pData = rawData.filter(t => {
//           const isTransferType = ['transfer', 'cct_transfer', 'usdt_bep20_transfer'].includes(t.type);
//           const isUsdtReceiverCredit = (t.type === 'credit' && t.source === 'usdt_bep20_transfer');
//           return isTransferType || isUsdtReceiverCredit;
//       });

//       // 🧹 CLEANUP & STANDARDIZE DATA
//       const formattedData = p2pData.map(txn => {
//           const amt = Number(txn.amount || txn.grossAmount || 0);
          
//           const isSender = String(txn.fromUserId) === String(userId) || 
//                           (!txn.fromUserId && String(txn.userId) === String(userId));
//           const isReceiver = String(txn.toUserId) === String(userId);
          
//           let currency = "wallet ";
//           if (txn.type === 'cct_transfer') currency = "CCT";
//           if (txn.source === 'usdt_bep20' || txn.source === 'usdt_bep20_transfer' || txn.type === 'usdt_bep20_transfer') currency = "USDT";

//           return {
//               ...txn,
//               amt,
//               isSent: isSender && !isReceiver ? true : (isReceiver ? false : true),
//               partyId: isSender && !isReceiver ? txn.toUserId : (txn.fromUserId || txn.userId),
//               currency,
//               dateObj: txn.createdAt || txn.date || new Date()
//           };
//       });

//       // 🔥 DUPLICATE FIX LOGIC
//       const uniqueData = formattedData.reduce((acc, current) => {
//         const isDuplicate = acc.find(item => 
//           item.amt === current.amt && 
//           item.currency === current.currency &&
//           item.isSent === current.isSent &&
//           item.partyId === current.partyId &&
//           Math.abs(new Date(item.dateObj).getTime() - new Date(current.dateObj).getTime()) < 10000 
//         );
        
//         if (!isDuplicate) {
//           acc.push(current);
//         }
//         return acc;
//       }, []);

//       const sortedData = uniqueData.sort((a, b) => new Date(b.dateObj) - new Date(a.dateObj));
//       setTransfers(sortedData);
//     } catch (err) {
//       console.error("❌ Failed to fetch transfers", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchTransfers();
//   }, [fetchTransfers]);

//   const sentTransfers = transfers.filter((txn) => txn.isSent);
//   const receivedTransfers = transfers.filter((txn) => !txn.isSent);
  
//   const filtered = view === "sent" ? sentTransfers : receivedTransfers;

//   // 🔥 TOTALS CALCULATION (Alag alag taaki USDT/Main aur CCT mix na ho jaye)
//   const totalSentUSD = sentTransfers.filter(t => t.currency !== 'CCT').reduce((sum, txn) => sum + txn.amt, 0);
//   const totalSentCCT = sentTransfers.filter(t => t.currency === 'CCT').reduce((sum, txn) => sum + txn.amt, 0);
  
//   const totalReceivedUSD = receivedTransfers.filter(t => t.currency !== 'CCT').reduce((sum, txn) => sum + txn.amt, 0);
//   const totalReceivedCCT = receivedTransfers.filter(t => t.currency === 'CCT').reduce((sum, txn) => sum + txn.amt, 0);

//   const searchedTransfers = filtered.filter((txn) => {
//     const searchLower = searchTerm.toLowerCase();
//     return txn.partyId?.toString().toLowerCase().includes(searchLower) ||
//            txn.currency.toLowerCase().includes(searchLower);
//   });

//   const totalPages = Math.ceil(searchedTransfers.length / itemsPerPage) || 1;
//   const paginatedTransfers = searchedTransfers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

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
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
//              <ArrowRightLeft className="text-green-500" size={28} /> P2P Transfers
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             Manage your sent and received funds
//           </p>
//         </div>
//       </div>

//       {/* 🔥 SUMMARY BOXES (TOTAL SENT & RECEIVED WITH CCT SPLIT) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[20px] rounded-full"></div>
//           <div className="relative z-10">
//             <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Sent</p>
//             <div className="flex flex-col gap-1">
//               <h3 className="text-2xl font-black text-red-500 flex items-center gap-2">
//                 <Wallet size={18} /> ${totalSentUSD.toFixed(2)}
//               </h3>
//               <h3 className="text-sm font-black text-indigo-600 flex items-center gap-2">
//                 <Coins size={14} /> {totalSentCCT.toFixed(2)} CCT
//               </h3>
//             </div>
//           </div>
//           <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform relative z-10">
//             <ArrowUpRight size={24} strokeWidth={3} />
//           </div>
//         </div>
        
//         <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[20px] rounded-full"></div>
//           <div className="relative z-10">
//             <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Received</p>
//             <div className="flex flex-col gap-1">
//               <h3 className="text-2xl font-black text-green-500 flex items-center gap-2">
//                 <Wallet size={18} /> ${totalReceivedUSD.toFixed(2)}
//               </h3>
//               <h3 className="text-sm font-black text-indigo-600 flex items-center gap-2">
//                 <Coins size={14} /> {totalReceivedCCT.toFixed(2)} CCT
//               </h3>
//             </div>
//           </div>
//           <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform relative z-10">
//             <ArrowDownLeft size={24} strokeWidth={3} />
//           </div>
//         </div>
//       </div>

//       {/* Toggle View (Sent / Received) */}
//       <div className="flex gap-4 mb-6 bg-white shadow-sm p-2 w-fit rounded-xl border border-slate-200">
//         <button
//           onClick={() => { setView("sent"); setSearchTerm(""); setCurrentPage(1); }}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs md:text-sm font-black tracking-widest uppercase transition-all ${
//             view === "sent" 
//               ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
//               : "bg-transparent text-gray-500 hover:text-slate-900"
//           }`}
//         >
//           <ArrowUpRight size={16} /> Sent
//         </button>
//         <button
//           onClick={() => { setView("received"); setSearchTerm(""); setCurrentPage(1); }}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs md:text-sm font-black tracking-widest uppercase transition-all ${
//             view === "received" 
//               ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
//               : "bg-transparent text-gray-500 hover:text-slate-900"
//           }`}
//         >
//           <ArrowDownLeft size={16} /> Received
//         </button>
//       </div>

//       {/* Filters (Search & Entries) */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
        
//         <div className="relative w-full sm:w-80 group">
//            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//              <Search size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//            </div>
//            <input
//              type="text"
//              placeholder={view === "sent" ? "Search Receiver ID or USDT/CCT..." : "Search Sender ID or USDT/CCT..."}
//              value={searchTerm}
//              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//              className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold tracking-wide rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400"
//            />
//         </div>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Show:</span>
//            <select
//              value={itemsPerPage}
//              onChange={(e) => {
//                setItemsPerPage(Number(e.target.value));
//                setCurrentPage(1);
//              }}
//              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-all appearance-none cursor-pointer"
//            >
//              <option value={10}>10 Rows</option>
//              <option value={20}>20 Rows</option>
//              <option value={50}>50 Rows</option>
//              <option value={100}>100 Rows</option>
//            </select>
//         </div>
//       </div>

//       {/* Table Box */}
//       <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden shadow-2xl relative">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[100px] pointer-events-none rounded-full"></div>
        
//         <div className="overflow-x-auto custom-scroll w-full relative z-10">
//           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
//             <thead className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
//               <tr>
//                 <th className="p-4 font-black text-center w-16">Sr.</th>
//                 <th className="p-4 font-black text-left">Date & Time</th>
//                 <th className="p-4 font-black text-center">Wallet Type</th>
//                 <th className="p-4 font-black text-center">{view === "sent" ? "To User" : "From User"}</th>
//                 <th className="p-4 font-black text-right pr-6">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="text-slate-600">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12">
//                     <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Transfers...</span>
//                   </td>
//                 </tr>
//               ) : paginatedTransfers.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12">
//                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">
//                       No {view} transfers found
//                     </span>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedTransfers.map((txn, idx) => {
//                   const date = new Date(txn.dateObj);
//                   const isSent = view === "sent";
                  
//                   // 🔥 Currency Badge Styles
//                   let badgeStyle = "bg-green-50 text-green-600 border-green-200";
//                   if (txn.currency === "USDT") badgeStyle = "bg-cyan-50 text-cyan-600 border-cyan-200";
//                   if (txn.currency === "CCT") badgeStyle = "bg-indigo-50 text-indigo-600 border-indigo-200";

//                   return (
//                     <tr key={txn._id || idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors bg-white">
                      
//                       <td className="p-4 font-bold text-gray-500 text-center">
//                         {(currentPage - 1) * itemsPerPage + idx + 1}
//                       </td>

//                       <td className="p-4 text-gray-500 font-mono text-[10px] sm:text-xs text-left">
//                         <div className="flex flex-col">
//                            <span className="text-slate-600">{date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
//                            <span>{date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
//                         </div>
//                       </td>

//                       <td className="p-4 text-center">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${badgeStyle}`}>
//                           {txn.currency === "CCT" ? <Coins size={12} strokeWidth={3} /> : <Wallet size={12} strokeWidth={3} />}
//                           {txn.currency}
//                         </span>
//                       </td>

//                       <td className="p-4 font-black text-slate-900 text-center">
//                          <span className="bg-slate-100 px-3 py-1.5 border border-slate-200 rounded-lg">
//                            {txn.partyId || "-"}
//                          </span>
//                       </td>

//                       <td className="p-4 font-black text-right pr-6">
//                         <span className={`text-base drop-shadow-md ${isSent ? "text-red-500" : "text-green-500"}`}>
//                           {isSent ? "-" : "+"} {txn.currency !== "CCT" && "$"}{Number(txn.amt).toFixed(2)} {txn.currency === "CCT" && "CCT"}
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
//         {!loading && searchedTransfers.length > 0 && (
//            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
//               <span className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
//                 Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, searchedTransfers.length)} of {searchedTransfers.length} Entries
//               </span>
              
//               <div className="flex items-center gap-2">
//                  <button
//                    onClick={handlePrev}
//                    disabled={currentPage === 1}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 text-gray-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-500 border border-slate-200 hover:border-green-500/30 shadow-sm'}`}
//                  >
//                    <ChevronLeft size={18} />
//                  </button>
                 
//                  <span className="bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
//                     {currentPage} / {totalPages}
//                  </span>
                 
//                  <button
//                    onClick={handleNext}
//                    disabled={currentPage === totalPages}
//                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 text-gray-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-900 hover:bg-green-50 hover:text-green-500 border border-slate-200 hover:border-green-500/30 shadow-sm'}`}
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

// export default MyTransfers;



import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CalendarDays,
  RefreshCw,
  X,
  Send,
  Download,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

const MyTransfers = () => {
  const { user } = useAuth();

  const [transfers, setTransfers] = useState([]);
  const [view, setView] = useState("sent");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = user?.userId;

  const fetchTransfers = useCallback(async () => {
    if (!userId) {
      setTransfers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        `/transaction/transactions/${userId}?type=transfer&t=${new Date().getTime()}`
      );

      const rawData = Array.isArray(res.data) ? res.data : [];

      // Remove duplicate entries of the same transfer within 10 seconds
      const uniqueData = rawData.reduce((acc, current) => {
        const isDuplicate = acc.find(
          (item) =>
            Number(item.amount) === Number(current.amount) &&
            String(item.toUserId) === String(current.toUserId) &&
            String(item.fromUserId) === String(current.fromUserId) &&
            Math.abs(
              new Date(item.createdAt).getTime() -
                new Date(current.createdAt).getTime()
            ) < 10000
        );

        if (!isDuplicate) {
          acc.push(current);
        }

        return acc;
      }, []);

      const sortedData = uniqueData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setTransfers(sortedData);
    } catch (err) {
      console.error("Failed to fetch transfers", err);
      setError(
        err.response?.data?.message ||
          "Unable to load transfer history. Please try again."
      );
      setTransfers([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  const sentTransfers = transfers.filter(
    (txn) => String(txn.fromUserId) === String(userId)
  );

  const receivedTransfers = transfers.filter(
    (txn) => String(txn.toUserId) === String(userId)
  );

  const filtered = view === "sent" ? sentTransfers : receivedTransfers;

  const totalSentAmount = sentTransfers.reduce(
    (sum, txn) => sum + Number(txn.amount || 0),
    0
  );

  const totalReceivedAmount = receivedTransfers.reduce(
    (sum, txn) => sum + Number(txn.amount || 0),
    0
  );

  const searchedTransfers = filtered.filter((txn) => {
    const searchLower = searchTerm.toLowerCase().trim();

    if (!searchLower) return true;

    return view === "sent"
      ? String(txn.toUserId || "").toLowerCase().includes(searchLower)
      : String(txn.fromUserId || "").toLowerCase().includes(searchLower);
  });

  const totalPages =
    Math.ceil(searchedTransfers.length / itemsPerPage) || 1;

  const paginatedTransfers = searchedTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setSearchTerm("");
    setCurrentPage(1);
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

  const formatAmount = (amount) => {
    const value = Number(amount || 0);
    return Number.isFinite(value) ? value.toFixed(2) : "0.00";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">
      <style>{`
        .transfer-history-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .transfer-history-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }

        .transfer-history-scroll::-webkit-scrollbar-thumb {
          background: #b8c99c;
          border-radius: 20px;
        }

        .transfer-history-scroll::-webkit-scrollbar-thumb:hover {
          background: #78964c;
        }

        .transfer-history-row {
          transition: background .2s ease;
        }

        .transfer-history-row:hover {
          background: #f6faf3;
        }

        @media (max-width: 640px) {
          .transfer-history-mobile { display: block; }
          .transfer-history-desktop { display: none; }
        }

        @media (min-width: 641px) {
          .transfer-history-mobile { display: none; }
          .transfer-history-desktop { display: block; }
        }
      `}</style>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-green-800 to-green-500 flex items-center justify-center shadow-lg shadow-green-900/15 shrink-0">
            <ArrowRightLeft size={23} className="text-white" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              P2P Transfers
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-5 h-[2px] bg-yellow-500 rounded-full" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[1.5px] text-slate-500">
                Transfer History
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-green-800 bg-green-50 border border-green-100 rounded-xl px-3 py-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Transfers
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
        {/* Sent */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-red-100 p-4 sm:p-5 shadow-sm">
          <div className="absolute -right-7 -top-8 w-28 h-28 rounded-full bg-red-50" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <Send size={16} className="text-red-500" />
                </div>
                <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Total Sent
                </p>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                ${formatAmount(totalSentAmount)}
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                {sentTransfers.length} sent transactions
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <ArrowUpRight size={24} className="text-red-500" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-red-50">
            <div className="h-full w-1/3 bg-red-400 rounded-r-full" />
          </div>
        </div>

        {/* Received */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-green-100 p-4 sm:p-5 shadow-sm">
          <div className="absolute -right-7 -top-8 w-28 h-28 rounded-full bg-green-50" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Download size={16} className="text-green-700" />
                </div>
                <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Total Received
                </p>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-green-700 tracking-tight">
                ${formatAmount(totalReceivedAmount)}
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                {receivedTransfers.length} received transactions
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <ArrowDownLeft size={24} className="text-green-700" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-green-50">
            <div className="h-full w-1/3 bg-green-500 rounded-r-full" />
          </div>
        </div>
      </div>

      {/* Sent / Received Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleViewChange("sent")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              view === "sent"
                ? "bg-gradient-to-r from-green-800 to-green-600 text-white shadow-md shadow-green-900/15"
                : "bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-800"
            }`}
          >
            <ArrowUpRight size={17} />
            Sent Transfers
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] ${
                view === "sent"
                  ? "bg-white/20 text-white"
                  : "bg-white text-slate-500"
              }`}
            >
              {sentTransfers.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleViewChange("received")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              view === "received"
                ? "bg-gradient-to-r from-green-800 to-green-600 text-white shadow-md shadow-green-900/15"
                : "bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-800"
            }`}
          >
            <ArrowDownLeft size={17} />
            Received
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] ${
                view === "received"
                  ? "bg-white/20 text-white"
                  : "bg-white text-slate-500"
              }`}
            >
              {receivedTransfers.length}
            </span>
          </button>
        </div>
      </div>

      {/* Search and Entries */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder={
                view === "sent"
                  ? "Search Receiver ID..."
                  : "Search Sender ID..."
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FileText size={15} className="text-green-700" />
              <span>{searchedTransfers.length} Records</span>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 outline-none focus:border-green-600"
              aria-label="Rows per page"
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={50}>50 / Page</option>
              <option value={100}>100 / Page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transfer Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-100 bg-white">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              {view === "sent" ? "Sent Transactions" : "Received Transactions"}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {view === "sent"
                ? "Transfers sent to other users"
                : "Transfers received from other users"}
            </p>
          </div>

          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <Users size={16} className="text-green-700" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="transfer-history-desktop overflow-x-auto transfer-history-scroll">
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
                  {view === "sent" ? "Receiver ID" : "Sender ID"}
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
                      Loading transfers...
                    </p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="py-14 text-center">
                    <p className="text-sm font-bold text-red-600">{error}</p>
                    <button
                      type="button"
                      onClick={fetchTransfers}
                      className="mt-3 text-xs font-bold text-green-700 hover:underline"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : paginatedTransfers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-14 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <ArrowRightLeft
                        size={22}
                        className="text-slate-400"
                      />
                    </div>
                    <p className="text-sm font-bold text-slate-600">
                      No {view} transfers found
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchTerm
                        ? "Try another user ID."
                        : "Your transfer records will appear here."}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedTransfers.map((txn, idx) => {
                  const isSent = view === "sent";
                  const date = formatDate(txn.createdAt);
                  const counterparty = isSent
                    ? txn.toUserId
                    : txn.fromUserId;

                  return (
                    <tr
                      key={txn._id || idx}
                      className="transfer-history-row border-b border-slate-100 last:border-0"
                    >
                      <td className="px-4 py-4 text-center text-xs font-bold text-slate-400">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
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
                            isSent
                              ? "bg-red-50 text-red-600 border-red-100"
                              : "bg-green-50 text-green-700 border-green-100"
                          }`}
                        >
                          {isSent ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownLeft size={12} />
                          )}
                          {isSent ? "Sent" : "Received"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                          <Users size={13} className="text-green-700" />
                          {counterparty || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <span
                          className={`text-sm font-extrabold ${
                            isSent ? "text-red-600" : "text-green-700"
                          }`}
                        >
                          {isSent ? "-" : "+"} $
                          {formatAmount(txn.amount)}
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
        <div className="transfer-history-mobile p-3 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw
                size={25}
                className="animate-spin text-green-600 mx-auto mb-3"
              />
              <p className="text-xs font-bold text-slate-500">
                Loading transfers...
              </p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-sm font-bold text-red-600">{error}</p>
              <button
                type="button"
                onClick={fetchTransfers}
                className="mt-3 text-xs font-bold text-green-700 hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : paginatedTransfers.length === 0 ? (
            <div className="py-12 text-center">
              <ArrowRightLeft
                size={24}
                className="text-slate-400 mx-auto mb-3"
              />
              <p className="text-sm font-bold text-slate-600">
                No {view} transfers found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {searchTerm
                  ? "Try another user ID."
                  : "Your transfer records will appear here."}
              </p>
            </div>
          ) : (
            paginatedTransfers.map((txn, idx) => {
              const isSent = view === "sent";
              const date = formatDate(txn.createdAt);
              const counterparty = isSent
                ? txn.toUserId
                : txn.fromUserId;

              return (
                <div
                  key={txn._id || idx}
                  className="border border-slate-200 rounded-xl p-3.5 bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSent
                            ? "bg-red-50 text-red-500"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {isSent ? (
                          <ArrowUpRight size={18} />
                        ) : (
                          <ArrowDownLeft size={18} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-slate-800">
                          {isSent ? "Sent Transfer" : "Received Transfer"}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {isSent ? "Receiver ID" : "Sender ID"}:{" "}
                          <span className="font-bold text-slate-600">
                            {counterparty || "-"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      className={`text-sm font-extrabold shrink-0 ${
                        isSent ? "text-red-600" : "text-green-700"
                      }`}
                    >
                      {isSent ? "-" : "+"} ${formatAmount(txn.amount)}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <CalendarDays
                        size={12}
                        className="text-green-700"
                      />
                      <span>{date.date}</span>
                      <span className="text-slate-300">•</span>
                      <span>{date.time}</span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400">
                      #{(currentPage - 1) * itemsPerPage + idx + 1}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && searchedTransfers.length > 0 && (
          <div className="px-3 sm:px-5 py-3.5 border-t border-slate-100 bg-[#fbfcfa] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Rows
              </span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-9 px-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none focus:border-green-600"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 text-center">
              Showing{" "}
              <span className="font-extrabold text-slate-800">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-extrabold text-slate-800">
                {Math.min(
                  currentPage * itemsPerPage,
                  searchedTransfers.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-slate-800">
                {searchedTransfers.length}
              </span>
            </p>

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

      {/* Footer */}
      <div className="mt-3 flex items-start gap-2 px-1">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Transfer records are displayed according to the available transaction history.
        </p>
      </div>
    </div>
  );
};

export default MyTransfers;
