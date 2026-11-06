// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import api from "../../api/axios"; 
// // // // import { useNavigate } from "react-router-dom"; 
// // // // import { useAuth } from "../../context/AuthContext";
// // // // import { Globe, ChevronRight, CalendarDays } from "lucide-react"; 

// // // // // Components Imports
// // // // import TotalSystemUsers from "../../components/dashboard/TotalSystemUsers"; 
// // // // import IncomeSummary from "../../components/dashboard/IncomeSummary";
// // // // import ReferralLink from "../../components/dashboard/ReferralLink";
// // // // import WalletBalance from "../../components/dashboard/WalletBalance";
// // // // import DailyROIPlan from "../../components/dashboard/DailyROI";
// // // // import SpinnerOverlay from "../../components/common/SpinnerOverlay";
// // // // import SuccessModal from "../../components/modals/SuccessModal";
// // // // import TelegramPopup from "../../components/TelegramPopup";
// // // // import PromoVideoBox from "../../components/dashboard/PromoVideoBox"; 

// // // // import FastTrackTimerBanner from "../../components/dashboard/FastTrackTimerBanner"; // Import yahan se ho raha hai
// // // // import UpcomingFeaturesBanner from "../../components/dashboard/UpcomingFeaturesBanner";
// // // // //import StakingPopup from "../../components/StakingPopup";
// // // // // 🔥 MONTHLY REWARD BOX IMPORT
// // // // import MonthlyRewardBox from "../../components/MonthlyRewardBox";

// // // // // 🔥 WALLET POPUP IMPORT
// // // // // import WalletPopup from "../../components/WalletPopup";

// // // // // 🔥 STAKING PROGRAM IMPORT (Naya Add Kiya)
// // // // import StakingProgram from "./StakingProgram";

// // // // const Dashboard = ({ setModalState }) => {
// // // //   const { user, token, setUser, logout } = useAuth();
// // // //   const navigate = useNavigate(); 

// // // //   const [walletRefreshKey, setWalletRefreshKey] = useState(0);
// // // //   const [loading, setLoading] = useState(false);
  
// // // //   const [totalRealUsers, setTotalRealUsers] = useState(0);
// // // //   const [globalFakeCount, setGlobalFakeCount] = useState(0);
  
// // // //   const [latestGlobalUsers, setLatestGlobalUsers] = useState([]);
  
// // // //   const [income, setIncome] = useState({
// // // //     directIncome: 0,
// // // //     levelIncome: 0,
// // // //     dailyIncome: 0,
// // // //     spinIncome: 0,
// // // //     availableSpins: 0,
// // // //   });

// // // //   const [successModal, setSuccessModal] = useState({
// // // //     isOpen: false,
// // // //     userId: "",
// // // //     amount: 0,
// // // //   });

// // // //   // 🔥 WALLET POPUP STATE
// // // //   const [showWallet, setShowWallet] = useState(false);

// // // //   const [showStakingPopup, setShowStakingPopup] = useState(true);

// // // //   const hasFetched = useRef(false);

// // // //   const fetchUserData = async () => {
// // // //     if (!token || !user?.userId) return;
// // // //     try {
// // // //         setLoading(true);
        
// // // //         // 🔥 1. MAIN DATA
// // // //         const [userRes, incomeRes] = await Promise.all([
// // // //             api.get(`/user/${user.userId}?t=${new Date().getTime()}`, { headers: { Authorization: `Bearer ${token}` } }),
// // // //             api.get(`/wallet/${user.userId}?t=${new Date().getTime()}`, { headers: { Authorization: `Bearer ${token}` } })
// // // //         ]);
        
// // // //         setUser(userRes.data.user); 
// // // //         setTotalRealUsers(userRes.data.totalRealUsers || 0);
// // // //         setGlobalFakeCount(userRes.data.globalFakeCount || 0);

// // // //         setIncome({
// // // //           directIncome: incomeRes.data.directIncome || 0,
// // // //           levelIncome: incomeRes.data.levelIncome || 0,
// // // //           dailyIncome: incomeRes.data.planIncome || 0,
// // // //           spinIncome: incomeRes.data.spinIncome || 0,
// // // //           rewardIncome: incomeRes.data.rewardIncome || 0,
// // // //           totalDirectIncome: incomeRes.data.income?.totalDirectIncome || 0,
// // // //           totalLevelIncome: incomeRes.data.income?.totalLevelIncome || 0,
// // // //           totalRewardIncome: incomeRes.data.income?.totalRewardIncome || 0,
// // // //           totalSpinIncome: incomeRes.data.income?.totalSpinIncome || 0,
// // // //           fastTrackIncome: incomeRes.data.fastTrackIncome || incomeRes.data.income?.fastTrackIncome || 0,
// // // //           totalFastTrackIncome: incomeRes.data.totalFastTrackIncome || incomeRes.data.income?.totalFastTrackIncome || 0,
// // // //         });

// // // //         // 🔥 2. SILENT BACKGROUND FETCH 
// // // //         api.get('/community/global-list').then((globalRes) => {
// // // //             if(globalRes.data.success) {
// // // //                 setLatestGlobalUsers(globalRes.data.data.slice(0, 5));
// // // //             }
// // // //         }).catch((globalErr) => {
// // // //             console.error("Failed to fetch top 5 global users", globalErr);
// // // //         });

// // // //     } catch (err) {
// // // //         console.error("Failed to fetch user data:", err);
// // // //         if (err?.response?.status === 401) logout();
// // // //     } finally {
// // // //         setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.userId) {
// // // //         hasFetched.current = false;
// // // //     }
// // // //   }, [user?.userId]);

// // // //   useEffect(() => {
// // // //     if (!hasFetched.current && token && user?.userId) {
// // // //       hasFetched.current = true;
// // // //       fetchUserData();
// // // //     }
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [user?.userId, token]); 

// // // //   // 🔥 DIRECT WALLET POPUP LOGIC
// // // //   useEffect(() => {
// // // //     if (user && user.userId) {
// // // //       const hasWallet = user.walletAddress && user.walletAddress.trim() !== "";
      
// // // //       if (!hasWallet) {
// // // //         const timer = setTimeout(() => {
// // // //           setShowWallet(true);
// // // //         }, 800); 

// // // //         return () => clearTimeout(timer);
// // // //       }
// // // //     }
// // // //   }, [user?.userId, user?.walletAddress]); 

// // // //   const handleCloseWallet = () => {
// // // //     setShowWallet(false);
// // // //   };

// // // //   const handleTopUpSuccess = async (amount = 0, userId = "") => {
// // // //     await fetchUserData();
// // // //     setWalletRefreshKey((prev) => prev + 1);
// // // //     if (amount > 0) {
// // // //       setSuccessModal({ isOpen: true, userId, amount });
// // // //     }
// // // //   };

// // // //   const claimDailyROI = async (dayIndex) => {
// // // //     try {
// // // //       setLoading(true);
// // // //       await api.put(
// // // //         `/user/claim-daily/${user.userId}`,
// // // //         { dayIndex },
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );
// // // //       await handleTopUpSuccess();
// // // //     } catch (err) {
// // // //       console.error("Failed to claim Daily ROI:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   if (!user || !token) return <SpinnerOverlay />;

// // // //   const referralLink = `${window.location.origin}/register?ref=${user.userId}`;

// // // //   return (
// // // //     <div className="w-full relative animate-fadeIn pb-28 md:pb-8">
      
// // // //       {loading && <SpinnerOverlay />}

// // // //       {/* 🔥 WALLET POPUP */}
// // // //     {/* {showWallet && <WalletPopup onClose={handleCloseWallet} />} */}
// // // //       {/* {showStakingPopup && (
// // // //   <StakingPopup onClose={() => setShowStakingPopup(false)} />
// // // // )} */}

// // // //       <div className="space-y-6 md:space-y-8 relative z-10">
        
// // // //         <section>
// // // //           <WalletBalance userId={user.userId} refreshKey={walletRefreshKey} income={income} />
// // // //         </section>
         
// // // //         <section>
// // // //            <TotalSystemUsers 
// // // //              user={user} 
// // // //              totalRealUsersFromDB={totalRealUsers} 
// // // //              globalFakeCount={globalFakeCount} 
// // // //            />
// // // //         </section>

// // // //         {/* 🔥 STAKING PROGRAM SECTION (Promo Video ke theek upar) */}
// // // //         <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // // //             <StakingProgram />
// // // //         </section>

// // // //  {/* 🔥 SMART TIMER BANNER: Yeh sirf valid users ko dikhega */}
// // // //        <FastTrackTimerBanner user={user} /> 
// // // //       <UpcomingFeaturesBanner />

// // // //         <div>
// // // //             <PromoVideoBox />
// // // //         </div>

// // // //         <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // // //              <ReferralLink link={referralLink} />
// // // //         </div>
        
// // // //         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
// // // //             {/* 1. Income Summary Box */}
// // // //             <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
// // // //                 <IncomeSummary income={income} user={user} />
// // // //             </div>

// // // //             {/* 🔥 2. Monthly Reward Box */}
// // // //             <div>
// // // //                 <MonthlyRewardBox />
// // // //             </div>
// // // //         </div>

// // // //         <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // // //             <DailyROIPlan dailyROI={user.dailyROI || []} onClaim={claimDailyROI} />
// // // //         </section>

// // // //         {latestGlobalUsers.length > 0 && (
// // // //        <section 
// // // //              onClick={() => navigate('/global-community')}
// // // //              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group p-4 md:p-5"
// // // //           >
// // // //              <div className="flex justify-between items-center mb-4">
// // // //                  <h3 className="font-black text-slate-800 flex items-center gap-2 text-sm md:text-base uppercase tracking-tight">
// // // //                     <Globe className="text-blue-500 animate-pulse" size={20}/> Live All Community
// // // //                  </h3>
// // // //                  <span className="text-[10px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
// // // //                     View All <ChevronRight size={14}/>
// // // //                  </span>
// // // //              </div>

// // // //              <div className="space-y-2">
// // // //                  {latestGlobalUsers.map((u, idx) => (
// // // //                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl border border-slate-100 gap-2 sm:gap-0">
                         
// // // //                          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
// // // //                              <div className="flex items-center gap-3">
// // // //                                  <img 
// // // //                                     src={`https://flagcdn.com/w40/${(u.country || 'in').toLowerCase()}.png`} 
// // // //                                     alt={u.country}
// // // //                                     className="w-6 sm:w-7 h-auto rounded-[2px] shadow-[0_0_2px_rgba(0,0,0,0.2)]"
// // // //                                     onError={(e) => { e.target.src = 'https://flagcdn.com/w40/in.png'; }}
// // // //                                  />
// // // //                                  <div>
// // // //                                     <span className="text-[10px] font-bold text-slate-400 tracking-wider">
// // // //   #{(() => {
// // // //     const id = String(u.userId);
// // // //     if (id.length <= 4) {
// // // //       // Agar ID 4 ya usse choti hai toh sabhi ko star bana do
// // // //       return '****';
// // // //     } else {
// // // //       // Shuru ke 2 '*' + Beech ka part + Last ke 2 '*'
// // // //       const middlePart = id.substring(2, id.length - 2);
// // // //       return `**${middlePart}**`;
// // // //     }
// // // //   })()}
// // // // </span>
// // // //                                  </div>
// // // //                              </div>
                             
// // // //                              <div className="sm:hidden flex items-center gap-1 bg-green-50 border border-green-100 text-green-600 px-2 py-1 rounded-md">
// // // //                                  <span className="font-black text-[10px]">${u.amount || 30}</span>
// // // //                                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
// // // //                              </div>
// // // //                          </div>

// // // //                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-200 sm:border-transparent pt-2 sm:pt-0">
// // // //                              <div className="flex items-center gap-1.5 text-slate-500">
// // // //                                 <CalendarDays size={12} className="opacity-70" />
// // // //                                 <span className="font-bold text-[10px] sm:text-xs">
// // // //                                    {new Date(u.date || new Date()).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
// // // //                                 </span>
// // // //                              </div>
                             
// // // //                              <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-600 px-2.5 py-1 rounded-lg">
// // // //                                  <span className="font-black text-xs">${u.amount || 30}</span>
// // // //                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
// // // //                                  <span className="text-[9px] font-black uppercase">Active</span>
// // // //                              </div>
// // // //                          </div>
                         
// // // //                      </div>
// // // //                  ))}
// // // //              </div>
// // // //           </section>
// // // //         )}
        
// // // //       </div>

// // // //       <SuccessModal
// // // //         isOpen={successModal.isOpen}
// // // //         userId={successModal.userId}
// // // //         amount={successModal.amount}
// // // //         onClose={() => setSuccessModal((prev) => ({ ...prev, isOpen: false }))}
// // // //       />

// // // //       {!loading && user && <TelegramPopup currentUser={user} />}
      
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;






// // // import React, { useEffect, useState, useRef } from "react";
// // // import api from "../../api/axios"; 
// // // import { useNavigate } from "react-router-dom"; 
// // // import { useAuth } from "../../context/AuthContext";
// // // import { Globe, ChevronRight, CalendarDays } from "lucide-react"; 

// // // // Components Imports
// // // import TotalSystemUsers from "../../components/dashboard/TotalSystemUsers"; 
// // // import IncomeSummary from "../../components/dashboard/IncomeSummary";
// // // import ReferralLink from "../../components/dashboard/ReferralLink";
// // // import WalletBalance from "../../components/dashboard/WalletBalance";
// // // import DailyROIPlan from "../../components/dashboard/DailyROI";
// // // import SpinnerOverlay from "../../components/common/SpinnerOverlay";
// // // import SuccessModal from "../../components/modals/SuccessModal";
// // // import TelegramPopup from "../../components/TelegramPopup";
// // // import PromoVideoBox from "../../components/dashboard/PromoVideoBox"; 

// // // import FastTrackTimerBanner from "../../components/dashboard/FastTrackTimerBanner"; 
// // // //import UpcomingFeaturesBanner from "../../components/dashboard/UpcomingFeaturesBanner";
// // // //import StakingPopup from "../../components/StakingPopup";
// // // // 🔥 MONTHLY REWARD BOX IMPORT
// // // import MonthlyRewardBox from "../../components/MonthlyRewardBox";

// // // // 🔥 WALLET POPUP IMPORT
// // // // import WalletPopup from "../../components/WalletPopup";

// // // // 🔥 STAKING PROGRAM IMPORT (Naya Add Kiya)
// // // import StakingProgram from "./StakingProgram";

// // // const Dashboard = ({ setModalState }) => {
// // //   const { user, token, setUser, logout } = useAuth();
// // //   const navigate = useNavigate(); 

// // //   const [walletRefreshKey, setWalletRefreshKey] = useState(0);
// // //   const [loading, setLoading] = useState(false);
  
// // //   const [totalRealUsers, setTotalRealUsers] = useState(0);
// // //   const [globalFakeCount, setGlobalFakeCount] = useState(0);
// // //   const [activeDownlineCount, setActiveDownlineCount] = useState(0);
  
// // //   const [latestGlobalUsers, setLatestGlobalUsers] = useState([]);
  
// // //   const [income, setIncome] = useState({
// // //     directIncome: 0,
// // //     levelIncome: 0,
// // //     dailyIncome: 0,
// // //     spinIncome: 0,
// // //     availableSpins: 0,
// // //   });

// // //   const [successModal, setSuccessModal] = useState({
// // //     isOpen: false,
// // //     userId: "",
// // //     amount: 0,
// // //   });

// // //   // 🔥 WALLET POPUP STATE
// // //   const [showWallet, setShowWallet] = useState(false);
// // //   const [showStakingPopup, setShowStakingPopup] = useState(true);
// // //   const hasFetched = useRef(false);

// // //   const fetchUserData = async () => {
// // //     if (!token || !user?.userId) return;

// // //     // 🔥 SPEED UP FIX: LOCAL STORAGE CACHE CHECK 🔥
// // //     const cacheKey = `dash_cache_${user.userId}`;
// // //     const cachedData = localStorage.getItem(cacheKey);

// // //     if (cachedData) {
// // //         try {
// // //             const parsedData = JSON.parse(cachedData);
// // //             setTotalRealUsers(parsedData.totalRealUsers || 0);
// // //             setGlobalFakeCount(parsedData.globalFakeCount || 0);
// // //             setActiveDownlineCount(parsedData.activeDownlineCount || 0);
// // //             setIncome(parsedData.income || income);
// // //             setLatestGlobalUsers(parsedData.latestGlobalUsers || []);
// // //             // Agar Cache mil gaya, toh loading spinner on nahi karenge, seedha UI dikhayenge!
// // //         } catch (error) {
// // //             console.error("Cache parse error", error);
// // //         }
// // //     } else {
// // //         // Agar pehli baar load ho raha hai (koi cache nahi), tabhi spinner dikhao
// // //         setLoading(true);
// // //     }

// // //     try {
// // //         // 🔥 1. MAIN DATA (Background me fetch hoga agar UI load ho chuka hai)
// // //         const [userRes, incomeRes] = await Promise.all([
// // //             api.get(`/user/${user.userId}?t=${new Date().getTime()}`, { headers: { Authorization: `Bearer ${token}` } }),
// // //             api.get(`/wallet/${user.userId}?t=${new Date().getTime()}`, { headers: { Authorization: `Bearer ${token}` } })
// // //         ]);
        
// // //         setUser(userRes.data.user); 
// // //         setTotalRealUsers(userRes.data.totalRealUsers || 0);
// // //         setGlobalFakeCount(userRes.data.globalFakeCount || 0);
// // //         setActiveDownlineCount(incomeRes.data.activeDownlineCount || 0);

// // //         const newIncome = {
// // //           directIncome: incomeRes.data.directIncome || 0,
// // //           levelIncome: incomeRes.data.levelIncome || 0,
// // //           dailyIncome: incomeRes.data.planIncome || 0,
// // //           spinIncome: incomeRes.data.spinIncome || 0,
// // //           rewardIncome: incomeRes.data.rewardIncome || 0,
// // //           totalDirectIncome: incomeRes.data.income?.totalDirectIncome || 0,
// // //           totalLevelIncome: incomeRes.data.income?.totalLevelIncome || 0,
// // //           totalRewardIncome: incomeRes.data.income?.totalRewardIncome || 0,
// // //           totalSpinIncome: incomeRes.data.income?.totalSpinIncome || 0,
// // //           fastTrackIncome: incomeRes.data.fastTrackIncome || incomeRes.data.income?.fastTrackIncome || 0,
// // //           totalFastTrackIncome: incomeRes.data.totalFastTrackIncome || incomeRes.data.income?.totalFastTrackIncome || 0,
// // //         };
        
// // //         setIncome(newIncome);

// // //         // 🔥 2. SILENT BACKGROUND FETCH 
// // //         let newGlobalUsers = latestGlobalUsers;
// // //         try {
// // //             const globalRes = await api.get('/community/global-list');
// // //             if(globalRes.data.success) {
// // //                 newGlobalUsers = globalRes.data.data.slice(0, 5);
// // //                 setLatestGlobalUsers(newGlobalUsers);
// // //             }
// // //         } catch(globalErr) {
// // //             console.error("Failed to fetch top 5 global users", globalErr);
// // //         }

// // //         // 🔥 SAVE FRESH DATA TO CACHE FOR NEXT VISIT 🔥
// // //         localStorage.setItem(cacheKey, JSON.stringify({
// // //             totalRealUsers: userRes.data.totalRealUsers || 0,
// // //             globalFakeCount: userRes.data.globalFakeCount || 0,
// // //             activeDownlineCount: incomeRes.data.activeDownlineCount || 0,
// // //             income: newIncome,
// // //             latestGlobalUsers: newGlobalUsers
// // //         }));

// // //     } catch (err) {
// // //         console.error("Failed to fetch user data:", err);
// // //         if (err?.response?.status === 401) logout();
// // //     } finally {
// // //         setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user?.userId) {
// // //         hasFetched.current = false;
// // //     }
// // //   }, [user?.userId]);

// // //   useEffect(() => {
// // //     if (!hasFetched.current && token && user?.userId) {
// // //       hasFetched.current = true;
// // //       fetchUserData();
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [user?.userId, token]); 

// // //   // 🔥 DIRECT WALLET POPUP LOGIC
// // //   useEffect(() => {
// // //     if (user && user.userId) {
// // //       const hasWallet = user.walletAddress && user.walletAddress.trim() !== "";
      
// // //       if (!hasWallet) {
// // //         const timer = setTimeout(() => {
// // //           setShowWallet(true);
// // //         }, 800); 

// // //         return () => clearTimeout(timer);
// // //       }
// // //     }
// // //   }, [user?.userId, user?.walletAddress]); 

// // //   const handleCloseWallet = () => {
// // //     setShowWallet(false);
// // //   };

// // //   const handleTopUpSuccess = async (amount = 0, userId = "") => {
// // //     await fetchUserData();
// // //     setWalletRefreshKey((prev) => prev + 1);
// // //     if (amount > 0) {
// // //       setSuccessModal({ isOpen: true, userId, amount });
// // //     }
// // //   };

// // //   const claimDailyROI = async (dayIndex) => {
// // //     try {
// // //       setLoading(true);
// // //       await api.put(
// // //         `/user/claim-daily/${user.userId}`,
// // //         { dayIndex },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       await handleTopUpSuccess();
// // //     } catch (err) {
// // //       console.error("Failed to claim Daily ROI:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!user || !token) return <SpinnerOverlay />;

// // //   const referralLink = `${window.location.origin}/register?ref=${user.userId}`;

// // //   return (
// // //     <div className="w-full relative animate-fadeIn pb-28 md:pb-8">
      
// // //       {/* 
// // //         🔥 NOTE: Yahan sirf tabhi full-screen spinner dikhega jab user first time login kare (yani cache khali ho).
// // //         Agli baar se ye false rahega aur PEECHE data fetch hota rahega UI block kiye bina!
// // //       */}
// // //       {loading && <SpinnerOverlay />}

// // //       {/* 🔥 WALLET POPUP */}
// // //     {/* {showWallet && <WalletPopup onClose={handleCloseWallet} />} */}
// // //       {/* {showStakingPopup && (
// // //   <StakingPopup onClose={() => setShowStakingPopup(false)} />
// // // )} */}

// // //       <div className="space-y-6 md:space-y-8 relative z-10">
        
// // //         <section>
// // //           <WalletBalance userId={user.userId} refreshKey={walletRefreshKey} income={income} />
// // //         </section>
         
// // //        <section>
// // //         <TotalSystemUsers 
// // //             user={user} 
// // //             totalRealUsersFromDB={totalRealUsers} 
// // //             globalFakeCount={globalFakeCount} 
// // //             activeDownlineCount={activeDownlineCount}
// // //         />
// // //     </section>
// // //          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // //              <ReferralLink link={referralLink} />
// // //         </div>

// // //         {/* 🔥 STAKING PROGRAM SECTION (Promo Video ke theek upar) */}
// // //         <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // //             <StakingProgram />
// // //         </section>

// // //  {/* 🔥 SMART TIMER BANNER: Yeh sirf valid users ko dikhega */}
// // //        <FastTrackTimerBanner user={user} /> 
// // //       {/* <UpcomingFeaturesBanner /> */}

// // //         <div>
// // //             <PromoVideoBox />
// // //         </div>

       
        
// // //         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
// // //             {/* 1. Income Summary Box */}
// // //             <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
// // //                 <IncomeSummary income={income} user={user} />
// // //             </div>

// // //             {/* 🔥 2. Monthly Reward Box */}
// // //             <div>
// // //                 <MonthlyRewardBox />
// // //             </div>
// // //         </div>

// // //         <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
// // //             <DailyROIPlan dailyROI={user.dailyROI || []} onClaim={claimDailyROI} />
// // //         </section>

// // //         {latestGlobalUsers.length > 0 && (
// // //        <section 
// // //              onClick={() => navigate('/global-community')}
// // //              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group p-4 md:p-5"
// // //           >
// // //              <div className="flex justify-between items-center mb-4">
// // //                  <h3 className="font-black text-slate-800 flex items-center gap-2 text-sm md:text-base uppercase tracking-tight">
// // //                     <Globe className="text-blue-500 animate-pulse" size={20}/> Live All Community
// // //                  </h3>
// // //                  <span className="text-[10px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
// // //                     View All <ChevronRight size={14}/>
// // //                  </span>
// // //              </div>

// // //              <div className="space-y-2">
// // //                  {latestGlobalUsers.map((u, idx) => (
// // //                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl border border-slate-100 gap-2 sm:gap-0">
                         
// // //                          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
// // //                              <div className="flex items-center gap-3">
// // //                                  <img 
// // //                                     src={`https://flagcdn.com/w40/${(u.country || 'in').toLowerCase()}.png`} 
// // //                                     alt={u.country}
// // //                                     className="w-6 sm:w-7 h-auto rounded-[2px] shadow-[0_0_2px_rgba(0,0,0,0.2)]"
// // //                                     onError={(e) => { e.target.src = 'https://flagcdn.com/w40/in.png'; }}
// // //                                  />
// // //                                  <div>
// // //                                     <span className="text-[10px] font-bold text-slate-400 tracking-wider">
// // //   #{(() => {
// // //     const id = String(u.userId);
// // //     if (id.length <= 4) {
// // //       // Agar ID 4 ya usse choti hai toh sabhi ko star bana do
// // //       return '****';
// // //     } else {
// // //       // Shuru ke 2 '*' + Beech ka part + Last ke 2 '*'
// // //       const middlePart = id.substring(2, id.length - 2);
// // //       return `**${middlePart}**`;
// // //     }
// // //   })()}
// // // </span>
// // //                                  </div>
// // //                              </div>
                             
// // //                              <div className="sm:hidden flex items-center gap-1 bg-green-50 border border-green-100 text-green-600 px-2 py-1 rounded-md">
// // //                                  <span className="font-black text-[10px]">${u.amount || 30}</span>
// // //                                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
// // //                              </div>
// // //                          </div>

// // //                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-200 sm:border-transparent pt-2 sm:pt-0">
// // //                              <div className="flex items-center gap-1.5 text-slate-500">
// // //                                 <CalendarDays size={12} className="opacity-70" />
// // //                                 <span className="font-bold text-[10px] sm:text-xs">
// // //                                    {new Date(u.date || new Date()).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
// // //                                 </span>
// // //                              </div>
                             
// // //                              <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-600 px-2.5 py-1 rounded-lg">
// // //                                  <span className="font-black text-xs">${u.amount || 30}</span>
// // //                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
// // //                                  <span className="text-[9px] font-black uppercase">Active</span>
// // //                              </div>
// // //                          </div>
                         
// // //                      </div>
// // //                  ))}
// // //              </div>
// // //           </section>
// // //         )}
        
// // //       </div>

// // //       <SuccessModal
// // //         isOpen={successModal.isOpen}
// // //         userId={successModal.userId}
// // //         amount={successModal.amount}
// // //         onClose={() => setSuccessModal((prev) => ({ ...prev, isOpen: false }))}
// // //       />

// // //       {!loading && user && <TelegramPopup currentUser={user} />}
      
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;



// // import React, { useEffect, useState, useRef } from "react";
// // import api from "../../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";
// // import {
// //   Globe, ChevronRight, CalendarDays, Sparkles, ShieldCheck,
// //   Users, Wallet, TrendingUp, Activity, ArrowUpRight,
// //   Crown, Zap, CircleDollarSign, UserRound, Clock3
// // } from "lucide-react";

// // import TotalSystemUsers from "../../components/dashboard/TotalSystemUsers";
// // import IncomeSummary from "../../components/dashboard/IncomeSummary";
// // import ReferralLink from "../../components/dashboard/ReferralLink";
// // import WalletBalance from "../../components/dashboard/WalletBalance";
// // import DailyROIPlan from "../../components/dashboard/DailyROI";
// // import SpinnerOverlay from "../../components/common/SpinnerOverlay";
// // import SuccessModal from "../../components/modals/SuccessModal";
// // import TelegramPopup from "../../components/TelegramPopup";
// // import PromoVideoBox from "../../components/dashboard/PromoVideoBox";
// // import FastTrackTimerBanner from "../../components/dashboard/FastTrackTimerBanner";
// // import MonthlyRewardBox from "../../components/MonthlyRewardBox";
// // import StakingProgram from "./StakingProgram";

// // const Dashboard = ({ setModalState }) => {
// //   const { user, token, setUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const [walletRefreshKey, setWalletRefreshKey] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   const [totalRealUsers, setTotalRealUsers] = useState(0);
// //   const [globalFakeCount, setGlobalFakeCount] = useState(0);
// //   const [activeDownlineCount, setActiveDownlineCount] = useState(0);
// //   const [latestGlobalUsers, setLatestGlobalUsers] = useState([]);

// //   const [income, setIncome] = useState({
// //     directIncome: 0,
// //     levelIncome: 0,
// //     dailyIncome: 0,
// //     spinIncome: 0,
// //     availableSpins: 0,
// //   });

// //   const [successModal, setSuccessModal] = useState({
// //     isOpen: false,
// //     userId: "",
// //     amount: 0,
// //   });

// //   const [showWallet, setShowWallet] = useState(false);
// //   const [showStakingPopup, setShowStakingPopup] = useState(true);
// //   const hasFetched = useRef(false);

// //   // EXISTING DASHBOARD API + CACHE LOGIC
// //   const fetchUserData = async () => {
// //     if (!token || !user?.userId) return;

// //     const cacheKey = `dash_cache_${user.userId}`;
// //     const cachedData = localStorage.getItem(cacheKey);

// //     if (cachedData) {
// //       try {
// //         const parsedData = JSON.parse(cachedData);
// //         setTotalRealUsers(parsedData.totalRealUsers || 0);
// //         setGlobalFakeCount(parsedData.globalFakeCount || 0);
// //         setActiveDownlineCount(parsedData.activeDownlineCount || 0);
// //         setIncome(parsedData.income || income);
// //         setLatestGlobalUsers(parsedData.latestGlobalUsers || []);
// //       } catch (error) {
// //         console.error("Cache parse error", error);
// //       }
// //     } else {
// //       setLoading(true);
// //     }

// //     try {
// //       const [userRes, incomeRes] = await Promise.all([
// //         api.get(
// //           `/user/${user.userId}?t=${new Date().getTime()}`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         ),
// //         api.get(
// //           `/wallet/${user.userId}?t=${new Date().getTime()}`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         )
// //       ]);

// //       setUser(userRes.data.user);
// //       setTotalRealUsers(userRes.data.totalRealUsers || 0);
// //       setGlobalFakeCount(userRes.data.globalFakeCount || 0);
// //       setActiveDownlineCount(incomeRes.data.activeDownlineCount || 0);

// //       const newIncome = {
// //         directIncome: incomeRes.data.directIncome || 0,
// //         levelIncome: incomeRes.data.levelIncome || 0,
// //         dailyIncome: incomeRes.data.planIncome || 0,
// //         spinIncome: incomeRes.data.spinIncome || 0,
// //         rewardIncome: incomeRes.data.rewardIncome || 0,
// //         totalDirectIncome: incomeRes.data.income?.totalDirectIncome || 0,
// //         totalLevelIncome: incomeRes.data.income?.totalLevelIncome || 0,
// //         totalRewardIncome: incomeRes.data.income?.totalRewardIncome || 0,
// //         totalSpinIncome: incomeRes.data.income?.totalSpinIncome || 0,
// //         fastTrackIncome:
// //           incomeRes.data.fastTrackIncome ||
// //           incomeRes.data.income?.fastTrackIncome || 0,
// //         totalFastTrackIncome:
// //           incomeRes.data.totalFastTrackIncome ||
// //           incomeRes.data.income?.totalFastTrackIncome || 0,
// //       };

// //       setIncome(newIncome);

// //       let newGlobalUsers = latestGlobalUsers;

// //       try {
// //         const globalRes = await api.get("/community/global-list");

// //         if (globalRes.data.success) {
// //           newGlobalUsers = globalRes.data.data.slice(0, 5);
// //           setLatestGlobalUsers(newGlobalUsers);
// //         }
// //       } catch (globalErr) {
// //         console.error("Failed to fetch top 5 global users", globalErr);
// //       }

// //       localStorage.setItem(
// //         cacheKey,
// //         JSON.stringify({
// //           totalRealUsers: userRes.data.totalRealUsers || 0,
// //           globalFakeCount: userRes.data.globalFakeCount || 0,
// //           activeDownlineCount: incomeRes.data.activeDownlineCount || 0,
// //           income: newIncome,
// //           latestGlobalUsers: newGlobalUsers,
// //         })
// //       );
// //     } catch (err) {
// //       console.error("Failed to fetch user data:", err);
// //       if (err?.response?.status === 401) logout();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.userId) {
// //       hasFetched.current = false;
// //     }
// //   }, [user?.userId]);

// //   useEffect(() => {
// //     if (!hasFetched.current && token && user?.userId) {
// //       hasFetched.current = true;
// //       fetchUserData();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [user?.userId, token]);

// //   // EXISTING WALLET POPUP LOGIC
// //   useEffect(() => {
// //     if (user && user.userId) {
// //       const hasWallet =
// //         user.walletAddress && user.walletAddress.trim() !== "";

// //       if (!hasWallet) {
// //         const timer = setTimeout(() => {
// //           setShowWallet(true);
// //         }, 800);

// //         return () => clearTimeout(timer);
// //       }
// //     }
// //   }, [user?.userId, user?.walletAddress]);

// //   const handleCloseWallet = () => {
// //     setShowWallet(false);
// //   };

// //   // EXISTING TOP-UP SUCCESS LOGIC
// //   const handleTopUpSuccess = async (amount = 0, userId = "") => {
// //     await fetchUserData();
// //     setWalletRefreshKey((prev) => prev + 1);

// //     if (amount > 0) {
// //       setSuccessModal({ isOpen: true, userId, amount });
// //     }
// //   };

// //   // EXISTING DAILY ROI CLAIM API
// //   const claimDailyROI = async (dayIndex) => {
// //     try {
// //       setLoading(true);

// //       await api.put(
// //         `/user/claim-daily/${user.userId}`,
// //         { dayIndex },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       await handleTopUpSuccess();
// //     } catch (err) {
// //       console.error("Failed to claim Daily ROI:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!user || !token) return <SpinnerOverlay />;

// //   const referralLink =
// //     `${window.location.origin}/register?ref=${user.userId}`;

// //   const displayName = user.name || user.username || "Member";

// //   return (
// //     <div className="hp-dashboard">
// //       <style>{`
// //         .hp-dashboard {
// //           --hp-green: #07966d;
// //           --hp-dark: #102b35;
// //           --hp-muted: #82949b;
// //           --hp-border: #e8eef0;
// //           min-height: 100vh;
// //           padding: 24px 24px 90px;
// //           background: #f3f7f8;
// //           color: #18323d;
// //           font-family: Inter, Arial, sans-serif;
// //         }

// //         .hp-dashboard * {
// //           box-sizing: border-box;
// //         }

// //         .hp-dash-container {
// //           width: 100%;
// //           max-width: 1440px;
// //           margin: 0 auto;
// //         }

// //         .hp-dash-top {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 15px;
// //           margin-bottom: 22px;
// //         }

// //         .hp-dash-brand {
// //           display: flex;
// //           align-items: center;
// //           gap: 11px;
// //         }

// //         .hp-dash-brand-icon {
// //           width: 43px;
// //           height: 43px;
// //           display: grid;
// //           place-items: center;
// //           color: white;
// //           border-radius: 13px;
// //           background: linear-gradient(135deg,#087b61,#16b88a);
// //           box-shadow: 0 7px 18px rgba(7,150,109,.18);
// //         }

// //         .hp-dash-brand-name {
// //           color: #142f3b;
// //           font-size: 18px;
// //           font-weight: 950;
// //           letter-spacing: -.7px;
// //         }

// //         .hp-dash-brand-name span {
// //           color: var(--hp-green);
// //         }

// //         .hp-dash-top-right {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //         }

// //         .hp-dash-secure {
// //           display: flex;
// //           align-items: center;
// //           gap: 7px;
// //           padding: 9px 13px;
// //           border: 1px solid #dcefe7;
// //           border-radius: 30px;
// //           color: #07845f;
// //           background: #edfaf4;
// //           font-size: 10px;
// //           font-weight: 850;
// //         }

// //         .hp-dash-hero {
// //           position: relative;
// //           overflow: hidden;
// //           padding: 30px 34px;
// //           margin-bottom: 24px;
// //           border-radius: 22px;
// //           background:
// //             radial-gradient(circle at 90% 10%,rgba(47,220,167,.2),transparent 28%),
// //             radial-gradient(circle at 10% 100%,rgba(31,133,130,.24),transparent 32%),
// //             linear-gradient(115deg,#102d3a,#104c4c 65%,#08785d);
// //           box-shadow: 0 14px 32px rgba(16,54,62,.12);
// //         }

// //         .hp-dash-hero::after {
// //           content: "";
// //           position: absolute;
// //           width: 270px;
// //           height: 270px;
// //           right: 8%;
// //           top: -200px;
// //           border: 1px solid rgba(255,255,255,.12);
// //           border-radius: 50%;
// //           box-shadow: 0 0 0 35px rgba(255,255,255,.025),
// //                       0 0 0 70px rgba(255,255,255,.02);
// //         }

// //         .hp-dash-hero-content {
// //           position: relative;
// //           z-index: 1;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 20px;
// //         }

// //         .hp-dash-welcome-tag {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 7px;
// //           margin-bottom: 12px;
// //           color: #83edc8;
// //           font-size: 10px;
// //           font-weight: 900;
// //           letter-spacing: 1.5px;
// //         }

// //         .hp-dash-hero h1 {
// //           margin: 0 0 9px;
// //           color: #fff;
// //           font-size: clamp(25px,3vw,35px);
// //           line-height: 1.15;
// //           font-weight: 950;
// //           letter-spacing: -1px;
// //         }

// //         .hp-dash-hero h1 span {
// //           color: #70e9c1;
// //         }

// //         .hp-dash-hero p {
// //           margin: 0;
// //           color: rgba(255,255,255,.7);
// //           font-size: 12px;
// //           line-height: 1.7;
// //         }

// //         .hp-dash-member {
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           padding: 13px 17px;
// //           border: 1px solid rgba(255,255,255,.16);
// //           border-radius: 14px;
// //           background: rgba(255,255,255,.08);
// //           backdrop-filter: blur(8px);
// //         }

// //         .hp-dash-avatar {
// //           width: 43px;
// //           height: 43px;
// //           display: grid;
// //           place-items: center;
// //           flex-shrink: 0;
// //           border-radius: 13px;
// //           color: #0a795c;
// //           background: #baf5df;
// //           font-size: 18px;
// //           font-weight: 950;
// //         }

// //         .hp-dash-member-label {
// //           margin-bottom: 4px;
// //           color: rgba(255,255,255,.58);
// //           font-size: 9px;
// //           font-weight: 800;
// //           letter-spacing: 1px;
// //           text-transform: uppercase;
// //         }

// //         .hp-dash-member-name {
// //           color: #fff;
// //           font-size: 13px;
// //           font-weight: 900;
// //         }

// //         .hp-dash-member-id {
// //           margin-top: 4px;
// //           color: #8de9c9;
// //           font-size: 10px;
// //           font-family: monospace;
// //         }

// //         .hp-dash-section {
// //           margin-bottom: 23px;
// //         }

// //         .hp-dash-section-heading {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 12px;
// //           margin-bottom: 13px;
// //         }

// //         .hp-dash-section-title {
// //           display: flex;
// //           align-items: center;
// //           gap: 9px;
// //           margin: 0;
// //           color: #183541;
// //           font-size: 14px;
// //           font-weight: 950;
// //           letter-spacing: -.2px;
// //         }

// //         .hp-dash-section-title svg {
// //           color: #0b9b73;
// //         }

// //         .hp-dash-section-sub {
// //           color: #91a0a6;
// //           font-size: 10px;
// //           font-weight: 650;
// //         }

// //         .hp-dash-panel {
// //           overflow: hidden;
// //           border: 1px solid var(--hp-border);
// //           border-radius: 17px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-panel-pad {
// //           padding: 19px;
// //         }

// //         .hp-dash-wallet {
// //           border-radius: 18px;
// //         }

// //         .hp-dash-referral {
// //           padding: 5px;
// //           border: 1px solid #e2ece8;
// //           border-radius: 17px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-staking {
// //           overflow: hidden;
// //           border: 1px solid #e1ece8;
// //           border-radius: 18px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-promo {
// //           overflow: hidden;
// //           border: 1px solid var(--hp-border);
// //           border-radius: 18px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-income-grid {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           gap: 20px;
// //           align-items: stretch;
// //         }

// //         .hp-dash-income-card {
// //           min-width: 0;
// //           overflow: hidden;
// //           padding: 8px;
// //           border: 1px solid var(--hp-border);
// //           border-radius: 18px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-roi {
// //           overflow: hidden;
// //           border: 1px solid var(--hp-border);
// //           border-radius: 18px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //         }

// //         .hp-dash-community {
// //           padding: 19px;
// //           border: 1px solid var(--hp-border);
// //           border-radius: 18px;
// //           background: #fff;
// //           box-shadow: 0 5px 18px rgba(22,54,65,.035);
// //           cursor: pointer;
// //           transition: .2s;
// //         }

// //         .hp-dash-community:hover {
// //           border-color: #b6e7d5;
// //           box-shadow: 0 10px 25px rgba(22,54,65,.07);
// //           transform: translateY(-2px);
// //         }

// //         .hp-dash-community-head {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 12px;
// //           margin-bottom: 17px;
// //         }

// //         .hp-dash-community-title {
// //           display: flex;
// //           align-items: center;
// //           gap: 9px;
// //           color: #183541;
// //           font-size: 13px;
// //           font-weight: 950;
// //           letter-spacing: .2px;
// //         }

// //         .hp-dash-view-all {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 5px;
// //           padding: 8px 11px;
// //           border-radius: 8px;
// //           background: #eaf8f2;
// //           color: #07845f;
// //           font-size: 10px;
// //           font-weight: 900;
// //           transition: .2s;
// //         }

// //         .hp-dash-community:hover .hp-dash-view-all {
// //           color: #fff;
// //           background: #078b68;
// //         }

// //         .hp-dash-user-list {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 9px;
// //         }

// //         .hp-dash-user-row {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 12px;
// //           padding: 12px 14px;
// //           border: 1px solid #edf1f2;
// //           border-radius: 12px;
// //           background: #f8fafb;
// //           transition: .2s;
// //         }

// //         .hp-dash-user-row:hover {
// //           background: #f0f8f5;
// //           border-color: #d9eee5;
// //         }

// //         .hp-dash-user-left {
// //           display: flex;
// //           align-items: center;
// //           gap: 11px;
// //           min-width: 0;
// //         }

// //         .hp-dash-flag {
// //           width: 29px;
// //           height: 21px;
// //           object-fit: cover;
// //           border-radius: 4px;
// //           box-shadow: 0 1px 3px rgba(0,0,0,.12);
// //         }

// //         .hp-dash-user-id {
// //           color: #607680;
// //           font-size: 11px;
// //           font-weight: 850;
// //           font-family: monospace;
// //         }

// //         .hp-dash-user-date {
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           color: #899ba2;
// //           font-size: 10px;
// //           font-weight: 750;
// //         }

// //         .hp-dash-active {
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           padding: 7px 10px;
// //           border: 1px solid #d7f0e3;
// //           border-radius: 8px;
// //           background: #eaf8ef;
// //           color: #078452;
// //           font-size: 10px;
// //           font-weight: 950;
// //         }

// //         .hp-dash-active-dot {
// //           width: 6px;
// //           height: 6px;
// //           border-radius: 50%;
// //           background: #12b878;
// //           box-shadow: 0 0 0 3px rgba(18,184,120,.1);
// //         }

// //         .hp-dash-footer {
// //           display: flex;
// //           justify-content: center;
// //           gap: 7px;
// //           padding-top: 12px;
// //           color: #9aabb0;
// //           font-size: 9px;
// //           font-weight: 700;
// //         }

// //         .hp-dash-footer svg {
// //           color: #0c9b73;
// //         }

// //         @media(max-width: 900px) {
// //           .hp-dashboard {
// //             padding: 18px 16px 80px;
// //           }

// //           .hp-dash-income-grid {
// //             grid-template-columns: 1fr;
// //           }
// //         }

// //         @media(max-width: 600px) {
// //           .hp-dashboard {
// //             padding: 13px 11px 75px;
// //           }

// //           .hp-dash-top {
// //             margin-bottom: 15px;
// //           }

// //           .hp-dash-brand-name {
// //             font-size: 16px;
// //           }

// //           .hp-dash-brand-icon {
// //             width: 38px;
// //             height: 38px;
// //           }

// //           .hp-dash-secure {
// //             padding: 8px;
// //             font-size: 0;
// //           }

// //           .hp-dash-hero {
// //             padding: 23px 19px;
// //             margin-bottom: 19px;
// //             border-radius: 17px;
// //           }

// //           .hp-dash-hero-content {
// //             align-items: flex-start;
// //             flex-direction: column;
// //           }

// //           .hp-dash-hero h1 {
// //             font-size: 27px;
// //           }

// //           .hp-dash-member {
// //             width: 100%;
// //           }

// //           .hp-dash-section {
// //             margin-bottom: 18px;
// //           }

// //           .hp-dash-section-title {
// //             font-size: 12px;
// //           }

// //           .hp-dash-section-sub {
// //             font-size: 9px;
// //           }

// //           .hp-dash-community {
// //             padding: 13px;
// //           }

// //           .hp-dash-user-row {
// //             align-items: flex-start;
// //             flex-direction: column;
// //             gap: 9px;
// //             padding: 11px;
// //           }

// //           .hp-dash-user-left {
// //             width: 100%;
// //           }

// //           .hp-dash-user-meta {
// //             width: 100%;
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //           }

// //           .hp-dash-community-title {
// //             font-size: 11px;
// //           }

// //           .hp-dash-view-all {
// //             padding: 7px 8px;
// //             font-size: 9px;
// //           }
// //         }

// //         @media(max-width: 380px) {
// //           .hp-dash-brand-name {
// //             font-size: 14px;
// //           }

// //           .hp-dash-hero h1 {
// //             font-size: 24px;
// //           }

// //           .hp-dash-member {
// //             padding: 11px;
// //           }
// //         }
// //       `}</style>

// //       <div className="hp-dash-container">

// //         {loading && <SpinnerOverlay />}

// //         {/* TOP NAVIGATION */}
// //         <header className="hp-dash-top">
// //           <div className="hp-dash-brand">
// //             <div className="hp-dash-brand-icon">
// //               <Globe size={22} />
// //             </div>
// //             <div className="hp-dash-brand-name">
// //               HELPING<span>POOLS</span>
// //             </div>
// //           </div>

// //           <div className="hp-dash-top-right">
// //             <div className="hp-dash-secure">
// //               <ShieldCheck size={14} />
// //               SECURE MEMBER AREA
// //             </div>
// //           </div>
// //         </header>

// //         {/* WELCOME HERO */}
// //         <section className="hp-dash-hero">
// //           <div className="hp-dash-hero-content">
// //             <div>
// //               <div className="hp-dash-welcome-tag">
// //                 <Sparkles size={14} />
// //                 MEMBER DASHBOARD
// //               </div>

// //               <h1>
// //                 Welcome Back, <span>{displayName}</span>
// //               </h1>

// //               <p>
// //                 Your community, wallet and account activity — all in one place.
// //               </p>
// //             </div>

// //             <div className="hp-dash-member">
// //               <div className="hp-dash-avatar">
// //                 {String(displayName).charAt(0).toUpperCase()}
// //               </div>

// //               <div>
// //                 <div className="hp-dash-member-label">Your Member Account</div>
// //                 <div className="hp-dash-member-name">{displayName}</div>
// //                 <div className="hp-dash-member-id">
// //                   ID: {user.userId}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* WALLET */}
// //         {/* <section className="hp-dash-section">
// //           <div className="hp-dash-section-heading">
// //             <h2 className="hp-dash-section-title">
// //               <Wallet size={18} />
// //               Wallet Overview
// //             </h2>
// //             <span className="hp-dash-section-sub">
// //               Your account balance
// //             </span>
// //           </div>

// //           <div className="hp-dash-panel hp-dash-wallet">
// //             <WalletBalance
// //               userId={user.userId}
// //               refreshKey={walletRefreshKey}
// //               income={income}
// //             />
// //           </div>
// //         </section> */}

// //         {/* COMMUNITY STATISTICS */}
// //         {/* <section className="hp-dash-section">
// //           <div className="hp-dash-section-heading">
// //             <h2 className="hp-dash-section-title">
// //               <Users size={18} />
// //               Community Overview
// //             </h2>
// //             <span className="hp-dash-section-sub">
// //               Network statistics
// //             </span>
// //           </div>

// //           <div className="hp-dash-panel">
// //             <TotalSystemUsers
// //               user={user}
// //               totalRealUsersFromDB={totalRealUsers}
// //               globalFakeCount={globalFakeCount}
// //               activeDownlineCount={activeDownlineCount}
// //             />
// //           </div>
// //         </section> */}

// //         {/* REFERRAL LINK */}
// //         <section className="hp-dash-section">
// //           <div className="hp-dash-section-heading">
// //             <h2 className="hp-dash-section-title">
// //               <ArrowUpRight size={18} />
// //               Your Referral Link
// //             </h2>
// //             <span className="hp-dash-section-sub">
// //               Invite your community
// //             </span>
// //           </div>

// //           <div className="hp-dash-referral">
// //             <ReferralLink link={referralLink} />
// //           </div>
// //         </section>

   

   

     

// //         {/* INCOME + MONTHLY REWARDS */}
// //         <section className="hp-dash-section">
// //           <div className="hp-dash-section-heading">
// //             <h2 className="hp-dash-section-title">
// //               <TrendingUp size={18} />
// //               Earnings & Rewards
// //             </h2>
// //             <span className="hp-dash-section-sub">
// //               Income overview
// //             </span>
// //           </div>

// //           <div className="hp-dash-income-grid">
// //             <div className="hp-dash-income-card">
// //               <IncomeSummary income={income} user={user} />
// //             </div>

            
// //           </div>
// //         </section>

// //         {/* DAILY ROI */}
// //         <section className="hp-dash-section">
// //           <div className="hp-dash-section-heading">
// //             <h2 className="hp-dash-section-title">
// //               <Activity size={18} />
// //                Plan
// //             </h2>
// //             <span className="hp-dash-section-sub">
// //               Daily activity
// //             </span>
// //           </div>

// //           <div className="hp-dash-roi">
// //             <DailyROIPlan
// //               dailyROI={user.dailyROI || []}
// //               onClaim={claimDailyROI}
// //             />
// //           </div>
// //         </section>

      
// //         {/* FOOTER */}
// //         <div className="hp-dash-footer">
// //           <ShieldCheck size={13} />
// //           Helping Pools Member Dashboard
// //           <span>•</span>
// //           © {new Date().getFullYear()}
// //         </div>
// //       </div>

// //       {/* EXISTING SUCCESS MODAL */}
// //       <SuccessModal
// //         isOpen={successModal.isOpen}
// //         userId={successModal.userId}
// //         amount={successModal.amount}
// //         onClose={() =>
// //           setSuccessModal((prev) => ({
// //             ...prev,
// //             isOpen: false,
// //           }))
// //         }
// //       />

// //       {/* EXISTING TELEGRAM POPUP */}
// //       {!loading && user && (
// //         <TelegramPopup currentUser={user} />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;




// import React, { useEffect, useState, useRef } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import {
//   Globe,
//   ShieldCheck,
//   Sparkles,
//   ArrowUpRight,
//   TrendingUp,
//   Activity,
// } from "lucide-react";

// import IncomeSummary from "../../components/dashboard/IncomeSummary";
// import ReferralLink from "../../components/dashboard/ReferralLink";
// import DailyROIPlan from "../../components/dashboard/DailyROI";
// import SpinnerOverlay from "../../components/common/SpinnerOverlay";
// import SuccessModal from "../../components/modals/SuccessModal";
// import TelegramPopup from "../../components/TelegramPopup";

// const Dashboard = ({ setModalState }) => {
//   const { user, token, setUser, logout } = useAuth();

//   const [walletRefreshKey, setWalletRefreshKey] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [totalRealUsers, setTotalRealUsers] = useState(0);
//   const [globalFakeCount, setGlobalFakeCount] = useState(0);
//   const [activeDownlineCount, setActiveDownlineCount] = useState(0);
//   const [latestGlobalUsers, setLatestGlobalUsers] = useState([]);

//   const [income, setIncome] = useState({
//     directIncome: 0,
//     levelIncome: 0,
//     dailyIncome: 0,
//     spinIncome: 0,
//     availableSpins: 0,
//   });

//   const [successModal, setSuccessModal] = useState({
//     isOpen: false,
//     userId: "",
//     amount: 0,
//   });

//   const hasFetched = useRef(false);

//   // Existing dashboard API and cache logic
//   const fetchUserData = async () => {
//     if (!token || !user?.userId) return;

//     const cacheKey = `dash_cache_${user.userId}`;
//     const cachedData = localStorage.getItem(cacheKey);

//     if (cachedData) {
//       try {
//         const parsedData = JSON.parse(cachedData);

//         setTotalRealUsers(parsedData.totalRealUsers || 0);
//         setGlobalFakeCount(parsedData.globalFakeCount || 0);
//         setActiveDownlineCount(parsedData.activeDownlineCount || 0);
//         setIncome(parsedData.income || income);
//         setLatestGlobalUsers(parsedData.latestGlobalUsers || []);
//       } catch (error) {
//         console.error("Cache parse error", error);
//       }
//     } else {
//       setLoading(true);
//     }

//     try {
//       const [userRes, incomeRes] = await Promise.all([
//         api.get(`/user/${user.userId}?t=${Date.now()}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         api.get(`/wallet/${user.userId}?t=${Date.now()}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       setUser(userRes.data.user);
//       setTotalRealUsers(userRes.data.totalRealUsers || 0);
//       setGlobalFakeCount(userRes.data.globalFakeCount || 0);
//       setActiveDownlineCount(incomeRes.data.activeDownlineCount || 0);

//       const newIncome = {
//         directIncome: incomeRes.data.directIncome || 0,
//         levelIncome: incomeRes.data.levelIncome || 0,
//         dailyIncome: incomeRes.data.planIncome || 0,
//         spinIncome: incomeRes.data.spinIncome || 0,
//         rewardIncome: incomeRes.data.rewardIncome || 0,
//         totalDirectIncome: incomeRes.data.income?.totalDirectIncome || 0,
//         totalLevelIncome: incomeRes.data.income?.totalLevelIncome || 0,
//         totalRewardIncome: incomeRes.data.income?.totalRewardIncome || 0,
//         totalSpinIncome: incomeRes.data.income?.totalSpinIncome || 0,
//         fastTrackIncome:
//           incomeRes.data.fastTrackIncome ||
//           incomeRes.data.income?.fastTrackIncome ||
//           0,
//         totalFastTrackIncome:
//           incomeRes.data.totalFastTrackIncome ||
//           incomeRes.data.income?.totalFastTrackIncome ||
//           0,
//       };

//       setIncome(newIncome);

//       let newGlobalUsers = latestGlobalUsers;

//       try {
//         const globalRes = await api.get("/community/global-list");

//         if (globalRes.data.success) {
//           newGlobalUsers = globalRes.data.data.slice(0, 5);
//           setLatestGlobalUsers(newGlobalUsers);
//         }
//       } catch (globalErr) {
//         console.error("Failed to fetch top 5 global users", globalErr);
//       }

//       localStorage.setItem(
//         cacheKey,
//         JSON.stringify({
//           totalRealUsers: userRes.data.totalRealUsers || 0,
//           globalFakeCount: userRes.data.globalFakeCount || 0,
//           activeDownlineCount: incomeRes.data.activeDownlineCount || 0,
//           income: newIncome,
//           latestGlobalUsers: newGlobalUsers,
//         })
//       );
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);

//       if (err?.response?.status === 401) logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.userId) {
//       hasFetched.current = false;
//     }
//   }, [user?.userId]);

//   useEffect(() => {
//     if (!hasFetched.current && token && user?.userId) {
//       hasFetched.current = true;
//       fetchUserData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.userId, token]);

//   // Existing top-up success logic
//   const handleTopUpSuccess = async (amount = 0, userId = "") => {
//     await fetchUserData();
//     setWalletRefreshKey((prev) => prev + 1);

//     if (amount > 0) {
//       setSuccessModal({ isOpen: true, userId, amount });
//     }
//   };

//   // Existing Daily ROI claim API
//   const claimDailyROI = async (dayIndex) => {
//     try {
//       setLoading(true);

//       await api.put(
//         `/user/claim-daily/${user.userId}`,
//         { dayIndex },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       await handleTopUpSuccess();
//     } catch (err) {
//       console.error("Failed to claim Daily ROI:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user || !token) return <SpinnerOverlay />;

//   const displayName = user.name || user.username || "Member";
//   const referralLink = `${window.location.origin}/register?ref=${user.userId}`;

//   return (
//     <div className="hp-dashboard">
//       <style>{`
//         .hp-dashboard {
//           --green: #087d4d;
//           --green-dark: #075c3b;
//           --green-light: #eaf7ef;
//           --gold: #d5a43b;
//           --text: #18352a;
//           --muted: #82948a;
//           --border: #e5eee7;
//           min-height: 100vh;
//           padding: 18px 20px 65px;
//           background: #f5f8f5;
//           color: var(--text);
//           font-family: Inter, Arial, sans-serif;
//         }

//         .hp-dashboard * {
//           box-sizing: border-box;
//         }

//         .hp-container {
//           width: 100%;
//           max-width: 1250px;
//           margin: auto;
//         }

//         .hp-topbar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 16px;
//         }

//         .hp-brand {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           min-width: 0;
//         }

//         .hp-brand-icon {
//           width: 39px;
//           height: 39px;
//           display: grid;
//           place-items: center;
//           border-radius: 12px;
//           background: linear-gradient(135deg, #087d4d, #16a36c);
//           color: white;
//           box-shadow: 0 4px 12px #087d4d25;
//         }

//         .hp-brand-name {
//           font-size: 16px;
//           font-weight: 950;
//           letter-spacing: -.5px;
//           color: var(--text);
//         }

//         .hp-brand-name span {
//           color: var(--green);
//         }

//         .hp-secure {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 7px 11px;
//           border: 1px solid #dcecdf;
//           border-radius: 30px;
//           background: #eff9f1;
//           color: var(--green);
//           font-size: 9px;
//           font-weight: 850;
//           white-space: nowrap;
//         }

//         .hp-hero {
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 16px;
//           padding: 23px 25px;
//           margin-bottom: 19px;
//           border: 1px solid #176b48;
//           border-radius: 17px;
//           background: linear-gradient(115deg, #073f2b, #087d4d 75%, #119660);
//           box-shadow: 0 8px 22px #075c3b18;
//         }

//         .hp-hero::after {
//           content: "";
//           position: absolute;
//           width: 190px;
//           height: 190px;
//           right: 17%;
//           top: -145px;
//           border: 1px solid #ffffff20;
//           border-radius: 50%;
//           box-shadow: 0 0 0 25px #ffffff08, 0 0 0 50px #ffffff06;
//           pointer-events: none;
//         }

//         .hp-hero-content {
//           position: relative;
//           z-index: 1;
//           min-width: 0;
//         }

//         .hp-welcome-tag {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           margin-bottom: 8px;
//           color: #f0d58e;
//           font-size: 9px;
//           font-weight: 900;
//           letter-spacing: 1.3px;
//         }

//         .hp-hero h1 {
//           margin: 0 0 6px;
//           color: white;
//           font-size: clamp(22px, 3vw, 30px);
//           line-height: 1.2;
//           font-weight: 900;
//           overflow-wrap: anywhere;
//         }

//         .hp-hero h1 span {
//           color: #f3d78d;
//         }

//         .hp-hero p {
//           margin: 0;
//           color: #d1e9db;
//           font-size: 11px;
//           line-height: 1.6;
//         }

//         .hp-member {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 13px;
//           border: 1px solid #ffffff25;
//           border-radius: 13px;
//           background: #ffffff12;
//           flex-shrink: 0;
//         }

//         .hp-avatar {
//           width: 38px;
//           height: 38px;
//           display: grid;
//           place-items: center;
//           border-radius: 11px;
//           background: #f3d78d;
//           color: #155b3d;
//           font-size: 17px;
//           font-weight: 900;
//         }

//         .hp-member-label {
//           color: #c6e3d1;
//           font-size: 8px;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: .8px;
//         }

//         .hp-member-name {
//           margin-top: 3px;
//           color: white;
//           font-size: 12px;
//           font-weight: 850;
//         }

//         .hp-member-id {
//           margin-top: 3px;
//           color: #f3d78d;
//           font-size: 10px;
//           font-family: monospace;
//         }

//         .hp-section {
//           margin-bottom: 17px;
//           min-width: 0;
//         }

//         .hp-section-heading {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 9px;
//         }

//         .hp-section-title {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           margin: 0;
//           color: #244333;
//           font-size: 13px;
//           font-weight: 900;
//         }

//         .hp-section-title svg {
//           color: var(--green);
//         }

//         .hp-section-sub {
//           color: var(--muted);
//           font-size: 10px;
//           font-weight: 650;
//           text-align: right;
//         }

//         .hp-card {
//           min-width: 0;
//           overflow: hidden;
//           padding: 8px;
//           border: 1px solid var(--border);
//           border-radius: 14px;
//           background: white;
//           box-shadow: 0 3px 12px #18352a08;
//         }

//         .hp-referral {
//           padding: 5px;
//         }

//         .hp-income {
//           padding: 7px;
//         }

//         .hp-roi {
//           padding: 7px;
//         }

//         .hp-footer {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 6px;
//           padding-top: 5px;
//           color: #91a197;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         .hp-footer svg {
//           color: var(--green);
//         }

//         @media (max-width: 700px) {
//           .hp-dashboard {
//             padding: 13px 12px 55px;
//           }

//           .hp-hero {
//             align-items: flex-start;
//             flex-direction: column;
//             padding: 19px 17px;
//             gap: 13px;
//             margin-bottom: 15px;
//           }

//           .hp-member {
//             width: 100%;
//           }

//           .hp-section {
//             margin-bottom: 14px;
//           }
//         }

//         @media (max-width: 420px) {
//           .hp-dashboard {
//             padding: 11px 9px 50px;
//           }

//           .hp-brand-name {
//             font-size: 14px;
//           }

//           .hp-brand-icon {
//             width: 35px;
//             height: 35px;
//           }

//           .hp-secure {
//             padding: 7px;
//             font-size: 0;
//           }

//           .hp-hero h1 {
//             font-size: 23px;
//           }

//           .hp-section-title {
//             font-size: 12px;
//           }

//           .hp-section-sub {
//             font-size: 9px;
//           }
//         }
//       `}</style>

//       <div className="hp-container">
//         {loading && <SpinnerOverlay />}

//         {/* Header */}
//         <header className="hp-topbar">
//           <div className="hp-brand">
//             <div className="hp-brand-icon">
//               <Globe size={21} />
//             </div>

//             <div className="hp-brand-name">
//               HELPING<span>POOLS</span>
//             </div>
//           </div>

//           <div className="hp-secure">
//             <ShieldCheck size={14} />
//             SECURE MEMBER AREA
//           </div>
//         </header>

//         {/* Welcome */}
//         <section className="hp-hero">
//           <div className="hp-hero-content">
//             <div className="hp-welcome-tag">
//               <Sparkles size={13} />
//               MEMBER DASHBOARD
//             </div>

//             <h1>
//               Welcome Back, <span>{displayName}</span>
//             </h1>

//             <p>
//               Your wallet, earnings and community in one place.
//             </p>
//           </div>

//           <div className="hp-member">
//             <div className="hp-avatar">
//               {String(displayName).charAt(0).toUpperCase()}
//             </div>

//             <div>
//               <div className="hp-member-label">Member Account</div>
//               <div className="hp-member-name">{displayName}</div>
//               <div className="hp-member-id">ID: {user.userId}</div>
//             </div>
//           </div>
//         </section>

//         {/* Referral */}
//         <section className="hp-section">
//           <div className="hp-section-heading">
//             <h2 className="hp-section-title">
//               <ArrowUpRight size={17} />
//               Your Referral Link
//             </h2>

//             <span className="hp-section-sub">Invite your community</span>
//           </div>

//           <div className="hp-card hp-referral">
//             <ReferralLink link={referralLink} />
//           </div>
//         </section>

//         {/* Income */}
//         <section className="hp-section">
//           <div className="hp-section-heading">
//             <h2 className="hp-section-title">
//               <TrendingUp size={17} />
//               Earnings & Rewards
//             </h2>

//             <span className="hp-section-sub">Income overview</span>
//           </div>

//           <div className="hp-card hp-income">
//             <IncomeSummary income={income} user={user} />
//           </div>
//         </section>

//         {/* Daily ROI */}
//         <section className="hp-section">
//           <div className="hp-section-heading">
//             <h2 className="hp-section-title">
//               <Activity size={17} />
//               Helping Pool Income
//             </h2>

//             <span className="hp-section-sub">Daily activity</span>
//           </div>

//           <div className="hp-card hp-roi">
//             <DailyROIPlan
//               dailyROI={user.dailyROI || []}
//               onClaim={claimDailyROI}
//             />
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="hp-footer">
//           <ShieldCheck size={13} />
//           Helping Pools Member Dashboard
//           <span>•</span>
//           © {new Date().getFullYear()}
//         </footer>
//       </div>

//       {/* Success Modal */}
//       <SuccessModal
//         isOpen={successModal.isOpen}
//         userId={successModal.userId}
//         amount={successModal.amount}
//         onClose={() =>
//           setSuccessModal((prev) => ({
//             ...prev,
//             isOpen: false,
//           }))
//         }
//       />

//       {/* Telegram Popup */}
//       {!loading && user && <TelegramPopup currentUser={user} />}
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity,
} from "lucide-react";

import IncomeSummary from "../../components/dashboard/IncomeSummary";
import TotalSystemUsers from "../../components/dashboard/TotalSystemUsers";
import ReferralLink from "../../components/dashboard/ReferralLink";
import DailyROIPlan from "../../components/dashboard/DailyROI";
import SpinnerOverlay from "../../components/common/SpinnerOverlay";
import SuccessModal from "../../components/modals/SuccessModal";
import TelegramPopup from "../../components/TelegramPopup";

const Dashboard = ({ setModalState }) => {
  const { user, token, setUser, logout } = useAuth();

  const [walletRefreshKey, setWalletRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const [totalRealUsers, setTotalRealUsers] = useState(0);
  const [globalFakeCount, setGlobalFakeCount] = useState(0);
  const [activeDownlineCount, setActiveDownlineCount] = useState(0);
  const [latestGlobalUsers, setLatestGlobalUsers] = useState([]);

  const [income, setIncome] = useState({
    directIncome: 0,
    levelIncome: 0,
    dailyIncome: 0,
    spinIncome: 0,
    availableSpins: 0,
  });

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    userId: "",
    amount: 0,
  });

  const hasFetched = useRef(false);

  // Existing dashboard API and cache logic
  const fetchUserData = async () => {
    if (!token || !user?.userId) return;

    const cacheKey = `dash_cache_${user.userId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);

      
        setActiveDownlineCount(parsedData.activeDownlineCount || 0);
        setIncome(parsedData.income || income);
        setLatestGlobalUsers(parsedData.latestGlobalUsers || []);
      } catch (error) {
        // Ignore invalid cached data.
      }
    } else {
      setLoading(true);
    }

    try {
      const [userRes, incomeRes] = await Promise.all([
        api.get(`/user/${user.userId}?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get(`/wallet/${user.userId}?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUser(userRes.data.user);
   
      setActiveDownlineCount(incomeRes.data.activeDownlineCount || 0);

      const newIncome = {
        directIncome: incomeRes.data.directIncome || 0,
        levelIncome: incomeRes.data.levelIncome || 0,
        dailyIncome: incomeRes.data.planIncome || 0,
        spinIncome: incomeRes.data.spinIncome || 0,
        rewardIncome: incomeRes.data.rewardIncome || 0,
        totalDirectIncome: incomeRes.data.income?.totalDirectIncome || 0,
        totalLevelIncome: incomeRes.data.income?.totalLevelIncome || 0,
        totalRewardIncome: incomeRes.data.income?.totalRewardIncome || 0,
        totalSpinIncome: incomeRes.data.income?.totalSpinIncome || 0,
        fastTrackIncome:
          incomeRes.data.fastTrackIncome ||
          incomeRes.data.income?.fastTrackIncome ||
          0,
        totalFastTrackIncome:
          incomeRes.data.totalFastTrackIncome ||
          incomeRes.data.income?.totalFastTrackIncome ||
          0,
      };

      setIncome(newIncome);

      let newGlobalUsers = latestGlobalUsers;

      try {
        const globalRes = await api.get("/community/global-list");

        if (globalRes.data.success) {
          newGlobalUsers = globalRes.data.data.slice(0, 5);
          setLatestGlobalUsers(newGlobalUsers);
        }
      } catch (globalErr) {
        // Global community list is optional.
      }

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          totalRealUsers: userRes.data.totalRealUsers || 0,
          globalFakeCount: userRes.data.globalFakeCount || 0,
          activeDownlineCount: incomeRes.data.activeDownlineCount || 0,
          income: newIncome,
          latestGlobalUsers: newGlobalUsers,
        })
      );
    } catch (err) {
      if (err?.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  
// Fetch real and demo community statistics
const fetchCommunityStats = async () => {
  if (!token) return;

  try {
    const response = await api.get("/community/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.success) {
      const stats = response.data.data;

      setTotalRealUsers(
        Number(stats.totalRealUsers) || 0
      );

      setGlobalFakeCount(
        Number(stats.demoUsers) || 0
      );

      setActiveDownlineCount(
        Number(stats.activeDownline) || 0
      );
    }
  } catch (error) {
    console.error(
      "Community statistics error:",
      error.response?.data || error.message
    );
  }
};

// Initial load and refresh every 60 seconds
useEffect(() => {
  if (!token || !user?.userId) return;

  fetchCommunityStats();

const interval = setInterval(() => {
  fetchCommunityStats();
}, 30000);

  return () => clearInterval(interval);
}, [token, user?.userId]);


  useEffect(() => {
    if (user?.userId) {
      hasFetched.current = false;
    }
  }, [user?.userId]);

  useEffect(() => {
    if (!hasFetched.current && token && user?.userId) {
      hasFetched.current = true;
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId, token]);

  // Existing top-up success logic
  const handleTopUpSuccess = async (amount = 0, userId = "") => {
    await fetchUserData();
    setWalletRefreshKey((prev) => prev + 1);

    if (amount > 0) {
      setSuccessModal({ isOpen: true, userId, amount });
    }
  };

  // Existing Daily ROI claim API
  const claimDailyROI = async (dayIndex) => {
    try {
      setLoading(true);

      await api.put(
        `/user/claim-daily/${user.userId}`,
        { dayIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await handleTopUpSuccess();
    } catch (err) {
      // API error is handled without console output.
    } finally {
      setLoading(false);
    }
  };

  if (!user || !token) return <SpinnerOverlay />;

  const displayName = user.name || user.username || "Member";
  const referralLink = `${window.location.origin}/register?ref=${user.userId}`;

  return (
    <div className="hp-dashboard">
      <style>{`
        .hp-dashboard {
          --green: #087d4d;
          --green-dark: #075c3b;
          --green-light: #eaf7ef;
          --gold: #d5a43b;
          --text: #18352a;
          --muted: #82948a;
          --border: #e5eee7;
          min-height: 100vh;
          padding: 18px 20px 65px;
          background: #f5f8f5;
          color: var(--text);
          font-family: Inter, Arial, sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        .hp-dashboard,
        .hp-dashboard * {
          box-sizing: border-box;
        }

        .hp-container {
          width: 100%;
          max-width: 1250px;
          margin: auto;
          min-width: 0;
        }

        .hp-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          width: 100%;
          min-width: 0;
        }

        .hp-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .hp-brand-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #087d4d, #16a36c);
          color: white;
          box-shadow: 0 4px 12px #087d4d25;
          flex-shrink: 0;
        }

        .hp-brand-name {
          font-size: 16px;
          font-weight: 950;
          letter-spacing: -.5px;
          color: var(--text);
          white-space: nowrap;
        }

        .hp-brand-name span {
          color: var(--green);
        }

        
.hp-hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 18px;
  align-items: stretch;
  width: 100%;
  margin-bottom: 24px;
}

/* Welcome Box */
.hp-hero-content {
  min-width: 0;
  padding: 25px;
  border-radius: 18px;
  background: linear-gradient(135deg, #075b42, #087b55);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Welcome Label */
.hp-welcome-tag {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #f5d98a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.hp-hero-content h1 {
  font-size: clamp(21px, 2.5vw, 30px);
  line-height: 1.3;
  margin: 0 0 10px;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.hp-hero-content h1 span {
  color: #f5d98a;
}

.hp-hero-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* Member Account Separate Box */
.hp-member {
  min-width: 0;
  padding: 22px;
  border-radius: 18px;
  background: linear-gradient(135deg, #075b42, #159366);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
}

.hp-avatar {
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 17px;
  background: #f5d98a;
  color: #075b42;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
  font-weight: 900;
}

.hp-member-info {
  min-width: 0;
}

.hp-member-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.7px;
  margin-bottom: 8px;
}

.hp-member-name {
  font-size: 19px;
  font-weight: 900;
  overflow-wrap: anywhere;
  margin-bottom: 8px;
}

.hp-member-id {
  color: #ffe08b;
  font-size: 14px;
  overflow-wrap: anywhere;
}

/* Mobile Responsive */
@media (max-width: 700px) {
  .hp-hero {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hp-hero-content {
    padding: 20px;
  }

  .hp-member {
    padding: 18px;
  }

  .hp-avatar {
    width: 54px;
    height: 54px;
    min-width: 54px;
    font-size: 24px;
  }
}


        .hp-secure {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 11px;
          border: 1px solid #dcecdf;
          border-radius: 30px;
          background: #eff9f1;
          color: var(--green);
          font-size: 9px;
          font-weight: 850;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .hp-hero {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 23px 25px;
          margin-bottom: 19px;
          border: 1px solid #176b48;
          border-radius: 17px;
          background: linear-gradient(115deg, #073f2b, #087d4d 75%, #119660);
          box-shadow: 0 8px 22px #075c3b18;
          width: 100%;
        }

        .hp-hero::after {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          right: 17%;
          top: -145px;
          border: 1px solid #ffffff20;
          border-radius: 50%;
          box-shadow: 0 0 0 25px #ffffff08, 0 0 0 50px #ffffff06;
          pointer-events: none;
        }

        .hp-hero-content {
          position: relative;
          z-index: 1;
          min-width: 0;
          flex: 1;
        }

        .hp-welcome-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
          color: #f0d58e;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .hp-hero h1 {
          margin: 0 0 6px;
          color: white;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.2;
          font-weight: 900;
          overflow-wrap: anywhere;
        }

        .hp-hero h1 span {
          color: #f3d78d;
        }

        .hp-hero p {
          margin: 0;
          color: #d1e9db;
          font-size: 11px;
          line-height: 1.6;
        }

        .hp-member {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 13px;
          border: 1px solid #ffffff25;
          border-radius: 13px;
          background: #ffffff12;
          flex-shrink: 0;
          min-width: 0;
        }

        .hp-avatar {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #f3d78d;
          color: #155b3d;
          font-size: 17px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .hp-member-label {
          color: #c6e3d1;
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .8px;
        }

        .hp-member-name {
          margin-top: 3px;
          color: white;
          font-size: 12px;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .hp-member-id {
          margin-top: 3px;
          color: #f3d78d;
          font-size: 10px;
          font-family: monospace;
          overflow-wrap: anywhere;
        }

        .hp-section {
          margin-bottom: 17px;
          min-width: 0;
          width: 100%;
        }

        .hp-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 9px;
          min-width: 0;
        }

        .hp-section-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0;
          color: #244333;
          font-size: 13px;
          font-weight: 900;
          min-width: 0;
        }

        .hp-section-title svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .hp-section-sub {
          color: var(--muted);
          font-size: 10px;
          font-weight: 650;
          text-align: right;
          flex-shrink: 0;
        }

        .hp-card {
          min-width: 0;
          width: 100%;
          overflow: hidden;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: white;
          box-shadow: 0 3px 12px #18352a08;
        }

        /* Referral box - same position and design */
        .hp-referral {
          padding: 5px;
          width: 100%;
          min-width: 0;
        }

        /* Income box - same position and design */
        .hp-income {
          padding: 7px;
          width: 100%;
          min-width: 0;
        }

        .hp-roi {
          padding: 7px;
          width: 100%;
          min-width: 0;
        }

        .hp-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding-top: 5px;
          color: #91a197;
          font-size: 9px;
          font-weight: 700;
          flex-wrap: wrap;
          text-align: center;
        }

        .hp-footer svg {
          color: var(--green);
          flex-shrink: 0;
        }

        /* Inner components responsive safety */
        .hp-referral > *,
        .hp-income > *,
        .hp-roi > * {
          max-width: 100%;
          min-width: 0;
        }

        /* Tablet */
        @media (max-width: 700px) {
          .hp-dashboard {
            padding: 13px 12px 55px;
          }

          .hp-hero {
            align-items: flex-start;
            flex-direction: column;
            padding: 19px 17px;
            gap: 13px;
            margin-bottom: 15px;
          }

          .hp-member {
            width: 100%;
          }

          .hp-section {
            margin-bottom: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .hp-dashboard {
            padding: 12px 10px 45px;
            width: 100%;
            overflow-x: hidden;
          }

          .hp-container {
            width: 100%;
            max-width: 100%;
          }

          .hp-topbar {
            gap: 8px;
            margin-bottom: 13px;
          }

          .hp-brand {
            gap: 8px;
          }

          .hp-brand-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }

          .hp-brand-name {
            font-size: 15px;
          }

          .hp-secure {
            padding: 7px 9px;
            font-size: 8px;
            gap: 4px;
          }

          .hp-hero {
            padding: 18px 15px;
            border-radius: 14px;
            gap: 14px;
          }

          .hp-hero h1 {
            font-size: clamp(21px, 6vw, 25px);
            line-height: 1.3;
          }

          .hp-hero p {
            font-size: 11px;
          }

          .hp-member {
            padding: 10px;
            gap: 10px;
            border-radius: 11px;
          }

          .hp-avatar {
            width: 38px;
            height: 38px;
          }

          .hp-section {
            margin-bottom: 15px;
          }

          .hp-section-heading {
            gap: 6px;
            margin-bottom: 8px;
          }

          .hp-section-title {
            font-size: 12px;
          }

          .hp-section-sub {
            font-size: 9px;
          }

          .hp-card {
            border-radius: 12px;
          }

          /* Keep referral box full width */
          .hp-referral {
            width: 100%;
            padding: 6px;
          }

          /* Keep income box full width */
          .hp-income {
            width: 100%;
            padding: 7px;
          }

          .hp-roi {
            width: 100%;
            padding: 7px;
          }

          /* Prevent child elements from overflowing */
          .hp-referral input,
          .hp-referral textarea,
          .hp-income input,
          .hp-income textarea,
          .hp-roi input,
          .hp-roi textarea {
            max-width: 100%;
            min-width: 0;
          }

          .hp-referral button,
          .hp-income button,
          .hp-roi button {
            max-width: 100%;
          }

          .hp-footer {
            font-size: 9px;
            line-height: 1.6;
            padding: 10px 5px;
          }
        }

        /* Small mobile */
        @media (max-width: 420px) {
          .hp-dashboard {
            padding: 11px 9px 45px;
          }

          .hp-brand-name {
            font-size: 14px;
          }

          .hp-brand-icon {
            width: 35px;
            height: 35px;
          }

          .hp-secure {
            padding: 7px;
            font-size: 0;
          }

          .hp-secure svg {
            width: 14px;
            height: 14px;
          }

          .hp-hero {
            padding: 17px 13px;
          }

          .hp-hero h1 {
            font-size: 22px;
          }

          .hp-section-title {
            font-size: 12px;
          }

          .hp-section-sub {
            font-size: 9px;
          }

          .hp-referral {
            padding: 5px;
          }

          .hp-income {
            padding: 6px;
          }

          .hp-roi {
            padding: 6px;
          }
        }

        /* Very small mobile */
        @media (max-width: 350px) {
          .hp-dashboard {
            padding-left: 7px;
            padding-right: 7px;
          }

          .hp-topbar {
            gap: 5px;
          }

          .hp-brand {
            gap: 6px;
          }

          .hp-brand-name {
            font-size: 13px;
          }

          .hp-secure {
            padding: 6px;
          }

          .hp-hero h1 {
            font-size: 20px;
          }

          .hp-section-heading {
            flex-wrap: wrap;
          }

          .hp-section-sub {
            text-align: left;
          }
        }
      `}</style>

      <div className="hp-container">
        {loading && <SpinnerOverlay />}

       

        {/* Welcome */}
     
<section className="hp-hero">
  {/* Member Account Box */}
  <div
    className="hp-member"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      borderRadius: '16px',
      width: '100%',
      boxSizing: 'border-box'
    }}
  >
    {/* Member Details */}
    <div
      className="hp-member-info"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px',
        width: '100%',
        minWidth: 0,
        flexWrap: 'wrap'
      }}
    >
      {/* User Name */}
      <div style={{ minWidth: 0, flex: '1 1 150px' }}>
        <div
          className="hp-member-label"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            marginBottom: '7px',
            opacity: 0.8
          }}
        >
          MEMBER ACCOUNT
        </div>

        <div
          className="hp-member-name"
          style={{
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: 1.3,
            overflowWrap: 'anywhere'
          }}
        >
          {displayName}
        </div>
      </div>

      {/* User ID */}
      <div
        className="hp-member-id"
        style={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          textAlign: 'right',
          fontSize: '18px',
          fontWeight: 900,
          letterSpacing: '0.6px',
          padding: '9px 13px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.12)'
        }}
      >
        User ID: {user.userId}
      </div>
    </div>
  </div>
</section>


{/* COMMUNITY OVERVIEW */}
<section className="hp-section">
  <TotalSystemUsers
    user={user}
    totalRealUsersFromDB={totalRealUsers}
    globalFakeCount={globalFakeCount}
    demoUsersCount={globalFakeCount}
    activeDownlineCount={activeDownlineCount}
  />
</section>

      
        {/* Income */}
        <section className="hp-section">
          <div className="hp-section-heading">
            <h2 className="hp-section-title">
              <TrendingUp size={17} />
              Earnings & Rewards
            </h2>

            <span className="hp-section-sub">Income overview</span>
          </div>

          <div className="hp-card hp-income">
            <IncomeSummary income={income} user={user} />
          </div>
        </section>

          {/* Referral */}
        <section className="hp-section">
          <div className="hp-section-heading">
            <h2 className="hp-section-title">
              <ArrowUpRight size={17} />
              Your Referral Link
            </h2>

            <span className="hp-section-sub">Invite your community</span>
          </div>

          <div className="hp-card hp-referral">
            <ReferralLink link={referralLink} />
          </div>
        </section>


        {/* Daily ROI */}
        <section className="hp-section">
          <div className="hp-section-heading">
            <h2 className="hp-section-title">
              <Activity size={17} />
              Helping Pool Income
            </h2>

            <span className="hp-section-sub">Daily activity</span>
          </div>

          <div className="hp-card hp-roi">
            <DailyROIPlan
              dailyROI={user.dailyROI || []}
              onClaim={claimDailyROI}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="hp-footer">
          <ShieldCheck size={13} />
          Helping Pools Member Dashboard
          <span>•</span>
          © {new Date().getFullYear()}
        </footer>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        userId={successModal.userId}
        amount={successModal.amount}
        onClose={() =>
          setSuccessModal((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />

      {/* Telegram Popup */}
      {!loading && user && <TelegramPopup currentUser={user} />}
    </div>
  );
};

export default Dashboard;
