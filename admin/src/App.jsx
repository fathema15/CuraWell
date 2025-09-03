// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import { ToastContainer } from "react-toastify";
// import { AdminContext } from "./context/AdminContext.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Sidebar from "./components/Sidebar.jsx";
// import Dashboard from "./pages/Admin/Dashboard.jsx";
// import Dashboard from "./pages/Admin/Dashboard.jsx";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return  aToken?(
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
     <Navbar/>
     <div className="flex-item-start">
      <Sidebar/>
      <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;