// layouts/NavLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

const NavLayout = () => {
  return (
    <>
      <Nav />
    </>
  );
};

export default NavLayout;
