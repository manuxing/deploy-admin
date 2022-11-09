import React from "react";
import './Request.css';
import { NavLink } from "react-router-dom";
// import  icon  from "../../../img/star.png"; 

const Dash = ({data, handleClick})=> { 
    let {id, back, dateR, dateP, thg, contact, solicitante} = data;
    return (
        id === undefined ? <></> :
        <div className="dash_act"> 
        <h1>{id}</h1>
                <NavLink className="link" to={`/request/${id}`}>
                    <div className="container img_act_d">
                        <img src={back} alt='Activity icon'/>
                    </div>
                    <div className="info_act_d"> 
                    <div className="punto_fdato">
                        <h2>Numero</h2>
                        <h3>{id}</h3>
                    </div>
                    {solicitante !== undefined ? <div className="punto_fdato">
                        <h2>solicitante</h2>
                        <h3>{solicitante}</h3>
                    </div> : <></>}
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
                        {contact && contact.length > 0 &&
                            contact.map(p =>{
                                return(
                                    <h3 key={p}> {p} </h3>
                                )
                            })
                        }
                    </div>
                </div>
                </NavLink>
                <button onClick={(e)=>handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);