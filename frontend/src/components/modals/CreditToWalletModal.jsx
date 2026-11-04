// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import api from "../../api/axios"; 
// import SuccessModal from "./SuccessModal";
// import MessageModal from "./MessageModal";
// import { useAuth } from "../../context/AuthContext";
// import { Zap, Users, Trophy, Layers, ArrowRightLeft, X, Eye, EyeOff } from "lucide-react"; // 🔥 Eye, EyeOff import kiya

// // ✅ GLOBAL POOL CONFIG
// const GLOBAL_POOLS = [
//   { level: 1,  globalTeam: 20,    reqDirects: 1,  earning: 10   },
//   { level: 2,  globalTeam: 40,    reqDirects: 2,  earning: 20   },
//   { level: 3,  globalTeam: 100,   reqDirects: 3,  earning: 40   },
//   { level: 4,  globalTeam: 200,   reqDirects: 4,  earning: 80   },
//   { level: 5,  globalTeam: 400,   reqDirects: 5,  earning: 150  },
//   { level: 6,  globalTeam: 1600,  reqDirects: 6,  earning: 200  },
//   { level: 7,  globalTeam: 2000,  reqDirects: 8,  earning: 500  }, 
//   { level: 8,  globalTeam: 3000,  reqDirects: 10, earning: 700  }, 
//   { level: 9,  globalTeam: 4000,  reqDirects: 12, earning: 1000 }, 
//   { level: 10, globalTeam: 5000,  reqDirects: 14, earning: 1500 }, 
//   { level: 11, globalTeam: 7500,  reqDirects: 16, earning: 3000 }, 
//   { level: 12, globalTeam: 10000, reqDirects: 18, earning: 5000 }  
// ];

// // 🔥 CLEAN COMPONENT FOR DIRECT, LEVEL, REWARD
// const MainIncomeBox = React.memo(({ title, icon: Icon, iconColor, source, balance, val, onChange, isLeader }) => (
//     <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
//         <div className="flex justify-between items-center mb-2 px-1">
//             <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
//                 <Icon size={14} className={iconColor} /> {title}
//             </h3>
//         </div>
//         <div className="flex flex-row gap-1.5 items-stretch">
//             <div className="w-1/3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
//                 <span className="text-[14px] font-black text-blue-500">${Number(balance).toFixed(2)}</span>
//             </div>
//             <div className="w-2/3 flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-inner">
//                 <span className={`${iconColor} font-bold text-sm pl-2`}>$</span>
//                 <input 
//                     type="number" 
//                     placeholder="0.00" 
//                     autoComplete="off"
//                     data-lpignore="true"
//                     className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1"
//                     value={val} 
//                     onChange={e => onChange(e, source)} 
//                     disabled={isLeader} 
//                 />
//             </div>
//         </div>
//     </div>
// ));

// const CreditToWalletModal = ({ userId, onClose, onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // 🔥 Password toggle ke liye state
  
//   const [balances, setBalances] = useState({
//     walletBalance: 0,
//     direct: 0, 
//     level: 0,
//     reward: 0,
//     pool: 0
//   });
  
//   const [unlockedLevels, setUnlockedLevels] = useState([]);
  
//   const [credits, setCredits] = useState({
//     direct: "",
//     level: "",
//     reward: ""
//     // Dynamic pool_1, pool_2 etc. added via input
//   });
  
//   const [transactionPassword, setTransactionPassword] = useState("");
  
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [successData, setSuccessData] = useState({ userId: "", amount: 0 });
//   const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "", type: "info" });

//   const { user: loggedInUser } = useAuth();
//   const token = localStorage.getItem("token");
  
//   const isLeader = loggedInUser?.role === "leader";

//   const showMessage = (title, message, type = "error") =>
//     setMessageModal({ open: true, title, message, type });

//   const fetchData = useCallback(async () => {
//     try {
//       const res = await api.get(`/wallet/withdrawable/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const profileRes = await api.get(`/user/${userId}`);

//       if (res.data) {
//         setBalances({
//           walletBalance: Number(res.data.walletBalance) || 0,
//           direct: Number(res.data.direct) || 0, 
//           level: Number(res.data.level) || 0,
//           reward: Number(res.data.reward) || 0,
//           pool: Number(res.data.pool) || 0
//         });
//       }

//       const u = profileRes.data?.user || profileRes.data;

//       if (u) {
//         const userGlobal = Number(u.globalTeamCount) || 0;
//         const userDirects = Number(u.directCount) || 0;
//         const activePoolsData = u.activePools || []; 
        
//         let cumulativeGlobal = 0;
//         let unlockedLevelsTemp = [];

//         for (const lvl of GLOBAL_POOLS) {
//             cumulativeGlobal += lvl.globalTeam;
//             if (userGlobal >= cumulativeGlobal) {
//                 unlockedLevelsTemp.push({ 
//                     ...lvl, 
//                     isDirectMet: userDirects >= lvl.reqDirects, 
//                     reqDirects: lvl.reqDirects 
//                 });
//             } else {
//                 break; 
//             }
//         }

//         let boxData = unlockedLevelsTemp.map(lvl => {
//             const p = activePoolsData.find(ap => Number(ap.level) === Number(lvl.level));
            
//             const generated = p ? (Number(p.daysPaid) || 0) * (Number(p.dailyAmount) || 0) : 0;
//             const withdrawnAmt = p ? (Number(p.withdrawnAmount) || 0) : 0;
            
//             let available = generated - withdrawnAmt;
//             available = available > 0.01 ? available : 0;

//             return { 
//                 ...lvl, 
//                 generated, 
//                 withdrawnAmt,
//                 available 
//             };
//         });

//         setUnlockedLevels(boxData);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   }, [userId, token]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const totalCommunityAvailable = unlockedLevels.reduce((sum, lvl) => {
//     if (lvl.isDirectMet) return sum + lvl.available;
//     return sum;
//   }, 0);

//   const totalAvailableToWithdraw = balances.direct + balances.level + balances.reward + totalCommunityAvailable;

//   const hasMainIncome = balances.direct > 0 || balances.level > 0 || balances.reward > 0 || totalCommunityAvailable > 0;

//   // 🔥 TOTAL ENTERED AMOUNT CALCULATION 🔥
//   const totalEnteredAmount = useMemo(() => {
//     let sum = 0;
//     sum += Number(credits.direct) || 0;
//     sum += Number(credits.level) || 0;
//     sum += Number(credits.reward) || 0;
//     Object.keys(credits).forEach(key => {
//       if (key.startsWith('pool_')) {
//         sum += Number(credits[key]) || 0;
//       }
//     });
//     return sum;
//   }, [credits]);

//   const handleInputChange = useCallback((e, source) => {
//     const value = e.target.value;
//     if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
//       setCredits((prev) => ({ ...prev, [source]: value }));
//     }
//   }, []);

//   const handleCredit = async () => {
//     try {
//       if (isLeader) {
//          return showMessage("Action Denied", "Leaders cannot credit funds to wallet directly from here.");
//       }

//       let items = [];
//       let totalRequested = 0;
//       let poolRequestedTotal = 0;

//       const checkAndPush = (sourceName, inputVal, availableBal, displayName) => {
//           const amt = Number(inputVal);
//           if (amt > 0) {
//               if (amt > availableBal) throw new Error(`Insufficient funds in ${displayName}.`);
//               items.push({ source: sourceName, amount: amt });
//               totalRequested += amt;
//           }
//       };

//       checkAndPush("direct", credits.direct, balances.direct, "Direct Income");
//       checkAndPush("level", credits.level, balances.level, "Level Income");
//       checkAndPush("reward", credits.reward, balances.reward, "Team Reward");

//       unlockedLevels.forEach(lvl => {
//         const amt = Number(credits[`pool_${lvl.level}`] || 0);
//         if (amt > 0) {
//             if (!lvl.isDirectMet) {
//                 throw new Error(`Please complete Total ${lvl.reqDirects} Direct${lvl.reqDirects > 1 ? 's' : ''} to credit from Community Lvl ${lvl.level}.`);
//             }
//             if (amt > lvl.available) throw new Error(`Insufficient funds in Level ${lvl.level} Pool.`);
            
//             items.push({ source: `pool_${lvl.level}`, amount: amt });
//             totalRequested += amt;
//             poolRequestedTotal += amt;
//         }
//       });

//       if (poolRequestedTotal > 0 && poolRequestedTotal > balances.pool) {
//           return showMessage("Insufficient Funds", "Total community Income requested exceeds available balance.");
//       }

//       if (totalRequested === 0) return showMessage("Warning", "Enter amount to credit.");
//       if (totalRequested < 10) return showMessage("Warning", `Minimum credit amount is $10. You entered $${totalRequested}.`);
//       if (totalRequested % 10 !== 0) return showMessage("Warning", `Amount must be in multiples of $10. Your total is $${totalRequested}.`);
//       if (!transactionPassword.trim()) return showMessage("Warning", "Enter transaction password.");

//       setLoading(true);

//       const payload = { userId, transactionPassword, items };

//       const res = await api.post("/wallet/credit-to-wallet", payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setSuccessData({ userId, amount: totalRequested });
//         setSuccessModalOpen(true);
//         setCredits({ direct: "", level: "", reward: "" }); 
//         setTransactionPassword("");
//         await fetchData();
//         if (onSuccess) onSuccess({ userId, walletBalance: res.data.walletBalance });
//       } else {
//         showMessage("Error", res.data.message || "Failed to credit.");
//       }

//     } catch (err) {
//       console.error("Catch Error:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Error crediting income";
//       showMessage("Error", errorMessage);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <>
//       <style>{`
//         input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
//         input[type=number] { -moz-appearance: textfield; }
//         .custom-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
//         .custom-scroll::-webkit-scrollbar { width: 4px; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//         .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       {successModalOpen && (
//         <SuccessModal isOpen={successModalOpen} onClose={() => { setSuccessModalOpen(false); onClose(); }} type="credit" userId={successData.userId} amount={successData.amount} zIndex={10000} />
//       )}

//       {messageModal.open && (
//          <MessageModal isOpen={messageModal.open} onClose={() => setMessageModal({ ...messageModal, open: false })} title={messageModal.title} message={messageModal.message} type={messageModal.type} zIndex={11000} />
//       )}

//       {!successModalOpen && (
//         <div className="fixed inset-0 mt-8 bg-slate-900/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
          
//           <div className="bg-white w-full max-w-[480px] rounded-[20px] border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] relative overflow-hidden animate-in zoom-in duration-300">
            
//             <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[50px] pointer-events-none rounded-full"></div>

//             {/* Header */}
//             <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center z-10 shrink-0">
//               <h2 className="text-[12px] md:text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 m-0">
//                 <div className="bg-green-100 p-1.5 rounded-lg">
//                   <ArrowRightLeft size={14} className="text-green-600" /> 
//                 </div>
//                 Credit To Wallet
//               </h2>
//               <button onClick={onClose} className="group bg-white hover:bg-red-50 p-1.5 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
//                  <X size={16} className="text-slate-400 group-hover:text-red-500" />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-3 overflow-y-auto custom-scroll flex-1 flex flex-col gap-3 bg-white relative z-10">
              
//               {/* Balance Card */}
//               <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
//                  <div className="text-right w-full">
//                     <p className="text-black text-[9px] font-bold uppercase tracking-widest">Withdrawable Balance</p>
//                     <h3 className="text-xl font-black text-emerald-600">${totalAvailableToWithdraw.toFixed(2)}</h3>
//                  </div>
//               </div>

//               {/* MAIN INCOMES */}
//               {(hasMainIncome || isLeader) && (
//                   <div className="flex flex-col gap-3">
//                     {balances.direct > 0 && <MainIncomeBox title="Direct Income" icon={Zap} iconColor="text-amber-500" source="direct" balance={balances.direct} val={credits.direct || ""} onChange={handleInputChange} isLeader={isLeader} />}
//                     {balances.level > 0 && <MainIncomeBox title="Level Income" icon={Users} iconColor="text-blue-500" source="level" balance={balances.level} val={credits.level || ""} onChange={handleInputChange} isLeader={isLeader} />}
//                     {balances.reward > 0 && <MainIncomeBox title="Team Reward" icon={Trophy} iconColor="text-indigo-500" source="reward" balance={balances.reward} val={credits.reward || ""} onChange={handleInputChange} isLeader={isLeader} />}
//                   </div>
//               )}

//               {/* COMMUNITY POOL BOXES */}
//               <div className="flex flex-col gap-3 mt-2">
//                 {unlockedLevels.length > 0 && (
//                   <div className="flex justify-between items-center px-1 mt-1">
//                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Community Levels</span>
//                   </div>
//                 )}

//                 {unlockedLevels.length > 0 && unlockedLevels.map(lvl => (
//                     <div key={lvl.level} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 relative overflow-hidden">
                        
//                         <div className="flex justify-between items-center mb-2 px-1">
//                             <h3 className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
//                                 <Layers size={14} className="text-emerald-500" /> Community Level {lvl.level}
//                                 {!lvl.isDirectMet && (
//                                     <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded ml-2 shadow-sm font-bold"></span>
//                                 )}
//                             </h3>
//                         </div>

//                         <div className="flex flex-row gap-1.5 items-stretch">
//                             <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
//                                 <span className="text-[11px] font-black text-emerald-600">${lvl.earning}</span>
//                             </div>
                            
//                             <div className="w-[22%] bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center items-center">
//                                 <span className="text-[11px] font-black text-purple-500">${lvl.generated.toFixed(2)}</span>
//                             </div>
                            
//                             <div className={`w-[22%] bg-white p-1 rounded-lg border shadow-sm flex flex-col justify-center items-center ${!lvl.isDirectMet ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
//                                 <span className={`text-[11px] font-black ${!lvl.isDirectMet ? 'text-red-400 line-through decoration-red-400/50' : 'text-blue-500'}`}>
//                                     ${lvl.available.toFixed(2)}
//                                 </span>
//                             </div>
                            
//                             <div className={`w-[34%] flex items-center gap-1 bg-white p-1 rounded-lg border shadow-inner ${!lvl.isDirectMet ? 'border-red-200 opacity-60 bg-slate-100' : 'border-slate-200'}`}>
//                                 <span className="text-emerald-500 font-bold text-sm pl-2">$</span>
//                                 <input 
//                                     type="number" 
//                                     placeholder="0.00" 
//                                     autoComplete="off"
//                                     data-lpignore="true"
//                                     className="flex-1 bg-transparent border-none text-slate-800 text-[12px] font-black outline-none w-full placeholder-slate-300 py-1 px-1 disabled:bg-transparent"
//                                     value={credits[`pool_${lvl.level}`] || ""} 
//                                     onChange={e => handleInputChange(e, `pool_${lvl.level}`)} 
//                                     disabled={isLeader || !lvl.isDirectMet} 
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//               </div>

//               {/* 🔥 TOTAL ENTERED AMOUNT BOX 🔥 */}
//               <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-center justify-between mt-2 shadow-sm">
//                  <p className="text-[10px] text-indigo-800 font-black uppercase tracking-widest m-0">Total Entered Amount</p>
//                  <h3 className="text-lg font-black text-indigo-600 m-0">${totalEnteredAmount.toFixed(2)}</h3>
//               </div>

//               {/* 🔥 SECURITY PASSWORD (WITH EYE ICON) 🔥 */}
//               <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1 relative">
//                   <label className="text-[9px] text-black block mb-1 font-bold uppercase tracking-widest ml-1">SECURITY PASSWORD</label>
                  
//                   <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0 }}>
//                       <input type="text" name="dummy_username_trap" tabIndex="-1" autoComplete="username" />
//                       <input type="password" name="dummy_password_trap" tabIndex="-1" autoComplete="current-password" />
//                   </div>

//                   <div className="relative">
//                       <input 
//                         type={showPassword ? "text" : "password"} 
//                         autoComplete="new-password"
//                         data-lpignore="true"
//                         placeholder="Enter Transaction Password" 
//                         className="w-full bg-white border border-slate-200 text-slate-800 p-2.5 pr-10 rounded-lg outline-none font-mono text-xs transition-all shadow-inner focus:border-green-400 focus:ring-2 focus:ring-green-100 placeholder-slate-400"
//                         value={transactionPassword} 
//                         onChange={e => setTransactionPassword(e.target.value)} 
//                         disabled={isLeader} 
//                       />
//                       <button 
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
//                       >
//                         {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                       </button>
//                   </div>
//               </div>

//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="p-3 border-t border-slate-200 bg-slate-50 z-10 shrink-0">
//               {isLeader ? (
//                  <button 
//                    onClick={onClose} 
//                    className="w-full py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider"
//                  >
//                     Cancel
//                  </button>
//               ) : (
//                  <div className="flex gap-2">
//                    <button 
//                      onClick={onClose} 
//                      className="w-1/3 py-2.5 rounded-lg font-bold text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shadow-sm uppercase tracking-wider"
//                    >
//                       Cancel
//                    </button>
//                    <button 
//                      onClick={handleCredit} 
//                      disabled={loading} 
//                      className={`w-2/3 py-2.5 rounded-lg font-black text-[11px] md:text-xs uppercase tracking-widest transition-all ${
//                        loading
//                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
//                          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-[0_4px_10px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 active:scale-95'
//                      }`}
//                    >
//                      {loading ? "PROCESSING..." : "CREDIT TO WALLET"}
//                    </button>
//                  </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreditToWalletModal;



import React, { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../api/axios";
import SuccessModal from "./SuccessModal";
import MessageModal from "./MessageModal";
import { useAuth } from "../../context/AuthContext";
import {
  Zap,
  Users,
  Trophy,
  ArrowRightLeft,
  X,
  Eye,
  EyeOff,
  Wallet,
  Lock,
  ShieldCheck,
  ArrowRight,
  LoaderCircle,
  CheckCircle,
} from "lucide-react";

const MainIncomeBox = React.memo(
  ({ title, icon: Icon, iconColor, source, balance, val, onChange, isLeader }) => (
    <div className="ctw-income-card">
      <div className="ctw-income-heading">
        <div className="ctw-income-title">
          <Icon size={15} className={iconColor} />
          {title}
        </div>
        <span className="ctw-available-label">Available Balance</span>
      </div>

      <div className="ctw-income-row">
        <div className="ctw-balance-box">
          <span className="ctw-small-label">Balance</span>
          <strong>${Number(balance).toFixed(2)}</strong>
        </div>

        <div className="ctw-amount-box">
          <span>$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter amount"
            autoComplete="off"
            data-lpignore="true"
            value={val}
            onChange={(e) => onChange(e, source)}
            disabled={isLeader}
          />
        </div>
      </div>
    </div>
  )
);

const CreditToWalletModal = ({ userId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [balances, setBalances] = useState({
    walletBalance: 0,
    direct: 0,
    level: 0,
    reward: 0,
  });

  const [credits, setCredits] = useState({
    direct: "",
    level: "",
    reward: "",
  });

  const [transactionPassword, setTransactionPassword] = useState("");

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({
    userId: "",
    amount: 0,
  });

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });

  const { user: loggedInUser } = useAuth();
  const token = localStorage.getItem("token");
  const isLeader = loggedInUser?.role === "leader";

  const showMessage = (title, message, type = "error") => {
    setMessageModal({ open: true, title, message, type });
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get(`/wallet/withdrawable/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setBalances({
          walletBalance: Number(res.data.walletBalance) || 0,
          direct: Number(res.data.direct) || 0,
          level: Number(res.data.level) || 0,
          reward: Number(res.data.reward) || 0,
        });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      showMessage(
        "Unable to Load Balance",
        err.response?.data?.message || "Please refresh and try again.",
        "error"
      );
    }
  }, [userId, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalAvailableToCredit =
    balances.direct + balances.level + balances.reward;

  const hasMainIncome =
    balances.direct > 0 ||
    balances.level > 0 ||
    balances.reward > 0;

  const totalEnteredAmount = useMemo(() => {
    return (
      (Number(credits.direct) || 0) +
      (Number(credits.level) || 0) +
      (Number(credits.reward) || 0)
    );
  }, [credits]);

  const handleInputChange = useCallback((e, source) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setCredits((prev) => ({ ...prev, [source]: value }));
    }
  }, []);

  const handleCredit = async () => {
    if (loading) return;

    try {
      if (isLeader) {
        return showMessage(
          "Action Denied",
          "Leaders cannot credit funds to wallet directly from here.",
          "warning"
        );
      }

      const items = [];
      let totalRequested = 0;

      const checkAndPush = (sourceName, inputVal, availableBal, displayName) => {
        const amt = Number(inputVal);

        if (amt > 0) {
          if (amt > availableBal) {
            throw new Error(`Insufficient funds in ${displayName}.`);
          }

          items.push({ source: sourceName, amount: amt });
          totalRequested += amt;
        }
      };

      checkAndPush("direct", credits.direct, balances.direct, "Direct Income");
      checkAndPush("level", credits.level, balances.level, "Level Income");
      checkAndPush("reward", credits.reward, balances.reward, "Team Reward");

      if (totalRequested === 0) {
        return showMessage(
          "Amount Required",
          "Please enter an amount to credit.",
          "warning"
        );
      }

      if (totalRequested < 10) {
        return showMessage(
          "Minimum Amount",
          `Minimum credit amount is $10. You entered $${totalRequested.toFixed(2)}.`,
          "warning"
        );
      }

      if (Math.round(totalRequested * 100) % 1000 !== 0) {
        return showMessage(
          "Invalid Amount",
          `Amount must be in multiples of $10. Your total is $${totalRequested.toFixed(2)}.`,
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

      setLoading(true);

      const payload = {
        userId,
        transactionPassword,
        items,
      };

      const res = await api.post("/wallet/credit-to-wallet", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setSuccessData({
          userId,
          amount: totalRequested,
        });

        setSuccessModalOpen(true);
        setCredits({ direct: "", level: "", reward: "" });
        setTransactionPassword("");

        await fetchData();

        if (onSuccess) {
          onSuccess({
            userId,
            walletBalance: res.data.walletBalance,
          });
        }
      } else {
        showMessage(
          "Credit Failed",
          res.data.message || "Failed to credit funds.",
          "error"
        );
      }
    } catch (err) {
      console.error("Credit Error:", err);

      showMessage(
        "Transaction Failed",
        err.response?.data?.message ||
          err.message ||
          "Error crediting income.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccessModalOpen(false);
    onClose();
  };

  return (
    <>
      <style>{`
        .ctw-overlay {
          --ctw-green: #08783f;
          --ctw-dark: #07552e;
          --ctw-gold: #e3bd50;
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: rgba(5, 25, 15, .72);
          backdrop-filter: blur(5px);
          font-family: Inter, Arial, sans-serif;
          animation: ctwFade .2s ease-out;
        }

        .ctw-overlay * {
          box-sizing: border-box;
        }

        .ctw-modal {
          width: 100%;
          max-width: 450px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #dce9dc;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 22px 65px #0004;
          animation: ctwPop .25s ease-out;
        }

        .ctw-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 13px 16px;
          border-bottom: 3px solid var(--ctw-gold);
          background: linear-gradient(110deg, #07552e, #087b43);
          flex-shrink: 0;
        }

        .ctw-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .ctw-header-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid #ffffff40;
          border-radius: 11px;
          background: #ffffff15;
          color: #ffdf78;
        }

        .ctw-title {
          margin: 0;
          color: #fff;
          font-size: 14px;
          font-weight: 950;
          letter-spacing: .4px;
        }

        .ctw-subtitle {
          margin-top: 3px;
          color: #d5ead9;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .ctw-close {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid #ffffff35;
          border-radius: 9px;
          background: #ffffff12;
          color: #fff;
          cursor: pointer;
          transition: .2s;
        }

        .ctw-close:hover {
          background: #ffffff28;
          transform: rotate(90deg);
        }

        .ctw-body {
          padding: 15px;
          overflow-y: auto;
          background: #fff;
          scrollbar-width: thin;
          scrollbar-color: #c6d9c8 transparent;
        }

        .ctw-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 13px;
          border: 1px solid #cfe5d0;
          border-radius: 13px;
          background: linear-gradient(115deg, #eff9ed, #fbfcf5);
        }

        .ctw-summary-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #52745a;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .6px;
          text-transform: uppercase;
        }

        .ctw-summary-amount {
          margin-top: 5px;
          color: #08783f;
          font-family: monospace;
          font-size: 25px;
          font-weight: 950;
        }

        .ctw-summary-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 1px solid #d7e9c9;
          border-radius: 11px;
          background: #fff;
          color: #08783f;
        }

        .ctw-section-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 17px 0 10px;
          color: #244a31;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .9px;
          text-transform: uppercase;
        }

        .ctw-income-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .ctw-income-card {
          padding: 11px;
          border: 1px solid #dce9dc;
          border-radius: 12px;
          background: #f9fcf8;
          transition: .2s;
        }

        .ctw-income-card:focus-within {
          border-color: #8fbd91;
          box-shadow: 0 0 0 3px #08783f0c;
        }

        .ctw-income-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 9px;
        }

        .ctw-income-title {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #244a31;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .ctw-available-label {
          color: #91a093;
          font-size: 8px;
          font-weight: 750;
        }

        .ctw-income-row {
          display: grid;
          grid-template-columns: 1fr 1.7fr;
          gap: 8px;
        }

        .ctw-balance-box {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3px;
          padding: 8px 10px;
          border: 1px solid #e1ebe0;
          border-radius: 9px;
          background: #fff;
        }

        .ctw-small-label {
          color: #8b9d8f;
          font-size: 8px;
          font-weight: 850;
          text-transform: uppercase;
        }

        .ctw-balance-box strong {
          overflow: hidden;
          color: #08783f;
          font-family: monospace;
          font-size: 15px;
          font-weight: 950;
          text-overflow: ellipsis;
        }

        .ctw-amount-box {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 10px;
          border: 1px solid #dce8dc;
          border-radius: 9px;
          background: #fff;
          color: #08783f;
        }

        .ctw-amount-box > span {
          font-size: 14px;
          font-weight: 950;
        }

        .ctw-amount-box input {
          width: 100%;
          min-width: 0;
          height: 39px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #21482f;
          font-size: 12px;
          font-weight: 850;
        }

        .ctw-amount-box input::placeholder {
          color: #a1afa3;
          font-size: 10px;
          font-weight: 550;
        }

        .ctw-amount-box:focus-within {
          border-color: #0b8748;
          box-shadow: 0 0 0 3px #08783f12;
        }

        .ctw-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 12px;
          padding: 12px 13px;
          border: 1px solid #ead9a6;
          border-radius: 11px;
          background: #fff9e9;
        }

        .ctw-total-label {
          color: #8a6b26;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .ctw-total-value {
          color: #175c32;
          font-family: monospace;
          font-size: 21px;
          font-weight: 950;
        }

        .ctw-rule {
          margin-top: 9px;
          padding: 9px 11px;
          border: 1px solid #e5eee4;
          border-radius: 9px;
          background: #fbfdf9;
          color: #718276;
          font-size: 9px;
          font-weight: 700;
          line-height: 1.6;
        }

        .ctw-password-card {
          margin-top: 13px;
          padding: 11px;
          border: 1px solid #dce9dc;
          border-radius: 12px;
          background: #f9fcf8;
        }

        .ctw-password-label {
          display: block;
          margin: 0 0 7px 2px;
          color: #526b59;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .ctw-password-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .ctw-password-wrap input {
          width: 100%;
          height: 42px;
          padding: 0 42px 0 12px;
          border: 1px solid #dce8dc;
          border-radius: 9px;
          outline: none;
          background: #fff;
          color: #21482f;
          font-size: 12px;
          font-weight: 750;
        }

        .ctw-password-wrap input:focus {
          border-color: #0b8748;
          box-shadow: 0 0 0 3px #08783f12;
        }

        .ctw-password-toggle {
          position: absolute;
          right: 10px;
          display: grid;
          place-items: center;
          padding: 5px;
          border: 0;
          background: transparent;
          color: #819487;
          cursor: pointer;
        }

        .ctw-password-toggle:hover {
          color: #08783f;
        }

        .ctw-footer {
          padding: 13px 15px;
          border-top: 1px solid #e5eee4;
          background: #f8fbf7;
          flex-shrink: 0;
        }

        .ctw-actions {
          display: flex;
          gap: 9px;
        }

        .ctw-cancel {
          width: 34%;
          min-height: 44px;
          border: 1px solid #dce5dc;
          border-radius: 10px;
          background: #fff;
          color: #718276;
          font-size: 10px;
          font-weight: 950;
          cursor: pointer;
          transition: .2s;
        }

        .ctw-cancel:hover {
          border-color: #e6bcbc;
          color: #b23e3e;
        }

        .ctw-submit {
          flex: 1;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #d7b84e;
          border-radius: 10px;
          background: linear-gradient(105deg, #087b43, #07552e);
          color: #fff;
          box-shadow: 0 4px 12px #08783f22;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .6px;
          cursor: pointer;
          transition: .2s;
        }

        .ctw-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px #08783f35;
        }

        .ctw-submit:disabled {
          border-color: #dce5dc;
          background: #e8eee8;
          color: #92a095;
          box-shadow: none;
          cursor: not-allowed;
        }

        .ctw-leader-note,
        .ctw-empty {
          padding: 15px;
          border: 1px solid #ead9a6;
          border-radius: 11px;
          background: #fff9e9;
          color: #8a6b26;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.6;
          text-align: center;
        }

        .ctw-empty {
          border-color: #dce9dc;
          background: #f9fcf8;
          color: #718276;
        }

        @keyframes ctwFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ctwPop {
          from { opacity: 0; transform: translateY(12px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 380px) {
          .ctw-overlay { padding: 7px; }
          .ctw-body { padding: 11px; }
          .ctw-header { padding: 11px 12px; }
          .ctw-footer { padding: 11px 12px; }
          .ctw-income-row { grid-template-columns: 1fr 1.5fr; }
          .ctw-balance-box strong { font-size: 13px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctw-overlay,
          .ctw-modal { animation: none; }
        }
      `}</style>

      {!successModalOpen && (
        <div className="ctw-overlay">
          <div className="ctw-modal">
            <div className="ctw-header">
              <div className="ctw-header-left">
                <div className="ctw-header-icon">
                  <ArrowRightLeft size={20} />
                </div>

                <div>
                  <h2 className="ctw-title">Credit To Wallet</h2>
                  <div className="ctw-subtitle">
                    Transfer income to wallet
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="ctw-close"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="ctw-body">
              <div className="ctw-summary">
                <div>
                  <div className="ctw-summary-label">
                    <Wallet size={14} />
                    Total Available Income
                  </div>
                  <div className="ctw-summary-amount">
                    ${totalAvailableToCredit.toFixed(2)}
                  </div>
                </div>

                <div className="ctw-summary-icon">
                  <ShieldCheck size={21} />
                </div>
              </div>

              <div className="ctw-section-title">
                <ArrowRightLeft size={14} />
                Select Income To Credit
              </div>

              {isLeader ? (
                <div className="ctw-leader-note">
                  Leaders cannot credit funds to wallet directly from here.
                </div>
              ) : hasMainIncome ? (
                <div className="ctw-income-list">
                  {balances.direct > 0 && (
                    <MainIncomeBox
                      title="Direct Income"
                      icon={Zap}
                      iconColor="text-amber-500"
                      source="direct"
                      balance={balances.direct}
                      val={credits.direct}
                      onChange={handleInputChange}
                      isLeader={isLeader}
                    />
                  )}

                  {balances.level > 0 && (
                    <MainIncomeBox
                      title="Level Income"
                      icon={Users}
                      iconColor="text-blue-500"
                      source="level"
                      balance={balances.level}
                      val={credits.level}
                      onChange={handleInputChange}
                      isLeader={isLeader}
                    />
                  )}

                  {balances.reward > 0 && (
                    <MainIncomeBox
                      title="Team Reward"
                      icon={Trophy}
                      iconColor="text-amber-600"
                      source="reward"
                      balance={balances.reward}
                      val={credits.reward}
                      onChange={handleInputChange}
                      isLeader={isLeader}
                    />
                  )}
                </div>
              ) : (
                <div className="ctw-empty">
                  <Wallet
                    size={22}
                    style={{ display: "block", margin: "0 auto 7px" }}
                  />
                  No withdrawable income is currently available.
                </div>
              )}

              {!isLeader && (
                <>
                  <div className="ctw-total">
                    <div className="ctw-total-label">
                      Total Entered Amount
                    </div>
                    <div className="ctw-total-value">
                      ${totalEnteredAmount.toFixed(2)}
                    </div>
                  </div>

                  <div className="ctw-rule">
                    Minimum credit amount: $10. Total entered amount must be
                    in multiples of $10.
                  </div>

                  <div className="ctw-password-card">
                    <label className="ctw-password-label">
                      <Lock
                        size={12}
                        style={{
                          display: "inline",
                          verticalAlign: "middle",
                          marginRight: 5,
                        }}
                      />
                      Transaction Password
                    </label>

                    <div className="ctw-password-wrap">
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        data-lpignore="true"
                        placeholder="Enter transaction password"
                        value={transactionPassword}
                        onChange={(e) =>
                          setTransactionPassword(e.target.value)
                        }
                      />

                      <button
                        type="button"
                        className="ctw-password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="ctw-footer">
              {isLeader ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="ctw-submit"
                >
                  Cancel
                </button>
              ) : (
                <div className="ctw-actions">
                  <button
                    type="button"
                    onClick={onClose}
                    className="ctw-cancel"
                    disabled={loading}
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    onClick={handleCredit}
                    disabled={loading || !hasMainIncome}
                    className="ctw-submit"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <ArrowRightLeft size={15} />
                        CREDIT TO WALLET
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={successModalOpen}
        onClose={closeSuccess}
        type="credit"
        userId={successData.userId}
        amount={successData.amount}
        zIndex={10000}
      />

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

export default CreditToWalletModal;
