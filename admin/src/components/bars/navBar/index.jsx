import React from "react";
import SearchBar from "../searchBar/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../navBar/navbar.css"

const NavBar = () => {

  // const { profile } = useSelector((state) => state.authReducer);

  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   dispatch(logoutUser());
  //   navigate.push("");
  // };

  return (
    <>
      <div className="topbar">
          <div className="logo">Administrador</div>
        <div className="topWrapper">
          <div className="topRight">
              <NotificationsIcon/>
              <SearchBar/>
            </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
