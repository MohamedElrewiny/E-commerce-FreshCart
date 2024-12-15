import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/User/context";
import UpBotton from "../UpBotton/UpBotton";



export default function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <UpBotton/>
      <Footer />
    </>
  );
}
