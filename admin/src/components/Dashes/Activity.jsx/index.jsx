import React from "react";
import './Activiti.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 

const Dash = ({data, handleClick})=> { 
    let {id, back, services, persons, date}= data;
    return (
        id === undefined ? <></> :
        <div key={id} className="dash_act"> 
                <NavLink className="link" to={`/activity/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2>Fecha</h2>
                        <h3> {date} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Participantes</h2>
                        <h3> {persons &&persons.length} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Servicios</h2>
                        <h3> {services && tools.display.activity.dash(services)} </h3>
                    </div>
                    </div>
                    <button onClick={(e)=>handleClick(e, id)}>borrar</button>
                </NavLink>
        </div>
    )
};

export default Dash;