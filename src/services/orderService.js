export const getAllOrders = () => {
  return fetch("http://localhost:8088/orders?_expand=employee").then((res) =>
    res.json()
  );
};

export const getOrderByOrderId = async (orderId) => {
  const response = await fetch(
    `http://localhost:8088/orders/${orderId}?_embed=pizzas`
  );
  return await response.json();
};

export const switchOrderStatus = async (order) => {
  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };

  return await fetch(`http://localhost:8088/orders/${order.id}`, putOptions);
};

export const getAllPizzas = () => {
  return fetch(
    `http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce&_expand=order&_embed=pizzaToppings`
  ).then((res) => res.json());
};

export const createPizza = async (pizzaObject) => {
  let res = await fetch("http://localhost:8088/pizzas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pizzaObject),
  });
  let pizza = res.json();
  return pizza;
};

export const createOrder = async (orderObject) => {
  let res = await fetch("http://localhost:8088/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderObject),
  });
  let order = res.json();
  return order;
};

export const createTopping = (pizzaTopping) => {
  return fetch("http://localhost:8088/pizzatoppings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pizzaTopping),
  });
};

export const upDateOrder = (order) => {
  return fetch(`http://localhost:8088/orders/${order.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
};

export const deletePizza = async (pizzaObj) => {
  const deleteOptions = { method: "DELETE" };
  return await fetch(
    `http://localhost:8088/pizzas/${pizzaObj.id}`,
    deleteOptions
  );
};
export const deletePizzaTopping = async (pizzaToppingId) => {
  const deleteOptions = { method: "DELETE" };
  return await fetch(
    `http://localhost:8088/pizzaToppings/${pizzaToppingId}`,
    deleteOptions
  );
};

export const getPizzaById = async (pizzaId) => {
  return fetch(`http://localhost:8088/pizzas/${pizzaId}?_embed=pizzaToppings`);
};

export const postPizza = async (pizzaObject) => {
  const postOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pizzaObject),
  };
  let res = await fetch("http://localhost:8088/pizzas", postOptions);
  let pizza = res.json();
  return pizza;
};
