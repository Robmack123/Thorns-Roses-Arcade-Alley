import React from "react";

export const MyCart = React.memo(({ cart, flowers = [] }) => {
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

  return (
    <div className="my-cart">
      <h3>Your Cart</h3>
      {Object.keys(cart).length > 0 ? (
        <ul>
          {Object.entries(cart).map(([flowerId, quantity]) => {
            const flower = flowers.find(
              (flower) => flower.id === parseInt(flowerId)
            );

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
                {flower.species} (Color: {flower.color}) - Quantity: {quantity}{" "}
                - Price per unit: ${(price * 1.1).toFixed(2)} - Total: $
                {(price * 1.1 * quantity).toFixed(2)}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
    </div>
  );
});

MyCart.displayName = "MyCart";
