export const getAllDistributorsExpanded = () => {
  return fetch(
    `http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nurseryFlower`
  ).then((response) => response.json());
};

export const getDistributorNurseries = () => {
  return fetch(`http://localhost:8088/distributorNurseries`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Correctly parse the JSON
    }
  );
};

export const getAllDistributors = () => {
  return fetch(`http://localhost:8088/distributors`).then((response) => {
    return response.json();
  });
};

// Fetch distributorNurseries, expand nurseryFlower
export const getDistributorFlowers = (id) => {
  return fetch(`http://localhost:8088/distributorNurseries?_expand=nurseryFlower&distributorId=${id}`)
    .then((response) => response.json())
    .then((distributorNurseries) => {
      // Extract all flowerIds from the fetched nurseryFlowers
      const flowerIds = distributorNurseries.map(dn => dn.nurseryFlower.flowerId);

      // Fetch the related flowers based on the extracted flowerIds
      return fetch(`http://localhost:8088/flowers?id=${flowerIds.join("&id=")}`)
        .then((response) => response.json())
        .then((flowers) => {
          // Map the flowers back to the nurseryFlowers and return the combined data
          return distributorNurseries.map(dn => {
            const flower = flowers.find(f => f.id === dn.nurseryFlower.flowerId);
            return { ...dn, flower }; // Attach flower data to distributorNursery
          });
        });
    });
};



export const getDistributorArray = (id) => {
  return fetch(`http://localhost:8088/distributors?id=${id}`).then((response) => response.json())
}

export const getDistributorRetailers = (distributorId) => {
  return fetch(`http://localhost:8088/retailers?distributorId=${distributorId}`).then(
    (response) => response.json()
  );
};

