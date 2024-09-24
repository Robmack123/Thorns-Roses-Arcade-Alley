/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  getAllNurseries,
  getNurseryFlowers,
} from "../../services/NurseryServices";
import { getFlowers } from "../../services/FlowerServices";
import {
  getAllDistributors,
  getDistributorNurseries,
} from "../../services/DistributorServices";

export const RetailerItem = ({ retailer }) => {
  const [flowers, setFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    // Fetch nursery flowers data
    getNurseryFlowers().then((nurseryFlowerData) => {
      // Fetch all flowers
      getFlowers().then((allFlowers) => {
        // Fetch flowers sold by the retailer
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
        console.log("All Nurseries:", allNurseries);
        getDistributorNurseries().then((distributorNurseryData) => {
          console.log("Distributor-Nursery Relations:", distributorNurseryData);

          // Get the nurseryFlowerIds associated with the retailer
          const retailerFlowerIds = nurseryFlowerData
            .filter((rel) => rel.nurseryId === retailer.id)
            .map((rel) => rel.id); // Assuming you need the nurseryFlowerId

          // Get the corresponding nursery IDs from nurseryFlowers
          const nurseryIds = nurseryFlowerData
            .filter((nurseryFlower) =>
              retailerFlowerIds.includes(nurseryFlower.id)
            )
            .map((nurseryFlower) => nurseryFlower.nurseryId); // Get nurseryId from nurseryFlower

          //Fetch the nurseries using the nursery IDs
          const retailerNurseries = allNurseries.filter((nursery) =>
            nurseryIds.includes(nursery.id)
          );

          console.log("Retailer Nurseries:", retailerNurseries); // Check if nurseries are correctly mapped
          setNurseries(retailerNurseries); // Set the state with the nurseries found
        });
      });
    });
  }, [retailer]);

  return (
    <div>
      <h2>{retailer.name}</h2>
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
          distributor ? <li key={index}>{distributor.name}</li> : null
        )}
      </ul>

      <h3>Nurseries</h3>
      <ul>
        {nurseries.map((nursery, index) =>
          nursery ? <li key={index}>{nursery.name}</li> : null
        )}
      </ul>
    </div>
  );
};
