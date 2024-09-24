export const MyCart = ({ cart, flowers }) => {
  const getFlowerDetails = (flowerId) => {
    const flower = flowers.find((flower) => flower.id === flowerId);

    const nurseryFlower = flower.nurseryFlowers.find(
      (flowers) => flowers.nurseryId === flowerId
    );

    return {
      name: flower.species,
      price: nurseryFlower?.price || 0,
      quantity: cart[flowerId],
    };
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {Object.keys(cart).map((flowerId) => {
          const details = getFlowerDetails(Number(flowerId));

          return (
            <li key={flowerId}>
              <p>Species: {details.name}</p>
              <p>Quantity: {details.quantity}</p>
              <p>Price: ${details.price}</p>
              <p>Total: ${details.price * details.quantity}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
