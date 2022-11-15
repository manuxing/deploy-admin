import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearActualG, setActualG, getNot, setDeleted, deleteModel } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Service";
import Paginado from "./paginado";
import DetalleLay from "../DetalleLay";
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

const ServiceLayout = () => {
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let history= useHistory();
  let dispatch = useDispatch();
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("service"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);

  useEffect(() => {
    if(todas.data && todas.model === "service")setCards(todas.data)
  }, [todas]);

  useEffect(() => {
    if(deleted === true){
      alert("deleted");
      dispatch(setDeleted()); 
      dispatch(setActualG("service"));
    }
  }, [deleted]);

  let handleClick = (e, id)=>{
    e.preventDefault();
    dispatch(deleteModel("service", id));
  }

  return (
        <div className="content_cli_l">
              {cards.length ===  0 ? 
          <Spinner/> :
          <div className="cont">
              <div className="stats">
                <DetalleLay/>
              </div>
              <div className="barraL">
                <div className="item">
                <button onClick={() => history.push("/create/service")}>
                <AddIcon fontSize="small"/>
                    </button>
                </div>
                  <BarraFiltros />
              </div>
              <DashDisplay all={cards} Dash={Dash} model={"Servicios"} handleClick={handleClick}/>
              <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(ServiceLayout);
