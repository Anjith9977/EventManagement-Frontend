import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, CreditCard, Eye, X } from "lucide-react";
import { myBookingApi } from "../../services/AllApi";

function MyBooking() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    getMyBooking();
  }, []);

  const getMyBooking = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const res = await myBookingApi(reqHeader);
      setDisplay(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header />

      {/* Page Title */}
      <div className="pt-28 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          My Bookings
        </h1>
        <p className="text-gray-500 mt-2">
          Here are all the events you have booked tickets for.
        </p>
      </div>

      {/* Bookings List */}
      <div className="mt-12 px-5 lg:px-20 flex flex-col gap-6">
        {/* EMPTY STATE */}
        {display.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            You have not booked any events yet.
          </p>
        )}

        {/* Booking Cards */}
        {display.map((event) => (
          <div
            key={event._id}
            className="bg-white border border-pink-100 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-5 shadow-xl hover:shadow-2xl transition-all"
          >
            {/* Image */}
            <div className="w-full md:w-1/4 h-48 md:h-32 flex-shrink-0">
              <img
                src={`http://localhost:3000/uploads/${event.image}`}
                alt={event.eventName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-gray-900">
                {event.eventName}
              </h3>

              <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {event.startDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {event.endDate}
                </span>
              </div>

              <div className="text-pink-600 font-semibold flex items-center gap-1 text-sm">
                <CreditCard size={16} /> ₹{event.ticketPrice}
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-3">
              {/* ✅ PASS EVENT ID */}
              <Link to={`/view/${event._id}`}>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-5 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all">
                  <Eye size={16} /> View
                </button>
              </Link>

              {/* Cancel (UI only for now) */}
              <button
                disabled
                className="flex items-center justify-center gap-2 bg-white border border-red-300 text-red-400 py-2 px-5 rounded-xl font-semibold cursor-not-allowed"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20"></div>

      <Footer />
    </div>
  );
}

export default MyBooking;
