// // C:\Users\HP\Desktop\Cryptocommunity\frontend\src\pages\user\Support.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import SuccessModal from "../../components/modals/SuccessModal";
// import { LifeBuoy, Send, MessageSquare, Wallet, Info, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// const Support = () => {
//   const { user, token } = useAuth();
//   const [message, setMessage] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [optional, setOptional] = useState("");
//   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [userMessages, setUserMessages] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [submittedMessage, setSubmittedMessage] = useState(null);

//   // Fetch logic using the NEW /me route
//   const fetchMessages = useCallback(async () => {
//     if (!token) return;
//     try {
//       setFetching(true);
//       // 🔥 CACHE FIX: ?t= add kiya hai
//       const res = await api.get(`/support/me?t=${new Date().getTime()}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserMessages(res.data.supports || []);
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
    
//     // ✅ SIRF MESSAGE MANDATORY HAI AB
//     if (!message.trim()) {
//       setStatusMsg({ type: "error", text: "Please enter your message." });
//       return;
//     }

//     setLoading(true);
//     setStatusMsg({ type: "", text: "" });

//     try {
//       const res = await api.post(
//         "/support/create",
//         { message, email: user?.email || "unknown", walletAddress, optional },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         setSubmittedMessage({ message, walletAddress, optional });
//         setShowModal(true);
//         setMessage("");
//         setWalletAddress("");
//         setOptional("");
//         fetchMessages(); // Refresh list
//       }
//     } catch (err) {
//       const errorText = err.response?.data?.error || "Failed to send message. Please try again.";
//       setStatusMsg({ type: "error", text: errorText });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
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
//              <LifeBuoy className="text-green-500" size={28} /> Support Center
//           </h2>
//           <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
//             We are here to help you 24/7
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* LEFT COLUMN: Support Form */}
//         <div>
//           <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[100px] pointer-events-none rounded-full"></div>
            
//             <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
//               <MessageSquare size={18} className="text-green-500" /> Create New Ticket
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
//               {/* Message Input (Mandatory) */}
//               <div>
//                 <label className="block text-xs font-bold text-black uppercase tracking-widest mb-2">
//                   Your Message <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
//                     <MessageSquare size={16} className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
//                   </div>
//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Describe your issue in detail..."
//                     className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-xl px-4 py-3 pl-10 focus:border-green-500 focus:outline-none transition-all placeholder-slate-400 custom-scroll disabled:opacity-50"
//                     rows="4"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               {statusMsg.text && statusMsg.type === "error" && (
//                 <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
//                   <AlertCircle size={18} className="shrink-0" />
//                   <span className="font-bold text-xs tracking-wide">{statusMsg.text}</span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
//                   loading 
//                     ? "bg-white/5 text-gray-500 cursor-not-allowed border border-slate-200" 
//                     : "bg-gradient-to-r from-green-500 to-red-600 text-slate-900 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-[1.02]"
//                 }`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <Send size={18} /> Submit Ticket
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Ticket History */}
//         <div>
//           <div className="bg-white shadow-sm backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-2xl h-full flex flex-col">
//             <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
//               <Clock size={18} className="text-blue-500" /> Ticket History
//             </h3>

//             <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-4 max-h-[500px]">
//               {fetching ? (
//                 <div className="text-center py-10">
//                   <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                   <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading History...</span>
//                 </div>
//               ) : userMessages.length === 0 ? (
//                 <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-white">
//                   <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">No Previous Tickets</span>
//                 </div>
//               ) : (
//                 userMessages.map((m) => {
                  
//                   // Status UI Logic
//                   let statusColor = "bg-white/5 text-black border-slate-200";
//                   let StatusIcon = Clock;
                  
//                   if (m.status === "Pending") {
//                     statusColor = "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
//                     StatusIcon = Clock;
//                   } else if (m.status === "Resolved" || m.status === "Closed") {
//                     statusColor = "bg-green-500/10 text-green-400 border-green-500/30";
//                     StatusIcon = CheckCircle2;
//                   } else if (m.status === "Rejected") {
//                     statusColor = "bg-red-500/10 text-red-400 border-red-500/30";
//                     StatusIcon = XCircle;
//                   }

//                   return (
//                     <div key={m._id} className="p-5 border border-slate-100 rounded-xl bg-white hover:bg-white/5 transition-colors">
//                       <div className="flex justify-between items-start mb-3">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] sm:text-[10px] font-black tracking-widest uppercase rounded-md border ${statusColor}`}>
//                           <StatusIcon size={12} /> {m.status || "PENDING"}
//                         </span>
//                         <span className="text-[10px] md:text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
//                           {new Date(m.createdAt).toLocaleDateString("en-GB")}
//                         </span>
//                       </div>
                      
//                       <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
//                         {m.message}
//                       </p>
                      
//                       <div className="flex flex-col gap-1.5">
//                         {m.walletAddress && (
//                           <p className="text-[10px] md:text-xs text-black flex items-center gap-2">
//                             <Wallet size={12} className="text-gray-500"/>
//                             <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-mono truncate max-w-[200px] sm:max-w-xs">{m.walletAddress}</span>
//                           </p>
//                         )}
//                         {m.optional && (
//                           <p className="text-[10px] md:text-xs text-black flex items-center gap-2">
//                             <Info size={12} className="text-gray-500"/>
//                             <span className="text-slate-600 capitalize">{m.optional}</span>
//                           </p>
//                         )}
//                       </div>

//                       {/* 🔥 NEW: Admin Reply Box (Dikhayega tabhi jab admin reply dega) 🔥 */}
//                       {m.adminReply && (
//                         <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl relative">
//                           <div className="flex items-center gap-2 mb-1">
//                             <CheckCircle2 size={14} className="text-green-600" />
//                             <span className="text-xs font-black text-green-700 uppercase tracking-widest">Support Reply</span>
//                           </div>
//                           <p className="text-slate-800 text-sm font-medium">
//                             {m.adminReply}
//                           </p>
//                         </div>
//                       )}

//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>
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
//     </div>
//   );
// };

// export default Support;


import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/modals/SuccessModal";
import {
  LifeBuoy,
  Send,
  MessageSquare,
  Wallet,
  Info,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Headphones,
  ShieldCheck,
  CalendarDays,
  ChevronRight,
  Ticket,
  Sparkles,
} from "lucide-react";

const Support = () => {
  const { user, token } = useAuth();

  const [message, setMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [optional, setOptional] = useState("");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!token) {
      setFetching(false);
      return;
    }

    try {
      setFetching(true);

      const res = await api.get(
        `/support/me?t=${new Date().getTime()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserMessages(res.data.supports || []);
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
      const res = await api.post(
        "/support/create",
        {
          message,
          email: user?.email || "unknown",
          walletAddress,
          optional,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setSubmittedMessage({ message, walletAddress, optional });
        setShowModal(true);

        setMessage("");
        setWalletAddress("");
        setOptional("");

        fetchMessages();
      }
    } catch (err) {
      const errorText =
        err.response?.data?.error ||
        "Failed to send message. Please try again.";

      setStatusMsg({
        type: "error",
        text: errorText,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status = "Pending") => {
    const normalized = status.toLowerCase();

    if (normalized === "pending") {
      return {
        label: status,
        icon: Clock,
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    }

    if (normalized === "resolved" || normalized === "closed") {
      return {
        label: status,
        icon: CheckCircle2,
        color: "bg-green-50 text-green-700 border-green-200",
        dot: "bg-green-600",
      };
    }

    if (normalized === "rejected") {
      return {
        label: status,
        icon: XCircle,
        color: "bg-red-50 text-red-600 border-red-200",
        dot: "bg-red-500",
      };
    }

    return {
      label: status,
      icon: Clock,
      color: "bg-slate-50 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    };
  };

  const formatDate = (value) => {
    const date = new Date(value);

    if (!value || Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const pendingCount = userMessages.filter(
    (m) => (m.status || "Pending").toLowerCase() === "pending"
  ).length;

  const resolvedCount = userMessages.filter((m) =>
    ["resolved", "closed"].includes((m.status || "").toLowerCase())
  ).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-8 relative z-10 animate-in fade-in duration-500">
      <style>{`
        .support-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .support-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }

        .support-scroll::-webkit-scrollbar-thumb {
          background: #b7c99b;
          border-radius: 20px;
        }

        .support-scroll::-webkit-scrollbar-thumb:hover {
          background: #6e9145;
        }

        .support-input {
          transition: all .2s ease;
        }

        .support-input:focus {
          border-color: #39834a;
          box-shadow: 0 0 0 3px rgba(57,131,74,.10);
          background: #fff;
        }

        .ticket-card {
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .ticket-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15,23,42,.06);
        }
      `}</style>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#123d28] via-[#17633a] to-[#27824a] p-5 sm:p-7 mb-5 shadow-lg shadow-green-950/10">
        <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full border-[35px] border-white/5" />
        <div className="absolute right-20 -bottom-24 w-48 h-48 rounded-full bg-yellow-400/10 blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <LifeBuoy size={27} className="text-yellow-300" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={13} className="text-yellow-300" />
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-[2px] text-green-100">
                  We're here for you
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                Support Center
              </h1>

              <p className="text-[11px] sm:text-sm text-green-100 mt-1">
                Submit your query and track your support tickets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 w-fit">
            <ShieldCheck size={17} className="text-yellow-300" />
            <span className="text-[10px] sm:text-xs font-bold text-white">
              Member Assistance
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                Total Tickets
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {userMessages.length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Ticket size={20} className="text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-100 p-3.5 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                Pending
              </p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">
                {pendingCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-3.5 sm:p-4 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                Resolved
              </p>
              <h3 className="text-2xl font-black text-green-700 mt-1">
                {resolvedCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* Create Ticket */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
            <div className="px-4 sm:px-5 py-4 border-b border-slate-100 bg-[#fbfcfa]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <MessageSquare size={19} className="text-green-700" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Create New Ticket
                  </h2>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Tell us how we can help you
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
              {/* Message */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute top-3.5 left-3.5 text-green-700"
                  />

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    className="support-input w-full min-h-[135px] bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl pl-10 pr-3.5 py-3 outline-none resize-y placeholder:text-slate-400 disabled:opacity-50"
                    rows="5"
                    required
                    disabled={loading}
                  />
                </div>

                <p className="text-[10px] text-slate-400 mt-1.5">
                  Please provide enough details to help our team understand your issue.
                </p>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Wallet Address
                  <span className="ml-1.5 normal-case font-medium text-slate-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Wallet
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-green-700"
                  />

                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    disabled={loading}
                    className="support-input w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Additional Information
                  <span className="ml-1.5 normal-case font-medium text-slate-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Info
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-green-700"
                  />

                  <input
                    type="text"
                    value={optional}
                    onChange={(e) => setOptional(e.target.value)}
                    placeholder="Any additional details..."
                    disabled={loading}
                    className="support-input w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Error Message */}
              {statusMsg.text && statusMsg.type === "error" && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle
                    size={17}
                    className="text-red-600 shrink-0 mt-0.5"
                  />
                  <p className="text-xs font-semibold text-red-700 leading-relaxed">
                    {statusMsg.text}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full min-h-12 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                  loading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-gradient-to-r from-[#17633a] to-[#2c8a4e] text-white shadow-md shadow-green-900/15 hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Submit Support Ticket
                    <ChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-[#f7f9f4] border border-green-100">
                <ShieldCheck
                  size={16}
                  className="text-green-700 shrink-0 mt-0.5"
                />
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Your support request will be recorded in your account. You can
                  track its status and view the support team's reply here.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Ticket History */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* History Header */}
            <div className="px-4 sm:px-5 py-4 border-b border-slate-100 bg-[#fbfcfa] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Headphones size={19} className="text-green-700" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Ticket History
                  </h2>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Track your submitted requests
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchMessages}
                disabled={fetching}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-green-700 hover:bg-green-50 disabled:opacity-50 transition-all"
                title="Refresh history"
              >
                <RefreshCw
                  size={15}
                  className={fetching ? "animate-spin" : ""}
                />
              </button>
            </div>

            {/* History Content */}
            <div className="support-scroll p-3 sm:p-4 space-y-3 max-h-[690px] overflow-y-auto">
              {fetching ? (
                <div className="py-16 text-center">
                  <RefreshCw
                    size={27}
                    className="animate-spin text-green-600 mx-auto mb-3"
                  />
                  <p className="text-xs font-bold text-slate-500">
                    Loading ticket history...
                  </p>
                </div>
              ) : userMessages.length === 0 ? (
                <div className="py-14 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
                    <Ticket size={25} className="text-green-700" />
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-700">
                    No Previous Tickets
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] mx-auto leading-relaxed">
                    Your submitted support requests will appear here.
                  </p>
                </div>
              ) : (
                userMessages.map((m) => {
                  const status = getStatusStyle(m.status || "Pending");
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={m._id}
                      className="ticket-card relative bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-yellow-400" />

                      {/* Ticket Top */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pl-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${status.color}`}
                        >
                          <StatusIcon size={13} />
                          {status.label}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                          <CalendarDays size={12} />
                          {formatDate(m.createdAt)}
                        </span>
                      </div>

                      {/* Message */}
                      <div className="pl-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <MessageSquare
                            size={13}
                            className="text-green-700"
                          />
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                            Your Message
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                          {m.message}
                        </p>
                      </div>

                      {/* Optional Details */}
                      {(m.walletAddress || m.optional) && (
                        <div className="mt-3 pt-3 border-t border-slate-100 pl-1 space-y-2">
                          {m.walletAddress && (
                            <div className="flex items-start gap-2">
                              <Wallet
                                size={13}
                                className="text-green-700 shrink-0 mt-0.5"
                              />
                              <div className="min-w-0">
                                <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                                  Wallet Address
                                </p>
                                <p className="text-[10px] sm:text-xs font-mono text-slate-600 break-all">
                                  {m.walletAddress}
                                </p>
                              </div>
                            </div>
                          )}

                          {m.optional && (
                            <div className="flex items-start gap-2">
                              <Info
                                size={13}
                                className="text-green-700 shrink-0 mt-0.5"
                              />
                              <div className="min-w-0">
                                <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                                  Additional Information
                                </p>
                                <p className="text-[10px] sm:text-xs text-slate-600 break-words">
                                  {m.optional}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Admin Reply */}
                      {m.adminReply && (
                        <div className="mt-4 ml-1 p-3.5 rounded-xl bg-gradient-to-br from-green-50 to-[#f7f9ef] border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                              <CheckCircle2
                                size={14}
                                className="text-green-700"
                              />
                            </div>

                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-800">
                              Support Team Reply
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                            {m.adminReply}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* History Footer */}
            {!fetching && userMessages.length > 0 && (
              <div className="px-4 py-3 bg-[#fbfcfa] border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-500">
                  Showing {userMessages.length} ticket
                  {userMessages.length !== 1 ? "s" : ""}
                </span>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-700">
                  <CheckCircle2 size={13} />
                  History Updated
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {submittedMessage && (
        <SuccessModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          customTitle="Support Ticket Created"
          customMessage="We've received your message. Our support team will review it and get back to you shortly."
        />
      )}
    </div>
  );
};

export default Support;
