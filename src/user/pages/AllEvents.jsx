import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Eye, Ticket, MapPin, Calendar, Clock, CreditCard, Search, Tag, Users } from "lucide-react";
import { getAllUserEvent } from "../../services/AllApi";
import { searchkeycontext } from "../../context/Context";
import SERVER_URL from "../../services/server_url";

function AllEvents() {
  const [displayEvent, setDisplayEvent] = useState([]);
  const [dummyDonations, setDummyDonations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { searchkey, SetSearchkey } = useContext(searchkeycontext);

  useEffect(() => {
    getAllEvent();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let filtered = dummyDonations;

    // search filter
    if (searchkey.trim() !== "") {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(searchkey.toLowerCase())
      );
    }

    // category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    setDisplayEvent(filtered);
  }, [searchkey, selectedCategory, dummyDonations]);

  const getAllEvent = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `bearer ${token}`,
    };

    try {
      const res = await getAllUserEvent(searchkey, reqHeader);
      // Guard: ensure res.data is an array before setting state (prevents .length crash)
      const data = Array.isArray(res.data) ? res.data : [];
      setDisplayEvent(data);
      setDummyDonations(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setDisplayEvent([]);
      setDummyDonations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50/30 via-white to-rose-50/30 min-h-screen">
      <Header />

      {/* TOP SECTION */}
      <div className="pt-32 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Amazing Events</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium max-w-lg mx-auto">
          Find workshops, concerts, sports events, and festivals happening near you.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-md group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-pink-500 transition-colors">
              <Search size={20} />
            </span>
            <input
              onChange={(e) => SetSearchkey(e.target.value)}
              type="text"
              placeholder="Search by location..."
              className="w-full py-3.5 pl-12 pr-6 rounded-2xl bg-white border border-pink-100 focus:border-pink-300 focus:ring-4 focus:ring-pink-200/50 outline-none shadow-xl transition duration-300 font-semibold text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 px-5 lg:px-20">
        {["All", "Music", "Technology", "Sports", "Education", "Workshop"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer shadow-sm
          ${selectedCategory === item
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20 scale-105"
                  : "bg-white text-pink-600 border border-pink-100 hover:bg-pink-50 hover:border-pink-200"
                }
        `}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* EVENTS GRID */}
      <div className="mt-12 px-4 md:px-8 max-w-7xl mx-auto pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-semibold">Loading events...</p>
          </div>
        ) : displayEvent.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {displayEvent.map((event) => {
              const availableSeats = event.totalTicket - (event.ticketsSold || 0);
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-pink-100/30 group"
                >
                  {/* Card Banner Image */}
                  <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                    <img
                      src={`${SERVER_URL}/uploads/${event.image}`}
                      alt={event.eventName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-pink-600 text-xs px-3 py-1 rounded-full font-extrabold uppercase tracking-wider shadow-sm">
                      {event.category}
                    </div>

                    {/* Available seats badge */}
                    <div className="absolute top-4 right-4">
                      {availableSeats > 0 ? (
                        <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
                          {availableSeats} Seats Left
                        </span>
                      ) : (
                        <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div>
                      <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                        {event.eventName}
                      </h3>
                    </div>

                    <div className="space-y-2 text-gray-500 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-pink-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-pink-500 shrink-0" />
                        <span>
                          {new Date(event.startDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-pink-50/50 flex justify-between items-center">
                      <div className="text-pink-600 font-extrabold text-lg flex items-center gap-1">
                        ₹{event.ticketPrice}
                      </div>

                      <Link to={`/view/${event._id}`}>
                        <button className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white py-2 px-5 rounded-xl font-bold text-xs transition shadow-md">
                          <Eye size={14} /> View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Tag className="text-pink-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Events Found</h3>
            <p className="text-gray-500 mt-2 text-sm px-6">
              There are no events listed matching your filter or search criteria.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AllEvents;
