import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router";
import { getUserEventApi } from "../../services/AllApi";
import { searchkeycontext } from "../../context/Context";

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
      authorization: `Bearer ${token}`, // ✅ FIXED
    };

    try {
      const res = await getUserEventApi(reqHeader);
      setDisplayData(res.data);
    } catch (error) {
      console.log(error); // ✅ FIXED
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF5FA] text-gray-900">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 via-pink-500/85 to-rose-500/90"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Make Your Dream <span className="text-pink-200">Come True</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl">
            Meet your favorite artists, sports teams & unforgettable experiences
          </p>

          <div className="mt-6 flex flex-col items-center gap-6">
            <p className="text-white/90 text-lg max-w-xl">
              Concerts • Sports • Festivals • Workshops
            </p>

            <Link
              to="/all-events"
              className="bg-white text-pink-600 px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-pink-100 transition"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-pink-700">
              Upcoming Events
            </h2>
            <p className="text-gray-500 max-w-xl mt-2">
              Discover concerts, sports events, festivals and more near you.
            </p>
          </div>

          <Link to="/all-events">
            <button className="border border-pink-500 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-600 hover:text-white transition-all shadow-sm">
              SEE ALL EVENTS
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <h1 className="text-center col-span-3 text-lg text-gray-500">
              Loading events...
            </h1>
          ) : displayData.length > 0 ? (
            displayData.map((event) => (
              <div
                key={event._id}
                className="group relative overflow-hidden rounded-2xl shadow-xl bg-white hover:-translate-y-2 transition-all"
              >
                <img
                  src={`http://localhost:3000/uploads/${event.image}`}
                  className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={event.eventName}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-bold text-lg">{event.eventName}</h3>
                  <p className="text-sm text-white/80">{event.location}</p>

                  <div className="flex gap-3 mt-4">
                    <Link
                      to={`/view/${event._id}`}
                      className="bg-white text-pink-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-pink-100 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center col-span-3 text-lg text-gray-500">
              No Events Found
            </h1>
          )}
        </div>
      </section>

      {/* ORGANIZER CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-pink-600 to-rose-500 text-white mx-6 md:mx-24 rounded-3xl shadow-2xl mb-16">
        <h2 className="text-4xl font-extrabold mb-4">
          Want to Host Your Own Event?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Join Eventify as an organizer and reach thousands instantly.
        </p>

        <Link
          to="/register"
          className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-100 transition"
        >
          Become an Organizer
        </Link>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;
