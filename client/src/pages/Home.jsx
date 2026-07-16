import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <div className="overlay">

        <div className="hero">

          <h1>🍽️ Welcome to QR Dine</h1>

          <p>
            Experience Fast, Easy & Contactless Food Ordering
          </p>

          <div className="buttons">

            <Link to="/menu">
              <button className="order-btn">
                🍔 Order Now
              </button>
            </Link>

            <Link to="/login">
  <button className="admin-btn">
    👨‍🍳 Admin Panel
  </button>
</Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;