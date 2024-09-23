import { useEffect, useState } from "react";
import { getAllFlowers } from "../../services/FlowerServices";
import { getAllDistributors } from "../../services/DistributorServices";

export const Nursery = ({ nursery }) => {
  const [flowers, setFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    getAllFlowers().then((flowersArray) => {
      setFlowers(flowersArray);
    });
  }, []);

  useEffect(() => {
    getAllDistributors().then((distributorsArray) => {
      setDistributors(distributorsArray);
    });
  }, []);

  return (
    <section className="nursery-container">
      <div className="nursery">
        <header>
          <h1>{nursery.name}</h1>
        </header>
        <div className="nursery-flowers">
          {flowers.map((flower) => (
            <ul key={flower.id}>
              <li className="nursery-info">{flower.species}</li>
              <li className="nursery-info">{flower.color}</li>
              <li className="nursery-info">{flower.color}</li>
            </ul>
          ))}
        </div>
        <div className="nursery-distributor">
          <ul>
            {distributors.map((distributor) => (
              <li className="nursery-info">{distributor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
