import React from "react";
import tools from "../../../../tools";

const Select = (p) => {
    let {cN, name, options, onChange } = p.p;
    let {vals} = p
    let {notErrHandler, errHandler} = tools.formActions.subL

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
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
        </select>
    );
};

export default Select;
