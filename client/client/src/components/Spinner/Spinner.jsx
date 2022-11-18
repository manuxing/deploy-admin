import React from "react";
import "./Spinner.css"

const Spinner = () => {
  return (
    <div className="loading">
      <div className="loadt">
        <h1>Cargando...</h1>
      </div>
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default React.memo(Spinner);
