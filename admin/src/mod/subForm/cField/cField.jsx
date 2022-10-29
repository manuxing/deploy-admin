import React from "react";
import CElement from "../cElement";

const CField = (p) => {
  if(p.vals === undefined){
    p = p.p;
  }
  let{warning} = p.vals;
  let {name}= p.p.fV;
  
  return (
    <div>
        <label>{p.p.label}</label>
            {
                <CElement p={p.p} vals={p.vals}/>
            }
        <div>
          {
            warning[name]
          }
        </div>
    </div>
  );
};

export default CField;
