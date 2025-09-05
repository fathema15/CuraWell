import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.unit_price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate("/drugstore")}
          className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Browse Drugs
        </button>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>
      <div className="flex flex-col gap-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full sm:w-40 object-contain bg-gray-50"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <p className="text-gray-900 font-medium text-lg">{item.name}</p>
                <p className="text-gray-600 text-sm mb-1">{item.company}</p>
                <p className="text-sm text-gray-700 mb-2">{item.category}</p>
                <p className="text-gray-800 text-sm mb-2">
                  <span className="font-semibold">Unit Price:</span> {item.unit_price}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                  Remove
                </button>
                <p className="text-gray-800 font-semibold">Unit Price: {item.unit_price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-indigo-50 p-6 rounded-xl">
        <p className="text-gray-900 font-semibold text-lg">
          Total Price: <span className="text-indigo-600">{totalPrice}</span>
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button
            onClick={() => navigate("/drugstore")}
            className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
