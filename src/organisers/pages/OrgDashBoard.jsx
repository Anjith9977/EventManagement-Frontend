import React, { useEffect, useState } from "react";
import OrgHeader from "../components/OrgHeader";
import OrgSidebar from "../components/OrgSidebar";
import { Link } from "react-router-dom";
import { getDashBoardEventApi } from "../../services/AllApi";
import SERVER_URL from "../../services/server_url";

function OrgDashBoard() {

  const [dashBoardEvent, setDashBoardEvent] = useState([]);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getDashBoardEvent();
  }, []);

  const getDashBoardEvent = async () => {

    const token = sessionStorage.getItem('token');

    const reqHeader = {
      authorization: `bearer ${token}`
    };

    try {
      const res = await getDashBoardEventApi(reqHeader);
      setDashBoardEvent(res.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  /* ===== EXISTING LOGIC (UNCHANGED) ===== */
  const today = new Date();

  const upcoming =
    dashBoardEvent.length > 0
      ? dashBoardEvent.filter(
        (event) => new Date(event.startDate) > today
      ).length
      : 0;

  const avgTicketPrice =
    dashBoardEvent.length > 0
      ? Math.round(
        dashBoardEvent.reduce(
          (sum, event) => sum + Number(event.ticketPrice),
          0
        ) / dashBoardEvent.length
      )
      : 0;

  const totalTicket =
    dashBoardEvent.length > 0
      ? dashBoardEvent.reduce(
        (sum, event) => sum + event.totalTicket,
        0
      )
      : 0;

  return (
    <div className="flex bg-[#FDF2F8] min-h-screen">

      {/* Sidebar */}
      <OrgSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="w-full md:ml-64">

        {/* Header (NOT FIXED) */}
        <OrgHeader
          title="Organizer Dashboard"
          subtitle="Overview of your upcoming events and key details."
          setOpen={setOpen}
        />

        {/* Page Content */}
        <div className="p-6">

          {/* ================= Stats ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow">
              <p className="text-sm text-[#9D174D]">Total Events</p>
              <h2 className="text-2xl font-bold text-[#831843]">
                {dashBoardEvent.length}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow">
              <p className="text-sm text-[#9D174D]">Upcoming Events</p>
              <h2 className="text-2xl font-bold text-[#EC4899]">
                {upcoming}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow">
              <p className="text-sm text-[#9D174D]">Total Tickets</p>
              <h2 className="text-2xl font-bold text-green-600">
                {totalTicket}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow">
              <p className="text-sm text-[#9D174D]">Avg Ticket Price</p>
              <h2 className="text-2xl font-bold text-[#831843]">
                ₹{avgTicketPrice}
              </h2>
            </div>

          </div>

          {/* ================= Quick Actions ================= */}
          <div className="flex gap-4 mb-10">
            <Link
              to="/createEvent"
              className="bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-6 py-2 rounded-xl text-sm hover:scale-105 transition-all"
            >
              + Create Event
            </Link>

            <Link
              to="/eventForm"
              className="bg-white border border-pink-200 text-[#831843] px-6 py-2 rounded-xl text-sm hover:bg-[#FCE7F3]"
            >
              View All Events
            </Link>
          </div>

          {/* ================= Upcoming Events ================= */}
          <h3 className="text-lg font-semibold text-[#831843] mb-4">
            Upcoming Events
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {dashBoardEvent.length > 0 ? (
              dashBoardEvent.map((event) => (

                <div
                  key={event._id}
                  className="bg-white rounded-2xl border border-pink-200 shadow hover:shadow-lg transition overflow-hidden"
                >

                  <div className="h-36 w-full overflow-hidden">
                    <img
                      src={`${SERVER_URL}/uploads/${event.image}`}
                      alt={event.eventName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="text-base font-bold text-[#831843] truncate">
                      {event.eventName}
                    </h4>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-3 text-xs text-gray-700 space-y-1">
                      <p><strong>Date:</strong> {event.startDate}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p>
                        <strong>Ticket Price:</strong>{" "}
                        {event.ticketPrice === 0
                          ? "Free Event"
                          : `₹${event.ticketPrice}`}
                      </p>
                      <p><strong>Total Tickets:</strong> {event.totalTicket}</p>
                    </div>

                    <Link to={`/orgview/${event._id}`}>
                      <button className="mt-3 w-full bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white py-1.5 rounded-lg text-xs">
                        View Event
                      </button>
                    </Link>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center">
                <div className="flex flex-col items-center justify-center bg-white border border-pink-200 rounded-2xl py-16 px-8 shadow text-center max-w-lg w-full">

                  <div className="w-16 h-16 rounded-full bg-[#FCE7F3] flex items-center justify-center mb-4">
                    <span className="text-3xl">📅</span>
                  </div>

                  <h2 className="text-xl font-semibold text-[#831843]">
                    No Events Yet
                  </h2>

                  <p className="text-sm text-gray-600 mt-2">
                    You haven’t created any events yet.
                  </p>

                  <Link
                    to="/createEvent"
                    className="mt-6 bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-6 py-2 rounded-xl text-sm hover:scale-105 transition-all"
                  >
                    + Create Your First Event
                  </Link>

                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default OrgDashBoard;
