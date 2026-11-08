// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import { ShieldCheck, Zap, Wallet, CheckCircle, User } from 'lucide-react';

// const LeaderAutoWithdraw = () => {
//     const [leaders, setLeaders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [processingId, setProcessingId] = useState(null);

//     const fetchLeaders = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem('adminToken');
//             const res = await api.get('/admin/leader-withdrawal-list', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setLeaders(res.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch leaders", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchLeaders();
//     }, []);

//     const handleExecuteWithdrawal = async (userId, amount) => {
//         if (!window.confirm(`Are you sure you want to Auto-Withdraw $${amount} for Leader #${userId}?`)) return;

//         try {
//             setProcessingId(userId);
//             const token = localStorage.getItem('adminToken');
//             const res = await api.post(`/admin/execute-leader-withdrawal/${userId}`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             alert(res.data.message);
//             fetchLeaders(); // Refresh the list after execution
//         } catch (error) {
//             alert(error.response?.data?.message || "Failed to process withdrawal.");
//         } finally {
//             setProcessingId(null);
//         }
//     };

//     return (
//         <div className="p-4 pt-12 md:pt-16 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            
//             {/* Header Section */}
//             <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                     <ShieldCheck className="text-indigo-600" size={28} /> Leader Auto-Settlement
//                 </h2>
//                 <p className="text-slate-500 text-sm mt-1">
//                     Manage and force auto-withdrawals for users with the <span className="font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">LEADER</span> role. System calculates multiples of $10 from 4 basic incomes (Excluding Fast Track & Wallet Balance).
//                 </p>
//             </div>

//             {/* Table Box */}
//             <div className="border border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden">
//                 <div className="overflow-x-auto w-full custom-scroll">
//                     <table className="w-full text-sm text-left whitespace-nowrap">
//                         <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] md:text-[11px] font-black tracking-widest border-b border-slate-200">
//                             <tr>
//                                 <th className="px-4 py-4 text-center">Sr.</th>
//                                 <th className="px-4 py-4 text-center">User ID</th>
//                                 <th className="px-4 py-4">Name</th>
//                                 <th className="px-4 py-4 text-center border-x border-slate-100 bg-emerald-50/50">
//                                     <div className="flex items-center justify-center gap-1.5 text-emerald-600">
//                                         <Wallet size={14}/> Wallet Balance
//                                     </div>
//                                 </th>
//                                 <th className="px-4 py-4 text-center">Withdrawable Income</th>
//                                 <th className="px-4 py-4 text-center">Eligible (Multiples of 10)</th>
//                                 <th className="px-4 py-4 text-center">Remains After</th>
//                                 <th className="px-4 py-4 text-center">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100">
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="8" className="text-center py-12">
//                                         <span className="text-indigo-500 font-bold uppercase tracking-widest animate-pulse">⏳ Fetching Leaders Data...</span>
//                                     </td>
//                                 </tr>
//                             ) : leaders.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="8" className="text-center py-12">
//                                         <span className="text-slate-400 font-bold uppercase tracking-widest">No Leaders Found</span>
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 leaders.map((user, idx) => (
//                                     <tr key={user.userId} className="hover:bg-indigo-50/30 transition-colors bg-white">
                                        
//                                         <td className="px-4 py-3 text-center font-bold text-slate-400">
//                                             {idx + 1}
//                                         </td>
                                        
//                                         {/* User ID Column */}
//                                         <td className="px-4 py-3 text-center">
//                                             <span className="font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md shadow-sm">
//                                                 #{user.userId}
//                                             </span>
//                                         </td>
                                        
//                                         {/* Name Column */}
//                                         <td className="px-4 py-3">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="bg-indigo-50 p-1.5 rounded-full text-indigo-400">
//                                                     <User size={14} />
//                                                 </div>
//                                                 <span className="font-bold text-slate-800 capitalize truncate max-w-[150px]" title={user.name}>
//                                                     {user.name || "Unknown"}
//                                                 </span>
//                                             </div>
//                                         </td>
                                        
//                                         {/* Wallet Balance Column */}
//                                         <td className="px-4 py-3 text-center border-x border-slate-100 bg-emerald-50/10">
//                                             <span className="text-emerald-600 font-black text-base">
//                                                 ${(user.walletBalance || 0).toFixed(2)}
//                                             </span>
//                                         </td>

//                                         {/* Total Income Column */}
//                                         <td className="px-4 py-3 text-center">
//                                             <span className="text-slate-700 font-bold">
//                                                 ${user.totalIncome.toFixed(2)}
//                                             </span>
//                                         </td>
                                        
//                                         {/* Eligible (10x) Column */}
//                                         <td className="px-4 py-3 text-center">
//                                             {user.eligibleWithdrawal >= 10 ? (
//                                                 <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-lg font-black text-sm shadow-sm inline-block min-w-[60px]">
//                                                     ${user.eligibleWithdrawal}
//                                                 </span>
//                                             ) : (
//                                                 <span className="text-slate-300 font-bold">$0</span>
//                                             )}
//                                         </td>

//                                         {/* Remains After Column */}
//                                         <td className="px-4 py-3 text-center text-slate-400 font-semibold">
//                                             ${user.remainingAfter.toFixed(2)}
//                                         </td>

//                                         {/* Action Button Column */}
//                                         <td className="px-4 py-3 text-center">
//                                             {user.eligibleWithdrawal >= 10 ? (
//                                                 <button
//                                                     onClick={() => handleExecuteWithdrawal(user.userId, user.eligibleWithdrawal)}
//                                                     disabled={processingId === user.userId}
//                                                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-widest shadow-[0_4px_10px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-1.5 mx-auto disabled:opacity-50 active:scale-95"
//                                                 >
//                                                     {processingId === user.userId ? (
//                                                         "WAIT..."
//                                                     ) : (
//                                                         <><Zap size={14} className="fill-current"/> SETTLE</>
//                                                     )}
//                                                 </button>
//                                             ) : (
//                                                 <span className="flex items-center justify-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-100 w-fit mx-auto">
//                                                     <CheckCircle size={14}/> Settled
//                                                 </span>
//                                             )}
//                                         </td>

//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeaderAutoWithdraw;



import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  ShieldCheck,
  Zap,
  Wallet,
  RefreshCw,
  Users,
  TrendingUp,
  CircleDollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  ArrowDownRight,
  Coins
} from 'lucide-react';

const money = (value) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toFixed(2);
};

const LeaderAutoWithdraw = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLeaders = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage('');

      const token = localStorage.getItem('adminToken');

      const res = await api.get('/admin/leader-withdrawal-list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLeaders(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error('Failed to fetch leaders:', error);
      setErrorMessage(
        error.response?.data?.message ||
        'Unable to load leader withdrawal data. Please try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  const handleExecuteWithdrawal = async (user) => {
    const gross = Math.max(0, Number(user.eligibleWithdrawal || 0));
    const fee = Math.max(0, Number(user.withdrawalFee || 0));
    const net = Math.max(0, Number(user.netWithdrawal || 0));

    if (gross < 10 || processingId !== null) return;

    const confirmed = window.confirm(
      `Confirm Leader Auto-Withdrawal\n\n` +
      `Leader: ${user.name || 'Unknown'}\n` +
      `User ID: #${user.userId}\n\n` +
      `Gross Income Deduction: $${money(gross)}\n` +
      `10% Withdrawal Fee: $${money(fee)}\n` +
      `Net Withdrawal Request: $${money(net)}\n` +
      `Wallet Credit: $0.00\n\n` +
      `The withdrawal request will be created as pending. ` +
      `This confirmation does not mean USDT has been transferred.\n\n` +
      `Continue?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(user.userId);

      const token = localStorage.getItem('adminToken');

      const res = await api.post(
        `/admin/execute-leader-withdrawal/${user.userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        res.data?.message ||
        `Withdrawal request created successfully. Net amount: $${money(net)}`
      );

      await fetchLeaders(true);
    } catch (error) {
      console.error('Leader withdrawal failed:', error);

      alert(
        error.response?.data?.message ||
        'Failed to process leader withdrawal. Please try again.'
      );
    } finally {
      setProcessingId(null);
    }
  };

  const totalLeaders = leaders.length;

  const totalGross = leaders.reduce(
    (sum, user) => sum + Math.max(0, Number(user.eligibleWithdrawal || 0)),
    0
  );

  const totalNet = leaders.reduce(
    (sum, user) => sum + Math.max(0, Number(user.netWithdrawal || 0)),
    0
  );

  const eligibleCount = leaders.filter(
    (user) => Number(user.eligibleWithdrawal || 0) >= 10
  ).length;

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-800 mt-2 break-all">
            {value}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>
        </div>

        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-7 pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <ShieldCheck size={24} />
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-800">
                Leader Auto-Settlement
              </h1>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Admin control for eligible leader income withdrawals.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchLeaders(true)}
            disabled={refreshing || loading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={refreshing ? 'animate-spin' : ''}
            />
            Refresh Data
          </button>
        </div>

        {/* Rules */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-indigo-600 shrink-0 mt-0.5" size={19} />

            <div>
              <p className="font-bold text-indigo-900 text-sm">
                Withdrawal Calculation Rules
              </p>

              <p className="text-xs sm:text-sm text-indigo-800 mt-1 leading-6">
                Eligible income: Direct + Level + Reward + Dynamic Pool Income.
                Fast Track and existing Wallet Balance are excluded.
                Gross withdrawal is rounded down to multiples of $10.
                A 10% fee is deducted and the remaining 90% becomes the
                pending withdrawal request. Wallet credit is always $0.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total Leaders"
            value={totalLeaders}
            icon={Users}
            color="bg-blue-50 text-blue-600"
            subtitle="Registered leader accounts"
          />

          <StatCard
            title="Eligible Leaders"
            value={eligibleCount}
            icon={TrendingUp}
            color="bg-emerald-50 text-emerald-600"
            subtitle="Minimum $10 gross available"
          />

          <StatCard
            title="Total Gross Eligible"
            value={`$${money(totalGross)}`}
            icon={Coins}
            color="bg-indigo-50 text-indigo-600"
            subtitle="Before 10% fee"
          />

          <StatCard
            title="Total Net Requests"
            value={`$${money(totalNet)}`}
            icon={CircleDollarSign}
            color="bg-amber-50 text-amber-600"
            subtitle="After 10% fee, before payout"
          />
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-sm font-semibold">{errorMessage}</p>

            <button
              type="button"
              onClick={() => fetchLeaders()}
              className="ml-auto text-sm font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-black text-slate-800">
                Leader Withdrawal List
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Review income, fee and net withdrawal before settlement.
              </p>
            </div>

            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg">
              {totalLeaders} Leaders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="px-4 py-4 text-center">Sr.</th>
                  <th className="px-4 py-4">Leader</th>
                  <th className="px-4 py-4 text-center">Wallet Balance</th>
                  <th className="px-4 py-4 text-center">Total Income</th>
                  <th className="px-4 py-4 text-center">Gross Withdrawal</th>
                  <th className="px-4 py-4 text-center">10% Fee</th>
                  <th className="px-4 py-4 text-center">Net Request</th>
                  <th className="px-4 py-4 text-center">Remaining</th>
                  <th className="px-4 py-4 text-center">Wallet Credit</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="10" className="py-16 text-center">
                      <RefreshCw
                        size={25}
                        className="animate-spin text-indigo-500 mx-auto mb-3"
                      />
                      <p className="text-sm font-bold text-slate-500">
                        Loading leaders data...
                      </p>
                    </td>
                  </tr>
                ) : leaders.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-16 text-center">
                      <Users size={30} className="mx-auto text-slate-300 mb-2" />
                      <p className="font-bold text-slate-500">
                        No Leaders Found
                      </p>
                    </td>
                  </tr>
                ) : (
                  leaders.map((user, index) => {
                    const gross = Math.max(
                      0,
                      Number(user.eligibleWithdrawal || 0)
                    );

                    const fee = Math.max(
                      0,
                      Number(user.withdrawalFee || 0)
                    );

                    const net = Math.max(
                      0,
                      Number(user.netWithdrawal || 0)
                    );

                    const remaining = Math.max(
                      0,
                      Number(user.remainingAfter || 0)
                    );

                    const canSettle = gross >= 10;
                    const isProcessing = processingId === user.userId;

                    return (
                      <tr
                        key={user.userId}
                        className="hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="px-4 py-4 text-center text-slate-400 font-bold">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-full">
                              <User size={17} />
                            </div>

                            <div>
                              <p className="font-bold text-slate-800">
                                {user.name || 'Unknown'}
                              </p>
                              <p className="text-xs text-slate-400 font-mono">
                                ID: #{user.userId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-emerald-600">
                            ${money(user.walletBalance)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center font-bold text-slate-700">
                          ${money(user.totalIncome)}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg font-black">
                            ${money(gross)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-red-500">
                            -${money(fee)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-lg font-black">
                            ${money(net)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center font-semibold text-slate-500">
                          ${money(remaining)}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="text-slate-500 font-bold">
                            $0.00
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">
                          {canSettle ? (
                            <button
                              type="button"
                              onClick={() => handleExecuteWithdrawal(user)}
                              disabled={processingId !== null}
                              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-black tracking-wide shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isProcessing ? (
                                <>
                                  <RefreshCw size={14} className="animate-spin" />
                                  PROCESSING
                                </>
                              ) : (
                                <>
                                  <Zap size={14} />
                                  SETTLE
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 px-3 py-2 rounded-lg text-[10px] font-black">
                              <CheckCircle2 size={14} />
                              NOT ELIGIBLE
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!loading && leaders.length > 0 && (
            <div className="border-t border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xs text-slate-400">
                Showing {leaders.length} leader accounts
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock size={14} />
                Net withdrawal requests remain pending until payout processing.
              </p>
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={19} className="text-amber-600 shrink-0 mt-0.5" />

            <div>
              <p className="text-sm font-black text-amber-900">
                Important: Pending Withdrawal
              </p>
              <p className="text-xs text-amber-800 mt-1 leading-5">
                SETTLE creates a withdrawal request and updates income records.
                It does not itself transfer USDT. Actual payment must be
                completed through your configured payout process.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderAutoWithdraw;
