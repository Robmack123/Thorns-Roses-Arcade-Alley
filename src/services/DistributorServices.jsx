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
