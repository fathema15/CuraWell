import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentStripe,
  verifyStripe,
  getUserCart,
} from "../controllers/userController.js";

import {
  addToCart,
  removeFromCart,
  clearCart,
  createOrder,
  cancelOrder,
  getUserOrders,
} from "../controllers/orderController.js";

import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// ---------------- Auth Routes ----------------
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ---------------- Profile Routes ----------------
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

// ---------------- Appointment Routes ----------------
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/my-appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// ---------------- Payment Routes ----------------
userRouter.post("/payment-stripe", authUser, paymentStripe);
userRouter.post("/verify-stripe", authUser, verifyStripe);

// ---------------- Cart & Orders ----------------
userRouter.post("/cart/add", authUser, addToCart);
userRouter.post("/cart/remove", authUser, removeFromCart);
userRouter.post("/cart/clear", authUser, clearCart);

userRouter.post("/order/create", authUser, createOrder);
userRouter.post("/order/cancel", authUser, cancelOrder);
userRouter.get("/orders", authUser, getUserOrders);

// Optional: get current cart
userRouter.get("/cart", authUser, getUserCart);

export default userRouter;