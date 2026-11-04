// import React from "react";
// import { 
//   Wallet, 
//   ArrowUpCircle, 
//   Send, 
//   Download, 
//   CreditCard, 
// } from "lucide-react";

// const QuickActions = ({
//   onDepositClick,
//   onTopUpClick,
//   onWalletTransferClick,
//   onWithdrawClick,
//   onCreditToWalletClick,
//   disabled = false,
// }) => {

//   // 🔥 UPDATE: Labels ko thoda chhota kiya taaki mobile ki 1 line me 5 button fit ho sakein
//   const actions = [
//     { 
//       label: "Deposit", icon: Wallet, onClick: onDepositClick, 
//       color: "text-green-600", bg: "bg-green-50"
//     },
//     { 
//       label: "Top-Up", icon: ArrowUpCircle, onClick: onTopUpClick, 
//       color: "text-emerald-600", bg: "bg-emerald-50"
//     },
//     { 
//       label: "Transfer", icon: Send, onClick: onWalletTransferClick, 
//       color: "text-amber-600", bg: "bg-amber-50"
//     },
//     { 
//       label: "Withdraw", icon: Download, onClick: onWithdrawClick, 
//       color: "text-red-600", bg: "bg-red-50"
//     },
//     { 
//       label: "To Wallet", icon: CreditCard, onClick: onCreditToWalletClick, 
//       color: "text-blue-600", bg: "bg-blue-50"
//     }
//   ];

//   return (
//     <div className="w-full max-w-md mx-auto px-1 md:max-w-none md:px-0">
//       {/* 🔥 NEW LAYOUT: Flex row, ekdum ek line mein, evenly spaced */}
//       <div className="flex justify-between items-start w-full gap-1 md:gap-4 md:justify-start">
        
//         {actions.map((action, index) => (
//           <button
//             key={index}
//             onClick={() => !disabled && action.onClick && action.onClick()}
//             disabled={disabled}
//             className={`
//               flex flex-col items-center justify-start flex-1
//               group transition-all duration-300 ease-out bg-transparent border-none
//               ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
//             `}
//           >
//             {/* Chhota Icon Wrapper (Upar Icon) */}
//             <div className={`
//               mb-1 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl
//               ${action.bg} ${action.color} border border-slate-100
//               flex items-center justify-center relative
//               transition-transform duration-200 group-active:scale-90
//               shadow-sm
//             `}>
//               <action.icon size={22} strokeWidth={2.5} className="md:w-6 md:h-6" />
//             </div>

//             {/* Chhota Text (Neeche Naam) */}
//             <span className="text-[9px] md:text-[11px] font-bold tracking-tight uppercase text-center text-black group-hover:text-slate-800 transition-colors leading-tight">
//               {action.label}
//             </span>
//           </button>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default QuickActions;


import React from "react";
import {
  PiggyBank,
  PackagePlus,
  ArrowLeftRight,
  HandCoins,
  WalletCards,
} from "lucide-react";

const QuickActions = ({
  onDepositClick,
  onTopUpClick,
  onWalletTransferClick,
  onWithdrawClick,
  onCreditToWalletClick,
  disabled = false,
}) => {
  const actions = [
    {
      label: "Deposit",
      icon: PiggyBank,
      onClick: onDepositClick,
    },
    {
      label: "Top-Up",
      icon: PackagePlus,
      onClick: onTopUpClick,
    },
    {
      label: "Transfer",
      icon: ArrowLeftRight,
      onClick: onWalletTransferClick,
    },
    {
      label: "Withdraw",
      icon: HandCoins,
      onClick: onWithdrawClick,
    },
    {
      label: "To Wallet",
      icon: WalletCards,
      onClick: onCreditToWalletClick,
    },
  ];

  return (
    <>
      <style>{`
        .qa-wrapper {
          width: 100%;
          margin: 0 auto;
          font-family: Inter, Arial, sans-serif;
        }

        .qa-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: stretch;
          gap: 7px;
          width: 100%;
        }

        .qa-button {
          min-width: 0;
          min-height: 105px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 3px;
          border: 1px solid #dce9dc;
          border-radius: 15px;
          background: linear-gradient(145deg, #ffffff, #f5faf3);
          cursor: pointer;
          transition: .2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .qa-button:not(:disabled):hover {
          transform: translateY(-3px);
          border-color: #9bc99d;
          background: linear-gradient(145deg, #fff, #eff8ed);
          box-shadow: 0 5px 14px rgba(8, 120, 63, .10);
        }

        .qa-button:not(:disabled):active {
          transform: scale(.94);
        }

        .qa-button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .qa-icon-box {
          position: relative;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d7e9d3;
          border-radius: 16px;
          background: linear-gradient(145deg, #eef8eb, #ffffff);
          color: #08783f;
          box-shadow: 0 3px 9px rgba(7, 85, 46, .08);
          transition: .2s ease;
        }

        .qa-icon-box::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 19px;
          height: 3px;
          border-radius: 10px;
          background: #e3bd50;
          transform: translateX(-50%);
        }

        .qa-button:not(:disabled):hover .qa-icon-box {
          background: linear-gradient(145deg, #e5f5e2, #fff9e8);
          border-color: #e3bd50;
          color: #07552e;
        }

        .qa-label {
          display: block;
          width: 100%;
          min-height: 22px;
          overflow: visible;
          color: #31543a;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .15px;
          line-height: 1.25;
          text-align: center;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: normal;
          text-transform: uppercase;
        }

        .qa-button:not(:disabled):hover .qa-label {
          color: #08783f;
        }

        @media (min-width: 600px) {
          .qa-grid {
            gap: 12px;
          }

          .qa-button {
            min-height: 115px;
            padding: 13px 7px;
            gap: 10px;
            border-radius: 17px;
          }

          .qa-icon-box {
            width: 53px;
            height: 53px;
            border-radius: 16px;
          }

          .qa-label {
            font-size: 11px;
            letter-spacing: .4px;
          }
        }

        @media (max-width: 380px) {
          .qa-grid {
            gap: 4px;
          }

          .qa-button {
            min-height: 91px;
            padding: 8px 2px;
            gap: 8px;
            border-radius: 11px;
          }

          .qa-icon-box {
            width: 39px;
            height: 39px;
            border-radius: 11px;
          }

          .qa-icon-box svg {
            width: 19px;
            height: 19px;
          }

          .qa-label {
            font-size: 8px;
            letter-spacing: 0;
            line-height: 1.3;
            min-height: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .qa-button,
          .qa-icon-box {
            transition: none;
          }
        }
      `}</style>

      <div className="qa-wrapper">
        <div className="qa-grid">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  if (!disabled && action.onClick) {
                    action.onClick();
                  }
                }}
                disabled={disabled}
                className="qa-button"
                aria-label={action.label}
              >
                <span className="qa-icon-box">
                  <Icon size={23} strokeWidth={2.2} />
                </span>

                <span className="qa-label">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuickActions;
