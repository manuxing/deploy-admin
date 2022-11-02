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
  let [loading, setLoading] = useState(true);
  let [pressed, setPressed] = useState(false);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getNot());
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
              <DashDisplay all={todas} Dash={Dash} model={"Reseñas"}/>
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
