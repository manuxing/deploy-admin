import React from "react";
import './Service.css';
import { NavLink } from "react-router-dom";
import RoofingIcon from '@mui/icons-material/Roofing';

const Dash = ({data, handleClick})=> { 
    let {id, name, description, tR} = data;
    
    return (
        id === undefined ? <></> :
        <div className="dash"> 
          <div className="container img_act_d">
                        <RoofingIcon/>
                    </div>
            <NavLink className="dashdata" to={`/service/${parseInt(id)}`}>
                    <div className="contact" >
                        <h3>{name}</h3>
                    </div>
                    <div >
                        <h2>Descripcion</h2>
                        <h3> {description} </h3>
                    </div>
                    <div >
                        <h2>Horarios</h2>
                        <h3>{tR}</h3>
                </div>
            </NavLink>
            <button onClick={(e)=>handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);