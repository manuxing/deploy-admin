import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setAll } from "../../../redux/actions";
import "../sideBar/sideBar.css";
import LinkWIcon from "../../../mod/linksWLogo";
// Icons
// import PersonIcon from "@mui/icons-material/Person";
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
      <div className="items">
        <ul>
          {
            all.length > 0 && all.map(p =>{
              return(
                  <li className="item">
                    <LinkWIcon p={p}/>
                  </li>
                );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
