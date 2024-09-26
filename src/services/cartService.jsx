export const submitCart = (cartData) => {
  return fetch("http://localhost:8088/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  }).then((res) => res.json());
};
