import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { NavBar } from "../components/nav/NavBar";
import { NurseryList } from "../components/nurseries/NurseryList";
import { RetailerList } from "../components/retailers/RetailerList";
import { MyCart } from "../components/mycart/MyCart";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localThornUser = localStorage.getItem("thorn_user");
    const thornUserObject = JSON.parse(localThornUser);

    setCurrentUser(thornUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome currentUser={currentUser} />} />
        <Route path="nurseries" element={<NurseryList />} />
        <Route path="retailers" element={<RetailerList />} />
        <Route path="mycart" element={<MyCart />} />
      </Route>
    </Routes>
  );
};
