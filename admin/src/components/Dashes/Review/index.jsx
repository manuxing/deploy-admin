import React from "react";
import './Review.css';
import { NavLink } from "react-router-dom";
import RateReviewIcon from '@mui/icons-material/RateReview';

const Dash = ({data, handleClick})=> { 
    let { id, stat, dateP, thg} = data;
    return (
        id === undefined ? <></> :
        <div className="dash"> 
                    <div className="container img_act_d">
                        <RateReviewIcon/>
                    </div>
                <NavLink className="dashdata" to={`/review/${id}`}>
                    <div>
                        <h2>Fecha de la reseña</h2>
                        <h3>{dateP}</h3>
                    </div>
                    <div>
                        <h2>Medio</h2>
                        <h3>{thg}</h3>
                    </div>
                    <div>
                        <h2>Estado</h2>
                        <h3>{stat}</h3>
                    </div>
                </NavLink>
                <button onClick={(e)=>handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);