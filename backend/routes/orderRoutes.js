import express from "express";
import authUser from "../middleware/authUser.js";
import {
  addToCart,
  removeFromCart,
  createOrder,
  cancelOrder,
  getUserOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ----- Cart operations -----
orderRouter.post("/cart/add", authUser, addToCart);
orderRouter.post("/cart/remove", authUser, removeFromCart);

// ----- Order operations -----
orderRouter.post("/create", authUser, createOrder);
orderRouter.post("/cancel", authUser, cancelOrder);
orderRouter.get("/my-orders", authUser, getUserOrders);

export default orderRouter;