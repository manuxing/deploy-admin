import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, clearActualG, deleteModel, setDeleted, setActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import DashDisplay from "./DashDisplay";
import Paginado from "./paginado";
import RequestGraph from "../Graphs/RequestsGraphs";
import DetalleLay from "../DetalleLay";
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

const RequestLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let dispatch = useDispatch();
  let history = useHistory();
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
            {cards.length ===  0 ? 
          <Spinner/> :
            <div className="cont">
              <div className="stats">
                <RequestGraph/>
                <DetalleLay/>
              </div>
            
                <div className="barraL">
                <div className="item">
                <button onClick={() => history.push("/create/request")}>
                <AddIcon fontSize="small"/>
                    </button>
                </div>
                  <BarraFiltros />
              </div>
              <DashDisplay all={cards} Dash={Dash} model={"Solicitudes"} handleClick={handleClick}/>
              <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(RequestLayout);
