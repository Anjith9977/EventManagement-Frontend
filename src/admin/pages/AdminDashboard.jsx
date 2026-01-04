import React, { useEffect, useState, useContext } from "react";
import { Users, CalendarDays, Ticket, IndianRupee } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { numberOfOrganizer } from "../../context/Context";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getAdminDashboardEventApi } from "../../services/AllApi";

function AdminDashboard() {

  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION
  const { regOrg } = useContext(numberOfOrganizer);

  useEffect(() => {
    getAdminDashboardEvent();
  }, []);

  const getAdminDashboardEvent = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { authorization: `bearer ${token}` };

    try {
      const res = await getAdminDashboardEventApi(reqHeader);
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= EXISTING LOGIC (UNCHANGED) ================= */

  const categoryMap = {};

  details.forEach((event) => {
    const category = event.category || "Other";

    if (!categoryMap[category]) {
      categoryMap[category] = {
        category,
        events: 0,
        sold: 0,
      };
    }

    categoryMap[category].events += 1;

    if (event.status === "Sold") {
      categoryMap[category].sold += 1;
    }
  });

  const barData = Object.values(categoryMap);

  const statusCount = {
    Pending: 0,
    Sold: 0,
    Approved: 0,
    Rejected: 0,
  };

  details.forEach((event) => {
    if (statusCount[event.status] !== undefined) {
      statusCount[event.status] += 1;
    }
  });

  const pieData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const COLORS = ["#f97316", "#22c55e", "#3b82f6", "#ef4444"];

  const totalRevenue = details.reduce((sum, e) => {
    if (e.status === "Sold") {
      return sum + e.ticketPrice;
    }
    return sum;
  }, 0);

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-64 min-h-screen bg-[#FDF2F8]">

        {/* HEADER */}
        <AdminHeader
          title="Admin Dashboard"
          subtitle="Event Management Overview"
          setOpen={setOpen}
        />

        {/* ================= STATS ================= */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            icon={<IndianRupee size={28} />}
          />

          <StatCard
            label="Total Events"
            value={details.length}
            icon={<CalendarDays size={28} />}
          />

          <StatCard
            label="Events Sold"
            value={statusCount.Sold}
            icon={<Ticket size={28} />}
          />

          <StatCard
            label="Registered Users"
            value={regOrg.length}
            icon={<Users size={28} />}
          />

        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-10">

          {/* BAR CHART */}
          <div className="bg-white rounded-2xl p-5 shadow h-96">
            <h3 className="text-lg font-semibold mb-4 text-[#831843]">
              Events by Category (Total vs Sold)
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#f97316" />
                <Bar dataKey="sold" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white rounded-2xl p-5 shadow h-96">
            <h3 className="text-lg font-semibold mb-4 text-[#831843]">
              Event Status Distribution
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

/* ================= STAT CARD (UNCHANGED) ================= */
function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex justify-between items-center border border-[#FBCFE8] shadow">
      <div>
        <p className="text-sm text-[#831843] opacity-80">{label}</p>
        <h2 className="text-2xl font-bold mt-1 text-[#831843]">
          {value}
        </h2>
      </div>
      <div className="bg-[#FCE7F3] text-[#EC4899] p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
