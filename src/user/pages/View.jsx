import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuserEventApi, paymentApi } from '../../services/AllApi';
import { loadStripe } from '@stripe/stripe-js';
import SERVER_URL from "../../services/server_url";
import { Calendar, MapPin, Tag, Users, ShieldAlert, CreditCard, LogIn } from "lucide-react";

function View() {
  const [display, setDisplay] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem('token');

  useEffect(() => {
    getAuserEvent();
  }, []);

  const getAuserEvent = async () => {
    // Public endpoint — no auth header needed
    try {
      const result = await getAuserEventApi(id);
      setDisplay(result.data);
    } catch (error) {
      console.error('Failed to load event:', error);
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    const token = sessionStorage.getItem('token');

    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
      return;
    }

    const stripe = await loadStripe('pk_test_51SfBlzKjIs046TNDi8GyN5tJDSLsZDmQWLzoNCDySSSNjVQmcVLBgqmFA0u6dzUN5LADr4u6riT96UA9k8w66msI00ahOzCSNr');
    const reqHeader = { authorization: `Bearer ${token}` };

    try {
      const result = await paymentApi(display, reqHeader);
      window.location.href = result.data.url;
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const availableSeats = display.totalTicket - (display.ticketsSold || 0);
  const formattedStartDate = display.startDate
    ? new Date(display.startDate).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50/20 via-white to-rose-50/20">
      <Header />

      {/* Main container */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 pt-32 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-semibold">Loading event details...</p>
          </div>
        ) : (
          <>
            {/* Event Image */}
            <div className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-2xl relative">
              <img
                src={`${SERVER_URL}/uploads/${display.image}`}
                className="w-full h-full object-cover"
                alt="Event Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              <div className="absolute bottom-6 left-6 md:left-10 text-white">
                <span className="bg-pink-600/90 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-md">
                  {display.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 drop-shadow-md tracking-tight">
                  {display.eventName}
                </h1>
              </div>
            </div>

            {/* MAIN SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Highlights bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-pink-100/50 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Venue Location</span>
                      <span className="text-sm font-semibold text-gray-700">{display.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Date & Time</span>
                      <span className="text-sm font-semibold text-gray-700">{formattedStartDate}</span>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="bg-white border border-pink-100/50 p-8 rounded-3xl shadow-lg">
                  <h2 className="text-2xl font-black mb-4 text-gray-900 border-b border-pink-100 pb-3 flex items-center gap-2">
                    <Tag size={20} className="text-pink-500" /> Event Overview
                  </h2>

                  <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base font-medium">
                    {display.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-pink-100/50 flex flex-wrap gap-4 items-center">
                    <span className="text-sm font-bold text-gray-400">Category:</span>
                    <span className="bg-pink-50 text-pink-700 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-pink-100/50">
                      {display.category}
                    </span>
                    <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-gray-200/50 flex items-center gap-1.5">
                      <Users size={14} className="text-gray-500" /> Organizer: {display.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="bg-white border border-pink-100/50 rounded-3xl p-6 shadow-xl space-y-6">
                
                {/* Price Display */}
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block tracking-wider">Ticket Price</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-gray-900">₹{display.ticketPrice}</span>
                    <span className="text-sm font-bold text-gray-400">/ attendee</span>
                  </div>
                </div>

                <hr className="border-pink-100" />

                {/* Seats Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Users size={16} className="text-pink-500" /> Total Capacity:
                    </span>
                    <span className="text-gray-800">{display.totalTicket} Seats</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <CreditCard size={16} className="text-pink-500" /> Booked Seats:
                    </span>
                    <span className="text-gray-800">{display.ticketsSold || 0} Seats</span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold pt-1">
                    <span className="text-gray-500">Available:</span>
                    {availableSeats > 0 ? (
                      <span className="text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full text-xs font-black">
                        {availableSeats} Remaining
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full text-xs font-black">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Visual Seat Progress Bar */}
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-2">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        availableSeats <= 0 ? 'bg-red-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, ((display.ticketsSold || 0) / display.totalTicket) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                {/* Purchase Button */}
                {availableSeats > 0 ? (
                  isLoggedIn ? (
                    <button
                      onClick={makePayment}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 active:scale-95 text-white py-3 rounded-2xl font-bold transition shadow-lg flex items-center justify-center gap-2"
                    >
                      Reserve a Spot
                    </button>
                  ) : (
                    <Link to="/login">
                      <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white py-3 rounded-2xl font-bold transition shadow-lg flex items-center justify-center gap-2">
                        <LogIn size={16} /> Login to Book
                      </button>
                    </Link>
                  )
                ) : (
                  <div className="space-y-3">
                    <button
                      disabled
                      className="w-full bg-gray-200 text-gray-400 py-3 rounded-2xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Sold Out
                    </button>
                    <div className="flex items-center gap-1.5 justify-center text-xs text-red-500 font-semibold bg-red-50/50 p-2.5 rounded-xl border border-red-100/50">
                      <ShieldAlert size={14} /> This event has reached full capacity.
                    </div>
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default View;
