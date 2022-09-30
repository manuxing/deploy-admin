import React from "react";
import SearchBar from "./searchBar";
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

  const style = {
    backgroundColor: 'red',
  }
  return (
    <>
      <div style={style}>
        <SearchBar/>
      </div>
    </>
  );
};

export default NavBar;
