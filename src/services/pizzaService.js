export const getAllPizzas = async () => {
  const response = await fetch(
    "http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce&_expand=order&_embed=pizzaToppings"
  );
  return await response.json();
};

export const getAllSizes = async () => {
  const response = await fetch("http://localhost:8088/sizes");
  return await response.json();
};

export const getAllCheeses = async () => {
  const response = await fetch("http://localhost:8088/cheeses");
  return await response.json();
};

export const getAllSauces = async () => {
  const response = await fetch("http://localhost:8088/sauces");
  return await response.json();
};

export const getAllToppings = async () => {
  const response = await fetch("http://localhost:8088/toppings");
  return await response.json();
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

export const addPizzaTopping = async (pizzaToppingObj) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pizzaToppingObj),
  };

  return fetch("http://localhost:8088/pizzaToppings", postOptions);
};

export const updatedPizza = async (pizzaObj) => {
  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pizzaObj),
  };

  return fetch(`http://localhost:8088/pizzas/${pizzaObj.id}`, putOptions);
};
