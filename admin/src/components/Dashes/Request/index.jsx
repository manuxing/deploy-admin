import React from "react";
import './Request.css';
import { NavLink } from "react-router-dom";
import tools from "../../../tools";
// import  icon  from "../../../img/star.png"; 



const Dash = ({data})=> { 
    let {id, back, dateR, dateP, thg, contact} = data;
    return (
        id === undefined ? <></> :
        <div className="dash_act"> 
                <NavLink className="link" to={`/request/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2>Numero</h2>
                        <h3>{id}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Fecha de la Solicitud</h2>
                        <h3>{dateR}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Fecha solicitada</h2>
                        <h3>{dateP}</h3>
                    </div>
                    <div className="punto_fdato">
                        <h2>Medio</h2>
                        <h3>{thg}</h3>
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
                </div>
                </NavLink>
        </div>
    )
};

export default Dash;