import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Mail, Phone, MapPin, User, Camera } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import SERVER_URL from "../../services/server_url";
import { updateUserApi } from "../../services/AllApi";
import { userProfileUpdateContext } from "../../context/Context";
import { useContext } from "react";
import { toast } from 'react-toastify';

function Profile() {


  const [userDetails, setUserDetails] = useState({
    username: "",
    Phone: "",
    password: "",
    profile: ""
  })
  const [preview, setPreview] = useState()
  const [existingImg, setExistingImg] = useState("")
  const {setUserProfileUpdated}=useContext(userProfileUpdateContext)

  useEffect(() => {
    getProfileDetails()
  }, [])


  const handleImage = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
  }

  const getProfileDetails = async () => {

    const data = JSON.parse(sessionStorage.getItem('users'))
    console.log(data)

    setUserDetails({ ...userDetails, username: data.username, email: data.email, password: data.password, Phone: data.Phone })
    setExistingImg(`${SERVER_URL}/uploads/${data.profile}`)
  }


  const updateProfile = async () => {

    const { username, Phone, password } = userDetails;

    if (username && Phone && password) {

      const token = sessionStorage.getItem('token')

      const reqHeader = {
        authorization: `bearer ${token}`
      }

      if (preview) {
        const reqBody = new FormData()

        for (let key in userDetails) {
          reqBody.append(key, userDetails[key])
        }
        const result = await updateUserApi(reqBody, reqHeader)
        console.log(result)


        if (result.status == 200) {
          toast.success("profile updated successfully")
          sessionStorage.setItem('users', JSON.stringify(result.data))
          setUserProfileUpdated(result.data)

        }

      }

      else {
        const result = await updateUserApi(userDetails, reqHeader)
        console.log(result)

        if (result.status == 200) {
          toast.success("profile updated successfully")
          sessionStorage.setItem('users', JSON.stringify(result.data))
          setUserProfileUpdated(result.data)

        }
      }

    }

  }
  return (
    <>
      <Header />

      <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Update Profile
            </h1>
            <p className="text-gray-500 mt-1">
              Keep your account details up to date
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white border border-pink-100 rounded-2xl shadow-xl p-8">

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">

              {/* Profile Image */}
              <label htmlFor="files">
                {
                  preview ?
                    <img style={{ width: "100px", height: '100px', borderRadius: "50%" }} className='rounded border border-white-500' src={preview} alt="" />
                    :
                    existingImg ?
                      <img style={{ width: "100px", height: '100px', borderRadius: "50%" }} className='rounded border border-white-500' src={existingImg} alt="" />
                      :
                      <FontAwesomeIcon icon={faCircleUser} className='text-9xl' style={{ color: "#aaaeb6", }} />
                }
              </label>
              <input onChange={(e) => handleImage(e)} type="file" id='files' hidden />

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Profile Photo
                </h3>
                <p className="text-sm text-gray-500">
                  Click the icon to change your profile picture
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <User size={16} /> Full Name
                </label>
                <input
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  value={userDetails.Phone}
                  onChange={(e) => setUserDetails({ ...userDetails, Phone: e.target.value })}
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Password
                </label>
                <input
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                Cancel
              </button>
              <button onClick={updateProfile} className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition-all">
                Save Changes
              </button>
            </div>

          </div>
        </div>

        <div className="h-20"></div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
