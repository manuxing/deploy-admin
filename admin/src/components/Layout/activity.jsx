import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActividades, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import NavBar from "../bars/navBar";
import SideBar from "../bars/sideBar";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Activity.jsx";
import ActivityR from "../create/activity";

const ActivityLayout = () => {
  let todas = useSelector((state) => state.actividades);
  let dispatch = useDispatch();
  let [cards, setCards] = useState([]);
  let [pressed, setPressed] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getActividades());
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
      <div className="client_d">
        <SideBar />
        <div className="content_cli">
          <div>
            <div>
              {pressed === false ? (
                <button onClick={() => setPressed(true)}>agregar</button>
              ) : (
                <div>
                  <BarraFiltros />
                  <ActivityR setP={setPressed} />
                </div>
              )}
            </div>
          </div>
          {loading === false ? (
            <div className="cont">
              <div className="cards">
                aaaaaaaaaaaa
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
                        client={
                          p.client === null ? { name: "peter pan" } : p.client
                        }
                        services={p.services}
                        persons={p.persons}
                        date={p.date}
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

export default ActivityLayout;
