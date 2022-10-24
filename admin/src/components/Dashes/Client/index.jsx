import React from "react";
import './Client.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 



const Dash = ({id, back, name, contact, act, rev})=> { 
    return (
        <div className="dash_act"> 
                <NavLink className="link" to={`/client/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2> Nombre</h2>
                        <h3>{name}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Contacto</h2>
                        {
                            contact.map(p =>{
                                return(
                                    <h3 key={p}> {p} </h3>
                                )
                            })
                        }
                    </div>
                    <div className="punto_fdato">
                        <h2>Actividades realizadas</h2>
                        <h3> {act.length} </h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Reseñas</h2>
                        <h3> {rev.length} </h3>
                    </div>
                    </div>
                </NavLink>
        </div>
    )
};

export default Dash;