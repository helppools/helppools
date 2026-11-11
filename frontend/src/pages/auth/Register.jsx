// // import React, { useEffect, useState } from 'react';
// // import api from '../../api/axios';
// // import { useNavigate, useLocation, Link } from 'react-router-dom';
// // import Select from 'react-select';
// // import Confetti from 'react-confetti';
// // import FingerprintJS from '@fingerprintjs/fingerprintjs';
// // import { 
// //   User, Users, Mail, Phone, 
// //   CheckCircle2, XCircle, ArrowRight, Copy, Sparkles, Globe, Wallet 
// // } from 'lucide-react';

// // function Register() {
// //   const [name, setName] = useState('');
// //   const [mobile, setMobile] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [country, setCountry] = useState('');
// //   const [walletAddress, setWalletAddress] = useState('');
  
// //   const [sponsorId, setSponsorId] = useState('');
// //   const [sponsorName, setSponsorName] = useState('');
  
// //   const [errorMsg, setErrorMsg] = useState('');
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [registeredData, setRegisteredData] = useState(null);
// //   const [showConfetti, setShowConfetti] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Referral from URL
// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     const ref = params.get('ref');
// //     if (ref) {
// //       setSponsorId(ref);
// //       fetchSponsorName(ref);
// //     }
// //   }, [location]);

// //   // Sponsor Name Fetch
// //   const fetchSponsorName = async (id) => {
// //     if (id.length < 3) {
// //       setSponsorName('');
// //       return;
// //     }
// //     try {
// //       const res = await api.get(`/user/sponsor-name/${id}?t=${new Date().getTime()}`);
// //       setSponsorName(res.data.name);
// //     } catch {
// //       setSponsorName('Invalid Sponsor');
// //     }
// //   };

// //   // MOBILE FIX: 15 digits tak allow karega type karna
// //   const handleMobileChange = (e) => {
// //     let value = e.target.value.replace(/\D/g, ''); 
// //     value = value.replace(/^0+/, ''); 
// //     if (value.length > 15) value = value.slice(0, 15);
// //     setMobile(value);
// //   };

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     setErrorMsg('');

// //     // 🔥 SECURITY: Trim extra spaces
// //     const cleanName = name.trim();
// //     const cleanEmail = email.trim();
// //     const cleanMobile = mobile.trim();
// //     const cleanWallet = walletAddress.trim();

// //     // Password validation is removed since system auto-generates it
// //     if (!cleanName || !cleanMobile || !cleanEmail || !country || !cleanWallet) {
// //       setErrorMsg('All fields, including the BEP20 Wallet Address, are required.');
// //       return;
// //     }

// //     // 1. FRONTEND NAME VALIDATION
// //     const nameRegex = /^[A-Za-z\s]{3,50}$/;
// //     if (!nameRegex.test(cleanName)) {
// //       setErrorMsg('Invalid Name. Only alphabets are allowed (No symbols or numbers).');
// //       return;
// //     }

// //     // 2. FRONTEND EMAIL VALIDATION
// //     if (!cleanEmail.toLowerCase().endsWith('@gmail.com')) {
// //       setErrorMsg('Only @gmail.com emails are accepted.');
// //       return;
// //     }

// //     // 3. FRONTEND MOBILE VALIDATION
// //     if (country === 'India' && cleanMobile.length !== 10) {
// //       setErrorMsg('Mobile number must be exactly 10 digits for India.');
// //       return;
// //     } else if (cleanMobile.length < 10 || cleanMobile.length > 15) {
// //       setErrorMsg('Mobile number must be between 10 to 15 digits.');
// //       return;
// //     }

// //     // 4. FRONTEND WALLET VALIDATION (BEP20)
// //     if (!/^0x[a-fA-F0-9]{28,48}$/.test(cleanWallet)) {
// //       setErrorMsg('Invalid Wallet Address. It must start with "0x" and be a valid length.');
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const fpPromise = FingerprintJS.load();
// //       const fp = await fpPromise;
// //       const result = await fp.get();
// //       const visitorId = result.visitorId;

// //       // Passing cleaned data to backend (no password sent)
// //       const response = await api.post('/auth/register', {
// //         name: cleanName, 
// //         mobile: cleanMobile, 
// //         email: cleanEmail, 
// //         country, 
// //         sponsorId,
// //         walletAddress: cleanWallet, 
// //         deviceId: visitorId 
// //       });

// //       // Backend returns the auto-generated password
// //       setRegisteredData({
// //         userId: response.data.userId,
// //         password: response.data.password,
// //         name: response.data.name || cleanName,
// //       });

// //       setShowPopup(true);
// //       setShowConfetti(true);
// //       setLoading(false);
// //     } catch (err) {
// //       setErrorMsg(err.response?.data?.message || 'Registration failed. Please check your details and try again.');
// //       setLoading(false);
// //     }
// //   };

// //   const handlePopupClose = () => {
// //     setShowPopup(false);
// //     setShowConfetti(false);
// //     navigate('/login');
// //   };

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //     alert("Copied: " + text);
// //   };

// //  const countryOptions = [
// //   // Original List
// //   { value: 'India', label: 'India (+91)' },
// //   { value: 'USA', label: 'United States (+1)' },
// //   { value: 'UK', label: 'United Kingdom (+44)' },
// //   { value: 'UAE', label: 'UAE (+971)' },
// //   { value: 'Australia', label: 'Australia (+61)' },
// //   { value: 'Canada', label: 'Canada (+1)' },
// //   { value: 'Singapore', label: 'Singapore (+65)' },
// //   { value: 'Malaysia', label: 'Malaysia (+60)' },
// //   { value: 'PK', label: 'Pakistan (+92)' },
// //   { value: 'Bangladesh', label: 'Bangladesh (+880)' },
// //   { value: 'Nepal', label: 'Nepal (+977)' },
// //   { value: 'South Africa', label: 'South Africa (+27)' },
// //   { value: 'Nigeria', label: 'Nigeria (+234)' },

// //   // Added Popular Countries (Middle East)
// //   { value: 'Saudi Arabia', label: 'Saudi Arabia (+966)' },
// //   { value: 'Qatar', label: 'Qatar (+974)' },
// //   { value: 'Oman', label: 'Oman (+968)' },
// //   { value: 'Kuwait', label: 'Kuwait (+965)' },
// //   { value: 'Bahrain', label: 'Bahrain (+973)' },

// //   // Added Popular Countries (Europe)
// //   { value: 'Germany', label: 'Germany (+49)' },
// //   { value: 'France', label: 'France (+33)' },
// //   { value: 'Italy', label: 'Italy (+39)' },
// //   { value: 'Spain', label: 'Spain (+34)' },
// //   { value: 'Netherlands', label: 'Netherlands (+31)' },
// //   { value: 'Ireland', label: 'Ireland (+353)' },
// //   { value: 'Switzerland', label: 'Switzerland (+41)' },

// //   // Added Popular Countries (Asia Pacific)
// //   { value: 'New Zealand', label: 'New Zealand (+64)' },
// //   { value: 'Sri Lanka', label: 'Sri Lanka (+94)' },
// //   { value: 'China', label: 'China (+86)' },
// //   { value: 'Japan', label: 'Japan (+81)' },
// //   { value: 'South Korea', label: 'South Korea (+82)' },
// //   { value: 'Indonesia', label: 'Indonesia (+62)' },
// //   { value: 'Philippines', label: 'Philippines (+63)' },
// //   { value: 'Thailand', label: 'Thailand (+66)' },
// //   { value: 'Vietnam', label: 'Vietnam (+84)' },

// //   // Added Popular Countries (Americas)
// //   { value: 'Mexico', label: 'Mexico (+52)' },
// //   { value: 'Brazil', label: 'Brazil (+55)' }
// //  ];

// //   // Light Theme Custom Select Styles
// //   const customSelectStyles = {
// //     control: (base, state) => ({
// //       ...base,
// //       background: '#ffffff',
// //       borderColor: state.isFocused ? '#10b981' : '#e2e8f0',
// //       borderRadius: '0.75rem',
// //       color: '#0f172a',
// //       minHeight: '52px',
// //       boxShadow: state.isFocused ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none',
// //       transition: 'all 0.3s ease',
// //       paddingLeft: '35px',
// //       cursor: 'pointer'
// //     }),
// //     singleValue: (base) => ({ ...base, color: '#0f172a', fontWeight: 'bold' }),
// //     input: (base) => ({ ...base, color: '#0f172a' }),
// //     menu: (base) => ({ ...base, background: '#ffffff', border: '1px solid #e2e8f0', zIndex: 50, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }),
// //     option: (base, state) => ({
// //       ...base,
// //       backgroundColor: state.isFocused ? '#ecfdf5' : 'transparent',
// //       color: state.isFocused ? '#059669' : '#334155',
// //       cursor: 'pointer',
// //       padding: '12px 18px',
// //       fontWeight: 'bold'
// //     }),
// //     placeholder: (base) => ({ ...base, color: '#94a3b8', fontWeight: 'bold' }),
// //   };

// //   return (
// //     // Split Screen Layout
// //     <div className="min-h-screen bg-white flex font-sans selection:bg-emerald-500/30">
      
// //       {/* --- LEFT SIDE: BRANDING (Hidden on Mobile, Visible on PC) --- */}
// //       <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-50 flex-col justify-between p-12 border-r border-slate-200">
// //          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none"></div>
// //          <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-green-500/15 blur-[100px] rounded-full pointer-events-none"></div>

// //          <div className="relative z-10">
// //             <Link to="/" className="flex items-center gap-3 no-underline group w-fit hover:opacity-80 transition-opacity">
// //               <span className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
// //                 <Globe className="text-emerald-500" /> CRYPTO<span className="text-emerald-500">COMMUNITY</span>
// //               </span>
// //             </Link>
// //          </div>

// //          <div className="relative z-10 my-auto max-w-lg">
// //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-black tracking-wide mb-6">
// //               <Sparkles size={14} /> NEW ERA OF NETWORKING
// //             </div>
// //             <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">
// //                Build your <br/>
// //                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">Global Network</span>
// //             </h1>
// //             <p className="text-slate-600 text-lg leading-relaxed font-medium">
// //                Join the most advanced Single Leg Community system. Secure, transparent, and built for massive scaling. 
// //             </p>
// //          </div>

// //          <div className="relative z-10 flex items-center gap-4 text-slate-500 text-sm font-bold">
// //             <span>© {new Date().getFullYear()} CryptoCommunity</span>
// //             <span>•</span>
// //             <span>Secure Registration</span>
// //          </div>
// //       </div>

// //       {/* --- RIGHT SIDE: FORM (Full width on Mobile, Half on PC) --- */}
// //       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-y-auto bg-white">
         
// //          {/* Mobile Only Header (Logo & Login Link) */}
// //          <div className="lg:hidden w-full max-w-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
// //             <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 no-underline hover:opacity-80 transition-opacity">
// //               <Globe className="text-emerald-500" size={26} /> CRYPTO<span className="text-emerald-500">COMMUNITY</span>
// //             </Link>
// //             <Link to="/login" className="text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
// //               Login Instead
// //             </Link>
// //          </div>

// //          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 mt-2 md:mt-0">
            
// //             {/* Desktop Header */}
// //             <div className="hidden lg:flex justify-between items-center mb-8">
// //                <Link to="/" className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 no-underline hover:opacity-80 transition-opacity">
// //                  <Globe className="text-emerald-500" size={24} />
// //                  CRYPTO<span className="text-emerald-500">COMMUNITY</span>
// //                </Link>
// //                <Link to="/login" className="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
// //                  Login Instead
// //                </Link>
// //             </div>

// //             <div className="mb-6 text-center lg:text-left">
// //               <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Sign Up</h2>
// //               <p className="text-slate-500 text-sm font-medium">Join the network today.</p>
// //             </div>

// //             {errorMsg && (
// //               <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl font-bold flex items-center gap-2 animate-in slide-in-from-top-2 shadow-sm">
// //                   <XCircle size={16} className="text-red-500 min-w-[16px]" /> 
// //                   <span className="break-words">{errorMsg}</span>
// //               </div>
// //             )}

// //             <form onSubmit={handleRegister} className="space-y-4">
              
// //               {/* Sponsor Box */}
// //               <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200 shadow-sm mb-2">
// //                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 flex items-center gap-2">
// //                    <Users size={14} className="text-emerald-500" /> Referral Sponsor
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="text"
// //                     value={sponsorId}
// //                     onChange={(e) => { 
// //                       const val = e.target.value.replace(/\D/g, '');
// //                       setSponsorId(val); 
// //                       fetchSponsorName(val); 
// //                     }}                  
// //                     className={`w-full bg-white border ${sponsorName === 'Invalid Sponsor' ? 'border-red-400 focus:border-red-500 ring-2 ring-red-50' : (sponsorName && sponsorId) ? 'border-emerald-400 focus:border-emerald-500 ring-2 ring-emerald-50' : 'border-slate-200 focus:border-slate-300'} rounded-xl px-4 py-3.5 text-slate-900 font-mono tracking-wide focus:outline-none transition-all`}
// //                     placeholder="Enter Sponsor ID"
// //                   />
// //                   <div className="absolute right-4 top-3.5">
// //                      {sponsorName === 'Invalid Sponsor' && <XCircle className="text-red-500" size={20} />}
// //                      {sponsorName && sponsorName !== 'Invalid Sponsor' && <CheckCircle2 className="text-emerald-500" size={20} />}
// //                   </div>
// //                 </div>
                
// //                 <div className="h-4 mt-2 ml-1">
// //                     {sponsorName && (
// //                       <p className={`text-[10px] md:text-[11px] font-black tracking-wide uppercase truncate ${sponsorName === 'Invalid Sponsor' ? 'text-red-500' : 'text-emerald-600'}`}>
// //                          {sponsorName === 'Invalid Sponsor' ? 'Sponsor not found' : `VERIFIED: ${sponsorName}`}
// //                       </p>
// //                     )}
// //                 </div>
// //               </div>

// //               {/* Input Fields */}
// //               <div className="space-y-3">
// //                   <div className="relative group">
// //                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
// //                       </div>
// //                       <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value.replace(/[^A-Za-z\s]/g, ''))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all" />
// //                   </div>

// //                   <div className="relative group">
// //                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
// //                       </div>
// //                       <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all" />
// //                   </div>
                  
// //                   <div className="relative group z-30">
// //                      <div className="absolute top-[16px] left-4 z-10 pointer-events-none">
// //                        <Globe className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
// //                      </div>
// //                      <Select options={countryOptions} onChange={s => setCountry(s.value)} styles={customSelectStyles} placeholder="Select Country" isSearchable={false} />
// //                   </div>
                  
// //                   <div className="relative group z-20">
// //                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
// //                     </div>
// //                     <input type="tel" placeholder="Mobile Number" value={mobile} onChange={handleMobileChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-mono" />
// //                   </div>

// //                   {/* 🔥 NEW FIELD: USDT BEP20 Wallet Address */}
// //                   <div className="relative group z-10">
// //                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <Wallet className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
// //                     </div>
// //                     <input 
// //                       type="text" 
// //                       placeholder="USDT BEP20 Address For Withdrawal (Starts with 0x)" 
// //                       value={walletAddress} 
// //                       onChange={e => setWalletAddress(e.target.value)} 
// //                       className="w-full font-extrabold bg-white border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-slate-900 font-mono text-sm placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all" 
// //                     />
// //                   </div>
// //               </div>

// //               <button type="submit" disabled={loading} className={`w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-sm tracking-widest uppercase shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : 'hover:-translate-y-1 active:scale-95'}`}>
// //                 {loading ? (
// //                   <>
// //                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// //                     PROCESSING...
// //                   </>
// //                 ) : (
// //                   <>CREATE ACCOUNT <ArrowRight size={18} strokeWidth={3} /></>
// //                 )}
// //               </button>
// //             </form>
// //          </div>
// //       </div>

// //       {/* --- LIGHT THEME SUCCESS MODAL --- */}
// //       {showPopup && registeredData && (
// //         <div style={modalOverlay}>
           
// //           <div className="animate-in zoom-in duration-300 relative overflow-hidden" style={modalBox}>
// //             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 blur-[50px]"></div>
            
// //             <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 relative border border-slate-100 shadow-[0_15px_30px_rgba(16,185,129,0.15)]">
// //                <div className="absolute inset-0 bg-emerald-50 rounded-2xl animate-ping"></div>
// //                <CheckCircle2 size={40} className="text-emerald-500 relative z-10" strokeWidth={2.5} />
// //             </div>
            
// //             <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-wide">ACCOUNT <span className="text-emerald-500">CREATED</span></h2>
// //             <p className="text-slate-500 text-xs uppercase tracking-widest mb-6 font-black truncate px-2">Welcome, {registeredData.name}</p>
            
// //             <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl mb-6 text-left relative z-10 shadow-inner">
// //               <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
// //                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">User ID</span>
// //                  <div className="flex items-center gap-2">
// //                     <span className="text-emerald-600 font-black text-lg sm:text-xl tracking-wider font-mono">{registeredData.userId}</span>
// //                     <button onClick={() => copyToClipboard(registeredData.userId)} className="text-slate-400 hover:text-emerald-500 bg-white border border-slate-200 p-1.5 rounded shadow-sm"><Copy size={14}/></button>
// //                  </div>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Password</span>
// //                  <div className="flex items-center gap-2 max-w-[60%]">
// //                     <span className="text-slate-900 font-black font-mono bg-white border border-slate-200 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm shadow-sm truncate">{registeredData.password}</span>
// //                     <button onClick={() => copyToClipboard(registeredData.password)} className="text-slate-400 hover:text-emerald-500 bg-white border border-slate-200 p-1.5 rounded shadow-sm flex-shrink-0"><Copy size={14}/></button>
// //                  </div>
// //               </div>
// //             </div>

// //             <div className="bg-amber-50 border border-amber-200 text-amber-600 text-[9px] sm:text-[10px] p-3 rounded-xl font-black mb-6 flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
// //                ⚠️ Screenshot these details now
// //             </div>
            
// //             <button onClick={handlePopupClose} className="w-full py-4 rounded-xl bg-slate-900 text-white font-black tracking-widest uppercase hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/30">
// //               PROCEED TO LOGIN
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const modalOverlay = { position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 };
// // const modalBox = { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '32px 20px', borderRadius: '32px', width: '92%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };

// // export default Register;



// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import Select from "react-select";
// import Confetti from "react-confetti";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import {
//   Globe,
//   Users,
//   User,
//   Mail,
//   Phone,
//   Wallet,
//   ShieldCheck,
//   CheckCircle2,
//   XCircle,
//   ArrowRight,
//   Copy,
//   Sparkles,
//   LockKeyhole,
//   BadgeCheck,
//   RefreshCw,
//   ChevronRight,
// } from "lucide-react";

// function Register() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [country, setCountry] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [sponsorId, setSponsorId] = useState("");
//   const [sponsorName, setSponsorName] = useState("");

//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [registeredData, setRegisteredData] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const countryOptions = [
//     { value: "India", label: "India (+91)" },
//     { value: "USA", label: "United States (+1)" },
//     { value: "UK", label: "United Kingdom (+44)" },
//     { value: "UAE", label: "UAE (+971)" },
//     { value: "Australia", label: "Australia (+61)" },
//     { value: "Canada", label: "Canada (+1)" },
//     { value: "Singapore", label: "Singapore (+65)" },
//     { value: "Malaysia", label: "Malaysia (+60)" },
//     { value: "PK", label: "Pakistan (+92)" },
//     { value: "Bangladesh", label: "Bangladesh (+880)" },
//     { value: "Nepal", label: "Nepal (+977)" },
//     { value: "South Africa", label: "South Africa (+27)" },
//     { value: "Nigeria", label: "Nigeria (+234)" },
//     { value: "Saudi Arabia", label: "Saudi Arabia (+966)" },
//     { value: "Qatar", label: "Qatar (+974)" },
//     { value: "Oman", label: "Oman (+968)" },
//     { value: "Kuwait", label: "Kuwait (+965)" },
//     { value: "Bahrain", label: "Bahrain (+973)" },
//     { value: "Germany", label: "Germany (+49)" },
//     { value: "France", label: "France (+33)" },
//     { value: "Italy", label: "Italy (+39)" },
//     { value: "Spain", label: "Spain (+34)" },
//     { value: "Netherlands", label: "Netherlands (+31)" },
//     { value: "Ireland", label: "Ireland (+353)" },
//     { value: "Switzerland", label: "Switzerland (+41)" },
//     { value: "New Zealand", label: "New Zealand (+64)" },
//     { value: "Sri Lanka", label: "Sri Lanka (+94)" },
//     { value: "China", label: "China (+86)" },
//     { value: "Japan", label: "Japan (+81)" },
//     { value: "South Korea", label: "South Korea (+82)" },
//     { value: "Indonesia", label: "Indonesia (+62)" },
//     { value: "Philippines", label: "Philippines (+63)" },
//     { value: "Thailand", label: "Thailand (+66)" },
//     { value: "Vietnam", label: "Vietnam (+84)" },
//     { value: "Mexico", label: "Mexico (+52)" },
//     { value: "Brazil", label: "Brazil (+55)" },
//   ];

//   // Keep original referral URL behavior
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const ref = params.get("ref");

//     if (ref) {
//       setSponsorId(ref);
//       fetchSponsorName(ref);
//     }
//   }, [location.search]);

//   // Original sponsor API
//   const fetchSponsorName = async (id) => {
//     if (id.length < 3) {
//       setSponsorName("");
//       return;
//     }

//     try {
//       const res = await api.get(
//         `/user/sponsor-name/${id}?t=${new Date().getTime()}`
//       );
//       setSponsorName(res.data.name);
//     } catch {
//       setSponsorName("Invalid Sponsor");
//     }
//   };

//   const handleMobileChange = (e) => {
//     let value = e.target.value.replace(/\D/g, "");
//     value = value.replace(/^0+/, "");

//     if (value.length > 15) value = value.slice(0, 15);
//     setMobile(value);
//   };

//   // Original registration backend flow
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     const cleanName = name.trim();
//     const cleanEmail = email.trim();
//     const cleanMobile = mobile.trim();
//     const cleanWallet = walletAddress.trim();

//     if (
//       !cleanName ||
//       !cleanMobile ||
//       !cleanEmail ||
//       !country ||
//       !cleanWallet
//     ) {
//       setErrorMsg(
//         "All fields, including the BEP20 Wallet Address, are required."
//       );
//       return;
//     }

//     const nameRegex = /^[A-Za-z\s]{3,50}$/;

//     if (!nameRegex.test(cleanName)) {
//       setErrorMsg(
//         "Invalid Name. Only alphabets are allowed (No symbols or numbers)."
//       );
//       return;
//     }

//     if (!cleanEmail.toLowerCase().endsWith("@gmail.com")) {
//       setErrorMsg("Only @gmail.com emails are accepted.");
//       return;
//     }

//     if (country === "India" && cleanMobile.length !== 10) {
//       setErrorMsg("Mobile number must be exactly 10 digits for India.");
//       return;
//     } else if (
//       cleanMobile.length < 10 ||
//       cleanMobile.length > 15
//     ) {
//       setErrorMsg("Mobile number must be between 10 to 15 digits.");
//       return;
//     }

//     if (!/^0x[a-fA-F0-9]{28,48}$/.test(cleanWallet)) {
//       setErrorMsg(
//         'Invalid Wallet Address. It must start with "0x" and be a valid length.'
//       );
//       return;
//     }

//     setLoading(true);

//     try {
//       const fpPromise = FingerprintJS.load();
//       const fp = await fpPromise;
//       const result = await fp.get();
//       const visitorId = result.visitorId;

//       // Same endpoint and exact original payload keys
//       const response = await api.post("/auth/register", {
//         name: cleanName,
//         mobile: cleanMobile,
//         email: cleanEmail,
//         country,
//         sponsorId,
//         walletAddress: cleanWallet,
//         deviceId: visitorId,
//       });

//       // Backend-generated credentials
//       setRegisteredData({
//         userId: response.data.userId,
//         password: response.data.password,
//         name: response.data.name || cleanName,
//       });

//       setShowPopup(true);
//       setShowConfetti(true);
//       setLoading(false);
//     } catch (err) {
//       setErrorMsg(
//         err.response?.data?.message ||
//           "Registration failed. Please check your details and try again."
//       );
//       setLoading(false);
//     }
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     setShowConfetti(false);
//     navigate("/login");
//   };

//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(String(text));
//       alert("Copied: " + text);
//     } catch {
//       alert("Unable to copy. Please copy it manually.");
//     }
//   };

//   const selectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "56px",
//       borderRadius: "12px",
//       border: state.isFocused
//         ? "1px solid #11865b"
//         : "1px solid #e3eae5",
//       background: "#fff",
//       boxShadow: state.isFocused
//         ? "0 0 0 4px rgba(17,134,91,.08)"
//         : "none",
//       paddingLeft: "37px",
//       cursor: "pointer",
//       "&:hover": { borderColor: "#11865b" },
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#193b2e",
//       fontWeight: 650,
//       fontSize: "13px",
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#9aa79f",
//       fontSize: "13px",
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 100,
//       borderRadius: "12px",
//       overflow: "hidden",
//     }),
//     option: (base, state) => ({
//       ...base,
//       background: state.isFocused ? "#eaf7ef" : "#fff",
//       color: "#193b2e",
//       padding: "12px 15px",
//       fontSize: "13px",
//       cursor: "pointer",
//     }),
//   };

//   return (
//     <div className="hp-register">
//       <style>{`
//         * { box-sizing: border-box; }

//         .hp-register {
//           min-height: 100vh;
//           background: #f4f7f3;
//           color: #183b2e;
//           font-family: Inter, Arial, sans-serif;
//           overflow: hidden;
//         }

//         .hp-topbar {
//           height: 78px;
//           padding: 0 7%;
//           background: #fff;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-bottom: 1px solid #e8eee8;
//           position: relative;
//           z-index: 5;
//         }

//         .hp-logo {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           color: #173d2d;
//           font-size: 21px;
//           font-weight: 950;
//           letter-spacing: -.8px;
//           text-decoration: none;
//         }

//         .hp-logo-mark {
//           width: 39px;
//           height: 39px;
//           background: #087b50;
//           color: #fff;
//           display: grid;
//           place-items: center;
//           border-radius: 12px;
//         }

//         .hp-logo span { color: #0b9662; }

//         .hp-top-actions {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//         }

//         .hp-top-label {
//           font-size: 12px;
//           color: #84948a;
//           font-weight: 600;
//         }

//         .hp-login-btn {
//           text-decoration: none;
//           padding: 11px 20px;
//           border-radius: 9px;
//           background: #eaf6ed;
//           color: #087b50;
//           font-size: 12px;
//           font-weight: 900;
//           transition: .2s;
//         }

//         .hp-login-btn:hover {
//           background: #087b50;
//           color: #fff;
//         }

//         /* New full-width hero */
//         .hp-hero {
//           min-height: 285px;
//           background: #075b40;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 48px 20px 75px;
//         }

//         .hp-hero::before {
//           content: "";
//           position: absolute;
//           width: 430px;
//           height: 430px;
//           border: 1px solid rgba(255,255,255,.12);
//           border-radius: 50%;
//           top: -280px;
//           left: calc(50% - 215px);
//           box-shadow: 0 0 0 45px rgba(255,255,255,.025),
//                       0 0 0 90px rgba(255,255,255,.025);
//         }

//         .hp-hero::after {
//           content: "";
//           position: absolute;
//           width: 350px;
//           height: 350px;
//           background: rgba(219,178,94,.13);
//           border-radius: 50%;
//           filter: blur(90px);
//           right: -100px;
//           bottom: -200px;
//         }

//         .hp-hero-content {
//           position: relative;
//           z-index: 1;
//           max-width: 700px;
//         }

//         .hp-hero-kicker {
//           display: inline-flex;
//           align-items: center;
//           gap: 7px;
//           padding: 8px 14px;
//           border: 1px solid rgba(245,218,158,.35);
//           background: rgba(255,255,255,.08);
//           color: #f2d28e;
//           border-radius: 30px;
//           font-size: 10px;
//           font-weight: 900;
//           letter-spacing: 1.5px;
//           margin-bottom: 17px;
//         }

//         .hp-hero h1 {
//           color: #fff;
//           font-size: clamp(32px, 5vw, 48px);
//           font-weight: 950;
//           line-height: 1.1;
//           letter-spacing: -1.5px;
//           margin: 0 0 12px;
//         }

//         .hp-hero h1 span { color: #f0d18d; }

//         .hp-hero p {
//           color: rgba(255,255,255,.76);
//           font-size: 13px;
//           line-height: 1.7;
//           margin: 0;
//         }

//         /* Main page layout */
//         .hp-content {
//           max-width: 1120px;
//           margin: -42px auto 0;
//           padding: 0 22px 75px;
//           position: relative;
//           z-index: 2;
//         }

//         .hp-progress {
//           max-width: 600px;
//           margin: 0 auto 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 13px;
//           background: #fff;
//           padding: 15px 24px;
//           border-radius: 14px;
//           border: 1px solid #e9eee9;
//           box-shadow: 0 8px 25px rgba(25,60,40,.05);
//         }

//         .hp-progress-step {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #087b50;
//           font-size: 10px;
//           font-weight: 900;
//           letter-spacing: .5px;
//         }

//         .hp-progress-number {
//           width: 25px;
//           height: 25px;
//           display: grid;
//           place-items: center;
//           border-radius: 50%;
//           background: #087b50;
//           color: #fff;
//           font-size: 11px;
//         }

//         .hp-progress-line {
//           width: 55px;
//           height: 1px;
//           background: #dce8df;
//         }

//         .hp-card {
//           max-width: 790px;
//           margin: auto;
//           background: #fff;
//           border: 1px solid #e7ede7;
//           border-radius: 22px;
//           box-shadow: 0 20px 60px rgba(24,59,46,.08);
//           overflow: visible;
//         }

//         .hp-card-heading {
//           padding: 28px 36px 23px;
//           border-bottom: 1px solid #edf1ed;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 15px;
//         }

//         .hp-card-heading h2 {
//           margin: 0 0 6px;
//           color: #183b2e;
//           font-size: 22px;
//           font-weight: 950;
//           letter-spacing: -.5px;
//         }

//         .hp-card-heading p {
//           margin: 0;
//           color: #8b9990;
//           font-size: 12px;
//         }

//         .hp-card-heading-icon {
//           width: 48px;
//           height: 48px;
//           flex-shrink: 0;
//           display: grid;
//           place-items: center;
//           background: #edf8f0;
//           color: #087b50;
//           border-radius: 14px;
//         }

//         .hp-form-body { padding: 27px 36px 32px; }

//         .hp-section-title {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           color: #087b50;
//           font-size: 11px;
//           font-weight: 950;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//           margin-bottom: 17px;
//         }

//         .hp-section-title::after {
//           content: "";
//           height: 1px;
//           background: #e8eee9;
//           flex: 1;
//         }

//         .hp-sponsor-box {
//           background: #f6faf6;
//           border: 1px solid #e2ece3;
//           border-radius: 14px;
//           padding: 17px;
//           margin-bottom: 27px;
//         }

//         .hp-sponsor-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 10px;
//         }

//         .hp-sponsor-top label {
//           color: #4d6255;
//           font-size: 11px;
//           font-weight: 900;
//           letter-spacing: .6px;
//         }

//         .hp-optional {
//           color: #9aa69e;
//           font-size: 9px;
//           font-weight: 800;
//         }

//         .hp-sponsor-input { position: relative; }

//         .hp-sponsor-input input {
//           height: 49px;
//           width: 100%;
//           border: 1px solid #dfe8e0;
//           border-radius: 10px;
//           background: #fff;
//           padding: 0 43px 0 14px;
//           outline: none;
//           color: #183b2e;
//           font-size: 14px;
//           font-weight: 750;
//           font-family: monospace;
//         }

//         .hp-sponsor-input input:focus {
//           border-color: #087b50;
//           box-shadow: 0 0 0 3px rgba(8,123,80,.08);
//         }

//         .hp-sponsor-status {
//           position: absolute;
//           right: 14px;
//           top: 14px;
//         }

//         .hp-sponsor-result {
//           font-size: 10px;
//           font-weight: 850;
//           margin: 9px 1px 0;
//           min-height: 12px;
//         }

//         .hp-fields-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 18px;
//           margin-bottom: 27px;
//         }

//         .hp-field { min-width: 0; }

//         .hp-field.full { grid-column: 1 / -1; }

//         .hp-field label {
//           display: block;
//           margin: 0 0 8px 2px;
//           color: #53665b;
//           font-size: 10px;
//           font-weight: 900;
//           letter-spacing: .65px;
//           text-transform: uppercase;
//         }

//         .hp-field-control { position: relative; }

//         .hp-field-icon {
//           position: absolute;
//           z-index: 2;
//           left: 14px;
//           top: 18px;
//           color: #91a197;
//           pointer-events: none;
//         }

//         .hp-field input {
//           width: 100%;
//           height: 56px;
//           border: 1px solid #e1e9e2;
//           border-radius: 11px;
//           outline: none;
//           padding: 0 14px 0 43px;
//           color: #183b2e;
//           background: #fff;
//           font-size: 12px;
//           font-weight: 650;
//           transition: .2s;
//         }

//         .hp-field input::placeholder { color: #a4afa7; font-weight: 500; }

//         .hp-field input:focus {
//           border-color: #11865b;
//           box-shadow: 0 0 0 4px rgba(17,134,91,.07);
//         }

//         .hp-submit {
//           width: 100%;
//           height: 57px;
//           border: 0;
//           border-radius: 11px;
//           background: #087b50;
//           color: #fff;
//           font-size: 12px;
//           font-weight: 950;
//           letter-spacing: 1.2px;
//           cursor: pointer;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 10px;
//           transition: .2s;
//           box-shadow: 0 9px 20px rgba(8,123,80,.17);
//         }

//         .hp-submit:hover:not(:disabled) {
//           background: #05613f;
//           transform: translateY(-2px);
//         }

//         .hp-submit:disabled {
//           opacity: .65;
//           cursor: not-allowed;
//         }

//         .hp-privacy {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           color: #98a49b;
//           font-size: 10px;
//           font-weight: 650;
//           margin-top: 17px;
//         }

//         .hp-bottom-login {
//           text-align: center;
//           margin-top: 23px;
//           color: #89968d;
//           font-size: 12px;
//         }

//         .hp-bottom-login a {
//           color: #087b50;
//           font-weight: 900;
//           text-decoration: none;
//         }

//         .hp-footer {
//           background: #fff;
//           border-top: 1px solid #e7ede7;
//           padding: 22px 15px;
//           text-align: center;
//           color: #98a49b;
//           font-size: 10px;
//         }

//         /* Success popup */
//         .hp-modal-overlay {
//           position: fixed;
//           inset: 0;
//           z-index: 2000;
//           padding: 18px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(8,35,24,.75);
//           backdrop-filter: blur(7px);
//         }

//         .hp-modal {
//           width: 100%;
//           max-width: 420px;
//           max-height: 90vh;
//           overflow-y: auto;
//           background: #fff;
//           border-radius: 22px;
//           padding: 30px 25px;
//           text-align: center;
//           box-shadow: 0 25px 80px rgba(0,0,0,.22);
//           animation: hpModalIn .3s ease;
//         }

//         @keyframes hpModalIn {
//           from { opacity: 0; transform: translateY(15px) scale(.96); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .hp-success-mark {
//           width: 72px;
//           height: 72px;
//           margin: 0 auto 17px;
//           display: grid;
//           place-items: center;
//           background: #eaf8ee;
//           color: #078653;
//           border: 1px solid #d2efda;
//           border-radius: 21px;
//         }

//         .hp-modal h2 {
//           color: #173b2d;
//           font-size: 23px;
//           font-weight: 950;
//           margin: 0 0 7px;
//         }

//         .hp-modal h2 span { color: #078653; }

//         .hp-modal-sub {
//           color: #87958c;
//           font-size: 11px;
//           margin: 0 0 22px;
//         }

//         .hp-credentials {
//           padding: 17px;
//           background: #f6faf6;
//           border: 1px solid #e1ebe2;
//           border-radius: 13px;
//           text-align: left;
//           margin-bottom: 15px;
//         }

//         .hp-credential-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 10px;
//         }

//         .hp-credential-row + .hp-credential-row {
//           border-top: 1px solid #e1eae2;
//           padding-top: 13px;
//           margin-top: 13px;
//         }

//         .hp-credential-label {
//           color: #89968d;
//           font-size: 9px;
//           font-weight: 900;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//           margin-bottom: 5px;
//         }

//         .hp-credential-value {
//           color: #087b50;
//           font-size: 13px;
//           font-family: monospace;
//           font-weight: 900;
//           overflow-wrap: anywhere;
//         }

//         .hp-copy {
//           width: 32px;
//           height: 32px;
//           flex-shrink: 0;
//           display: grid;
//           place-items: center;
//           border: 1px solid #dce8de;
//           border-radius: 8px;
//           background: #fff;
//           color: #087b50;
//           cursor: pointer;
//         }

//         .hp-warning {
//           background: #fff8e8;
//           color: #a8791d;
//           border: 1px solid #f1e0b8;
//           border-radius: 9px;
//           padding: 11px;
//           font-size: 10px;
//           font-weight: 800;
//           margin-bottom: 16px;
//         }

//         .hp-proceed {
//           width: 100%;
//           height: 51px;
//           border: 0;
//           border-radius: 10px;
//           background: #173b2d;
//           color: #fff;
//           font-size: 11px;
//           font-weight: 900;
//           letter-spacing: 1px;
//           cursor: pointer;
//         }

//         .hp-proceed:hover { background: #087b50; }

//         @keyframes hpSpin { to { transform: rotate(360deg); } }

//         @media(max-width: 700px) {
//           .hp-topbar { height: 68px; padding: 0 18px; }
//           .hp-logo { font-size: 17px; }
//           .hp-top-label { display: none; }
//           .hp-hero { min-height: 250px; padding: 40px 20px 65px; }
//           .hp-content { padding: 0 14px 50px; }
//           .hp-card-heading { padding: 22px 20px; }
//           .hp-form-body { padding: 22px 20px 25px; }
//           .hp-progress { padding: 13px 10px; gap: 8px; }
//           .hp-progress-line { width: 25px; }
//           .hp-progress-step { font-size: 8px; gap: 5px; }
//           .hp-progress-number { width: 22px; height: 22px; }
//         }

//         @media(max-width: 480px) {
//           .hp-fields-grid { grid-template-columns: 1fr; gap: 15px; }
//           .hp-field.full { grid-column: auto; }
//           .hp-card-heading h2 { font-size: 19px; }
//           .hp-card-heading-icon { width: 42px; height: 42px; }
//           .hp-hero h1 { font-size: 34px; }
//           .hp-hero p { font-size: 12px; }
//           .hp-progress { gap: 5px; }
//           .hp-progress-line { width: 15px; }
//           .hp-progress-step { font-size: 7px; }
//           .hp-form-body { padding: 20px 15px 23px; }
//           .hp-modal { padding: 26px 17px; }
//         }
//       `}</style>

//       {/* Top navigation */}
//       <header className="hp-topbar">
//         <Link to="/" className="hp-logo">
//           <span className="hp-logo-mark">
//             <Globe size={21} />
//           </span>
//           HELPING<span>POOLS</span>
//         </Link>

//         <div className="hp-top-actions">
//           <span className="hp-top-label">Already a member?</span>
//           <Link to="/login" className="hp-login-btn">
//             LOGIN <ChevronRight size={13} style={{ display: "inline" }} />
//           </Link>
//         </div>
//       </header>

//       {/* Full width hero */}
//       <section className="hp-hero">
//         <div className="hp-hero-content">
//           <div className="hp-hero-kicker">
//             <Sparkles size={13} />
//             YOUR COMMUNITY STARTS HERE
//           </div>

//           <h1>
//             Create Your <span>Account</span>
//           </h1>

//           <p>
//             Join Helping Pools and become part of our growing global
//             community.
//           </p>
//         </div>
//       </section>

//       {/* Registration card */}
//       <main className="hp-content">
//         <div className="hp-progress">
//           <div className="hp-progress-step">
//             <span className="hp-progress-number">1</span>
//             YOUR DETAILS
//           </div>

//           <div className="hp-progress-line" />

//           <div className="hp-progress-step">
//             <span className="hp-progress-number">2</span>
//             CREATE ACCOUNT
//           </div>

//           <div className="hp-progress-line" />

//           <div className="hp-progress-step">
//             <span className="hp-progress-number">3</span>
//             GET LOGIN
//           </div>
//         </div>

//         <section className="hp-card">
//           <div className="hp-card-heading">
//             <div>
//               <h2>Registration Details</h2>
//               <p>Fill in the information to register your account.</p>
//             </div>

//             <div className="hp-card-heading-icon">
//               <BadgeCheck size={25} />
//             </div>
//           </div>

//           <div className="hp-form-body">
//             {errorMsg && (
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: 9,
//                   padding: "13px 15px",
//                   marginBottom: 20,
//                   borderRadius: 10,
//                   background: "#fff1f1",
//                   color: "#c53030",
//                   border: "1px solid #fecaca",
//                   fontSize: 12,
//                   fontWeight: 700,
//                 }}
//               >
//                 <XCircle size={17} style={{ flexShrink: 0 }} />
//                 {errorMsg}
//               </div>
//             )}

//             {/* Sponsor section */}
//             <div className="hp-section-title">
//               <Users size={16} />
//               Sponsor Information
//             </div>

//             <div className="hp-sponsor-box">
//               <div className="hp-sponsor-top">
//                 <label>Referral Sponsor ID</label>
//                 <span className="hp-optional">REFERRAL</span>
//               </div>

//               <div className="hp-sponsor-input">
//                 <input
//                   type="text"
//                   value={sponsorId}
//                   placeholder="Enter sponsor ID"
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, "");
//                     setSponsorId(value);
//                     fetchSponsorName(value);
//                   }}
//                 />

//                 <div className="hp-sponsor-status">
//                   {sponsorName === "Invalid Sponsor" && (
//                     <XCircle size={19} color="#dc2626" />
//                   )}

//                   {sponsorName && sponsorName !== "Invalid Sponsor" && (
//                     <CheckCircle2 size={19} color="#078653" />
//                   )}
//                 </div>
//               </div>

//               <p
//                 className="hp-sponsor-result"
//                 style={{
//                   color:
//                     sponsorName === "Invalid Sponsor"
//                       ? "#dc2626"
//                       : "#078653",
//                 }}
//               >
//                 {sponsorName
//                   ? sponsorName === "Invalid Sponsor"
//                     ? "Sponsor not found"
//                     : `Verified sponsor: ${sponsorName}`
//                   : " "}
//               </p>
//             </div>

//             {/* Personal details */}
//             <div className="hp-section-title">
//               <User size={16} />
//               Personal Information
//             </div>

//             <form onSubmit={handleRegister}>
//               <div className="hp-fields-grid">
//                 <div className="hp-field">
//                   <label>Full Name</label>
//                   <div className="hp-field-control">
//                     <User className="hp-field-icon" size={18} />
//                     <input
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={name}
//                       onChange={(e) =>
//                         setName(
//                           e.target.value.replace(/[^A-Za-z\s]/g, "")
//                         )
//                       }
//                       autoComplete="name"
//                     />
//                   </div>
//                 </div>

//                 <div className="hp-field">
//                   <label>Email Address</label>
//                   <div className="hp-field-control">
//                     <Mail className="hp-field-icon" size={18} />
//                     <input
//                       type="email"
//                       placeholder="Enter Gmail address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       autoComplete="email"
//                     />
//                   </div>
//                 </div>

//                 <div className="hp-field">
//                   <label>Country</label>
//                   <div className="hp-field-control">
//                     <Globe
//                       className="hp-field-icon"
//                       size={18}
//                       style={{ zIndex: 3 }}
//                     />

//                     <Select
//                       options={countryOptions}
//                       value={
//                         countryOptions.find(
//                           (item) => item.value === country
//                         ) || null
//                       }
//                       onChange={(selected) =>
//                         setCountry(selected ? selected.value : "")
//                       }
//                       styles={selectStyles}
//                       placeholder="Choose your country"
//                       isSearchable={false}
//                     />
//                   </div>
//                 </div>

//                 <div className="hp-field">
//                   <label>Mobile Number</label>
//                   <div className="hp-field-control">
//                     <Phone className="hp-field-icon" size={18} />
//                     <input
//                       type="tel"
//                       placeholder="Enter mobile number"
//                       value={mobile}
//                       onChange={handleMobileChange}
//                       inputMode="numeric"
//                       autoComplete="tel"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Wallet section */}
//               <div className="hp-section-title">
//                 <Wallet size={16} />
//                 Withdrawal Wallet
//               </div>

//               <div className="hp-fields-grid" style={{ marginBottom: 22 }}>
//                 <div className="hp-field full">
//                   <label>USDT BEP20 Wallet Address</label>
//                   <div className="hp-field-control">
//                     <Wallet className="hp-field-icon" size={18} />
//                     <input
//                       type="text"
//                       placeholder="Enter BEP20 wallet address (0x...)"
//                       value={walletAddress}
//                       onChange={(e) => setWalletAddress(e.target.value)}
//                       autoComplete="off"
//                       spellCheck="false"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="hp-submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw
//                       size={17}
//                       style={{ animation: "hpSpin 1s linear infinite" }}
//                     />
//                     CREATING YOUR ACCOUNT...
//                   </>
//                 ) : (
//                   <>
//                     COMPLETE REGISTRATION
//                     <ArrowRight size={18} />
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="hp-privacy">
//               <LockKeyhole size={13} />
//               Your registration details are submitted securely.
//             </div>

//             <div className="hp-bottom-login">
//               Already registered? <Link to="/login">Login to your account</Link>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="hp-footer">
//         © {new Date().getFullYear()} Helping Pools. All rights reserved.
//       </footer>

//       {/* Success modal - original backend response */}
//       {showPopup && registeredData && (
//         <div className="hp-modal-overlay">
//           {showConfetti && (
//             <Confetti
//               width={window.innerWidth}
//               height={window.innerHeight}
//               recycle={false}
//               numberOfPieces={250}
//             />
//           )}

//           <div className="hp-modal">
//             <div className="hp-success-mark">
//               <CheckCircle2 size={41} />
//             </div>

//             <h2>
//               ACCOUNT <span>CREATED!</span>
//             </h2>

//             <p className="hp-modal-sub">
//               Welcome to Helping Pools, {registeredData.name}
//             </p>

//             <div className="hp-credentials">
//               <div className="hp-credential-row">
//                 <div>
//                   <div className="hp-credential-label">Your User ID</div>
//                   <div className="hp-credential-value">
//                     {registeredData.userId}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="hp-copy"
//                   onClick={() => copyToClipboard(registeredData.userId)}
//                   aria-label="Copy user ID"
//                 >
//                   <Copy size={15} />
//                 </button>
//               </div>

//               <div className="hp-credential-row">
//                 <div style={{ minWidth: 0 }}>
//                   <div className="hp-credential-label">Your Password</div>
//                   <div className="hp-credential-value">
//                     {registeredData.password}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="hp-copy"
//                   onClick={() => copyToClipboard(registeredData.password)}
//                   aria-label="Copy password"
//                 >
//                   <Copy size={15} />
//                 </button>
//               </div>
//             </div>

//             <div className="hp-warning">
//               ⚠ Save or screenshot your User ID and Password before continuing.
//             </div>

//             <button
//               type="button"
//               className="hp-proceed"
//               onClick={handlePopupClose}
//             >
//               PROCEED TO LOGIN <ArrowRight size={15} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Register;



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Select from "react-select";
import Confetti from "react-confetti";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import {
  Globe,
  Users,
  User,
  Mail,
  Phone,
  Wallet,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Copy,
  Sparkles,
  LockKeyhole,
  BadgeCheck,
  RefreshCw,
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // New popup states
  const [showPassword, setShowPassword] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");

  const countryOptions = [
    { value: "India", label: "India (+91)" },
    { value: "USA", label: "United States (+1)" },
    { value: "UK", label: "United Kingdom (+44)" },
    { value: "UAE", label: "UAE (+971)" },
    { value: "Australia", label: "Australia (+61)" },
    { value: "Canada", label: "Canada (+1)" },
    { value: "Singapore", label: "Singapore (+65)" },
    { value: "Malaysia", label: "Malaysia (+60)" },
    { value: "PK", label: "Pakistan (+92)" },
    { value: "Bangladesh", label: "Bangladesh (+880)" },
    { value: "Nepal", label: "Nepal (+977)" },
    { value: "South Africa", label: "South Africa (+27)" },
    { value: "Nigeria", label: "Nigeria (+234)" },
    { value: "Saudi Arabia", label: "Saudi Arabia (+966)" },
    { value: "Qatar", label: "Qatar (+974)" },
    { value: "Oman", label: "Oman (+968)" },
    { value: "Kuwait", label: "Kuwait (+965)" },
    { value: "Bahrain", label: "Bahrain (+973)" },
    { value: "Germany", label: "Germany (+49)" },
    { value: "France", label: "France (+33)" },
    { value: "Italy", label: "Italy (+39)" },
    { value: "Spain", label: "Spain (+34)" },
    { value: "Netherlands", label: "Netherlands (+31)" },
    { value: "Ireland", label: "Ireland (+353)" },
    { value: "Switzerland", label: "Switzerland (+41)" },
    { value: "New Zealand", label: "New Zealand (+64)" },
    { value: "Sri Lanka", label: "Sri Lanka (+94)" },
    { value: "China", label: "China (+86)" },
    { value: "Japan", label: "Japan (+81)" },
    { value: "South Korea", label: "South Korea (+82)" },
    { value: "Indonesia", label: "Indonesia (+62)" },
    { value: "Philippines", label: "Philippines (+63)" },
    { value: "Thailand", label: "Thailand (+66)" },
    { value: "Vietnam", label: "Vietnam (+84)" },
    { value: "Mexico", label: "Mexico (+52)" },
    { value: "Brazil", label: "Brazil (+55)" },
  ];

  // Referral URL behavior
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setSponsorId(ref);
      fetchSponsorName(ref);
    }
  }, [location.search]);

  // Sponsor API
  const fetchSponsorName = async (id) => {
    if (id.length < 3) {
      setSponsorName("");
      return;
    }

    try {
      const res = await api.get(
        `/user/sponsor-name/${id}?t=${new Date().getTime()}`
      );
      setSponsorName(res.data.name);
    } catch {
      setSponsorName("Invalid Sponsor");
    }
  };

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^0+/, "");

    if (value.length > 15) value = value.slice(0, 15);
    setMobile(value);
  };

  // Registration backend flow - unchanged
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMobile = mobile.trim();
    const cleanWallet = walletAddress.trim();

    if (
      !cleanName ||
      !cleanMobile ||
      !cleanEmail ||
      !country ||
      !cleanWallet
    ) {
      setErrorMsg(
        "All fields, including the BEP20 Wallet Address, are required."
      );
      return;
    }

    const nameRegex = /^[A-Za-z\s]{3,50}$/;

    if (!nameRegex.test(cleanName)) {
      setErrorMsg(
        "Invalid Name. Only alphabets are allowed (No symbols or numbers)."
      );
      return;
    }

    if (!cleanEmail.toLowerCase().endsWith("@gmail.com")) {
      setErrorMsg("Only @gmail.com emails are accepted.");
      return;
    }

    if (country === "India" && cleanMobile.length !== 10) {
      setErrorMsg("Mobile number must be exactly 10 digits for India.");
      return;
    } else if (
      cleanMobile.length < 10 ||
      cleanMobile.length > 15
    ) {
      setErrorMsg("Mobile number must be between 10 to 15 digits.");
      return;
    }

    if (!/^0x[a-fA-F0-9]{28,48}$/.test(cleanWallet)) {
      setErrorMsg(
        'Invalid Wallet Address. It must start with "0x" and be a valid length.'
      );
      return;
    }

    setLoading(true);

    try {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      const visitorId = result.visitorId;

      // Same endpoint and exact original payload
      const response = await api.post("/auth/register", {
        name: cleanName,
        mobile: cleanMobile,
        email: cleanEmail,
        country,
        sponsorId,
        walletAddress: cleanWallet,
        deviceId: visitorId,
      });

      // Backend-generated credentials
      setRegisteredData({
        userId: response.data.userId,
        password: response.data.password,
        name: response.data.name || cleanName,
      });

      setShowPopup(true);
      setShowConfetti(true);
      setShowPassword(true);
      setLoading(false);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Registration failed. Please check your details and try again."
      );
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowConfetti(false);
    navigate("/login");
  };

  // Copy credentials
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(String(text));
      setCopyMessage(`${label} copied successfully!`);

      setTimeout(() => {
        setCopyMessage("");
      }, 2200);
    } catch {
      setCopyMessage("Unable to copy. Please copy manually.");
      setTimeout(() => setCopyMessage(""), 2200);
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "56px",
      borderRadius: "12px",
      border: state.isFocused
        ? "1px solid #11865b"
        : "1px solid #e3eae5",
      background: "#fff",
      boxShadow: state.isFocused
        ? "0 0 0 4px rgba(17,134,91,.08)"
        : "none",
      paddingLeft: "37px",
      cursor: "pointer",
      "&:hover": { borderColor: "#11865b" },
    }),

    singleValue: (base) => ({
      ...base,
      color: "#193b2e",
      fontWeight: 650,
      fontSize: "13px",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9aa79f",
      fontSize: "13px",
    }),

    menu: (base) => ({
      ...base,
      zIndex: 100,
      borderRadius: "12px",
      overflow: "hidden",
    }),

    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "#eaf7ef" : "#fff",
      color: "#193b2e",
      padding: "12px 15px",
      fontSize: "13px",
      cursor: "pointer",
    }),
  };

  return (
    <div className="hp-register">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .hp-register {
          min-height: 100vh;
          background: #f4f7f3;
          color: #183b2e;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
        }

        .hp-topbar {
          height: 78px;
          padding: 0 7%;
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e8eee8;
          position: relative;
          z-index: 5;
        }

        .hp-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #173d2d;
          font-size: 21px;
          font-weight: 950;
          letter-spacing: -.8px;
          text-decoration: none;
        }

        .hp-logo-mark {
          width: 39px;
          height: 39px;
          background: #087b50;
          color: #fff;
          display: grid;
          place-items: center;
          border-radius: 12px;
        }

        .hp-logo span {
          color: #0b9662;
        }

        .hp-top-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hp-top-label {
          font-size: 12px;
          color: #84948a;
          font-weight: 600;
        }

        .hp-login-btn {
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 9px;
          background: #eaf6ed;
          color: #087b50;
          font-size: 12px;
          font-weight: 900;
          transition: .2s;
        }

        .hp-login-btn:hover {
          background: #087b50;
          color: #fff;
        }

        .hp-hero {
          min-height: 285px;
          background: #075b40;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 20px 75px;
        }

        .hp-hero::before {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          top: -280px;
          left: calc(50% - 215px);
          box-shadow:
            0 0 0 45px rgba(255,255,255,.025),
            0 0 0 90px rgba(255,255,255,.025);
        }

        .hp-hero::after {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          background: rgba(219,178,94,.13);
          border-radius: 50%;
          filter: blur(90px);
          right: -100px;
          bottom: -200px;
        }

        .hp-hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
        }

        .hp-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border: 1px solid rgba(245,218,158,.35);
          background: rgba(255,255,255,.08);
          color: #f2d28e;
          border-radius: 30px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          margin-bottom: 17px;
        }

        .hp-hero h1 {
          color: #fff;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 950;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 0 0 12px;
        }

        .hp-hero h1 span {
          color: #f0d18d;
        }

        .hp-hero p {
          color: rgba(255,255,255,.76);
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
        }

        .hp-content {
          max-width: 1120px;
          margin: -42px auto 0;
          padding: 0 22px 75px;
          position: relative;
          z-index: 2;
        }

        .hp-progress {
          max-width: 600px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          background: #fff;
          padding: 15px 24px;
          border-radius: 14px;
          border: 1px solid #e9eee9;
          box-shadow: 0 8px 25px rgba(25,60,40,.05);
        }

        .hp-progress-step {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #087b50;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .5px;
        }

        .hp-progress-number {
          width: 25px;
          height: 25px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #087b50;
          color: #fff;
          font-size: 11px;
        }

        .hp-progress-line {
          width: 55px;
          height: 1px;
          background: #dce8df;
        }

        .hp-card {
          max-width: 790px;
          margin: auto;
          background: #fff;
          border: 1px solid #e7ede7;
          border-radius: 22px;
          box-shadow: 0 20px 60px rgba(24,59,46,.08);
          overflow: visible;
        }

        .hp-card-heading {
          padding: 28px 36px 23px;
          border-bottom: 1px solid #edf1ed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .hp-card-heading h2 {
          margin: 0 0 6px;
          color: #183b2e;
          font-size: 22px;
          font-weight: 950;
          letter-spacing: -.5px;
        }

        .hp-card-heading p {
          margin: 0;
          color: #8b9990;
          font-size: 12px;
        }

        .hp-card-heading-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #edf8f0;
          color: #087b50;
          border-radius: 14px;
        }

        .hp-form-body {
          padding: 27px 36px 32px;
        }

        .hp-section-title {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #087b50;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 17px;
        }

        .hp-section-title::after {
          content: "";
          height: 1px;
          background: #e8eee9;
          flex: 1;
        }

        .hp-sponsor-box {
          background: #f6faf6;
          border: 1px solid #e2ece3;
          border-radius: 14px;
          padding: 17px;
          margin-bottom: 27px;
        }

        .hp-sponsor-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .hp-sponsor-top label {
          color: #4d6255;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .6px;
        }

        .hp-optional {
          color: #9aa69e;
          font-size: 9px;
          font-weight: 800;
        }

        .hp-sponsor-input {
          position: relative;
        }

        .hp-sponsor-input input {
          height: 49px;
          width: 100%;
          border: 1px solid #dfe8e0;
          border-radius: 10px;
          background: #fff;
          padding: 0 43px 0 14px;
          outline: none;
          color: #183b2e;
          font-size: 14px;
          font-weight: 750;
          font-family: monospace;
        }

        .hp-sponsor-input input:focus {
          border-color: #087b50;
          box-shadow: 0 0 0 3px rgba(8,123,80,.08);
        }

        .hp-sponsor-status {
          position: absolute;
          right: 14px;
          top: 14px;
        }

        .hp-sponsor-result {
          font-size: 10px;
          font-weight: 850;
          margin: 9px 1px 0;
          min-height: 12px;
        }

        .hp-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 27px;
        }

        .hp-field {
          min-width: 0;
        }

        .hp-field.full {
          grid-column: 1 / -1;
        }

        .hp-field label {
          display: block;
          margin: 0 0 8px 2px;
          color: #53665b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .65px;
          text-transform: uppercase;
        }

        .hp-field-control {
          position: relative;
        }

        .hp-field-icon {
          position: absolute;
          z-index: 2;
          left: 14px;
          top: 18px;
          color: #91a197;
          pointer-events: none;
        }

        .hp-field input {
          width: 100%;
          height: 56px;
          border: 1px solid #e1e9e2;
          border-radius: 11px;
          outline: none;
          padding: 0 14px 0 43px;
          color: #183b2e;
          background: #fff;
          font-size: 12px;
          font-weight: 650;
          transition: .2s;
        }

        .hp-field input::placeholder {
          color: #a4afa7;
          font-weight: 500;
        }

        .hp-field input:focus {
          border-color: #11865b;
          box-shadow: 0 0 0 4px rgba(17,134,91,.07);
        }

        .hp-submit {
          width: 100%;
          height: 57px;
          border: 0;
          border-radius: 11px;
          background: #087b50;
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1.2px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          transition: .2s;
          box-shadow: 0 9px 20px rgba(8,123,80,.17);
        }

        .hp-submit:hover:not(:disabled) {
          background: #05613f;
          transform: translateY(-2px);
        }

        .hp-submit:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .hp-privacy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #98a49b;
          font-size: 10px;
          font-weight: 650;
          margin-top: 17px;
        }

        .hp-bottom-login {
          text-align: center;
          margin-top: 23px;
          color: #89968d;
          font-size: 12px;
        }

        .hp-bottom-login a {
          color: #087b50;
          font-weight: 900;
          text-decoration: none;
        }

        .hp-footer {
          background: #fff;
          border-top: 1px solid #e7ede7;
          padding: 22px 15px;
          text-align: center;
          color: #98a49b;
          font-size: 10px;
        }

        /* NEW PREMIUM SUCCESS POPUP */

        .hp-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(3,20,14,.88);
          backdrop-filter: blur(12px);
        }

        .hp-modal {
          position: relative;
          width: 100%;
          max-width: 470px;
          max-height: 92vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 25px;
          text-align: center;
          box-shadow: 0 30px 100px rgba(0,0,0,.35);
          animation: hpModalIn .4s cubic-bezier(.2,.8,.2,1);
        }

        .hp-modal-top {
          position: relative;
          overflow: hidden;
          padding: 35px 25px 30px;
          color: #fff;
          background: linear-gradient(135deg,#06452f,#087b50,#0c9662);
        }

        .hp-modal-top::before,
        .hp-modal-top::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          pointer-events: none;
        }

        .hp-modal-top::before {
          width: 240px;
          height: 240px;
          top: -150px;
          left: -70px;
        }

        .hp-modal-top::after {
          width: 190px;
          height: 190px;
          right: -80px;
          bottom: -125px;
        }

        .hp-success-mark {
          position: relative;
          z-index: 1;
          width: 82px;
          height: 82px;
          margin: 0 auto 17px;
          display: grid;
          place-items: center;
          color: #07583b;
          background: #f4d58f;
          border: 6px solid rgba(255,255,255,.18);
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          animation: hpSuccessPop .6s ease;
        }

        .hp-modal h2 {
          position: relative;
          z-index: 1;
          color: #fff;
          font-size: 27px;
          font-weight: 950;
          letter-spacing: -.7px;
          margin: 0 0 9px;
        }

        .hp-modal h2 span {
          color: #f4d58f;
        }

        .hp-modal-sub {
          position: relative;
          z-index: 1;
          color: rgba(255,255,255,.78);
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        .hp-modal-body {
          padding: 27px 27px 25px;
        }

        .hp-account-label {
          color: #819087;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-align: left;
          margin-bottom: 13px;
        }

        .hp-credentials {
          display: grid;
          gap: 12px;
          margin-bottom: 17px;
        }

        .hp-credential-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f4f9f5;
          border: 1px solid #e0ebe2;
          border-radius: 13px;
          text-align: left;
        }

        .hp-credential-info {
          min-width: 0;
          flex: 1;
        }

        .hp-credential-label {
          color: #89978d;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.2px;
          margin-bottom: 7px;
        }

        .hp-credential-value {
          color: #075b3d;
          font-size: 15px;
          font-family: monospace;
          font-weight: 900;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .hp-copy {
          min-width: 39px;
          height: 39px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid #d4e6d8;
          border-radius: 10px;
          background: #fff;
          color: #087b50;
          cursor: pointer;
          transition: .2s;
        }

        .hp-copy:hover {
          background: #087b50;
          color: #fff;
          border-color: #087b50;
          transform: translateY(-2px);
        }

        .hp-password-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #087b50;
          font-size: 10px;
          font-weight: 850;
          cursor: pointer;
        }

        .hp-copy-message {
          padding: 10px 12px;
          margin-bottom: 14px;
          border-radius: 9px;
          background: #eaf8ee;
          color: #087b50;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
        }

        .hp-warning {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px;
          margin-bottom: 19px;
          text-align: left;
          color: #926719;
          background: #fff8e8;
          border: 1px solid #f1dfb6;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 750;
          line-height: 1.6;
        }

        .hp-warning-icon {
          flex-shrink: 0;
          font-size: 17px;
        }

        .hp-proceed {
          width: 100%;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: 12px;
          color: #fff;
          background: linear-gradient(135deg,#075b3d,#0a9660);
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(8,123,80,.2);
          transition: .2s;
        }

        .hp-proceed:hover {
          transform: translateY(-2px);
          box-shadow: 0 13px 27px rgba(8,123,80,.28);
        }

        .hp-modal-footer {
          color: #9aa69e;
          font-size: 9px;
          margin-top: 16px;
        }

        @keyframes hpModalIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes hpSuccessPop {
          0% {
            transform: scale(.5);
            opacity: 0;
          }
          70% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes hpSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media(max-width:700px) {
          .hp-topbar {
            height: 68px;
            padding: 0 18px;
          }

          .hp-logo {
            font-size: 17px;
          }

          .hp-top-label {
            display: none;
          }

          .hp-hero {
            min-height: 250px;
            padding: 40px 20px 65px;
          }

          .hp-content {
            padding: 0 14px 50px;
          }

          .hp-card-heading {
            padding: 22px 20px;
          }

          .hp-form-body {
            padding: 22px 20px 25px;
          }

          .hp-progress {
            padding: 13px 10px;
            gap: 8px;
          }

          .hp-progress-line {
            width: 25px;
          }

          .hp-progress-step {
            font-size: 8px;
            gap: 5px;
          }

          .hp-progress-number {
            width: 22px;
            height: 22px;
          }
        }

        @media(max-width:480px) {
          .hp-fields-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .hp-field.full {
            grid-column: auto;
          }

          .hp-card-heading h2 {
            font-size: 19px;
          }

          .hp-card-heading-icon {
            width: 42px;
            height: 42px;
          }

          .hp-hero h1 {
            font-size: 34px;
          }

          .hp-hero p {
            font-size: 12px;
          }

          .hp-progress {
            gap: 5px;
          }

          .hp-progress-line {
            width: 15px;
          }

          .hp-progress-step {
            font-size: 7px;
          }

          .hp-form-body {
            padding: 20px 15px 23px;
          }

          .hp-modal {
            max-width: 390px;
            border-radius: 21px;
          }

          .hp-modal-top {
            padding: 30px 18px 25px;
          }

          .hp-modal h2 {
            font-size: 23px;
          }

          .hp-modal-body {
            padding: 22px 17px;
          }

          .hp-credential-value {
            font-size: 13px;
          }
        }
      `}</style>

      {/* TOP NAVIGATION */}
      <header className="hp-topbar">
        <Link to="/" className="hp-logo">
          <span className="hp-logo-mark">
            <Globe size={21} />
          </span>
          HELPING<span>POOLS</span>
        </Link>

        <div className="hp-top-actions">
          <span className="hp-top-label">Already a member?</span>

          <Link to="/login" className="hp-login-btn">
            LOGIN <ChevronRight size={13} style={{ display: "inline" }} />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-hero-content">
          <div className="hp-hero-kicker">
            <Sparkles size={13} />
            YOUR COMMUNITY STARTS HERE
          </div>

          <h1>
            Create Your <span>Account</span>
          </h1>

          <p>
            Join Helping Pools and become part of our growing global
            community.
          </p>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <main className="hp-content">
        <div className="hp-progress">
          <div className="hp-progress-step">
            <span className="hp-progress-number">1</span>
            YOUR DETAILS
          </div>

          <div className="hp-progress-line" />

          <div className="hp-progress-step">
            <span className="hp-progress-number">2</span>
            CREATE ACCOUNT
          </div>

          <div className="hp-progress-line" />

          <div className="hp-progress-step">
            <span className="hp-progress-number">3</span>
            GET LOGIN
          </div>
        </div>

        <section className="hp-card">
          <div className="hp-card-heading">
            <div>
              <h2>Registration Details</h2>
              <p>Fill in the information to register your account.</p>
            </div>

            <div className="hp-card-heading-icon">
              <BadgeCheck size={25} />
            </div>
          </div>

          <div className="hp-form-body">
            {errorMsg && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  padding: "13px 15px",
                  marginBottom: 20,
                  borderRadius: 10,
                  background: "#fff1f1",
                  color: "#c53030",
                  border: "1px solid #fecaca",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <XCircle size={17} style={{ flexShrink: 0 }} />
                {errorMsg}
              </div>
            )}

            {/* SPONSOR */}
            <div className="hp-section-title">
              <Users size={16} />
              Sponsor Information
            </div>

            <div className="hp-sponsor-box">
              <div className="hp-sponsor-top">
                <label>Referral Sponsor ID</label>
                <span className="hp-optional">REFERRAL</span>
              </div>

              <div className="hp-sponsor-input">
                <input
                  type="text"
                  value={sponsorId}
                  placeholder="Enter sponsor ID"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setSponsorId(value);
                    fetchSponsorName(value);
                  }}
                />

                <div className="hp-sponsor-status">
                  {sponsorName === "Invalid Sponsor" && (
                    <XCircle size={19} color="#dc2626" />
                  )}

                  {sponsorName && sponsorName !== "Invalid Sponsor" && (
                    <CheckCircle2 size={19} color="#078653" />
                  )}
                </div>
              </div>

              <p
                className="hp-sponsor-result"
                style={{
                  color:
                    sponsorName === "Invalid Sponsor"
                      ? "#dc2626"
                      : "#078653",
                }}
              >
                {sponsorName
                  ? sponsorName === "Invalid Sponsor"
                    ? "Sponsor not found"
                    : `Verified sponsor: ${sponsorName}`
                  : " "}
              </p>
            </div>

            {/* PERSONAL DETAILS */}
            <div className="hp-section-title">
              <User size={16} />
              Personal Information
            </div>

            <form onSubmit={handleRegister}>
              <div className="hp-fields-grid">
                <div className="hp-field">
                  <label>Full Name</label>

                  <div className="hp-field-control">
                    <User className="hp-field-icon" size={18} />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value.replace(/[^A-Za-z\s]/g, "")
                        )
                      }
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="hp-field">
                  <label>Email Address</label>

                  <div className="hp-field-control">
                    <Mail className="hp-field-icon" size={18} />

                    <input
                      type="email"
                      placeholder="Enter Gmail address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="hp-field">
                  <label>Country</label>

                  <div className="hp-field-control">
                    <Globe
                      className="hp-field-icon"
                      size={18}
                      style={{ zIndex: 3 }}
                    />

                    <Select
                      options={countryOptions}
                      value={
                        countryOptions.find(
                          (item) => item.value === country
                        ) || null
                      }
                      onChange={(selected) =>
                        setCountry(selected ? selected.value : "")
                      }
                      styles={selectStyles}
                      placeholder="Choose your country"
                      isSearchable={false}
                    />
                  </div>
                </div>

                <div className="hp-field">
                  <label>Mobile Number</label>

                  <div className="hp-field-control">
                    <Phone className="hp-field-icon" size={18} />

                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={handleMobileChange}
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {/* WALLET */}
              <div className="hp-section-title">
                <Wallet size={16} />
                Withdrawal Wallet
              </div>

              <div
                className="hp-fields-grid"
                style={{ marginBottom: 22 }}
              >
                <div className="hp-field full">
                  <label>USDT BEP20 Wallet Address</label>

                  <div className="hp-field-control">
                    <Wallet className="hp-field-icon" size={18} />

                    <input
                      type="text"
                      placeholder="Enter BEP20 wallet address (0x...)"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="hp-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw
                      size={17}
                      style={{
                        animation: "hpSpin 1s linear infinite",
                      }}
                    />
                    CREATING YOUR ACCOUNT...
                  </>
                ) : (
                  <>
                    COMPLETE REGISTRATION
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="hp-privacy">
              <LockKeyhole size={13} />
              Your registration details are submitted securely.
            </div>

            <div className="hp-bottom-login">
              Already registered?{" "}
              <Link to="/login">Login to your account</Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="hp-footer">
        © {new Date().getFullYear()} Helping Pools. All rights reserved.
      </footer>

      {/* NEW SUCCESS POPUP */}
      {showPopup && registeredData && (
        <div className="hp-modal-overlay">
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={250}
            />
          )}

          <div className="hp-modal">
            {/* SUCCESS HEADER */}
            <div className="hp-modal-top">
              <div className="hp-success-mark">
                <CheckCircle2 size={43} />
              </div>

              <h2>
                ACCOUNT <span>CREATED!</span>
              </h2>

              <p className="hp-modal-sub">
                Congratulations {registeredData.name}!
                <br />
                Welcome to the Helping Pools community.
              </p>
            </div>

            {/* CREDENTIALS */}
            <div className="hp-modal-body">
              <div className="hp-account-label">
                YOUR LOGIN CREDENTIALS
              </div>

              <div className="hp-credentials">
                {/* USER ID */}
                <div className="hp-credential-row">
                  <div className="hp-credential-info">
                    <div className="hp-credential-label">
                      YOUR USER ID
                    </div>

                    <div className="hp-credential-value">
                      {registeredData.userId}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="hp-copy"
                    onClick={() =>
                      copyToClipboard(registeredData.userId, "User ID")
                    }
                    aria-label="Copy User ID"
                    title="Copy User ID"
                  >
                    <Copy size={17} />
                  </button>
                </div>

                {/* PASSWORD */}
                <div className="hp-credential-row">
                  <div className="hp-credential-info">
                    <div className="hp-credential-label">
                      YOUR PASSWORD
                    </div>

                    <div className="hp-credential-value">
                      {showPassword
                        ? registeredData.password
                        : "••••••••••••"}
                    </div>

                    <button
                      type="button"
                      className="hp-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <>
                          <EyeOff size={13} />
                          HIDE PASSWORD
                        </>
                      ) : (
                        <>
                          <Eye size={13} />
                          SHOW PASSWORD
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    className="hp-copy"
                    onClick={() =>
                      copyToClipboard(
                        registeredData.password,
                        "Password"
                      )
                    }
                    aria-label="Copy Password"
                    title="Copy Password"
                  >
                    <Copy size={17} />
                  </button>
                </div>
              </div>

              {copyMessage && (
                <div className="hp-copy-message">
                  {copyMessage}
                </div>
              )}

              {/* WARNING */}
              <div className="hp-warning">
                <span className="hp-warning-icon">⚠️</span>

                <span>
                  Important: Please save or screenshot your User ID
                  and Password. You will need these credentials to
                  log in to your account.
                </span>
              </div>

              {/* CONTINUE */}
              <button
                type="button"
                className="hp-proceed"
                onClick={handlePopupClose}
              >
                CONTINUE TO LOGIN
                <ArrowRight size={18} />
              </button>

              <div className="hp-modal-footer">
                <ShieldCheck
                  size={12}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: 5,
                  }}
                />
                Keep your login credentials safe and private.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
