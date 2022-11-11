import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, clearActualG, deleteModel, setDeleted, setActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import DashDisplay from "./DashDisplay";
import RequestR from "../create/requeset";
import Paginado from "./paginado";
import RequestGraph from "../Graphs/RequestsGraphs";

const RequestLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("request"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);
    
  useEffect(() => {
    if(todas.data && todas.model === "request")setCards(todas.data)
  }, [todas]);

  useEffect(() => {
    if(deleted === true){
      alert("deleted");
      dispatch(setDeleted()); 
      dispatch(setActualG("request"));
    }
  }, [deleted]);

  let handleClick = (e, id)=>{
    e.preventDefault();
    dispatch(deleteModel("request", id));
  }

  return (
        <div className="content_cli_l">
          <div>
            <BarraFiltros />
            {pressed === false ? (
              <div>
                <button onClick={() => setPressed(true)}>agregar</button>
              </div>
            ) : (
              <RequestR setP={setPressed} />
            )}
          </div>
          {cards.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <RequestGraph/>
              <Paginado values={todas}/>
              <DashDisplay all={cards} Dash={Dash} model={"Solicitudes"} handleClick={handleClick}/>
            </div>
          }
        </div>
  );
};

export default React.memo(RequestLayout);
