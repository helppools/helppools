// import React from "react";
// import { CheckCircle2, Zap, Landmark, ArrowRightLeft, Gift, ShieldCheck, ArrowDownLeft, User, CalendarDays } from "lucide-react";

// const SuccessModal = ({
//   isOpen,
//   onClose,
//   type = "credit", 
//   userId = "",
//   userName = "",
//   amount = 0,
//   reward = 0,
//   spinQuantity = 0,
//   customTitle = "",
//   customMessage = "",
//   source = "", 
//   zIndex = 2000,
// }) => {
//   if (!isOpen) return null;

//   const currentDate = new Date().toLocaleDateString("en-GB", {
//     day: '2-digit', month: 'short', year: 'numeric'
//   });

//   /* ================= MODERN GREEN THEME LAYOUT ================= */
//   const SuccessLayout = ({ title, icon: Icon, children }) => (
//     <div className="flex flex-col items-center w-full relative z-10">
//       <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)] border-4 border-white bg-gradient-to-br from-green-400 to-emerald-600 text-white">
//          <Icon size={32} />
//       </div>
//       <h2 className="text-slate-800 text-xl sm:text-2xl font-black uppercase tracking-widest text-center mb-2">
//         {title}
//       </h2>
//       <div className="w-full">
//         {children}
//       </div>
//       <div className="mt-5 flex flex-col items-center justify-center gap-2">
//         <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
//            <CalendarDays size={12} /> {currentDate}
//         </span>
//         <span className="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
//            <ShieldCheck size={14} /> Secured Transaction
//         </span>
//       </div>
//     </div>
//   );

//   /* ✅ REUSABLE USER INFO BLOCK (ID + NAME) */
//   const UserInfoBlock = ({ idLabel }) => (
//     <div className="bg-white border border-green-100 rounded-xl p-3 mb-3 shadow-sm">
//        <div className="flex justify-between items-center mb-1.5">
//           <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{idLabel}</span>
//           <span className="text-slate-800 font-black font-mono text-sm">{userId}</span>
//        </div>
//        {userName && userName !== "N/A" && (
//          <div className="flex justify-between items-center border-t border-slate-100 pt-2 mt-1.5">
//             <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
//                <User size={10}/> Name
//             </span>
//             <span className="text-green-700 font-black text-xs uppercase tracking-wider">{userName}</span>
//          </div>
//        )}
//     </div>
//   );

//   /* ================= CONTENT LOGIC ================= */
//   const renderContent = () => {
    
//     if (customTitle || customMessage) {
//       return (
//         <SuccessLayout title={customTitle} icon={CheckCircle2}>
//           <p className="text-sm text-slate-600 font-medium leading-relaxed px-4 text-center mt-2">
//             {customMessage}
//           </p>
//         </SuccessLayout>
//       );
//     }

//     switch (type) {
//       case "withdrawal":
//         const isPlan = source && source.toLowerCase().startsWith("plan");
//         const wTitle = isPlan ? "Withdrawal Success" : "Withdrawal Success";
        
//         return (
//           <SuccessLayout title={wTitle} icon={Landmark}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="User ID" />
//               <div className="flex flex-col items-center pt-2">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Amount Processed</span>
//                  <span className="text-4xl sm:text-5xl font-black text-emerald-600 drop-shadow-sm">
//                    ${amount}
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       case "convert":
//         return (
//           <SuccessLayout title="Conversion Done" icon={ArrowRightLeft}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="User ID" />
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Converted Value</span>
//                  <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                    {amount} CCT
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       case "stake":
//         return (
//           <SuccessLayout title="Staking Done" icon={ShieldCheck}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 w-full shadow-sm mt-1">
//               <UserInfoBlock idLabel="Target ID" />
//               <div className="flex flex-col items-center pt-0.5">
//                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">Staked Amount</span>
//                  <span className="text-3xl font-black text-emerald-600 drop-shadow-sm">
//                    {amount} CCT
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );
        
//       case "deposit":
//         return (
//           <SuccessLayout title="Deposit Successful" icon={ArrowDownLeft}>
//              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 w-full shadow-sm mt-2 text-center">
//                 <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Fund Added</span>
//                 <span className="text-4xl sm:text-5xl font-black text-emerald-600 drop-shadow-sm">
//                   + ${amount}
//                 </span>
//              </div>
//           </SuccessLayout>
//         );

//       case "credit":
//         return (
//           <SuccessLayout title="Wallet Credited" icon={ArrowDownLeft}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               {source && (
//                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-green-100 mb-3 shadow-sm">
//                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Source</span>
//                    <span className="text-emerald-700 font-black text-xs uppercase tracking-wider">{source}</span>
//                  </div>
//               )}
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Amount Added</span>
//                  <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                    + ${amount}
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       // 🔥 USDT TRANSFER (NORMAL)
//       case "transfer":
//         return (
//           <SuccessLayout title="Wallet Transfer Done" icon={ArrowRightLeft}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="Sent To" />
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Transfer Amount</span>
//                  <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                    ${amount}
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       // 🔥 CCT TRANSFER (NAYA CASE ADD KIYA)
//       case "cct_transfer":
//         return (
//           <SuccessLayout title="CCT Transfer Done" icon={ArrowRightLeft}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="Sent To" />
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Transfer Amount</span>
//                  <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                    {amount} CCT
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );
//       case "usdt_transfer":
//         return (
//           <SuccessLayout title="USDT Transfer Done" icon={ArrowRightLeft}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="Sent To" />
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Transfer Amount</span>
//                  <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                   ${amount} 
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       case "topup":
//         return (
//           <SuccessLayout title=" Activated" icon={Zap}>
//             <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 w-full shadow-sm mt-2">
//               <UserInfoBlock idLabel="Target ID" />
//               <div className="flex flex-col items-center pt-1">
//                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Activation Value</span>
//                  <span className="text-4xl sm:text-5xl font-black text-emerald-600 drop-shadow-sm">
//                    ${amount}
//                  </span>
//               </div>
//             </div>
//           </SuccessLayout>
//         );

//       case "buy":
//         return (
//           <SuccessLayout title="Spins Purchased" icon={Gift}>
//              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 w-full shadow-sm mt-2 text-center">
//                 <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Cost: ${amount}</span>
//                 <span className="text-4xl font-black text-emerald-600 drop-shadow-sm">
//                   {spinQuantity} Spins
//                 </span>
//              </div>
//           </SuccessLayout>
//         );

//       case "spin":
//         return (
//           <SuccessLayout title="Spin Reward" icon={Gift}>
//              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 w-full shadow-sm mt-2 text-center">
//                 <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">You Won</span>
//                 <span className="text-5xl font-black text-emerald-600 drop-shadow-sm">
//                   ${reward}
//                 </span>
//              </div>
//           </SuccessLayout>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
//       style={{ zIndex }}
//     >
//       <div className="bg-white border border-slate-200 rounded-[24px] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden transform scale-100 transition-all">
        
//         {/* Glow Effects (Green Theme) */}
//         <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 blur-[60px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-50 blur-[60px] pointer-events-none"></div>

//         {/* Content Render hoga */}
//         {renderContent()}

//         <div className="mt-6 flex justify-center w-full relative z-10">
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all font-black uppercase tracking-widest text-xs px-6 py-4 rounded-xl shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 active:scale-95"
//           >
//             Acknowledge & Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessModal;



import React from "react";
import {
  CheckCircle2,
  Zap,
  Landmark,
  ArrowRightLeft,
  Gift,
  ShieldCheck,
  ArrowDownLeft,
  User,
  CalendarDays,
  X,
  Sparkles,
} from "lucide-react";

const SuccessModal = ({
  isOpen,
  onClose,
  type = "credit",
  userId = "",
  userName = "",
  amount = 0,
  reward = 0,
  spinQuantity = 0,
  customTitle = "",
  customMessage = "",
  source = "",
  zIndex = 2000,
}) => {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const SuccessLayout = ({ title, icon: Icon, children }) => (
    <div className="hp-success-content">
      <div className="hp-success-icon">
        <Icon size={31} strokeWidth={2.3} />
        <span className="hp-success-icon-check">
          <CheckCircle2 size={16} />
        </span>
      </div>

      <div className="hp-success-label">TRANSACTION SUCCESSFUL</div>

      <h2 className="hp-success-title">{title}</h2>

      <div className="hp-success-details">{children}</div>

      <div className="hp-success-meta">
        <span>
          <CalendarDays size={12} />
          {currentDate}
        </span>
        <span className="hp-secure-badge">
          <ShieldCheck size={13} />
          Secured Transaction
        </span>
      </div>
    </div>
  );

  const UserInfoBlock = ({ idLabel }) => (
    <div className="hp-user-info">
      <div className="hp-info-row">
        <span>{idLabel}</span>
        <strong>{userId || "N/A"}</strong>
      </div>

      {userName && userName !== "N/A" && (
        <div className="hp-info-row hp-info-name">
          <span>
            <User size={11} />
            Name
          </span>
          <strong>{userName}</strong>
        </div>
      )}
    </div>
  );

  const AmountBlock = ({ label, value, suffix = "", prefix = "" }) => (
    <div className="hp-amount-block">
      <span className="hp-amount-label">{label}</span>
      <strong className="hp-amount-value">
        {prefix}{value}{suffix}
      </strong>
    </div>
  );

  const DetailCard = ({ children }) => (
    <div className="hp-detail-card">{children}</div>
  );

  const renderContent = () => {
    if (customTitle || customMessage) {
      return (
        <SuccessLayout title={customTitle || "Success"} icon={CheckCircle2}>
          <p className="hp-custom-message">{customMessage}</p>
        </SuccessLayout>
      );
    }

    switch (type) {
      case "withdrawal": {
        const isPlan = source && source.toLowerCase().startsWith("plan");

        return (
          <SuccessLayout
            title={isPlan ? "Withdrawal Success" : "Withdrawal Success"}
            icon={Landmark}
          >
            <DetailCard>
              <UserInfoBlock idLabel="User ID" />
              <AmountBlock
                label="Amount Processed"
                value={amount}
                prefix="$"
              />
            </DetailCard>
          </SuccessLayout>
        );
      }

      case "convert":
        return (
          <SuccessLayout title="Conversion Done" icon={ArrowRightLeft}>
            <DetailCard>
              <UserInfoBlock idLabel="User ID" />
              <AmountBlock
                label="Converted Value"
                value={amount}
                suffix=" CCT"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "stake":
        return (
          <SuccessLayout title="Staking Done" icon={ShieldCheck}>
            <DetailCard>
              <UserInfoBlock idLabel="Target ID" />
              <AmountBlock
                label="Staked Amount"
                value={amount}
                suffix=" CCT"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "deposit":
        return (
          <SuccessLayout title="Deposit Successful" icon={ArrowDownLeft}>
            <DetailCard>
              <AmountBlock
                label="Fund Added"
                value={amount}
                prefix="+ $"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "credit":
        return (
          <SuccessLayout title="Wallet Credited" icon={ArrowDownLeft}>
            <DetailCard>
              {source && (
                <div className="hp-source-row">
                  <span>Source</span>
                  <strong>{source}</strong>
                </div>
              )}
              <AmountBlock
                label="Amount Added"
                value={amount}
                prefix="+ $"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "transfer":
        return (
          <SuccessLayout title="Wallet Transfer Done" icon={ArrowRightLeft}>
            <DetailCard>
              <UserInfoBlock idLabel="Sent To" />
              <AmountBlock
                label="Transfer Amount"
                value={amount}
                prefix="$"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "cct_transfer":
        return (
          <SuccessLayout title="CCT Transfer Done" icon={ArrowRightLeft}>
            <DetailCard>
              <UserInfoBlock idLabel="Sent To" />
              <AmountBlock
                label="Transfer Amount"
                value={amount}
                suffix=" CCT"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "usdt_transfer":
        return (
          <SuccessLayout title="USDT Transfer Done" icon={ArrowRightLeft}>
            <DetailCard>
              <UserInfoBlock idLabel="Sent To" />
              <AmountBlock
                label="Transfer Amount"
                value={amount}
                prefix="$"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "topup":
        return (
          <SuccessLayout title=" Activated" icon={Zap}>
            <DetailCard>
              <UserInfoBlock idLabel="Target ID" />
              <AmountBlock
                label="Activation Value"
                value={amount}
                prefix="$"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "buy":
        return (
          <SuccessLayout title="Spins Purchased" icon={Gift}>
            <DetailCard>
              <AmountBlock
                label={`Cost: $${amount}`}
                value={spinQuantity}
                suffix=" Spins"
              />
            </DetailCard>
          </SuccessLayout>
        );

      case "spin":
        return (
          <SuccessLayout title="Spin Reward" icon={Gift}>
            <DetailCard>
              <AmountBlock
                label="You Won"
                value={reward}
                prefix="$"
              />
            </DetailCard>
          </SuccessLayout>
        );

      default:
        return null;
    }
  };

  return (
    <div className="hp-success-overlay" style={{ zIndex }}>
      <style>{`
        .hp-success-overlay {
          --hp-green: #08783f;
          --hp-dark: #07552e;
          --hp-gold: #e4bd50;
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          background: rgba(5, 24, 14, .68);
          backdrop-filter: blur(5px);
          font-family: Inter, Arial, sans-serif;
          animation: hpSuccessFade .2s ease-out;
        }

        .hp-success-overlay * {
          box-sizing: border-box;
        }

        .hp-success-modal {
          position: relative;
          width: 100%;
          max-width: 375px;
          max-height: 92vh;
          overflow-y: auto;
          border: 1px solid #dcebdc;
          border-radius: 19px;
          background: #fff;
          box-shadow: 0 22px 60px rgba(0,0,0,.25);
          animation: hpSuccessPop .25s ease-out;
        }

        .hp-success-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: linear-gradient(110deg, #07552e, #087b43);
          border-bottom: 3px solid var(--hp-gold);
        }

        .hp-success-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .7px;
        }

        .hp-success-brand svg {
          color: #f9dc80;
        }

        .hp-success-close {
          display: grid;
          place-items: center;
          width: 29px;
          height: 29px;
          border: 1px solid #ffffff35;
          border-radius: 9px;
          background: #ffffff12;
          color: white;
          cursor: pointer;
          transition: .2s;
        }

        .hp-success-close:hover {
          background: #ffffff25;
        }

        .hp-success-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 22px 20px 8px;
          text-align: center;
        }

        .hp-success-icon {
          position: relative;
          display: grid;
          place-items: center;
          width: 68px;
          height: 68px;
          margin-bottom: 12px;
          border: 2px solid #c9e6ce;
          border-radius: 21px;
          background: linear-gradient(145deg, #f1faef, #dff3e2);
          color: var(--hp-green);
          box-shadow: 0 5px 16px #08783f15;
        }

        .hp-success-icon-check {
          position: absolute;
          right: -5px;
          bottom: -4px;
          display: grid;
          place-items: center;
          width: 25px;
          height: 25px;
          border: 2px solid white;
          border-radius: 50%;
          background: var(--hp-green);
          color: white;
        }

        .hp-success-label {
          color: #a17d24;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: 1.6px;
        }

        .hp-success-title {
          margin: 6px 0 13px;
          color: #16462b;
          font-size: 20px;
          line-height: 1.3;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .hp-success-details {
          width: 100%;
        }

        .hp-detail-card {
          width: 100%;
          padding: 13px;
          border: 1px solid #d9ead7;
          border-radius: 13px;
          background: #f3faf1;
        }

        .hp-user-info {
          width: 100%;
          padding: 10px 11px;
          margin-bottom: 11px;
          border: 1px solid #e0ebe0;
          border-radius: 10px;
          background: #fff;
        }

        .hp-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .hp-info-row span,
        .hp-source-row span {
          color: #809087;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .hp-info-row strong {
          color: #254832;
          font-family: monospace;
          font-size: 12px;
          font-weight: 950;
          overflow-wrap: anywhere;
          text-align: right;
        }

        .hp-info-name {
          padding-top: 8px;
          margin-top: 8px;
          border-top: 1px solid #edf2eb;
        }

        .hp-info-name span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hp-info-name strong {
          color: var(--hp-green);
          font-family: inherit;
          font-size: 11px;
          text-transform: uppercase;
        }

        .hp-source-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #e0ebe0;
          border-radius: 9px;
          background: white;
        }

        .hp-source-row strong {
          color: var(--hp-green);
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .hp-amount-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 9px 5px;
        }

        .hp-amount-label {
          color: #7b8e80;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hp-amount-value {
          color: var(--hp-green);
          font-size: clamp(27px, 7vw, 37px);
          line-height: 1.2;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .hp-custom-message {
          margin: 0;
          padding: 12px 5px;
          color: #5c7162;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.7;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .hp-success-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 17px;
        }

        .hp-success-meta > span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #849389;
          font-size: 9px;
          font-weight: 800;
        }

        .hp-success-meta svg {
          color: var(--hp-green);
        }

        .hp-success-meta .hp-secure-badge {
          padding: 6px 10px;
          border: 1px solid #d5e9d5;
          border-radius: 30px;
          background: #edf8ec;
          color: var(--hp-green);
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .hp-success-footer {
          padding: 14px 20px 19px;
        }

        .hp-success-button {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 11px 15px;
          border: 1px solid #d6b653;
          border-radius: 10px;
          background: linear-gradient(105deg, #087b43, #07552e);
          color: white;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 13px #08783f25;
          transition: .2s;
        }

        .hp-success-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 17px #08783f35;
        }

        .hp-success-button:active {
          transform: scale(.98);
        }

        @keyframes hpSuccessFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes hpSuccessPop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 380px) {
          .hp-success-modal {
            border-radius: 16px;
          }

          .hp-success-content {
            padding: 18px 13px 7px;
          }

          .hp-success-title {
            font-size: 18px;
          }

          .hp-success-footer {
            padding: 12px 14px 15px;
          }

          .hp-detail-card {
            padding: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-success-overlay,
          .hp-success-modal {
            animation: none;
          }
        }
      `}</style>

      <div className="hp-success-modal">
        <div className="hp-success-header">
          <div className="hp-success-brand">
            <Sparkles size={16} />
            HELPING POOLS
          </div>

          <button
            type="button"
            className="hp-success-close"
            onClick={onClose}
            aria-label="Close success modal"
          >
            <X size={17} />
          </button>
        </div>

        {renderContent()}

        <div className="hp-success-footer">
          <button
            type="button"
            onClick={onClose}
            className="hp-success-button"
          >
            <CheckCircle2 size={16} />
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
