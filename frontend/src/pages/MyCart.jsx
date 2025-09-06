// src/pages/MyCart.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyCart = () => {
  const { cart, setCart, backendUrl, token, currencySymbol, loadUserCart } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  // Calculate subtotal dynamically
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total = subtotal - discount;

  // Remove item from cart
  const removeItem = async (drugId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cart/remove`,
        { drugId },
        { headers: { token } }
      );
      if (data.success) {
        await loadUserCart(); // refresh cart from backend
        toast.success(data.message || "Removed from cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Apply discount
  const applyDiscount = () => {
    if (cart.some((item) => item.quantity > item.stock)) {
      return toast.error("Some items are out of stock!");
    }
    if (discount > 0) return toast.info("Discount already applied");
    const disc = subtotal * 0.1;
    setDiscount(disc);
    toast.success("10% discount applied!");
  };

  // Handle Pay Now
  const handlePayNow = () => {
    if (cart.some((item) => item.quantity > item.stock)) {
      return toast.error("Some items are out of stock!");
    }
    if (cart.length === 0) return toast.info("Cart is empty");
    setIsPaid(true);
    toast.success("Payment successful!");
  };

  // Handle Order Now
  const handleOrderNow = async () => {
    if (cart.some((item) => item.quantity > item.stock)) {
      return toast.error("Some items are out of stock!");
    }
    if (!isPaid) return toast.info("Please pay first");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/order/create`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Order placed successfully!");
        setCart([]);
        setIsPaid(false);
        navigate("/my-orders");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadUserCart();
  }, []);

  // Check if any item is out of stock
  const hasOutOfStock = cart.some((item) => item.quantity > item.stock);

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Cart</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/drugs")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add More
          </button>
          <button
            onClick={() => navigate("/my-orders")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Order History
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => {
          const isOutOfStock = item.quantity > item.stock;
          return (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded p-4 bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} | Unit Price: {currencySymbol}
                    {item.price}
                  </p>
                  <p className="text-gray-700 font-medium">
                    Total: {currencySymbol}
                    {item.quantity * item.price}
                  </p>
                  <p
                    className={`font-semibold ${
                      isOutOfStock ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {isOutOfStock ? "Out of Stock" : "In Stock"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className="border rounded p-4 bg-white space-y-2">
        <p className="text-lg font-semibold">Order Summary</p>
        <p>
          Subtotal: {currencySymbol}
          {subtotal.toFixed(2)}
        </p>
        <p>
          Discount: {currencySymbol}
          {discount.toFixed(2)}
        </p>
        <p className="font-semibold">
          Total: {currencySymbol}
          {total.toFixed(2)}
        </p>

        <div className="flex gap-3 mt-3 flex-wrap">
          <button
            onClick={applyDiscount}
            className={`px-4 py-2 rounded text-white 
               ${
                hasOutOfStock
                ? "bg-yellow-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-300"
              }`}
            disabled={hasOutOfStock}
          >
            Get 10% Discount
          </button>
          <button
            onClick={handlePayNow}
            className={`px-4 py-2 rounded text-white ${
              isPaid|| hasOutOfStock
                ? "bg-green-300 cursor-not-allowed" 
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isPaid || hasOutOfStock}
          >
            {isPaid ? "Paid" : "Pay Now"}
          </button>
          <button
            onClick={handleOrderNow}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              !isPaid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isPaid || hasOutOfStock}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

