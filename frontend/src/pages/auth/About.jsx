
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HandHeart,
  Users,
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  Globe,
  Award,
  Leaf,
  Lightbulb,
} from "lucide-react";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  const benefits = [
    {
      icon: <Users size={25} />,
      title: "Community First",
      description:
        "Be part of a connected community where members can interact, participate and grow together.",
    },
    {
      icon: <ShieldCheck size={25} />,
      title: "Account Security",
      description:
        "Access your account through a secure login experience and manage your personal dashboard.",
    },
    {
      icon: <TrendingUp size={25} />,
      title: "Track Your Progress",
      description:
        "Keep track of your account activity and available platform features in one place.",
    },
    {
      icon: <HeartHandshake size={25} />,
      title: "Grow Together",
      description:
        "Build meaningful connections and stay engaged with the Helping Pools community.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register on Helping Pools and complete the account setup process.",
      icon: <Users size={23} />,
    },
    {
      number: "02",
      title: "Access Your Dashboard",
      description:
        "Sign in to explore your account and available platform features.",
      icon: <ShieldCheck size={23} />,
    },
    {
      number: "03",
      title: "Explore the Community",
      description:
        "Discover the tools and features available to registered members.",
      icon: <Globe size={23} />,
    },
  ];

  return (
    <div className="hp-about-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .hp-about-page {
          --green: #075b3b;
          --dark: #063e2b;
          --gold: #d6ad58;
          --cream: #f7f6ef;
          --muted: #78877e;
          font-family: Inter, Arial, sans-serif;
          color: #20332a;
          background: white;
        }

        .hp-about-page a {
          text-decoration: none;
        }

        .hp-about-page button {
          font: inherit;
        }

        /* NAVBAR */

        .hp-about-nav {
          height: 80px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          border-bottom: 1px solid #edf0eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .hp-about-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          color: var(--green);
          font-size: 23px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .hp-about-logo span {
          color: var(--gold);
        }

        .hp-about-logo-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: var(--green);
          color: white;
          border-radius: 14px 14px 14px 4px;
        }

        .hp-about-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .hp-about-nav-links a {
          color: #65746a;
          font-size: 13px;
          font-weight: 750;
          transition: .2s;
        }

        .hp-about-nav-links a:hover,
        .hp-about-nav-links a.active {
          color: var(--green);
        }

        .hp-about-nav-cta {
          display: flex;
          gap: 12px;
        }

        .hp-about-nav-login {
          padding: 11px 18px;
          border: 1px solid #dce6dd;
          border-radius: 9px;
          color: var(--green);
          font-size: 12px;
          font-weight: 850;
        }

        .hp-about-nav-register {
          padding: 12px 19px;
          background: var(--green);
          color: white;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 850;
          transition: .2s;
        }

        .hp-about-nav-register:hover {
          background: var(--dark);
          transform: translateY(-2px);
        }

        .hp-about-menu {
          display: none;
          border: none;
          padding: 9px;
          background: #eaf3eb;
          color: var(--green);
          border-radius: 9px;
        }

        /* HERO */

        .hp-about-hero {
          min-height: 520px;
          padding: 90px 7%;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 85% 20%, #ffffff16, transparent 28%),
            linear-gradient(120deg, #06442e, #08764d);
          color: white;
        }

        .hp-about-hero::before {
          content: "";
          position: absolute;
          width: 550px;
          height: 550px;
          border: 70px solid #ffffff09;
          border-radius: 50%;
          right: -170px;
          top: -210px;
        }

        .hp-about-hero::after {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          border: 55px solid #ffffff08;
          border-radius: 50%;
          right: 170px;
          bottom: -280px;
        }

        .hp-about-hero-inner {
          width: 100%;
          max-width: 1150px;
          margin: auto;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          align-items: center;
          gap: 50px;
        }

        .hp-about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border: 1px solid #ffffff35;
          border-radius: 30px;
          background: #ffffff12;
          color: #f1dfb6;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          margin-bottom: 25px;
        }

        .hp-about-hero h1 {
          font-size: clamp(42px, 5vw, 65px);
          line-height: 1.08;
          letter-spacing: -2.5px;
          margin: 0 0 22px;
          max-width: 650px;
        }

        .hp-about-hero h1 span {
          color: var(--gold);
        }

        .hp-about-hero-text {
          max-width: 570px;
          color: #d5e8dc;
          font-size: 15px;
          line-height: 1.9;
          margin: 0 0 30px;
        }

        .hp-about-hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
        }

        .hp-about-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 15px 22px;
          background: var(--gold);
          color: #173b29;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 900;
          transition: .2s;
        }

        .hp-about-btn-primary:hover {
          background: #edca7b;
          transform: translateY(-2px);
        }

        .hp-about-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 21px;
          border: 1px solid #ffffff50;
          color: white;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
        }

        .hp-about-hero-art {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .hp-about-art-circle {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: #ffffff12;
          border: 1px solid #ffffff2b;
          display: grid;
          place-items: center;
          position: relative;
        }

        .hp-about-art-circle::before {
          content: "";
          position: absolute;
          inset: 20px;
          border: 1px dashed #ffffff45;
          border-radius: 50%;
        }

        .hp-about-art-center {
          width: 155px;
          height: 155px;
          border-radius: 40px;
          background: #fff;
          color: var(--green);
          display: grid;
          place-items: center;
          transform: rotate(-8deg);
          box-shadow: 0 20px 60px #00000025;
        }

        .hp-about-floating {
          position: absolute;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: white;
          color: var(--green);
          display: grid;
          place-items: center;
          box-shadow: 0 12px 25px #00000020;
        }

        .hp-about-floating.one {
          top: 22px;
          left: 10px;
        }

        .hp-about-floating.two {
          top: 70px;
          right: 0;
          color: #b48a32;
        }

        .hp-about-floating.three {
          bottom: 25px;
          left: 30px;
        }

        /* SECTION COMMON */

        .hp-about-section {
          padding: 90px 7%;
        }

        .hp-about-section-inner {
          max-width: 1150px;
          margin: auto;
        }

        .hp-about-section-heading {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }

        .hp-about-section-tag {
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
          margin-bottom: 15px;
        }

        .hp-about-section-heading h2 {
          color: var(--dark);
          font-size: clamp(29px, 4vw, 40px);
          line-height: 1.2;
          letter-spacing: -1.3px;
          margin: 0 0 13px;
        }

        .hp-about-section-heading p {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
          margin: 0;
        }

        /* INTRODUCTION */

        .hp-about-intro {
          background: white;
        }

        .hp-about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 65px;
          align-items: center;
        }

        .hp-about-intro-visual {
          min-height: 350px;
          border-radius: 25px;
          background:
            radial-gradient(circle at 90% 10%, #ffffff20, transparent 30%),
            linear-gradient(140deg, #eaf3e9, #f6f0df);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hp-about-intro-visual::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          border: 35px solid #075b3b0b;
          border-radius: 50%;
        }

        .hp-about-intro-icon {
          width: 150px;
          height: 150px;
          border-radius: 40px;
          background: var(--green);
          color: white;
          display: grid;
          place-items: center;
          position: relative;
          transform: rotate(-7deg);
          box-shadow: 0 20px 40px #075b3b25;
        }

        .hp-about-intro-stamp {
          position: absolute;
          right: 25px;
          bottom: 25px;
          background: white;
          padding: 14px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--green);
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 10px 30px #0000000c;
        }

        .hp-about-intro-copy .hp-about-section-tag {
          margin-bottom: 17px;
        }

        .hp-about-intro-copy h2 {
          color: var(--dark);
          font-size: 37px;
          letter-spacing: -1.4px;
          line-height: 1.2;
          margin: 0 0 19px;
        }

        .hp-about-intro-copy h2 span {
          color: #b68c39;
        }

        .hp-about-intro-copy p {
          color: #748278;
          font-size: 14px;
          line-height: 1.95;
          margin: 0 0 15px;
        }

        .hp-about-intro-checks {
          display: grid;
          gap: 12px;
          margin-top: 23px;
        }

        .hp-about-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #405749;
          font-size: 13px;
          font-weight: 750;
        }

        .hp-about-check svg {
          color: var(--green);
          flex-shrink: 0;
        }

        /* MISSION VISION */

        .hp-about-mission {
          background: #f7f8f3;
        }

        .hp-about-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .hp-about-mission-card {
          padding: 36px;
          border: 1px solid #e7ede5;
          border-radius: 20px;
          background: white;
          transition: .25s;
        }

        .hp-about-mission-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 35px #173d2510;
        }

        .hp-about-mission-icon {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: #eaf4ec;
          color: var(--green);
          margin-bottom: 22px;
        }

        .hp-about-mission-card h3 {
          color: var(--dark);
          font-size: 22px;
          margin: 0 0 12px;
        }

        .hp-about-mission-card p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.9;
          margin: 0;
        }

        /* BENEFITS */

        .hp-about-benefits {
          background: white;
        }

        .hp-about-benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .hp-about-benefit-card {
          padding: 27px 22px;
          border: 1px solid #e8eee7;
          border-radius: 17px;
          background: white;
          transition: .25s;
        }

        .hp-about-benefit-card:hover {
          border-color: #b7d2bd;
          background: #fbfdf9;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px #173d250c;
        }

        .hp-about-benefit-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #edf5ed;
          color: var(--green);
          margin-bottom: 21px;
        }

        .hp-about-benefit-card h3 {
          color: var(--dark);
          font-size: 16px;
          margin: 0 0 10px;
        }

        .hp-about-benefit-card p {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
          margin: 0;
        }

        /* HOW IT WORKS */

        .hp-about-process {
          background: #f7f8f3;
        }

        .hp-about-process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .hp-about-process-card {
          background: white;
          border: 1px solid #e7ede5;
          border-radius: 18px;
          padding: 30px;
          position: relative;
        }

        .hp-about-process-number {
          position: absolute;
          top: 25px;
          right: 25px;
          color: #e7eee7;
          font-size: 35px;
          font-weight: 950;
        }

        .hp-about-process-icon {
          width: 53px;
          height: 53px;
          display: grid;
          place-items: center;
          background: var(--green);
          color: white;
          border-radius: 15px;
          margin-bottom: 23px;
        }

        .hp-about-process-card h3 {
          color: var(--dark);
          font-size: 18px;
          margin: 0 0 10px;
        }

        .hp-about-process-card p {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
          margin: 0;
        }

        /* CTA */

        .hp-about-cta {
          padding: 75px 7%;
          background: white;
        }

        .hp-about-cta-inner {
          max-width: 1150px;
          margin: auto;
          padding: 55px;
          border-radius: 25px;
          background:
            radial-gradient(circle at 95% 0%, #ffffff15, transparent 30%),
            linear-gradient(110deg, #06442e, #08764d);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          overflow: hidden;
        }

        .hp-about-cta-copy h2 {
          font-size: clamp(26px, 4vw, 38px);
          letter-spacing: -1px;
          margin: 0 0 12px;
        }

        .hp-about-cta-copy p {
          color: #d2e5d8;
          font-size: 13px;
          line-height: 1.8;
          margin: 0;
          max-width: 550px;
        }

        .hp-about-cta-link {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 23px;
          border-radius: 10px;
          background: var(--gold);
          color: #173b29;
          font-size: 12px;
          font-weight: 900;
          transition: .2s;
        }

        .hp-about-cta-link:hover {
          background: #edca7b;
          transform: translateY(-2px);
        }

        /* FOOTER */

        .hp-about-footer {
          padding: 55px 7% 25px;
          background: #052f21;
          color: white;
        }

        .hp-about-footer-inner {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 50px;
          padding-bottom: 38px;
        }

        .hp-about-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-size: 21px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .hp-about-footer-brand span {
          color: var(--gold);
        }

        .hp-about-footer-brand-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          background: #ffffff15;
          color: var(--gold);
          border-radius: 12px;
        }

        .hp-about-footer-about p {
          max-width: 330px;
          color: #b7cfc0;
          font-size: 12px;
          line-height: 1.9;
          margin: 0;
        }

        .hp-about-footer-column h4 {
          color: var(--gold);
          font-size: 13px;
          margin: 5px 0 20px;
        }

        .hp-about-footer-column a {
          display: block;
          color: #c4d6ca;
          font-size: 12px;
          margin-bottom: 14px;
          transition: .2s;
        }

        .hp-about-footer-column a:hover {
          color: white;
          padding-left: 4px;
        }

        .hp-about-footer-bottom {
          max-width: 1150px;
          margin: auto;
          padding-top: 22px;
          border-top: 1px solid #ffffff18;
          display: flex;
          justify-content: space-between;
          gap: 15px;
          color: #a9c1b2;
          font-size: 11px;
        }

        /* RESPONSIVE */

        @media(max-width: 950px) {
          .hp-about-nav {
            padding: 0 5%;
          }

          .hp-about-hero {
            padding: 75px 5%;
          }

          .hp-about-section {
            padding: 70px 5%;
          }

          .hp-about-intro-grid {
            gap: 35px;
          }

          .hp-about-benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hp-about-footer {
            padding-left: 5%;
            padding-right: 5%;
          }
        }

        @media(max-width: 700px) {
          .hp-about-nav {
            height: 70px;
          }

          .hp-about-menu {
            display: grid;
            place-items: center;
          }

          .hp-about-nav-cta {
            display: none;
          }

          .hp-about-nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 12px 6%;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            box-shadow: 0 12px 20px #00000010;
          }

          .hp-about-nav-links.open {
            display: flex;
          }

          .hp-about-nav-links a {
            padding: 14px 0;
            border-bottom: 1px solid #edf1ed;
          }

          .hp-about-hero {
            padding: 65px 6%;
          }

          .hp-about-hero-inner {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .hp-about-hero h1 {
            font-size: 43px;
          }

          .hp-about-hero-art {
            min-height: 250px;
          }

          .hp-about-art-circle {
            width: 220px;
            height: 220px;
          }

          .hp-about-art-center {
            width: 120px;
            height: 120px;
          }

          .hp-about-intro-grid {
            grid-template-columns: 1fr;
          }

          .hp-about-intro-visual {
            min-height: 280px;
          }

          .hp-about-mission-grid {
            grid-template-columns: 1fr;
          }

          .hp-about-process-grid {
            grid-template-columns: 1fr;
          }

          .hp-about-cta-inner {
            padding: 35px 25px;
            flex-direction: column;
            align-items: flex-start;
          }

          .hp-about-footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }

          .hp-about-footer-about {
            grid-column: 1 / -1;
          }

          .hp-about-footer-bottom {
            flex-direction: column;
          }
        }

        @media(max-width: 420px) {
          .hp-about-logo {
            font-size: 20px;
          }

          .hp-about-hero h1 {
            font-size: 37px;
          }

          .hp-about-benefits-grid {
            grid-template-columns: 1fr;
          }

          .hp-about-section {
            padding: 60px 5%;
          }

          .hp-about-mission-card {
            padding: 27px;
          }

          .hp-about-footer-inner {
            grid-template-columns: 1fr;
          }

          .hp-about-footer-about {
            grid-column: auto;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="hp-about-nav">
        <Link to="/" className="hp-about-logo">
          <div className="hp-about-logo-icon">
            <HandHeart size={25} />
          </div>
          Helping<span>Pools</span>
        </Link>

        <nav className={`hp-about-nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            to="/about"
            className="active"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </nav>

        <div className="hp-about-nav-cta">
          <Link to="/login" className="hp-about-nav-login">
            Login
          </Link>

          <Link to="/register" className="hp-about-nav-register">
            Join Community
          </Link>
        </div>

        <button
          className="hp-about-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* HERO */}
      <section className="hp-about-hero">
        <div className="hp-about-hero-inner">
          <div>
            <div className="hp-about-eyebrow">
              <Sparkles size={15} />
              DISCOVER HELPING POOLS
            </div>

            <h1>
              A Community
              <br />
              Built on <span>Togetherness.</span>
            </h1>

            <p className="hp-about-hero-text">
              Welcome to Helping Pools — a platform designed to bring
              people together through community, connection and shared
              participation.
            </p>

            <div className="hp-about-hero-buttons">
              <Link to="/register" className="hp-about-btn-primary">
                Join Our Community <ArrowRight size={17} />
              </Link>

              <Link to="/login" className="hp-about-btn-outline">
                Member Login
              </Link>
            </div>
          </div>

          <div className="hp-about-hero-art">
            <div className="hp-about-art-circle">
              <div className="hp-about-art-center">
                <HandHeart size={78} />
              </div>

              <div className="hp-about-floating one">
                <Users size={24} />
              </div>

              <div className="hp-about-floating two">
                <Sparkles size={23} />
              </div>

              <div className="hp-about-floating three">
                <HeartHandshake size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRODUCTION */}
      <section className="hp-about-section hp-about-intro">
        <div className="hp-about-section-inner">
          <div className="hp-about-intro-grid">
            <div className="hp-about-intro-visual">
              <div className="hp-about-intro-icon">
                <HandHeart size={82} />
              </div>

              <div className="hp-about-intro-stamp">
                <Leaf size={19} />
                Growing Together
              </div>
            </div>

            <div className="hp-about-intro-copy">
              <div className="hp-about-section-tag">
                <Sparkles size={14} />
                WHO WE ARE
              </div>

              <h2>
                More Than a Platform.
                <br />
                A <span>Connected Community.</span>
              </h2>

              <p>
                Helping Pools is built around the idea that a connected
                community creates opportunities for people to interact,
                participate and stay engaged.
              </p>

              <p>
                Our platform brings member access and community features
                together in one convenient place, helping members manage
                their accounts and explore available services.
              </p>

              <div className="hp-about-intro-checks">
                <div className="hp-about-check">
                  <CheckCircle2 size={18} />
                  Easy member access
                </div>

                <div className="hp-about-check">
                  <CheckCircle2 size={18} />
                  Community-focused experience
                </div>

                <div className="hp-about-check">
                  <CheckCircle2 size={18} />
                  Convenient account management
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="hp-about-section hp-about-mission">
        <div className="hp-about-section-inner">
          <div className="hp-about-section-heading">
            <div className="hp-about-section-tag">
              <Target size={14} />
              OUR PURPOSE
            </div>

            <h2>What Drives Helping Pools</h2>

            <p>
              Our focus is to create a simple and connected experience
              for every member of our community.
            </p>
          </div>

          <div className="hp-about-mission-grid">
            <div className="hp-about-mission-card">
              <div className="hp-about-mission-icon">
                <Target size={27} />
              </div>

              <h3>Our Mission</h3>

              <p>
                To provide a convenient community platform where members
                can connect, participate and access useful account
                features through a simple and organized experience.
              </p>
            </div>

            <div className="hp-about-mission-card">
              <div className="hp-about-mission-icon">
                <Eye size={27} />
              </div>

              <h3>Our Vision</h3>

              <p>
                To build a connected digital community that encourages
                meaningful participation, better communication and
                shared growth among its members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="hp-about-section hp-about-benefits">
        <div className="hp-about-section-inner">
          <div className="hp-about-section-heading">
            <div className="hp-about-section-tag">
              <Award size={14} />
              WHY HELPING POOLS
            </div>

            <h2>A Better Member Experience</h2>

            <p>
              Explore the key areas that make the Helping Pools
              platform easy to use and community-focused.
            </p>
          </div>

          <div className="hp-about-benefits-grid">
            {benefits.map((item, index) => (
              <div className="hp-about-benefit-card" key={index}>
                <div className="hp-about-benefit-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hp-about-section hp-about-process">
        <div className="hp-about-section-inner">
          <div className="hp-about-section-heading">
            <div className="hp-about-section-tag">
              <Lightbulb size={14} />
              GETTING STARTED
            </div>

            <h2>Start Your Journey in Three Steps</h2>

            <p>
              Getting started with Helping Pools is simple.
              Follow these basic steps to access the platform.
            </p>
          </div>

          <div className="hp-about-process-grid">
            {steps.map((step) => (
              <div className="hp-about-process-card" key={step.number}>
                <span className="hp-about-process-number">
                  {step.number}
                </span>

                <div className="hp-about-process-icon">
                  {step.icon}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hp-about-cta">
        <div className="hp-about-cta-inner">
          <div className="hp-about-cta-copy">
            <h2>Be Part of Helping Pools</h2>

            <p>
              Create your account and explore the Helping Pools
              community and its available platform features.
            </p>
          </div>

          <Link to="/register" className="hp-about-cta-link">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hp-about-footer">
        <div className="hp-about-footer-inner">
          <div className="hp-about-footer-about">
            <div className="hp-about-footer-brand">
              <div className="hp-about-footer-brand-icon">
                <HandHeart size={23} />
              </div>

              Helping<span>Pools</span>
            </div>

            <p>
              A community-focused platform designed to bring people
              together through connection, participation and shared
              experiences.
            </p>
          </div>

          <div className="hp-about-footer-column">
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="hp-about-footer-column">
            <h4>Member Area</h4>

            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>

        <div className="hp-about-footer-bottom">
          <span>
            © {new Date().getFullYear()} Helping Pools. All rights reserved.
          </span>

          <span>Built for Community. Designed for Connection.</span>
        </div>
      </footer>
    </div>
  );
}
