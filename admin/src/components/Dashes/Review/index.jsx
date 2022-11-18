import React from "react";
import './Review.css';
import { NavLink } from "react-router-dom";
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dash = ({data, handleClick})=> { 
    let { id, stat, dateP} = data;
    return (
        id === undefined ? <></> :
        <div className="dash"> 
                    <div className="topdash">
                        <RateReviewIcon color="secondary" fontSize="small"/>
                    </div>
                <NavLink className="dashdata" to={`/review/${id}`}>
                <div className="divdash">
                        <h2>Fecha de la reseña</h2>
                        <h3>{dateP}</h3>
                    </div>
                <div className="divdash">
                        <h2>Estado</h2>
                        <h3>{stat === true ? "Leida" : "Por ver"}</h3>
                </div>
                </NavLink>
                <div className="delete">
                    <button onClick={(e)=>handleClick(e, id)}><DeleteForeverIcon fontSize="small"/></button>
                </div>
        </div>
    )
};

export default React.memo(Dash);