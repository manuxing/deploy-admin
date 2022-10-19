import React from "react";
import './Service.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 



const Dash = ({id, imgs, name, description, tR})=> { 
    return (
        <div className="dash_act"> 
                <NavLink className="link" to={`/service/${parseInt(id)}`}>
                    {/* <div className="container img_act_d">
                        <img src={imgs[0]} alt='Activity icon'/>
                    </div> */}
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2> Nombre</h2>
                        <h3>{name}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Descripcion</h2>
                        <h3> {description} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Horarios</h2>
                        <h3>{tR}</h3>
                    </div>
                    {/* <div className="punto_fdato">
                        <h2>Reseñas</h2>
                        <h3> hacer un coso que ponga el total de las reseñas y el promedio, pero en detalle </h3>
                    </div> */}
                    </div>
                </NavLink>
        </div>
    )
};

export default Dash;