import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const {
    token,
    appointments,
    getUserAppointments,
    getDoctorsData,
    backendUrl,
  } = useContext(AppContext);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const data = await fetch(`${backendUrl}/api/user/cancel-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ appointmentId }),
      }).then((res) => res.json());

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const bookAppointment = async (docId, slotDate, slotTime) => {
    try {
      const data = await fetch(`${backendUrl}/api/user/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ docId, slotDate, slotTime }),
      }).then((res) => res.json());

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load appointments when token changes
  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  // Sort appointments: latest first
  const sortedAppointments =
    appointments && appointments.length > 0
      ? [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.isCompleted && (
                  <>
                    <button
                      className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Pay & Confirm
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  </>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 py-4">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;