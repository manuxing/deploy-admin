import React from "react";
import './Service.css';
import { NavLink } from "react-router-dom";
import RoofingIcon from '@mui/icons-material/Roofing';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dash = ({data, handleClick})=> { 
    let { id, name, tR } = data;
    
    return (
        id === undefined ? <></> :
        <div className="dash"> 
          <div className="topdash">
                        <RoofingIcon  color="secondary" />
                    </div>
            <NavLink className="dashdata" to={`/service/${parseInt(id)}`}>
                    <div className="divdash" >
                        <h3>{name}</h3>
                    </div>
                    <div className="divdash">
                        <h2>Horarios</h2>
                        <h3>{tR}</h3>
                </div>
            </NavLink>
            <div className="delete">
                    <button onClick={(e)=>handleClick(e, id)}><DeleteForeverIcon fontSize="small"/></button>
            </div>
        </div>
    )
};

export default React.memo(Dash);