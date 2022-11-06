import React, { useEffect, useState } from "react";
import { getNot } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/index";
import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import "../navBar/navbar.css";
import Drop from "./drop";

const NavBar = () => {
  let navigate = useHistory()
  navigate = navigate.location.pathname;
  let dispatch = useDispatch();
  let not = useSelector((state) => state.not);
  let [l, setL] = useState("");
  let [pressed, setPressed] = useState(false);
  let [search, setSearch] = useState(true);
  let searchAdresses = [
    "/activitys",
    "/activitys/",
    "/reviews/",
    "/requests/",
    "/services/",
    "/clients/",
  ]

  useEffect(() => {
    dispatch(getNot());
  }, [dispatch]);

  useEffect(() => {
    if(searchAdresses.includes(navigate)){
      setSearch(true)
    }else{
      setSearch(false)
    }
  }, [navigate]);

  useEffect(() => {
    if (not.length > 0 && l !==not.length) {
      setL(not.length);
    }
    setPressed(false);
  }, [not, l]);

  // const { profile } = useSeslector((state) => state.authReducer);
  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   dispatch(logoutUser());
  //   navigate.push("");
  // };

  return (
    <div className="topbar">
      <NavLink to={"/"} className="LinkSideB">
        <div className="logo">Administrador</div>
      </NavLink>
        <div className="topWrapper">
          <div className="topRight">
              {
                l !== "" && parseInt(l) > 0 ?
                <button onClick={()=>setPressed(!pressed)}>
                  <NotificationsActiveIcon/>
                </button>:
              <NotificationsIcon/> 
              }
            {l}
            {pressed === true ? 
              <Drop not={not} l={l}/> : <></>
            }
          </div>
            {search === true ?
            <SearchBar /> :
          <></>
          }
        </div>
      </div>
  );
};

export default NavBar;
