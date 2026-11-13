// import React from 'react';
// import { 
//   Users, UserPlus, UserCheck, 
//   Wallet, ArrowDownToLine, Clock, 
//   DollarSign, CheckCircle, AlertCircle,
//   Briefcase, TrendingUp, Crown, Zap, Shield, Star, Receipt
// } from 'lucide-react';

// function DashboardCards({ stats }) {
//   const cardData = [
//     // --- USER STATS (Blue/Indigo) ---
//     {
//       title: 'Total Users',
//       value: stats.totalUsers?.toLocaleString() || 0,
//       icon: <Users className="text-blue-600" size={28} />,
//       bg: 'bg-blue-100',
//       border: 'border-blue-200'
//     },
//     {
//       title: "Today's New Users",
//       value: stats.todayUsers?.toLocaleString() || 0,
//       icon: <UserPlus className="text-indigo-600" size={28} />,
//       bg: 'bg-indigo-100',
//       border: 'border-indigo-200'
//     },
//     {
//       title: 'Total Paid Users',
//       value: stats.paidUsers?.toLocaleString() || 0,
//       icon: <UserCheck className="text-sky-600" size={28} />,
//       bg: 'bg-sky-100',
//       border: 'border-sky-200'
//     },
//      {
//       title: 'Normal Top-ups (Total)',
//       value: stats.normalTopupTotal || 0,
//       icon: <Shield className="text-cyan-600" size={28} />,
//       bg: 'bg-cyan-100',
//       border: 'border-cyan-300'
//     },
//     {
//       title: 'Normal Top-ups (Today)',
//       value: stats.normalTopupToday || 0,
//       icon: <Star className="text-blue-500" size={28} />,
//       bg: 'bg-blue-100',
//       border: 'border-blue-300'
//     },
//     {
//       title: 'Leader Top-ups (Total)',
//       value: stats.leaderTopupTotal || 0,
//       icon: <Crown className="text-yellow-600" size={28} />,
//       bg: 'bg-yellow-100',
//       border: 'border-yellow-300'
//     },
//      {
//       title: 'Leader Top-ups (Today)',
//       value: stats.leaderTopupToday || 0,
//       icon: <Zap className="text-orange-600" size={28} />,
//       bg: 'bg-orange-100',
//       border: 'border-orange-300'
//     },

//     // --- DEPOSIT STATS (Green/Teal) ---
//     {
//       title: 'Total Deposits',
//       value: `$${stats.totalDeposit?.toLocaleString() || 0}`,
//       icon: <Wallet className="text-green-600" size={28} />,
//       bg: 'bg-green-100',
//       border: 'border-green-200'
//     },
//     {
//       title: "Today's Deposits",
//       value: `$${stats.todayDeposit?.toLocaleString() || 0}`,
//       icon: <ArrowDownToLine className="text-teal-600" size={28} />,
//       bg: 'bg-teal-100',
//       border: 'border-teal-200'
//     },
//     {
//       title: 'Pending Deposits (Today)',
//       value: `$${stats.pendingDepositToday?.toLocaleString() || 0}`,
//       icon: <Clock className="text-emerald-600" size={28} />,
//       bg: 'bg-emerald-100',
//       border: 'border-emerald-200'
//     },

//     // ==========================================
//     // 🔥 GROSS WITHDRAWAL STATS (Red/Orange/Yellow)
//     // ==========================================
//     {
//       title: 'Total Gross Withdrawals',
//       value: `$${stats.totalWithdrawal?.toLocaleString() || 0}`,
//       icon: <DollarSign className="text-red-600" size={28} />,
//       bg: 'bg-red-100',
//       border: 'border-red-200'
//     },
//     {
//       title: 'Approved Gross (Total)',
//       value: `$${stats.approvedWithdrawalTotal?.toLocaleString() || 0}`,
//       icon: <CheckCircle className="text-green-600" size={28} />,
//       bg: 'bg-orange-100',
//       border: 'border-orange-200'
//     },
//     {
//       title: 'Approved Gross (Today)',
//       value: `$${stats.approvedWithdrawalToday?.toLocaleString() || 0}`,
//       icon: <CheckCircle className="text-amber-600" size={28} />,
//       bg: 'bg-amber-100',
//       border: 'border-amber-200'
//     },
//     {
//       title: 'Pending Gross (Total)',
//       value: `$${stats.pendingWithdrawalTotal?.toLocaleString() || 0}`,
//       icon: <AlertCircle className="text-rose-600" size={28} />,
//       bg: 'bg-rose-100',
//       border: 'border-rose-200'
//     },
//     {
//       title: 'Pending Gross (Today)',
//       value: `$${stats.pendingWithdrawalToday?.toLocaleString() || 0}`,
//       icon: <Clock className="text-pink-600" size={28} />,
//       bg: 'bg-pink-100',
//       border: 'border-pink-200'
//     },

//     // ==========================================
//     // 🔥 NEW: NET WITHDRAWAL STATS (Actual Payable)
//     // ==========================================
//     {
//       title: 'Net Approved (Total Payable)',
//       value: `$${stats.netApprovedTotal?.toLocaleString() || 0}`,
//       icon: <Receipt className="text-emerald-700" size={28} />,
//       bg: 'bg-emerald-100',
//       border: 'border-emerald-400'
//     },
//     {
//       title: 'Net Approved (Today)',
//       value: `$${stats.netApprovedToday?.toLocaleString() || 0}`,
//       icon: <Receipt className="text-teal-700" size={28} />,
//       bg: 'bg-teal-100',
//       border: 'border-teal-400'
//     },
//     {
//       title: 'Net Pending (To be Paid)',
//       value: `$${stats.netPendingTotal?.toLocaleString() || 0}`,
//       icon: <Receipt className="text-rose-700" size={28} />,
//       bg: 'bg-rose-100',
//       border: 'border-rose-400'
//     },
//     {
//       title: 'Net Pending (Today)',
//       value: `$${stats.netPendingToday?.toLocaleString() || 0}`,
//       icon: <Clock className="text-pink-700" size={28} />,
//       bg: 'bg-pink-100',
//       border: 'border-pink-400'
//     },

//     // --- LEADER AUTO SETTLEMENT STATS (Pink/Rose) ---
//     {
//       title: 'Leader Auto-Settlement (Total)',
//       value: `$${stats.leaderAutoWithdrawTotal?.toLocaleString() || 0}`,
//       icon: <DollarSign className="text-fuchsia-600" size={28} />,
//       bg: 'bg-fuchsia-100',
//       border: 'border-fuchsia-300'
//     },
//     {
//       title: 'Leader Auto-Settlement (Today)',
//       value: `$${stats.leaderAutoWithdrawToday?.toLocaleString() || 0}`,
//       icon: <CheckCircle className="text-rose-600" size={28} />,
//       bg: 'bg-rose-100',
//       border: 'border-rose-300'
//     },

//     // --- OVERALL BUSINESS STATS (Purple) ---
//     {
//       title: 'Total Top-Up Business',
//       value: `$${stats.totalTopupBusiness?.toLocaleString() || 0}`,
//       icon: <Briefcase className="text-purple-600" size={28} />,
//       bg: 'bg-purple-100',
//       border: 'border-purple-200'
//     },
//     {
//       title: "Today's Top-Up Business",
//       value: `$${stats.todayTopupBusiness?.toLocaleString() || 0}`,
//       icon: <TrendingUp className="text-violet-600" size={28} />,
//       bg: 'bg-violet-100',
//       border: 'border-violet-200'
//     },

//     // --- LEADER VS NORMAL TOPUP BUSINESS ($) ---
//     {
//       title: 'Leader Business (Total)',
//       value: `$${stats.leaderBusinessTotal?.toLocaleString() || 0}`,
//       icon: <Briefcase className="text-purple-600" size={28} />,
//       bg: 'bg-purple-100',
//       border: 'border-purple-300'
//     },
//     {
//       title: 'Leader Business (Today)',
//       value: `$${stats.leaderBusinessToday?.toLocaleString() || 0}`,
//       icon: <TrendingUp className="text-fuchsia-600" size={28} />,
//       bg: 'bg-fuchsia-100',
//       border: 'border-fuchsia-300'
//     },
//     {
//       title: 'Normal Business (Total)',
//       value: `$${stats.normalBusinessTotal?.toLocaleString() || 0}`,
//       icon: <Briefcase className="text-indigo-600" size={28} />,
//       bg: 'bg-indigo-100',
//       border: 'border-indigo-300'
//     },
//     {
//       title: 'Normal Business (Today)',
//       value: `$${stats.normalBusinessToday?.toLocaleString() || 0}`,
//       icon: <TrendingUp className="text-violet-600" size={28} />,
//       bg: 'bg-violet-100',
//       border: 'border-violet-300'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
//       {cardData.map((card, index) => (
//         <div
//           key={index}
//           className={`rounded-xl p-4 shadow-sm border flex items-center justify-between bg-white hover:shadow-md transition-shadow duration-200`}
//         >
//           <div className="flex flex-col gap-1">
//             <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.title}</h2>
//             <p className="text-xl font-extrabold text-gray-800">{card.value}</p>
//           </div>
//           <div className={`p-3 rounded-full ${card.bg} ${card.border} border bg-opacity-50`}>
//             {card.icon}
//           </div>
//         </div>
//       ))}
//     </div>
//   ); 
// }

// export default DashboardCards;













import React from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  Wallet,
  ArrowDownToLine,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Briefcase,
  TrendingUp,
  Crown,
  Zap,
  Shield,
  Star,
  Receipt,
  Calculator,
  Hash
} from 'lucide-react';

function DashboardCards({ stats = {} }) {
  const money = (value) =>
    `${Number(value || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  const number = (value) =>
    Number(value || 0).toLocaleString('en-US');

  const cardData = [
    // USER STATS
    {
      title: 'Total Users',
      value: number(stats.totalUsers),
      icon: <Users className="text-blue-600" size={28} />,
      bg: 'bg-blue-100',
      border: 'border-blue-200'
    },
    {
      title: "Today's New Users",
      value: number(stats.todayUsers),
      icon: <UserPlus className="text-indigo-600" size={28} />,
      bg: 'bg-indigo-100',
      border: 'border-indigo-200'
    },
    {
      title: 'Total Paid Users',
      value: number(stats.paidUsers),
      icon: <UserCheck className="text-sky-600" size={28} />,
      bg: 'bg-sky-100',
      border: 'border-sky-200'
    },

    // NORMAL TOP-UPS
    {
      title: 'Normal Top-ups (Total)',
      value: money(stats.normalTopupTotal),
      icon: <Shield className="text-cyan-600" size={28} />,
      bg: 'bg-cyan-100',
      border: 'border-cyan-300'
    },
    {
      title: 'Normal Top-ups (Today)',
      value: money(stats.normalTopupToday),
      icon: <Star className="text-blue-500" size={28} />,
      bg: 'bg-blue-100',
      border: 'border-blue-300'
    },

    // LEADER TOP-UPS
    {
      title: 'Leader Top-ups (Total)',
      value: money(stats.leaderTopupTotal),
      icon: <Crown className="text-yellow-600" size={28} />,
      bg: 'bg-yellow-100',
      border: 'border-yellow-300'
    },
    {
      title: 'Leader Top-ups (Today)',
      value: money(stats.leaderTopupToday),
      icon: <Zap className="text-orange-600" size={28} />,
      bg: 'bg-orange-100',
      border: 'border-orange-300'
    },

    // DEPOSIT STATS
    {
      title: 'Total Deposits',
      value: money(stats.totalDeposit),
      icon: <Wallet className="text-green-600" size={28} />,
      bg: 'bg-green-100',
      border: 'border-green-200'
    },
    {
      title: "Today's Deposits",
      value: money(stats.todayDeposit),
      icon: <ArrowDownToLine className="text-teal-600" size={28} />,
      bg: 'bg-teal-100',
      border: 'border-teal-200'
    },
    {
      title: 'Pending Deposits (Today)',
      value: money(stats.pendingDepositToday),
      icon: <Clock className="text-emerald-600" size={28} />,
      bg: 'bg-emerald-100',
      border: 'border-emerald-200'
    },

    // NORMAL WITHDRAWAL - GROSS
    {
      title: 'Total Gross Withdrawals',
      value: money(stats.totalWithdrawal),
      icon: <DollarSign className="text-red-600" size={28} />,
      bg: 'bg-red-100',
      border: 'border-red-200'
    },
    {
      title: 'Approved Gross (Total)',
      value: money(stats.approvedWithdrawalTotal),
      icon: <CheckCircle className="text-green-600" size={28} />,
      bg: 'bg-orange-100',
      border: 'border-orange-200'
    },
    {
      title: 'Approved Gross (Today)',
      value: money(stats.approvedWithdrawalToday),
      icon: <CheckCircle className="text-amber-600" size={28} />,
      bg: 'bg-amber-100',
      border: 'border-amber-200'
    },
    {
      title: 'Pending Gross (Total)',
      value: money(stats.pendingWithdrawalTotal),
      icon: <AlertCircle className="text-rose-600" size={28} />,
      bg: 'bg-rose-100',
      border: 'border-rose-200'
    },
    {
      title: 'Pending Gross (Today)',
      value: money(stats.pendingWithdrawalToday),
      icon: <Clock className="text-pink-600" size={28} />,
      bg: 'bg-pink-100',
      border: 'border-pink-200'
    },

    // NORMAL WITHDRAWAL - NET
    {
      title: 'Net Approved (Total Payable)',
      value: money(stats.netApprovedTotal),
      icon: <Receipt className="text-emerald-700" size={28} />,
      bg: 'bg-emerald-100',
      border: 'border-emerald-400'
    },
    {
      title: 'Net Approved (Today)',
      value: money(stats.netApprovedToday),
      icon: <Receipt className="text-teal-700" size={28} />,
      bg: 'bg-teal-100',
      border: 'border-teal-400'
    },
    {
      title: 'Net Pending (To be Paid)',
      value: money(stats.netPendingTotal),
      icon: <Receipt className="text-rose-700" size={28} />,
      bg: 'bg-rose-100',
      border: 'border-rose-400'
    },
    {
      title: 'Net Pending (Today)',
      value: money(stats.netPendingToday),
      icon: <Clock className="text-pink-700" size={28} />,
      bg: 'bg-pink-100',
      border: 'border-pink-400'
    },

    // LEADER AUTO-SETTLEMENT - GROSS
    {
      title: 'Leader Settlement Gross (Total)',
      value: money(stats.leaderAutoWithdrawGrossTotal),
      icon: <DollarSign className="text-fuchsia-600" size={28} />,
      bg: 'bg-fuchsia-100',
      border: 'border-fuchsia-300'
    },
    {
      title: 'Leader Settlement Gross (Today)',
      value: money(stats.leaderAutoWithdrawGrossToday),
      icon: <TrendingUp className="text-fuchsia-700" size={28} />,
      bg: 'bg-fuchsia-100',
      border: 'border-fuchsia-300'
    },

    // LEADER AUTO-SETTLEMENT - NET
    {
      title: 'Leader Settlement Net (Total)',
      value: money(stats.leaderAutoWithdrawTotal),
      icon: <CheckCircle className="text-rose-600" size={28} />,
      bg: 'bg-rose-100',
      border: 'border-rose-300'
    },
    {
      title: 'Leader Settlement Net (Today)',
      value: money(stats.leaderAutoWithdrawToday),
      icon: <TrendingUp className="text-pink-600" size={28} />,
      bg: 'bg-pink-100',
      border: 'border-pink-300'
    },

    // LEADER AUTO-SETTLEMENT - FEES
    {
      title: 'Leader Settlement Fees (Total)',
      value: money(stats.leaderAutoWithdrawFeeTotal),
      icon: <Calculator className="text-orange-600" size={28} />,
      bg: 'bg-orange-100',
      border: 'border-orange-300'
    },
    {
      title: 'Leader Settlement Fees (Today)',
      value: money(stats.leaderAutoWithdrawFeeToday),
      icon: <Calculator className="text-amber-600" size={28} />,
      bg: 'bg-amber-100',
      border: 'border-amber-300'
    },

    // LEADER AUTO-SETTLEMENT - COUNTS
    {
      title: 'Leader Settlement Count (Total)',
      value: number(stats.leaderAutoWithdrawCount),
      icon: <Hash className="text-purple-600" size={28} />,
      bg: 'bg-purple-100',
      border: 'border-purple-300'
    },
    {
      title: 'Leader Settlements (Today Count)',
      value: number(stats.leaderAutoWithdrawTodayCount),
      icon: <Crown className="text-yellow-600" size={28} />,
      bg: 'bg-yellow-100',
      border: 'border-yellow-300'
    },

    // OVERALL BUSINESS STATS
    {
      title: 'Total Top-Up Business',
      value: money(stats.totalTopupBusiness),
      icon: <Briefcase className="text-purple-600" size={28} />,
      bg: 'bg-purple-100',
      border: 'border-purple-200'
    },
    {
      title: "Today's Top-Up Business",
      value: money(stats.todayTopupBusiness),
      icon: <TrendingUp className="text-violet-600" size={28} />,
      bg: 'bg-violet-100',
      border: 'border-violet-200'
    },

    // LEADER VS NORMAL BUSINESS
    {
      title: 'Leader Business (Total)',
      value: money(stats.leaderBusinessTotal),
      icon: <Briefcase className="text-purple-600" size={28} />,
      bg: 'bg-purple-100',
      border: 'border-purple-300'
    },
    {
      title: 'Leader Business (Today)',
      value: money(stats.leaderBusinessToday),
      icon: <TrendingUp className="text-fuchsia-600" size={28} />,
      bg: 'bg-fuchsia-100',
      border: 'border-fuchsia-300'
    },
    {
      title: 'Normal Business (Total)',
      value: money(stats.normalBusinessTotal),
      icon: <Briefcase className="text-indigo-600" size={28} />,
      bg: 'bg-indigo-100',
      border: 'border-indigo-300'
    },
    {
      title: 'Normal Business (Today)',
      value: money(stats.normalBusinessToday),
      icon: <TrendingUp className="text-violet-600" size={28} />,
      bg: 'bg-violet-100',
      border: 'border-violet-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {cardData.map((card) => (
        <div
          key={card.title}
          className="rounded-xl p-4 shadow-sm border flex items-center justify-between bg-white hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {card.title}
            </h2>

            <p className="text-xl font-extrabold text-gray-800 break-words">
              {card.value}
            </p>
          </div>

          <div className={`p-3 rounded-full shrink-0 ${card.bg} ${card.border} border bg-opacity-50`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
