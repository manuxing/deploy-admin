import React from "react";
import './Client.css';
import "../../Layout/base.css"
import { NavLink } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dash = ({data, handleClick})=> { 
    let { id,  name, contact } = data;
    return (
        id === undefined ? <></> :
        <div className="dash">
                    <div className="topdash">
                        <AccountBoxIcon color="secondary"    />
                    </div>
                <NavLink className="dashdata" to={`/client/${id}`}>
                        <div >
                            <h2>
                                {name[0].toUpperCase() + name.substring(1)}
                            </h2>
                        </div>
                            {contact && contact.length > 0 &&
                                contact.map(p =>{
                                    return(
                                        <div className="contd" key={p}>
                                            <h3 > {p} </h3>
                                        </div>
                                    )
                                })
                            }
                </NavLink>
                <div className="delete">
                    <button onClick={(e)=>handleClick(e, id)}><DeleteForeverIcon fontSize="small"/></button>
                </div>
        </div>
    )
};

export default React.memo(Dash);