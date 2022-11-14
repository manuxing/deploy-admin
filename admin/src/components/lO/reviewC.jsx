import React from "react";
import "./index.css"

const ReviewC = ({ review }) => {
  return review && review.id && (
    <div className="content_rewC">
      <div className="div_rewC">
        <div >
          <span>Estado:  </span>
          {review.stat === true ? "Leida" : "Por ver"}
        </div>
        <div >
          <span>Fecha: </span>
          {review.dateR}
        </div>
        <div className="div_rewC">
        </div>
      </div>
    </div>
  ) 
};

export default React.memo(ReviewC);
