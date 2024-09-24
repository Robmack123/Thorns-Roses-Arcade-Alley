export const getAllNurseries = () => {
  return fetch(`http://localhost:8088/nurseries`).then((response) =>
    response.json()
  );
};

export const getNurseryFlowers = () => {
  return fetch(`http://localhost:8088/nurseryFlowers`).then(
    (response) => response.json() // Correctly return the JSON response
  );
};
