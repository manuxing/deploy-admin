import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActualG,
  getNot,
  clearActualG,
  deleteModel,
  setDeleted,
} from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import ActivitysGraph from "../Graphs/ActivitysGraph";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import DashDisplay from "./DashDisplay";
import Paginado from "./paginado";
import DetalleLay from "../DetalleLay";
import AddIcon from "@mui/icons-material/Add";
import "./Layout.css";
import { useHistory } from "react-router-dom";

const ActivityLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let history = useHistory();
  let dispatch = useDispatch();
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("activity"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);

  useEffect(() => {
    if (todas.data && todas.model === "activity") setCards(todas.data);
  }, [todas]);

  useEffect(() => {
    if (deleted === true) {
      alert("deleted");
      dispatch(setDeleted());
      dispatch(setActualG("activity"));
    }
  }, [deleted]);

  let handleClick = (e, id) => {
    e.preventDefault();
    dispatch(deleteModel("activity", id));
  };

  return (
    <div className="content_cli">
      {cards.length === 0 ? (
        <Spinner />
      ) : (
        <div className="cont">
          <div className="stats">
            <ActivitysGraph />
            <DetalleLay />
          </div>
          <div className="barraL">
            <div className="item">
              <button onClick={() => history.push("/create/activity")}>
                <AddIcon fontSize="small" />
              </button>
            </div>
            <BarraFiltros />
          </div>
          <DashDisplay
            all={cards}
            Dash={Dash}
            model={"Actividades"}
            handleClick={handleClick}
          />
          <Paginado values={todas} />
        </div>
      )}
    </div>
  );
};

export default React.memo(ActivityLayout);
