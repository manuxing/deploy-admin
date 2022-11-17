import React from "react";
import './Request.css';
import { NavLink } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dash = ({data, handleClick})=> { 
    let {id,  stat,dateP, solicitante} = data;
    return (
        id === undefined ? <></> :
        <div className="dash"> 
                     <div className="topdash">
                        <PostAddIcon color="secondary"/>
                    </div>
                <NavLink className="dashdata" to={`/request/${id}`}>
                    {solicitante !== undefined ? <div className="divdash">
                        <h2> Solicitante: {solicitante}</h2>
                    </div> : <></>}
                    <div className="divdash">
                        <h2>Fecha solicitada:  {dateP}
                        </h2>
                    </div>
                    <div className="divdash">
                    <h2>Estado</h2>
                        <h3>{stat === true ? "Leida" : "Por ver"}</h3>
                    </div>
                </NavLink>
                <div className="delete">
                    <button oClick={(e)=>handleClick(e, id)}><DeleteForeverIcon fontSize="small"/></button>
                </div>
        </div>
    )
};

export default React.memo(Dash);