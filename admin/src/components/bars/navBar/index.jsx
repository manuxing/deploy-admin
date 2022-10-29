import React, { useEffect, useState } from "react";
import { getNot } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/index";
import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import "../navBar/navbar.css";

const NavBar = () => {
  
  let dispatch = useDispatch();
  let not = useSelector((state) => state.not);
  let [l, setL] = useState("");

  useEffect(() => {
    dispatch(getNot());
  }, [dispatch]);

  useEffect(() => {
    if (not.length > 0 && l !==not.length) {
      setL(not.length);
    }
  }, [not, l]);

  // const { profile } = useSelector((state) => state.authReducer);
  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   dispatch(logoutUser());
  //   navigate.push("");
  // };

  return (
    l !== "" ?
      <div className="topbar">
      <NavLink to={"/"} className="LinkSideB">
        <div className="logo">Administrador</div>
      </NavLink>
        <div className="topWrapper">
          <div className="topRight">
            {
            l > 0 ?
            <NotificationsActiveIcon/>:
            <NotificationsIcon/> 
            }
            {l}
            <SearchBar />
          </div>
        </div>
      </div> : <></>
  );
};

export default NavBar;
