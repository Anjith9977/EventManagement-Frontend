import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEventPurchaseAPI } from "../../services/AllApi";
import { CheckCircle, ArrowRight, Ticket } from "lucide-react";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming"); // confirming | success | error

  // Prevent duplicate API calls
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const eventId = params.get("eventId");

    if (eventId && !hasConfirmed.current) {
      hasConfirmed.current = true;
      confirmPurchase(eventId);
    } else if (!eventId) {
      setStatus("error");
    }
  }, []);

  const confirmPurchase = async (eventId) => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      const response = await confirmEventPurchaseAPI(
        {
          eventId,
          ticketsCount: 1,
        },
        reqHeader
      );

      if (response.status === 200) {
        setStatus("success");
        setTimeout(() => navigate("/mybooking"), 2500);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 bg-white border border-pink-100 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {status === "confirming" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Confirming your booking…</h1>
            <p className="text-gray-500 mt-2 font-medium">
              Please wait while we confirm your payment and reserve your seat.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100">
                <CheckCircle size={44} className="text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-gray-900">🎉 Booking Confirmed!</h1>
            <p className="text-gray-500 mt-3 font-medium leading-relaxed">
              Your ticket has been booked successfully. You can view and download your e-ticket from <strong>My Bookings</strong>.
            </p>
            <p className="text-xs text-gray-400 mt-4 font-semibold">Redirecting to My Bookings…</p>

            <button
              onClick={() => navigate("/mybooking")}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-pink-500/20"
            >
              <Ticket size={18} /> Go to My Bookings <ArrowRight size={16} />
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
                <span className="text-4xl">⚠️</span>
              </div>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Something went wrong</h1>
            <p className="text-gray-500 mt-3 font-medium">
              We received your payment but could not confirm the booking. Please contact support with your payment reference.
            </p>

            <button
              onClick={() => navigate("/all-events")}
              className="mt-6 w-full border-2 border-pink-200 hover:bg-pink-50 text-pink-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition"
            >
              Back to Events
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
