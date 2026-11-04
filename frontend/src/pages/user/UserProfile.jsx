// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from "../../api/axios";
// import { 
//   ArrowLeft, Lock, User, Mail, Wallet, Key, ShieldCheck, BadgeInfo, Settings, Clock, Send, Copy
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import MessageModal from '../../components/modals/MessageModal';

// function UserProfile() {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Token is now handled by interceptor

//   const [activeTab, setActiveTab] = useState('profile'); 

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     mobile: user?.mobile || '',
//     walletAddress: user?.walletAddress || '',
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         mobile: user.mobile || '',
//         walletAddress: user.walletAddress || '',
//       });
//     }
//   }, [user]);

//   const [loginPassword, setLoginPassword] = useState('');
//   const [newLoginPassword, setNewLoginPassword] = useState('');
//   const [currentTxnPassword, setCurrentTxnPassword] = useState('');
//   const [newTxnPassword, setNewTxnPassword] = useState('');

//   const [messageModal, setMessageModal] = useState({
//     open: false, title: '', message: '', type: 'info',
//   });

//   const showMessage = (title, message, type = 'info') =>
//     setMessageModal({ open: true, title, message, type });

//   const handleChangePassword = async type => {
//     let payload;
//     if (type === 'login') {
//       if (!loginPassword || !newLoginPassword) return showMessage('Missing Fields', 'Please enter current and new login password.', 'warning');
//       payload = { oldPassword: loginPassword, newPassword: newLoginPassword };
//     } else {
//       if (!currentTxnPassword || !newTxnPassword) return showMessage('Missing Fields', 'Please enter current and new transaction password.', 'warning');
//       payload = { oldTxnPassword: currentTxnPassword, newTxnPassword };
//     }

//     try {
//       await api.put(`/user/change-password/${user.userId}`, payload);
//       showMessage('Password Updated 🔐', 'Your password has been changed successfully.', 'success');

//       if(type === 'login') {
//           setLoginPassword('');
//           setNewLoginPassword('');
//       } else {
//           setCurrentTxnPassword('');
//           setNewTxnPassword('');
//       }
//     } catch (err) {
//       showMessage('Error', err.response?.data?.message || 'Password update failed.', 'error');
//     }
//   };

//   // 🔥 SMART EMAIL LOGIC (PC ke liye Gmail, Mobile ke liye Mail App)
//   const supportEmail = "support@cryptocommunity.live";
//   const mailSubject = encodeURIComponent(`Wallet Address Update Request - User ID: ${user?.userId}`);
//   const mailBody = encodeURIComponent(`Hello Support Team,\n\nPlease update my USDT (BEP20) wallet address.\n\nUser ID: ${user?.userId}\nRegistered Email: ${user?.email}\nNew Wallet Address: [Please paste your BEP-20 address here]\n\nThank you.`);

//   // Check if device is Mobile
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//   // Gmail Direct Web Link (For PC)
//   const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=${mailSubject}&body=${mailBody}`;

//   // Default Mail App Link (For Mobile)
//   const mailToLink = `mailto:${supportEmail}?subject=${mailSubject}&body=${mailBody}`;

//   const finalMailLink = isMobile ? mailToLink : gmailWebLink;

//   // Manual Copy Fallback
//   const handleCopyDetails = () => {
//       const template = `To: ${supportEmail}\nSubject: Wallet Address Update Request - User ID: ${user?.userId}\n\nHello Support Team,\n\nPlease update my USDT (BEP20) wallet address.\n\nUser ID: ${user?.userId}\nRegistered Email: ${user?.email}\nNew Wallet Address: [Please paste your BEP-20 address here]\n\nThank you.`;
//       navigator.clipboard.writeText(template);
//       alert("Email details copied to clipboard! You can paste this in your email app.");
//   };

//   if (!user) {
//     return (
//         <div className="min-h-screen bg-slate-50 text-slate-900 flex justify-center items-center font-bold text-xl">
//             Please login first.
//         </div>
//     );
//   }

//   return (
//    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-6 md:pt-10 selection:bg-green-500/30">
//       <div className="max-w-3xl mx-auto px-4 md:px-6">
          
//           {/* Header & Back Button */}
//           <div className="flex items-center justify-between mb-6">
//              <div className="flex items-center gap-4">
//                  <button onClick={() => navigate('/dashboard')} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-green-600 transition-all shadow-sm">
//                     <ArrowLeft size={20} />
//                  </button>
//                  <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-wide">
//                     Account Settings
//                  </h1>
//              </div>
//           </div>

//           {/* User Basic Info Card */}
//           <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6">
//              <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-black text-white shadow-md border-4 border-white">
//                 {user.name?.charAt(0).toUpperCase() || "U"}
//              </div>
//              <div className="text-center sm:text-left flex-1">
//                 <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
//                 <p className="text-sm font-bold text-slate-500 mt-0.5">{user.email}</p>
//                 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
//                    <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
//                       <BadgeInfo size={14} className="text-green-500" />
//                       <span className="text-[10px] uppercase font-bold text-slate-500">User ID:</span>
//                       <span className="text-sm font-black text-slate-800">{user.userId}</span>
//                    </div>
//                    <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
//                       <User size={14} className="text-blue-500" />
//                       <span className="text-[10px] uppercase font-bold text-slate-500">Sponsor:</span>
//                       <span className="text-sm font-black text-slate-800">{user.sponsorId || 'N/A'}</span>
//                    </div>
//                 </div>
//              </div>
//           </div>

//           {/* ================= TABS NAVIGATION ================= */}
//           <div className="flex items-center gap-2 mb-6 bg-slate-200/50 p-1 rounded-xl">
//              <button 
//                 onClick={() => setActiveTab('profile')}
//                 className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'profile' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
//              >
//                 <User size={16} /> Profile Details
//              </button>
//              <button 
//                 onClick={() => setActiveTab('security')}
//                 className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'security' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
//              >
//                 <Settings size={16} /> Security
//              </button>
//           </div>

//           {/* ================= TAB 1: PROFILE DETAILS ================= */}
//           {activeTab === 'profile' && (
//              <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
//                 <div className="space-y-5">
                   
//                    {/* Non-Editable Fields */}
//                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                       <div>
//                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1.5">Full Name</label>
//                          <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><User size={16} className="text-slate-400" /></div>
//                             <input name="name" value={formData.name} readOnly disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 text-slate-500 font-bold cursor-not-allowed outline-none text-sm" />
//                          </div>
//                       </div>
                      
//                       <div>
//                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1.5">Email Address</label>
//                          <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Mail size={16} className="text-slate-400" /></div>
//                             <input name="email" value={formData.email} readOnly disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 text-slate-500 font-bold cursor-not-allowed outline-none text-sm" />
//                          </div>
//                       </div>
//                    </div>

//                    {/* Editable/Locked Wallet Address */}
//                    <div className="pt-4 border-t border-slate-100">
//                       <label className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1 mb-1.5">USDT Wallet Address (BEP20)</label>
//                       <div className="relative group">
//                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                             <Wallet size={16} className={formData.walletAddress ? "text-emerald-500" : "text-slate-400"} />
//                          </div>
//                          <input 
//                             name="walletAddress" 
//                             value={formData.walletAddress || ''} 
//                             readOnly
//                             disabled
//                             placeholder="Not Updated Yet"
//                             className={`w-full bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed rounded-xl px-4 py-3.5 pl-10 font-bold outline-none transition-all text-sm`} 
//                          />
//                       </div>

//                       {/* 🔥 Support Email Box (Jab address set na ho) */}
//                       {!formData.walletAddress && (
//                          <div className="mt-4 bg-blue-50/50 border border-blue-200 p-4 md:p-5 rounded-xl animate-in fade-in zoom-in duration-300">
//                              <h4 className="text-blue-800 font-black text-sm mb-2 flex items-center gap-2">
//                                 <BadgeInfo size={16} /> Wallet Update Request
//                              </h4>
//                              <p className="text-xs font-bold text-blue-700/80 mb-4 leading-relaxed">
//                                 To update your USDT (BEP-20) wallet address, please send an email to our support team from your registered email ID. Your address will be updated within <span className="font-black text-blue-800">24 to 48 hours</span>.
//                              </p>
                             
//                              <div className="flex flex-col sm:flex-row items-center gap-3">
//                                  {/* Ye button PC me direct Gmail kholega aur mobile me App */}
//                                  <a 
//                                     href={finalMailLink}
//                                     target={!isMobile ? "_blank" : "_self"}
//                                     rel="noopener noreferrer"
//                                     className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md"
//                                  >
//                                     <Send size={16} /> Open Mail App
//                                  </a>

//                                  {/* Backup Button: Agar kisi ka browser block kare, toh copy kar le */}
//                                  <button 
//                                     onClick={handleCopyDetails}
//                                     className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-black text-xs uppercase tracking-widest py-3 px-6 rounded-lg transition-all shadow-sm"
//                                  >
//                                     <Copy size={16} /> Copy Details
//                                  </button>
//                              </div>
//                          </div>
//                       )}
//                    </div>

//                    {/* 🔥 WALLET HISTORY SECTION */}
//                    {user.walletAddressHistory && user.walletAddressHistory.length > 0 && (
//                       <div className="pt-4 border-t border-slate-100">
//                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-3">
//                             <Clock size={14} /> Previous Wallet Addresses
//                          </label>
//                          <div className="space-y-2">
//                             {[...user.walletAddressHistory].reverse().map((history, idx) => (
//                                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                                   <span className="text-xs font-mono font-bold text-slate-600 break-all">
//                                      {history.address}
//                                   </span>
//                                   <span className="text-[10px] font-bold text-slate-400 shrink-0 bg-white px-2 py-1 rounded border border-slate-100">
//                                      {new Date(history.changedAt).toLocaleDateString()}
//                                   </span>
//                                </div>
//                             ))}
//                          </div>
//                       </div>
//                    )}
//                 </div>
//              </div>
//           )}

//           {/* ================= TAB 2: SECURITY SETTINGS ================= */}
//           {activeTab === 'security' && (
//              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 
//                  {/* Login Password Card */}
//                  <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 md:p-6">
//                     <div className="flex items-center gap-2 text-sm font-black text-slate-800 mb-4 uppercase tracking-wide border-b border-slate-100 pb-3">
//                        <ShieldCheck size={18} className="text-blue-500" /> Change Login Password
//                     </div>
//                     <div className="space-y-3">
//                        <input type="password" placeholder="Current Login Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-blue-500 outline-none text-sm font-bold placeholder-slate-400" />
//                        <input type="password" placeholder="New Login Password" value={newLoginPassword} onChange={e => setNewLoginPassword(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-blue-500 outline-none text-sm font-bold placeholder-slate-400" />
//                        <button onClick={() => handleChangePassword('login')} className="w-full py-3.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 font-black text-xs uppercase tracking-wider transition-all mt-2 shadow-sm">
//                           Update Login Password
//                        </button>
//                     </div>
//                  </div>

//                  {/* Transaction Password Card */}
//                  <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 md:p-6">
//                     <div className="flex items-center gap-2 text-sm font-black text-slate-800 mb-4 uppercase tracking-wide border-b border-slate-100 pb-3">
//                        <Lock size={18} className="text-purple-500" /> Change Transaction Password
//                     </div>
//                     <div className="space-y-3">
//                        <input type="password" placeholder="Current Txn Password" value={currentTxnPassword} onChange={e => setCurrentTxnPassword(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 outline-none text-sm font-bold placeholder-slate-400" />
//                        <input type="password" placeholder="New Txn Password" value={newTxnPassword} onChange={e => setNewTxnPassword(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 outline-none text-sm font-bold placeholder-slate-400" />
//                        <button onClick={() => handleChangePassword('txn')} className="w-full py-3.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white border border-purple-200 font-black text-xs uppercase tracking-wider transition-all mt-2 shadow-sm">
//                           Update Txn Password
//                        </button>
//                     </div>
//                  </div>

//              </div>
//           )}

//       </div>

//       <MessageModal
//         isOpen={messageModal.open}
//         onClose={() => setMessageModal({ ...messageModal, open: false })}
//         title={messageModal.title}
//         message={messageModal.message}
//         type={messageModal.type}
//         zIndex={11000}
//       />

//    </div>
//   );
// }

// export default UserProfile;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import {
  ArrowLeft,
  Lock,
  User,
  Mail,
  Wallet,
  ShieldCheck,
  BadgeInfo,
  Settings,
  Clock,
  Send,
  Copy,
  CheckCircle2,
  Shield,
  KeyRound,
  History,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MessageModal from '../../components/modals/MessageModal';

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    walletAddress: user?.walletAddress || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        walletAddress: user.walletAddress || '',
      });
    }
  }, [user]);

  const [loginPassword, setLoginPassword] = useState('');
  const [newLoginPassword, setNewLoginPassword] = useState('');
  const [currentTxnPassword, setCurrentTxnPassword] = useState('');
  const [newTxnPassword, setNewTxnPassword] = useState('');

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showMessage = (title, message, type = 'info') =>
    setMessageModal({ open: true, title, message, type });

  const handleChangePassword = async type => {
    let payload;

    if (type === 'login') {
      if (!loginPassword || !newLoginPassword) {
        return showMessage(
          'Missing Fields',
          'Please enter current and new login password.',
          'warning'
        );
      }

      payload = {
        oldPassword: loginPassword,
        newPassword: newLoginPassword
      };
    } else {
      if (!currentTxnPassword || !newTxnPassword) {
        return showMessage(
          'Missing Fields',
          'Please enter current and new transaction password.',
          'warning'
        );
      }

      payload = {
        oldTxnPassword: currentTxnPassword,
        newTxnPassword
      };
    }

    try {
      await api.put(`/user/change-password/${user.userId}`, payload);

      showMessage(
        'Password Updated 🔐',
        'Your password has been changed successfully.',
        'success'
      );

      if (type === 'login') {
        setLoginPassword('');
        setNewLoginPassword('');
      } else {
        setCurrentTxnPassword('');
        setNewTxnPassword('');
      }
    } catch (err) {
      showMessage(
        'Error',
        err.response?.data?.message || 'Password update failed.',
        'error'
      );
    }
  };

  // Support email logic
  const supportEmail = "support@cryptocommunity.live";

  const mailSubject = encodeURIComponent(
    `Wallet Address Update Request - User ID: ${user?.userId}`
  );

  const mailBody = encodeURIComponent(
    `Hello Support Team,\n\nPlease update my USDT (BEP20) wallet address.\n\nUser ID: ${user?.userId}\nRegistered Email: ${user?.email}\nNew Wallet Address: [Please paste your BEP-20 address here]\n\nThank you.`
  );

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const gmailWebLink =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=${mailSubject}&body=${mailBody}`;

  const mailToLink =
    `mailto:${supportEmail}?subject=${mailSubject}&body=${mailBody}`;

  const finalMailLink = isMobile ? mailToLink : gmailWebLink;

  const handleCopyDetails = () => {
    const template =
      `To: ${supportEmail}\nSubject: Wallet Address Update Request - User ID: ${user?.userId}\n\nHello Support Team,\n\nPlease update my USDT (BEP20) wallet address.\n\nUser ID: ${user?.userId}\nRegistered Email: ${user?.email}\nNew Wallet Address: [Please paste your BEP-20 address here]\n\nThank you.`;

    navigator.clipboard.writeText(template);
    alert("Email details copied to clipboard! You can paste this in your email app.");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8f3] px-4">
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 text-center shadow-sm">
          <Shield size={32} className="mx-auto text-emerald-600 mb-3" />
          <p className="text-sm font-bold text-slate-700">
            Please login first.
          </p>
        </div>
      </div>
    );
  }

  const inputStyle =
    "w-full min-w-0 rounded-xl border border-emerald-100 bg-[#f8fbf7] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  const labelStyle =
    "mb-1.5 ml-0.5 block text-[10px] font-extrabold uppercase tracking-[1.2px] text-slate-500";

  const tabButton = (tab, Icon, label) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
        activeTab === tab
          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15'
          : 'text-slate-500 hover:bg-white hover:text-emerald-700'
      }`}
    >
      <Icon size={17} />
      <span>{label}</span>
      {activeTab === tab && <ChevronRight size={14} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f4f8f3] px-3 pb-10 pt-4 text-slate-800 sm:px-5 sm:pt-6">

      <style>{`
        .hp-profile-card {
          background: #ffffff;
          border: 1px solid #e2eee0;
          border-radius: 18px;
          box-shadow: 0 5px 18px rgba(22, 101, 52, 0.045);
        }

        .hp-gold-line {
          height: 3px;
          width: 38px;
          border-radius: 10px;
          background: #d6a83e;
        }

        .hp-input:disabled {
          opacity: 1;
          -webkit-text-fill-color: #64748b;
        }

        .hp-action {
          transition: all .2s ease;
        }

        .hp-action:active {
          transform: scale(.98);
        }

        @media (max-width: 480px) {
          .hp-profile-card {
            border-radius: 15px;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-4xl">

        {/* Page Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="hp-action flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm hover:bg-emerald-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-lg font-black tracking-tight text-[#174b31] sm:text-2xl">
                  Account Settings
                </h1>
                <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-amber-700 sm:inline-flex">
                  Secure
                </span>
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500 sm:text-xs">
                Manage your profile and account security
              </p>
            </div>
          </div>

          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 sm:flex">
            <Settings size={19} />
          </div>
        </div>

        {/* User Information */}
        <div className="hp-profile-card relative mb-5 overflow-hidden p-4 sm:p-5">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-emerald-50/80" />

          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-[#174b31] text-2xl font-black text-white shadow-lg shadow-emerald-900/15">
              {user.name?.charAt(0).toUpperCase() || "U"}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#d6a83e] text-white">
                <CheckCircle2 size={11} />
              </span>
            </div>

            <div className="relative min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="break-words text-lg font-black text-[#174b31] sm:text-xl">
                  {user.name}
                </h2>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Member
                </span>
              </div>

              <p className="mt-1 break-all text-xs font-medium text-slate-500">
                {user.email}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-[#f7faf5] px-3 py-2">
                  <BadgeInfo size={14} className="shrink-0 text-emerald-700" />
                  <span className="text-[9px] font-bold uppercase text-slate-500">
                    User ID
                  </span>
                  <span className="break-all text-xs font-black text-[#174b31]">
                    {user.userId}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2">
                  <User size={14} className="shrink-0 text-amber-600" />
                  <span className="text-[9px] font-bold uppercase text-slate-500">
                    Sponsor
                  </span>
                  <span className="text-xs font-black text-[#174b31]">
                    {user.sponsorId || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1.5 rounded-2xl border border-emerald-100 bg-[#eaf2e8] p-1.5">
          {tabButton('profile', User, 'Profile Details')}
          {tabButton('security', ShieldCheck, 'Security')}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="hp-profile-card animate-in fade-in slide-in-from-bottom-2 duration-300 p-4 sm:p-5">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <User size={19} />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#174b31]">
                  Personal Information
                </h3>
                <p className="text-[11px] font-medium text-slate-500">
                  Your registered account details
                </p>
              </div>
            </div>

            <div className="hp-gold-line mb-5" />

            {/* Personal Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label className={labelStyle}>Full Name</label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
                  />
                  <input
                    name="name"
                    value={formData.name}
                    readOnly
                    disabled
                    className={`${inputStyle} hp-input pl-10`}
                  />
                  <Lock
                    size={13}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className={labelStyle}>Email Address</label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className={`${inputStyle} hp-input pl-10`}
                  />
                  <Lock
                    size={13}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mt-5 border-t border-emerald-50 pt-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className="text-[10px] font-black uppercase tracking-[1.2px] text-emerald-800">
                  USDT Wallet Address (BEP20)
                </label>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-700">
                  {formData.walletAddress ? 'ADDRESS ADDED' : 'NOT ADDED'}
                </span>
              </div>

              <div className="relative">
                <Wallet
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
                />
                <input
                  name="walletAddress"
                  value={formData.walletAddress || ''}
                  readOnly
                  disabled
                  placeholder="Not Updated Yet"
                  className={`${inputStyle} hp-input pl-10 font-mono text-xs`}
                />
                <Lock
                  size={13}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {/* Wallet Request */}
              {!formData.walletAddress && (
                <div className="mt-4 overflow-hidden rounded-xl border border-amber-200 bg-[#fffdf6]">
                  <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50/70 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                      <BadgeInfo size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#795516]">
                        Wallet Update Request
                      </h4>
                      <p className="text-[10px] font-medium text-amber-700">
                        Contact our support team
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-medium leading-relaxed text-slate-600">
                      To update your USDT (BEP-20) wallet address, please send
                      an email to our support team from your registered email ID.
                      Your address will be updated within{' '}
                      <strong className="font-black text-emerald-800">
                        24 to 48 hours
                      </strong>.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <a
                        href={finalMailLink}
                        target={!isMobile ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="hp-action inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-black uppercase tracking-wide text-white shadow-sm hover:bg-emerald-800"
                      >
                        <Send size={15} />
                        Open Mail App
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyDetails}
                        className="hp-action inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-wide text-[#8a651c] hover:bg-amber-50"
                      >
                        <Copy size={15} />
                        Copy Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wallet History */}
            {user.walletAddressHistory &&
              user.walletAddressHistory.length > 0 && (
                <div className="mt-5 border-t border-emerald-50 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <History size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#174b31]">
                        Previous Wallet Addresses
                      </h4>
                      <p className="text-[10px] font-medium text-slate-500">
                        Your wallet address change history
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[...user.walletAddressHistory].reverse().map((history, idx) => (
                      <div
                        key={idx}
                        className="flex min-w-0 flex-col gap-2 rounded-xl border border-emerald-100 bg-[#f8fbf7] p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="break-all font-mono text-[11px] font-semibold text-slate-600">
                          {history.address}
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold text-amber-700 sm:self-center">
                          <Clock size={12} />
                          {new Date(history.changedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Login Password */}
            <div className="hp-profile-card overflow-hidden p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-[#174b31]">
                    Change Login Password
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500">
                    Update your account login credentials
                  </p>
                </div>
                <span className="hidden rounded-lg bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase text-emerald-700 sm:block">
                  Login
                </span>
              </div>

              <div className="hp-gold-line mb-4" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelStyle}>Current Password</label>
                  <div className="relative">
                    <KeyRound
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
                    />
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>New Password</label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700"
                    />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newLoginPassword}
                      onChange={e => setNewLoginPassword(e.target.value)}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChangePassword('login')}
                className="hp-action mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-800"
              >
                <ShieldCheck size={16} />
                Update Login Password
              </button>
            </div>

            {/* Transaction Password */}
            <div className="hp-profile-card overflow-hidden p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Lock size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-[#174b31]">
                    Change Transaction Password
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500">
                    Protect your transaction activities
                  </p>
                </div>
                <span className="hidden rounded-lg bg-amber-50 px-2 py-1 text-[9px] font-black uppercase text-amber-700 sm:block">
                  Transaction
                </span>
              </div>

              <div className="hp-gold-line mb-4" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelStyle}>Current Transaction Password</label>
                  <div className="relative">
                    <KeyRound
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600"
                    />
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentTxnPassword}
                      onChange={e => setCurrentTxnPassword(e.target.value)}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>New Transaction Password</label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600"
                    />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newTxnPassword}
                      onChange={e => setNewTxnPassword(e.target.value)}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChangePassword('txn')}
                className="hp-action mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-black uppercase tracking-wider text-[#8a651c] hover:bg-[#d6a83e] hover:text-white"
              >
                <Lock size={16} />
                Update Transaction Password
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5">
              <Shield size={17} className="mt-0.5 shrink-0 text-emerald-700" />
              <p className="text-[11px] font-medium leading-relaxed text-emerald-900">
                <strong className="font-black">Security Tip:</strong> Keep your
                login and transaction passwords private. Never share your
                passwords or account credentials with anyone.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Existing Message Modal */}
      <MessageModal
        isOpen={messageModal.open}
        onClose={() => setMessageModal({ ...messageModal, open: false })}
        title={messageModal.title}
        message={messageModal.message}
        type={messageModal.type}
        zIndex={11000}
      />

    </div>
  );
}

export default UserProfile;
