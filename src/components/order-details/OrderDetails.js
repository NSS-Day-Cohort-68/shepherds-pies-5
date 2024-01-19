import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderByOrderId } from "../../services/orderService";
import {
  getAllPizzas,
  getAllToppings,
  deletePizza,
  deletePizzaTopping,
  getAllSizes,
  getAllCheeses,
  getAllSauces,
} from "../../services/pizzaService";
import { EditPizza } from "./EditPizza";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const [currentOrder, setCurrentOrder] = useState({});
  const [allPizzas, setAllPizzas] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allCheeses, setAllCheeses] = useState([]);
  const [allSauces, setAllSauces] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [currentPizzas, setCurrentPizzas] = useState([]);
  const [inProgressPizza, setInProgressPizza] = useState({});
  const [orderTypeRadio, setOrderTypeRadio] = useState(0);

  let pizzaCounter = 0;
  const showBlock = { display: "block" };
  const showNone = { display: "none" };

  useEffect(() => {
    getOrderByOrderId(orderId).then((orderObj) => {
      setCurrentOrder(orderObj);
    });

    getAllPizzas().then((pizzasArray) => {
      setAllPizzas(pizzasArray);
    });

    getAllSizes().then((sizesArray) => {
      setAllSizes(sizesArray);
    });

    getAllCheeses().then((cheesesArray) => {
      setAllCheeses(cheesesArray);
    });

    getAllSauces().then((saucesArray) => {
      setAllSauces(saucesArray);
    });

    getAllToppings().then((toppingsArray) => {
      setAllToppings(toppingsArray);
    });
  }, [orderId]);

  useEffect(() => {
    const currentPizzaIds = [];
    if (currentOrder.pizzas) {
      for (const pizza of currentOrder.pizzas) {
        currentPizzaIds.push(pizza.id);
      }
    }
    const pizzas = allPizzas.filter((pizza) =>
      currentPizzaIds?.includes(pizza.id)
    );

    setCurrentPizzas(pizzas);
  }, [currentOrder, allPizzas, allToppings]);

  useEffect(() => {
    if (currentOrder.delivererId) {
      setOrderTypeRadio(currentOrder.delivererId);
    } else if (currentOrder.table) {
      setOrderTypeRadio(currentOrder.table);
    } else {
      setOrderTypeRadio(0);
    }
  }, [currentOrder]);

  const renderPizzaToppings = (pizza) => {
    const toppingIds = [];
    if (pizza.pizzaToppings.length) {
      for (const pizzaTopping of pizza.pizzaToppings) {
        toppingIds.push(pizzaTopping.toppingId);
      }
      const toppingObjects = allToppings.filter((toppingObj) =>
        toppingIds.includes(toppingObj.id)
      );
      const toppingNames = [];
      for (const topping of toppingObjects) {
        toppingNames.push(topping.topping);
      }
      if (toppingNames.length) {
        return toppingNames.join(", ");
      } else {
        return "None";
      }
    } else {
      return "None";
    }
  };

  const handleInput = (event) => {
    const orderCopy = { ...currentOrder };
    orderCopy[event.target.name] = parseInt(event.target.value);
    setCurrentOrder(orderCopy);
  };

  const renderDelivery = () => {
    return (
      <>
        <h3 className="order-details-heading">Delivery Details</h3>
        <div className="delivery-address">
          <h4 className="order-details-heading">Address</h4>
          <input
            type="text"
            className="customer-address"
            name="address"
            value={currentOrder.address ? currentOrder.address : ""}
            onChange={handleInput}
          />
        </div>
      </>
    );
  };

  const renderDineIn = () => {
    return (
      <>
        <h3 className="order-details-heading">Dine In Details</h3>
        <div className="dine-in-table">
          <h4 className="order-details-heading">Table Number</h4>
          <input
            type="text"
            className="table-number"
            name="table"
            value={currentOrder.table ? currentOrder.table : ""}
            onChange={handleInput}
          />
        </div>
      </>
    );
  };

  const handleDelete = (pizzaObj) => {
    // delete all associated toppings from pizzaToppings
    const pizzaToppingIds = [];
    if (pizzaObj.pizzaToppings?.length) {
      for (const pizzaTopping of pizzaObj.pizzaToppings) {
        pizzaToppingIds.push(pizzaTopping.id);
      }
      for (const pizzaToppingId of pizzaToppingIds) {
        deletePizzaTopping(pizzaToppingId);
      }
    }

    // delete pizza
    deletePizza(pizzaObj).then(() => {
      getAllPizzas().then((pizzas) => {
        setAllPizzas(pizzas);
      });
    });
  };

  const handleEdit = (pizzaObj) => {
    setInProgressPizza(pizzaObj);
  };

  return (
    <>
      <div className="nav">
        <button className="nav-btn">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </button>
      </div>
      <div className="order-details">
        <h2 className="page-heading">Order #{currentOrder.id} Summary</h2>
        <section className="order-pizzas">
          <h3 className="section-heading">
            Pizzas on Order #{currentOrder.id}:
          </h3>
          {currentPizzas.map((pizza) => {
            pizzaCounter += 1;
            return (
              <div className="pizza" key={pizza.id}>
                <div className="pizza-title">Pizza #{pizzaCounter}</div>
                <div className="pizza-details">
                  {`${pizza.size.size} ${pizza.cheese.cheese} Pizza with ${pizza.sauce.sauce} Sauce.`}
                </div>
                <div className="pizza-toppings">
                  Toppings: {renderPizzaToppings(pizza)}
                </div>
                <div className="btns-container">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      handleEdit(pizza);
                    }}
                  >
                    Edit Pizza
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      handleDelete(pizza);
                    }}
                  >
                    Delete Pizza
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        <section className="order-type">
          <div>
            <input
              type="radio"
              name="orderType"
              id="delivery"
              value={currentOrder.delivererId ? currentOrder.delivererId : 0}
              checked={orderTypeRadio === currentOrder.delivererId}
              onChange={(event) => {
                setOrderTypeRadio(parseInt(event.target.value));
                document.getElementById("dine-in-details").style =
                  "display: none;";
                document.getElementById("delivery-details").style =
                  "display: block;";
              }}
            />
            <label htmlFor="delivery">Delivery</label>
            <input
              type="radio"
              name="orderType"
              id="dine-in"
              value={currentOrder.table ? currentOrder.table : 0}
              checked={orderTypeRadio === currentOrder.table}
              onChange={(event) => {
                setOrderTypeRadio(parseInt(event.target.value));
                document.getElementById("delivery-details").style =
                  "display: none;";
                document.getElementById("dine-in-details").style =
                  "display: block;";
              }}
            />
            <label htmlFor="dine-in">Dine-In</label>
          </div>
          {currentOrder.delivererId ? (
            <div id="delivery-details" style={{ display: showBlock.display }}>
              {renderDelivery()}
            </div>
          ) : (
            <div id="delivery-details" style={{ display: showNone.display }}>
              {renderDelivery()}
            </div>
          )}

          {currentOrder.table ? (
            <div id="dine-in-details" style={{ display: showBlock.display }}>
              {renderDineIn()}
            </div>
          ) : (
            <div id="dine-in-details" style={{ display: showNone.display }}>
              {renderDineIn()}
            </div>
          )}
        </section>
      </div>
      <div className="pizza-form">
        <EditPizza
          inProgressPizza={inProgressPizza}
          allSizes={allSizes}
          allCheeses={allCheeses}
          allSauces={allSauces}
          allToppings={allToppings}
          setAllToppings={setAllToppings}
          setAllPizzas={setAllPizzas}
        />
      </div>
    </>
  );
};
