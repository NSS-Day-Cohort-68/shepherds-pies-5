import { useEffect, useState } from "react";
import "./ViewOrders.css";
import { getAllOrders, switchOrderStatus } from "../../services/orderService";
import { getAllEmployees } from "../../services/employeeService";
import { Link } from "react-router-dom"

export const ViewOrders = () => {
  const [pizzaOrders, setPizzaOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllOrders().then((ordersArr) => {
      setPizzaOrders(ordersArr);
    });
  }, []);

  const updateOrders = () => {
    getAllOrders().then((ordersArr) => {
      setPizzaOrders(ordersArr);
    });
  };

  useEffect(() => {
    getAllEmployees().then((employeesArr) => {
      setEmployees(employeesArr);
    });
  }, []);

  useEffect(() => {
    const showCompletedOrders = pizzaOrders.filter(
      (order) => order.completed === true
    );
    setCompletedOrders(showCompletedOrders);
  }, [pizzaOrders]);

  useEffect(() => {
    const showActiveOrders = pizzaOrders.filter(
      (order) => order.completed === false
    );
    setActiveOrders(showActiveOrders);
  }, [pizzaOrders]);

  const delivererName = (order) => {
    for (const employee of employees) {
      if (order.delivererId === employee.id) {
        return employee.name;
      }
    }
  };

  return (
    <div className="container">
      <h1>Active Orders</h1>
      <div>
        <div>
          {activeOrders.map((order) => {
            return (
              <section className="orders" key={order.id}>
                Pizza Order #{order.id} -- {order.date}
                <select
                  id={order.id}
                  onChange={(event) => {
                    order.delivererId = parseInt(event.target.value);

                    switchOrderStatus(order).then(() => updateOrders());
                  }}
                  value={order.delivererId}
                >
                  <option value="0">Deliverer...</option>
                  {employees
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((deliverer) => {
                      return (
                        <option value={deliverer.id}>{deliverer.name}</option>
                      );
                    })}
                </select>
                <button
                  className="btn-info"
                  onClick={() => {
                    switchOrderStatus({
                      id: order.id,
                      date: order.date,
                      time: order.time,
                      pizzaId: order.pizzaId,
                      table: order.table,
                      employeeId: order.employeeId,
                      delivererId: order.delivererId,
                      address: order.address,
                      completed: !order.completed,
                    }).then(() => {
                      updateOrders();
                    });
                  }}
                >
                  Completed
                </button>
              </section>
            );
          })}
        </div>
      </div>

      <h1>Completed Orders</h1>
      <div>
        <div>
          {completedOrders
            .sort((a, b) => (a.date > b.date ? -1 : 1))
            .map((order) => {
              return (
                <section className="orders" key={order.id}>
                  Pizza Order #{order.id} -- {order.date}
                  <button
                    className="btn-danger"
                    onClick={() => {
                      const sendOrder = {
                        id: order.id,
                        date: order.date,
                        time: order.time,
                        pizzaId: order.pizzaId,
                        table: order.table,
                        employeeId: order.employeeId,
                        delivererId: order.delivererId,
                        address: order.address,
                        completed: !order.completed,
                      };

                      switchOrderStatus(sendOrder).then(() => {
                        updateOrders();
                      });
                    }}
                  >
                    Override
                  </button>
                  <div> Deliverer: {delivererName(order)}</div>
                </section>
              );
            })}
        </div>
      </div>
      <button className="Home">
        <Link to="/" className="nav-link">
          <img src="https://i.pinimg.com/originals/b0/22/07/b0220700bcfee516dfd95bf09507cd80.png" />
        </Link>
      </button>
    </div>
  );
};
