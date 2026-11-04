// import React, { useState } from "react";
// import { ClipboardCopy, Check, Share2, MessageCircle, Send } from "lucide-react";

// const ReferralLinkBox = ({ link }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(link);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000); // Reset after 2s
//   };

  
//   return (
//     // 🔥 UPDATE: Background changed to bright white with slate border
//     <div className="relative overflow-hidden bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm group w-full">
      
//       {/* Subtle Green Glow in background */}
//       <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-100 blur-[40px] rounded-full group-hover:bg-green-200/50 transition-all duration-500 pointer-events-none"></div>

//       <div className="relative z-10">
        
//         {/* HEADER */}
//         <h3 className="text-black text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
//           <div className="bg-green-50 p-1.5 rounded-lg border border-green-100">
//             <Share2 size={16} className="text-green-600" />
//           </div>
//           Your Referral Link
//         </h3>

//         {/* INPUT + COPY BUTTON */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               readOnly
//               value={link}
//               onFocus={(e) => e.target.select()}
//               // 🔥 UPDATE: Input field styling for Light Theme
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-mono focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all shadow-inner"
//             />
//           </div>
          
//           <button 
//             onClick={handleCopy}
//             // 🔥 UPDATE: Button Gradient changed to pure Green and White text
//             className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-slate-800 font-black px-6 py-3 sm:py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
//           >
//             {copied ? (
//               <>
//                 <Check size={18} strokeWidth={3} />
//                 COPIED
//               </>
//             ) : (
//               <>
//                 <ClipboardCopy size={18} strokeWidth={2.5} />
//                 COPY LINK
//               </>
//             )}
//           </button>
//         </div>

        

//       </div>
//     </div>
//   );
// };

// export default ReferralLinkBox;



import React, { useState } from "react";
import {
  ClipboardCopy,
  Check,
  Share2,
  Link2,
  ShieldCheck
} from "lucide-react";

const ReferralLinkBox = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy referral link:", error);
    }
  };

  return (
    <>
      <style>{`
        .hp-referral-card {
          position: relative;
          width: 100%;
          min-width: 0;
          padding: 23px;
          overflow: hidden;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e6eee7;
          box-shadow: 0 5px 22px rgba(20, 65, 42, 0.055);
          font-family: inherit;
        }

        .hp-referral-card::before {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          top: -110px;
          right: -65px;
          border-radius: 50%;
          background: rgba(16, 185, 70, 0.07);
          pointer-events: none;
        }

        .hp-referral-card::after {
          content: "";
          position: absolute;
          width: 140px;
          height: 140px;
          bottom: -100px;
          left: -55px;
          border-radius: 50%;
          background: rgba(212, 164, 55, 0.08);
          pointer-events: none;
        }

        .hp-referral-content {
          position: relative;
          z-index: 1;
          width: 100%;
          min-width: 0;
        }

        .hp-referral-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .hp-referral-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .hp-referral-icon {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #087b35;
          background: #eaf7ed;
          border: 1px solid #d7ebda;
        }

        .hp-referral-title {
          margin: 0;
          color: #1d3526;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .hp-referral-subtitle {
          margin: 5px 0 0;
          color: #8b9b90;
          font-size: 11px;
          font-weight: 500;
        }

        .hp-referral-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          padding: 7px 10px;
          border-radius: 30px;
          background: #fff8e9;
          border: 1px solid #f0dfb5;
          color: #a87516;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hp-referral-label {
          display: block;
          margin-bottom: 9px;
          color: #63756a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .hp-referral-action-row {
          display: flex;
          align-items: stretch;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .hp-referral-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .hp-referral-input-icon {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          color: #84958a;
          pointer-events: none;
        }

        .hp-referral-input {
          width: 100%;
          height: 51px;
          display: block;
          padding: 0 13px 0 42px;
          border: 1px solid #e2ebe4;
          border-radius: 13px;
          outline: none;
          background: #f7faf7;
          color: #314b39;
          font-family: monospace;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
          min-width: 0;
        }

        .hp-referral-input:focus {
          background: #ffffff;
          border-color: #72b889;
          box-shadow: 0 0 0 3px rgba(16, 150, 65, 0.09);
        }

        .hp-referral-copy {
          min-width: 145px;
          height: 51px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid #0c8439;
          border-radius: 13px;
          background: linear-gradient(135deg, #087b35, #16a34a);
          color: #ffffff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.7px;
          cursor: pointer;
          box-shadow: 0 5px 13px rgba(8, 123, 53, 0.17);
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .hp-referral-copy:hover:not(:disabled) {
          background: linear-gradient(135deg, #06652b, #10863d);
          box-shadow: 0 7px 17px rgba(8, 123, 53, 0.23);
          transform: translateY(-2px);
        }

        .hp-referral-copy:active:not(:disabled) {
          transform: scale(0.97);
        }

        .hp-referral-copy.success {
          background: linear-gradient(135deg, #087b35, #0c9850);
          border-color: #087b35;
        }

        .hp-referral-copy:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .hp-referral-footer {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 14px;
          color: #84948a;
          font-size: 11px;
          font-weight: 500;
        }

        .hp-referral-footer svg {
          flex-shrink: 0;
          color: #b58a30;
        }

        /* TABLET */
        @media (max-width: 768px) {
          .hp-referral-card {
            padding: 19px;
            border-radius: 19px;
          }

          .hp-referral-copy {
            min-width: 125px;
            padding: 0 14px;
          }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .hp-referral-card {
            padding: 17px;
            border-radius: 17px;
          }

          .hp-referral-header {
            margin-bottom: 16px;
          }

          .hp-referral-icon {
            width: 38px;
            height: 38px;
            border-radius: 12px;
          }

          .hp-referral-title {
            font-size: 12px;
          }

          .hp-referral-subtitle {
            font-size: 10px;
          }

          .hp-referral-badge {
            padding: 6px 8px;
            font-size: 8px;
          }

          .hp-referral-action-row {
            flex-direction: column;
            gap: 10px;
          }

          .hp-referral-input {
            height: 48px;
            font-size: 11px;
          }

          .hp-referral-copy {
            width: 100%;
            height: 47px;
            min-width: 0;
          }

          .hp-referral-footer {
            font-size: 10px;
            line-height: 1.5;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 350px) {
          .hp-referral-card {
            padding: 14px;
          }

          .hp-referral-title {
            font-size: 11px;
          }

          .hp-referral-badge {
            font-size: 7px;
            padding: 5px 6px;
          }

          .hp-referral-title-group {
            gap: 8px;
          }

          .hp-referral-input {
            font-size: 10px;
            padding-left: 36px;
          }

          .hp-referral-input-icon {
            left: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-referral-copy,
          .hp-referral-input {
            transition: none;
          }
        }
      `}</style>

      <div className="hp-referral-card">
        <div className="hp-referral-content">

          {/* HEADER */}
          <div className="hp-referral-header">

            <div className="hp-referral-title-group">
           

         
            </div>

          

          </div>

          {/* REFERRAL INPUT */}
          <label className="hp-referral-label">
            Your Personal Invite Link
          </label>

          <div className="hp-referral-action-row">

            <div className="hp-referral-input-wrap">
              <div className="hp-referral-input-icon">
                <Link2 size={17} />
              </div>

              <input
                type="text"
                readOnly
                value={link || ""}
                onFocus={(e) => e.target.select()}
                className="hp-referral-input"
                aria-label="Your referral link"
                placeholder="Referral link not available"
              />
            </div>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!link}
              className={`hp-referral-copy ${copied ? "success" : ""}`}
            >
              {copied ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  COPIED
                </>
              ) : (
                <>
                  <ClipboardCopy size={18} strokeWidth={2.5} />
                  COPY LINK
                </>
              )}
            </button>

          </div>

          {/* FOOTER */}
          <div className="hp-referral-footer">
            <ShieldCheck size={14} />
            Share your referral link with friends and invite them to Helping Pools.
          </div>

        </div>
      </div>
    </>
  );
};

export default ReferralLinkBox;
