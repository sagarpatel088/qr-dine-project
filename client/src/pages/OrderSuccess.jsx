import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div className="success-container">

      <h1>🎉 Order Placed Successfully!</h1>

      <p>
        Thank you for ordering.
        Your food will be served soon.
      </p>

      <button onClick={() => navigate("/menu")}>
        Back To Menu
      </button>

    </div>
  );
}

export default OrderSuccess;