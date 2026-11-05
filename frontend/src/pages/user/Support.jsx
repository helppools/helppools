// // // // C:\Users\HP\Desktop\Cryptocommunity\frontend\src\pages\user\Support.jsx
// // // import React, { useState, useEffect, useCallback } from "react";
// // // import api from "../../api/axios";
// // // import { useAuth } from "../../context/AuthContext";
// // // import SuccessModal from "../../components/modals/SuccessModal";
// // // import { LifeBuoy, Send, MessageSquare, Wallet, Info, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// // // const Support = () => {
// // //   const { user, token } = useAuth();
// // //   const [message, setMessage] = useState("");
// // //   const [walletAddress, setWalletAddress] = useState("");
// // //   const [optional, setOptional] = useState("");
// // //   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
// // //   const [loading, setLoading] = useState(false);
// // //   const [userMessages, setUserMessages] = useState([]);
// // //   const [fetching, setFetching] = useState(true);

// // //   const [showModal, setShowModal] = useState(false);
// // //   const [submittedMessage, setSubmittedMessage] = useState(null);

// // //   // Fetch logic using the NEW /me route
// // //   const fetchMessages = useCallback(async () => {
// // //     if (!token) return;
// // //     try {
// // //       setFetching(true);
// // //       // 🔥 CACHE FIX: ?t= add kiya hai
// // //       const res = await api.get(`/support/me?t=${new Date().getTime()}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setUserMessages(res.data.supports || []);
// // //     } catch (err) {
// // //       console.error("Fetch messages error:", err);
// // //     } finally {
// // //       setFetching(false);
// // //     }
// // //   }, [token]);

// // //   useEffect(() => {
// // //     fetchMessages();
// // //   }, [fetchMessages]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     // ✅ SIRF MESSAGE MANDATORY HAI AB
// // //     if (!message.trim()) {
// // //       setStatusMsg({ type: "error", text: "Please enter your message." });
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setStatusMsg({ type: "", text: "" });

// // //     try {
// // //       const res = await api.post(
// // //         "/support/create",
// // //         { message, email: user?.email || "unknown", walletAddress, optional },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       if (res.data.success) {
// // //         setSubmittedMessage({ message, walletAddress, optional });
// // //         setShowModal(true);
// // //         setMessage("");
// // //         setWalletAddress("");
// // //         setOptional("");
// // //         fetchMessages(); // Refresh list
// // //       }
// // //     } catch (err) {
// // //       const errorText = err.response?.data?.error || "Failed to send message. Please try again.";
// // //       setStatusMsg({ type: "error", text: errorText });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="w-full max-w-5xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
// // //       {/* Scrollbar CSS */}
// // //       <style>{`
// // //         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
// // //         .custom-scroll::-webkit-scrollbar-track { background: #050505; }
// // //         .custom-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
// // //       `}</style>

// // //       {/* Header */}
// // //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// // //         <div>
// // //           <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wide flex items-center gap-3">
// // //              <LifeBuoy className="text-green-500" size={28} /> Support Center
// // //           </h2>
// // //           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// // //             We are here to help you 24/7
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
// // //         {/* LEFT COLUMN: Support Form */}
// // //         <div>
// // //           <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-2xl relative overflow-hidden">
// // //             <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[100px] pointer-events-none rounded-full"></div>
            
// // //             <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
// // //               <MessageSquare size={18} className="text-green-500" /> Create New Ticket
// // //             </h3>

// // //             <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
// // //               {/* Message Input (Mandatory) */}
// // //               <div>
// // //                 <label className="block text-xs font-bold text-black uppercase tracking-widest mb-2">
// // //                   Your Message <span className="text-red-500">*</span>
// // //                 </label>
// // //                 <div className="relative group">
// // //                   <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
// // //                     <MessageSquare size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
// // //                   </div>
// // //                   <textarea
// // //                     value={message}
// // //                     onChange={(e) => setMessage(e.target.value)}
// // //                     placeholder="Describe your issue in detail..."
// // //                     className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400 custom-scroll disabled:opacity-50"
// // //                     rows="4"
// // //                     required
// // //                     disabled={loading}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {statusMsg.text && statusMsg.type === "error" && (
// // //                 <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
// // //                   <AlertCircle size={18} className="shrink-0" />
// // //                   <span className="font-bold text-xs tracking-wide">{statusMsg.text}</span>
// // //                 </div>
// // //               )}

// // //               <button
// // //                 type="submit"
// // //                 className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
// // //                   loading 
// // //                     ? "bg-white/5 text-gray-500 cursor-not-allowed border border-slate-200" 
// // //                     : "bg-gradient-to-r from-green-500 to-red-600 text-slate-900 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-[1.02]"
// // //                 }`}
// // //                 disabled={loading}
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// // //                     Processing...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <Send size={18} /> Submit Ticket
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>

// // //         {/* RIGHT COLUMN: Ticket History */}
// // //         <div>
// // //           <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-2xl h-full flex flex-col">
// // //             <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
// // //               <Clock size={18} className="text-blue-500" /> Ticket History
// // //             </h3>

// // //             <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-4 max-h-[500px]">
// // //               {fetching ? (
// // //                 <div className="text-center py-10">
// // //                   <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// // //                   <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading History...</span>
// // //                 </div>
// // //               ) : userMessages.length === 0 ? (
// // //                 <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-white">
// // //                   <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Previous Tickets</span>
// // //                 </div>
// // //               ) : (
// // //                 userMessages.map((m) => {
                  
// // //                   // Status UI Logic
// // //                   let statusColor = "bg-white/5 text-black border-slate-200";
// // //                   let StatusIcon = Clock;
                  
// // //                   if (m.status === "Pending") {
// // //                     statusColor = "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
// // //                     StatusIcon = Clock;
// // //                   } else if (m.status === "Resolved" || m.status === "Closed") {
// // //                     statusColor = "bg-green-500/10 text-green-400 border-green-500/30";
// // //                     StatusIcon = CheckCircle2;
// // //                   } else if (m.status === "Rejected") {
// // //                     statusColor = "bg-red-500/10 text-red-400 border-red-500/30";
// // //                     StatusIcon = XCircle;
// // //                   }

// // //                   return (
// // //                     <div key={m._id} className="p-5 border border-slate-100 rounded-xl bg-white hover:bg-white/5 transition-colors">
// // //                       <div className="flex justify-between items-start mb-3">
// // //                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] sm:text-[10px] font-black tracking-widest uppercase rounded-md border ${statusColor}`}>
// // //                           <StatusIcon size={12} /> {m.status || "PENDING"}
// // //                         </span>
// // //                         <span className="text-[10px] md:text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
// // //                           {new Date(m.createdAt).toLocaleDateString("en-GB")}
// // //                         </span>
// // //                       </div>
                      
// // //                       <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
// // //                         {m.message}
// // //                       </p>
                      
// // //                       <div className="flex flex-col gap-1.5">
// // //                         {m.walletAddress && (
// // //                           <p className="text-[10px] md:text-xs text-black flex items-center gap-2">
// // //                             <Wallet size={12} className="text-gray-500"/>
// // //                             <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-mono truncate max-w-[200px] sm:max-w-xs">{m.walletAddress}</span>
// // //                           </p>
// // //                         )}
// // //                         {m.optional && (
// // //                           <p className="text-[10px] md:text-xs text-black flex items-center gap-2">
// // //                             <Info size={12} className="text-gray-500"/>
// // //                             <span className="text-slate-600 capitalize">{m.optional}</span>
// // //                           </p>
// // //                         )}
// // //                       </div>

// // //                       {/* 🔥 NEW: Admin Reply Box (Dikhayega tabhi jab admin reply dega) 🔥 */}
// // //                       {m.adminReply && (
// // //                         <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl relative">
// // //                           <div className="flex items-center gap-2 mb-1">
// // //                             <CheckCircle2 size={14} className="text-green-600" />
// // //                             <span className="text-xs font-black text-green-700 uppercase tracking-widest">Support Reply</span>
// // //                           </div>
// // //                           <p className="text-slate-800 text-sm font-medium">
// // //                             {m.adminReply}
// // //                           </p>
// // //                         </div>
// // //                       )}

// // //                     </div>
// // //                   );
// // //                 })
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {submittedMessage && (
// // //         <SuccessModal
// // //           isOpen={showModal}
// // //           onClose={() => setShowModal(false)}
// // //           customTitle="Support Ticket Created"
// // //           customMessage="We've received your message. Our support team will review it and get back to you shortly."
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Support;


// // import React, { useState, useEffect, useCallback } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import SuccessModal from "../../components/modals/SuccessModal";
// // import {
// //   LifeBuoy,
// //   Send,
// //   MessageSquare,
// //   Wallet,
// //   Info,
// //   Clock,
// //   CheckCircle2,
// //   XCircle,
// //   AlertCircle,
// //   RefreshCw,
// //   Headphones,
// //   ShieldCheck,
// //   CalendarDays,
// //   ChevronRight,
// //   Ticket,
// //   Sparkles,
// // } from "lucide-react";

// // const Support = () => {
// //   const { user, token } = useAuth();

// //   const [message, setMessage] = useState("");
// //   const [walletAddress, setWalletAddress] = useState("");
// //   const [optional, setOptional] = useState("");
// //   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [userMessages, setUserMessages] = useState([]);
// //   const [fetching, setFetching] = useState(true);

// //   const [showModal, setShowModal] = useState(false);
// //   const [submittedMessage, setSubmittedMessage] = useState(null);

// //   const fetchMessages = useCallback(async () => {
// //     if (!token) {
// //       setFetching(false);
// //       return;
// //     }

// //     try {
// //       setFetching(true);

// //       const res = await api.get(
// //         `/support/me?t=${new Date().getTime()}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       setUserMessages(res.data.supports || []);
// //     } catch (err) {
// //       console.error("Fetch messages error:", err);
// //     } finally {
// //       setFetching(false);
// //     }
// //   }, [token]);

// //   useEffect(() => {
// //     fetchMessages();
// //   }, [fetchMessages]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!message.trim()) {
// //       setStatusMsg({
// //         type: "error",
// //         text: "Please enter your message.",
// //       });
// //       return;
// //     }

// //     setLoading(true);
// //     setStatusMsg({ type: "", text: "" });

// //     try {
// //       const res = await api.post(
// //         "/support/create",
// //         {
// //           message,
// //           email: user?.email || "unknown",
// //           walletAddress,
// //           optional,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (res.data.success) {
// //         setSubmittedMessage({ message, walletAddress, optional });
// //         setShowModal(true);

// //         setMessage("");
// //         setWalletAddress("");
// //         setOptional("");

// //         fetchMessages();
// //       }
// //     } catch (err) {
// //       const errorText =
// //         err.response?.data?.error ||
// //         "Failed to send message. Please try again.";

// //       setStatusMsg({
// //         type: "error",
// //         text: errorText,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusStyle = (status = "Pending") => {
// //     const normalized = status.toLowerCase();

// //     if (normalized === "pending") {
// //       return {
// //         label: status,
// //         icon: Clock,
// //         color: "bg-amber-50 text-amber-700 border-amber-200",
// //         dot: "bg-amber-500",
// //       };
// //     }

// //     if (normalized === "resolved" || normalized === "closed") {
// //       return {
// //         label: status,
// //         icon: CheckCircle2,
// //         color: "bg-green-50 text-green-700 border-green-200",
// //         dot: "bg-green-600",
// //       };
// //     }

// //     if (normalized === "rejected") {
// //       return {
// //         label: status,
// //         icon: XCircle,
// //         color: "bg-red-50 text-red-600 border-red-200",
// //         dot: "bg-red-500",
// //       };
// //     }

// //     return {
// //       label: status,
// //       icon: Clock,
// //       color: "bg-slate-50 text-slate-600 border-slate-200",
// //       dot: "bg-slate-400",
// //     };
// //   };

// //   const formatDate = (value) => {
// //     const date = new Date(value);

// //     if (!value || Number.isNaN(date.getTime())) return "Date unavailable";

// //     return date.toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   };

// //   const pendingCount = userMessages.filter(
// //     (m) => (m.status || "Pending").toLowerCase() === "pending"
// //   ).length;

// //   const resolvedCount = userMessages.filter((m) =>
// //     ["resolved", "closed"].includes((m.status || "").toLowerCase())
// //   ).length;

// //   return (
// //     <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">
// //       <style>{`
// //         .support-scroll::-webkit-scrollbar {
// //           width: 5px;
// //         }

// //         .support-scroll::-webkit-scrollbar-track {
// //           background: #f1f5f9;
// //           border-radius: 20px;
// //         }

// //         .support-scroll::-webkit-scrollbar-thumb {
// //           background: #b7c99b;
// //           border-radius: 20px;
// //         }

// //         .support-scroll::-webkit-scrollbar-thumb:hover {
// //           background: #6e9145;
// //         }

// //         .support-input {
// //           transition: all .2s ease;
// //         }

// //         .support-input:focus {
// //           border-color: #39834a;
// //           box-shadow: 0 0 0 3px rgba(57,131,74,.10);
// //           background: #fff;
// //         }

// //         .ticket-card {
// //           transition: transform .2s ease, box-shadow .2s ease;
// //         }

// //         .ticket-card:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 8px 24px rgba(15,23,42,.06);
// //         }
// //       `}</style>

// //       {/* Header */}
// //       <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#123d28] via-[#17633a] to-[#27824a] p-5 sm:p-7 mb-5 shadow-lg shadow-green-950/10">
// //         <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full border-[35px] border-white/5" />
// //         <div className="absolute right-20 -bottom-24 w-48 h-48 rounded-full bg-yellow-400/10 blur-2xl" />

// //         <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
// //           <div className="flex items-center gap-3.5">
// //             <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
// //               <LifeBuoy size={27} className="text-yellow-300" />
// //             </div>

// //             <div>
// //               <div className="flex items-center gap-2 mb-1">
// //                 <Sparkles size={13} className="text-yellow-300" />
// //                 <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-[2px] text-green-100">
// //                   We're here for you
// //                 </span>
// //               </div>

// //               <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
// //                 Support Center
// //               </h1>

// //               <p className="text-[11px] sm:text-sm text-green-100 mt-1">
// //                 Submit your query and track your support tickets.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 w-fit">
// //             <ShieldCheck size={17} className="text-yellow-300" />
// //             <span className="text-[10px] sm:text-xs font-bold text-white">
// //               Member Assistance
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Quick Stats */}
// //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
// //         <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm">
// //           <div className="flex items-center justify-between gap-2">
// //             <div>
// //               <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
// //                 Total Tickets
// //               </p>
// //               <h3 className="text-2xl font-black text-slate-900 mt-1">
// //                 {userMessages.length}
// //               </h3>
// //             </div>
// //             <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
// //               <Ticket size={20} className="text-green-700" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl border border-amber-100 p-3.5 sm:p-4 shadow-sm">
// //           <div className="flex items-center justify-between gap-2">
// //             <div>
// //               <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
// //                 Pending
// //               </p>
// //               <h3 className="text-2xl font-black text-amber-600 mt-1">
// //                 {pendingCount}
// //               </h3>
// //             </div>
// //             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
// //               <Clock size={20} className="text-amber-600" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl border border-green-100 p-3.5 sm:p-4 shadow-sm col-span-2 sm:col-span-1">
// //           <div className="flex items-center justify-between gap-2">
// //             <div>
// //               <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
// //                 Resolved
// //               </p>
// //               <h3 className="text-2xl font-black text-green-700 mt-1">
// //                 {resolvedCount}
// //               </h3>
// //             </div>
// //             <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
// //               <CheckCircle2 size={20} className="text-green-700" />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Layout */}
// //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
// //         {/* Create Ticket */}
// //         <div className="lg:col-span-5">
// //           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
// //             <div className="px-4 sm:px-5 py-4 border-b border-slate-100 bg-[#fbfcfa]">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
// //                   <MessageSquare size={19} className="text-green-700" />
// //                 </div>

// //                 <div>
// //                   <h2 className="text-base font-extrabold text-slate-900">
// //                     Create New Ticket
// //                   </h2>
// //                   <p className="text-[10px] text-slate-400 mt-0.5">
// //                     Tell us how we can help you
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
// //               {/* Message */}
// //               <div>
// //                 <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
// //                   Your Message <span className="text-red-500">*</span>
// //                 </label>

// //                 <div className="relative">
// //                   <MessageSquare
// //                     size={16}
// //                     className="absolute top-3.5 left-3.5 text-green-700"
// //                   />

// //                   <textarea
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                     placeholder="Describe your issue in detail..."
// //                     className="support-input w-full min-h-[135px] bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl pl-10 pr-3.5 py-3 outline-none resize-y placeholder:text-slate-400 disabled:opacity-50"
// //                     rows="5"
// //                     required
// //                     disabled={loading}
// //                   />
// //                 </div>

// //                 <p className="text-[10px] text-slate-400 mt-1.5">
// //                   Please provide enough details to help our team understand your issue.
// //                 </p>
// //               </div>

// //               {/* Wallet Address */}
// //               <div>
// //                 <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
// //                   Wallet Address
// //                   <span className="ml-1.5 normal-case font-medium text-slate-400">
// //                     (Optional)
// //                   </span>
// //                 </label>

// //                 <div className="relative">
// //                   <Wallet
// //                     size={16}
// //                     className="absolute top-1/2 -translate-y-1/2 left-3.5 text-green-700"
// //                   />

// //                   <input
// //                     type="text"
// //                     value={walletAddress}
// //                     onChange={(e) => setWalletAddress(e.target.value)}
// //                     placeholder="Enter wallet address"
// //                     disabled={loading}
// //                     className="support-input w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Additional Information */}
// //               <div>
// //                 <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
// //                   Additional Information
// //                   <span className="ml-1.5 normal-case font-medium text-slate-400">
// //                     (Optional)
// //                   </span>
// //                 </label>

// //                 <div className="relative">
// //                   <Info
// //                     size={16}
// //                     className="absolute top-1/2 -translate-y-1/2 left-3.5 text-green-700"
// //                   />

// //                   <input
// //                     type="text"
// //                     value={optional}
// //                     onChange={(e) => setOptional(e.target.value)}
// //                     placeholder="Any additional details..."
// //                     disabled={loading}
// //                     className="support-input w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Error Message */}
// //               {statusMsg.text && statusMsg.type === "error" && (
// //                 <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
// //                   <AlertCircle
// //                     size={17}
// //                     className="text-red-600 shrink-0 mt-0.5"
// //                   />
// //                   <p className="text-xs font-semibold text-red-700 leading-relaxed">
// //                     {statusMsg.text}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`w-full min-h-12 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
// //                   loading
// //                     ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
// //                     : "bg-gradient-to-r from-[#17633a] to-[#2c8a4e] text-white shadow-md shadow-green-900/15 hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
// //                 }`}
// //               >
// //                 {loading ? (
// //                   <>
// //                     <RefreshCw size={17} className="animate-spin" />
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Send size={17} />
// //                     Submit Support Ticket
// //                     <ChevronRight size={16} />
// //                   </>
// //                 )}
// //               </button>

// //               <div className="flex items-start gap-2 p-3 rounded-xl bg-[#f7f9f4] border border-green-100">
// //                 <ShieldCheck
// //                   size={16}
// //                   className="text-green-700 shrink-0 mt-0.5"
// //                 />
// //                 <p className="text-[10px] text-slate-500 leading-relaxed">
// //                   Your support request will be recorded in your account. You can
// //                   track its status and view the support team's reply here.
// //                 </p>
// //               </div>
// //             </form>
// //           </div>
// //         </div>

// //         {/* Ticket History */}
// //         <div className="lg:col-span-7">
// //           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
// //             {/* History Header */}
// //             <div className="px-4 sm:px-5 py-4 border-b border-slate-100 bg-[#fbfcfa] flex items-center justify-between gap-3">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
// //                   <Headphones size={19} className="text-green-700" />
// //                 </div>

// //                 <div>
// //                   <h2 className="text-base font-extrabold text-slate-900">
// //                     Ticket History
// //                   </h2>
// //                   <p className="text-[10px] text-slate-400 mt-0.5">
// //                     Track your submitted requests
// //                   </p>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={fetchMessages}
// //                 disabled={fetching}
// //                 className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-green-700 hover:bg-green-50 disabled:opacity-50 transition-all"
// //                 title="Refresh history"
// //               >
// //                 <RefreshCw
// //                   size={15}
// //                   className={fetching ? "animate-spin" : ""}
// //                 />
// //               </button>
// //             </div>

// //             {/* History Content */}
// //             <div className="support-scroll p-3 sm:p-4 space-y-3 max-h-[690px] overflow-y-auto">
// //               {fetching ? (
// //                 <div className="py-16 text-center">
// //                   <RefreshCw
// //                     size={27}
// //                     className="animate-spin text-green-600 mx-auto mb-3"
// //                   />
// //                   <p className="text-xs font-bold text-slate-500">
// //                     Loading ticket history...
// //                   </p>
// //                 </div>
// //               ) : userMessages.length === 0 ? (
// //                 <div className="py-14 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70">
// //                   <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
// //                     <Ticket size={25} className="text-green-700" />
// //                   </div>

// //                   <h3 className="text-sm font-extrabold text-slate-700">
// //                     No Previous Tickets
// //                   </h3>

// //                   <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] mx-auto leading-relaxed">
// //                     Your submitted support requests will appear here.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 userMessages.map((m) => {
// //                   const status = getStatusStyle(m.status || "Pending");
// //                   const StatusIcon = status.icon;

// //                   return (
// //                     <div
// //                       key={m._id}
// //                       className="ticket-card relative bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 overflow-hidden"
// //                     >
// //                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-yellow-400" />

// //                       {/* Ticket Top */}
// //                       <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pl-1">
// //                         <span
// //                           className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${status.color}`}
// //                         >
// //                           <StatusIcon size={13} />
// //                           {status.label}
// //                         </span>

// //                         <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
// //                           <CalendarDays size={12} />
// //                           {formatDate(m.createdAt)}
// //                         </span>
// //                       </div>

// //                       {/* Message */}
// //                       <div className="pl-1">
// //                         <div className="flex items-center gap-2 mb-1.5">
// //                           <MessageSquare
// //                             size={13}
// //                             className="text-green-700"
// //                           />
// //                           <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
// //                             Your Message
// //                           </span>
// //                         </div>

// //                         <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
// //                           {m.message}
// //                         </p>
// //                       </div>

// //                       {/* Optional Details */}
// //                       {(m.walletAddress || m.optional) && (
// //                         <div className="mt-3 pt-3 border-t border-slate-100 pl-1 space-y-2">
// //                           {m.walletAddress && (
// //                             <div className="flex items-start gap-2">
// //                               <Wallet
// //                                 size={13}
// //                                 className="text-green-700 shrink-0 mt-0.5"
// //                               />
// //                               <div className="min-w-0">
// //                                 <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
// //                                   Wallet Address
// //                                 </p>
// //                                 <p className="text-[10px] sm:text-xs font-mono text-slate-600 break-all">
// //                                   {m.walletAddress}
// //                                 </p>
// //                               </div>
// //                             </div>
// //                           )}

// //                           {m.optional && (
// //                             <div className="flex items-start gap-2">
// //                               <Info
// //                                 size={13}
// //                                 className="text-green-700 shrink-0 mt-0.5"
// //                               />
// //                               <div className="min-w-0">
// //                                 <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
// //                                   Additional Information
// //                                 </p>
// //                                 <p className="text-[10px] sm:text-xs text-slate-600 break-words">
// //                                   {m.optional}
// //                                 </p>
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       )}

// //                       {/* Admin Reply */}
// //                       {m.adminReply && (
// //                         <div className="mt-4 ml-1 p-3.5 rounded-xl bg-gradient-to-br from-green-50 to-[#f7f9ef] border border-green-200">
// //                           <div className="flex items-center gap-2 mb-2">
// //                             <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
// //                               <CheckCircle2
// //                                 size={14}
// //                                 className="text-green-700"
// //                               />
// //                             </div>

// //                             <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-800">
// //                               Support Team Reply
// //                             </span>
// //                           </div>

// //                           <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
// //                             {m.adminReply}
// //                           </p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             {/* History Footer */}
// //             {!fetching && userMessages.length > 0 && (
// //               <div className="px-4 py-3 bg-[#fbfcfa] border-t border-slate-100 flex items-center justify-between gap-2">
// //                 <span className="text-[10px] font-bold text-slate-500">
// //                   Showing {userMessages.length} ticket
// //                   {userMessages.length !== 1 ? "s" : ""}
// //                 </span>

// //                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-700">
// //                   <CheckCircle2 size={13} />
// //                   History Updated
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Success Modal */}
// //       {submittedMessage && (
// //         <SuccessModal
// //           isOpen={showModal}
// //           onClose={() => setShowModal(false)}
// //           customTitle="Support Ticket Created"
// //           customMessage="We've received your message. Our support team will review it and get back to you shortly."
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Support;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import SuccessModal from "../../components/modals/SuccessModal";
// import {
//   LifeBuoy,
//   Send,
//   MessageSquare,
//   Wallet,
//   Info,
//   Clock3,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   RefreshCw,
//   Headphones,
//   ShieldCheck,
//   CalendarDays,
//   Ticket,
//   Sparkles,
//   Search,
//   ArrowUpRight,
//   CircleHelp,
//   Inbox,
// } from "lucide-react";

// const cn = (...classes) => classes.filter(Boolean).join(" ");

// const Support = () => {
//   const { user, token } = useAuth();

//   const [message, setMessage] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [optional, setOptional] = useState("");
//   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [userMessages, setUserMessages] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [submittedMessage, setSubmittedMessage] = useState(null);

//   const fetchMessages = useCallback(async () => {
//     if (!token) {
//       setFetching(false);
//       return;
//     }

//     try {
//       setFetching(true);
//       const res = await api.get(`/support/me?t=${Date.now()}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserMessages(Array.isArray(res.data?.supports) ? res.data.supports : []);
//     } catch (err) {
//       console.error("Fetch messages error:", err);
//     } finally {
//       setFetching(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchMessages();
//   }, [fetchMessages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) {
//       setStatusMsg({ type: "error", text: "Please enter your message." });
//       return;
//     }

//     setLoading(true);
//     setStatusMsg({ type: "", text: "" });

//     try {
//       const payload = {
//         message: message.trim(),
//         email: user?.email || "unknown",
//         walletAddress: walletAddress.trim(),
//         optional: optional.trim(),
//       };

//       const res = await api.post("/support/create", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data?.success) {
//         setSubmittedMessage(payload);
//         setShowModal(true);
//         setMessage("");
//         setWalletAddress("");
//         setOptional("");
//         await fetchMessages();
//       } else {
//         setStatusMsg({
//           type: "error",
//           text: res.data?.error || "Your request could not be submitted. Please try again.",
//         });
//       }
//     } catch (err) {
//       setStatusMsg({
//         type: "error",
//         text: err.response?.data?.error || "Failed to send message. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (value = "Pending") => {
//     const normalized = String(value).toLowerCase();
//     if (normalized === "resolved" || normalized === "closed") {
//       return {
//         label: value,
//         icon: CheckCircle2,
//         className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
//         dot: "bg-emerald-500",
//       };
//     }
//     if (normalized === "rejected") {
//       return {
//         label: value,
//         icon: XCircle,
//         className: "bg-rose-50 text-rose-700 ring-rose-200",
//         dot: "bg-rose-500",
//       };
//     }
//     if (normalized === "pending") {
//       return {
//         label: value,
//         icon: Clock3,
//         className: "bg-amber-50 text-amber-700 ring-amber-200",
//         dot: "bg-amber-500",
//       };
//     }
//     return {
//       label: value,
//       icon: Clock3,
//       className: "bg-slate-100 text-slate-600 ring-slate-200",
//       dot: "bg-slate-400",
//     };
//   };

//   const formatDate = (value) => {
//     const date = new Date(value);
//     if (!value || Number.isNaN(date.getTime())) return "Date unavailable";
//     return date.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const pendingCount = userMessages.filter(
//     (item) => String(item.status || "Pending").toLowerCase() === "pending"
//   ).length;
//   const resolvedCount = userMessages.filter((item) =>
//     ["resolved", "closed"].includes(String(item.status || "").toLowerCase())
//   ).length;

//   const filteredMessages = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     return userMessages.filter((item) => {
//       const status = String(item.status || "Pending").toLowerCase();
//       const matchesFilter =
//         filter === "all" ||
//         (filter === "pending" && status === "pending") ||
//         (filter === "resolved" && ["resolved", "closed"].includes(status)) ||
//         (filter === "rejected" && status === "rejected");
//       const matchesSearch =
//         !term ||
//         [item.message, item.walletAddress, item.optional, item.adminReply]
//           .filter(Boolean)
//           .some((value) => String(value).toLowerCase().includes(term));
//       return matchesFilter && matchesSearch;
//     });
//   }, [userMessages, filter, search]);

//   return (
//     <main className="relative mx-auto w-full max-w-[1440px] px-3 pb-10 pt-3 sm:px-5 lg:px-7">
//       <style>{`
//         .support-page { color: #172b25; }
//         .support-scroll { scrollbar-width: thin; scrollbar-color: #b8cfc2 transparent; }
//         .support-scroll::-webkit-scrollbar { width: 6px; }
//         .support-scroll::-webkit-scrollbar-thumb { background: #b8cfc2; border-radius: 20px; }
//         .support-field { transition: border-color .2s ease, box-shadow .2s ease, background .2s ease; }
//         .support-field:focus { outline: none; border-color: #168653; background: #fff; box-shadow: 0 0 0 4px rgba(22,134,83,.10); }
//         .support-card { transition: transform .2s ease, box-shadow .2s ease; }
//         .support-card:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(17,54,39,.08); }
//       `}</style>

//       <div className="support-page">
//         {/* Hero */}
//         <section className="relative isolate mb-6 overflow-hidden rounded-[26px] bg-[#102f25] px-5 py-6 text-white shadow-[0_18px_50px_rgba(16,47,37,.16)] sm:px-8 sm:py-8">
//           <div className="absolute -right-16 -top-28 -z-10 h-80 w-80 rounded-full border-[42px] border-white/[0.045]" />
//           <div className="absolute -bottom-28 right-1/4 -z-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
//           <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-emerald-500/10 to-transparent" />
//           <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
//             <div className="max-w-2xl">
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-emerald-100">
//                 <Sparkles size={13} /> Member care desk
//               </div>
//               <div className="flex items-start gap-3 sm:gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 sm:h-14 sm:w-14">
//                   <LifeBuoy size={27} className="text-emerald-300" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-[38px]">
//                     Support Center
//                   </h1>
//                   <p className="mt-2 max-w-xl text-xs leading-6 text-emerald-50/75 sm:text-sm">
//                     Need a hand? Send our team a message and keep every request, update, and reply in one place.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
//                 <ShieldCheck size={21} />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-white">Private & secure</p>
//                 <p className="mt-0.5 text-[10px] text-emerald-100/65">Your account support requests</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Summary cards */}
//         <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
//           {[
//             {
//               label: "Total tickets",
//               value: userMessages.length,
//               icon: Ticket,
//               iconClass: "bg-emerald-50 text-emerald-700",
//               accent: "from-emerald-500 to-teal-400",
//             },
//             {
//               label: "Awaiting response",
//               value: pendingCount,
//               icon: Clock3,
//               iconClass: "bg-amber-50 text-amber-700",
//               accent: "from-amber-400 to-orange-300",
//             },
//             {
//               label: "Resolved tickets",
//               value: resolvedCount,
//               icon: CheckCircle2,
//               iconClass: "bg-green-50 text-green-700",
//               accent: "from-green-500 to-lime-400",
//             },
//           ].map((stat) => {
//             const Icon = stat.icon;
//             return (
//               <div key={stat.label} className="support-card relative overflow-hidden rounded-2xl border border-[#e5eee8] bg-white p-4 shadow-[0_5px_20px_rgba(17,54,39,.035)] sm:p-5">
//                 <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />
//                 <div className="flex items-center justify-between gap-3">
//                   <div>
//                     <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-400">{stat.label}</p>
//                     <p className="mt-2 text-3xl font-black tracking-tight text-[#17372b]">{stat.value}</p>
//                   </div>
//                   <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", stat.iconClass)}>
//                     <Icon size={22} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </section>

//         {/* Main content */}
//         <section className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(340px,0.82fr)_minmax(0,1.45fr)]">
//           {/* New ticket form */}
//           <div className="overflow-hidden rounded-[22px] border border-[#e3ece6] bg-white shadow-[0_8px_30px_rgba(17,54,39,.045)]">
//             <div className="border-b border-[#edf2ee] bg-[#fbfdfb] px-5 py-5 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5ed] text-[#168653]">
//                   <MessageSquare size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-extrabold text-[#18382b]">Create a ticket</h2>
//                   <p className="mt-1 text-[11px] text-slate-500">Tell us what you need help with</p>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
//               <div>
//                 <label htmlFor="support-message" className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600">
//                   Your message <span className="text-rose-500">*</span>
//                 </label>
//                 <textarea
//                   id="support-message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Describe your issue and include any helpful details..."
//                   className="support-field min-h-[150px] w-full resize-y rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm leading-6 text-slate-800 placeholder:text-slate-400"
//                   rows={6}
//                   required
//                   disabled={loading}
//                   maxLength={5000}
//                 />
//                 <div className="mt-1.5 flex justify-between gap-2 text-[10px] text-slate-400">
//                   <span>Please be as specific as possible.</span>
//                   <span>{message.length}/5000</span>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="support-wallet" className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600">
//                   <Wallet size={13} /> Wallet address <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
//                 </label>
//                 <input
//                   id="support-wallet"
//                   type="text"
//                   value={walletAddress}
//                   onChange={(e) => setWalletAddress(e.target.value)}
//                   placeholder="Enter your wallet address"
//                   disabled={loading}
//                   className="support-field h-12 w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 text-sm text-slate-800 placeholder:text-slate-400"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="support-extra" className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600">
//                   <Info size={13} /> Additional information <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
//                 </label>
//                 <input
//                   id="support-extra"
//                   type="text"
//                   value={optional}
//                   onChange={(e) => setOptional(e.target.value)}
//                   placeholder="Transaction ID, reference, or other details"
//                   disabled={loading}
//                   className="support-field h-12 w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 text-sm text-slate-800 placeholder:text-slate-400"
//                 />
//               </div>

//               {statusMsg.text && statusMsg.type === "error" && (
//                 <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-rose-700">
//                   <AlertCircle size={17} className="mt-0.5 shrink-0" />
//                   <p className="text-xs font-semibold leading-5">{statusMsg.text}</p>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading || !message.trim()}
//                 className="group flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#147447] to-[#15945a] px-4 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-white shadow-[0_8px_18px_rgba(20,116,71,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(20,116,71,.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:bg-none disabled:text-slate-400 disabled:shadow-none"
//               >
//                 {loading ? <RefreshCw size={17} className="animate-spin" /> : <Send size={16} />}
//                 {loading ? "Sending request..." : "Submit support ticket"}
//                 {!loading && <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
//               </button>

//               <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-[#f3faf5] p-3.5">
//                 <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-700" />
//                 <p className="text-[10px] leading-5 text-slate-600">
//                   Your request is linked to your account. You can follow its status and read the support team's reply in Ticket History.
//                 </p>
//               </div>
//             </form>
//           </div>

//           {/* Ticket history */}
//           <div className="min-w-0 overflow-hidden rounded-[22px] border border-[#e3ece6] bg-white shadow-[0_8px_30px_rgba(17,54,39,.045)]">
//             <div className="border-b border-[#edf2ee] bg-[#fbfdfb] px-5 py-5 sm:px-6">
//               <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5ed] text-[#168653]">
//                     <Headphones size={20} />
//                   </div>
//                   <div>
//                     <h2 className="text-base font-extrabold text-[#18382b]">Ticket history</h2>
//                     <p className="mt-1 text-[11px] text-slate-500">Updates and replies from our team</p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={fetchMessages}
//                   disabled={fetching}
//                   className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-[#dce9e0] bg-white px-3.5 text-[11px] font-bold text-[#24764c] transition hover:bg-[#f0f8f2] disabled:opacity-50 sm:self-auto"
//                 >
//                   <RefreshCw size={14} className={fetching ? "animate-spin" : ""} />
//                   Refresh
//                 </button>
//               </div>

//               <div className="mt-5 flex flex-col gap-3 sm:flex-row">
//                 <div className="relative min-w-0 flex-1">
//                   <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search your tickets..."
//                     className="support-field h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs text-slate-700 placeholder:text-slate-400"
//                   />
//                 </div>
//                 <div className="flex gap-1 overflow-x-auto rounded-xl bg-[#edf4ef] p-1">
//                   {[
//                     ["all", "All"],
//                     ["pending", "Pending"],
//                     ["resolved", "Resolved"],
//                     ["rejected", "Rejected"],
//                   ].map(([value, label]) => (
//                     <button
//                       key={value}
//                       type="button"
//                       onClick={() => setFilter(value)}
//                       className={cn(
//                         "shrink-0 rounded-lg px-3 py-2 text-[10px] font-bold transition",
//                         filter === value
//                           ? "bg-white text-[#176b43] shadow-sm"
//                           : "text-slate-500 hover:text-slate-800"
//                       )}
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="support-scroll max-h-[760px] space-y-3 overflow-y-auto p-4 sm:p-5">
//               {fetching ? (
//                 <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
//                   <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
//                     <RefreshCw size={22} className="animate-spin" />
//                   </div>
//                   <p className="text-xs font-bold text-slate-600">Loading your tickets...</p>
//                   <p className="mt-1 text-[10px] text-slate-400">This will only take a moment</p>
//                 </div>
//               ) : filteredMessages.length === 0 ? (
//                 <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce9e0] bg-[#fbfdfb] px-5 text-center">
//                   <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5ed] text-[#238052]">
//                     {userMessages.length === 0 ? <Inbox size={25} /> : <Search size={24} />}
//                   </div>
//                   <h3 className="text-sm font-extrabold text-slate-700">
//                     {userMessages.length === 0 ? "No tickets yet" : "No matching tickets"}
//                   </h3>
//                   <p className="mt-1.5 max-w-[260px] text-xs leading-5 text-slate-400">
//                     {userMessages.length === 0
//                       ? "When you submit a support request, it will appear here."
//                       : "Try another search term or select a different status filter."}
//                   </p>
//                 </div>
//               ) : (
//                 filteredMessages.map((item) => {
//                   const status = getStatus(item.status || "Pending");
//                   const StatusIcon = status.icon;
//                   return (
//                     <article
//                       key={item._id}
//                       className="support-card relative overflow-hidden rounded-2xl border border-[#e6eee8] bg-white p-4 sm:p-5"
//                     >
//                       <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-emerald-500 to-teal-300" />
//                       <div className="flex flex-wrap items-center justify-between gap-2 pl-1">
//                         <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.1em] ring-1 ring-inset", status.className)}>
//                           <StatusIcon size={12} /> {status.label}
//                         </span>
//                         <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
//                           <CalendarDays size={12} /> {formatDate(item.createdAt)}
//                         </span>
//                       </div>

//                       <div className="mt-4 pl-1">
//                         <div className="mb-2 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.14em] text-slate-400">
//                           <MessageSquare size={13} className="text-emerald-700" /> Your message
//                         </div>
//                         <p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">
//                           {item.message}
//                         </p>
//                       </div>

//                       {(item.walletAddress || item.optional) && (
//                         <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 pl-1 sm:grid-cols-2">
//                           {item.walletAddress && (
//                             <div className="flex min-w-0 items-start gap-2">
//                               <Wallet size={13} className="mt-0.5 shrink-0 text-emerald-700" />
//                               <div className="min-w-0">
//                                 <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-slate-400">Wallet address</p>
//                                 <p className="break-all font-mono text-[10px] text-slate-600">{item.walletAddress}</p>
//                               </div>
//                             </div>
//                           )}
//                           {item.optional && (
//                             <div className="flex min-w-0 items-start gap-2">
//                               <Info size={13} className="mt-0.5 shrink-0 text-emerald-700" />
//                               <div className="min-w-0">
//                                 <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-slate-400">Additional information</p>
//                                 <p className="break-words text-[10px] leading-5 text-slate-600">{item.optional}</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {item.adminReply && (
//                         <div className="mt-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-[#f0faf3] to-[#f8fcf8] p-4">
//                           <div className="mb-2 flex items-center gap-2">
//                             <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
//                               <CheckCircle2 size={15} />
//                             </span>
//                             <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-emerald-800">Support team reply</span>
//                           </div>
//                           <p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">{item.adminReply}</p>
//                         </div>
//                       )}
//                     </article>
//                   );
//                 })
//               )}
//             </div>

//             {!fetching && userMessages.length > 0 && (
//               <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#edf2ee] bg-[#fbfdfb] px-5 py-3.5">
//                 <span className="text-[10px] font-semibold text-slate-500">
//                   Showing {filteredMessages.length} of {userMessages.length} tickets
//                 </span>
//                 <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
//                   <CheckCircle2 size={13} /> Up to date
//                 </span>
//               </div>
//             )}
//           </div>
//         </section>

//         <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-slate-400">
//           <CircleHelp size={13} /> Need more help? Submit a ticket and our team will assist you.
//         </div>
//       </div>

//       {submittedMessage && (
//         <SuccessModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           customTitle="Support Ticket Created"
//           customMessage="We've received your message. Our support team will review it and get back to you shortly."
//         />
//       )}
//     </main>
//   );
// };

// export default Support;


import React, { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/modals/SuccessModal";
import {
  LifeBuoy,
  Send,
  MessageSquare,
  Wallet,
  Info,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Headphones,
  ShieldCheck,
  CalendarDays,
  Ticket,
  Sparkles,
  Search,
  ArrowUpRight,
  CircleHelp,
  Inbox,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Support = () => {
  const { user, token } = useAuth();

  const [message, setMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [optional, setOptional] = useState("");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!token) {
      setFetching(false);
      return;
    }

    try {
      setFetching(true);
      const res = await api.get(`/support/me?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMessages(
        Array.isArray(res.data?.supports) ? res.data.supports : []
      );
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      setFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatusMsg({
        type: "error",
        text: "Please enter your message.",
      });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const payload = {
        message: message.trim(),
        email: user?.email || "unknown",
        walletAddress: walletAddress.trim(),
        optional: optional.trim(),
      };

      const res = await api.post("/support/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setSubmittedMessage(payload);
        setShowModal(true);
        setMessage("");
        setWalletAddress("");
        setOptional("");
        await fetchMessages();
      } else {
        setStatusMsg({
          type: "error",
          text:
            res.data?.error ||
            "Your request could not be submitted. Please try again.",
        });
      }
    } catch (err) {
      setStatusMsg({
        type: "error",
        text:
          err.response?.data?.error ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (value = "Pending") => {
    const normalized = String(value).toLowerCase();

    if (normalized === "resolved" || normalized === "closed") {
      return {
        label: value,
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        dot: "bg-emerald-500",
      };
    }

    if (normalized === "rejected") {
      return {
        label: value,
        icon: XCircle,
        className: "bg-rose-50 text-rose-700 ring-rose-200",
        dot: "bg-rose-500",
      };
    }

    if (normalized === "pending") {
      return {
        label: value,
        icon: Clock3,
        className: "bg-amber-50 text-amber-700 ring-amber-200",
        dot: "bg-amber-500",
      };
    }

    return {
      label: value,
      icon: Clock3,
      className: "bg-slate-100 text-slate-600 ring-slate-200",
      dot: "bg-slate-400",
    };
  };

  const formatDate = (value) => {
    const date = new Date(value);

    if (!value || Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingCount = userMessages.filter(
    (item) => String(item.status || "Pending").toLowerCase() === "pending"
  ).length;

  const resolvedCount = userMessages.filter((item) =>
    ["resolved", "closed"].includes(
      String(item.status || "").toLowerCase()
    )
  ).length;

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();

    return userMessages.filter((item) => {
      const status = String(item.status || "Pending").toLowerCase();

      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && status === "pending") ||
        (filter === "resolved" &&
          ["resolved", "closed"].includes(status)) ||
        (filter === "rejected" && status === "rejected");

      const matchesSearch =
        !term ||
        [item.message, item.walletAddress, item.optional, item.adminReply]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term));

      return matchesFilter && matchesSearch;
    });
  }, [userMessages, filter, search]);

  return (
    <main className="relative mx-auto w-full max-w-[1440px] px-3 pb-10 pt-3 sm:px-5 lg:px-7">
      <style>{`
        .support-page {
          color: #172b25;
        }

        .support-scroll {
          scrollbar-width: thin;
          scrollbar-color: #b8cfc2 transparent;
        }

        .support-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .support-scroll::-webkit-scrollbar-thumb {
          background: #b8cfc2;
          border-radius: 20px;
        }

        .support-field {
          transition:
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease;
        }

        .support-field:focus {
          outline: none;
          border-color: #168653;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(22,134,83,.10);
        }

        .support-card {
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .support-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(17,54,39,.08);
        }
      `}</style>

      <div className="support-page">

    

        {/* Summary Cards */}
        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

          {[
            {
              label: "Total tickets",
              value: userMessages.length,
              icon: Ticket,
              iconClass: "bg-emerald-50 text-emerald-700",
              accent: "from-emerald-500 to-teal-400",
            },
            {
              label: "Awaiting response",
              value: pendingCount,
              icon: Clock3,
              iconClass: "bg-amber-50 text-amber-700",
              accent: "from-amber-400 to-orange-300",
            },
            {
              label: "Resolved tickets",
              value: resolvedCount,
              icon: CheckCircle2,
              iconClass: "bg-green-50 text-green-700",
              accent: "from-green-500 to-lime-400",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="support-card relative overflow-hidden rounded-2xl border border-[#e5eee8] bg-white p-4 shadow-[0_5px_20px_rgba(17,54,39,.035)] sm:p-5"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`}
                />

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-black tracking-tight text-[#17372b]">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      stat.iconClass
                    )}
                  >
                    <Icon size={22} />
                  </div>

                </div>
              </div>
            );
          })}

        </section>

        {/* Main Content */}
        <section className="flex flex-col gap-5">

          {/* Create Ticket Form */}
          <div className="overflow-hidden rounded-[24px] border border-[#dfeae3] bg-white shadow-[0_12px_36px_rgba(17,54,39,.055)]">

            <div className="relative overflow-hidden border-b border-[#e8f0eb] bg-gradient-to-r from-[#f2faf5] via-white to-[#f8fbf8] px-5 py-5 sm:px-7 sm:py-6">

              <div className="absolute -right-8 -top-16 h-44 w-44 rounded-full border-[22px] border-emerald-900/[0.035]" />

              <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                 

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-[#153b2b] sm:text-xl">
                      Support request
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Share the details below. Our support team will review
                      your request.
                    </p>
                  </div>

                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-3 py-2 text-[10px] font-bold text-emerald-800 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Secure request form
                </div>

              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-x-6 gap-y-5 p-5 sm:p-7 lg:grid-cols-2"
            >

              {/* Message */}
              <div className="lg:col-span-2">

                <label
                  htmlFor="support-message"
                  className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600"
                >
                  Your message <span className="text-rose-500">*</span>
                </label>

                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain the issue you are experiencing. Add relevant dates, steps, or error messages..."
                  className="support-field min-h-[150px] w-full resize-y rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm leading-6 text-slate-800 placeholder:text-slate-400"
                  rows={6}
                  required
                  disabled={loading}
                  maxLength={5000}
                />

                <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-[10px] text-slate-400">
                  <span>
                    Include the steps you took and what happened.
                  </span>

                  <span>{message.length}/5000</span>
                </div>

              </div>

              {/* Wallet Address */}
              <div>

                <label
                  htmlFor="support-wallet"
                  className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600"
                >
                  <Wallet size={13} />
                  Wallet address

                  <span className="font-medium normal-case tracking-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="support-wallet"
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Paste your wallet address (if relevant)"
                  disabled={loading}
                  className="support-field h-12 w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 text-sm text-slate-800 placeholder:text-slate-400"
                />

              </div>

              {/* Additional Information */}
              <div>

                <label
                  htmlFor="support-extra"
                  className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-600"
                >
                  <Info size={13} />
                  Additional information

                  <span className="font-medium normal-case tracking-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="support-extra"
                  type="text"
                  value={optional}
                  onChange={(e) => setOptional(e.target.value)}
                  placeholder="Add a transaction ID, reference number, or context"
                  disabled={loading}
                  className="support-field h-12 w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 text-sm text-slate-800 placeholder:text-slate-400"
                />

              </div>

              {/* Error Message */}
              {statusMsg.text && statusMsg.type === "error" && (
                <div
                  role="alert"
                  className="lg:col-span-2 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-rose-700"
                >
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />

                  <p className="text-xs font-semibold leading-5">
                    {statusMsg.text}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="lg:col-span-2 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <p className="max-w-xl text-[10px] leading-5 text-slate-500">
                  By submitting, your request will be securely linked to your
                  account. You can follow its progress and read replies in the
                  ticket history below.
                </p>

                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="group flex min-h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#147447] to-[#15945a] px-6 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-white shadow-[0_8px_18px_rgba(20,116,71,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(20,116,71,.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:bg-none disabled:text-slate-400 disabled:shadow-none sm:w-auto"
                >
                  {loading ? (
                    <RefreshCw size={17} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}

                  {loading ? "Sending request..." : "Send support request"}

                  {!loading && (
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>

              </div>
            </form>
          </div>

          {/* Ticket History - Below Create Ticket */}
          <div className="min-w-0 overflow-hidden rounded-[22px] border border-[#e3ece6] bg-white shadow-[0_8px_30px_rgba(17,54,39,.045)]">

            {/* History Header */}
            <div className="border-b border-[#edf2ee] bg-[#fbfdfb] px-5 py-5 sm:px-6">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5ed] text-[#168653]">
                    <Headphones size={20} />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold text-[#18382b]">
                      Ticket history
                    </h2>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Updates and replies from our team
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={fetchMessages}
                  disabled={fetching}
                  className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-[#dce9e0] bg-white px-3.5 text-[11px] font-bold text-[#24764c] transition hover:bg-[#f0f8f2] disabled:opacity-50 sm:self-auto"
                >
                  <RefreshCw
                    size={14}
                    className={fetching ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

              </div>

              {/* Search & Filters */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <div className="relative min-w-0 flex-1">

                  <Search
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search your tickets..."
                    className="support-field h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs text-slate-700 placeholder:text-slate-400"
                  />

                </div>

                <div className="flex gap-1 overflow-x-auto rounded-xl bg-[#edf4ef] p-1">

                  {[
                    ["all", "All"],
                    ["pending", "Pending"],
                    ["resolved", "Resolved"],
                    ["rejected", "Rejected"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFilter(value)}
                      className={cn(
                        "shrink-0 rounded-lg px-3 py-2 text-[10px] font-bold transition",
                        filter === value
                          ? "bg-white text-[#176b43] shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      {label}
                    </button>
                  ))}

                </div>
              </div>
            </div>

            {/* Ticket List */}
            <div className="support-scroll max-h-[760px] space-y-3 overflow-y-auto p-4 sm:p-5">

              {fetching ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <RefreshCw size={22} className="animate-spin" />
                  </div>

                  <p className="text-xs font-bold text-slate-600">
                    Loading your tickets...
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    This will only take a moment
                  </p>

                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce9e0] bg-[#fbfdfb] px-5 text-center">

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5ed] text-[#238052]">
                    {userMessages.length === 0 ? (
                      <Inbox size={25} />
                    ) : (
                      <Search size={24} />
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-700">
                    {userMessages.length === 0
                      ? "No tickets yet"
                      : "No matching tickets"}
                  </h3>

                  <p className="mt-1.5 max-w-[260px] text-xs leading-5 text-slate-400">
                    {userMessages.length === 0
                      ? "When you submit a support request, it will appear here."
                      : "Try another search term or select a different status filter."}
                  </p>

                </div>
              ) : (
                filteredMessages.map((item) => {
                  const status = getStatus(item.status || "Pending");
                  const StatusIcon = status.icon;

                  return (
                    <article
                      key={item._id}
                      className="support-card relative overflow-hidden rounded-2xl border border-[#e6eee8] bg-white p-4 sm:p-5"
                    >
                      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-emerald-500 to-teal-300" />

                      <div className="flex flex-wrap items-center justify-between gap-2 pl-1">

                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.1em] ring-1 ring-inset",
                            status.className
                          )}
                        >
                          <StatusIcon size={12} />
                          {status.label}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                          <CalendarDays size={12} />
                          {formatDate(item.createdAt)}
                        </span>

                      </div>

                      {/* User Message */}
                      <div className="mt-4 pl-1">

                        <div className="mb-2 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.14em] text-slate-400">
                          <MessageSquare
                            size={13}
                            className="text-emerald-700"
                          />
                          Your message
                        </div>

                        <p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">
                          {item.message}
                        </p>

                      </div>

                      {/* Extra Details */}
                      {(item.walletAddress || item.optional) && (
                        <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 pl-1 sm:grid-cols-2">

                          {item.walletAddress && (
                            <div className="flex min-w-0 items-start gap-2">

                              <Wallet
                                size={13}
                                className="mt-0.5 shrink-0 text-emerald-700"
                              />

                              <div className="min-w-0">

                                <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-slate-400">
                                  Wallet address
                                </p>

                                <p className="break-all font-mono text-[10px] text-slate-600">
                                  {item.walletAddress}
                                </p>

                              </div>
                            </div>
                          )}

                          {item.optional && (
                            <div className="flex min-w-0 items-start gap-2">

                              <Info
                                size={13}
                                className="mt-0.5 shrink-0 text-emerald-700"
                              />

                              <div className="min-w-0">

                                <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-slate-400">
                                  Additional information
                                </p>

                                <p className="break-words text-[10px] leading-5 text-slate-600">
                                  {item.optional}
                                </p>

                              </div>
                            </div>
                          )}

                        </div>
                      )}

                      {/* Admin Reply */}
                      {item.adminReply && (
                        <div className="mt-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-[#f0faf3] to-[#f8fcf8] p-4">

                          <div className="mb-2 flex items-center gap-2">

                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                              <CheckCircle2 size={15} />
                            </span>

                            <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-emerald-800">
                              Support team reply
                            </span>

                          </div>

                          <p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">
                            {item.adminReply}
                          </p>

                        </div>
                      )}

                    </article>
                  );
                })
              )}

            </div>

            {/* Footer */}
            {!fetching && userMessages.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#edf2ee] bg-[#fbfdfb] px-5 py-3.5">

                <span className="text-[10px] font-semibold text-slate-500">
                  Showing {filteredMessages.length} of {userMessages.length} tickets
                </span>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 size={13} />
                  Up to date
                </span>

              </div>
            )}

          </div>
        </section>

        {/* Bottom Note */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-slate-400">
          <CircleHelp size={13} />
          Your support journey, ticket updates, and team replies are all available here.
        </div>

      </div>

      {/* Success Modal */}
      {submittedMessage && (
        <SuccessModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          customTitle="Support Ticket Created"
          customMessage="Your support request has been submitted successfully. Our team has received your message and will review it. You can check the ticket history below for status updates and replies."
        />
      )}
    </main>
  );
};

export default Support;