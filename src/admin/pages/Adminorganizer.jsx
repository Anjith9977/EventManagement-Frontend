import React, { useEffect, useState, useContext } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import { adminOrgApi, updateOrganizerStatusAPI } from '../../services/AllApi';
import { numberOfOrganizer } from '../../context/Context';

function Adminorganizer() {

  const [manageOrg, setManageOrg] = useState([]);
  const { setRegOrg } = useContext(numberOfOrganizer);
  const [open, setOpen] = useState(false); // ✅ ONLY ADDITION

  useEffect(() => {
    getOrganizers();
  }, []);

  const getOrganizers = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `bearer ${token}`
    };

    try {
      const res = await adminOrgApi(reqHeader);
      setManageOrg(res.data);
      setRegOrg(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdminStatus = async (id, status) => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `bearer ${token}`
    };

    const reqBody = { status };

    try {
      const res = await updateOrganizerStatusAPI(id, reqBody, reqHeader);
      if (res.status == 200) {
        getOrganizers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-64 min-h-screen bg-[#FDF2F8]">

        {/* HEADER */}
        <AdminHeader
          title="Admin Organizers"
          subtitle="Approve, monitor & manage event organizers"
          setOpen={setOpen}
        />

        {/* PAGE CONTENT */}
        <div className="p-6">

          {/* Page Title */}
          <h1 className="text-2xl font-extrabold text-[#831843] mb-6">
            Manage Organizers
          </h1>

          {/* Organizer Table */}
          <div
            className="bg-white rounded-2xl overflow-x-auto
              border border-[#FBCFE8]
              ring-1 ring-pink-200/60
              shadow-[0_12px_32px_-14px_rgba(236,72,153,0.3)]"
          >
            <table className="w-full text-sm">
              <thead className="bg-[#FCE7F3] text-[#831843]">
                <tr>
                  <th className="px-4 py-3 text-left">Organizer</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {manageOrg.length > 0 ? (
                  manageOrg.map((org) => (
                    <tr
                      key={org._id}
                      className="border-t border-pink-100 hover:bg-[#FCE7F3] transition-all"
                    >
                      <td className="px-4 py-3 font-semibold">
                        {org.username}
                      </td>

                      <td className="px-4 py-3">
                        {org.email}
                      </td>

                      <td className="px-4 py-3 font-semibold">
                        {org.status === "approved" ? (
                          <span className="text-green-600">Approved</span>
                        ) : org.status === "rejected" ? (
                          <span className="text-red-500">Rejected</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </td>

                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => updateAdminStatus(org._id, "approved")}
                          className="bg-green-500 hover:bg-green-600
                            text-white px-3 py-1 rounded-lg text-xs
                            transition-all"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateAdminStatus(org._id, "rejected")}
                          className="bg-red-500 hover:bg-red-600
                            text-white px-3 py-1 rounded-lg text-xs
                            transition-all"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No organizer
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Adminorganizer;
