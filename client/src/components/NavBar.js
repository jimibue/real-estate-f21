import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/available">Available</Link>
      <Link to="/cities">Cities</Link>
      <Link to="/find_homes">Find Homes</Link>
      <Link to="/city_cost">City Cost</Link>
    </div>
  );
};

export default Navbar;
