import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { googleloginApi, loginApi, registerApi } from "../services/AllApi";

function Auth({ register }) {
  const [viewPasswordStatus, setViewPasswordStatus] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userInput;

    if (!username || !email || !password) {
      toast.warning("Please fill the form completely");
      return;
    }

    try {
      const res = await registerApi(userInput);

      if (res.status === 200) {
        toast.success("Registration successful. Please login");
        navigate("/login");
        setUserInput({ username: "", email: "", password: "", role: "user" });
      } else if (res.status === 409) {
        toast.warning(res.response.data);
      } else {
        toast.warning("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };


  const handleLogin = async () => {
    const { email, password } = userInput;

    if (!email || !password) {
      toast.warning("Please fill the form completely");
      return;
    }

    try {
      const res = await loginApi({ email, password });

      if (res.status === 200) {
        toast.success("Logged in successfully");

        sessionStorage.setItem("users", JSON.stringify(res.data.users));
        sessionStorage.setItem("token", res.data.token);

        setTimeout(() => {
          if (res.data.users.role === "Admin") {
            navigate("/adminDashboard");
          } else if (res.data.users.role === "organizer") {
            navigate("/orgDashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      }

      else if (res.status === 401) {
        toast.warning(res.response.data);
        setUserInput({ username: "", email: "", password: "", role: "user" });
      }

      else if (res.status === 404) {
        toast.error(res.response.data);
        setUserInput({ username: "", email: "", password: "", role: "user" });
      }

    } catch (err) {
      console.log(err);
      toast.error("Invalid email or password");
    }
  };



  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const details = jwtDecode(credentialResponse.credential);

      const res = await googleloginApi({ username: details.name, email: details.email, profile: details.picture, password: "googlepwd" });

      if (res.status === 200) {
        toast.success("Logged in successfully");

        sessionStorage.setItem("users", JSON.stringify(res.data.users));
        sessionStorage.setItem("token", res.data.token);

        setTimeout(() => {
          if (res.data.users.role === "Admin") {
            navigate("/adminDashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      }

    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-md p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-pink-300 shadow-2xl">

        <h1 className="text-center font-extrabold text-4xl text-pink-500 mb-1">
          Eventra
        </h1>
        <p className="text-center text-sm text-pink-400 mb-6">
          Experience Events Like Never Before
        </p>

        {/* ROLE — ONLY REGISTER */}
        {register && (
          <div className="flex justify-center gap-4 my-6">
            {["user", "organizer"].map((role) => (
              <label key={role} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  className="hidden peer"
                  onChange={(e) =>
                    setUserInput({ ...userInput, role: e.target.value })
                  }
                />
                <div className="px-6 py-3 rounded-xl border-2 border-pink-300 text-pink-600 font-semibold peer-checked:bg-pink-500 peer-checked:text-white">
                  {role}
                </div>
              </label>
            ))}
          </div>
        )}

        <h2 className="text-center text-2xl font-semibold mb-6 text-pink-600">
          {register ? "Create Account" : "Welcome Back"}
        </h2>

        <form className="flex flex-col">

          {/* Username */}
          {register && (
            <input
              value={userInput.username}
              type="text"
              placeholder="Full Name"
              className="bg-pink-50 border border-pink-300 rounded-xl p-3 my-2"
              onChange={(e) =>
                setUserInput({ ...userInput, username: e.target.value })
              }
            />
          )}

          {/* Email */}
          <input
            value={userInput.email}
            type="email"
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-300 rounded-xl p-3 my-2"
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
          />

          {/* Password */}
          <div className="relative my-2">
            <input
              value={userInput.password}
              type={viewPasswordStatus ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-pink-50 border border-pink-300 rounded-xl px-4 py-3 pr-12"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500"
            >
              <FontAwesomeIcon
                icon={viewPasswordStatus ? faEye : faEyeSlash}
              />
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={register ? handleRegister : handleLogin}
            className="bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded-xl mt-4"
          >
            {register ? "Register" : "Login"}
          </button>

          {/* GOOGLE LOGIN — ONLY LOGIN PAGE */}
          {!register && (
            <>
              <div className="text-center my-4 text-gray-400">
                <p>────────── or ──────────</p>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google Login Failed")}
                />
              </div>
            </>
          )}

          {/* LINKS */}
          {register ? (
            <p className="text-center mt-6 text-sm text-pink-600">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          ) : (
            <p className="text-center mt-6 text-sm text-pink-600">
              New here?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Auth;
