import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe2,
  Users,
  Network,
  Gift,
  ShieldCheck,
  Trophy,
  HeartHandshake,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Target,
  Leaf,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Community First",
      description:
        "A community-driven platform focused on connection, teamwork and mutual support.",
    },
    {
      icon: Network,
      title: "Team Structure",
      description:
        "Explore the community structure and understand how participation works.",
    },
    {
      icon: Gift,
      title: "Programs & Rewards",
      description:
        "Discover available programs and their eligibility requirements.",
    },
    {
      icon: Globe2,
      title: "Global Community",
      description:
        "Connect with people from different places through a shared purpose.",
    },
    {
      icon: ShieldCheck,
      title: "Transparency",
      description:
        "Access platform information, policies and participation guidelines.",
    },
    {
      icon: Trophy,
      title: "Recognition",
      description:
        "Celebrate teamwork, leadership and community participation.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Register using the details required by the platform.",
    },
    {
      number: "02",
      title: "Explore The Platform",
      description: "Understand the platform rules, programs and policies.",
    },
    {
      number: "03",
      title: "Connect With Community",
      description: "Build relationships and participate responsibly.",
    },
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .hp-home {
          background: #fbfcf8;
          color: #14291c;
          min-height: 100vh;
          overflow: hidden;
          font-family: Inter, Arial, sans-serif;
        }

        .hp-container {
          width: min(1200px, 92%);
          margin: auto;
        }

        .hp-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e7eee8;
        }

        .hp-navbar {
          width: min(1300px, 92%);
          min-height: 82px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .hp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .hp-logo {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          color: #fcd56a;
          background: linear-gradient(135deg,#087346,#032d1e);
          box-shadow: 0 8px 20px #06452b30;
        }

        .hp-brand-name {
          font-size: 20px;
          font-weight: 950;
          color: #073b27;
          letter-spacing: -.8px;
        }

        .hp-brand-name span {
          color: #bd9135;
        }

        .hp-tagline {
          font-size: 9px;
          letter-spacing: 3px;
          font-weight: 800;
          color: #a77c25;
          margin-top: 3px;
        }

        .hp-nav {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .hp-nav a {
          color: #52665a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 750;
          transition: .25s;
        }

        .hp-nav a:hover {
          color: #07814d;
        }

        .hp-nav .hp-join {
          background: linear-gradient(120deg,#087746,#033c26);
          color: white;
          padding: 14px 23px;
          border-radius: 50px;
          box-shadow: 0 8px 20px #06452b25;
        }

        .hp-nav .hp-join:hover {
          color: #f9d777;
          transform: translateY(-2px);
        }

        .hp-menu-btn {
          display: none;
          border: 1px solid #dce9df;
          background: white;
          color: #064b30;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
        }

        .hp-hero {
          position: relative;
          padding: 160px 0 110px;
          min-height: 730px;
          display: flex;
          align-items: center;
        }

        .hp-hero::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: #a8dcb550;
          filter: blur(100px);
          right: -150px;
          top: 70px;
          pointer-events: none;
        }

        .hp-hero-grid {
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          gap: 60px;
          align-items: center;
        }

        .hp-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 17px;
          background: white;
          border: 1px solid #dbe9dc;
          border-radius: 50px;
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 900;
          color: #087449;
          box-shadow: 0 5px 20px #164a2810;
        }

        .hp-hero h1 {
          margin: 27px 0 0;
          font-size: clamp(43px,6vw,76px);
          line-height: 1.06;
          letter-spacing: -3px;
          font-weight: 950;
          color: #073b27;
        }

        .hp-gradient-text {
          display: block;
          background: linear-gradient(90deg,#07824d,#075b39,#bb8d31);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hp-hero-desc {
          color: #637369;
          line-height: 1.9;
          font-size: 17px;
          max-width: 570px;
          margin-top: 25px;
        }

        .hp-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 35px;
        }

        .hp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 25px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          transition: .3s;
        }

        .hp-btn-primary {
          background: linear-gradient(120deg,#087746,#033d27);
          color: white;
          box-shadow: 0 12px 25px #06452b30;
        }

        .hp-btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px #06452b45;
        }

        .hp-btn-outline {
          background: white;
          color: #06452d;
          border: 1px solid #d5e3d8;
        }

        .hp-btn-outline:hover {
          border-color: #bd9135;
          transform: translateY(-3px);
        }

        .hp-trust {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          margin-top: 32px;
          color: #607267;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .5px;
        }

        .hp-trust span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hp-trust svg {
          color: #087747;
        }

        .hp-visual {
          position: relative;
          max-width: 500px;
          width: 100%;
          margin: auto;
        }

        .hp-visual-card {
          position: relative;
          padding: 48px 35px;
          overflow: hidden;
          border-radius: 35px;
          background: linear-gradient(145deg,#073d29,#08764b,#033521);
          border: 1px solid #d2ad50;
          color: white;
          box-shadow: 0 30px 70px #063d282b;
          text-align: center;
          animation: hpFloat 5s ease-in-out infinite;
        }

        .hp-visual-card::before,
        .hp-visual-card::after {
          content: "";
          position: absolute;
          border: 1px solid #ffffff25;
          border-radius: 50%;
          width: 280px;
          height: 280px;
          top: -140px;
          right: -100px;
        }

        .hp-visual-card::after {
          width: 200px;
          height: 200px;
          top: -100px;
          right: -60px;
          border-color: #e8c56a40;
        }

        .hp-globe {
          position: relative;
          z-index: 1;
          margin: auto;
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 3px solid #edc96a;
          background: #ffffff12;
          color: #f5d273;
          box-shadow: 0 0 35px #edc96a30;
        }

        .hp-visual-label {
          margin-top: 38px;
          color: #f4d278;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 5px;
        }

        .hp-visual-card h2 {
          position: relative;
          z-index: 1;
          margin-top: 13px;
          font-size: 44px;
          font-weight: 950;
          line-height: 1.1;
        }

        .hp-visual-card h2 span {
          display: block;
          color: #f5d273;
        }

        .hp-visual-card p {
          position: relative;
          z-index: 1;
          color: #d5e8dc;
          line-height: 1.8;
          font-size: 14px;
          margin-top: 20px;
        }

        .hp-floating-card {
          position: absolute;
          left: -30px;
          bottom: -22px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #efdb9c;
          background: white;
          border-radius: 17px;
          box-shadow: 0 15px 35px #173d251e;
          z-index: 2;
        }

        .hp-floating-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #e5f4e9;
          display: grid;
          place-items: center;
          color: #08764b;
        }

        .hp-floating-card strong {
          font-size: 13px;
          display: block;
          color: #073d29;
        }

        .hp-floating-card small {
          font-size: 11px;
          color: #829087;
        }

        @keyframes hpFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hp-values {
          background: white;
          border-top: 1px solid #e7eee8;
          border-bottom: 1px solid #e7eee8;
          padding: 30px 0;
        }

        .hp-values-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
          text-align: center;
        }

        .hp-value small {
          color: #a67b28;
          letter-spacing: 2px;
          font-size: 10px;
          font-weight: 900;
        }

        .hp-value h3 {
          color: #073d29;
          font-size: 19px;
          margin-top: 8px;
          font-weight: 950;
        }

        .hp-section {
          padding: 100px 0;
        }

        .hp-section-heading {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 55px;
        }

        .hp-section-heading small {
          color: #a77b28;
          letter-spacing: 3px;
          font-weight: 950;
          font-size: 11px;
        }

        .hp-section-heading h2 {
          color: #073d29;
          font-size: clamp(34px,5vw,48px);
          line-height: 1.15;
          font-weight: 950;
          margin-top: 15px;
        }

        .hp-section-heading p {
          color: #718076;
          line-height: 1.8;
          margin-top: 15px;
          font-size: 15px;
        }

        .hp-feature-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 22px;
        }

        .hp-feature {
          background: white;
          border: 1px solid #e5eee7;
          border-radius: 25px;
          padding: 30px;
          transition: .3s;
        }

        .hp-feature:hover {
          transform: translateY(-8px);
          border-color: #d5b55f;
          box-shadow: 0 20px 40px #123e2412;
        }

        .hp-feature-icon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          color: #f5d273;
          background: #073d29;
          border-radius: 17px;
          transition: .3s;
        }

        .hp-feature:hover .hp-feature-icon {
          background: #08764b;
        }

        .hp-feature h3 {
          font-size: 19px;
          font-weight: 950;
          color: #073d29;
          margin-top: 24px;
        }

        .hp-feature p {
          color: #718076;
          font-size: 13px;
          line-height: 1.9;
          margin-top: 12px;
        }

        .hp-feature-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #08764b;
          font-size: 12px;
          font-weight: 900;
          margin-top: 20px;
        }

        .hp-process {
          background: #063a27;
          color: white;
          padding: 100px 0;
        }

        .hp-process-grid {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 60px;
        }

        .hp-process-heading small {
          color: #f1cd70;
          letter-spacing: 3px;
          font-size: 11px;
          font-weight: 950;
        }

        .hp-process-heading h2 {
          font-size: clamp(35px,5vw,55px);
          font-weight: 950;
          line-height: 1.13;
          margin-top: 20px;
        }

        .hp-process-heading h2 span {
          color: #f1cd70;
        }

        .hp-process-heading p {
          color: #c1d5c9;
          line-height: 1.9;
          margin-top: 20px;
        }

        .hp-step {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          border: 1px solid #ffffff1a;
          background: #ffffff09;
          border-radius: 22px;
          padding: 24px;
          margin-bottom: 15px;
          transition: .3s;
        }

        .hp-step:hover {
          background: #ffffff15;
          transform: translateX(5px);
        }

        .hp-step-number {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: #f1cd70;
          color: #063a27;
          font-weight: 950;
        }

        .hp-step h3 {
          font-size: 17px;
          font-weight: 900;
        }

        .hp-step p {
          margin-top: 8px;
          color: #c1d5c9;
          font-size: 13px;
          line-height: 1.8;
        }

        .hp-cta {
          padding: 90px 0;
        }

        .hp-cta-card {
          text-align: center;
          padding: 65px 25px;
          border: 1px solid #e4d18e;
          border-radius: 32px;
          background: linear-gradient(135deg,#fff,#edf7ee);
          box-shadow: 0 15px 40px #153e2410;
        }

        .hp-cta-icon {
          display: grid;
          place-items: center;
          width: 65px;
          height: 65px;
          border-radius: 19px;
          background: #073d29;
          color: #f1cd70;
          margin: auto;
        }

        .hp-cta h2 {
          margin-top: 25px;
          font-size: clamp(30px,5vw,45px);
          font-weight: 950;
          color: #073d29;
        }

        .hp-cta p {
          max-width: 600px;
          margin: 15px auto 25px;
          color: #718076;
          line-height: 1.9;
        }

        .hp-footer {
          background: white;
          border-top: 1px solid #e6eee7;
          padding: 65px 0 25px;
        }

        .hp-footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 45px;
        }

        .hp-footer h3 {
          color: #073d29;
          font-size: 16px;
          font-weight: 950;
        }

        .hp-footer p,
        .hp-footer a {
          color: #718076;
          font-size: 13px;
          line-height: 2.1;
          text-decoration: none;
        }

        .hp-footer a:hover {
          color: #08764b;
        }

        .hp-footer-links {
          display: flex;
          flex-direction: column;
          margin-top: 14px;
        }

        .hp-copyright {
          text-align: center;
          border-top: 1px solid #edf1ed;
          margin-top: 40px;
          padding-top: 23px;
          color: #9aa69d;
          font-size: 11px;
        }

        @media(max-width:900px) {
          .hp-nav {
            gap: 17px;
          }

          .hp-hero-grid {
            gap: 50px;
          }

          .hp-feature-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .hp-process-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media(max-width:650px) {
          .hp-navbar {
            min-height: 72px;
          }

          .hp-logo {
            width: 42px;
            height: 42px;
          }

          .hp-brand-name {
            font-size: 17px;
          }

          .hp-menu-btn {
            display: block;
          }

          .hp-nav {
            display: none;
            position: absolute;
            left: 0;
            top: 72px;
            width: 100%;
            background: white;
            padding: 25px;
            border-top: 1px solid #e5eee7;
            box-shadow: 0 15px 25px #0000000c;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .hp-nav.hp-nav-open {
            display: flex;
          }

          .hp-nav .hp-join {
            text-align: center;
          }

          .hp-hero {
            padding: 125px 0 90px;
            min-height: auto;
          }

          .hp-hero-grid {
            grid-template-columns: 1fr;
            gap: 65px;
          }

          .hp-hero h1 {
            font-size: 45px;
            letter-spacing: -2px;
          }

          .hp-hero-desc {
            font-size: 14px;
          }

          .hp-actions {
            flex-direction: column;
          }

          .hp-btn {
            width: 100%;
          }

          .hp-trust {
            justify-content: center;
            gap: 15px;
          }

          .hp-visual-card {
            padding: 40px 20px;
          }

          .hp-visual-card h2 {
            font-size: 38px;
          }

          .hp-floating-card {
            left: -5px;
          }

          .hp-values-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .hp-section {
            padding: 75px 0;
          }

          .hp-feature-grid {
            grid-template-columns: 1fr;
          }

          .hp-process {
            padding: 75px 0;
          }

          .hp-step {
            padding: 18px;
            gap: 13px;
          }

          .hp-footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .hp-cta-card {
            padding: 45px 20px;
          }
        }

        @media(prefers-reduced-motion:reduce) {
          .hp-home *,
          .hp-home *::before,
          .hp-home *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="hp-home">

        {/* NAVBAR */}

        <header className="hp-header">
          <div className="hp-navbar">

            <Link to="/" className="hp-brand">
              <div className="hp-logo">
                <Globe2 size={28} />
              </div>

              <div>
                <div className="hp-brand-name">
                  HELPING <span>POOLS</span>
                </div>
                <div className="hp-tagline">
                  TOGETHER WE GROW
                </div>
              </div>
            </Link>

            <nav className={`hp-nav ${menuOpen ? "hp-nav-open" : ""}`}>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>

              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link
                to="/register"
                className="hp-join"
                onClick={() => setMenuOpen(false)}
              >
                Join Now <ArrowUpRight size={16} />
              </Link>
            </nav>

            <button
              className="hp-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </header>

        {/* HERO */}

        <section className="hp-hero">
          <div className="hp-container hp-hero-grid">

            <div>
              <div className="hp-pill">
                <Sparkles size={15} />
                A GLOBAL COMMUNITY PLATFORM
              </div>

              <h1>
                Together We Help.
                <span className="hp-gradient-text">
                  Together We Grow.
                </span>
              </h1>

              <p className="hp-hero-desc">
                Welcome to Helping Pools. A community-driven platform
                connecting people through collective support, unity,
                transparency and shared growth.
              </p>

              <div className="hp-actions">
                <Link to="/register" className="hp-btn hp-btn-primary">
                  GET STARTED <ArrowRight size={19} />
                </Link>

                <Link to="/about" className="hp-btn hp-btn-outline">
                  DISCOVER MORE <ArrowUpRight size={18} />
                </Link>
              </div>

              <div className="hp-trust">
                <span><ShieldCheck size={16} /> Transparency</span>
                <span><HeartHandshake size={16} /> Community Support</span>
              </div>
            </div>

            <div className="hp-visual">
              <div className="hp-visual-card">

                <div className="hp-globe">
                  <Globe2 size={65} />
                </div>

                <div className="hp-visual-label">
                  WELCOME TO
                </div>

                <h2>
                  HELPING
                  <span>POOLS</span>
                </h2>

                <p>
                  Building a stronger global community through
                  unity, teamwork and mutual support.
                </p>

                <div style={{
                  marginTop: 35,
                  borderTop: "1px solid #ffffff30",
                  paddingTop: 22,
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  color: "#f5d273",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 2
                }}>
                  <Leaf size={18} />
                  TOGETHER WE HELP
                  <Leaf size={18} />
                </div>

              </div>

              <div className="hp-floating-card">
                <div className="hp-floating-icon">
                  <Users size={23} />
                </div>
                <div>
                  <strong>One Community</strong>
                  <small>One Shared Purpose</small>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* VALUES */}

        <section className="hp-values">
          <div className="hp-container hp-values-grid">

            {[
              ["OUR FOCUS", "Unity & Support"],
              ["OUR APPROACH", "Community Driven"],
              ["OUR VALUES", "Trust & Transparency"],
            ].map(([label, value]) => (
              <div className="hp-value" key={label}>
                <small>{label}</small>
                <h3>{value}</h3>
              </div>
            ))}

          </div>
        </section>

        {/* FEATURES */}

        <section className="hp-section">
          <div className="hp-container">

            <div className="hp-section-heading">
              <small>WHAT DEFINES US</small>
              <h2>
                Our Community
                <span className="hp-gradient-text">Our Strength</span>
              </h2>
              <p>
                Discover the values and features that make Helping Pools
                a community-focused platform.
              </p>
            </div>

            <div className="hp-feature-grid">
              {features.map(({ icon: Icon, title, description }) => (
                <article className="hp-feature" key={title}>
                  <div className="hp-feature-icon">
                    <Icon size={27} />
                  </div>

                  <h3>{title}</h3>

                  <p>{description}</p>

                  <div className="hp-feature-link">
                    Explore <ChevronRight size={16} />
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}

        <section className="hp-process">
          <div className="hp-container hp-process-grid">

            <div className="hp-process-heading">
              <small>GETTING STARTED</small>

              <h2>
                Your Journey
                <span style={{ display: "block" }}>
                  Starts Here.
                </span>
              </h2>

              <p>
                Explore Helping Pools, understand its structure
                and make informed decisions before participating.
              </p>

              <Link
                to="/about"
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                  marginTop: 30,
                  color: "#f1cd70",
                  textDecoration: "none",
                  fontWeight: 900,
                  fontSize: 13
                }}
              >
                ABOUT HELPING POOLS <ArrowRight size={18} />
              </Link>
            </div>

            <div>
              {steps.map((step) => (
                <div className="hp-step" key={step.number}>
                  <div className="hp-step-number">
                    {step.number}
                  </div>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}

        <section className="hp-cta">
          <div className="hp-container">
            <div className="hp-cta-card">

              <div className="hp-cta-icon">
                <Target size={32} />
              </div>

              <h2>Together We Can Grow</h2>

              <p>
                Become part of a community that believes in unity,
                transparency and supporting one another.
              </p>

              <Link to="/register" className="hp-btn hp-btn-primary">
                JOIN THE COMMUNITY <ArrowRight size={18} />
              </Link>

            </div>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="hp-footer">
          <div className="hp-container">

            <div className="hp-footer-grid">

              <div>
                <h3 style={{ fontSize: 22 }}>
                  HELPING <span style={{ color: "#bd9135" }}>POOLS</span>
                </h3>

                <p style={{ marginTop: 15, maxWidth: 300 }}>
                  Together We Help, Together We Grow.
                  Building a community through unity and support.
                </p>
              </div>

              <div>
                <h3>Quick Links</h3>

                <div className="hp-footer-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              </div>

              <div>
                <h3>Our Values</h3>

                <div className="hp-footer-links">
                  <p>Unity & Community</p>
                  <p>Transparency</p>
                  <p>Mutual Support</p>
                  <p>Responsible Growth</p>
                </div>
              </div>

            </div>

            <div className="hp-copyright">
              © {new Date().getFullYear()} Helping Pools. All Rights Reserved.
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}