import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getUserEventApi } from "../../services/AllApi";
import { searchkeycontext } from "../../context/Context";
import SERVER_URL from "../../services/server_url";
import { Calendar, MapPin, ArrowRight, Star, Sparkles } from "lucide-react";

function Home() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { SetSearchkey } = useContext(searchkeycontext);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const res = await getUserEventApi(reqHeader);
      setDisplayData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDFE] text-gray-900 min-h-screen">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 via-pink-700/80 to-rose-600/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} className="text-pink-300" /> Discover Your Next Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none max-w-3xl">
            Make Your Dream <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-200">Come True</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-medium">
            Meet your favorite artists, connect with tech innovators, and secure unforgettable memories instantly.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
            <Link
              to="/all-events"
              className="bg-white text-pink-700 hover:bg-pink-50 font-extrabold px-8 py-4 rounded-2xl text-base shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Events <ArrowRight size={18} />
            </Link>
            
            <span className="text-white/60 text-sm font-semibold hidden sm:inline">
              Concerts • Sports • Festivals • Workshops
            </span>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
              <Star size={28} className="text-pink-500 fill-pink-500" /> Upcoming Experiences
            </h2>
            <p className="text-gray-500 mt-2 font-medium max-w-xl text-base">
              Secure your spot for the hottest events, conferences, and workshops before they sell out.
            </p>
          </div>

          <Link to="/all-events">
            <button className="border-2 border-pink-500/30 text-pink-600 hover:text-white hover:bg-pink-600 hover:border-pink-600 font-bold px-6 py-3 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm text-sm">
              View All Catalogue
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center py-20">
              <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 font-semibold">Fetching upcoming events...</p>
            </div>
          ) : displayData.length > 0 ? (
            displayData.map((event) => {
              const availableSeats = event.totalTicket - (event.ticketsSold || 0);
              return (
                <div
                  key={event._id}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl bg-white hover:-translate-y-2 transition-all duration-300 border border-pink-100/30 flex flex-col h-[400px]"
                >
                  <div className="h-full w-full relative overflow-hidden">
                    <img
                      src={`${SERVER_URL}/uploads/${event.image}`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={event.eventName}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  </div>

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

                  <div className="absolute bottom-0 p-6 text-white w-full">
                    <span className="text-pink-300 text-xs font-bold uppercase tracking-wider bg-pink-950/40 backdrop-blur-sm px-3 py-1 rounded-full border border-pink-500/30">
                      {event.category}
                    </span>
                    
                    <h3 className="font-extrabold text-xl mt-3 tracking-tight line-clamp-1">{event.eventName}</h3>
                    
                    <div className="flex flex-col gap-1.5 mt-3 text-white/80 text-sm">
                      <p className="flex items-center gap-1.5 font-medium">
                        <MapPin size={14} className="text-pink-400 shrink-0" /> {event.location}
                      </p>
                      <p className="flex items-center gap-1.5 font-medium">
                        <Calendar size={14} className="text-pink-400 shrink-0" /> 
                        {new Date(event.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
                      <span className="font-black text-lg">₹{event.ticketPrice}</span>
                      
                      <Link
                        to={`/view/${event._id}`}
                        className="bg-white text-pink-700 hover:bg-pink-50 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow transition-all duration-300 hover:scale-105"
                      >
                        View Ticket
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-white border border-pink-100 rounded-3xl shadow-lg">
              <p className="text-gray-500 font-semibold text-lg">No Upcoming Events Found</p>
            </div>
          )}
        </div>
      </section>

      {/* ORGANIZER CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-pink-600 to-rose-500 text-white mx-6 md:mx-16 rounded-3xl shadow-2xl mb-24 relative overflow-hidden px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-4xl font-black tracking-tight">
            Want to Host Your Own Event?
          </h2>
          <p className="text-white/80 font-medium text-lg leading-relaxed">
            Join Eventify as an organizer. Create your listing, manage your seats, and sell tickets directly to thousands of users.
          </p>

          <Link
            to="/register"
            className="mt-4 bg-white text-pink-700 hover:bg-pink-50 font-extrabold px-8 py-3.5 rounded-2xl text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-900/10 cursor-pointer"
          >
            Become an Organizer
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;
