// // import React, { useEffect, useState } from "react";
// // import { format } from "date-fns";
// // import { useAuth } from "../../context/AuthContext";
// // import api from "../../api/axios";
// // import { Search, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft, RefreshCcw, CheckCircle2, User } from "lucide-react";

// // const TopupDetails = () => {
// //   const { user } = useAuth();
// //   const [topups, setTopups] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   useEffect(() => {
// //     const fetchTopups = async () => {
// //       if (!user?.userId) {
// //         setLoading(false);
// //         setError("User not found. Please log in.");
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         // 🔥 CACHE FIX: Real-time data fetch karne ke liye timestamp add kiya
// //         const res = await api.get(`/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`);
        
// //         if (Array.isArray(res.data)) {
// //           // Naya filter logic jo backend se aane wale har topup record ko scan karega
// //           const userTopups = res.data.filter((t) => {
// //             const typeStr = (t.type || "").toLowerCase();
// //             const sourceStr = (t.source || "").toLowerCase();
// //             const descStr = (t.description || "").toUpperCase();
            
// //             // Check if transaction is related to topup/activation
// //             const isTopupRelated = typeStr.includes("topup") || sourceStr.includes("topup") || typeStr === "activation";
// //             const isNotPromo = !descStr.includes("PROMOTION");
            
// //             return isTopupRelated && isNotPromo;
// //           });

// //           // Duplicate entries ko remove karne ka filter
// //           const uniqueTopups = Array.from(
// //             new Map(userTopups.map((t) => [`${t._id}-${t.createdAt}`, t])).values()
// //           );

// //           // Latest entries sabse upar dikhane ke liye sort
// //           uniqueTopups.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

// //           setTopups(uniqueTopups);
// //         } else {
// //           setTopups([]);
// //         }
// //       } catch (err) {
// //         console.error("Topup fetch error:", err);
// //         setError(err.response?.data?.message || "Failed to load top-ups.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTopups();
// //   }, [user]);

// //   const handleSearch = (e) => {
// //     setSearchQuery(e.target.value);
// //     setCurrentPage(1); 
// //   };

// //   const filteredTopups = topups.filter((t) => {
// //     const searchLower = searchQuery.toLowerCase();
// //     const senderIdStr = (t.fromUserId || t.userId || "").toString().toLowerCase();
// //     const receiverIdStr = (t.toUserId || t.userId || "").toString().toLowerCase();
// //     const descStr = (t.description || "").toLowerCase();
// //     const amountStr = (t.amount || t.grossAmount || "").toString().toLowerCase();

// //     return (
// //       senderIdStr.includes(searchLower) ||
// //       receiverIdStr.includes(searchLower) ||
// //       descStr.includes(searchLower) ||
// //       amountStr.includes(searchLower)
// //     );
// //   });

// //   const totalPages = Math.ceil(filteredTopups.length / rowsPerPage) || 1;
// //   const indexOfLastRow = currentPage * rowsPerPage;
// //   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
// //   const currentRows = filteredTopups.slice(indexOfFirstRow, indexOfLastRow);

// //   const handleRowsPerPageChange = (e) => {
// //     setRowsPerPage(Number(e.target.value));
// //     setCurrentPage(1);
// //   };

// //   const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
// //   const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

// //   return (
// //     <div className="w-full max-w-7xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
// //       {/* Scrollbar CSS */}
// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
// //         .custom-scroll::-webkit-scrollbar-track { background: #f8fafc; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
// //       `}</style>

// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700 uppercase tracking-wide flex items-center gap-3">
// //              <RefreshCcw className="text-green-500" size={28} /> Node Top-Up Details
// //           </h2>
// //           <p className="text-slate-500 text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// //             Track all self, sent, and received node activations
// //           </p>
// //         </div>
// //       </div>

// //       {/* Filters (Search & Entries) */}
// //       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-200">
        
// //         <div className="relative w-full sm:w-80 group">
// //            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// //              <Search size={16} className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
// //            </div>
// //            <input
// //              type="text"
// //              placeholder="Search ID, details, amount..."
// //              value={searchQuery}
// //              onChange={handleSearch}
// //              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:bg-white focus:outline-none transition-all placeholder-slate-400 font-bold tracking-wide shadow-inner"
// //            />
// //         </div>

// //       </div>

// //       {/* Table Box */}
// //       <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden relative">
// //         <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] pointer-events-none rounded-full"></div>
        
// //         <div className="overflow-x-auto custom-scroll w-full relative z-10">
// //           <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
// //             <thead className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-slate-200">
// //               <tr>
// //                 <th className="p-4 font-black text-center">Sr.</th>
// //                 <th className="p-4 font-black">Date & Time</th>
// //                 <th className="p-4 font-black">Action Type</th>
// //                 <th className="p-4 font-black">Topped Up By (Sender)</th>
// //                 <th className="p-4 font-black">Topped Up For (Receiver)</th>
// //                 <th className="p-4 font-black text-center">Amount</th>
// //                 <th className="p-4 font-black">Details</th>
// //               </tr>
// //             </thead>

// //             <tbody className="text-slate-600">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-10">
// //                      <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// //                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading History...</span>
// //                   </td>
// //                 </tr>
// //               ) : error ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-10">
// //                      <span className="text-red-500 font-bold text-sm uppercase tracking-widest bg-red-50 px-4 py-2 rounded-lg border border-red-200">{error}</span>
// //                   </td>
// //                 </tr>
// //               ) : currentRows.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-10">
// //                     <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Top-up Records Found</span>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 currentRows.map((t, idx) => {
                  
// //                   // 🔥 SMART SENDER / RECEIVER IDENTIFICATION LOGIC
// //                   const currentUserId = String(user?.userId || "");
// //                   let senderId = t.fromUserId ? String(t.fromUserId) : String(t.userId);
// //                   let receiverId = t.toUserId ? String(t.toUserId) : String(t.userId);

// //                   const isDebitTransaction = t.type?.toLowerCase().includes("debit") || Number(t.amount) < 0;

// //                   // Agar aapke wallet se amount cut hua hai (Debit), iska matlab aapne topup kiya hai (Sender = YOU)
// //                   if (isDebitTransaction && !t.toUserId) {
// //                       senderId = currentUserId; 
                      
// //                       // 🚀 SMART SCANNER: Description se receiver ki ID nikalna (e.g., "Topup for User #123456")
// //                       const descMatch = t.description?.match(/(?:for|user|to|#|-)\s*([0-9]{4,10})/i);
// //                       if (descMatch && descMatch[1]) {
// //                           receiverId = descMatch[1];
// //                       } else {
// //                           receiverId = "Team Member"; // Agar id na mile toh default naam
// //                       }
// //                   }

// //                   let tagDetails = { icon: null, text: "", style: "" };

// //                   // Relation aur Action Type Set Karna
// //                   if (senderId === currentUserId && receiverId === currentUserId) {
// //                     tagDetails = { icon: <CheckCircle2 size={12}/>, text: "SELF ACTIVATION", style: "bg-emerald-50 text-emerald-600 border-emerald-200" };
// //                   } else if (senderId === currentUserId && receiverId !== currentUserId) {
// //                     tagDetails = { icon: <ArrowUpRight size={12}/>, text: "ACTIVATED FOR TEAM", style: "bg-amber-50 text-amber-600 border-amber-200" };
// //                   } else if (receiverId === currentUserId && senderId !== currentUserId) {
// //                     tagDetails = { icon: <ArrowDownLeft size={12}/>, text: "ACTIVATED BY UPLINE", style: "bg-blue-50 text-blue-600 border-blue-200" };
// //                   } else {
// //                     tagDetails = { icon: <CheckCircle2 size={12}/>, text: "ACTIVATED", style: "bg-slate-100 text-slate-600 border-slate-200" };
// //                   }

// //                   return (
// //                     <tr
// //                       key={`${t._id}-${t.createdAt}-${idx}`}
// //                       className="border-b border-slate-100 hover:bg-slate-50 transition-colors bg-white"
// //                     >
// //                       <td className="p-4 font-bold text-gray-500 text-center">
// //                         {indexOfFirstRow + idx + 1}
// //                       </td>
                      
// //                       <td className="p-4 text-slate-600 font-mono text-[11px] sm:text-xs">
// //                         <div className="flex flex-col">
// //                            <span className="font-bold">{t.createdAt || t.date ? format(new Date(t.createdAt || t.date), "dd MMM yyyy") : "N/A"}</span>
// //                            <span className="text-slate-400">{t.createdAt || t.date ? format(new Date(t.createdAt || t.date), "hh:mm a") : ""}</span>
// //                         </div>
// //                       </td>

// //                       <td className="p-4">
// //                         <span className={`flex items-center gap-1.5 w-fit border py-1.5 px-3 rounded-md text-[10px] font-black tracking-widest shadow-sm ${tagDetails.style}`}>
// //                           {tagDetails.icon} {tagDetails.text}
// //                         </span>
// //                       </td>

// //                       {/* SENDER COLUMN */}
// //                       <td className="p-4 font-black text-slate-700 text-sm">
// //                         <div className="flex items-center gap-2">
// //                            <div className="p-1.5 bg-slate-100 rounded-full text-slate-400"><User size={14}/></div>
// //                            {senderId === currentUserId ? (
// //                              <span className="text-indigo-600 font-black">#{senderId} <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded ml-1">YOU</span></span>
// //                            ) : (
// //                              <span>{senderId.includes("Team") ? senderId : `#${senderId}`}</span>
// //                            )}
// //                         </div>
// //                       </td>

// //                       {/* RECEIVER COLUMN */}
// //                       <td className="p-4 font-black text-slate-700 text-sm">
// //                         <div className="flex items-center gap-2">
// //                            <div className="p-1.5 bg-slate-100 rounded-full text-slate-400"><User size={14}/></div>
// //                            {receiverId === currentUserId ? (
// //                              <span className="text-indigo-600 font-black">#{receiverId} <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded ml-1">YOU</span></span>
// //                            ) : (
// //                              <span>{receiverId.includes("Team") ? receiverId : `#${receiverId}`}</span>
// //                            )}
// //                         </div>
// //                       </td>

// //                       <td className="p-4 font-black text-center">
// //                          <span className="text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-lg text-sm">${Math.abs(t.amount || t.grossAmount)}</span>
// //                       </td>

// //                       <td className="p-4 text-slate-600 text-[11px] md:text-xs font-bold tracking-wide capitalize max-w-[200px] truncate" title={t.description || "Top-up package"}>
// //                         {t.description || "Top-up package"}
// //                       </td>

// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination Footer */}
// //         {!loading && filteredTopups.length > 0 && (
// //            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
              
// //               <div className="flex items-center gap-3">
// //                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Rows:</span>
// //                  <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-2 py-1 focus:border-green-500 outline-none cursor-pointer">
// //                    <option value={10}>10</option>
// //                    <option value={20}>20</option>
// //                    <option value={50}>50</option>
// //                  </select>
// //               </div>

// //               <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
// //                 Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredTopups.length)} of {filteredTopups.length}
// //               </span>
              
// //               <div className="flex items-center gap-2">
// //                  <button
// //                    onClick={handlePrev}
// //                    disabled={currentPage === 1}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-white text-slate-700 hover:bg-green-50 hover:text-green-600 border border-slate-200 shadow-sm'}`}
// //                  >
// //                    <ChevronLeft size={18} />
// //                  </button>
                 
// //                  <span className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
// //                     {currentPage} / {totalPages}
// //                  </span>
                 
// //                  <button
// //                    onClick={handleNext}
// //                    disabled={currentPage === totalPages}
// //                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-white text-slate-700 hover:bg-green-50 hover:text-green-600 border border-slate-200 shadow-sm'}`}
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

// // export default TopupDetails;



// import React, { useEffect, useMemo, useState } from "react";
// import { format } from "date-fns";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../api/axios";
// import {
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpRight,
//   ArrowDownLeft,
//   RefreshCcw,
//   CheckCircle2,
//   User,
//   Wallet,
//   CalendarDays,
//   X,
//   ShieldCheck,
//   Users,
//   Activity,
//   Clock3,
//   Receipt,
//   ArrowDownToLine,
//   ArrowUpFromLine
// } from "lucide-react";

// const TopupDetails = () => {
//   const { user } = useAuth();

//   const [topups, setTopups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Fetch top-up history
//   useEffect(() => {
//     const fetchTopups = async () => {
//       if (!user?.userId) {
//         setLoading(false);
//         setError("User not found. Please log in.");
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");

//         const res = await api.get(
//           `/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`
//         );

//         if (Array.isArray(res.data)) {
//           const userTopups = res.data.filter((t) => {
//             const typeStr = (t.type || "").toLowerCase();
//             const sourceStr = (t.source || "").toLowerCase();
//             const descStr = (t.description || "").toUpperCase();

//             const isTopupRelated =
//               typeStr.includes("topup") ||
//               sourceStr.includes("topup") ||
//               typeStr === "activation";

//             const isNotPromo = !descStr.includes("PROMOTION");

//             return isTopupRelated && isNotPromo;
//           });

//           // Remove duplicate records
//           const uniqueTopups = Array.from(
//             new Map(
//               userTopups.map((t) => [
//                 `${t._id}-${t.createdAt}`,
//                 t
//               ])
//             ).values()
//           );

//           // Latest records first
//           uniqueTopups.sort(
//             (a, b) =>
//               new Date(b.createdAt || b.date) -
//               new Date(a.createdAt || a.date)
//           );

//           setTopups(uniqueTopups);
//         } else {
//           setTopups([]);
//         }
//       } catch (err) {
//         console.error("Topup fetch error:", err);
//         setError(
//           err.response?.data?.message || "Failed to load top-ups."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopups();
//   }, [user]);

//   // Search
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredTopups = useMemo(() => {
//     return topups.filter((t) => {
//       const searchLower = searchQuery.toLowerCase();

//       const senderIdStr = (
//         t.fromUserId || t.userId || ""
//       ).toString().toLowerCase();

//       const receiverIdStr = (
//         t.toUserId || t.userId || ""
//       ).toString().toLowerCase();

//       const descStr = (
//         t.description || ""
//       ).toLowerCase();

//       const amountStr = (
//         t.amount || t.grossAmount || ""
//       ).toString().toLowerCase();

//       return (
//         senderIdStr.includes(searchLower) ||
//         receiverIdStr.includes(searchLower) ||
//         descStr.includes(searchLower) ||
//         amountStr.includes(searchLower)
//       );
//     });
//   }, [topups, searchQuery]);

//   // Pagination
//   const totalPages =
//     Math.ceil(filteredTopups.length / rowsPerPage) || 1;

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;

//   const currentRows = filteredTopups.slice(
//     indexOfFirstRow,
//     indexOfLastRow
//   );

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePrev = () =>
//     currentPage > 1 &&
//     setCurrentPage((prev) => prev - 1);

//   const handleNext = () =>
//     currentPage < totalPages &&
//     setCurrentPage((prev) => prev + 1);

//   const formatDate = (date) => {
//     if (!date) return { day: "N/A", time: "" };

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return { day: "N/A", time: "" };
//     }

//     return {
//       day: format(parsedDate, "dd MMM yyyy"),
//       time: format(parsedDate, "hh:mm a")
//     };
//   };

//   const formatAmount = (transaction) => {
//     return Math.abs(
//       transaction.amount || transaction.grossAmount || 0
//     ).toLocaleString("en-US", {
//       maximumFractionDigits: 2
//     });
//   };

//   // Sender / Receiver identification
//   const getTransactionInfo = (t) => {
//     const currentUserId = String(user?.userId || "");

//     let senderId = t.fromUserId
//       ? String(t.fromUserId)
//       : String(t.userId);

//     let receiverId = t.toUserId
//       ? String(t.toUserId)
//       : String(t.userId);

//     const isDebitTransaction =
//       t.type?.toLowerCase().includes("debit") ||
//       Number(t.amount) < 0;

//     if (isDebitTransaction && !t.toUserId) {
//       senderId = currentUserId;

//       const descMatch = t.description?.match(
//         /(?:for|user|to|#|-)\s*([0-9]{4,10})/i
//       );

//       if (descMatch && descMatch[1]) {
//         receiverId = descMatch[1];
//       } else {
//         receiverId = "Team Member";
//       }
//     }

//     let tagDetails = {
//       icon: <CheckCircle2 size={13} />,
//       text: "ACTIVATED",
//       style:
//         "bg-slate-50 text-slate-600 border-slate-200",
//       mobileStyle: "text-slate-600 bg-slate-100"
//     };

//     if (
//       senderId === currentUserId &&
//       receiverId === currentUserId
//     ) {
//       tagDetails = {
//         icon: <ShieldCheck size={13} />,
//         text: "SELF ACTIVATION",
//         style:
//           "bg-emerald-50 text-emerald-800 border-emerald-200",
//         mobileStyle: "text-emerald-800 bg-emerald-50"
//       };
//     } else if (
//       senderId === currentUserId &&
//       receiverId !== currentUserId
//     ) {
//       tagDetails = {
//         icon: <ArrowUpRight size={13} />,
//         text: "ACTIVATED FOR TEAM",
//         style:
//           "bg-amber-50 text-amber-800 border-amber-200",
//         mobileStyle: "text-amber-800 bg-amber-50"
//       };
//     } else if (
//       receiverId === currentUserId &&
//       senderId !== currentUserId
//     ) {
//       tagDetails = {
//         icon: <ArrowDownLeft size={13} />,
//         text: "ACTIVATED BY UPLINE",
//         style:
//           "bg-blue-50 text-blue-800 border-blue-200",
//         mobileStyle: "text-blue-800 bg-blue-50"
//       };
//     }

//     return {
//       senderId,
//       receiverId,
//       tagDetails,
//       currentUserId
//     };
//   };

//   // User ID display
//   const UserIdentity = ({ id, currentUserId }) => {
//     const isYou = id === currentUserId;

//     return (
//       <div className="flex min-w-0 items-center gap-2">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
//           <User size={15} />
//         </div>

//         <div className="min-w-0">
//           <p
//             className={`truncate text-xs font-black ${
//               isYou ? "text-emerald-800" : "text-slate-700"
//             }`}
//           >
//             {id?.includes("Team") ? id : `#${id}`}
//           </p>

//           {isYou && (
//             <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
//               You
//             </span>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Pagination component
//   const Pagination = () => (
//     <div className="flex items-center justify-center gap-2">
//       <button
//         type="button"
//         onClick={handlePrev}
//         disabled={currentPage === 1}
//         className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
//       >
//         <ChevronLeft size={17} />
//       </button>

//       <span className="min-w-[82px] rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-xs font-black text-[#174b31]">
//         {currentPage} / {totalPages}
//       </span>

//       <button
//         type="button"
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//         className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
//       >
//         <ChevronRight size={17} />
//       </button>
//     </div>
//   );

//   return (
//     <div className="relative z-10 mx-auto w-full max-w-7xl pb-8">

//       <style>{`
//         .hp-topup-scroll::-webkit-scrollbar {
//           height: 6px;
//           width: 6px;
//         }

//         .hp-topup-scroll::-webkit-scrollbar-track {
//           background: #f1f7ef;
//           border-radius: 20px;
//         }

//         .hp-topup-scroll::-webkit-scrollbar-thumb {
//           background: #a8c8aa;
//           border-radius: 20px;
//         }

//         .hp-topup-input:focus {
//           outline: none;
//           border-color: #16834c;
//           box-shadow: 0 0 0 3px rgba(22, 131, 76, .09);
//         }

//         .hp-topup-card {
//           box-shadow: 0 4px 18px rgba(22, 101, 52, 0.045);
//         }

//         .hp-topup-row {
//           transition: background .18s ease;
//         }

//         .hp-topup-row:hover {
//           background: #f5faf3;
//         }
//       `}</style>

//       {/* HEADER */}
//       <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#123d29] via-[#17633d] to-[#21804d] p-4 text-white shadow-md shadow-emerald-900/10 sm:p-5">
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78]">
//               <Wallet size={23} />
//             </div>

//             <div className="min-w-0">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-xl font-black tracking-tight sm:text-2xl">
//                   Top-Up History
//                 </h1>

//                 <span className="rounded-full border border-[#e8c66f]/40 bg-[#d6a83e]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f5d98d]">
//                   Transactions
//                 </span>
//               </div>

//               <p className="mt-1 text-[11px] font-medium text-emerald-100 sm:text-xs">
//                 Track your self, team and upline activations
//               </p>
//             </div>
//           </div>

//           <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78] sm:flex">
//             <Receipt size={24} />
//           </div>
//         </div>

//         <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3">
//           <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
//             <ShieldCheck size={13} className="text-[#f3cf78]" />
//             <span className="text-[10px] font-bold text-white">
//               Activation Records
//             </span>
//           </div>

//           <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
//             <Clock3 size={13} className="text-[#f3cf78]" />
//             <span className="text-[10px] font-bold text-white">
//               Latest First
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
//         <div className="hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//             <Receipt size={19} />
//           </div>

//           <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//             Total Records
//           </p>

//           <h3 className="mt-1 text-2xl font-black text-[#174b31]">
//             {topups.length.toLocaleString("en-IN")}
//           </h3>

//           <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-800 to-emerald-400" />
//         </div>

//         <div className="hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
//             <Activity size={19} />
//           </div>

//           <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//             Matching Results
//           </p>

//           <h3 className="mt-1 text-2xl font-black text-[#174b31]">
//             {filteredTopups.length.toLocaleString("en-IN")}
//           </h3>

//           <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#b68a2e] to-[#e8cf82]" />
//         </div>

//         <div className="col-span-2 hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:col-span-1 sm:p-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
//             <Users size={19} />
//           </div>

//           <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//             Current User
//           </p>

//           <h3 className="mt-1 truncate text-lg font-black text-[#174b31]">
//             #{user?.userId || "-"}
//           </h3>

//           <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-700 to-blue-300" />
//         </div>
//       </div>

//       {/* SEARCH AND FILTER */}
//       <div className="mb-4 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <div className="relative w-full sm:max-w-md">
//             <Search
//               size={17}
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
//             />

//             <input
//               type="text"
//               placeholder="Search ID, details or amount..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="hp-topup-input w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 placeholder:text-slate-400 sm:text-sm"
//             />

//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setCurrentPage(1);
//                 }}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-500"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>

//           <div className="flex items-center justify-between gap-3 sm:justify-end">
//             <div className="flex items-center gap-2">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
//                 Rows
//               </span>

//               <select
//                 value={rowsPerPage}
//                 onChange={handleRowsPerPageChange}
//                 className="rounded-lg border border-emerald-100 bg-[#f8fbf7] px-2.5 py-2 text-xs font-bold text-[#174b31] outline-none focus:border-emerald-500"
//               >
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>

//             <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-extrabold text-emerald-800">
//               {filteredTopups.length} Results
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

//         <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
//           <div className="flex items-center gap-2">
//             <Wallet size={17} className="text-emerald-700" />
//             <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
//               Transaction Records
//             </h3>
//           </div>

//           <span className="text-[10px] font-bold text-slate-400">
//             Top-up & Activation History
//           </span>
//         </div>

//         <div className="hp-topup-scroll w-full overflow-x-auto">
//           <table className="w-full min-w-[1050px] border-collapse text-left text-xs">
//             <thead>
//               <tr className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
//                 <th className="px-4 py-4 text-center font-black">
//                   Sr.
//                 </th>

//                 <th className="px-4 py-4 font-black">
//                   Date & Time
//                 </th>

//                 <th className="px-4 py-4 font-black">
//                   Action Type
//                 </th>

//                 <th className="px-4 py-4 font-black">
//                   Sender
//                 </th>

//                 <th className="px-4 py-4 font-black">
//                   Receiver
//                 </th>

//                 <th className="px-4 py-4 text-center font-black">
//                   Amount
//                 </th>

//                 <th className="px-4 py-4 font-black">
//                   Details
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-emerald-50">
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="py-16 text-center">
//                     <RefreshCcw
//                       size={26}
//                       className="mx-auto mb-3 animate-spin text-emerald-600"
//                     />

//                     <p className="text-xs font-bold text-slate-500">
//                       Loading transaction history...
//                     </p>
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="7" className="py-16 text-center">
//                     <div className="mx-auto max-w-md rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
//                       {error}
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentRows.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="py-16 text-center">
//                     <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
//                       <Receipt size={23} />
//                     </div>

//                     <p className="text-sm font-black text-[#174b31]">
//                       No Top-Up Records Found
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Try searching with another ID or amount
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 currentRows.map((t, idx) => {
//                   const {
//                     senderId,
//                     receiverId,
//                     tagDetails,
//                     currentUserId
//                   } = getTransactionInfo(t);

//                   const dateInfo = formatDate(
//                     t.createdAt || t.date
//                   );

//                   return (
//                     <tr
//                       key={`${t._id}-${t.createdAt}-${idx}`}
//                       className="hp-topup-row"
//                     >
//                       <td className="px-4 py-4 text-center font-bold text-slate-400">
//                         {indexOfFirstRow + idx + 1}
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-4">
//                         <div className="flex items-start gap-2">
//                           <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
//                             <CalendarDays size={15} />
//                           </div>

//                           <div>
//                             <p className="text-xs font-black text-slate-700">
//                               {dateInfo.day}
//                             </p>

//                             <p className="mt-1 text-[10px] font-semibold text-slate-400">
//                               {dateInfo.time}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span
//                           className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-2 text-[9px] font-black tracking-wide ${tagDetails.style}`}
//                         >
//                           {tagDetails.icon}
//                           {tagDetails.text}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <UserIdentity
//                           id={senderId}
//                           currentUserId={currentUserId}
//                         />
//                       </td>

//                       <td className="px-4 py-4">
//                         <UserIdentity
//                           id={receiverId}
//                           currentUserId={currentUserId}
//                         />
//                       </td>

//                       <td className="px-4 py-4 text-center">
//                         <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
//                           <span className="text-[10px] text-emerald-600">
//                             $
//                           </span>
//                           {formatAmount(t)}
//                         </span>
//                       </td>

//                       <td
//                         className="max-w-[200px] truncate px-4 py-4 text-xs font-semibold text-slate-600"
//                         title={t.description || "Top-up package"}
//                       >
//                         {t.description || "Top-up package"}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* DESKTOP PAGINATION */}
//         {!loading && !error && filteredTopups.length > 0 && (
//           <div className="flex flex-col gap-3 border-t border-emerald-100 bg-[#f8fbf7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="text-[10px] font-bold text-slate-500">
//               Showing{" "}
//               <span className="font-black text-[#174b31]">
//                 {indexOfFirstRow + 1}
//               </span>
//               {" "}to{" "}
//               <span className="font-black text-[#174b31]">
//                 {Math.min(indexOfLastRow, filteredTopups.length)}
//               </span>
//               {" "}of{" "}
//               <span className="font-black text-[#174b31]">
//                 {filteredTopups.length}
//               </span>
//               {" "}records
//             </div>

//             <Pagination />
//           </div>
//         )}
//       </div>

//       {/* MOBILE TRANSACTION CARDS */}
//       <div className="space-y-3 md:hidden">

//         <div className="flex items-center justify-between px-1">
//           <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
//             Transaction History
//           </h3>

//           <span className="text-[10px] font-bold text-slate-400">
//             {filteredTopups.length} Records
//           </span>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
//             <RefreshCcw
//               size={26}
//               className="mx-auto mb-3 animate-spin text-emerald-600"
//             />

//             <p className="text-xs font-bold text-slate-500">
//               Loading transaction history...
//             </p>
//           </div>
//         ) : error ? (
//           <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
//             <p className="text-xs font-bold text-red-600">
//               {error}
//             </p>
//           </div>
//         ) : currentRows.length === 0 ? (
//           <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
//             <Receipt
//               size={30}
//               className="mx-auto mb-3 text-emerald-300"
//             />

//             <p className="text-sm font-black text-[#174b31]">
//               No Top-Up Records Found
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Try another search keyword
//             </p>
//           </div>
//         ) : (
//           currentRows.map((t, idx) => {
//             const {
//               senderId,
//               receiverId,
//               tagDetails,
//               currentUserId
//             } = getTransactionInfo(t);

//             const dateInfo = formatDate(
//               t.createdAt || t.date
//             );

//             return (
//               <div
//                 key={`${t._id}-${t.createdAt}-${idx}`}
//                 className="hp-topup-card overflow-hidden rounded-2xl border border-emerald-100 bg-white"
//               >
//                 {/* Card Header */}
//                 <div className="flex items-center justify-between gap-2 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
//                   <div className="flex min-w-0 items-center gap-2">
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
//                       <Wallet size={17} />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                         Transaction Date
//                       </p>

//                       <p className="mt-0.5 text-xs font-black text-[#174b31]">
//                         {dateInfo.day}
//                       </p>

//                       <p className="text-[10px] font-semibold text-slate-400">
//                         {dateInfo.time}
//                       </p>
//                     </div>
//                   </div>

//                   <span className="shrink-0 text-[9px] font-bold text-slate-400">
//                     #{indexOfFirstRow + idx + 1}
//                   </span>
//                 </div>

//                 {/* Transaction Type */}
//                 <div className="p-3.5">
//                   <span
//                     className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[9px] font-black tracking-wide ${tagDetails.mobileStyle}`}
//                   >
//                     {tagDetails.icon}
//                     {tagDetails.text}
//                   </span>

//                   {/* Sender */}
//                   <div className="mt-3 flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-2">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
//                         <ArrowUpFromLine size={15} />
//                       </div>

//                       <div>
//                         <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                           Sender
//                         </p>

//                         <p className="mt-0.5 text-xs font-black text-slate-700">
//                           {senderId?.includes("Team")
//                             ? senderId
//                             : `#${senderId}`}
//                         </p>
//                       </div>
//                     </div>

//                     {senderId === currentUserId && (
//                       <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
//                         YOU
//                       </span>
//                     )}
//                   </div>

//                   {/* Receiver */}
//                   <div className="mt-3 flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-2">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
//                         <ArrowDownToLine size={15} />
//                       </div>

//                       <div>
//                         <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                           Receiver
//                         </p>

//                         <p className="mt-0.5 text-xs font-black text-slate-700">
//                           {receiverId?.includes("Team")
//                             ? receiverId
//                             : `#${receiverId}`}
//                         </p>
//                       </div>
//                     </div>

//                     {receiverId === currentUserId && (
//                       <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
//                         YOU
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Amount and Description */}
//                 <div className="flex items-center justify-between gap-3 border-t border-emerald-50 bg-[#fbfdf9] p-3.5">
//                   <div className="min-w-0 flex-1">
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                       Details
//                     </p>

//                     <p
//                       className="mt-1 truncate text-[11px] font-semibold text-slate-600"
//                       title={t.description || "Top-up package"}
//                     >
//                       {t.description || "Top-up package"}
//                     </p>
//                   </div>

//                   <div className="shrink-0 text-right">
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                       Amount
//                     </p>

//                     <p className="mt-1 text-lg font-black text-emerald-800">
//                       ${formatAmount(t)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}

//         {/* MOBILE PAGINATION */}
//         {!loading && !error && filteredTopups.length > 0 && (
//           <div className="rounded-2xl border border-emerald-100 bg-white p-3">
//             <p className="mb-3 text-center text-[10px] font-bold text-slate-500">
//               Showing {indexOfFirstRow + 1} to{" "}
//               {Math.min(indexOfLastRow, filteredTopups.length)} of{" "}
//               {filteredTopups.length} records
//             </p>

//             <Pagination />
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default TopupDetails;




import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  CheckCircle2,
  User,
  Wallet,
  CalendarDays,
  X,
  ShieldCheck,
  Users,
  Activity,
  Clock3,
  Receipt,
  ArrowDownToLine,
  ArrowUpFromLine
} from "lucide-react";

const TopupDetails = () => {
  const { user } = useAuth();

  const [topups, setTopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch top-up history
  useEffect(() => {
    const fetchTopups = async () => {
      if (!user?.userId) {
        setLoading(false);
        setError("User not found. Please log in.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`
        );

        if (Array.isArray(res.data)) {
          const userTopups = res.data.filter((t) => {
            const typeStr = (t.type || "").toLowerCase();
            const sourceStr = (t.source || "").toLowerCase();
            const descStr = (t.description || "").toUpperCase();

            const isTopupRelated =
              typeStr.includes("topup") ||
              sourceStr.includes("topup") ||
              typeStr === "activation";

            const isNotPromo = !descStr.includes("PROMOTION");

            return isTopupRelated && isNotPromo;
          });

          // Remove duplicate records
          const uniqueTopups = Array.from(
            new Map(
              userTopups.map((t) => [
                `${t._id}-${t.createdAt}`,
                t
              ])
            ).values()
          );

          // Latest records first
          uniqueTopups.sort(
            (a, b) =>
              new Date(b.createdAt || b.date) -
              new Date(a.createdAt || a.date)
          );

          setTopups(uniqueTopups);
        } else {
          setTopups([]);
        }
      } catch (err) {
        console.error("Topup fetch error:", err);
        setError(
          err.response?.data?.message || "Failed to load top-ups."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopups();
  }, [user]);

  // Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTopups = useMemo(() => {
    return topups.filter((t) => {
      const searchLower = searchQuery.toLowerCase();

      const senderIdStr = (
        t.fromUserId || t.userId || ""
      ).toString().toLowerCase();

      const receiverIdStr = (
        t.toUserId || t.userId || ""
      ).toString().toLowerCase();

      const descStr = (
        t.description || ""
      ).toLowerCase();

      const amountStr = (
        t.amount || t.grossAmount || ""
      ).toString().toLowerCase();

      return (
        senderIdStr.includes(searchLower) ||
        receiverIdStr.includes(searchLower) ||
        descStr.includes(searchLower) ||
        amountStr.includes(searchLower)
      );
    });
  }, [topups, searchQuery]);

  // Pagination
  const totalPages =
    Math.ceil(filteredTopups.length / rowsPerPage) || 1;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredTopups.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrev = () =>
    currentPage > 1 &&
    setCurrentPage((prev) => prev - 1);

  const handleNext = () =>
    currentPage < totalPages &&
    setCurrentPage((prev) => prev + 1);

  const formatDate = (date) => {
    if (!date) return { day: "N/A", time: "" };

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return { day: "N/A", time: "" };
    }

    return {
      day: format(parsedDate, "dd MMM yyyy"),
      time: format(parsedDate, "hh:mm a")
    };
  };

  const formatAmount = (transaction) => {
    return Math.abs(
      transaction.amount || transaction.grossAmount || 0
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });
  };

  // Hide "Leader" and "Free" from the displayed description only.
  // Original transaction data remains unchanged.
  const cleanDescription = (description) => {
    return (description || "Top-up package")
      .replace(/\b(leader|free)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Sender / Receiver identification
  const getTransactionInfo = (t) => {
    const currentUserId = String(user?.userId || "");

    let senderId = t.fromUserId
      ? String(t.fromUserId)
      : String(t.userId);

    let receiverId = t.toUserId
      ? String(t.toUserId)
      : String(t.userId);

    const isDebitTransaction =
      t.type?.toLowerCase().includes("debit") ||
      Number(t.amount) < 0;

    if (isDebitTransaction && !t.toUserId) {
      senderId = currentUserId;

      const descMatch = t.description?.match(
        /(?:for|user|to|#|-)\s*([0-9]{4,10})/i
      );

      if (descMatch && descMatch[1]) {
        receiverId = descMatch[1];
      } else {
        receiverId = "Team Member";
      }
    }

    let tagDetails = {
      icon: <CheckCircle2 size={13} />,
      text: "ACTIVATED",
      style:
        "bg-slate-50 text-slate-600 border-slate-200",
      mobileStyle: "text-slate-600 bg-slate-100"
    };

    if (
      senderId === currentUserId &&
      receiverId === currentUserId
    ) {
      tagDetails = {
        icon: <ShieldCheck size={13} />,
        text: "SELF ACTIVATION",
        style:
          "bg-emerald-50 text-emerald-800 border-emerald-200",
        mobileStyle: "text-emerald-800 bg-emerald-50"
      };
    } else if (
      senderId === currentUserId &&
      receiverId !== currentUserId
    ) {
      tagDetails = {
        icon: <ArrowUpRight size={13} />,
        text: "ACTIVATED FOR TEAM",
        style:
          "bg-amber-50 text-amber-800 border-amber-200",
        mobileStyle: "text-amber-800 bg-amber-50"
      };
    } else if (
      receiverId === currentUserId &&
      senderId !== currentUserId
    ) {
      tagDetails = {
        icon: <ArrowDownLeft size={13} />,
        text: "ACTIVATED BY UPLINE",
        style:
          "bg-blue-50 text-blue-800 border-blue-200",
        mobileStyle: "text-blue-800 bg-blue-50"
      };
    }

    return {
      senderId,
      receiverId,
      tagDetails,
      currentUserId
    };
  };

  // User ID display
  const UserIdentity = ({ id, currentUserId }) => {
    const isYou = id === currentUserId;

    return (
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <User size={15} />
        </div>

        <div className="min-w-0">
          <p
            className={`truncate text-xs font-black ${
              isYou ? "text-emerald-800" : "text-slate-700"
            }`}
          >
            {id?.includes("Team") ? id : `#${id}`}
          </p>

          {isYou && (
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
              You
            </span>
          )}
        </div>
      </div>
    );
  };

  // Pagination component
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
    <div className="relative z-10 mx-auto w-full max-w-7xl pb-8">

      <style>{`
        .hp-topup-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .hp-topup-scroll::-webkit-scrollbar-track {
          background: #f1f7ef;
          border-radius: 20px;
        }

        .hp-topup-scroll::-webkit-scrollbar-thumb {
          background: #a8c8aa;
          border-radius: 20px;
        }

        .hp-topup-input:focus {
          outline: none;
          border-color: #16834c;
          box-shadow: 0 0 0 3px rgba(22, 131, 76, .09);
        }

        .hp-topup-card {
          box-shadow: 0 4px 18px rgba(22, 101, 52, 0.045);
        }

        .hp-topup-row {
          transition: background .18s ease;
        }

        .hp-topup-row:hover {
          background: #f5faf3;
        }
      `}</style>

      {/* HEADER */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#123d29] via-[#17633d] to-[#21804d] p-4 text-white shadow-md shadow-emerald-900/10 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78]">
              <Wallet size={23} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  Top-Up History
                </h1>

                <span className="rounded-full border border-[#e8c66f]/40 bg-[#d6a83e]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f5d98d]">
                  Transactions
                </span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-emerald-100 sm:text-xs">
                Track your self, team and upline activations
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#f3cf78] sm:flex">
            <Receipt size={24} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <ShieldCheck size={13} className="text-[#f3cf78]" />
            <span className="text-[10px] font-bold text-white">
              Activation Records
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
            <Clock3 size={13} className="text-[#f3cf78]" />
            <span className="text-[10px] font-bold text-white">
              Latest First
            </span>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Receipt size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Records
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {topups.length.toLocaleString("en-IN")}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-800 to-emerald-400" />
        </div>

        <div className="hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Activity size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Matching Results
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#174b31]">
            {filteredTopups.length.toLocaleString("en-IN")}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#b68a2e] to-[#e8cf82]" />
        </div>

        <div className="col-span-2 hp-topup-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 sm:col-span-1 sm:p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Users size={19} />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Current User
          </p>

          <h3 className="mt-1 truncate text-lg font-black text-[#174b31]">
            #{user?.userId || "-"}
          </h3>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-700 to-blue-300" />
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
              placeholder="Search ID, details or amount..."
              value={searchQuery}
              onChange={handleSearch}
              className="hp-topup-input w-full rounded-xl border border-emerald-100 bg-[#f8fbf7] py-3 pl-10 pr-10 text-xs font-semibold text-slate-700 placeholder:text-slate-400 sm:text-sm"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Rows
              </span>

              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="rounded-lg border border-emerald-100 bg-[#f8fbf7] px-2.5 py-2 text-xs font-bold text-[#174b31] outline-none focus:border-emerald-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-extrabold text-emerald-800">
              {filteredTopups.length} Results
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:block">

        <div className="flex items-center justify-between border-b border-emerald-100 bg-[#f8fbf7] px-4 py-3">
          <div className="flex items-center gap-2">
            <Wallet size={17} className="text-emerald-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
              Transaction Records
            </h3>
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            Top-up & Activation History
          </span>
        </div>

        <div className="hp-topup-scroll w-full overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-100 bg-[#f1f7ef] text-[10px] uppercase tracking-wider text-[#42634b]">
                <th className="px-4 py-4 text-center font-black">
                  Sr.
                </th>

                <th className="px-4 py-4 font-black">
                  Date & Time
                </th>

                <th className="px-4 py-4 font-black">
                  Action Type
                </th>

                <th className="px-4 py-4 font-black">
                  Sender
                </th>

                <th className="px-4 py-4 font-black">
                  Receiver
                </th>

                <th className="px-4 py-4 text-center font-black">
                  Amount
                </th>

                <th className="px-4 py-4 font-black">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <RefreshCcw
                      size={26}
                      className="mx-auto mb-3 animate-spin text-emerald-600"
                    />

                    <p className="text-xs font-bold text-slate-500">
                      Loading transaction history...
                    </p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="mx-auto max-w-md rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
                      {error}
                    </div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Receipt size={23} />
                    </div>

                    <p className="text-sm font-black text-[#174b31]">
                      No Top-Up Records Found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try searching with another ID or amount
                    </p>
                  </td>
                </tr>
              ) : (
                currentRows.map((t, idx) => {
                  const {
                    senderId,
                    receiverId,
                    tagDetails,
                    currentUserId
                  } = getTransactionInfo(t);

                  const dateInfo = formatDate(
                    t.createdAt || t.date
                  );

                  return (
                    <tr
                      key={`${t._id}-${t.createdAt}-${idx}`}
                      className="hp-topup-row"
                    >
                      <td className="px-4 py-4 text-center font-bold text-slate-400">
                        {indexOfFirstRow + idx + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                            <CalendarDays size={15} />
                          </div>

                          <div>
                            <p className="text-xs font-black text-slate-700">
                              {dateInfo.day}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold text-slate-400">
                              {dateInfo.time}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-2 text-[9px] font-black tracking-wide ${tagDetails.style}`}
                        >
                          {tagDetails.icon}
                          {tagDetails.text}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <UserIdentity
                          id={senderId}
                          currentUserId={currentUserId}
                        />
                      </td>

                      <td className="px-4 py-4">
                        <UserIdentity
                          id={receiverId}
                          currentUserId={currentUserId}
                        />
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
                          <span className="text-[10px] text-emerald-600">
                            $
                          </span>
                          {formatAmount(t)}
                        </span>
                      </td>

                      <td
                        className="max-w-[200px] truncate px-4 py-4 text-xs font-semibold text-slate-600"
                        title={cleanDescription(t.description)}
                      >
                        {cleanDescription(t.description)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* DESKTOP PAGINATION */}
        {!loading && !error && filteredTopups.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-emerald-100 bg-[#f8fbf7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[10px] font-bold text-slate-500">
              Showing{" "}
              <span className="font-black text-[#174b31]">
                {indexOfFirstRow + 1}
              </span>
              {" "}to{" "}
              <span className="font-black text-[#174b31]">
                {Math.min(indexOfLastRow, filteredTopups.length)}
              </span>
              {" "}of{" "}
              <span className="font-black text-[#174b31]">
                {filteredTopups.length}
              </span>
              {" "}records
            </div>

            <Pagination />
          </div>
        )}
      </div>

      {/* MOBILE TRANSACTION CARDS */}
      <div className="space-y-3 md:hidden">

        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#174b31]">
            Transaction History
          </h3>

          <span className="text-[10px] font-bold text-slate-400">
            {filteredTopups.length} Records
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white py-12 text-center">
            <RefreshCcw
              size={26}
              className="mx-auto mb-3 animate-spin text-emerald-600"
            />

            <p className="text-xs font-bold text-slate-500">
              Loading transaction history...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
            <p className="text-xs font-bold text-red-600">
              {error}
            </p>
          </div>
        ) : currentRows.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-12 text-center">
            <Receipt
              size={30}
              className="mx-auto mb-3 text-emerald-300"
            />

            <p className="text-sm font-black text-[#174b31]">
              No Top-Up Records Found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try another search keyword
            </p>
          </div>
        ) : (
          currentRows.map((t, idx) => {
            const {
              senderId,
              receiverId,
              tagDetails,
              currentUserId
            } = getTransactionInfo(t);

            const dateInfo = formatDate(
              t.createdAt || t.date
            );

            return (
              <div
                key={`${t._id}-${t.createdAt}-${idx}`}
                className="hp-topup-card overflow-hidden rounded-2xl border border-emerald-100 bg-white"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 border-b border-emerald-50 bg-[#f8fbf7] p-3.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                      <Wallet size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Transaction Date
                      </p>

                      <p className="mt-0.5 text-xs font-black text-[#174b31]">
                        {dateInfo.day}
                      </p>

                      <p className="text-[10px] font-semibold text-slate-400">
                        {dateInfo.time}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[9px] font-bold text-slate-400">
                    #{indexOfFirstRow + idx + 1}
                  </span>
                </div>

                {/* Transaction Type */}
                <div className="p-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[9px] font-black tracking-wide ${tagDetails.mobileStyle}`}
                  >
                    {tagDetails.icon}
                    {tagDetails.text}
                  </span>

                  {/* Sender */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                        <ArrowUpFromLine size={15} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Sender
                        </p>

                        <p className="mt-0.5 text-xs font-black text-slate-700">
                          {senderId?.includes("Team")
                            ? senderId
                            : `#${senderId}`}
                        </p>
                      </div>
                    </div>

                    {senderId === currentUserId && (
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
                        YOU
                      </span>
                    )}
                  </div>

                  {/* Receiver */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                        <ArrowDownToLine size={15} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Receiver
                        </p>

                        <p className="mt-0.5 text-xs font-black text-slate-700">
                          {receiverId?.includes("Team")
                            ? receiverId
                            : `#${receiverId}`}
                        </p>
                      </div>
                    </div>

                    {receiverId === currentUserId && (
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount and Description */}
                <div className="flex items-center justify-between gap-3 border-t border-emerald-50 bg-[#fbfdf9] p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Details
                    </p>

                    <p
                      className="mt-1 truncate text-[11px] font-semibold text-slate-600"
                      title={cleanDescription(t.description)}
                    >
                      {cleanDescription(t.description)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Amount
                    </p>

                    <p className="mt-1 text-lg font-black text-emerald-800">
                      ${formatAmount(t)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* MOBILE PAGINATION */}
        {!loading && !error && filteredTopups.length > 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="mb-3 text-center text-[10px] font-bold text-slate-500">
              Showing {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, filteredTopups.length)} of{" "}
              {filteredTopups.length} records
            </p>

            <Pagination />
          </div>
        )}
      </div>

    </div>
  );
};

export default TopupDetails;
