import { useEffect, useState } from "react";
import { getAllFlowers } from "../../services/FlowerServices";
import { getAllDistributors } from "../../services/DistributorServices";
import "./Nursery.css";
import backgroundImage from "../../assets/flower_collage.png";

export const Nursery = ({ nursery }) => {
  const [flowers, setFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    getAllFlowers().then((flowersArray) => {
      const filteredFlowers = flowersArray.filter((flower) =>
        flower.nurseryFlowers?.some(
          (flowers) => flowers.nurseryId === nursery.id
        )
      );
      setFlowers(filteredFlowers);
    });
  }, [nursery.id]);

  useEffect(() => {
    getAllDistributors().then((distArray) => {
      const uniqueDistributorIds = new Set(); // Set to track unique distributor IDs
      const filteredDistributors = distArray.filter((distNursery) => {
        if (distNursery.nurseryFlower?.nurseryId === nursery.id) {
          // If the distributor ID is not in the set, add it and include this distributor
          if (!uniqueDistributorIds.has(distNursery.distributorId)) {
            uniqueDistributorIds.add(distNursery.distributorId);
            return true;
          }
        }
        return false;
      });
      setDistributors(filteredDistributors);
    });
  }, [nursery.id]);

  return (
    <section className="nursery-container">
      <div className="nursery">
        <header>
          <h1>{nursery.name}</h1>
        </header>

        <div
          className="nursery-flowers"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {flowers.map((flower) => {
            const nurseryFlower = flower.nurseryFlowers.find(
              (flowers) => flowers.nurseryId === nursery.id
            );
            return (
              <ul key={flower.id}>
                <li className="nursery-info">Species: {flower.species}</li>
                <li className="nursery-info">Color: {flower.color}</li>
                {nurseryFlower && (
                  <li className="nursery-info">${nurseryFlower.price}</li>
                )}
              </ul>
            );
          })}
        </div>

        <div
          className="nursery-distributor"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {distributors.map((distributorObj) => (
            <ul key={distributorObj.distributorId}>
              <li className="nursery-info">
                {distributorObj.distributor.name}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
