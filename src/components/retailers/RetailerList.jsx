import { useEffect, useState } from "react";
import { getRetailers } from "../../services/retailerServices";
import { RetailerItem } from "./RetailerItem";

export const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const data = await getRetailers();
        setRetailers(data);
      } catch (err) {
        setError("Failed to fetch retailers");
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchRetailers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div>
      <h1>Retailers</h1>
      {retailers.length > 0 ? (
        retailers.map((retailer) => (
          <RetailerItem key={retailer.id} retailer={retailer} />
        ))
      ) : (
        <p>No retailers available.</p> // Handle case with no retailers
      )}
    </div>
  );
};
