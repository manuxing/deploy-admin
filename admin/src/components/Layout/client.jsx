import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearActualG, getNot, setActualG, deleteModel, setDeleted } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import "./Layout.css"
import Dash from "../Dashes/Client";
import CreateClient from "../create/client/prueba";
import AddIcon from '@mui/icons-material/Add';
import Paginado from "./paginado";
import ActivitysGraph from "../Graphs/ActivitysGraph";
import DetalleLay from "../DetalleLay";

const ClientLayout = () => {
  let dispatch = useDispatch();
  let todas = useSelector((state) => state.actualG);
  let deleted = useSelector((state) => state.deleted);
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(setActualG("client"));
    dispatch(getNot());
    return () => dispatch(clearActualG());
  }, [dispatch]);

  useEffect(() => {
    if(todas.data && todas.model === "client")setCards(todas.data)
  }, [todas]);

  useEffect(() => {
    if(deleted === true){
      alert("deleted");
      dispatch(setDeleted()); 
      dispatch(setActualG("client"));
    }
  }, [deleted]);

  let handleClick = (e, id)=>{
    e.preventDefault();
    dispatch(deleteModel("client", id));
  }

  return (
        <div className="content_cli">
          {cards.length ===  0 ? 
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
                      <AddIcon/> </button>
                    ) : (
                      <div>
                      <CreateClient setP={setPressed} />
                    </div>
                  )}
                </div>
              </div>
              <DashDisplay all={cards} Dash={Dash} model={"Clientes"} handleClick={handleClick}/>
              <Paginado values={todas}/>
            </div>}
        </div>
  );
};

export default React.memo(ClientLayout);