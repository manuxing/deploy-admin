import React from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaidIcon from "@mui/icons-material/Paid";
import { useDispatch, useSelector } from "react-redux";
import GradingIcon from "@mui/icons-material/Grading";

const SideBar = () => {

  let url = useLocation().pathname
  
  const dispatch = useDispatch();
  let linksStyle =
    "mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:bg-gray-200";
  let activeStyle =
    "mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 text-blue-600";

  return (
    <div
      className={
          "bg-white sm:w-60 lg:w-64 w-screen min-h-screen overflow-y-auto block shadow relative animation"
      }
    >
      <div className="flex items-center px-6 py-3 h-16 sm:mt-4 lg:mt-2">
        <div className="text-xl font-bold tracking-tight text-gray-800 flex justify-between w-full">
          <Link to="/dashboard">Dashboard Admin</Link>
            <span className="sm:hidden">
              Bodega RP
            </span>
        </div>
      </div>

      <div className="px-4 py-2">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={url === "/dashboard" ? activeStyle : linksStyle}
            >
              <GridViewIcon className="mr-4 opacity-50" />
              Dashboard
            </Link>
          </li>
            <>
              <li>
                <Link
                  to="/clientes"
                  className={url === "/clientes" ? activeStyle : linksStyle}
                >
                  <PersonIcon className="mr-4 opacity-50" />
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  to="/solicitudes"
                  className={url === "/solicitudes" ? activeStyle : linksStyle}
                >
                  Solicitudes
                </Link>
              </li>
            </>
            <li>
              <Link
                to="/reseñas"
                className={url === "/reseñas" ? activeStyle : linksStyle}
              >
                Reseñas
              </Link>
            </li>
            <li>
              <Link
                to="/actividades"
                className={url === "/actividades" ? activeStyle : linksStyle}
              >
                Actividades
              </Link>
            </li>
            <li>
              <Link
                to="/servicios"
                className={url === "/servicios" ? activeStyle : linksStyle}
              >
                Servicios
              </Link>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
