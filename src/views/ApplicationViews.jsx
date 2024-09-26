import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "../components/welcome/Welcome";
import { NavBar } from "../components/nav/NavBar";
import { NurseryList } from "../components/nurseries/NurseryList";
import { RetailerList } from "../components/retailers/RetailerList";
import { MyCart } from "../components/mycart/MyCart";
import { getAllFlowers } from "../services/FlowerServices";
import { DistributorList } from "../components/distributors/DistributorsList";
import { DistributorView } from "../components/distributors/DistributorInfo";

export const ApplicationViews = () => {
  const [cart, setCart] = useState({});
  const [flowers, setFlowers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("thorn_user"));
    if (currentUser) {
      setUserId(currentUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      setCart(savedCart ? JSON.parse(savedCart) : {});
    }
  }, [userId]);

  useEffect(() => {
    getAllFlowers().then((data) => setFlowers(data));
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

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
            element={<MyCart cart={cart} setCart={setCart} flowers={flowers} />}
          />
          <Route path="distributors" element={<DistributorView />} />
        </Route>
      </Routes>
    </>
  );
};
