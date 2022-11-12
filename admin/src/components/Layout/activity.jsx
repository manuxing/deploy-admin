import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from "react-redux";
import { setActualG, getNot, clearActualG, deleteModel, setDeleted } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import ActivitysGraph from "../Graphs/ActivitysGraph";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import ActivityR from "../create/activity";
import DashDisplay from "./DashDisplay";
import Paginado from "./paginado";
import DetalleLay from "../DetalleLay";

const ActivityLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("activity"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);
  
  useEffect(() => {
    if(todas.data && todas.model === "activity")setCards(todas.data)
  }, [todas]);

  useEffect(() => {
    if(deleted === true){
      alert("deleted");
      dispatch(setDeleted()); 
      dispatch(setActualG("activity"));
    }
  }, [deleted]);

  let handleClick = (e, id)=>{
    e.preventDefault();
    dispatch(deleteModel("activity", id));
  }
  
  return (
    <div className="content_cli">
          {cards.length === 0 ? 
            <Spinner/> :
            <div className="cont">
              <div className="stats">
                  <ActivitysGraph/>
                  <DetalleLay/>
              </div>
              <div className="barraL">
                <div className="item">
                  <BarraFiltros />
                </div>
                <div className="item">
                  {pressed === false ? (
                    <button onClick={() => setPressed(true)}>
                      <AddIcon />
                    </button>
                  ) : (
                      <ActivityR className="item" setP={setPressed} />
                  )}
              </div>
            </div>
                  <DashDisplay all={cards} Dash={Dash} model={"Actividades"} handleClick={handleClick}/>
                  <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(ActivityLayout);