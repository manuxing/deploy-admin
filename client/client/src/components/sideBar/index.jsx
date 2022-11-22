import React from "react";
import LinkWIcon from "./LinkW";
import no from "../asserts/logo.png"
import "./sideBar.css"

const SideBar = () => {
  let  solicitud = {to:"Solicitud", url:"/solicitud"}
  let  reseña = {to:"Reseña", url:"/reseña"}
  let  home = {to:"Inicio", url:"/"}
  
  return (
    <div className="side">
      <div className="bodega">
        <img width="80" height="65"src={no}alt="logo"/>
          </div>
      <div className="cont">
          <div className="links-container">
                  <LinkWIcon p={home}/>
          </div>
          <div className="links-container">
                    <LinkWIcon p={solicitud}/>
          </div>
          <div className="links-container">
                   <LinkWIcon p={reseña}/>
          </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
