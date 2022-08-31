import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Helper

const NavBar = () => {

  // const { profile } = useSelector((state) => state.authReducer);

  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   dispatch(logoutUser());
  //   navigate.push("");
  // };

  return (
    <>
      <div className="px-4 md:px-8 py-2 h-16 flex justify-between items-center shadow-sm bg-white">
        <searchBar/>
      </div>
    </>
  );
};

export default NavBar;
