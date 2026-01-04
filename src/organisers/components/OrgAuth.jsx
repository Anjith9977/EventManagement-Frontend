// import React, { useState } from "react";
// import { Link } from "react-router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// function OrgAuth({ register }) {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 overflow-hidden">

//       {/* Decorative Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-spin-slow"></div>
//         <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-spin-slow"></div>
//         <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce-slow"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce-slow"></div>
//       </div>

//       {/* Auth Card */}
//       <div className="relative z-10 w-[90%] max-w-md p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-pink-300 shadow-2xl text-gray-900">

//         {/* Logo */}
//         <h1 className="text-center font-extrabold text-4xl tracking-wider mb-4 text-pink-500">
//           EVENTIFY
//         </h1>

//         {/* Title */}
//         <h2 className="text-center text-3xl font-semibold mb-8 text-pink-600">
//           {register ? "Organizer Registration" : "Organizer Login"}
//         </h2>

//         <form className="flex flex-col">

//           {/* Registration fields */}
//           {register && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="bg-pink-50 placeholder-pink-300 border border-pink-300 text-gray-900 w-full rounded-xl my-2 p-3 focus:bg-white focus:border-pink-400 transition-all duration-300"
//               />
//               <input
//                 type="text"
//                 placeholder="Organization / Business Name"
//                 className="bg-pink-50 placeholder-pink-300 border border-pink-300 text-gray-900 w-full rounded-xl my-2 p-3 focus:bg-white focus:border-pink-400 transition-all duration-300"
//               />
//             </>
//           )}

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="bg-pink-50 placeholder-pink-300 border border-pink-300 text-gray-900 w-full rounded-xl my-2 p-3 focus:bg-white focus:border-pink-400 transition-all duration-300"
//           />

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="bg-pink-50 placeholder-pink-300 border border-pink-300 text-gray-900 w-full rounded-xl my-2 p-3 pr-10 focus:bg-white focus:border-pink-400 transition-all duration-300"
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEye : faEyeSlash}
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition"
//             />
//           </div>

//           <p className="text-xs text-right text-pink-400 mb-3">
//             * Never share your password
//           </p>

//           {/* Button */}
//           <button
//             type="button"
//             className="bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded-xl shadow-lg transition-all duration-300 mt-2"
//           >
//             {register ? "Register as Organizer" : "Login as Organizer"}
//           </button>

//           {/* Bottom Links */}
//           {register ? (
//             <p className="text-center mt-6 text-sm text-pink-600">
//               Already an organizer?{" "}
//               <Link to="/orglog" className="underline hover:text-pink-400">
//                 Login here
//               </Link>
//             </p>
//           ) : (
//             <p className="text-center mt-6 text-sm text-pink-600">
//               Want to become an organizer?{" "}
//               <Link to="/orgReg" className="underline hover:text-pink-400">
//                 Register here
//               </Link>
//             </p>
//           )}

//           {/* Link to normal user login */}
//           <p className="text-center mt-4 text-sm text-pink-500">
//             Go to user login?{" "}
//             <Link to="/login" className="underline hover:text-pink-400">
//               User Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OrgAuth;
