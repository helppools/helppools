
import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Crown,
  Users,
  Gift,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search
} from "lucide-react";

const RoyaltyProgress = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "directCount",
    direction: "descending"
  });
  const [now, setNow] = useState(Date.now());

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const res = await api.get("/admin/royalty-progress", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data?.success) {
        setRawData(res.data.data || []);
      } else {
        setError(res.data?.message || "Unable to load Royalty data.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Royalty progress API not available."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();

    const refresh = setInterval(fetchProgress, 60000);
    return () => clearInterval(refresh);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fromDate, toDate, statusFilter, itemsPerPage]);

  const getTimeLeft = (date) => {
    const deadline = new Date(date).getTime();
    if (!Number.isFinite(deadline)) return "-";

    const diff = deadline - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getStatus = (user) => {
    const status = String(user.status || "").toUpperCase();

    if (status === "EXCLUDED" || user.role === "leader") {
      return "Excluded";
    }

    if (status === "PAID") return "Paid";
    if (status === "NO_REWARD") return "No Reward";
    if (status === "PENDING") {
      return new Date(user.expiresAt).getTime() <= now
        ? "Processing"
        : "Running";
    }

    if (user.processed) {
      return Number(user.rewardAmount || 0) > 0 ? "Paid" : "No Reward";
    }

    return new Date(user.expiresAt).getTime() <= now
      ? "Processing"
      : "Running";
  };

  const getTierReward = (count) => {
    if (count >= 15) return 150;
    if (count >= 10) return 70;
    if (count >= 5) return 30;
    return 0;
  };

  const filteredData = useMemo(() => {
    return rawData.filter((user) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        String(user.userId || "").toLowerCase().includes(search) ||
        String(user.name || "").toLowerCase().includes(search);

      const activation = new Date(user.activationAt).getTime();

      const from = fromDate
        ? new Date(`${fromDate}T00:00:00`).getTime()
        : null;

      const to = toDate
        ? new Date(`${toDate}T23:59:59`).getTime()
        : null;

      const matchesFrom = from === null || activation >= from;
      const matchesTo = to === null || activation <= to;

      const status = getStatus(user);
      const matchesStatus =
        statusFilter === "ALL" || status === statusFilter;

      return (
        matchesSearch &&
        matchesFrom &&
        matchesTo &&
        matchesStatus
      );
    });
  }, [rawData, searchTerm, fromDate, toDate, statusFilter, now]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valueA;
      let valueB;

      if (sortConfig.key === "activationAt" || sortConfig.key === "expiresAt") {
        valueA = new Date(a[sortConfig.key]).getTime() || 0;
        valueB = new Date(b[sortConfig.key]).getTime() || 0;
      } else if (
        sortConfig.key === "userId" ||
        sortConfig.key === "directCount" ||
        sortConfig.key === "rewardAmount"
      ) {
        valueA = Number(a[sortConfig.key]) || 0;
        valueB = Number(b[sortConfig.key]) || 0;
      } else {
        valueA = String(a[sortConfig.key] || "").toLowerCase();
        valueB = String(b[sortConfig.key] || "").toLowerCase();
      }

      if (valueA < valueB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }

      return 0;
    });
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending"
    }));
  };

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  const totalPages = Math.max(
    1,
    Math.ceil(sortedData.length / itemsPerPage)
  );

  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    return {
      participants: rawData.length,
      running: rawData.filter((u) => getStatus(u) === "Running").length,
      paid: rawData.filter((u) => getStatus(u) === "Paid").length,
      noReward: rawData.filter((u) => getStatus(u) === "No Reward").length,
      excluded: rawData.filter((u) => getStatus(u) === "Excluded").length,
      totalPaid: rawData.reduce(
        (sum, u) => sum + Number(u.rewardAmount || 0),
        0
      )
    };
  }, [rawData, now]);

  const formatDate = (date) => {
    if (!date) return "-";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  const statusStyle = (status) => {
    const styles = {
      Paid: "bg-emerald-100 text-emerald-700",
      Running: "bg-blue-100 text-blue-700",
      Processing: "bg-amber-100 text-amber-700",
      "No Reward": "bg-gray-100 text-gray-700",
      Excluded: "bg-purple-100 text-purple-700"
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-3 md:p-5 text-slate-800 min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pt-10">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-emerald-700 flex items-center gap-2">
            <Crown size={24} />
            Royalty Offer Tracker
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            First top-up based 5-day Royalty Reward progress
          </p>
        </div>

        <button
          onClick={fetchProgress}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        <div className="bg-white border rounded-xl p-3 shadow-sm">
          <Users className="text-blue-600 mb-2" size={20} />
          <p className="text-xs text-gray-500">Participants</p>
          <h3 className="text-xl font-black">{summary.participants}</h3>
        </div>

        <div className="bg-white border rounded-xl p-3 shadow-sm">
          <Clock className="text-blue-600 mb-2" size={20} />
          <p className="text-xs text-gray-500">Running</p>
          <h3 className="text-xl font-black">{summary.running}</h3>
        </div>

        <div className="bg-white border rounded-xl p-3 shadow-sm">
          <CheckCircle className="text-emerald-600 mb-2" size={20} />
          <p className="text-xs text-gray-500">Paid</p>
          <h3 className="text-xl font-black">{summary.paid}</h3>
        </div>

        <div className="bg-white border rounded-xl p-3 shadow-sm">
          <XCircle className="text-gray-500 mb-2" size={20} />
          <p className="text-xs text-gray-500">No Reward</p>
          <h3 className="text-xl font-black">{summary.noReward}</h3>
        </div>

        <div className="bg-white border rounded-xl p-3 shadow-sm col-span-2 lg:col-span-1">
          <Gift className="text-amber-500 mb-2" size={20} />
          <p className="text-xs text-gray-500">Total Paid Amount</p>
          <h3 className="text-xl font-black text-emerald-700">
            ${summary.totalPaid}
          </h3>
        </div>
      </div>

      {/* REWARD RULES */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-5">
        <h3 className="text-sm font-black text-emerald-800 mb-2">
          Royalty Reward Rules
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-lg p-2">
            <strong className="text-emerald-700">$30</strong>
            <p className="text-xs text-gray-600">5 directs</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <strong className="text-emerald-700">$70</strong>
            <p className="text-xs text-gray-600">10 directs</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <strong className="text-emerald-700">$150</strong>
            <p className="text-xs text-gray-600">15+ directs</p>
          </div>
        </div>

        <p className="text-xs text-emerald-800 mt-2">
          Unique direct referrals only. Each direct qualifies only when their
          first successful top-up is exactly $30. Offer duration: 5 days.
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-3 mb-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
            title="Activation from date"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
            title="Activation to date"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="ALL">All Status</option>
            <option value="Running">Running</option>
            <option value="Processing">Processing</option>
            <option value="Paid">Paid</option>
            <option value="No Reward">No Reward</option>
            <option value="Excluded">Excluded</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show 100</option>
          </select>
        </div>

        {(searchTerm || fromDate || toDate || statusFilter !== "ALL") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFromDate("");
              setToDate("");
              setStatusFilter("ALL");
            }}
            className="mt-2 text-xs text-red-600 font-bold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading Royalty data...
          </div>
        ) : error ? (
          <div className="text-center py-10 px-3">
            <p className="text-red-600 text-sm font-bold">{error}</p>
            <p className="text-xs text-gray-500 mt-2">
              Check that the backend route /admin/royalty-progress exists.
            </p>
            <button
              onClick={fetchProgress}
              className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-[1050px] w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-3 py-3 text-center">Sr.</th>

                    <th
                      className="px-3 py-3 cursor-pointer"
                      onClick={() => requestSort("userId")}
                    >
                      User ID{sortIcon("userId")}
                    </th>

                    <th
                      className="px-3 py-3 cursor-pointer"
                      onClick={() => requestSort("name")}
                    >
                      Name{sortIcon("name")}
                    </th>

                    <th className="px-3 py-3 text-center">
                      First Top-up
                    </th>

                    <th
                      className="px-3 py-3 text-center cursor-pointer"
                      onClick={() => requestSort("activationAt")}
                    >
                      Activation{sortIcon("activationAt")}
                    </th>

                    <th
                      className="px-3 py-3 text-center cursor-pointer"
                      onClick={() => requestSort("expiresAt")}
                    >
                      Expiry{sortIcon("expiresAt")}
                    </th>

                    <th
                      className="px-3 py-3 text-center cursor-pointer"
                      onClick={() => requestSort("directCount")}
                    >
                      Qualifying Directs{sortIcon("directCount")}
                    </th>

                    <th className="px-3 py-3 text-center">
                      Current Tier
                    </th>

                    <th
                      className="px-3 py-3 text-center cursor-pointer"
                      onClick={() => requestSort("rewardAmount")}
                    >
                      Reward Paid{sortIcon("rewardAmount")}
                    </th>

                    <th className="px-3 py-3 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-10 text-gray-500 font-semibold"
                      >
                        No Royalty participants found.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((user, index) => {
                      const count = Number(user.directCount || 0);
                      const currentTier = getTierReward(count);
                      const status = getStatus(user);

                      return (
                        <tr
                          key={user.userId}
                          className="border-t hover:bg-emerald-50/50"
                        >
                          <td className="px-3 py-3 text-center text-gray-500">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>

                          <td className="px-3 py-3 font-bold text-emerald-700">
                            #{user.userId}
                          </td>

                          <td className="px-3 py-3 font-semibold capitalize">
                            {user.name || "-"}
                            {user.role === "leader" && (
                              <span className="block text-[10px] text-purple-600">
                                Leader
                              </span>
                            )}
                          </td>

                          <td className="px-3 py-3 text-center">
                            <span className="font-bold">
                              ${Number(user.firstTopUpAmount || 0)}
                            </span>
                          </td>

                          <td className="px-3 py-3 text-center text-xs">
                            {formatDate(user.activationAt)}
                          </td>

                          <td className="px-3 py-3 text-center text-xs">
                            <div>{formatDate(user.expiresAt)}</div>
                            {status === "Running" && (
                              <span className="text-blue-600 font-bold text-[10px]">
                                {getTimeLeft(user.expiresAt)}
                              </span>
                            )}
                          </td>

                          <td className="px-3 py-3 text-center">
                            <span className="inline-block rounded-md bg-emerald-50 border border-emerald-200 px-3 py-1 font-black text-emerald-700">
                              {count}
                            </span>
                          </td>

                          <td className="px-3 py-3 text-center">
                            <span className="font-black text-emerald-700">
                              ${currentTier}
                            </span>
                          </td>

                          <td className="px-3 py-3 text-center font-bold">
                            ${Number(user.rewardAmount || 0)}
                          </td>

                          <td className="px-3 py-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black ${statusStyle(status)}`}
                            >
                              {status === "Paid" && <CheckCircle size={12} />}
                              {status === "Excluded" && <XCircle size={12} />}
                              {status === "Running" && <Clock size={12} />}
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-3 border-t">
              <span className="text-xs text-gray-500">
                Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                {" - "}
                {Math.min(currentPage * itemsPerPage, sortedData.length)}
                {" of "}
                {sortedData.length} records
              </span>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-xs font-bold">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage >= totalPages}
                  className="px-3 py-2 border rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoyaltyProgress;
