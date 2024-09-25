/* import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getAllDistributors} from "../../services/DistributorServices";
import { getAllNurseries } from "../../services/NurseryServices";
import { getRetailers } from "../../services/retailerServices";

export const DistributorInfo = () => {
 
  const [distributor, setDistributors] = useState([]);

  const [nurseries, setNurseries] = useState([]);
  const [retailer, setRetailers] = useState([]);

  useEffect(() => {
    getAllDistributors().then((distributors) => {
      setDistributors(distributors);
    });
    getAllNurseries().then((allNurseriesArray) => {
      setNurseries(allNurseriesArray);
    });
    getRetailers().then(retailersArray => {
        setRetailers(retailersArray)
    })
  }, []);


  return (
    <div>
      <h2>{currentDistributor[0]?.distributor?.name} Distributor</h2>
      <h4>Flowers</h4>
      {distributorFlowers.map((distributorFlower) => {
        let foundNursery = nurseries.find(
          (nursery) =>
            distributorFlower?.nurseryFlower?.nurseryId === nursery.id
        );
        return (
          <section className="distributor" key={}>
            <header className="distributor__header" key={distributorId}>
              {distributorFlower?.nurseryFlower?.flower?.species} from{" "}
            </header>
            <div>Color: {distributorFlower?.nurseryFlower?.flower?.color}</div>
            <div>
              Price:{" "}
              {(
                distributorFlower?.nurseryFlower?.price *
                currentDistributor[0]?.distributor?.priceMarkup
              ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div>
              Price Markup:{" "}
              {parseFloat(
                currentDistributor[0]?.distributor?.priceMarkup - 1
              ).toFixed(2) * 100}
              %
            </div>
          </section>
        );
      })}
      <h4>Retailers</h4>
      <section className="distributor">
        <header className="distributor__header">
          <Link to={`/retailers/${retailer[0]?.id}`}>{retailer[0]?.name}</Link>
        </header>
        <div>Address: {retailer[0]?.address}</div>
      </section>
    </div>
  );
};
 */
