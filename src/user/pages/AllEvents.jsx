import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Eye, Ticket, MapPin, Calendar, Clock, CreditCard, } from "lucide-react";
import { getAllUserEvent } from "../../services/AllApi";
import { searchkeycontext } from "../../context/Context";


function AllEvents() {
  const [displayEvent, setDisplayEvent] = useState([]);
  const [dummyDonations, setDummyDonations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { searchkey, SetSearchkey } = useContext(searchkeycontext);

  useEffect(() => {
    getAllEvent();
  }, []);

  // ✅ FILTER LOGIC (LOWERCASE FIX HERE)
  useEffect(() => {
    let filtered = dummyDonations;

    // search filter
    if (searchkey.trim() !== "") {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(searchkey.toLowerCase())
      );
    }

    // category filter (case-insensitive)
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
      setDisplayEvent(res.data);
      setDummyDonations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#FFF5FA] min-h-screen">
      <Header />

      {/* TOP SECTION */}
      <div className="mt-32 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700">
          All Events
        </h1>

        {/* SEARCH BAR */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              onChange={(e) => SetSearchkey(e.target.value)}
              type="text"
              placeholder="Search events..."
              className="w-full py-3 px-5 pr-12 rounded-full bg-white border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none shadow-lg"
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
              className={`px-5 py-2 rounded-full font-semibold transition
          ${selectedCategory === item
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105"
                  : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-100"
                }
        `}
            >
              {item}
            </button>
          )
        )}
      </div>



      {/* EVENTS GRID */}
      <div className="mt-12 px-5 lg:px-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayEvent.length > 0 ? (
          displayEvent.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="relative w-full h-48">
                <img
                  src={`http://localhost:3000/uploads/${event.image}`}
                  alt="event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {event.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {event.eventName}
                </h3>

                <div className="mt-3 flex items-center text-gray-500 text-sm gap-2">
                  <MapPin size={16} /> <span>{event.location}</span>
                </div>

                <div className="mt-1 flex items-center text-gray-500 text-sm gap-3">
                  <Calendar size={16} /> <span>{event.startDate}</span>
                  <Clock size={16} /> <span>{event.endDate}</span>
                </div>

                <div className="mt-1 flex items-center text-pink-600 text-sm font-semibold gap-2">
                  <CreditCard size={16} /> ₹{event.ticketPrice}
                </div>

                <div className="mt-5 flex gap-3">
                  <Link to={`/view/${event._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-pink-500 text-pink-600 py-2 rounded-lg font-semibold hover:bg-pink-100 transition">
                      <Eye size={16} /> View
                    </button>
                  </Link>
                  {/* <Link to="/booking" className="flex-1">
                    <button onClick={makePayment} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                      <Ticket size={16} /> Buy
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 font-semibold">
            No events found
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AllEvents;
