import React from "react";
import { NavLink } from "react-router-dom";

const LinkWIcon = (p) => {
  let {url, to} = p.p;
              
  return (
      <NavLink to={`${url}`} className="LinkSideB">
        <span>{to}</span>
      </NavLink>
  );
};

export default LinkWIcon;
