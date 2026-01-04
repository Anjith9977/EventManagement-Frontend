import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

function OrgHeader({ title, subtitle, setOpen }) {
  return (
    <div className="flex justify-between items-center bg-white border-b border-pink-100 px-6 py-4 shadow-sm">

      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        
        {/* Menu icon – mobile only */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition"
        >
          <Menu size={22} className="text-pink-600" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-pink-600">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-pink-50 transition cursor-pointer">
          <User className="text-pink-600" size={20} />
          <span className="text-pink-600 font-medium">Organizer</span>
        </div>
      </div>

    </div>
  );
}

export default OrgHeader;
