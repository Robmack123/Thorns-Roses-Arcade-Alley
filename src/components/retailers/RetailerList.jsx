import { useEffect, useState } from "react";
import { getRetailers } from "../../services/retailerServices";
import { useNavigate, Outlet } from "react-router-dom"; // Use Outlet for nested routing
import { RetailerItem } from "./RetailerItem";
import React from "react";

export const RetailerList = React.memo(({ addCartQuantity, cart }) => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for programmatic routing

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
        <>
          {/* Render Retailers */}
          {retailers.map((retailer) => (
            <RetailerItem
              key={retailer.id}
              retailer={retailer}
              addCartQuantity={addCartQuantity}
              cart={cart}
            />
          ))}

          {/* Outlet for rendering nested routes, such as MyCart */}
          <Outlet />
        </>
      ) : (
        <p>No retailers available.</p> // Handle case with no retailers
      )}
    </div>
  );
});

// Adding displayName to the memoized component
RetailerList.displayName = "RetailerList";
