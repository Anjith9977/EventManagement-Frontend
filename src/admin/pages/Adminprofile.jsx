import React, { useEffect, useState, useContext } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { updateAdminApi } from '../../services/AllApi';
import { adminProfileUpdateContext } from '../../context/Context';
import SERVER_URL from '../../services/server_url';

function Adminprofile() {

  const [AdminDetails, setAdminDetails] = useState({
    username: "",
    email: "",
    password: "",
    Phone: "",
    profile: ""
  });

  const [preview, setPreview] = useState("");
  const [existingImg, setExistingImg] = useState("");
  const { setAdminProfileUpdated } = useContext(adminProfileUpdateContext);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleImage = (e) => {
    setAdminDetails({ ...AdminDetails, profile: e.target.files[0] });
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  };

  const getUserProfile = async () => {
    const data = JSON.parse(sessionStorage.getItem('users'));

    setAdminDetails({
      ...AdminDetails,
      username: data.username,
      email: data.email,
      password: data.password,
      Phone: data.Phone
    });

    setExistingImg(`${SERVER_URL}/uploads/${data.profile}`);
  };

  const updateProfile = async () => {
    const { username, Phone, password } = AdminDetails;

    if (username && Phone && password) {

      const token = sessionStorage.getItem('token');

      const reqHeader = {
        authorization: `bearer ${token}`
      };

      if (preview) {
        const reqBody = new FormData();

        for (let key in AdminDetails) {
          reqBody.append(key, AdminDetails[key]);
        }

        const result = await updateAdminApi(reqBody, reqHeader);

        if (result.status == 200) {
          toast.success("profile updated successfully");
          sessionStorage.setItem('users', JSON.stringify(result.data));
          setAdminProfileUpdated(result.data);
        }
      } else {
        const result = await updateAdminApi(AdminDetails, reqHeader);

        if (result.status == 200) {
          toast.success("profile updated successfully");
          sessionStorage.setItem('users', JSON.stringify(result.data));
          setAdminProfileUpdated(result.data);
        }
      }
    }
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-64 bg-[#FDF2F8] min-h-screen">

        {/* HEADER */}
        <AdminHeader
          title="Admin Organizers"
          subtitle="Approve, monitor & manage event organizers"
          setOpen={setOpen}
        />

        {/* PAGE CONTENT */}
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            Organizer Profile
          </h1>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)] border border-[#FBCFE8] max-w-3xl mx-auto">

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">

              {/* Profile Image */}
              <label htmlFor="files">
                {preview ? (
                  <img
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    className="rounded border border-white-500"
                    src={preview}
                    alt=""
                  />
                ) : existingImg ? (
                  <img
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    className="rounded border border-white-500"
                    src={existingImg}
                    alt=""
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-9xl"
                    style={{ color: "#aaaeb6" }}
                  />
                )}
              </label>

              <input onChange={handleImage} type="file" id="files" hidden />

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#EC4899] mb-1">
                  Skyline Events
                </h2>
                <p className="text-gray-700">
                  Email:
                  <span className="font-semibold text-[#831843] ml-1">
                    skyline@gmail.com
                  </span>
                </p>
                <p className="text-gray-700">
                  Phone:
                  <span className="font-semibold text-[#831843] ml-1">
                    9876543210
                  </span>
                </p>
              </div>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Organizer Name
                </label>
                <input
                  value={AdminDetails.username}
                  onChange={(e) =>
                    setAdminDetails({ ...AdminDetails, username: e.target.value })
                  }
                  type="text"
                  placeholder="Skyline Events"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Phone
                </label>
                <input
                  value={AdminDetails.Phone}
                  onChange={(e) =>
                    setAdminDetails({ ...AdminDetails, Phone: e.target.value })
                  }
                  type="text"
                  placeholder="9876543210"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Password
                </label>
                <input
                  value={AdminDetails.password}
                  onChange={(e) =>
                    setAdminDetails({ ...AdminDetails, password: e.target.value })
                  }
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={updateProfile}
                className="bg-gradient-to-r from-[#EC4899] to-[#BE185D] text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
              >
                Save Changes
              </button>

              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all">
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminprofile;
