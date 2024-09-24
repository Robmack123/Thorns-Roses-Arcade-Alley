export const getAllFlowers = () => {
    return fetch(`http://localhost:8088/flowers`).then((response) => response.json())
}