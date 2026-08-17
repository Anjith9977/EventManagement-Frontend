import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, CreditCard, Eye, X, User, Download } from "lucide-react";
import { deleteMyBookingApi, myBookingApi } from "../../services/AllApi";
import { toast } from "react-toastify";
import SERVER_URL from "../../services/server_url";

function MyBooking() {
  const [display, setDisplay] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

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
      const res = await deleteMyBookingApi(id, reqHeader);

      if (res.status === 200) {
        toast.success("Refund will be processed within 7 days");
        getMyBooking();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const printTicket = (booking) => {
    const username = JSON.parse(sessionStorage.getItem("users") || "{}").username || 'Guest';
    const formattedDate = new Date(booking.eventId?.startDate).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const printContent = `
      <html>
        <head>
          <title>E-Ticket - ${booking.eventId?.eventName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Plus Jakarta Sans', sans-serif; 
              background-color: #f9fafb;
              margin: 0;
              padding: 0;
            }
            @media print {
              body { background-color: white; }
              .no-print { display: none; }
              @page {
                size: auto;
                margin: 0mm;
              }
            }
          </style>
        </head>
        <body class="p-8 flex justify-center items-center min-h-screen">
          <div class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 flex flex-col md:flex-row">
            <!-- Left Main Card -->
            <div class="flex-1 p-8 relative">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <span class="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    ${booking.eventId?.category || 'Event'} Entry Pass
                  </span>
                  <h1 class="text-2xl font-extrabold text-gray-900 mt-2">${booking.eventId?.eventName}</h1>
                </div>
                <div class="text-right">
                  <span class="text-xs text-gray-400 block uppercase font-medium">Ticket Price</span>
                  <span class="text-lg font-bold text-pink-600">₹${booking.eventId?.ticketPrice}</span>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span class="text-xs text-gray-400 uppercase block font-medium">Date</span>
                  <span class="text-sm font-semibold text-gray-800">${formattedDate}</span>
                </div>
                <div>
                  <span class="text-xs text-gray-400 uppercase block font-medium">Venue</span>
                  <span class="text-sm font-semibold text-gray-800">${booking.eventId?.location}</span>
                </div>
                <div>
                  <span class="text-xs text-gray-400 uppercase block font-medium">Attendee</span>
                  <span class="text-sm font-semibold text-gray-800">${username}</span>
                </div>
                <div>
                  <span class="text-xs text-gray-400 uppercase block font-medium">Booking ID</span>
                  <span class="text-xs font-mono font-semibold text-gray-600 block truncate max-w-[150px]">${booking._id}</span>
                </div>
              </div>

              <div class="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
                <div>
                  <span class="text-xs text-gray-400 uppercase block font-medium">Quantity</span>
                  <span class="text-lg font-bold text-gray-900">${booking.ticketsCount} Ticket(s)</span>
                </div>
                <div class="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-200 p-1">
                  <svg viewBox="0 0 100 100" class="w-12 h-12">
                    <path d="M10,10 h30 v30 h-30 z M10,60 h30 v30 h-30 z M60,10 h30 v30 h-30 z M10,20 h10 v10 h-10 z M10,70 h10 v10 h-10 z M60,20 h10 v10 h-10 z M25,25 h10 v10 h-10 z M25,75 h10 v10 h-10 z M75,25 h10 v10 h-10 z M60,60 h10 v10 h-10 z M75,75 h15 v15 h-15 z M60,80 h10 v10 h-10 z" fill="#831843"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Dotted Divider Line -->
            <div class="hidden md:flex flex-col justify-between items-center relative py-4">
              <div class="w-6 h-6 bg-gray-100 rounded-full -mt-7 border-b border-gray-200"></div>
              <div class="h-full border-r-2 border-dashed border-gray-200 my-2"></div>
              <div class="w-6 h-6 bg-gray-100 rounded-full -mb-7 border-t border-gray-200"></div>
            </div>

            <!-- Right Stub -->
            <div class="w-full md:w-48 bg-pink-50/50 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-pink-100">
              <div class="text-center md:text-left">
                <span class="text-xs text-pink-400 uppercase font-semibold">Stub</span>
                <h3 class="font-extrabold text-gray-800 mt-1 truncate">${booking.eventId?.eventName}</h3>
                <p class="text-xs text-gray-500 mt-1 truncate">${booking.eventId?.location}</p>
              </div>
              
              <div class="my-6 border-t border-pink-200 border-dashed pt-4">
                <span class="text-xs text-gray-400 block font-medium">Total Amount</span>
                <span class="text-xl font-black text-pink-600">₹${booking.totalAmount}</span>
              </div>

              <div class="text-center">
                <span class="text-xs font-mono bg-pink-100 text-pink-700 px-2 py-1 rounded block truncate">${booking._id.substring(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(printContent);
    iframe.contentWindow.document.close();

    iframe.contentWindow.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 500);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-rose-50/50">
      <Header />

      {/* Page Title */}
      <div className="pt-32 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
          My Bookings
        </h1>
        <p className="text-gray-500 mt-3 text-base md:text-lg max-w-xl mx-auto font-medium">
          Manage your booked tickets, download your e-tickets, or handle your upcoming events.
        </p>
      </div>

      {/* Bookings List */}
      <div className="mt-12 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-6">
        {/* EMPTY STATE */}
        {display.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-pink-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Bookings Yet</h3>
            <p className="text-gray-500 mt-2 text-sm px-6">
              You haven't purchased tickets for any events. Browse the events page to find something exciting!
            </p>
            <Link to="/all-events">
              <button className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg">
                Explore Events
              </button>
            </Link>
          </div>
        )}

        {/* Booking Cards */}
        {display.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-pink-100/50 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl hover:shadow-2xl hover:border-pink-200/50 transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full md:w-1/4 h-48 md:h-36 relative overflow-hidden rounded-2xl shadow-inner">
              <img
                src={`${SERVER_URL}/uploads/${booking.eventId?.image}`}
                alt={booking.eventId?.eventName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-pink-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                {booking.eventId?.category || 'Event'}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-3 w-full">
              <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">
                {booking.eventId?.eventName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-500 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-pink-500 shrink-0" />
                  {booking.eventId?.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-pink-500 shrink-0" />
                  {new Date(booking.eventId?.startDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-1">
                <div className="text-pink-600 font-extrabold text-lg flex items-center gap-1">
                  ₹{booking.eventId?.ticketPrice}
                </div>
                <div className="text-xs bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full border border-gray-200/50">
                  Qty: {booking.ticketsCount}
                </div>
                <div className="text-xs bg-pink-50 text-pink-700 font-bold px-3 py-1 rounded-full border border-pink-100/50">
                  Total Paid: ₹{booking.totalAmount}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex w-full md:w-auto md:flex-col gap-3 justify-end mt-4 md:mt-0">
              <button
                onClick={() => setSelectedTicket(booking)}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white py-3 px-5 rounded-2xl font-bold text-sm transition shadow-md whitespace-nowrap"
              >
                <Download size={16} /> E-Ticket
              </button>

              <button
                onClick={() => deleteMyBooking(booking._id)}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 border-2 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-500 py-3 px-5 rounded-2xl font-bold text-sm transition whitespace-nowrap"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xl w-full border border-pink-100 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition z-10"
            >
              <X size={20} />
            </button>

            {/* Ticket Wrapper */}
            <div className="flex flex-col">
              {/* Ticket Header Banner */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white relative">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {selectedTicket.eventId?.category || 'Event'} Entry Pass
                </span>
                <h2 className="text-2xl font-black mt-2 drop-shadow-sm truncate">
                  {selectedTicket.eventId?.eventName}
                </h2>
                <div className="absolute -bottom-3 left-0 right-0 flex justify-between px-6 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-white -mb-3 shadow-inner"></div>
                  ))}
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-8 pt-10 bg-white">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">Date</span>
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mt-1">
                      <Calendar size={14} className="text-pink-500" />
                      {new Date(selectedTicket.eventId?.startDate).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">Location / Venue</span>
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mt-1">
                      <MapPin size={14} className="text-pink-500" />
                      {selectedTicket.eventId?.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">Attendee</span>
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mt-1">
                      <User size={14} className="text-pink-500" />
                      {JSON.parse(sessionStorage.getItem("users") || "{}").username || 'Guest'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">Reference ID</span>
                    <span className="text-xs font-mono font-bold text-gray-600 mt-1 block truncate">
                      {selectedTicket._id}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">Ticket Quantity</span>
                    <span className="text-lg font-black text-gray-900 mt-1 block">
                      {selectedTicket.ticketsCount} {selectedTicket.ticketsCount > 1 ? 'Tickets' : 'Ticket'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block text-right font-bold font-bold">Total Price</span>
                    <span className="text-lg font-black text-pink-600 mt-1 block text-right">
                      ₹{selectedTicket.totalAmount}
                    </span>
                  </div>
                </div>

                {/* QR Code and Instructions */}
                <div className="mt-8 flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl p-6 border border-pink-100/50">
                  <div className="w-32 h-32 bg-white flex items-center justify-center rounded-xl shadow-md border border-gray-100 p-2">
                    <svg viewBox="0 0 100 100" className="w-28 h-28">
                      <path d="M10,10 h30 v30 h-30 z M10,60 h30 v30 h-30 z M60,10 h30 v30 h-30 z M10,20 h10 v10 h-10 z M10,70 h10 v10 h-10 z M60,20 h10 v10 h-10 z M25,25 h10 v10 h-10 z M25,75 h10 v10 h-10 z M75,25 h10 v10 h-10 z M60,60 h10 v10 h-10 z M75,75 h15 v15 h-15 z M60,80 h10 v10 h-10 z" fill="#831843" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-widest text-center">
                    Scan this QR code at the event entrance
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-xl transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => printTicket(selectedTicket)}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold px-6 py-2 rounded-xl text-sm transition shadow-lg"
                >
                  Download E-Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-20"></div>

      <Footer />
    </div>
  );
}

export default MyBooking;
