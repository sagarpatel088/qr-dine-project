import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>🍽️ QR Dine</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;