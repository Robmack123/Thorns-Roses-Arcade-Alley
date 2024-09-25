/* import { useEffect, useState } from "react";
import { getAllDistributors } from "../../services/DistributorServices";
import { DistributorInfo } from "./Distributor";
import "./Distributors.css";

export const DistributorsList = () => {
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    getAllDistributors().then((allDistArray) => {
      setDistributors(allDistArray);
    });
  }, []);

  return (
    <div className="allDistributors">
      {distributors.map((allDistributors) => {
        return (
          <DistributorInfo
            allDistributors={allDistributors}
            key={allDistributors.id}
          />
        );
      })}
    </div>
  );
};
 */
