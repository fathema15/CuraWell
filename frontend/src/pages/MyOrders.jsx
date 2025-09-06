import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | completed | cancelled

  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/orders`, {
        headers: { token },
      });
      if (data.success) setOrders(data.orders.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserOrders();
  }, [token]);

  // Filtered orders
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, idx) => (
            <div
              key={order._id}
              className="border rounded p-4 bg-white shadow-sm flex flex-col sm:flex-row justify-between gap-4"
            >
              {/* Order Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Order #{idx + 1} - Status:{" "}
                  <span
                    className={`${
                      order.status === "completed"
                        ? "text-green-500"
                        : order.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    } font-medium`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Total Amount: {currencySymbol}
                  {order.totalAmount.toFixed(2)}
                </p>
                <div className="mt-2">
                  <p className="font-medium text-gray-700">Drugs:</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {order.drugs.map((d, i) => (
                      <li key={i}>
                        {d.drugId.name} x {d.quantity} ({currencySymbol}
                        {(d.price * d.quantity).toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 sm:items-end">
                {order.status === "pending" && (
                  <button
                    onClick={async () => {
                      try {
                        const { data } = await axios.post(
                          `${backendUrl}/api/order/cancel`,
                          { orderId: order._id },
                          { headers: { token } }
                        );
                        if (data.success) {
                          toast.success("Order cancelled");
                          getUserOrders();
                        }
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === "completed" && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded">
                    Completed
                  </span>
                )}
                {order.status === "cancelled" && (
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;