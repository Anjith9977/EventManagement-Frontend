import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar, PlusCircle, User, LogOut, X } from "lucide-react";
import { OrgProfileUpdateContext } from "../../context/Context";
import SERVER_URL from "../../services/server_url";

function OrgSidebar({ open, setOpen }) {
  const [org, setOrg] = useState({ username: "", profile: "" });
  const { profileUpdated } = useContext(OrgProfileUpdateContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setOrg({ username: user.username, profile: user.profile });
    }
  }, [profileUpdated]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-full w-64 bg-white
          shadow-[0_8px_30px_rgba(236,72,153,0.15)]
          border-r border-pink-100 flex flex-col
          z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-pink-200">
          <h1 className="text-2xl font-extrabold text-pink-600 tracking-wide">
            Organizer Panel
          </h1>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center gap-2 py-6 border-b border-pink-100">
          <div className="w-20 h-20 rounded-full bg-pink-100 border-2 border-pink-300 overflow-hidden">
            <img
              src={
                org.profile
                  ? `${SERVER_URL}/uploads/${org.profile}`
                  : "/user_icon.png"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-sm font-semibold text-[#831843]">
            {org.username}
          </h3>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-4">
          <Link to="/orgDashboard" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-pink-700 font-semibold hover:bg-pink-50 hover:shadow-md transition-all">
            <Home size={22} /> Dashboard
          </Link>

          <Link to="/eventForm" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-pink-700 font-semibold hover:bg-pink-50 hover:shadow-md transition-all">
            <Calendar size={22} /> My Events
          </Link>

          <Link to="/createEvent" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-pink-700 font-semibold hover:bg-pink-50 hover:shadow-md transition-all">
            <PlusCircle size={22} /> Create Event
          </Link>

          <Link to="/OrgProfile" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-pink-700 font-semibold hover:bg-pink-50 hover:shadow-md transition-all">
            <User size={22} /> Profile
          </Link>

          <button onClick={logout}
            className="mt-auto flex items-center gap-3 px-4 py-2 rounded-xl text-red-500 font-semibold hover:bg-red-50 hover:shadow-md transition-all">
            <LogOut size={22} /> Logout
          </button>
        </nav>
      </div>
    </>
  );
}

export default OrgSidebar;
