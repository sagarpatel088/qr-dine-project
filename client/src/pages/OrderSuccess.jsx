import { Link } from "react-router-dom";

function OrderSuccess() {

  return (
    <div>

      <h1>✅ Order Placed Successfully</h1>

      <p>
        Your food will be prepared soon 🍽️
      </p>

      <Link to="/menu">
        <button>
          Order More
        </button>
      </Link>

    </div>
  );
}

export default OrderSuccess;