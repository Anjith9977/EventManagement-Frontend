import React, { useEffect, useState } from 'react';
import OrgHeader from '../components/OrgHeader';
import OrgSidebar from '../components/OrgSidebar';
import { addEventApi, getOrganizerStatusApi } from '../../services/AllApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function CreateEvent() {

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    location: "",
    startDate: "",
    endDate: "",
    totalTicket: "",
    ticketPrice: "",
    description: "",
    category: "",
    image: ""
  });

  const [orgStatus, setOrgStatus] = useState(null);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getOrganizerStatus();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { eventName, location, startDate, endDate, totalTicket, ticketPrice, description, category, image } = eventDetails;

    if (eventName && location && startDate && endDate && totalTicket && ticketPrice && description && category && image) {

      const token = sessionStorage.getItem('token');

      const reqHeader = {
        authorization: `Bearer ${token}`
      };

      const reqBody = new FormData();

      for (const key in eventDetails) {
        reqBody.append(key, eventDetails[key]);
      }

      try {
        const res = await addEventApi(reqBody, reqHeader);

        if (res.status == 200) {
          toast.success("Event added succesfully");
          setEventDetails({
            eventName: "",
            location: "",
            startDate: "",
            endDate: "",
            totalTicket: "",
            ticketPrice: "",
            description: "",
            category: "",
            image: ""
          });
          navigate('/orgDashboard');
        }
        else if (res.status == 409) {
          toast.info(res.response.data);
        }
        else {
          toast.warning("somthing wen wrong");
        }

      } catch (err) {
        console.log(err);
      }
    }
  };

  const getOrganizerStatus = async () => {

    const token = sessionStorage.getItem('token');

    const reqHeader = {
      authorization: `Bearer ${token}`
    };

    try {
      const res = await getOrganizerStatusApi(reqHeader);
      setOrgStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <OrgSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="w-full md:ml-64 bg-[#FDF2F8] min-h-screen">

        {/* Header */}
        <OrgHeader
          title="Create Event"
          subtitle="Fill in the details to create a new event"
          setOpen={setOpen}
        />

        {/* Page Content */}
        <div className="p-6">

          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            New Event
          </h1>

          {
            orgStatus === "approved" ? (

              <div className="bg-white rounded-2xl p-6 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)] border border-[#FBCFE8]">

                {/* Event Name */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#831843] mb-2">
                    Event Name
                  </label>
                  <input
                    value={eventDetails.eventName}
                    onChange={(e) => setEventDetails({ ...eventDetails, eventName: e.target.value })}
                    type="text"
                    placeholder="Enter your event name"
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#831843] mb-2">
                    Category
                  </label>
                  <input
                    value={eventDetails.category}
                    onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
                    type="text"
                    placeholder="Music, Tech, Sports, Workshop..."
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                  />
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#831843] mb-2">
                    Location
                  </label>
                  <input
                    value={eventDetails.location}
                    onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                    type="text"
                    placeholder="City or Venue"
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#831843] mb-2">
                      Start Date
                    </label>
                    <input
                      value={eventDetails.startDate}
                      onChange={(e) => setEventDetails({ ...eventDetails, startDate: e.target.value })}
                      type="date"
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#831843] mb-2">
                      End Date
                    </label>
                    <input
                      value={eventDetails.endDate}
                      onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
                      type="date"
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                    />
                  </div>
                </div>

                {/* Tickets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#831843] mb-2">
                      Total Tickets
                    </label>
                    <input
                      value={eventDetails.totalTicket}
                      onChange={(e) => setEventDetails({ ...eventDetails, totalTicket: e.target.value })}
                      type="number"
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#831843] mb-2">
                      Ticket Price (₹)
                    </label>
                    <input
                      value={eventDetails.ticketPrice}
                      onChange={(e) => setEventDetails({ ...eventDetails, ticketPrice: e.target.value })}
                      type="number"
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#831843] mb-2">
                    Description
                  </label>
                  <textarea
                    value={eventDetails.description}
                    onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                    rows="5"
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition resize-none"
                  />
                </div>

                {/* Image */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#831843] mb-2">
                    Event Image
                  </label>
                  <input
                    onChange={(e) => setEventDetails({ ...eventDetails, image: e.target.files[0] })}
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
                  >
                    Create Event
                  </button>
                  <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all">
                    Cancel
                  </button>
                </div>

              </div>

            ) : orgStatus === "rejected" ? (

              <div className="bg-white rounded-2xl p-10 border border-red-200 shadow text-center max-w-xl mx-auto">
                <div className="text-6xl mb-4">🚫</div>
                <h2 className="text-xl font-bold text-red-600">
                  Organizer Request Rejected
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Your organizer account has been rejected by the admin.
                  You are not allowed to create events at the moment.
                </p>
                <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  Please contact the admin for further clarification.
                </div>
                <button
                  onClick={() => navigate("/orgDashboard")}
                  className="mt-6 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Go to Dashboard
                </button>
              </div>

            ) : (

              <div className="bg-white rounded-2xl p-10 border border-pink-200 shadow text-center max-w-xl mx-auto">
                <div className="text-5xl mb-4">⏳</div>
                <h2 className="text-xl font-bold text-[#831843]">
                  Waiting for Approval
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Your organizer account is under review.
                  You can create events once the admin approves your account.
                </p>
              </div>

            )
          }

        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
