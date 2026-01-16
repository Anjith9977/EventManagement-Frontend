import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEventPurchaseAPI } from "../../services/AllApi";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Prevent duplicate API calls
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const eventId = params.get("eventId");

    if (eventId && !hasConfirmed.current) {
      hasConfirmed.current = true;
      confirmPurchase(eventId);
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
        navigate("/mybooking");
      }

    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <button
        onClick={() => navigate("/mybooking")}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold"
      >
        Go to My Bookings
      </button>
    </div>
  );

}

export default PaymentSuccess;
