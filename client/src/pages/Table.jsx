import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function Table() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const { setTableNumber } = useCart();

  useEffect(() => {
    setTableNumber(tableId);

    localStorage.setItem("tableNumber", tableId);

    // Automatically Menu page par bhej do
    navigate("/menu");

  }, [tableId, setTableNumber, navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Table;