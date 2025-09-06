import React, { useContext } from "react";
import { DoctorsContext } from "./context/DoctorsContext";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Login from "./pages/Login";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DrugsList from "./pages/Admin/DrugList";
import AddDrug from "./pages/Admin/AddDrug";
import AllOrders from "./pages/Admin/AllOrders";

const App = () => {
  const { dToken } = useContext(DoctorsContext);
  const { aToken } = useContext(AdminContext);

  return dToken || aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex h-screen">
        <Sidebar className="h-full" /> {/* ensures sidebar takes full height */}
        <div className="flex-1 h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/add-drug" element={<AddDrug />} />
            <Route path="/update-drug/:id" element={<AddDrug />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="/drug-list" element={<DrugsList />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;