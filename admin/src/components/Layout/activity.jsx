import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActualG, getNot, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import ActivityR from "../create/activity";
import DashDisplay from "./DashDisplay";

const ActivityLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("activity"));
    dispatch(getNot());
    return () => dispatch(setActual());
  }, [dispatch]);
  
  useEffect(() => {
    if(todas && todas.data)setCards(todas.data)
  }, [todas]);

  return (
    <div className="content_cli">
          <div>
            <div>
              <BarraFiltros />
              {pressed === false ? (
                <button onClick={() => setPressed(true)}>agregar</button>
              ) : (
                <div>
                  <ActivityR setP={setPressed} />
                </div>
              )}
            </div>
          </div>
          {cards.length === 0 ? 
            <Spinner/> :
            <div className="cont">
                  <DashDisplay all={todas.data} Dash={Dash} model={"Actividades"}/>
            </div>}
        </div>
  );
};

export default React.memo(ActivityLayout);