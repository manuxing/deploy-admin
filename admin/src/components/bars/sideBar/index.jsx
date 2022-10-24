import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../sideBar/sideBar.css";

// Icons
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaidIcon from "@mui/icons-material/Paid";
import GradingIcon from "@mui/icons-material/Grading";

const SideBar = () => {
  let url = useLocation().pathname;

  const dispatch = useDispatch();

  return (
    <div className="side">
      <div className="items">
        <ul>
          <li className="item">
            <Link to="/dashboard" className="_link">
              <GridViewIcon className="mr-4 opacity-50" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/clients" className="_link">
              <PersonIcon className="mr-4 opacity-50" />
              <span>Clientes</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/requests" className="_link">
              <SportsEsportsIcon className="mr-4 opacity-50" />
              <span>Solicitudes</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/reviews" className="_link">
              <SportsEsportsIcon className="mr-4 opacity-50" />
              <span>Reseñas</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/activitys/" className="_link">
              <SportsEsportsIcon className="mr-4 opacity-50" />
              <span>Actividades</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/services" className="_link">
              <SportsEsportsIcon className="mr-4 opacity-50" />
              <span>Servicios</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
