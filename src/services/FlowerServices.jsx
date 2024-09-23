export const getAllFlowers = () => {
  return fetch(`http://localhost:8088/flowers?_embed=nurseryFlowers`).then(
    (response) => response.json()
  );
};
