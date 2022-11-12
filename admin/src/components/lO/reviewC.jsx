import React from "react";

const ReviewC = ({ review }) => {
  return review && review.id && (
    <div>
      <div className="content_rewC">
        <div className="div_rewC">
          <span className="span_rexC">fecha de reseña:</span>
          {review.dateR}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">Estado:</span>
          {review.stat === true ? "Leida" : "Por ver"}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">Medio:</span>
          {review.thg}
        </div>
      </div>
    </div>
  ) 
};

export default React.memo(ReviewC);
