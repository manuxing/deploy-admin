import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActualG, getNot, clearActualG, deleteModel, setDeleted } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import ActivityR from "../create/activity";
import DashDisplay from "./DashDisplay";
import Paginado from "./paginado";

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
                  <Paginado values={todas}/>
                  <DashDisplay all={cards} Dash={Dash} model={"Actividades"} handleClick={handleClick}/>
            </div>}
        </div>
  );
};

export default React.memo(ActivityLayout);