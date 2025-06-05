import { useState } from "react";
import { roomData } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiRequest from "../../lib/axiosInstance";

export default function Single() {
  const room = roomData[0]; // Replace with dynamic later using useParams()
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState("");
  
  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Mock room availability (true for available, false for not available)
  // Set to true for testing success case; change to false to test failure
  const isRoomAvailable = true; // Replace with actual API check in production

  const openPopup = (index) => {
    setActiveImg(index);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !guestCount) {
      alert("Please fill in all booking details.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
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
        roomType: "single",
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        numberOfGuests: guestCount,
        paymentMethod: selectedMethod,
        amount: room.price,
      };

      try {
        if (!isRoomAvailable) {
          throw new Error("Room is not available");
        }

        const response = await apiRequest.post(
          "/user/bookingRoom",
          bookingData,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setPaymentStatus("success");
        setTimeout(() => {
          alert("Booking successful! " + response.data.message);
          setIsPaying(false);
          setShowPaymentModal(false);
          navigate("/");
        }, 3000); // Auto-close after 3 seconds
      } catch (error) {
        console.error("Payment Error", error);
        setPaymentStatus("failed");
        setTimeout(() => {
          alert(
            "Payment Failed: " +
            (error.message === "Room is not available"
              ? "Room is not available"
              : error?.response?.data?.message || "Unknown error")
          );
          setIsPaying(false);
          setShowPaymentModal(false); // Auto-close after 3 seconds
        }, 3000); // Auto-close after 3 seconds
      }
    }, 2500); // 2.5 second delay for processing
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-6">
        <img
          src={room.images[activeImg]}
          alt="Main Room"
          className="rounded-box w-full h-80 object-cover shadow-xl"
        />

        <div className="flex gap-3">
          {room.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i}`}
              onClick={() => openPopup(i)}
              className={`w-24 h-16 object-cover rounded-box cursor-pointer border-2 ${
                activeImg === i ? "border-primary" : "border-transparent"
              } hover:scale-105 transition`}
            />
          ))}
        </div>

        <div className="bg-gray-200 rounded-box p-5 shadow-2xl shadow-cyan-100">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Facilities</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-200">
            {room.facilities.map((f, i) => (
              <p className="text-black font-bold font-serif" key={i}>
                {f}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Booking Form */}
      <div className="lg:w-1/2 bg-gray-200 p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-primary mb-2 capitalize">
          {room.title}
        </h2>
        <p className="text-gray-600">
          Fill in the details below to reserve your stay.
        </p>

        <form className="space-y-5 text-gray-700" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-black">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
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

      {/* Image Popup Modal */}
      {isOpen && (
        <dialog className="modal modal-open">
          <form method="dialog" className="bg-gray-200 modal-box max-w-5xl">
            <img
              src={room.images[activeImg]}
              alt="Zoom"
              className="w-full h-[80vh] object-cover rounded-box"
            />
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}

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
                  {["Online Payment", "Payment on Check-Out", "UPI"].map(
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
                    <strong>Room:</strong> {room.title}
                  </li>
                  <li>
                    <strong>Guests:</strong> {guestCount}
                  </li>
                  <li>
                    <strong>Amount:</strong> ₹{room.price}
                  </li>
                  <li>
                    <strong>Check-in:</strong> {checkIn}
                  </li>
                  <li>
                    <strong>Check-out:</strong> {checkOut}
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
}