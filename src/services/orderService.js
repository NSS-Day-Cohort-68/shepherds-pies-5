

export const getAllOrders = () => {
  return fetch("http://localhost:8088/orders?_expand=employee").then((res) => res.json());
};


export const switchOrderStatus = async (order) => {
  const putOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
  }

  return await fetch(`http://localhost:8088/orders/${order.id}` , putOptions)
}