import React from "react";
import './Service.css';
import { NavLink } from "react-router-dom";
// import  icon  from "../../../img/star.png"; 

const Dash = ({data})=> { 
    let {id, imgs, name, description, tR} = data;
    return (
        <div className="dash_act"> 
            <NavLink className="link" to={`/service/${parseInt(id)}`}>
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
                </div>
            </NavLink>
        </div>
    )
};

export default Dash;