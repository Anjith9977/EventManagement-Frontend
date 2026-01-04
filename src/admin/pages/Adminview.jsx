import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function Adminview() {
  return (
    <div className="flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen bg-[#FDF2F8]">

        {/* Header */}
        <AdminHeader
          title="Organizer Details"
          subtitle="View and manage all information for this organizer and their events."
        />

        {/* Page Content */}
        <div className="p-6">

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Organizer Details
          </h1>

          {/* Organizer Info Card */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-[#FBCFE8] shadow">

            <h2 className="text-xl font-semibold text-[#831843] mb-1">
              Skyline Events
            </h2>

            <p className="text-sm text-[#831843] opacity-70 mb-4">
              Organizer since: Jan 2024
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-[#831843] opacity-80">Email</p>
                <p className="font-bold text-lg">skyline@gmail.com</p>
              </div>

              <div>
                <p className="text-sm text-[#831843] opacity-80">Total Events</p>
                <p className="font-bold text-lg">5</p>
              </div>

              <div>
                <p className="text-sm text-[#831843] opacity-80">Account Status</p>
                <p className="font-bold text-lg text-green-600">Approved</p>
              </div>

              <div>
                <p className="text-sm text-[#831843] opacity-80">Organizer ID</p>
                <p className="font-bold text-lg">ORG-1023</p>
              </div>

            </div>
          </div>

          {/* Action Section */}
          <div className="bg-white rounded-2xl p-6 border border-[#FBCFE8] shadow">

            <h2 className="text-lg font-semibold text-[#831843] mb-4">
              Admin Actions
            </h2>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Approve Organizer
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Reject Organizer
              </button>
            </div>

            <p className="mt-4 text-[#831843]">
              Status:{' '}
              <span className="font-semibold text-green-600">
                Approved
              </span>
            </p>
          </div>

          {/* Events List Table */}
          <div className="bg-white rounded-2xl mt-8 border border-[#FBCFE8] shadow overflow-x-auto">

            <h2 className="text-lg font-semibold text-[#831843] p-4 border-b border-[#FBCFE8]">
              Events by Organizer
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-[#831843] text-sm">
                  <th className="px-4 py-3 text-left">Event Name</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Total Tickets</th>
                  <th className="px-4 py-3 text-left">Ticket Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-[#FCE7F3] transition-all">
                  <td className="px-4 py-3 font-medium">Music Fest 2025</td>
                  <td className="px-4 py-3">12 Jan 2025</td>
                  <td className="px-4 py-3">500</td>
                  <td className="px-4 py-3">₹1,000</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    Upcoming
                  </td>
                </tr>

                <tr className="hover:bg-[#FCE7F3] transition-all">
                  <td className="px-4 py-3 font-medium">Startup Meetup</td>
                  <td className="px-4 py-3">20 Dec 2024</td>
                  <td className="px-4 py-3">200</td>
                  <td className="px-4 py-3">₹300</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">
                    Ongoing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Adminview
