import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearActualG, getNot, setActualG, deleteModel, setDeleted } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import DashDisplay from "./DashDisplay";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Client";
import CreateClient from "../create/client/prueba";
import Paginado from "./paginado";

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
        <div className="content_cli_l">
          <div>
            <BarraFiltros />
            {pressed === false ? (
              <button onClick={() => setPressed(true)}>agregar</button>
            ) : (
              <div>
                <CreateClient setP={setPressed} />
              </div>
            )}
          </div>
          {cards.length ===  0 ? 
          <Spinner/> :
            <div className="cont">
              <Paginado values={todas}/>
              <DashDisplay all={cards} Dash={Dash} model={"Clientes"} handleClick={handleClick}/>
            </div>}
        </div>
  );
};

export default React.memo(ClientLayout);