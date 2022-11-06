import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActual, getNot, setActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Client";
import CreateClient from "../create/client/prueba";

const ClientLayout = () => {
  let dispatch = useDispatch();
  let todas = useSelector((state) => state.actualG);
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("client"));
    dispatch(getNot());
    return () => dispatch(setActual());
  }, [dispatch]);

  useEffect(() => {
    if(todas && todas.data)setCards(todas.data)
  }, [todas]);

  return (
        <div className="content_cli_l">
          <div>
            <BarraFiltros />
            {pressed === false ? (
              <button onClick={() => setPressed(true)}>agregar</button>
            ) : (
              <div>
                <CreateClient setP={setPressed} />
              </div>
            )}
          </div>
          {cards.length ===  0 ? 
          <Spinner/> :
            <div className="cont">
              <DashDisplay all={todas.data} Dash={Dash} model={"Clientes"}/>
            </div>}
        </div>
  );
};

export default React.memo(ClientLayout);