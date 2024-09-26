import React from "react";
import { submitCart } from "../../services/cartService";

export const MyCart = React.memo(({ cart, setCart, flowers = [] }) => {
  const grandTotal = Object.entries(cart).reduce(
    (total, [flowerId, quantity]) => {
      const flower = flowers.find((flower) => flower.id === parseInt(flowerId));

      if (!flower) {
        return total;
      }
      const price = flower.nurseryFlowers?.[0]?.price || flower.price || 0;
      const itemTotal = price * 1.1 * quantity;

      return total + itemTotal;
    },
    0
  );

  const handleSubmitCart = () => {
    const cartItems = Object.entries(cart)
      .map(([flowerId, quantity]) => {
        const flower = flowers.find(
          (flower) => flower.id === parseInt(flowerId)
        );
        const price = flower?.nurseryFlowers?.[0]?.price || flower?.price || 0;

        return { flowerId, quantity, price };
      })
      .filter((item) => item.quantity > 0);

    const total = cartItems.reduce((total, item) => {
      const itemTotal = item.price * 1.1 * item.quantity;
      return total + itemTotal;
    }, 0);

    const orderData = {
      cart: cartItems,
      total: total,
    };

    submitCart(orderData)
      .then((response) => {
        console.log("Cart submitted successfully:", response);
        // Clear the cart after successful submission
        setCart({});
      })
      .catch((error) => {
        console.error("Error submitting cart:", error);
      });
  };

  return (
    <div className="my-cart">
      <h3>Your Cart</h3>
      {Object.keys(cart).length > 0 ? (
        <>
          <ul>
            {Object.entries(cart).map(([flowerId, quantity]) => {
              const flower = flowers.find(
                (flower) => flower.id === parseInt(flowerId)
              );

              if (quantity <= 0) {
                return null;
              }

              if (!flower) {
                return (
                  <li key={flowerId}>
                    Unknown flower (ID: {flowerId}) - Quantity: {quantity}
                  </li>
                );
              }

              const price =
                flower.nurseryFlowers?.[0]?.price || flower.price || 0;

              return (
                <li key={flowerId}>
                  {flower.species} (Color: {flower.color}) - Quantity:{" "}
                  {quantity} - Price per unit: ${(price * 1.1).toFixed(2)} -
                  Total: ${(price * 1.1 * quantity).toFixed(2)}
                </li>
              );
            })}
          </ul>
          <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
          <button onClick={handleSubmitCart}>Submit Cart</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
});

MyCart.displayName = "MyCart";
