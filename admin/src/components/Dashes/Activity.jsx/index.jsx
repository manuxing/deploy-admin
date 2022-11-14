import React from "react";
import './Activiti.css';
import { NavLink } from "react-router-dom";
import "../../Layout/base.css"
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dash = ({data, handleClick})=> { 
    let {id, persons, date}= data;
    return (
        id === undefined ? <></> :
        <div className="dash">
                <div className="topdash">
                        <GolfCourseIcon className="icon"fontSize="medium"/>
                </div>
                <NavLink className="dashdata" to={`/activity/${id}`}>
                    <div>
                        <h2>Fecha: <span>{date}</span>
                        </h2>
                    </div>
                    <div>
                        <h2>Participantes: <span></span>
                         {persons &&persons.length} 
                        </h2>
                    </div>
                </NavLink>
                <div className="delete">
                    <button onClick={(e)=>handleClick(e, id)}><DeleteForeverIcon fontSize="small"/></button>
                </div>
        </div>
    )
};

export default React.memo(Dash);