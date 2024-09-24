import { useEffect, useState } from "react";
import { getAllDistributors } from "../../services/DistributorServices";
import { Distributor } from "./Distributors";
import "./Distributor.css"

export const DistributorList = () => {
    const [distributors, setDistributors] = useState([])

    useEffect(
        () => {
            getAllDistributors(setDistributors)
        },
        []
    )

    return <article className="distributor">
        {
            distributors.map(distributor => <Distributor key= {`distributor--${distributor.id}`}
                id = {distributor.id}
                name = {distributor.name}
            />)
        }
    </article>

}