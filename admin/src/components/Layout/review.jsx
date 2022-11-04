import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNot, getReviews, setActual } from "../../redux/actions";
import BarraFiltros from "./barraFiltros";
import Spinner from "../Spinner.jsx";
import DashDisplay from "./DashDisplay";
import Dash from "../Dashes/Review";
import ReviewR from "../create/review";

const ReviewLayout = () => {
  let todas = useSelector((state) => state.reviews);
  let dispatch = useDispatch();
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getNot());
    return () => dispatch(setActual());
  }, [dispatch]);

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
          {todas.length === 0 ? 
            <Spinner/> : 
            <div className="cont">
              <DashDisplay all={todas} Dash={Dash} model={"Reseñas"}/>
            </div>
          }
        </div>
  );
};

export default React.memo(ReviewLayout);
