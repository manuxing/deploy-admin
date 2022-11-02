import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSolicitudes, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import DashDisplay from "./DashDisplay";
import RequestR from "../create/requeset";

const RequestLayout = () => {
  let todas = useSelector((state) => state.solicitudes);
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getSolicitudes());
  }, [dispatch]);

  useEffect(() => {
    if (todas && todas.length > 0) setLoading(false);
  }, [todas]);

  useEffect(() => {
    return () => dispatch(setActual());
  }, []);

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
          {loading === false ? (
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Solicitudes"}/>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
  );
};

export default RequestLayout;
