import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setAll } from "../../../redux/actions";
import "../sideBar/sideBar.css";
import {NavLink} from "react-router-dom"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LogOut from "../LogOut";

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
        <section className="bodega">
           <NavLink className="linkto" to={"/activitys"} >
            <h1>
              Bodega RP
            </h1>
          </NavLink>
        </section>
        <div className="link-container">
            {
              all.length > 0 && all.map(p =>{
                return(
                    <div key ={p.url} className="links">
                      <div className="icon">
                        <ArrowRightIcon fontSize="small"/>
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
