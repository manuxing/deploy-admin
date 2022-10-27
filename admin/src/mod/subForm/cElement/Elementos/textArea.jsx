import React from "react";

const TextArea = (p) => {

    let {cN, name, value, rows, cols,onChange} = p;

    return (
        <textarea
            className={cN}
            placeholder={name}
            name={name}
            value={value}
            rows={rows}
            cols={cols}
            onChange={(p) => onChange(p)}
        />
    );
};

export default TextArea;
