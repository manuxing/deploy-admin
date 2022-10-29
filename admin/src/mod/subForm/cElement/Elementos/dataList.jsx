import React from "react";

const DataList = (p) => {
  
  let { cN, name, options, onChange } = p;

  return (
    <div className={cN}>
      <input
        list="list"
        name={name}
        onChange={(p) => onChange(p)}
      />
      <datalist id="llist">
        {options.map((p) => {
          return (
            <option value={p.value} key={p.id}>
              {p.show}
            </option>
          );
        })}
      </datalist>
    </div>
  );
};

export default DataList;
