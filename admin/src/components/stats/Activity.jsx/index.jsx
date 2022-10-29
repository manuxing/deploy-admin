import React from "react";
import ValorStat from "./valor";
import { NavLink } from "react-router-dom";
import "./Activiti.css";

const Stat = ({p}) => {
  let {name, url} = p;
  return (
    <div className="dash_act">
      <NavLink className="link" to={`/${url}/`}>
        <div className="container img_act_d">
          {/* <img src={back} alt='Activity icon'/> */}
        </div>
        <div className="info_act_d">
          <h1>{name}</h1>
          {
            p.vals.map(p=>{
              return(
                <ValorStat key={p.key}p={p}/>
              );
            })            
          }
        </div>
      </NavLink>
    </div>
  );
};

export default Stat;
