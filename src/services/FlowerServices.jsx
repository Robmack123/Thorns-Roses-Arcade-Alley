export const getAllFlowers = () => {
  return fetch(`http://localhost:8088/flowers?_embed=nurseryFlowers`).then(
    (response) => response.json()
  );
};

export const getFlowers = () => {
  return fetch(`http://localhost:8088/flowers`).then(
    (response) => response.json() // Correctly return the JSON response
  );
};
