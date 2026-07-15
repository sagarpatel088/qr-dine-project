import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function Table() {

  const { tableId } = useParams();

  const { setTableNumber } = useCart();


  useEffect(() => {

    setTableNumber(tableId);

    localStorage.setItem(
      "tableNumber",
      tableId
    );

  }, [tableId, setTableNumber]);


  return (
    <div>

      <h1>🍽️ QR Dine</h1>

      <h2>
        Table Number: {tableId}
      </h2>

      <p>
        Welcome! Please order your food.
      </p>

    </div>
  );
}

export default Table;