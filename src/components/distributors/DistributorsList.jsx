import React from "react";
import { DistributorView } from "./DistributorInfo"; // Import the DistributorView component
import "./Distributor.css";

export const DistributorList = () => {
    return (
        <div className="allDistributors">
            <DistributorView /> {/* Replace DistributorInfo with DistributorView */}
        </div>
    );
};
