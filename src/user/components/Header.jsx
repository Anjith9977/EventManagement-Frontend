import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { userProfileUpdateContext } from "../../context/Context";
import SERVER_URL from "../../services/server_url";

function Header() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate()

  const { userprofileUpdated } = useContext(userProfileUpdateContext);

useEffect(() => {
  const storedUser = sessionStorage.getItem("users");

  if (storedUser && storedUser !== "undefined") {
    const parsedUser = JSON.parse(storedUser);
    setUser({
      username: parsedUser.username,
      profile: parsedUser.profile,
    });
  } else {
    setUser(null);
  }
}, [userprofileUpdated]);



  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setShowMenu(false);
    setMobileMenu(false);
    navigate('/')
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-pink-200 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-tight text-pink-600">
            Eventra<span className="text-sm align-top text-pink-400">®</span>
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 font-semibold text-sm text-gray-700">
          <Link to="/"><li className="hover:text-pink-600">HOME</li></Link>
          <Link to="/all-events"><li className="hover:text-pink-600">EVENTS</li></Link>
          <Link to="/mybooking"><li className="hover:text-pink-600">MY BOOKINGS</li></Link>
          <Link to="/profile"><li className="hover:text-pink-600">PROFILE</li></Link>
        </ul>

        {/* RIGHT SIDE (DESKTOP PROFILE / LOGIN) */}
        <div className="hidden md:block">
          {user ? (
            <div className="relative">
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer hover:bg-pink-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-pink-300 overflow-hidden">
                  <img
                    src={
                      user.profile
                        ? `${SERVER_URL}/uploads/${user.profile}`
                        : "/user_icon.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {user.username}
                </span>
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-pink-50">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-pink-100 transition"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-pink-200 shadow">
          <ul className="flex flex-col gap-4 px-6 py-6 font-semibold text-gray-700">
            <Link to="/" onClick={() => setMobileMenu(false)}>HOME</Link>
            <Link to="/all-events" onClick={() => setMobileMenu(false)}>EVENTS</Link>
            <Link to="/mybooking" onClick={() => setMobileMenu(false)}>MY BOOKINGS</Link>
            <Link to="/profile" onClick={() => setMobileMenu(false)}>PROFILE</Link>

            <hr className="border-pink-200" />

            {user ? (
              <button
                onClick={logout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenu(false)}>
                <button className="w-full px-6 py-2 rounded-full bg-pink-600 text-white">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
