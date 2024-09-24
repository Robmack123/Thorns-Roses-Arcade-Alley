import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom"
import { getAllDistributors, getDistributorArray, getDistributorFlowers, getDistributorRetailers } from "../../services/DistributorServices";
import { getAllNurseries } from "../../services/NurseryServices";


export const DistributorInfo = () => {
    const [distributorFlowers, setDistributorFlowers] = useState([])
    const [distributor, setDistributors] = useState([])
    const {distributorId} = useParams
    const [currentDistributor, setCurrent] = useState({})
    const [nurseries, setNurseries] = useState({})
    const [retailer, setRetailer] = useState({})

    const localUser = localStorage.getItem("local_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllDistributors(setDistributors)
            getAllNurseries(setNurseries)
        },
        []
    )

    useEffect(
        () => {
            getDistributorFlowers(distributorId, setDistributorFlowers)
            getDistributorArray(distributorId, setCurrent)
            getDistributorRetailers(distributorId, setRetailer)
        },
        [distributorId]
    )

    return (<div>
        <h2>{currentDistributor[0]?.distributor?.name} Distributor</h2>
        <h4>Flowers</h4>
        { distributorFlowers.map(distributorFlower => {
             let foundNursery = nurseries.find(nursery => distributorFlower?.nurseryFlower?.nurseryId === nursery.id)
             return (
             <section className="distributor">
                 <header className="distributor__header" key={distributorId}>{distributorFlower?.nurseryFlower?.flower?.species} from <Link to={`/nurseries/${foundNursery.id}`}>{foundNursery.name}</Link></header>
                 <div>Color: {distributorFlower?.nurseryFlower?.flower?.color}</div>
                 <div>Price: {((distributorFlower?.nurseryFlower?.price) * (currentDistributor[0]?.distributor?.priceMarkup)).toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                 <div>Price Markup: {(parseFloat(currentDistributor[0]?.distributor?.priceMarkup - 1).toFixed(2)) * 100}%</div>
             </section>)
        })}
        <h4>Retailers</h4>
        <section className="distributor">
                <header className="distributor__header"><Link to={`/retailers/${retailer[0]?.id}`}>{retailer[0]?.name}</Link></header>
                <div>Address: {retailer[0]?.address}</div>
            </section>
        </div>
    )
}