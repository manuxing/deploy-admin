import React from "react";
import { NavLink } from "react-router-dom";

const Drop = ({not, l}) => {
  return (
      <div className="notification">
        {not.map(p=>{
            return(
                <NavLink key={p.id} to={p.description ? `/review/${p.id}`:`/request/${p.id}`} className="LinkNot">
                     <p>
                        {
                            p.description ? "Review" : "Request"
                        }
                     </p>
                     <p>{p.dateP}</p>
                     <p>{p.dateR}</p>
                </NavLink>
            )
        })}
      </div>
  );
};

export default Drop;
