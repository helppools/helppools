// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";

// const globalPoolConfig = {
//   levels: [
//     { level: 1, globalTeam: 20, earning: 10 },
//     { level: 2, globalTeam: 40, earning: 20 },
//     { level: 3, globalTeam: 100, earning: 40 },
//     { level: 4, globalTeam: 200, earning: 80 },
//     { level: 5, globalTeam: 400, earning: 150 },
//     { level: 6, globalTeam: 1600, earning: 200 },
//     { level: 7, globalTeam: 2000, earning: 500 },
//     { level: 8, globalTeam: 3000, earning: 700 },
//     { level: 9, globalTeam: 4000, earning: 1000 },
//     { level: 10, globalTeam: 5000, earning: 1500 },
//     { level: 11, globalTeam: 7500, earning: 3000 },
//     { level: 12, globalTeam: 10000, earning: 5000 }
//   ]
// };

// const WalletBalance = ({ income = {} }) => {
//   const { user } = useAuth();
//   const [globalGrowthIncome, setGlobalGrowthIncome] = useState(0);
  
//   // 🔥 Copy State for ID
//   const [isCopied, setIsCopied] = useState(false);

//   // 🔥 ID Active/Inactive Check
//   const isUserActive = user?.isToppedUp === true || user?.isToppedUp === "true" || (user?.topUpAmount && user?.topUpAmount > 0);

//   // 1. Regular Incomes Fetching
//   const directIncome = Number(income.totalDirectIncome) || Number(income.directIncome) || 0;
//   const levelIncome = Number(income.totalLevelIncome) || Number(income.levelIncome) || 0;
//   const rewardIncome = Number(income.totalRewardIncome) || Number(income.rewardIncome) || Number(user?.rewardIncome) || 0;
//   const fastTrackIncome = Number(income.totalFastTrackIncome) || Number(income.fastTrackIncome) || Number(user?.totalFastTrackIncome) || 0;

//   // 🔥 2. NAYA: Backend (staking.js) se aane wali Staking Incomes ko catch kiya
//   const cctStakingIncome = Number(income.cctStakingIncome) || Number(user?.cctStakingIncome) || 0;
//   const cctStakingDirectIncome = Number(income.cctStakingDirectIncome) || Number(user?.cctStakingDirectIncome) || 0;
//   const cctStakingLevelIncome = Number(income.cctStakingLevelIncome) || Number(user?.cctStakingLevelIncome) || 0;

//   // 3. COMMUNITY EARNING (Global Growth) CALCULATION
//   useEffect(() => {
//     if (!user) return;

//     const realGlobalTeamCount = Number(user?.globalTeamCount) || 0;
//     let totalFrontendAchieved = 0;
//     let cumulative = 0;

//     globalPoolConfig.levels.forEach((lvl) => {
//       cumulative += lvl.globalTeam;
//       if (realGlobalTeamCount >= cumulative) {
//         totalFrontendAchieved += lvl.earning;
//       }
//     });
//     setGlobalGrowthIncome(totalFrontendAchieved);
//   }, [user]);

//   // 4. 🔥 UPDATED TOTAL EARNING: Ab saari incomes ek sath judengi
//   const totalEarning = 
//     directIncome + 
//     levelIncome + 
//     rewardIncome + 
//     globalGrowthIncome + 
//     fastTrackIncome + 
//     cctStakingIncome + 
//     cctStakingDirectIncome + 
//     cctStakingLevelIncome;
  
//   const format = (val) => `$${(Math.floor(Number(val || 0) * 100) / 100).toFixed(2)}`;

//   // 🔥 Copy Function
//   const handleCopyId = () => {
//     const userIdToCopy = user?.userId || user?._id || "";
//     if (userIdToCopy) {
//       navigator.clipboard.writeText(userIdToCopy);
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000); // 2 second baad wapas copy icon
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
      
//       {/* BOX 1: TOTAL EARNING */}
//       <div className="bg-white p-5 md:p-6 rounded-[20px] border border-emerald-50 shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px]">
//         <p className=" text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
//           Total Earning
//         </p>
//         <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-emerald-600 tracking-tight leading-none">
//            {format(totalEarning)}
//         </h2>
//       </div>

//       {/* BOX 2: ACCOUNT STATUS & ID */}
//       <div className={`bg-white p-5 md:p-6 rounded-[20px] border shadow-sm flex flex-col justify-center h-full min-h-[100px] md:min-h-[120px] ${isUserActive ? 'border-emerald-50' : 'border-red-50'}`}>
//         <p className=" text-black text-[11px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
//           Account Status
//         </p>
//         <h2 className={`text-[28px] sm:text-3xl md:text-[40px] font-black tracking-tight leading-none uppercase ${isUserActive ? 'text-emerald-600' : 'text-red-500'}`}>
//            {isUserActive ? 'ACTIVE' : 'INACTIVE'}
//         </h2>
        
//         {/* 🔥 ID aur Copy Button */}
//         <div className="mt-2 flex items-center gap-2">
//           <p className="text-lg md:text-3xl text-gray-500 font-medium">
//             ID: <span className="text-gray-800 font-bold">{user?.userId || user?._id || "N/A"}</span>
//           </p>
//           <button 
//             onClick={handleCopyId}
//             className="text-gray-400 hover:text-emerald-500 transition-colors focus:outline-none"
//             title="Copy ID"
//           >
//             {isCopied ? (
//               // Checkmark Icon (Copied)
//               <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             ) : (
//               // Copy Icon
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default WalletBalance;



import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const globalPoolConfig = {
  levels: [
    { level: 1, globalTeam: 20, earning: 10 },
    { level: 2, globalTeam: 40, earning: 20 },
    { level: 3, globalTeam: 100, earning: 40 },
    { level: 4, globalTeam: 200, earning: 80 },
    { level: 5, globalTeam: 400, earning: 150 },
    { level: 6, globalTeam: 1600, earning: 200 },
    { level: 7, globalTeam: 2000, earning: 500 },
    { level: 8, globalTeam: 3000, earning: 700 },
    { level: 9, globalTeam: 4000, earning: 1000 },
    { level: 10, globalTeam: 5000, earning: 1500 },
    { level: 11, globalTeam: 7500, earning: 3000 },
    { level: 12, globalTeam: 10000, earning: 5000 }
  ]
};

const WalletBalance = ({ income = {} }) => {
  const { user } = useAuth();

  const [globalGrowthIncome, setGlobalGrowthIncome] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Account Active / Inactive Check
  const isUserActive =
    user?.isToppedUp === true ||
    user?.isToppedUp === "true" ||
    (user?.topUpAmount && user?.topUpAmount > 0);

  // Regular Incomes
  const directIncome =
    Number(income.totalDirectIncome) ||
    Number(income.directIncome) ||
    0;

  const levelIncome =
    Number(income.totalLevelIncome) ||
    Number(income.levelIncome) ||
    0;

  const rewardIncome =
    Number(income.totalRewardIncome) ||
    Number(income.rewardIncome) ||
    Number(user?.rewardIncome) ||
    0;

  const fastTrackIncome =
    Number(income.totalFastTrackIncome) ||
    Number(income.fastTrackIncome) ||
    Number(user?.totalFastTrackIncome) ||
    0;

  // CCT Staking Incomes
  const cctStakingIncome =
    Number(income.cctStakingIncome) ||
    Number(user?.cctStakingIncome) ||
    0;

  const cctStakingDirectIncome =
    Number(income.cctStakingDirectIncome) ||
    Number(user?.cctStakingDirectIncome) ||
    0;

  const cctStakingLevelIncome =
    Number(income.cctStakingLevelIncome) ||
    Number(user?.cctStakingLevelIncome) ||
    0;

  // Global Growth Income Calculation
  useEffect(() => {
    if (!user) return;

    const realGlobalTeamCount =
      Number(user?.globalTeamCount) || 0;

    let totalFrontendAchieved = 0;
    let cumulative = 0;

    globalPoolConfig.levels.forEach((lvl) => {
      cumulative += lvl.globalTeam;

      if (realGlobalTeamCount >= cumulative) {
        totalFrontendAchieved += lvl.earning;
      }
    });

    setGlobalGrowthIncome(totalFrontendAchieved);
  }, [user]);

  // Total Earning
  const totalEarning =
    directIncome +
    levelIncome +
    rewardIncome +
    globalGrowthIncome +
    fastTrackIncome +
    cctStakingIncome +
    cctStakingDirectIncome +
    cctStakingLevelIncome;

  const format = (val) =>
    `$${(Math.floor(Number(val || 0) * 100) / 100).toFixed(2)}`;

  const userId = user?.userId || user?._id || "N/A";

  // Copy User ID
  const handleCopyId = async () => {
    if (userId === "N/A") return;

    try {
      await navigator.clipboard.writeText(userId);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy ID:", error);
    }
  };

  return (
    <>
      <style>{`
        .wallet-overview {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          font-family: inherit;
        }

        .wallet-card {
          position: relative;
          min-width: 0;
          min-height: 170px;
          padding: 23px;
          overflow: hidden;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e7eee9;
          box-shadow: 0 5px 22px rgba(20, 65, 42, 0.055);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .wallet-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(20, 65, 42, 0.10);
        }

        .wallet-card::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -95px;
          right: -65px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.07);
          pointer-events: none;
        }

        .wallet-card::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          bottom: -65px;
          right: 35px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.035);
          pointer-events: none;
        }

        .wallet-card-content {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .wallet-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .wallet-label {
          margin: 0;
          color: #718078;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .wallet-icon {
          width: 42px;
          height: 42px;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #e9f8ef;
          color: #07864e;
        }

        .wallet-amount {
          margin: 18px 0 0;
          color: #07864e;
          font-size: clamp(27px, 3vw, 42px);
          font-weight: 900;
          letter-spacing: -1.5px;
          line-height: 1.15;
          overflow-wrap: anywhere;
        }

        .wallet-description {
          margin: 8px 0 0;
          color: #98a49d;
          font-size: 12px;
          font-weight: 500;
        }

        /* ACCOUNT STATUS */
        .wallet-status-card {
          border-color: ${isUserActive ? "#dcefe2" : "#f4dddd"};
        }

        .wallet-status-card::before {
          background: ${isUserActive
            ? "rgba(16, 185, 129, 0.07)"
            : "rgba(239, 68, 68, 0.065)"};
        }

        .wallet-status-icon {
          background: ${isUserActive ? "#e9f8ef" : "#fff0f0"};
          color: ${isUserActive ? "#07864e" : "#dc4545"};
        }

        .wallet-status-line {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .wallet-status-text {
          margin: 0;
          font-size: clamp(25px, 3vw, 37px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: 0.5px;
          color: ${isUserActive ? "#07864e" : "#dc4545"};
        }

        .wallet-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 30px;
          background: ${isUserActive ? "#e9f8ef" : "#fff0f0"};
          color: ${isUserActive ? "#07864e" : "#dc4545"};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .wallet-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }

        /* USER ID */
        .wallet-id-area {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
          padding: 10px 12px;
          border: 1px solid #edf1ee;
          border-radius: 12px;
          background: rgba(248, 251, 249, 0.9);
          min-width: 0;
        }

        .wallet-id-label {
          color: #91a097;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.8px;
          flex-shrink: 0;
        }

        .wallet-id-value {
          min-width: 0;
          flex: 1;
          color: #263c30;
          font-size: 13px;
          font-weight: 800;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .wallet-copy-btn {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dcebe1;
          border-radius: 9px;
          background: #ffffff;
          color: #668173;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wallet-copy-btn:hover {
          background: #e9f8ef;
          border-color: #a9ddbb;
          color: #07864e;
        }

        .wallet-copy-btn.copied {
          background: #e9f8ef;
          color: #07864e;
          border-color: #a9ddbb;
        }

        /* TABLET */
        @media (max-width: 768px) {
          .wallet-overview {
            gap: 13px;
          }

          .wallet-card {
            min-height: 155px;
            padding: 18px;
            border-radius: 19px;
          }

          .wallet-icon {
            width: 37px;
            height: 37px;
            border-radius: 12px;
          }

          .wallet-amount {
            font-size: clamp(24px, 4vw, 32px);
          }

          .wallet-status-text {
            font-size: clamp(23px, 3.5vw, 30px);
          }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .wallet-overview {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wallet-card {
            min-height: 145px;
            padding: 18px;
            border-radius: 18px;
          }

          .wallet-label {
            font-size: 11px;
            letter-spacing: 1px;
          }

          .wallet-icon {
            width: 36px;
            height: 36px;
          }

          .wallet-amount {
            margin-top: 14px;
            font-size: clamp(27px, 8vw, 36px);
          }

          .wallet-description {
            font-size: 11px;
          }

          .wallet-status-line {
            margin-top: 12px;
            gap: 9px;
          }

          .wallet-status-text {
            font-size: 29px;
          }

          .wallet-id-area {
            margin-top: 13px;
            padding: 9px 10px;
          }

          .wallet-id-value {
            font-size: 12px;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 360px) {
          .wallet-card {
            padding: 15px;
            min-height: 135px;
          }

          .wallet-amount {
            font-size: 26px;
          }

          .wallet-status-text {
            font-size: 25px;
          }

          .wallet-status-badge {
            padding: 5px 8px;
            font-size: 9px;
          }

          .wallet-id-area {
            gap: 6px;
          }

          .wallet-id-value {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wallet-card,
          .wallet-copy-btn {
            transition: none;
          }
        }
      `}</style>

      <div className="wallet-overview">

        {/* TOTAL EARNING */}
        <div className="wallet-card">
          <div className="wallet-card-content">

            <div className="wallet-card-header">
              <p className="wallet-label">Total Earning</p>

              <div className="wallet-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>

            <h2 className="wallet-amount">
              {format(totalEarning)}
            </h2>

            <p className="wallet-description">
              Your total accumulated income
            </p>

          </div>
        </div>

        {/* ACCOUNT STATUS AND USER ID */}
        <div className="wallet-card wallet-status-card">
          <div className="wallet-card-content">

            <div className="wallet-card-header">
              <p className="wallet-label">Account Status</p>

              <div className="wallet-icon wallet-status-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>

            <div className="wallet-status-line">
              <h2 className="wallet-status-text">
                {isUserActive ? "ACTIVE" : "INACTIVE"}
              </h2>

              <span className="wallet-status-badge">
                <span className="wallet-status-dot" />
                {isUserActive ? "Verified" : "Not Active"}
              </span>
            </div>

            <div className="wallet-id-area">
              <span className="wallet-id-label">USER ID</span>

              <span className="wallet-id-value">
                {userId}
              </span>

              <button
                type="button"
                onClick={handleCopyId}
                className={`wallet-copy-btn ${isCopied ? "copied" : ""}`}
                title={isCopied ? "Copied" : "Copy User ID"}
                aria-label="Copy User ID"
                disabled={userId === "N/A"}
              >
                {isCopied ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="8" y="8" width="13" height="13" rx="2" />
                    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default WalletBalance;


