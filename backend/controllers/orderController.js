import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// ---------------- Add item to cart ----------------
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { drugId, quantity, price } = req.body;

    if (!drugId || !quantity || !price) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await user.addToCart(drugId, quantity, price);

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Remove item from cart ----------------
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { drugId } = req.body;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await user.removeFromCart(drugId);

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Clear cart ----------------
export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await user.clearCart();

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Create order ----------------
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).populate("cart.drugId");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!user.cart.length)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    // Calculate total amount
    const totalAmount = user.cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // Create new order
    const newOrder = new orderModel({
      userId,
      drugs: user.cart.map((item) => ({
        drugId: item.drugId._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    });

    const order = await newOrder.save();

    // Add order to user's order history
    await user.addOrderHistory(order._id);

    // Clear user's cart
    await user.clearCart();

    res.json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Cancel order ----------------
export const cancelOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    if (order.userId.toString() !== userId)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get user orders ----------------
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId }).populate("drugs.drugId");

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};