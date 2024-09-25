import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import necessary routing components
import {
  getAllNurseries,
  getNurseryFlowers,
} from "../../services/NurseryServices";
import { getFlowers } from "../../services/FlowerServices";
import {
  getAllDistributors,
  getAllDistributorNurseries,
} from "../../services/DistributorServices";
import "./Retailers.css";
import { getRetailerFlowers } from "../../services/retailerServices";

export const RetailerItem = ({ retailer, addCartQuantity, cart = {} }) => {
  const [flowers, setFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Fetch all data concurrently
    Promise.all([
      getNurseryFlowers(),
      getFlowers(),
      getAllDistributors(),
      getAllNurseries(),
      getAllDistributorNurseries(),
      getRetailerFlowers(),
    ]).then(
      ([
        nurseryFlowerData,
        allFlowers,
        allDistributors,
        allNurseries,
        distributorNurseryData,
        retailerFlowerData,
      ]) => {
        const retailerFlowers = retailerFlowerData
          .filter((retailerFlower) => retailerFlower.retailerId === retailer.id)
          .map((retailerFlower) => {
            const nurseryFlower = nurseryFlowerData.find(
              (nf) => nf.id === retailerFlower.nurseryFlowerId
            );
            const flower = allFlowers.find(
              (flower) => flower.id === nurseryFlower.flowerId
            );
            return {
              ...flower,
              price: nurseryFlower.price,
              nurseryId: nurseryFlower.nurseryId,
            };
          });

        setFlowers(retailerFlowers);

        const retailerDistributors = distributorNurseryData
          .filter((relation) => relation.nurseryFlowerId === retailer.id)
          .map((relation) => {
            return allDistributors.find(
              (distributor) => distributor.id === relation.distributorId
            );
          });
        setDistributors(retailerDistributors);

        const nurseryIds = retailerFlowers.map((flower) => flower.nurseryId);

        const retailerNurseries = allNurseries.filter((nursery) =>
          nurseryIds.includes(nursery.id)
        );
        setNurseries(retailerNurseries);
      }
    );
  }, [retailer]);

  const handleViewCart = () => {
    navigate("/mycart");
  };

  return (
    <div className="retailer-container">
      <div className="retailer">
        <header>
          <h1>{retailer.name}</h1>
          <p>{retailer.Address}</p>
        </header>

        <div className="retailer-flowers">
          <h3>Flowers Sold</h3>
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <ul key={flower?.id}>
                <li className="retailer-info">
                  {flower?.color} {flower?.species}
                </li>
                <li className="retailer-info">
                  Price: ${(flower?.price * 1.1).toFixed(2)} (with markup)
                </li>
                <li>
                  <input
                    type="number"
                    min={0}
                    defaultValue={cart[flower?.id] || 0}
                    onChange={(event) =>
                      addCartQuantity(flower?.id, Number(event.target.value))
                    }
                  />
                </li>
              </ul>
            ))
          ) : (
            <p>No flowers available for this retailer.</p>
          )}
        </div>

        <div className="retailer-distributors">
          <h3>Distributors</h3>
          {distributors.length > 0 ? (
            distributors.map((distributor, index) => (
              <ul key={index}>
                <li className="retailer-info">{distributor?.name}</li>
              </ul>
            ))
          ) : (
            <p>No distributors available for this retailer.</p>
          )}
        </div>

        <div className="retailer-nurseries">
          <h3>Nurseries</h3>
          {nurseries.length > 0 ? (
            nurseries.map((nursery, index) => (
              <ul key={index}>
                <li className="retailer-info">{nursery?.name}</li>
              </ul>
            ))
          ) : (
            <p>No nurseries available for this retailer.</p>
          )}
        </div>

        <button onClick={handleViewCart}>View Cart</button>
      </div>
    </div>
  );
};
