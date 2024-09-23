export const getAllNurseries = () => {
  return fetch("http://localhost:8088/nurseries").then((response) =>
    response.json()
  );
};
