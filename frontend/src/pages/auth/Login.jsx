// import React, { useState, useEffect, useRef } from 'react';
// import api from '../../api/axios';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { User, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, Globe, Sparkles, Home, Download } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

// // 🔥 NAYA CHAM CHAM KARTA HUA BUTTON COMPONENT
// const ShinyDownloadButton = () => (
//   <a 
//     href="/cryptocommunity.pdf" 
//     download="CryptoCommunity.pdf"
//     className="relative overflow-hidden w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 text-white font-black text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:shadow-[0_0_30px_rgba(16,185,129,0.9)] border border-emerald-300"
//   >
//     {/* Shine Animation Element */}
//     <div 
//       className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 skew-x-[-25deg]"
//       style={{ animation: 'shine 2.5s infinite', left: '-100%' }}
//     ></div>
//     <style>{`
//       @keyframes shine {
//         0% { left: -100%; }
//         20% { left: 200%; }
//         100% { left: 200%; }
//       }
//     `}</style>

//     <Download size={18} strokeWidth={3} className="relative z-10 animate-bounce" /> 
//     <span className="relative z-10 drop-shadow-md">DOWNLOAD BUSINESS PDF</span>
//   </a>
// );

// const UserLogin = () => {
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [savedUsers, setSavedUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();
//   const inputRef = useRef(null);

//   // 🔥 AUTOMATIC HARD REFRESH LOGIC (Sirf ek baar chalega)
//   useEffect(() => {
//     const hasRefreshed = sessionStorage.getItem('site_updated_refresh');
//     if (!hasRefreshed) {
//       sessionStorage.setItem('site_updated_refresh', 'true');
//       window.location.reload(); 
//     }
//   }, []);

//   // 🔥 BULLETPROOF AUTO-LOGIN FROM ADMIN
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const urlToken = queryParams.get('token');
//     const urlUser = queryParams.get('user');
    
//     if (urlToken && urlUser) {
//       try {
//         const userData = JSON.parse(decodeURIComponent(urlUser));
        
//         // 1. Storage me direct save karo (React race conditions avoid karne ke liye)
//         localStorage.setItem('token', urlToken);
//         localStorage.setItem('user', JSON.stringify(userData));
        
//         // 2. Auth context ko update karo
//         login(userData, urlToken);
        
//         // 3. URL ko saaf karo
//         window.history.replaceState({}, document.title, '/login');
        
//         // 4. Force Redirect to Dashboard
//         window.location.href = '/dashboard'; 
//       } catch (err) {
//         console.error('Auto-login data parsing failed', err);
//         setError('Invalid login link from Admin.');
//       }
//     }
//   }, [location.search, login]);

//   // Saved Users Logic
//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem('savedUsers') || '[]');
//     setSavedUsers(users);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (userId === '') {
//       setFilteredUsers(savedUsers);
//     } else {
//       setFilteredUsers(
//         savedUsers.filter(u => u.id.toLowerCase().includes(userId.toLowerCase()))
//       );
//     }
//   }, [userId, savedUsers]);

//   const handleUserSelect = (id) => {
//     const user = savedUsers.find(u => u.id === id);
//     if (user) {
//       setUserId(user.id);
//       setPassword(user.password);
//       setRememberMe(true);
//       setDropdownOpen(false);
//     }
//   };

//   // Handle Login Process
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const fpPromise = FingerprintJS.load();
//       const fp = await fpPromise;
//       const result = await fp.get();
//       const visitorId = result.visitorId;
      
//       const res = await api.post('/auth/login', { userId, password, deviceId: visitorId });
//       const { token, user } = res.data;
      
//       login(user, token);
      
//       if (rememberMe) {
//         const updatedUsers = savedUsers.filter(u => u.id !== userId);
//         updatedUsers.unshift({ id: userId, password });
//         localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
//         setSavedUsers(updatedUsers);
//       }
      
//       setTimeout(() => {
//         setLoading(false);
//         navigate('/dashboard', { replace: true });
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex font-sans selection:bg-emerald-500/30">
      
//       {/* --- LEFT SIDE: BRANDING (Hidden on Mobile, Visible on PC) --- */}
//       <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-50 flex-col justify-between p-12 border-r border-slate-200">
//          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none"></div>
//          <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-green-500/15 blur-[100px] rounded-full pointer-events-none"></div>

//          <div className="relative z-10">
//             <Link to="/" className="flex items-center gap-3 no-underline group w-fit hover:opacity-80 transition-opacity">
//               <span className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
//                 <Globe className="text-emerald-500" /> CRYPTO<span className="text-emerald-500">COMMUNITY</span>
//               </span>
//             </Link>
//          </div>

//          <div className="relative z-10 my-auto max-w-lg">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-black tracking-wide mb-6">
//               <Sparkles size={14} /> SECURE ACCESS
//             </div>
//             <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">
//                Welcome <br/>
//                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Back</span>
//             </h1>
//             <p className="text-slate-600 text-lg leading-relaxed font-medium">
//                Log in to access your dashboard, monitor your network, and manage your earnings securely.
//             </p>
//          </div>

//          <div className="relative z-10 flex items-center gap-4 text-slate-500 text-sm font-bold">
//             <span>© {new Date().getFullYear()} CryptoCommunity</span>
//             <span>•</span>
//             <span>256-Bit Encrypted</span>
//          </div>
//       </div>

//       {/* --- RIGHT SIDE: FORM --- */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-y-auto bg-white">
         
//          {/* Mobile Only Header (Logo & Action Links) */}
//          <div className="lg:hidden w-full max-w-md mb-6 flex flex-col items-center gap-4 mt-2">
//             <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 no-underline hover:opacity-80 transition-opacity mb-2">
//               <Globe className="text-emerald-500" size={26} /> CRYPTO<span className="text-emerald-500">COMMUNITY</span>
//             </Link>
//             <div className="flex w-full gap-2">
//                <Link to="/" className="flex-1 flex justify-center items-center gap-1.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors">
//                  <Home size={16} /> Home
//                </Link>
//                <Link to="/register" className="flex-1 flex justify-center items-center text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-4 py-2.5 rounded-lg transition-colors">
//                  Create Account
//                </Link>
//             </div>
//             {/* 🔥 TOP BUTTON (MOBILE) - Home/Create Account ke niche */}
//             <div className="w-full mt-2">
//                <ShinyDownloadButton />
//             </div>
//          </div>

//          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 mt-2 md:mt-0">
            
//             {/* Desktop Header (Action Links) */}
//             <div className="hidden lg:flex justify-end items-center mb-6 gap-3">
//                <Link to="/" className="text-sm flex items-center gap-1.5 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">
//                  <Home size={16} /> Home
//                </Link>
//                <Link to="/register" className="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
//                  Create Account
//                </Link>
//             </div>

//             {/* 🔥 TOP BUTTON (DESKTOP) - Header ke niche */}
//             <div className="hidden lg:block w-full mb-8">
//                <ShinyDownloadButton />
//             </div>

//             <div className="mb-6 text-center lg:text-left">
//               <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Login</h2>
//               <p className="text-slate-500 text-sm font-medium">Access your global network dashboard.</p>
//             </div>

//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl font-bold flex items-center gap-2 animate-in slide-in-from-top-2 shadow-sm">
//                  ⚠️ {error}
//               </div>
//             )}

//             <form onSubmit={handleLogin} className="space-y-4">
              
//               {/* User ID Field */}
//               <div ref={inputRef} className="relative z-20">
//                 <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="User ID"
//                       value={userId}
//                       onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
//                       onFocus={() => setDropdownOpen(true)}
//                       className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
//                       required
//                     />
//                 </div>

//                 {/* Dropdown Box */}
//                 {dropdownOpen && filteredUsers.length > 0 && (
//                   <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 max-h-48 overflow-y-auto custom-scroll animate-in fade-in slide-in-from-top-2">
//                     {filteredUsers.map((u, idx) => (
//                       <div 
//                         key={idx} 
//                         className="flex items-center justify-between p-3 cursor-pointer hover:bg-emerald-50 border-b border-slate-100 last:border-0 transition-colors"
//                         onClick={() => handleUserSelect(u.id)}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
//                             <User size={14} />
//                           </div>
//                           <span className="text-slate-800 font-bold font-mono text-sm">{u.id}</span>
//                         </div>
//                         <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded uppercase tracking-wider">
//                           Saved
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="relative group z-10">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 pr-12 text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-mono"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3.5 text-slate-400 hover:text-emerald-500 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between pt-1 pb-2">
//                   <label className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
//                     <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-slate-300 group-hover:border-emerald-400'}`}>
//                       {rememberMe && <CheckCircle2 size={14} color="#fff" strokeWidth={3} />}
//                     </div>
//                     <span className="text-slate-600 text-sm font-bold select-none group-hover:text-slate-900 transition-colors">
//                       Remember me
//                     </span>
//                   </label>

//                   <Link to="/forgot-password" className="text-emerald-600 text-sm font-black hover:text-emerald-700 transition-colors">
//                       Forgot Password?
//                   </Link>
//               </div>

//               {/* Login Button */}
//               <button type="submit" disabled={loading} className={`w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-sm tracking-widest uppercase shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : 'hover:-translate-y-1 active:scale-95'}`}>
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                     LOGIN...
//                   </>
//                 ) : (
//                   <>LOGIN <ArrowRight size={18} strokeWidth={3} /></>
//                 )}
//               </button>
              
//               {/* PDF Download Button Divider */}
//               <div className="relative flex py-3 items-center">
//                 <div className="flex-grow border-t border-slate-200"></div>
//                 <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Or</span>
//                 <div className="flex-grow border-t border-slate-200"></div>
//               </div>

//               {/* 🔥 BOTTOM BUTTON (PURANI JAGAH PAR BHI RAKHA HAI) 🔥 */}
//               <ShinyDownloadButton />

//             </form>
//          </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;



import React, { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  HandHeart,
  ShieldCheck,
  Users,
  Sparkles,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const UserLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [savedUsers, setSavedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const inputRef = useRef(null);

  // Original one-time refresh logic
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("site_updated_refresh");

    if (!hasRefreshed) {
      sessionStorage.setItem("site_updated_refresh", "true");
      window.location.reload();
    }
  }, []);

  // Original Admin auto-login
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get("token");
    const urlUser = queryParams.get("user");

    if (urlToken && urlUser) {
      try {
        const userData = JSON.parse(decodeURIComponent(urlUser));

        localStorage.setItem("token", urlToken);
        localStorage.setItem("user", JSON.stringify(userData));

        login(userData, urlToken);

        window.history.replaceState({}, document.title, "/login");
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Auto-login data parsing failed", err);
        setError("Invalid login link from Admin.");
      }
    }
  }, [location.search, login]);

  // Load saved users
  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem("savedUsers") || "[]");
      setSavedUsers(users);
    } catch (err) {
      setSavedUsers([]);
    }
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter saved users
  useEffect(() => {
    if (userId === "") {
      setFilteredUsers(savedUsers);
    } else {
      setFilteredUsers(
        savedUsers.filter((u) =>
          String(u.id).toLowerCase().includes(userId.toLowerCase())
        )
      );
    }
  }, [userId, savedUsers]);

  // Select saved user
  const handleUserSelect = (id) => {
    const user = savedUsers.find((u) => u.id === id);

    if (user) {
      setUserId(user.id);
      setPassword(user.password);
      setRememberMe(true);
      setDropdownOpen(false);
    }
  };

  // Original backend login API
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      const visitorId = result.visitorId;

      const res = await api.post("/auth/login", {
        userId,
        password,
        deviceId: visitorId,
      });

      const { token, user } = res.data;

      login(user, token);

      if (rememberMe) {
        const updatedUsers = savedUsers.filter(
          (u) => u.id !== userId
        );

        updatedUsers.unshift({
          id: userId,
          password,
        });

        localStorage.setItem(
          "savedUsers",
          JSON.stringify(updatedUsers)
        );

        setSavedUsers(updatedUsers);
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard", { replace: true });
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="hp-auth-page">

      <style>{`
        * {
          box-sizing: border-box;
        }

        .hp-auth-page {
          --green: #075b3b;
          --dark: #063e2b;
          --gold: #d6ad58;
          --cream: #f7f6ef;
          --muted: #78877e;
          font-family: Inter, Arial, sans-serif;
          min-height: 100vh;
          background: var(--cream);
          color: #20332a;
        }

        .hp-auth-page a {
          text-decoration: none;
        }

        .hp-auth-page button,
        .hp-auth-page input {
          font: inherit;
        }

        /* NAVBAR */

        .hp-auth-nav {
          height: 82px;
          padding: 0 7%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border-bottom: 1px solid #e9eee8;
          position: relative;
          z-index: 50;
        }

        .hp-auth-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          color: var(--green);
          font-size: 23px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .hp-auth-logo span {
          color: var(--gold);
        }

        .hp-auth-logo-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: var(--green);
          color: white;
          border-radius: 14px 14px 14px 4px;
        }

        .hp-auth-nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .hp-auth-nav-links a {
          color: #607067;
          font-size: 14px;
          font-weight: 700;
          transition: .2s;
        }

        .hp-auth-nav-links a:hover,
        .hp-auth-nav-links a.active {
          color: var(--green);
        }

        .hp-auth-nav-cta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hp-auth-nav-register {
          padding: 12px 21px;
          color: white;
          background: var(--green);
          border-radius: 9px;
          font-size: 13px;
          font-weight: 800;
          transition: .2s;
        }

        .hp-auth-nav-register:hover {
          background: var(--dark);
          transform: translateY(-2px);
        }

        .hp-auth-menu {
          display: none;
          border: 0;
          border-radius: 9px;
          padding: 9px;
          background: #eaf3eb;
          color: var(--green);
        }

        /* MAIN */

        .hp-auth-main {
          min-height: calc(100vh - 82px);
          padding: 55px 7%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 5% 15%, #e1e9d8 0, transparent 25%),
            radial-gradient(circle at 95% 85%, #f1e5c9 0, transparent 25%),
            #f7f6ef;
        }

        .hp-auth-main::before {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          border: 1px solid #075b3b12;
          border-radius: 50%;
          left: -240px;
          top: 10%;
        }

        .hp-auth-main::after {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          border: 1px solid #d6ad5830;
          border-radius: 50%;
          right: -180px;
          bottom: 5%;
        }

        .hp-auth-layout {
          width: 100%;
          max-width: 1150px;
          min-height: 620px;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          background: white;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          box-shadow: 0 30px 90px #173d2515;
          border: 1px solid #e9eee8;
        }

        /* LEFT DESIGN PANEL */

        .hp-auth-visual {
          position: relative;
          overflow: hidden;
          padding: 48px;
          background:
            linear-gradient(150deg, #06442e, #08764d);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hp-auth-visual::before {
          content: "";
          width: 440px;
          height: 440px;
          border: 65px solid #ffffff09;
          border-radius: 50%;
          position: absolute;
          right: -210px;
          top: -190px;
        }

        .hp-auth-visual::after {
          content: "";
          width: 300px;
          height: 300px;
          border: 45px solid #ffffff0b;
          border-radius: 50%;
          position: absolute;
          left: -150px;
          bottom: -100px;
        }

        .hp-visual-top,
        .hp-visual-content,
        .hp-visual-bottom {
          position: relative;
          z-index: 2;
        }

        .hp-visual-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #e5f0e8;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hp-visual-tag svg {
          color: var(--gold);
        }

        .hp-visual-content {
          margin: auto 0;
          padding: 45px 0;
        }

        .hp-visual-emblem {
          width: 84px;
          height: 84px;
          display: grid;
          place-items: center;
          border-radius: 26px;
          background: #ffffff;
          color: var(--green);
          margin-bottom: 32px;
          box-shadow: 0 15px 35px #00000015;
          transform: rotate(-5deg);
        }

        .hp-visual-content h1 {
          font-size: clamp(38px, 4.5vw, 54px);
          line-height: 1.12;
          letter-spacing: -2px;
          margin: 0 0 20px;
          max-width: 440px;
        }

        .hp-visual-content h1 span {
          color: var(--gold);
        }

        .hp-visual-content p {
          max-width: 400px;
          font-size: 15px;
          line-height: 1.9;
          color: #d1e5d8;
          margin: 0;
        }

        .hp-visual-quote {
          margin-top: 35px;
          padding: 18px 20px;
          border-left: 3px solid var(--gold);
          background: #ffffff0b;
          border-radius: 0 12px 12px 0;
          color: #e5eee8;
          font-size: 13px;
          line-height: 1.7;
          max-width: 390px;
        }

        .hp-visual-bottom {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #c8dfd0;
          font-size: 12px;
        }

        .hp-visual-bottom-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          background: #ffffff12;
          color: var(--gold);
          border-radius: 11px;
        }

        /* RIGHT FORM AREA */

        .hp-auth-form-panel {
          padding: 50px clamp(25px, 4vw, 55px);
          display: flex;
          justify-content: center;
          flex-direction: column;
          background: #fff;
          min-width: 0;
        }

        .hp-form-top {
          margin-bottom: 32px;
        }

        .hp-form-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--green);
          background: #eaf4ec;
          padding: 8px 13px;
          border-radius: 30px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 19px;
        }

        .hp-form-top h2 {
          color: var(--dark);
          font-size: 36px;
          letter-spacing: -1.5px;
          margin: 0 0 11px;
        }

        .hp-form-top p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          margin: 0;
        }

        .hp-form-error {
          padding: 13px 15px;
          background: #fff0ed;
          border: 1px solid #f2d2ca;
          border-radius: 10px;
          color: #a33c2d;
          font-size: 12px;
          font-weight: 650;
          margin-bottom: 19px;
          line-height: 1.6;
        }

        .hp-form-field {
          margin-bottom: 21px;
        }

        .hp-form-field label {
          display: block;
          font-size: 12px;
          font-weight: 850;
          color: #344c3d;
          margin-bottom: 9px;
        }

        .hp-form-input {
          height: 54px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 15px;
          border: 1px solid #e0e8e1;
          background: #fbfcfa;
          border-radius: 12px;
          transition: .2s;
        }

        .hp-form-input:focus-within {
          background: #fff;
          border-color: var(--green);
          box-shadow: 0 0 0 4px #075b3b0d;
        }

        .hp-form-input > svg {
          color: #87978d;
          flex-shrink: 0;
        }

        .hp-form-input input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #20332a;
          font-size: 14px;
          font-weight: 650;
        }

        .hp-form-input input::placeholder {
          color: #a2aea5;
          font-weight: 500;
        }

        .hp-password-toggle {
          border: 0;
          background: transparent;
          color: #84948a;
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 4px;
        }

        /* SAVED USERS */

        .hp-user-field {
          position: relative;
          z-index: 10;
        }

        .hp-saved-dropdown {
          position: absolute;
          top: calc(100% + 7px);
          left: 0;
          right: 0;
          max-height: 180px;
          overflow-y: auto;
          background: white;
          border: 1px solid #e1e9e2;
          border-radius: 12px;
          box-shadow: 0 15px 35px #123d2515;
          z-index: 20;
        }

        .hp-saved-user {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          border-bottom: 1px solid #edf1ed;
          transition: .2s;
        }

        .hp-saved-user:last-child {
          border-bottom: 0;
        }

        .hp-saved-user:hover {
          background: #edf6ef;
        }

        .hp-saved-user-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hp-saved-user-icon {
          width: 33px;
          height: 33px;
          display: grid;
          place-items: center;
          background: #eaf4ec;
          color: var(--green);
          border-radius: 9px;
        }

        .hp-saved-user-id {
          color: #294032;
          font-size: 13px;
          font-weight: 800;
          font-family: monospace;
        }

        .hp-saved-tag {
          padding: 5px 8px;
          background: #eaf4ec;
          color: var(--green);
          border-radius: 6px;
          font-size: 9px;
          font-weight: 900;
        }

        /* FORM OPTIONS */

        .hp-form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin: 2px 0 25px;
        }

        .hp-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #66766c;
          cursor: pointer;
        }

        .hp-remember input {
          width: 16px;
          height: 16px;
          accent-color: var(--green);
          cursor: pointer;
        }

        .hp-forgot {
          font-size: 12px;
          font-weight: 800;
          color: var(--green);
        }

        .hp-forgot:hover {
          text-decoration: underline;
        }

        /* LOGIN BUTTON */

        .hp-submit-btn {
          width: 100%;
          height: 55px;
          border: none;
          border-radius: 12px;
          color: white;
          background: linear-gradient(105deg, #075b3b, #08764d);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.2px;
          cursor: pointer;
          box-shadow: 0 10px 22px #075b3b20;
          transition: .25s;
        }

        .hp-submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px #075b3b30;
        }

        .hp-submit-btn:disabled {
          opacity: .65;
          cursor: wait;
        }

        .hp-submit-spinner {
          width: 19px;
          height: 19px;
          border: 3px solid #ffffff55;
          border-top-color: #fff;
          border-radius: 50%;
          animation: hpSpin .7s linear infinite;
        }

        @keyframes hpSpin {
          to { transform: rotate(360deg); }
        }

        .hp-form-register {
          text-align: center;
          color: #87948b;
          font-size: 12px;
          margin-top: 27px;
        }

        .hp-form-register a {
          color: var(--green);
          font-weight: 900;
        }

        .hp-form-register a:hover {
          text-decoration: underline;
        }

        .hp-form-security {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid #edf1ed;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #91a096;
          font-size: 10px;
        }

        .hp-form-security svg {
          color: var(--green);
        }

        /* MOBILE */

        @media(max-width: 900px) {
          .hp-auth-nav {
            padding: 0 5%;
          }

          .hp-auth-main {
            padding: 40px 4%;
          }

          .hp-auth-visual {
            padding: 35px;
          }

          .hp-auth-form-panel {
            padding: 35px 28px;
          }
        }

        @media(max-width: 680px) {
          .hp-auth-nav {
            height: 70px;
          }

          .hp-auth-menu {
            display: grid;
            place-items: center;
          }

          .hp-auth-nav-cta {
            display: none;
          }

          .hp-auth-nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 15px 6%;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            box-shadow: 0 12px 20px #00000010;
          }

          .hp-auth-nav-links.open {
            display: flex;
          }

          .hp-auth-nav-links a {
            padding: 14px 0;
            border-bottom: 1px solid #edf1ed;
          }

          .hp-auth-main {
            min-height: calc(100vh - 70px);
            padding: 30px 5%;
          }

          .hp-auth-layout {
            grid-template-columns: 1fr;
            max-width: 460px;
            min-height: auto;
            border-radius: 22px;
          }

          .hp-auth-visual {
            min-height: 205px;
            padding: 25px;
          }

          .hp-visual-top {
            display: none;
          }

          .hp-visual-content {
            padding: 0;
            display: flex;
            align-items: center;
            gap: 18px;
          }

          .hp-visual-emblem {
            width: 60px;
            height: 60px;
            min-width: 60px;
            margin: 0;
            border-radius: 18px;
          }

          .hp-visual-emblem svg {
            width: 30px;
            height: 30px;
          }

          .hp-visual-content h1 {
            font-size: 25px;
            letter-spacing: -.8px;
            margin: 0 0 7px;
          }

          .hp-visual-content p {
            font-size: 11px;
            line-height: 1.6;
          }

          .hp-visual-quote,
          .hp-visual-bottom {
            display: none;
          }

          .hp-auth-form-panel {
            padding: 32px 24px;
          }

          .hp-form-top {
            margin-bottom: 25px;
          }

          .hp-form-top h2 {
            font-size: 30px;
          }
        }

        @media(max-width: 390px) {
          .hp-auth-form-panel {
            padding: 28px 18px;
          }

          .hp-form-options {
            align-items: flex-start;
          }

          .hp-forgot {
            text-align: right;
          }

          .hp-auth-logo {
            font-size: 20px;
          }
        }
      `}</style>

      {/* NAVIGATION */}
      <header className="hp-auth-nav">

        <Link to="/" className="hp-auth-logo">
          <div className="hp-auth-logo-icon">
            <HandHeart size={25} />
          </div>
          Helping<span>Pools</span>
        </Link>

        <nav className={`hp-auth-nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link
            to="/login"
            className="active"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </nav>

        <div className="hp-auth-nav-cta">
          <Link to="/register" className="hp-auth-nav-register">
            Create Account <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          className="hp-auth-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* MAIN LOGIN AREA */}
      <main className="hp-auth-main">

        <div className="hp-auth-layout">

          {/* LEFT DESIGN */}
          <section className="hp-auth-visual">

            <div className="hp-visual-top">
              <div className="hp-visual-tag">
                <Sparkles size={15} />
                WELCOME TO OUR COMMUNITY
              </div>
            </div>

            <div className="hp-visual-content">

              <div>
                <div className="hp-visual-emblem">
                  <HandHeart size={43} />
                </div>
              </div>

              <div>
                <h1>
                  Together We
                  <br />
                  <span>Grow Stronger.</span>
                </h1>

                <p>
                  Welcome back to Helping Pools. Connect with your
                  community and continue your journey from where
                  you left off.
                </p>
              </div>

            </div>

            <div className="hp-visual-quote">
              "A stronger community begins with people who support
              and grow together."
            </div>

            <div className="hp-visual-bottom">
              <div className="hp-visual-bottom-icon">
                <Users size={19} />
              </div>

              <span>One Community. Shared Progress.</span>
            </div>

          </section>

          {/* RIGHT LOGIN FORM */}
          <section className="hp-auth-form-panel">

            <div className="hp-form-top">

              <div className="hp-form-label">
                <Leaf size={14} />
                MEMBER ACCESS
              </div>

              <h2>Welcome Back!</h2>

              <p>
                Sign in to your Helping Pools account to continue.
              </p>

            </div>

            {error && (
              <div className="hp-form-error">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* USER ID */}
              <div
                className="hp-form-field hp-user-field"
                ref={inputRef}
              >
                <label htmlFor="hp-userid">
                  User ID
                </label>

                <div className="hp-form-input">
                  <User size={19} />

                  <input
                    id="hp-userid"
                    type="text"
                    placeholder="Enter your User ID"
                    value={userId}
                    onChange={(e) =>
                      setUserId(e.target.value.replace(/\D/g, ""))
                    }
                    onFocus={() => setDropdownOpen(true)}
                    autoComplete="username"
                    required
                  />
                </div>

                {dropdownOpen && filteredUsers.length > 0 && (
                  <div className="hp-saved-dropdown">

                    {filteredUsers.map((u, idx) => (
                      <div
                        key={idx}
                        className="hp-saved-user"
                        onClick={() => handleUserSelect(u.id)}
                      >
                        <div className="hp-saved-user-left">
                          <div className="hp-saved-user-icon">
                            <User size={15} />
                          </div>

                          <span className="hp-saved-user-id">
                            {u.id}
                          </span>
                        </div>

                        <span className="hp-saved-tag">
                          SAVED
                        </span>
                      </div>
                    ))}

                  </div>
                )}

              </div>

              {/* PASSWORD */}
              <div className="hp-form-field">

                <label htmlFor="hp-password">
                  Password
                </label>

                <div className="hp-form-input">
                  <Lock size={19} />

                  <input
                    id="hp-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="hp-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

              </div>

              {/* REMEMBER AND FORGOT */}
              <div className="hp-form-options">

                <label className="hp-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="hp-forgot"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="hp-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="hp-submit-spinner" />
                    PLEASE WAIT...
                  </>
                ) : (
                  <>
                    SIGN IN
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

            </form>

            <div className="hp-form-register">
              Don't have an account?{" "}
              <Link to="/register">
                Create Account
              </Link>
            </div>

            <div className="hp-form-security">
              <ShieldCheck size={16} />
              Your account access is protected
            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default UserLogin;
