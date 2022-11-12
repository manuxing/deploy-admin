import React from "react";
import './Client.css';
import "../../Layout/base.css"
import { NavLink } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Dash = ({data, handleClick})=> { 
    let { id,  name, contact } = data;
    return (
        id === undefined ? <></> :
        <div className="dash">
                    <div className="top">
                        <AccountBoxIcon/>
                    </div>
                <NavLink className="dashdata" to={`/client/${id}`}>
                        <div >
                            <h2>
                                {name}
                            </h2>
                        </div>
                            {contact && contact.length > 0 &&
                                contact.map(p =>{
                                    return(
                                        <div className="contact" key={p}>
                                            <h3 > {p} </h3>
                                        </div>
                                    )
                                })
                            }
                </NavLink>
                <button onClick={(e)=> handleClick(e, id)}>borrar</button>
        </div>
    )
};

export default React.memo(Dash);