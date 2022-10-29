import React from "react";

const ValorStat = ({p}) => {
  let {key, value} = p;
  return (
        <div className="info_act_d">
          <div className="punto_fdato">
            <h2>{key}</h2>
            <h3>{value}</h3>
          </div>
        </div>
  );
};

export default ValorStat;
