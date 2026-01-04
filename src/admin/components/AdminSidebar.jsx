import React, { useContext, useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Ticket,
  IndianRupee,
  CloudRain,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { adminProfileUpdateContext } from "../../context/Context";
import SERVER_URL from "../../services/server_url";

function AdminSidebar({ open, setOpen }) {

  const { adminprofileUpdated } = useContext(adminProfileUpdateContext);

  const [admin, setAdmin] = useState({
    username: "",
    profile: ""
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setAdmin({ username: user.username, profile: user.profile });
    }
  }, [adminprofileUpdated]);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const sidebarBg =
    "bg-gradient-to-b from-[#F472B6] via-[#EC4899] to-[#BE185D]";
  const textColor = "text-white";
  const hoverBg = "hover:bg-white/20 backdrop-blur-md";
  const borderColor = "border-white/20";

  /* ===== Profile Section (UNCHANGED) ===== */
  const ProfileSection = () => (
    <div className="flex flex-col items-center gap-2 py-6 border-b border-white/20">
      <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-300 overflow-hidden">
        <img
          src={
            adminprofileUpdated.profile === ""
              ? "/user_icon.png"
              : `${SERVER_URL}/uploads/${admin.profile}`
          }
          alt="profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className="text-sm font-semibold text-white">
        {admin.username}
      </h3>
    </div>
  );

  return (
    <>
      {/* ===== Overlay (mobile only) ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* ===== MOBILE SIDEBAR ===== */}
      <aside
        className={`
          ${sidebarBg} ${textColor}
          fixed top-0 left-0 h-full w-64
          z-40 shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className={`px-6 py-5 border-b ${borderColor} flex justify-between items-center`}>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Eventra</h1>
            <p className="text-xs opacity-90 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ProfileSection />

        <div className="px-4 py-6 space-y-2">
          {[
            { icon: <LayoutDashboard size={20} />, label: "Dashboard", link: "/AdminDashboard" },
            { icon: <CalendarDays size={20} />, label: "Events", link: "/adminEvents" },
            { icon: <Users size={20} />, label: "Organizers", link: "/adminOrganizer" },
            { icon: <Ticket size={20} />, label: "Bookings" },
            { icon: <IndianRupee size={20} />, label: "Revenue" },
            { icon: <CloudRain size={20} />, label: "Weather Impact" },
          ].map((item, i) => (
            <Link key={i} to={item.link || "#"} onClick={() => setOpen(false)}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${hoverBg}`}
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={`px-4 py-4 border-t ${borderColor}`}>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full bg-red-500/90 hover:bg-red-600 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== DESKTOP SIDEBAR (UNCHANGED) ===== */}
      <aside
        className={`hidden md:flex h-screen w-64 ${sidebarBg} ${textColor} flex-col fixed left-0 top-0 shadow-2xl`}
      >
        <div className={`px-6 py-6 border-b ${borderColor}`}>
          <h1 className="text-3xl font-extrabold tracking-wide">Eventra</h1>
          <p className="text-xs opacity-90 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <ProfileSection />

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/AdminDashboard">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg}`}>
              <LayoutDashboard size={20} />
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
          </Link>

          <Link to="/adminEvents">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg}`}>
              <CalendarDays size={20} />
              <span className="text-sm font-semibold">Events</span>
            </div>
          </Link>

          <Link to="/adminOrganizer">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg}`}>
              <Users size={20} />
              <span className="text-sm font-semibold">Organizers</span>
            </div>
          </Link>

          <Link to="/AdminProfile">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg}`}>
              <Users size={20} />
              <span className="text-sm font-semibold">Profile</span>
            </div>
          </Link>
        </nav>

        <div className={`px-4 py-5 border-t ${borderColor}`}>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full bg-red-500/90 hover:bg-red-600 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
