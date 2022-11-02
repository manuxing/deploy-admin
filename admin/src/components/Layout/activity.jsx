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
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getActividades());
    dispatch(getNot());
  }, [dispatch]);

  useEffect(() => {
    if (todas && todas.length > 0) setLoading(false);
  }, [todas]);

  useEffect(() => {
    return () => dispatch(setActual());
  }, []);

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
          {loading === false ? (
            <div className="cont">
              <div className="cards">
                  <DashDisplay all={todas} Dash={Dash} model={"Actividades"}/>
              </div>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
  );
};

export default ActivityLayout;
