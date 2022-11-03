import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActividades, getNot, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import ActivityR from "../create/activity";
import DashDisplay from "./DashDisplay";

const ActivityLayout = () => {
  let todas = useSelector((state) => state.actividades);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getActividades());
    dispatch(getNot());
    return () => dispatch(setActual());
  }, [dispatch]);

  return (
    <div className="content_cli">
          <div>
            <div>
              {pressed === false ? (
                <button onClick={() => setPressed(true)}>agregar</button>
              ) : (
                <div>
                  <BarraFiltros />
                  <ActivityR setP={setPressed} />
                </div>
              )}
            </div>
          </div>
          {todas.length === 0 ? 
            <Spinner/> :
            <div className="cont">
              <div className="cards">
                  <DashDisplay all={todas} Dash={Dash} model={"Actividades"}/>
              </div>
            </div>}
        </div>
  );
};

export default React.memo(ActivityLayout);