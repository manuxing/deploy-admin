import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClient, setActual, getNot } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Client";
import Form from "../create/client/prueba";

const ClientLayout = () => {
  let dispatch = useDispatch();
  let todas = useSelector((state) => state.clientes);
  let [pressed, setPressed] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getClient());
    dispatch(getNot());
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
                <Form setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {loading === false ? (
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Clientes"}/>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
  );
};

export default ClientLayout;
