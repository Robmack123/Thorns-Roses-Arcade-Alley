export const getAllDistributors = () => {
    return fetch(`http://localhost:8088/distributors`).then((response) => response.json())
}

export const getDistributorFlowers = () => {
    return fetch(`http://localhost:8088/distributorNurseries?_expand=nurseryFlower&distributorId=${id}`).then((response) => response.json())
}

export const getDistributorArray = () => {
    return fetch(`http://localhost:8088/distributors`).then((response) => response.json())
}

export const getDistributorRetailers = () => {
    return fetch (`http://localhost:8088/retailers?_expand=distributor&distributorId=${id}`).then((response) => response.json())
}

