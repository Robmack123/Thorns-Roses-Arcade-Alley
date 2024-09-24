// retailerServices.jsx
export const getRetailers = () => {
  return fetch("http://localhost:8088/retailers").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // This must return a valid JSON
  });
};
