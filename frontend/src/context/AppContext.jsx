import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "৳";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);
  const [cart, setCart] = useState([]);

  // ================= GET DOCTORS =================
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.message);
    }
  };

  // ================= GET DRUGS =================
  const getDrugsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/drug/list`);
      if (data.success) setDrugs(data.drugs);
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching drugs:", error);
      toast.error(error.message);
    }
  };

  // ================= USER PROFILE =================
  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error(error.message);
    }
  };

  // ================= CART =================
  // ================= USER CART =================
  const loadUserCart = async () => {
    if (!token) return setCart([]);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/cart`, {
        headers: { token },
      });
      if (data.success) {
        // Add stock info from drugId
        const updatedCart = data.cart.map((item) => ({
          _id: item.drugId._id,
          name: item.drugId.name,
          image: item.drugId.image,
          price: item.drugId.price,
          quantity: item.quantity,
          stock: item.drugId.stock, // ✅ include stock
          totalPrice: item.quantity * item.drugId.price,
        }));
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
      setCart([]);
    }
  };

  // ================= USER APPOINTMENTS =================
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/my-appointments`,
        {
          headers: { token },
        }
      );
      if (data.success) setAppointments(data.appointments.reverse());
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const addToCart = async (drug, qty = 1) => {
    if (!token) return toast.info("Please login first");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cart/add`,
        {
          drugId: drug._id,
          quantity: qty,
          price: drug.price, // ✅ add price
        },
        { headers: { token } }
      );

      if (data.success) {
        loadUserCart();
        toast.success(`${drug.name} added to cart`);
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeFromCart = async (drugId) => {
    if (!token) return toast.info("Please login first");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cart/remove`,
        { drugId },
        { headers: { token } }
      );
      if (data.success) {
        loadUserCart();
        toast.success("Removed from cart");
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const clearCart = async () => {
    if (!token) return toast.info("Please login first");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cart/clear`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setCart([]);
        toast.success("Cart cleared");
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ================= INITIAL DATA =================
  useEffect(() => {
    getDoctorsData();
    getDrugsData();
  }, []);

  // Load user data and cart when token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData();
      loadUserCart();
    } else {
      setUserData(false);
      setCart([]);
    }
  }, [token]);

  const value = {
    setCart,
    doctors,
    drugs,
    getDoctorsData,
    getDrugsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    loadUserCart,
    appointments,
    getUserAppointments
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;