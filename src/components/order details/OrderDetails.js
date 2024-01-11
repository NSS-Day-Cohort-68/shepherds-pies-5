import { useEffect, useState } from "react";
import "./OrderDetails.css";

export const OrderDetails = () => {
  const [pizzaOrders, setPizzaOrders] = useState([]);

  // useEffect((), [])

  return (
    <div>
      <h1>Active Orders</h1>
      <div>
        <h2>Pizza Orders -- Date</h2>
        <span>
          <select>
            <option value="1">Deliverer</option>
            <option value="2">Correspondent Employee</option>
          </select>
        </span>

        <button className="btn-info">Completed</button>
      </div>

      <h1>Completed Orders</h1>
      <div>
        <h2>Pizza Orders -- Date</h2>
        <button className="btn-danger">Override</button>
      </div>
    </div>
  );
};
