import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets/assets";

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // Clean up preview URL to avoid memory leak
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  // Update user profile API call
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm pt-5">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <label htmlFor="image" className="cursor-pointer">
          <img
            className="w-36 h-36 rounded-full object-cover border"
            src={
              image
                ? URL.createObjectURL(image)
                : userData.image || assets.placeholder
            }
            alt="Profile"
          />
          {isEdit && (
            <img
              className="w-10 absolute bottom-0 right-0"
              src={assets.upload_icon}
              alt="Upload"
            />
          )}
        </label>
        {isEdit && (
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="text-3xl font-semibold border-b border-gray-300 pb-1 w-full"
        />
      ) : (
        <p className="text-3xl font-semibold">{userData.name}</p>
      )}

      <hr className="border-gray-300" />

      {/* Contact Info */}
      <div>
        <p className="text-gray-600 underline mb-2">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="bg-gray-50 p-1 rounded"
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="bg-gray-50 p-1 rounded"
                placeholder="Line 1"
              />
              <input
                type="text"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="bg-gray-50 p-1 rounded"
                placeholder="Line 2"
              />
            </div>
          ) : (
            <p>
              {userData.address?.line1} <br /> {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-gray-600 underline mb-2">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender || "Not Selected"}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="bg-gray-50 p-1 rounded"
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="bg-gray-50 p-1 rounded"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-6">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 border border-primary rounded-full hover:bg-blue-600 hover:text-white border-blue-500
 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border border-primary rounded-full hover:bg-blue-600 hover:text-white border-blue-500
 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;