import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import { Link } from 'react-router';
import { getAllAdminEvent } from '../../services/AllApi';

function Adminevents() {

  const [display, setDisplay] = useState([]);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const token = sessionStorage.getItem('token');

    const reqHeader = {
      authorization: `bearer ${token}`
    };

    try {
      const res = await getAllAdminEvent(reqHeader);
      console.log(res);
      setDisplay(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEventType = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return "upcoming";
    if (today > end) return "completed";
    return "ongoing";
  };

  const upcomingCount = display.filter(
    (event) => getEventType(event.startDate, event.endDate) === "upcoming"
  ).length;

  const ongoingCount = display.filter(
    (event) => getEventType(event.startDate, event.endDate) === "ongoing"
  ).length;

  const completedCount = display.filter(
    (event) => getEventType(event.startDate, event.endDate) === "completed"
  ).length;

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-64 min-h-screen bg-[#FDF2F8]">

        {/* HEADER */}
        <AdminHeader
          title="Admin Events"
          subtitle="Create, update & monitor events"
          setOpen={setOpen}
        />

        {/* PAGE CONTENT */}
        <div className="p-6">

          {/* Page Title */}
          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            Manage Events
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] ring-1 ring-pink-200/60 shadow">
              <p className="text-sm text-[#9D174D] opacity-80">Total Events</p>
              <h2 className="text-2xl font-bold text-[#831843] mt-1">
                {display.length}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] ring-1 ring-pink-200/60 shadow">
              <p className="text-sm text-[#9D174D] opacity-80">Upcoming Events</p>
              <h2 className="text-2xl font-bold text-[#EC4899] mt-1">
                {upcomingCount}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] ring-1 ring-pink-200/60 shadow">
              <p className="text-sm text-[#9D174D] opacity-80">Ongoing Events</p>
              <h2 className="text-2xl font-bold text-green-600 mt-1">
                {ongoingCount}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] ring-1 ring-pink-200/60 shadow">
              <p className="text-sm text-[#9D174D] opacity-80">Completed</p>
              <h2 className="text-2xl font-bold text-red-500 mt-1">
                {completedCount}
              </h2>
            </div>

          </div>

          {/* EVENTS TABLE */}
          <div className="bg-white rounded-2xl overflow-x-auto border border-[#FBCFE8] ring-1 ring-pink-200/60 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]">

            <table className="w-full text-sm">
              <thead className="bg-[#FCE7F3] text-[#831843]">
                <tr>
                  <th className="px-4 py-3 text-left">Event</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Tickets</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {display.length > 0 ? (
                  display.map((dis) => (
                    <tr
                      key={dis._id}
                      className="border-t border-pink-100 hover:bg-[#FCE7F3] transition-all"
                    >
                      <td className="px-4 py-3 font-semibold">
                        {dis.eventName}
                      </td>
                      <td className="px-4 py-3">{dis.location}</td>
                      <td className="px-4 py-3">{dis.startDate}</td>
                      <td className="px-4 py-3">{dis.totalTicket}</td>
                      <td className="px-4 py-3 text-[#EC4899] font-semibold">
                        {dis.status}
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        <Link to={`/AdminViewEvent/${dis._id}`}>
                          <button className="bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-3 py-1 rounded-lg text-xs hover:scale-105 transition-all">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      No events
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Adminevents;
