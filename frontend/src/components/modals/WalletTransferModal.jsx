// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios"; 
// // import { useAuth } from "../../context/AuthContext"; 
// // import SuccessModal from "./SuccessModal";
// // import MessageModal from "./MessageModal";
// // import { Send, User, Lock, Wallet, ArrowRightLeft, X, XCircle, CheckCircle2, ShieldCheck } from "lucide-react";

// // const WalletTransferModal = ({ onClose }) => {
// //   // --- STATE ---
// //   const [userId, setUserId] = useState("");
// //   const [userName, setUserName] = useState("");
// //   const [amount, setAmount] = useState("");
// //   const [transactionPassword, setTransactionPassword] = useState("");
// //   const [senderBalance, setSenderBalance] = useState(null);
// //   const [successOpen, setSuccessOpen] = useState(false);
// //   const [loading, setLoading] = useState(false); 

// //   const { user: loggedInUser, token } = useAuth();
// //   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

// //   // ✅ ROLE CHECK
// //   const isLeaderUser = loggedInUser?.role === "leader";
// //   const isPromoUser = loggedInUser?.role === "promo"; // 🔥 Promo User check

// //   const showMessage = (title, message, type = "error") => 
// //     setMessageModal({ open: true, title, message, type });

// //   // --- LOGIC: Fetch Sender Balance ---
// //   useEffect(() => {
// //     if (!loggedInUser?.userId || !token) return;
// //     const fetchSenderBalance = async () => {
// //       try {
// //         const res = await api.get(`/user/${loggedInUser.userId}?t=${new Date().getTime()}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setSenderBalance(res.data.user.walletBalance || 0);
// //       } catch (err) { 
// //         setSenderBalance(0); 
// //         console.error(err); 
// //       }
// //     };
// //     fetchSenderBalance();
// //   }, [loggedInUser?.userId, token]);

// //   // --- LOGIC: Fetch Recipient Name (For Normal Users) ---
// //   const fetchUserName = async (idToFetch) => {
// //     if (isPromoUser) return; // Promo walo ko fetch nahi karna

// //     const trimmedId = (idToFetch || userId).trim();
// //     if (!trimmedId) {
// //         setUserName("");
// //         return;
// //     }
// //     try {
// //       const res = await api.get(`/user/${trimmedId}?t=${new Date().getTime()}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUserName(res.data.user?.name || "User not found");
// //     } catch { 
// //       setUserName("User not found"); 
// //     }
// //   };

// //   // --- LOGIC: Handle Transfer ---
// //   const handleTransfer = async () => {
// //     const amt = Number(amount);

// //     // Common Checks
// //     if (!transactionPassword) return showMessage("Error", "Enter transaction password.", "error");

// //     // 🔥 PROMO USER VALIDATION
// //     if (isPromoUser) {
// //       if (amt < 10 || amt > 1000) {
// //         return showMessage("Error", "Promo transfer amount must be between $10 and $1000.", "error");
// //       }
// //     } 
// //     // 🛡️ NORMAL/LEADER USER VALIDATION
// //     else {
// //       const trimmedId = userId.trim();
// //       if (!trimmedId || amt <= 0 || !userName || userName === "User not found")
// //         return showMessage("Error", "Provide a valid recipient and amount.", "error");
// //       if (trimmedId === String(loggedInUser.userId))
// //         return showMessage("Error", "You cannot transfer to yourself.", "error");
// //       if (amt > senderBalance) 
// // return showMessage("Error", `Insufficient balance ($${(Math.floor(Number(senderBalance) * 100) / 100).toFixed(2)})`, "error");
// //         }

// //     setLoading(true);
// //     try {
// //       // 🔥 DYNAMIC ENDPOINT LOGIC
// //       let endpoint = "/wallet/transfer";
// //       let payload = { fromUserId: loggedInUser.userId, toUserId: userId.trim(), amount: amt, transactionPassword };

// //       if (isPromoUser) {
// //         endpoint = "/wallet/promo-transfer"; // Naya Backend Route
// //         payload = { amount: amt, transactionPassword }; // Sirf amount jayega
// //       } else if (isLeaderUser) {
// //         endpoint = "/wallet/leader-transfer";
// //       }

// //       const res = await api.post(endpoint, payload, { headers: { Authorization: `Bearer ${token}` } });
      
// //       // Promo User ka response auto set karna Success modal ke liye
// //       if (isPromoUser) {
// //         setUserId(res.data.generatedId);
// //         setUserName(res.data.name);
// //       }

// //       setSuccessOpen(true);
// //     } catch (error) {
// //       const errorMsg = error.response?.data?.message || "Transfer failed due to a server error.";
// //       showMessage("Transfer Failed", errorMsg, "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSuccessClose = () => {
// //     setSuccessOpen(false);
// //     setUserId("");
// //     setUserName("");
// //     setAmount("");
// //     setTransactionPassword("");
// //     onClose();
// //   };

// //   return (
// //     <>
// //       {!successOpen && (
// //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4 overflow-hidden animate-in fade-in duration-300">
          
// //           <style>{`
// //             input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
// //             input[type=number] { -moz-appearance: textfield; }
// //             .custom-scroll::-webkit-scrollbar { width: 4px; }
// //             .custom-scroll::-webkit-scrollbar-track { background: transparent; }
// //             .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
// //             .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
// //           `}</style>

// //           <div className="bg-white mt-8 w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden animate-in zoom-in duration-300 transform scale-100">
            
// //             {/* Ambient Glow */}
// //             <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[60px] pointer-events-none rounded-full"></div>

// //             {/* Header */}
// //             <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center relative z-10 shrink-0">
// //                <div className="flex items-center gap-3">
// //                   <div className="p-2 bg-green-50 rounded-xl border border-green-100 text-green-600">
// //                       <Send size={20} />
// //                   </div>
// //                   <div>
// //                     <h2 className="text-slate-800 font-black text-lg uppercase tracking-wide">P2P Transfer</h2>
// //                     <p className="text-black text-[10px] font-bold uppercase tracking-widest mt-0.5">Send funds to user</p>
// //                   </div>
// //                </div>
// //                <button onClick={onClose} className="group bg-slate-100 hover:bg-red-50 p-2 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// //                   <X size={20} className="text-slate-400 group-hover:text-red-500" />
// //                </button>
// //             </div>

// //             {/* Body */}
// //             <div className="p-5 overflow-y-auto custom-scroll flex-1 space-y-5 relative z-10 bg-white">

// //                {/* Balance Card */}
// //                <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex justify-between items-center shadow-sm transition-all hover:border-green-300">
// //                  <div>
// //                     <div className="text-[10px] text-green-700 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
// //                        <Wallet size={12} /> Available Balance
// //                     </div>
// //                    <div className="text-2xl font-black text-slate-800 font-mono">
// //   {senderBalance !== null ? `$${(Math.floor(Number(senderBalance) * 100) / 100).toFixed(2)}` : "..."}
// // </div>
// //                  </div>
// //                </div>

// //                {/* Inputs */}
// //                <div className="space-y-4 mt-2">
                 
// //                  {/* Recipient User ID (Logic for Promo/Normal) */}
// //                  <div>
// //                    <label className="block text-[10px] font-bold text-black mb-1.5 ml-1 uppercase tracking-wider">Recipient User ID</label>
// //                    <div className="relative group">
// //                      {isPromoUser ? (
// //                         <div className="w-full bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-3 py-3.5 font-bold flex items-center justify-center gap-2 shadow-sm text-sm">
// //                           <ShieldCheck size={18} /> System will Auto-Pick a Recipient
// //                         </div>
// //                      ) : (
// //                        <>
// //                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                            <User className="h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
// //                          </div>
// //                          <input 
// //                            type="number" 
// //                            placeholder="Enter User ID" 
// //                            value={userId} 
// //                            onChange={e => {
// //                              setUserId(e.target.value);
// //                              if(e.target.value.length >= 6) fetchUserName(e.target.value);
// //                            }} 
// //                            onBlur={() => fetchUserName()}
// //                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-11 text-slate-800 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all font-bold tracking-wider shadow-inner placeholder-slate-400"
// //                          />
// //                        </>
// //                      )}
// //                    </div>
// //                  </div>

// //                  {/* Recipient Name (Auto-fetched for Normal Only) */}
// //                  {!isPromoUser && userName && (
// //                     <div className={`p-3 rounded-xl border flex items-center gap-2 shadow-sm ${userName === 'User not found' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
// //                         {userName === 'User not found' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
// //                         <span className="text-xs font-black uppercase tracking-widest">
// //                             {userName === 'User not found' ? 'Invalid User ID' : `Verified: ${userName}`}
// //                         </span>
// //                     </div>
// //                  )}

// //                  {/* Amount */}
// //                  <div>
// //                    <label className="block text-[10px] font-bold text-black mb-1.5 ml-1 uppercase tracking-wider">Amount ($)</label>
// //                    <div className="relative group">
// //                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                        <span className="text-slate-400 group-focus-within:text-green-600 font-black text-lg">$</span>
// //                      </div>
// //                      <input 
// //                        type="number" 
// //                        placeholder={isPromoUser ? "10 - 1000" : "0.00"} 
// //                        value={amount} 
// //                        onChange={e => setAmount(e.target.value)}
// //                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pl-11 text-slate-800 text-sm md:text-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all font-black shadow-inner placeholder-slate-400"
// //                      />
// //                      {!isPromoUser && (
// //                        <button 
// //                            onClick={() => setAmount(senderBalance)}
// //                            disabled={!senderBalance}
// //                            className="absolute right-3 top-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors border border-slate-200 disabled:opacity-50"
// //                        >MAX</button>
// //                      )}
// //                    </div>
// //                  </div>

// //                  {/* Transaction Password */}
// //                  <div>
// //                    <label className="block text-[10px] font-bold text-black mb-1.5 ml-1 uppercase tracking-wider">Transaction Password</label>
// //                    <div className="relative group">
// //                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                        <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
// //                      </div>
// //                      <input 
// //                        type="password" 
// //                        placeholder="Enter Security Password" 
// //                        value={transactionPassword} 
// //                        autoComplete="new-password"
// //                        onChange={e => setTransactionPassword(e.target.value)}
// //                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-11 text-slate-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all font-mono tracking-widest shadow-inner placeholder-slate-400"
// //                      />
// //                    </div>
// //                  </div>

// //                </div>
// //             </div>

// //             {/* Footer */}
// //             <div className="p-5 border-t border-slate-200 bg-slate-50 flex gap-3 relative z-10 shrink-0">
// //                <button 
// //                   onClick={onClose} 
// //                   className="flex-1 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors border border-slate-200 shadow-sm active:scale-95"
// //                >
// //                  Cancel
// //                </button>
// //                <button 
// //                  onClick={handleTransfer} 
// //                  disabled={loading}
// //                  className={`flex-1 py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(34,197,94,0.4)] transition-all flex justify-center items-center gap-2 ${loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 active:scale-95'}`}
// //                >
// //                  {loading ? "PROCESSING..." : <>TRANSFER NOW <ArrowRightLeft size={14} strokeWidth={3} /></>}
// //                </button>
// //             </div>

// //           </div>
// //         </div>
// //       )}

// //       <SuccessModal 
// //         isOpen={successOpen} 
// //         onClose={handleSuccessClose} 
// //         type="transfer" 
// //         userId={userId}
// //         userName={userName} 
// //         amount={amount} 
// //         zIndex={10000}
// //       />

// //       <MessageModal
// //         isOpen={messageModal.open}
// //         onClose={() => setMessageModal({ ...messageModal, open: false })}
// //         title={messageModal.title}
// //         message={messageModal.message}
// //         type={messageModal.type}
// //         zIndex={11000}
// //       />
// //     </>
// //   );
// // };

// // export default WalletTransferModal;



// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import SuccessModal from "./SuccessModal";
// import MessageModal from "./MessageModal";
// import {
//   Send,
//   User,
//   Lock,
//   Wallet,
//   ArrowRightLeft,
//   X,
//   XCircle,
//   CheckCircle2,
//   ShieldCheck,
//   Sparkles,
//   ArrowRight,
//   LoaderCircle,
// } from "lucide-react";

// const WalletTransferModal = ({ onClose }) => {
//   const [userId, setUserId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [amount, setAmount] = useState("");
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [senderBalance, setSenderBalance] = useState(null);
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { user: loggedInUser, token } = useAuth();

//   const [messageModal, setMessageModal] = useState({
//     open: false,
//     title: "",
//     message: "",
//     type: "info",
//   });

//   const isLeaderUser = loggedInUser?.role === "leader";
//   const isPromoUser = loggedInUser?.role === "promo";

//   const showMessage = (title, message, type = "error") => {
//     setMessageModal({ open: true, title, message, type });
//   };

//   // Fetch sender wallet balance
//   useEffect(() => {
//     if (!loggedInUser?.userId || !token) return;

//     const fetchSenderBalance = async () => {
//       try {
//         const res = await api.get(
//           `/user/${loggedInUser.userId}?t=${new Date().getTime()}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setSenderBalance(res.data.user.walletBalance || 0);
//       } catch (err) {
//         setSenderBalance(0);
//         console.error(err);
//       }
//     };

//     fetchSenderBalance();
//   }, [loggedInUser?.userId, token]);

//   // Fetch recipient name
//   const fetchUserName = async (idToFetch) => {
//     if (isPromoUser) return;

//     const trimmedId = (idToFetch || userId).trim();

//     if (!trimmedId) {
//       setUserName("");
//       return;
//     }

//     try {
//       const res = await api.get(
//         `/user/${trimmedId}?t=${new Date().getTime()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setUserName(res.data.user?.name || "User not found");
//     } catch {
//       setUserName("User not found");
//     }
//   };

//   // Handle transfer
//   const handleTransfer = async () => {
//     const amt = Number(amount);

//     if (!transactionPassword) {
//       return showMessage(
//         "Password Required",
//         "Enter transaction password.",
//         "error"
//       );
//     }

//     if (isPromoUser) {
//       if (amt < 10 || amt > 1000) {
//         return showMessage(
//           "Invalid Amount",
//           "Promo transfer amount must be between $10 and $1000.",
//           "error"
//         );
//       }
//     } else {
//       const trimmedId = userId.trim();

//       if (
//         !trimmedId ||
//         amt <= 0 ||
//         !userName ||
//         userName === "User not found"
//       ) {
//         return showMessage(
//           "Invalid Details",
//           "Provide a valid recipient and amount.",
//           "error"
//         );
//       }

//       if (trimmedId === String(loggedInUser.userId)) {
//         return showMessage(
//           "Invalid Recipient",
//           "You cannot transfer to yourself.",
//           "error"
//         );
//       }

//       if (amt > senderBalance) {
//         return showMessage(
//           "Insufficient Balance",
//           `Available balance: $${(
//             Math.floor(Number(senderBalance) * 100) / 100
//           ).toFixed(2)}`,
//           "error"
//         );
//       }
//     }

//     setLoading(true);

//     try {
//       let endpoint = "/wallet/transfer";

//       let payload = {
//         fromUserId: loggedInUser.userId,
//         toUserId: userId.trim(),
//         amount: amt,
//         transactionPassword,
//       };

//       if (isPromoUser) {
//         endpoint = "/wallet/promo-transfer";
//         payload = { amount: amt, transactionPassword };
//       } else if (isLeaderUser) {
//         endpoint = "/wallet/leader-transfer";
//       }

//       const res = await api.post(endpoint, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (isPromoUser) {
//         setUserId(res.data.generatedId);
//         setUserName(res.data.name);
//       }

//       setSuccessOpen(true);
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message ||
//         "Transfer failed due to a server error.";

//       showMessage("Transfer Failed", errorMsg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuccessClose = () => {
//     setSuccessOpen(false);
//     setUserId("");
//     setUserName("");
//     setAmount("");
//     setTransactionPassword("");
//     onClose();
//   };

//   const formattedBalance =
//     senderBalance !== null
//       ? `$${(
//           Math.floor(Number(senderBalance) * 100) / 100
//         ).toFixed(2)}`
//       : "...";

//   return (
//     <>
//       {!successOpen && (
//         <div className="hp-transfer-overlay">
//           <style>{`
//             .hp-transfer-overlay {
//               --hp-green: #08783f;
//               --hp-dark: #07552e;
//               --hp-gold: #e3bd50;
//               position: fixed;
//               inset: 0;
//               z-index: 1000;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               padding: 14px;
//               overflow-y: auto;
//               background: rgba(5, 25, 15, .68);
//               backdrop-filter: blur(5px);
//               font-family: Inter, Arial, sans-serif;
//               animation: hpTransferFade .2s ease-out;
//             }

//             .hp-transfer-overlay * {
//               box-sizing: border-box;
//             }

//             .hp-transfer-modal {
//               position: relative;
//               display: flex;
//               flex-direction: column;
//               width: 100%;
//               max-width: 430px;
//               max-height: 92vh;
//               overflow: hidden;
//               border: 1px solid #dce9dc;
//               border-radius: 19px;
//               background: white;
//               box-shadow: 0 22px 65px rgba(0,0,0,.25);
//               animation: hpTransferPop .25s ease-out;
//             }

//             .hp-transfer-header {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 12px;
//               padding: 13px 16px;
//               border-bottom: 3px solid var(--hp-gold);
//               background: linear-gradient(110deg, #07552e, #087b43);
//               flex-shrink: 0;
//             }

//             .hp-transfer-brand {
//               display: flex;
//               align-items: center;
//               gap: 10px;
//               min-width: 0;
//             }

//             .hp-transfer-brand-icon {
//               display: grid;
//               place-items: center;
//               width: 39px;
//               height: 39px;
//               flex-shrink: 0;
//               border: 1px solid #ffffff40;
//               border-radius: 11px;
//               background: #ffffff15;
//               color: #ffe18a;
//             }

//             .hp-transfer-heading {
//               margin: 0;
//               color: white;
//               font-size: 14px;
//               font-weight: 950;
//               letter-spacing: .6px;
//               text-transform: uppercase;
//             }

//             .hp-transfer-subheading {
//               margin-top: 3px;
//               color: #d2ebd8;
//               font-size: 9px;
//               font-weight: 750;
//               letter-spacing: .8px;
//               text-transform: uppercase;
//             }

//             .hp-transfer-close {
//               display: grid;
//               place-items: center;
//               width: 31px;
//               height: 31px;
//               flex-shrink: 0;
//               border: 1px solid #ffffff35;
//               border-radius: 9px;
//               background: #ffffff12;
//               color: white;
//               cursor: pointer;
//               transition: .2s;
//             }

//             .hp-transfer-close:hover {
//               background: #ffffff28;
//               transform: rotate(90deg);
//             }

//             .hp-transfer-body {
//               padding: 16px;
//               overflow-y: auto;
//               background: #fff;
//               scrollbar-width: thin;
//               scrollbar-color: #c6d9c8 transparent;
//             }

//             .hp-transfer-body::-webkit-scrollbar {
//               width: 4px;
//             }

//             .hp-transfer-body::-webkit-scrollbar-thumb {
//               border-radius: 10px;
//               background: #c6d9c8;
//             }

//             .hp-transfer-balance {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 12px;
//               padding: 14px;
//               border: 1px solid #cfe6d0;
//               border-radius: 13px;
//               background: linear-gradient(110deg, #eff9ed, #f8fbf4);
//             }

//             .hp-transfer-balance-label {
//               display: flex;
//               align-items: center;
//               gap: 6px;
//               color: #47805a;
//               font-size: 9px;
//               font-weight: 900;
//               letter-spacing: .8px;
//               text-transform: uppercase;
//             }

//             .hp-transfer-balance-value {
//               margin-top: 5px;
//               color: #07552e;
//               font-family: monospace;
//               font-size: clamp(23px, 6vw, 29px);
//               font-weight: 950;
//               letter-spacing: -.8px;
//             }

//             .hp-transfer-balance-icon {
//               display: grid;
//               place-items: center;
//               width: 42px;
//               height: 42px;
//               flex-shrink: 0;
//               border: 1px solid #d3e8d0;
//               border-radius: 12px;
//               background: white;
//               color: var(--hp-green);
//             }

//             .hp-transfer-section-label {
//               margin: 19px 0 12px;
//               color: #244a31;
//               font-size: 10px;
//               font-weight: 950;
//               letter-spacing: 1px;
//               text-transform: uppercase;
//             }

//             .hp-transfer-field {
//               margin-bottom: 14px;
//             }

//             .hp-transfer-label {
//               display: block;
//               margin: 0 0 6px 2px;
//               color: #526b59;
//               font-size: 9px;
//               font-weight: 900;
//               letter-spacing: .7px;
//               text-transform: uppercase;
//             }

//             .hp-transfer-input-wrap {
//               position: relative;
//               display: flex;
//               align-items: center;
//             }

//             .hp-transfer-input-icon {
//               position: absolute;
//               left: 12px;
//               display: flex;
//               align-items: center;
//               color: #8b9d8f;
//               pointer-events: none;
//               transition: .2s;
//             }

//             .hp-transfer-input {
//               width: 100%;
//               height: 44px;
//               padding: 0 13px 0 39px;
//               border: 1px solid #dce8dc;
//               border-radius: 10px;
//               outline: none;
//               background: #fff;
//               color: #21482f;
//               font-size: 12px;
//               font-weight: 750;
//               transition: .2s;
//             }

//             .hp-transfer-input::placeholder {
//               color: #a1afa3;
//               font-weight: 550;
//             }

//             .hp-transfer-input:focus {
//               border-color: #0b8748;
//               box-shadow: 0 0 0 3px #08783f12;
//             }

//             .hp-transfer-input-wrap:focus-within .hp-transfer-input-icon {
//               color: var(--hp-green);
//             }

//             .hp-transfer-input.amount {
//               padding-right: 65px;
//               font-size: 15px;
//               font-weight: 950;
//             }

//             .hp-transfer-max {
//               position: absolute;
//               right: 7px;
//               padding: 6px 9px;
//               border: 1px solid #d8e8d7;
//               border-radius: 7px;
//               background: #edf7ec;
//               color: var(--hp-green);
//               font-size: 9px;
//               font-weight: 950;
//               cursor: pointer;
//               transition: .2s;
//             }

//             .hp-transfer-max:hover:not(:disabled) {
//               background: #dcefd9;
//             }

//             .hp-transfer-max:disabled {
//               opacity: .45;
//               cursor: not-allowed;
//             }

//             .hp-transfer-promo-note {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 8px;
//               min-height: 44px;
//               padding: 10px;
//               border: 1px solid #ead9a6;
//               border-radius: 10px;
//               background: #fff9e9;
//               color: #936e1d;
//               font-size: 10px;
//               font-weight: 850;
//               text-align: center;
//             }

//             .hp-transfer-promo-note svg {
//               flex-shrink: 0;
//             }

//             .hp-transfer-verified {
//               display: flex;
//               align-items: center;
//               gap: 8px;
//               margin-top: -6px;
//               margin-bottom: 13px;
//               padding: 10px 11px;
//               border: 1px solid #cfe7d1;
//               border-radius: 9px;
//               background: #eff9ef;
//               color: #08783f;
//               font-size: 10px;
//               font-weight: 900;
//               overflow-wrap: anywhere;
//             }

//             .hp-transfer-verified.invalid {
//               border-color: #f0cece;
//               background: #fff1f1;
//               color: #c33d3d;
//             }

//             .hp-transfer-verified svg {
//               flex-shrink: 0;
//             }

//             .hp-transfer-footer {
//               display: flex;
//               gap: 9px;
//               padding: 13px 16px;
//               border-top: 1px solid #e5eee4;
//               background: #f8fbf7;
//               flex-shrink: 0;
//             }

//             .hp-transfer-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 7px;
//               flex: 1;
//               min-width: 0;
//               min-height: 43px;
//               padding: 10px 12px;
//               border-radius: 10px;
//               font-size: 10px;
//               font-weight: 950;
//               letter-spacing: .7px;
//               text-transform: uppercase;
//               cursor: pointer;
//               transition: .2s;
//             }

//             .hp-transfer-cancel {
//               border: 1px solid #dce7dc;
//               background: white;
//               color: #637568;
//             }

//             .hp-transfer-cancel:hover {
//               border-color: #c7d7c7;
//               background: #f0f5ef;
//             }

//             .hp-transfer-submit {
//               border: 1px solid #d7b84e;
//               background: linear-gradient(105deg, #087b43, #07552e);
//               color: white;
//               box-shadow: 0 4px 12px #08783f22;
//             }

//             .hp-transfer-submit:hover:not(:disabled) {
//               transform: translateY(-1px);
//               box-shadow: 0 6px 16px #08783f35;
//             }

//             .hp-transfer-submit:disabled {
//               border-color: #dce5dc;
//               background: #e8eee8;
//               color: #92a095;
//               box-shadow: none;
//               cursor: not-allowed;
//             }

//             @keyframes hpTransferFade {
//               from { opacity: 0; }
//               to { opacity: 1; }
//             }

//             @keyframes hpTransferPop {
//               from {
//                 opacity: 0;
//                 transform: translateY(12px) scale(.97);
//               }
//               to {
//                 opacity: 1;
//                 transform: translateY(0) scale(1);
//               }
//             }

//             @media (max-width: 420px) {
//               .hp-transfer-overlay {
//                 padding: 9px;
//               }

//               .hp-transfer-modal {
//                 max-height: 94vh;
//                 border-radius: 15px;
//               }

//               .hp-transfer-header {
//                 padding: 11px 12px;
//               }

//               .hp-transfer-body {
//                 padding: 13px;
//               }

//               .hp-transfer-footer {
//                 padding: 11px 12px;
//               }

//               .hp-transfer-btn {
//                 font-size: 9px;
//                 padding: 9px 7px;
//               }
//             }

//             @media (prefers-reduced-motion: reduce) {
//               .hp-transfer-overlay,
//               .hp-transfer-modal {
//                 animation: none;
//               }
//             }
//           `}</style>

//           <div className="hp-transfer-modal">
//             {/* Header */}
//             <div className="hp-transfer-header">
//               <div className="hp-transfer-brand">
//                 <div className="hp-transfer-brand-icon">
//                   <Send size={19} />
//                 </div>

//                 <div>
//                   <h2 className="hp-transfer-heading">
//                     P2P Transfer
//                   </h2>
//                   <div className="hp-transfer-subheading">
//                     Secure wallet transfer
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="hp-transfer-close"
//                 aria-label="Close transfer modal"
//               >
//                 <X size={17} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="hp-transfer-body">
//               {/* Balance */}
//               <div className="hp-transfer-balance">
//                 <div>
//                   <div className="hp-transfer-balance-label">
//                     <Wallet size={13} />
//                     Available Balance
//                   </div>

//                   <div className="hp-transfer-balance-value">
//                     {formattedBalance}
//                   </div>
//                 </div>

//                 <div className="hp-transfer-balance-icon">
//                   <ShieldCheck size={23} />
//                 </div>
//               </div>

//               <div className="hp-transfer-section-label">
//                 Transfer Details
//               </div>

//               {/* Recipient */}
//               <div className="hp-transfer-field">
//                 <label className="hp-transfer-label">
//                   Recipient User ID
//                 </label>

//                 {isPromoUser ? (
//                   <div className="hp-transfer-promo-note">
//                     <Sparkles size={17} />
//                     System will automatically select a recipient
//                   </div>
//                 ) : (
//                   <div className="hp-transfer-input-wrap">
//                     <span className="hp-transfer-input-icon">
//                       <User size={17} />
//                     </span>

//                     <input
//                       type="number"
//                       placeholder="Enter recipient User ID"
//                       value={userId}
//                       onChange={(e) => {
//                         setUserId(e.target.value);

//                         if (e.target.value.length >= 6) {
//                           fetchUserName(e.target.value);
//                         } else {
//                           setUserName("");
//                         }
//                       }}
//                       onBlur={() => fetchUserName()}
//                       className="hp-transfer-input"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Recipient Verification */}
//               {!isPromoUser && userName && (
//                 <div
//                   className={`hp-transfer-verified ${
//                     userName === "User not found" ? "invalid" : ""
//                   }`}
//                 >
//                   {userName === "User not found" ? (
//                     <XCircle size={16} />
//                   ) : (
//                     <CheckCircle2 size={16} />
//                   )}

//                   <span>
//                     {userName === "User not found"
//                       ? "Invalid User ID"
//                       : `Verified: ${userName}`}
//                   </span>
//                 </div>
//               )}

//               {/* Amount */}
//               <div className="hp-transfer-field">
//                 <label className="hp-transfer-label">
//                   Transfer Amount (USD)
//                 </label>

//                 <div className="hp-transfer-input-wrap">
//                   <span className="hp-transfer-input-icon">
//                     <Wallet size={17} />
//                   </span>

//                   <input
//                     type="number"
//                     min={isPromoUser ? "10" : "0.01"}
//                     max={isPromoUser ? "1000" : undefined}
//                     step="0.01"
//                     placeholder={isPromoUser ? "10 - 1000" : "Enter amount"}
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="hp-transfer-input amount"
//                   />

//                   {!isPromoUser && (
//                     <button
//                       type="button"
//                       onClick={() => setAmount(senderBalance)}
//                       disabled={!senderBalance}
//                       className="hp-transfer-max"
//                     >
//                       MAX
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="hp-transfer-field" style={{ marginBottom: 2 }}>
//                 <label className="hp-transfer-label">
//                   Transaction Password
//                 </label>

//                 <div className="hp-transfer-input-wrap">
//                   <span className="hp-transfer-input-icon">
//                     <Lock size={17} />
//                   </span>

//                   <input
//                     type="password"
//                     placeholder="Enter security password"
//                     value={transactionPassword}
//                     autoComplete="new-password"
//                     onChange={(e) =>
//                       setTransactionPassword(e.target.value)
//                     }
//                     className="hp-transfer-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="hp-transfer-footer">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="hp-transfer-btn hp-transfer-cancel"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={handleTransfer}
//                 disabled={loading}
//                 className="hp-transfer-btn hp-transfer-submit"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={15} className="animate-spin" />
//                     Processing
//                   </>
//                 ) : (
//                   <>
//                     Transfer Now
//                     <ArrowRight size={15} />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       <SuccessModal
//         isOpen={successOpen}
//         onClose={handleSuccessClose}
//         type="transfer"
//         userId={userId}
//         userName={userName}
//         amount={amount}
//         zIndex={10000}
//       />

//       {/* Message Modal */}
//       <MessageModal
//         isOpen={messageModal.open}
//         onClose={() =>
//           setMessageModal({ ...messageModal, open: false })
//         }
//         title={messageModal.title}
//         message={messageModal.message}
//         type={messageModal.type}
//         zIndex={11000}
//       />
//     </>
//   );
// };

// export default WalletTransferModal;




import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "./SuccessModal";
import MessageModal from "./MessageModal";
import {
  Send,
  User,
  Lock,
  Wallet,
  ArrowRightLeft,
  X,
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

const WalletTransferModal = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [senderBalance, setSenderBalance] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user: loggedInUser, token } = useAuth();

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });

  const isLeaderUser = String(loggedInUser?.role || "").toLowerCase() === "leader";
  const isPromoUser = String(loggedInUser?.role || "").toLowerCase() === "promo";
  const LEADER_MINIMUM_RESERVE = 30;

  // Leaders can transfer only the amount above their mandatory $30 reserve.
  const transferableBalance = senderBalance === null
    ? 0
    : Math.max(0, Number(senderBalance || 0) - (isLeaderUser ? LEADER_MINIMUM_RESERVE : 0));

  const showMessage = (title, message, type = "error") => {
    setMessageModal({ open: true, title, message, type });
  };

  // Fetch sender wallet balance
  useEffect(() => {
    if (!loggedInUser?.userId || !token) return;

    const fetchSenderBalance = async () => {
      try {
        const res = await api.get(
          `/user/${loggedInUser.userId}?t=${new Date().getTime()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSenderBalance(res.data.user.walletBalance || 0);
      } catch (err) {
        setSenderBalance(0);
        console.error(err);
      }
    };

    fetchSenderBalance();
  }, [loggedInUser?.userId, token]);

  // Fetch recipient name
  const fetchUserName = async (idToFetch) => {
    if (isPromoUser) return;

    const trimmedId = (idToFetch || userId).trim();

    if (!trimmedId) {
      setUserName("");
      return;
    }

    try {
      const res = await api.get(
        `/user/${trimmedId}?t=${new Date().getTime()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserName(res.data.user?.name || "User not found");
    } catch {
      setUserName("User not found");
    }
  };

  // Handle transfer
  const handleTransfer = async () => {
    const amt = Number(amount);

    if (!isPromoUser && (!Number.isFinite(amt) || amt < 10 || !Number.isInteger(amt))) {
      return showMessage(
        "Invalid Amount",
        "Enter a whole-number amount of at least $10.",
        "error"
      );
    }

    if (isLeaderUser && amt > transferableBalance) {
      return showMessage(
        "Minimum Balance Required",
        `A leader must keep at least $30 in the wallet. You can transfer up to $${transferableBalance.toFixed(2)}.`,
        "error"
      );
    }

    if (!transactionPassword) {
      return showMessage(
        "Password Required",
        "Enter transaction password.",
        "error"
      );
    }

    if (isPromoUser) {
      if (amt < 10 || amt > 1000) {
        return showMessage(
          "Invalid Amount",
          "Promo transfer amount must be between $10 and $1000.",
          "error"
        );
      }
    } else {
      const trimmedId = userId.trim();

      if (
        !trimmedId ||
        !Number.isFinite(amt) ||
        amt < 10 ||
        !Number.isInteger(amt) ||
        !userName ||
        userName === "User not found"
      ) {
        return showMessage(
          "Invalid Details",
          "Enter a valid recipient and a whole-number amount of at least $10.",
          "error"
        );
      }

      if (trimmedId === String(loggedInUser.userId)) {
        return showMessage(
          "Invalid Recipient",
          "You cannot transfer to yourself.",
          "error"
        );
      }

      if (amt > transferableBalance) {
        const message = isLeaderUser
          ? `You must keep at least $30 in your wallet. Maximum transferable amount: $${transferableBalance.toFixed(2)}.`
          : `Available balance: $${Number(senderBalance || 0).toFixed(2)}`;

        return showMessage("Insufficient Transferable Balance", message, "error");
      }
    }

    setLoading(true);

    try {
      let endpoint = "/wallet/transfer";

      let payload = {
        fromUserId: loggedInUser.userId,
        toUserId: userId.trim(),
        amount: amt,
        transactionPassword,
      };

      if (isPromoUser) {
        endpoint = "/wallet/promo-transfer";
        payload = { amount: amt, transactionPassword };
      } else if (isLeaderUser) {
        endpoint = "/wallet/leader-transfer";
      }

      const res = await api.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isPromoUser) {
        setUserId(res.data.generatedId);
        setUserName(res.data.name);
      }

      setSuccessOpen(true);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Transfer failed due to a server error.";

      showMessage("Transfer Failed", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setUserId("");
    setUserName("");
    setAmount("");
    setTransactionPassword("");
    onClose();
  };

  const formattedBalance =
    senderBalance !== null
      ? `$${(
          Math.floor(Number(senderBalance) * 100) / 100
        ).toFixed(2)}`
      : "...";

  return (
    <>
      {!successOpen && (
        <div className="hp-transfer-overlay">
          <style>{`
            .hp-transfer-overlay {
              --hp-green: #08783f;
              --hp-dark: #07552e;
              --hp-gold: #e3bd50;
              position: fixed;
              inset: 0;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 14px;
              overflow-y: auto;
              background: rgba(5, 25, 15, .68);
              backdrop-filter: blur(5px);
              font-family: Inter, Arial, sans-serif;
              animation: hpTransferFade .2s ease-out;
            }

            .hp-transfer-overlay * {
              box-sizing: border-box;
            }

            .hp-transfer-modal {
              position: relative;
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 430px;
              max-height: 92vh;
              overflow: hidden;
              border: 1px solid #dce9dc;
              border-radius: 19px;
              background: white;
              box-shadow: 0 22px 65px rgba(0,0,0,.25);
              animation: hpTransferPop .25s ease-out;
            }

            .hp-transfer-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              padding: 13px 16px;
              border-bottom: 3px solid var(--hp-gold);
              background: linear-gradient(110deg, #07552e, #087b43);
              flex-shrink: 0;
            }

            .hp-transfer-brand {
              display: flex;
              align-items: center;
              gap: 10px;
              min-width: 0;
            }

            .hp-transfer-brand-icon {
              display: grid;
              place-items: center;
              width: 39px;
              height: 39px;
              flex-shrink: 0;
              border: 1px solid #ffffff40;
              border-radius: 11px;
              background: #ffffff15;
              color: #ffe18a;
            }

            .hp-transfer-heading {
              margin: 0;
              color: white;
              font-size: 14px;
              font-weight: 950;
              letter-spacing: .6px;
              text-transform: uppercase;
            }

            .hp-transfer-subheading {
              margin-top: 3px;
              color: #d2ebd8;
              font-size: 9px;
              font-weight: 750;
              letter-spacing: .8px;
              text-transform: uppercase;
            }

            .hp-transfer-close {
              display: grid;
              place-items: center;
              width: 31px;
              height: 31px;
              flex-shrink: 0;
              border: 1px solid #ffffff35;
              border-radius: 9px;
              background: #ffffff12;
              color: white;
              cursor: pointer;
              transition: .2s;
            }

            .hp-transfer-close:hover {
              background: #ffffff28;
              transform: rotate(90deg);
            }

            .hp-transfer-body {
              padding: 16px;
              overflow-y: auto;
              background: #fff;
              scrollbar-width: thin;
              scrollbar-color: #c6d9c8 transparent;
            }

            .hp-transfer-body::-webkit-scrollbar {
              width: 4px;
            }

            .hp-transfer-body::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: #c6d9c8;
            }

            .hp-transfer-balance {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              padding: 14px;
              border: 1px solid #cfe6d0;
              border-radius: 13px;
              background: linear-gradient(110deg, #eff9ed, #f8fbf4);
            }

            .hp-transfer-balance-label {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #47805a;
              font-size: 9px;
              font-weight: 900;
              letter-spacing: .8px;
              text-transform: uppercase;
            }

            .hp-transfer-balance-value {
              margin-top: 5px;
              color: #07552e;
              font-family: monospace;
              font-size: clamp(23px, 6vw, 29px);
              font-weight: 950;
              letter-spacing: -.8px;
            }

            .hp-transfer-balance-icon {
              display: grid;
              place-items: center;
              width: 42px;
              height: 42px;
              flex-shrink: 0;
              border: 1px solid #d3e8d0;
              border-radius: 12px;
              background: white;
              color: var(--hp-green);
            }

            .hp-transfer-section-label {
              margin: 19px 0 12px;
              color: #244a31;
              font-size: 10px;
              font-weight: 950;
              letter-spacing: 1px;
              text-transform: uppercase;
            }

            .hp-transfer-field {
              margin-bottom: 14px;
            }

            .hp-transfer-label {
              display: block;
              margin: 0 0 6px 2px;
              color: #526b59;
              font-size: 9px;
              font-weight: 900;
              letter-spacing: .7px;
              text-transform: uppercase;
            }

            .hp-transfer-input-wrap {
              position: relative;
              display: flex;
              align-items: center;
            }

            .hp-transfer-input-icon {
              position: absolute;
              left: 12px;
              display: flex;
              align-items: center;
              color: #8b9d8f;
              pointer-events: none;
              transition: .2s;
            }

            .hp-transfer-input {
              width: 100%;
              height: 44px;
              padding: 0 13px 0 39px;
              border: 1px solid #dce8dc;
              border-radius: 10px;
              outline: none;
              background: #fff;
              color: #21482f;
              font-size: 12px;
              font-weight: 750;
              transition: .2s;
            }

            .hp-transfer-input::placeholder {
              color: #a1afa3;
              font-weight: 550;
            }

            .hp-transfer-input:focus {
              border-color: #0b8748;
              box-shadow: 0 0 0 3px #08783f12;
            }

            .hp-transfer-input-wrap:focus-within .hp-transfer-input-icon {
              color: var(--hp-green);
            }

            .hp-transfer-input.amount {
              padding-right: 65px;
              font-size: 15px;
              font-weight: 950;
            }

            .hp-transfer-max {
              position: absolute;
              right: 7px;
              padding: 6px 9px;
              border: 1px solid #d8e8d7;
              border-radius: 7px;
              background: #edf7ec;
              color: var(--hp-green);
              font-size: 9px;
              font-weight: 950;
              cursor: pointer;
              transition: .2s;
            }

            .hp-transfer-max:hover:not(:disabled) {
              background: #dcefd9;
            }

            .hp-transfer-max:disabled {
              opacity: .45;
              cursor: not-allowed;
            }

            .hp-transfer-promo-note {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              min-height: 44px;
              padding: 10px;
              border: 1px solid #ead9a6;
              border-radius: 10px;
              background: #fff9e9;
              color: #936e1d;
              font-size: 10px;
              font-weight: 850;
              text-align: center;
            }

            .hp-transfer-promo-note svg {
              flex-shrink: 0;
            }

            .hp-transfer-verified {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-top: -6px;
              margin-bottom: 13px;
              padding: 10px 11px;
              border: 1px solid #cfe7d1;
              border-radius: 9px;
              background: #eff9ef;
              color: #08783f;
              font-size: 10px;
              font-weight: 900;
              overflow-wrap: anywhere;
            }

            .hp-transfer-verified.invalid {
              border-color: #f0cece;
              background: #fff1f1;
              color: #c33d3d;
            }

            .hp-transfer-verified svg {
              flex-shrink: 0;
            }

            .hp-transfer-footer {
              display: flex;
              gap: 9px;
              padding: 13px 16px;
              border-top: 1px solid #e5eee4;
              background: #f8fbf7;
              flex-shrink: 0;
            }

            .hp-transfer-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 7px;
              flex: 1;
              min-width: 0;
              min-height: 43px;
              padding: 10px 12px;
              border-radius: 10px;
              font-size: 10px;
              font-weight: 950;
              letter-spacing: .7px;
              text-transform: uppercase;
              cursor: pointer;
              transition: .2s;
            }

            .hp-transfer-cancel {
              border: 1px solid #dce7dc;
              background: white;
              color: #637568;
            }

            .hp-transfer-cancel:hover {
              border-color: #c7d7c7;
              background: #f0f5ef;
            }

            .hp-transfer-submit {
              border: 1px solid #d7b84e;
              background: linear-gradient(105deg, #087b43, #07552e);
              color: white;
              box-shadow: 0 4px 12px #08783f22;
            }

            .hp-transfer-submit:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 6px 16px #08783f35;
            }

            .hp-transfer-submit:disabled {
              border-color: #dce5dc;
              background: #e8eee8;
              color: #92a095;
              box-shadow: none;
              cursor: not-allowed;
            }

            @keyframes hpTransferFade {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes hpTransferPop {
              from {
                opacity: 0;
                transform: translateY(12px) scale(.97);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @media (max-width: 420px) {
              .hp-transfer-overlay {
                padding: 9px;
              }

              .hp-transfer-modal {
                max-height: 94vh;
                border-radius: 15px;
              }

              .hp-transfer-header {
                padding: 11px 12px;
              }

              .hp-transfer-body {
                padding: 13px;
              }

              .hp-transfer-footer {
                padding: 11px 12px;
              }

              .hp-transfer-btn {
                font-size: 9px;
                padding: 9px 7px;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hp-transfer-overlay,
              .hp-transfer-modal {
                animation: none;
              }
            }
          `}</style>

          <div className="hp-transfer-modal">
            {/* Header */}
            <div className="hp-transfer-header">
              <div className="hp-transfer-brand">
                <div className="hp-transfer-brand-icon">
                  <Send size={19} />
                </div>

                <div>
                  <h2 className="hp-transfer-heading">
                    P2P Transfer
                  </h2>
                  <div className="hp-transfer-subheading">
                    wallet transfer
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="hp-transfer-close"
                aria-label="Close transfer modal"
              >
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div className="hp-transfer-body">
              {/* Balance */}
              <div className="hp-transfer-balance">
                <div>
                  <div className="hp-transfer-balance-label">
                    <Wallet size={13} />
                    Available Balance
                  </div>

                  <div className="hp-transfer-balance-value">
                    {formattedBalance}
                  </div>
                </div>

                <div className="hp-transfer-balance-icon">
                  <ShieldCheck size={23} />
                </div>
              </div>

              {isLeaderUser && (
                <div
                  style={{
                    marginTop: 10,
                    padding: "10px 12px",
                    border: "1px solid #ead9a6",
                    borderRadius: 10,
                    background: "#fff9e9",
                    color: "#805f18",
                    fontSize: 11,
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  $30 minimum wallet balance must remain after every transfer.
                  <div style={{ marginTop: 3, fontWeight: 700 }}>
                    Transferable now: ${transferableBalance.toFixed(2)}
                  </div>
                </div>
              )}

              <div className="hp-transfer-section-label">
                Transfer Details
              </div>

              {/* Recipient */}
              <div className="hp-transfer-field">
                <label className="hp-transfer-label">
                  Recipient User ID
                </label>

                {isPromoUser ? (
                  <div className="hp-transfer-promo-note">
                    <Sparkles size={17} />
                    System will automatically select a recipient
                  </div>
                ) : (
                  <div className="hp-transfer-input-wrap">
                    <span className="hp-transfer-input-icon">
                      <User size={17} />
                    </span>

                    <input
                      type="number"
                      placeholder="Enter recipient User ID"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);

                        if (e.target.value.length >= 6) {
                          fetchUserName(e.target.value);
                        } else {
                          setUserName("");
                        }
                      }}
                      onBlur={() => fetchUserName()}
                      className="hp-transfer-input"
                    />
                  </div>
                )}
              </div>

              {/* Recipient Verification */}
              {!isPromoUser && userName && (
                <div
                  className={`hp-transfer-verified ${
                    userName === "User not found" ? "invalid" : ""
                  }`}
                >
                  {userName === "User not found" ? (
                    <XCircle size={16} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}

                  <span>
                    {userName === "User not found"
                      ? "Invalid User ID"
                      : `Verified: ${userName}`}
                  </span>
                </div>
              )}

              {/* Amount */}
              <div className="hp-transfer-field">
                <label className="hp-transfer-label">
                  Transfer Amount (USD)
                </label>

                <div className="hp-transfer-input-wrap">
                  <span className="hp-transfer-input-icon">
                    <Wallet size={17} />
                  </span>

                  <input
                    type="number"
                    min="10"
                    max={isPromoUser ? "1000" : (isLeaderUser ? transferableBalance : undefined)}
                    step={isPromoUser ? "0.01" : "1"}
                    placeholder={isPromoUser ? "10 - 1000" : "Enter amount"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="hp-transfer-input amount"
                  />

                  {!isPromoUser && (
                    <button
                      type="button"
                      onClick={() => setAmount(String(transferableBalance))}
                      disabled={transferableBalance < 10}
                      className="hp-transfer-max"
                      title={isLeaderUser ? "Maximum amount after keeping $30 in your wallet" : "Use maximum available balance"}
                    >
                      MAX
                    </button>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="hp-transfer-field" style={{ marginBottom: 2 }}>
                <label className="hp-transfer-label">
                  Transaction Password
                </label>

                <div className="hp-transfer-input-wrap">
                  <span className="hp-transfer-input-icon">
                    <Lock size={17} />
                  </span>

                  <input
                    type="password"
                    placeholder="Enter security password"
                    value={transactionPassword}
                    autoComplete="new-password"
                    onChange={(e) =>
                      setTransactionPassword(e.target.value)
                    }
                    className="hp-transfer-input"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="hp-transfer-footer">
              <button
                type="button"
                onClick={onClose}
                className="hp-transfer-btn hp-transfer-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleTransfer}
                disabled={loading}
                className="hp-transfer-btn hp-transfer-submit"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    Transfer Now
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={successOpen}
        onClose={handleSuccessClose}
        type="transfer"
        userId={userId}
        userName={userName}
        amount={amount}
        zIndex={10000}
      />

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModal.open}
        onClose={() =>
          setMessageModal({ ...messageModal, open: false })
        }
        title={messageModal.title}
        message={messageModal.message}
        type={messageModal.type}
        zIndex={11000}
      />
    </>
  );
};

export default WalletTransferModal;
