/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllNurseries } from "../../services/NurseryServices";

import { getFlowers } from "../../services/FlowerServices";
import { getNurseryFlowers } from "../../services/NurseryServices";
import {
  getAllDistributors,
  getDistributorNurseries,
} from "../../services/DistributorServices";

export const RetailerItem = ({ retailer }) => {
  const [flowers, setFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    // Fetch flowers sold by the retailer
    getFlowers().then((allFlowers) => {
      getNurseryFlowers().then((nurseryFlowerData) => {
        const retailerFlowers = nurseryFlowerData
          .filter((nurseryFlower) => nurseryFlower.nurseryId === retailer.id)
          .map((nurseryFlower) => {
            const flower = allFlowers.find(
              (flower) => flower.id === nurseryFlower.flowerId
            );
            return { ...flower, price: nurseryFlower.price };
          });
        setFlowers(retailerFlowers);
      });
    });

    // Fetch distributors and related nurseries
    getAllDistributors().then((allDistributors) => {
      getDistributorNurseries().then((distributorNurseryData) => {
        const retailerDistributors = distributorNurseryData
          .filter((relation) => relation.nurseryFlowerId === retailer.id)
          .map((relation) => {
            return allDistributors.find(
              (distributor) => distributor.id === relation.distributorId
            );
          });
        setDistributors(retailerDistributors);
      });
    });

    // Fetch nurseries through distributors
    getAllNurseries().then((allNurseries) => {
      getDistributorNurseries().then((distributorNurseryData) => {
        const retailerNurseries = distributorNurseryData
          .filter((relation) => relation.nurseryFlowerId === retailer.id)
          .map((relation) => {
            return (
              allNurseries.find(
                (nursery) => nursery.id === relation.nurseryId
              ) || null
            ); // Return null if not found
          });
        setNurseries(retailerNurseries.filter((nursery) => nursery !== null)); // Filter out null values
      });
    });
  }, [retailer]);

  return (
    <div>
      <h2>{retailer["Business Name"]}</h2>
      <p>{retailer.Address}</p>

      <h3>Flowers Sold</h3>
      <ul>
        {flowers.map((flower, index) => (
          <li key={index}>
            {flower.Color} {flower.Species} - ${(flower.price * 1.1).toFixed(2)}{" "}
            (with markup)
          </li>
        ))}
      </ul>

      <h3>Distributors</h3>
      <ul>
        {distributors.map((distributor, index) =>
          distributor ? (
            <li key={index}>{distributor["Business Name"]}</li>
          ) : null
        )}
      </ul>

      <h3>Nurseries</h3>
      <ul>
        {nurseries.map((nursery, index) =>
          nursery ? <li key={index}>{nursery["Business Name"]}</li> : null
        )}
      </ul>
    </div>
  );
};
