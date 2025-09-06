import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [orders, setOrders] = useState([]); // ✅ orders state
  const [dashData, setDashData] = useState(false);

  // ================= DOCTORS =================
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { aToken },
      });
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= APPOINTMENTS =================
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken },
      });
      if (data.success) setAppointments(data.appointments.reverse());
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= DRUGS =================
  const getAllDrugs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-drugs`, {
        headers: { aToken },
      });
      if (data.success) setDrugs(data.drugs);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= ORDERS =================
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-orders`, {
        headers: { aToken },
      });
      if (data.success) setOrders(data.orders.reverse());
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-order-status`,
        { orderId, status },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllOrders();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= DASHBOARD =================
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= VALUE =================
  const value = {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    cancelAppointment,
    drugs,
    getAllDrugs,
    orders,
    getAllOrders, 
    updateOrderStatus, 
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;