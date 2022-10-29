import React from "react";
import { NavLink } from "react-router-dom";

const LinkWIcon = (p) => {
  let {url, src, to} = p.p;
              
  return (
    <div className="sideBI">
      <NavLink to={`${url}`} className="LinkSideB">
        {/* <img src={src} alt="iconLinkSideB"/> */}
        <span>{to}</span>
      </NavLink>
    </div>
  );
};

export default LinkWIcon;
