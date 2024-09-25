export const getAllDistributorNurseries = () => {
  return fetch(
    `http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nurseryFlower`
  ).then((response) => response.json());
};

export const getAllDistributors = () => {
  return fetch(`http://localhost:8088/distributors`).then((response) => {
    return response.json();
  });
};
