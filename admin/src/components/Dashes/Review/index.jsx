import React from "react";
// import './Request.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 



const Dash = ({ id, back, stat, dateR, dateP, thg, clients, services})=> { 
    return (
        <div className="dash_act"> 
                <NavLink className="link" to={`/review/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2>Numero</h2>
                        <h3>{id}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Servicios</h2>
                        {tools.display.review.dash(services)}
                    </div>
                    <div className="punto_fdato">
                        <h2>Cliente</h2>
                        <h3>{clients.name}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Fecha de la reseña</h2>
                        <h3>{dateR}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Fecha sobre la reseña</h2>
                        <h3>{dateP}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Medio</h2>
                        <h3>{thg}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Estado</h2>
                        <h3>{stat}</h3>
                    </div>
                </div>
                </NavLink>
        </div>
    )
};

export default Dash;