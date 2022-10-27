import React, { useState } from "react";
import tools from "../../tools/index";
import CField from "./cField/cField";

function SubForm({ herencia }) {

  let [input, setInput] = useState({ ageR: "", sexo: "" });
  let [warning, setWarning] = useState({ ageR: "", sexo: "", general: "" });
  let { handleSub, sub } = tools.formActions.subL;
  let {seteo} = herencia;
  
  seteo.vals.warning = warning;
  seteo.vals.input = input;
  seteo.vals.setInput = setInput;
  seteo.vals.setWarning = setWarning;
  seteo.vals.clear[0].cb = setInput;
  seteo.vals.clear[1].cb = setWarning;

  return (
    <div className="addperson">
        {seteo.campos.map((p) => {
          return (
            <CField p={p} vals={seteo.vals} />
          );
        })}
      <button onClick={(e)=>handleSub(e ,
        {validate:herencia.validate, cbValidate:herencia.cbValidate,input, cb:sub, warning, seteo})} />
      <div className="warning">{warning.general}</div>
    </div>
  );
}

export default SubForm;
