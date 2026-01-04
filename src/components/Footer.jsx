import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-br from-pink-600 via-rose-500 to-pink-700 text-white">

      {/* Top Glass Layer */}
      <div className="backdrop-blur-xl bg-white/10">

        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* LOGO & INFO */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Eventra<span className="text-sm align-top text-pink-200">®</span>
            </h1>
            <p className="text-sm mt-4 text-white/90 leading-relaxed">
              Your gateway to unforgettable events.
              Discover, book, and experience moments that matter.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/85">
              <Link to="/"><li className="hover:text-pink-200 cursor-pointer transition">Home</li></Link>
              <Link to="/all-events"><li className="hover:text-pink-200 cursor-pointer transition">Events</li></Link>
              <li className="hover:text-pink-200 cursor-pointer transition">About Us</li>
              <li className="hover:text-pink-200 cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="hover:text-pink-200 cursor-pointer transition">Help Center</li>
              <li className="hover:text-pink-200 cursor-pointer transition">Refund Policy</li>
              <li className="hover:text-pink-200 cursor-pointer transition">Terms & Conditions</li>
              <li className="hover:text-pink-200 cursor-pointer transition">Privacy Policy</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition">
                📘
              </span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition">
                📸
              </span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition">
                🐦
              </span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition">
                ▶️
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center py-5 text-sm bg-black/20 text-white/80">
        © {new Date().getFullYear()} Eventify. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
