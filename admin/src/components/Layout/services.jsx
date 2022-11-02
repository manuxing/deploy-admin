import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServicio, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Service";
import AgregarServicio from "../create/service/prueba";

const ServiceLayout = () => {
  let todas = useSelector((state) => state.servicios);
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getServicio());
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
                <AgregarServicio setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {loading === false ? (
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Servicios"}/>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
  );
};

export default ServiceLayout;
