import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../../lib/axiosInstance";

const Eventbookingpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Mock event availability (replace with actual API check)
  const isEventAvailable = Math.random() > 0.3; // 70% chance of being available for demo

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await apiRequest.get(`/user/event/${id}`);
        setEvent(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch event details", error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventDate || !guestCount) {
      alert("Please fill in all booking details.");
      return;
    }

    const selectedDate = new Date(eventDate);
    const currentDate = new Date();

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("Event date must be today or in the future.");
      return;
    }

    if (parseInt(guestCount) > event.capacity) {
      alert(`Guest count cannot exceed event capacity of ${event.capacity}.`);
      return;
    }

    setShowPaymentModal(true);
  };

  const handleFakePayment = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    setIsPaying(true);
    setPaymentStatus(null);

    setTimeout(async () => {
      const bookingData = {
        eventId: id,
        date: new Date(eventDate).toISOString(),
        numberOfGuests: parseInt(guestCount),
        paymentMethod: selectedMethod,
        amount: event.price || 1000, // Default price if not provided
      };

      try {
        if (!isEventAvailable) {
          throw new Error("Event is not available");
        }

        const res = await apiRequest.post(`/user/book-event/${id}`, bookingData);
        setPaymentStatus("success");
        setTimeout(() => {
          alert("Event booked successfully! " + res.data.message);
          setIsPaying(false);
          setShowPaymentModal(false);
          navigate("/");
        }, 3000); // Auto-close after 3 seconds
      } catch (error) {
        console.error("Booking failed:", error);
        setPaymentStatus("failed");
        setTimeout(() => {
          alert(
            "Booking Failed: " +
            (error.message === "Event is not available"
              ? "Event is not available"
              : error?.response?.data?.message || "Unknown error")
          );
          setIsPaying(false);
          setShowPaymentModal(false); // Auto-close after 3 seconds
        }, 3000); // Auto-close after 3 seconds
      }
    }, 2500); // 2.5 second delay for processing
  };

  if (loading) return <div className="text-center py-10">Loading event details...</div>;
  if (!event) return <div className="text-center py-10 text-red-500">Event not found.</div>;

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
      {/* Left - Event Image and Info */}
      <div className="lg:w-1/2 space-y-6">
        <img
          src={event.images?.[0]?.url || "/placeholder.jpg"}
          alt={event.name}
          className="rounded-box w-full h-[400px] object-cover shadow-xl"
        />
        <div className="bg-gray-200 rounded-box p-5 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Specifications</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-black font-medium">
            <p><span className="font-bold">Name:</span> {event.name}</p>
            <p><span className="font-bold">Category:</span> {event.category}</p>
            <p><span className="font-bold">Location:</span> {event.location}</p>
            <p><span className="font-bold">Capacity:</span> {event.capacity}</p>
          </div>
          <p className="mt-4 text-gray-700"><span className="font-bold">Description:</span> {event.description}</p>
        </div>
      </div>

      {/* Right - Booking Form */}
      <div className="lg:w-1/2 bg-gray-200 p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-primary mb-2">{event.name}</h2>
        <p className="text-gray-600">Fill in the details below to reserve your event.</p>

        <form className="space-y-5 text-gray-700" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-black">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Guests</label>
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="Enter number of guests"
              className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <dialog className="modal modal-open z-20 bg-black/50 backdrop-blur-sm">
          <form
            method="dialog"
            className="relative modal-box bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Make Your Payment
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - Payment Methods */}
              <div className="md:w-1/2 bg-gray-50 p-4 rounded-xl border">
                <h4 className="text-lg font-semibold mb-4 text-black">
                  Select Payment Method
                </h4>
                <div className="flex flex-col gap-3">
                  {["Online Payment", "Payment On Reception"].map(
                    (method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={selectedMethod === method}
                          onChange={() => setSelectedMethod(method)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700">{method}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Right - Booking Summary */}
              <div className="md:w-1/2 bg-gray-100 p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-black">
                  Booking Details
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Event:</strong> {event.name}
                  </li>
                  <li>
                    <strong>Guests:</strong> {guestCount}
                  </li>
                  <li>
                    <strong>Amount:</strong> ₹{event.price || 1000}
                  </li>
                  <li>
                    <strong>Date:</strong> {eventDate}
                  </li>
                  <li>
                    <strong>Location:</strong> {event.location}
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-error py-3 text-lg rounded-xl"
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentStatus(null);
                }}
                disabled={isPaying}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-primary w-[250px] py-3 text-lg rounded-xl transition-all duration-300 ${
                  isPaying || !selectedMethod ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleFakePayment}
                disabled={isPaying || !selectedMethod}
              >
                {isPaying ? "Processing Payment..." : "Make Payment"}
              </button>
            </div>

            {/* Payment Status Overlay */}
            {isPaying && !paymentStatus && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
                <div className="justify-items-center">
                  <img
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                    alt="Processing"
                    className="w-20 h-20"
                  />
                  <p className="p-2 text-lg text-gray-600">
                    Processing Payment...
                  </p>
                </div>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
                <div className="justify-items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    alt="Success"
                    className="w-20 h-20 animate-bounce"
                  />
                  <p className="p-2 text-lg text-green-600 font-semibold">
                    Payment Successful
                  </p>
                </div>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
                <div className="justify-items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                    alt="Failed"
                    className="w-20 h-20"
                  />
                  <p className="p-2 text-lg text-red-600 font-semibold">
                    Payment Failed
                  </p>
                </div>
              </div>
            )}
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Eventbookingpage;