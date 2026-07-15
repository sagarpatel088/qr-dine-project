import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <div className="hero">

        <h1>
          🍽️ Welcome to QR Dine
        </h1>

        <p>
          Order your favourite food directly from your table
        </p>

        <Link to="/menu">
          <button>
            Order Now
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Home;