// import React from "react";
// import { 
//   X, 
//   Info, 
//   CheckCircle2, 
//   AlertCircle, 
//   TriangleAlert 
// } from "lucide-react";

// const MessageModal = ({
//   isOpen,
//   onClose,
//   title = "Message",
//   message = "",
//   type = "info",
//   zIndex = 2000,
// }) => {
//   if (!isOpen) return null;

//   // 🔥 THEME CONFIG: Type ke hisaab se colors aur icons
//   const theme = {
//     success: {
//       text: "text-emerald-600",
//       bg: "bg-emerald-50",
//       border: "border-emerald-100",
//       icon: CheckCircle2,
//       btn: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
//     },
//     error: {
//       text: "text-red-600",
//       bg: "bg-red-50",
//       border: "border-red-100",
//       icon: AlertCircle,
//       btn: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
//     },
//     warning: {
//       text: "text-amber-600",
//       bg: "bg-amber-50",
//       border: "border-amber-100",
//       icon: TriangleAlert,
//       btn: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
//     },
//     info: {
//       text: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-100",
//       icon: Info,
//       btn: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//     },
//   };

//   const currentTheme = theme[type] || theme.info;
//   const Icon = currentTheme.icon;

//   return (
//     <div
//       className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
//       style={{ zIndex }}
//     >
//       <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xl w-full max-w-sm flex flex-col relative overflow-hidden transform scale-100 transition-all">
        
//         {/* Soft Ambient Glow */}
//         <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 blur-[40px] pointer-events-none rounded-full"></div>

//         {/* Header with Close Icon */}
//         <div className="flex justify-end p-3 relative z-10">
//            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
//               <X size={18} />
//            </button>
//         </div>

//         {/* Icon Section */}
//         <div className="flex flex-col items-center px-6 pb-2 relative z-10">
//           <div className={`p-4 rounded-2xl ${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border} mb-4 shadow-sm`}>
//             <Icon size={32} strokeWidth={2.5} />
//           </div>

//           {/* Title */}
//           <h2 className={`text-xl font-black uppercase tracking-widest text-center mb-2 ${currentTheme.text}`}>
//             {title}
//           </h2>

//           {/* Scrollable Message Area */}
//           <div className="max-h-40 overflow-y-auto px-2 custom-scroll w-full text-center">
//             <p className="text-sm text-slate-600 font-bold leading-relaxed">
//               {message}
//             </p>
//           </div>
//         </div>

//         {/* OK Button */}
//         <div className="p-6 relative z-10">
//           <button
//             onClick={onClose}
//             className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs border transition-all shadow-sm active:scale-95 ${currentTheme.btn}`}
//           >
//             Acknowledge
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .custom-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
//         .custom-scroll::-webkit-scrollbar { width: 3px; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// };

// export default MessageModal;


import React from "react";
import {
  X,
  Info,
  CheckCircle2,
  AlertCircle,
  TriangleAlert,
  Sparkles,
} from "lucide-react";

const MessageModal = ({
  isOpen,
  onClose,
  title = "Message",
  message = "",
  type = "info",
  zIndex = 2000,
}) => {
  if (!isOpen) return null;

  const themes = {
    success: {
      icon: CheckCircle2,
      color: "#08783f",
      light: "#eaf7ed",
      border: "#cce9d3",
      heading: "SUCCESS",
    },
    error: {
      icon: AlertCircle,
      color: "#dc3d3d",
      light: "#fff0f0",
      border: "#f5d0d0",
      heading: "ERROR",
    },
    warning: {
      icon: TriangleAlert,
      color: "#bd841c",
      light: "#fff8e8",
      border: "#f1dfb5",
      heading: "WARNING",
    },
    info: {
      icon: Info,
      color: "#08783f",
      light: "#edf7ef",
      border: "#d3e9d7",
      heading: "INFORMATION",
    },
  };

  const current = themes[type] || themes.info;
  const Icon = current.icon;

  return (
    <div
      className="hp-message-overlay"
      style={{ zIndex }}
      onClick={onClose}
    >
      <style>{`
        .hp-message-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px;
          background: rgba(5, 25, 15, .65);
          backdrop-filter: blur(5px);
          animation: hpMessageFade .2s ease-out;
          font-family: Inter, Arial, sans-serif;
        }

        .hp-message-overlay * {
          box-sizing: border-box;
        }

        .hp-message-box {
          position: relative;
          width: 100%;
          max-width: 355px;
          overflow: hidden;
          border: 1px solid #dce9dc;
          border-radius: 19px;
          background: #fff;
          box-shadow: 0 20px 55px rgba(0,0,0,.22);
          animation: hpMessagePop .25s ease-out;
        }

        .hp-message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 15px;
          border-bottom: 2px solid #e3bd50;
          background: linear-gradient(110deg, #07552e, #087b43);
        }

        .hp-message-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .6px;
        }

        .hp-message-brand svg {
          color: #f7d777;
        }

        .hp-message-close {
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

        .hp-message-close:hover {
          background: #ffffff25;
          transform: rotate(90deg);
        }

        .hp-message-content {
          padding: 23px 21px 8px;
          text-align: center;
        }

        .hp-message-icon {
          display: grid;
          place-items: center;
          width: 67px;
          height: 67px;
          margin: 0 auto 13px;
          border: 1px solid;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,.04);
        }

        .hp-message-status {
          margin-bottom: 6px;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: 1.8px;
        }

        .hp-message-title {
          margin: 0;
          font-size: 19px;
          line-height: 1.35;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .hp-message-text {
          max-height: 155px;
          overflow-y: auto;
          margin-top: 10px;
          padding: 0 5px;
          color: #637368;
          font-size: 12px;
          line-height: 1.7;
          font-weight: 650;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
          scrollbar-width: thin;
          scrollbar-color: #c5d8c6 transparent;
        }

        .hp-message-text::-webkit-scrollbar {
          width: 4px;
        }

        .hp-message-text::-webkit-scrollbar-thumb {
          background: #c5d8c6;
          border-radius: 10px;
        }

        .hp-message-footer {
          padding: 19px 21px 20px;
        }

        .hp-message-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 43px;
          padding: 11px 15px;
          border: 1px solid #d4b34f;
          border-radius: 11px;
          background: linear-gradient(100deg, #087b43, #07552e);
          color: white;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 12px #08783f25;
          transition: .2s;
        }

        .hp-message-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px #08783f35;
        }

        .hp-message-button:active {
          transform: scale(.98);
        }

        .hp-message-footer-note {
          margin-top: 10px;
          text-align: center;
          color: #98a69b;
          font-size: 9px;
          font-weight: 750;
        }

        @keyframes hpMessageFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes hpMessagePop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 380px) {
          .hp-message-box {
            max-width: 100%;
            border-radius: 16px;
          }

          .hp-message-content {
            padding: 19px 15px 6px;
          }

          .hp-message-title {
            font-size: 17px;
          }

          .hp-message-footer {
            padding: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-message-overlay,
          .hp-message-box {
            animation: none;
          }
        }
      `}</style>

      <div
        className="hp-message-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="hp-message-header">
          <div className="hp-message-brand">
            <Sparkles size={16} />
            HELPING POOLS
          </div>

          <button
            type="button"
            onClick={onClose}
            className="hp-message-close"
            aria-label="Close message"
          >
            <X size={17} />
          </button>
        </div>

        {/* Message Content */}
        <div className="hp-message-content">
          <div
            className="hp-message-icon"
            style={{
              color: current.color,
              background: current.light,
              borderColor: current.border,
            }}
          >
            <Icon size={33} strokeWidth={2.3} />
          </div>

          <div
            className="hp-message-status"
            style={{ color: current.color }}
          >
            {current.heading}
          </div>

          <h2
            className="hp-message-title"
            style={{ color: current.color }}
          >
            {title}
          </h2>

          <div className="hp-message-text">
            {message}
          </div>
        </div>

        {/* Footer */}
        <div className="hp-message-footer">
          <button
            type="button"
            onClick={onClose}
            className="hp-message-button"
          >
            <CheckCircle2 size={15} style={{ marginRight: 7 }} />
            Done
          </button>

          <div className="hp-message-footer-note">
            HELPING POOLS • MEMBER NOTIFICATION
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
