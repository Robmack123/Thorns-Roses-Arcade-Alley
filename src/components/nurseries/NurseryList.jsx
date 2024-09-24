import { useEffect, useState } from "react";
import { getAllNurseries } from "../../services/NurseryServices";
import { Nursery } from "./Nursery";

export const NurseryList = () => {
  const [allNurseries, setAllNurseries] = useState([]);

  useEffect(() => {
    getAllNurseries().then((allNurseriesArray) => {
      setAllNurseries(allNurseriesArray);
    });
  }, []);

  return (
    <div className="allNurseries">
      {allNurseries.map((nurseryObj) => {
        return <Nursery nursery={nurseryObj} key={nurseryObj.id} />;
      })}
    </div>
  );
};
