import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "../components/welcome/Welcome";
import { NavBar } from "../components/nav/NavBar";
import { NurseryList } from "../components/nurseries/NurseryList";
import { RetailerList } from "../components/retailers/RetailerList";
import { MyCart } from "../components/mycart/MyCart";
import { getAllFlowers } from "../services/FlowerServices";

export const ApplicationViews = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    getAllFlowers().then((data) => setFlowers(data));
  }, []);

  const addCartQuantity = (flowerId, quantity) => {
    if (quantity >= 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [flowerId]: quantity,
      }));
    }
  };

  return (
    <>
      <NavBar cart={cart} />

      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Welcome />} />
          <Route path="nurseries" element={<NurseryList />} />

          <Route
            path="retailers/*"
            element={
              <RetailerList
                addCartQuantity={addCartQuantity}
                cart={cart}
                flowers={flowers}
              />
            }
          />

          <Route
            path="/mycart"
            element={<MyCart cart={cart} flowers={flowers} />}
          />
        </Route>
      </Routes>
    </>
  );
};
