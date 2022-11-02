import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import Dash from "../Dashes/Review";
import ReviewR from "../create/review";

const ReviewLayout = () => {
  let todas = useSelector((state) => state.reviews);
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {
    if (todas && todas.length > 0) setLoading(false);
  }, [todas]);

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
                <ReviewR setP={setPressed} />
                <BarraFiltros />
              </div>
            )}
          </div>
          {loading === false ? (
            <div className="cont">
              <div className="cards">
                {todas.length > 0 &&
                  todas?.map((p) => {
                    return (
                      <Dash
                        key={p.id}
                        id={p.id}
                        back={
                          p.back
                            ? p.back
                            : "https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png"
                        }
                        stat={p.stat}
                        dateR={p.dateR}
                        dateP={p.dateP}
                        thg={p.thg}
                        services={
                          p.services?.length > 0 ? p.services?.length : 0
                        }
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
  );
};

export default ReviewLayout;
