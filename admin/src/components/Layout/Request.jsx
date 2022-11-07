import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, clearActualG, setActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import DashDisplay from "./DashDisplay";
import RequestR from "../create/requeset";

const RequestLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("request"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);
    
  useEffect(() => {
    if(todas && todas.model === "request")setCards(todas.data)
  }, [todas]);

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
          {cards.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <DashDisplay all={cards} Dash={Dash} model={"Solicitudes"}/>
            </div>
          }
        </div>
  );
};

export default React.memo(RequestLayout);
