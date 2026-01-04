import React, { useContext, useEffect, useState } from 'react';
import OrgHeader from '../components/OrgHeader';
import OrgSidebar from '../components/OrgSidebar';
import SERVER_URL from '../../services/server_url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { updateOrgApi } from '../../services/AllApi';
import { toast } from 'react-toastify';
import { OrgProfileUpdateContext } from '../../context/Context';

function OrgProfile() {

  const [orgDetails, setOrgDetails] = useState({
    username: "",
    email: "",
    password: "",
    Phone: "",
    profile: ""
  });

  const [preview, setPreview] = useState("");
  const [existingImg, setExistingImg] = useState("");
  const { setProfileUpdated } = useContext(OrgProfileUpdateContext);

  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleImage = (e) => {
    setOrgDetails({ ...orgDetails, profile: e.target.files[0] });
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  };

  const getUserProfile = async () => {
    const data = JSON.parse(sessionStorage.getItem('users'));
    setOrgDetails({
      ...orgDetails,
      username: data.username,
      email: data.email,
      password: data.password,
      Phone: data.Phone
    });
    setExistingImg(`${SERVER_URL}/uploads/${data.profile}`);
  };

  const updateProfile = async () => {

    const { username, Phone, password } = orgDetails;

    if (username && Phone && password) {

      const token = sessionStorage.getItem('token');

      const reqHeader = {
        authorization: `bearer ${token}`
      };

      if (preview) {
        const reqBody = new FormData();

        for (let key in orgDetails) {
          reqBody.append(key, orgDetails[key]);
        }

        const result = await updateOrgApi(reqBody, reqHeader);

        if (result.status == 200) {
          toast.success("profile updated successfully");
          sessionStorage.setItem('users', JSON.stringify(result.data));
          setProfileUpdated(result.data);
        }

      } else {

        const result = await updateOrgApi(orgDetails, reqHeader);

        if (result.status == 200) {
          toast.success("profile updated successfully");
          sessionStorage.setItem('users', JSON.stringify(result.data));
          setProfileUpdated(result.data);
        }
      }
    }
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <OrgSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="w-full md:ml-64 bg-[#FDF2F8] min-h-screen">

        {/* Header */}
        <OrgHeader
          title="My Profile"
          subtitle="Manage your personal and organizer account details"
          setOpen={setOpen}
        />

        {/* Page Content */}
        <div className="p-6">

          {/* Page Title */}
          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            Organizer Profile
          </h1>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)] border border-[#FBCFE8] max-w-3xl mx-auto">

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">

              {/* Profile Image */}
              <label htmlFor="files">
                {
                  preview ?
                    <img
                      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                      className="rounded border border-white-500"
                      src={preview}
                      alt=""
                    />
                    :
                    existingImg ?
                      <img
                        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                        className="rounded border border-white-500"
                        src={existingImg}
                        alt=""
                      />
                      :
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className="text-9xl"
                        style={{ color: "#aaaeb6" }}
                      />
                }
              </label>

              <input
                onChange={(e) => handleImage(e)}
                type="file"
                id="files"
                hidden
              />

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#EC4899] mb-1">
                  Skyline Events
                </h2>
                <p className="text-gray-700">
                  Email: <span className="font-semibold text-[#831843]">{orgDetails.email}</span>
                </p>
                <p className="text-gray-700">
                  Phone: <span className="font-semibold text-[#831843]">{orgDetails.Phone}</span>
                </p>
              </div>
            </div>

            {/* Account Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Organizer Name
                </label>
                <input
                  value={orgDetails.username}
                  onChange={(e) => setOrgDetails({ ...orgDetails, username: e.target.value })}
                  type="text"
                  defaultValue="Skyline Events"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Phone
                </label>
                <input
                  value={orgDetails.Phone}
                  onChange={(e) => setOrgDetails({ ...orgDetails, Phone: e.target.value })}
                  type="text"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#831843] mb-1">
                  Password
                </label>
                <input
                  value={orgDetails.password}
                  onChange={(e) => setOrgDetails({ ...orgDetails, password: e.target.value })}
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

export default OrgProfile;
