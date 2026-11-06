
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Crown, Users, Gift } from "lucide-react";

const RoyaltyProgress = ({ user, token }) => {
  const [royalty, setRoyalty] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  const isLeader = String(user?.role || "").toLowerCase() === "leader";

  useEffect(() => {
    if (!user?.userId || !token) {
      setRoyalty(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchRoyalty = async () => {
      try {
        const response = await api.get(
          `/royalty/status/${user.userId}?t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!cancelled && response.data?.success) {
          setRoyalty(response.data.royalty || null);
        }
      } catch {
        if (!cancelled) setRoyalty(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setLoading(true);
    fetchRoyalty();

    const refresh = setInterval(fetchRoyalty, 60000);

    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, [user?.userId, token]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !royalty) return null;

  const expiresAt = new Date(royalty.expiresAt).getTime();
  if (Number.isNaN(expiresAt)) return null;

  const remaining = Math.max(0, expiresAt - now);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const count = Number(royalty.directCount || 0);
  const expired = remaining <= 0;

  const tier =
    count >= 15 ? 150 :
    count >= 10 ? 70 :
    count >= 5 ? 30 : 0;

  const nextTarget = count < 5 ? 5 : count < 10 ? 10 : 15;
  const progress = Math.min(100, (count / nextTarget) * 100);

  const processed = Boolean(royalty.processed);
  const finalReward = Number(royalty.rewardAmount || 0);

  return (
    <section className="royalty-card">
      <style>{`
        .royalty-card {
          width: 100%;
          padding: 7px 9px;
          border-radius: 10px;
          background: linear-gradient(120deg, #073f2b, #087d4d);
          color: white;
          border: 1px solid #d5a43b55;
          box-shadow: 0 2px 8px #075c3b12;
          box-sizing: border-box;
        }

        .royalty-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
        }

        .royalty-title {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 800;
        }

        .royalty-sub {
          color: #d5eadf;
          font-size: 8px;
          margin-top: 1px;
        }

        .royalty-timer {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          margin: 6px 0;
        }

        .royalty-time-box {
          min-width: 0;
          padding: 3px 2px;
          text-align: center;
          border-radius: 6px;
          background: #ffffff13;
          border: 1px solid #ffffff1c;
        }

        .royalty-time-box strong {
          display: block;
          font-size: 13px;
          line-height: 1.1;
          color: #ffe39a;
        }

        .royalty-time-box span {
          font-size: 6px;
          color: #d5eadf;
        }

        .royalty-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
          font-size: 9px;
          line-height: 1.2;
        }

        .royalty-stat-label {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #e1eee6;
        }

        .royalty-progress {
          height: 4px;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff25;
          margin-top: 4px;
        }

        .royalty-progress > div {
          height: 100%;
          background: #f3d78d;
          border-radius: inherit;
          transition: width .3s ease;
        }

        .royalty-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          margin-top: 6px;
        }

        .royalty-tier {
          padding: 4px 2px;
          text-align: center;
          border-radius: 6px;
          background: #ffffff12;
          border: 1px solid #ffffff1c;
        }

        .royalty-tier strong {
          display: block;
          color: #ffe39a;
          font-size: 11px;
          line-height: 1.2;
        }

        .royalty-tier span {
          font-size: 7px;
          color: #e1eee6;
        }

        .royalty-note {
          margin-top: 5px;
          padding: 4px 6px;
          border-radius: 5px;
          background: #ffffff12;
          font-size: 8px;
          line-height: 1.25;
          color: #e1eee6;
        }

        @media(max-width: 480px) {
          .royalty-card {
            padding: 6px 7px;
            border-radius: 8px;
          }

          .royalty-title {
            font-size: 11px;
          }

          .royalty-sub {
            font-size: 7px;
          }

          .royalty-timer {
            gap: 3px;
            margin: 5px 0;
          }

          .royalty-time-box {
            padding: 2px 1px;
          }

          .royalty-time-box strong {
            font-size: 12px;
          }

          .royalty-time-box span {
            font-size: 6px;
          }

          .royalty-stats {
            font-size: 8px;
            margin-top: 4px;
          }

          .royalty-progress {
            height: 3px;
          }

          .royalty-tiers {
            gap: 3px;
            margin-top: 5px;
          }

          .royalty-tier {
            padding: 3px 1px;
          }

          .royalty-tier strong {
            font-size: 10px;
          }

          .royalty-tier span {
            font-size: 6px;
          }

          .royalty-note {
            margin-top: 4px;
            padding: 4px 5px;
            font-size: 7px;
          }
        }
      `}</style>

      <div className="royalty-head">
        <div>
          <div className="royalty-title">
            <Crown size={14} color="#ffe39a" />
            Royalty Offer
          </div>
         
        </div>
        <Gift size={17} color="#ffe39a" />
      </div>

      {!expired ? (
        <div className="royalty-timer">
          {[
            [days, "DAYS"],
            [hours, "HRS"],
            [minutes, "MIN"],
            [seconds, "SEC"]
          ].map(([value, label]) => (
            <div className="royalty-time-box" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="royalty-note">
          Offer period ended.
        </div>
      )}

      <div className="royalty-stats">
        <span className="royalty-stat-label">
          <Users size={11} />
          Qualifying directs
        </span>
        <strong>{count}</strong>
      </div>

      <div className="royalty-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="royalty-stats">
        <span>Current reward tier</span>
        <strong>${tier}</strong>
      </div>

      <div className="royalty-tiers">
        <div className="royalty-tier">
          <strong>$30</strong>
          <span>5 directs</span>
        </div>
        <div className="royalty-tier">
          <strong>$70</strong>
          <span>10 directs</span>
        </div>
        <div className="royalty-tier">
          <strong>$150</strong>
          <span>15+ directs</span>
        </div>
      </div>

      <div className="royalty-note">
        {isLeader
        
          ? `Processed reward: $${finalReward}`
          : expired
          ? "Offer ended. Eligible reward will be processed automatically."
          : " "}
      </div>
    </section>
  );
};

export default RoyaltyProgress;
