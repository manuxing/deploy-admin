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
          <span className="span_rexC">fecha de la visita:</span>
          {review.dateP}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">Estado:</span>
          {review.stat === true ? "Leida" : "Por ver"}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">Descripcion:</span>
          {review.description}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">Medio:</span>
          {review.thg}
        </div>
        <div className="div_rewC">
          <span className="span_rexC">fecha de visita:</span>
          {review.dateP}
        </div>
      </div>
    </div>
  ) 
};

export default React.memo(ReviewC);
