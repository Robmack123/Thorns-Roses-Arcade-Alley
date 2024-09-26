import { useEffect, useState } from "react";
import {
  getAllDistributors,
  getDistributorFlowers,
  getDistributorRetailers,
} from "../../services/DistributorServices";

export const DistributorView = () => {
  const [distributors, setDistributors] = useState([]);
  const [distributorFlowers, setDistributorFlowers] = useState([]);
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    // Fetch all distributors
    getAllDistributors().then((data) => setDistributors(data));
  }, []);

  const handleDistributorSelect = (distributorId) => {
    getDistributorFlowers(distributorId).then((data) =>
      setDistributorFlowers(data)
    );
    getDistributorRetailers(distributorId).then((data) => setRetailers(data)); // Only fetch retailers for that distributor
  };

  return (
    <div className="container">
      <h1>Distributors</h1>
      <ul>
        {distributors.map((distributor) => (
          <li
            className="dis-list"
            key={distributor.id}
            onClick={() => handleDistributorSelect(distributor.id)}
          >
            {distributor.name}
          </li>
        ))}
      </ul>

      {distributorFlowers.length > 0 && (
        <>
          <h2>Flowers</h2>
          <ul>
            {distributorFlowers.map((flower) => {
              // Find the matching distributor for the current flower
              const distributor = distributors.find(
                (d) => d.id === flower.distributorId
              );

              // Safely access the PriceMarkup (use 0 if no distributor is found)
              const priceMarkup = distributor ? distributor["Price Markup"] : 0;

              return (
                <li className="dis-list" key={flower.id}>
                  {flower.flower.species} ({flower.flower.color}) - Price: $
                  {(flower.nurseryFlower.price * (1 + priceMarkup)).toFixed(2)}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {retailers.length > 0 && (
        <>
          <h2>Retailers</h2>
          <ul>
            {retailers.map((retailer) => (
              <li key={retailer.id} className="retailer">
                {retailer.name} - {retailer.Address}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
