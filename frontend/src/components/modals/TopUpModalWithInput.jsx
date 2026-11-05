// // import React, { useState, useEffect } from "react";
// // import api from "../../api/axios"; 
// // import SuccessModal from "./SuccessModal";
// // import MessageModal from "./MessageModal";
// // import { useAuth } from "../../context/AuthContext";
// // import { CheckCircle, ShieldCheck, Zap, X } from "lucide-react"; 

// // const PACKAGE_AMOUNT = 30;

// // const TopUpModal = ({ onClose, onTopUpSuccess }) => {
// //   const { user: loggedInUser, token, login } = useAuth();
// //   const [userId, setUserId] = useState("");
// //   const [userInfo, setUserInfo] = useState(null);
  
// //   const [walletBalance, setWalletBalance] = useState(null);
// //   const [transactionPassword, setTransactionPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
  
// //   const isPromoUser = loggedInUser?.role === "promo";
// //   const isLeaderUser = loggedInUser?.role === "leader";

// //   const [successModalOpen, setSuccessModalOpen] = useState(false);
// //   const [successData, setSuccessData] = useState({ userId: "", name: "", amount: 0 });
// //   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

// //   const showMessage = (title, message, type = "info") => setMessageModal({ open: true, title, message, type });

// //   // 1. Fetch Balance
// //   useEffect(() => {
// //     const fetchBalance = async () => {
// //       if (!loggedInUser?.userId || !token) return;
// //       try {
// //         const res = await api.get(`/user/${loggedInUser.userId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setWalletBalance(res.data.user.walletBalance || 0);
// //       } catch (err) {
// //         console.error(err);
// //         setWalletBalance(0);
// //       }
// //     };
// //     fetchBalance();
// //   }, [loggedInUser?.userId, token]);

// //   const isBought = userInfo?.packages?.some(p => p.amount === PACKAGE_AMOUNT) || false;

// //   // 2. Fetch User (Only for Non-Promo users)
// //   const fetchUser = async (idToFetch, showManualError = false) => {
// //     if (isPromoUser) return; // Promo user ko fetch karne ki zaroorat nahi
    
// //     if (!idToFetch || idToFetch.toString().trim() === "") {
// //       setUserInfo(null);
// //       return;
// //     }
// //     try {
// //       const res = await api.get(`/user/${idToFetch}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.data && res.data.user) {
// //         setUserInfo(res.data.user);
// //       } else {
// //         setUserInfo(null);
// //         if (showManualError) showMessage("Error", "❌ User details not found", "error");
// //       }
// //     } catch (err) {
// //       setUserInfo(null);
// //       if (showManualError) {
// //         const errorMsg = err.response?.data?.message || "❌ User not found";
// //         showMessage("Error", errorMsg, "error");
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     if (isPromoUser) return;
// //     const delayDebounceFn = setTimeout(() => {
// //       if (userId && userId.trim() !== "") fetchUser(userId, false);
// //       else setUserInfo(null);
// //     }, 500);
// //     return () => clearTimeout(delayDebounceFn);
// //   }, [userId, token, isPromoUser]);

// //   // 3. Handle Top Up
// //   const handleTopUp = async () => {
// //     if (!transactionPassword) return showMessage("Error", "❌ Enter transaction password.", "error");
// //     setLoading(true);

// //     try {
// //       if (isPromoUser) {
// //         // PROMO USER HIT
// //         const res = await api.post(`/user/promo-dummy-topup`, { amount: PACKAGE_AMOUNT, transactionPassword }, { headers: { Authorization: `Bearer ${token}` } });
// //         setSuccessData({ userId: res.data.generatedId, name: res.data.name, amount: PACKAGE_AMOUNT });
// //         setSuccessModalOpen(true);
// //         if (onTopUpSuccess) onTopUpSuccess();
// //         setTransactionPassword("");
// //       } else {
// //         // NORMAL OR LEADER HIT
// //         if (!userInfo) { setLoading(false); return showMessage("Error", "❌ Please fetch user first.", "error"); }
// //         if (walletBalance < PACKAGE_AMOUNT) { setLoading(false); return showMessage("Error", `❌ Insufficient balance. You have $${walletBalance}`, "error"); }
// //         if (isBought) { setLoading(false); return showMessage("Active", `✅ ID is already active with $${PACKAGE_AMOUNT}.`, "warning"); }

// //         const endpoint = isLeaderUser ? `/user/leader-topup/${Number(userId)}` : `/user/topup/${Number(userId)}`;
// //         await api.put(endpoint, { amount: PACKAGE_AMOUNT, transactionPassword }, { headers: { Authorization: `Bearer ${token}` } });

// //         setSuccessData({ userId: userInfo.userId, name: userInfo.name, amount: PACKAGE_AMOUNT });
// //         setSuccessModalOpen(true);

// //         const refreshedRes = await api.get(`/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
// //         const refreshedUser = refreshedRes.data.user;

// //         if (Number(userId) === loggedInUser.userId) {
// //           login(refreshedUser, token);
// //           setWalletBalance(refreshedUser.walletBalance);
// //         } else {
// //           setUserInfo(refreshedUser);
// //         }

// //         if (onTopUpSuccess) onTopUpSuccess();
// //         setTransactionPassword("");
// //       }
// //     } catch (err) {
// //       const msg = err.response?.data?.message || "❌ Top-up failed";
// //       showMessage("Transaction Failed", msg, "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-hidden">
      
// //       <div className="bg-white w-full max-w-md flex flex-col rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative max-h-[90vh] animate-in zoom-in duration-300">
        
// //         {/* Header */}
// //         <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center z-20 shrink-0">
// //           <div className="flex items-center gap-3">
// //             <div className="bg-green-100 p-2 rounded-xl border border-green-200">
// //                <Zap size={18} className="text-green-600" />
// //             </div>
// //             <div>
// //               <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">Activate <span className="text-green-600">Node</span></h1>
// //             </div>
// //           </div>
// //           <button onClick={onClose} className="group bg-white hover:bg-red-50 p-1.5 md:p-2 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// //              <X size={18} className="text-slate-400 group-hover:text-red-500" />
// //           </button>
// //         </div>

// //         {/* Content Body */}
// //         <div className="flex-1 p-4 md:p-5 space-y-4 z-10 bg-white overflow-y-auto custom-scroll">
          
// //           <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
// //              <div>
// //                 <span className="text-black text-[9px] uppercase tracking-wider font-bold block mb-0.5">Your Balance</span>
// //                 <div className="text-base md:text-lg font-black text-slate-800 font-mono">
// //     {walletBalance !== null ? `$${(Math.floor(Number(walletBalance) * 100) / 100).toFixed(2)}` : "..."}
// //                 </div>
// //              </div>
// //              <div className="text-right">
// //                 <span className="text-black text-[9px] uppercase tracking-wider font-bold block mb-0.5">Package</span>
// //                 <div className="text-base md:text-lg font-black text-green-600 font-mono">
// //                   ${PACKAGE_AMOUNT}
// //                 </div>
// //              </div>
// //           </div>

// //           <div className="space-y-1.5">
// //             <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Target Node ID</label>
// //             <div className="flex gap-2">
// //               <div className="relative flex-1">
// //                 {isPromoUser ? (
// //                   <div className="w-full bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-3 py-3 font-bold flex items-center justify-center gap-2 shadow-sm text-sm">
// //                     <ShieldCheck size={18} /> System will Auto-Pick an Inactive ID
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <input 
// //                       type="number" 
// //                       placeholder="Enter Node ID"
// //                       value={userId}
// //                       onChange={(e) => setUserId(e.target.value)}
// //                       className={`w-full bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 md:py-3 outline-none transition-all placeholder-slate-400 font-mono shadow-inner text-xs md:text-sm ${
// //                           userInfo ? 'border border-green-500 ring-2 ring-green-100' : 'border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
// //                       }`}
// //                     />
// //                     {userInfo && (
// //                       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
// //                         <CheckCircle size={18} />
// //                       </div>
// //                     )}
// //                   </>
// //                 )}
// //               </div>
              
// //               {!isPromoUser && !userInfo && (
// //                 <button onClick={() => fetchUser(userId, true)} className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-4 rounded-xl font-bold transition-all shadow-sm text-xs md:text-sm">
// //                   Check
// //                 </button>
// //               )}
// //             </div>
            
// //             {/* Fetched User Info Area */}
// //             {!isPromoUser && (
// //               <div className="mt-1 min-h-[50px]">
// //                 {userInfo ? (
// //                   <div className={`border rounded-xl p-2.5 flex justify-between items-center transition-all shadow-sm ${isBought ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
// //                     <div>
// //                       <div className="text-slate-800 font-black text-[11px] md:text-xs">{userInfo.name}</div>
// //                       <div className="text-[10px] font-mono text-black mt-0.5">ID: {userInfo.userId}</div>
// //                     </div>
// //                     <div className="text-right">
// //                       {isBought && (
// //                         <div className="text-green-600 font-black text-[10px] uppercase flex items-center gap-1">
// //                            <CheckCircle size={12}/> Active
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   userId.length > 0 && <div className="text-[10px] text-slate-400 italic px-2 pt-1">Checking ID details...</div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Footer (Payment Action) */}
// //         <div className="bg-slate-50 border-t border-slate-200 p-4 shrink-0 z-20">
// //           <div className="space-y-3">
// //              <div className="relative">
// //                 <input
// //                   type="password"
// //                   placeholder="Transaction Password"
// //                   value={transactionPassword}
// //                   onChange={(e) => setTransactionPassword(e.target.value)}
// //                   className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all placeholder-slate-400 font-mono shadow-sm text-xs md:text-sm"
// //                 />
// //              </div>
             
// //              <button 
// //                onClick={handleTopUp} 
// //                disabled={loading || isBought || (!isPromoUser && !userInfo)}
// //                className={`
// //                  w-full py-3 rounded-xl font-black text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-sm
// //                  ${loading || isBought || (!isPromoUser && !userInfo) 
// //                     ? 'bg-slate-200 text-black cursor-not-allowed border border-slate-300' 
// //                     : 'bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_15px_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.6)] hover:-translate-y-0.5'}
// //                `}
// //              >
// //                {loading ? "PROCESSING..." : (
// //                  <>
// //                    ACTIVATE NOW <span className={loading || isBought || (!isPromoUser && !userInfo) ? "text-slate-400" : "text-green-200"}>($30)</span>
// //                  </>
// //                )}
// //              </button>

// //              <button 
// //                onClick={onClose} 
// //                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shadow-sm"
// //              >
// //                 Cancel
// //              </button>
// //           </div>
// //         </div>
// //       </div>

// //     <SuccessModal
// //         isOpen={successModalOpen}
// //         onClose={() => { setSuccessModalOpen(false); onClose(); }}
// //         type="topup"
// //         userId={successData.userId}
// //         userName={successData.name} 
// //         amount={successData.amount}
// //         reward={0}
// //       />
// //       <MessageModal
// //         isOpen={messageModal.open}
// //         onClose={() => setMessageModal({ ...messageModal, open: false })}
// //         title={messageModal.title}
// //         message={messageModal.message}
// //         type={messageModal.type}
// //       />
// //     </div>
// //   );
// // };

// // export default TopUpModal;


// // // import React, { useState, useEffect } from "react";
// // // import api from "../../api/axios"; 
// // // import SuccessModal from "./SuccessModal";
// // // import MessageModal from "./MessageModal";
// // // import { useAuth } from "../../context/AuthContext";
// // // import { CheckCircle, ShieldCheck, Zap, X } from "lucide-react"; 

// // // const PACKAGE_AMOUNT = 30;

// // // const TopUpModal = ({ onClose, onTopUpSuccess }) => {
// // //   const { user: loggedInUser, token, login } = useAuth();
// // //   const [userId, setUserId] = useState("");
// // //   const [userInfo, setUserInfo] = useState(null);
  
// // //   // 🔥 DONO WALLETS KE LIYE STATE
// // //   const [walletBalance, setWalletBalance] = useState(null);
// // //   const [usdtBalance, setUsdtBalance] = useState(null); 

// // //   const [transactionPassword, setTransactionPassword] = useState("");
// // //   const [loading, setLoading] = useState(false);
  
// // //   const isPromoUser = loggedInUser?.role === "promo";
// // //   const isLeaderUser = loggedInUser?.role === "leader" || loggedInUser?.role === "superleader";

// // //   const [successModalOpen, setSuccessModalOpen] = useState(false);
// // //   const [successData, setSuccessData] = useState({ userId: "", name: "", amount: 0 });
// // //   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

// // //   const showMessage = (title, message, type = "info") => setMessageModal({ open: true, title, message, type });

// // //   // 1. Fetch Balance (🔥 Fetch Both Balances)
// // //   useEffect(() => {
// // //     const fetchBalance = async () => {
// // //       if (!loggedInUser?.userId || !token) return;
// // //       try {
// // //         const res = await api.get(`/user/${loggedInUser.userId}`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         setWalletBalance(res.data.user.walletBalance || 0);
// // //         setUsdtBalance(res.data.user.usdtBep20Balance || 0); // 🔥 NAYA USDT BEP20 FETCH
// // //       } catch (err) {
// // //         console.error(err);
// // //         setWalletBalance(0);
// // //         setUsdtBalance(0);
// // //       }
// // //     };
// // //     fetchBalance();
// // //   }, [loggedInUser?.userId, token]);

// // //   const isBought = userInfo?.packages?.some(p => p.amount === PACKAGE_AMOUNT) || false;

// // //   // 2. Fetch User (Only for Non-Promo users)
// // //   const fetchUser = async (idToFetch, showManualError = false) => {
// // //     if (isPromoUser) return; // Promo user ko fetch karne ki zaroorat nahi
    
// // //     if (!idToFetch || idToFetch.toString().trim() === "") {
// // //       setUserInfo(null);
// // //       return;
// // //     }
// // //     try {
// // //       const res = await api.get(`/user/${idToFetch}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       if (res.data && res.data.user) {
// // //         setUserInfo(res.data.user);
// // //       } else {
// // //         setUserInfo(null);
// // //         if (showManualError) showMessage("Error", "❌ User details not found", "error");
// // //       }
// // //     } catch (err) {
// // //       setUserInfo(null);
// // //       if (showManualError) {
// // //         const errorMsg = err.response?.data?.message || "❌ User not found";
// // //         showMessage("Error", errorMsg, "error");
// // //       }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (isPromoUser) return;
// // //     const delayDebounceFn = setTimeout(() => {
// // //       if (userId && userId.trim() !== "") fetchUser(userId, false);
// // //       else setUserInfo(null);
// // //     }, 500);
// // //     return () => clearTimeout(delayDebounceFn);
// // //   }, [userId, token, isPromoUser]);

// // //   // 3. Handle Top Up
// // //   const handleTopUp = async () => {
// // //     if (!transactionPassword) return showMessage("Error", "❌ Enter transaction password.", "error");
// // //     setLoading(true);

// // //     try {
// // //       if (isPromoUser) {
// // //         // PROMO USER HIT
// // //         const res = await api.post(`/user/promo-dummy-topup`, { amount: PACKAGE_AMOUNT, transactionPassword }, { headers: { Authorization: `Bearer ${token}` } });
// // //         setSuccessData({ userId: res.data.generatedId, name: res.data.name, amount: PACKAGE_AMOUNT });
// // //         setSuccessModalOpen(true);
// // //         if (onTopUpSuccess) onTopUpSuccess();
// // //         setTransactionPassword("");
// // //       } else {
// // //         // NORMAL OR LEADER HIT
// // //         if (!userInfo) { setLoading(false); return showMessage("Error", "❌ Please fetch user first.", "error"); }
// // //         if (isBought) { setLoading(false); return showMessage("Active", `✅ ID is already active with $${PACKAGE_AMOUNT}.`, "warning"); }

// // //         const endpoint = isLeaderUser ? `/user/leader-topup/${Number(userId)}` : `/user/topup/${Number(userId)}`;
// // //         await api.put(endpoint, { amount: PACKAGE_AMOUNT, transactionPassword }, { headers: { Authorization: `Bearer ${token}` } });

// // //         setSuccessData({ userId: userInfo.userId, name: userInfo.name, amount: PACKAGE_AMOUNT });
// // //         setSuccessModalOpen(true);

// // //         // 🔥 Update Both Balances After Success
// // //         const refreshedRes = await api.get(`/user/${loggedInUser.userId}`, { headers: { Authorization: `Bearer ${token}` } });
// // //         const refreshedUser = refreshedRes.data.user;

// // //         login(refreshedUser, token); // Update context
// // //         setWalletBalance(refreshedUser.walletBalance);
// // //         setUsdtBalance(refreshedUser.usdtBep20Balance);

// // //         if (Number(userId) !== loggedInUser.userId) {
// // //              const targetRes = await api.get(`/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
// // //              setUserInfo(targetRes.data.user);
// // //         }

// // //         if (onTopUpSuccess) onTopUpSuccess();
// // //         setTransactionPassword("");
// // //       }
// // //     } catch (err) {
// // //       // Backend se jo error aayega (jaise Insufficient USDT) wo yahan dikhega
// // //       const msg = err.response?.data?.message || "❌ Top-up failed";
// // //       showMessage("Transaction Failed", msg, "error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-hidden">
      
// // //       <div className="bg-white w-full max-w-md flex flex-col rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative max-h-[90vh] animate-in zoom-in duration-300">
        
// // //         {/* Header */}
// // //         <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center z-20 shrink-0">
// // //           <div className="flex items-center gap-3">
// // //             <div className="bg-green-100 p-2 rounded-xl border border-green-200">
// // //                <Zap size={18} className="text-green-600" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">Activate <span className="text-green-600">Node</span></h1>
// // //             </div>
// // //           </div>
// // //           <button onClick={onClose} className="group bg-white hover:bg-red-50 p-1.5 md:p-2 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// // //              <X size={18} className="text-slate-400 group-hover:text-red-500" />
// // //           </button>
// // //         </div>

// // //         {/* Content Body */}
// // //         <div className="flex-1 p-4 md:p-5 space-y-4 z-10 bg-white overflow-y-auto custom-scroll">
          
// // //           {/* 🔥 3-PART WALLET BOX: DONO BALANCES DIKHAYEGA */}
// // //           <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-3 shadow-sm gap-2">
// // //              <div className="flex-1">
// // //                 <span className="text-black text-[9px] uppercase tracking-wider font-bold block mb-0.5"> Wallet Balance</span>
// // //                 <div className="text-[13px] md:text-sm font-black text-purple-600 font-mono truncate">
// // //                   {walletBalance !== null ? `$${(Math.floor(Number(walletBalance) * 100) / 100).toFixed(2)}` : "..."}
// // //                 </div>
// // //              </div>
// // //              <div className="flex-1 border-l border-slate-200 pl-2">
// // //                 <span className="text-black text-[9px] uppercase tracking-wider font-bold block mb-0.5">USDT BEP20 Balance</span>
// // //                 <div className="text-[13px] md:text-sm font-black text-emerald-600 font-mono truncate">
// // //                   {usdtBalance !== null ? `$${(Math.floor(Number(usdtBalance) * 100) / 100).toFixed(2)}` : "..."}
// // //                 </div>
// // //              </div>
// // //              <div className="text-right border-l border-slate-200 pl-2">
// // //                 <span className="text-black text-[9px] uppercase tracking-wider font-bold block mb-0.5">Package</span>
// // //                 <div className="text-[13px] md:text-sm font-black text-slate-800 font-mono">
// // //                   ${PACKAGE_AMOUNT}
// // //                 </div>
// // //              </div>
// // //           </div>

// // //           <div className="space-y-1.5">
// // //             <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Target Node ID</label>
// // //             <div className="flex gap-2">
// // //               <div className="relative flex-1">
// // //                 {isPromoUser ? (
// // //                   <div className="w-full bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-3 py-3 font-bold flex items-center justify-center gap-2 shadow-sm text-sm">
// // //                     <ShieldCheck size={18} /> System will Auto-Pick an Inactive ID
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <input 
// // //                       type="number" 
// // //                       placeholder="Enter Node ID"
// // //                       value={userId}
// // //                       onChange={(e) => setUserId(e.target.value)}
// // //                       className={`w-full bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 md:py-3 outline-none transition-all placeholder-slate-400 font-mono shadow-inner text-xs md:text-sm ${
// // //                           userInfo ? 'border border-green-500 ring-2 ring-green-100' : 'border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
// // //                       }`}
// // //                     />
// // //                     {userInfo && (
// // //                       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
// // //                         <CheckCircle size={18} />
// // //                       </div>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </div>
              
// // //               {!isPromoUser && !userInfo && (
// // //                 <button onClick={() => fetchUser(userId, true)} className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-4 rounded-xl font-bold transition-all shadow-sm text-xs md:text-sm">
// // //                   Check
// // //                 </button>
// // //               )}
// // //             </div>
            
// // //             {/* Fetched User Info Area */}
// // //             {!isPromoUser && (
// // //               <div className="mt-1 min-h-[50px]">
// // //                 {userInfo ? (
// // //                   <div className={`border rounded-xl p-2.5 flex justify-between items-center transition-all shadow-sm ${isBought ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
// // //                     <div>
// // //                       <div className="text-slate-800 font-black text-[11px] md:text-xs">{userInfo.name}</div>
// // //                       <div className="text-[10px] font-mono text-black mt-0.5">ID: {userInfo.userId}</div>
// // //                     </div>
// // //                     <div className="text-right">
// // //                       {isBought && (
// // //                         <div className="text-green-600 font-black text-[10px] uppercase flex items-center gap-1">
// // //                            <CheckCircle size={12}/> Active
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   userId.length > 0 && <div className="text-[10px] text-slate-400 italic px-2 pt-1">Checking ID details...</div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Footer (Payment Action) */}
// // //         <div className="bg-slate-50 border-t border-slate-200 p-4 shrink-0 z-20">
// // //           <div className="space-y-3">
// // //              <div className="relative">
// // //                 <input
// // //                   type="password"
// // //                   placeholder="Transaction Password"
// // //                   value={transactionPassword}
// // //                   onChange={(e) => setTransactionPassword(e.target.value)}
// // //                   className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all placeholder-slate-400 font-mono shadow-sm text-xs md:text-sm"
// // //                 />
// // //              </div>
             
// // //              <button 
// // //                onClick={handleTopUp} 
// // //                disabled={loading || isBought || (!isPromoUser && !userInfo)}
// // //                className={`
// // //                  w-full py-3 rounded-xl font-black text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-sm
// // //                  ${loading || isBought || (!isPromoUser && !userInfo) 
// // //                     ? 'bg-slate-200 text-black cursor-not-allowed border border-slate-300' 
// // //                     : 'bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_15px_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.6)] hover:-translate-y-0.5'}
// // //                `}
// // //              >
// // //                {loading ? "PROCESSING..." : (
// // //                  <>
// // //                    ACTIVATE NOW <span className={loading || isBought || (!isPromoUser && !userInfo) ? "text-slate-400" : "text-green-200"}>($30)</span>
// // //                  </>
// // //                )}
// // //              </button>

// // //              <button 
// // //                onClick={onClose} 
// // //                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shadow-sm"
// // //              >
// // //                 Cancel
// // //              </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //     <SuccessModal
// // //         isOpen={successModalOpen}
// // //         onClose={() => { setSuccessModalOpen(false); onClose(); }}
// // //         type="topup"
// // //         userId={successData.userId}
// // //         userName={successData.name} 
// // //         amount={successData.amount}
// // //         reward={0}
// // //       />
// // //       <MessageModal
// // //         isOpen={messageModal.open}
// // //         onClose={() => setMessageModal({ ...messageModal, open: false })}
// // //         title={messageModal.title}
// // //         message={messageModal.message}
// // //         type={messageModal.type}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default TopUpModal;



// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";
// import SuccessModal from "./SuccessModal";
// import MessageModal from "./MessageModal";
// import { useAuth } from "../../context/AuthContext";
// import {
//   CheckCircle,
//   ShieldCheck,
//   Zap,
//   X,
//   Wallet,
//   Lock,
//   User,
//   Package,
//   Sparkles,
//   ArrowRight,
//   LoaderCircle,
//   AlertCircle,
// } from "lucide-react";

// const PACKAGE_AMOUNT = 30;

// const TopUpModal = ({ onClose, onTopUpSuccess }) => {
//   const { user: loggedInUser, token, login } = useAuth();

//   const [userId, setUserId] = useState("");
//   const [userInfo, setUserInfo] = useState(null);
//   const [walletBalance, setWalletBalance] = useState(null);
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isPromoUser = loggedInUser?.role === "promo";
//   const isLeaderUser = loggedInUser?.role === "leader";

//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [successData, setSuccessData] = useState({
//     userId: "",
//     name: "",
//     amount: 0,
//   });

//   const [messageModal, setMessageModal] = useState({
//     open: false,
//     title: "",
//     message: "",
//     type: "info",
//   });

//   const showMessage = (title, message, type = "info") => {
//     setMessageModal({ open: true, title, message, type });
//   };

//   // Fetch wallet balance
//   useEffect(() => {
//     let mounted = true;

//     const fetchBalance = async () => {
//       if (!loggedInUser?.userId || !token) return;

//       try {
//         const res = await api.get(
//           `/user/${loggedInUser.userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (mounted) {
//           setWalletBalance(res.data.user.walletBalance || 0);
//         }
//       } catch (err) {
//         console.error(err);
//         if (mounted) setWalletBalance(0);
//       }
//     };

//     fetchBalance();

//     return () => {
//       mounted = false;
//     };
//   }, [loggedInUser?.userId, token]);

//   const isBought =
//     userInfo?.packages?.some(
//       (p) => Number(p.amount) === PACKAGE_AMOUNT
//     ) || false;

//   // Fetch target user
//   const fetchUser = async (idToFetch, showManualError = false) => {
//     if (isPromoUser) return;

//     const targetId = String(idToFetch || "").trim();

//     if (!targetId) {
//       setUserInfo(null);
//       if (showManualError) {
//         showMessage("Missing User ID", "Please enter a valid Node ID.", "warning");
//       }
//       return;
//     }

//     try {
//       const res = await api.get(`/user/${targetId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data?.user) {
//         setUserInfo(res.data.user);
//       } else {
//         setUserInfo(null);

//         if (showManualError) {
//           showMessage("User Not Found", "User details could not be found.", "error");
//         }
//       }
//     } catch (err) {
//       setUserInfo(null);

//       if (showManualError) {
//         showMessage(
//           "User Not Found",
//           err.response?.data?.message || "Please check the Node ID.",
//           "error"
//         );
//       }
//     }
//   };

//   // Debounced user lookup
//   useEffect(() => {
//     if (isPromoUser) return;

//     const delay = setTimeout(() => {
//       if (userId.trim()) {
//         fetchUser(userId, false);
//       } else {
//         setUserInfo(null);
//       }
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [userId, token, isPromoUser]);

//   // Activate package
//   const handleTopUp = async () => {
//     if (loading) return;

//     if (!transactionPassword.trim()) {
//       return showMessage(
//         "Password Required",
//         "Please enter your transaction password.",
//         "warning"
//       );
//     }

//     if (!isPromoUser) {
//       if (!userInfo) {
//         return showMessage(
//           "User Required",
//           "Please enter and verify a valid User ID first.",
//           "error"
//         );
//       }

//       if (Number(walletBalance) < PACKAGE_AMOUNT) {
//         return showMessage(
//           "Insufficient Balance",
//           `You need $${PACKAGE_AMOUNT}. Available balance: $${Number(
//             walletBalance || 0
//           ).toFixed(2)}.`,
//           "error"
//         );
//       }

//       if (isBought) {
//         return showMessage(
//           "Already Activated",
//           `This ID is already active with the $${PACKAGE_AMOUNT} package.`,
//           "warning"
//         );
//       }
//     }

//     setLoading(true);

//     try {
//       if (isPromoUser) {
//         const res = await api.post(
//           `/user/promo-dummy-topup`,
//           {
//             amount: PACKAGE_AMOUNT,
//             transactionPassword,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setSuccessData({
//           userId: res.data.generatedId,
//           name: res.data.name,
//           amount: PACKAGE_AMOUNT,
//         });

//         setSuccessModalOpen(true);

//         if (onTopUpSuccess) onTopUpSuccess();

//         setTransactionPassword("");
//       } else {
//         const endpoint = isLeaderUser
//           ? `/user/leader-topup/${Number(userId)}`
//           : `/user/topup/${Number(userId)}`;

//         await api.put(
//           endpoint,
//           {
//             amount: PACKAGE_AMOUNT,
//             transactionPassword,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setSuccessData({
//           userId: userInfo.userId,
//           name: userInfo.name,
//           amount: PACKAGE_AMOUNT,
//         });

//         setSuccessModalOpen(true);

//         const refreshedRes = await api.get(`/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const refreshedUser = refreshedRes.data.user;

//         if (Number(userId) === Number(loggedInUser.userId)) {
//           login(refreshedUser, token);
//           setWalletBalance(refreshedUser.walletBalance);
//         } else {
//           setUserInfo(refreshedUser);
//         }

//         if (onTopUpSuccess) onTopUpSuccess();

//         setTransactionPassword("");
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || "Top-up failed. Please try again.";

//       showMessage("Transaction Failed", msg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const balanceText =
//     walletBalance !== null
//       ? `$${(Math.floor(Number(walletBalance) * 100) / 100).toFixed(2)}`
//       : "...";

//   const closeSuccess = () => {
//     setSuccessModalOpen(false);
//     onClose();
//   };

//   return (
//     <>
//       {!successModalOpen && (
//         <div className="hp-topup-overlay">
//           <style>{`
//             .hp-topup-overlay {
//               --hp-green: #08783f;
//               --hp-dark: #07552e;
//               --hp-gold: #e3bd50;
//               position: fixed;
//               inset: 0;
//               z-index: 1000;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               padding: 12px;
//               overflow-y: auto;
//               background: rgba(5, 25, 15, .68);
//               backdrop-filter: blur(5px);
//               font-family: Inter, Arial, sans-serif;
//               animation: hpTopFade .2s ease-out;
//             }

//             .hp-topup-overlay * {
//               box-sizing: border-box;
//             }

//             .hp-topup-modal {
//               width: 100%;
//               max-width: 420px;
//               max-height: 94vh;
//               display: flex;
//               flex-direction: column;
//               overflow: hidden;
//               border: 1px solid #dce9dc;
//               border-radius: 18px;
//               background: white;
//               box-shadow: 0 22px 65px #0003;
//               animation: hpTopPop .25s ease-out;
//             }

//             .hp-topup-header {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 10px;
//               padding: 13px 16px;
//               border-bottom: 3px solid var(--hp-gold);
//               background: linear-gradient(110deg, #07552e, #087b43);
//               flex-shrink: 0;
//             }

//             .hp-topup-heading {
//               display: flex;
//               align-items: center;
//               gap: 10px;
//               min-width: 0;
//             }

//             .hp-topup-heading-icon {
//               display: grid;
//               place-items: center;
//               width: 39px;
//               height: 39px;
//               flex-shrink: 0;
//               border: 1px solid #ffffff40;
//               border-radius: 11px;
//               background: #ffffff15;
//               color: #ffdf78;
//             }

//             .hp-topup-title {
//               margin: 0;
//               color: white;
//               font-size: 14px;
//               font-weight: 950;
//               letter-spacing: .5px;
//             }

//             .hp-topup-subtitle {
//               margin-top: 3px;
//               color: #d5ead9;
//               font-size: 9px;
//               font-weight: 750;
//               letter-spacing: .8px;
//               text-transform: uppercase;
//             }

//             .hp-topup-close {
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

//             .hp-topup-close:hover {
//               background: #ffffff28;
//               transform: rotate(90deg);
//             }

//             .hp-topup-body {
//               padding: 15px;
//               overflow-y: auto;
//               background: #fff;
//               scrollbar-width: thin;
//               scrollbar-color: #c6d9c8 transparent;
//             }

//             .hp-topup-package {
//               position: relative;
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 12px;
//               padding: 15px;
//               overflow: hidden;
//               border: 1px solid #d5e9d1;
//               border-radius: 14px;
//               background: linear-gradient(115deg, #eff9ed, #fbfcf5);
//             }

//             .hp-topup-package::after {
//               position: absolute;
//               content: "";
//               width: 100px;
//               height: 100px;
//               right: 15%;
//               top: -70px;
//               border-radius: 50%;
//               background: #d5e9ce;
//               opacity: .5;
//             }

//             .hp-topup-package-info,
//             .hp-topup-package-price {
//               position: relative;
//               z-index: 1;
//             }

//             .hp-topup-package-label {
//               display: flex;
//               align-items: center;
//               gap: 6px;
//               color: #4a8056;
//               font-size: 9px;
//               font-weight: 950;
//               letter-spacing: 1px;
//               text-transform: uppercase;
//             }

//             .hp-topup-package-name {
//               margin-top: 5px;
//               color: #16472a;
//               font-size: 17px;
//               font-weight: 950;
//             }

//             .hp-topup-package-description {
//               margin-top: 3px;
//               color: #78917d;
//               font-size: 9px;
//               font-weight: 700;
//             }

//             .hp-topup-package-price {
//               color: #08783f;
//               font-family: monospace;
//               font-size: 29px;
//               font-weight: 950;
//               letter-spacing: -1px;
//               white-space: nowrap;
//             }

//             .hp-topup-package-price small {
//               display: block;
//               color: #77917b;
//               font-family: Inter, Arial, sans-serif;
//               font-size: 8px;
//               font-weight: 900;
//               letter-spacing: 1px;
//               text-align: right;
//             }

//             .hp-topup-balance {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 10px;
//               margin-top: 11px;
//               padding: 11px 13px;
//               border: 1px solid #e4ebe1;
//               border-radius: 11px;
//               background: #fbfdf9;
//             }

//             .hp-topup-balance-label {
//               display: flex;
//               align-items: center;
//               gap: 7px;
//               color: #637c68;
//               font-size: 9px;
//               font-weight: 900;
//               letter-spacing: .7px;
//               text-transform: uppercase;
//             }

//             .hp-topup-balance-value {
//               color: #16472a;
//               font-family: monospace;
//               font-size: 17px;
//               font-weight: 950;
//             }

//             .hp-topup-section-title {
//               margin: 18px 0 10px;
//               color: #244a31;
//               font-size: 10px;
//               font-weight: 950;
//               letter-spacing: 1px;
//               text-transform: uppercase;
//             }

//             .hp-topup-label {
//               display: block;
//               margin: 0 0 6px 2px;
//               color: #526b59;
//               font-size: 9px;
//               font-weight: 900;
//               letter-spacing: .7px;
//               text-transform: uppercase;
//             }

//             .hp-topup-input-wrap {
//               position: relative;
//               display: flex;
//               align-items: center;
//             }

//             .hp-topup-input-icon {
//               position: absolute;
//               left: 12px;
//               display: flex;
//               align-items: center;
//               color: #8b9d8f;
//               pointer-events: none;
//             }

//             .hp-topup-input {
//               width: 100%;
//               height: 43px;
//               padding: 0 38px;
//               border: 1px solid #dce8dc;
//               border-radius: 10px;
//               outline: none;
//               background: white;
//               color: #21482f;
//               font-size: 12px;
//               font-weight: 750;
//               transition: .2s;
//             }

//             .hp-topup-input::placeholder {
//               color: #a1afa3;
//               font-weight: 550;
//             }

//             .hp-topup-input:focus {
//               border-color: #0b8748;
//               box-shadow: 0 0 0 3px #08783f12;
//             }

//             .hp-topup-input:focus + .hp-topup-check {
//               color: var(--hp-green);
//             }

//             .hp-topup-check {
//               position: absolute;
//               right: 12px;
//               color: #0b8748;
//             }

//             .hp-topup-promo {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 8px;
//               min-height: 43px;
//               padding: 10px;
//               border: 1px solid #ead9a6;
//               border-radius: 10px;
//               background: #fff9e9;
//               color: #936e1d;
//               font-size: 10px;
//               font-weight: 850;
//               text-align: center;
//             }

//             .hp-topup-user-card {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               gap: 10px;
//               margin-top: 9px;
//               padding: 10px 11px;
//               border: 1px solid #cfe7d1;
//               border-radius: 10px;
//               background: #eff9ef;
//             }

//             .hp-topup-user-name {
//               color: #17472a;
//               font-size: 11px;
//               font-weight: 950;
//             }

//             .hp-topup-user-id {
//               margin-top: 3px;
//               color: #78917d;
//               font-family: monospace;
//               font-size: 9px;
//               font-weight: 750;
//             }

//             .hp-topup-status {
//               display: inline-flex;
//               align-items: center;
//               gap: 4px;
//               padding: 5px 8px;
//               border-radius: 20px;
//               background: #dff2df;
//               color: #08783f;
//               font-size: 8px;
//               font-weight: 950;
//               text-transform: uppercase;
//               white-space: nowrap;
//             }

//             .hp-topup-status.active {
//               background: #dff2df;
//               color: #08783f;
//             }

//             .hp-topup-status.inactive {
//               background: #fff4d8;
//               color: #9a741d;
//             }

//             .hp-topup-check-btn {
//               height: 43px;
//               padding: 0 14px;
//               border: 1px solid #d6e5d4;
//               border-radius: 10px;
//               background: #eff8ed;
//               color: #08783f;
//               font-size: 10px;
//               font-weight: 950;
//               cursor: pointer;
//               transition: .2s;
//             }

//             .hp-topup-check-btn:hover {
//               background: #e1f0df;
//             }

//             .hp-topup-footer {
//               padding: 13px 15px;
//               border-top: 1px solid #e5eee4;
//               background: #f8fbf7;
//               flex-shrink: 0;
//             }

//             .hp-topup-password {
//               margin-bottom: 10px;
//             }

//             .hp-topup-submit {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 8px;
//               width: 100%;
//               min-height: 45px;
//               border: 1px solid #d7b84e;
//               border-radius: 10px;
//               background: linear-gradient(105deg, #087b43, #07552e);
//               color: white;
//               box-shadow: 0 4px 12px #08783f22;
//               font-size: 11px;
//               font-weight: 950;
//               letter-spacing: .8px;
//               cursor: pointer;
//               transition: .2s;
//             }

//             .hp-topup-submit:hover:not(:disabled) {
//               transform: translateY(-1px);
//               box-shadow: 0 6px 16px #08783f35;
//             }

//             .hp-topup-submit:disabled {
//               border-color: #dce5dc;
//               background: #e8eee8;
//               color: #92a095;
//               box-shadow: none;
//               cursor: not-allowed;
//             }

//             .hp-topup-cancel {
//               display: block;
//               width: 100%;
//               margin-top: 8px;
//               padding: 8px;
//               border: 0;
//               background: transparent;
//               color: #718276;
//               font-size: 10px;
//               font-weight: 850;
//               cursor: pointer;
//             }

//             .hp-topup-cancel:hover {
//               color: #b23e3e;
//             }

//             @keyframes hpTopFade {
//               from { opacity: 0; }
//               to { opacity: 1; }
//             }

//             @keyframes hpTopPop {
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
//               .hp-topup-overlay {
//                 padding: 8px;
//               }

//               .hp-topup-modal {
//                 max-height: 95vh;
//                 border-radius: 15px;
//               }

//               .hp-topup-header {
//                 padding: 11px 12px;
//               }

//               .hp-topup-body {
//                 padding: 12px;
//               }

//               .hp-topup-footer {
//                 padding: 11px 12px;
//               }

//               .hp-topup-package {
//                 padding: 12px;
//               }

//               .hp-topup-package-price {
//                 font-size: 25px;
//               }
//             }

//             @media (prefers-reduced-motion: reduce) {
//               .hp-topup-overlay,
//               .hp-topup-modal {
//                 animation: none;
//               }
//             }
//           `}</style>

//           <div className="hp-topup-modal">
//             {/* Header */}
//             <div className="hp-topup-header">
//               <div className="hp-topup-heading">
//                 <div className="hp-topup-heading-icon">
//                   <Zap size={20} />
//                 </div>

//                 <div>
//                   <h2 className="hp-topup-title">
//                     Activate Package
//                   </h2>
//                   <div className="hp-topup-subtitle">
//                     Helping Pools Member Activation
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="hp-topup-close"
//                 aria-label="Close"
//               >
//                 <X size={17} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="hp-topup-body">
//               {/* Package */}
//               <div className="hp-topup-package">
//                 <div className="hp-topup-package-info">
//                   <div className="hp-topup-package-label">
//                     <Sparkles size={13} />
//                     Selected Package
//                   </div>

//                   <div className="hp-topup-package-name">
//                     Helping Pools
//                   </div>

//                   <div className="hp-topup-package-description">
//                     Member activation package
//                   </div>
//                 </div>

//                 <div className="hp-topup-package-price">
//                   $30
//                   <small>USD / PACKAGE</small>
//                 </div>
//               </div>

//               {/* Balance */}
//               <div className="hp-topup-balance">
//                 <div className="hp-topup-balance-label">
//                   <Wallet size={15} />
//                   Available Wallet Balance
//                 </div>

//                 <div className="hp-topup-balance-value">
//                   {balanceText}
//                 </div>
//               </div>

//               {/* User ID */}
//               <div className="hp-topup-section-title">
//                 Activation Details
//               </div>

//               <div>
//                 <label className="hp-topup-label">
//                   Target Node ID
//                 </label>

//                 {isPromoUser ? (
//                   <div className="hp-topup-promo">
//                     <ShieldCheck size={17} />
//                     System will automatically select an inactive ID
//                   </div>
//                 ) : (
//                   <div className="hp-topup-input-wrap">
//                     <span className="hp-topup-input-icon">
//                       <User size={16} />
//                     </span>

//                     <input
//                       type="number"
//                       placeholder="Enter target Node ID"
//                       value={userId}
//                       onChange={(e) => setUserId(e.target.value)}
//                       className="hp-topup-input"
//                     />

//                     {!userInfo && userId.length > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => fetchUser(userId, true)}
//                         className="hp-topup-check-btn"
//                       >
//                         Check ID
//                       </button>
//                     )}

//                     {userInfo && (
//                       <CheckCircle
//                         size={17}
//                         className="hp-topup-check"
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* User details */}
//               {!isPromoUser && userInfo && (
//                 <div className="hp-topup-user-card">
//                   <div>
//                     <div className="hp-topup-user-name">
//                       {userInfo.name}
//                     </div>

//                     <div className="hp-topup-user-id">
//                       ID: {userInfo.userId}
//                     </div>
//                   </div>

//                   {isBought ? (
//                     <span className="hp-topup-status active">
//                       <CheckCircle size={12} />
//                       Active
//                     </span>
//                   ) : (
//                     <span className="hp-topup-status inactive">
//                       <AlertCircle size={12} />
//                       Inactive
//                     </span>
//                   )}
//                 </div>
//               )}

//               {!isPromoUser && !userInfo && userId.length > 0 && (
//                 <div
//                   style={{
//                     marginTop: 7,
//                     color: "#8b9d8f",
//                     fontSize: 9,
//                     fontWeight: 700,
//                   }}
//                 >
//                   Checking ID details...
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="hp-topup-footer">
//               <div className="hp-topup-password">
//                 <label className="hp-topup-label">
//                   Transaction Password
//                 </label>

//                 <div className="hp-topup-input-wrap">
//                   <span className="hp-topup-input-icon">
//                     <Lock size={16} />
//                   </span>

//                   <input
//                     type="password"
//                     placeholder="Enter transaction password"
//                     value={transactionPassword}
//                     onChange={(e) =>
//                       setTransactionPassword(e.target.value)
//                     }
//                     autoComplete="new-password"
//                     className="hp-topup-input"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleTopUp}
//                 disabled={
//                   loading ||
//                   isBought ||
//                   (!isPromoUser && !userInfo)
//                 }
//                 className="hp-topup-submit"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={16} className="animate-spin" />
//                     PROCESSING...
//                   </>
//                 ) : (
//                   <>
//                     <Zap size={16} />
//                     ACTIVATE PACKAGE · $30
//                     <ArrowRight size={16} />
//                   </>
//                 )}
//               </button>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="hp-topup-cancel"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       <SuccessModal
//         isOpen={successModalOpen}
//         onClose={closeSuccess}
//         type="topup"
//         userId={successData.userId}
//         userName={successData.name}
//         amount={successData.amount}
//         reward={0}
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
//       />
//     </>
//   );
// };

// export default TopUpModal;




import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import SuccessModal from "./SuccessModal";
import MessageModal from "./MessageModal";
import { useAuth } from "../../context/AuthContext";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  X,
  Wallet,
  Lock,
  User,
  Package,
  Sparkles,
  ArrowRight,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const PACKAGES = [30, 60, 120, 240, 480, 960];

const TopUpModal = ({ onClose, onTopUpSuccess }) => {
  const { user: loggedInUser, token, login } = useAuth();

  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionPassword, setTransactionPassword] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(30);
  const [loading, setLoading] = useState(false);

  const isPromoUser = loggedInUser?.role === "promo";
  const isLeaderUser = loggedInUser?.role === "leader";

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({
    userId: "",
    name: "",
    amount: 0,
  });

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });

  const showMessage = (title, message, type = "info") => {
    setMessageModal({ open: true, title, message, type });
  };

  // Fetch wallet balance
  useEffect(() => {
    let mounted = true;

    const fetchBalance = async () => {
      if (!loggedInUser?.userId || !token) return;

      try {
        const res = await api.get(`/user/${loggedInUser.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (mounted) {
          setWalletBalance(res.data.user.walletBalance || 0);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setWalletBalance(0);
      }
    };

    fetchBalance();

    return () => {
      mounted = false;
    };
  }, [loggedInUser?.userId, token]);

  // Check whether selected package is already activated
  const isBought =
    userInfo?.packages?.some(
      (p) => Number(p.amount) === Number(selectedAmount)
    ) || false;

  // Fetch target user
  const fetchUser = async (idToFetch, showManualError = false) => {
    if (isPromoUser) return;

    const targetId = String(idToFetch || "").trim();

    if (!targetId) {
      setUserInfo(null);

      if (showManualError) {
        showMessage(
          "Missing User ID",
          "Please enter a valid  ID.",
          "warning"
        );
      }
      return;
    }

    try {
      const res = await api.get(`/user/${targetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        setUserInfo(res.data.user);
      } else {
        setUserInfo(null);

        if (showManualError) {
          showMessage(
            "User Not Found",
            "User details could not be found.",
            "error"
          );
        }
      }
    } catch (err) {
      setUserInfo(null);

      if (showManualError) {
        showMessage(
          "User Not Found",
          err.response?.data?.message || "Please check the  ID.",
          "error"
        );
      }
    }
  };

  // Debounced user lookup
  useEffect(() => {
    if (isPromoUser) return;

    const delay = setTimeout(() => {
      if (userId.trim()) {
        fetchUser(userId, false);
      } else {
        setUserInfo(null);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [userId, token, isPromoUser]);

  // Activate selected package
  const handleTopUp = async () => {
    if (loading) return;

    if (!transactionPassword.trim()) {
      return showMessage(
        "Password Required",
        "Please enter your transaction password.",
        "warning"
      );
    }

    if (!isPromoUser) {
      if (!userInfo) {
        return showMessage(
          "User Required",
          "Please enter and verify a valid User ID first.",
          "error"
        );
      }

      if (Number(walletBalance) < selectedAmount) {
        return showMessage(
          "Insufficient Balance",
          `You need $${selectedAmount}. Available balance: $${Number(
            walletBalance || 0
          ).toFixed(2)}.`,
          "error"
        );
      }

      if (isBought) {
        return showMessage(
          "Already Activated",
          `This ID is already active with the $${selectedAmount} package.`,
          "warning"
        );
      }
    }

    setLoading(true);

    try {
      if (isPromoUser) {
        const res = await api.post(
          `/user/promo-dummy-topup`,
          {
            amount: selectedAmount,
            transactionPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSuccessData({
          userId: res.data.generatedId,
          name: res.data.name,
          amount: selectedAmount,
        });

        setSuccessModalOpen(true);

        if (onTopUpSuccess) onTopUpSuccess();

        setTransactionPassword("");
      } else {
        const endpoint = isLeaderUser
          ? `/user/leader-topup/${Number(userId)}`
          : `/user/topup/${Number(userId)}`;

        await api.put(
          endpoint,
          {
            amount: selectedAmount,
            transactionPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSuccessData({
          userId: userInfo.userId,
          name: userInfo.name,
          amount: selectedAmount,
        });

        setSuccessModalOpen(true);

        const refreshedRes = await api.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const refreshedUser = refreshedRes.data.user;

        if (Number(userId) === Number(loggedInUser.userId)) {
          login(refreshedUser, token);
          setWalletBalance(refreshedUser.walletBalance);
        } else {
          setUserInfo(refreshedUser);
        }

        if (onTopUpSuccess) onTopUpSuccess();

        setTransactionPassword("");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Top-up failed. Please try again.";

      showMessage("Transaction Failed", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const balanceText =
    walletBalance !== null
      ? `$${(Math.floor(Number(walletBalance) * 100) / 100).toFixed(2)}`
      : "...";

  const closeSuccess = () => {
    setSuccessModalOpen(false);
    onClose();
  };

  return (
    <>
      {!successModalOpen && (
        <div className="hp-topup-overlay">
          <style>{`
            .hp-topup-overlay {
              --green: #08783f;
              --dark: #07552e;
              --gold: #e3bd50;
              position: fixed;
              inset: 0;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 12px;
              overflow-y: auto;
              background: rgba(5, 25, 15, .72);
              backdrop-filter: blur(5px);
              font-family: Inter, Arial, sans-serif;
              animation: topFade .2s ease-out;
            }

            .hp-topup-overlay * {
              box-sizing: border-box;
            }

            .hp-topup-modal {
              width: 100%;
              max-width: 440px;
              max-height: 94vh;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              border: 1px solid #dce9dc;
              border-radius: 18px;
              background: #fff;
              box-shadow: 0 22px 65px #0004;
              animation: topPop .25s ease-out;
            }

            .hp-topup-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              padding: 13px 16px;
              border-bottom: 3px solid var(--gold);
              background: linear-gradient(110deg, #07552e, #087b43);
              flex-shrink: 0;
            }

            .hp-topup-heading {
              display: flex;
              align-items: center;
              gap: 10px;
              min-width: 0;
            }

            .hp-topup-heading-icon {
              display: grid;
              place-items: center;
              width: 39px;
              height: 39px;
              flex-shrink: 0;
              border: 1px solid #ffffff40;
              border-radius: 11px;
              background: #ffffff15;
              color: #ffdf78;
            }

            .hp-topup-title {
              margin: 0;
              color: #fff;
              font-size: 15px;
              font-weight: 950;
            }

            .hp-topup-subtitle {
              margin-top: 3px;
              color: #d5ead9;
              font-size: 9px;
              font-weight: 750;
              letter-spacing: .8px;
              text-transform: uppercase;
            }

            .hp-topup-close {
              display: grid;
              place-items: center;
              width: 32px;
              height: 32px;
              flex-shrink: 0;
              border: 1px solid #ffffff35;
              border-radius: 9px;
              background: #ffffff12;
              color: white;
              cursor: pointer;
            }

            .hp-topup-close:hover {
              background: #ffffff28;
            }

            .hp-topup-body {
              padding: 15px;
              overflow-y: auto;
              background: #fff;
              scrollbar-width: thin;
            }

            .hp-topup-balance {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              padding: 11px 13px;
              border: 1px solid #e4ebe1;
              border-radius: 11px;
              background: #fbfdf9;
            }

            .hp-topup-balance-label {
              display: flex;
              align-items: center;
              gap: 7px;
              color: #637c68;
              font-size: 10px;
              font-weight: 900;
            }

            .hp-topup-balance-value {
              color: #16472a;
              font-family: monospace;
              font-size: 18px;
              font-weight: 950;
            }

            .hp-topup-section-title {
              display: flex;
              align-items: center;
              gap: 7px;
              margin: 17px 0 10px;
              color: #244a31;
              font-size: 11px;
              font-weight: 950;
              letter-spacing: .6px;
              text-transform: uppercase;
            }

            .hp-package-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 9px;
            }

            .hp-package-option {
              position: relative;
              min-width: 0;
              min-height: 75px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
              padding: 9px 4px;
              border: 1px solid #dce9dc;
              border-radius: 12px;
              background: linear-gradient(145deg, #fff, #f5faf3);
              color: #31543a;
              cursor: pointer;
              transition: .18s ease;
            }

            .hp-package-option:hover {
              border-color: #8fbd91;
              transform: translateY(-2px);
            }

            .hp-package-option.selected {
              border: 2px solid #08783f;
              background: linear-gradient(145deg, #e9f8e9, #fff9e5);
              box-shadow: 0 4px 13px #08783f18;
              color: #07552e;
            }

            .hp-package-option.selected::after {
              content: "✓";
              position: absolute;
              top: 5px;
              right: 7px;
              color: #08783f;
              font-size: 11px;
              font-weight: 950;
            }

            .hp-package-amount {
              font-size: 19px;
              font-weight: 950;
              letter-spacing: -.5px;
            }

            .hp-package-label {
              color: #7a907d;
              font-size: 9px;
              font-weight: 850;
              text-transform: uppercase;
            }

            .hp-selected-package {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              margin-top: 11px;
              padding: 11px 13px;
              border: 1px solid #ead9a6;
              border-radius: 11px;
              background: #fff9e9;
            }

            .hp-selected-label {
              color: #8a6b26;
              font-size: 9px;
              font-weight: 900;
              text-transform: uppercase;
            }

            .hp-selected-value {
              margin-top: 3px;
              color: #175c32;
              font-size: 17px;
              font-weight: 950;
            }

            .hp-topup-label {
              display: block;
              margin: 0 0 6px 2px;
              color: #526b59;
              font-size: 10px;
              font-weight: 900;
              text-transform: uppercase;
            }

            .hp-topup-input-wrap {
              position: relative;
              display: flex;
              align-items: center;
            }

            .hp-topup-input-icon {
              position: absolute;
              left: 12px;
              display: flex;
              align-items: center;
              color: #8b9d8f;
              pointer-events: none;
            }

            .hp-topup-input {
              width: 100%;
              height: 43px;
              padding: 0 38px;
              border: 1px solid #dce8dc;
              border-radius: 10px;
              outline: none;
              background: white;
              color: #21482f;
              font-size: 12px;
              font-weight: 750;
              transition: .2s;
            }

            .hp-topup-input:focus {
              border-color: #0b8748;
              box-shadow: 0 0 0 3px #08783f12;
            }

            .hp-topup-check {
              position: absolute;
              right: 12px;
              color: #0b8748;
            }

            .hp-topup-promo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              min-height: 43px;
              padding: 10px;
              border: 1px solid #ead9a6;
              border-radius: 10px;
              background: #fff9e9;
              color: #936e1d;
              font-size: 10px;
              font-weight: 850;
              text-align: center;
            }

            .hp-topup-user-card {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              margin-top: 9px;
              padding: 10px 11px;
              border: 1px solid #cfe7d1;
              border-radius: 10px;
              background: #eff9ef;
            }

            .hp-topup-user-name {
              color: #17472a;
              font-size: 11px;
              font-weight: 950;
            }

            .hp-topup-user-id {
              margin-top: 3px;
              color: #78917d;
              font-family: monospace;
              font-size: 9px;
            }

            .hp-topup-status {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              padding: 5px 8px;
              border-radius: 20px;
              font-size: 8px;
              font-weight: 950;
              text-transform: uppercase;
            }

            .hp-topup-status.active {
              background: #dff2df;
              color: #08783f;
            }

            .hp-topup-status.inactive {
              background: #fff4d8;
              color: #9a741d;
            }

            .hp-topup-check-btn {
              height: 43px;
              padding: 0 12px;
              border: 1px solid #d6e5d4;
              border-radius: 10px;
              background: #eff8ed;
              color: #08783f;
              font-size: 10px;
              font-weight: 950;
              cursor: pointer;
            }

            .hp-topup-footer {
              padding: 13px 15px;
              border-top: 1px solid #e5eee4;
              background: #f8fbf7;
              flex-shrink: 0;
            }

            .hp-topup-password {
              margin-bottom: 10px;
            }

            .hp-topup-submit {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              width: 100%;
              min-height: 45px;
              border: 1px solid #d7b84e;
              border-radius: 10px;
              background: linear-gradient(105deg, #087b43, #07552e);
              color: white;
              box-shadow: 0 4px 12px #08783f22;
              font-size: 11px;
              font-weight: 950;
              letter-spacing: .5px;
              cursor: pointer;
              transition: .2s;
            }

            .hp-topup-submit:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 6px 16px #08783f35;
            }

            .hp-topup-submit:disabled {
              border-color: #dce5dc;
              background: #e8eee8;
              color: #92a095;
              box-shadow: none;
              cursor: not-allowed;
            }

            .hp-topup-cancel {
              display: block;
              width: 100%;
              margin-top: 7px;
              padding: 8px;
              border: 0;
              background: transparent;
              color: #718276;
              font-size: 10px;
              font-weight: 850;
              cursor: pointer;
            }

            .hp-topup-cancel:hover {
              color: #b23e3e;
            }

            @keyframes topFade {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes topPop {
              from { opacity: 0; transform: translateY(12px) scale(.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }

            @media (max-width: 380px) {
              .hp-topup-overlay { padding: 7px; }
              .hp-topup-body { padding: 12px; }
              .hp-package-grid { gap: 6px; }
              .hp-package-amount { font-size: 17px; }
              .hp-package-option { min-height: 68px; }
            }

            @media (prefers-reduced-motion: reduce) {
              .hp-topup-overlay,
              .hp-topup-modal { animation: none; }
            }
          `}</style>

          <div className="hp-topup-modal">
            <div className="hp-topup-header">
              <div className="hp-topup-heading">
                <div className="hp-topup-heading-icon">
                  <Zap size={20} />
                </div>

                <div>
                  <h2 className="hp-topup-title">Activate Package</h2>
                  <div className="hp-topup-subtitle">
                    Select your activation package
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="hp-topup-close"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="hp-topup-body">
              <div className="hp-topup-balance">
                <div className="hp-topup-balance-label">
                  <Wallet size={15} />
                  Available Wallet Balance
                </div>

                <div className="hp-topup-balance-value">
                  {balanceText}
                </div>
              </div>

              <div className="hp-topup-section-title">
                <Package size={15} />
                Select Package
              </div>

              <div className="hp-package-grid">
                {PACKAGES.map((amount) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`hp-package-option ${
                      selectedAmount === amount ? "selected" : ""
                    }`}
                    aria-pressed={selectedAmount === amount}
                  >
                    <span className="hp-package-amount">
                      ${amount.toLocaleString("en-US")}
                    </span>
                    <span className="hp-package-label">Package</span>
                  </button>
                ))}
              </div>

              <div className="hp-selected-package">
                <div>
                  <div className="hp-selected-label">
                    <Sparkles size={11} style={{ display: "inline" }} /> Selected
                    Package
                  </div>
                  <div className="hp-selected-value">
                    ${selectedAmount.toLocaleString("en-US")} USD
                  </div>
                </div>
                <ShieldCheck size={25} color="#08783f" />
              </div>

              <div className="hp-topup-section-title">
                Activation Details
              </div>

              <div>
                <label className="hp-topup-label">User ID</label>

                {isPromoUser ? (
                  <div className="hp-topup-promo">
                    <ShieldCheck size={17} />
                    System will automatically select an inactive ID
                  </div>
                ) : (
                  <div className="hp-topup-input-wrap">
                    <span className="hp-topup-input-icon">
                      <User size={16} />
                    </span>

                    <input
                      type="number"
                      placeholder="Enter User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="hp-topup-input"
                    />

                    {!userInfo && userId.length > 0 && (
                      <button
                        type="button"
                        onClick={() => fetchUser(userId, true)}
                        className="hp-topup-check-btn"
                      >
                        Check ID
                      </button>
                    )}

                    {userInfo && (
                      <CheckCircle
                        size={17}
                        className="hp-topup-check"
                      />
                    )}
                  </div>
                )}
              </div>

              {!isPromoUser && userInfo && (
                <div className="hp-topup-user-card">
                  <div>
                    <div className="hp-topup-user-name">
                      {userInfo.name}
                    </div>
                    <div className="hp-topup-user-id">
                      ID: {userInfo.userId}
                    </div>
                  </div>

                  {isBought ? (
                    <span className="hp-topup-status active">
                      <CheckCircle size={12} />
                      Already Active
                    </span>
                  ) : (
                    <span className="hp-topup-status inactive">
                      <AlertCircle size={12} />
                      Not Activated
                    </span>
                  )}
                </div>
              )}

              {!isPromoUser && !userInfo && userId.length > 0 && (
                <div
                  style={{
                    marginTop: 7,
                    color: "#8b9d8f",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  Checking ID details...
                </div>
              )}
            </div>

            <div className="hp-topup-footer">
              <div className="hp-topup-password">
                <label className="hp-topup-label">
                  Transaction Password
                </label>

                <div className="hp-topup-input-wrap">
                  <span className="hp-topup-input-icon">
                    <Lock size={16} />
                  </span>

                  <input
                    type="password"
                    placeholder="Enter transaction password"
                    value={transactionPassword}
                    onChange={(e) =>
                      setTransactionPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    className="hp-topup-input"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleTopUp}
                disabled={
                  loading ||
                  isBought ||
                  (!isPromoUser && !userInfo)
                }
                className="hp-topup-submit"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    ACTIVATE PACKAGE · $
                    {selectedAmount.toLocaleString("en-US")}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="hp-topup-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={successModalOpen}
        onClose={closeSuccess}
        type="topup"
        userId={successData.userId}
        userName={successData.name}
        amount={successData.amount}
        reward={0}
      />

      <MessageModal
        isOpen={messageModal.open}
        onClose={() =>
          setMessageModal({ ...messageModal, open: false })
        }
        title={messageModal.title}
        message={messageModal.message}
        type={messageModal.type}
      />
    </>
  );
};

export default TopUpModal;
