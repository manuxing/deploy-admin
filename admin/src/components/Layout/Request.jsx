import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSolicitudes, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import NavBar from "../bars/navBar";
import SideBar from "../bars/sideBar";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Request";
import RequestR from "../create/requeset";

const RequestLayout = () => {
  let todas = useSelector((state) => state.solicitudes);
  let dispatch = useDispatch();
  let [cards, setCards] = useState([]);
  let [loading, setLoading] = useState(true);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getSolicitudes());
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
    <div>
      <NavBar />
      <div className="client_l">
        <SideBar />
        <div className="content_cli_l">
          <div>
            {pressed === false ? (
              <button onClick={() => setPressed(true)}>agregar</button>
            ) : (
              <div>
                <RequestR setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {loading === false ? (
            <div className="cont">
              <div className="cards">
                {cards &&
                  cards?.map((p) => {
                    return (
                      <Dash
                        key={p.id}
                        id={p.id}
                        back={
                          p.back
                            ? p.back
                            : "https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png"
                        }
                        dateR={p.dateR}
                        dateP={p.dateP}
                        thg={p.thg}
                        contact={p.contact}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestLayout;
