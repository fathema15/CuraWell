import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="m-5">
      {/* ---------------- Top Cards ---------------- */}
      <div className="flex flex-wrap gap-3">
        {[
          {
            icon: assets.doctor_icon,
            label: "Doctors",
            value: dashData.doctors,
          },
          {
            icon: assets.appointments_icon,
            label: "Appointments",
            value: dashData.appointments,
          },
          {
            icon: assets.patients_icon,
            label: "Patients",
            value: dashData.patients,
          },
          { icon: assets.medicine_icon, label: "Drugs", value: dashData.drugs },
          { icon: assets.order, label: "Orders", value: dashData.orders },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img className="w-14" src={card.icon} alt={card.label} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {card.value || 0}
              </p>
              <p className="text-gray-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Latest Bookings ---------------- */}
      <div className="bg-white mt-10 border rounded">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments?.slice(0, 5).map((item, index) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              key={index}
            >
              <img
                className="rounded-full w-10"
                src={item.docData?.image || assets.user_icon}
                alt={item.docData?.name || "Doctor"}
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p className="text-gray-600">
                  Booking on {slotDateFormat(item.slotDate)}
                </p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Latest Orders ---------------- */}
      <div className="bg-white mt-10 border rounded">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Orders</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestOrders?.slice(0, 5).map((order, index) => {
            const items = order.drugs || [];
            return items.map((d, i) => (
              <div
                key={`${order._id}-${i}`}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                {/* Drug Image */}
                <img
                  className="w-12 h-12 rounded"
                  src={d.drugId?.image || assets.medicine_icon}
                  alt={d.drugId?.name || "Drug"}
                />

                {/* Drug Name & Quantity */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {d.drugId?.name || "Unknown Drug"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Qty: {d.quantity}                  
                  </p>
                  <p className="text-gray-400 text-xs">
                    Ordered on {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Status */}
                <p
                  className={`text-xs font-medium ${
                    order.status === "completed"
                      ? "text-green-500"
                      : order.status === "cancelled"
                      ? "text-red-400"
                      : "text-blue-500"
                  }`}
                >
                  {order.status?.charAt(0).toUpperCase() +
                    order.status?.slice(1)}
                </p>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;