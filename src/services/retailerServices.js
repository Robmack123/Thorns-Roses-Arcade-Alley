
export const getRetailers = () => {
  return fetch("http://localhost:8088/retailers").then((response) => {
    return response.json();
  });
};

export const getRetailerFlowers = () => {
  return fetch(`http://localhost:8088/retailerFlowers`).then(response => response.json())
}