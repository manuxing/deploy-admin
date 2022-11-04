import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClient, setActual, getNot } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Client";
import CreateClient from "../create/client/prueba";

const ClientLayout = () => {
  let dispatch = useDispatch();
  let todas = useSelector((state) => state.clientes);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getClient());
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
                <CreateClient setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {todas.length === 0 ? 
          <Spinner/> :
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Clientes"}/>
            </div>}
        </div>
  );
};

export default React.memo(ClientLayout);