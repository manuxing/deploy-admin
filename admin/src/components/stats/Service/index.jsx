import React from "react";
import './Activiti.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 

const Stat = ({cant, last15Days, top3S })=> { 
    return (
        <div className="dash_act"> 
                <NavLink className="link" to={`/activits/`}>
                    <div className="container img_act_d">
                        {/* <img src={back} alt='Activity icon'/> */}
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2> Total</h2>
                        <h3>{cant}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>actividades en los ultimos x dias</h2>
                        <h3> {last15Days} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Top Servicios</h2>
                        <h3> {tools.display.activity.dash(top3S)} </h3>
                    </div>
                    </div>
                </NavLink>
        </div>
    )
};

export default Stat;