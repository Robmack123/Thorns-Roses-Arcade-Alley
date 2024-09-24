export const getAllDistributorsExpanded = () => {
  return fetch(
    `http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nurseryFlower`
  ).then((response) => response.json());
  return fetch(`http://localhost:8088/distributors`).then((response) => {
    return response.json();
  });
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

export const getDistributorFlowers = () => {
  return fetch(`http://localhost:8088/distributorNurseries?_expand=nurseryFlower&distributorId=${id}`).then((response) => response.json())
}

export const getDistributorArray = () => {
  return fetch(`http://localhost:8088/distributors`).then((response) => response.json())
}

export const getDistributorRetailers = () => {
  return fetch (`http://localhost:8088/retailers?_expand=distributor&distributorId=${id}`).then((response) => response.json())
}