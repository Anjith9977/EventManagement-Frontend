import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, CreditCard, Eye, X } from "lucide-react";
import { deleteMyBookingApi, myBookingApi } from "../../services/AllApi";
import { toast } from "react-toastify";

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


  const deleteMyBooking = async (id) => {

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {

      const res = await deleteMyBookingApi(id, reqHeader)

      getMyBooking();

      if (res.status === 200) {
        toast.success("Refund will be processed within 7 days");
        getMyBooking(); 
      }

    } catch (error) {
      console.log(error);

    }
  }



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
          <p>You have not booked any events yet.</p>
        )}


        {/* Booking Cards */}
        {display.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-pink-100 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-5 shadow-xl"
          >
            {/* Image */}
            <div className="w-full md:w-1/4 h-48 md:h-32">
              <img
                src={`https://eventmanagement-backend.onrender.com/uploads/${booking.eventId?.image}`}
                alt={booking.eventId?.eventName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="font-bold text-lg">
                {booking.eventId?.eventName}
              </h3>

              <div className="flex flex-wrap text-gray-500 text-sm gap-4">
                <span>{booking.eventId?.location}</span>
                <span>{booking.eventId?.startDate}</span>
                <span>{booking.eventId?.endDate}</span>
              </div>

              <div className="text-pink-600 font-semibold text-sm">
                ₹{booking.eventId?.ticketPrice}
              </div>

              <p className="text-sm text-gray-600">
                Tickets: {booking.ticketsCount}
              </p>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-3">
              <Link to={`/view/${booking.eventId?._id}`}>
                <button className="bg-pink-500 text-white py-2 px-5 rounded-xl">
                  View
                </button>
              </Link>

              <button
                onClick={() => deleteMyBooking(booking._id)}
                className="border border-red-300 text-red-400 py-2 px-5 rounded-xl"
              >
                Cancel
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
