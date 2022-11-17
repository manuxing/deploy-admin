import React from "react";
import LinkWIcon from "./LinkW";
import "./sideBar.css"
// import HomeIcon from '../../@mui/icons-material/Home';
// import RateReviewIcon from '@mui/icons-material/RateReview';
// import AddReactionIcon from '@mui/icons-material/AddReaction';

const SideBar = () => {
  let  solicitud = {to:"Solicitud", url:"/solicitud"}
  let  reseña = {to:"Reseña", url:"/reseña"}
  let  home = {to:"Inicio", url:"/inicio"}
  
  return (
    <div className="side">
      <div className="bodega">
        bodega
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
