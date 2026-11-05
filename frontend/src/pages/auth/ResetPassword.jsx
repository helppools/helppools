
import React, { useState } from 'react';
import api from '../../api/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });

      setMessage(res.data.message || 'Password reset successfully!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || 'Link expired or invalid.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hp-reset-page">

      <style>{`
        .hp-reset-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 110px 18px 40px;
          position: relative;
          overflow: hidden;
          font-family: inherit;
          background: #f1f8f4;
          box-sizing: border-box;
        }

        .hp-reset-page * {
          box-sizing: border-box;
        }

        .hp-reset-orb {
          position: fixed;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: .17;
        }

        .hp-reset-orb.one {
          top: -160px;
          left: -120px;
          background: #078653;
        }

        .hp-reset-orb.two {
          bottom: -170px;
          right: -120px;
          background: #d8b65e;
        }

        .hp-reset-navbar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 17px 5%;
          background: rgba(255,255,255,.9);
          border-bottom: 1px solid #dcebe1;
          box-shadow: 0 4px 18px rgba(0,60,35,.05);
          z-index: 5;
        }

        .hp-reset-nav-inner {
          max-width: 1200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .hp-reset-brand {
          color: #075b42;
          font-size: 21px;
          font-weight: 900;
          letter-spacing: .5px;
          text-decoration: none;
        }

        .hp-reset-brand span {
          color: #c59b36;
        }

        .hp-reset-login {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          background: #eaf6ee;
          border: 1px solid #cde6d5;
          color: #08734d;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: .2s;
        }

        .hp-reset-login:hover {
          background: #08734d;
          color: white;
        }

        .hp-reset-card {
          width: 100%;
          max-width: 460px;
          padding: 38px;
          background: #fff;
          border: 1px solid #dcebe1;
          border-radius: 25px;
          box-shadow: 0 18px 55px rgba(0,65,38,.10);
          position: relative;
          z-index: 2;
        }

        .hp-reset-header {
          text-align: center;
          margin-bottom: 27px;
        }

        .hp-reset-icon {
          width: 76px;
          height: 76px;
          margin: 0 auto 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: linear-gradient(135deg,#075b42,#119363);
          color: #f8df9b;
          box-shadow: 0 10px 25px rgba(7,91,66,.2);
        }

        .hp-reset-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #a47c24;
          background: #fff8e6;
          border: 1px solid #f0e0b7;
          border-radius: 30px;
          padding: 7px 12px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          margin-bottom: 13px;
        }

        .hp-reset-title {
          color: #075b42;
          font-size: 27px;
          line-height: 1.25;
          font-weight: 900;
          margin: 0 0 9px;
        }

        .hp-reset-subtitle {
          color: #718078;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .hp-reset-field {
          margin-bottom: 19px;
        }

        .hp-reset-label {
          display: block;
          color: #426253;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .8px;
          margin: 0 0 9px 3px;
          text-transform: uppercase;
        }

        .hp-reset-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .hp-reset-input-icon {
          position: absolute;
          left: 15px;
          color: #81998c;
          pointer-events: none;
          display: flex;
        }

        .hp-reset-input {
          width: 100%;
          min-width: 0;
          height: 53px;
          padding: 0 48px 0 45px;
          background: #f5f9f6;
          border: 1px solid #dce9df;
          border-radius: 12px;
          outline: none;
          color: #164d36;
          font-size: 14px;
          font-weight: 600;
          transition: .2s;
        }

        .hp-reset-input:focus {
          background: white;
          border-color: #0a8959;
          box-shadow: 0 0 0 4px rgba(10,137,89,.10);
        }

        .hp-reset-input::placeholder {
          color: #a5b5aa;
          font-weight: 400;
        }

        .hp-reset-eye {
          position: absolute;
          right: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: #81998c;
          cursor: pointer;
          padding: 5px;
        }

        .hp-reset-eye:hover {
          color: #08734d;
        }

        .hp-reset-submit {
          width: 100%;
          min-height: 54px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(110deg,#075b42,#0d9562);
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(7,91,66,.2);
          transition: .2s;
        }

        .hp-reset-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(7,91,66,.28);
        }

        .hp-reset-submit:disabled {
          opacity: .65;
          cursor: wait;
        }

        .hp-reset-alert {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 13px;
          border-radius: 11px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
          margin-bottom: 18px;
          overflow-wrap: anywhere;
        }

        .hp-reset-success {
          color: #08734d;
          background: #eaf8ef;
          border: 1px solid #c6e9d0;
        }

        .hp-reset-error {
          color: #b42318;
          background: #fff1f0;
          border: 1px solid #ffd3cf;
        }

        .hp-reset-footer {
          margin-top: 23px;
          padding-top: 19px;
          border-top: 1px solid #edf2ee;
          text-align: center;
          color: #84958a;
          font-size: 12px;
        }

        .hp-reset-footer a {
          color: #08734d;
          font-weight: 900;
          text-decoration: none;
        }

        .hp-reset-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 520px) {
          .hp-reset-page {
            padding: 100px 14px 25px;
          }

          .hp-reset-navbar {
            padding: 14px 16px;
          }

          .hp-reset-brand {
            font-size: 17px;
          }

          .hp-reset-login {
            padding: 9px 12px;
            font-size: 12px;
          }

          .hp-reset-card {
            padding: 27px 21px;
            border-radius: 20px;
          }

          .hp-reset-title {
            font-size: 24px;
          }

          .hp-reset-icon {
            width: 67px;
            height: 67px;
          }
        }

        @media (max-width: 350px) {
          .hp-reset-card {
            padding: 23px 15px;
          }

          .hp-reset-brand {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="hp-reset-orb one"></div>
      <div className="hp-reset-orb two"></div>

      {/* Navbar */}
      <nav className="hp-reset-navbar">
        <div className="hp-reset-nav-inner">
          <Link to="/" className="hp-reset-brand">
            HELPING<span>POOLS</span>
          </Link>

          <Link to="/login" className="hp-reset-login">
            <Lock size={15} />
            Secure Login
          </Link>
        </div>
      </nav>

      {/* Reset Password Card */}
      <div className="hp-reset-card">

        <div className="hp-reset-header">
          <div className="hp-reset-icon">
            <ShieldCheck size={37} strokeWidth={2} />
          </div>

          <div className="hp-reset-tag">
            <Sparkles size={12} />
            ACCOUNT SECURITY
          </div>

          <h2 className="hp-reset-title">
            Set New Password
          </h2>

          <p className="hp-reset-subtitle">
            Create a strong new password to secure your Helping Pools account.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="hp-reset-alert hp-reset-success" role="status">
            <CheckCircle2 size={18} />
            <span>{message}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="hp-reset-alert hp-reset-error" role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword}>

          {/* New Password */}
          <div className="hp-reset-field">
            <label className="hp-reset-label">
              New Password
            </label>

            <div className="hp-reset-input-wrap">
              <div className="hp-reset-input-icon">
                <Lock size={19} />
              </div>

              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="hp-reset-input"
                placeholder="Enter new password"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="hp-reset-eye"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword
                  ? <EyeOff size={19} />
                  : <Eye size={19} />
                }
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="hp-reset-field">
            <label className="hp-reset-label">
              Confirm Password
            </label>

            <div className="hp-reset-input-wrap">
              <div className="hp-reset-input-icon">
                <Lock size={19} />
              </div>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="hp-reset-input"
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="hp-reset-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword
                  ? <EyeOff size={19} />
                  : <Eye size={19} />
                }
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="hp-reset-submit"
          >
            {loading ? (
              <>
                <span>UPDATING...</span>
              </>
            ) : (
              <>
                RESET PASSWORD
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <div className="hp-reset-footer">
          Remember your password?{' '}
          <Link to="/login">Back to Login</Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
