import React from "react";
import tools from "../../../../tools";

const Select = (p) => {

    let {cN, name, options, onChange } = p.p;
    let {vals} = p
    let {notErrHandler, errHandler} = tools.formActions.subL
    let id;
    let nameI;

    return (
        <select
            className={cN}
            name={name}
            onChange={p => onChange({p, vals, notErrHandler, errHandler})}
            >
            <option id={name} hidden>
                seleccione
              </option>
              {options.map((p) => {
                id = p.id ? p.id : p
                nameI = p.name ? p.name : p
                return (
                  <option value={id} key={id}>
                    {nameI}
                  </option>
                );
              })}
        </select>
    );
};

export default Select;
