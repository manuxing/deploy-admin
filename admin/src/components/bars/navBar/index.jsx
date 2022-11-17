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
import LogOut from "../LogOut";

const NavBar = () => {
  let navigate = useHistory()
  navigate = navigate.location.pathname;
  let dispatch = useDispatch();
  let not = useSelector((state) => state.not);
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
  if(searchAdresses.includes(navigate) || navigate === "/about"){
      setSearch(true)
    }else{
      setSearch(false)
    }
  }, [navigate]);

  useEffect(() => {
    setPressed(false);
  }, [not]);

  return (
    <div className="top-section">
      {/* <NavLink to={"/"} className="LinkSideB">
        <div className="logo">Bodega RP</div>
      </NavLink> */}
      {/* <LogOut/> */}
            {pressed === true ? 
              <Drop not={not} /> 
              : <></>}
              {
              not && not.length > 0  ?
                <button onClick={()=>setPressed(!pressed)}>
                  <NotificationsActiveIcon fontSize="small"/>
                </button>:
              <NotificationsIcon/> 
              }
            {search === true ?
            <SearchBar /> :
          <></>
          }
        </div>
  );
};

export default React.memo(NavBar);
