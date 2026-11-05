 


// import React, { useEffect, useState } from "react";
// import api from "../../api/axios"; 
// import { QRCodeCanvas } from "qrcode.react";
// import { Copy, CheckCircle2, AlertTriangle, X, Wallet, QrCode, RefreshCcw } from "lucide-react";
// import Swal from 'sweetalert2';
// // 🔥 FIX: Aapne naya SuccessModal import karna hai yahan
// // (Agar folder path alag ho toh is line ko apne hisaab se adjust kar lena)
// import SuccessModal from "./SuccessModal"; 

// export default function DepositModal({ onClose, user, userId }) {
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [verifying, setVerifying] = useState(false); 

//   // 🔥 NAYI STATES: Apne Custom Success Modal ko control karne ke liye
//   const [isSuccessMode, setIsSuccessMode] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     if (userId) {
//       fetchDepositAddress();
//     }
//   }, [userId]);

//   const fetchDepositAddress = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const res = await api.get("/deposit/get-address", {
//         headers: { Authorization: `Bearer ${token}` }
//       }); 
      
//       setAddress(res.data.address);
//     } catch (err) {
//       console.error("Failed to fetch address", err);
//       alert("Could not load deposit address. Please try again.");
//       onClose(); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyText = async () => {
//     if (!address) return;
//     try {
//       if (navigator.clipboard?.writeText) {
//         await navigator.clipboard.writeText(address);
//       } else {
//         const ta = document.createElement("textarea");
//         ta.value = address;
//         document.body.appendChild(ta);
//         ta.select();
//         document.execCommand("copy");
//         document.body.removeChild(ta);
//       }
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       alert("Copy failed. Please copy manually.");
//     }
//   };

//   // 🔥 UPDATED FUNCTION: Ab ye SweetAlert (Success) ki jagah apna Modal dikhayega
//   const handleVerifyDeposit = async () => {
//     try {
//       setVerifying(true);
//       const token = localStorage.getItem('token');

//       const response = await api.post('/deposit/verify-deposit', {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         // ✨ SweetAlert Hata Diya! Ab apna modal open hoga
//         setSuccessMessage(response.data.message);
//         setIsSuccessMode(true);
//       }
//     } catch (error) {
//       // Pending/Error ke liye Swal best hai taaki user wapas try kar sake
//       Swal.fire({
//         icon: 'info',
//         title: 'Pending...',
//         text: error.response?.data?.message || "Deposit not found yet. Please wait 1-2 minutes.",
//         confirmButtonColor: '#3b82f6'
//       });
//     } finally {
//       setVerifying(false);
//     }
//   };

//   // 🔥 NAYA LOGIC: Agar Payment Verify ho gayi, toh QR code wale Modal ko hide karke SuccessModal dikha do
//   if (isSuccessMode) {
//     return (
//       <SuccessModal 
//         isOpen={true}
//         onClose={() => {
//           onClose(); // Parent modal ko bhi band karo
//           window.location.reload(); // Balance turant update dikhane ke liye page refresh karo
//         }}
//         customTitle="Payment Verified! 🎉"
//         customMessage={successMessage}
//         zIndex={2050} // Sabse upar dikhane ke liye
//       />
//     );
//   }

//   // 👇 Yahan se neeche purana QR Code wala UI hai 👇
//   return (
//     <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
      
//       {/* Modal Container */}
//       <div className="bg-white w-full max-w-sm rounded-3xl border border-slate-200 shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in duration-300 max-h-[85vh]">
        
//         {/* Ambient Glow Effects */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[60px] pointer-events-none rounded-full"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 blur-[60px] pointer-events-none rounded-full"></div>

//         {/* Header */}
//         <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex justify-between items-center relative z-10 shrink-0">
//            <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 rounded-xl border border-green-200 text-green-600">
//                   <Wallet size={16} />
//               </div>
//               <div>
//                 <h2 className="text-slate-800 font-black text-sm md:text-base uppercase tracking-wide flex items-center gap-2">
//                   Deposit USDT
//                   <span className="bg-green-100 text-green-700 border border-green-200 text-[9px] px-2 py-0.5 rounded-md font-bold tracking-widest">
//                     BEP-20
//                   </span>
//                 </h2>
//                 <p className="text-slate-600 text-[11px] md:text-xs font-black uppercase tracking-wider mt-1">
//                   Step 1: Send. <span className="text-blue-600">Step 2: Verify.</span>
//                 </p>
//               </div>
//            </div>
//            <button onClick={onClose} className="group bg-white hover:bg-red-50 p-1.5 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
//               <X size={16} className="text-slate-400 group-hover:text-red-500" />
//            </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 relative z-10 flex flex-col items-center bg-white overflow-y-auto custom-scroll">
//           {loading ? (
//             <div className="py-8 flex flex-col items-center justify-center gap-3">
//                <svg className="animate-spin h-7 w-7 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                </svg>
//                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest animate-pulse">Generating Address...</p>
//             </div>
//           ) : (
//             <div className="w-full">
              
//               <div className="bg-sky-50 border border-sky-100 p-2 rounded-xl mb-3 text-center">
//                 <p className="text-sky-800 text-[10px] font-bold leading-relaxed px-1">
//                   Send USDT (BEP-20) below. Then click <span className="font-black">Verify Payment</span>.
//                 </p>
//               </div>

//               {/* QR Code Container */}
//               <div className="flex justify-center mb-3 relative">
//                  <div className="absolute inset-0 bg-green-100 rounded-3xl blur-[15px] opacity-60"></div>
//                  <div className="relative p-2 bg-white rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col items-center">
//                    <QRCodeCanvas value={address} size={110} level="H" />
//                    <div className="mt-1 text-slate-400 font-black text-[8px] tracking-widest uppercase flex items-center gap-1">
//                       <QrCode size={10} /> Scan to Pay
//                    </div>
//                  </div>
//               </div>

//               {/* Address Display & Copy */}
//               <div className="w-full mb-4">
//                 <label className="block text-[9px] font-bold text-slate-600 mb-1 ml-1 uppercase tracking-wider">
//                   Deposit Address
//                 </label>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <input
//                     readOnly
//                     value={address}
//                     onFocus={(e) => e.target.select()}
//                     className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800 text-[10px] md:text-[11px] font-mono tracking-wider focus:outline-none focus:border-green-400 transition-all text-center sm:text-left shadow-inner"
//                   />
//                   <button 
//                     onClick={copyText} 
//                     className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-black text-[10px] tracking-wide transition-all shadow-sm shrink-0 ${
//                         copied 
//                             ? 'bg-green-50 text-green-600 border border-green-200' 
//                             : 'bg-green-600 hover:bg-green-700 text-white border border-transparent active:scale-95'
//                     }`}
//                   >
//                     {copied ? <><CheckCircle2 size={12} /> COPIED</> : <><Copy size={12} /> COPY</>}
//                   </button>
//                 </div>
//               </div>

//               {/* VERIFY PAYMENT BUTTON */}
//               <div className="w-full border-t border-slate-100 pt-3 mb-3">
//                   <button 
//                     onClick={handleVerifyDeposit}
//                     disabled={verifying}
//                     className={`w-full py-2.5 rounded-lg font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md
//                         ${verifying 
//                           ? 'bg-blue-400 text-white cursor-wait' 
//                           : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-95'}`}
//                   >
//                     {verifying ? (
//                       <><RefreshCcw size={16} className="animate-spin" /> Checking...</>
//                     ) : (
//                       <><RefreshCcw size={16} /> I Have Paid - Verify</>
//                     )}
//                   </button>
//               </div>

//               {/* Warning Note */}
//               <div className="bg-red-50 border border-red-100 p-2.5 rounded-lg flex items-start gap-1.5">
//                 <AlertTriangle className="text-red-500 shrink-0 w-3.5 h-3.5 mt-0.5" />
//                 <p className="text-red-600 text-[8px] md:text-[9px] font-bold leading-snug">
//                   <span className="text-red-800 font-black">WARNING:</span> Send only USDT via <span className="text-red-800 font-black">BNB Smart Chain (BEP-20)</span>.
//                 </p>
//               </div>

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { QRCodeCanvas } from "qrcode.react";
import {
  Copy,
  CheckCircle2,
  AlertTriangle,
  X,
  Wallet,
  QrCode,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";
import SuccessModal from "./SuccessModal";

export default function DepositModal({ onClose, user, userId }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isSuccessMode, setIsSuccessMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userId) {
      fetchDepositAddress();
    }
  }, [userId]);

  const fetchDepositAddress = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get("/deposit/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddress(res.data.address);
    } catch (err) {
      console.error("Failed to fetch address", err);
      alert("Could not load deposit address. Please try again.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!address) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const ta = document.createElement("textarea");
        ta.value = address;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const handleVerifyDeposit = async () => {
    try {
      setVerifying(true);
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/deposit/verify-deposit",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setIsSuccessMode(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "Pending...",
        text:
          error.response?.data?.message ||
          "Deposit not found yet. Please wait 1-2 minutes.",
        confirmButtonColor: "#08783f",
      });
    } finally {
      setVerifying(false);
    }
  };

  if (isSuccessMode) {
    return (
      <SuccessModal
        isOpen={true}
        onClose={() => {
          onClose();
          window.location.reload();
        }}
        customTitle="Payment Verified! 🎉"
        customMessage={successMessage}
        zIndex={2050}
      />
    );
  }

  return (
    <div className="hp-deposit-overlay">
      <style>{`
        .hp-deposit-overlay {
          --green: #08783f;
          --dark: #07552e;
          --gold: #e3b943;
          --border: #e0ebdf;
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          background: rgba(8, 25, 16, .68);
          backdrop-filter: blur(5px);
          font-family: Inter, Arial, sans-serif;
        }

        .hp-deposit-overlay * {
          box-sizing: border-box;
        }

        .hp-deposit-modal {
          position: relative;
          width: 100%;
          max-width: 410px;
          max-height: 92vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid #dcebd9;
          border-radius: 19px;
          background: #fff;
          box-shadow: 0 22px 65px rgba(0,0,0,.25);
          animation: hpDepositIn .25s ease-out;
        }

        @keyframes hpDepositIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hp-deposit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 15px 17px;
          background: linear-gradient(115deg, #07552e, #087c43);
          border-bottom: 3px solid var(--gold);
          flex-shrink: 0;
        }

        .hp-deposit-title {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .hp-deposit-icon {
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          color: #ffe18a;
          background: #ffffff18;
          border: 1px solid #ffffff35;
          border-radius: 12px;
        }

        .hp-deposit-heading {
          color: white;
          font-size: 15px;
          font-weight: 950;
          letter-spacing: .5px;
        }

        .hp-deposit-network {
          display: inline-flex;
          margin-left: 6px;
          padding: 3px 6px;
          border: 1px solid #f2d16e;
          border-radius: 5px;
          color: #ffe38b;
          font-size: 8px;
          font-weight: 900;
          vertical-align: middle;
        }

        .hp-deposit-subtitle {
          margin-top: 4px;
          color: #d4e9d9;
          font-size: 10px;
          font-weight: 650;
        }

        .hp-deposit-close {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border: 1px solid #ffffff30;
          border-radius: 10px;
          background: #ffffff12;
          color: white;
          cursor: pointer;
          transition: .2s;
        }

        .hp-deposit-close:hover {
          color: #fff;
          background: #dc2626;
          border-color: #dc2626;
        }

        .hp-deposit-body {
          padding: 16px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #b7d3b7 transparent;
        }

        .hp-deposit-instruction {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 11px;
          margin-bottom: 13px;
          border: 1px solid #d7ead8;
          border-radius: 11px;
          background: #f0f9ef;
          color: #24623a;
          font-size: 11px;
          line-height: 1.5;
          font-weight: 700;
        }

        .hp-deposit-instruction svg {
          flex-shrink: 0;
          color: var(--green);
          margin-top: 1px;
        }

        .hp-deposit-qr-wrap {
          display: flex;
          justify-content: center;
          margin: 4px 0 14px;
        }

        .hp-deposit-qr {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 11px 13px 9px;
          border: 1px solid #dce9d9;
          border-radius: 15px;
          background: white;
          box-shadow: 0 4px 16px #174d2510;
        }

        .hp-deposit-qr canvas {
          display: block;
          width: 148px !important;
          height: 148px !important;
          max-width: 100%;
        }

        .hp-deposit-qr-label {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 7px;
          color: #78907c;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hp-deposit-label {
          display: block;
          margin: 0 0 6px 2px;
          color: #42624b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .hp-deposit-address {
          display: flex;
          gap: 7px;
          width: 100%;
          margin-bottom: 14px;
        }

        .hp-deposit-address input {
          width: 100%;
          min-width: 0;
          padding: 11px 9px;
          border: 1px solid #dce8dc;
          border-radius: 9px;
          outline: none;
          background: #f7faf6;
          color: #254d32;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
        }

        .hp-deposit-address input:focus {
          border-color: #0b8a4b;
          box-shadow: 0 0 0 2px #08783f12;
        }

        .hp-deposit-copy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-width: 85px;
          padding: 0 11px;
          border: 1px solid var(--green);
          border-radius: 9px;
          background: var(--green);
          color: white;
          font-size: 10px;
          font-weight: 900;
          cursor: pointer;
          transition: .2s;
        }

        .hp-deposit-copy:hover {
          background: var(--dark);
        }

        .hp-deposit-copy.copied {
          border-color: #b9dfc0;
          background: #eaf7ec;
          color: #08783f;
        }

        .hp-deposit-verify {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          width: 100%;
          min-height: 45px;
          padding: 11px;
          border: 1px solid #d4ae45;
          border-radius: 10px;
          background: linear-gradient(100deg, #08783f, #07552e);
          color: #fff;
          box-shadow: 0 4px 12px #08783f20;
          font-size: 12px;
          font-weight: 950;
          cursor: pointer;
          transition: .2s;
        }

        .hp-deposit-verify:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px #08783f30;
        }

        .hp-deposit-verify:disabled {
          opacity: .65;
          cursor: wait;
        }

        .hp-deposit-warning {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 10px;
          border: 1px solid #f1d7a5;
          border-radius: 10px;
          background: #fff9eb;
          color: #805b19;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.55;
        }

        .hp-deposit-warning svg {
          flex-shrink: 0;
          color: #c18c22;
        }

        .hp-deposit-secure {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          margin-top: 12px;
          color: #8a9a8d;
          font-size: 9px;
          font-weight: 750;
        }

        .hp-deposit-secure svg {
          color: var(--green);
        }

        .hp-deposit-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 230px;
          color: var(--green);
        }

        .hp-deposit-loading p {
          margin: 0;
          color: #708576;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 1px;
        }

        @media (max-width: 420px) {
          .hp-deposit-overlay {
            padding: 10px;
          }

          .hp-deposit-modal {
            max-width: 100%;
            border-radius: 16px;
          }

          .hp-deposit-header {
            padding: 12px;
          }

          .hp-deposit-body {
            padding: 12px;
          }

          .hp-deposit-qr canvas {
            width: 135px !important;
            height: 135px !important;
          }

          .hp-deposit-heading {
            font-size: 13px;
          }

          .hp-deposit-address input {
            font-size: 9px;
          }
        }
      `}</style>

      <div className="hp-deposit-modal">
        {/* Header */}
        <div className="hp-deposit-header">
          <div className="hp-deposit-title">
            <div className="hp-deposit-icon">
              <Wallet size={21} />
            </div>

            <div>
              <div className="hp-deposit-heading">
                DEPOSIT USDT
                <span className="hp-deposit-network">BEP-20</span>
              </div>

              <div className="hp-deposit-subtitle">
                Step 1: Send • Step 2: Verify
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="hp-deposit-close"
            aria-label="Close deposit modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="hp-deposit-body">
          {loading ? (
            <div className="hp-deposit-loading">
              <RefreshCcw size={28} className="animate-spin" />
              <p>GENERATING DEPOSIT ADDRESS...</p>
            </div>
          ) : (
            <>
              {/* Instructions */}
              <div className="hp-deposit-instruction">
                <Sparkles size={16} />
                <span>
                  Send USDT (BEP-20) to the address below. After sending,
                  click Verify Payment.
                </span>
              </div>

              {/* QR Code */}
              <div className="hp-deposit-qr-wrap">
                <div className="hp-deposit-qr">
                  {address ? (
                    <QRCodeCanvas
                      value={address}
                      size={148}
                      level="H"
                      includeMargin={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-[148px] h-[148px] text-slate-400 text-xs">
                      Address unavailable
                    </div>
                  )}

                  <div className="hp-deposit-qr-label">
                    <QrCode size={12} />
                    Scan to Pay
                  </div>
                </div>
              </div>

              {/* Address */}
              <label className="hp-deposit-label">
                Deposit Wallet Address
              </label>

              <div className="hp-deposit-address">
                <input
                  type="text"
                  readOnly
                  value={address}
                  onFocus={(e) => e.target.select()}
                  aria-label="Deposit wallet address"
                />

                <button
                  type="button"
                  onClick={copyText}
                  disabled={!address}
                  className={`hp-deposit-copy ${
                    copied ? "copied" : ""
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} />
                      COPIED
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      COPY
                    </>
                  )}
                </button>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={handleVerifyDeposit}
                disabled={verifying || !address}
                className="hp-deposit-verify"
              >
                {verifying ? (
                  <>
                    <RefreshCcw size={16} className="animate-spin" />
                    Checking Payment...
                  </>
                ) : (
                  <>
                    <RefreshCcw size={16} />
                    VERIFY Your Deposite amount
                  </>
                )}
              </button>

              {/* Warning */}
              <div className="hp-deposit-warning">
                <AlertTriangle size={16} />
                <span>
                  <strong>IMPORTANT:</strong> Send only USDT through
                  <strong> BNB Smart Chain (BEP-20)</strong>. Sending
                  through another network may result in loss of funds.
                </span>
              </div>

              <div className="hp-deposit-secure">
                <ShieldCheck size={13} />
                Secure Deposit • Helping Pools
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
