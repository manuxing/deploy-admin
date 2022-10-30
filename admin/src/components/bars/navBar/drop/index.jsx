import React from "react";
import { NavLink } from "react-router-dom";

const Drop = ({not, l}) => {
  return (
      <div className="notification">
        {not.map(p=>{
            console.log(p)
            return(
                <NavLink to={"/"} className="LinkNot">
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
