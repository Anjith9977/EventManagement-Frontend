import React, { useState, useEffect } from 'react'
import OrgHeader from '../components/OrgHeader'
import OrgSidebar from '../components/OrgSidebar'
import { CalendarDays, MapPin, Ticket, CloudRain, Edit, XCircle, Tag } from 'lucide-react'
import { deleteEventApi, getAEventApi, updateEventApi } from '../../services/AllApi'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

function Orgview() {

  const [displayEvent, setDisplayEvent] = useState()
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getAeventHandler()
  }, [])

  const getAeventHandler = async () => {
    const token = sessionStorage.getItem('token')
    const reqHeader = { authorization: `bearer ${token}` }
    try {
      const res = await getAEventApi(id, reqHeader)
      setDisplayEvent(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteEvent = async (id, event) => {
    const token = sessionStorage.getItem('token')
    const reqHeader = { authorization: `bearer ${token}` }
    try {
      const res = await deleteEventApi(id, reqHeader)
      if (res.status == 200) {
        toast.success(`Cancelled ${event}`)
        navigate('/orgDashboard')
      } else {
        toast.error(`Cancelling ${event} failed`)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const updateEvent = async () => {

    const token = sessionStorage.getItem('token')

    const reqHeader = {
      authorization: `bearer ${token}`
    }

    const id = selectedEvent._id
    const reqBody = new FormData()

    for (const key in selectedEvent) {
      reqBody.append(key, selectedEvent[key])
    }

    try {
      const res = await updateEventApi(id, reqBody, reqHeader)

      if (res.status == 200) {
        toast.success("Event updated successfully")
        setShowEditModal(false)
        setSelectedEvent(null)
        getAeventHandler()
      }

    }
    catch (err) {
      console.log(err)
    }
  }

  const totalTickets = Number(displayEvent?.totalTicket || 0)
  const ticketPrice = Number(displayEvent?.ticketPrice || 0)
  const maxRevenue = totalTickets * ticketPrice

  return (
    <div className="flex bg-[#FDF2F8] min-h-screen">

      <OrgSidebar />

      <div className="ml-64 w-full">
        <OrgHeader />

        <div className="p-6">

          <h1 className="text-3xl font-extrabold text-[#831843] mb-6">
            Event Overview
          </h1>

          {/* Event Card */}
          <div className="bg-white rounded-2xl p-6 border border-pink-200 shadow mb-8">

            {displayEvent?.image && (
              <div className="w-full max-h-[400px] overflow-hidden rounded-2xl mb-5">
                <img
                  src={`https://eventmanagement-backend.onrender.com/uploads/${displayEvent.image}`}
                  
                  alt={displayEvent.eventName}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-[#9D174D] mb-4">
              {displayEvent?.eventName}
            </h2>

            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">

              <div className="flex items-center gap-3">
                <CalendarDays className="text-pink-500" />
                <span>{displayEvent?.startDate} — {displayEvent?.endDate}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-pink-500" />
                <span>{displayEvent?.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Ticket className="text-pink-500" />
                <span>{displayEvent?.totalTicket} Tickets</span>
              </div>

              {/* CATEGORY DISPLAY */}
              <div className="flex items-center gap-3">
                <Tag className="text-pink-500" />
                <span>{displayEvent?.category}</span>
              </div>

            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Stat title="Total Tickets" value={totalTickets} />
            <Stat title="Ticket Price" value={`₹${ticketPrice}`} />
            <Stat title="Max Revenue" value={`₹${maxRevenue}`} />
            <Stat title="Duration" value={`${displayEvent?.startDate} → ${displayEvent?.endDate}`} />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-pink-200 shadow mb-8">
            <h3 className="text-xl font-semibold text-[#831843] mb-3">
              Event Description
            </h3>
            <p className="text-gray-600">{displayEvent?.description}</p>
          </div>

          {/* MAP */}
          <div className="p-6 border-t">
            <h3 className="text-xl font-semibold text-[#831843] mb-4">
              Event Location
            </h3>

            <div className="rounded-xl overflow-hidden border h-56">
              <iframe
                title="Event Location"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
                src={`https://www.google.com/maps?q=${encodeURIComponent(displayEvent?.location)}&output=embed`}
              />
            </div>

            <p className="text-sm mt-2">📍 {displayEvent?.location}</p>
          </div>

          {/* ACTIONS */}
          <div className="bg-white rounded-2xl p-6 border shadow">
            <h3 className="text-xl font-semibold text-[#831843] mb-4">
              Organizer Actions
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedEvent(displayEvent)
                  setShowEditModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white"
              >
                <Edit size={18} /> Edit Event
              </button>

              <button
                onClick={() => deleteEvent(displayEvent._id, displayEvent.eventName)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                <XCircle size={18} /> Cancel Event
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">

            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4">
              <XCircle />
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit Event</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input value={selectedEvent.eventName}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, eventName: e.target.value })}
                className="border p-2 rounded-lg" />

              <input value={selectedEvent.category}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
                placeholder="Category"
                className="border p-2 rounded-lg" />

              <input value={selectedEvent.location}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                className="border p-2 rounded-lg" />

              <input type="date" value={selectedEvent.startDate}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, startDate: e.target.value })}
                className="border p-2 rounded-lg" />

              <input type="date" value={selectedEvent.endDate}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, endDate: e.target.value })}
                className="border p-2 rounded-lg" />

              <input value={selectedEvent.totalTicket}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, totalTicket: e.target.value })}
                className="border p-2 rounded-lg" />

              <input value={selectedEvent.ticketPrice}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, ticketPrice: e.target.value })}
                className="border p-2 rounded-lg" />
            </div>

            <textarea
              value={selectedEvent.description}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
              className="border p-2 rounded-lg w-full mt-4"
              rows="4"
            />

            <input
              type="file"
              onChange={(e) => setSelectedEvent({ ...selectedEvent, image: e.target.files[0] })}
              className="mt-4"
            />

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setShowEditModal(false)} className="border px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={updateEvent} className="bg-pink-500 text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-2xl p-5 border shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
)

export default Orgview
