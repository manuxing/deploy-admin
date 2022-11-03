import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServicio, setActual, getNot } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Service";
import AgregarServicio from "../create/service/prueba";

const ServiceLayout = () => {
  let todas = useSelector((state) => state.servicios);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getServicio());
    dispatch(getNot());
    return () => dispatch(setActual());
  }, [dispatch]);

  return (
        <div className="content_cli_l">
          <div>
            {pressed === false ? (
              <button onClick={() => setPressed(true)}>agregar</button>
            ) : (
              <div>
                <AgregarServicio setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {todas.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Servicios"}/>
            </div>
          }
        </div>
  );
};

export default React.memo(ServiceLayout);
