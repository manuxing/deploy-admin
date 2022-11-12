import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, deleteModel, setDeleted, setActualG, clearActualG } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import AddIcon from '@mui/icons-material/Add';
import Spinner from "../Spinner.jsx";
import DashDisplay from "./DashDisplay";
import Dash from "../Dashes/Review";
import RequestGraph from "../Graphs/RequestsGraphs";
import ReviewR from "../create/review";
import Paginado from "./paginado";
import DetalleLay from "../DetalleLay";

const ReviewLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);
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
                <RequestGraph/>
                <DetalleLay/>
              </div>
              <div className="barraL">
                <div className="item">
                  <BarraFiltros />
                </div>
                <div className="item">
                  {pressed === false ? (
                    <button onClick={() => setPressed(true)}>
                      <AddIcon/> </button>
                    ) : (
                      <div>
                        <ReviewR setP={setPressed} />
                    </div>
                  )}
                </div>
              </div>
              <DashDisplay all={cards} Dash={Dash} model={"Reseñas"} handleClick={handleClick}/>
              <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(ReviewLayout);
