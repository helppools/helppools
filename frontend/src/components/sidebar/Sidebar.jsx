// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";
// import { useNavigate, useLocation, Link } from "react-router-dom"; 
// import { Home, Wallet, Banknote, History, Users, UserCircle2, HelpCircle, BadgeDollarSign, BarChart, Globe, Zap, FileQuestion, Coins } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const SidebarItem = ({ label, icon: Icon, active, onClick, badge, path }) => {
//   const content = (
//     <>
//       <Icon size={18} />
//       <span className="font-bold tracking-wide whitespace-nowrap">{label}</span>
//       {badge > 0 && (
//         <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-red-500 text-slate-800 text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
//           {badge}
//         </span>
//       )}
//     </>
//   );

//   const className = `relative flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-medium text-sm transition duration-300 ${
//     active 
//       ? "bg-green-50 border border-green-200 text-green-700 shadow-sm" 
//       : "text-slate-600 hover:text-green-700 hover:bg-slate-50"
//   }`;

//   if (path && path !== "#") {
//     return <Link to={path} onClick={onClick} className={className}>{content}</Link>;
//   }
//   return <div onClick={onClick} className={className}>{content}</div>;
// };

// const Sidebar = ({ user, isOpen, setIsOpen }) => { 
//   const location = useLocation();
//   const [notifCount, setNotifCount] = useState(0);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchNotifCount = async () => {
//       if (!user?.userId) return;
//       try {
//         const res = await api.get(`/admin/notifications/count/${user.userId}?t=${new Date().getTime()}`);
//         setNotifCount(res.data.count || 0);
//       } catch (err) {
//         console.log("Notification error", err);
//       }
//     };
//     fetchNotifCount();
//     const interval = setInterval(fetchNotifCount, 15000);
//     return () => clearInterval(interval);
//   }, [user?.userId]);

//   useEffect(() => {
//     if (window.innerWidth < 1024) {
//       document.body.style.overflow = isOpen ? "hidden" : "auto";
//     }
//   }, [isOpen]);

//   const menuItems = [
//     { label: "Dashboard", icon: Home, path: "/dashboard" },
//     { label: "My Profile", icon: UserCircle2, path: "/profile" },
//     { label: "Direct Team", icon: Users, path: "/direct-team" },
//     { label: "Downline Team", icon: Users, path: "/all-team" },
//     { label: "Top-Up History", icon: BarChart, path: "/topup-details" },
//     { label: "Deposit History", icon: History, path: "/deposit-history" },
//      { label: "Direct Income", icon: BadgeDollarSign, path: "/direct-income" },
//     { label: "Level Income", icon: Users, path: "/level-income" },
//      // 🔥 NAYE PAGES YAHAN ADD KIYE HAIN
//     //  { label: "Community Income", icon: BadgeDollarSign, path: "/community-income" },
//     { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
//     { label: "Wallet History", icon: History, path: "/wallet-history" },
//     { label: "Downline Business", icon: BarChart, path: "/downline-business" },
//     { label: "Credit To Wallet", icon: BadgeDollarSign, path: "/credit-to-wallet" },
//     { label: "P2P Transfers", icon: History, path: "/my-transfers" },
//     { label: "Transactions", icon: Wallet, path: "/transaction-details" },
//      { label: "Help & Support", icon: HelpCircle, path: "/support" },
//     // { label: "All Community", icon: Globe, path: "/global-community" } 
//   ];

//   return (
//     <>
//       {isOpen && (
//         <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[55] lg:hidden" />
//       )}

//       <aside className={`fixed top-16 md:top-20 left-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] z-[60] bg-white border-r border-slate-200 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}`}>
        
//         <div className="w-64 h-full overflow-y-auto custom-scroll pb-24">
//           <nav className="px-4 py-4 space-y-1.5">
//             <style>{`
//               .custom-scroll::-webkit-scrollbar { width: 5px; }
//               .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//               .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//             `}</style>
            
//             {menuItems.map((item, index) => (
//               <SidebarItem
//                 key={index} label={item.label} icon={item.icon} badge={item.badge} path={item.path} 
//                 active={location.pathname === item.path}
//                 onClick={() => {
//                   if (item.onClick) item.onClick();
//                   if (window.innerWidth < 1024) setIsOpen(false); 
//                 }}
//               />
//             ))}
//           </nav>
//         </div>
        
//       </aside>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  Wallet,
  Banknote,
  History,
  Users,
  UserCircle2,
  HelpCircle,
  BadgeDollarSign,
  BarChart3,
  ChevronRight,
  X,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

const SidebarItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  badge,
  path,
}) => {
  const content = (
    <>
      <div
        className={`sidebar-icon flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-300 ${
          active
            ? "bg-white/15 text-white"
            : "bg-transparent text-slate-500 group-hover:bg-green-50 group-hover:text-green-700"
        }`}
      >
        <Icon size={19} strokeWidth={active ? 2.4 : 2} />
      </div>

      <span className="flex-1 text-[13px] font-semibold tracking-wide whitespace-nowrap">
        {label}
      </span>

      {badge > 0 && (
        <span className="min-w-[21px] h-[21px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm">
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      <ChevronRight
        size={15}
        className={`shrink-0 transition-all duration-300 ${
          active
            ? "text-white/80 translate-x-0 opacity-100"
            : "text-slate-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        }`}
      />
    </>
  );

  const className = `group relative flex items-center gap-3 px-3 py-2 rounded-2xl cursor-pointer transition-all duration-300 ${
    active
      ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg shadow-green-900/15"
      : "text-slate-600 hover:bg-green-50 hover:text-green-800"
  }`;

  if (path && path !== "#") {
    return (
      <Link to={path} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={className}>
      {content}
    </div>
  );
};

const Sidebar = ({ user, isOpen, setIsOpen }) => {
  const location = useLocation();
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const fetchNotifCount = async () => {
      if (!user?.userId) return;

      try {
        const res = await api.get(
          `/admin/notifications/count/${user.userId}?t=${new Date().getTime()}`
        );

        setNotifCount(res.data.count || 0);
      } catch (err) {
        console.log("Notification error", err);
      }
    };

    fetchNotifCount();

    const interval = setInterval(fetchNotifCount, 15000);

    return () => clearInterval(interval);
  }, [user?.userId]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuItems = [
    {
      section: "MAIN MENU",
      items: [
        { label: "Dashboard", icon: Home, path: "/dashboard" },
        { label: "My Profile", icon: UserCircle2, path: "/profile" },
      ],
    },
    {
      section: "MY NETWORK",
      items: [
        { label: "Direct Team", icon: Users, path: "/direct-team" },
        { label: "Downline Team", icon: Users, path: "/all-team" },
        {
          label: "Downline Business",
          icon: BarChart3,
          path: "/downline-business",
        },
      ],
    },
    {
      section: "INCOME & WALLET",
      items: [
        {
          label: "Top-Up History",
          icon: BarChart3,
          path: "/topup-details",
        },
        {
          label: "Deposit History",
          icon: History,
          path: "/deposit-history",
        },
        {
          label: "Direct Income",
          icon: BadgeDollarSign,
          path: "/direct-income",
        },
        {
          label: "Level Income",
          icon: Users,
          path: "/level-income",
        },
        {
          label: "Withdrawals",
          icon: Banknote,
          path: "/withdrawals",
        },
        {
          label: "Wallet History",
          icon: History,
          path: "/wallet-history",
        },
        {
          label: "Credit To Wallet",
          icon: BadgeDollarSign,
          path: "/credit-to-wallet",
        },
      ],
    },
    {
      section: "TRANSACTIONS",
      items: [
        {
          label: "P2P Transfers",
          icon: History,
          path: "/my-transfers",
        },
        {
          label: "Transactions",
          icon: Wallet,
          path: "/transaction-details",
        },
      ],
    },
    {
      section: "HELP CENTER",
      items: [
        {
          label: "Help & Support",
          icon: HelpCircle,
          path: "/support",
        },
      ],
    },
  ];

  const isActive = (path) => {
    return location.pathname.replace(/\/$/, "") === path;
  };

  return (
    <>
      <style>{`
        .hp-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #bbd9c5 transparent;
        }

        .hp-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .hp-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .hp-sidebar-scroll::-webkit-scrollbar-thumb {
          background: #bbd9c5;
          border-radius: 20px;
        }

        .hp-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }

        .hp-sidebar {
          box-shadow: 12px 0 35px rgba(15, 65, 35, 0.06);
        }

        .hp-sidebar-item {
          -webkit-tap-highlight-color: transparent;
        }

        .hp-sidebar-item:active {
          transform: scale(0.98);
        }

        @media (max-width: 1023px) {
          .hp-sidebar {
            box-shadow: 15px 0 45px rgba(0, 0, 0, 0.13);
          }
        }
      `}</style>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-[3px] z-[55] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`hp-sidebar fixed top-16 md:top-20 left-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] z-[60] w-[280px] bg-white border-r border-green-100 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-5 pt-5 pb-4 border-b border-green-50 bg-gradient-to-br from-green-50/80 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center shadow-lg shadow-green-800/20 shrink-0">
                <LayoutDashboard
                  size={22}
                  className="text-white"
                  strokeWidth={2.2}
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-[15px] font-extrabold text-green-900 tracking-wide">
                  HELPING POOLS
                </h2>
                <p className="text-[10px] font-semibold text-slate-400 tracking-[1.5px] uppercase mt-0.5">
                  Member Dashboard
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
              aria-label="Close sidebar"
            >
              <X size={19} />
            </button>
          </div>

          {/* Welcome Card */}
          <div className="mt-5 p-3 rounded-2xl bg-white border border-green-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                <UserCircle2 size={18} className="text-green-700" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Welcome Back
                </p>
                <p className="text-sm font-bold text-slate-800 truncate">
                  {user?.name || user?.username || "Member"}
                </p>
              </div>

              <Sparkles size={16} className="text-yellow-500 shrink-0" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hp-sidebar-scroll flex-1 overflow-y-auto px-4 py-4 pb-8">
          <nav className="space-y-5">
            {menuItems.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="flex items-center gap-2 px-3 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <p className="text-[10px] font-extrabold tracking-[1.7px] text-slate-400">
                    {group.section}
                  </p>
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div key={item.path} className="hp-sidebar-item">
                      <SidebarItem
                        label={item.label}
                        icon={item.icon}
                        path={item.path}
                        active={isActive(item.path)}
                        badge={item.path === "/support" ? notifCount : 0}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setIsOpen(false);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-green-100 bg-gradient-to-r from-green-50/80 to-white">
          <div className="rounded-2xl p-3 bg-white border border-green-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Sparkles size={16} className="text-yellow-600" />
              </div>

              <div>
                <p className="text-[11px] font-bold text-green-900">
                  Growing Together
                </p>
                <p className="text-[10px] text-slate-400">
                  Your journey, your success.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-[9px] text-slate-400 font-medium mt-3 tracking-wide">
            HELPING POOLS • MEMBER PANEL
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
