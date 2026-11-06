// import React, { useState } from 'react';
// import api from '../../api/axios';
// import { Link } from 'react-router-dom';
// import { User, ArrowRight, ShieldQuestion, Globe, Lock } from 'lucide-react';

// const ForgotPassword = () => {
//   // --- STATE ---
//   const [userId, setUserId] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // --- LOGIC ---
//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const res = await api.post('/auth/forgot-password', {
//         userId,
//       });
//       setMessage(res.data.message || 'Check your email for password reset instructions.');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start p-4 pt-24 md:pt-32 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
//       {/* --- GLOBAL STYLES & ANIMATIONS (Matching Login/Register) --- */}
//       <style>{`
//         @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
//         @keyframes pulseGlow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-pulse-glow { animation: pulseGlow 5s ease-in-out infinite; }
//         .glass-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.5); }
//       `}</style>

//       {/* Abstract Glowing Orbs */}
//       <div className="fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none animate-pulse-glow"></div>
//       <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-green-500/15 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 glass-panel shadow-sm px-4 md:px-8 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-3 no-underline group">
//             <span className="text-xl md:text-2xl font-black text-slate-900 tracking-wider">
//               CRYPTO<span className="text-emerald-500">COMMUNITY</span>
//             </span>
//           </Link>
//           <Link to="/login" className="bg-emerald-50 text-emerald-600 font-bold py-2.5 px-6 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center gap-2 border border-emerald-100 hover:border-emerald-500">
//             <Lock size={16} /> <span className="hidden sm:inline">Secure Login</span><span className="sm:hidden">Login</span>
//           </Link>
//         </div>
//       </nav>

//       {/* --- MAIN CONTAINER --- */}
//       <div className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-6 md:p-10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 mt-4">
        
//         {/* Header Section */}
//         <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6 animate-float border border-emerald-100 shadow-[0_10px_25px_rgba(16,185,129,0.15)] text-emerald-500 relative">
//                 <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
//                 <ShieldQuestion size={40} strokeWidth={2} className="relative z-10" />
//             </div>
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Forgot Password?</h2>
//             <p className="text-slate-500 font-medium text-sm">Enter your User ID to reset your password</p>
//         </div>

//         {/* Messages */}
//         {message && (
//           <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-xl text-sm text-center font-bold animate-in zoom-in duration-300 shadow-sm">
//             ✅ {message}
//           </div>
//         )}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center font-bold animate-in zoom-in duration-300 shadow-sm">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleForgotPassword} className="space-y-5">
            
//             {/* User ID Input */}
//             <div className="relative group">
//                 <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">User ID</label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                         <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
//                     </div>
//                     <input
//                         type="text"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
//                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all placeholder-slate-400"
//                         placeholder="Enter your User ID"
//                         required
//                     />
//                 </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//                 type="submit" 
//                 disabled={loading}
//                 className={`w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] transition-all flex items-center justify-center gap-2
//                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 active:scale-95'}
//                 `}
//             >
//                 {loading ? (
//                     <span className="flex items-center gap-2 text-sm tracking-widest uppercase">
//                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         SENDING...
//                     </span>
//                 ) : (
//                     <>
//                         <span className="text-sm tracking-widest uppercase font-black">Send Reset Link</span> <ArrowRight size={20} strokeWidth={3} />
//                     </>
//                 )}
//             </button>

//         </form>

//         {/* Back to Login Link */}
//         <p className="text-center mt-8 text-slate-500 text-sm font-medium">
//             Remembered your password?{' '}
//             <Link 
//                 to="/login" 
//                 className="text-emerald-600 hover:text-emerald-700 font-bold transition-all hover:underline decoration-emerald-500/30 underline-offset-4"
//             >
//                 Login Instead
//             </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import {
  User,
  ArrowRight,
  ShieldQuestion,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/forgot-password", {
        userId: userId.trim(),
      });

      setMessage(
        res.data.message ||
          "Password reset instructions have been sent to your registered email."
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hp-forgot-page">
      <style>{`
        .hp-forgot-page {
          --hp-green: #087d4d;
          --hp-dark: #075c3b;
          --hp-light: #eaf7ef;
          --hp-gold: #d5a43b;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 110px 16px 40px;
          background: #f5f8f5;
          font-family: Inter, Arial, sans-serif;
          color: #18352a;
        }

        .hp-forgot-page * {
          box-sizing: border-box;
        }

        .hp-forgot-page a {
          text-decoration: none;
        }

        .hp-forgot-orb {
          position: fixed;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          filter: blur(95px);
          pointer-events: none;
          opacity: .18;
          animation: hpForgotGlow 7s ease-in-out infinite;
        }

        .hp-forgot-orb.one {
          top: -130px;
          left: -100px;
          background: #16a36c;
        }

        .hp-forgot-orb.two {
          right: -120px;
          bottom: -140px;
          background: #d5a43b;
          animation-delay: 2s;
        }

        @keyframes hpForgotGlow {
          0%, 100% { transform: scale(1); opacity: .15; }
          50% { transform: scale(1.15); opacity: .25; }
        }

        @keyframes hpForgotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @keyframes hpForgotEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hp-forgot-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          padding: 13px 20px;
          background: rgba(255,255,255,.91);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e5eee7;
          box-shadow: 0 3px 15px rgba(7,92,59,.04);
        }

        .hp-forgot-nav-inner {
          width: 100%;
          max-width: 1250px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .hp-forgot-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .hp-forgot-brand-icon {
          width: 39px;
          height: 39px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          color: white;
          background: linear-gradient(135deg, #075c3b, #119660);
          box-shadow: 0 4px 12px #087d4d25;
          flex-shrink: 0;
        }

        .hp-forgot-brand-name {
          color: #18352a;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -.5px;
          white-space: nowrap;
        }

        .hp-forgot-brand-name span {
          color: var(--hp-green);
        }

        .hp-forgot-login {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 17px;
          border: 1px solid #d7eadc;
          border-radius: 10px;
          background: #eff9f1;
          color: var(--hp-green);
          font-size: 12px;
          font-weight: 850;
          transition: .25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .hp-forgot-login:hover {
          color: white;
          background: var(--hp-green);
          border-color: var(--hp-green);
          transform: translateY(-2px);
        }

        .hp-forgot-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 445px;
          padding: 35px 34px;
          border: 1px solid #e2ede5;
          border-radius: 22px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 18px 55px rgba(7,92,59,.09);
          animation: hpForgotEnter .65s ease both;
        }

        .hp-forgot-top-line {
          position: absolute;
          top: 0;
          left: 25%;
          width: 50%;
          height: 3px;
          border-radius: 0 0 10px 10px;
          background: linear-gradient(90deg, #087d4d, #d5a43b);
        }

        .hp-forgot-header {
          text-align: center;
          margin-bottom: 27px;
        }

        .hp-forgot-icon {
          width: 76px;
          height: 76px;
          margin: 0 auto 18px;
          position: relative;
          display: grid;
          place-items: center;
          border: 1px solid #dceee1;
          border-radius: 22px;
          color: var(--hp-green);
          background: linear-gradient(145deg, #f0faf3, #e2f5e9);
          box-shadow: 0 9px 22px #087d4d15;
          animation: hpForgotFloat 5s ease-in-out infinite;
        }

        .hp-forgot-icon::after {
          content: "";
          position: absolute;
          inset: -6px;
          border: 1px solid #087d4d20;
          border-radius: 26px;
        }

        .hp-forgot-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 11px;
          border-radius: 30px;
          background: #eff9f1;
          color: var(--hp-green);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .hp-forgot-header h1 {
          margin: 0 0 9px;
          color: #18352a;
          font-size: 27px;
          font-weight: 950;
          letter-spacing: -.8px;
        }

        .hp-forgot-header p {
          margin: 0;
          color: #84948a;
          font-size: 12px;
          font-weight: 550;
          line-height: 1.7;
        }

        .hp-forgot-message {
          padding: 13px 14px;
          margin-bottom: 19px;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
          animation: hpForgotEnter .3s ease;
        }

        .hp-forgot-success {
          color: #087d4d;
          background: #effaf2;
          border: 1px solid #ccebd5;
        }

        .hp-forgot-error {
          color: #c0392b;
          background: #fff3f1;
          border: 1px solid #f5d0ca;
        }

        .hp-forgot-field {
          margin-bottom: 20px;
        }

        .hp-forgot-label {
          display: block;
          margin: 0 0 9px 3px;
          color: #63776b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hp-forgot-input-wrap {
          position: relative;
        }

        .hp-forgot-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #91a398;
          pointer-events: none;
          transition: .2s;
        }

        .hp-forgot-input {
          width: 100%;
          height: 51px;
          padding: 0 14px 0 46px;
          border: 1px solid #e0eae3;
          border-radius: 11px;
          outline: none;
          background: #f7faf7;
          color: #18352a;
          font-size: 14px;
          font-weight: 750;
          transition: .25s;
        }

        .hp-forgot-input::placeholder {
          color: #aab7ae;
          font-weight: 500;
        }

        .hp-forgot-input:focus {
          border-color: #087d4d;
          background: white;
          box-shadow: 0 0 0 4px #087d4d12;
        }

        .hp-forgot-input-wrap:focus-within .hp-forgot-input-icon {
          color: var(--hp-green);
        }

        .hp-forgot-submit {
          width: 100%;
          min-height: 52px;
          margin-top: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border: none;
          border-radius: 11px;
          background: linear-gradient(110deg, #075c3b, #0c9660);
          color: white;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 8px 19px #087d4d25;
          transition: .25s ease;
        }

        .hp-forgot-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px #087d4d35;
        }

        .hp-forgot-submit:active:not(:disabled) {
          transform: scale(.98);
        }

        .hp-forgot-submit:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .hp-forgot-spinner {
          width: 19px;
          height: 19px;
          border: 2px solid #ffffff55;
          border-top-color: white;
          border-radius: 50%;
          animation: hpForgotSpin .7s linear infinite;
        }

        @keyframes hpForgotSpin {
          to { transform: rotate(360deg); }
        }

        .hp-forgot-back {
          margin-top: 25px;
          padding-top: 19px;
          border-top: 1px solid #edf2ee;
          text-align: center;
          color: #87958b;
          font-size: 12px;
          font-weight: 550;
        }

        .hp-forgot-back a {
          color: var(--hp-green);
          font-weight: 900;
          margin-left: 4px;
        }

        .hp-forgot-back a:hover {
          color: var(--hp-dark);
          text-decoration: underline;
        }

        .hp-forgot-footer {
          position: relative;
          z-index: 2;
          margin-top: 23px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          color: #94a198;
          font-size: 9px;
          font-weight: 750;
          text-align: center;
        }

        .hp-forgot-footer svg {
          color: var(--hp-green);
        }

        @media (max-width: 600px) {
          .hp-forgot-page {
            padding: 100px 14px 30px;
          }

          .hp-forgot-navbar {
            padding: 11px 13px;
          }

          .hp-forgot-brand {
            gap: 7px;
          }

          .hp-forgot-brand-icon {
            width: 35px;
            height: 35px;
          }

          .hp-forgot-brand-name {
            font-size: 14px;
          }

          .hp-forgot-login {
            padding: 9px 12px;
            font-size: 11px;
          }

          .hp-forgot-card {
            max-width: 430px;
            padding: 29px 22px;
            border-radius: 18px;
          }

          .hp-forgot-header h1 {
            font-size: 24px;
          }

          .hp-forgot-header p {
            font-size: 11px;
          }

          .hp-forgot-icon {
            width: 68px;
            height: 68px;
            border-radius: 19px;
          }
        }

        @media (max-width: 360px) {
          .hp-forgot-page {
            padding-left: 10px;
            padding-right: 10px;
          }

          .hp-forgot-brand-name {
            font-size: 12px;
          }

          .hp-forgot-login {
            padding: 8px 9px;
          }

          .hp-forgot-card {
            padding: 25px 16px;
          }

          .hp-forgot-header h1 {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-forgot-page *,
          .hp-forgot-page *::before,
          .hp-forgot-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="hp-forgot-orb one" />
      <div className="hp-forgot-orb two" />

      {/* Navbar */}
      <nav className="hp-forgot-navbar">
        <div className="hp-forgot-nav-inner">
          <Link to="/" className="hp-forgot-brand">
            <div className="hp-forgot-brand-icon">
              <Globe size={21} />
            </div>

            <div className="hp-forgot-brand-name">
              HELPING<span>POOLS</span>
            </div>
          </Link>

          <Link to="/login" className="hp-forgot-login">
            <Lock size={15} />
            <span> Login</span>
          </Link>
        </div>
      </nav>

      {/* Main Card */}
      <main className="hp-forgot-card">
        <div className="hp-forgot-top-line" />

        <div className="hp-forgot-header">
          <div className="hp-forgot-icon">
            <ShieldQuestion size={37} strokeWidth={1.8} />
          </div>

          <div className="hp-forgot-tag">
            <Sparkles size={12} />
            ACCOUNT SECURITY
          </div>

          <h1>Forgot Password?</h1>

          <p>
            Enter your User ID to receive password reset
            instructions on your registered email.
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className="hp-forgot-message hp-forgot-success" role="status">
            <ShieldCheck
              size={16}
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginRight: 6,
              }}
            />
            {message}
          </div>
        )}

        {error && (
          <div className="hp-forgot-message hp-forgot-error" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleForgotPassword}>
          <div className="hp-forgot-field">
            <label className="hp-forgot-label" htmlFor="forgot-user-id">
              User ID
            </label>

            <div className="hp-forgot-input-wrap">
              <User className="hp-forgot-input-icon" size={19} />

              <input
                id="forgot-user-id"
                type="text"
                inputMode="numeric"
                autoComplete="username"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value.replace(/\D/g, ""))
                }
                className="hp-forgot-input"
                placeholder="Enter your User ID"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !userId.trim()}
            className="hp-forgot-submit"
          >
            {loading ? (
              <>
                <span className="hp-forgot-spinner" />
                SENDING...
              </>
            ) : (
              <>
                SEND RESET LINK
                <ArrowRight size={19} strokeWidth={2.8} />
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="hp-forgot-back">
          Remembered your password?
          <Link to="/login">Login Instead</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="hp-forgot-footer">
        <ShieldCheck size={13} />
        HELPING POOLS SECURE MEMBER AREA
        <span>•</span>
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default ForgotPassword;
