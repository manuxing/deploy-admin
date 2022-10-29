import React from "react";

const Input = (p) => {

    let {cN, name, value, type, onChange} = p;

    return (
        <input
            className={cN}
            type={type}
            placeholder={name}
            name={name}
            value={value}
            onChange={(p) => onChange(p)}
        />
    );
};

export default Input;
