// ;
// import React, { createContext, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//   // Load token from localStorage when app starts
//   const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
//   const [doctors, setDoctors] = useState([]);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // // Keep localStorage in sync with context state
//   // useEffect(() => {
//   //   if (aToken) {
//   //     localStorage.setItem("aToken", aToken);
//   //   } else {
//   //     localStorage.removeItem("aToken");
//   //   }
//   //const { getAllDoctors, doctors } = useContext(AdminContext);

  

//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/all-doctors",
//         {},
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//   getAllDoctors(); // ← you must call it here
//   }, []);
//   const value = {
//     aToken,
//     setAToken,
//     backendUrl,
//     doctors,
//     getAllDoctors
//   };

//   return (
//     <AdminContext.Provider value={value}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Load token from localStorage when app starts
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Function to fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers:{aToken}}
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch doctors when provider mounts
  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  // // Keep localStorage in sync with token
  // useEffect(() => {
  //   if (aToken) {
  //     localStorage.setItem("aToken", aToken);
  //   } else {
  //     localStorage.removeItem("aToken");
  //   }
  // }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    appointments,  
    getAllDoctors,
    getAllAppointments,
    cancelAppointment,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
      <ToastContainer /> {/* Add ToastContainer once in the provider */}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
