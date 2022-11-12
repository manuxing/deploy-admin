import React from "react";
import './Request.css';
import { NavLink } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';

const Dash = ({data, handleClick})=> { 
    let {id,  dateP, contact, solicitante} = data;
    return (
        id === undefined ? <></> :
        <div className="dash"> 
                     <div className="top">
                        <PostAddIcon/>
                    </div>
                <NavLink className="dashdata" to={`/request/${id}`}>
                    {solicitante !== undefined ? <div className="punto_fdato">
                        <h3> solicitante: <span></span>
                        <br></br>
                        {solicitante}</h3>
                    </div> : <></>}
                    <div >
                        <h2>Fecha solicitada</h2>
                        <h3>{dateP}</h3>
                    </div>
                    <div >
                        <h2>Contacto</h2>
                        {contact && contact.length > 0 &&
                            contact.map(p =>{
                                return(
                                    <h3 key={p}> {p} </h3>
                                )
                            })
                        }
                    </div>
                </NavLink>
                <button onClick={(e)=>handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);