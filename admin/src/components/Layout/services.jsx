import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearActualG, setActualG, getNot } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Service";
import AgregarServicio from "../create/service/prueba";

const ServiceLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("service"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);

  useEffect(() => {
    if(todas && todas.model === "service")setCards(todas.data)
  }, [todas]);

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
          {cards.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <DashDisplay all={cards} Dash={Dash} model={"Servicios"}/>
            </div>
          }
        </div>
  );
};

export default React.memo(ServiceLayout);
