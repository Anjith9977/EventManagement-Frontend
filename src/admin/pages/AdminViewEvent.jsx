import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { useParams } from 'react-router'
import { getAadminEventApi, getAadminOrgApi } from '../../services/AllApi'
import { toast } from 'react-toastify'


function AdminViewEvent() {

  const [display, setDisplay] = useState({})
  const [orgData, setOrgData] = useState({})
  

  const { id } = useParams()

  useEffect(() => {
    getAevent()
  }, [])

  useEffect(() => {
    if (display.email) {
      getAadminOrg()
    }
  }, [display])



  const getAevent = async () => {
    const token = sessionStorage.getItem("token")

    const reqHeader = {
      authorization: `bearer ${token}`
    }

    try {

      const res = await getAadminEventApi(id, reqHeader)
      console.log(res);
      setDisplay(res.data)


    } catch (error) {
      console.log(error)
    }
  }


  const getAadminOrg = async () => {

    const token = sessionStorage.getItem("token")

    const reqHeader = {
      authorization: `bearer ${token}`
    }

    try {

      const reqBody = display.email

      const res = await getAadminOrgApi(reqBody, reqHeader)
      setOrgData(res.data)


    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="flex bg-[#FDF2F8] min-h-screen">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 w-full">

        {/* Header */}
        <AdminHeader
          title="View Event Details"
          subtitle="Monitor and manage all information for this event, including tickets, pricing, and status."
        />

        {/* Page Content */}
        <div className="p-6 space-y-8">

          {/* Event Overview Card */}
          <div className="bg-white rounded-2xl p-6 border border-pink-200 ring-1 ring-pink-200/60 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]">
            <h1 className="text-2xl font-extrabold text-[#831843] mb-2">
              {display.eventName}
            </h1>
            <p className="text-gray-600 mb-4">
              Location: {display.location}
            </p>

            {/* Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm">Total Tickets</p>
                <p className="font-bold text-xl">{display.totalTicket}</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm">Tickets Sold</p>
                <p className="font-bold text-xl text-orange-600">{display.ticketsSold || 0}</p>
              </div>

              <div className={`p-4 rounded-xl text-center ${ (display.totalTicket - (display.ticketsSold||0)) > 0 ? 'bg-green-50' : 'bg-red-50' }`}>
                <p className="text-gray-500 text-sm">Available</p>
                <p className={`font-bold text-xl ${ (display.totalTicket - (display.ticketsSold||0)) > 0 ? 'text-green-600' : 'text-red-600' }`}>
                  {display.totalTicket - (display.ticketsSold || 0)}
                </p>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm">Ticket Price</p>
                <p className="font-bold text-xl text-pink-600">₹{display.ticketPrice}</p>
              </div>

            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-2xl p-6 border border-pink-200 ring-1 ring-pink-200/60 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]">

            <h2 className="text-xl font-semibold text-[#831843] mb-4">
              Event Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Event Dates */}
              <div>
                <p className="text-sm text-gray-500">Event Dates</p>
                <p className="font-semibold text-gray-800">
                  {display.startDate} → {display.endDate || "N/A"}
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold text-gray-800">
                  {display.category}
                </p>
              </div>

              {/* Ticket Price */}
              <div>
                <p className="text-sm text-gray-500">Ticket Price</p>
                <p className="font-semibold text-pink-600">
                  ₹{display.ticketPrice}
                </p>
              </div>

              {/* Event Location */}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Event Location</p>
                <p className="font-semibold text-gray-800">
                  {display.location}
                </p>
              </div>

              {/* Event Description */}
              {display.description && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Event Description</p>
                  <p className="text-gray-700 leading-relaxed">
                    {display.description}
                  </p>
                </div>
              )}

            </div>
          </div>


          {/* Organizer Info */}
          <div className="bg-white rounded-2xl p-6 border border-pink-200 ring-1 ring-pink-200/60 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]">
            <h2 className="text-xl font-semibold text-[#831843] mb-2">
              Organizer Info
            </h2>
            <p className="text-gray-600 mb-2"></p>
            <p className="text-gray-600 mb-2"><span className='font-bold text-black'>Organizer name :</span> {orgData.username}</p>
            <p className="text-gray-600"><span className='font-bold text-black'>Organizer ph :</span> {orgData.Phone}</p>
            <p className="text-gray-600"><span className='font-bold text-black'>Organizer mail :</span> {orgData.email}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminViewEvent
