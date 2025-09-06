import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllOrders = () => {
  const { aToken, orders, getAllOrders, updateOrderStatus } =
    useContext(AdminContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllOrders();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Orders</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Drugs</p>
          <p>Total Amount</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {orders.map((order, index) => (
          <div
            key={order._id}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                src={order.userId.image}
                className="w-8 rounded-full"
                alt=""
              />
              <p>{order.userId.name}</p>
            </div>

            <div className="flex flex-col gap-1">
              {order.drugs.map((d, i) => (
                <p key={i}>
                  {d.drugId.name} x {d.quantity}
                </p>
              ))}
            </div>

            <p>
              {currency}
              {order.totalAmount}
            </p>

            <p
              className={`text-xs font-medium ${
                order.status === "cancelled"
                  ? "text-red-400"
                  : order.status === "completed"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </p>

            <div className="flex items-center gap-2">
              {order.status === "pending" && (
                <>
                  <img
                    onClick={() => updateOrderStatus(order._id, "completed")}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="Complete"
                    title="Mark as Completed"
                  />
                  <img
                    onClick={() => updateOrderStatus(order._id, "cancelled")}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Order"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;