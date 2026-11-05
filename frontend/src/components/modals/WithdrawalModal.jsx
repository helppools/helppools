


// // // // // // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // // // // // import api from "../../api/axios"; 
// // // // // // import SuccessModal from "./SuccessModal";
// // // // // // import MessageModal from "./MessageModal";
// // // // // // import { useAuth } from "../../context/AuthContext";
// // // // // // import { Wallet, Zap, Layers, Users, Trophy, X, UserCog, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react"; 
// // // // // // import { Link } from "react-router-dom"; 

// // // // // // const GLOBAL_POOLS = [
// // // // // //   { level: 1,  globalTeam: 20,    reqDirects: 1,  earning: 10   },
// // // // // //   { level: 2,  globalTeam: 40,    reqDirects: 2,  earning: 20   },
// // // // // //   { level: 3,  globalTeam: 100,   reqDirects: 3,  earning: 40   },
// // // // // //   { level: 4,  globalTeam: 200,   reqDirects: 4,  earning: 80   },
// // // // // //   { level: 5,  globalTeam: 400,   reqDirects: 5,  earning: 150  },
// // // // // //   { level: 6,  globalTeam: 1600,  reqDirects: 6,  earning: 200  },
// // // // // //   { level: 7,  globalTeam: 2000,  reqDirects: 8,  earning: 500  }, 
// // // // // //   { level: 8,  globalTeam: 3000,  reqDirects: 10, earning: 700  }, 
// // // // // //   { level: 9,  globalTeam: 4000,  reqDirects: 12, earning: 1000 }, 
// // // // // //   { level: 10, globalTeam: 5000,  reqDirects: 14, earning: 1500 }, 
// // // // // //   { level: 11, globalTeam: 7500,  reqDirects: 16, earning: 3000 }, 
// // // // // //   { level: 12, globalTeam: 10000, reqDirects: 18, earning: 5000 }  
// // // // // // ];

// // // // // // const WithdrawalModal = ({ userId, onClose }) => {
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [showPassword, setShowPassword] = useState(false); 
  
// // // // // //   const [balances, setBalances] = useState({
// // // // // //     walletBalance: 0, direct: 0, level: 0, reward: 0, pool: 0, isUserToppedUp: false
// // // // // //   });
  
// // // // // //   const [unlockedLevels, setUnlockedLevels] = useState([]);
  
// // // // // //   const [withdrawals, setWithdrawals] = useState({
// // // // // //     direct: "", level: "", reward: ""
// // // // // //   });
  
// // // // // //   const [transactionPassword, setTransactionPassword] = useState("");
// // // // // //   const [walletAddress, setWalletAddress] = useState(""); 
// // // // // //   const [isAddressMissing, setIsAddressMissing] = useState(false);
  
// // // // // //   const [confirmData, setConfirmData] = useState(null);
  
// // // // // //   const [successOpen, setSuccessOpen] = useState(false);
// // // // // //   const [successData, setSuccessData] = useState({ userId: "", userName: "", amount: 0, source: "" });
// // // // // //   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

// // // // // //   const { user: loggedInUser, token } = useAuth();
// // // // // //   const isPromo = loggedInUser?.role === "promo";
// // // // // //   const isLeader = loggedInUser?.role === "leader";

// // // // // //   const showMessage = (title, message, type = "error") =>
// // // // // //     setMessageModal({ open: true, title, message, type });

// // // // // //   const fetchData = useCallback(async () => {
// // // // // //     try {
// // // // // //       const res = await api.get(`/wallet/withdrawable/${userId}`);
// // // // // //       const profileRes = await api.get(`/user/${userId}`);

// // // // // //       if (res.data) {
// // // // // //         setBalances({
// // // // // //           walletBalance: Number(res.data.walletBalance) || 0,
// // // // // //           direct: Number(res.data.direct) || 0, 
// // // // // //           level: Number(res.data.level) || 0,
// // // // // //           reward: Number(res.data.reward) || 0,
// // // // // //           pool: Number(res.data.pool) || 0,
// // // // // //           isUserToppedUp: res.data.isUserToppedUp || false
// // // // // //         });
// // // // // //       }

// // // // // //       const u = profileRes.data?.user || profileRes.data;

// // // // // //       if (u) {
// // // // // //         const addr = (u.walletAddress || "").trim();
// // // // // //         setWalletAddress(addr);
// // // // // //         setIsAddressMissing(!addr);

// // // // // //         const userGlobal = Number(u.globalTeamCount) || 0;
// // // // // //         const userDirects = Number(u.directCount) || 0;
// // // // // //         const activePoolsData = u.activePools || []; 
// // // // // //         let cumulativeGlobal = 0;
// // // // // //         let unlockedLevelsTemp = [];

// // // // // //         for (const lvl of GLOBAL_POOLS) {
// // // // // //             cumulativeGlobal += lvl.globalTeam;
// // // // // //             if (userGlobal >= cumulativeGlobal) {
// // // // // //                 unlockedLevelsTemp.push({ 
// // // // // //                     ...lvl, 
// // // // // //                     isDirectMet: userDirects >= lvl.reqDirects, 
// // // // // //                     reqDirects: lvl.reqDirects 
// // // // // //                 });
// // // // // //             } else {
// // // // // //                 break; 
// // // // // //             }
// // // // // //         }

// // // // // //         let boxData = unlockedLevelsTemp.map(lvl => {
// // // // // //             const p = activePoolsData.find(ap => Number(ap.level) === Number(lvl.level));
// // // // // //             const generated = p ? (Number(p.daysPaid) || 0) * (Number(p.dailyAmount) || 0) : 0;
// // // // // //             const withdrawnAmt = p ? (Number(p.withdrawnAmount) || 0) : 0; 
// // // // // //             let available = generated - withdrawnAmt;
// // // // // //             available = available > 0.01 ? available : 0; 

// // // // // //             return { ...lvl, generated, withdrawnAmt, available };
// // // // // //         });

// // // // // //         setUnlockedLevels(boxData);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("Fetch Error:", err);
// // // // // //     }
// // // // // //   }, [userId]);

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, [fetchData]);

// // // // // //   const totalCommunityAvailable = unlockedLevels.reduce((sum, lvl) => {
// // // // // //       if (lvl.isDirectMet || isPromo) return sum + lvl.available;
// // // // // //       return sum;
// // // // // //   }, 0);

// // // // // //   const totalAvailableToWithdraw = balances.direct + balances.level + balances.reward + totalCommunityAvailable;
// // // // // //   const hasMainIncome = balances.direct > 0 || balances.level > 0 || balances.reward > 0 || totalCommunityAvailable > 0;

// // // // // //   const totalEnteredAmount = useMemo(() => {
// // // // // //     let sum = 0;
// // // // // //     sum += Number(withdrawals.direct) || 0;
// // // // // //     sum += Number(withdrawals.level) || 0;
// // // // // //     sum += Number(withdrawals.reward) || 0;
// // // // // //     Object.keys(withdrawals).forEach(key => {
// // // // // //       if (key.startsWith('pool_')) {
// // // // // //         sum += Number(withdrawals[key]) || 0;
// // // // // //       }
// // // // // //     });
// // // // // //     return sum;
// // // // // //   }, [withdrawals]);

// // // // // //   const handleInputChange = (e, source) => {
// // // // // //     const value = e.target.value;
// // // // // //     if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
// // // // // //       setWithdrawals((prev) => ({ ...prev, [source]: value }));
// // // // // //     }
// // // // // //   };

// // // // // //   // 🔥 STEP 1: API KO DRY-RUN BHEJ KAR CALCULATION MANGWANA (No Guesswork)
// // // // // //   const handlePreWithdrawCheck = async () => {
// // // // // //     if (isLeader) return showMessage("Action Denied", "Leaders cannot withdraw funds directly from here.");
// // // // // //     if (!balances.isUserToppedUp && !isPromo) return showMessage("Top-up Required", "You must activate your Node to withdraw funds.");
// // // // // //     if (!walletAddress.trim() && isAddressMissing && !isPromo) return showMessage("Address Missing", "Please set your withdrawal address in your Profile first.");

// // // // // //     let items = [];
// // // // // //     let totalRequested = 0;
// // // // // //     let successMessages = [];

// // // // // //     const checkAndPush = (sourceName, inputVal, availableBal, displayName) => {
// // // // // //         const amt = Number(inputVal);
// // // // // //         if (amt > 0) {
// // // // // //             if (!isPromo && amt > availableBal) throw new Error(`Insufficient funds in ${displayName}.`);
// // // // // //             items.push({ source: sourceName, amount: amt });
// // // // // //             totalRequested += amt;
// // // // // //             successMessages.push(displayName);
// // // // // //         }
// // // // // //     };

// // // // // //     try {
// // // // // //       checkAndPush("direct", withdrawals.direct, balances.direct, "Direct Income");
// // // // // //       checkAndPush("level", withdrawals.level, balances.level, "Level Income");
// // // // // //       checkAndPush("reward", withdrawals.reward, balances.reward, "Team Reward");

// // // // // //       unlockedLevels.forEach(lvl => {
// // // // // //         const amt = Number(withdrawals[`pool_${lvl.level}`] || 0);
// // // // // //         if (amt > 0) {
// // // // // //             if (!lvl.isDirectMet && !isPromo) throw new Error(`Please complete Total ${lvl.reqDirects} Directs to withdraw from Community Lvl ${lvl.level}.`);
// // // // // //             if (!isPromo && amt > lvl.available) throw new Error(`Insufficient funds in Level ${lvl.level} Pool.`);
            
// // // // // //             items.push({ source: `pool_${lvl.level}`, amount: amt }); 
// // // // // //             totalRequested += amt;
// // // // // //             successMessages.push(` Lvl ${lvl.level}`);
// // // // // //         }
// // // // // //       });

// // // // // //       if (totalRequested === 0) return showMessage("Warning", "Enter amount to withdraw.");
// // // // // //       if (totalRequested % 10 !== 0) return showMessage("Warning", `Amount must be in multiples of $10. Your total is $${totalRequested}.`);
// // // // // //       if (!isPromo && totalRequested < 10) return showMessage("Warning", "Minimum total withdrawal amount is $10.");
// // // // // //       if (!transactionPassword.trim()) return showMessage("Warning", "Enter transaction password.");

// // // // // //       setLoading(true);
// // // // // //       const endpoint = isPromo ? "/wallet/promo-withdraw" : "/wallet/withdraw";

// // // // // //       // 📡 API CALL FOR PRE-CHECK (dryRun: true)
// // // // // //       const response = await api.post(endpoint, {
// // // // // //         transactionPassword, items, dryRun: true 
// // // // // //       }, { headers: { Authorization: `Bearer ${token}` } });
      
// // // // // //       const rep = response.data.report;

// // // // // //       // 🔥 Backend ka ekdum accurate data Popup mein jayega!
// // // // // //       setConfirmData({
// // // // // //         items,
// // // // // //         totalRequested: rep.totalRequested,
// // // // // //         expectedUSDT: rep.totalNetUSDT,
// // // // // //         expectedTopup: rep.totalToTopupWallet,
// // // // // //         teamSizeTracked: rep.teamSizeTracked,
// // // // // //         sources: [...new Set(successMessages)].join(", ")
// // // // // //       });

// // // // // //     // } catch (err) {
// // // // // //     //   console.error(err);
// // // // // //     //   let errorMsg = "Calculation failed.";
// // // // // //     //   if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // // //     //   else if (err.message) errorMsg = err.message;
      
// // // // // //     //   if (err.response?.status === 403) errorMsg = "Invalid Transaction Password";
// // // // // //     //   showMessage("Error", errorMsg);
// // // // // //     // } finally {
// // // // // //     //   setLoading(false);
// // // // // //     // }

// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       let errorMsg = "Calculation failed.";
// // // // // //       if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // // //       else if (err.message) errorMsg = err.message;
      
// // // // // //       if (err.response?.status === 403) errorMsg = "Invalid Transaction Password";
      
// // // // // //       // 🔥 NAYA LOGIC: Agar backend ka message 'once in a month' wala hai, toh usko "info" popup do (Error nahi)
// // // // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // // // //       } else {
// // // // // //         showMessage("Error", errorMsg, "error");
// // // // // //       }
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // 🔥 STEP 2: Actual Withdraw Call jab User "Confirm" dabaye
// // // // // //   const proceedWithdrawal = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const endpoint = isPromo ? "/wallet/promo-withdraw" : "/wallet/withdraw";

// // // // // //       // 📡 API CALL FOR REAL DEDUCTION (dryRun = false)
// // // // // //       const response = await api.post(endpoint, {
// // // // // //         transactionPassword, items: confirmData.items, dryRun: false 
// // // // // //       }, { headers: { Authorization: `Bearer ${token}` } });
      
// // // // // //       const finalUserId = (isPromo && response.data.generatedId) ? response.data.generatedId : userId;
// // // // // //       const finalUserName = isPromo ? (response.data.name || "Demo User") : (loggedInUser?.name || "");

// // // // // //       setSuccessData({ 
// // // // // //         userId: finalUserId, 
// // // // // //         userName: finalUserName, 
// // // // // //         amount: confirmData.totalRequested, 
// // // // // //         source: confirmData.sources 
// // // // // //       });
      
// // // // // //       setConfirmData(null);
// // // // // //       setSuccessOpen(true);
// // // // // //       setWithdrawals({ direct: "", level: "", reward: "" }); 
// // // // // //       setTransactionPassword("");
// // // // // //       await fetchData();

// // // // // //     // } catch (err) {
// // // // // //     //   console.error(err);
// // // // // //     //   let errorMsg = "Withdrawal failed due to a server error.";
// // // // // //     //   if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // // //     //   else if (err.message) errorMsg = err.message;
      
// // // // // //     //   setConfirmData(null);
// // // // // //     //   showMessage("Withdrawal Error", errorMsg);
// // // // // //     // } finally {
// // // // // //     //   setLoading(false); 
// // // // // //     // }
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       let errorMsg = "Withdrawal failed due to a server error.";
// // // // // //       if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // // //       else if (err.message) errorMsg = err.message;
      
// // // // // //       setConfirmData(null);

// // // // // //       // 🔥 Yahan bhi same check lagaya hai
// // // // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // // // //       } else {
// // // // // //         showMessage("Withdrawal Error", errorMsg, "error");
// // // // // //       }
// // // // // //     } finally {
// // // // // //       setLoading(false); 
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <>
// // // // // //       <style>{`
// // // // // //         input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
// // // // // //         input[type=number] { -moz-appearance: textfield; }
// // // // // //         .custom-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
// // // // // //         .custom-scroll::-webkit-scrollbar { width: 4px; }
// // // // // //         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
// // // // // //       `}</style>

// // // // // //       {successOpen && (
// // // // // //         <SuccessModal 
// // // // // //            isOpen={successOpen} 
// // // // // //            onClose={() => { setSuccessOpen(false); onClose(); }} 
// // // // // //            type="withdrawal" 
// // // // // //            userId={successData.userId} 
// // // // // //            userName={successData.userName} 
// // // // // //            amount={successData.amount} 
// // // // // //            source={successData.source} 
// // // // // //         />
// // // // // //       )}

// // // // // //       {messageModal.open && (
// // // // // //          <MessageModal 
// // // // // //             isOpen={messageModal.open} 
// // // // // //             title={messageModal.title} 
// // // // // //             message={<pre className="font-sans whitespace-pre-wrap text-[12px] text-center text-slate-700">{messageModal.message}</pre>} 
// // // // // //             type={messageModal.type} 
// // // // // //             onClose={() => setMessageModal({ ...messageModal, open: false })} 
// // // // // //          />
// // // // // //       )}

// // // // // //       {!successOpen && (
// // // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
          
// // // // // //           <div className="bg-white w-full max-w-[480px] rounded-[20px] border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] relative overflow-hidden animate-in zoom-in duration-300">
            
// // // // // //             <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[50px] pointer-events-none rounded-full"></div>

// // // // // //             {/* Header */}
// // // // // //             <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center z-10 shrink-0">
// // // // // //               <h2 className="text-[12px] md:text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 m-0">
// // // // // //                 <div className="bg-green-100 p-1.5 rounded-lg">
// // // // // //                   <Wallet size={14} className="text-green-600" /> 
// // // // // //                 </div>
// // // // // //                 Withdraw Funds
// // // // // //               </h2>
// // // // // //               <button onClick={() => confirmData ? setConfirmData(null) : onClose()} className="group bg-white hover:bg-red-50 p-1.5 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// // // // // //                  <X size={16} className="text-slate-400 group-hover:text-red-500" />
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* 🔥 CONFIRMATION SCREEN (Are you sure?) */}
// // // // // //             {confirmData ? (
// // // // // //               <div className="p-5 flex flex-col gap-4 bg-white relative z-10 text-center animate-in fade-in duration-300">
// // // // // //                   <div className="mx-auto bg-amber-100 p-3 rounded-full mb-2">
// // // // // //                       <AlertTriangle size={32} className="text-amber-600" />
// // // // // //                   </div>
// // // // // //                   <h3 className="text-xl font-black text-slate-800">Review Withdrawal</h3>
// // // // // //                   <p className="text-xs text-slate-500 font-bold px-4">Please review your withdrawal split based on your eligible downline team size.</p>
                  
// // // // // //                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3 mt-2">
// // // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Requested Amount</span>
// // // // // //                           <span className="font-black text-slate-800">${confirmData.totalRequested.toFixed(2)}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Eligible Team</span>
// // // // // //                           {/* 🔥 Dikhayega Asli Team Size backend se */}
// // // // // //                           <span className="font-black text-blue-600">{confirmData.teamSizeTracked} Members</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">To USDT BEP20 Wallet address</span>
// // // // // //                           <span className="font-black text-emerald-600">${confirmData.expectedUSDT.toFixed(2)}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between items-center pt-1">
// // // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">To Wallet</span>
// // // // // //                           <span className="font-black text-purple-600">${confirmData.expectedTopup.toFixed(2)}</span>
// // // // // //                       </div>
// // // // // //                   </div>

// // // // // //                   <div className="flex gap-3 mt-4">
// // // // // //                      <button 
// // // // // //                        onClick={() => setConfirmData(null)} 
// // // // // //                        disabled={loading}
// // // // // //                        className="w-1/2 py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors uppercase tracking-wider"
// // // // // //                      >
// // // // // //                         Cancel
// // // // // //                      </button>
// // // // // //                      <button 
// // // // // //                        onClick={proceedWithdrawal} 
// // // // // //                        disabled={loading} 
// // // // // //                        className="w-1/2 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg flex justify-center items-center gap-2"
// // // // // //                      >
// // // // // //                        {loading ? "PROCESSING..." : <><CheckCircle2 size={16}/> Confirm</>}
// // // // // //                      </button>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               /* 🔥 REGULAR INPUT SCREEN */
// // // // // //               <>
// // // // // //                 <div className="p-3 overflow-y-auto custom-scroll flex-1 flex flex-col gap-3 bg-white relative z-10">
                  
// // // // // //                   <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
// // // // // //                      <div className="text-right w-full">
// // // // // //                         <p className="text-black text-[9px] font-bold uppercase tracking-widest">Withdrawable Balance</p>
// // // // // //                         <h3 className="text-xl font-black text-emerald-600">${totalAvailableToWithdraw.toFixed(2)}</h3>
// // // // // //                      </div>
// // // // // //                   </div>

// // // // // //                   {isAddressMissing && !isPromo ? (
// // // // // //                     <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
// // // // // //                       <p className="text-[10px] md:text-xs text-red-700 font-bold m-0 w-3/5"> No withdrawal address found! You must set it before withdrawing.</p>
// // // // // //                       <Link 
// // // // // //                         to="/profile" 
// // // // // //                         onClick={onClose}
// // // // // //                         className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors whitespace-nowrap"
// // // // // //                       >
// // // // // //                         <UserCog size={12} /> Go To Profile
// // // // // //                       </Link>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex flex-col">
// // // // // //                       <p className="text-[9px] text-emerald-800 font-bold uppercase tracking-widest mb-0.5">Your Saved Address</p>
// // // // // //                       <p className="text-xs font-mono text-emerald-600 font-black truncate">{isPromo ? "Wallet Address (Demo)" : walletAddress}</p>
// // // // // //                     </div>
// // // // // //                   )}

// // // // // //                   {/* MAIN INCOMES */}
// // // // // //                   {(hasMainIncome || isPromo) && (
// // // // // //                       <div className="flex flex-col gap-3">
// // // // // //                         {/* DIRECT */}
// // // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // // //                                     <Zap size={14} className="text-amber-500" /> Direct Income
// // // // // //                                 </h3>
// // // // // //                             </div>
// // // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // // //                                     <span className="text-[14px] font-black text-blue-500">${Number(balances.direct).toFixed(2)}</span>
// // // // // //                                 </div>
// // // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // // //                                     <span className="text-amber-500 font-bold text-sm pl-2">$</span>
// // // // // //                                     <input 
// // // // // //                                         type="number" 
// // // // // //                                         placeholder="0.00" 
// // // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // // //                                         value={withdrawals.direct || ""} 
// // // // // //                                         onChange={e => handleInputChange(e, "direct")} 
// // // // // //                                         disabled={isLeader} 
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         {/* LEVEL */}
// // // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // // //                                     <Users size={14} className="text-blue-500" /> Level Income
// // // // // //                                 </h3>
// // // // // //                             </div>
// // // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // // //                                     {/* <span className="text-[14px] font-black text-blue-500">${Number(balances.level).toFixed(2)}</span>
// // // // // //                                  */}
// // // // // //                                 <span className="text-[14px] font-black text-blue-500">
// // // // // //   ${(Math.floor(Number(balances.level || 0) * 100) / 100).toFixed(2)}
// // // // // // </span>
// // // // // //                                 </div>
// // // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // // //                                     <span className="text-blue-500 font-bold text-sm pl-2">$</span>
// // // // // //                                     <input 
// // // // // //                                         type="number" 
// // // // // //                                         placeholder="0.00" 
// // // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // // //                                         value={withdrawals.level || ""} 
// // // // // //                                         onChange={e => handleInputChange(e, "level")} 
// // // // // //                                         disabled={isLeader} 
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         {/* REWARD */}
// // // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // // //                                     <Trophy size={14} className="text-indigo-500" /> Team Reward
// // // // // //                                 </h3>
// // // // // //                             </div>
// // // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // // //                                     <span className="text-[14px] font-black text-blue-500">${Number(balances.reward).toFixed(2)}</span>
// // // // // //                                 </div>
// // // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // // //                                     <span className="text-indigo-500 font-bold text-sm pl-2">$</span>
// // // // // //                                     <input 
// // // // // //                                         type="number" 
// // // // // //                                         placeholder="0.00" 
// // // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // // //                                         value={withdrawals.reward || ""} 
// // // // // //                                         onChange={e => handleInputChange(e, "reward")} 
// // // // // //                                         disabled={isLeader} 
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                   )}

// // // // // //                   {/* AUTO-POOL BOXES */}
// // // // // //                   <div className="flex flex-col gap-3 mt-2">
// // // // // //                      {unlockedLevels.length > 0 && (
// // // // // //                         <div className="flex justify-between items-center px-1 mt-1">
// // // // // //                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Community Levels</span>
// // // // // //                          </div>
// // // // // //                      )}

// // // // // //                      {unlockedLevels.length > 0 && unlockedLevels.map(lvl => (
// // // // // //                         <div key={lvl.level} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 relative overflow-hidden">
// // // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // // //                                     <Layers size={14} className="text-emerald-500" /> Community Level {lvl.level}
// // // // // //                                     {!lvl.isDirectMet && !isPromo && (
// // // // // //                                         <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded ml-2 shadow-sm font-bold"></span>
// // // // // //                                     )}
// // // // // //                                 </h3>
// // // // // //                             </div>
// // // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // // //                                 <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // // //                                     <span className="text-[11px] font-black text-emerald-600">${lvl.earning}</span>
// // // // // //                                 </div>
// // // // // //                                 <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // // //                                     <span className="text-[11px] font-black text-purple-500">${lvl.generated.toFixed(2)}</span>
// // // // // //                                 </div>
// // // // // //                                 <div className={`w-[22%] bg-white p-1 rounded-lg border shadow-sm flex flex-col justify-center items-center ${!lvl.isDirectMet && !isPromo ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
// // // // // //                                     <span className={`text-[11px] font-black ${!lvl.isDirectMet && !isPromo ? 'text-red-400 line-through decoration-red-400/50' : 'text-blue-500'}`}>
// // // // // //                                         ${lvl.available.toFixed(2)}
// // // // // //                                     </span>
// // // // // //                                 </div>
// // // // // //                                 <div className={`w-[34%] flex items-center gap-1 bg-white p-1 rounded-lg border shadow-inner ${!lvl.isDirectMet && !isPromo ? 'border-red-200 opacity-60 bg-slate-100' : 'border-slate-200'}`}>
// // // // // //                                     <span className="text-emerald-500 font-bold text-sm pl-2">$</span>
// // // // // //                                     <input 
// // // // // //                                         type="number" 
// // // // // //                                         placeholder="0.00" 
// // // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1 disabled:bg-transparent"
// // // // // //                                         value={withdrawals[`pool_${lvl.level}`] || ""} 
// // // // // //                                         onChange={e => handleInputChange(e, `pool_${lvl.level}`)} 
// // // // // //                                         disabled={isLeader || (!lvl.isDirectMet && !isPromo)} 
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                      ))}
// // // // // //                   </div>

// // // // // //                   <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-center justify-between mt-2 shadow-sm">
// // // // // //                      <p className="text-[10px] text-indigo-800 font-black uppercase tracking-widest m-0">Total Entered Amount</p>
// // // // // //                      <h3 className="text-lg font-black text-indigo-600 m-0">${totalEnteredAmount.toFixed(2)}</h3>
// // // // // //                   </div>

// // // // // //                   <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1 relative">
// // // // // //                       <label className="text-[9px] text-black block mb-1 font-bold uppercase tracking-widest ml-1">SECURITY PASSWORD</label>
// // // // // //                       <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0 }}>
// // // // // //                           <input type="text" name="hidden_username" tabIndex="-1" autoComplete="username" />
// // // // // //                           <input type="password" name="hidden_password" tabIndex="-1" autoComplete="current-password" />
// // // // // //                       </div>
// // // // // //                       <div className="relative">
// // // // // //                           <input 
// // // // // //                             type={showPassword ? "text" : "password"} 
// // // // // //                             autoComplete="new-password"
// // // // // //                             placeholder="Enter Transaction Password" 
// // // // // //                             className="w-full bg-white border border-slate-200 text-slate-800 p-2.5 pr-10 rounded-lg outline-none font-mono text-xs transition-all shadow-inner focus:border-green-400 focus:ring-2 focus:ring-green-100 placeholder-slate-400"
// // // // // //                             value={transactionPassword} 
// // // // // //                             onChange={e => setTransactionPassword(e.target.value)} 
// // // // // //                             disabled={isLeader} 
// // // // // //                           />
// // // // // //                           <button 
// // // // // //                             type="button"
// // // // // //                             onClick={() => setShowPassword(!showPassword)}
// // // // // //                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
// // // // // //                           >
// // // // // //                             {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
// // // // // //                           </button>
// // // // // //                       </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="p-3 border-t border-slate-200 bg-slate-50 z-10 shrink-0">
// // // // // //                   {isLeader ? (
// // // // // //                      <button onClick={onClose} className="w-full py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider">Cancel</button>
// // // // // //                   ) : (
// // // // // //                      <div className="flex gap-2">
// // // // // //                        <button onClick={onClose} className="w-1/3 py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider">Cancel</button>
// // // // // //                        <button 
// // // // // //                          onClick={handlePreWithdrawCheck} 
// // // // // //                          disabled={loading}
// // // // // //                          className="w-2/3 py-2.5 rounded-lg font-black text-[11px] md:text-xs uppercase tracking-widest transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-[0_4px_10px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
// // // // // //                        >
// // // // // //                          {loading ? "CHECKING..." : "WITHDRAW FUNDS"}
// // // // // //                        </button>
// // // // // //                      </div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}

// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default WithdrawalModal;



// // // // // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // // // // import api from "../../api/axios"; 
// // // // // import SuccessModal from "./SuccessModal";
// // // // // import MessageModal from "./MessageModal";
// // // // // import { useAuth } from "../../context/AuthContext";
// // // // // import { Wallet, Zap, Layers, Users, Trophy, X, UserCog, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react"; 
// // // // // import { Link } from "react-router-dom"; 

// // // // // const GLOBAL_POOLS = [
// // // // //   { level: 1,  globalTeam: 20,    reqDirects: 1,  earning: 10   },
// // // // //   { level: 2,  globalTeam: 40,    reqDirects: 2,  earning: 20   },
// // // // //   { level: 3,  globalTeam: 100,   reqDirects: 3,  earning: 40   },
// // // // //   { level: 4,  globalTeam: 200,   reqDirects: 4,  earning: 80   },
// // // // //   { level: 5,  globalTeam: 400,   reqDirects: 5,  earning: 150  },
// // // // //   { level: 6,  globalTeam: 1600,  reqDirects: 6,  earning: 200  },
// // // // //   { level: 7,  globalTeam: 2000,  reqDirects: 8,  earning: 500  }, 
// // // // //   { level: 8,  globalTeam: 3000,  reqDirects: 10, earning: 700  }, 
// // // // //   { level: 9,  globalTeam: 4000,  reqDirects: 12, earning: 1000 }, 
// // // // //   { level: 10, globalTeam: 5000,  reqDirects: 14, earning: 1500 }, 
// // // // //   { level: 11, globalTeam: 7500,  reqDirects: 16, earning: 3000 }, 
// // // // //   { level: 12, globalTeam: 10000, reqDirects: 18, earning: 5000 }  
// // // // // ];

// // // // // const WithdrawalModal = ({ userId, onClose }) => {
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [showPassword, setShowPassword] = useState(false); 
  
// // // // //   const [balances, setBalances] = useState({
// // // // //     walletBalance: 0, direct: 0, level: 0, reward: 0, pool: 0, isUserToppedUp: false
// // // // //   });
  
// // // // //   const [unlockedLevels, setUnlockedLevels] = useState([]);
  
// // // // //   const [withdrawals, setWithdrawals] = useState({
// // // // //     direct: "", level: "", reward: ""
// // // // //   });
  
// // // // //   const [transactionPassword, setTransactionPassword] = useState("");
// // // // //   const [walletAddress, setWalletAddress] = useState(""); 
// // // // //   const [isAddressMissing, setIsAddressMissing] = useState(false);
  
// // // // //   const [confirmData, setConfirmData] = useState(null);
  
// // // // //   const [successOpen, setSuccessOpen] = useState(false);
// // // // //   const [successData, setSuccessData] = useState({ userId: "", userName: "", amount: 0, source: "" });
// // // // //   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

// // // // //   const { user: loggedInUser, token } = useAuth();
// // // // //   const isPromo = loggedInUser?.role === "promo";
// // // // //   const isLeader = loggedInUser?.role === "leader";

// // // // //   const showMessage = (title, message, type = "error") =>
// // // // //     setMessageModal({ open: true, title, message, type });

// // // // //   const fetchData = useCallback(async () => {
// // // // //     try {
// // // // //       const res = await api.get(`/wallet/withdrawable/${userId}`);
// // // // //       const profileRes = await api.get(`/user/${userId}`);

// // // // //       if (res.data) {
// // // // //         setBalances({
// // // // //           walletBalance: Number(res.data.walletBalance) || 0,
// // // // //           direct: Number(res.data.direct) || 0, 
// // // // //           level: Number(res.data.level) || 0,
// // // // //           reward: Number(res.data.reward) || 0,
// // // // //           pool: Number(res.data.pool) || 0,
// // // // //           isUserToppedUp: res.data.isUserToppedUp || false
// // // // //         });
// // // // //       }

// // // // //       const u = profileRes.data?.user || profileRes.data;

// // // // //       if (u) {
// // // // //         const addr = (u.walletAddress || "").trim();
// // // // //         setWalletAddress(addr);
// // // // //         setIsAddressMissing(!addr);

// // // // //         const userGlobal = Number(u.globalTeamCount) || 0;
// // // // //         const userDirects = Number(u.directCount) || 0;
// // // // //         const activePoolsData = u.activePools || []; 
// // // // //         let cumulativeGlobal = 0;
// // // // //         let unlockedLevelsTemp = [];

// // // // //         for (const lvl of GLOBAL_POOLS) {
// // // // //             cumulativeGlobal += lvl.globalTeam;
// // // // //             if (userGlobal >= cumulativeGlobal) {
// // // // //                 unlockedLevelsTemp.push({ 
// // // // //                     ...lvl, 
// // // // //                     isDirectMet: userDirects >= lvl.reqDirects, 
// // // // //                     reqDirects: lvl.reqDirects 
// // // // //                 });
// // // // //             } else {
// // // // //                 break; 
// // // // //             }
// // // // //         }

// // // // //         let boxData = unlockedLevelsTemp.map(lvl => {
// // // // //             const p = activePoolsData.find(ap => Number(ap.level) === Number(lvl.level));
// // // // //             const generated = p ? (Number(p.daysPaid) || 0) * (Number(p.dailyAmount) || 0) : 0;
// // // // //             const withdrawnAmt = p ? (Number(p.withdrawnAmount) || 0) : 0; 
// // // // //             let available = generated - withdrawnAmt;
// // // // //             available = available > 0.01 ? available : 0; 

// // // // //             return { ...lvl, generated, withdrawnAmt, available };
// // // // //         });

// // // // //         setUnlockedLevels(boxData);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Fetch Error:", err);
// // // // //     }
// // // // //   }, [userId]);

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, [fetchData]);

// // // // //   const totalCommunityAvailable = unlockedLevels.reduce((sum, lvl) => {
// // // // //       if (lvl.isDirectMet || isPromo) return sum + lvl.available;
// // // // //       return sum;
// // // // //   }, 0);

// // // // //   const totalAvailableToWithdraw = balances.direct + balances.level + balances.reward + totalCommunityAvailable;
// // // // //   const hasMainIncome = balances.direct > 0 || balances.level > 0 || balances.reward > 0 || totalCommunityAvailable > 0;

// // // // //   const totalEnteredAmount = useMemo(() => {
// // // // //     let sum = 0;
// // // // //     sum += Number(withdrawals.direct) || 0;
// // // // //     sum += Number(withdrawals.level) || 0;
// // // // //     sum += Number(withdrawals.reward) || 0;
// // // // //     Object.keys(withdrawals).forEach(key => {
// // // // //       if (key.startsWith('pool_')) {
// // // // //         sum += Number(withdrawals[key]) || 0;
// // // // //       }
// // // // //     });
// // // // //     return sum;
// // // // //   }, [withdrawals]);

// // // // //   const handleInputChange = (e, source) => {
// // // // //     const value = e.target.value;
// // // // //     if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
// // // // //       setWithdrawals((prev) => ({ ...prev, [source]: value }));
// // // // //     }
// // // // //   };

// // // // //   const handlePreWithdrawCheck = async () => {
// // // // //     if (isLeader) return showMessage("Action Denied", "Leaders cannot withdraw funds directly from here.");
// // // // //     if (!balances.isUserToppedUp && !isPromo) return showMessage("Top-up Required", "You must activate your Node to withdraw funds.");
// // // // //     if (!walletAddress.trim() && isAddressMissing && !isPromo) return showMessage("Address Missing", "Please set your withdrawal address in your Profile first.");

// // // // //     let items = [];
// // // // //     let totalRequested = 0;
// // // // //     let successMessages = [];

// // // // //     const checkAndPush = (sourceName, inputVal, availableBal, displayName) => {
// // // // //         const amt = Number(inputVal);
// // // // //         if (amt > 0) {
// // // // //             if (!isPromo && amt > availableBal) throw new Error(`Insufficient funds in ${displayName}.`);
// // // // //             items.push({ source: sourceName, amount: amt });
// // // // //             totalRequested += amt;
// // // // //             successMessages.push(displayName);
// // // // //         }
// // // // //     };

// // // // //     try {
// // // // //       checkAndPush("direct", withdrawals.direct, balances.direct, "Direct Income");
// // // // //       checkAndPush("level", withdrawals.level, balances.level, "Level Income");
// // // // //       checkAndPush("reward", withdrawals.reward, balances.reward, "Team Reward");

// // // // //       unlockedLevels.forEach(lvl => {
// // // // //         const amt = Number(withdrawals[`pool_${lvl.level}`] || 0);
// // // // //         if (amt > 0) {
// // // // //             if (!lvl.isDirectMet && !isPromo) throw new Error(`Please complete Total ${lvl.reqDirects} Directs to withdraw from Community Lvl ${lvl.level}.`);
// // // // //             if (!isPromo && amt > lvl.available) throw new Error(`Insufficient funds in Level ${lvl.level} Pool.`);
            
// // // // //             items.push({ source: `pool_${lvl.level}`, amount: amt }); 
// // // // //             totalRequested += amt;
// // // // //             successMessages.push(` Lvl ${lvl.level}`);
// // // // //         }
// // // // //       });

// // // // //       if (totalRequested === 0) return showMessage("Warning", "Enter amount to withdraw.");
// // // // //       if (totalRequested % 10 !== 0) return showMessage("Warning", `Amount must be in multiples of $10. Your total is $${totalRequested}.`);
// // // // //       if (!isPromo && totalRequested < 10) return showMessage("Warning", "Minimum total withdrawal amount is $10.");
// // // // //       if (!transactionPassword.trim()) return showMessage("Warning", "Enter transaction password.");

// // // // //       setLoading(true);
// // // // //       const endpoint = isPromo ? "/wallet/promo-withdraw" : "/wallet/withdraw";

// // // // //       // 📡 API CALL FOR PRE-CHECK (dryRun: true)
// // // // //       const response = await api.post(endpoint, {
// // // // //         transactionPassword, items, dryRun: true 
// // // // //       }, { headers: { Authorization: `Bearer ${token}` } });
      
// // // // //       const rep = response.data.report;

// // // // //       // 🔥 NAYA UPDATE: Yahan Backend ke saare data wapas map kiye taaki user ko saari details Confirm Screen par dikhen
// // // // //       setConfirmData({
// // // // //         items,
// // // // //         totalRequested: rep.totalRequested,
// // // // //         totalFeeDeducted: rep.totalFeeDeducted,
// // // // //         expectedUSDT: rep.totalNetUSDT,
// // // // //         expectedTopup: rep.totalToTopupWallet, 
// // // // //         teamSizeTracked: rep.teamSizeTracked,
// // // // //         communityPercentage: rep.communityPercentage,
// // // // //         sources: [...new Set(successMessages)].join(", ")
// // // // //       });

// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       let errorMsg = "Calculation failed.";
// // // // //       if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // //       else if (err.message) errorMsg = err.message;
      
// // // // //       if (err.response?.status === 403) errorMsg = "Invalid Transaction Password";
      
// // // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // // //       } else {
// // // // //         // Level Target ka EXACT error yahan dikhega!
// // // // //         showMessage("Validation Error", errorMsg, "error");
// // // // //       }
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const proceedWithdrawal = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const endpoint = isPromo ? "/wallet/promo-withdraw" : "/wallet/withdraw";

// // // // //       // 📡 API CALL FOR REAL DEDUCTION (dryRun = false)
// // // // //       const response = await api.post(endpoint, {
// // // // //         transactionPassword, items: confirmData.items, dryRun: false 
// // // // //       }, { headers: { Authorization: `Bearer ${token}` } });
      
// // // // //       const finalUserId = (isPromo && response.data.generatedId) ? response.data.generatedId : userId;
// // // // //       const finalUserName = isPromo ? (response.data.name || "Demo User") : (loggedInUser?.name || "");

// // // // //       setSuccessData({ 
// // // // //         userId: finalUserId, 
// // // // //         userName: finalUserName, 
// // // // //         amount: confirmData.totalRequested, 
// // // // //         source: confirmData.sources 
// // // // //       });
      
// // // // //       setConfirmData(null);
// // // // //       setSuccessOpen(true);
// // // // //       setWithdrawals({ direct: "", level: "", reward: "" }); 
// // // // //       setTransactionPassword("");
// // // // //       await fetchData();

// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       let errorMsg = "Withdrawal failed due to a server error.";
// // // // //       if (err.response && err.response.data && err.response.data.message) errorMsg = err.response.data.message;
// // // // //       else if (err.message) errorMsg = err.message;
      
// // // // //       setConfirmData(null);

// // // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // // //       } else {
// // // // //         showMessage("Withdrawal Error", errorMsg, "error");
// // // // //       }
// // // // //     } finally {
// // // // //       setLoading(false); 
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <style>{`
// // // // //         input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
// // // // //         input[type=number] { -moz-appearance: textfield; }
// // // // //         .custom-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
// // // // //         .custom-scroll::-webkit-scrollbar { width: 4px; }
// // // // //         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
// // // // //       `}</style>

// // // // //       {successOpen && (
// // // // //         <SuccessModal 
// // // // //            isOpen={successOpen} 
// // // // //            onClose={() => { setSuccessOpen(false); onClose(); }} 
// // // // //            type="withdrawal" 
// // // // //            userId={successData.userId} 
// // // // //            userName={successData.userName} 
// // // // //            amount={successData.amount} 
// // // // //            source={successData.source} 
// // // // //         />
// // // // //       )}

// // // // //       {messageModal.open && (
// // // // //          <MessageModal 
// // // // //             isOpen={messageModal.open} 
// // // // //             title={messageModal.title} 
// // // // //             message={<pre className="font-sans whitespace-pre-wrap text-[12px] text-center text-slate-700">{messageModal.message}</pre>} 
// // // // //             type={messageModal.type} 
// // // // //             onClose={() => setMessageModal({ ...messageModal, open: false })} 
// // // // //          />
// // // // //       )}

// // // // //       {!successOpen && (
// // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
          
// // // // //           <div className="bg-white w-full max-w-[480px] rounded-[20px] border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] relative overflow-hidden animate-in zoom-in duration-300">
            
// // // // //             <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[50px] pointer-events-none rounded-full"></div>

// // // // //             {/* Header */}
// // // // //             <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center z-10 shrink-0">
// // // // //               <h2 className="text-[12px] md:text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 m-0">
// // // // //                 <div className="bg-green-100 p-1.5 rounded-lg">
// // // // //                   <Wallet size={14} className="text-green-600" /> 
// // // // //                 </div>
// // // // //                 Withdraw Funds
// // // // //               </h2>
// // // // //               <button onClick={() => confirmData ? setConfirmData(null) : onClose()} className="group bg-white hover:bg-red-50 p-1.5 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// // // // //                  <X size={16} className="text-slate-400 group-hover:text-red-500" />
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* 🔥 CONFIRMATION SCREEN (Are you sure?) */}
// // // // //             {confirmData ? (
// // // // //               <div className="p-5 flex flex-col gap-4 bg-white relative z-10 text-center animate-in fade-in duration-300">
// // // // //                   <div className="mx-auto bg-amber-100 p-3 rounded-full mb-2">
// // // // //                       <AlertTriangle size={32} className="text-amber-600" />
// // // // //                   </div>
// // // // //                   <h3 className="text-xl font-black text-slate-800">Review Withdrawal</h3>
// // // // //                   <p className="text-xs text-slate-500 font-bold px-4">Please review your withdrawal split based on your eligible downline team size.</p>
                  
// // // // //                   {/* 🔥 UPDATED: Ye box ab Backend se aaye hue Team Size aur Percentage ke hisaab se dikhayega */}
// // // // //                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3 mt-2">
// // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Requested Amount</span>
// // // // //                           <span className="font-black text-slate-800">${confirmData.totalRequested.toFixed(2)}</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processing Fee (10%)</span>
// // // // //                           <span className="font-black text-red-500">-${confirmData.totalFeeDeducted.toFixed(2)}</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Eligible Total Team</span>
// // // // //                           <span className="font-black text-blue-600">{confirmData.teamSizeTracked} Members ({confirmData.communityPercentage}%)</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between items-center border-b border-slate-200 pb-2">
// // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">To USDT Wallet</span>
// // // // //                           <span className="font-black text-emerald-600">${confirmData.expectedUSDT.toFixed(2)}</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between items-center pt-1">
// // // // //                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">To Top-up Wallet</span>
// // // // //                           <span className="font-black text-purple-600">${confirmData.expectedTopup.toFixed(2)}</span>
// // // // //                       </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-3 mt-4">
// // // // //                      <button 
// // // // //                        onClick={() => setConfirmData(null)} 
// // // // //                        disabled={loading}
// // // // //                        className="w-1/2 py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors uppercase tracking-wider"
// // // // //                      >
// // // // //                         Cancel
// // // // //                      </button>
// // // // //                      <button 
// // // // //                        onClick={proceedWithdrawal} 
// // // // //                        disabled={loading} 
// // // // //                        className="w-1/2 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg flex justify-center items-center gap-2"
// // // // //                      >
// // // // //                        {loading ? "PROCESSING..." : <><CheckCircle2 size={16}/> Confirm</>}
// // // // //                      </button>
// // // // //                   </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               /* 🔥 REGULAR INPUT SCREEN */
// // // // //               <>
// // // // //                 <div className="p-3 overflow-y-auto custom-scroll flex-1 flex flex-col gap-3 bg-white relative z-10">
                  
// // // // //                   <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
// // // // //                      <div className="text-right w-full">
// // // // //                         <p className="text-black text-[9px] font-bold uppercase tracking-widest">Withdrawable Balance</p>
// // // // //                         <h3 className="text-xl font-black text-emerald-600">${totalAvailableToWithdraw.toFixed(2)}</h3>
// // // // //                      </div>
// // // // //                   </div>

// // // // //                   {isAddressMissing && !isPromo ? (
// // // // //                     <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
// // // // //                       <p className="text-[10px] md:text-xs text-red-700 font-bold m-0 w-3/5"> No withdrawal address found! You must set it before withdrawing.</p>
// // // // //                       <Link 
// // // // //                         to="/profile" 
// // // // //                         onClick={onClose}
// // // // //                         className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors whitespace-nowrap"
// // // // //                       >
// // // // //                         <UserCog size={12} /> Go To Profile
// // // // //                       </Link>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex flex-col">
// // // // //                       <p className="text-[9px] text-emerald-800 font-bold uppercase tracking-widest mb-0.5">Your Saved Address</p>
// // // // //                       <p className="text-xs font-mono text-emerald-600 font-black truncate">{isPromo ? "Wallet Address (Demo)" : walletAddress}</p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* MAIN INCOMES */}
// // // // //                   {(hasMainIncome || isPromo) && (
// // // // //                       <div className="flex flex-col gap-3">
// // // // //                         {/* DIRECT */}
// // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // //                                     <Zap size={14} className="text-amber-500" /> Direct Income
// // // // //                                 </h3>
// // // // //                             </div>
// // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // //                                     <span className="text-[14px] font-black text-blue-500">${Number(balances.direct).toFixed(2)}</span>
// // // // //                                 </div>
// // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // //                                     <span className="text-amber-500 font-bold text-sm pl-2">$</span>
// // // // //                                     <input 
// // // // //                                         type="number" 
// // // // //                                         placeholder="0.00" 
// // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // //                                         value={withdrawals.direct || ""} 
// // // // //                                         onChange={e => handleInputChange(e, "direct")} 
// // // // //                                         disabled={isLeader} 
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* LEVEL */}
// // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // //                                     <Users size={14} className="text-blue-500" /> Level Income
// // // // //                                 </h3>
// // // // //                             </div>
// // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // //                                 <span className="text-[14px] font-black text-blue-500">
// // // // //   ${(Math.floor(Number(balances.level || 0) * 100) / 100).toFixed(2)}
// // // // // </span>
// // // // //                                 </div>
// // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // //                                     <span className="text-blue-500 font-bold text-sm pl-2">$</span>
// // // // //                                     <input 
// // // // //                                         type="number" 
// // // // //                                         placeholder="0.00" 
// // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // //                                         value={withdrawals.level || ""} 
// // // // //                                         onChange={e => handleInputChange(e, "level")} 
// // // // //                                         disabled={isLeader} 
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* REWARD */}
// // // // //                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
// // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // //                                     <Trophy size={14} className="text-indigo-500" /> Team Reward
// // // // //                                 </h3>
// // // // //                             </div>
// // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // //                                 <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // //                                     <span className="text-[14px] font-black text-blue-500">${Number(balances.reward).toFixed(2)}</span>
// // // // //                                 </div>
// // // // //                                 <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
// // // // //                                     <span className="text-indigo-500 font-bold text-sm pl-2">$</span>
// // // // //                                     <input 
// // // // //                                         type="number" 
// // // // //                                         placeholder="0.00" 
// // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
// // // // //                                         value={withdrawals.reward || ""} 
// // // // //                                         onChange={e => handleInputChange(e, "reward")} 
// // // // //                                         disabled={isLeader} 
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                   )}

// // // // //                   {/* AUTO-POOL BOXES */}
// // // // //                   <div className="flex flex-col gap-3 mt-2">
// // // // //                      {unlockedLevels.length > 0 && (
// // // // //                         <div className="flex justify-between items-center px-1 mt-1">
// // // // //                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Community Levels</span>
// // // // //                          </div>
// // // // //                      )}

// // // // //                      {unlockedLevels.length > 0 && unlockedLevels.map(lvl => (
// // // // //                         <div key={lvl.level} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 relative overflow-hidden">
// // // // //                             <div className="flex justify-between items-center mb-2 px-1">
// // // // //                                 <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
// // // // //                                     <Layers size={14} className="text-emerald-500" /> Community Level {lvl.level}
// // // // //                                     {!lvl.isDirectMet && !isPromo && (
// // // // //                                         <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded ml-2 shadow-sm font-bold"></span>
// // // // //                                     )}
// // // // //                                 </h3>
// // // // //                             </div>
// // // // //                             <div className="flex flex-row gap-1.5 items-stretch">
// // // // //                                 <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // //                                     <span className="text-[11px] font-black text-emerald-600">${lvl.earning}</span>
// // // // //                                 </div>
// // // // //                                 <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
// // // // //                                     <span className="text-[11px] font-black text-purple-500">${lvl.generated.toFixed(2)}</span>
// // // // //                                 </div>
// // // // //                                 <div className={`w-[22%] bg-white p-1 rounded-lg border shadow-sm flex flex-col justify-center items-center ${!lvl.isDirectMet && !isPromo ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
// // // // //                                     <span className={`text-[11px] font-black ${!lvl.isDirectMet && !isPromo ? 'text-red-400 line-through decoration-red-400/50' : 'text-blue-500'}`}>
// // // // //                                         ${lvl.available.toFixed(2)}
// // // // //                                     </span>
// // // // //                                 </div>
// // // // //                                 <div className={`w-[34%] flex items-center gap-1 bg-white p-1 rounded-lg border shadow-inner ${!lvl.isDirectMet && !isPromo ? 'border-red-200 opacity-60 bg-slate-100' : 'border-slate-200'}`}>
// // // // //                                     <span className="text-emerald-500 font-bold text-sm pl-2">$</span>
// // // // //                                     <input 
// // // // //                                         type="number" 
// // // // //                                         placeholder="0.00" 
// // // // //                                         className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1 disabled:bg-transparent"
// // // // //                                         value={withdrawals[`pool_${lvl.level}`] || ""} 
// // // // //                                         onChange={e => handleInputChange(e, `pool_${lvl.level}`)} 
// // // // //                                         disabled={isLeader || (!lvl.isDirectMet && !isPromo)} 
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                      ))}
// // // // //                   </div>

// // // // //                   <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-center justify-between mt-2 shadow-sm">
// // // // //                      <p className="text-[10px] text-indigo-800 font-black uppercase tracking-widest m-0">Total Entered Amount</p>
// // // // //                      <h3 className="text-lg font-black text-indigo-600 m-0">${totalEnteredAmount.toFixed(2)}</h3>
// // // // //                   </div>

// // // // //                   <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1 relative">
// // // // //                       <label className="text-[9px] text-black block mb-1 font-bold uppercase tracking-widest ml-1">SECURITY PASSWORD</label>
// // // // //                       <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0 }}>
// // // // //                           <input type="text" name="hidden_username" tabIndex="-1" autoComplete="username" />
// // // // //                           <input type="password" name="hidden_password" tabIndex="-1" autoComplete="current-password" />
// // // // //                       </div>
// // // // //                       <div className="relative">
// // // // //                           <input 
// // // // //                             type={showPassword ? "text" : "password"} 
// // // // //                             autoComplete="new-password"
// // // // //                             placeholder="Enter Transaction Password" 
// // // // //                             className="w-full bg-white border border-slate-200 text-slate-800 p-2.5 pr-10 rounded-lg outline-none font-mono text-xs transition-all shadow-inner focus:border-green-400 focus:ring-2 focus:ring-green-100 placeholder-slate-400"
// // // // //                             value={transactionPassword} 
// // // // //                             onChange={e => setTransactionPassword(e.target.value)} 
// // // // //                             disabled={isLeader} 
// // // // //                           />
// // // // //                           <button 
// // // // //                             type="button"
// // // // //                             onClick={() => setShowPassword(!showPassword)}
// // // // //                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
// // // // //                           >
// // // // //                             {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
// // // // //                           </button>
// // // // //                       </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="p-3 border-t border-slate-200 bg-slate-50 z-10 shrink-0">
// // // // //                   {isLeader ? (
// // // // //                      <button onClick={onClose} className="w-full py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider">Cancel</button>
// // // // //                   ) : (
// // // // //                      <div className="flex gap-2">
// // // // //                        <button onClick={onClose} className="w-1/3 py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider">Cancel</button>
// // // // //                        <button 
// // // // //                          onClick={handlePreWithdrawCheck} 
// // // // //                          disabled={loading}
// // // // //                          className="w-2/3 py-2.5 rounded-lg font-black text-[11px] md:text-xs uppercase tracking-widest transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-[0_4px_10px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
// // // // //                        >
// // // // //                          {loading ? "CHECKING..." : "WITHDRAW FUNDS"}
// // // // //                        </button>
// // // // //                      </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </>
// // // // //             )}

// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default WithdrawalModal;
 



// // // // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // // // import api from "../../api/axios";
// // // // import SuccessModal from "./SuccessModal";
// // // // import MessageModal from "./MessageModal";
// // // // import { useAuth } from "../../context/AuthContext";
// // // // import {
// // // //   Wallet,
// // // //   Zap,
// // // //   Users,
// // // //   Trophy,
// // // //   X,
// // // //   UserCog,
// // // //   Eye,
// // // //   EyeOff,
// // // //   AlertTriangle,
// // // //   CheckCircle2,
// // // //   ShieldCheck,
// // // //   ArrowRight,
// // // //   Lock,
// // // //   LoaderCircle,
// // // //   Info,
// // // // } from "lucide-react";
// // // // import { Link } from "react-router-dom";

// // // // const WithdrawalModal = ({ userId, onClose }) => {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showPassword, setShowPassword] = useState(false);

// // // //   const [balances, setBalances] = useState({
// // // //     walletBalance: 0,
// // // //     direct: 0,
// // // //     level: 0,
// // // //     reward: 0,
// // // //     isUserToppedUp: false,
// // // //   });

// // // //   const [withdrawals, setWithdrawals] = useState({
// // // //     direct: "",
// // // //     level: "",
// // // //     reward: "",
// // // //   });

// // // //   const [transactionPassword, setTransactionPassword] = useState("");
// // // //   const [walletAddress, setWalletAddress] = useState("");
// // // //   const [isAddressMissing, setIsAddressMissing] = useState(false);

// // // //   const [confirmData, setConfirmData] = useState(null);

// // // //   const [successOpen, setSuccessOpen] = useState(false);
// // // //   const [successData, setSuccessData] = useState({
// // // //     userId: "",
// // // //     userName: "",
// // // //     amount: 0,
// // // //     source: "",
// // // //   });

// // // //   const [messageModal, setMessageModal] = useState({
// // // //     open: false,
// // // //     title: "",
// // // //     message: "",
// // // //     type: "info",
// // // //   });

// // // //   const { user: loggedInUser, token } = useAuth();

// // // //   const isPromo = loggedInUser?.role === "promo";
// // // //   const isLeader = loggedInUser?.role === "leader";

// // // //   const showMessage = (title, message, type = "error") => {
// // // //     setMessageModal({
// // // //       open: true,
// // // //       title,
// // // //       message,
// // // //       type,
// // // //     });
// // // //   };

// // // //   // Fetch withdrawable balance and user profile
// // // //   const fetchData = useCallback(async () => {
// // // //     try {
// // // //       const [res, profileRes] = await Promise.all([
// // // //         api.get(`/wallet/withdrawable/${userId}`, {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         }),
// // // //         api.get(`/user/${userId}`, {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         }),
// // // //       ]);

// // // //       if (res.data) {
// // // //         setBalances({
// // // //           walletBalance: Number(res.data.walletBalance) || 0,
// // // //           direct: Number(res.data.direct) || 0,
// // // //           level: Number(res.data.level) || 0,
// // // //           reward: Number(res.data.reward) || 0,
// // // //           isUserToppedUp: res.data.isUserToppedUp || false,
// // // //         });
// // // //       }

// // // //       const u = profileRes.data?.user || profileRes.data;

// // // //       if (u) {
// // // //         const addr = (u.walletAddress || "").trim();
// // // //         setWalletAddress(addr);
// // // //         setIsAddressMissing(!addr);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Fetch Error:", err);
// // // //       showMessage(
// // // //         "Loading Error",
// // // //         err.response?.data?.message || "Unable to load withdrawal details.",
// // // //         "error"
// // // //       );
// // // //     }
// // // //   }, [userId, token]);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [fetchData]);

// // // //   // Only the three supported income sources are included.
// // // //   const totalAvailableToWithdraw =
// // // //     balances.direct + balances.level + balances.reward;

// // // //   const hasMainIncome =
// // // //     balances.direct > 0 ||
// // // //     balances.level > 0 ||
// // // //     balances.reward > 0;

// // // //   const totalEnteredAmount = useMemo(() => {
// // // //     return (
// // // //       (Number(withdrawals.direct) || 0) +
// // // //       (Number(withdrawals.level) || 0) +
// // // //       (Number(withdrawals.reward) || 0)
// // // //     );
// // // //   }, [withdrawals]);

// // // //   const handleInputChange = (e, source) => {
// // // //     const value = e.target.value;

// // // //     if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
// // // //       setWithdrawals((prev) => ({
// // // //         ...prev,
// // // //         [source]: value,
// // // //       }));
// // // //     }
// // // //   };

// // // //   // First step: validate and calculate withdrawal
// // // //   const handlePreWithdrawCheck = async () => {
// // // //     if (loading) return;

// // // //     if (isLeader) {
// // // //       return showMessage(
// // // //         "Action Denied",
// // // //         "Leaders cannot withdraw funds directly from here.",
// // // //         "warning"
// // // //       );
// // // //     }

// // // //     if (!balances.isUserToppedUp && !isPromo) {
// // // //       return showMessage(
// // // //         "Top-up Required",
// // // //         "You must activate your  to withdraw funds.",
// // // //         "warning"
// // // //       );
// // // //     }

// // // //     if (!walletAddress.trim() && isAddressMissing && !isPromo) {
// // // //       return showMessage(
// // // //         "Address Missing",
// // // //         "Please set your withdrawal address in your Profile first.",
// // // //         "warning"
// // // //       );
// // // //     }

// // // //     const items = [];
// // // //     let totalRequested = 0;
// // // //     const successMessages = [];

// // // //     const checkAndPush = (
// // // //       sourceName,
// // // //       inputVal,
// // // //       availableBal,
// // // //       displayName
// // // //     ) => {
// // // //       const amt = Number(inputVal);

// // // //       if (amt > 0) {
// // // //         if (!isPromo && amt > availableBal) {
// // // //           throw new Error(`Insufficient funds in ${displayName}.`);
// // // //         }

// // // //         items.push({
// // // //           source: sourceName,
// // // //           amount: amt,
// // // //         });

// // // //         totalRequested += amt;
// // // //         successMessages.push(displayName);
// // // //       }
// // // //     };

// // // //     try {
// // // //       checkAndPush(
// // // //         "direct",
// // // //         withdrawals.direct,
// // // //         balances.direct,
// // // //         "Direct Income"
// // // //       );

// // // //       checkAndPush(
// // // //         "level",
// // // //         withdrawals.level,
// // // //         balances.level,
// // // //         "Level Income"
// // // //       );

// // // //       checkAndPush(
// // // //         "reward",
// // // //         withdrawals.reward,
// // // //         balances.reward,
// // // //         "Royalty Earning"
// // // //       );

// // // //       if (totalRequested === 0) {
// // // //         return showMessage(
// // // //           "Amount Required",
// // // //           "Please enter an amount to withdraw.",
// // // //           "warning"
// // // //         );
// // // //       }

// // // //       if (totalRequested % 10 !== 0) {
// // // //         return showMessage(
// // // //           "Invalid Amount",
// // // //           `Amount must be in multiples of $10. Your total is $${totalRequested.toFixed(2)}.`,
// // // //           "warning"
// // // //         );
// // // //       }

// // // //       if (!isPromo && totalRequested < 10) {
// // // //         return showMessage(
// // // //           "Minimum Withdrawal",
// // // //           "Minimum total withdrawal amount is $10.",
// // // //           "warning"
// // // //         );
// // // //       }

// // // //       if (!transactionPassword.trim()) {
// // // //         return showMessage(
// // // //           "Password Required",
// // // //           "Please enter your transaction password.",
// // // //           "warning"
// // // //         );
// // // //       }

// // // //       setLoading(true);

// // // //       const endpoint = isPromo
// // // //         ? "/wallet/promo-withdraw"
// // // //         : "/wallet/withdraw";

// // // //       // Backend dry-run calculation
// // // //       const response = await api.post(
// // // //         endpoint,
// // // //         {
// // // //           transactionPassword,
// // // //           items,
// // // //           dryRun: true,
// // // //         },
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );

// // // //       const rep = response.data.report;

// // // //       setConfirmData({
// // // //         items,
// // // //         totalRequested: Number(rep.totalRequested) || 0,
// // // //         totalFeeDeducted: Number(rep.totalFeeDeducted) || 0,
// // // //         expectedUSDT: Number(rep.totalNetUSDT) || 0,
// // // //         expectedTopup: Number(rep.totalToTopupWallet) || 0,
// // // //         teamSizeTracked: Number(rep.teamSizeTracked) || 0,
// // // //         communityPercentage: Number(rep.communityPercentage) || 0,
// // // //         sources: [...new Set(successMessages)].join(", "),
// // // //       });
// // // //     } catch (err) {
// // // //       console.error(err);

// // // //       let errorMsg = "Calculation failed.";

// // // //       if (err.response?.data?.message) {
// // // //         errorMsg = err.response.data.message;
// // // //       } else if (err.message) {
// // // //         errorMsg = err.message;
// // // //       }

// // // //       if (err.response?.status === 403) {
// // // //         errorMsg = "Invalid Transaction Password";
// // // //       }

// // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // //       } else {
// // // //         showMessage("Validation Error", errorMsg, "error");
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Second step: actual withdrawal
// // // //   const proceedWithdrawal = async () => {
// // // //     if (!confirmData || loading) return;

// // // //     try {
// // // //       setLoading(true);

// // // //       const endpoint = isPromo
// // // //         ? "/wallet/promo-withdraw"
// // // //         : "/wallet/withdraw";

// // // //       const response = await api.post(
// // // //         endpoint,
// // // //         {
// // // //           transactionPassword,
// // // //           items: confirmData.items,
// // // //           dryRun: false,
// // // //         },
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );

// // // //       const finalUserId =
// // // //         isPromo && response.data.generatedId
// // // //           ? response.data.generatedId
// // // //           : userId;

// // // //       const finalUserName = isPromo
// // // //         ? response.data.name || "Demo User"
// // // //         : loggedInUser?.name || "";

// // // //       setSuccessData({
// // // //         userId: finalUserId,
// // // //         userName: finalUserName,
// // // //         amount: confirmData.totalRequested,
// // // //         source: confirmData.sources,
// // // //       });

// // // //       setConfirmData(null);
// // // //       setSuccessOpen(true);

// // // //       setWithdrawals({
// // // //         direct: "",
// // // //         level: "",
// // // //         reward: "",
// // // //       });

// // // //       setTransactionPassword("");

// // // //       await fetchData();
// // // //     } catch (err) {
// // // //       console.error(err);

// // // //       let errorMsg = "Withdrawal failed due to a server error.";

// // // //       if (err.response?.data?.message) {
// // // //         errorMsg = err.response.data.message;
// // // //       } else if (err.message) {
// // // //         errorMsg = err.message;
// // // //       }

// // // //       setConfirmData(null);

// // // //       if (errorMsg.toLowerCase().includes("once in a month")) {
// // // //         showMessage("Withdrawal Notice", errorMsg, "info");
// // // //       } else {
// // // //         showMessage("Withdrawal Error", errorMsg, "error");
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const closeSuccess = () => {
// // // //     setSuccessOpen(false);
// // // //     onClose();
// // // //   };

// // // //   const formatMoney = (value) =>
// // // //     (Number(value) || 0).toFixed(2);

// // // //   const incomeCards = [
// // // //     {
// // // //       key: "direct",
// // // //       title: "Direct Income",
// // // //       icon: <Zap size={17} />,
// // // //       color: "#b88922",
// // // //       balance: balances.direct,
// // // //     },
// // // //     {
// // // //       key: "level",
// // // //       title: "Level Income",
// // // //       icon: <Users size={17} />,
// // // //       color: "#2876b8",
// // // //       balance: balances.level,
// // // //     },
// // // //     {
// // // //       key: "reward",
// // // //       title: "Team Reward",
// // // //       icon: <Trophy size={17} />,
// // // //       color: "#8161c5",
// // // //       balance: balances.reward,
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .hp-withdraw-overlay {
// // // //           --hp-green: #08783f;
// // // //           --hp-dark: #07552e;
// // // //           --hp-gold: #e3bd50;
// // // //           position: fixed;
// // // //           inset: 0;
// // // //           z-index: 1000;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           padding: 12px;
// // // //           overflow-y: auto;
// // // //           background: rgba(5, 25, 15, .68);
// // // //           backdrop-filter: blur(5px);
// // // //           font-family: Inter, Arial, sans-serif;
// // // //           animation: hpWithdrawFade .2s ease-out;
// // // //         }

// // // //         .hp-withdraw-overlay * {
// // // //           box-sizing: border-box;
// // // //         }

// // // //         .hp-withdraw-modal {
// // // //           width: 100%;
// // // //           max-width: 470px;
// // // //           max-height: 92vh;
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           overflow: hidden;
// // // //           border: 1px solid #dce9dc;
// // // //           border-radius: 18px;
// // // //           background: white;
// // // //           box-shadow: 0 22px 65px #0003;
// // // //           animation: hpWithdrawPop .25s ease-out;
// // // //         }

// // // //         .hp-withdraw-header {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 10px;
// // // //           padding: 13px 16px;
// // // //           border-bottom: 3px solid var(--hp-gold);
// // // //           background: linear-gradient(110deg, #07552e, #087b43);
// // // //           flex-shrink: 0;
// // // //         }

// // // //         .hp-withdraw-heading {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 10px;
// // // //         }

// // // //         .hp-withdraw-icon {
// // // //           display: grid;
// // // //           place-items: center;
// // // //           width: 38px;
// // // //           height: 38px;
// // // //           border: 1px solid #ffffff40;
// // // //           border-radius: 11px;
// // // //           background: #ffffff15;
// // // //           color: #ffdf78;
// // // //         }

// // // //         .hp-withdraw-title {
// // // //           margin: 0;
// // // //           color: white;
// // // //           font-size: 14px;
// // // //           font-weight: 950;
// // // //           letter-spacing: .5px;
// // // //         }

// // // //         .hp-withdraw-subtitle {
// // // //           margin-top: 3px;
// // // //           color: #d5ead9;
// // // //           font-size: 9px;
// // // //           font-weight: 750;
// // // //           letter-spacing: .8px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-close {
// // // //           display: grid;
// // // //           place-items: center;
// // // //           width: 31px;
// // // //           height: 31px;
// // // //           border: 1px solid #ffffff35;
// // // //           border-radius: 9px;
// // // //           background: #ffffff12;
// // // //           color: white;
// // // //           cursor: pointer;
// // // //           transition: .2s;
// // // //         }

// // // //         .hp-withdraw-close:hover {
// // // //           background: #ffffff28;
// // // //           transform: rotate(90deg);
// // // //         }

// // // //         .hp-withdraw-body {
// // // //           flex: 1;
// // // //           min-height: 0;
// // // //           padding: 14px;
// // // //           overflow-y: auto;
// // // //           background: #fff;
// // // //           scrollbar-width: thin;
// // // //           scrollbar-color: #c6d9c8 transparent;
// // // //         }

// // // //         .hp-withdraw-summary {
// // // //           padding: 15px;
// // // //           border: 1px solid #d4e8d1;
// // // //           border-radius: 13px;
// // // //           background: linear-gradient(115deg, #eff9ed, #fbfcf5);
// // // //         }

// // // //         .hp-withdraw-summary-label {
// // // //           color: #56805d;
// // // //           font-size: 9px;
// // // //           font-weight: 950;
// // // //           letter-spacing: 1px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-summary-amount {
// // // //           margin-top: 5px;
// // // //           color: #08783f;
// // // //           font-family: monospace;
// // // //           font-size: 27px;
// // // //           font-weight: 950;
// // // //           letter-spacing: -1px;
// // // //         }

// // // //         .hp-withdraw-summary-note {
// // // //           margin-top: 3px;
// // // //           color: #78917d;
// // // //           font-size: 9px;
// // // //           font-weight: 700;
// // // //         }

// // // //         .hp-withdraw-address {
// // // //           margin-top: 11px;
// // // //           padding: 11px 12px;
// // // //           border: 1px solid #dce9dc;
// // // //           border-radius: 10px;
// // // //           background: #f8fbf7;
// // // //         }

// // // //         .hp-withdraw-address-label {
// // // //           margin-bottom: 5px;
// // // //           color: #637c68;
// // // //           font-size: 8px;
// // // //           font-weight: 950;
// // // //           letter-spacing: .9px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-address-value {
// // // //           color: #17613a;
// // // //           font-family: monospace;
// // // //           font-size: 10px;
// // // //           font-weight: 850;
// // // //           overflow-wrap: anywhere;
// // // //         }

// // // //         .hp-withdraw-warning {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 10px;
// // // //           margin-top: 11px;
// // // //           padding: 11px;
// // // //           border: 1px solid #f1cccc;
// // // //           border-radius: 10px;
// // // //           background: #fff5f4;
// // // //           color: #a63d3d;
// // // //           font-size: 10px;
// // // //           font-weight: 750;
// // // //         }

// // // //         .hp-withdraw-profile-link {
// // // //           display: inline-flex;
// // // //           align-items: center;
// // // //           gap: 5px;
// // // //           padding: 7px 9px;
// // // //           border-radius: 8px;
// // // //           background: #b63c36;
// // // //           color: white;
// // // //           font-size: 9px;
// // // //           font-weight: 950;
// // // //           text-decoration: none;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-withdraw-section-title {
// // // //           margin: 17px 0 9px;
// // // //           color: #244a31;
// // // //           font-size: 10px;
// // // //           font-weight: 950;
// // // //           letter-spacing: 1px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-income-card {
// // // //           margin-bottom: 9px;
// // // //           padding: 11px;
// // // //           border: 1px solid #e1eae0;
// // // //           border-radius: 11px;
// // // //           background: #fbfdf9;
// // // //           transition: .2s;
// // // //         }

// // // //         .hp-withdraw-income-card:focus-within {
// // // //           border-color: #94c99b;
// // // //           box-shadow: 0 0 0 3px #08783f0d;
// // // //         }

// // // //         .hp-withdraw-income-head {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 8px;
// // // //           margin-bottom: 9px;
// // // //         }

// // // //         .hp-withdraw-income-name {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 7px;
// // // //           color: #31543a;
// // // //           font-size: 10px;
// // // //           font-weight: 950;
// // // //           text-transform: uppercase;
// // // //           letter-spacing: .5px;
// // // //         }

// // // //         .hp-withdraw-income-available {
// // // //           color: #08783f;
// // // //           font-family: monospace;
// // // //           font-size: 12px;
// // // //           font-weight: 950;
// // // //         }

// // // //         .hp-withdraw-input-row {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 8px;
// // // //         }

// // // //         .hp-withdraw-input-label {
// // // //           color: #819083;
// // // //           font-size: 8px;
// // // //           font-weight: 850;
// // // //           white-space: nowrap;
// // // //         }

// // // //         .hp-withdraw-amount-input {
// // // //           width: 100%;
// // // //           min-width: 0;
// // // //           height: 38px;
// // // //           padding: 0 10px;
// // // //           border: 1px solid #dce8dc;
// // // //           border-radius: 8px;
// // // //           outline: none;
// // // //           background: white;
// // // //           color: #21482f;
// // // //           font-family: monospace;
// // // //           font-size: 12px;
// // // //           font-weight: 850;
// // // //           transition: .2s;
// // // //         }

// // // //         .hp-withdraw-amount-input:focus {
// // // //           border-color: #0b8748;
// // // //           box-shadow: 0 0 0 3px #08783f12;
// // // //         }

// // // //         .hp-withdraw-amount-input:disabled {
// // // //           background: #f0f2ef;
// // // //           cursor: not-allowed;
// // // //         }

// // // //         .hp-withdraw-total {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 10px;
// // // //           margin-top: 12px;
// // // //           padding: 12px;
// // // //           border: 1px solid #e5d59d;
// // // //           border-radius: 10px;
// // // //           background: #fff9e9;
// // // //         }

// // // //         .hp-withdraw-total-label {
// // // //           color: #85671e;
// // // //           font-size: 9px;
// // // //           font-weight: 950;
// // // //           letter-spacing: .7px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-total-value {
// // // //           color: #88651b;
// // // //           font-family: monospace;
// // // //           font-size: 18px;
// // // //           font-weight: 950;
// // // //         }

// // // //         .hp-withdraw-security {
// // // //           margin-top: 13px;
// // // //           padding: 11px;
// // // //           border: 1px solid #e0e9df;
// // // //           border-radius: 10px;
// // // //           background: #f8fbf7;
// // // //         }

// // // //         .hp-withdraw-label {
// // // //           display: block;
// // // //           margin: 0 0 7px 2px;
// // // //           color: #526b59;
// // // //           font-size: 9px;
// // // //           font-weight: 950;
// // // //           letter-spacing: .7px;
// // // //           text-transform: uppercase;
// // // //         }

// // // //         .hp-withdraw-password-wrap {
// // // //           position: relative;
// // // //         }

// // // //         .hp-withdraw-password {
// // // //           width: 100%;
// // // //           height: 41px;
// // // //           padding: 0 42px 0 36px;
// // // //           border: 1px solid #dce8dc;
// // // //           border-radius: 9px;
// // // //           outline: none;
// // // //           background: white;
// // // //           color: #21482f;
// // // //           font-family: monospace;
// // // //           font-size: 11px;
// // // //           font-weight: 750;
// // // //         }

// // // //         .hp-withdraw-password:focus {
// // // //           border-color: #0b8748;
// // // //           box-shadow: 0 0 0 3px #08783f12;
// // // //         }

// // // //         .hp-withdraw-password-icon {
// // // //           position: absolute;
// // // //           top: 50%;
// // // //           left: 11px;
// // // //           display: flex;
// // // //           color: #829586;
// // // //           transform: translateY(-50%);
// // // //           pointer-events: none;
// // // //         }

// // // //         .hp-withdraw-eye {
// // // //           position: absolute;
// // // //           top: 50%;
// // // //           right: 10px;
// // // //           display: flex;
// // // //           border: 0;
// // // //           background: transparent;
// // // //           color: #829586;
// // // //           cursor: pointer;
// // // //           transform: translateY(-50%);
// // // //         }

// // // //         .hp-withdraw-footer {
// // // //           display: flex;
// // // //           gap: 9px;
// // // //           padding: 12px 14px;
// // // //           border-top: 1px solid #e5eee4;
// // // //           background: #f8fbf7;
// // // //           flex-shrink: 0;
// // // //         }

// // // //         .hp-withdraw-btn {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           gap: 7px;
// // // //           min-height: 42px;
// // // //           border-radius: 9px;
// // // //           font-size: 10px;
// // // //           font-weight: 950;
// // // //           letter-spacing: .6px;
// // // //           text-transform: uppercase;
// // // //           cursor: pointer;
// // // //           transition: .2s;
// // // //         }

// // // //         .hp-withdraw-btn-cancel {
// // // //           width: 34%;
// // // //           border: 1px solid #dce5dc;
// // // //           background: white;
// // // //           color: #65776a;
// // // //         }

// // // //         .hp-withdraw-btn-cancel:hover {
// // // //           background: #f0f4ef;
// // // //         }

// // // //         .hp-withdraw-btn-submit {
// // // //           flex: 1;
// // // //           border: 1px solid #d7b84e;
// // // //           background: linear-gradient(105deg, #087b43, #07552e);
// // // //           color: white;
// // // //           box-shadow: 0 4px 12px #08783f22;
// // // //         }

// // // //         .hp-withdraw-btn-submit:hover:not(:disabled) {
// // // //           transform: translateY(-1px);
// // // //           box-shadow: 0 6px 16px #08783f35;
// // // //         }

// // // //         .hp-withdraw-btn-submit:disabled {
// // // //           border-color: #dce5dc;
// // // //           background: #e8eee8;
// // // //           color: #92a095;
// // // //           box-shadow: none;
// // // //           cursor: not-allowed;
// // // //         }

// // // //         .hp-withdraw-confirm {
// // // //           padding: 18px;
// // // //           overflow-y: auto;
// // // //           text-align: center;
// // // //           background: white;
// // // //         }

// // // //         .hp-withdraw-confirm-icon {
// // // //           display: grid;
// // // //           place-items: center;
// // // //           width: 56px;
// // // //           height: 56px;
// // // //           margin: 0 auto 11px;
// // // //           border: 1px solid #f0dca3;
// // // //           border-radius: 50%;
// // // //           background: #fff7df;
// // // //           color: #aa811e;
// // // //         }

// // // //         .hp-withdraw-confirm-title {
// // // //           margin: 0;
// // // //           color: #17472a;
// // // //           font-size: 19px;
// // // //           font-weight: 950;
// // // //         }

// // // //         .hp-withdraw-confirm-desc {
// // // //           margin: 7px auto 15px;
// // // //           max-width: 300px;
// // // //           color: #7d8c80;
// // // //           font-size: 10px;
// // // //           line-height: 1.6;
// // // //           font-weight: 650;
// // // //         }

// // // //         .hp-withdraw-report {
// // // //           padding: 13px;
// // // //           border: 1px solid #e0e9df;
// // // //           border-radius: 12px;
// // // //           background: #f9fcf8;
// // // //           text-align: left;
// // // //         }

// // // //         .hp-withdraw-report-row {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: space-between;
// // // //           gap: 10px;
// // // //           padding: 10px 0;
// // // //           border-bottom: 1px solid #e7eee5;
// // // //         }

// // // //         .hp-withdraw-report-row:first-child {
// // // //           padding-top: 0;
// // // //         }

// // // //         .hp-withdraw-report-row:last-child {
// // // //           padding-bottom: 0;
// // // //           border-bottom: 0;
// // // //         }

// // // //         .hp-withdraw-report-label {
// // // //           color: #718174;
// // // //           font-size: 9px;
// // // //           font-weight: 850;
// // // //           text-transform: uppercase;
// // // //           letter-spacing: .4px;
// // // //         }

// // // //         .hp-withdraw-report-value {
// // // //           color: #244a31;
// // // //           font-family: monospace;
// // // //           font-size: 12px;
// // // //           font-weight: 950;
// // // //           text-align: right;
// // // //         }

// // // //         .hp-withdraw-confirm-actions {
// // // //           display: flex;
// // // //           gap: 9px;
// // // //           margin-top: 15px;
// // // //         }

// // // //         .hp-withdraw-confirm-actions button {
// // // //           flex: 1;
// // // //         }

// // // //         @keyframes hpWithdrawFade {
// // // //           from { opacity: 0; }
// // // //           to { opacity: 1; }
// // // //         }

// // // //         @keyframes hpWithdrawPop {
// // // //           from {
// // // //             opacity: 0;
// // // //             transform: translateY(12px) scale(.97);
// // // //           }
// // // //           to {
// // // //             opacity: 1;
// // // //             transform: translateY(0) scale(1);
// // // //           }
// // // //         }

// // // //         @media (max-width: 420px) {
// // // //           .hp-withdraw-overlay {
// // // //             padding: 8px;
// // // //           }

// // // //           .hp-withdraw-modal {
// // // //             max-height: 95vh;
// // // //             border-radius: 15px;
// // // //           }

// // // //           .hp-withdraw-header {
// // // //             padding: 11px 12px;
// // // //           }

// // // //           .hp-withdraw-body {
// // // //             padding: 11px;
// // // //           }

// // // //           .hp-withdraw-footer {
// // // //             padding: 10px 11px;
// // // //           }

// // // //           .hp-withdraw-confirm {
// // // //             padding: 14px;
// // // //           }
// // // //         }

// // // //         @media (prefers-reduced-motion: reduce) {
// // // //           .hp-withdraw-overlay,
// // // //           .hp-withdraw-modal {
// // // //             animation: none;
// // // //           }
// // // //         }
// // // //       `}</style>

// // // //       {!successOpen && (
// // // //         <div className="hp-withdraw-overlay">
// // // //           <div className="hp-withdraw-modal">
// // // //             {/* Header */}
// // // //             <div className="hp-withdraw-header">
// // // //               <div className="hp-withdraw-heading">
// // // //                 <div className="hp-withdraw-icon">
// // // //                   <Wallet size={19} />
// // // //                 </div>

// // // //                 <div>
// // // //                   <h2 className="hp-withdraw-title">
// // // //                     Withdraw Funds
// // // //                   </h2>
// // // //                   <div className="hp-withdraw-subtitle">
// // // //                     Secure Wallet Withdrawal
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() =>
// // // //                   confirmData ? setConfirmData(null) : onClose()
// // // //                 }
// // // //                 className="hp-withdraw-close"
// // // //                 aria-label="Close"
// // // //                 disabled={loading}
// // // //               >
// // // //                 <X size={17} />
// // // //               </button>
// // // //             </div>

// // // //             {/* Confirmation screen */}
// // // //             {confirmData ? (
// // // //               <div className="hp-withdraw-confirm">
// // // //                 <div className="hp-withdraw-confirm-icon">
// // // //                   <AlertTriangle size={27} />
// // // //                 </div>

// // // //                 <h3 className="hp-withdraw-confirm-title">
// // // //                   Review Withdrawal
// // // //                 </h3>

// // // //                 <p className="hp-withdraw-confirm-desc">
// // // //                   Please review your withdrawal details carefully before
// // // //                   confirming the transaction.
// // // //                 </p>

// // // //                 <div className="hp-withdraw-report">
// // // //                   <div className="hp-withdraw-report-row">
// // // //                     <span className="hp-withdraw-report-label">
// // // //                       Requested Amount
// // // //                     </span>
// // // //                     <span className="hp-withdraw-report-value">
// // // //                       ${formatMoney(confirmData.totalRequested)}
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="hp-withdraw-report-row">
// // // //                     <span className="hp-withdraw-report-label">
// // // //                       Processing Fee (10%)
// // // //                     </span>
// // // //                     <span
// // // //                       className="hp-withdraw-report-value"
// // // //                       style={{ color: "#c44c4c" }}
// // // //                     >
// // // //                       -${formatMoney(confirmData.totalFeeDeducted)}
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="hp-withdraw-report-row">
// // // //                     <span className="hp-withdraw-report-label">
// // // //                       Eligible Total Team
// // // //                     </span>
// // // //                     <span className="hp-withdraw-report-value">
// // // //                       {confirmData.teamSizeTracked} Members (
// // // //                       {confirmData.communityPercentage}%)
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="hp-withdraw-report-row">
// // // //                     <span className="hp-withdraw-report-label">
// // // //                       To USDT Wallet
// // // //                     </span>
// // // //                     <span
// // // //                       className="hp-withdraw-report-value"
// // // //                       style={{ color: "#08783f" }}
// // // //                     >
// // // //                       ${formatMoney(confirmData.expectedUSDT)}
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="hp-withdraw-report-row">
// // // //                     <span className="hp-withdraw-report-label">
// // // //                       To Top-up Wallet
// // // //                     </span>
// // // //                     <span
// // // //                       className="hp-withdraw-report-value"
// // // //                       style={{ color: "#8060bb" }}
// // // //                     >
// // // //                       ${formatMoney(confirmData.expectedTopup)}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="hp-withdraw-confirm-actions">
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setConfirmData(null)}
// // // //                     disabled={loading}
// // // //                     className="hp-withdraw-btn hp-withdraw-btn-cancel"
// // // //                   >
// // // //                     Cancel
// // // //                   </button>

// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={proceedWithdrawal}
// // // //                     disabled={loading}
// // // //                     className="hp-withdraw-btn hp-withdraw-btn-submit"
// // // //                   >
// // // //                     {loading ? (
// // // //                       <>
// // // //                         <LoaderCircle size={15} className="animate-spin" />
// // // //                         Processing
// // // //                       </>
// // // //                     ) : (
// // // //                       <>
// // // //                         <CheckCircle2 size={15} />
// // // //                         Confirm
// // // //                       </>
// // // //                     )}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 {/* Main withdrawal form */}
// // // //                 <div className="hp-withdraw-body">
// // // //                   {/* Withdrawable balance */}
// // // //                   <div className="hp-withdraw-summary">
// // // //                     <div className="hp-withdraw-summary-label">
// // // //                       Total Withdrawable Balance
// // // //                     </div>

// // // //                     <div className="hp-withdraw-summary-amount">
// // // //                       ${formatMoney(totalAvailableToWithdraw)}
// // // //                     </div>

// // // //                     <div className="hp-withdraw-summary-note">
// // // //                       Available from Direct, Level and Team Reward income
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Wallet address */}
// // // //                   {isAddressMissing && !isPromo ? (
// // // //                     <div className="hp-withdraw-warning">
// // // //                       <span>
// // // //                         No withdrawal address found. Please set your address
// // // //                         before withdrawing.
// // // //                       </span>

// // // //                       <Link
// // // //                         to="/profile"
// // // //                         onClick={onClose}
// // // //                         className="hp-withdraw-profile-link"
// // // //                       >
// // // //                         <UserCog size={12} />
// // // //                         Profile
// // // //                       </Link>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="hp-withdraw-address">
// // // //                       <div className="hp-withdraw-address-label">
// // // //                         <ShieldCheck
// // // //                           size={11}
// // // //                           style={{
// // // //                             display: "inline",
// // // //                             marginRight: 4,
// // // //                             verticalAlign: "middle",
// // // //                           }}
// // // //                         />
// // // //                         Your Saved Address
// // // //                       </div>

// // // //                       <div className="hp-withdraw-address-value">
// // // //                         {isPromo
// // // //                           ? "Wallet Address (Demo)"
// // // //                           : walletAddress}
// // // //                       </div>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* Income selection */}
// // // //                   <div className="hp-withdraw-section-title">
// // // //                     Select Income Source
// // // //                   </div>

// // // //                   {isLeader ? (
// // // //                     <div className="hp-withdraw-warning">
// // // //                       <Info size={17} />
// // // //                       Leaders cannot withdraw funds directly from here.
// // // //                     </div>
// // // //                   ) : (
// // // //                     <>
// // // //                       {incomeCards.map((income) => (
// // // //                         <div
// // // //                           key={income.key}
// // // //                           className="hp-withdraw-income-card"
// // // //                         >
// // // //                           <div className="hp-withdraw-income-head">
// // // //                             <div className="hp-withdraw-income-name">
// // // //                               <span style={{ color: income.color }}>
// // // //                                 {income.icon}
// // // //                               </span>
// // // //                               {income.title}
// // // //                             </div>

// // // //                             <div className="hp-withdraw-income-available">
// // // //                               ${formatMoney(income.balance)}
// // // //                             </div>
// // // //                           </div>

// // // //                           <div className="hp-withdraw-input-row">
// // // //                             <span className="hp-withdraw-input-label">
// // // //                               WITHDRAW $
// // // //                             </span>

// // // //                             <input
// // // //                               type="number"
// // // //                               min="0"
// // // //                               step="0.01"
// // // //                               placeholder="Enter amount"
// // // //                               className="hp-withdraw-amount-input"
// // // //                               value={withdrawals[income.key]}
// // // //                               onChange={(e) =>
// // // //                                 handleInputChange(e, income.key)
// // // //                               }
// // // //                               disabled={isLeader}
// // // //                             />
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}

// // // //                       {!hasMainIncome && !isPromo && (
// // // //                         <div
// // // //                           style={{
// // // //                             padding: "14px",
// // // //                             border: "1px solid #e3eadf",
// // // //                             borderRadius: 10,
// // // //                             background: "#f8fbf7",
// // // //                             color: "#718174",
// // // //                             textAlign: "center",
// // // //                             fontSize: 10,
// // // //                             fontWeight: 750,
// // // //                           }}
// // // //                         >
// // // //                           No withdrawable income is currently available.
// // // //                         </div>
// // // //                       )}

// // // //                       {/* Total entered */}
// // // //                       <div className="hp-withdraw-total">
// // // //                         <div className="hp-withdraw-total-label">
// // // //                           Total Entered Amount
// // // //                         </div>

// // // //                         <div className="hp-withdraw-total-value">
// // // //                           ${formatMoney(totalEnteredAmount)}
// // // //                         </div>
// // // //                       </div>

// // // //                       {/* Transaction password */}
// // // //                       <div className="hp-withdraw-security">
// // // //                         <label className="hp-withdraw-label">
// // // //                           <Lock
// // // //                             size={11}
// // // //                             style={{
// // // //                               display: "inline",
// // // //                               marginRight: 5,
// // // //                               verticalAlign: "middle",
// // // //                             }}
// // // //                           />
// // // //                           Transaction Password
// // // //                         </label>

// // // //                         <div
// // // //                           style={{
// // // //                             position: "absolute",
// // // //                             left: "-9999px",
// // // //                             opacity: 0,
// // // //                           }}
// // // //                           aria-hidden="true"
// // // //                         >
// // // //                           <input
// // // //                             type="text"
// // // //                             name="hidden_username"
// // // //                             tabIndex="-1"
// // // //                             autoComplete="username"
// // // //                           />
// // // //                           <input
// // // //                             type="password"
// // // //                             name="hidden_password"
// // // //                             tabIndex="-1"
// // // //                             autoComplete="current-password"
// // // //                           />
// // // //                         </div>

// // // //                         <div className="hp-withdraw-password-wrap">
// // // //                           <span className="hp-withdraw-password-icon">
// // // //                             <Lock size={15} />
// // // //                           </span>

// // // //                           <input
// // // //                             type={showPassword ? "text" : "password"}
// // // //                             autoComplete="new-password"
// // // //                             placeholder="Enter Transaction Password"
// // // //                             className="hp-withdraw-password"
// // // //                             value={transactionPassword}
// // // //                             onChange={(e) =>
// // // //                               setTransactionPassword(e.target.value)
// // // //                             }
// // // //                             disabled={isLeader}
// // // //                           />

// // // //                           <button
// // // //                             type="button"
// // // //                             onClick={() =>
// // // //                               setShowPassword((prev) => !prev)
// // // //                             }
// // // //                             className="hp-withdraw-eye"
// // // //                             aria-label={
// // // //                               showPassword
// // // //                                 ? "Hide password"
// // // //                                 : "Show password"
// // // //                             }
// // // //                           >
// // // //                             {showPassword ? (
// // // //                               <EyeOff size={16} />
// // // //                             ) : (
// // // //                               <Eye size={16} />
// // // //                             )}
// // // //                           </button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Footer */}
// // // //                 <div className="hp-withdraw-footer">
// // // //                   {isLeader ? (
// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={onClose}
// // // //                       className="hp-withdraw-btn hp-withdraw-btn-cancel"
// // // //                       style={{ width: "100%" }}
// // // //                     >
// // // //                       Cancel
// // // //                     </button>
// // // //                   ) : (
// // // //                     <>
// // // //                       <button
// // // //                         type="button"
// // // //                         onClick={onClose}
// // // //                         className="hp-withdraw-btn hp-withdraw-btn-cancel"
// // // //                       >
// // // //                         Cancel
// // // //                       </button>

// // // //                       <button
// // // //                         type="button"
// // // //                         onClick={handlePreWithdrawCheck}
// // // //                         disabled={loading}
// // // //                         className="hp-withdraw-btn hp-withdraw-btn-submit"
// // // //                       >
// // // //                         {loading ? (
// // // //                           <>
// // // //                             <LoaderCircle
// // // //                               size={15}
// // // //                               className="animate-spin"
// // // //                             />
// // // //                             Checking...
// // // //                           </>
// // // //                         ) : (
// // // //                           <>
// // // //                             Withdraw Funds
// // // //                             <ArrowRight size={15} />
// // // //                           </>
// // // //                         )}
// // // //                       </button>
// // // //                     </>
// // // //                   )}
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Success Modal */}
// // // //       {successOpen && (
// // // //         <SuccessModal
// // // //           isOpen={successOpen}
// // // //           onClose={closeSuccess}
// // // //           type="withdrawal"
// // // //           userId={successData.userId}
// // // //           userName={successData.userName}
// // // //           amount={successData.amount}
// // // //           source={successData.source}
// // // //         />
// // // //       )}

// // // //       {/* Message Modal */}
// // // //       {messageModal.open && (
// // // //         <MessageModal
// // // //           isOpen={messageModal.open}
// // // //           title={messageModal.title}
// // // //           message={messageModal.message}
// // // //           type={messageModal.type}
// // // //           onClose={() =>
// // // //             setMessageModal((prev) => ({
// // // //               ...prev,
// // // //               open: false,
// // // //             }))
// // // //           }
// // // //         />
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default WithdrawalModal;


































































// // // import React, { useState, useEffect, useCallback, useMemo } from "react";

// // // import api from "../../api/axios";

// // // import SuccessModal from "./SuccessModal";

// // // import MessageModal from "./MessageModal";

// // // import { useAuth } from "../../context/AuthContext";

// // // import {

// // //   Wallet,

// // //   Zap,

// // //   Users,

// // //   Trophy,

// // //   X,

// // //   UserCog,

// // //   Eye,

// // //   EyeOff,

// // //   AlertTriangle,

// // //   CheckCircle2,

// // //   ShieldCheck,

// // //   ArrowRight,

// // //   Lock,

// // //   LoaderCircle,

// // //   Info,

// // // } from "lucide-react";

// // // import { Link } from "react-router-dom";



// // // const WithdrawalModal = ({ userId, onClose }) => {

// // //   const [loading, setLoading] = useState(false);

// // //   const [showPassword, setShowPassword] = useState(false);



// // //   const [balances, setBalances] = useState({

// // //     walletBalance: 0,

// // //     direct: 0,

// // //     level: 0,

// // //     reward: 0,

// // //     isUserToppedUp: false,

// // //   });



// // //   const [withdrawals, setWithdrawals] = useState({

// // //     direct: "",

// // //     level: "",

// // //     reward: "",

// // //   });



// // //   const [transactionPassword, setTransactionPassword] = useState("");

// // //   const [walletAddress, setWalletAddress] = useState("");

// // //   const [isAddressMissing, setIsAddressMissing] = useState(false);



// // //   const [confirmData, setConfirmData] = useState(null);



// // //   const [successOpen, setSuccessOpen] = useState(false);

// // //   const [successData, setSuccessData] = useState({

// // //     userId: "",

// // //     userName: "",

// // //     amount: 0,

// // //     source: "",

// // //   });



// // //   const [messageModal, setMessageModal] = useState({

// // //     open: false,

// // //     title: "",

// // //     message: "",

// // //     type: "info",

// // //   });



// // //   const { user: loggedInUser, token } = useAuth();




// // //   const isLeader = loggedInUser?.role === "leader";



// // //   const showMessage = (title, message, type = "error") => {

// // //     setMessageModal({

// // //       open: true,

// // //       title,

// // //       message,

// // //       type,

// // //     });

// // //   };



// // //   // Fetch withdrawable balance and user profile

// // //   const fetchData = useCallback(async () => {

// // //     try {

// // //       const [res, profileRes] = await Promise.all([

// // //         api.get(`/wallet/withdrawable/${userId}`, {

// // //           headers: { Authorization: `Bearer ${token}` },

// // //         }),

// // //         api.get(`/user/${userId}`, {

// // //           headers: { Authorization: `Bearer ${token}` },

// // //         }),

// // //       ]);



// // //       if (res.data) {

// // //         setBalances({

// // //           walletBalance: Number(res.data.walletBalance) || 0,

// // //           direct: Number(res.data.direct) || 0,

// // //           level: Number(res.data.level) || 0,

// // //           reward: Number(res.data.reward) || 0,

// // //           isUserToppedUp: Boolean(res.data.isUserToppedUp),

// // //         });

// // //       }



// // //       const u = profileRes.data?.user || profileRes.data;



// // //       if (u) {

// // //         const addr = (u.walletAddress || "").trim();

// // //         setWalletAddress(addr);

// // //         setIsAddressMissing(!addr);

// // //       }

// // //     } catch (err) {

// // //       console.error("Fetch Error:", err);

// // //       showMessage(

// // //         "Loading Error",

// // //         err.response?.data?.message || "Unable to load withdrawal details.",

// // //         "error"

// // //       );

// // //     }

// // //   }, [userId, token]);



// // //   useEffect(() => {

// // //     fetchData();

// // //   }, [fetchData]);



// // //   // Only the three supported income sources are included.

// // //   const totalAvailableToWithdraw =

// // //     balances.direct + balances.level + balances.reward;



// // //   const hasMainIncome =

// // //     balances.direct > 0 ||

// // //     balances.level > 0 ||

// // //     balances.reward > 0;



// // //   const totalEnteredAmount = useMemo(() => {

// // //     return (

// // //       (Number(withdrawals.direct) || 0) +

// // //       (Number(withdrawals.level) || 0) +

// // //       (Number(withdrawals.reward) || 0)

// // //     );

// // //   }, [withdrawals]);



// // //   const handleInputChange = (e, source) => {

// // //     const value = e.target.value;



// // //     if (value === "" || /^\d*$/.test(value)) {

// // //       setWithdrawals((prev) => ({

// // //         ...prev,

// // //         [source]: value,

// // //       }));

// // //     }

// // //   };



// // //   // First step: validate and calculate withdrawal

// // //   const handlePreWithdrawCheck = async () => {

// // //     if (loading) return;



// // //     if (isLeader) {

// // //       return showMessage(

// // //         "Action Denied",

// // //         "Leaders cannot withdraw funds directly from here.",

// // //         "warning"

// // //       );

// // //     }



// // //     if (!balances.isUserToppedUp) {

// // //       return showMessage(

// // //         "Top-up Required",

// // //         "You must activate your package before withdrawing funds.",

// // //         "warning"

// // //       );

// // //     }



// // //     if (!walletAddress.trim() && isAddressMissing) {

// // //       return showMessage(

// // //         "Address Missing",

// // //         "Please set your withdrawal address in your Profile first.",

// // //         "warning"

// // //       );

// // //     }



// // //     const items = [];

// // //     let totalRequested = 0;

// // //     const successMessages = [];



// // //     const checkAndPush = (

// // //       sourceName,

// // //       inputVal,

// // //       availableBal,

// // //       displayName

// // //     ) => {

// // //       const amt = Number(inputVal);



// // //       if (amt > 0) {

// // //         if (amt > availableBal) {

// // //           throw new Error(`Insufficient funds in ${displayName}.`);

// // //         }



// // //         items.push({

// // //           source: sourceName,

// // //           amount: amt,

// // //         });



// // //         totalRequested += amt;

// // //         successMessages.push(displayName);

// // //       }

// // //     };



// // //     try {

// // //       checkAndPush(

// // //         "direct",

// // //         withdrawals.direct,

// // //         balances.direct,

// // //         "Direct Income"

// // //       );



// // //       checkAndPush(

// // //         "level",

// // //         withdrawals.level,

// // //         balances.level,

// // //         "Level Income"

// // //       );



// // //       checkAndPush(

// // //         "reward",

// // //         withdrawals.reward,

// // //         balances.reward,

// // //         "Royalty Earning"

// // //       );



// // //       if (totalRequested === 0) {

// // //         return showMessage(

// // //           "Amount Required",

// // //           "Please enter an amount to withdraw.",

// // //           "warning"

// // //         );

// // //       }



// // //       if (totalRequested % 10 !== 0) {

// // //         return showMessage(

// // //           "Invalid Amount",

// // //           `Amount must be in multiples of $10. Your total is $${totalRequested.toFixed(2)}.`,

// // //           "warning"

// // //         );

// // //       }



// // //       if (totalRequested < 10) {

// // //         return showMessage(

// // //           "Minimum Withdrawal",

// // //           "Minimum total withdrawal amount is $10.",

// // //           "warning"

// // //         );

// // //       }



// // //       if (!transactionPassword.trim()) {

// // //         return showMessage(

// // //           "Password Required",

// // //           "Please enter your transaction password.",

// // //           "warning"

// // //         );

// // //       }



// // //       setLoading(true);



// // //       const endpoint = "/wallet/withdraw";



// // //       // Backend dry-run calculation

// // //       const response = await api.post(

// // //         endpoint,

// // //         {

// // //           transactionPassword,

// // //           items,

// // //           dryRun: true,

// // //         },

// // //         {

// // //           headers: {

// // //             Authorization: `Bearer ${token}`,

// // //           },

// // //         }

// // //       );



// // //       const rep = response.data.report;



// // //       setConfirmData({

// // //         items,

// // //         totalRequested: Number(rep.totalRequested) || 0,

// // //         totalFeeDeducted: Number(rep.totalFeeDeducted) || 0,

// // //         expectedUSDT: Number(rep.totalNetUSDT) || 0,

// // //         expectedTopup: Number(rep.totalToTopupWallet) || 0,

// // //         sources: [...new Set(successMessages)].join(", "),

// // //       });

// // //     } catch (err) {

// // //       console.error(err);



// // //       let errorMsg = "Calculation failed.";



// // //       if (err.response?.data?.message) {

// // //         errorMsg = err.response.data.message;

// // //       } else if (err.message) {

// // //         errorMsg = err.message;

// // //       }



// // //       if (err.response?.status === 403) {

// // //         errorMsg = "Invalid Transaction Password";

// // //       }



// // //       if (errorMsg.toLowerCase().includes("once in a month")) {

// // //         showMessage("Withdrawal Notice", errorMsg, "info");

// // //       } else {

// // //         showMessage("Validation Error", errorMsg, "error");

// // //       }

// // //     } finally {

// // //       setLoading(false);

// // //     }

// // //   };



// // //   // Second step: actual withdrawal

// // //   const proceedWithdrawal = async () => {

// // //     if (!confirmData || loading) return;



// // //     try {

// // //       setLoading(true);



// // //       const endpoint = "/wallet/withdraw";



// // //       const response = await api.post(

// // //         endpoint,

// // //         {

// // //           transactionPassword,

// // //           items: confirmData.items,

// // //           dryRun: false,

// // //         },

// // //         {

// // //           headers: {

// // //             Authorization: `Bearer ${token}`,

// // //           },

// // //         }

// // //       );



// // //       setSuccessData({
// // //         userId,
// // //         userName: loggedInUser?.name || "",
// // //         amount: Number(response.data.report?.totalNetUSDT) || confirmData.expectedUSDT,
// // //         source: confirmData.sources,
// // //       });



// // //       setConfirmData(null);

// // //       setSuccessOpen(true);



// // //       setWithdrawals({

// // //         direct: "",

// // //         level: "",

// // //         reward: "",

// // //       });



// // //       setTransactionPassword("");



// // //       await fetchData();

// // //     } catch (err) {

// // //       console.error(err);



// // //       let errorMsg = "Withdrawal failed due to a server error.";



// // //       if (err.response?.data?.message) {

// // //         errorMsg = err.response.data.message;

// // //       } else if (err.message) {

// // //         errorMsg = err.message;

// // //       }



// // //       setConfirmData(null);



// // //       if (errorMsg.toLowerCase().includes("once in a month")) {

// // //         showMessage("Withdrawal Notice", errorMsg, "info");

// // //       } else {

// // //         showMessage("Withdrawal Error", errorMsg, "error");

// // //       }

// // //     } finally {

// // //       setLoading(false);

// // //     }

// // //   };



// // //   const closeSuccess = () => {

// // //     setSuccessOpen(false);

// // //     onClose();

// // //   };



// // //   const formatMoney = (value) =>

// // //     (Number(value) || 0).toFixed(2);



// // //   const incomeCards = [

// // //     {

// // //       key: "direct",

// // //       title: "Direct Income",

// // //       icon: <Zap size={17} />,

// // //       color: "#b88922",

// // //       balance: balances.direct,

// // //     },

// // //     {

// // //       key: "level",

// // //       title: "Level Income",

// // //       icon: <Users size={17} />,

// // //       color: "#2876b8",

// // //       balance: balances.level,

// // //     },

// // //     {

// // //       key: "reward",

// // //       title: "Team Reward",

// // //       icon: <Trophy size={17} />,

// // //       color: "#8161c5",

// // //       balance: balances.reward,

// // //     },

// // //   ];



// // //   return (

// // //     <>

// // //       <style>{`

// // //         .hp-withdraw-overlay {

// // //           --hp-green: #08783f;

// // //           --hp-dark: #07552e;

// // //           --hp-gold: #e3bd50;

// // //           position: fixed;

// // //           inset: 0;

// // //           z-index: 1000;

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;

// // //           padding: 12px;

// // //           overflow-y: auto;

// // //           background: rgba(5, 25, 15, .68);

// // //           backdrop-filter: blur(5px);

// // //           font-family: Inter, Arial, sans-serif;

// // //           animation: hpWithdrawFade .2s ease-out;

// // //         }



// // //         .hp-withdraw-overlay * {

// // //           box-sizing: border-box;

// // //         }



// // //         .hp-withdraw-modal {

// // //           width: 100%;

// // //           max-width: 470px;

// // //           max-height: 92vh;

// // //           display: flex;

// // //           flex-direction: column;

// // //           overflow: hidden;

// // //           border: 1px solid #dce9dc;

// // //           border-radius: 18px;

// // //           background: white;

// // //           box-shadow: 0 22px 65px #0003;

// // //           animation: hpWithdrawPop .25s ease-out;

// // //         }



// // //         .hp-withdraw-header {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: space-between;

// // //           gap: 10px;

// // //           padding: 13px 16px;

// // //           border-bottom: 3px solid var(--hp-gold);

// // //           background: linear-gradient(110deg, #07552e, #087b43);

// // //           flex-shrink: 0;

// // //         }



// // //         .hp-withdraw-heading {

// // //           display: flex;

// // //           align-items: center;

// // //           gap: 10px;

// // //         }



// // //         .hp-withdraw-icon {

// // //           display: grid;

// // //           place-items: center;

// // //           width: 38px;

// // //           height: 38px;

// // //           border: 1px solid #ffffff40;

// // //           border-radius: 11px;

// // //           background: #ffffff15;

// // //           color: #ffdf78;

// // //         }



// // //         .hp-withdraw-title {

// // //           margin: 0;

// // //           color: white;

// // //           font-size: 14px;

// // //           font-weight: 950;

// // //           letter-spacing: .5px;

// // //         }



// // //         .hp-withdraw-subtitle {

// // //           margin-top: 3px;

// // //           color: #d5ead9;

// // //           font-size: 9px;

// // //           font-weight: 750;

// // //           letter-spacing: .8px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-close {

// // //           display: grid;

// // //           place-items: center;

// // //           width: 31px;

// // //           height: 31px;

// // //           border: 1px solid #ffffff35;

// // //           border-radius: 9px;

// // //           background: #ffffff12;

// // //           color: white;

// // //           cursor: pointer;

// // //           transition: .2s;

// // //         }



// // //         .hp-withdraw-close:hover {

// // //           background: #ffffff28;

// // //           transform: rotate(90deg);

// // //         }



// // //         .hp-withdraw-body {

// // //           flex: 1;

// // //           min-height: 0;

// // //           padding: 14px;

// // //           overflow-y: auto;

// // //           background: #fff;

// // //           scrollbar-width: thin;

// // //           scrollbar-color: #c6d9c8 transparent;

// // //         }



// // //         .hp-withdraw-summary {

// // //           padding: 15px;

// // //           border: 1px solid #d4e8d1;

// // //           border-radius: 13px;

// // //           background: linear-gradient(115deg, #eff9ed, #fbfcf5);

// // //         }



// // //         .hp-withdraw-summary-label {

// // //           color: #56805d;

// // //           font-size: 9px;

// // //           font-weight: 950;

// // //           letter-spacing: 1px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-summary-amount {

// // //           margin-top: 5px;

// // //           color: #08783f;

// // //           font-family: monospace;

// // //           font-size: 27px;

// // //           font-weight: 950;

// // //           letter-spacing: -1px;

// // //         }



// // //         .hp-withdraw-summary-note {

// // //           margin-top: 3px;

// // //           color: #78917d;

// // //           font-size: 9px;

// // //           font-weight: 700;

// // //         }



// // //         .hp-withdraw-address {

// // //           margin-top: 11px;

// // //           padding: 11px 12px;

// // //           border: 1px solid #dce9dc;

// // //           border-radius: 10px;

// // //           background: #f8fbf7;

// // //         }



// // //         .hp-withdraw-address-label {

// // //           margin-bottom: 5px;

// // //           color: #637c68;

// // //           font-size: 8px;

// // //           font-weight: 950;

// // //           letter-spacing: .9px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-address-value {

// // //           color: #17613a;

// // //           font-family: monospace;

// // //           font-size: 10px;

// // //           font-weight: 850;

// // //           overflow-wrap: anywhere;

// // //         }



// // //         .hp-withdraw-warning {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: space-between;

// // //           gap: 10px;

// // //           margin-top: 11px;

// // //           padding: 11px;

// // //           border: 1px solid #f1cccc;

// // //           border-radius: 10px;

// // //           background: #fff5f4;

// // //           color: #a63d3d;

// // //           font-size: 10px;

// // //           font-weight: 750;

// // //         }



// // //         .hp-withdraw-profile-link {

// // //           display: inline-flex;

// // //           align-items: center;

// // //           gap: 5px;

// // //           padding: 7px 9px;

// // //           border-radius: 8px;

// // //           background: #b63c36;

// // //           color: white;

// // //           font-size: 9px;

// // //           font-weight: 950;

// // //           text-decoration: none;

// // //           white-space: nowrap;

// // //         }



// // //         .hp-withdraw-section-title {

// // //           margin: 17px 0 9px;

// // //           color: #244a31;

// // //           font-size: 10px;

// // //           font-weight: 950;

// // //           letter-spacing: 1px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-income-card {

// // //           margin-bottom: 9px;

// // //           padding: 11px;

// // //           border: 1px solid #e1eae0;

// // //           border-radius: 11px;

// // //           background: #fbfdf9;

// // //           transition: .2s;

// // //         }



// // //         .hp-withdraw-income-card:focus-within {

// // //           border-color: #94c99b;

// // //           box-shadow: 0 0 0 3px #08783f0d;

// // //         }



// // //         .hp-withdraw-income-head {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: space-between;

// // //           gap: 8px;

// // //           margin-bottom: 9px;

// // //         }



// // //         .hp-withdraw-income-name {

// // //           display: flex;

// // //           align-items: center;

// // //           gap: 7px;

// // //           color: #31543a;

// // //           font-size: 10px;

// // //           font-weight: 950;

// // //           text-transform: uppercase;

// // //           letter-spacing: .5px;

// // //         }



// // //         .hp-withdraw-income-available {

// // //           color: #08783f;

// // //           font-family: monospace;

// // //           font-size: 12px;

// // //           font-weight: 950;

// // //         }



// // //         .hp-withdraw-input-row {

// // //           display: flex;

// // //           align-items: center;

// // //           gap: 8px;

// // //         }



// // //         .hp-withdraw-input-label {

// // //           color: #819083;

// // //           font-size: 8px;

// // //           font-weight: 850;

// // //           white-space: nowrap;

// // //         }



// // //         .hp-withdraw-amount-input {

// // //           width: 100%;

// // //           min-width: 0;

// // //           height: 38px;

// // //           padding: 0 10px;

// // //           border: 1px solid #dce8dc;

// // //           border-radius: 8px;

// // //           outline: none;

// // //           background: white;

// // //           color: #21482f;

// // //           font-family: monospace;

// // //           font-size: 12px;

// // //           font-weight: 850;

// // //           transition: .2s;

// // //         }



// // //         .hp-withdraw-amount-input:focus {

// // //           border-color: #0b8748;

// // //           box-shadow: 0 0 0 3px #08783f12;

// // //         }



// // //         .hp-withdraw-amount-input:disabled {

// // //           background: #f0f2ef;

// // //           cursor: not-allowed;

// // //         }



// // //         .hp-withdraw-total {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: space-between;

// // //           gap: 10px;

// // //           margin-top: 12px;

// // //           padding: 12px;

// // //           border: 1px solid #e5d59d;

// // //           border-radius: 10px;

// // //           background: #fff9e9;

// // //         }



// // //         .hp-withdraw-total-label {

// // //           color: #85671e;

// // //           font-size: 9px;

// // //           font-weight: 950;

// // //           letter-spacing: .7px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-total-value {

// // //           color: #88651b;

// // //           font-family: monospace;

// // //           font-size: 18px;

// // //           font-weight: 950;

// // //         }



// // //         .hp-withdraw-security {

// // //           margin-top: 13px;

// // //           padding: 11px;

// // //           border: 1px solid #e0e9df;

// // //           border-radius: 10px;

// // //           background: #f8fbf7;

// // //         }



// // //         .hp-withdraw-label {

// // //           display: block;

// // //           margin: 0 0 7px 2px;

// // //           color: #526b59;

// // //           font-size: 9px;

// // //           font-weight: 950;

// // //           letter-spacing: .7px;

// // //           text-transform: uppercase;

// // //         }



// // //         .hp-withdraw-password-wrap {

// // //           position: relative;

// // //         }



// // //         .hp-withdraw-password {

// // //           width: 100%;

// // //           height: 41px;

// // //           padding: 0 42px 0 36px;

// // //           border: 1px solid #dce8dc;

// // //           border-radius: 9px;

// // //           outline: none;

// // //           background: white;

// // //           color: #21482f;

// // //           font-family: monospace;

// // //           font-size: 11px;

// // //           font-weight: 750;

// // //         }



// // //         .hp-withdraw-password:focus {

// // //           border-color: #0b8748;

// // //           box-shadow: 0 0 0 3px #08783f12;

// // //         }



// // //         .hp-withdraw-password-icon {

// // //           position: absolute;

// // //           top: 50%;

// // //           left: 11px;

// // //           display: flex;

// // //           color: #829586;

// // //           transform: translateY(-50%);

// // //           pointer-events: none;

// // //         }



// // //         .hp-withdraw-eye {

// // //           position: absolute;

// // //           top: 50%;

// // //           right: 10px;

// // //           display: flex;

// // //           border: 0;

// // //           background: transparent;

// // //           color: #829586;

// // //           cursor: pointer;

// // //           transform: translateY(-50%);

// // //         }



// // //         .hp-withdraw-footer {

// // //           display: flex;

// // //           gap: 9px;

// // //           padding: 12px 14px;

// // //           border-top: 1px solid #e5eee4;

// // //           background: #f8fbf7;

// // //           flex-shrink: 0;

// // //         }



// // //         .hp-withdraw-btn {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;

// // //           gap: 7px;

// // //           min-height: 42px;

// // //           border-radius: 9px;

// // //           font-size: 10px;

// // //           font-weight: 950;

// // //           letter-spacing: .6px;

// // //           text-transform: uppercase;

// // //           cursor: pointer;

// // //           transition: .2s;

// // //         }



// // //         .hp-withdraw-btn-cancel {

// // //           width: 34%;

// // //           border: 1px solid #dce5dc;

// // //           background: white;

// // //           color: #65776a;

// // //         }



// // //         .hp-withdraw-btn-cancel:hover {

// // //           background: #f0f4ef;

// // //         }



// // //         .hp-withdraw-btn-submit {

// // //           flex: 1;

// // //           border: 1px solid #d7b84e;

// // //           background: linear-gradient(105deg, #087b43, #07552e);

// // //           color: white;

// // //           box-shadow: 0 4px 12px #08783f22;

// // //         }



// // //         .hp-withdraw-btn-submit:hover:not(:disabled) {

// // //           transform: translateY(-1px);

// // //           box-shadow: 0 6px 16px #08783f35;

// // //         }



// // //         .hp-withdraw-btn-submit:disabled {

// // //           border-color: #dce5dc;

// // //           background: #e8eee8;

// // //           color: #92a095;

// // //           box-shadow: none;

// // //           cursor: not-allowed;

// // //         }



// // //         .hp-withdraw-confirm {

// // //           padding: 18px;

// // //           overflow-y: auto;

// // //           text-align: center;

// // //           background: white;

// // //         }



// // //         .hp-withdraw-confirm-icon {

// // //           display: grid;

// // //           place-items: center;

// // //           width: 56px;

// // //           height: 56px;

// // //           margin: 0 auto 11px;

// // //           border: 1px solid #f0dca3;

// // //           border-radius: 50%;

// // //           background: #fff7df;

// // //           color: #aa811e;

// // //         }



// // //         .hp-withdraw-confirm-title {

// // //           margin: 0;

// // //           color: #17472a;

// // //           font-size: 19px;

// // //           font-weight: 950;

// // //         }



// // //         .hp-withdraw-confirm-desc {

// // //           margin: 7px auto 15px;

// // //           max-width: 300px;

// // //           color: #7d8c80;

// // //           font-size: 10px;

// // //           line-height: 1.6;

// // //           font-weight: 650;

// // //         }



// // //         .hp-withdraw-report {

// // //           padding: 13px;

// // //           border: 1px solid #e0e9df;

// // //           border-radius: 12px;

// // //           background: #f9fcf8;

// // //           text-align: left;

// // //         }



// // //         .hp-withdraw-report-row {

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: space-between;

// // //           gap: 10px;

// // //           padding: 10px 0;

// // //           border-bottom: 1px solid #e7eee5;

// // //         }



// // //         .hp-withdraw-report-row:first-child {

// // //           padding-top: 0;

// // //         }



// // //         .hp-withdraw-report-row:last-child {

// // //           padding-bottom: 0;

// // //           border-bottom: 0;

// // //         }



// // //         .hp-withdraw-report-label {

// // //           color: #718174;

// // //           font-size: 9px;

// // //           font-weight: 850;

// // //           text-transform: uppercase;

// // //           letter-spacing: .4px;

// // //         }



// // //         .hp-withdraw-report-value {

// // //           color: #244a31;

// // //           font-family: monospace;

// // //           font-size: 12px;

// // //           font-weight: 950;

// // //           text-align: right;

// // //         }



// // //         .hp-withdraw-confirm-actions {

// // //           display: flex;

// // //           gap: 9px;

// // //           margin-top: 15px;

// // //         }



// // //         .hp-withdraw-confirm-actions button {

// // //           flex: 1;

// // //         }



// // //         @keyframes hpWithdrawFade {

// // //           from { opacity: 0; }

// // //           to { opacity: 1; }

// // //         }



// // //         @keyframes hpWithdrawPop {

// // //           from {

// // //             opacity: 0;

// // //             transform: translateY(12px) scale(.97);

// // //           }

// // //           to {

// // //             opacity: 1;

// // //             transform: translateY(0) scale(1);

// // //           }

// // //         }



// // //         @media (max-width: 420px) {

// // //           .hp-withdraw-overlay {

// // //             padding: 8px;

// // //           }



// // //           .hp-withdraw-modal {

// // //             max-height: 95vh;

// // //             border-radius: 15px;

// // //           }



// // //           .hp-withdraw-header {

// // //             padding: 11px 12px;

// // //           }



// // //           .hp-withdraw-body {

// // //             padding: 11px;

// // //           }



// // //           .hp-withdraw-footer {

// // //             padding: 10px 11px;

// // //           }



// // //           .hp-withdraw-confirm {

// // //             padding: 14px;

// // //           }

// // //         }



// // //         @media (prefers-reduced-motion: reduce) {

// // //           .hp-withdraw-overlay,

// // //           .hp-withdraw-modal {

// // //             animation: none;

// // //           }

// // //         }

// // //       `}</style>



// // //       {!successOpen && (

// // //         <div className="hp-withdraw-overlay">

// // //           <div className="hp-withdraw-modal">

// // //             {/* Header */}

// // //             <div className="hp-withdraw-header">

// // //               <div className="hp-withdraw-heading">

// // //                 <div className="hp-withdraw-icon">

// // //                   <Wallet size={19} />

// // //                 </div>



// // //                 <div>

// // //                   <h2 className="hp-withdraw-title">

// // //                     Withdraw Funds

// // //                   </h2>

// // //                   <div className="hp-withdraw-subtitle">

// // //                     Secure Wallet Withdrawal

// // //                   </div>

// // //                 </div>

// // //               </div>



// // //               <button

// // //                 type="button"

// // //                 onClick={() =>

// // //                   confirmData ? setConfirmData(null) : onClose()

// // //                 }

// // //                 className="hp-withdraw-close"

// // //                 aria-label="Close"

// // //                 disabled={loading}

// // //               >

// // //                 <X size={17} />

// // //               </button>

// // //             </div>



// // //             {/* Confirmation screen */}

// // //             {confirmData ? (

// // //               <div className="hp-withdraw-confirm">

// // //                 <div className="hp-withdraw-confirm-icon">

// // //                   <AlertTriangle size={27} />

// // //                 </div>



// // //                 <h3 className="hp-withdraw-confirm-title">

// // //                   Review Withdrawal

// // //                 </h3>



// // //                 <p className="hp-withdraw-confirm-desc">

// // //                   Please review your withdrawal details carefully before

// // //                   confirming the transaction.

// // //                 </p>



// // //                 <div className="hp-withdraw-report">

// // //                   <div className="hp-withdraw-report-row">

// // //                     <span className="hp-withdraw-report-label">

// // //                       Requested Amount

// // //                     </span>

// // //                     <span className="hp-withdraw-report-value">

// // //                       ${formatMoney(confirmData.totalRequested)}

// // //                     </span>

// // //                   </div>



// // //                   <div className="hp-withdraw-report-row">

// // //                     <span className="hp-withdraw-report-label">

// // //                       Processing Fee (10%)

// // //                     </span>

// // //                     <span

// // //                       className="hp-withdraw-report-value"

// // //                       style={{ color: "#c44c4c" }}

// // //                     >

// // //                       -${formatMoney(confirmData.totalFeeDeducted)}

// // //                     </span>

// // //                   </div>



                  



// // //                   <div className="hp-withdraw-report-row">

// // //                     <span className="hp-withdraw-report-label">

// // //                       To Withdrawal Request (50%)

// // //                     </span>

// // //                     <span

// // //                       className="hp-withdraw-report-value"

// // //                       style={{ color: "#08783f" }}

// // //                     >

// // //                       ${formatMoney(confirmData.expectedUSDT)}

// // //                     </span>

// // //                   </div>



// // //                   <div className="hp-withdraw-report-row">

// // //                     <span className="hp-withdraw-report-label">

// // //                       To Wallet Balance (50%)

// // //                     </span>

// // //                     <span

// // //                       className="hp-withdraw-report-value"

// // //                       style={{ color: "#8060bb" }}

// // //                     >

// // //                       ${formatMoney(confirmData.expectedTopup)}

// // //                     </span>

// // //                   </div>

// // //                 </div>



// // //                 <div className="hp-withdraw-confirm-actions">

// // //                   <button

// // //                     type="button"

// // //                     onClick={() => setConfirmData(null)}

// // //                     disabled={loading}

// // //                     className="hp-withdraw-btn hp-withdraw-btn-cancel"

// // //                   >

// // //                     Cancel

// // //                   </button>



// // //                   <button

// // //                     type="button"

// // //                     onClick={proceedWithdrawal}

// // //                     disabled={loading}

// // //                     className="hp-withdraw-btn hp-withdraw-btn-submit"

// // //                   >

// // //                     {loading ? (

// // //                       <>

// // //                         <LoaderCircle size={15} className="animate-spin" />

// // //                         Processing

// // //                       </>

// // //                     ) : (

// // //                       <>

// // //                         <CheckCircle2 size={15} />

// // //                         Confirm

// // //                       </>

// // //                     )}

// // //                   </button>

// // //                 </div>

// // //               </div>

// // //             ) : (

// // //               <>

// // //                 {/* Main withdrawal form */}

// // //                 <div className="hp-withdraw-body">

// // //                   {/* Withdrawable balance */}

// // //                   <div className="hp-withdraw-summary">

// // //                     <div className="hp-withdraw-summary-label">

// // //                       Total Withdrawable Balance

// // //                     </div>



// // //                     <div className="hp-withdraw-summary-amount">

// // //                       ${formatMoney(totalAvailableToWithdraw)}

// // //                     </div>



// // //                     <div className="hp-withdraw-summary-note">

// // //                       Available from Direct, Level and Team Reward income. Net amount is split equally after 10% fee.

// // //                     </div>

// // //                   </div>



// // //                   {/* Wallet address */}

// // //                   {isAddressMissing ? (

// // //                     <div className="hp-withdraw-warning">

// // //                       <span>

// // //                         No withdrawal address found. Please set your address

// // //                         before withdrawing.

// // //                       </span>



// // //                       <Link

// // //                         to="/profile"

// // //                         onClick={onClose}

// // //                         className="hp-withdraw-profile-link"

// // //                       >

// // //                         <UserCog size={12} />

// // //                         Profile

// // //                       </Link>

// // //                     </div>

// // //                   ) : (

// // //                     <div className="hp-withdraw-address">

// // //                       <div className="hp-withdraw-address-label">

// // //                         <ShieldCheck

// // //                           size={11}

// // //                           style={{

// // //                             display: "inline",

// // //                             marginRight: 4,

// // //                             verticalAlign: "middle",

// // //                           }}

// // //                         />

// // //                         Your Saved Address

// // //                       </div>



// // //                       <div className="hp-withdraw-address-value">

// // //                         {walletAddress}

// // //                       </div>

// // //                     </div>

// // //                   )}



// // //                   {/* Income selection */}

// // //                   <div className="hp-withdraw-section-title">

// // //                     Select Income Source

// // //                   </div>



// // //                   {isLeader ? (

// // //                     <div className="hp-withdraw-warning">

// // //                       <Info size={17} />

// // //                       Leaders cannot withdraw funds directly from here.

// // //                     </div>

// // //                   ) : (

// // //                     <>

// // //                       {incomeCards.map((income) => (

// // //                         <div

// // //                           key={income.key}

// // //                           className="hp-withdraw-income-card"

// // //                         >

// // //                           <div className="hp-withdraw-income-head">

// // //                             <div className="hp-withdraw-income-name">

// // //                               <span style={{ color: income.color }}>

// // //                                 {income.icon}

// // //                               </span>

// // //                               {income.title}

// // //                             </div>



// // //                             <div className="hp-withdraw-income-available">

// // //                               ${formatMoney(income.balance)}

// // //                             </div>

// // //                           </div>



// // //                           <div className="hp-withdraw-input-row">

// // //                             <span className="hp-withdraw-input-label">

// // //                               WITHDRAW $

// // //                             </span>



// // //                             <input

// // //                               type="number"

// // //                               min="0"

// // //                               step="0.01"

// // //                               placeholder="Enter amount"

// // //                               className="hp-withdraw-amount-input"

// // //                               value={withdrawals[income.key]}

// // //                               onChange={(e) =>

// // //                                 handleInputChange(e, income.key)

// // //                               }

// // //                               disabled={isLeader}

// // //                             />

// // //                           </div>

// // //                         </div>

// // //                       ))}



// // //                       {!hasMainIncome && (

// // //                         <div

// // //                           style={{

// // //                             padding: "14px",

// // //                             border: "1px solid #e3eadf",

// // //                             borderRadius: 10,

// // //                             background: "#f8fbf7",

// // //                             color: "#718174",

// // //                             textAlign: "center",

// // //                             fontSize: 10,

// // //                             fontWeight: 750,

// // //                           }}

// // //                         >

// // //                           No withdrawable income is currently available.

// // //                         </div>

// // //                       )}



// // //                       {/* Total entered */}

// // //                       <div className="hp-withdraw-total">

// // //                         <div className="hp-withdraw-total-label">

// // //                           Total Entered Amount

// // //                         </div>



// // //                         <div className="hp-withdraw-total-value">

// // //                           ${formatMoney(totalEnteredAmount)}

// // //                         </div>

// // //                       </div>



// // //                       {/* Transaction password */}

// // //                       <div className="hp-withdraw-security">

// // //                         <label className="hp-withdraw-label">

// // //                           <Lock

// // //                             size={11}

// // //                             style={{

// // //                               display: "inline",

// // //                               marginRight: 5,

// // //                               verticalAlign: "middle",

// // //                             }}

// // //                           />

// // //                           Transaction Password

// // //                         </label>



// // //                         <div

// // //                           style={{

// // //                             position: "absolute",

// // //                             left: "-9999px",

// // //                             opacity: 0,

// // //                           }}

// // //                           aria-hidden="true"

// // //                         >

// // //                           <input

// // //                             type="text"

// // //                             name="hidden_username"

// // //                             tabIndex="-1"

// // //                             autoComplete="username"

// // //                           />

// // //                           <input

// // //                             type="password"

// // //                             name="hidden_password"

// // //                             tabIndex="-1"

// // //                             autoComplete="current-password"

// // //                           />

// // //                         </div>



// // //                         <div className="hp-withdraw-password-wrap">

// // //                           <span className="hp-withdraw-password-icon">

// // //                             <Lock size={15} />

// // //                           </span>



// // //                           <input

// // //                             type={showPassword ? "text" : "password"}

// // //                             autoComplete="new-password"

// // //                             placeholder="Enter Transaction Password"

// // //                             className="hp-withdraw-password"

// // //                             value={transactionPassword}

// // //                             onChange={(e) =>

// // //                               setTransactionPassword(e.target.value)

// // //                             }

// // //                             disabled={isLeader}

// // //                           />



// // //                           <button

// // //                             type="button"

// // //                             onClick={() =>

// // //                               setShowPassword((prev) => !prev)

// // //                             }

// // //                             className="hp-withdraw-eye"

// // //                             aria-label={

// // //                               showPassword

// // //                                 ? "Hide password"

// // //                                 : "Show password"

// // //                             }

// // //                           >

// // //                             {showPassword ? (

// // //                               <EyeOff size={16} />

// // //                             ) : (

// // //                               <Eye size={16} />

// // //                             )}

// // //                           </button>

// // //                         </div>

// // //                       </div>

// // //                     </>

// // //                   )}

// // //                 </div>



// // //                 {/* Footer */}

// // //                 <div className="hp-withdraw-footer">

// // //                   {isLeader ? (

// // //                     <button

// // //                       type="button"

// // //                       onClick={onClose}

// // //                       className="hp-withdraw-btn hp-withdraw-btn-cancel"

// // //                       style={{ width: "100%" }}

// // //                     >

// // //                       Cancel

// // //                     </button>

// // //                   ) : (

// // //                     <>

// // //                       <button

// // //                         type="button"

// // //                         onClick={onClose}

// // //                         className="hp-withdraw-btn hp-withdraw-btn-cancel"

// // //                       >

// // //                         Cancel

// // //                       </button>



// // //                       <button

// // //                         type="button"

// // //                         onClick={handlePreWithdrawCheck}

// // //                         disabled={loading}

// // //                         className="hp-withdraw-btn hp-withdraw-btn-submit"

// // //                       >

// // //                         {loading ? (

// // //                           <>

// // //                             <LoaderCircle

// // //                               size={15}

// // //                               className="animate-spin"

// // //                             />

// // //                             Checking...

// // //                           </>

// // //                         ) : (

// // //                           <>

// // //                             Withdraw Funds

// // //                             <ArrowRight size={15} />

// // //                           </>

// // //                         )}

// // //                       </button>

// // //                     </>

// // //                   )}

// // //                 </div>

// // //               </>

// // //             )}

// // //           </div>

// // //         </div>

// // //       )}



// // //       {/* Success Modal */}

// // //       {successOpen && (

// // //         <SuccessModal

// // //           isOpen={successOpen}

// // //           onClose={closeSuccess}

// // //           type="withdrawal"

// // //           userId={successData.userId}

// // //           userName={successData.userName}

// // //           amount={successData.amount}

// // //           source={successData.source}

// // //         />

// // //       )}



// // //       {/* Message Modal */}

// // //       {messageModal.open && (

// // //         <MessageModal

// // //           isOpen={messageModal.open}

// // //           title={messageModal.title}

// // //           message={messageModal.message}

// // //           type={messageModal.type}

// // //           onClose={() =>

// // //             setMessageModal((prev) => ({

// // //               ...prev,

// // //               open: false,

// // //             }))

// // //           }

// // //         />

// // //       )}

// // //     </>

// // //   );

// // // };



// // // export default WithdrawalModal;












































// // import React, { useState, useEffect, useCallback, useMemo } from "react";

// // import api from "../../api/axios";

// // import SuccessModal from "./SuccessModal";

// // import MessageModal from "./MessageModal";

// // import { useAuth } from "../../context/AuthContext";

// // import {

// //   Wallet,

// //   Zap,

// //   Users,

// //   Trophy,

// //   X,

// //   UserCog,

// //   Eye,

// //   EyeOff,

// //   AlertTriangle,

// //   CheckCircle2,

// //   ShieldCheck,

// //   ArrowRight,

// //   Lock,

// //   LoaderCircle,

// //   Info,

// // } from "lucide-react";

// // import { Link } from "react-router-dom";



// // const WithdrawalModal = ({ userId, onClose }) => {

// //   const [loading, setLoading] = useState(false);

// //   const [showPassword, setShowPassword] = useState(false);



// //   const [balances, setBalances] = useState({

// //     walletBalance: 0,

// //     direct: 0,

// //     level: 0,
// //     plan: 0,

// //     reward: 0,

// //     isUserToppedUp: false,

// //   });



// //   const [withdrawals, setWithdrawals] = useState({

// //     direct: "",

// //     level: "",
// //     plan: "",

// //     reward: "",

// //   });



// //   const [transactionPassword, setTransactionPassword] = useState("");

// //   const [walletAddress, setWalletAddress] = useState("");

// //   const [isAddressMissing, setIsAddressMissing] = useState(false);



// //   const [confirmData, setConfirmData] = useState(null);



// //   const [successOpen, setSuccessOpen] = useState(false);

// //   const [successData, setSuccessData] = useState({

// //     userId: "",

// //     userName: "",

// //     amount: 0,

// //     source: "",

// //   });



// //   const [messageModal, setMessageModal] = useState({

// //     open: false,

// //     title: "",

// //     message: "",

// //     type: "info",

// //   });



// //   const { user: loggedInUser, token } = useAuth();




// //   const isLeader = loggedInUser?.role === "leader";



// //   const showMessage = (title, message, type = "error") => {

// //     setMessageModal({

// //       open: true,

// //       title,

// //       message,

// //       type,

// //     });

// //   };



// //   // Fetch withdrawable balance and user profile

// //   const fetchData = useCallback(async () => {

// //     try {

// //       const [res, profileRes] = await Promise.all([

// //         api.get(`/wallet/withdrawable/${userId}`, {

// //           headers: { Authorization: `Bearer ${token}` },

// //         }),

// //         api.get(`/user/${userId}`, {

// //           headers: { Authorization: `Bearer ${token}` },

// //         }),

// //       ]);



// //       if (res.data) {

// //         setBalances({

// //           walletBalance: Number(res.data.walletBalance) || 0,

// //           direct: Number(res.data.direct) || 0,

// //           level: Number(res.data.level) || 0,
// //           plan: Number(res.data.plan) || 0,

// //           reward: Number(res.data.reward) || 0,

// //           isUserToppedUp: Boolean(res.data.isUserToppedUp),

// //         });

// //       }



// //       const u = profileRes.data?.user || profileRes.data;



// //       if (u) {

// //         const addr = (u.walletAddress || "").trim();

// //         setWalletAddress(addr);

// //         setIsAddressMissing(!addr);

// //       }

// //     } catch (err) {

// //       console.error("Fetch Error:", err);

// //       showMessage(

// //         "Loading Error",

// //         err.response?.data?.message || "Unable to load withdrawal details.",

// //         "error"

// //       );

// //     }

// //   }, [userId, token]);



// //   useEffect(() => {

// //     fetchData();

// //   }, [fetchData]);



// //   // All four supported income sources are included.

// //   const totalAvailableToWithdraw =
// //     balances.direct + balances.level + balances.plan + balances.reward;

// //   const hasMainIncome =
// //     balances.direct > 0 ||
// //     balances.level > 0 ||
// //     balances.plan > 0 ||
// //     balances.reward > 0;



// //   const totalEnteredAmount = useMemo(() => {

// //     return (

// //       (Number(withdrawals.direct) || 0) +

// //       (Number(withdrawals.level) || 0) +

// //       (Number(withdrawals.plan) || 0) +

// //       (Number(withdrawals.reward) || 0)

// //     );

// //   }, [withdrawals]);



// //   const handleInputChange = (e, source) => {

// //     const value = e.target.value;



// //     if (value === "" || /^\d*$/.test(value)) {

// //       setWithdrawals((prev) => ({

// //         ...prev,

// //         [source]: value,

// //       }));

// //     }

// //   };



// //   // First step: validate and calculate withdrawal

// //   const handlePreWithdrawCheck = async () => {

// //     if (loading) return;



// //     if (isLeader) {

// //       return showMessage(

// //         "Action Denied",

// //         "Leaders cannot withdraw funds directly from here.",

// //         "warning"

// //       );

// //     }



// //     if (!balances.isUserToppedUp) {

// //       return showMessage(

// //         "Top-up Required",

// //         "You must activate your package before withdrawing funds.",

// //         "warning"

// //       );

// //     }



// //     if (!walletAddress.trim() && isAddressMissing) {

// //       return showMessage(

// //         "Address Missing",

// //         "Please set your withdrawal address in your Profile first.",

// //         "warning"

// //       );

// //     }



// //     const items = [];

// //     let totalRequested = 0;

// //     const successMessages = [];



// //     const checkAndPush = (

// //       sourceName,

// //       inputVal,

// //       availableBal,

// //       displayName

// //     ) => {

// //       const amt = Number(inputVal);



// //       if (amt > 0) {

// //         if (amt > availableBal) {

// //           throw new Error(`Insufficient funds in ${displayName}.`);

// //         }



// //         items.push({

// //           source: sourceName,

// //           amount: amt,

// //         });



// //         totalRequested += amt;

// //         successMessages.push(displayName);

// //       }

// //     };



// //     try {

// //       checkAndPush(

// //         "direct",

// //         withdrawals.direct,

// //         balances.direct,

// //         "Direct Income"

// //       );



// //       checkAndPush(

// //         "level",

// //         withdrawals.level,

// //         balances.level,

// //         "Level Income"

// //       );

// //       checkAndPush(
// //         "plan",
// //         withdrawals.plan,
// //         balances.plan,
// //         "Plan Income"
// //       );



// //       checkAndPush(

// //         "reward",

// //         withdrawals.reward,

// //         balances.reward,

// //         "Royalty Earning"

// //       );



// //       if (totalRequested === 0) {

// //         return showMessage(

// //           "Amount Required",

// //           "Please enter an amount to withdraw.",

// //           "warning"

// //         );

// //       }



// //       if (totalRequested % 10 !== 0) {

// //         return showMessage(

// //           "Invalid Amount",

// //           `Amount must be in multiples of $10. Your total is $${totalRequested.toFixed(2)}.`,

// //           "warning"

// //         );

// //       }



// //       if (totalRequested < 10) {

// //         return showMessage(

// //           "Minimum Withdrawal",

// //           "Minimum total withdrawal amount is $10.",

// //           "warning"

// //         );

// //       }



// //       if (!transactionPassword.trim()) {

// //         return showMessage(

// //           "Password Required",

// //           "Please enter your transaction password.",

// //           "warning"

// //         );

// //       }



// //       setLoading(true);



// //       const endpoint = "/wallet/withdraw";



// //       // Backend dry-run calculation

// //       const response = await api.post(

// //         endpoint,

// //         {

// //           transactionPassword,

// //           items,

// //           dryRun: true,

// //         },

// //         {

// //           headers: {

// //             Authorization: `Bearer ${token}`,

// //           },

// //         }

// //       );



// //       const rep = response.data.report;



// //       setConfirmData({

// //         items,

// //         totalRequested: Number(rep.totalRequested) || 0,

// //         totalFeeDeducted: Number(rep.totalFeeDeducted) || 0,

// //         expectedUSDT: Number(rep.totalNetUSDT) || 0,

// //         expectedTopup: Number(rep.totalToTopupWallet) || 0,

// //         sources: [...new Set(successMessages)].join(", "),

// //       });

// //     } catch (err) {

// //       console.error(err);



// //       let errorMsg = "Calculation failed.";



// //       if (err.response?.data?.message) {

// //         errorMsg = err.response.data.message;

// //       } else if (err.message) {

// //         errorMsg = err.message;

// //       }



// //       if (err.response?.status === 403) {

// //         errorMsg = "Invalid Transaction Password";

// //       }



// //       if (errorMsg.toLowerCase().includes("once in a month")) {

// //         showMessage("Withdrawal Notice", errorMsg, "info");

// //       } else {

// //         showMessage("Validation Error", errorMsg, "error");

// //       }

// //     } finally {

// //       setLoading(false);

// //     }

// //   };



// //   // Second step: actual withdrawal

// //   const proceedWithdrawal = async () => {

// //     if (!confirmData || loading) return;



// //     try {

// //       setLoading(true);



// //       const endpoint = "/wallet/withdraw";



// //       const response = await api.post(

// //         endpoint,

// //         {

// //           transactionPassword,

// //           items: confirmData.items,

// //           dryRun: false,

// //         },

// //         {

// //           headers: {

// //             Authorization: `Bearer ${token}`,

// //           },

// //         }

// //       );



// //       setSuccessData({
// //         userId,
// //         userName: loggedInUser?.name || "",
// //         amount: Number(response.data.report?.totalNetUSDT) || confirmData.expectedUSDT,
// //         source: confirmData.sources,
// //       });



// //       setConfirmData(null);

// //       setSuccessOpen(true);



// //       setWithdrawals({

// //         direct: "",

// //         level: "",
// //         plan: "",

// //         reward: "",

// //       });



// //       setTransactionPassword("");



// //       await fetchData();

// //     } catch (err) {

// //       console.error(err);



// //       let errorMsg = "Withdrawal failed due to a server error.";



// //       if (err.response?.data?.message) {

// //         errorMsg = err.response.data.message;

// //       } else if (err.message) {

// //         errorMsg = err.message;

// //       }



// //       setConfirmData(null);



// //       if (errorMsg.toLowerCase().includes("once in a month")) {

// //         showMessage("Withdrawal Notice", errorMsg, "info");

// //       } else {

// //         showMessage("Withdrawal Error", errorMsg, "error");

// //       }

// //     } finally {

// //       setLoading(false);

// //     }

// //   };



// //   const closeSuccess = () => {

// //     setSuccessOpen(false);

// //     onClose();

// //   };



// //   const formatMoney = (value) =>

// //     (Number(value) || 0).toFixed(2);



// //   const incomeCards = [
// //     {
// //       key: "direct",
// //       title: "Direct Income",
// //       icon: <Zap size={17} />,
// //       color: "#b88922",
// //       balance: balances.direct,
// //     },
// //     {
// //       key: "level",
// //       title: "Level Income",
// //       icon: <Users size={17} />,
// //       color: "#2876b8",
// //       balance: balances.level,
// //     },
// //     {
// //       key: "plan",
// //       title: "Plan Income",
// //       icon: <Wallet size={17} />,
// //       color: "#08783f",
// //       balance: balances.plan,
// //     },
// //     {
// //       key: "reward",
// //       title: "Team Reward",
// //       icon: <Trophy size={17} />,
// //       color: "#8161c5",
// //       balance: balances.reward,
// //     },
// //   ];

// //   return (

// //     <>

// //       <style>{`

// //         .hp-withdraw-overlay {

// //           --hp-green: #08783f;

// //           --hp-dark: #07552e;

// //           --hp-gold: #e3bd50;

// //           position: fixed;

// //           inset: 0;

// //           z-index: 1000;

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           padding: 12px;

// //           overflow-y: auto;

// //           background: rgba(5, 25, 15, .68);

// //           backdrop-filter: blur(5px);

// //           font-family: Inter, Arial, sans-serif;

// //           animation: hpWithdrawFade .2s ease-out;

// //         }



// //         .hp-withdraw-overlay * {

// //           box-sizing: border-box;

// //         }



// //         .hp-withdraw-modal {

// //           width: 100%;

// //           max-width: 470px;

// //           max-height: 92vh;

// //           display: flex;

// //           flex-direction: column;

// //           overflow: hidden;

// //           border: 1px solid #dce9dc;

// //           border-radius: 18px;

// //           background: white;

// //           box-shadow: 0 22px 65px #0003;

// //           animation: hpWithdrawPop .25s ease-out;

// //         }



// //         .hp-withdraw-header {

// //           display: flex;

// //           align-items: center;

// //           justify-content: space-between;

// //           gap: 10px;

// //           padding: 13px 16px;

// //           border-bottom: 3px solid var(--hp-gold);

// //           background: linear-gradient(110deg, #07552e, #087b43);

// //           flex-shrink: 0;

// //         }



// //         .hp-withdraw-heading {

// //           display: flex;

// //           align-items: center;

// //           gap: 10px;

// //         }



// //         .hp-withdraw-icon {

// //           display: grid;

// //           place-items: center;

// //           width: 38px;

// //           height: 38px;

// //           border: 1px solid #ffffff40;

// //           border-radius: 11px;

// //           background: #ffffff15;

// //           color: #ffdf78;

// //         }



// //         .hp-withdraw-title {

// //           margin: 0;

// //           color: white;

// //           font-size: 14px;

// //           font-weight: 950;

// //           letter-spacing: .5px;

// //         }



// //         .hp-withdraw-subtitle {

// //           margin-top: 3px;

// //           color: #d5ead9;

// //           font-size: 9px;

// //           font-weight: 750;

// //           letter-spacing: .8px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-close {

// //           display: grid;

// //           place-items: center;

// //           width: 31px;

// //           height: 31px;

// //           border: 1px solid #ffffff35;

// //           border-radius: 9px;

// //           background: #ffffff12;

// //           color: white;

// //           cursor: pointer;

// //           transition: .2s;

// //         }



// //         .hp-withdraw-close:hover {

// //           background: #ffffff28;

// //           transform: rotate(90deg);

// //         }



// //         .hp-withdraw-body {

// //           flex: 1;

// //           min-height: 0;

// //           padding: 14px;

// //           overflow-y: auto;

// //           background: #fff;

// //           scrollbar-width: thin;

// //           scrollbar-color: #c6d9c8 transparent;

// //         }



// //         .hp-withdraw-summary {

// //           padding: 15px;

// //           border: 1px solid #d4e8d1;

// //           border-radius: 13px;

// //           background: linear-gradient(115deg, #eff9ed, #fbfcf5);

// //         }



// //         .hp-withdraw-summary-label {

// //           color: #56805d;

// //           font-size: 9px;

// //           font-weight: 950;

// //           letter-spacing: 1px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-summary-amount {

// //           margin-top: 5px;

// //           color: #08783f;

// //           font-family: monospace;

// //           font-size: 27px;

// //           font-weight: 950;

// //           letter-spacing: -1px;

// //         }



// //         .hp-withdraw-summary-note {

// //           margin-top: 3px;

// //           color: #78917d;

// //           font-size: 9px;

// //           font-weight: 700;

// //         }



// //         .hp-withdraw-address {

// //           margin-top: 11px;

// //           padding: 11px 12px;

// //           border: 1px solid #dce9dc;

// //           border-radius: 10px;

// //           background: #f8fbf7;

// //         }



// //         .hp-withdraw-address-label {

// //           margin-bottom: 5px;

// //           color: #637c68;

// //           font-size: 8px;

// //           font-weight: 950;

// //           letter-spacing: .9px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-address-value {

// //           color: #17613a;

// //           font-family: monospace;

// //           font-size: 10px;

// //           font-weight: 850;

// //           overflow-wrap: anywhere;

// //         }



// //         .hp-withdraw-warning {

// //           display: flex;

// //           align-items: center;

// //           justify-content: space-between;

// //           gap: 10px;

// //           margin-top: 11px;

// //           padding: 11px;

// //           border: 1px solid #f1cccc;

// //           border-radius: 10px;

// //           background: #fff5f4;

// //           color: #a63d3d;

// //           font-size: 10px;

// //           font-weight: 750;

// //         }



// //         .hp-withdraw-profile-link {

// //           display: inline-flex;

// //           align-items: center;

// //           gap: 5px;

// //           padding: 7px 9px;

// //           border-radius: 8px;

// //           background: #b63c36;

// //           color: white;

// //           font-size: 9px;

// //           font-weight: 950;

// //           text-decoration: none;

// //           white-space: nowrap;

// //         }



// //         .hp-withdraw-section-title {

// //           margin: 17px 0 9px;

// //           color: #244a31;

// //           font-size: 10px;

// //           font-weight: 950;

// //           letter-spacing: 1px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-income-card {

// //           margin-bottom: 9px;

// //           padding: 11px;

// //           border: 1px solid #e1eae0;

// //           border-radius: 11px;

// //           background: #fbfdf9;

// //           transition: .2s;

// //         }



// //         .hp-withdraw-income-card:focus-within {

// //           border-color: #94c99b;

// //           box-shadow: 0 0 0 3px #08783f0d;

// //         }



// //         .hp-withdraw-income-head {

// //           display: flex;

// //           align-items: center;

// //           justify-content: space-between;

// //           gap: 8px;

// //           margin-bottom: 9px;

// //         }



// //         .hp-withdraw-income-name {

// //           display: flex;

// //           align-items: center;

// //           gap: 7px;

// //           color: #31543a;

// //           font-size: 10px;

// //           font-weight: 950;

// //           text-transform: uppercase;

// //           letter-spacing: .5px;

// //         }



// //         .hp-withdraw-income-available {

// //           color: #08783f;

// //           font-family: monospace;

// //           font-size: 12px;

// //           font-weight: 950;

// //         }



// //         .hp-withdraw-input-row {

// //           display: flex;

// //           align-items: center;

// //           gap: 8px;

// //         }



// //         .hp-withdraw-input-label {

// //           color: #819083;

// //           font-size: 8px;

// //           font-weight: 850;

// //           white-space: nowrap;

// //         }



// //         .hp-withdraw-amount-input {

// //           width: 100%;

// //           min-width: 0;

// //           height: 38px;

// //           padding: 0 10px;

// //           border: 1px solid #dce8dc;

// //           border-radius: 8px;

// //           outline: none;

// //           background: white;

// //           color: #21482f;

// //           font-family: monospace;

// //           font-size: 12px;

// //           font-weight: 850;

// //           transition: .2s;

// //         }



// //         .hp-withdraw-amount-input:focus {

// //           border-color: #0b8748;

// //           box-shadow: 0 0 0 3px #08783f12;

// //         }



// //         .hp-withdraw-amount-input:disabled {

// //           background: #f0f2ef;

// //           cursor: not-allowed;

// //         }



// //         .hp-withdraw-total {

// //           display: flex;

// //           align-items: center;

// //           justify-content: space-between;

// //           gap: 10px;

// //           margin-top: 12px;

// //           padding: 12px;

// //           border: 1px solid #e5d59d;

// //           border-radius: 10px;

// //           background: #fff9e9;

// //         }



// //         .hp-withdraw-total-label {

// //           color: #85671e;

// //           font-size: 9px;

// //           font-weight: 950;

// //           letter-spacing: .7px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-total-value {

// //           color: #88651b;

// //           font-family: monospace;

// //           font-size: 18px;

// //           font-weight: 950;

// //         }



// //         .hp-withdraw-security {

// //           margin-top: 13px;

// //           padding: 11px;

// //           border: 1px solid #e0e9df;

// //           border-radius: 10px;

// //           background: #f8fbf7;

// //         }



// //         .hp-withdraw-label {

// //           display: block;

// //           margin: 0 0 7px 2px;

// //           color: #526b59;

// //           font-size: 9px;

// //           font-weight: 950;

// //           letter-spacing: .7px;

// //           text-transform: uppercase;

// //         }



// //         .hp-withdraw-password-wrap {

// //           position: relative;

// //         }



// //         .hp-withdraw-password {

// //           width: 100%;

// //           height: 41px;

// //           padding: 0 42px 0 36px;

// //           border: 1px solid #dce8dc;

// //           border-radius: 9px;

// //           outline: none;

// //           background: white;

// //           color: #21482f;

// //           font-family: monospace;

// //           font-size: 11px;

// //           font-weight: 750;

// //         }



// //         .hp-withdraw-password:focus {

// //           border-color: #0b8748;

// //           box-shadow: 0 0 0 3px #08783f12;

// //         }



// //         .hp-withdraw-password-icon {

// //           position: absolute;

// //           top: 50%;

// //           left: 11px;

// //           display: flex;

// //           color: #829586;

// //           transform: translateY(-50%);

// //           pointer-events: none;

// //         }



// //         .hp-withdraw-eye {

// //           position: absolute;

// //           top: 50%;

// //           right: 10px;

// //           display: flex;

// //           border: 0;

// //           background: transparent;

// //           color: #829586;

// //           cursor: pointer;

// //           transform: translateY(-50%);

// //         }



// //         .hp-withdraw-footer {

// //           display: flex;

// //           gap: 9px;

// //           padding: 12px 14px;

// //           border-top: 1px solid #e5eee4;

// //           background: #f8fbf7;

// //           flex-shrink: 0;

// //         }



// //         .hp-withdraw-btn {

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           gap: 7px;

// //           min-height: 42px;

// //           border-radius: 9px;

// //           font-size: 10px;

// //           font-weight: 950;

// //           letter-spacing: .6px;

// //           text-transform: uppercase;

// //           cursor: pointer;

// //           transition: .2s;

// //         }



// //         .hp-withdraw-btn-cancel {

// //           width: 34%;

// //           border: 1px solid #dce5dc;

// //           background: white;

// //           color: #65776a;

// //         }



// //         .hp-withdraw-btn-cancel:hover {

// //           background: #f0f4ef;

// //         }



// //         .hp-withdraw-btn-submit {

// //           flex: 1;

// //           border: 1px solid #d7b84e;

// //           background: linear-gradient(105deg, #087b43, #07552e);

// //           color: white;

// //           box-shadow: 0 4px 12px #08783f22;

// //         }



// //         .hp-withdraw-btn-submit:hover:not(:disabled) {

// //           transform: translateY(-1px);

// //           box-shadow: 0 6px 16px #08783f35;

// //         }



// //         .hp-withdraw-btn-submit:disabled {

// //           border-color: #dce5dc;

// //           background: #e8eee8;

// //           color: #92a095;

// //           box-shadow: none;

// //           cursor: not-allowed;

// //         }



// //         .hp-withdraw-confirm {

// //           padding: 18px;

// //           overflow-y: auto;

// //           text-align: center;

// //           background: white;

// //         }



// //         .hp-withdraw-confirm-icon {

// //           display: grid;

// //           place-items: center;

// //           width: 56px;

// //           height: 56px;

// //           margin: 0 auto 11px;

// //           border: 1px solid #f0dca3;

// //           border-radius: 50%;

// //           background: #fff7df;

// //           color: #aa811e;

// //         }



// //         .hp-withdraw-confirm-title {

// //           margin: 0;

// //           color: #17472a;

// //           font-size: 19px;

// //           font-weight: 950;

// //         }



// //         .hp-withdraw-confirm-desc {

// //           margin: 7px auto 15px;

// //           max-width: 300px;

// //           color: #7d8c80;

// //           font-size: 10px;

// //           line-height: 1.6;

// //           font-weight: 650;

// //         }



// //         .hp-withdraw-report {

// //           padding: 13px;

// //           border: 1px solid #e0e9df;

// //           border-radius: 12px;

// //           background: #f9fcf8;

// //           text-align: left;

// //         }



// //         .hp-withdraw-report-row {

// //           display: flex;

// //           align-items: center;

// //           justify-content: space-between;

// //           gap: 10px;

// //           padding: 10px 0;

// //           border-bottom: 1px solid #e7eee5;

// //         }



// //         .hp-withdraw-report-row:first-child {

// //           padding-top: 0;

// //         }



// //         .hp-withdraw-report-row:last-child {

// //           padding-bottom: 0;

// //           border-bottom: 0;

// //         }



// //         .hp-withdraw-report-label {

// //           color: #718174;

// //           font-size: 9px;

// //           font-weight: 850;

// //           text-transform: uppercase;

// //           letter-spacing: .4px;

// //         }



// //         .hp-withdraw-report-value {

// //           color: #244a31;

// //           font-family: monospace;

// //           font-size: 12px;

// //           font-weight: 950;

// //           text-align: right;

// //         }



// //         .hp-withdraw-confirm-actions {

// //           display: flex;

// //           gap: 9px;

// //           margin-top: 15px;

// //         }



// //         .hp-withdraw-confirm-actions button {

// //           flex: 1;

// //         }



// //         @keyframes hpWithdrawFade {

// //           from { opacity: 0; }

// //           to { opacity: 1; }

// //         }



// //         @keyframes hpWithdrawPop {

// //           from {

// //             opacity: 0;

// //             transform: translateY(12px) scale(.97);

// //           }

// //           to {

// //             opacity: 1;

// //             transform: translateY(0) scale(1);

// //           }

// //         }



// //         @media (max-width: 420px) {

// //           .hp-withdraw-overlay {

// //             padding: 8px;

// //           }



// //           .hp-withdraw-modal {

// //             max-height: 95vh;

// //             border-radius: 15px;

// //           }



// //           .hp-withdraw-header {

// //             padding: 11px 12px;

// //           }



// //           .hp-withdraw-body {

// //             padding: 11px;

// //           }



// //           .hp-withdraw-footer {

// //             padding: 10px 11px;

// //           }



// //           .hp-withdraw-confirm {

// //             padding: 14px;

// //           }

// //         }



// //         @media (prefers-reduced-motion: reduce) {

// //           .hp-withdraw-overlay,

// //           .hp-withdraw-modal {

// //             animation: none;

// //           }

// //         }

// //       `}</style>



// //       {!successOpen && (

// //         <div className="hp-withdraw-overlay">

// //           <div className="hp-withdraw-modal">

// //             {/* Header */}

// //             <div className="hp-withdraw-header">

// //               <div className="hp-withdraw-heading">

// //                 <div className="hp-withdraw-icon">

// //                   <Wallet size={19} />

// //                 </div>



// //                 <div>

// //                   <h2 className="hp-withdraw-title">

// //                     Withdraw Funds

// //                   </h2>

// //                   <div className="hp-withdraw-subtitle">

// //                     Secure Wallet Withdrawal

// //                   </div>

// //                 </div>

// //               </div>



// //               <button

// //                 type="button"

// //                 onClick={() =>

// //                   confirmData ? setConfirmData(null) : onClose()

// //                 }

// //                 className="hp-withdraw-close"

// //                 aria-label="Close"

// //                 disabled={loading}

// //               >

// //                 <X size={17} />

// //               </button>

// //             </div>



// //             {/* Confirmation screen */}

// //             {confirmData ? (

// //               <div className="hp-withdraw-confirm">

// //                 <div className="hp-withdraw-confirm-icon">

// //                   <AlertTriangle size={27} />

// //                 </div>



// //                 <h3 className="hp-withdraw-confirm-title">

// //                   Review Withdrawal

// //                 </h3>



// //                 <p className="hp-withdraw-confirm-desc">

// //                   Please review your withdrawal details carefully before

// //                   confirming the transaction.

// //                 </p>



// //                 <div className="hp-withdraw-report">

// //                   <div className="hp-withdraw-report-row">

// //                     <span className="hp-withdraw-report-label">

// //                       Requested Amount

// //                     </span>

// //                     <span className="hp-withdraw-report-value">

// //                       ${formatMoney(confirmData.totalRequested)}

// //                     </span>

// //                   </div>



// //                   <div className="hp-withdraw-report-row">

// //                     <span className="hp-withdraw-report-label">

// //                       Processing Fee (10%)

// //                     </span>

// //                     <span

// //                       className="hp-withdraw-report-value"

// //                       style={{ color: "#c44c4c" }}

// //                     >

// //                       -${formatMoney(confirmData.totalFeeDeducted)}

// //                     </span>

// //                   </div>



                  



// //                   <div className="hp-withdraw-report-row">

// //                     <span className="hp-withdraw-report-label">

// //                       To Withdrawal Request (50%)

// //                     </span>

// //                     <span

// //                       className="hp-withdraw-report-value"

// //                       style={{ color: "#08783f" }}

// //                     >

// //                       ${formatMoney(confirmData.expectedUSDT)}

// //                     </span>

// //                   </div>



// //                   <div className="hp-withdraw-report-row">

// //                     <span className="hp-withdraw-report-label">

// //                       To Wallet Balance (50%)

// //                     </span>

// //                     <span

// //                       className="hp-withdraw-report-value"

// //                       style={{ color: "#8060bb" }}

// //                     >

// //                       ${formatMoney(confirmData.expectedTopup)}

// //                     </span>

// //                   </div>

// //                 </div>



// //                 <div className="hp-withdraw-confirm-actions">

// //                   <button

// //                     type="button"

// //                     onClick={() => setConfirmData(null)}

// //                     disabled={loading}

// //                     className="hp-withdraw-btn hp-withdraw-btn-cancel"

// //                   >

// //                     Cancel

// //                   </button>



// //                   <button

// //                     type="button"

// //                     onClick={proceedWithdrawal}

// //                     disabled={loading}

// //                     className="hp-withdraw-btn hp-withdraw-btn-submit"

// //                   >

// //                     {loading ? (

// //                       <>

// //                         <LoaderCircle size={15} className="animate-spin" />

// //                         Processing

// //                       </>

// //                     ) : (

// //                       <>

// //                         <CheckCircle2 size={15} />

// //                         Confirm

// //                       </>

// //                     )}

// //                   </button>

// //                 </div>

// //               </div>

// //             ) : (

// //               <>

// //                 {/* Main withdrawal form */}

// //                 <div className="hp-withdraw-body">

// //                   {/* Withdrawable balance */}

// //                   <div className="hp-withdraw-summary">

// //                     <div className="hp-withdraw-summary-label">

// //                       Total Withdrawable Balance

// //                     </div>



// //                     <div className="hp-withdraw-summary-amount">

// //                       ${formatMoney(totalAvailableToWithdraw)}

// //                     </div>



// //                     <div className="hp-withdraw-summary-note">

// //                       Available from Direct, Level, Plan and Team Reward income. Net amount is split equally after 10% fee.

// //                     </div>

// //                   </div>



// //                   {/* Wallet address */}

// //                   {isAddressMissing ? (

// //                     <div className="hp-withdraw-warning">

// //                       <span>

// //                         No withdrawal address found. Please set your address

// //                         before withdrawing.

// //                       </span>



// //                       <Link

// //                         to="/profile"

// //                         onClick={onClose}

// //                         className="hp-withdraw-profile-link"

// //                       >

// //                         <UserCog size={12} />

// //                         Profile

// //                       </Link>

// //                     </div>

// //                   ) : (

// //                     <div className="hp-withdraw-address">

// //                       <div className="hp-withdraw-address-label">

// //                         <ShieldCheck

// //                           size={11}

// //                           style={{

// //                             display: "inline",

// //                             marginRight: 4,

// //                             verticalAlign: "middle",

// //                           }}

// //                         />

// //                         Your Saved Address

// //                       </div>



// //                       <div className="hp-withdraw-address-value">

// //                         {walletAddress}

// //                       </div>

// //                     </div>

// //                   )}



// //                   {/* Income selection */}

// //                   <div className="hp-withdraw-section-title">

// //                     Select Income Source

// //                   </div>



// //                   {isLeader ? (

// //                     <div className="hp-withdraw-warning">

// //                       <Info size={17} />

// //                       Leaders cannot withdraw funds directly from here.

// //                     </div>

// //                   ) : (

// //                     <>

// //                       {incomeCards.map((income) => (

// //                         <div

// //                           key={income.key}

// //                           className="hp-withdraw-income-card"

// //                         >

// //                           <div className="hp-withdraw-income-head">

// //                             <div className="hp-withdraw-income-name">

// //                               <span style={{ color: income.color }}>

// //                                 {income.icon}

// //                               </span>

// //                               {income.title}

// //                             </div>



// //                             <div className="hp-withdraw-income-available">

// //                               ${formatMoney(income.balance)}

// //                             </div>

// //                           </div>



// //                           <div className="hp-withdraw-input-row">

// //                             <span className="hp-withdraw-input-label">

// //                               WITHDRAW $

// //                             </span>



// //                             <input

// //                               type="number"

// //                               min="0"

// //                               step="0.01"

// //                               placeholder="Enter amount"

// //                               className="hp-withdraw-amount-input"

// //                               value={withdrawals[income.key]}

// //                               onChange={(e) =>

// //                                 handleInputChange(e, income.key)

// //                               }

// //                               disabled={isLeader}

// //                             />

// //                           </div>

// //                         </div>

// //                       ))}



// //                       {!hasMainIncome && (

// //                         <div

// //                           style={{

// //                             padding: "14px",

// //                             border: "1px solid #e3eadf",

// //                             borderRadius: 10,

// //                             background: "#f8fbf7",

// //                             color: "#718174",

// //                             textAlign: "center",

// //                             fontSize: 10,

// //                             fontWeight: 750,

// //                           }}

// //                         >

// //                           No withdrawable income is currently available.

// //                         </div>

// //                       )}



// //                       {/* Total entered */}

// //                       <div className="hp-withdraw-total">

// //                         <div className="hp-withdraw-total-label">

// //                           Total Entered Amount

// //                         </div>



// //                         <div className="hp-withdraw-total-value">

// //                           ${formatMoney(totalEnteredAmount)}

// //                         </div>

// //                       </div>



// //                       {/* Transaction password */}

// //                       <div className="hp-withdraw-security">

// //                         <label className="hp-withdraw-label">

// //                           <Lock

// //                             size={11}

// //                             style={{

// //                               display: "inline",

// //                               marginRight: 5,

// //                               verticalAlign: "middle",

// //                             }}

// //                           />

// //                           Transaction Password

// //                         </label>



// //                         <div

// //                           style={{

// //                             position: "absolute",

// //                             left: "-9999px",

// //                             opacity: 0,

// //                           }}

// //                           aria-hidden="true"

// //                         >

// //                           <input

// //                             type="text"

// //                             name="hidden_username"

// //                             tabIndex="-1"

// //                             autoComplete="username"

// //                           />

// //                           <input

// //                             type="password"

// //                             name="hidden_password"

// //                             tabIndex="-1"

// //                             autoComplete="current-password"

// //                           />

// //                         </div>



// //                         <div className="hp-withdraw-password-wrap">

// //                           <span className="hp-withdraw-password-icon">

// //                             <Lock size={15} />

// //                           </span>



// //                           <input

// //                             type={showPassword ? "text" : "password"}

// //                             autoComplete="new-password"

// //                             placeholder="Enter Transaction Password"

// //                             className="hp-withdraw-password"

// //                             value={transactionPassword}

// //                             onChange={(e) =>

// //                               setTransactionPassword(e.target.value)

// //                             }

// //                             disabled={isLeader}

// //                           />



// //                           <button

// //                             type="button"

// //                             onClick={() =>

// //                               setShowPassword((prev) => !prev)

// //                             }

// //                             className="hp-withdraw-eye"

// //                             aria-label={

// //                               showPassword

// //                                 ? "Hide password"

// //                                 : "Show password"

// //                             }

// //                           >

// //                             {showPassword ? (

// //                               <EyeOff size={16} />

// //                             ) : (

// //                               <Eye size={16} />

// //                             )}

// //                           </button>

// //                         </div>

// //                       </div>

// //                     </>

// //                   )}

// //                 </div>



// //                 {/* Footer */}

// //                 <div className="hp-withdraw-footer">

// //                   {isLeader ? (

// //                     <button

// //                       type="button"

// //                       onClick={onClose}

// //                       className="hp-withdraw-btn hp-withdraw-btn-cancel"

// //                       style={{ width: "100%" }}

// //                     >

// //                       Cancel

// //                     </button>

// //                   ) : (

// //                     <>

// //                       <button

// //                         type="button"

// //                         onClick={onClose}

// //                         className="hp-withdraw-btn hp-withdraw-btn-cancel"

// //                       >

// //                         Cancel

// //                       </button>



// //                       <button

// //                         type="button"

// //                         onClick={handlePreWithdrawCheck}

// //                         disabled={loading}

// //                         className="hp-withdraw-btn hp-withdraw-btn-submit"

// //                       >

// //                         {loading ? (

// //                           <>

// //                             <LoaderCircle

// //                               size={15}

// //                               className="animate-spin"

// //                             />

// //                             Checking...

// //                           </>

// //                         ) : (

// //                           <>

// //                             Withdraw Funds

// //                             <ArrowRight size={15} />

// //                           </>

// //                         )}

// //                       </button>

// //                     </>

// //                   )}

// //                 </div>

// //               </>

// //             )}

// //           </div>

// //         </div>

// //       )}



// //       {/* Success Modal */}

// //       {successOpen && (

// //         <SuccessModal

// //           isOpen={successOpen}

// //           onClose={closeSuccess}

// //           type="withdrawal"

// //           userId={successData.userId}

// //           userName={successData.userName}

// //           amount={successData.amount}

// //           source={successData.source}

// //         />

// //       )}



// //       {/* Message Modal */}

// //       {messageModal.open && (

// //         <MessageModal

// //           isOpen={messageModal.open}

// //           title={messageModal.title}

// //           message={messageModal.message}

// //           type={messageModal.type}

// //           onClose={() =>

// //             setMessageModal((prev) => ({

// //               ...prev,

// //               open: false,

// //             }))

// //           }

// //         />

// //       )}

// //     </>

// //   );

// // };



// // export default WithdrawalModal;








































// import React, { useState, useEffect, useCallback, useMemo } from "react";

// import api from "../../api/axios";

// import SuccessModal from "./SuccessModal";

// import MessageModal from "./MessageModal";

// import { useAuth } from "../../context/AuthContext";

// import {

//   Wallet,

//   Zap,

//   Users,

//   Trophy,

//   X,

//   UserCog,

//   Eye,

//   EyeOff,

//   AlertTriangle,

//   CheckCircle2,

//   ShieldCheck,

//   ArrowRight,

//   Lock,

//   LoaderCircle,

//   Info,

// } from "lucide-react";

// import { Link } from "react-router-dom";



// const WithdrawalModal = ({ userId, onClose }) => {

//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);



//   const [balances, setBalances] = useState({

//     walletBalance: 0,

//     direct: 0,

//     level: 0,
//     plan: 0,

//     reward: 0,

//     isUserToppedUp: false,

//   });



//   const [withdrawals, setWithdrawals] = useState({

//     direct: "",

//     level: "",
//     plan: "",

//     reward: "",

//   });



//   const [transactionPassword, setTransactionPassword] = useState("");

//   const [walletAddress, setWalletAddress] = useState("");

//   const [isAddressMissing, setIsAddressMissing] = useState(false);



//   const [confirmData, setConfirmData] = useState(null);



//   const [successOpen, setSuccessOpen] = useState(false);

//   const [successData, setSuccessData] = useState({

//     userId: "",

//     userName: "",

//     amount: 0,

//     source: "",

//   });



//   const [messageModal, setMessageModal] = useState({

//     open: false,

//     title: "",

//     message: "",

//     type: "info",

//   });



//   const { user: loggedInUser, token } = useAuth();




//   const isLeader = loggedInUser?.role === "leader";



//   const showMessage = (title, message, type = "error") => {

//     setMessageModal({

//       open: true,

//       title,

//       message,

//       type,

//     });

//   };



//   // Fetch withdrawable balance and user profile

//   const fetchData = useCallback(async () => {

//     try {

//       const [res, profileRes] = await Promise.all([

//         api.get(`/wallet/withdrawable/${userId}`, {

//           headers: { Authorization: `Bearer ${token}` },

//         }),

//         api.get(`/user/${userId}`, {

//           headers: { Authorization: `Bearer ${token}` },

//         }),

//       ]);



//       if (res.data) {

//         setBalances({

//           walletBalance: Number(res.data.walletBalance) || 0,

//           direct: Number(res.data.direct) || 0,

//           level: Number(res.data.level) || 0,
//           plan: Number(res.data.plan) || 0,

//           reward: Number(res.data.reward) || 0,

//           isUserToppedUp: Boolean(res.data.isUserToppedUp),

//         });

//       }



//       const u = profileRes.data?.user || profileRes.data;



//       if (u) {

//         const addr = (u.walletAddress || "").trim();

//         setWalletAddress(addr);

//         setIsAddressMissing(!addr);

//       }

//     } catch (err) {

//       console.error("Fetch Error:", err);

//       showMessage(

//         "Loading Error",

//         err.response?.data?.message || "Unable to load withdrawal details.",

//         "error"

//       );

//     }

//   }, [userId, token]);



//   useEffect(() => {

//     fetchData();

//   }, [fetchData]);



//   // All four supported income sources are included.

//   const totalAvailableToWithdraw =
//     balances.direct + balances.level + balances.plan + balances.reward;

//   const hasMainIncome =
//     balances.direct > 0 ||
//     balances.level > 0 ||
//     balances.plan > 0 ||
//     balances.reward > 0;



//   const totalEnteredAmount = useMemo(() => {

//     return (

//       (Number(withdrawals.direct) || 0) +

//       (Number(withdrawals.level) || 0) +

//       (Number(withdrawals.plan) || 0) +

//       (Number(withdrawals.reward) || 0)

//     );

//   }, [withdrawals]);



//   const handleInputChange = (e, source) => {

//     const value = e.target.value;



//     if (value === "" || /^\d*$/.test(value)) {

//       setWithdrawals((prev) => ({

//         ...prev,

//         [source]: value,

//       }));

//     }

//   };



//   // First step: validate and calculate withdrawal

//   const handlePreWithdrawCheck = async () => {

//     if (loading) return;



//     if (isLeader) {

//       return showMessage(

//         "Action Denied",

//         "Leaders cannot withdraw funds directly from here.",

//         "warning"

//       );

//     }



//     if (!balances.isUserToppedUp) {

//       return showMessage(

//         "Top-up Required",

//         "You must activate your package before withdrawing funds.",

//         "warning"

//       );

//     }



//     if (!walletAddress.trim() && isAddressMissing) {

//       return showMessage(

//         "Address Missing",

//         "Please set your withdrawal address in your Profile first.",

//         "warning"

//       );

//     }



//     const items = [];

//     let totalRequested = 0;

//     const successMessages = [];



//     const checkAndPush = (

//       sourceName,

//       inputVal,

//       availableBal,

//       displayName

//     ) => {

//       const amt = Number(inputVal);



//       if (amt > 0) {

//         if (amt > availableBal) {

//           throw new Error(`Insufficient funds in ${displayName}.`);

//         }



//         items.push({

//           source: sourceName,

//           amount: amt,

//         });



//         totalRequested += amt;

//         successMessages.push(displayName);

//       }

//     };



//     try {

//       checkAndPush(

//         "direct",

//         withdrawals.direct,

//         balances.direct,

//         "Direct Income"

//       );



//       checkAndPush(

//         "level",

//         withdrawals.level,

//         balances.level,

//         "Level Income"

//       );

//       checkAndPush(
//         "plan",
//         withdrawals.plan,
//         balances.plan,
//         "Plan Income"
//       );



//       checkAndPush(

//         "reward",

//         withdrawals.reward,

//         balances.reward,

//         "Royalty Earning"

//       );



//       if (totalRequested === 0) {

//         return showMessage(

//           "Amount Required",

//           "Please enter an amount to withdraw.",

//           "warning"

//         );

//       }



//       if (totalRequested % 10 !== 0) {

//         return showMessage(

//           "Invalid Amount",

//           `Amount must be in multiples of $10. Your total is $${totalRequested.toFixed(2)}.`,

//           "warning"

//         );

//       }



//       if (totalRequested < 10) {

//         return showMessage(

//           "Minimum Withdrawal",

//           "Minimum total withdrawal amount is $10.",

//           "warning"

//         );

//       }



//       if (!transactionPassword.trim()) {

//         return showMessage(

//           "Password Required",

//           "Please enter your transaction password.",

//           "warning"

//         );

//       }



//       setLoading(true);



//       const endpoint = "/wallet/withdraw";



//       // Backend dry-run calculation

//       const response = await api.post(

//         endpoint,

//         {

//           transactionPassword,

//           items,

//           dryRun: true,

//         },

//         {

//           headers: {

//             Authorization: `Bearer ${token}`,

//           },

//         }

//       );



//       const rep = response.data.report;



//       setConfirmData({

//         items,

//         totalRequested: Number(rep.totalRequested) || 0,

//         totalFeeDeducted: Number(rep.totalFeeDeducted) || 0,

//         expectedUSDT: Number(rep.totalNetUSDT) || 0,

//         expectedTopup: Number(rep.totalToTopupWallet) || 0,

//         sources: [...new Set(successMessages)].join(", "),

//       });

//     } catch (err) {

//       console.error(err);



//       let errorMsg = "Calculation failed.";



//       if (err.response?.data?.message) {

//         errorMsg = err.response.data.message;

//       } else if (err.message) {

//         errorMsg = err.message;

//       }





//       if (errorMsg.toLowerCase().includes("once in a month")) {

//         showMessage("Withdrawal Notice", errorMsg, "info");

//       } else {

//         showMessage("Validation Error", errorMsg, "error");

//       }

//     } finally {

//       setLoading(false);

//     }

//   };



//   // Second step: actual withdrawal

//   const proceedWithdrawal = async () => {

//     if (!confirmData || loading) return;



//     try {

//       setLoading(true);



//       const endpoint = "/wallet/withdraw";



//       const response = await api.post(

//         endpoint,

//         {

//           transactionPassword,

//           items: confirmData.items,

//           dryRun: false,

//         },

//         {

//           headers: {

//             Authorization: `Bearer ${token}`,

//           },

//         }

//       );



//       setSuccessData({
//         userId,
//         userName: loggedInUser?.name || "",
//         amount: Number(response.data.report?.totalNetUSDT) || confirmData.expectedUSDT,
//         source: confirmData.sources,
//       });



//       setConfirmData(null);

//       setSuccessOpen(true);



//       setWithdrawals({

//         direct: "",

//         level: "",
//         plan: "",

//         reward: "",

//       });



//       setTransactionPassword("");



//       await fetchData();

//     } catch (err) {

//       console.error(err);



//       let errorMsg = "Withdrawal failed due to a server error.";



//       if (err.response?.data?.message) {

//         errorMsg = err.response.data.message;

//       } else if (err.message) {

//         errorMsg = err.message;

//       }



//       setConfirmData(null);



//       if (errorMsg.toLowerCase().includes("once in a month")) {

//         showMessage("Withdrawal Notice", errorMsg, "info");

//       } else {

//         showMessage("Withdrawal Error", errorMsg, "error");

//       }

//     } finally {

//       setLoading(false);

//     }

//   };



//   const closeSuccess = () => {

//     setSuccessOpen(false);

//     onClose();

//   };



//   const formatMoney = (value) =>

//     (Number(value) || 0).toFixed(2);



//   const incomeCards = [
//     {
//       key: "direct",
//       title: "Direct Income",
//       icon: <Zap size={17} />,
//       color: "#b88922",
//       balance: balances.direct,
//     },
//     {
//       key: "level",
//       title: "Level Income",
//       icon: <Users size={17} />,
//       color: "#2876b8",
//       balance: balances.level,
//     },
//     {
//       key: "plan",
//       title: "Plan Income",
//       icon: <Wallet size={17} />,
//       color: "#08783f",
//       balance: balances.plan,
//     },
//     {
//       key: "reward",
//       title: "Team Reward",
//       icon: <Trophy size={17} />,
//       color: "#8161c5",
//       balance: balances.reward,
//     },
//   ];

//   return (

//     <>

//       <style>{`

//         .hp-withdraw-overlay {

//           --hp-green: #08783f;

//           --hp-dark: #07552e;

//           --hp-gold: #e3bd50;

//           position: fixed;

//           inset: 0;

//           z-index: 1000;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           padding: 12px;

//           overflow-y: auto;

//           background: rgba(5, 25, 15, .68);

//           backdrop-filter: blur(5px);

//           font-family: Inter, Arial, sans-serif;

//           animation: hpWithdrawFade .2s ease-out;

//         }



//         .hp-withdraw-overlay * {

//           box-sizing: border-box;

//         }



//         .hp-withdraw-modal {

//           width: 100%;

//           max-width: 470px;

//           max-height: 92vh;

//           display: flex;

//           flex-direction: column;

//           overflow: hidden;

//           border: 1px solid #dce9dc;

//           border-radius: 18px;

//           background: white;

//           box-shadow: 0 22px 65px #0003;

//           animation: hpWithdrawPop .25s ease-out;

//         }



//         .hp-withdraw-header {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 10px;

//           padding: 13px 16px;

//           border-bottom: 3px solid var(--hp-gold);

//           background: linear-gradient(110deg, #07552e, #087b43);

//           flex-shrink: 0;

//         }



//         .hp-withdraw-heading {

//           display: flex;

//           align-items: center;

//           gap: 10px;

//         }



//         .hp-withdraw-icon {

//           display: grid;

//           place-items: center;

//           width: 38px;

//           height: 38px;

//           border: 1px solid #ffffff40;

//           border-radius: 11px;

//           background: #ffffff15;

//           color: #ffdf78;

//         }



//         .hp-withdraw-title {

//           margin: 0;

//           color: white;

//           font-size: 14px;

//           font-weight: 950;

//           letter-spacing: .5px;

//         }



//         .hp-withdraw-subtitle {

//           margin-top: 3px;

//           color: #d5ead9;

//           font-size: 9px;

//           font-weight: 750;

//           letter-spacing: .8px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-close {

//           display: grid;

//           place-items: center;

//           width: 31px;

//           height: 31px;

//           border: 1px solid #ffffff35;

//           border-radius: 9px;

//           background: #ffffff12;

//           color: white;

//           cursor: pointer;

//           transition: .2s;

//         }



//         .hp-withdraw-close:hover {

//           background: #ffffff28;

//           transform: rotate(90deg);

//         }



//         .hp-withdraw-body {

//           flex: 1;

//           min-height: 0;

//           padding: 14px;

//           overflow-y: auto;

//           background: #fff;

//           scrollbar-width: thin;

//           scrollbar-color: #c6d9c8 transparent;

//         }



//         .hp-withdraw-summary {

//           padding: 15px;

//           border: 1px solid #d4e8d1;

//           border-radius: 13px;

//           background: linear-gradient(115deg, #eff9ed, #fbfcf5);

//         }



//         .hp-withdraw-summary-label {

//           color: #56805d;

//           font-size: 9px;

//           font-weight: 950;

//           letter-spacing: 1px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-summary-amount {

//           margin-top: 5px;

//           color: #08783f;

//           font-family: monospace;

//           font-size: 27px;

//           font-weight: 950;

//           letter-spacing: -1px;

//         }



//         .hp-withdraw-summary-note {

//           margin-top: 3px;

//           color: #78917d;

//           font-size: 9px;

//           font-weight: 700;

//         }



//         .hp-withdraw-address {

//           margin-top: 11px;

//           padding: 11px 12px;

//           border: 1px solid #dce9dc;

//           border-radius: 10px;

//           background: #f8fbf7;

//         }



//         .hp-withdraw-address-label {

//           margin-bottom: 5px;

//           color: #637c68;

//           font-size: 8px;

//           font-weight: 950;

//           letter-spacing: .9px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-address-value {

//           color: #17613a;

//           font-family: monospace;

//           font-size: 10px;

//           font-weight: 850;

//           overflow-wrap: anywhere;

//         }



//         .hp-withdraw-warning {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 10px;

//           margin-top: 11px;

//           padding: 11px;

//           border: 1px solid #f1cccc;

//           border-radius: 10px;

//           background: #fff5f4;

//           color: #a63d3d;

//           font-size: 10px;

//           font-weight: 750;

//         }



//         .hp-withdraw-profile-link {

//           display: inline-flex;

//           align-items: center;

//           gap: 5px;

//           padding: 7px 9px;

//           border-radius: 8px;

//           background: #b63c36;

//           color: white;

//           font-size: 9px;

//           font-weight: 950;

//           text-decoration: none;

//           white-space: nowrap;

//         }



//         .hp-withdraw-section-title {

//           margin: 17px 0 9px;

//           color: #244a31;

//           font-size: 10px;

//           font-weight: 950;

//           letter-spacing: 1px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-income-card {

//           margin-bottom: 9px;

//           padding: 11px;

//           border: 1px solid #e1eae0;

//           border-radius: 11px;

//           background: #fbfdf9;

//           transition: .2s;

//         }



//         .hp-withdraw-income-card:focus-within {

//           border-color: #94c99b;

//           box-shadow: 0 0 0 3px #08783f0d;

//         }



//         .hp-withdraw-income-head {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 8px;

//           margin-bottom: 9px;

//         }



//         .hp-withdraw-income-name {

//           display: flex;

//           align-items: center;

//           gap: 7px;

//           color: #31543a;

//           font-size: 10px;

//           font-weight: 950;

//           text-transform: uppercase;

//           letter-spacing: .5px;

//         }



//         .hp-withdraw-income-available {

//           color: #08783f;

//           font-family: monospace;

//           font-size: 12px;

//           font-weight: 950;

//         }



//         .hp-withdraw-input-row {

//           display: flex;

//           align-items: center;

//           gap: 8px;

//         }



//         .hp-withdraw-input-label {

//           color: #819083;

//           font-size: 8px;

//           font-weight: 850;

//           white-space: nowrap;

//         }



//         .hp-withdraw-amount-input {

//           width: 100%;

//           min-width: 0;

//           height: 38px;

//           padding: 0 10px;

//           border: 1px solid #dce8dc;

//           border-radius: 8px;

//           outline: none;

//           background: white;

//           color: #21482f;

//           font-family: monospace;

//           font-size: 12px;

//           font-weight: 850;

//           transition: .2s;

//         }



//         .hp-withdraw-amount-input:focus {

//           border-color: #0b8748;

//           box-shadow: 0 0 0 3px #08783f12;

//         }



//         .hp-withdraw-amount-input:disabled {

//           background: #f0f2ef;

//           cursor: not-allowed;

//         }



//         .hp-withdraw-total {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 10px;

//           margin-top: 12px;

//           padding: 12px;

//           border: 1px solid #e5d59d;

//           border-radius: 10px;

//           background: #fff9e9;

//         }



//         .hp-withdraw-total-label {

//           color: #85671e;

//           font-size: 9px;

//           font-weight: 950;

//           letter-spacing: .7px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-total-value {

//           color: #88651b;

//           font-family: monospace;

//           font-size: 18px;

//           font-weight: 950;

//         }



//         .hp-withdraw-security {

//           margin-top: 13px;

//           padding: 11px;

//           border: 1px solid #e0e9df;

//           border-radius: 10px;

//           background: #f8fbf7;

//         }



//         .hp-withdraw-label {

//           display: block;

//           margin: 0 0 7px 2px;

//           color: #526b59;

//           font-size: 9px;

//           font-weight: 950;

//           letter-spacing: .7px;

//           text-transform: uppercase;

//         }



//         .hp-withdraw-password-wrap {

//           position: relative;

//         }



//         .hp-withdraw-password {

//           width: 100%;

//           height: 41px;

//           padding: 0 42px 0 36px;

//           border: 1px solid #dce8dc;

//           border-radius: 9px;

//           outline: none;

//           background: white;

//           color: #21482f;

//           font-family: monospace;

//           font-size: 11px;

//           font-weight: 750;

//         }



//         .hp-withdraw-password:focus {

//           border-color: #0b8748;

//           box-shadow: 0 0 0 3px #08783f12;

//         }



//         .hp-withdraw-password-icon {

//           position: absolute;

//           top: 50%;

//           left: 11px;

//           display: flex;

//           color: #829586;

//           transform: translateY(-50%);

//           pointer-events: none;

//         }



//         .hp-withdraw-eye {

//           position: absolute;

//           top: 50%;

//           right: 10px;

//           display: flex;

//           border: 0;

//           background: transparent;

//           color: #829586;

//           cursor: pointer;

//           transform: translateY(-50%);

//         }



//         .hp-withdraw-footer {

//           display: flex;

//           gap: 9px;

//           padding: 12px 14px;

//           border-top: 1px solid #e5eee4;

//           background: #f8fbf7;

//           flex-shrink: 0;

//         }



//         .hp-withdraw-btn {

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           gap: 7px;

//           min-height: 42px;

//           border-radius: 9px;

//           font-size: 10px;

//           font-weight: 950;

//           letter-spacing: .6px;

//           text-transform: uppercase;

//           cursor: pointer;

//           transition: .2s;

//         }



//         .hp-withdraw-btn-cancel {

//           width: 34%;

//           border: 1px solid #dce5dc;

//           background: white;

//           color: #65776a;

//         }



//         .hp-withdraw-btn-cancel:hover {

//           background: #f0f4ef;

//         }



//         .hp-withdraw-btn-submit {

//           flex: 1;

//           border: 1px solid #d7b84e;

//           background: linear-gradient(105deg, #087b43, #07552e);

//           color: white;

//           box-shadow: 0 4px 12px #08783f22;

//         }



//         .hp-withdraw-btn-submit:hover:not(:disabled) {

//           transform: translateY(-1px);

//           box-shadow: 0 6px 16px #08783f35;

//         }



//         .hp-withdraw-btn-submit:disabled {

//           border-color: #dce5dc;

//           background: #e8eee8;

//           color: #92a095;

//           box-shadow: none;

//           cursor: not-allowed;

//         }



//         .hp-withdraw-confirm {

//           padding: 18px;

//           overflow-y: auto;

//           text-align: center;

//           background: white;

//         }



//         .hp-withdraw-confirm-icon {

//           display: grid;

//           place-items: center;

//           width: 56px;

//           height: 56px;

//           margin: 0 auto 11px;

//           border: 1px solid #f0dca3;

//           border-radius: 50%;

//           background: #fff7df;

//           color: #aa811e;

//         }



//         .hp-withdraw-confirm-title {

//           margin: 0;

//           color: #17472a;

//           font-size: 19px;

//           font-weight: 950;

//         }



//         .hp-withdraw-confirm-desc {

//           margin: 7px auto 15px;

//           max-width: 300px;

//           color: #7d8c80;

//           font-size: 10px;

//           line-height: 1.6;

//           font-weight: 650;

//         }



//         .hp-withdraw-report {

//           padding: 13px;

//           border: 1px solid #e0e9df;

//           border-radius: 12px;

//           background: #f9fcf8;

//           text-align: left;

//         }



//         .hp-withdraw-report-row {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 10px;

//           padding: 10px 0;

//           border-bottom: 1px solid #e7eee5;

//         }



//         .hp-withdraw-report-row:first-child {

//           padding-top: 0;

//         }



//         .hp-withdraw-report-row:last-child {

//           padding-bottom: 0;

//           border-bottom: 0;

//         }



//         .hp-withdraw-report-label {

//           color: #718174;

//           font-size: 9px;

//           font-weight: 850;

//           text-transform: uppercase;

//           letter-spacing: .4px;

//         }



//         .hp-withdraw-report-value {

//           color: #244a31;

//           font-family: monospace;

//           font-size: 12px;

//           font-weight: 950;

//           text-align: right;

//         }



//         .hp-withdraw-confirm-actions {

//           display: flex;

//           gap: 9px;

//           margin-top: 15px;

//         }



//         .hp-withdraw-confirm-actions button {

//           flex: 1;

//         }



//         @keyframes hpWithdrawFade {

//           from { opacity: 0; }

//           to { opacity: 1; }

//         }



//         @keyframes hpWithdrawPop {

//           from {

//             opacity: 0;

//             transform: translateY(12px) scale(.97);

//           }

//           to {

//             opacity: 1;

//             transform: translateY(0) scale(1);

//           }

//         }



//         @media (max-width: 420px) {

//           .hp-withdraw-overlay {

//             padding: 8px;

//           }



//           .hp-withdraw-modal {

//             max-height: 95vh;

//             border-radius: 15px;

//           }



//           .hp-withdraw-header {

//             padding: 11px 12px;

//           }



//           .hp-withdraw-body {

//             padding: 11px;

//           }



//           .hp-withdraw-footer {

//             padding: 10px 11px;

//           }



//           .hp-withdraw-confirm {

//             padding: 14px;

//           }

//         }



//         @media (prefers-reduced-motion: reduce) {

//           .hp-withdraw-overlay,

//           .hp-withdraw-modal {

//             animation: none;

//           }

//         }

//       `}</style>



//       {!successOpen && (

//         <div className="hp-withdraw-overlay">

//           <div className="hp-withdraw-modal">

//             {/* Header */}

//             <div className="hp-withdraw-header">

//               <div className="hp-withdraw-heading">

//                 <div className="hp-withdraw-icon">

//                   <Wallet size={19} />

//                 </div>



//                 <div>

//                   <h2 className="hp-withdraw-title">

//                     Withdraw Funds

//                   </h2>

//                   <div className="hp-withdraw-subtitle">

//                     Secure Wallet Withdrawal

//                   </div>

//                 </div>

//               </div>



//               <button

//                 type="button"

//                 onClick={() =>

//                   confirmData ? setConfirmData(null) : onClose()

//                 }

//                 className="hp-withdraw-close"

//                 aria-label="Close"

//                 disabled={loading}

//               >

//                 <X size={17} />

//               </button>

//             </div>



//             {/* Confirmation screen */}

//             {confirmData ? (

//               <div className="hp-withdraw-confirm">

//                 <div className="hp-withdraw-confirm-icon">

//                   <AlertTriangle size={27} />

//                 </div>



//                 <h3 className="hp-withdraw-confirm-title">

//                   Review Withdrawal

//                 </h3>



//                 <p className="hp-withdraw-confirm-desc">

//                   Please review your withdrawal details carefully before

//                   confirming the transaction.

//                 </p>



//                 <div className="hp-withdraw-report">

//                   <div className="hp-withdraw-report-row">

//                     <span className="hp-withdraw-report-label">

//                       Requested Amount

//                     </span>

//                     <span className="hp-withdraw-report-value">

//                       ${formatMoney(confirmData.totalRequested)}

//                     </span>

//                   </div>



//                   <div className="hp-withdraw-report-row">

//                     <span className="hp-withdraw-report-label">

//                       Processing Fee (10%)

//                     </span>

//                     <span

//                       className="hp-withdraw-report-value"

//                       style={{ color: "#c44c4c" }}

//                     >

//                       -${formatMoney(confirmData.totalFeeDeducted)}

//                     </span>

//                   </div>



                  



//                   <div className="hp-withdraw-report-row">

//                     <span className="hp-withdraw-report-label">

//                       To Withdrawal Request (50%)

//                     </span>

//                     <span

//                       className="hp-withdraw-report-value"

//                       style={{ color: "#08783f" }}

//                     >

//                       ${formatMoney(confirmData.expectedUSDT)}

//                     </span>

//                   </div>



//                   <div className="hp-withdraw-report-row">

//                     <span className="hp-withdraw-report-label">

//                       To Wallet Balance (50%)

//                     </span>

//                     <span

//                       className="hp-withdraw-report-value"

//                       style={{ color: "#8060bb" }}

//                     >

//                       ${formatMoney(confirmData.expectedTopup)}

//                     </span>

//                   </div>

//                 </div>



//                 <div className="hp-withdraw-confirm-actions">

//                   <button

//                     type="button"

//                     onClick={() => setConfirmData(null)}

//                     disabled={loading}

//                     className="hp-withdraw-btn hp-withdraw-btn-cancel"

//                   >

//                     Cancel

//                   </button>



//                   <button

//                     type="button"

//                     onClick={proceedWithdrawal}

//                     disabled={loading}

//                     className="hp-withdraw-btn hp-withdraw-btn-submit"

//                   >

//                     {loading ? (

//                       <>

//                         <LoaderCircle size={15} className="animate-spin" />

//                         Processing

//                       </>

//                     ) : (

//                       <>

//                         <CheckCircle2 size={15} />

//                         Confirm

//                       </>

//                     )}

//                   </button>

//                 </div>

//               </div>

//             ) : (

//               <>

//                 {/* Main withdrawal form */}

//                 <div className="hp-withdraw-body">

//                   {/* Withdrawable balance */}

//                   <div className="hp-withdraw-summary">

//                     <div className="hp-withdraw-summary-label">

//                       Total Withdrawable Balance

//                     </div>



//                     <div className="hp-withdraw-summary-amount">

//                       ${formatMoney(totalAvailableToWithdraw)}

//                     </div>



//                     <div className="hp-withdraw-summary-note">

//                       Available from Direct, Level, Plan and Team Reward income. Net amount is split equally after 10% fee.

//                     </div>

//                   </div>



//                   {/* Wallet address */}

//                   {isAddressMissing ? (

//                     <div className="hp-withdraw-warning">

//                       <span>

//                         No withdrawal address found. Please set your address

//                         before withdrawing.

//                       </span>



//                       <Link

//                         to="/profile"

//                         onClick={onClose}

//                         className="hp-withdraw-profile-link"

//                       >

//                         <UserCog size={12} />

//                         Profile

//                       </Link>

//                     </div>

//                   ) : (

//                     <div className="hp-withdraw-address">

//                       <div className="hp-withdraw-address-label">

//                         <ShieldCheck

//                           size={11}

//                           style={{

//                             display: "inline",

//                             marginRight: 4,

//                             verticalAlign: "middle",

//                           }}

//                         />

//                         Your Saved Address

//                       </div>



//                       <div className="hp-withdraw-address-value">

//                         {walletAddress}

//                       </div>

//                     </div>

//                   )}



//                   {/* Income selection */}

//                   <div className="hp-withdraw-section-title">

//                     Select Income Source

//                   </div>



//                   {isLeader ? (

//                     <div className="hp-withdraw-warning">

//                       <Info size={17} />

//                       Leaders cannot withdraw funds directly from here.

//                     </div>

//                   ) : (

//                     <>

//                       {incomeCards.map((income) => (

//                         <div

//                           key={income.key}

//                           className="hp-withdraw-income-card"

//                         >

//                           <div className="hp-withdraw-income-head">

//                             <div className="hp-withdraw-income-name">

//                               <span style={{ color: income.color }}>

//                                 {income.icon}

//                               </span>

//                               {income.title}

//                             </div>



//                             <div className="hp-withdraw-income-available">

//                               ${formatMoney(income.balance)}

//                             </div>

//                           </div>



//                           <div className="hp-withdraw-input-row">

//                             <span className="hp-withdraw-input-label">

//                               WITHDRAW $

//                             </span>



//                             <input

//                               type="number"

//                               min="0"

//                               step="0.01"

//                               placeholder="Enter amount"

//                               className="hp-withdraw-amount-input"

//                               value={withdrawals[income.key]}

//                               onChange={(e) =>

//                                 handleInputChange(e, income.key)

//                               }

//                               disabled={isLeader}

//                             />

//                           </div>

//                         </div>

//                       ))}



//                       {!hasMainIncome && (

//                         <div

//                           style={{

//                             padding: "14px",

//                             border: "1px solid #e3eadf",

//                             borderRadius: 10,

//                             background: "#f8fbf7",

//                             color: "#718174",

//                             textAlign: "center",

//                             fontSize: 10,

//                             fontWeight: 750,

//                           }}

//                         >

//                           No withdrawable income is currently available.

//                         </div>

//                       )}



//                       {/* Total entered */}

//                       <div className="hp-withdraw-total">

//                         <div className="hp-withdraw-total-label">

//                           Total Entered Amount

//                         </div>



//                         <div className="hp-withdraw-total-value">

//                           ${formatMoney(totalEnteredAmount)}

//                         </div>

//                       </div>



//                       {/* Transaction password */}

//                       <div className="hp-withdraw-security">

//                         <label className="hp-withdraw-label">

//                           <Lock

//                             size={11}

//                             style={{

//                               display: "inline",

//                               marginRight: 5,

//                               verticalAlign: "middle",

//                             }}

//                           />

//                           Transaction Password

//                         </label>



//                         <div

//                           style={{

//                             position: "absolute",

//                             left: "-9999px",

//                             opacity: 0,

//                           }}

//                           aria-hidden="true"

//                         >

//                           <input

//                             type="text"

//                             name="hidden_username"

//                             tabIndex="-1"

//                             autoComplete="username"

//                           />

//                           <input

//                             type="password"

//                             name="hidden_password"

//                             tabIndex="-1"

//                             autoComplete="current-password"

//                           />

//                         </div>



//                         <div className="hp-withdraw-password-wrap">

//                           <span className="hp-withdraw-password-icon">

//                             <Lock size={15} />

//                           </span>



//                           <input

//                             type={showPassword ? "text" : "password"}

//                             autoComplete="new-password"

//                             placeholder="Enter Transaction Password"

//                             className="hp-withdraw-password"

//                             value={transactionPassword}

//                             onChange={(e) =>

//                               setTransactionPassword(e.target.value)

//                             }

//                             disabled={isLeader}

//                           />



//                           <button

//                             type="button"

//                             onClick={() =>

//                               setShowPassword((prev) => !prev)

//                             }

//                             className="hp-withdraw-eye"

//                             aria-label={

//                               showPassword

//                                 ? "Hide password"

//                                 : "Show password"

//                             }

//                           >

//                             {showPassword ? (

//                               <EyeOff size={16} />

//                             ) : (

//                               <Eye size={16} />

//                             )}

//                           </button>

//                         </div>

//                       </div>

//                     </>

//                   )}

//                 </div>



//                 {/* Footer */}

//                 <div className="hp-withdraw-footer">

//                   {isLeader ? (

//                     <button

//                       type="button"

//                       onClick={onClose}

//                       className="hp-withdraw-btn hp-withdraw-btn-cancel"

//                       style={{ width: "100%" }}

//                     >

//                       Cancel

//                     </button>

//                   ) : (

//                     <>

//                       <button

//                         type="button"

//                         onClick={onClose}

//                         className="hp-withdraw-btn hp-withdraw-btn-cancel"

//                       >

//                         Cancel

//                       </button>



//                       <button

//                         type="button"

//                         onClick={handlePreWithdrawCheck}

//                         disabled={loading}

//                         className="hp-withdraw-btn hp-withdraw-btn-submit"

//                       >

//                         {loading ? (

//                           <>

//                             <LoaderCircle

//                               size={15}

//                               className="animate-spin"

//                             />

//                             Checking...

//                           </>

//                         ) : (

//                           <>

//                             Withdraw Funds

//                             <ArrowRight size={15} />

//                           </>

//                         )}

//                       </button>

//                     </>

//                   )}

//                 </div>

//               </>

//             )}

//           </div>

//         </div>

//       )}



//       {/* Success Modal */}

//       {successOpen && (

//         <SuccessModal

//           isOpen={successOpen}

//           onClose={closeSuccess}

//           type="withdrawal"

//           userId={successData.userId}

//           userName={successData.userName}

//           amount={successData.amount}

//           source={successData.source}

//         />

//       )}



//       {/* Message Modal */}

//       {messageModal.open && (

//         <MessageModal

//           isOpen={messageModal.open}

//           title={messageModal.title}

//           message={messageModal.message}

//           type={messageModal.type}

//           onClose={() =>

//             setMessageModal((prev) => ({

//               ...prev,

//               open: false,

//             }))

//           }

//         />

//       )}

//     </>

//   );

// };



// export default WithdrawalModal;



import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import api from "../../api/axios";
import SuccessModal from "./SuccessModal";
import MessageModal from "./MessageModal";
import { useAuth } from "../../context/AuthContext";
import {
  Wallet,
  Zap,
  Users,
  Trophy,
  X,
  UserCog,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Lock,
  LoaderCircle,
  Info,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

const money = (value) => (Number(value) || 0).toFixed(2);


const getStageAvailable = (stage) => {
  const values = [
    stage?.available,
    stage?.availableAmount,
    stage?.withdrawableAmount,
    stage?.availableBalance
  ];

  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      return Math.max(0, Number(value) || 0);
    }
  }

  const earned = Number(stage?.earned ?? stage?.earningAmount) || 0;
  const withdrawn = Number(stage?.withdrawn ?? stage?.withdrawnAmount) || 0;

  return Math.max(0, earned - withdrawn);
};


const WithdrawalModal = ({ userId, onClose }) => {
  const { user: loggedInUser, token } = useAuth();

  const isLeader = loggedInUser?.role === "leader";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [balances, setBalances] = useState({
    walletBalance: 0,
    direct: 0,
    level: 0,
    reward: 0,
    isUserToppedUp: false
  });

  const [packageSubscriptions, setPackageSubscriptions] = useState([]);
  const [withdrawals, setWithdrawals] = useState({
    direct: "",
    level: "",
    reward: ""
  });

  const [stageWithdrawals, setStageWithdrawals] = useState({});

  const [transactionPassword, setTransactionPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isAddressMissing, setIsAddressMissing] = useState(false);

  const [confirmData, setConfirmData] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const [successData, setSuccessData] = useState({
    userId: "",
    userName: "",
    amount: 0,
    source: ""
  });

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info"
  });

  const showMessage = (title, message, type = "error") => {
    setMessageModal({
      open: true,
      title,
      message,
      type
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const [res, profileRes] = await Promise.all([
        api.get(`/wallet/withdrawable/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),

        api.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const data = res.data || {};

      setBalances({
        walletBalance: Number(data.walletBalance) || 0,
        direct: Number(data.direct) || 0,
        level: Number(data.level) || 0,
        reward: Number(data.reward) || 0,
        isUserToppedUp: Boolean(data.isUserToppedUp)
      });

      setPackageSubscriptions(
        Array.isArray(data.packageSubscriptions)
          ? data.packageSubscriptions
          : []
      );

      const profile = profileRes.data?.user || profileRes.data;

      if (profile) {
        const address = (profile.walletAddress || "").trim();

        setWalletAddress(address);
        setIsAddressMissing(!address);
      }
    } catch (err) {
      console.error("Withdrawal data error:", err);

      showMessage(
        "Loading Error",
        err.response?.data?.message ||
          "Unable to load withdrawal details.",
        "error"
      );
    }
  }, [userId, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stageRows = useMemo(() => {
    return packageSubscriptions.flatMap((subscription) => {
      const stages = Array.isArray(subscription.stages)
        ? subscription.stages
        : [];

      return stages.map((stage) => ({
        subscriptionId:
          subscription._id || subscription.id || subscription.subscriptionId,

        packageAmount: Number(subscription.packageAmount) || 0,
        cycleNumber: Number(subscription.cycleNumber) || 1,

        stageNumber: Number(stage.stageNumber),
        status: stage.status || "LOCKED",
        earningStatus: stage.earningStatus || "NOT_RECORDED",

        earningAmount: Number(stage.earningAmount) || 0,
        availableAmount: getStageAvailable(stage),

        raw: stage
      }));
    });
  }, [packageSubscriptions]);

  const totalStageAvailable = useMemo(() => {
    return stageRows.reduce(
      (sum, stage) => sum + stage.availableAmount,
      0
    );
  }, [stageRows]);

  const totalAvailableToWithdraw =
    balances.direct +
    balances.level +
    balances.reward +
    totalStageAvailable;

  const hasMainIncome = totalAvailableToWithdraw > 0;

  const totalEnteredAmount = useMemo(() => {
    const normalTotal =
      (Number(withdrawals.direct) || 0) +
      (Number(withdrawals.level) || 0) +
      (Number(withdrawals.reward) || 0);

    const stageTotal = Object.values(stageWithdrawals).reduce(
      (sum, value) => sum + (Number(value) || 0),
      0
    );

    return normalTotal + stageTotal;
  }, [withdrawals, stageWithdrawals]);

  const handleInputChange = (event, source) => {
    const value = event.target.value;

    if (value === "" || /^\d*$/.test(value)) {
      setWithdrawals((previous) => ({
        ...previous,
        [source]: value
      }));
    }
  };

  const handleStageInputChange = (event, stage) => {
    const value = event.target.value;

    if (value !== "" && !/^\d*$/.test(value)) {
      return;
    }

    const key = `${stage.subscriptionId}_${stage.stageNumber}`;

    setStageWithdrawals((previous) => ({
      ...previous,
      [key]: value
    }));
  };

  const buildWithdrawalItems = () => {
    const items = [];

    const addNormalItem = (source, amount, available, label) => {
      const requested = Number(amount) || 0;

      if (requested < 0) {
        throw new Error(`Invalid amount in ${label}.`);
      }

      if (requested > available) {
        throw new Error(`Insufficient balance in ${label}.`);
      }

      if (requested > 0) {
        items.push({
          source,
          amount: requested
        });
      }
    };

    addNormalItem(
      "direct",
      withdrawals.direct,
      balances.direct,
      "Direct Income"
    );

    addNormalItem(
      "level",
      withdrawals.level,
      balances.level,
      "Level Income"
    );

  

    for (const stage of stageRows) {
      const key = `${stage.subscriptionId}_${stage.stageNumber}`;
      const amount = Number(stageWithdrawals[key]) || 0;

      if (amount <= 0) continue;

      if (!stage.subscriptionId) {
        throw new Error(
          `Stage ${stage.stageNumber} has an invalid subscription ID.`
        );
      }

      if (stage.earningStatus !== "RECORDED") {
        throw new Error(
          `Stage ${stage.stageNumber} earning is not recorded yet.`
        );
      }

      if (amount > stage.availableAmount) {
        throw new Error(
          `Insufficient balance in Stage ${stage.stageNumber}.`
        );
      }

      items.push({
        source: "plan_stage",
        subscriptionId: stage.subscriptionId,
        stageNumber: stage.stageNumber,
        amount
      });
    }

    return items;
  };

  const handlePreWithdrawCheck = async () => {
    if (loading) return;

    if (isLeader) {
      return showMessage(
        "Action Denied",
        "Leaders cannot withdraw funds directly from here.",
        "warning"
      );
    }

    if (!balances.isUserToppedUp) {
      return showMessage(
        "Top-up Required",
        "You must activate your package before withdrawing funds.",
        "warning"
      );
    }

    if (isAddressMissing || !walletAddress.trim()) {
      return showMessage(
        "Address Missing",
        "Please set your withdrawal address in your Profile first.",
        "warning"
      );
    }

    if (!transactionPassword.trim()) {
      return showMessage(
        "Password Required",
        "Please enter your transaction password.",
        "warning"
      );
    }

    try {
      const items = buildWithdrawalItems();

      const totalRequested = items.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      if (totalRequested <= 0) {
        return showMessage(
          "Amount Required",
          "Please enter an amount to withdraw.",
          "warning"
        );
      }

      if (!Number.isInteger(totalRequested)) {
        return showMessage(
          "Invalid Amount",
          "Withdrawal amount must be a whole number.",
          "warning"
        );
      }

      if (totalRequested < 10) {
        return showMessage(
          "Minimum Withdrawal",
          "Minimum total withdrawal amount is $10.",
          "warning"
        );
      }

      if (totalRequested % 10 !== 0) {
        return showMessage(
          "Invalid Amount",
          `Total withdrawal must be in multiples of $10. Your total is $${money(totalRequested)}.`,
          "warning"
        );
      }

      setLoading(true);

      const response = await api.post(
        "/wallet/withdraw",
        {
          transactionPassword,
          items,
          dryRun: true
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const report = response.data?.report;

      if (!report) {
        throw new Error("Withdrawal calculation response is invalid.");
      }

      setConfirmData({
        items,
        totalRequested: Number(report.totalRequested) || totalRequested,
        totalFeeDeducted: Number(report.totalFeeDeducted) || 0,
        expectedUSDT: Number(report.totalNetUSDT) || 0,
        expectedTopup: Number(report.totalToTopupWallet) || 0,
        sources: items
          .map((item) => {
            if (item.source === "plan_stage") {
              return `Package Stage ${item.stageNumber}`;
            }

            return item.source;
          })
          .join(", ")
      });
    } catch (err) {
      console.error("Withdrawal validation error:", err);

      showMessage(
        "Validation Error",
        err.response?.data?.message ||
          err.message ||
          "Withdrawal calculation failed.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const proceedWithdrawal = async () => {
    if (!confirmData || loading) return;

    try {
      setLoading(true);

      const response = await api.post(
        "/wallet/withdraw",
        {
          transactionPassword,
          items: confirmData.items,
          dryRun: false
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccessData({
        userId,
        userName: loggedInUser?.name || "",
        amount:
          Number(response.data?.report?.totalNetUSDT) ||
          confirmData.expectedUSDT,
        source: confirmData.sources
      });

      setConfirmData(null);
      setSuccessOpen(true);

      setWithdrawals({
        direct: "",
        level: "",
        reward: ""
      });

      setStageWithdrawals({});
      setTransactionPassword("");

      await fetchData();
    } catch (err) {
      console.error("Withdrawal submit error:", err);

      setConfirmData(null);

      showMessage(
        "Withdrawal Error",
        err.response?.data?.message ||
          err.message ||
          "Withdrawal failed.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
    onClose();
  };

  const incomeCards = [
    {
      key: "direct",
      title: "Direct Income",
      icon: <Zap size={17} />,
      color: "#b88922",
      balance: balances.direct
    },
    {
      key: "level",
      title: "Level Income",
      icon: <Users size={17} />,
      color: "#2876b8",
      balance: balances.level
    },
   
  ];

  return (
    <>
      <style>{`
        .hp-withdraw-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow-y: auto;
          background: rgba(5,25,15,.68);
          backdrop-filter: blur(5px);
          font-family: Inter,Arial,sans-serif;
        }

        .hp-withdraw-overlay * {
          box-sizing: border-box;
        }

        .hp-withdraw-modal {
          width: 100%;
          max-width: 500px;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #dce9dc;
          border-radius: 18px;
          background: white;
          box-shadow: 0 22px 65px #0003;
        }

        .hp-withdraw-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          border-bottom: 3px solid #e3bd50;
          background: linear-gradient(110deg,#07552e,#087b43);
          flex-shrink: 0;
        }

        .hp-withdraw-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hp-withdraw-icon {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: #ffffff15;
          color: #ffdf78;
        }

        .hp-withdraw-title {
          margin: 0;
          color: white;
          font-size: 14px;
          font-weight: 950;
        }

        .hp-withdraw-subtitle {
          margin-top: 3px;
          color: #d5ead9;
          font-size: 9px;
          text-transform: uppercase;
        }

        .hp-withdraw-close {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid #ffffff35;
          border-radius: 9px;
          background: #ffffff12;
          color: white;
          cursor: pointer;
        }

        .hp-withdraw-body {
          flex: 1;
          min-height: 0;
          padding: 14px;
          overflow-y: auto;
          background: white;
        }

        .hp-withdraw-summary {
          padding: 15px;
          border: 1px solid #d4e8d1;
          border-radius: 13px;
          background: linear-gradient(115deg,#eff9ed,#fbfcf5);
        }

        .hp-withdraw-summary-label {
          color: #56805d;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
        }

        .hp-withdraw-summary-amount {
          margin-top: 5px;
          color: #08783f;
          font-family: monospace;
          font-size: 27px;
          font-weight: 950;
        }

        .hp-withdraw-summary-note {
          margin-top: 4px;
          color: #78917d;
          font-size: 9px;
          line-height: 1.5;
        }

        .hp-withdraw-section-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 17px 0 9px;
          color: #244a31;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .hp-withdraw-income-card,
        .hp-withdraw-stage-card {
          margin-bottom: 9px;
          padding: 11px;
          border: 1px solid #e1eae0;
          border-radius: 11px;
          background: #fbfdf9;
        }

        .hp-withdraw-income-head,
        .hp-withdraw-stage-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 9px;
        }

        .hp-withdraw-income-name {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #31543a;
          font-size: 10px;
          font-weight: 950;
          text-transform: uppercase;
        }

        .hp-withdraw-available {
          color: #08783f;
          font-family: monospace;
          font-size: 12px;
          font-weight: 950;
        }

        .hp-withdraw-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hp-withdraw-input-label {
          color: #819083;
          font-size: 8px;
          font-weight: 850;
          white-space: nowrap;
        }

        .hp-withdraw-amount-input {
          width: 100%;
          min-width: 0;
          height: 38px;
          padding: 0 10px;
          border: 1px solid #dce8dc;
          border-radius: 8px;
          outline: none;
          background: white;
          color: #21482f;
          font-family: monospace;
          font-size: 12px;
          font-weight: 850;
        }

        .hp-withdraw-amount-input:focus {
          border-color: #0b8748;
          box-shadow: 0 0 0 3px #08783f12;
        }

        .hp-withdraw-amount-input:disabled {
          background: #f0f2ef;
          cursor: not-allowed;
        }

        .hp-withdraw-stage-title {
          color: #31543a;
          font-size: 10px;
          font-weight: 950;
        }

        .hp-withdraw-stage-meta {
          margin-top: 4px;
          color: #829083;
          font-size: 9px;
        }

        .hp-withdraw-stage-status {
          display: inline-block;
          padding: 4px 7px;
          border-radius: 6px;
          background: #edf4eb;
          color: #47734e;
          font-size: 8px;
          font-weight: 900;
        }

        .hp-withdraw-stage-status.locked {
          background: #f2f2f2;
          color: #858585;
        }

        .hp-withdraw-stage-status.pending {
          background: #fff4dc;
          color: #98701e;
        }

        .hp-withdraw-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 12px;
          padding: 12px;
          border: 1px solid #e5d59d;
          border-radius: 10px;
          background: #fff9e9;
        }

        .hp-withdraw-total-label {
          color: #85671e;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
        }

        .hp-withdraw-total-value {
          color: #88651b;
          font-family: monospace;
          font-size: 18px;
          font-weight: 950;
        }

        .hp-withdraw-security {
          margin-top: 13px;
          padding: 11px;
          border: 1px solid #e0e9df;
          border-radius: 10px;
          background: #f8fbf7;
        }

        .hp-withdraw-label {
          display: block;
          margin-bottom: 7px;
          color: #526b59;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
        }

        .hp-withdraw-password-wrap {
          position: relative;
        }

        .hp-withdraw-password {
          width: 100%;
          height: 41px;
          padding: 0 42px 0 36px;
          border: 1px solid #dce8dc;
          border-radius: 9px;
          outline: none;
          background: white;
          color: #21482f;
          font-family: monospace;
          font-size: 11px;
        }

        .hp-withdraw-password-icon {
          position: absolute;
          top: 50%;
          left: 11px;
          display: flex;
          color: #829586;
          transform: translateY(-50%);
        }

        .hp-withdraw-eye {
          position: absolute;
          top: 50%;
          right: 10px;
          display: flex;
          border: 0;
          background: transparent;
          color: #829586;
          cursor: pointer;
          transform: translateY(-50%);
        }

        .hp-withdraw-address,
        .hp-withdraw-warning {
          margin-top: 11px;
          padding: 11px;
          border: 1px solid #dce9dc;
          border-radius: 10px;
          background: #f8fbf7;
          color: #31543a;
          font-size: 10px;
        }

        .hp-withdraw-address-value {
          margin-top: 5px;
          overflow-wrap: anywhere;
          font-family: monospace;
          font-size: 10px;
          font-weight: 850;
        }

        .hp-withdraw-warning {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-color: #f1cccc;
          background: #fff5f4;
          color: #a63d3d;
        }

        .hp-withdraw-profile-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 9px;
          border-radius: 8px;
          background: #b63c36;
          color: white;
          font-size: 9px;
          font-weight: 950;
          text-decoration: none;
        }

        .hp-withdraw-footer,
        .hp-withdraw-confirm-actions {
          display: flex;
          gap: 9px;
          padding: 12px 14px;
          border-top: 1px solid #e5eee4;
          background: #f8fbf7;
          flex-shrink: 0;
        }

        .hp-withdraw-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 42px;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 950;
          text-transform: uppercase;
          cursor: pointer;
        }

        .hp-withdraw-btn-cancel {
          width: 34%;
          border: 1px solid #dce5dc;
          background: white;
          color: #65776a;
        }

        .hp-withdraw-btn-submit {
          flex: 1;
          border: 1px solid #d7b84e;
          background: linear-gradient(105deg,#087b43,#07552e);
          color: white;
        }

        .hp-withdraw-btn-submit:disabled {
          background: #e8eee8;
          color: #92a095;
          cursor: not-allowed;
        }

        .hp-withdraw-confirm {
          padding: 18px;
          overflow-y: auto;
          text-align: center;
          background: white;
        }

        .hp-withdraw-confirm-icon {
          display: grid;
          place-items: center;
          width: 56px;
          height: 56px;
          margin: 0 auto 11px;
          border-radius: 50%;
          background: #fff7df;
          color: #aa811e;
        }

        .hp-withdraw-confirm-title {
          margin: 0;
          color: #17472a;
          font-size: 19px;
          font-weight: 950;
        }

        .hp-withdraw-confirm-desc {
          margin: 7px auto 15px;
          max-width: 300px;
          color: #7d8c80;
          font-size: 10px;
          line-height: 1.6;
        }

        .hp-withdraw-report {
          padding: 13px;
          border: 1px solid #e0e9df;
          border-radius: 12px;
          background: #f9fcf8;
          text-align: left;
        }

        .hp-withdraw-report-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #e7eee5;
        }

        .hp-withdraw-report-row:last-child {
          border-bottom: 0;
        }

        .hp-withdraw-report-label {
          color: #718174;
          font-size: 9px;
          font-weight: 850;
          text-transform: uppercase;
        }

        .hp-withdraw-report-value {
          color: #244a31;
          font-family: monospace;
          font-size: 12px;
          font-weight: 950;
          text-align: right;
        }

        .hp-withdraw-confirm-actions button {
          flex: 1;
        }

        @media(max-width:420px) {
          .hp-withdraw-overlay {
            padding: 8px;
          }

          .hp-withdraw-modal {
            max-height: 96vh;
          }

          .hp-withdraw-body {
            padding: 11px;
          }
        }
      `}</style>

      {!successOpen && (
        <div className="hp-withdraw-overlay">
          <div className="hp-withdraw-modal">

            <div className="hp-withdraw-header">
              <div className="hp-withdraw-heading">
                <div className="hp-withdraw-icon">
                  <Wallet size={19} />
                </div>

                <div>
                  <h2 className="hp-withdraw-title">
                    Withdraw Funds
                  </h2>

                  <div className="hp-withdraw-subtitle">
                    Secure Wallet Withdrawal
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  confirmData ? setConfirmData(null) : onClose()
                }
                className="hp-withdraw-close"
                aria-label="Close"
                disabled={loading}
              >
                <X size={17} />
              </button>
            </div>

            {confirmData ? (
              <>
                <div className="hp-withdraw-confirm">
                  <div className="hp-withdraw-confirm-icon">
                    <AlertTriangle size={27} />
                  </div>

                  <h3 className="hp-withdraw-confirm-title">
                    Review Withdrawal
                  </h3>

                  <p className="hp-withdraw-confirm-desc">
                    Please review your withdrawal details carefully
                    before confirming the transaction.
                  </p>

                  <div className="hp-withdraw-report">
                    <div className="hp-withdraw-report-row">
                      <span className="hp-withdraw-report-label">
                        Requested Amount
                      </span>

                      <span className="hp-withdraw-report-value">
                        ${money(confirmData.totalRequested)}
                      </span>
                    </div>

                    <div className="hp-withdraw-report-row">
                      <span className="hp-withdraw-report-label">
                        Processing Fee (10%)
                      </span>

                      <span
                        className="hp-withdraw-report-value"
                        style={{ color: "#c44c4c" }}
                      >
                        -${money(confirmData.totalFeeDeducted)}
                      </span>
                    </div>

                    <div className="hp-withdraw-report-row">
                      <span className="hp-withdraw-report-label">
                        Withdrawal Request (50%)
                      </span>

                      <span
                        className="hp-withdraw-report-value"
                        style={{ color: "#08783f" }}
                      >
                        ${money(confirmData.expectedUSDT)}
                      </span>
                    </div>

                    <div className="hp-withdraw-report-row">
                      <span className="hp-withdraw-report-label">
                        Wallet Balance (50%)
                      </span>

                      <span
                        className="hp-withdraw-report-value"
                        style={{ color: "#8060bb" }}
                      >
                        ${money(confirmData.expectedTopup)}
                      </span>
                    </div>

                    <div className="hp-withdraw-report-row">
                      <span className="hp-withdraw-report-label">
                        Selected Sources
                      </span>

                      <span className="hp-withdraw-report-value">
                        {confirmData.sources}
                      </span>
                    </div>
                  </div>

                  <div className="hp-withdraw-confirm-actions">
                    <button
                      type="button"
                      onClick={() => setConfirmData(null)}
                      disabled={loading}
                      className="hp-withdraw-btn hp-withdraw-btn-cancel"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={proceedWithdrawal}
                      disabled={loading}
                      className="hp-withdraw-btn hp-withdraw-btn-submit"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle size={15} />
                          Processing
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} />
                          Confirm
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hp-withdraw-body">

                  <div className="hp-withdraw-summary">
                    <div className="hp-withdraw-summary-label">
                      Total Withdrawable Balance
                    </div>

                    <div className="hp-withdraw-summary-amount">
                      ${money(totalAvailableToWithdraw)}
                    </div>

                    <div className="hp-withdraw-summary-note">
                      Includes Direct, Level, Team Reward and all
                      recorded package stage earnings.
                    </div>
                  </div>

                  {isAddressMissing ? (
                    <div className="hp-withdraw-warning">
                      <span>
                        Withdrawal address missing. Please set your
                        address in your Profile first.
                      </span>

                      <Link
                        to="/profile"
                        onClick={onClose}
                        className="hp-withdraw-profile-link"
                      >
                        <UserCog size={12} />
                        Profile
                      </Link>
                    </div>
                  ) : (
                    <div className="hp-withdraw-address">
                      <div>
                        <ShieldCheck
                          size={12}
                          style={{
                            display: "inline",
                            marginRight: 5,
                            verticalAlign: "middle"
                          }}
                        />
                        Your Saved Address
                      </div>

                      <div className="hp-withdraw-address-value">
                        {walletAddress}
                      </div>
                    </div>
                  )}

                  <div className="hp-withdraw-section-title">
                    <Wallet size={14} />
                    Other Income Sources
                  </div>

                  {isLeader ? (
                    <div className="hp-withdraw-warning">
                      <Info size={17} />
...                    </div>
                  ) : (
                    <>
                      {incomeCards.map((income) => (
                        <div
                          key={income.key}
                          className="hp-withdraw-income-card"
                        >
                          <div className="hp-withdraw-income-head">
                            <div className="hp-withdraw-income-name">
                              <span style={{ color: income.color }}>
                                {income.icon}
                              </span>

                              {income.title}
                            </div>

                            <div className="hp-withdraw-available">
                              ${money(income.balance)}
                            </div>
                          </div>

                          <div className="hp-withdraw-input-row">
                            <span className="hp-withdraw-input-label">
                              WITHDRAW $
                            </span>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              placeholder="Enter amount"
                              className="hp-withdraw-amount-input"
                              value={withdrawals[income.key]}
                              onChange={(event) =>
                                handleInputChange(event, income.key)
                              }
                              disabled={loading}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="hp-withdraw-section-title">
                        <Layers size={14} />
                        Package Stage Withdrawals
                      </div>

                      {packageSubscriptions.length === 0 ? (
                        <div className="hp-withdraw-warning">
                          Package stage details are not available from
                          the server yet.
                        </div>
                      ) : (
                        packageSubscriptions.map((subscription, index) => (
                          <div
                            key={
                              subscription._id ||
                              subscription.id ||
                              index
                            }
                            style={{
                              marginBottom: 13,
                              padding: 10,
                              border: "1px solid #dce9dc",
                              borderRadius: 12,
                              background: "#f8fbf7"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 8,
                                marginBottom: 10
                              }}
                            >
                              <strong
                                style={{
                                  color: "#245334",
                                  fontSize: 11
                                }}
                              >
                                Package ${money(subscription.packageAmount)}
                              </strong>

                              <span
                                style={{
                                  color: "#718174",
                                  fontSize: 9
                                }}
                              >
                                Cycle #{subscription.cycleNumber || 1}
                              </span>
                            </div>

                            {(subscription.stages || []).map((stage) => {
                              const stageData = {
                                subscriptionId:
                                  subscription._id ||
                                  subscription.id ||
                                  subscription.subscriptionId,

                                stageNumber: Number(stage.stageNumber),
                                availableAmount: getStageAvailable(stage),
                                earningStatus:
                                  stage.earningStatus || "NOT_RECORDED"
                              };

                              const key =
                                `${stageData.subscriptionId}_${stageData.stageNumber}`;

                              const canWithdraw =
                                stageData.earningStatus === "RECORDED" &&
                                stageData.availableAmount > 0;

                              return (
                                <div
                                  key={key}
                                  className="hp-withdraw-stage-card"
                                >
                                  <div className="hp-withdraw-stage-head">
                                    <div>
                                      <div className="hp-withdraw-stage-title">
                                        Stage {stageData.stageNumber}
                                      </div>

                                      <div className="hp-withdraw-stage-meta">
                                        Earning: ${money(stage.earningAmount)}
                                      </div>
                                    </div>

                                    <div style={{ textAlign: "right" }}>
                                      <div className="hp-withdraw-available">
                                        ${money(stageData.availableAmount)}
                                      </div>

                                      <span
                                        className={
                                          "hp-withdraw-stage-status " +
                                          (
                                            stageData.earningStatus === "RECORDED"
                                              ? ""
                                              : "pending"
                                          )
                                        }
                                      >
                                        {stageData.earningStatus}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="hp-withdraw-input-row">
                                    <span className="hp-withdraw-input-label">
                                      WITHDRAW $
                                    </span>

                                    <input
                                      type="number"
                                      min="0"
                                      max={stageData.availableAmount}
                                      step="1"
                                      placeholder={
                                        canWithdraw
                                          ? "Enter amount"
                                          : "Not available"
                                      }
                                      className="hp-withdraw-amount-input"
                                      value={stageWithdrawals[key] || ""}
                                      onChange={(event) =>
                                        handleStageInputChange(
                                          event,
                                          stageData
                                        )
                                      }
                                      disabled={!canWithdraw || loading}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))
                      )}

                      {!hasMainIncome && (
                        <div
                          style={{
                            padding: 14,
                            border: "1px solid #e3eadf",
                            borderRadius: 10,
                            background: "#f8fbf7",
                            color: "#718174",
                            textAlign: "center",
                            fontSize: 10,
                            fontWeight: 750
                          }}
                        >
                          No withdrawable income is currently available.
                        </div>
                      )}

                      <div className="hp-withdraw-total">
                        <div className="hp-withdraw-total-label">
                          Total Entered Amount
                        </div>

                        <div className="hp-withdraw-total-value">
                          ${money(totalEnteredAmount)}
                        </div>
                      </div>

                      <div className="hp-withdraw-security">
                        <label className="hp-withdraw-label">
                          <Lock
                            size={11}
                            style={{
                              display: "inline",
                              marginRight: 5,
                              verticalAlign: "middle"
                            }}
                          />
                          Transaction Password
                        </label>

                        <div className="hp-withdraw-password-wrap">
                          <span className="hp-withdraw-password-icon">
                            <Lock size={15} />
                          </span>

                          <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Enter Transaction Password"
                            className="hp-withdraw-password"
                            value={transactionPassword}
                            onChange={(event) =>
                              setTransactionPassword(event.target.value)
                            }
                            disabled={loading}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((previous) => !previous)
                            }
                            className="hp-withdraw-eye"
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="hp-withdraw-footer">
                  {isLeader ? (
                    <button
                      type="button"
                      onClick={onClose}
                      className="hp-withdraw-btn hp-withdraw-btn-cancel"
                      style={{ width: "100%" }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={onClose}
                        className="hp-withdraw-btn hp-withdraw-btn-cancel"
                        disabled={loading}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handlePreWithdrawCheck}
                        disabled={loading}
                        className="hp-withdraw-btn hp-withdraw-btn-submit"
                      >
                        {loading ? (
                          <>
                            <LoaderCircle size={15} />
                            Checking...
                          </>
                        ) : (
                          <>
                            Withdraw Funds
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {successOpen && (
        <SuccessModal
          isOpen={successOpen}
          onClose={closeSuccess}
          type="withdrawal"
          userId={successData.userId}
          userName={successData.userName}
          amount={successData.amount}
          source={successData.source}
        />
      )}

      {messageModal.open && (
        <MessageModal
          isOpen={messageModal.open}
          title={messageModal.title}
          message={messageModal.message}
          type={messageModal.type}
          onClose={() =>
            setMessageModal((previous) => ({
              ...previous,
              open: false
            }))
          }
        />
      )}
    </>
  );
};

export default WithdrawalModal;
