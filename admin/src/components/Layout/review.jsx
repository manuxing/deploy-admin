import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, deleteModel, setDeleted, setActualG, clearActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import DashDisplay from "./DashDisplay";
import Dash from "../Dashes/Review";
import RequestGraph from "../Graphs/RequestsGraphs";
import Paginado from "./paginado";
import AddIcon from '@mui/icons-material/Add';
import DetalleLay from "../DetalleLay";
import { useHistory } from "react-router-dom";

const ReviewLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let dispatch = useDispatch();
  let history = useHistory();
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("review"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);

  useEffect(() => {
    if(todas.data && todas.model === "review")setCards(todas.data)
  }, [todas]);

  useEffect(() => {
    if(deleted === true){
      alert("deleted");
      dispatch(setDeleted()); 
      dispatch(setActualG("review"));
    }
  }, [deleted]);

  let handleClick = (e, id)=>{
    e.preventDefault();
    dispatch(deleteModel("review", id));
  }

  return (
        <div className="content_cli_l">
             {cards.length ===  0 ? 
          <Spinner/> :
            <div className="cont">
              <div className="stats">
              <RequestGraph val="re"/>
                <DetalleLay/>
              </div>
              <div className="barraL">
                <div className="item">
                <button onClick={() => history.push("/create/review")}>
                <AddIcon fontSize="small"/>
                    </button>
                </div>
                  <BarraFiltros />
              </div>
              <DashDisplay all={cards} Dash={Dash} model={"Reseñas"} handleClick={handleClick}/>
              <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(ReviewLayout);
