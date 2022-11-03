import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, getSolicitudes, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import DashDisplay from "./DashDisplay";
import RequestR from "../create/requeset";

const RequestLayout = () => {
  let todas = useSelector((state) => state.solicitudes);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getSolicitudes());
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
                <RequestR setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {todas.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Solicitudes"}/>
            </div>
          }
        </div>
  );
};

export default React.memo(RequestLayout);
