import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const categories = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <p className="text-gray-600 text-lg">
        Browse through the doctors by speciality.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar Categories */}
        <div className="flex flex-col gap-4 text-sm text-gray-600 w-full sm:w-60">
          {categories.map((cat, i) => (
            <p
              key={i}
              onClick={() =>
                speciality === cat
                  ? navigate("/doctors")
                  : navigate(`/doctors/${cat}`)
              }
              className={`w-full pl-3 py-2 border border-gray-300 rounded cursor-pointer transition-all text-center ${
                speciality === cat
                  ? "bg-indigo-100 text-black font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                item.available && navigate(`/appointment/${item._id}`)
              }
              className={`border border-blue-200 rounded-xl overflow-hidden shadow transition-all duration-300 ${
                item.available
                  ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <img
                className="w-full h-48 object-cover bg-blue-50"
                src={item.image || "/placeholder.png"}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <p
                    className={`${
                      item.available ? "text-green-500" : "text-red-500"
                    } text-sm font-medium`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}

          {filterDoc.length === 0 && (
            <p className="text-gray-500 col-span-full text-center mt-10">
              No doctors found for this speciality.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;