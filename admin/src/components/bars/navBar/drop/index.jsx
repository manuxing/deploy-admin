import React from "react";
import { NavLink } from "react-router-dom";
import ReviewC from "../../../lO/reviewC";

const Drop = ({not}) => {
  return (
    <div className="dropd">
      <div className="display_not">
        {not.map(p=>{
            return(
                <NavLink key={p.id} to={p.description ? `/review/${p.id}`:`/request/${p.id}`} className="link">
                 <ReviewC key={p} review={p} />
                </NavLink>
            )
        })}
      </div>
    </div>
  );
};

export default Drop;
