import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClient, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Client";
import Form from "../create/client/prueba";

const ClientLayout = () => {
  let dispatch = useDispatch();
  let todas = useSelector((state) => state.clientes);
  let [pressed, setPressed] = useState(false);
  let [cards, setCards] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getClient());
  }, [dispatch]);

  useEffect(() => {
    if (todas.length > 0) {
      setCards(todas);
    }
    if (cards && cards.length > 0) setLoading(false);
  }, [todas, cards]);

  useEffect(() => {
    return () => dispatch(setActual());
  }, []);

  return (
        <div className="content_cli_l">
          <div>
            {pressed === false ? (
              <button onClick={() => setPressed(true)}>agregar</button>
            ) : (
              <div>
                <Form setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {loading === false ? (
            <div className="cont">
              <div className="cards">
                {cards &&
                  cards?.map((p) => {
                    if(p.id !== undefined){
                      return (
                        <Dash
                          key={p.id}
                          id={p.id}
                          back={
                            p.back
                              ? p.back
                              : "https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png"
                          }
                          name={p.name}
                          contact={p.contact}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
  );
};

export default ClientLayout;
