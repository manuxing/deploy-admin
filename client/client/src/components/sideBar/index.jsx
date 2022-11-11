import React from "react";
import LinkWIcon from "./LinkW";

const SideBar = () => {
  let  solicitud = {to:"Solicitud", url:"/solicitud"}
  let  reseña = {to:"Reseña", url:"/reseña"}
  let  home = {to:"inicio", url:"/inicio"}
  
  return (
    <div className="side">
      <div className="items">
        <ul>
          <li>
                    <LinkWIcon p={solicitud}/>
          </li>
          <li>
                  <LinkWIcon p={reseña}/>
          </li>
          <li>
                  <LinkWIcon p={home}/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
