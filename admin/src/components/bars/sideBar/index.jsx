import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setAll } from "../../../redux/actions";
import "../sideBar/sideBar.css";
import {NavLink} from "react-router-dom"
// import LinkWIcon from "../../../mod/linksWLogo";
// Icons
import PersonIcon from "@mui/icons-material/Person";
import LogOut from "../LogOut";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
// import GridViewIcon from "@mui/icons-material/GridView";
// import PaidIcon from "@mui/icons-material/Paid";
// import GradingIcon from "@mui/icons-material/Grading";

const SideBar = () => {
  
  let all = useSelector(state => state.all.display);
  let dispatch = useDispatch();
  
  useEffect(()=>{
    if(all.length === 0){
      dispatch(setAll());
    }
  },[dispatch, all]);

  return (
    <div className="side">
      <div>
        <section className="title-container">
          <h1>
            Bodega RP
          </h1>
        </section>
        <div className="link-container">
            {
              all.length > 0 && all.map(p =>{
                return(
                    <div key ={p.url} className="links">
                      <div className="icon">
                        <PersonIcon/>
                      </div>
                      <NavLink className="linkto"to={`${p.url}`}>
                        {p.to}
                      </NavLink>
                    </div>
                  );
              })
            }
        </div>
      </div>
      <div className="logout">
            <LogOut/>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
