import React from "react";
import './Activiti.css';
import { NavLink } from "react-router-dom";
import "../../Layout/base.css"
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

const Dash = ({data, handleClick})=> { 
    let {id, persons, date}= data;
    return (
        id === undefined ? <></> :
        <div className="dash">
                <div className="top">
                        <GolfCourseIcon className="icon"fontSize="large"/>
                </div>
                <NavLink className="dashdata" to={`/activity/${id}`}>
                    <div>
                        <h2>Fecha<span></span>:
                            {date} 
                        </h2>
                    </div>
                    <div>
                        <h2>Participantes: <span></span>
                         {persons &&persons.length} 
                        </h2>
                    </div>
                </NavLink>
                <button onClick={(e)=>handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);