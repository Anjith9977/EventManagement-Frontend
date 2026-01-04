import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

function AdminHeader({ title, subtitle, setOpen }) {

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header
      className="
        w-full
        bg-gradient-to-r from-[#FDF2F8] via-white to-[#FCE7F3]
        backdrop-blur-md
        border-b border-pink-200/60
        px-6 py-4
        flex flex-col md:flex-row
        justify-between items-start md:items-center
        gap-3
      "
    >
      {/* Title + Menu */}
      <div className="flex items-center gap-3">
        {/* Menu icon (mobile only) */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-pink-100"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-[#831843] tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-[#9D174D] opacity-80">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="flex items-center gap-5">
        <div className="flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-widest text-pink-500">
            Logged in as
          </span>
          <span className="text-sm font-semibold text-[#831843]">
            Admin
          </span>
        </div>

        <button
          onClick={logout}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-gradient-to-r from-[#EC4899] to-[#BE185D]
            text-white text-sm font-semibold
            shadow-md
            hover:shadow-xl hover:scale-105
            transition-all duration-300
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
