import React, { useEffect, useState } from "react";
import { getNot } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import SearchBar from "../searchBar/index";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../navBar/navbar.css";

const NavBar = () => {
  
  let dispatch = useDispatch();
  let not = useSelector((state) => state.not);
  let [l, setL] = useState(0);

  useEffect(() => {
    dispatch(getNot());
  }, [dispatch]);

  useEffect(() => {
    if (l !== not.length) {
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
      <div className="topbar">
        <div className="logo">Administrador</div>
        <div className="topWrapper">
          {not.length > 0 ? not.length : ""}
          <div className="topRight">
            <NotificationsIcon />
            <SearchBar />
          </div>
        </div>
      </div>
  );
};

export default NavBar;
