import React, { useContext, useEffect, useState } from "react";
import { DoctorsContext } from "../../context/DoctorsContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorsContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-5">
        <div className="flex flex-col gap-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-md"
              src={profileData.image || "/placeholder.png"} // fallback
              alt={profileData.name || "Doctor"}
            />
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-xl p-8 space-y-5 border border-gray-100">
            {/* Name and Degree */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {profileData.degree} - {profileData.speciality} |{" "}
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  {profileData.experience} yrs
                </span>
              </p>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-gray-700 font-semibold mb-1">About:</h3>
              {isEdit ? (
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary"
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Fees */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Appointment Fee:
              </span>
              {isEdit ? (
                <input
                  type="number"
                  min="0"
                  className="border border-gray-300 rounded-md p-1 w-32"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                <span className="text-gray-800 font-semibold">
                  {currency} {profileData.fees}
                </span>
              )}
            </div>

            {/* Address */}
            <div>
              <h3 className="font-medium text-gray-700 mb-1">Address:</h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    placeholder="Line 1"
                  />
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    placeholder="Line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {profileData.address.line1} <br /> {profileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="h-4 w-4 accent-primary"
              />
              <span className="text-gray-700">Available for Appointments</span>
            </div>

            {/* Buttons */}
            <div className="flex justify-center">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 border border-primary text-primary font-medium rounded-full hover:bg-blue-500 hover:text-white transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;