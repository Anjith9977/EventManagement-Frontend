import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEventPurchaseAPI } from "../../services/AllApi";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PaymentSuccess page loaded");

    const eventId = params.get("eventId");
    console.log("Event ID:", eventId);

    if (eventId) {
      confirmPurchase(eventId);
    }
  }, []);

  const confirmPurchase = async (eventId) => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        authorization: `Bearer ${token}`, // ⚠️ MUST be Bearer
      };

      console.log("Calling confirm-purchase API");

      await confirmEventPurchaseAPI(
        { eventId },
        reqHeader
      );

      console.log("Purchase confirmed in backend");

      navigate("/all-events");

    } catch (error) {
      console.error("Confirm purchase failed:", error);
    }
  };

  return <h1>Payment Successful 🎉</h1>;
}

export default PaymentSuccess;

