import React from 'react';
import OrgHeader from '../components/OrgHeader';
import OrgSidebar from '../components/OrgSidebar';
import { Link } from 'react-router-dom';
import { getAllEventsApi } from '../../services/AllApi';
import { useEffect } from 'react';
import { useState } from 'react';

function MyEvents() {

  const [displayEvent, setDisplayEvent] = useState([])
  console.log(displayEvent);


  useEffect(() => {
    getAllEventHandler()
  }, [])


  const getAllEventHandler = async () => {

    const token = sessionStorage.getItem('token')

    const reqHeader = {
      authorization: `bearer ${token}`
    }

    try {
      const res = await getAllEventsApi(reqHeader)
      // console.log(res)
      setDisplayEvent(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getEventStatus = (startDate, endDate) => {
    const [sd, sm, sy] = startDate.split('.')
    const [ed, em, ey] = endDate.split('.')

    const start = new Date(`${sy}-${sm}-${sd}`)
    const end = new Date(`${ey}-${em}-${ed}`)
    const today = new Date()

    if (today < start) return "UPCOMING"
    if (today > end) return "COMPLETED"
    return "ONGOING"
  }

  const upcomingCount = displayEvent.filter(e => getEventStatus(e.startDate, e.endDate) === "UPCOMING").length
  const ongoingCount = displayEvent.filter(e => getEventStatus(e.startDate, e.endDate) === "ONGOING").length
  const completedCount = displayEvent.filter(e => getEventStatus(e.startDate, e.endDate) === "COMPLETED").length





  return (
    <div className="flex">

      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="ml-64 w-full bg-[#FDF2F8] min-h-screen">

        {/* Header */}
        <OrgHeader
          title="My Events"
          subtitle="View, edit, and manage all your created events"
        />

        {/* Page Content */}
        <div className="p-6">

          {/* Page Title */}
          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            Your Events
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Total Events */}
            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] shadow-[0_10px_30px_-12px_rgba(236,72,153,0.35)]">
              <p className="text-sm text-[#9D174D] opacity-80">Total Events</p>
              <h2 className="text-2xl font-bold text-[#831843] mt-1">{displayEvent.length}</h2>
            </div>

            {/* Upcoming */}
            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] shadow-[0_10px_30px_-12px_rgba(236,72,153,0.35)]">
              <p className="text-sm text-[#9D174D] opacity-80">Upcoming Events</p>
              <h2 className="text-2xl font-bold text-[#EC4899] mt-1">
                {upcomingCount}
              </h2>
            </div>

            {/* Ongoing */}
            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] shadow-[0_10px_30px_-12px_rgba(236,72,153,0.35)]">
              <p className="text-sm text-[#9D174D] opacity-80">Ongoing Events</p>
              <h2 className="text-2xl font-bold text-green-600 mt-1">
                {ongoingCount}
              </h2>
            </div>

            {/* Completed */}
            <div className="bg-white p-5 rounded-2xl border border-[#FBCFE8] shadow-[0_10px_30px_-12px_rgba(236,72,153,0.35)]">
              <p className="text-sm text-[#9D174D] opacity-80">Completed</p>
              <h2 className="text-2xl font-bold text-gray-700 mt-1">
                {completedCount}
              </h2>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-2xl overflow-x-auto border border-[#FBCFE8] shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]">
            <table className="w-full text-sm">
              <thead className="bg-[#FCE7F3] text-[#831843]">
                <tr>
                  <th className="px-4 py-3 text-left">Event</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Tickets Sold</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Location</th>
                </tr>
              </thead>

              <tbody>
                {/* Event 1 */}
                {
                  displayEvent.length > 0 ?
                    displayEvent.map((event) => (
                      <tr className="border-t border-pink-100 hover:bg-[#FCE7F3] transition-all">
                        <td className="px-4 py-3 font-semibold">{event.eventName}</td>
                        <td className="px-4 py-3">{event.startDate}</td>
                        <td className="px-4 py-3">{event.totalTicket}</td>
                        <td className="px-4 py-3">{event.ticketPrice}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventStatus(event.startDate, event.endDate) === "UPCOMING"? "bg-pink-100 text-pink-700": getEventStatus(event.startDate, event.endDate) === "ONGOING"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"}`}
                          >
                            {getEventStatus(event.startDate, event.endDate)}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-[#EC4899] font-semibold">{event.location}</td>
                        <td className="px-4 py-3 space-x-2">
                          <Link to={`/orgview/${event._id}`}>
                            <button className="bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-3 py-1 rounded-lg text-xs hover:scale-105 transition-all">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                    :
                    <h1>no events</h1>
                }


              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MyEvents;
