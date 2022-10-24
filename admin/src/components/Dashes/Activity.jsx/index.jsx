import React from "react";
import './Activiti.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 



const Dash = ({id, back, client, services, persons, date})=> { 
    return (
        <div className="dash_act"> 
                <NavLink className="link" to={`/activity/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2> Cliente</h2>
                        <h3>{client.name}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Fecha</h2>
                        <h3> {date} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Participantes</h2>
                        <h3> {persons.length} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Servicios</h2>
                        <h3> {tools.display.activity.dash(services)} </h3>
                    </div>
                    </div>
                </NavLink>
        </div>
    )
};

export default Dash;