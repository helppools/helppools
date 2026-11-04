// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Menu, LogOut } from "lucide-react";

// const TopNav = ({ onHamburgerClick }) => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   // 🔥 UPDATE: Naya function jo Dashboard pe bhi le jayega aur page ko top par bhi scroll karega
//   const handleLogoClick = () => {
//     navigate("/dashboard");
//     window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
//   };

//   return (
//     // 🔥 UPDATE: Background changed to White Glass with soft shadow
//     <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Relative container for perfect centering */}
//         <div className="flex justify-between items-center h-16 md:h-20 relative">
          
//           {/* 1. Left Section: Hamburger Icon */}
//           <div className="flex-1 flex justify-start">
//             <button 
//               onClick={onHamburgerClick} 
//               // 🔥 UPDATE: Hamburger icon matched to Light Green Theme
//               className="p-2 -ml-2 bg-green-50 rounded-xl border border-green-100 text-green-600 hover:bg-green-100 hover:border-green-200 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
//             >
//               <Menu size={26} strokeWidth={2.5} />
//             </button>
//           </div>

//           {/* 2. Center Section: Brand Name (Centered on Mobile & PC) */}
//           <div
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center w-[60%] md:w-auto"
//             onClick={handleLogoClick} // 👈 Yahan naya function call kiya hai
//           >
//             {/* 🔥 UPDATE: Orange gradient hata kar Dark Slate aur Green color diya */}
//             <span className="text-base sm:text-lg md:text-2xl font-black tracking-widest uppercase text-center whitespace-nowrap">
//               <span className="text-slate-800">Crypto</span> <span className="text-green-600">Community</span>
//             </span>
//           </div>

//           {/* 3. Right Section: Logout */}
//           <div className="flex-1 flex justify-end">
//             <button
//               onClick={logout}
//               // 🔥 UPDATE: Red button styling made soft and clean
//               className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all active:scale-95 shadow-sm"
//             >
//               <LogOut size={18} strokeWidth={2.5} />
//               <span className="hidden md:inline font-bold text-sm tracking-wider uppercase">Logout</span>
//             </button>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopNav;



import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, LogOut, HandHeart } from "lucide-react";

const TopNav = ({ onHamburgerClick }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoClick = () => {
    navigate("/dashboard");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        .hp-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 2px solid #e8d49a;
          box-shadow: 0 4px 22px rgba(14, 74, 34, 0.10);
        }

        .hp-nav-inner {
          width: 100%;
          max-width: 1440px;
          height: 76px;
          padding: 0 28px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .hp-nav-left,
        .hp-nav-right {
          display: flex;
          align-items: center;
        }

        .hp-nav-left {
          justify-content: flex-start;
        }

        .hp-nav-right {
          justify-content: flex-end;
        }

        .hp-menu-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          border: 1px solid #d6e8d7;
          background: #eff8ed;
          color: #087b35;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .hp-menu-btn:hover {
          background: #087b35;
          color: #ffffff;
          border-color: #087b35;
          box-shadow: 0 5px 14px rgba(8, 123, 53, 0.2);
        }

        .hp-menu-btn:active,
        .hp-logout-btn:active {
          transform: scale(0.95);
        }

        .hp-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          min-width: 0;
        }

        .hp-brand-icon {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          color: #ffffff;
          background: linear-gradient(145deg, #087c30, #19a83e);
          border: 2px solid #e9c75c;
          box-shadow: 0 3px 10px rgba(13, 107, 40, 0.18);
        }

        .hp-brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.05;
        }

        .hp-brand-name {
          font-size: 22px;
          font-weight: 950;
          letter-spacing: 1px;
          white-space: nowrap;
          text-transform: uppercase;
          color: #087b35;
        }

        .hp-brand-name span {
          color: #c58b13;
        }

        .hp-brand-tagline {
          margin-top: 5px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          color: #89968b;
        }

        .hp-logout-btn {
          min-height: 43px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          border: 1px solid #f0d4b9;
          background: #fff8ed;
          color: #b76b19;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .hp-logout-btn:hover {
          background: #b7791f;
          border-color: #b7791f;
          color: white;
          box-shadow: 0 5px 14px rgba(183, 121, 31, 0.2);
        }

        /* TABLET */
        @media (max-width: 768px) {
          .hp-nav-inner {
            height: 68px;
            padding: 0 18px;
          }

          .hp-brand-name {
            font-size: 19px;
          }

          .hp-brand-icon {
            width: 39px;
            height: 39px;
          }
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .hp-nav-inner {
            height: 62px;
            padding: 0 11px;
          }

          .hp-menu-btn {
            width: 38px;
            height: 38px;
            border-radius: 11px;
          }

          .hp-brand {
            gap: 6px;
          }

          .hp-brand-icon {
            width: 32px;
            height: 32px;
            border-width: 1px;
          }

          .hp-brand-icon svg {
            width: 19px;
            height: 19px;
          }

          .hp-brand-name {
            font-size: 14px;
            letter-spacing: 0.5px;
          }

          .hp-brand-tagline {
            margin-top: 4px;
            font-size: 6px;
            letter-spacing: 1.4px;
          }

          .hp-logout-btn {
            width: 38px;
            height: 38px;
            min-height: 38px;
            padding: 0;
            border-radius: 11px;
          }
        }

        /* EXTRA SMALL MOBILE */
        @media (max-width: 350px) {
          .hp-nav-inner {
            padding: 0 7px;
          }

          .hp-menu-btn,
          .hp-logout-btn {
            width: 34px;
            height: 34px;
          }

          .hp-brand {
            gap: 4px;
          }

          .hp-brand-icon {
            width: 28px;
            height: 28px;
          }

          .hp-brand-name {
            font-size: 12px;
            letter-spacing: 0;
          }

          .hp-brand-tagline {
            font-size: 5px;
            letter-spacing: 1px;
          }
        }
      `}</style>

      <header className="hp-navbar">
        <div className="hp-nav-inner">

          {/* LEFT: HAMBURGER */}
          <div className="hp-nav-left">
            <button
              type="button"
              className="hp-menu-btn"
              onClick={onHamburgerClick}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* CENTER: HELPING POOLS BRAND */}
          <div
            className="hp-brand"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLogoClick();
              }
            }}
            aria-label="Go to Helping Pools dashboard"
          >
            <div className="hp-brand-icon">
              <HandHeart size={25} strokeWidth={2.2} />
            </div>

            <div className="hp-brand-text">
              <div className="hp-brand-name">
                HELPING <span>POOLS</span>
              </div>

              <div className="hp-brand-tagline">
                Together We Grow
              </div>
            </div>
          </div>

          {/* RIGHT: LOGOUT */}
          <div className="hp-nav-right">
            <button
              type="button"
              onClick={logout}
              className="hp-logout-btn"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={18} strokeWidth={2.5} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};

export default TopNav;
