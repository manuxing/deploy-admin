import React from "react";
import { NavLink } from "react-router-dom";

const LinkWIcon = (p) => {
  let {url, to} = p.p;
              
  return (
    <div className="sideBI">
      <NavLink to={`${url}`} className="LinkSideB">
        <span>{to}</span>
      </NavLink>
    </div>
  );
};

export default LinkWIcon;
